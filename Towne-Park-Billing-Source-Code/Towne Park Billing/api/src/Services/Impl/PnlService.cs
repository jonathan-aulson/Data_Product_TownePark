using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TownePark.Models.Vo; // For InternalRevenueDataVo
using TownePark.Data; // For IInternalRevenueRepository
using api.Services;
using api.Adapters;
using api.Models.Dto; // For IPnlService
using api.Services.Impl.Calculators; // Added for calculators
using api.Services.Impl.Builders;   // Added for builders
using api.Data; // For IParkingRateRepository
using api.Adapters.Mappers; // For IInternalRevenueMapper

namespace api.Services.Impl
{
    public class PnlService : IPnlService
    {
        private readonly IInternalRevenueRepository _internalRevenueRepository;
        private readonly IPnlServiceAdapter _pnlServiceAdapter;
        private readonly List<IInternalRevenueCalculator> _internalRevenueCalculators;
        private readonly List<IExternalRevenueCalculator> _externalRevenueCalculators;
        private readonly List<IManagementAgreementCalculator> _managementAgreementCalculators;
        private readonly IParkingRateRepository _parkingRateRepository;
        private readonly IInternalRevenueMapper _internalRevenueMapper;

        public PnlService(
            IInternalRevenueRepository internalRevenueRepository,
            IPnlServiceAdapter pnlServiceAdapter,
            IEnumerable<IInternalRevenueCalculator> internalRevenueCalculators,
            IEnumerable<IExternalRevenueCalculator> externalRevenueCalculators,
            IEnumerable<IManagementAgreementCalculator> managementAgreementCalculators,
            IParkingRateRepository parkingRateRepository,
            IInternalRevenueMapper internalRevenueMapper)
        {
            _internalRevenueRepository = internalRevenueRepository;
            _pnlServiceAdapter = pnlServiceAdapter;
            _internalRevenueCalculators = internalRevenueCalculators.ToList();
            _externalRevenueCalculators = externalRevenueCalculators.ToList();
            _managementAgreementCalculators = managementAgreementCalculators.OrderBy(c => c.Order).ToList();
            _parkingRateRepository = parkingRateRepository;
            _internalRevenueMapper = internalRevenueMapper;
        }

        public async Task<PnlResponseDto> GetPnlInternalRevenueDataAsync(List<string> siteIds, int year)
        {
            var allSitesRevenueData = await _internalRevenueRepository.GetInternalRevenueDataAsync(siteIds, year) ?? new List<InternalRevenueDataVo>();

            // Attach parking rates to each site
            var siteGuids = allSitesRevenueData.Select(s => s.SiteId).ToList();
            var parkingRates = _parkingRateRepository.GetParkingRatesWithDetails(siteGuids, year);
            var parkingRateVos = _internalRevenueMapper.MapParkingRatesToVo(parkingRates);
            foreach (var siteData in allSitesRevenueData)
                siteData.ParkingRates = parkingRateVos.Where(r => r.SiteId == siteData.SiteId).ToList();

            var pnlResponse = await _pnlServiceAdapter.GetPnlDataAsync(siteIds, year);
            pnlResponse.ForecastRows ??= new List<PnlRowDto>();

            // Store external revenue calculations for use in internal revenue calculations
            var externalRevenueCalculations = new Dictionary<(string siteId, int month), decimal>();

            var forecastRowNamesToCalculate = new List<string> { "ExternalRevenue", "InternalRevenue" };

            foreach (var rowName in forecastRowNamesToCalculate)
            {
                var row = GetOrInitializeForecastRow(pnlResponse, rowName);
                for (int monthZeroBased = 0; monthZeroBased < 12; monthZeroBased++)
                {
                    int monthOneBased = monthZeroBased + 1;
                    var monthValueDto = row.MonthlyValues.First(mv => mv.Month == monthZeroBased);
                    InitializeMonthValue(rowName, monthValueDto);

                    decimal currentMonthTotal = 0m;
                    foreach (var siteData in allSitesRevenueData)
                    {
                        var siteDetailDto = new SiteMonthlyRevenueDetailDto { SiteId = siteData.SiteNumber };

                        // Get the calculated external revenue for this site/month if available
                        decimal? calculatedExternalRevenue = null;
                        if (rowName == "InternalRevenue" && externalRevenueCalculations.TryGetValue((siteData.SiteNumber, monthOneBased), out var extRev))
                        {
                            calculatedExternalRevenue = extRev;
                        }

                        decimal siteMonthlyValue = CalculateSiteDetail(rowName, siteData, year, monthOneBased, monthValueDto, siteDetailDto, pnlResponse, monthZeroBased, calculatedExternalRevenue);
                        siteDetailDto.Value = siteMonthlyValue;
                        monthValueDto.SiteDetails.Add(siteDetailDto);
                        currentMonthTotal += siteMonthlyValue;

                        // Store external revenue calculations for use in internal revenue calculations
                        if (rowName == "ExternalRevenue" && siteDetailDto.ExternalRevenueBreakdown?.CalculatedTotalExternalRevenue.HasValue == true)
                        {
                            externalRevenueCalculations[(siteData.SiteNumber, monthOneBased)] = siteDetailDto.ExternalRevenueBreakdown.CalculatedTotalExternalRevenue.Value;
                        }
                    }
                    AggregateMonthlyTotals(rowName, monthValueDto);
                    // Set month value from aggregate CalculatedTotalInternalRevenue if available
                    if (rowName == "InternalRevenue" && monthValueDto.InternalRevenueBreakdown?.CalculatedTotalInternalRevenue != null)
                        monthValueDto.Value = monthValueDto.InternalRevenueBreakdown.CalculatedTotalInternalRevenue.Value;
                    else
                        monthValueDto.Value = currentMonthTotal;
                }
            }
            return pnlResponse;
        }

