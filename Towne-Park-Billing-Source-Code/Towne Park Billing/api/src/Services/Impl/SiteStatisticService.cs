using api.Adapters.Mappers;
using api.Data;
using api.Models.Vo;
using api.Models.Vo.Enum;
using api.Usecases;
using System.Globalization;
using TownePark;

namespace api.Services.Impl
{
    public class SiteStatisticService : ISiteStatisticService
    {
        private readonly ISiteStatisticRepository _siteStatisticRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IMonthRangeGenerator _monthRangeGenerator;

        public SiteStatisticService(ISiteStatisticRepository siteStatisticRepository, ICustomerRepository customerRepository, IMonthRangeGenerator monthRangeGenerator)
        {
            _siteStatisticRepository = siteStatisticRepository;
            _customerRepository = customerRepository;
            _monthRangeGenerator = monthRangeGenerator;
        }

        public async Task<IEnumerable<SiteStatisticVo>> GetSiteStatistics(Guid siteId, string billingPeriod, string timeRange)
        {
            IEnumerable<SiteStatisticVo>? siteStatistics;
            string range = timeRange.ToUpper();

            siteStatistics = range switch
            {
                "WEEKLY" => await GetWeeklySiteStatistics(siteId, billingPeriod),
                "MONTHLY" => await GetMonthlySiteStatistics(siteId, billingPeriod),
                _ => GetDailySiteStatistics(siteId, billingPeriod)
            };

            return siteStatistics?.ToList() ?? new List<SiteStatisticVo>();
        }

        private IEnumerable<SiteStatisticVo>? GetDailySiteStatistics(Guid siteId, string billingPeriod)
        {
            // Generate a 3-month range starting from billingPeriod (format: yyyy-MM)
            var months = _monthRangeGenerator.GenerateMonthRange(billingPeriod, 3);

            var allSiteStatistics = new List<SiteStatisticVo>();

            foreach (var month in months)
            {
                var monthlyStats = _siteStatisticRepository.GetSiteStatistics(siteId, month);
                var siteStatisticsList = new List<bs_SiteStatistic>();
                if (monthlyStats != null)
                {
                    siteStatisticsList.Add(monthlyStats);
                }
                var siteStatisticsVos = SiteStatisticMapper.SiteStatisticModelToVo(siteStatisticsList)?.ToList() ?? new List<SiteStatisticVo>();

                if (!siteStatisticsVos.Any())
                {
                    var customerDetail = _customerRepository.GetCustomerDetail(siteId);
                    var emptyVo = new SiteStatisticVo
                    {
                        CustomerSiteId = (Guid)customerDetail.bs_CustomerSiteId,
                        SiteNumber = customerDetail.bs_SiteNumber,
                        PeriodLabel = month,
                        TotalRooms = int.TryParse(customerDetail.bs_TotalRoomsAvailable, out var totalRooms) ? totalRooms : 0
                    };
                    siteStatisticsVos.Add(emptyVo);
                }

                foreach (var siteStatistic in siteStatisticsVos)
                {
                    siteStatistic.TimeRangeType = TimeRangeType.DAILY;
                }

                allSiteStatistics.AddRange(siteStatisticsVos);
            }

            // Sort by period label to ensure correct chronological order
            allSiteStatistics = allSiteStatistics.OrderBy(s => s.PeriodLabel).ToList();

            // Get budget data for all months in a single call
            if (allSiteStatistics.Any() && !string.IsNullOrEmpty(allSiteStatistics.First().SiteNumber))
            {
                var siteNumber = allSiteStatistics.First().SiteNumber;
                var budgetData = _siteStatisticRepository.GetBudgetDataForRange(siteNumber, months).Result;

                // Group budget data by period
                var budgetDataByPeriod = budgetData
                    .GroupBy(b => b.Date.ToString("yyyy-MM"))
                    .ToDictionary(g => g.Key, g => g.ToList());

                // Assign budget data to each site statistic
                foreach (var siteStatistic in allSiteStatistics)
                {
                    if (!string.IsNullOrEmpty(siteStatistic.PeriodLabel) && 
                        budgetDataByPeriod.TryGetValue(siteStatistic.PeriodLabel, out var periodBudgetData))
                    {
                        siteStatistic.BudgetData = periodBudgetData;

                        foreach (var budget in siteStatistic.BudgetData)
                        {
                            budget.PeriodLabel = budget.Date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
                        }
                    }
                }
            }

            return allSiteStatistics;
        }

