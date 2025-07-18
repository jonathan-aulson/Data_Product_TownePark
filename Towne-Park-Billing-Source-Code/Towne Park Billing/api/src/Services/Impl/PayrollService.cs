using api.Adapters.Mappers;
using api.Data;
using api.Models.Vo;
using TownePark;
using System.Linq;

namespace api.Services.Impl
{
    public class PayrollService : IPayrollService
    {
        private readonly IPayrollRepository _payrollRepository;
        private readonly IContractRepository _contractRepository;
        private readonly IJobCodeRepository _jobCodeRepository;
        private readonly ICustomerRepository _customerRepository;

        public PayrollService(IPayrollRepository payrollRepository, IContractRepository contractRepository, IJobCodeRepository jobCodeRepository, ICustomerRepository customerRepository)
        {
            _payrollRepository = payrollRepository;
            _contractRepository = contractRepository;
            _jobCodeRepository = jobCodeRepository;
            _customerRepository = customerRepository;
        }

        public PayrollVo? GetPayroll(Guid siteId, string billingPeriod)
        {
            var payrollModel = _payrollRepository.GetPayroll(siteId, billingPeriod);

            PayrollVo vo;
            bs_Payroll modelForForecast;

            if (payrollModel == null)
            {
                // Create a new PayrollVo with minimal info
                vo = new PayrollVo
                {
                    CustomerSiteId = siteId,
                    BillingPeriod = billingPeriod,
                    ForecastPayroll = new List<JobGroupForecastVo>(),
                    SiteNumber = _customerRepository.GetCustomerDetail(siteId).bs_SiteNumber
                };

                // Set PayrollForecastMode based on contract type
                string contractType = _contractRepository.GetContractTypeStringByCustomerSite(siteId);
                vo.PayrollForecastMode = contractType == "Per Labor Hour"
                    ? PayrollForecastModeType.Code
                    : PayrollForecastModeType.Group;

                // Use empty payroll model for forecast aggregation
                modelForForecast = new bs_Payroll();
            }
            else
            {
                vo = PayrollMapper.PayrollModelToVo(payrollModel);

                // If PayrollForecastMode is not set in the model, determine it from contract type
                if (!payrollModel.bs_PayrollForecastMode.HasValue)
                {
                    string contractType = _contractRepository.GetContractTypeStringByCustomerSite(siteId);
                    vo.PayrollForecastMode = contractType == "Per Labor Hour"
                        ? PayrollForecastModeType.Code
                        : PayrollForecastModeType.Group;
                }

                modelForForecast = payrollModel;
            }

            // Query job codes by site for accurate mock data
            var jobCodesBySite = _jobCodeRepository.GetJobCodesBySiteAsync(siteId).GetAwaiter().GetResult();
            var jobCodeAssignments = jobCodesBySite
                .Where(jc => !string.IsNullOrEmpty(jc.JobGroupId))
                .Select(jc => (
                    JobGroupId: Guid.Parse(jc.JobGroupId),
                    JobGroupName: jc.JobGroupName ?? string.Empty,
                    JobCodeId: jc.JobCodeId,
                    JobCode: jc.JobCode,
                    DisplayName: jc.JobTitle,
                    AllocatedSalaryCost: jc.AllocatedSalaryCost,
                    ActiveEmployeeCount: jc.ActiveEmployeeCount,
                    AverageHourlyRate: jc.AverageHourlyRate
                ));

            var edwBudget = _payrollRepository.GetBudgetPayrollFromEDW(vo.SiteNumber, int.Parse(billingPeriod.Substring(0, 4)), int.Parse(billingPeriod.Substring(5, 2)));
            var edwActuals = _payrollRepository.GetActualPayrollFromEDW(vo.SiteNumber, int.Parse(billingPeriod.Substring(0, 4)), int.Parse(billingPeriod.Substring(5, 2)));
            var edwSchedule = _payrollRepository.GetSchedulePayrollFromEDW(vo.SiteNumber, int.Parse(billingPeriod.Substring(0, 4)), int.Parse(billingPeriod.Substring(5, 2)));
            vo.ActualPayroll = MapEdwActualsToJobGroupActuals(edwActuals.Result, jobCodeAssignments, billingPeriod);
            vo.BudgetPayroll = MapEdwBudgetToJobGroupActuals(edwBudget.Result, jobCodeAssignments, billingPeriod);
            vo.ScheduledPayroll = MapEdwScheduleToJobGroupScheduled(edwSchedule.Result, jobCodeAssignments, billingPeriod);

            // Always aggregate as job groups with nested job codes
            vo.ForecastPayroll = AggregateForecastPayroll(modelForForecast, jobCodeAssignments);

            return vo;
        }

