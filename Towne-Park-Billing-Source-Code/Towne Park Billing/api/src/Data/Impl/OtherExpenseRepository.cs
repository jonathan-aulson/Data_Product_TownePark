using api.Services;
using api.Usecases;
using Microsoft.Xrm.Sdk.Query;
using TownePark;

namespace api.Data.Impl
{
    public class OtherExpenseRepository : IOtherExpenseRepository
    {
        private readonly IDataverseService _dataverseService;
        private readonly IMonthRangeGenerator _monthRangeGenerator;

        public OtherExpenseRepository(IDataverseService dataverseService, IMonthRangeGenerator monthRangeGenerator)
        {
            _dataverseService = dataverseService;
            _monthRangeGenerator = monthRangeGenerator;
        }
    
        public IEnumerable<bs_OtherExpenseDetail>? GetOtherExpenseDetail(Guid siteId, string billingPeriod)
        {
            var serviceClient = _dataverseService.GetServiceClient();
            var months = _monthRangeGenerator.GenerateMonthRange(billingPeriod, 12);

            var query = new QueryExpression(bs_OtherExpenseDetail.EntityLogicalName)
            {
                ColumnSet = new ColumnSet(
                    bs_OtherExpenseDetail.Fields.bs_OtherExpenseDetailId,
                    bs_OtherExpenseDetail.Fields.bs_EmployeeRelations,
                    bs_OtherExpenseDetail.Fields.bs_FuelVehicles,
                    bs_OtherExpenseDetail.Fields.bs_LossAndDamageClaims,
                    bs_OtherExpenseDetail.Fields.bs_OfficeSupplies,
                    bs_OtherExpenseDetail.Fields.bs_OutsideServices,
                    bs_OtherExpenseDetail.Fields.bs_RentsParking,
                    bs_OtherExpenseDetail.Fields.bs_RepairsAndMaintenance,
                    bs_OtherExpenseDetail.Fields.bs_RepairsAndMaintenanceVehicle,
                    bs_OtherExpenseDetail.Fields.bs_Signage,
                    bs_OtherExpenseDetail.Fields.bs_SuppliesAndEquipment,
                    bs_OtherExpenseDetail.Fields.bs_TicketsAndPrintedMaterial,
                    bs_OtherExpenseDetail.Fields.bs_Uniforms,
                    bs_OtherExpenseDetail.Fields.bs_MonthYear,
                    bs_OtherExpenseDetail.Fields.bs_CustomerSiteFK
                ),
                Criteria = new FilterExpression(LogicalOperator.And)
            };

            query.Criteria.AddCondition(
                bs_OtherExpenseDetail.Fields.bs_CustomerSiteFK,
                ConditionOperator.Equal,
                siteId);
            query.Criteria.AddCondition(
                bs_OtherExpenseDetail.Fields.bs_MonthYear,
                ConditionOperator.In,
                months.ToArray());

            var result = serviceClient.RetrieveMultiple(query);

            if (result.Entities.Count == 0)
                return null;

            var otherExpenseDetails = result.Entities
                .Select(e => e.ToEntity<bs_OtherExpenseDetail>())
                .ToList();

            return otherExpenseDetails;
        }

        public void UpdateOtherRevenueDetails(List<bs_OtherExpenseDetail> details)
        {
            var serviceClient = _dataverseService.GetServiceClient();

            foreach (var detail in details)
            {
                if (detail.Id == Guid.Empty)
                {
                    // Create a new record
                    detail.Id = Guid.NewGuid();
                    serviceClient.Create(detail);
                }
                else
                {
                    // Update the existing record
                    serviceClient.Update(detail);
                }
            }
        }

        public decimal GetMonthlyAccountTotal(Guid siteId, int year, int monthOneBased, string accountFieldName)
        {
            try
            {
                var serviceClient = _dataverseService.GetServiceClient();
                
                // Format month-year as "YYYY-MM" to match bs_MonthYear field
                var monthYear = $"{year:D4}-{monthOneBased:D2}";

                var query = new QueryExpression(bs_OtherExpenseDetail.EntityLogicalName)
                {
                    ColumnSet = new ColumnSet(accountFieldName),
                    Criteria = new FilterExpression(LogicalOperator.And)
                };

                query.Criteria.AddCondition(
                    bs_OtherExpenseDetail.Fields.bs_CustomerSiteFK,
                    ConditionOperator.Equal,
                    siteId);
                query.Criteria.AddCondition(
                    bs_OtherExpenseDetail.Fields.bs_MonthYear,
                    ConditionOperator.Equal,
                    monthYear);

                var result = serviceClient.RetrieveMultiple(query);

                if (result.Entities.Count > 0)
                {
                    var otherExpenseDetail = result.Entities[0].ToEntity<bs_OtherExpenseDetail>();
                    var fieldValue = otherExpenseDetail.GetAttributeValue<decimal?>(accountFieldName);
                    return fieldValue ?? 0m;
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
