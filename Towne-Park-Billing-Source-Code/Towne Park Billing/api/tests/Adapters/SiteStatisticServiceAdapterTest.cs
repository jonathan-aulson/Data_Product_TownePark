using api.Adapters.Impl;
using api.Models.Dto;
using api.Models.Vo;
using api.Services;
using FluentAssertions;
using NSubstitute;
using Xunit;

namespace BackendTests.Adapters
{
    public class SiteStatisticServiceAdapterTest
    {
        private readonly ISiteStatisticService _siteStatisticService;
        private readonly SiteStatisticServiceAdapter _siteStatisticServiceAdapter;

        public SiteStatisticServiceAdapterTest()
        {
            _siteStatisticService = Substitute.For<ISiteStatisticService>();
            _siteStatisticServiceAdapter = new SiteStatisticServiceAdapter(_siteStatisticService);
        }

        [Fact]
        public async Task GetSiteStatistics_ShouldCallSiteStatisticService_AndReturnAdaptedResponse()
        {
            Guid siteId = Guid.NewGuid();
            string billingPeriod = "2025-07";
            string timeRange = "daily";

            var hotelParkingDataVo = new SiteStatisticVo
            {
                SiteNumber = "0111",
                Name = "Hotel Parking",
                TotalRooms = 100,
                PeriodLabel = billingPeriod,
                TimeRangeType = TimeRangeType.DAILY,
                BudgetData = new List<SiteStatisticDetailVo>
                {
                    new SiteStatisticDetailVo
                    {
                        Id = Guid.NewGuid(),
                        Type = SiteStatisticDetailType.Budget,
                        Date = new DateOnly(2025, 7, 1),
                        PeriodLabel = new DateOnly(2025, 7, 1).ToString(),
                        ValetRateDaily = 10,
                        ValetRateMonthly = 200,
                        SelfRateDaily = 5,
                        SelfRateMonthly = 100,
                        BaseRevenue = 7000,
                        OccupiedRooms = 70,
                        Occupancy = 0.91m,
                        SelfOvernight = 50,
                        ValetOvernight = 20,
                        ValetDaily = 40,
                        ValetMonthly = 60,
                        SelfDaily = 30,
                        SelfMonthly = 10,
                        ValetComps = 5,
                        SelfComps = 5,
                        DriveInRatio = 0.5,
                        CaptureRatio = 0.87
                    }
                },
                ForecastData = new List<SiteStatisticDetailVo>
                {
                    new SiteStatisticDetailVo
                    {
                        Id = Guid.NewGuid(),
                        Type = SiteStatisticDetailType.Forecast,
                        Date = new DateOnly(2025, 7, 1),
                        PeriodLabel = new DateOnly(2025, 7, 1).ToString(),
                        ValetRateDaily = 10,
                        ValetRateMonthly = 200,
                        SelfRateDaily = 5,
                        SelfRateMonthly = 100,
                        BaseRevenue = 7000,
                        OccupiedRooms = 70,
                        Occupancy = 0.91m,
                        SelfOvernight = 50,
                        ValetOvernight = 20,
                        ValetDaily = 40,
                        ValetMonthly = 60,
                        SelfDaily = 30,
                        SelfMonthly = 10,
                        ValetComps = 5,
                        SelfComps = 5,
                        DriveInRatio = 0.5,
                        CaptureRatio = 0.87
                    }
                }
            };

            _siteStatisticService.GetSiteStatistics(siteId, billingPeriod, timeRange)
                .Returns(Task.FromResult<IEnumerable<SiteStatisticVo>>(new List<SiteStatisticVo> { hotelParkingDataVo }));

            var siteStatisticDto = new SiteStatisticDto
            {
                SiteNumber = "0111",
                Name = "Hotel Parking",
                TotalRooms = 100,
                PeriodLabel = billingPeriod,
                TimeRangeType = "DAILY",
                BudgetData = new List<SiteStatisticDetailDto>
            {
                new SiteStatisticDetailDto
                {
                    Id = hotelParkingDataVo.BudgetData[0].Id,
                    Type = "Budget",
                    PeriodStart = new DateOnly(),
                    PeriodEnd = new DateOnly(),
                    PeriodLabel = new DateOnly(2025, 7, 1).ToString(),
                    ValetRateDaily = 10,
                    ValetRateMonthly = 200,
                    SelfRateDaily = 5,
                    SelfRateMonthly = 100,
                    BaseRevenue = 7000,
                    OccupiedRooms = 70,
                    Occupancy = 0.91m,
                    SelfOvernight = 50,
                    ValetOvernight = 20,
                    ValetDaily = 40,
                    ValetMonthly = 60,
                    SelfDaily = 30,
                    SelfMonthly = 10,
                    ValetComps = 5,
                    SelfComps = 5,
                    DriveInRatio = 0.5,
                    CaptureRatio = 0.87
                }
            },
                ForecastData = new List<SiteStatisticDetailDto>
            {
                new SiteStatisticDetailDto
                {
                    Id = hotelParkingDataVo.ForecastData[0].Id,
                    Type = "Forecast",
                    PeriodStart = new DateOnly(),
                    PeriodEnd = new DateOnly(),
                    PeriodLabel = new DateOnly(2025, 7, 1).ToString(),
                    ValetRateDaily = 10,
                    ValetRateMonthly = 200,
                    SelfRateDaily = 5,
                    SelfRateMonthly = 100,
                    BaseRevenue = 7000,
                    OccupiedRooms = 70,
                    Occupancy = 0.91m,
                    SelfOvernight = 50,
                    ValetOvernight = 20,
                    ValetDaily = 40,
                    ValetMonthly = 60,
                    SelfDaily = 30,
                    SelfMonthly = 10,
                    ValetComps = 5,
                    SelfComps = 5,
                    DriveInRatio = 0.5,
                    CaptureRatio = 0.87
                }
            }
        };

            var result = _siteStatisticServiceAdapter.GetSiteStatistics(siteId, billingPeriod, timeRange);

            result.Should().BeEquivalentTo(new List<SiteStatisticDto> { siteStatisticDto });
        }