        private List<JobGroupForecastVo> AggregateForecastPayroll(
            bs_Payroll payrollModel,
            IEnumerable<(Guid JobGroupId, string JobGroupName, Guid JobCodeId, string JobCode, string DisplayName, decimal? AllocatedSalaryCost, decimal ActiveEmployeeCount, decimal? AverageHourlyRate)> jobCodeAssignments)
        {
            var details = payrollModel.bs_PayrollDetail_Payroll?.ToList() ?? new List<bs_PayrollDetail>();
            if (details == null || details.Count == 0 || jobCodeAssignments == null)
                return new List<JobGroupForecastVo>();

            // Parse billing period from details (assume all details are for the same period)
            var anyDate = details.FirstOrDefault(d => d.bs_Date.HasValue)?.bs_Date;
            int year, month;
            if (anyDate != null)
            {
                year = anyDate.Value.Year;
                month = anyDate.Value.Month;
            }
            else
            {
                // fallback: try to parse from first detail's string property if available, else return empty
                return new List<JobGroupForecastVo>();
            }
            var daysInMonth = DateTime.DaysInMonth(year, month);

            var groupedAssignments = jobCodeAssignments
                .GroupBy(jc => new { jc.JobGroupId, jc.JobGroupName })
                .ToList();

            var result = new List<JobGroupForecastVo>();

            for (int day = 1; day <= daysInMonth; day++)
            {
                var currentDate = new DateOnly(year, month, day);

                foreach (var group in groupedAssignments)
                {
                    var jobCodes = new List<JobCodeForecastVo>();

                    foreach (var jc in group)
                    {
                        // Find all payroll details for this job code and date
                        var matchingDetails = details
                            .Where(d =>
                                d.bs_JobCodeFK != null &&
                                d.bs_JobCodeFK.Id == jc.JobCodeId &&
                                d.bs_Date.HasValue &&
                                DateOnly.FromDateTime(d.bs_Date.Value) == currentDate)
                            .ToList();

                        if (!matchingDetails.Any())
                            continue;

                        foreach (var detail in matchingDetails)
                        {
                            jobCodes.Add(new JobCodeForecastVo
                            {
                                Id = detail.Id,
                                JobCodeId = jc.JobCodeId,
                                JobCode = jc.JobCode,
                                DisplayName = jc.DisplayName ?? "Assigned",
                                ForecastHours = detail.bs_RegularHours ?? 0,
                                Date = currentDate,
                                ForecastPayrollCost = detail.bs_ForecastPayrollCost,
                                ForecastPayrollRevenue = detail.bs_ForecastPayrollRevenue
                            });
                        }
                    }

                    if (!jobCodes.Any())
                        continue;

                    result.Add(new JobGroupForecastVo
                    {
                        Id = null,
                        JobGroupId = group.Key.JobGroupId,
                        JobGroupName = group.Key.JobGroupName,
                        ForecastHours = jobCodes.Sum(jc => jc.ForecastHours),
                        Date = currentDate,
                        JobCodes = jobCodes,
                        ForecastPayrollCost = jobCodes.Sum(jc => jc.ForecastPayrollCost ?? 0),
                        ForecastPayrollRevenue = jobCodes.Sum(jc => jc.ForecastPayrollRevenue ?? 0)
                    });
                }
            }

            return result;
        }

