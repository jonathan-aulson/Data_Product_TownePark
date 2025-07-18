using System;
using System.Collections.Generic;
using System.Linq;
using TownePark.Models.Vo;
using api.Models.Dto;
using api.Data;
using TownePark;

namespace api.Services.Impl.Calculators
{
    public class PerLaborHourCalculator : IInternalRevenueCalculator
    {
        private readonly IPayrollRepository _payrollRepository;

        public PerLaborHourCalculator(IPayrollRepository payrollRepository)
        {
            _payrollRepository = payrollRepository;
        }

        public void CalculateAndApply(
            InternalRevenueDataVo siteData,
            int year,
            int monthOneBased,
            MonthValueDto monthValueDto,
            SiteMonthlyRevenueDetailDto siteDetailDto,
            decimal calculatedExternalRevenue,
            List<PnlRowDto> budgetRows)
        {
            var perLaborHourRevenue = CalculateMonthlyPerLaborHourRevenueForSite(siteData, year, monthOneBased, calculatedExternalRevenue, monthValueDto, budgetRows);

            if (siteDetailDto.InternalRevenueBreakdown == null)
            {
                siteDetailDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();
            }
            siteDetailDto.InternalRevenueBreakdown.PerLaborHour = perLaborHourRevenue;

            // Hybrid approach: set CalculatedTotalInternalRevenue at site level
            var breakdown = siteDetailDto.InternalRevenueBreakdown;
            decimal total = 0m;
            if (breakdown.FixedFee?.Total != null) total += breakdown.FixedFee.Total.Value;
            if (breakdown.PerOccupiedRoom?.Total != null) total += breakdown.PerOccupiedRoom.Total.Value;
            if (breakdown.RevenueShare?.Total != null) total += breakdown.RevenueShare.Total.Value;
            if (breakdown.PerLaborHour?.Total != null) total += breakdown.PerLaborHour.Total.Value;
            if (breakdown.BillableAccounts?.Total != null) total += breakdown.BillableAccounts.Total.Value;
            if (breakdown.ManagementAgreement?.Total != null) total += breakdown.ManagementAgreement.Total.Value;
            if (breakdown.OtherRevenue?.Total != null) total += breakdown.OtherRevenue.Total.Value;
            breakdown.CalculatedTotalInternalRevenue = total;
        }

        public void AggregateMonthlyTotals(List<SiteMonthlyRevenueDetailDto> siteDetailsForMonth, MonthValueDto monthValueDto)
        {
            decimal totalPerLaborHourForMonth = 0m;

            foreach (var siteDetail in siteDetailsForMonth)
            {
                if (siteDetail.InternalRevenueBreakdown?.PerLaborHour != null)
                {
                    var perLaborHour = siteDetail.InternalRevenueBreakdown.PerLaborHour;
                    totalPerLaborHourForMonth += perLaborHour.Total ?? 0m;
                }
            }

            if (monthValueDto.InternalRevenueBreakdown == null)
                monthValueDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();

            monthValueDto.InternalRevenueBreakdown.PerLaborHour = new PerLaborHourInternalRevenueDto
            {
                Total = totalPerLaborHourForMonth
            };

            monthValueDto.Value = (monthValueDto.InternalRevenueBreakdown.PerLaborHour?.Total ?? 0m)
                + (monthValueDto.InternalRevenueBreakdown.FixedFee?.Total ?? 0m)
                + (monthValueDto.InternalRevenueBreakdown.PerOccupiedRoom?.Total ?? 0m)
                + (monthValueDto.InternalRevenueBreakdown.RevenueShare?.Total ?? 0m);
        }

