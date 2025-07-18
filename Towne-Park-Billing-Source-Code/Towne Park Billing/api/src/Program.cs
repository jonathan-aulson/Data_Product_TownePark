using api.Adapters;
using api.Adapters.Impl;
using api.Data;
using api.Data.Impl;
using api.Functions;
using api.Middleware;
using api.Services;
using api.Services.Impl;
using api.Services.Impl.Calculators;
using api.Usecases;
using api.Usecases.Impl;
using api.Adapters.Mappers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Crm.Sdk.Messages;


var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults(worker =>
    {
        worker.UseMiddleware<GlobalExceptionMiddleware>();
        worker.UseMiddleware<AuthenticationMiddleware>();
    })
    .ConfigureServices((_, services) =>
    {
        services.AddSingleton<IOrganizationServiceFactory, OrganizationServiceFactory>();
        services.AddSingleton<IDataverseService, DataverseService>();
        services.AddSingleton<ICustomerRepository, CustomerRepository>();
        services.AddSingleton<ICustomerService, CustomerService>();
        services.AddSingleton<ICustomerServiceAdapter, CustomerServiceAdapter>();
        services.AddSingleton<IInvoicePdfService, InvoicePdfService>();
        services.AddSingleton<IInvoiceRepository, InvoiceRepository>();
        services.AddSingleton<IInvoiceService, InvoiceService>();
        services.AddSingleton<IInvoiceServiceAdapter, InvoiceServiceAdapter>();
        services.AddSingleton<IContractRepository, ContractRepository>();
        services.AddSingleton<IContractService, ContractService>();
        services.AddSingleton<IContractServiceAdapter, ContractServiceAdapter>();
        services.AddSingleton<IBillingStatementRepository, BillingStatementRepository>();
        services.AddSingleton<IBillingStatementService, BillingStatementService>();
        services.AddSingleton<IBillingStatementServiceAdapter, BillingStatementServiceAdapter>();
        services.AddSingleton<IConfigDataServiceAdapter, ConfigDataServiceAdapter>();
        services.AddSingleton<IConfigDataRepository, ConfigDataRepository>();
        services.AddSingleton<IConfigDataService, ConfigDataService>();
        services.AddSingleton<IStatementTaskServiceAdapter, StatementTaskServiceAdapter>();
        services.AddSingleton<IStatementTaskRepository, StatementTaskRepository>();
        services.AddSingleton<IStatementTaskService, StatementTaskService>();
        services.AddSingleton<IUnitAccountTaskServiceAdapter, UnitAccountTaskServiceAdapter>();
        services.AddSingleton<IUnitAccountTaskRepository, UnitAccountTaskRepository>();
        services.AddSingleton<IUnitAccountTaskService, UnitAccountTaskService>();
        services.AddSingleton<IEmailTaskService, EmailTaskService>();
        services.AddSingleton<IEmailTaskRepository, EmailTaskRepository>();
        services.AddSingleton<IEmailTaskServiceAdapter, EmailTaskServiceAdapter>();
        services.AddSingleton<ISiteStatisticService, SiteStatisticService>();
        services.AddSingleton<ISiteStatisticServiceAdapter, SiteStatisticServiceAdapter>();
        services.AddSingleton<ISiteStatisticRepository, SiteStatisticRepository>();
        services.AddSingleton<IPayrollServiceAdapter, PayrollServiceAdapter>();
        services.AddSingleton<IPayrollService, PayrollService>();
        services.AddSingleton<IPayrollRepository, PayrollRepository>();
        services.AddSingleton<IOtherRevenueServiceAdapter, OtherRevenueServiceAdapter>();
        services.AddSingleton<IOtherRevenueService, OtherRevenueService>();
        services.AddSingleton<IOtherRevenueRepository, OtherRevenueRepository>();
        services.AddSingleton<IOtherExpenseRepository, OtherExpenseRepository>();
        services.AddSingleton<IOtherExpenseServiceAdapter, OtherExpenseServiceAdapter>();
        services.AddSingleton<IOtherExpenseService, OtherExpenseService>();
        services.AddSingleton<IUserService, UserService>();
        services.AddSingleton<IUserRepository, UserRepository>();
        services.AddSingleton<IUserServiceAdapter, UserServiceAdapter>();
        services.AddSingleton<IRoleService, RoleService>();
        services.AddSingleton<ILockRepository, LockRepository>();
        services.AddSingleton<ILockService, LockService>();
        services.AddSingleton<IValidateAndPopulateGlCodes, ValidateAndPopulateGlCodes>();
        services.AddSingleton<IMonthRangeGenerator, MonthRangeGenerator>();
        services.AddSingleton<InvoiceDocumentTemplate>();
        services.AddScoped<IPnlServiceAdapter, PnlServiceAdapter>();
        services.AddScoped<IParkingRateRepository, ParkingRateRepository>();
        services.AddSingleton<IJobCodeService, JobCodeService>();
        services.AddSingleton<IJobCodeRepository, JobCodeRepository>();
        services.AddSingleton<IJobCodeServiceAdapter, JobCodeServiceAdapter>();
        services.AddSingleton<IJobGroupService, JobGroupService>();
        services.AddSingleton<IJobGroupRepository, JobGroupRepository>();
        services.AddSingleton<IJobGroupServiceAdapter, JobGroupServiceAdapter>();
        services.AddSingleton<ISiteAssignmentService, SiteAssignmentService>();
        services.AddSingleton<ISiteAssignmentRepository, SiteAssignmentRepository>();
        services.AddSingleton<ISiteAssignmentServiceAdapter, SiteAssignmentServiceAdapter>();
        services.AddSingleton<IParkingRateService, ParkingRateService>();
        services.AddSingleton<IParkingRateServiceAdapter, ParkingRateServiceAdapter>();
        services.AddSingleton<IBillableExpenseRepository, BillableExpenseRepository>();
        services.AddSingleton<IInternalRevenueMapper, api.Adapters.Mappers.InternalRevenueMapper>();
        services.AddSingleton<TownePark.Data.IInternalRevenueRepository, TownePark.Data.Impl.InternalRevenueRepository>();
        services.AddSingleton<IInternalRevenueCalculator, FixedFeeCalculator>();
        services.AddSingleton<IInternalRevenueCalculator, PerOccupiedRoomCalculator>();
        services.AddSingleton<IInternalRevenueCalculator, PerLaborHourCalculator>();
        services.AddSingleton<IInternalRevenueCalculator, RevenueShareCalculator>();
        services.AddSingleton<IInternalRevenueCalculator, AdditionalPayrollAmountCalculator>();
        services.AddSingleton<IInternalRevenueCalculator, BillablePtebCalculator>();
        services.AddSingleton<IInternalRevenueCalculator, SupportServicesCalculator>();
        services.AddSingleton<IInternalRevenueCalculator, ExpenseAccountCalculator>();
        services.AddSingleton<IExternalRevenueCalculator, ExternalRevenueCalculator>();
        services.AddSingleton<IParkingRateRepository, ParkingRateRepository>();
        services.AddSingleton<IPnlService, PnlService>();
    })
    .Build();

host.Run();