        [Fact]
        public void SaveSiteStatistics_ShouldReturnOk_WhenUpdateIsSuccessful()
        {
            var siteStatisticId = Guid.NewGuid();

            var SiteStatisticDto = new SiteStatisticDto
            {
                Id = siteStatisticId,
                SiteNumber = "0111",
                CustomerSiteId = Guid.NewGuid(),
                Name = "Hotel Parking",
                TotalRooms = 100,
                PeriodLabel = "2025-07",
                BudgetData = new List<SiteStatisticDetailDto>
                {
                    new SiteStatisticDetailDto
                    {
                        Id = Guid.NewGuid(),
                        Type = "Budget",
                        PeriodLabel = new DateOnly(2025, 7, 1).ToString(),
                        ValetRateDaily = 10,
                        ValetRateMonthly = 200,
                        SelfRateDaily = 5,
                        SelfRateMonthly = 100,
                        BaseRevenue = 7000,
                        OccupiedRooms = 70,
                        Occupancy = 0.91m,
                        SelfOvernight = 50,
                        ValetOvernight = 20,
                        ValetDaily = 40,
                        ValetMonthly = 60,
                        SelfDaily = 30,
                        SelfMonthly = 10,
                        ValetComps = 5,
                        SelfComps = 5,
                        DriveInRatio = 0.5,
                        CaptureRatio = 0.87
                    }
                },
                ForecastData = new List<SiteStatisticDetailDto>
                {
                    new SiteStatisticDetailDto
                    {
                        Id = Guid.NewGuid(),
                        Type = "Forecast",
                        PeriodLabel = new DateOnly(2025, 7, 1).ToString(),
                        ValetRateDaily = 10,
                        ValetRateMonthly = 200,
                        SelfRateDaily = 5,
                        SelfRateMonthly = 100,
                        BaseRevenue = 7000,
                        OccupiedRooms = 70,
                        Occupancy = 0.91m,
                        SelfOvernight = 50,
                        ValetOvernight = 20,
                        ValetDaily = 40,
                        ValetMonthly = 60,
                        SelfDaily = 30,
                        SelfMonthly = 10,
                        ValetComps = 5,
                        SelfComps = 5,
                        DriveInRatio = 0.5,
                        CaptureRatio = 0.87
                    }
                }
            };

            var expectedVo = new SiteStatisticVo
            {
                SiteNumber = "0111",
                Name = "Hotel Parking",
                TotalRooms = 100,
                PeriodLabel = "2025-07",
                BudgetData = new List<SiteStatisticDetailVo>
                {
                    new SiteStatisticDetailVo
                    {
                        Id = Guid.NewGuid(),
                        Type = SiteStatisticDetailType.Budget,
                        Date = new DateOnly(2025, 7, 1),
                        ValetRateDaily = 10,
                        ValetRateMonthly = 200,
                        SelfRateDaily = 5,
                        SelfRateMonthly = 100,
                        BaseRevenue = 7000,
                        OccupiedRooms = 70,
                        Occupancy = 0.91m,
                        SelfOvernight = 50,
                        ValetOvernight = 20,
                        ValetDaily = 40,
                        ValetMonthly = 60,
                        SelfDaily = 30,
                        SelfMonthly = 10,
                        ValetComps = 5,
                        SelfComps = 5,
                        DriveInRatio = 0.5,
                        CaptureRatio = 0.87
                    }
                },
                ForecastData = new List<SiteStatisticDetailVo>
                {
                    new SiteStatisticDetailVo
                    {
                        Id = Guid.NewGuid(),
                        Type = SiteStatisticDetailType.Forecast,
                        Date = new DateOnly(2025, 7, 1),
                        ValetRateDaily = 10,
                        ValetRateMonthly = 200,
                        SelfRateDaily = 5,
                        SelfRateMonthly = 100,
                        BaseRevenue = 7000,
                        OccupiedRooms = 70,
                        Occupancy = 0.91m,
                        SelfOvernight = 50,
                        ValetOvernight = 20,
                        ValetDaily = 40,
                        ValetMonthly = 60,
                        SelfDaily = 30,
                        SelfMonthly = 10,
                        ValetComps = 5,
                        SelfComps = 5,
                        DriveInRatio = 0.5,
                        CaptureRatio = 0.87
                    }
                }
            };

            _siteStatisticServiceAdapter.SaveSiteStatistics(SiteStatisticDto);

            _siteStatisticService.Received(1).SaveSiteStatistics(Arg.Is<SiteStatisticVo>(vo => expectedVo.Equals(expectedVo)));
        }
    }
}