        private PerLaborHourInternalRevenueDto CalculateMonthlyPerLaborHourRevenueForSite(
            InternalRevenueDataVo siteData, int targetYear, int targetMonthOneBased, decimal calculatedExternalRevenue, MonthValueDto monthValueDto, List<PnlRowDto> budgetRows)
        {
            DateTime firstDayOfCalculationMonth = new DateTime(targetYear, targetMonthOneBased, 1);
            var contract = siteData.Contract;
            bool hasEscalatorRule = contract != null && contract.IncrementMonth.HasValue && contract.IncrementAmount.HasValue && contract.IncrementAmount.Value != 0;
            decimal escalatorPercent = hasEscalatorRule ? contract.IncrementAmount.Value / 100m : 0m;

            decimal totalOriginalBaseLaborThisMonth = 0m;
            decimal totalEscalatedValueAtStartOfTargetYear = 0m;

            // Get payroll for the site and period (format: yyyyMM)
            string billingPeriod = $"{targetYear}-{targetMonthOneBased:D2}";
            var payroll = _payrollRepository.GetPayroll(siteData.SiteId, billingPeriod);

            // Aggregate hours by job code for the month
            var jobCodeToHours = new Dictionary<string, decimal>();
            if (payroll != null && payroll.bs_PayrollDetail_Payroll != null)
            {
                foreach (var detail in payroll.bs_PayrollDetail_Payroll)
                {
                    var jobCode = detail.Contains("jobcode_display") ? detail["jobcode_display"]?.ToString() : null;
                    if (string.IsNullOrEmpty(jobCode)) continue;

                    var hours = detail.Contains(bs_PayrollDetail.Fields.bs_RegularHours) ? (decimal?)detail[bs_PayrollDetail.Fields.bs_RegularHours] : null;
                    if (!hours.HasValue) continue;

                    if (!jobCodeToHours.ContainsKey(jobCode))
                        jobCodeToHours[jobCode] = 0m;
                    jobCodeToHours[jobCode] += hours.Value;
                }
            }

            if (siteData.LaborHourJobs != null)
            {
                foreach (var job in siteData.LaborHourJobs)
                {
                    // Only consider jobs active for this month
                    if (!(job.StartDate.Date <= firstDayOfCalculationMonth && (job.EndDate == null || job.EndDate >= firstDayOfCalculationMonth)))
                        continue;

                    // Match job code
                    decimal jobHours = 0m;
                    if (jobCodeToHours.TryGetValue(job.JobCode, out var hours))
                        jobHours = hours;
                    else
                    {
                        // Fallback to budget hours if no payroll hours found
                        // this does not currently work since it tries to get the 'expense' value for the month instead of hours budgeted for each job code
                        jobHours = GetBudgetHoursForJobCode(budgetRows, job.JobCode, siteData.SiteNumber, targetMonthOneBased);
                    }

                    decimal baseLabor = jobHours * job.Rate;
                    totalOriginalBaseLaborThisMonth += baseLabor;
                    decimal laborValueAfterHistoricalEsc = baseLabor;

                    // Compound escalators for each year from job start up to (but not including) targetYear
                    if (hasEscalatorRule)
                    {
                        for (int escalationYear = job.StartDate.Year; escalationYear < targetYear; escalationYear++)
                        {
                            var escalatorApplicationDate = new DateTime(escalationYear, contract.IncrementMonth.Value, 1);
                            // Only escalate if job was active during the increment month of that year
                            if (job.StartDate <= escalatorApplicationDate && (job.EndDate == null || job.EndDate >= escalatorApplicationDate))
                            {
                                decimal historicalEscalatorAmount = laborValueAfterHistoricalEsc * escalatorPercent;
                                laborValueAfterHistoricalEsc += historicalEscalatorAmount;
                                // No need to add to escalatorsList
                            }
                        }
                    }
                    totalEscalatedValueAtStartOfTargetYear += laborValueAfterHistoricalEsc;
                }
            }

            decimal finalAmountForMonth = totalEscalatedValueAtStartOfTargetYear;

            // Apply the targetYear's own escalator if this month is on/after increment month
            if (hasEscalatorRule && targetMonthOneBased >= contract.IncrementMonth.Value)
            {
                if (totalEscalatedValueAtStartOfTargetYear > 0)
                {
                    decimal escalatorValueAppliedThisMonth = totalEscalatedValueAtStartOfTargetYear * escalatorPercent;
                    finalAmountForMonth += escalatorValueAppliedThisMonth;
                    // No need to add to escalatorsList
                }
            }

            return new PerLaborHourInternalRevenueDto
            {
                Total = finalAmountForMonth
            };
        }

        // Helper to get budget hours for a job code from budgetRows
        private decimal GetBudgetHoursForJobCode(List<PnlRowDto> budgetRows, string jobCode, string siteNumber, int monthOneBased)
        {
            if (budgetRows == null)
                return 0m;

            // Find the budget row for PerLaborHour (column name may need to match your actual config)
            var laborHourRow = budgetRows.FirstOrDefault(r => r.ColumnName == "PerLaborHour");
            if (laborHourRow == null)
                return 0m;

            var monthValue = laborHourRow.MonthlyValues?.FirstOrDefault(mv => mv.Month == monthOneBased - 1);
            if (monthValue == null)
                return 0m;

            // Find the site detail for this site
            var siteDetail = monthValue.SiteDetails?.FirstOrDefault(sd => sd.SiteId == siteNumber);
            if (siteDetail == null || siteDetail.InternalRevenueBreakdown?.PerLaborHour == null)
                return 0m;

            // If your DTO supports job code breakdown, extract it here. Otherwise, fallback to total.
            // For now, fallback to total budget hours for PerLaborHour for the site/month.
            return siteDetail.InternalRevenueBreakdown.PerLaborHour.Total ?? 0m;
        }
    }
}
