using System;
using System.Collections.Generic;
using System.Linq;
using TownePark.Models.Vo;
using api.Models.Dto;
using TownePark;
using api.Data;

namespace api.Services.Impl.Calculators
{
    /// <summary>
    /// Calculator for Support Services within Billable Accounts
    /// Supports both fixed amount and percentage-based calculations (billable or total payroll)
    /// </summary>
    public class SupportServicesCalculator : IInternalRevenueCalculator
    {
        private readonly IBillableExpenseRepository _billableExpenseRepository;

        public SupportServicesCalculator(IBillableExpenseRepository billableExpenseRepository)
        {
            _billableExpenseRepository = billableExpenseRepository;
        }

        public void CalculateAndApply(
            InternalRevenueDataVo siteData,
            int year,
            int monthOneBased,
            MonthValueDto monthValueDto,
            SiteMonthlyRevenueDetailDto siteDetailDto,
            decimal calculatedExternalRevenue,
            List<PnlRowDto> budgetRows)
        {
            var supportServicesDto = CalculateMonthlySupportServicesForSite(siteData, year, monthOneBased, siteDetailDto);
            
            if (siteDetailDto.InternalRevenueBreakdown == null)
            {
                siteDetailDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();
            }
            
            if (siteDetailDto.InternalRevenueBreakdown.BillableAccounts == null)
            {
                siteDetailDto.InternalRevenueBreakdown.BillableAccounts = new BillableAccountsInternalRevenueDto();
            }
            
            // Set Support Services breakdown
            siteDetailDto.InternalRevenueBreakdown.BillableAccounts.SupportServices = supportServicesDto;
            
            // Add Support Services to existing BillableAccounts total
            decimal supportServicesAmount = supportServicesDto?.Total ?? 0m;
            if (siteDetailDto.InternalRevenueBreakdown.BillableAccounts.Total.HasValue)
            {
                siteDetailDto.InternalRevenueBreakdown.BillableAccounts.Total += supportServicesAmount;
            }
            else
            {
                siteDetailDto.InternalRevenueBreakdown.BillableAccounts.Total = supportServicesAmount;
            }

            // Update the overall calculated total internal revenue
            UpdateCalculatedTotalInternalRevenue(siteDetailDto.InternalRevenueBreakdown);
        }

        public void AggregateMonthlyTotals(List<SiteMonthlyRevenueDetailDto> siteDetailsForMonth, MonthValueDto monthValueDto)
        {
            decimal totalSupportServicesForMonth = 0m;

            foreach (var siteDetail in siteDetailsForMonth)
            {
                if (siteDetail.InternalRevenueBreakdown?.BillableAccounts?.SupportServices?.Total != null)
                {
                    totalSupportServicesForMonth += siteDetail.InternalRevenueBreakdown.BillableAccounts.SupportServices.Total.Value;
                }
            }

            if (monthValueDto.InternalRevenueBreakdown == null)
            {
                monthValueDto.InternalRevenueBreakdown = new InternalRevenueBreakdownDto();
            }

            if (monthValueDto.InternalRevenueBreakdown.BillableAccounts == null)
            {
                monthValueDto.InternalRevenueBreakdown.BillableAccounts = new BillableAccountsInternalRevenueDto();
            }

            if (monthValueDto.InternalRevenueBreakdown.BillableAccounts.SupportServices == null)
            {
                monthValueDto.InternalRevenueBreakdown.BillableAccounts.SupportServices = new SupportServicesInternalRevenueDto();
            }

            // Set aggregated Support Services total
            if (monthValueDto.InternalRevenueBreakdown.BillableAccounts.SupportServices.Total.HasValue)
            {
                monthValueDto.InternalRevenueBreakdown.BillableAccounts.SupportServices.Total += totalSupportServicesForMonth;
            }
            else
            {
                monthValueDto.InternalRevenueBreakdown.BillableAccounts.SupportServices.Total = totalSupportServicesForMonth;
            }
            
            // Add Support Services to existing BillableAccounts total at month level
            if (monthValueDto.InternalRevenueBreakdown.BillableAccounts.Total.HasValue)
            {
                monthValueDto.InternalRevenueBreakdown.BillableAccounts.Total += totalSupportServicesForMonth;
            }
            else
            {
                monthValueDto.InternalRevenueBreakdown.BillableAccounts.Total = totalSupportServicesForMonth;
            }
            
            // Update calculated total internal revenue at month level
            UpdateCalculatedTotalInternalRevenue(monthValueDto.InternalRevenueBreakdown);
        }

