using System;
using System.Collections.Generic;
using System.Linq;
using api.Models.Dto;
using api.Services.Impl.Calculators;
using TownePark.Models.Vo;
using Xunit;

namespace BackendTests.Services
{
    public class ExternalRevenueCalculatorTest
    {
        private readonly ExternalRevenueCalculator _calculator;

        public ExternalRevenueCalculatorTest()
        {
            _calculator = new ExternalRevenueCalculator();
        }

        private SiteStatisticDetailVo CreateStat(DateTime date,
            decimal? vd = null, decimal? vdr = null, decimal? vm = null, decimal? vmr = null,
            decimal? vo = null, decimal? vor = null, decimal? va = null, decimal? var = null,
            decimal? sd = null, decimal? sdr = null, decimal? sm = null, decimal? smr = null,
            decimal? so = null, decimal? sor = null, decimal? sa = null, decimal? sar = null)
        {
            return new SiteStatisticDetailVo
            {
                Date = date,
                ValetDaily = vd, ValetRateDaily = vdr,
                ValetMonthly = vm, ValetRateMonthly = vmr,
                ValetOvernight = vo, // ValetRateOvernight is not in SiteStatisticDetailVo
                ValetAggregator = va, // ValetRateAggregator is not in SiteStatisticDetailVo
                SelfDaily = sd, SelfRateDaily = sdr,
                SelfMonthly = sm, SelfRateMonthly = smr,
                SelfOvernight = so, // SelfRateOvernight is not in SiteStatisticDetailVo
                SelfAggregator = sa  // SelfRateAggregator is not in SiteStatisticDetailVo
            };
        }

