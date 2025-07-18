using System;
using System.Collections.Generic;
using System.Linq;
using TownePark.Models.Vo;
using api.Models.Dto;

namespace api.Services.Impl.Calculators
{
    public class PerOccupiedRoomCalculator : IInternalRevenueCalculator
    {
        public void CalculateAndApply(InternalRevenueDataVo siteData, int year, int monthOneBased, MonthValueDto monthValueDto, SiteMonthlyRevenueDetailDto siteDetailDto, decimal calculatedExternalRevenue, List<PnlRowDto> budgetRows)
        {
            var perOccupiedRoomRevenue = CalculateMonthlyPerOccupiedRoomRevenueForSite(siteData, year, monthOneBased, calculatedExternalRevenue, monthValueDto, budgetRows);

            if (siteDetailDto.InternalRevenueBreakdown == null)
            {
                siteDetailDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();
            }
            siteDetailDto.InternalRevenueBreakdown.PerOccupiedRoom = perOccupiedRoomRevenue;

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
            decimal totalPerOccupiedRoomBaseForMonth = 0m;
            decimal totalForecastedRoomsForMonth = 0m;
            decimal totalBudgetRoomsForMonth = 0m;
            decimal averageFeePerRoom = 0m;

            foreach (var siteDetail in siteDetailsForMonth)
            {
                if (siteDetail.InternalRevenueBreakdown?.PerOccupiedRoom != null)
                {
                    var perOccupiedRoom = siteDetail.InternalRevenueBreakdown.PerOccupiedRoom;
                    totalPerOccupiedRoomBaseForMonth += perOccupiedRoom.Total ?? 0m;
                    totalForecastedRoomsForMonth += perOccupiedRoom.ForecastedRooms ?? 0m;
                    totalBudgetRoomsForMonth += perOccupiedRoom.BudgetRooms ?? 0m;
                    
                    if (averageFeePerRoom == 0m && perOccupiedRoom.FeePerRoom > 0m)
                    {
                        averageFeePerRoom = perOccupiedRoom.FeePerRoom;
                    }
                }
            }
            
            if (monthValueDto.InternalRevenueBreakdown == null)
            {
                monthValueDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();
            }

            monthValueDto.InternalRevenueBreakdown.PerOccupiedRoom = new PerOccupiedRoomInternalRevenueDto
            {
                FeePerRoom = averageFeePerRoom,
                ForecastedRooms = totalForecastedRoomsForMonth > 0 ? totalForecastedRoomsForMonth : null,
                BudgetRooms = totalForecastedRoomsForMonth > 0 ? null : totalBudgetRoomsForMonth,
                BaseRevenue = totalPerOccupiedRoomBaseForMonth,
                Escalators = new List<EscalatorDto>(),
                Total = totalPerOccupiedRoomBaseForMonth
            };


            monthValueDto.Value = monthValueDto.InternalRevenueBreakdown.PerOccupiedRoom?.Total ?? 0m;
        }

        private PerOccupiedRoomInternalRevenueDto CalculateMonthlyPerOccupiedRoomRevenueForSite(
            InternalRevenueDataVo siteData, int targetYear, int targetMonthOneBased, decimal calculatedExternalRevenue, MonthValueDto monthValueDto, List<PnlRowDto> budgetRows)
        {
            var perOccupiedRoomFee = siteData.Contract?.OccupiedRoomRate ?? 0m;
            decimal forecastedOccupiedRooms = 0m;

            if (siteData.SiteStatistics != null)
            {
                forecastedOccupiedRooms = siteData.SiteStatistics
                    .Where(s => s.Date.Year == targetYear && s.Date.Month == targetMonthOneBased && s.OccupiedRooms.HasValue)
                    .Sum(s => s.OccupiedRooms.Value);
            }

            var budgetOccupiedRooms = budgetRows[1].MonthlyValues[targetMonthOneBased - 1]?.SiteDetails?.FirstOrDefault(x => x.SiteId == siteData.SiteNumber)?.InternalRevenueBreakdown?.PerOccupiedRoom?.BudgetRooms ?? 0;
            decimal roomsForCalculation = forecastedOccupiedRooms > 0 ? forecastedOccupiedRooms : budgetOccupiedRooms;
            var baseRevenue = perOccupiedRoomFee * roomsForCalculation;
            
            var escalatorAmount = 0m; 
            var escalators = new List<EscalatorDto>();

            // Conditional escalator check as per Task 2118: only apply escalators if external revenue > 0
            if (calculatedExternalRevenue > 0)
            {
                // Future escalator logic will go here
                escalatorAmount = 0m;
            }

            return new PerOccupiedRoomInternalRevenueDto
            {
                FeePerRoom = perOccupiedRoomFee,
                ForecastedRooms = forecastedOccupiedRooms > 0 ? forecastedOccupiedRooms : null,
                BudgetRooms = forecastedOccupiedRooms > 0 ? null : budgetOccupiedRooms,
                BaseRevenue = baseRevenue,
                Escalators = escalators, 
                Total = baseRevenue + escalatorAmount
            };
        }

        // Example placeholder for future escalator logic for this component type
        // private List<EscalatorDto> CalculateEscalatorsForPerOccupiedRoom(InternalRevenueDataVo siteData, int year, int month, decimal baseRevenue)
        // {
        //    // ... logic to calculate escalators based on contract terms ...
        //    return new List<EscalatorDto>();
        // }
    }
}
