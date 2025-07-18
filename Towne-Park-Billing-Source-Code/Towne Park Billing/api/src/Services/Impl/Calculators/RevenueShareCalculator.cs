using System;
using System.Collections.Generic;
using System.Linq;
using TownePark.Models.Vo;
using api.Models.Dto;

namespace api.Services.Impl.Calculators
{
    public class RevenueShareCalculator : IInternalRevenueCalculator
    {
        public void CalculateAndApply(
            InternalRevenueDataVo siteData,
            int year,
            int monthOneBased,
            MonthValueDto monthValueDto,
            SiteMonthlyRevenueDetailDto siteDetailDto,
            decimal calculatedExternalRevenue,
            List<PnlRowDto> budgetRows)
        {
            var revenueShareDto = CalculateMonthlyRevenueShareForSite(siteData, year, monthOneBased, calculatedExternalRevenue);

            if (siteDetailDto.InternalRevenueBreakdown == null)
                siteDetailDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();

            siteDetailDto.InternalRevenueBreakdown.RevenueShare = revenueShareDto;

            // Hybrid approach: set CalculatedTotalInternalRevenue at site level
            var breakdown = siteDetailDto.InternalRevenueBreakdown;
            decimal total = 0m;
            if (breakdown.FixedFee?.Total != null) total += breakdown.FixedFee.Total.Value;
            if (breakdown.PerOccupiedRoom?.Total != null) total += breakdown.PerOccupiedRoom.Total.Value;
            if (breakdown.RevenueShare?.Total != null) total += breakdown.RevenueShare.Total.Value;
            if (breakdown.BillableAccounts?.Total != null) total += breakdown.BillableAccounts.Total.Value;
            if (breakdown.ManagementAgreement?.Total != null) total += breakdown.ManagementAgreement.Total.Value;
            if (breakdown.OtherRevenue?.Total != null) total += breakdown.OtherRevenue.Total.Value;
            breakdown.CalculatedTotalInternalRevenue = total;
        }

        public void AggregateMonthlyTotals(List<SiteMonthlyRevenueDetailDto> siteDetailsForMonth, MonthValueDto monthValueDto)
        {
            decimal totalRevenueShareForMonth = 0m;
            List<RevenueShareTierDto> aggregatedTiers = new List<RevenueShareTierDto>();
            List<EscalatorDto> aggregatedEscalators = new List<EscalatorDto>();

            foreach (var siteDetail in siteDetailsForMonth)
            {
                var revenueShare = siteDetail.InternalRevenueBreakdown?.RevenueShare;
                if (revenueShare != null)
                {
                    totalRevenueShareForMonth += revenueShare.Total ?? 0m;
                    if (revenueShare.Tiers != null)
                        aggregatedTiers.AddRange(revenueShare.Tiers);
                    if (revenueShare.Escalators != null)
                        aggregatedEscalators.AddRange(revenueShare.Escalators.Where(e => e.IsApplied));
                }
            }

            if (monthValueDto.InternalRevenueBreakdown == null)
                monthValueDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();

            monthValueDto.InternalRevenueBreakdown.RevenueShare = new RevenueShareInternalRevenueDto
            {
                ForecastedExternalRevenue = aggregatedTiers.Sum(t => t.RevenueInTier ?? 0m), // or sum of all site forecasted external revenue
                Tiers = aggregatedTiers,
                Escalators = aggregatedEscalators,
                Total = totalRevenueShareForMonth
            };

            // Do not set CalculatedTotalInternalRevenue here; central aggregation will handle it.
            monthValueDto.Value = totalRevenueShareForMonth;
        }

        private RevenueShareInternalRevenueDto CalculateMonthlyRevenueShareForSite(
            InternalRevenueDataVo siteData,
            int targetYear,
            int targetMonthOneBased,
            decimal calculatedExternalRevenue)
        {
            // Use the provided external revenue directly
            decimal forecastedExternalRevenue = calculatedExternalRevenue;

            // Find the correct revenue share tiers for this month
            var tiers = GetRevenueShareTiersForMonth(siteData.RevenueShareThresholds, forecastedExternalRevenue, targetYear, targetMonthOneBased);

            // Calculate share amount for each tier and total
            decimal totalShare = 0m;
            foreach (var tier in tiers)
            {
                // Revenue in tier = min(forecastedExternalRevenue, thresholdEnd) - thresholdStart
                decimal tierStart = tier.ThresholdStart ?? 0m;
                decimal tierEnd = tier.ThresholdEnd ?? decimal.MaxValue;
                decimal revenueInTier = Math.Max(0, Math.Min(forecastedExternalRevenue, tierEnd) - tierStart);
                tier.RevenueInTier = revenueInTier;
                // Convert percentage from whole number (30.0) to decimal fraction (0.30) before calculation
                tier.ShareAmount = revenueInTier * ((tier.Percentage ?? 0m) / 100m);
                totalShare += tier.ShareAmount ?? 0m;
            }

            // Escalators (placeholder)
            var escalatorsList = new List<EscalatorDto>();
            decimal totalEscalators = 0m;
            // TODO: Add logic for escalators if applicable

            decimal total = totalShare + totalEscalators;

            return new RevenueShareInternalRevenueDto
            {
                ForecastedExternalRevenue = forecastedExternalRevenue,
                Tiers = tiers,
                Escalators = escalatorsList,
                Total = total
            };
        }

        /// <summary>
        /// Returns the revenue share tiers for the given month, sorted by threshold start ascending.
        /// </summary>
        private List<RevenueShareTierDto> GetRevenueShareTiersForMonth(
            List<RevenueShareThresholdVo> thresholds,
            decimal forecastedExternalRevenue,
            int year,
            int month)
        {
            if (thresholds == null || thresholds.Count == 0)
                return new List<RevenueShareTierDto>();

            // Find the threshold structure that is effective for this month
            var effectiveThreshold = thresholds
                .FirstOrDefault(t =>
                    t.ThresholdStructure?.Tiers != null &&
                    t.ThresholdStructure.Tiers.Any(tier =>
                        (!tier.EffectiveFrom.HasValue || tier.EffectiveFrom.Value <= new DateTime(year, month, 1)) &&
                        (!tier.EffectiveTo.HasValue || tier.EffectiveTo.Value >= new DateTime(year, month, 1))
                    )
                );

            if (effectiveThreshold == null)
                return new List<RevenueShareTierDto>();

            // Map to RevenueShareTierDto
            var tierDtos = effectiveThreshold.ThresholdStructure.Tiers
                .Where(tier =>
                    (!tier.EffectiveFrom.HasValue || tier.EffectiveFrom.Value <= new DateTime(year, month, 1)) &&
                    (!tier.EffectiveTo.HasValue || tier.EffectiveTo.Value >= new DateTime(year, month, 1))
                )
                .OrderBy(tier => tier.Amount)
                .Select((tier, idx) => // Explicitly specify the type arguments for Select
                {
                    decimal? thresholdStart = tier.Amount;
                    decimal? thresholdEnd = null;
                    // If not last tier, end is next tier's start
                    if (idx < effectiveThreshold.ThresholdStructure.Tiers.Count - 1)
                        thresholdEnd = effectiveThreshold.ThresholdStructure.Tiers[idx + 1].Amount;
                    return new RevenueShareTierDto
                    {
                        ThresholdStart = thresholdStart,
                        ThresholdEnd = thresholdEnd,
                        Percentage = tier.SharePercentage
                    };
                })
                .ToList();

            return tierDtos;
        }
    }
}
