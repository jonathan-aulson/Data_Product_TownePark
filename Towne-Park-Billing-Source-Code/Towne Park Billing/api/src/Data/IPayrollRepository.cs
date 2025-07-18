using api.Models.Vo;
using TownePark;

namespace api.Data
{
    public interface IPayrollRepository
    {
        bs_Payroll? GetPayroll(Guid siteId, string billingPeriod);
        void SavePayroll(bs_Payroll payroll);
        void CreatePayroll(bs_Payroll payroll);
        void UpsertPayroll(bs_Payroll payroll, Guid customerSiteId, string billingPeriod);
        Task<EDWPayrollBudgetDataVo?> GetBudgetPayrollFromEDW(string costCenter, int year, int month);
        Task<EDWPayrollActualDataVo?> GetActualPayrollFromEDW(string costCenter, int year, int month);
        Task<EDWPayrollActualDataVo?> GetSchedulePayrollFromEDW(string costCenter, int year, int month);
    }
}