        public List<JobGroupBudgetVo> MapEdwBudgetToJobGroupActuals(
            EDWPayrollBudgetDataVo edwBudget,
            IEnumerable<(Guid JobGroupId, string JobGroupName, Guid JobCodeId, string JobCode, string DisplayName, decimal? AllocatedSalaryCost, decimal ActiveEmployeeCount, decimal? AverageHourlyRate)> jobCodesBySite,
            string billingPeriod)
        {
            if (edwBudget == null || edwBudget.Records == null || jobCodesBySite == null)
                return new List<JobGroupBudgetVo>();

            var grouped = jobCodesBySite
                .GroupBy(jc => new { jc.JobGroupId, jc.JobGroupName })
                .ToList();

            var parts = billingPeriod.Split('-');
            var year = int.Parse(parts[0]);
            var month = int.Parse(parts[1]);
            var daysInMonth = DateTime.DaysInMonth(year, month);

            var result = new List<JobGroupBudgetVo>();

            for (int day = 1; day <= daysInMonth; day++)
            {
                var currentDate = new DateOnly(year, month, day);

                foreach (var group in grouped)
                {
                    var jobCodes = group.Select(jc =>
                    {
                        var edwRecord = edwBudget.Records.FirstOrDefault(r => r.JOB_PROFILE == jc.JobCode);
                        decimal hoursPerDay = edwRecord != null ? edwRecord.TOTAL_HOURS / daysInMonth : 0;
                        decimal costPerDay = edwRecord != null ? edwRecord.TOTAL_COST / daysInMonth : 0;

                        return new JobCodeBudgetVo
                        {
                            JobCodeId = jc.JobCodeId,
                            JobCode = jc.JobCode,
                            DisplayName = jc.DisplayName,
                            BudgetHours = jc.AllocatedSalaryCost != null ? 8 * jc.ActiveEmployeeCount : hoursPerDay,
                            Date = currentDate,
                            BudgetPayrollCost = costPerDay,
                            BudgetPayrollRevenue = null // Set if available in EDW
                        };
                    }).ToList();

                    result.Add(new JobGroupBudgetVo
                    {
                        JobGroupId = group.Key.JobGroupId,
                        JobGroupName = group.Key.JobGroupName,
                        BudgetHours = jobCodes.Sum(jc => jc.BudgetHours),
                        Date = currentDate,
                        JobCodes = jobCodes,
                        BudgetPayrollCost = jobCodes.Sum(jc => jc.BudgetPayrollCost ?? 0),
                        BudgetPayrollRevenue = jobCodes.Sum(jc => jc.BudgetPayrollRevenue ?? 0)
                    });
                }
            }

            return result;
        }

        // Map EDW actuals to JobGroupActualVo by date and job code (sum all rows for same job code and date)
        protected virtual List<JobGroupActualVo> MapEdwActualsToJobGroupActuals(
            EDWPayrollActualDataVo edwActuals,
            IEnumerable<(Guid JobGroupId, string JobGroupName, Guid JobCodeId, string JobCode, string DisplayName, decimal? AllocatedSalaryCost, decimal ActiveEmployeeCount, decimal? AverageHourlyRate)> jobCodesBySite,
            string billingPeriod)
        {
            var grouped = jobCodesBySite
                .GroupBy(jc => new { jc.JobGroupId, jc.JobGroupName })
                .ToList();

            var parts = billingPeriod.Split('-');
            var year = int.Parse(parts[0]);
            var month = int.Parse(parts[1]);
            var today = DateOnly.FromDateTime(DateTime.Now);
            var billingMonth = new DateOnly(year, month, 1);

            // Only include up to today if current month, otherwise full month
            var lastDay = billingMonth.Year == today.Year && billingMonth.Month == today.Month
                ? today.Day
                : DateTime.DaysInMonth(year, month);

            var result = new List<JobGroupActualVo>();

            for (int day = 1; day <= lastDay; day++)
            {
                var currentDate = new DateOnly(year, month, day);

                foreach (var group in grouped)
                {
                    var jobCodes = group.Select(jc =>
                    {
                        // Sum all actual records for this job code and date
                        var actuals = edwActuals?.Records
                            .Where(r =>
                                r.JobCode == jc.JobCode &&
                                r.Date.Date == currentDate.ToDateTime(TimeOnly.MinValue).Date)
                            .ToList();

                        var totalHours = actuals?.Sum(a => a.Hours) ?? 0;
                        var totalCost = actuals?.Sum(a => a.Cost) ?? 0;

                        return new JobCodeActualVo
                        {
                            JobCodeId = jc.JobCodeId,
                            JobCode = jc.JobCode,
                            DisplayName = jc.DisplayName,
                            ActualHours = totalHours,
                            Date = currentDate,
                            ActualPayrollCost = totalCost,
                            ActualPayrollRevenue = null // Not available in EDW actuals
                        };
                    }).ToList();

                    result.Add(new JobGroupActualVo
                    {
                        JobGroupId = group.Key.JobGroupId,
                        JobGroupName = group.Key.JobGroupName,
                        ActualHours = jobCodes.Sum(jc => jc.ActualHours),
                        Date = currentDate,
                        JobCodes = jobCodes,
                        ActualPayrollCost = jobCodes.Sum(jc => jc.ActualPayrollCost ?? 0),
                        ActualPayrollRevenue = jobCodes.Sum(jc => jc.ActualPayrollRevenue ?? 0)
                    });
                }
            }

            return result;
        }

