using System;
using api.Services;
using TownePark;
using Microsoft.Xrm.Sdk.Query;

namespace api.Data.Impl
{
    public class BillableExpenseRepository : IBillableExpenseRepository
    {
        private readonly IDataverseService _dataverseService;

        public BillableExpenseRepository(IDataverseService dataverseService)
        {
            _dataverseService = dataverseService;
        }

        public decimal GetPayrollExpenseBudget(Guid siteId, int year, int monthOneBased)
        {
            try
            {
                var serviceClient = _dataverseService.GetServiceClient();
                
                // Format period as "yyyy-mm" to match the expected format in bs_period
                var period = $"{year:D4}{monthOneBased:D2}";
                
                // Build query to find the billable expense record for this site and period
                var query = new QueryExpression(bs_BillableExpense.EntityLogicalName)
                {
                    ColumnSet = new ColumnSet(bs_BillableExpense.Fields.bs_PayrollExpenseBudget),
                    Criteria = new FilterExpression(LogicalOperator.And)
                };
                
                // Filter by site ID
                query.Criteria.AddCondition(bs_BillableExpense.Fields.bs_SiteId, ConditionOperator.Equal, siteId);
                
                // Filter by period
                query.Criteria.AddCondition(bs_BillableExpense.Fields.bs_Period, ConditionOperator.Equal, period);
                
                var results = serviceClient.RetrieveMultiple(query);
                
                if (results.Entities.Count > 0)
                {
                    var billableExpense = results.Entities[0].ToEntity<bs_BillableExpense>();
                    return billableExpense.bs_PayrollExpenseBudget ?? 0m;
                }
                
                return 0m;
            }
            catch (Exception)
            {
                // Log the exception if logging is available
                // For now, return 0 to prevent calculation failures
                return 0m;
            }
        }

        public decimal GetBillableExpenseBudget(Guid siteId, int year, int monthOneBased)
        {
            try
            {
                var serviceClient = _dataverseService.GetServiceClient();
                
                // Format period as "YYYYMM" to match the expected format in bs_period
                var period = $"{year:D4}{monthOneBased:D2}";
                
                // Build query to find the billable expense record for this site and period
                var query = new QueryExpression(bs_BillableExpense.EntityLogicalName)
                {
                    ColumnSet = new ColumnSet(bs_BillableExpense.Fields.bs_BillableExpenseBudget),
                    Criteria = new FilterExpression(LogicalOperator.And)
                };
                
                // Filter by site ID
                query.Criteria.AddCondition(bs_BillableExpense.Fields.bs_SiteId, ConditionOperator.Equal, siteId);
                
                // Filter by period
                query.Criteria.AddCondition(bs_BillableExpense.Fields.bs_Period, ConditionOperator.Equal, period);
                
                var results = serviceClient.RetrieveMultiple(query);
                
                if (results.Entities.Count > 0)
                {
                    var billableExpense = results.Entities[0].ToEntity<bs_BillableExpense>();
                    return billableExpense.bs_BillableExpenseBudget ?? 0m;
                }
                
                return 0m;
            }
            catch (Exception)
            {
                // Log the exception if logging is available
                // For now, return 0 to prevent calculation failures
                return 0m;
            }
        }

        public decimal GetOtherExpenseBudget(Guid siteId, int year, int monthOneBased)
        {
            try
            {
                var serviceClient = _dataverseService.GetServiceClient();
                
                // Format period as "YYYYMM" to match the expected format in bs_period
                var period = $"{year:D4}{monthOneBased:D2}";
                
                // Build query to find the billable expense record for this site and period
                var query = new QueryExpression(bs_BillableExpense.EntityLogicalName)
                {
                    ColumnSet = new ColumnSet(bs_BillableExpense.Fields.bs_OtherExpenseBudget),
                    Criteria = new FilterExpression(LogicalOperator.And)
                };
                
                // Filter by site ID
                query.Criteria.AddCondition(bs_BillableExpense.Fields.bs_SiteId, ConditionOperator.Equal, siteId);
                
                // Filter by period
                query.Criteria.AddCondition(bs_BillableExpense.Fields.bs_Period, ConditionOperator.Equal, period);
                
                var results = serviceClient.RetrieveMultiple(query);
                
                if (results.Entities.Count > 0)
                {
                    var billableExpense = results.Entities[0].ToEntity<bs_BillableExpense>();
                    return billableExpense.bs_OtherExpenseBudget ?? 0m;
                }
                
                return 0m;
            }
            catch (Exception)
            {
                // Log the exception if logging is available
                // For now, return 0 to prevent calculation failures
                return 0m;
            }
        }
    }
} 