        private async Task<IEnumerable<SiteStatisticVo>?> GetWeeklySiteStatistics(Guid siteId, string billingPeriod)
        {
            var weeklySiteStatistics = _siteStatisticRepository.GetSiteStatisticsByRange(siteId, billingPeriod, 3);

            var siteStatisticsList = weeklySiteStatistics?.ToList() ?? new List<bs_SiteStatistic>();
            var siteStatisticsVos = SiteStatisticMapper.SiteStatisticModelToVo(siteStatisticsList)?.ToList() ?? new List<SiteStatisticVo>();

            var months = _monthRangeGenerator.GenerateMonthRange(billingPeriod, 3);
            foreach (var month in months)
            {
                var siteStatisticsForMonth = siteStatisticsVos
                    .Where(s => s.PeriodLabel == month)
                    .ToList();
                if(!siteStatisticsForMonth.Any())
                {
                    var customerDetail = _customerRepository.GetCustomerDetail(siteId);
                    var emptyVo = new SiteStatisticVo
                    {
                        CustomerSiteId = (Guid)customerDetail.bs_CustomerSiteId,
                        SiteNumber = customerDetail.bs_SiteNumber,
                        PeriodLabel = month,
                        TotalRooms = int.TryParse(customerDetail.bs_TotalRoomsAvailable, out var totalRooms) ? totalRooms : 0
                    };
                    siteStatisticsVos.Add(emptyVo);
                }
            }

            // Sort by period label to ensure correct chronological order
            siteStatisticsVos = siteStatisticsVos.OrderBy(s => s.PeriodLabel).ToList();

            // Get budget data for all months in a single call
            if (siteStatisticsVos.Any() && !string.IsNullOrEmpty(siteStatisticsVos.First().SiteNumber))
            {
                var siteNumber = siteStatisticsVos.First().SiteNumber;
                var budgetData = await _siteStatisticRepository.GetBudgetDataForRange(siteNumber, months);

                // Group budget data by period
                var budgetDataByPeriod = budgetData
                    .GroupBy(b => b.Date.ToString("yyyy-MM"))
                    .ToDictionary(g => g.Key, g => g.ToList());

                // Assign budget data to each site statistic
                foreach (var siteStatistic in siteStatisticsVos)
                {
                    if (!string.IsNullOrEmpty(siteStatistic.PeriodLabel) && 
                        budgetDataByPeriod.TryGetValue(siteStatistic.PeriodLabel, out var periodBudgetData))
                    {
                        siteStatistic.BudgetData = periodBudgetData;
                    }
                }
            }

            foreach (var siteStatistic in siteStatisticsVos)
            {
                siteStatistic.TimeRangeType = TimeRangeType.WEEKLY;

                if (!DateTime.TryParseExact(siteStatistic.PeriodLabel, "yyyy-MM", CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out DateTime periodDate))
                {
                    throw new ArgumentException("Invalid billing period format. Expected yyyy-MM", nameof(billingPeriod));
                }

                var weeklyPeriods = GenerateWeeklyPeriods(periodDate.Year, periodDate.Month);
                var weeklyForecastDetails = new List<SiteStatisticDetailVo>();
                var weeklyBudgetDetails = new List<SiteStatisticDetailVo>();

                foreach (var (periodLabel, startDate, endDate) in weeklyPeriods)
                {
                    var weekForecastDetails = new List<SiteStatisticDetailVo>();
                    var weekBudgetDetails = new List<SiteStatisticDetailVo>();

                    weekBudgetDetails = siteStatistic.BudgetData?
                        .Where(d => d.Date >= startDate && d.Date <= endDate)
                        .ToList() ?? new List<SiteStatisticDetailVo>();

                    weekForecastDetails = siteStatistic.ForecastData?
                        .Where(d => d.Date >= startDate && d.Date <= endDate)
                        .ToList() ?? new List<SiteStatisticDetailVo>();

                    var weeklyForecastAggregate = CreateAggregate(weekForecastDetails, periodLabel, startDate, endDate, SiteStatisticDetailType.Forecast);
                    var weeklyBudgetAggregate = CreateAggregate(weekBudgetDetails, periodLabel, startDate, endDate, SiteStatisticDetailType.Budget);

                    weeklyForecastDetails.Add(weeklyForecastAggregate);
                    weeklyBudgetDetails.Add(weeklyBudgetAggregate);
                }

                // Replace the original data with weekly aggregates
                siteStatistic.BudgetData = weeklyBudgetDetails;
                if (siteStatistic.ForecastData != null)
                {
                    siteStatistic.ForecastData = weeklyForecastDetails;
                }
                else
                {
                    siteStatistic.ForecastData = [];
                }
            }

            return siteStatisticsVos;
        }