        private SupportServicesInternalRevenueDto CalculateMonthlySupportServicesForSite(
            InternalRevenueDataVo siteData,
            int year,
            int monthOneBased,
            SiteMonthlyRevenueDetailDto siteDetailDto)
        {
            // Step 1: Check if contract type includes BillingAccount (feature flag guard)
            if (!IsContractTypeBillingAccount(siteData))
            {
                return null; // Skip Support Services calculation
            }

            // Step 2: Get Support Services configuration
            var config = GetSupportServicesConfiguration(siteData);
            if (config == null || config.PayrollSupportEnabled != true)
            {
                return null; // Skip if Support Services not enabled
            }

            decimal supportServicesAmount = 0m;

            // Step 3: Calculate based on billing type
            if (config.PayrollSupportBillingType == "Fixed")
            {
                // Fixed amount
                supportServicesAmount = config.PayrollSupportAmount ?? 0m;
            }
            else if (config.PayrollSupportBillingType == "Percentage")
            {
                // Percentage of payroll - distinguish between TOTAL and BILLABLE
                var payrollTotal = GetPayrollTotalBasedOnType(siteData, year, monthOneBased, config.PayrollSupportPayrollType, siteDetailDto);
                
                if (payrollTotal > 0 && config.PayrollSupportAmount.HasValue)
                {
                    // Percentage stored as whole number (e.g., 10 for 10%)
                    supportServicesAmount = payrollTotal * (config.PayrollSupportAmount.Value / 100m);
                }
            }

            return new SupportServicesInternalRevenueDto
            {
                Total = supportServicesAmount
            };
        }

        private bool IsContractTypeBillingAccount(InternalRevenueDataVo siteData)
        {
            return siteData.Contract?.ContractTypes?.Contains(bs_contracttypechoices.BillingAccount) == true;
        }

        private BillableAccountConfigVo GetSupportServicesConfiguration(InternalRevenueDataVo siteData)
        {
            // Get the first billable account configuration (same pattern as PTEB)
            return siteData.Contract?.BillableAccountsData?.FirstOrDefault();
        }

        private decimal GetPayrollTotalBasedOnType(InternalRevenueDataVo siteData, int year, int monthOneBased, string payrollType, SiteMonthlyRevenueDetailDto siteDetailDto)
        {
            // Get billable payroll from bs_BillableExpense table
            var billablePayroll = _billableExpenseRepository.GetPayrollExpenseBudget(siteData.SiteId, year, monthOneBased);
            
            if (payrollType == "Total")
            {
                // 'TOTAL' = billable expense table payroll expense budget column + PTEB value
                var ptebAmount = siteDetailDto?.InternalRevenueBreakdown?.BillableAccounts?.Pteb?.Total ?? 0m;
                return billablePayroll + ptebAmount;
            }
            else // "Billable" or any other value defaults to billable only
            {
                // 'BILLABLE' = billable expense table payroll expense budget column only
                return billablePayroll;
            }
        }

        private decimal GetPayrollTotalFromBillableExpense(InternalRevenueDataVo siteData, int year, int monthOneBased)
        {
            // Both "Billable" and "Total" payroll types come from the same bs_BillableExpense table
            // The bs_PayrollExpenseBudget field represents the total budget for included (enabled) payroll accounts
            return _billableExpenseRepository.GetPayrollExpenseBudget(siteData.SiteId, year, monthOneBased);
        }

        private void UpdateCalculatedTotalInternalRevenue(InternalRevenueBreakdownDto breakdown)
        {
            decimal total = 0m;
            if (breakdown.FixedFee?.Total != null) total += breakdown.FixedFee.Total.Value;
            if (breakdown.PerOccupiedRoom?.Total != null) total += breakdown.PerOccupiedRoom.Total.Value;
            if (breakdown.RevenueShare?.Total != null) total += breakdown.RevenueShare.Total.Value;
            if (breakdown.BillableAccounts?.Total != null) total += breakdown.BillableAccounts.Total.Value;
            if (breakdown.ManagementAgreement?.Total != null) total += breakdown.ManagementAgreement.Total.Value;
            if (breakdown.OtherRevenue?.Total != null) total += breakdown.OtherRevenue.Total.Value;
            breakdown.CalculatedTotalInternalRevenue = total;
        }
    }
} 