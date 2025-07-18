using System.Collections.Generic;
using System.Linq;
using Riok.Mapperly.Abstractions;
using TownePark.Models.Vo;

using TownePark;
using System;
using System.Text.Json;

namespace api.Adapters.Mappers
{

    [Mapper]
    public partial class InternalRevenueMapper : IInternalRevenueMapper
    {
        [MapProperty(nameof(bs_Contract.bs_ContractId), nameof(ContractDataVo.ContractId))]
        [MapProperty(nameof(bs_Contract.bs_ContractTypeString), nameof(ContractDataVo.ContractType))]
        [MapProperty(nameof(bs_Contract.bs_ContractType), nameof(ContractDataVo.ContractTypes))]
        [MapProperty(nameof(bs_Contract.bs_ConsumerPriceIndex), nameof(ContractDataVo.IsCpiEscalatorEnabled))]
        [MapProperty(nameof(bs_Contract.bs_IncrementAmount), nameof(ContractDataVo.IncrementAmount))]
        [MapProperty(nameof(bs_Contract.bs_IncrementMonth), nameof(ContractDataVo.IncrementMonth))]
        // EscalatorTriggerDate and CpiValue do not have direct sources in bs_Contract.
        // These will remain unmapped by convention unless a custom source or logic is provided.
        [MapProperty(nameof(bs_Contract.bs_OccupiedRoomRate), nameof(ContractDataVo.OccupiedRoomRate))]
        private partial ContractDataVo MapContractToVoBase(bs_Contract contract);