        private SiteStatisticDetailVo CreateAggregate(
            List<SiteStatisticDetailVo> details,
            string periodLabel,
            DateOnly startDate,
            DateOnly endDate,
            SiteStatisticDetailType detailType)
        {
            if(details.Count() == 0)
            {
                return null;
            }
            // Weighted average for occupancy (if Occupancy and OccupiedRooms are available)
            double totalOccupiedRooms = details.Sum(d => Convert.ToDouble(d.OccupiedRooms));
            double totalAvailableRooms = details
                .Where(d => Convert.ToDouble(d.Occupancy) > 0)
                .Sum(d => Convert.ToDouble(d.OccupiedRooms) / Convert.ToDouble(d.Occupancy));

            double aggregatedOccupancy = (totalAvailableRooms > 0) ? totalOccupiedRooms / totalAvailableRooms : 0;

            // Arithmetic mean for driveInRatio and captureRatio (doubles)
            var driveInRatios = details.Select(d => d.DriveInRatio).ToList();
            var captureRatios = details.Select(d => d.CaptureRatio).ToList();

            double aggregatedDriveInRatio = driveInRatios.Count > 0 ? driveInRatios.Average() : 0;
            double aggregatedCaptureRatio = captureRatios.Count > 0 ? captureRatios.Average() : 0;

            return new SiteStatisticDetailVo
            {
                Type = detailType,
                PeriodStart = startDate,
                PeriodEnd = endDate,
                PeriodLabel = periodLabel,

                // Sum values (ensure decimal)
                BaseRevenue = Convert.ToDecimal(details.Sum(d => d.BaseRevenue)),
                OccupiedRooms = Convert.ToDecimal(details.Sum(d => d.OccupiedRooms)),
                SelfOvernight = Convert.ToDecimal(details.Sum(d => d.SelfOvernight)),
                ValetOvernight = Convert.ToDecimal(details.Sum(d => d.ValetOvernight)),
                ValetDaily = Convert.ToDecimal(details.Sum(d => d.ValetDaily)),
                ValetMonthly = Convert.ToDecimal(details.Sum(d => d.ValetMonthly)),
                SelfDaily = Convert.ToDecimal(details.Sum(d => d.SelfDaily)),
                SelfMonthly = Convert.ToDecimal(details.Sum(d => d.SelfMonthly)),
                ValetComps = Convert.ToDecimal(details.Sum(d => d.ValetComps)),
                SelfComps = Convert.ToDecimal(details.Sum(d => d.SelfComps)),
                SelfAggregator = Convert.ToDecimal(details.Sum(d => d.SelfAggregator)),
                ValetAggregator = Convert.ToDecimal(details.Sum(d => d.ValetAggregator)),
                ExternalRevenue = Convert.ToDecimal(details.Sum(d => d.ExternalRevenue)),

                SelfRateDaily = details.First().SelfRateDaily,
                SelfRateMonthly = details.First().SelfRateMonthly,
                SelfRateOvernight = details.First().SelfRateOvernight,
                ValetRateDaily = details.First().ValetRateDaily,
                ValetRateOvernight = details.First().ValetRateOvernight,
                ValetRateMonthly = details.First().ValetRateMonthly,
                Occupancy = (decimal)aggregatedOccupancy,
                DriveInRatio = aggregatedDriveInRatio,
                CaptureRatio = aggregatedCaptureRatio
            };
        }

        private List<(string PeriodLabel, DateOnly StartDate, DateOnly EndDate)> GenerateWeeklyPeriods(int year, int month)
        {
            var result = new List<(string PeriodLabel, DateOnly StartDate, DateOnly EndDate)>();

            // Get first and last day of month
            var firstDayOfMonth = new DateOnly(year, month, 1);
            var lastDayOfMonth = new DateOnly(year, month, DateTime.DaysInMonth(year, month));

            // Get month name for formatting
            string monthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month);

