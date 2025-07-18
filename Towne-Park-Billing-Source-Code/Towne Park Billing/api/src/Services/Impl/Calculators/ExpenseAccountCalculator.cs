using api.Data;
using api.Models.Dto;
using api.Models.Vo;
using api.Models.Vo.Enum;
using Microsoft.Extensions.Logging;
using TownePark;
using TownePark.Models.Vo;

namespace api.Services.Impl.Calculators
{
    public class ExpenseAccountCalculator : IInternalRevenueCalculator
    {
        private readonly IBillableExpenseRepository _billableExpenseRepository;
        private readonly IOtherExpenseRepository _otherExpenseRepository;
        private readonly ILogger<ExpenseAccountCalculator> _logger;
        private readonly Dictionary<(Guid siteId, int year), List<bs_OtherExpenseDetail>> _yearlyExpenseCache;

        private static readonly List<string> ForecastedAccountFields = new()
        {
            "bs_EmployeeRelations",
            "bs_FuelVehicles", 
            "bs_LossAndDamageClaims",
            "bs_OfficeSupplies",
            "bs_OutsideServices",
            "bs_RentsParking",
            "bs_RepairsAndMaintenance",
            "bs_RepairsAndMaintenanceVehicle",
            "bs_Signage",
            "bs_SuppliesAndEquipment",
            "bs_TicketsAndPrintedMaterial",
            "bs_Uniforms"
        };
        
        public ExpenseAccountCalculator(
            IBillableExpenseRepository billableExpenseRepository,
            IOtherExpenseRepository otherExpenseRepository,
            ILogger<ExpenseAccountCalculator> logger)
        {
            _billableExpenseRepository = billableExpenseRepository;
            _otherExpenseRepository = otherExpenseRepository;
            _logger = logger;
            _yearlyExpenseCache = new Dictionary<(Guid, int), List<bs_OtherExpenseDetail>>();
        }

        public void CalculateAndApply(InternalRevenueDataVo siteData, int year, int monthOneBased,
            MonthValueDto monthValueDto, SiteMonthlyRevenueDetailDto siteDetailDto,
            decimal calculatedExternalRevenue, List<PnlRowDto> budgetRows)
        {
            try
            {
                if (!IsContractTypeBillingAccount(siteData))
                {
                    return;
                }

                var expenseAccountsTotal = CalculateExpenseAccountsForSite(siteData, year, monthOneBased);

                InitializeDtoStructure(siteDetailDto);
                
                siteDetailDto.InternalRevenueBreakdown!.BillableAccounts!.ExpenseAccounts = new ExpenseAccountsInternalRevenueDto
                {
                    Total = expenseAccountsTotal
                };

                UpdateBillableAccountsTotal(siteDetailDto, expenseAccountsTotal);
                UpdateCalculatedTotalInternalRevenue(siteDetailDto.InternalRevenueBreakdown);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating expense accounts for site {SiteId} for {Year}-{Month}", 
                    siteData.SiteId, year, monthOneBased);
            }
        }

        public void AggregateMonthlyTotals(List<SiteMonthlyRevenueDetailDto> siteDetailsForMonth, MonthValueDto monthValueDto)
        {
            try
            {
                var totalExpenseAccounts = siteDetailsForMonth
                    .Sum(s => s.InternalRevenueBreakdown?.BillableAccounts?.ExpenseAccounts?.Total ?? 0m);

                InitializeMonthDtoStructure(monthValueDto);
                
                monthValueDto.InternalRevenueBreakdown!.BillableAccounts!.ExpenseAccounts = new ExpenseAccountsInternalRevenueDto
                {
                    Total = totalExpenseAccounts
                };

                UpdateMonthBillableAccountsTotal(monthValueDto, totalExpenseAccounts);
                UpdateCalculatedTotalInternalRevenue(monthValueDto.InternalRevenueBreakdown);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error aggregating monthly expense accounts totals");
            }
        }

        private decimal CalculateExpenseAccountsForSite(InternalRevenueDataVo siteData, int year, int monthOneBased)
        {
            var siteId = siteData.SiteId;
            if (siteId == Guid.Empty)
            {
                return 0m;
            }

            var total = 0m;

            // Get non-forecasted expense accounts total (all enabled 7000-range except the 12 forecasted ones)
            var nonForecastedTotal = _billableExpenseRepository.GetBillableExpenseBudget(siteId, year, monthOneBased);
            total += nonForecastedTotal;

            // Get forecasted expense accounts (12 specific accounts)
            var forecastedTotal = CalculateForecastedExpenseAccounts(siteData, siteId, year, monthOneBased);
            total += forecastedTotal;

            return total;
        }

        private decimal CalculateForecastedExpenseAccounts(InternalRevenueDataVo siteData, Guid siteId, int year, int monthOneBased)
        {
            var total = 0m;

            // Get cached year data or fetch it if not cached
            var yearlyExpenseDetails = GetYearlyExpenseDetails(siteId, year);
            var targetMonthYear = $"{year:D4}-{monthOneBased:D2}";
            var expenseDetail = yearlyExpenseDetails?.FirstOrDefault(x => x.bs_MonthYear == targetMonthYear);

            if (expenseDetail != null)
            {
                // Extract values from the single record - much more efficient than 12 separate calls
                total += GetFieldValue(expenseDetail, "bs_EmployeeRelations");
                total += GetFieldValue(expenseDetail, "bs_FuelVehicles");
                total += GetFieldValue(expenseDetail, "bs_LossAndDamageClaims");
                total += GetFieldValue(expenseDetail, "bs_OfficeSupplies");
                total += GetFieldValue(expenseDetail, "bs_OutsideServices");
                total += GetFieldValue(expenseDetail, "bs_RentsParking");
                total += GetFieldValue(expenseDetail, "bs_RepairsAndMaintenance");
                total += GetFieldValue(expenseDetail, "bs_RepairsAndMaintenanceVehicle");
                total += GetFieldValue(expenseDetail, "bs_Signage");
                total += GetFieldValue(expenseDetail, "bs_SuppliesAndEquipment");
                total += GetFieldValue(expenseDetail, "bs_TicketsAndPrintedMaterial");
                total += GetFieldValue(expenseDetail, "bs_Uniforms");
            }
            else
            {
                // Fallback to budget allocation when no forecast data exists
                var otherExpenseBudget = _billableExpenseRepository.GetOtherExpenseBudget(siteId, year, monthOneBased);
                total = otherExpenseBudget; // Use the full budget rather than dividing by account count
            }

            return total;
        }

