using System;
using System.Collections.Generic;
using Xunit;
using api.Services.Impl.Calculators;
using api.Models.Dto;
using TownePark.Models.Vo;
using TownePark;
using api.Data;
using NSubstitute;

namespace BackendTests.Services
{
    public class SupportServicesCalculatorTest
    {
        private readonly SupportServicesCalculator _calculator;
        private readonly IBillableExpenseRepository _mockRepository;

        public SupportServicesCalculatorTest()
        {
            _mockRepository = Substitute.For<IBillableExpenseRepository>();
            _calculator = new SupportServicesCalculator(_mockRepository);
        }

        [Fact]
        public void CalculateAndApply_WhenContractTypeNotBillingAccount_SkipsSupportServicesCalculation()
        {
            // Arrange
            var siteData = CreateTestSiteDataWithoutBillingAccount();
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.Null(supportServices); // Should be null since contract type doesn't include BillingAccount
        }

        [Fact]
        public void CalculateAndApply_WhenSupportServicesDisabled_SkipsSupportServicesCalculation()
        {
            // Arrange
            var siteData = CreateTestSiteDataWithConfig(supportServicesEnabled: false);
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.Null(supportServices); // Should be null since Support Services is disabled
        }

        [Fact]
        public void CalculateAndApply_SupportServicesAsFixedAmount_CalculatesCorrectly()
        {
            // Arrange - Scenario 7: Support Services as Fixed Amount ($2,500)
            var siteData = CreateTestSiteDataWithConfig(
                supportServicesEnabled: true,
                billingType: "Fixed",
                amount: 2500.0m
            );
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(2500.0m, supportServices.Total);
            
            // Verify it's added to BillableAccounts total
            Assert.Equal(2500.0m, siteDetailDto.InternalRevenueBreakdown.BillableAccounts.Total);
            
            // Verify it's added to overall calculated total
            Assert.Equal(2500.0m, siteDetailDto.InternalRevenueBreakdown.CalculatedTotalInternalRevenue);
        }

        [Fact]
        public void CalculateAndApply_SupportServicesAsPercentageOfBillablePayroll_CalculatesCorrectly()
        {
            // Arrange - Scenario 8: Support Services as Percentage of Billable Payroll (10%)
            var siteData = CreateTestSiteDataWithConfig(
                supportServicesEnabled: true,
                billingType: "Percentage",
                amount: 10.0m,
                payrollType: "Billable"
            );
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Mock repository to return forecasted billable payroll
            _mockRepository.GetPayrollExpenseBudget(siteData.SiteId, 2025, 5).Returns(50000.0m);

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(5000.0m, supportServices.Total); // 50,000 * 10% = 5,000
            
            // Verify it's added to BillableAccounts total
            Assert.Equal(5000.0m, siteDetailDto.InternalRevenueBreakdown.BillableAccounts.Total);
        }

        [Fact]
        public void CalculateAndApply_SupportServicesAsPercentageOfTotalPayroll_CalculatesCorrectly()
        {
            // Arrange - Support Services as Percentage of Total Payroll (15%)
            var siteData = CreateTestSiteDataWithConfig(
                supportServicesEnabled: true,
                billingType: "Percentage",
                amount: 15.0m,
                payrollType: "Total"
            );
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Mock repository to return total payroll
            _mockRepository.GetPayrollExpenseBudget(siteData.SiteId, 2025, 5).Returns(80000.0m);

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(12000.0m, supportServices.Total); // 80,000 * 15% = 12,000
        }

        [Fact]
        public void CalculateAndApply_PercentageTypeWithZeroPayroll_ReturnsZero()
        {
            // Arrange - Edge case: Zero payroll
            var siteData = CreateTestSiteDataWithConfig(
                supportServicesEnabled: true,
                billingType: "Percentage",
                amount: 10.0m
            );
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Mock repository to return zero payroll
            _mockRepository.GetPayrollExpenseBudget(siteData.SiteId, 2025, 5).Returns(0m);

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(0m, supportServices.Total);
        }

        [Fact]
        public void CalculateAndApply_PercentageTypeWithNullAmount_ReturnsZero()
        {
            // Arrange - Edge case: Null percentage amount
            var siteData = CreateTestSiteDataWithConfig(
                supportServicesEnabled: true,
                billingType: "Percentage",
                amount: null
            );
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Mock repository to return payroll
            _mockRepository.GetPayrollExpenseBudget(siteData.SiteId, 2025, 5).Returns(10000.0m);

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(0m, supportServices.Total);
        }

        [Fact]
        public void CalculateAndApply_FixedTypeWithNullAmount_ReturnsZero()
        {
            // Arrange - Edge case: Fixed amount with null value
            var siteData = CreateTestSiteDataWithConfig(
                supportServicesEnabled: true,
                billingType: "Fixed",
                amount: null
            );
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(0m, supportServices.Total);
        }

        [Fact]
        public void CalculateAndApply_NullConfiguration_SkipsSupportServicesCalculation()
        {
            // Arrange - Edge case: No billable accounts configuration
            var siteData = new InternalRevenueDataVo
            {
                SiteId = Guid.NewGuid(),
                SiteNumber = "0170",
                Contract = new ContractDataVo
                {
                    ContractId = Guid.NewGuid(),
                    ContractTypes = new[] { bs_contracttypechoices.BillingAccount },
                    BillableAccountsData = new List<BillableAccountConfigVo>() // Empty list
                }
            };
            var siteDetailDto = new SiteMonthlyRevenueDetailDto();
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.Null(supportServices);
        }