            // Find the first Sunday of the month or use first day if already a Sunday
            DateOnly weekStart = firstDayOfMonth;
            if (weekStart.DayOfWeek != DayOfWeek.Sunday)
            {
                // If not starting on Sunday, use first day of month
                weekStart = firstDayOfMonth;
            }

            while (weekStart <= lastDayOfMonth)
            {
                // Find the end date (next Saturday or last day of month)
                var weekEnd = weekStart;
                while (weekEnd.DayOfWeek != DayOfWeek.Saturday && weekEnd < lastDayOfMonth)
                {
                    weekEnd = weekEnd.AddDays(1);
                }

                // Format period label - always use month name of current month
                string periodLabel = $"{monthName} {weekStart.Day} - {weekEnd.Day}";

                // Add to result
                result.Add((periodLabel, weekStart, weekEnd));

                // Move to next week (start with Sunday)
                weekStart = weekEnd.AddDays(1);

                // Check if we've moved to next month
                if (weekStart.Month != month)
                {
                    break;
                }
            }

            return result;
        }

        private List<(string PeriodLabel, DateOnly StartDate, DateOnly EndDate)> GenerateQuarterlyPeriods(int year)
        {
            var result = new List<(string PeriodLabel, DateOnly StartDate, DateOnly EndDate)>();
            var quarterNames = new[] { "Q1", "Q2", "Q3", "Q4" };

            for (int i = 0; i < 4; i++)
            {
                int startMonth = i * 3 + 1;
                int endMonth = startMonth + 2;
                var startDate = new DateOnly(year, startMonth, 1);
                var endDate = new DateOnly(year, endMonth, DateTime.DaysInMonth(year, endMonth));
                result.Add(($"{quarterNames[i]} {year}", startDate, endDate));
            }

            return result;
        }

        public void SaveSiteStatistics(SiteStatisticVo updates)
        {
            bs_SiteStatistic updateModel = SiteStatisticMapper.SiteStatisticVoToModel(updates);

            if (updateModel.Id != Guid.Empty)
            {
                _siteStatisticRepository.SaveSiteStatistics(updateModel);
            }
            else
            {
                // call repo to add new site stat record
                _siteStatisticRepository.CreateSiteStatistics(updateModel);
            }
        }
        public async Task<List<SiteStatisticVo>> GetSiteStatisticsBatch(List<string> siteNumbers, List<string> billingPeriods)
        {
            // Execute the synchronous call in a Task to maintain the async contract
            var models = await Task.Run(() => _siteStatisticRepository.GetSiteStatisticsBatch(siteNumbers, billingPeriods));

            if (models == null || !models.Any())
            {
                return new List<SiteStatisticVo>(); // Return an empty list to avoid errors downstream  
            }
            return models
                .Where(model => model != null) // Filter out potential nulls in the list  
                .Select(model => SiteStatisticMapper.SiteStatisticModelToVo(new List<bs_SiteStatistic> { model })) // Wrap the model in a list  
                .Where(vo => vo != null) // Ensure mapper didn't return null (optional but safe)  
                .SelectMany(vo => vo) // Flatten the IEnumerable<IEnumerable<SiteStatisticVo>> to IEnumerable<SiteStatisticVo>  
                .ToList();
        }

         public async Task<List<SiteStatisticDetailVo>> GetBudgetDailyData(string siteNumber, string billingPeriod)
        {
            return await _siteStatisticRepository.GetBudgetData(siteNumber, billingPeriod);
        }