        public ContractDataVo MapContractToVo(bs_Contract contract)
        {
            var result = MapContractToVoBase(contract);
            
            // Map billable accounts configuration
            if (contract.bs_BillableAccount_Contract != null)
            {
                result.BillableAccountsData = MapBillableAccountConfigsToVo(contract.bs_BillableAccount_Contract);
            }
            
            return result;
        }

        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SiteStatisticDetailId), nameof(SiteStatisticDetailVo.Id))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_Date), nameof(SiteStatisticDetailVo.Date))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfRateDaily), nameof(SiteStatisticDetailVo.SelfRateDaily))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfRateMonthly), nameof(SiteStatisticDetailVo.SelfRateMonthly))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_BaseRevenue), nameof(SiteStatisticDetailVo.BaseRevenue))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_OccupiedRooms), nameof(SiteStatisticDetailVo.OccupiedRooms))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_Occupancy), nameof(SiteStatisticDetailVo.Occupancy))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfOvernight), nameof(SiteStatisticDetailVo.SelfOvernight))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfDaily), nameof(SiteStatisticDetailVo.SelfDaily))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfMonthly), nameof(SiteStatisticDetailVo.SelfMonthly))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfComps), nameof(SiteStatisticDetailVo.SelfComps))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_DriveInRatio), nameof(SiteStatisticDetailVo.DriveInRatio))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_CaptureRatio), nameof(SiteStatisticDetailVo.CaptureRatio))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ExternalRevenue), nameof(SiteStatisticDetailVo.ExternalRevenue))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetDaily), nameof(SiteStatisticDetailVo.ValetDaily))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetRateDaily), nameof(SiteStatisticDetailVo.ValetRateDaily))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetMonthly), nameof(SiteStatisticDetailVo.ValetMonthly))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetRateMonthly), nameof(SiteStatisticDetailVo.ValetRateMonthly))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetOvernight), nameof(SiteStatisticDetailVo.ValetOvernight))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetAggregator), nameof(SiteStatisticDetailVo.ValetAggregator))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfAggregator), nameof(SiteStatisticDetailVo.SelfAggregator))]
        public partial SiteStatisticDetailVo MapSiteStatisticDetailToVo(bs_SiteStatisticDetail source);

        public partial List<SiteStatisticDetailVo> MapSiteStatisticsToVo(IEnumerable<bs_SiteStatisticDetail> siteStatistics);
        
        [MapProperty(nameof(bs_FixedFeeService.bs_FixedFeeServiceId), nameof(FixedFeeVo.Id))]
        [MapProperty(nameof(bs_FixedFeeService.bs_Fee), nameof(FixedFeeVo.Fee))]
        [MapProperty(nameof(bs_FixedFeeService.bs_StartDate), nameof(FixedFeeVo.StartDate))]
        [MapProperty(nameof(bs_FixedFeeService.bs_EndDate), nameof(FixedFeeVo.EndDate))]
        private partial FixedFeeVo MapToFixedFeeVo(bs_FixedFeeService source);

        public List<FixedFeeVo> MapFixedFeesToVo(IEnumerable<bs_FixedFeeService> fixedFees)
        {
            if (fixedFees == null) return null;
            return fixedFees.Select(f => new FixedFeeVo
            {
                Id = f.bs_FixedFeeServiceId ?? Guid.Empty,
                Fee = f.bs_Fee ?? 0,
                StartDate = f.bs_StartDate ?? DateTime.UtcNow,
                EndDate = f.bs_EndDate,
                IsActive = !f.bs_EndDate.HasValue || f.bs_EndDate.Value > DateTime.UtcNow
            }).ToList();
        }
        
        public List<LaborHourJobVo> MapLaborHourJobsToVo(IEnumerable<bs_LaborHourJob> laborHourJobs)
        {
            if (laborHourJobs == null) return null;
            return laborHourJobs.Select(j => new LaborHourJobVo
            {
                Id = j.bs_LaborHourJobId ?? Guid.Empty,
                JobCode = j.bs_JobCode ?? string.Empty,
                Rate = j.bs_Rate ?? 0,
                StartDate = j.bs_StartDate ?? DateTime.UtcNow,
                EndDate = j.bs_EndDate
            }).ToList();
        }
        
        // Custom mapping for RevenueShareThreshold due to ThresholdStructureVo
        public List<RevenueShareThresholdVo> MapRevenueShareThresholdsToVo(IEnumerable<bs_RevenueShareThreshold> revenueShareThresholds)
        {
            if (revenueShareThresholds == null) return null;
            return revenueShareThresholds.Select(t => new RevenueShareThresholdVo
            {
                Id = t.bs_RevenueShareThresholdId ?? Guid.Empty,
                RevenueCodeData = t.bs_RevenueCodeData ?? string.Empty,
                ThresholdStructure = ParseTierData(t.bs_TierData)
            }).ToList();
        }

        private ThresholdStructureVo ParseTierData(string tierDataJson)
        {
            if (string.IsNullOrEmpty(tierDataJson))
            {
                return new ThresholdStructureVo 
                { 
                    Tiers = new List<ThresholdTierVo>()
                };
            }

            try
            {
                var options = new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var tiers = System.Text.Json.JsonSerializer.Deserialize<List<ThresholdTierVo>>(tierDataJson, options);
                return new ThresholdStructureVo 
                { 
                    Tiers = tiers ?? new List<ThresholdTierVo>()
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing TierData JSON: {ex.Message}");
                return new ThresholdStructureVo 
                { 
                    Tiers = new List<ThresholdTierVo>()
                };
            }
        }

        public List<BillableAccountVo> MapBillableAccountsToVo(IEnumerable<bs_BillableAccount> billableAccounts)
        {
            if (billableAccounts == null) return null;
            return billableAccounts.Select(a => new BillableAccountVo
            {
                Id = a.bs_BillableAccountId ?? Guid.Empty,
                AccountCode = a.bs_Name ?? string.Empty,
                Amount = a.bs_AdditionalPayrollAmount ?? 0,
                IsExcluded = a.statecode == bs_billableaccount_statecode.Inactive
            }).ToList();
        }

        public ManagementAgreementVo MapManagementAgreementToVo(bs_ManagementAgreement managementAgreement)
        {
            if (managementAgreement == null) return null;
            return new ManagementAgreementVo
            {
                Id = managementAgreement.bs_ManagementAgreementId ?? Guid.Empty,
                ConfiguredFee = managementAgreement.bs_FixedFeeAmount ?? 0,
                InsuranceAddlAmount = managementAgreement.bs_InsuranceAdditionalPercentage ?? 0,
                BillableExpenseAccounts = ParseBillableExpenseAccounts(managementAgreement.bs_PerLaborHourJobCodeData)
            };
        }

        private List<string> ParseBillableExpenseAccounts(string jobCodeData)
        {
            if (string.IsNullOrEmpty(jobCodeData))
            {
                return new List<string>();
            }

            try
            {
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var jobCodes = JsonSerializer.Deserialize<List<JobCodeVo>>(jobCodeData, options);
                return jobCodes?.Select(jc => jc.Code).Where(c => !string.IsNullOrEmpty(c)).ToList() ?? new List<string>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing JobCodeData JSON: {ex.Message}");
                return new List<string>();
            }
        }

        // Custom mapping for OtherRevenues due to bs_MonthYear (string) to DateTime in VO
        public List<OtherRevenueVo> MapOtherRevenuesToVo(IEnumerable<bs_OtherRevenueDetail> otherRevenueDetails)
        {
            if (otherRevenueDetails == null) return null;
            return otherRevenueDetails.Select(MapToOtherRevenueVo).ToList();
        }

        // Individual mapping for OtherRevenueVo
        public OtherRevenueVo MapToOtherRevenueVo(bs_OtherRevenueDetail source)
        {
            if (source == null) return null;
            return new OtherRevenueVo
            {
                Id = source.bs_OtherRevenueDetailId ?? Guid.Empty,
                Amount = (source.bs_BillableExpense ?? 0) + 
                        (source.bs_Credits ?? 0) + 
                        (source.bs_GPOFees ?? 0) + 
                        (source.bs_RevenueValidation ?? 0) + 
                        (source.bs_SigningBonus ?? 0),
                Period = ParseMonthYear(source.bs_MonthYear)
            };
        }

        // Helper method to parse "YYYY-MM" string to DateTime (first day of the month)
        private DateTime ParseMonthYear(string monthYear)
        {
            if (string.IsNullOrEmpty(monthYear) || !monthYear.Contains("-"))
            {
                return DateTime.MinValue; // Or throw an exception, or return default(DateTime)
            }
            var parts = monthYear.Split('-');
            if (parts.Length == 2 && int.TryParse(parts[0], out int year) && int.TryParse(parts[1], out int month))
            {
                if (year >=1 && year <= 9999 && month >= 1 && month <= 12)
                {
                    return new DateTime(year, month, 1);
                }
            }
            return DateTime.MinValue; // Or handle error appropriately
        }

        public List<NonGLExpenseVo> MapNonGLExpensesToVo(IEnumerable<bs_NonGLExpense> nonGLExpenses)
        {
            if (nonGLExpenses == null) return null;
            return nonGLExpenses.Select(e => new NonGLExpenseVo
            {
                Id = e.bs_NonGLExpenseId ?? Guid.Empty,
                ExpenseType = e.bs_NonGLExpenseType?.ToString() ?? string.Empty,
                Amount = e.bs_ExpenseAmount ?? 0,
                Period = e.bs_FinalPeriodBilled ?? DateTime.MinValue
            }).ToList();
        }

        public ParkingRateVo MapParkingRateToVo(bs_ParkingRate source)
        {
            return new ParkingRateVo
            {
                Id = source.bs_ParkingRateId ?? Guid.Empty,
                SiteId = source.bs_CustomerSiteFK?.Id ?? Guid.Empty,
                Year = source.bs_Year ?? 0,
                Details = MapParkingRateDetailsToVo(source.bs_parkingratedetail_ParkingRateFK_bs_parkingrate)
            };
        }

        [MapProperty(nameof(bs_ParkingRateDetail.bs_ParkingRateDetailId), nameof(ParkingRateDetailVo.Id))]
        [MapProperty(nameof(bs_ParkingRateDetail.bs_Month), nameof(ParkingRateDetailVo.Month))]
        [MapProperty(nameof(bs_ParkingRateDetail.bs_RateCategory), nameof(ParkingRateDetailVo.RateCategory))]
        public ParkingRateDetailVo MapParkingRateDetailToVo(bs_ParkingRateDetail source)
        {
            return new ParkingRateDetailVo
            {
                Id = source.bs_ParkingRateDetailId ?? Guid.Empty,
                Month = source.bs_Month ?? 0,
                Rate = source.bs_Rate?.Value ?? 0m,
                RateCategory = source.bs_RateCategory ?? TownePark.bs_ratecategorytypes.ValetDaily
            };
        }

        public List<ParkingRateDetailVo> MapParkingRateDetailsToVo(IEnumerable<bs_ParkingRateDetail> details)
        {
            if (details == null) return new List<ParkingRateDetailVo>();
            return details.Select(MapParkingRateDetailToVo).ToList();
        }

        public List<ParkingRateVo> MapParkingRatesToVo(IEnumerable<bs_ParkingRate> rates)
        {
            if (rates == null) return new List<ParkingRateVo>();
            return rates.Select(MapParkingRateToVo).ToList();
        }

        public List<BillableAccountConfigVo> MapBillableAccountConfigsToVo(IEnumerable<bs_BillableAccount> billableAccounts)
        {
            if (billableAccounts == null) return new List<BillableAccountConfigVo>();
            
            return billableAccounts.Select(a => new BillableAccountConfigVo
            {
                Id = a.bs_BillableAccountId,
                
                // Payroll Taxes (PTEB) Configuration
                PayrollTaxesEnabled = a.bs_PayrollTaxesEnabled ?? false,
                PayrollTaxesBillingType = a.bs_PayrollTaxesBillingType?.ToString() ?? string.Empty,
                PayrollTaxesPercentage = a.bs_PayrollTaxesPercentage ?? 0,
                PayrollTaxesEscalatorEnable = a.bs_PayrollTaxesEscalatorEnable ?? false,
                PayrollTaxesEscalatorType = a.bs_PayrollTaxesEscalatorType?.ToString() ?? string.Empty,
                PayrollTaxesEscalatorValue = a.bs_PayrollTaxesEscalatorvalue ?? 0,
                PayrollTaxesEscalatorMonth = a.bs_PayrollTaxesEscalatorMonth ?? 1,
                
                // Support Services Configuration
                PayrollSupportEnabled = a.bs_PayrollSupportEnabled ?? false,
                PayrollSupportBillingType = a.bs_PayrollSupportBillingType?.ToString() ?? string.Empty,
                PayrollSupportAmount = a.bs_PayrollSupportAmount ?? 0,
                PayrollSupportPayrollType = a.bs_PayrollSupportPayrollType?.ToString() ?? string.Empty,
                
                // Additional Configuration
                AdditionalPayrollAmount = a.bs_AdditionalPayrollAmount ?? 0,
                
                // JSON Data for Account Lists
                PayrollAccountsData = a.bs_PayrollAccountsData ?? string.Empty,
                ExpenseAccountsData = a.bs_ExpenseAccountsData ?? string.Empty
            }).ToList();
        }
    }
}
