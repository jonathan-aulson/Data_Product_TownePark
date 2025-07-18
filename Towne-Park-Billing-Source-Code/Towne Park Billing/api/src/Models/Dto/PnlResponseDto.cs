using Newtonsoft.Json;
using System.Collections.Generic;

namespace api.Models.Dto
{
    public class PnlResponseDto
    {
        [JsonProperty("year")]
        public int Year { get; set; }

        [JsonProperty("actualRows")]
        public List<PnlRowDto> ActualRows { get; set; } = new List<PnlRowDto>();

        [JsonProperty("budgetRows")]
        public List<PnlRowDto> BudgetRows { get; set; } = new List<PnlRowDto>();

        [JsonProperty("forecastRows")]
        public List<PnlRowDto> ForecastRows { get; set; } = new List<PnlRowDto>();

        [JsonProperty("varianceRows")]
        public List<PnlVarianceRowDto> VarianceRows { get; set; } = new List<PnlVarianceRowDto>();

      
    }

    public class SiteMonthlyRevenueDetailDto
    {
        [JsonProperty("siteId")]
        public string SiteId { get; set; } = string.Empty;

        [JsonProperty("internalRevenueBreakdown")]
        public InternalRevenueBreakdownDto? InternalRevenueBreakdown { get; set; } 

        [JsonProperty("externalRevenueBreakdown")]
        public ExternalRevenueBreakdownDto? ExternalRevenueBreakdown { get; set; } 

        [JsonProperty("value")]
        public decimal? Value { get; set; }

        [JsonProperty("isForecast")]
        public bool IsForecast { get; set; } 
    }

    public class PnlRowDto
    {
        [JsonProperty("columnName")]
        public string ColumnName { get; init; } = string.Empty;

        [JsonProperty("monthlyValues")]
        public List<MonthValueDto> MonthlyValues { get; init; } = new List<MonthValueDto>();

        [JsonProperty("total")]
        public decimal? Total { get; init; }

        [JsonProperty("percentOfInternalRevenue")]
        public decimal? PercentOfInternalRevenue { get; set; }
    }

    public class PnlVarianceRowDto
    {
        [JsonProperty("columnName")]
        public string ColumnName { get; init; } = default!;

        [JsonProperty("monthlyVariances")]
        public List<MonthVarianceDto> MonthlyVariances { get; init; } = new List<MonthVarianceDto>();

        [JsonProperty("totalVarianceAmount")]
        public decimal? TotalVarianceAmount { get; init; }

        [JsonProperty("totalVariancePercent")]
        public decimal? TotalVariancePercent { get; init; }

        public decimal Total { get; set; }
    }

    public class MonthValueDto
    {
        [JsonProperty("month")]
        public int Month { get; init; } 

        [JsonProperty("value")]
        public decimal? Value { get; set; }

        [JsonProperty("internalRevenueBreakdownAggregate")]
        public InternalRevenueBreakdownDto? InternalRevenueBreakdown { get; set; }

        // NEW: Site-level breakdowns for this month
        [JsonProperty("siteDetails")]
        public List<SiteMonthlyRevenueDetailDto>? SiteDetails { get; set; }
    }

    public class MonthVarianceDto
    {
        [JsonProperty("month")]
        public int Month { get; init; } 

        [JsonProperty("amount")]
        public decimal? Amount { get; init; }

        [JsonProperty("percentage")]
        public decimal? Percentage { get; init; }

        public decimal Value { get; set; }
    }

    public class RevenueComponentDto
    {
        [JsonProperty("statistic")]
        public decimal? Statistic { get; set; }

        [JsonProperty("rate")]
        public decimal? Rate { get; set; }

        [JsonProperty("value")]
        public decimal? Value { get; set; } 
    }

    // DTOs for Internal Revenue Breakdown
    public class EscalatorDto
    {
        [JsonProperty("description")]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("amount")]
        public decimal Amount { get; set; }