        private async Task<IEnumerable<SiteStatisticVo>?> GetMonthlySiteStatistics(Guid siteId, string billingPeriod)
        {
            var monthlySiteStatistics = _siteStatisticRepository.GetMonthlySiteStatistics(siteId, billingPeriod);

            var siteStatisticsList = monthlySiteStatistics?.ToList() ?? new List<bs_SiteStatistic>();
            var siteStatisticsVos = SiteStatisticMapper.SiteStatisticModelToVo(siteStatisticsList)?.ToList() ?? new List<SiteStatisticVo>();

            // Get customer detail for site ID
            var customerDetail = _customerRepository.GetCustomerDetail(siteId);
            var months = _monthRangeGenerator.GenerateMonthRange(billingPeriod, 3);
            
            if (!siteStatisticsVos.Any())
            {
                foreach (var month in months)
                {
                    var emptyVo = new SiteStatisticVo
                    {
                        CustomerSiteId = (Guid)customerDetail.bs_CustomerSiteId,
                        SiteNumber = customerDetail.bs_SiteNumber,
                        PeriodLabel = month,
                        TotalRooms = int.TryParse(customerDetail.bs_TotalRoomsAvailable, out var totalRooms) ? totalRooms : 0
                    };
                    siteStatisticsVos.Add(emptyVo);
                }
            }

            // Get budget data for all months in a single call
            var budgetData = await _siteStatisticRepository.GetBudgetDataForRange(customerDetail.bs_SiteNumber, months);
            var budgetDataByPeriod = budgetData
                .GroupBy(b => b.Date.ToString("yyyy-MM"))
                .ToDictionary(g => g.Key, g => g.ToList());

            foreach (var siteStatistic in siteStatisticsVos)
            {
                siteStatistic.TimeRangeType = TimeRangeType.MONTHLY;

                // Update total rooms if needed
                if(siteStatistic.TotalRooms == 0)
                {
                    siteStatistic.TotalRooms = int.TryParse(customerDetail.bs_TotalRoomsAvailable, out var totalRooms) ? totalRooms : 0;
                }

                if (!DateTime.TryParseExact(siteStatistic.PeriodLabel, "yyyy-MM", CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out DateTime periodDate))
                {
                    throw new ArgumentException("Invalid billing period format. Expected yyyy-MM", nameof(billingPeriod));
                }

                // Assign budget data for this period
                if (budgetDataByPeriod.TryGetValue(siteStatistic.PeriodLabel, out var periodBudgetData))
                {
                    siteStatistic.BudgetData = periodBudgetData;
                }

                // Get the start and end dates for the month
                var firstDayOfMonth = new DateOnly(periodDate.Year, periodDate.Month, 1);
                var lastDayOfMonth = new DateOnly(periodDate.Year, periodDate.Month, DateTime.DaysInMonth(periodDate.Year, periodDate.Month));

                // Aggregate ForecastData
                var forecastDetails = siteStatistic.ForecastData ?? new List<SiteStatisticDetailVo>();
                if (forecastDetails.Any())
                {
                    var forecastAggregate = CreateAggregate(
                        forecastDetails,
                        periodDate.ToString("MMMM yyyy", CultureInfo.InvariantCulture),
                        firstDayOfMonth,
                        lastDayOfMonth,
                        SiteStatisticDetailType.Forecast
                    );
                    siteStatistic.ForecastData = new List<SiteStatisticDetailVo> { forecastAggregate };
                }
                else
                {
                    siteStatistic.ForecastData = new List<SiteStatisticDetailVo>();
                }

                // Aggregate BudgetData
                var budgetDetails = siteStatistic.BudgetData ?? new List<SiteStatisticDetailVo>();
                if (budgetDetails.Any())
                {
                    var budgetAggregate = CreateAggregate(
                        budgetDetails,
                        periodDate.ToString("MMMM yyyy", CultureInfo.InvariantCulture),
                        firstDayOfMonth,
                        lastDayOfMonth,
                        SiteStatisticDetailType.Budget
                    );
                    siteStatistic.BudgetData = new List<SiteStatisticDetailVo> { budgetAggregate };
                }
                else
                {
                    siteStatistic.BudgetData = new List<SiteStatisticDetailVo>();
                }

                // After aggregation, ensure only one object per list (the aggregate)
                if (siteStatistic.ForecastData != null && siteStatistic.ForecastData.Count > 1)
                {
                    siteStatistic.ForecastData = siteStatistic.ForecastData.Take(1).ToList();
                }
                if (siteStatistic.BudgetData != null && siteStatistic.BudgetData.Count > 1)
                {
                    siteStatistic.BudgetData = siteStatistic.BudgetData.Take(1).ToList();
                }
            }

            // Sort by period label to ensure correct chronological order
            siteStatisticsVos = siteStatisticsVos.OrderBy(s => s.PeriodLabel).ToList();

            return siteStatisticsVos;
        }

        public async Task<PnlBySiteListVo> GetPNLData(List<string> siteIds, int year)
        {
            return await _siteStatisticRepository.GetPNLData(siteIds, year);
        }
    }
}