        private PnlRowDto GetOrInitializeForecastRow(PnlResponseDto pnlResponse, string rowName)
        {
            var row = pnlResponse.ForecastRows.FirstOrDefault(r => r.ColumnName == rowName);
            if (row == null || row.MonthlyValues == null || row.MonthlyValues.Count != 12)
            {
                row = new PnlRowBuilder().WithColumnName(rowName).WithInitializedMonthlyValues(12).Build();
                var idx = pnlResponse.ForecastRows.FindIndex(r => r.ColumnName == rowName);
                if (idx >= 0) pnlResponse.ForecastRows[idx] = row; else pnlResponse.ForecastRows.Add(row);
            }
            else
            {
                foreach (var mv in row.MonthlyValues)
                {
                    mv.SiteDetails ??= new List<SiteMonthlyRevenueDetailDto>();
                    mv.Value = 0m;
                }
            }
            return row;
        }

        private void InitializeMonthValue(string rowName, MonthValueDto monthValueDto)
        {
            monthValueDto.Value = 0m;
            monthValueDto.SiteDetails = new List<SiteMonthlyRevenueDetailDto>();
            if (rowName == "InternalRevenue")
            {
                if (monthValueDto.InternalRevenueBreakdown == null)
                {
                    monthValueDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();
                }

            }
            else if (rowName == "ExternalRevenue")
                monthValueDto.InternalRevenueBreakdown = null;
            else
                monthValueDto.InternalRevenueBreakdown = null;
        }

