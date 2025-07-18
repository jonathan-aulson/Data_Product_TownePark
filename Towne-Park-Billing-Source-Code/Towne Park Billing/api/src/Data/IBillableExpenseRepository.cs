using System;

namespace api.Data
{
    public interface IBillableExpenseRepository
    {
        /// <summary>
        /// Gets the payroll expense budget for a specific site and period
        /// </summary>
        /// <param name="siteId">The site ID</param>
        /// <param name="year">The year</param>
        /// <param name="monthOneBased">The month (1-based)</param>
        /// <returns>The payroll expense budget amount, or 0 if not found</returns>
        decimal GetPayrollExpenseBudget(Guid siteId, int year, int monthOneBased);

        /// <summary>
        /// Gets the billable expense budget for a specific site and period
        /// Includes all enabled 7000-range accounts except the 12 other expense accounts
        /// </summary>
        /// <param name="siteId">The site ID</param>
        /// <param name="year">The year</param>
        /// <param name="monthOneBased">The month (1-based)</param>
        /// <returns>The billable expense budget amount, or 0 if not found</returns>
        decimal GetBillableExpenseBudget(Guid siteId, int year, int monthOneBased);

        /// <summary>
        /// Gets the other expense budget for a specific site and period
        /// Includes budget values for the 12 specific other expense accounts
        /// </summary>
        /// <param name="siteId">The site ID</param>
        /// <param name="year">The year</param>
        /// <param name="monthOneBased">The month (1-based)</param>
        /// <returns>The other expense budget amount, or 0 if not found</returns>
        decimal GetOtherExpenseBudget(Guid siteId, int year, int monthOneBased);
    }
} 