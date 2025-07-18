using System;
using System.Collections.Generic;
using System.Linq;
using api.Models.Dto;
using TownePark.Models.Vo;

namespace api.Services.Impl.Calculators
{
    public class ExternalRevenueCalculator : IExternalRevenueCalculator
    {
        public string TargetColumnName => "ExternalRevenue";

        public void CalculateAndApply(InternalRevenueDataVo siteData, int year, int monthOneBased, MonthValueDto monthValueDto, SiteMonthlyRevenueDetailDto siteDetailDto)
        {
            var monthlyStats = siteData.SiteStatistics
                .Where(s => s.Date.Year == year && s.Date.Month == monthOneBased)
                .ToList();

            if (!monthlyStats.Any())
            {
                siteDetailDto.ExternalRevenueBreakdown = null;
                return;
            }

            var breakdown = new ExternalRevenueBreakdownDto();
            decimal totalExternalRevenue = 0;

            // Valet Daily
            var valetDailyStat = monthlyStats.Sum(s => s.ValetDaily);
            var valetDailyRate = GetRateForCategory(siteData, monthOneBased, TownePark.bs_ratecategorytypes.ValetDaily);
            breakdown.ValetDaily = new RevenueComponentDto
            {
                Statistic = valetDailyStat,
                Rate = valetDailyRate,
                Value = CalculateComponent(valetDailyStat, valetDailyRate)
            };
            totalExternalRevenue += breakdown.ValetDaily.Value ?? 0m;

            // Valet Monthly
            var valetMonthlyStat = monthlyStats.Sum(s => s.ValetMonthly);
            var valetMonthlyRate = GetRateForCategory(siteData, monthOneBased, TownePark.bs_ratecategorytypes.ValetMonthly);
            breakdown.ValetMonthly = new RevenueComponentDto
            {
                Statistic = valetMonthlyStat,
                Rate = valetMonthlyRate,
                Value = CalculateComponent(valetMonthlyStat, valetMonthlyRate)
            };
            totalExternalRevenue += breakdown.ValetMonthly.Value ?? 0m;
            
            // Valet Overnight
            var valetOvernightStat = monthlyStats.Sum(s => s.ValetOvernight);
            var valetOvernightRate = GetRateForCategory(siteData, monthOneBased, TownePark.bs_ratecategorytypes.ValetOvernight);
            breakdown.ValetOvernight = new RevenueComponentDto
            {
                Statistic = valetOvernightStat,
                Rate = valetOvernightRate,
                Value = CalculateComponent(valetOvernightStat, valetOvernightRate)
            };
            totalExternalRevenue += breakdown.ValetOvernight.Value ?? 0m;

            // Valet Aggregator
            var valetAggregatorStat = monthlyStats.Sum(s => s.ValetAggregator);
            var valetAggregatorRate = GetRateForCategory(siteData, monthOneBased, TownePark.bs_ratecategorytypes.ValetAggregator);
            breakdown.ValetAggregator = new RevenueComponentDto
            {
                Statistic = valetAggregatorStat,
                Rate = valetAggregatorRate,
                Value = CalculateComponent(valetAggregatorStat, valetAggregatorRate)
            };
            totalExternalRevenue += breakdown.ValetAggregator.Value ?? 0m;

            // Self Daily
            var selfDailyStat = monthlyStats.Sum(s => s.SelfDaily);
            var selfDailyRate = GetRateForCategory(siteData, monthOneBased, TownePark.bs_ratecategorytypes.SelfDaily);
            breakdown.SelfDaily = new RevenueComponentDto
            {
                Statistic = selfDailyStat,
                Rate = selfDailyRate,
                Value = CalculateComponent(selfDailyStat, selfDailyRate)
            };
            totalExternalRevenue += breakdown.SelfDaily.Value ?? 0m;

            // Self Monthly
            var selfMonthlyStat = monthlyStats.Sum(s => s.SelfMonthly);
            var selfMonthlyRate = GetRateForCategory(siteData, monthOneBased, TownePark.bs_ratecategorytypes.SelfMonthly);
            breakdown.SelfMonthly = new RevenueComponentDto
            {
                Statistic = selfMonthlyStat,
                Rate = selfMonthlyRate,
                Value = CalculateComponent(selfMonthlyStat, selfMonthlyRate)
            };
            totalExternalRevenue += breakdown.SelfMonthly.Value ?? 0m;

            // Self Overnight
            var selfOvernightStat = monthlyStats.Sum(s => s.SelfOvernight);
            var selfOvernightRate = GetRateForCategory(siteData, monthOneBased, TownePark.bs_ratecategorytypes.SelfOvernight);
            breakdown.SelfOvernight = new RevenueComponentDto
            {
                Statistic = selfOvernightStat,
                Rate = selfOvernightRate,
                Value = CalculateComponent(selfOvernightStat, selfOvernightRate)
            };
            totalExternalRevenue += breakdown.SelfOvernight.Value ?? 0m;

            // Self Aggregator
            var selfAggregatorStat = monthlyStats.Sum(s => s.SelfAggregator);
            var selfAggregatorRate = GetRateForCategory(siteData, monthOneBased, TownePark.bs_ratecategorytypes.SelfAggregator);
            breakdown.SelfAggregator = new RevenueComponentDto
            {
                Statistic = selfAggregatorStat,
                Rate = selfAggregatorRate,
                Value = CalculateComponent(selfAggregatorStat, selfAggregatorRate)
            };
            totalExternalRevenue += breakdown.SelfAggregator.Value ?? 0m;

            breakdown.CalculatedTotalExternalRevenue = totalExternalRevenue;
            siteDetailDto.ExternalRevenueBreakdown = breakdown;
        }

        public void AggregateMonthlyTotals(List<SiteMonthlyRevenueDetailDto> siteDetails, MonthValueDto monthValueDto)
        {
            decimal totalCalculatedExternalRevenueForMonth = 0;
            foreach (var siteDetail in siteDetails.Where(sd => sd.ExternalRevenueBreakdown != null))
            {
                var siteBreakdown = siteDetail.ExternalRevenueBreakdown;
                totalCalculatedExternalRevenueForMonth += siteBreakdown.CalculatedTotalExternalRevenue ?? 0m;
            }
        }

        private static decimal? GetRateForCategory(InternalRevenueDataVo siteData, int month, TownePark.bs_ratecategorytypes category)
        {
            if (siteData.ParkingRates == null) return null;
            var rateVo = siteData.ParkingRates.FirstOrDefault();
            if (rateVo == null || rateVo.Details == null) return null;
            var detail = rateVo.Details.FirstOrDefault(d => d.Month == month && d.RateCategory == category);
            return detail?.Rate;
        }

        private static decimal CalculateComponent(decimal? stat, decimal? rate) => (stat ?? 0m) * (rate ?? 0m);
    }
}