        [Fact]
        public void CalculateAndApply_AddsToExistingBillableAccountsTotal()
        {
            // Arrange - Test that Support Services adds to existing BillableAccounts total
            var siteData = CreateTestSiteDataWithConfig(
                supportServicesEnabled: true,
                billingType: "Fixed",
                amount: 1000.0m
            );
            var siteDetailDto = new SiteMonthlyRevenueDetailDto
            {
                InternalRevenueBreakdown = new InternalRevenueBreakdownDto
                {
                    BillableAccounts = new BillableAccountsInternalRevenueDto
                    {
                        Total = 5000.0m // Existing total from other components (PTEB, Additional Payroll, etc.)
                    }
                }
            };
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.CalculateAndApply(siteData, 2025, 5, monthValueDto, siteDetailDto, 0m, new List<PnlRowDto>());

            // Assert
            var supportServices = siteDetailDto.InternalRevenueBreakdown.BillableAccounts.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(1000.0m, supportServices.Total);
            
            // Verify it adds to existing total
            Assert.Equal(6000.0m, siteDetailDto.InternalRevenueBreakdown.BillableAccounts.Total); // 5000 + 1000
        }

        [Fact]
        public void AggregateMonthlyTotals_AggregatesSupportServicesCorrectly()
        {
            // Arrange
            var siteDetails = new List<SiteMonthlyRevenueDetailDto>
            {
                CreateSiteDetailWithSupportServices("site1", 1500.0m),
                CreateSiteDetailWithSupportServices("site2", 2000.0m),
                CreateSiteDetailWithSupportServices("site3", 750.0m)
            };
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.AggregateMonthlyTotals(siteDetails, monthValueDto);

            // Assert
            var supportServices = monthValueDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(4250.0m, supportServices.Total); // 1500 + 2000 + 750
            
            // Verify it's added to BillableAccounts total at month level
            Assert.Equal(4250.0m, monthValueDto.InternalRevenueBreakdown.BillableAccounts.Total);
        }

        [Fact]
        public void AggregateMonthlyTotals_HandlesNullSupportServices()
        {
            // Arrange - Mix of sites with and without Support Services
            var siteDetails = new List<SiteMonthlyRevenueDetailDto>
            {
                CreateSiteDetailWithSupportServices("site1", 1000.0m),
                new SiteMonthlyRevenueDetailDto { SiteId = "site2" }, // No Support Services
                CreateSiteDetailWithSupportServices("site3", 500.0m)
            };
            var monthValueDto = new MonthValueDto();

            // Act
            _calculator.AggregateMonthlyTotals(siteDetails, monthValueDto);

            // Assert
            var supportServices = monthValueDto.InternalRevenueBreakdown?.BillableAccounts?.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(1500.0m, supportServices.Total); // 1000 + 0 + 500
        }

        [Fact]
        public void AggregateMonthlyTotals_AddsToExistingMonthlyBillableAccountsTotal()
        {
            // Arrange - Test aggregation with existing monthly totals
            var siteDetails = new List<SiteMonthlyRevenueDetailDto>
            {
                CreateSiteDetailWithSupportServices("site1", 800.0m),
                CreateSiteDetailWithSupportServices("site2", 1200.0m)
            };
            var monthValueDto = new MonthValueDto
            {
                InternalRevenueBreakdown = new InternalRevenueBreakdownDto
                {
                    BillableAccounts = new BillableAccountsInternalRevenueDto
                    {
                        Total = 10000.0m // Existing total from other components
                    }
                }
            };

            // Act
            _calculator.AggregateMonthlyTotals(siteDetails, monthValueDto);

            // Assert
            var supportServices = monthValueDto.InternalRevenueBreakdown.BillableAccounts.SupportServices;
            Assert.NotNull(supportServices);
            Assert.Equal(2000.0m, supportServices.Total); // 800 + 1200
            
            // Verify it adds to existing monthly total
            Assert.Equal(12000.0m, monthValueDto.InternalRevenueBreakdown.BillableAccounts.Total); // 10000 + 2000
        }

        private InternalRevenueDataVo CreateTestSiteDataWithoutBillingAccount()
        {
            return new InternalRevenueDataVo
            {
                SiteId = Guid.NewGuid(),
                SiteNumber = "0170",
                Contract = new ContractDataVo
                {
                    ContractId = Guid.NewGuid(),
                    ContractTypes = new[] { bs_contracttypechoices.FixedFee } // No BillingAccount
                }
            };
        }

        private InternalRevenueDataVo CreateTestSiteDataWithConfig(
            bool supportServicesEnabled = true,
            string billingType = "Fixed",
            decimal? amount = null,
            string payrollType = "Billable")
        {
            return new InternalRevenueDataVo
            {
                SiteId = Guid.NewGuid(),
                SiteNumber = "0170",
                Contract = new ContractDataVo
                {
                    ContractId = Guid.NewGuid(),
                    ContractTypes = new[] { bs_contracttypechoices.BillingAccount },
                    BillableAccountsData = new List<BillableAccountConfigVo>
                    {
                        new BillableAccountConfigVo
                        {
                            Id = Guid.NewGuid(),
                            PayrollSupportEnabled = supportServicesEnabled,
                            PayrollSupportBillingType = billingType,
                            PayrollSupportAmount = amount,
                            PayrollSupportPayrollType = payrollType
                        }
                    }
                }
            };
        }

        private SiteMonthlyRevenueDetailDto CreateSiteDetailWithSupportServices(string siteId, decimal supportServicesTotal)
        {
            return new SiteMonthlyRevenueDetailDto
            {
                SiteId = siteId,
                InternalRevenueBreakdown = new InternalRevenueBreakdownDto
                {
                    BillableAccounts = new BillableAccountsInternalRevenueDto
                    {
                        SupportServices = new SupportServicesInternalRevenueDto
                        {
                            Total = supportServicesTotal
                        }
                    }
                }
            };
        }
    }
} 