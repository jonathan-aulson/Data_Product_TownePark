using api.Adapters.Mappers;
using api.Data;
using api.Functions;
using api.Models.Dto;
using api.Models.Vo;
using TownePark;

namespace api.Services.Impl;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _customerRepository;

    private readonly IContractService _contractService;

    private readonly IRoleService _roleService;



    public CustomerService(ICustomerRepository customerRepository, IContractService contractService, IRoleService roleService)
    {
        _customerRepository = customerRepository;
        _contractService = contractService;

        _roleService = roleService;
    }

    public IEnumerable<CustomerSummaryVo> GetCustomersSummary(UserDto userAuth)
    {
        if (_roleService.IsSiteFilteredUser(userAuth))
        {
            var customerSiteIds = _roleService.GetSiteIdsForFilteredUser(userAuth.Email);
            if (!customerSiteIds.Any())
            {
                return Enumerable.Empty<CustomerSummaryVo>();
            }

            var customerSites = _customerRepository.GetSitesByUser(customerSiteIds, userAuth.Email);
            return CustomerSummaryMapper.CustomersModelToVo(customerSites);
        }

        var customers = _customerRepository.GetCustomersSummary();
        return CustomerSummaryMapper.CustomersModelToVo(customers);
    }

    private IEnumerable<bs_CustomerSite> GetSitesByUser(IEnumerable<Guid> customerSiteIds, string email)
    {
        return _customerRepository.GetSitesByUser(customerSiteIds, email);
    }

    public CustomerDetailVo GetCustomerDetail(Guid customerId)
    {
        var customer = _customerRepository.GetCustomerDetail(customerId);
        return CustomerDetailMapper.CustomerDetailModelToVo(customer);
    }

    public void UpdateCustomerDetail(Guid customerSiteId, CustomerDetailVo updateCustomer)
    {
        var existingCustomer = GetExistingCustomerDetail(customerSiteId);
        var updateCustomerModel = CustomerDetailMapper.UpdateCustomerDetailVoToModel(existingCustomer, updateCustomer);
        
        _customerRepository.UpdateCustomerDetail(customerSiteId, updateCustomerModel);
    }

    private CustomerDetailVo GetExistingCustomerDetail(Guid customerSiteId)
    {
        var customerSiteModel = _customerRepository.GetCustomerDetail(customerSiteId);
        return CustomerDetailMapper.CustomerDetailModelToVo(customerSiteModel);
    }

    public Guid AddCustomer(string siteNumber)
    {
        var masterCustomer = _customerRepository.GetMasterCustomer(siteNumber);
        var customerSite = CustomerDetailMapper.MasterCustomerSiteToModel(masterCustomer);
        var newCustomerSiteId = _customerRepository.AddCustomer(customerSite);
        _contractService.AddContract(newCustomerSiteId, masterCustomer.bs_ContractTypeString,
            masterCustomer.bs_Deposits ?? false);
        return newCustomerSiteId;
    }
}
