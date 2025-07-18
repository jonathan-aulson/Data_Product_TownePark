using api.Models.Dto;
using api.Models.Vo;
using Microsoft.Xrm.Sdk;
using Riok.Mapperly.Abstractions;
using TownePark;

namespace api.Adapters.Mappers
{
    [Mapper]
    public static partial class OtherRevenueMapper
    {
        // data retrieval mappers

        [MapProperty(nameof(bs_OtherRevenue.bs_OtherRevenueId), nameof(OtherRevenueVo.Id))]
        [MapProperty(nameof(bs_OtherRevenue.bs_Name), nameof(OtherRevenueVo.Name))]
        [MapProperty(nameof(bs_OtherRevenue.bs_Period), nameof(OtherRevenueVo.BillingPeriod))]
        private static partial OtherRevenueVo MapOtherRevenueModelToVo(bs_OtherRevenue? model);

        [MapProperty(nameof(bs_OtherRevenueDetail.bs_OtherRevenueDetailId), nameof(OtherRevenueDetailVo.Id))]
        [MapProperty(nameof(bs_OtherRevenueDetail.bs_MonthYear), nameof(OtherRevenueDetailVo.MonthYear))]
        [MapProperty(nameof(bs_OtherRevenueDetail.bs_BillableExpense), nameof(OtherRevenueDetailVo.BillableExpense))]
        [MapProperty(nameof(bs_OtherRevenueDetail.bs_Credits), nameof(OtherRevenueDetailVo.Credits))]
        [MapProperty(nameof(bs_OtherRevenueDetail.bs_GPOFees), nameof(OtherRevenueDetailVo.GPOFees))]
        [MapProperty(nameof(bs_OtherRevenueDetail.bs_RevenueValidation), nameof(OtherRevenueDetailVo.RevenueValidation))]
        [MapProperty(nameof(bs_OtherRevenueDetail.bs_SigningBonus), nameof(OtherRevenueDetailVo.SigningBonus))]
        private static partial OtherRevenueDetailVo MapOtherRevenueDetailModelToVo(bs_OtherRevenueDetail model);

        public static IEnumerable<OtherRevenueDetailVo>? OtherRevenueModelToVo(IEnumerable<bs_OtherRevenueDetail>? model)
        {
            var otherRevenueDetails = model.ToList();

            if (otherRevenueDetails == null || otherRevenueDetails.Count == 0)
                return null;

            var details = new List<OtherRevenueDetailVo>();
            foreach (var item in model)
            {
                var detail = MapOtherRevenueDetailModelToVo(item);
                details.Add(detail);
            }

            //vo.ForecastData = new List<OtherRevenueDetailVo>();

            //foreach (var item in model)
            //{
            //    var detail = MapOtherRevenueDetailModelToVo(item);
            //    vo.ForecastData.Add(detail);
            //}

            return details;
        }

        public static partial OtherRevenueDto? OtherRevenueVoToDto(OtherRevenueVo? vo);

        // data save mappers

        [MapProperty(nameof(OtherRevenueVo.Id), nameof(bs_OtherRevenue.Id))]
        [MapProperty(nameof(OtherRevenueVo.Name), nameof(bs_OtherRevenue.bs_Name))]
        [MapProperty(nameof(OtherRevenueVo.BillingPeriod), nameof(bs_OtherRevenue.bs_Period))]
        private static partial bs_OtherRevenue MapOtherRevenueVoToModel(OtherRevenueVo vo);

        [MapProperty(nameof(OtherRevenueDetailVo.Id), nameof(bs_OtherRevenueDetail.Id))]
        [MapProperty(nameof(OtherRevenueDetailVo.MonthYear), nameof(bs_OtherRevenueDetail.bs_MonthYear))]
        [MapProperty(nameof(OtherRevenueDetailVo.BillableExpense), nameof(bs_OtherRevenueDetail.bs_BillableExpense))]
        [MapProperty(nameof(OtherRevenueDetailVo.Credits), nameof(bs_OtherRevenueDetail.bs_Credits))]
        [MapProperty(nameof(OtherRevenueDetailVo.GPOFees), nameof(bs_OtherRevenueDetail.bs_GPOFees))]
        [MapProperty(nameof(OtherRevenueDetailVo.RevenueValidation), nameof(bs_OtherRevenueDetail.bs_RevenueValidation))]
        [MapProperty(nameof(OtherRevenueDetailVo.SigningBonus), nameof(bs_OtherRevenueDetail.bs_SigningBonus))]
        private static partial bs_OtherRevenueDetail MapOtherRevenueDetailVoToModel(OtherRevenueDetailVo vo);

        public static List<bs_OtherRevenueDetail> OtherRevenueVoToModel(OtherRevenueVo vo)
        {
            List<bs_OtherRevenueDetail> detailList = new List<bs_OtherRevenueDetail>();

            // Todo: Implement logic to save BudgetData, and ActualData to EDW
            //if (vo.BudgetData != null)
            //{
            //    foreach (var item in vo.BudgetData)
            //    {
            //        var detail = MapOtherRevenueDetailVoToModel(item);
            //        detailList.Add(detail);
            //    }
            //}

            //if (vo.ActualData != null)
            //{
            //    foreach (var item in vo.ActualData)
            //    {
            //        var detail = MapOtherRevenueDetailVoToModel(item);
            //        detailList.Add(detail);
            //    }
            //}

            if (vo.ForecastData != null)
            {
                foreach (var item in vo.ForecastData)
                {
                    var detail = MapOtherRevenueDetailVoToModel(item);

                    detail.bs_CustomerSiteFK = new EntityReference(bs_CustomerSite.EntityLogicalName, vo.CustomerSiteId);

                    detailList.Add(detail);
                }
            }

            return detailList;
        }

        public static partial OtherRevenueVo MapOtherRevenueDtoToVo(OtherRevenueDto dto);
    }
}