        private List<bs_OtherExpenseDetail>? GetYearlyExpenseDetails(Guid siteId, int year)
        {
            var cacheKey = (siteId, year);
            
            if (_yearlyExpenseCache.TryGetValue(cacheKey, out var cachedData))
            {
                return cachedData;
            }

            // Fetch all 12 months of data for the year in a single call
            // Using January as the starting point, GetOtherExpenseDetail will fetch the full year
            var yearStartPeriod = $"{year:D4}-01";
            var yearlyDetails = _otherExpenseRepository.GetOtherExpenseDetail(siteId, yearStartPeriod)?.ToList();
            
            // Cache the result for future use during this request lifecycle
            _yearlyExpenseCache[cacheKey] = yearlyDetails ?? new List<bs_OtherExpenseDetail>();
            
            return yearlyDetails;
        }

        private static decimal GetFieldValue(bs_OtherExpenseDetail expenseDetail, string fieldName)
        {
            return fieldName switch
            {
                "bs_EmployeeRelations" => expenseDetail.bs_EmployeeRelations ?? 0m,
                "bs_FuelVehicles" => expenseDetail.bs_FuelVehicles ?? 0m,
                "bs_LossAndDamageClaims" => expenseDetail.bs_LossAndDamageClaims ?? 0m,
                "bs_OfficeSupplies" => expenseDetail.bs_OfficeSupplies ?? 0m,
                "bs_OutsideServices" => expenseDetail.bs_OutsideServices ?? 0m,
                "bs_RentsParking" => expenseDetail.bs_RentsParking ?? 0m,
                "bs_RepairsAndMaintenance" => expenseDetail.bs_RepairsAndMaintenance ?? 0m,
                "bs_RepairsAndMaintenanceVehicle" => expenseDetail.bs_RepairsAndMaintenanceVehicle ?? 0m,
                "bs_Signage" => expenseDetail.bs_Signage ?? 0m,
                "bs_SuppliesAndEquipment" => expenseDetail.bs_SuppliesAndEquipment ?? 0m,
                "bs_TicketsAndPrintedMaterial" => expenseDetail.bs_TicketsAndPrintedMaterial ?? 0m,
                "bs_Uniforms" => expenseDetail.bs_Uniforms ?? 0m,
                _ => 0m
            };
        }



        private static bool IsContractTypeBillingAccount(InternalRevenueDataVo siteData)
        {
            return siteData.Contract?.ContractTypes?.Contains(bs_contracttypechoices.BillingAccount) == true;
        }

        private static void InitializeDtoStructure(SiteMonthlyRevenueDetailDto siteDetailDto)
        {
            siteDetailDto.InternalRevenueBreakdown ??= new InternalRevenueBreakdownDto();
            siteDetailDto.InternalRevenueBreakdown.BillableAccounts ??= new BillableAccountsInternalRevenueDto();
        }

        private static void InitializeMonthDtoStructure(MonthValueDto monthValueDto)
        {
            monthValueDto.InternalRevenueBreakdown ??= new InternalRevenueBreakdownDto();
            monthValueDto.InternalRevenueBreakdown.BillableAccounts ??= new BillableAccountsInternalRevenueDto();
        }

        private static void UpdateBillableAccountsTotal(SiteMonthlyRevenueDetailDto siteDetailDto, decimal amount)
        {
            var billableAccounts = siteDetailDto.InternalRevenueBreakdown!.BillableAccounts!;
            
            if (billableAccounts.Total.HasValue)
                billableAccounts.Total += amount;
            else
                billableAccounts.Total = amount;
        }

        private static void UpdateMonthBillableAccountsTotal(MonthValueDto monthValueDto, decimal amount)
        {
            var billableAccounts = monthValueDto.InternalRevenueBreakdown!.BillableAccounts!;
            
            if (billableAccounts.Total.HasValue)
                billableAccounts.Total += amount;
            else
                billableAccounts.Total = amount;
        }

        private static void UpdateCalculatedTotalInternalRevenue(InternalRevenueBreakdownDto internalRevenueBreakdown)
        {
            var total = 0m;

            if (internalRevenueBreakdown.BillableAccounts?.Total.HasValue == true)
                total += internalRevenueBreakdown.BillableAccounts.Total.Value;

            if (internalRevenueBreakdown.ManagementAgreement?.Total.HasValue == true)
                total += internalRevenueBreakdown.ManagementAgreement.Total.Value;

            if (internalRevenueBreakdown.RevenueShare?.Total.HasValue == true)
                total += internalRevenueBreakdown.RevenueShare.Total.Value;

            if (internalRevenueBreakdown.FixedFee?.Total.HasValue == true)
                total += internalRevenueBreakdown.FixedFee.Total.Value;

            if (internalRevenueBreakdown.PerOccupiedRoom?.Total.HasValue == true)
                total += internalRevenueBreakdown.PerOccupiedRoom.Total.Value;

            internalRevenueBreakdown.CalculatedTotalInternalRevenue = total;
        }
    }
}