        private decimal CalculateSiteDetail(
            string rowName,
            InternalRevenueDataVo siteData,
            int year,
            int monthOneBased,
            MonthValueDto monthValueDto,
            SiteMonthlyRevenueDetailDto siteDetailDto,
            PnlResponseDto pnlResponse,
            int monthZeroBased,
            decimal? calculatedExternalRevenue = null)
        {
            decimal siteMonthlyValue = 0m;
            bool forecastDataFound = false;
            if (rowName == "ExternalRevenue")
            {
                siteDetailDto.ExternalRevenueBreakdown = null;
                foreach (var calculator in _externalRevenueCalculators)
                    calculator.CalculateAndApply(siteData, year, monthOneBased, monthValueDto, siteDetailDto);
                if (siteDetailDto.ExternalRevenueBreakdown?.CalculatedTotalExternalRevenue != null)
                {
                    siteMonthlyValue = siteDetailDto.ExternalRevenueBreakdown.CalculatedTotalExternalRevenue.Value;
                    forecastDataFound = true;
                }
            }
            else if (rowName == "InternalRevenue")
            {
                siteDetailDto.InternalRevenueBreakdown = null;
                // External revenue must be provided for internal revenue calculations
                decimal externalRevenueForCalculation = calculatedExternalRevenue ?? 0m;
                foreach (var calculator in _internalRevenueCalculators)
                    calculator.CalculateAndApply(siteData, year, monthOneBased, monthValueDto, siteDetailDto, externalRevenueForCalculation, pnlResponse.BudgetRows);
                
                // Run management agreement calculators in order
                foreach (var calculator in _managementAgreementCalculators)
                    calculator.CalculateAndApply(siteData, year, monthOneBased, monthValueDto, siteDetailDto, externalRevenueForCalculation, pnlResponse.BudgetRows);
                
                if (siteDetailDto.InternalRevenueBreakdown?.CalculatedTotalInternalRevenue != null)
                {
                    siteMonthlyValue = siteDetailDto.InternalRevenueBreakdown.CalculatedTotalInternalRevenue.Value;
                    forecastDataFound = true;
                }
            }
            if (!forecastDataFound)
                siteMonthlyValue = GetBudgetFallback(rowName, siteData, pnlResponse, monthZeroBased, siteDetailDto);
            else
                siteDetailDto.IsForecast = true;
            return siteMonthlyValue;
        }

        private decimal GetBudgetFallback(
            string rowName,
            InternalRevenueDataVo siteData,
            PnlResponseDto pnlResponse,
            int monthZeroBased,
            SiteMonthlyRevenueDetailDto siteDetailDto)
        {
            siteDetailDto.IsForecast = false;
            decimal budgetSiteValue = 0m;
            var budgetPnlRow = pnlResponse.BudgetRows?.FirstOrDefault(r => r.ColumnName == rowName);
            if (budgetPnlRow != null)
            {
                var budgetMonthValue = budgetPnlRow.MonthlyValues?.FirstOrDefault(mv => mv.Month == monthZeroBased);
                if (budgetMonthValue != null)
                {
                    var budgetSiteDetail = budgetMonthValue.SiteDetails?.FirstOrDefault(sd => sd.SiteId == siteData.SiteNumber);
                    if (budgetSiteDetail != null)
                    {
                        if (rowName == "InternalRevenue")
                        {
                            siteDetailDto.InternalRevenueBreakdown = null;
                            budgetSiteValue = budgetSiteDetail.Value ?? 0;
                        }
                        else if (rowName == "ExternalRevenue")
                        {
                            siteDetailDto.ExternalRevenueBreakdown = null;
                            budgetSiteValue = budgetSiteDetail.Value ?? 0;
                        }
                    }
                }
            }
            return budgetSiteValue;
        }

        private void AggregateMonthlyTotals(string rowName, MonthValueDto monthValueDto)
        {
            if (rowName == "InternalRevenue")
            {
                foreach (var calculator in _internalRevenueCalculators)
                    calculator.AggregateMonthlyTotals(monthValueDto.SiteDetails, monthValueDto);

                // Run management agreement aggregation in order
                foreach (var calculator in _managementAgreementCalculators)
                    calculator.AggregateMonthlyTotals(monthValueDto.SiteDetails, monthValueDto);

                // Central aggregation for CalculatedTotalInternalRevenue
                var breakdown = monthValueDto.InternalRevenueBreakdown;
                if (breakdown != null)
                {
                    breakdown.CalculatedTotalInternalRevenue =
                        (breakdown.FixedFee?.Total ?? 0m) +
                        (breakdown.PerOccupiedRoom?.Total ?? 0m) +
                        (breakdown.RevenueShare?.Total ?? 0m) +
                        (breakdown.PerLaborHour?.Total ?? 0m)+
                        (breakdown.BillableAccounts?.Total ?? 0m) +
                        (breakdown.ManagementAgreement?.Total ?? 0m); 
                }
            }
            else if (rowName == "ExternalRevenue")
            {
                foreach (var calculator in _externalRevenueCalculators)
                    calculator.AggregateMonthlyTotals(monthValueDto.SiteDetails, monthValueDto);
            }
        }
    }
}