        [JsonProperty("isApplied")]
        public bool IsApplied { get; set; } 
    }

    public class FixedFeeInternalRevenueDto
    {
        [JsonProperty("baseAmount")]
        public decimal? BaseAmount { get; set; }

        [JsonProperty("escalators")]
        public List<EscalatorDto> Escalators { get; set; } = new List<EscalatorDto>();

        [JsonProperty("total")] 
        public decimal? Total { get; set; }
    }

    public class PerOccupiedRoomInternalRevenueDto
    {
        [JsonProperty("feePerRoom")]
        public decimal FeePerRoom { get; set; }

        [JsonProperty("forecastedRooms")]
        public decimal? ForecastedRooms { get; set; }

        [JsonProperty("budgetRooms")]
        public decimal? BudgetRooms { get; set; }

        [JsonProperty("baseRevenue")] 
        public decimal? BaseRevenue { get; set; }

        [JsonProperty("escalators")]
        public List<EscalatorDto> Escalators { get; set; } = new List<EscalatorDto>();

        [JsonProperty("total")] 
        public decimal? Total { get; set; }
    }

    public class PerLaborHourInternalRevenueDto
    {
 
        [JsonProperty("total")] 
        public decimal? Total { get; set; }
    }

    public class RevenueShareTierDto
    {
        [JsonProperty("thresholdStart")]
        public decimal? ThresholdStart { get; set; }

        [JsonProperty("thresholdEnd")]
        public decimal? ThresholdEnd { get; set; }

        [JsonProperty("percentage")]
        public decimal? Percentage { get; set; }

        [JsonProperty("revenueInTier")]
        public decimal? RevenueInTier { get; set; }

        [JsonProperty("shareAmount")] 
        public decimal? ShareAmount { get; set; }
    }

    public class RevenueShareInternalRevenueDto
    {
        [JsonProperty("forecastedExternalRevenue")]
        public decimal? ForecastedExternalRevenue { get; set; }

        [JsonProperty("tiers")]
        public List<RevenueShareTierDto> Tiers { get; set; } = new List<RevenueShareTierDto>();

        [JsonProperty("escalators")]
        public List<EscalatorDto> Escalators { get; set; } = new List<EscalatorDto>();

        [JsonProperty("total")]
        public decimal? Total { get; set; }
    }

    public class BillableAccountsInternalRevenueDto
    {
       
        [JsonProperty("total")]
        public decimal? Total { get; set; }

        [JsonProperty("pteb")]
        public PtebInternalRevenueDto? Pteb { get; set; }

        [JsonProperty("additionalPayrollAmount")]
        public decimal? AdditionalPayrollAmount { get; set; }

        [JsonProperty("supportServices")]
        public SupportServicesInternalRevenueDto? SupportServices { get; set; }

        [JsonProperty("expenseAccounts")]
        public ExpenseAccountsInternalRevenueDto? ExpenseAccounts { get; set; }
    }

    public class PtebInternalRevenueDto
    {
        [JsonProperty("total")] 
        public decimal? Total { get; set; }
        
        [JsonProperty("calculationType")] 
        public string CalculationType { get; set; } = string.Empty;
        
        [JsonProperty("baseAmount")] 
        public decimal? BaseAmount { get; set; }
        
        [JsonProperty("appliedPercentage")] 
        public decimal? AppliedPercentage { get; set; }
    }

    public class SupportServicesInternalRevenueDto
    {
        [JsonProperty("total")]
        public decimal? Total { get; set; }
    }

    public class ExpenseAccountsInternalRevenueDto
    {
        [JsonProperty("total")]
        public decimal? Total { get; set; }
    }

    public class ManagementAgreementComponentDto
    {
        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;
        [JsonProperty("value")]
        public decimal? Value { get; set; }
    }

    public class ManagementAgreementInternalRevenueDto
    {
       
        [JsonProperty("forecastedExternalRevenue")]
        public decimal? ForecastedExternalRevenue { get; set; }

        [JsonProperty("forecastedPayroll")]
        public decimal? ForecastedPayroll { get; set; }

        [JsonProperty("calculatedInsurance")]
        public decimal? CalculatedInsurance { get; set; }

        [JsonProperty("otherExpensesForecast")]
        public decimal? OtherExpensesForecast { get; set; }

        [JsonProperty("billableExpenseDelta")]
        public decimal? BillableExpenseDelta { get; set; }

        [JsonProperty("components")] 
        public List<ManagementAgreementComponentDto> Components { get; set; } = new List<ManagementAgreementComponentDto>();

        [JsonProperty("escalators")]
        public List<EscalatorDto> Escalators { get; set; } = new List<EscalatorDto>();

        [JsonProperty("total")]
        public decimal? Total { get; set; }
    }

    public class OtherRevenueInternalRevenueDto
    {
     
        [JsonProperty("total")]
        public decimal? Total { get; set; }
    }

    public class InternalRevenueBreakdownDto
    {
        [JsonProperty("fixedFee")]
        public FixedFeeInternalRevenueDto? FixedFee { get; set; }

        [JsonProperty("perOccupiedRoom")]
        public PerOccupiedRoomInternalRevenueDto? PerOccupiedRoom { get; set; }

        [JsonProperty("perLaborHour")]
        public PerLaborHourInternalRevenueDto? PerLaborHour { get; set; }

        [JsonProperty("revenueShare")]
        public RevenueShareInternalRevenueDto? RevenueShare { get; set; }

        [JsonProperty("billableAccounts")]
        public BillableAccountsInternalRevenueDto? BillableAccounts { get; set; }

        [JsonProperty("managementAgreement")]
        public ManagementAgreementInternalRevenueDto? ManagementAgreement { get; set; }

        [JsonProperty("otherRevenue")]
        public OtherRevenueInternalRevenueDto? OtherRevenue { get; set; }

        [JsonProperty("calculatedTotalInternalRevenue")] 
        public decimal? CalculatedTotalInternalRevenue { get; set; }
    }
    public class ExternalRevenueBreakdownDto
    {
        [JsonProperty("valetDaily")]
        public RevenueComponentDto? ValetDaily { get; set; }

        [JsonProperty("valetMonthly")]
        public RevenueComponentDto? ValetMonthly { get; set; }

        [JsonProperty("valetOvernight")]
        public RevenueComponentDto? ValetOvernight { get; set; }

        [JsonProperty("valetAggregator")]
        public RevenueComponentDto? ValetAggregator { get; set; }

        [JsonProperty("selfDaily")]
        public RevenueComponentDto? SelfDaily { get; set; }

        [JsonProperty("selfMonthly")]
        public RevenueComponentDto? SelfMonthly { get; set; }

        [JsonProperty("selfOvernight")]
        public RevenueComponentDto? SelfOvernight { get; set; }

        [JsonProperty("selfAggregator")]
        public RevenueComponentDto? SelfAggregator { get; set; }

        [JsonProperty("calculatedTotalExternalRevenue")]
        public decimal? CalculatedTotalExternalRevenue { get; set; }
        [JsonProperty("budgetExternalRevenue")]
        public decimal? BudgetTotalExternalRevenue { get; set; }
    }
}