        [Fact]
        public void CalculateAndApply_AllComponentsPresent_ComputesCorrectly()
        {
            // Arrange
            var stats = new List<SiteStatisticDetailVo>
            {
                CreateStat(new DateTime(2025, 5, 1), vd: 10, vm: 2, vo: 3, va: 4, sd: 20, sm: 5, so: 6, sa: 7)
            };
            var parkingRateDetails = new List<ParkingRateDetailVo>
            {
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 5, RateCategory = TownePark.bs_ratecategorytypes.ValetDaily },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 100, RateCategory = TownePark.bs_ratecategorytypes.ValetMonthly },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 2, RateCategory = TownePark.bs_ratecategorytypes.SelfDaily },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 50, RateCategory = TownePark.bs_ratecategorytypes.SelfMonthly }
            };
            var parkingRates = new List<ParkingRateVo>
            {
                new ParkingRateVo { Id = Guid.NewGuid(), SiteId = Guid.NewGuid(), Year = 2025, Details = parkingRateDetails }
            };
            var siteData = new InternalRevenueDataVo { SiteStatistics = stats, ParkingRates = parkingRates };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto);

            // Assert
            var breakdown = siteDetailDto.ExternalRevenueBreakdown;
            Assert.NotNull(breakdown);
            Assert.Equal(10, breakdown.ValetDaily.Statistic); Assert.Equal(5, breakdown.ValetDaily.Rate); Assert.Equal(50, breakdown.ValetDaily.Value);
            Assert.Equal(2, breakdown.ValetMonthly.Statistic); Assert.Equal(100, breakdown.ValetMonthly.Rate); Assert.Equal(200, breakdown.ValetMonthly.Value);
            Assert.Equal(3, breakdown.ValetOvernight.Statistic); Assert.Null(breakdown.ValetOvernight.Rate); Assert.Equal(0, breakdown.ValetOvernight.Value);
            Assert.Equal(4, breakdown.ValetAggregator.Statistic); Assert.Null(breakdown.ValetAggregator.Rate); Assert.Equal(0, breakdown.ValetAggregator.Value);
            Assert.Equal(20, breakdown.SelfDaily.Statistic); Assert.Equal(2, breakdown.SelfDaily.Rate); Assert.Equal(40, breakdown.SelfDaily.Value);
            Assert.Equal(5, breakdown.SelfMonthly.Statistic); Assert.Equal(50, breakdown.SelfMonthly.Rate); Assert.Equal(250, breakdown.SelfMonthly.Value);
            Assert.Equal(6, breakdown.SelfOvernight.Statistic); Assert.Null(breakdown.SelfOvernight.Rate); Assert.Equal(0, breakdown.SelfOvernight.Value);
            Assert.Equal(7, breakdown.SelfAggregator.Statistic); Assert.Null(breakdown.SelfAggregator.Rate); Assert.Equal(0, breakdown.SelfAggregator.Value);
            Assert.Equal(50 + 200 + 0 + 0 + 40 + 250 + 0 + 0, breakdown.CalculatedTotalExternalRevenue);
        }

        [Fact]
        public void CalculateAndApply_SomeStatsOrRatesNull_ComputesCorrectly()
        {
            // Arrange
            var stats = new List<SiteStatisticDetailVo>
            {
                CreateStat(new DateTime(2025, 5, 1), vd: 10, vm: null, vo: 3, sd: 20, sm: 5)
            };
            var parkingRateDetails = new List<ParkingRateDetailVo>
            {
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 5, RateCategory = TownePark.bs_ratecategorytypes.ValetDaily },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 100, RateCategory = TownePark.bs_ratecategorytypes.ValetMonthly },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 50, RateCategory = TownePark.bs_ratecategorytypes.SelfMonthly }
            };
            var parkingRates = new List<ParkingRateVo>
            {
                new ParkingRateVo { Id = Guid.NewGuid(), SiteId = Guid.NewGuid(), Year = 2025, Details = parkingRateDetails }
            };
            var siteData = new InternalRevenueDataVo { SiteStatistics = stats, ParkingRates = parkingRates };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, new MonthValueDto(), siteDetailDto);

            // Assert
            var breakdown = siteDetailDto.ExternalRevenueBreakdown;
            Assert.NotNull(breakdown);
            Assert.Equal(50, breakdown.ValetDaily.Value);
            Assert.Equal(0, breakdown.ValetMonthly.Value);
            Assert.Equal(0, breakdown.ValetOvernight.Value);
            Assert.Equal(0, breakdown.SelfDaily.Value);
            Assert.Equal(250, breakdown.SelfMonthly.Value);
            Assert.Equal(50 + 0 + 0 + 0 + 250, breakdown.CalculatedTotalExternalRevenue);
        }

        [Fact]
        public void CalculateAndApply_SomeStatsOrRatesZero_ComputesCorrectly()
        {
            // Arrange
            var stats = new List<SiteStatisticDetailVo>
            {
                CreateStat(new DateTime(2025, 5, 1), vd: 10, vm: 0, vo: 3, sd: 20, sm: 5)
            };
            var parkingRateDetails = new List<ParkingRateDetailVo>
            {
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 5, RateCategory = TownePark.bs_ratecategorytypes.ValetDaily },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 100, RateCategory = TownePark.bs_ratecategorytypes.ValetMonthly },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 0, RateCategory = TownePark.bs_ratecategorytypes.SelfDaily },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 50, RateCategory = TownePark.bs_ratecategorytypes.SelfMonthly }
            };
            var parkingRates = new List<ParkingRateVo>
            {
                new ParkingRateVo { Id = Guid.NewGuid(), SiteId = Guid.NewGuid(), Year = 2025, Details = parkingRateDetails }
            };
            var siteData = new InternalRevenueDataVo { SiteStatistics = stats, ParkingRates = parkingRates };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, new MonthValueDto(), siteDetailDto);

            // Assert
            var breakdown = siteDetailDto.ExternalRevenueBreakdown;
            Assert.NotNull(breakdown);
            Assert.Equal(50, breakdown.ValetDaily.Value);
            Assert.Equal(0, breakdown.ValetMonthly.Value);
            Assert.Equal(0, breakdown.ValetOvernight.Value);
            Assert.Equal(0, breakdown.SelfDaily.Value);
            Assert.Equal(250, breakdown.SelfMonthly.Value);
            Assert.Equal(50 + 0 + 0 + 0 + 250, breakdown.CalculatedTotalExternalRevenue);
        }

        [Fact]
        public void CalculateAndApply_SelfParkingNotApplicable_ComputesCorrectly()
        {
            // Arrange
            var stats = new List<SiteStatisticDetailVo>
            {
                CreateStat(new DateTime(2025, 5, 1), vd: 10, vm: 2, vo: 3, va: 4)
            };
            var parkingRateDetails = new List<ParkingRateDetailVo>
            {
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 5, RateCategory = TownePark.bs_ratecategorytypes.ValetDaily },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 100, RateCategory = TownePark.bs_ratecategorytypes.ValetMonthly }
            };
            var parkingRates = new List<ParkingRateVo>
            {
                new ParkingRateVo { Id = Guid.NewGuid(), SiteId = Guid.NewGuid(), Year = 2025, Details = parkingRateDetails }
            };
            var siteData = new InternalRevenueDataVo { SiteStatistics = stats, ParkingRates = parkingRates };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, new MonthValueDto(), siteDetailDto);

            // Assert
            var b = siteDetailDto.ExternalRevenueBreakdown;
            Assert.NotNull(b);
            Assert.Equal(50, b.ValetDaily.Value);
            Assert.Equal(200, b.ValetMonthly.Value);
            Assert.Equal(0, b.ValetOvernight.Value);
            Assert.Equal(0, b.ValetAggregator.Value);
            Assert.Equal(0, b.SelfDaily.Value);
            Assert.Equal(0, b.SelfMonthly.Value);
            Assert.Equal(0, b.SelfOvernight.Value);
            Assert.Equal(0, b.SelfAggregator.Value);
            Assert.Equal(50 + 200, b.CalculatedTotalExternalRevenue);
        }

        [Fact]
        public void CalculateAndApply_MultipleDaysInMonth_AggregatesStatsAndUsesFirstRate()
        {
            // Arrange
            var stats = new List<SiteStatisticDetailVo>
            {
                CreateStat(new DateTime(2025, 5, 1), vd: 10, sm: 2),
                CreateStat(new DateTime(2025, 5, 2), vd: 15, sm: 3),
                CreateStat(new DateTime(2025, 5, 3), vd: 5, sm: 1)
            };
            var parkingRateDetails = new List<ParkingRateDetailVo>
            {
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 5, RateCategory = TownePark.bs_ratecategorytypes.ValetDaily },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 50, RateCategory = TownePark.bs_ratecategorytypes.SelfMonthly }
            };
            var parkingRates = new List<ParkingRateVo>
            {
                new ParkingRateVo { Id = Guid.NewGuid(), SiteId = Guid.NewGuid(), Year = 2025, Details = parkingRateDetails }
            };
            var siteData = new InternalRevenueDataVo { SiteStatistics = stats, ParkingRates = parkingRates };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, new MonthValueDto(), siteDetailDto);

            // Assert
            var b = siteDetailDto.ExternalRevenueBreakdown;
            Assert.NotNull(b);
            Assert.Equal(30, b.ValetDaily.Statistic); Assert.Equal(5, b.ValetDaily.Rate); Assert.Equal(150, b.ValetDaily.Value);
            Assert.Equal(6, b.SelfMonthly.Statistic); Assert.Equal(50, b.SelfMonthly.Rate); Assert.Equal(300, b.SelfMonthly.Value);
            Assert.Equal(150 + 300, b.CalculatedTotalExternalRevenue);
        }

        [Fact]
        public void CalculateAndApply_NoStatisticsForMonth_ReturnsNullBreakdown()
        {
            // Arrange
            var stats = new List<SiteStatisticDetailVo>
            {
                CreateStat(new DateTime(2025, 4, 1), vd: 10) // Data for April
            };
            var parkingRates = new List<ParkingRateVo>();
            var siteData = new InternalRevenueDataVo { SiteStatistics = stats, ParkingRates = parkingRates };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, new MonthValueDto(), siteDetailDto); // Requesting May

            // Assert
            Assert.Null(siteDetailDto.ExternalRevenueBreakdown);
        }
        
        [Fact]
        public void CalculateAndApply_OnlyValetDailyAndSelfMonthly_ComputesCorrectly()
        {
            // Arrange
            var stats = new List<SiteStatisticDetailVo>
            {
                CreateStat(new DateTime(2025, 5, 1), vd: 10, sm: 2)
            };
            var parkingRateDetails = new List<ParkingRateDetailVo>
            {
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 5, RateCategory = TownePark.bs_ratecategorytypes.ValetDaily },
                new ParkingRateDetailVo { Id = Guid.NewGuid(), Month = 5, Rate = 50, RateCategory = TownePark.bs_ratecategorytypes.SelfMonthly }
            };
            var parkingRates = new List<ParkingRateVo>
            {
                new ParkingRateVo { Id = Guid.NewGuid(), SiteId = Guid.NewGuid(), Year = 2025, Details = parkingRateDetails }
            };
            var siteData = new InternalRevenueDataVo { SiteStatistics = stats, ParkingRates = parkingRates };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, new MonthValueDto(), siteDetailDto);

            // Assert
            var b = siteDetailDto.ExternalRevenueBreakdown;
            Assert.NotNull(b);
            Assert.Equal(50, b.ValetDaily.Value);
            Assert.Equal(0, b.ValetMonthly.Value);
            Assert.Equal(0, b.ValetOvernight.Value);
            Assert.Equal(0, b.ValetAggregator.Value);
            Assert.Equal(0, b.SelfDaily.Value);
            Assert.Equal(100, b.SelfMonthly.Value);
            Assert.Equal(0, b.SelfOvernight.Value);
            Assert.Equal(0, b.SelfAggregator.Value);
            Assert.Equal(50 + 100, b.CalculatedTotalExternalRevenue);
        }

        [Fact]
        public void CalculateAndApply_HandlesMissingOvernightAndAggregatorRates()
        {
            // Arrange
            var stats = new List<SiteStatisticDetailVo>
            {
                CreateStat(new DateTime(2025, 5, 1), vo: 10, va: 20, so: 30, sa: 40)
            };
            var parkingRates = new List<ParkingRateVo>(); // No rates for overnight/aggregator
            var siteData = new InternalRevenueDataVo { SiteStatistics = stats, ParkingRates = parkingRates };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, new MonthValueDto(), siteDetailDto);

            // Assert
            var b = siteDetailDto.ExternalRevenueBreakdown;
            Assert.NotNull(b);
            Assert.Equal(10, b.ValetOvernight.Statistic); Assert.Null(b.ValetOvernight.Rate); Assert.Equal(0, b.ValetOvernight.Value);
            Assert.Equal(20, b.ValetAggregator.Statistic); Assert.Null(b.ValetAggregator.Rate); Assert.Equal(0, b.ValetAggregator.Value);
            Assert.Equal(30, b.SelfOvernight.Statistic); Assert.Null(b.SelfOvernight.Rate); Assert.Equal(0, b.SelfOvernight.Value);
            Assert.Equal(40, b.SelfAggregator.Statistic); Assert.Null(b.SelfAggregator.Rate); Assert.Equal(0, b.SelfAggregator.Value);
            Assert.Equal(0, b.CalculatedTotalExternalRevenue);
        }
    }
}
