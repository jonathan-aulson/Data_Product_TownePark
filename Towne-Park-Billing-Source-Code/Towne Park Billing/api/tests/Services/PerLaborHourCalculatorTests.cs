using Xunit;
using NSubstitute;
using api.Services.Impl.Calculators;
using api.Data;
using TownePark.Models.Vo;
using api.Models.Dto;
using TownePark;
using System;
using System.Collections.Generic;
using TownePark.Models.Vo; // For ContractVo, LaborHourJobVo, etc.

namespace BackendTests.Services
{
    public class PerLaborHourCalculatorTests
    {
        private readonly IPayrollRepository _payrollRepoSub;
        private readonly PerLaborHourCalculator _calculator;

        public PerLaborHourCalculatorTests()
        {
            _payrollRepoSub = Substitute.For<IPayrollRepository>();
            _calculator = new PerLaborHourCalculator(_payrollRepoSub);
        }

        private Dictionary<string, object> CreatePayrollDetail(string jobCode, decimal hours)
        {
            return new Dictionary<string, object>
            {
                { "bs_DisplayName", jobCode },
                { "bs_RegularHours", hours }
            };
        }

        #region AggregateMonthlyTotals Tests

        [Fact]
        public void AggregateMonthlyTotals_SumsAllSites()
        {
            // Arrange
            var site1 = new SiteMonthlyRevenueDetailDto
            {
                InternalRevenueBreakdown = new InternalRevenueBreakdownDto
                {
                    PerLaborHour = new PerLaborHourInternalRevenueDto { Total = 100m }
                }
            };
            var site2 = new SiteMonthlyRevenueDetailDto
            {
                InternalRevenueBreakdown = new InternalRevenueBreakdownDto
                {
                    PerLaborHour = new PerLaborHourInternalRevenueDto { Total = 200m }
                }
            };
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.AggregateMonthlyTotals(new List<SiteMonthlyRevenueDetailDto> { site1, site2 }, monthValueDto);

            // Assert
            Assert.NotNull(monthValueDto.InternalRevenueBreakdown);
            Assert.Equal(300m, monthValueDto.InternalRevenueBreakdown.PerLaborHour.Total);
        }

        [Fact]
        public void AggregateMonthlyTotals_WithEmptyList_SetsZeroTotal()
        {
            // Arrange
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.AggregateMonthlyTotals(new List<SiteMonthlyRevenueDetailDto>(), monthValueDto);

            // Assert
            Assert.NotNull(monthValueDto.InternalRevenueBreakdown);
            Assert.Equal(0m, monthValueDto.InternalRevenueBreakdown.PerLaborHour.Total);
        }

        [Fact]
        public void AggregateMonthlyTotals_WithNullInternalRevenueBreakdown_HandlesGracefully()
        {
            // Arrange
            var site = new SiteMonthlyRevenueDetailDto
            {
                InternalRevenueBreakdown = null
            };
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.AggregateMonthlyTotals(new List<SiteMonthlyRevenueDetailDto> { site }, monthValueDto);

            // Assert
            Assert.NotNull(monthValueDto.InternalRevenueBreakdown);
            Assert.Equal(0m, monthValueDto.InternalRevenueBreakdown.PerLaborHour.Total);
        }

        [Fact]
        public void AggregateMonthlyTotals_WithNullPerLaborHour_HandlesGracefully()
        {
            // Arrange
            var site = new SiteMonthlyRevenueDetailDto
            {
                InternalRevenueBreakdown = new InternalRevenueBreakdownDto
                {
                    PerLaborHour = null
                }
            };
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.AggregateMonthlyTotals(new List<SiteMonthlyRevenueDetailDto> { site }, monthValueDto);

            // Assert
            Assert.NotNull(monthValueDto.InternalRevenueBreakdown);
            Assert.Equal(0m, monthValueDto.InternalRevenueBreakdown.PerLaborHour.Total);
        }

        #endregion

        #region CalculateAndApply Tests

        [Fact]
        public void CalculateAndApply_WithNoPayroll_UsesBudgetHours()
        {
            // Arrange
            var siteId = Guid.NewGuid();
            var jobCode = "J03";
            var year = 2025;
            var month = 7;

            _payrollRepoSub.GetPayroll(siteId, $"{year}{month:D2}").Returns((bs_Payroll)null);

            var siteData = new InternalRevenueDataVo
            {
                SiteId = siteId,
                SiteNumber = siteId.ToString(),
                LaborHourJobs = new List<LaborHourJobVo>
                {
                    new LaborHourJobVo
                    {
                        JobCode = jobCode,
                        Rate = 15m,
                        StartDate = new DateTime(2020, 1, 1),
                        EndDate = null
                    }
                },
                Contract = new ContractDataVo()
            };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();
            decimal calculatedExternalRevenue = 0m;

            // BudgetRows setup
            var budgetRows = new List<PnlRowDto>
            {
                new PnlRowDto
                {
                    ColumnName = "PerLaborHour",
                    MonthlyValues = new List<MonthValueDto>
                    {
                        new MonthValueDto
                        {
                            Month = month - 1,
                            SiteDetails = new List<SiteMonthlyRevenueDetailDto>
                            {
                                new SiteMonthlyRevenueDetailDto
                                {
                                    SiteId = siteId.ToString(),
                                    InternalRevenueBreakdown = new InternalRevenueBreakdownDto
                                    {
                                        PerLaborHour = new PerLaborHourInternalRevenueDto
                                        {
                                            Total = 8m // 8 hours budgeted
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            // Act
            _calculator.CalculateAndApply(siteData, year, month, monthValueDto, siteDetailDto, calculatedExternalRevenue, budgetRows);

            // Assert
            var perLaborHour = siteDetailDto.InternalRevenueBreakdown?.PerLaborHour;
            Assert.NotNull(perLaborHour);
            Assert.Equal(120m, perLaborHour.Total); // 8 hours * $15
            Assert.Equal(120m, siteDetailDto.InternalRevenueBreakdown.CalculatedTotalInternalRevenue);
        }

        [Fact]
        public void CalculateAndApply_WithNoJobs_SetsZero()
        {
            // Arrange
            var siteId = Guid.NewGuid();
            var year = 2025;
            var month = 8;

            _payrollRepoSub.GetPayroll(siteId, $"{year}{month:D2}").Returns((bs_Payroll)null);

            var siteData = new InternalRevenueDataVo
            {
                SiteId = siteId,
                SiteNumber = "0111",
                LaborHourJobs = null,
                Contract = new ContractDataVo()
            };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();
            decimal calculatedExternalRevenue = 0m;

            // Act
            _calculator.CalculateAndApply(siteData, year, month, monthValueDto, siteDetailDto, calculatedExternalRevenue, new List<PnlRowDto>());

            // Assert
            var perLaborHour = siteDetailDto.InternalRevenueBreakdown?.PerLaborHour;
            Assert.NotNull(perLaborHour);
            Assert.Equal(0m, perLaborHour.Total);
            Assert.Equal(0m, siteDetailDto.InternalRevenueBreakdown.CalculatedTotalInternalRevenue);
        }

        #endregion
    }
}
