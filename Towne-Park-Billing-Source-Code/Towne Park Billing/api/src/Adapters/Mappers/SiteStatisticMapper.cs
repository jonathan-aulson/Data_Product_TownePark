using api.Models.Dto;
using api.Models.Vo;
using Microsoft.Xrm.Sdk;
using Riok.Mapperly.Abstractions;
using TownePark;

namespace api.Adapters.Mappers
{
    [Mapper]
    public static partial class SiteStatisticMapper
    {
  
        public static IEnumerable<SiteStatisticVo>? SiteStatisticModelToVo(List<bs_SiteStatistic> models)
        {
            var voList = new List<SiteStatisticVo>();
            if (models.Count == 0) return null;

            foreach (var model in models)
            {
                var vo = new SiteStatisticVo();

                vo.Id = model.bs_SiteStatisticId;
                vo.SiteNumber = model.bs_CustomerSiteFK.Name;
                vo.CustomerSiteId = model.bs_CustomerSiteFK.Id;
                vo.PeriodLabel = model.bs_BillingPeriod;


                if (model.bs_SiteStatistic_CustomerSite != null &&
                    !string.IsNullOrEmpty(model.bs_SiteStatistic_CustomerSite.bs_TotalRoomsAvailable) &&
                    int.TryParse(model.bs_SiteStatistic_CustomerSite.bs_TotalRoomsAvailable, out int totalRoomsParsed))
                {
                    vo.TotalRooms = totalRoomsParsed;
                }
                else
                {
                    vo.TotalRooms = 0;
                }

                vo.Name = model.bs_Name;


                foreach (var item in model.bs_SiteStatistic_SiteStatisticDetail ?? Enumerable.Empty<bs_SiteStatisticDetail>())
                {

                    if (item == null) continue;

                    var detail = SiteStatisticDetailModelToVo(item);
                    if (detail != null)
                    {
                        if (detail.Type == SiteStatisticDetailType.Forecast)
                        {
                            vo.ForecastData ??= new List<SiteStatisticDetailVo>();
                            vo.ForecastData.Add(detail);
                        }
                        else if (detail.Type == SiteStatisticDetailType.Budget)
                        {
                            vo.BudgetData ??= new List<SiteStatisticDetailVo>();
                            vo.BudgetData.Add(detail);
                        }
                        else if (detail.Type == SiteStatisticDetailType.Actual)
                        {
                            vo.ActualData ??= new List<SiteStatisticDetailVo>();
                            vo.ActualData.Add(detail);
                        }

                        detail.PeriodLabel = detail.Date.ToString("MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                    }
                }

                voList.Add(vo);
            }

            return voList;
        }

        [MapProperty(nameof(SiteStatisticVo.ActualData), nameof(SiteStatisticDto.ActualData))]
        public static partial IEnumerable<SiteStatisticDto>? SiteStatisticVoToDto(List<SiteStatisticVo>? vo);

        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SiteStatisticDetailId), nameof(SiteStatisticDetailVo.Id))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_Type), nameof(SiteStatisticDetailVo.Type))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_Date), nameof(SiteStatisticDetailVo.Date))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetRateDaily), nameof(SiteStatisticDetailVo.ValetRateDaily))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetRateMonthly), nameof(SiteStatisticDetailVo.ValetRateMonthly))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfRateDaily), nameof(SiteStatisticDetailVo.SelfRateDaily))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfRateMonthly), nameof(SiteStatisticDetailVo.SelfRateMonthly))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_BaseRevenue), nameof(SiteStatisticDetailVo.BaseRevenue))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_OccupiedRooms), nameof(SiteStatisticDetailVo.OccupiedRooms))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_Occupancy), nameof(SiteStatisticDetailVo.Occupancy))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfOvernight), nameof(SiteStatisticDetailVo.SelfOvernight))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetOvernight), nameof(SiteStatisticDetailVo.ValetOvernight))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetDaily), nameof(SiteStatisticDetailVo.ValetDaily))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetMonthly), nameof(SiteStatisticDetailVo.ValetMonthly))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfDaily), nameof(SiteStatisticDetailVo.SelfDaily))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfMonthly), nameof(SiteStatisticDetailVo.SelfMonthly))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetComps), nameof(SiteStatisticDetailVo.ValetComps))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfComps), nameof(SiteStatisticDetailVo.SelfComps))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_DriveInRatio), nameof(SiteStatisticDetailVo.DriveInRatio))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_CaptureRatio), nameof(SiteStatisticDetailVo.CaptureRatio))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_SelfAggregator), nameof(SiteStatisticDetailVo.SelfAggregator))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ValetAggregator), nameof(SiteStatisticDetailVo.ValetAggregator))]
        [MapProperty(nameof(bs_SiteStatisticDetail.bs_ExternalRevenue), nameof(SiteStatisticDetailVo.ExternalRevenue))]
        private static partial SiteStatisticDetailVo? SiteStatisticDetailModelToVo(bs_SiteStatisticDetail model);

        public static bs_SiteStatistic SiteStatisticVoToModel(SiteStatisticVo vo)
        {
            var model = new bs_SiteStatistic();
            model.bs_SiteStatisticId = vo.Id;

            if (!string.IsNullOrEmpty(vo.SiteNumber))
            {
                model.bs_CustomerSiteFK = new EntityReference("bs_customersite", vo.CustomerSiteId)
                {
                    Name = vo.SiteNumber
                };
            }

            model.bs_BillingPeriod = vo.PeriodLabel;
            model.bs_Name = vo.Name;

            var details = new List<bs_SiteStatisticDetail>();

            foreach (var item in vo.ForecastData ?? new List<SiteStatisticDetailVo>())
            {
                var detail = SiteStatisticDetailVoToModel(item);
                if (detail != null)
                {
                    details.Add(detail);
                }
                detail.bs_Date = DateTimeOffset.Parse(item.PeriodLabel.ToString()).UtcDateTime;
            }

            foreach (var item in vo.BudgetData ?? new List<SiteStatisticDetailVo>())
            {
                var detail = SiteStatisticDetailVoToModel(item);
                if (detail != null)
                {
                    details.Add(detail);
                }
                detail.bs_Date = DateTimeOffset.Parse(item.PeriodLabel.ToString()).UtcDateTime;
            }

            foreach (var item in vo.ActualData ?? new List<SiteStatisticDetailVo>())
            {
                var detail = SiteStatisticDetailVoToModel(item);
                if (detail != null)
                {
                    details.Add(detail);
                }
                detail.bs_Date = DateTimeOffset.Parse(item.PeriodLabel.ToString()).UtcDateTime;
            }

            model.bs_SiteStatistic_SiteStatisticDetail = details;

            return model;
        }

        [MapProperty(nameof(SiteStatisticDto.ActualData), nameof(SiteStatisticVo.ActualData))]
        public static partial SiteStatisticVo? SiteStatisticDtoToVo(SiteStatisticDto? dto);

        [MapProperty(nameof(SiteStatisticDetailDto.Id), nameof(bs_SiteStatisticDetail.bs_SiteStatisticDetailId))]
        [MapProperty(nameof(SiteStatisticDetailDto.Type), nameof(bs_SiteStatisticDetail.bs_Type))]
        [MapProperty(nameof(SiteStatisticDetailDto.ValetRateDaily), nameof(bs_SiteStatisticDetail.bs_ValetRateDaily))]
        [MapProperty(nameof(SiteStatisticDetailDto.ValetRateMonthly), nameof(bs_SiteStatisticDetail.bs_ValetRateMonthly))]
        [MapProperty(nameof(SiteStatisticDetailDto.SelfRateDaily), nameof(bs_SiteStatisticDetail.bs_SelfRateDaily))]
        [MapProperty(nameof(SiteStatisticDetailDto.SelfRateMonthly), nameof(bs_SiteStatisticDetail.bs_SelfRateMonthly))]
        [MapProperty(nameof(SiteStatisticDetailDto.BaseRevenue), nameof(bs_SiteStatisticDetail.bs_BaseRevenue))]
        [MapProperty(nameof(SiteStatisticDetailDto.OccupiedRooms), nameof(bs_SiteStatisticDetail.bs_OccupiedRooms))]
        [MapProperty(nameof(SiteStatisticDetailDto.Occupancy), nameof(bs_SiteStatisticDetail.bs_Occupancy))]
        [MapProperty(nameof(SiteStatisticDetailDto.SelfOvernight), nameof(bs_SiteStatisticDetail.bs_SelfOvernight))]
        [MapProperty(nameof(SiteStatisticDetailDto.ValetOvernight), nameof(bs_SiteStatisticDetail.bs_ValetOvernight))]
        [MapProperty(nameof(SiteStatisticDetailDto.ValetDaily), nameof(bs_SiteStatisticDetail.bs_ValetDaily))]
        [MapProperty(nameof(SiteStatisticDetailDto.ValetMonthly), nameof(bs_SiteStatisticDetail.bs_ValetMonthly))]
        [MapProperty(nameof(SiteStatisticDetailDto.SelfDaily), nameof(bs_SiteStatisticDetail.bs_SelfDaily))]
        [MapProperty(nameof(SiteStatisticDetailDto.SelfMonthly), nameof(bs_SiteStatisticDetail.bs_SelfMonthly))]
        [MapProperty(nameof(SiteStatisticDetailDto.ValetComps), nameof(bs_SiteStatisticDetail.bs_ValetComps))]
        [MapProperty(nameof(SiteStatisticDetailDto.SelfComps), nameof(bs_SiteStatisticDetail.bs_SelfComps))]
        [MapProperty(nameof(SiteStatisticDetailDto.DriveInRatio), nameof(bs_SiteStatisticDetail.bs_DriveInRatio))]
        [MapProperty(nameof(SiteStatisticDetailDto.CaptureRatio), nameof(bs_SiteStatisticDetail.bs_CaptureRatio))]
        [MapProperty(nameof(SiteStatisticDetailDto.SelfAggregator), nameof(bs_SiteStatisticDetail.bs_SelfAggregator))]
        [MapProperty(nameof(SiteStatisticDetailDto.ValetAggregator), nameof(bs_SiteStatisticDetail.bs_ValetAggregator))]
        [MapProperty(nameof(SiteStatisticDetailDto.ExternalRevenue), nameof(bs_SiteStatisticDetail.bs_ExternalRevenue))]
        private static partial bs_SiteStatisticDetail? SiteStatisticDetailVoToModel(SiteStatisticDetailVo vo);
    }
}
