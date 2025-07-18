using System.Collections.Generic;
using TownePark.Models.Vo;
using api.Models.Dto;

namespace api.Services.Impl.Calculators
{
    public interface IInternalRevenueCalculator
    {
        void CalculateAndApply(InternalRevenueDataVo siteData, int year, int monthOneBased, MonthValueDto monthValueDto, SiteMonthlyRevenueDetailDto siteDetailDto, decimal calculatedExternalRevenue, List<PnlRowDto> budgetRows);
        void AggregateMonthlyTotals(List<SiteMonthlyRevenueDetailDto> siteDetailsForMonth, MonthValueDto monthValueDto);
    }
}