        // Map EDW schedule data to JobGroupScheduledVo by date and job code (sum all rows for same job code and date)
        protected virtual List<JobGroupScheduledVo> MapEdwScheduleToJobGroupScheduled(
            EDWPayrollActualDataVo edwSchedule,
            IEnumerable<(Guid JobGroupId, string JobGroupName, Guid JobCodeId, string JobCode, string DisplayName, decimal? AllocatedSalaryCost, decimal ActiveEmployeeCount, decimal? AverageHourlyRate)> jobCodesBySite,
            string billingPeriod)
        {
            if (edwSchedule == null || edwSchedule.Records == null || jobCodesBySite == null)
                return new List<JobGroupScheduledVo>();

            var grouped = jobCodesBySite
                .GroupBy(jc => new { jc.JobGroupId, jc.JobGroupName })
                .ToList();

            var parts = billingPeriod.Split('-');
            var year = int.Parse(parts[0]);
            var month = int.Parse(parts[1]);
            var daysInMonth = DateTime.DaysInMonth(year, month);

            var result = new List<JobGroupScheduledVo>();

            for (int day = 1; day <= daysInMonth; day++)
            {
                var currentDate = new DateOnly(year, month, day);

                foreach (var group in grouped)
                {
                    // For this group and date, get all job codes in the group
                    var jobCodes = group.Select(jc =>
                    {
                        // Sum all schedule records for this job code and date
                        var schedules = edwSchedule.Records
                            .Where(r =>
                                r.JobCode == jc.JobCode &&
                                r.Date.Date == currentDate.ToDateTime(TimeOnly.MinValue).Date)
                            .ToList();

                        var totalHours = schedules.Sum(s => s.Hours);
                        var totalCost = schedules.Sum(s => s.Cost);

                        return new JobCodeScheduledVo
                        {
                            JobCodeId = jc.JobCodeId,
                            JobCode = jc.JobCode,
                            DisplayName = jc.DisplayName,
                            ScheduledHours = totalHours,
                            Date = currentDate,
                            ScheduledPayrollCost = jc.AllocatedSalaryCost != null ? jc.AllocatedSalaryCost / 365 : (jc.AverageHourlyRate ?? 0) * totalHours,
                            ScheduledPayrollRevenue = null // Not available in EDW schedule
                        };
                    }).ToList();

                    result.Add(new JobGroupScheduledVo
                    {
                        JobGroupId = group.Key.JobGroupId,
                        JobGroupName = group.Key.JobGroupName,
                        ScheduledHours = jobCodes.Sum(jc => jc.ScheduledHours),
                        Date = currentDate,
                        JobCodes = jobCodes,
                        ScheduledPayrollCost = jobCodes.Sum(jc => jc.ScheduledPayrollCost ?? 0),
                        ScheduledPayrollRevenue = jobCodes.Sum(jc => jc.ScheduledPayrollRevenue ?? 0)
                    });
                }
            }

            return result;
        }

        public void SavePayroll(PayrollVo updates)
        {
            bs_Payroll updateModel = PayrollMapper.PayrollVoToModel(updates);
            _payrollRepository.UpsertPayroll(updateModel, updates.CustomerSiteId, updates.BillingPeriod);
        }
    }
}
