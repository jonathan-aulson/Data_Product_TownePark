using TownePark;

namespace api.Data
{
    public interface IOtherExpenseRepository
    {
        IEnumerable<bs_OtherExpenseDetail>? GetOtherExpenseDetail(Guid siteId, string billingPeriod);
        void UpdateOtherRevenueDetails(List<bs_OtherExpenseDetail> details);

        /// <summary>
        /// Gets the forecast total for a specific expense account field for a given site and month
        /// </summary>
        /// <param name="siteId">The site ID</param>
        /// <param name="year">The year</param>
        /// <param name="monthOneBased">The month (1-based)</param>
        /// <param name="accountFieldName">The field name for the specific account (e.g., "bs_EmployeeRelations")</param>
        /// <returns>The forecast amount for the account, or 0 if not found</returns>
        decimal GetMonthlyAccountTotal(Guid siteId, int year, int monthOneBased, string accountFieldName);
    }
}
