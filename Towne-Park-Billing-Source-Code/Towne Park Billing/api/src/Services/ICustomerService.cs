using api.Models.Dto;
using api.Models.Vo;

namespace api.Services;

public interface ICustomerService
{
    IEnumerable<CustomerSummaryVo> GetCustomersSummary(UserDto userAuth);
    CustomerDetailVo GetCustomerDetail(Guid customerId);
    void UpdateCustomerDetail(Guid customerSiteId, CustomerDetailVo updateCustomer);
    Guid AddCustomer(string siteNumber);
}