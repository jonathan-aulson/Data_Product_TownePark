using System;
using System.Collections.Generic;
using System.Linq;
using api.Models.Dto;
using api.Services.Impl.Calculators;
using TownePark.Models.Vo;
using Xunit;

namespace BackendTests.Services
{
    public class RevenueShareCalculatorTest
    {
        private readonly RevenueShareCalculator _calculator;

        public RevenueShareCalculatorTest()
        {
            _calculator = new RevenueShareCalculator();
        }

        [Fact]
        public void CalculateAndApply_WithPassedExternalRevenue_UsesPassedValue()
        {
            // Arrange
            var siteData = new InternalRevenueDataVo
            {
                RevenueShareThresholds = new List<RevenueShareThresholdVo>
                {
                    new RevenueShareThresholdVo
                    {
                        ThresholdStructure = new ThresholdStructureVo
                        {
                            Tiers = new List<ThresholdTierVo>
                            {
                                new ThresholdTierVo
                                {
                                    Amount = 0m,
                                    SharePercentage = 50.0m, // 50% stored as whole number
                                    EffectiveFrom = new DateTime(2025, 1, 1),
                                    EffectiveTo = new DateTime(2025, 12, 31)
                                }
                            }
                        }
                    }
                }
            };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();
            decimal passedExternalRevenue = 2000m;

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, passedExternalRevenue, new List<PnlRowDto>());

            // Assert
            var revenueShare = siteDetailDto.InternalRevenueBreakdown?.RevenueShare;
            Assert.NotNull(revenueShare);
            Assert.Equal(passedExternalRevenue, revenueShare.ForecastedExternalRevenue);
            Assert.Equal(1000m, revenueShare.Total); // 50% of 2000 = 1000
        }

        [Fact]
        public void CalculateAndApply_WithZeroExternalRevenue_UsesZero()
        {
            // Arrange
            var siteData = new InternalRevenueDataVo
            {
                RevenueShareThresholds = new List<RevenueShareThresholdVo>
                {
                    new RevenueShareThresholdVo
                    {
                        ThresholdStructure = new ThresholdStructureVo
                        {
                            Tiers = new List<ThresholdTierVo>
                            {
                                new ThresholdTierVo
                                {
                                    Amount = 0m,
                                    SharePercentage = 50.0m, // 50% stored as whole number
                                    EffectiveFrom = new DateTime(2025, 1, 1),
                                    EffectiveTo = new DateTime(2025, 12, 31)
                                }
                            }
                        }
                    }
                }
            };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();
            decimal passedExternalRevenue = 0m;

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, passedExternalRevenue, new List<PnlRowDto>());

            // Assert
            var revenueShare = siteDetailDto.InternalRevenueBreakdown?.RevenueShare;
            Assert.NotNull(revenueShare);
            Assert.Equal(0m, revenueShare.ForecastedExternalRevenue);
            Assert.Equal(0m, revenueShare.Total);
        }

        [Fact]
        public void CalculateAndApply_WithMultipleTiers_CalculatesCorrectly()
        {
            // Arrange
            var siteData = new InternalRevenueDataVo
            {
                RevenueShareThresholds = new List<RevenueShareThresholdVo>
                {
                    new RevenueShareThresholdVo
                    {
                        ThresholdStructure = new ThresholdStructureVo
                        {
                            Tiers = new List<ThresholdTierVo>
                            {
                                new ThresholdTierVo
                                {
                                    Amount = 0m,
                                    SharePercentage = 30.0m, // 30% for first 1000 (stored as whole number)
                                    EffectiveFrom = new DateTime(2025, 1, 1),
                                    EffectiveTo = new DateTime(2025, 12, 31)
                                },
                                new ThresholdTierVo
                                {
                                    Amount = 1000m,
                                    SharePercentage = 50.0m, // 50% for amounts above 1000 (stored as whole number)
                                    EffectiveFrom = new DateTime(2025, 1, 1),
                                    EffectiveTo = new DateTime(2025, 12, 31)
                                }
                            }
                        }
                    }
                }
            };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();
            decimal passedExternalRevenue = 1500m; // First 1000 at 30%, next 500 at 50%

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, passedExternalRevenue, new List<PnlRowDto>());

            // Assert
            var revenueShare = siteDetailDto.InternalRevenueBreakdown?.RevenueShare;
            Assert.NotNull(revenueShare);
            Assert.Equal(passedExternalRevenue, revenueShare.ForecastedExternalRevenue);
            
            // Expected calculation: (1000 * 0.30) + (500 * 0.50) = 300 + 250 = 550
            Assert.Equal(550m, revenueShare.Total);
            Assert.Equal(2, revenueShare.Tiers.Count);
        }

        [Fact]
        public void CalculateAndApply_WithRealWorldExample_CalculatesCorrectly()
        {
            // Arrange - Using the example from the user query
            var siteData = new InternalRevenueDataVo
            {
                RevenueShareThresholds = new List<RevenueShareThresholdVo>
                {
                    new RevenueShareThresholdVo
                    {
                        ThresholdStructure = new ThresholdStructureVo
                        {
                            Tiers = new List<ThresholdTierVo>
                            {
                                new ThresholdTierVo
                                {
                                    Amount = 0m,
                                    SharePercentage = 30.0m, // 30% stored as whole number
                                    EffectiveFrom = new DateTime(2025, 1, 1),
                                    EffectiveTo = new DateTime(2025, 12, 31)
                                }
                            }
                        }
                    }
                }
            };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();
            decimal passedExternalRevenue = 133509635.10m; // From user query

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, passedExternalRevenue, new List<PnlRowDto>());

            // Assert
            var revenueShare = siteDetailDto.InternalRevenueBreakdown?.RevenueShare;
            Assert.NotNull(revenueShare);
            Assert.Equal(passedExternalRevenue, revenueShare.ForecastedExternalRevenue);
            
            // Expected calculation: 133,509,635.10 * 0.30 = 40,052,890.53
            Assert.Equal(40052890.53m, revenueShare.Total);
            Assert.Single(revenueShare.Tiers);
            Assert.Equal(40052890.53m, revenueShare.Tiers[0].ShareAmount);
        }
    }
} 