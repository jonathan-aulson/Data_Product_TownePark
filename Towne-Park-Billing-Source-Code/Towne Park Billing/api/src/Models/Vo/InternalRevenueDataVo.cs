using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using TownePark;

namespace TownePark.Models.Vo
{
    public class InternalRevenueDataVo
    {
        // Site Information
        public Guid SiteId { get; set; }
        public string SiteNumber { get; set; }
        public string SiteName { get; set; }

        // Contract Data
        public ContractDataVo Contract { get; set; }

        // Raw Statistics (Daily Data)
        public List<SiteStatisticDetailVo> SiteStatistics { get; set; }

        // Raw Revenue Data
        public List<FixedFeeVo> FixedFees { get; set; }
        public List<LaborHourJobVo> LaborHourJobs { get; set; }
        public List<RevenueShareThresholdVo> RevenueShareThresholds { get; set; }
        public List<BillableAccountVo> BillableAccounts { get; set; }
        public ManagementAgreementVo ManagementAgreement { get; set; }
        public List<OtherRevenueVo> OtherRevenues { get; set; }
        public List<NonGLExpenseVo> OtherExpenses { get; set; }
        public List<ParkingRateVo> ParkingRates { get; set; }
    }

    // Direct mappings from Dataverse entities
    public class ContractDataVo
    {
        public Guid ContractId { get; set; }
        public string ContractType { get; set; }
        public IEnumerable<bs_contracttypechoices> ContractTypes { get; set; }
        public bool IsCpiEscalatorEnabled { get; set; }
        public decimal? IncrementAmount { get; set; }
        public int? IncrementMonth { get; set; }
        public DateTime? EscalatorTriggerDate { get; set; }
        public decimal? CpiValue { get; set; }
        public decimal? OccupiedRoomRate { get; set; }
        public List<BillableAccountConfigVo> BillableAccountsData { get; set; } = new List<BillableAccountConfigVo>();
    }

    // PTEB configuration data
    public class BillableAccountConfigVo
    {
        public Guid? Id { get; set; }
        
        // Payroll Taxes (PTEB) Configuration
        public bool? PayrollTaxesEnabled { get; set; }
        public string PayrollTaxesBillingType { get; set; } = string.Empty; // "Actual" or "Percentage"
        public decimal? PayrollTaxesPercentage { get; set; }
        public bool? PayrollTaxesEscalatorEnable { get; set; }
        public int? PayrollTaxesEscalatorMonth { get; set; }
        public decimal? PayrollTaxesEscalatorValue { get; set; }
        public string PayrollTaxesEscalatorType { get; set; } = string.Empty; // "Amount" or "Percentage"
        
        // Support Services Configuration
        public bool? PayrollSupportEnabled { get; set; }
        public string PayrollSupportBillingType { get; set; } = string.Empty;
        public decimal? PayrollSupportAmount { get; set; }
        public string PayrollSupportPayrollType { get; set; } = string.Empty;
        
        // Additional Configuration
        public decimal? AdditionalPayrollAmount { get; set; }
        
        // JSON Data for Account Lists
        public string PayrollAccountsData { get; set; } = string.Empty; // JSON string of payroll accounts
        public string ExpenseAccountsData { get; set; } = string.Empty; // JSON string of expense accounts
    }

    public class SiteStatisticDetailVo
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public decimal? BaseRevenue { get; set; }
        public decimal? CaptureRatio { get; set; }
        public decimal? DriveInRatio { get; set; }
        public decimal? ExternalRevenue { get; set; }
        public decimal? Occupancy { get; set; }
        public decimal? OccupiedRooms { get; set; }
        public decimal? SelfAggregator { get; set; }
        public decimal? SelfComps { get; set; }
        public decimal? SelfDaily { get; set; }
        public decimal? SelfMonthly { get; set; }
        public decimal? SelfOvernight { get; set; }
        public decimal? SelfRateDaily { get; set; }
        public decimal? SelfRateMonthly { get; set; }
        public decimal? ValetDaily { get; set; }
        public decimal? ValetRateDaily { get; set; }
        public decimal? ValetMonthly { get; set; }
        public decimal? ValetRateMonthly { get; set; }
        public decimal? ValetOvernight { get; set; }
        public decimal? ValetAggregator { get; set; }
    }

    public class FixedFeeVo
    {
        public Guid Id { get; set; }
        public decimal Fee { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class LaborHourJobVo
    {
        public Guid Id { get; set; }
        public string JobCode { get; set; }
        public decimal Rate { get; set; }
        public decimal? Hours { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

public class RevenueShareThresholdVo
{
    public Guid Id { get; set; }
    public ThresholdStructureVo ThresholdStructure { get; set; }
    public string RevenueCodeData { get; set; } // JSON string, to be parsed in service layer
}

// Example structure for ThresholdStructureVo
public class ThresholdStructureVo
{
    public List<ThresholdTierVo> Tiers { get; set; }
}

public class ThresholdTierVo
{
        [JsonPropertyName("SharePercentage")]
        public decimal SharePercentage { get; set; }

        [JsonPropertyName("Amount")]
        public decimal Amount { get; set; }
    public DateTime? EffectiveFrom { get; set; }
    public DateTime? EffectiveTo { get; set; }
}

public class BillableAccountVo
    {
        public Guid Id { get; set; }
        public string AccountCode { get; set; }
        public decimal Amount { get; set; }
        public bool IsExcluded { get; set; }
    }

    public class ManagementAgreementVo
    {
        public Guid Id { get; set; }
        public decimal? ConfiguredFee { get; set; }
        public decimal? InsuranceAddlAmount { get; set; }
        public List<string> BillableExpenseAccounts { get; set; }
    }

    public class OtherRevenueVo
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Period { get; set; }
    }

    public class NonGLExpenseVo
    {
        public Guid Id { get; set; }
        public string ExpenseType { get; set; }
        public decimal Amount { get; set; }
        public DateTime Period { get; set; }
    }
    public class JobCodeVo
    {
        public string? Code { get; set; }
        public string? Description { get; set; }
        public decimal? StandardRate { get; set; }
        public decimal? OvertimeRate { get; set; }
        public decimal? StandardRateEscalatorValue { get; set; }
        public decimal? OvertimeRateEscalatorValue { get; set; }
    }

    public class ParkingRateVo
    {
        public Guid Id { get; set; }
        public Guid SiteId { get; set; }
        public int Year { get; set; }
        public List<ParkingRateDetailVo> Details { get; set; }
    }

    public class ParkingRateDetailVo
    {
        public Guid Id { get; set; }
        public int Month { get; set; }
        public decimal Rate { get; set; }
        public TownePark.bs_ratecategorytypes RateCategory { get; set; }
    }
}
