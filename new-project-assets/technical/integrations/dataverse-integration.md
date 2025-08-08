---
title: "Microsoft Dataverse Integration Technical Specification"
version: "1.0"
last_updated: "2025-07-24"
author: "Towne Park Data Product Team"
status: "Active"
type: "Technical Specification"
tags: ["dataverse", "integration", "microsoft", "power-platform", "technical-spec"]
related_docs:
  - "sharepoint-dataverse-integration.md"
  - "powerbill-integration.md"
  - "../../business-rules/customer-sites/territory-assignment-rules.md"
  - "../../configuration/customer-sites/integration-configuration-guide.md"
---

# Microsoft Dataverse Integration Technical Specification

## Overview

This document provides comprehensive technical specifications for integrating the Towne Park Data Product with Microsoft Dataverse. The integration enables seamless data synchronization, workflow automation, and business process management across the Power Platform ecosystem while maintaining data integrity and security standards.

## Integration Architecture

### High-Level Architecture

#### System Components
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Towne Park    │    │   Integration   │    │   Microsoft     │
│  Data Product   │◄──►│     Layer       │◄──►│   Dataverse     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   SQL Server    │    │   Azure Service │    │  Power Platform │
│   Database      │    │      Bus        │    │   Applications  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### Integration Patterns
1. **Real-time Synchronization**: Immediate data updates using webhooks and event-driven architecture
2. **Batch Processing**: Scheduled bulk data transfers for large datasets
3. **Bi-directional Sync**: Two-way data flow ensuring consistency across systems
4. **Event-driven Updates**: Trigger-based updates for critical business events

### Technical Stack

#### Core Technologies
- **Microsoft Dataverse**: Primary data platform and business logic engine
- **Azure Service Bus**: Message queuing and reliable communication
- **Azure Functions**: Serverless compute for integration logic
- **Power Automate**: Workflow automation and business process management
- **Azure API Management**: API gateway and security enforcement
- **Azure Key Vault**: Secure credential and configuration management

#### Authentication and Security
```csharp
public class DataverseAuthenticationService
{
    private readonly IConfidentialClientApplication _clientApp;
    private readonly IConfiguration _configuration;
    
    public DataverseAuthenticationService(IConfiguration configuration)
    {
        _configuration = configuration;
        _clientApp = ConfidentialClientApplicationBuilder
            .Create(_configuration["Dataverse:ClientId"])
            .WithClientSecret(_configuration["Dataverse:ClientSecret"])
            .WithAuthority(_configuration["Dataverse:Authority"])
            .Build();
    }
    
    public async Task<string> GetAccessTokenAsync()
    {
        var scopes = new[] { $"{_configuration["Dataverse:Resource"]}/.default" };
        
        try
        {
            var result = await _clientApp.AcquireTokenForClient(scopes).ExecuteAsync();
            return result.AccessToken;
        }
        catch (MsalException ex)
        {
            throw new AuthenticationException($"Failed to acquire token: {ex.Message}", ex);
        }
    }
}
```

## Data Model Integration

### Entity Mapping

#### Customer Sites Entity
```csharp
[Entity("tp_customersites")]
public class CustomerSiteDataverse
{
    [Key]
    [Column("tp_customersiteid")]
    public Guid CustomerSiteId { get; set; }
    
    [Column("tp_name")]
    public string CustomerName { get; set; }
    
    [Column("tp_siteaddress")]
    public string SiteAddress { get; set; }
    
    [Column("tp_contracttype")]
    public OptionSetValue ContractType { get; set; }
    
    [Column("tp_territoryid")]
    public EntityReference Territory { get; set; }
    
    [Column("tp_isactive")]
    public bool IsActive { get; set; }
    
    [Column("tp_revenuesharepercentage")]
    public decimal? RevenueSharePercentage { get; set; }
    
    [Column("tp_minimumlaborhours")]
    public int? MinimumLaborHours { get; set; }
    
    [Column("tp_billingcontact")]
    public EntityReference BillingContact { get; set; }
    
    [Column("createdon")]
    public DateTime CreatedOn { get; set; }
    
    [Column("modifiedon")]
    public DateTime ModifiedOn { get; set; }
}
```

#### Contracts Entity
```csharp
[Entity("tp_contracts")]
public class ContractDataverse
{
    [Key]
    [Column("tp_contractid")]
    public Guid ContractId { get; set; }
    
    [Column("tp_contractnumber")]
    public string ContractNumber { get; set; }
    
    [Column("tp_customersiteid")]
    public EntityReference CustomerSite { get; set; }
    
    [Column("tp_contracttype")]
    public OptionSetValue ContractType { get; set; }
    
    [Column("tp_startdate")]
    public DateTime StartDate { get; set; }
    
    [Column("tp_enddate")]
    public DateTime? EndDate { get; set; }
    
    [Column("tp_status")]
    public OptionSetValue Status { get; set; }
    
    [Column("tp_revenuesharepercentage")]
    public decimal? RevenueSharePercentage { get; set; }
    
    [Column("tp_hourlylaborrate")]
    public Money? HourlyLaborRate { get; set; }
    
    [Column("tp_minimumguarantee")]
    public Money? MinimumGuarantee { get; set; }
}
```

#### Revenue Data Entity
```csharp
[Entity("tp_revenuedata")]
public class RevenueDataDataverse
{
    [Key]
    [Column("tp_revenuedataid")]
    public Guid RevenueDataId { get; set; }
    
    [Column("tp_customersiteid")]
    public EntityReference CustomerSite { get; set; }
    
    [Column("tp_revenuedate")]
    public DateTime RevenueDate { get; set; }
    
    [Column("tp_grossrevenue")]
    public Money GrossRevenue { get; set; }
    
    [Column("tp_netrevenue")]
    public Money NetRevenue { get; set; }
    
    [Column("tp_transactioncount")]
    public int TransactionCount { get; set; }
    
    [Column("tp_averagetransactionvalue")]
    public Money AverageTransactionValue { get; set; }
    
    [Column("tp_revenuesource")]
    public OptionSetValue RevenueSource { get; set; }
}
```

### Data Synchronization Service

#### Bi-directional Sync Implementation
```csharp
public class DataverseSyncService
{
    private readonly IOrganizationService _dataverseService;
    private readonly ITowneParkDataService _towneParkService;
    private readonly ILogger<DataverseSyncService> _logger;
    private readonly ISyncConfigurationService _syncConfig;
    
    public DataverseSyncService(
        IOrganizationService dataverseService,
        ITowneParkDataService towneParkService,
        ILogger<DataverseSyncService> logger,
        ISyncConfigurationService syncConfig)
    {
        _dataverseService = dataverseService;
        _towneParkService = towneParkService;
        _logger = logger;
        _syncConfig = syncConfig;
    }
    
    public async Task<SyncResult> SyncCustomerSitesAsync(SyncDirection direction = SyncDirection.Bidirectional)
    {
        var result = new SyncResult();
        
        try
        {
            if (direction == SyncDirection.ToDataverse || direction == SyncDirection.Bidirectional)
            {
                await SyncToDataverseAsync(result);
            }
            
            if (direction == SyncDirection.FromDataverse || direction == SyncDirection.Bidirectional)
            {
                await SyncFromDataverseAsync(result);
            }
            
            result.Status = SyncStatus.Completed;
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during customer sites synchronization");
            result.Status = SyncStatus.Failed;
            result.ErrorMessage = ex.Message;
            return result;
        }
    }
    
    private async Task SyncToDataverseAsync(SyncResult result)
    {
        var lastSyncTime = await _syncConfig.GetLastSyncTimeAsync("CustomerSites", SyncDirection.ToDataverse);
        var modifiedSites = await _towneParkService.GetModifiedCustomerSitesAsync(lastSyncTime);
        
        foreach (var site in modifiedSites)
        {
            try
            {
                var dataverseSite = MapToDataverseEntity(site);
                
                if (await ExistsInDataverseAsync(site.Id))
                {
                    await UpdateDataverseEntityAsync(dataverseSite);
                    result.UpdatedRecords++;
                }
                else
                {
                    await CreateDataverseEntityAsync(dataverseSite);
                    result.CreatedRecords++;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error syncing customer site {SiteId} to Dataverse", site.Id);
                result.FailedRecords++;
            }
        }
        
        await _syncConfig.UpdateLastSyncTimeAsync("CustomerSites", SyncDirection.ToDataverse, DateTime.UtcNow);
    }
    
    private async Task SyncFromDataverseAsync(SyncResult result)
    {
        var lastSyncTime = await _syncConfig.GetLastSyncTimeAsync("CustomerSites", SyncDirection.FromDataverse);
        var modifiedSites = await GetModifiedDataverseEntitiesAsync(lastSyncTime);
        
        foreach (var dataverseSite in modifiedSites)
        {
            try
            {
                var towneParkSite = MapToTowneParkEntity(dataverseSite);
                
                if (await _towneParkService.ExistsAsync(towneParkSite.Id))
                {
                    await _towneParkService.UpdateCustomerSiteAsync(towneParkSite);
                    result.UpdatedRecords++;
                }
                else
                {
                    await _towneParkService.CreateCustomerSiteAsync(towneParkSite);
                    result.CreatedRecords++;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error syncing customer site from Dataverse", ex);
                result.FailedRecords++;
            }
        }
        
        await _syncConfig.UpdateLastSyncTimeAsync("CustomerSites", SyncDirection.FromDataverse, DateTime.UtcNow);
    }
}
```

## Real-time Integration

### Webhook Implementation

#### Dataverse Webhook Configuration
```csharp
public class DataverseWebhookService
{
    private readonly IOrganizationService _organizationService;
    private readonly IConfiguration _configuration;
    
    public async Task RegisterWebhooksAsync()
    {
        // Register webhook for Customer Sites entity
        await RegisterEntityWebhookAsync("tp_customersites", new[]
        {
            SdkMessageProcessingStepStage.PostOperation
        }, new[]
        {
            "Create", "Update", "Delete"
        });
        
        // Register webhook for Contracts entity
        await RegisterEntityWebhookAsync("tp_contracts", new[]
        {
            SdkMessageProcessingStepStage.PostOperation
        }, new[]
        {
            "Create", "Update", "Delete"
        });
    }
    
    private async Task RegisterEntityWebhookAsync(
        string entityName, 
        SdkMessageProcessingStepStage[] stages, 
        string[] messages)
    {
        foreach (var message in messages)
        {
            foreach (var stage in stages)
            {
                var step = new SdkMessageProcessingStep
                {
                    Name = $"Towne Park Webhook - {entityName} {message}",
                    SdkMessageId = await GetSdkMessageIdAsync(message),
                    SdkMessageFilterId = await GetSdkMessageFilterIdAsync(entityName, message),
                    Stage = new OptionSetValue((int)stage),
                    Mode = new OptionSetValue(1), // Asynchronous
                    Rank = 1,
                    Configuration = JsonSerializer.Serialize(new
                    {
                        webhookUrl = _configuration["Webhook:TowneParkEndpoint"],
                        authenticationHeader = "Authorization",
                        authenticationValue = await GetWebhookAuthTokenAsync()
                    })
                };
                
                await _organizationService.CreateAsync(step);
            }
        }
    }
}
```

#### Webhook Handler
```csharp
[ApiController]
[Route("api/[controller]")]
public class DataverseWebhookController : ControllerBase
{
    private readonly IDataverseSyncService _syncService;
    private readonly ILogger<DataverseWebhookController> _logger;
    
    [HttpPost("customer-sites")]
    public async Task<IActionResult> HandleCustomerSiteWebhook([FromBody] WebhookPayload payload)
    {
        try
        {
            _logger.LogInformation("Received webhook for customer site {EntityId}", payload.PrimaryEntityId);
            
            switch (payload.MessageName.ToLower())
            {
                case "create":
                    await _syncService.HandleCustomerSiteCreatedAsync(payload.PrimaryEntityId);
                    break;
                    
                case "update":
                    await _syncService.HandleCustomerSiteUpdatedAsync(payload.PrimaryEntityId);
                    break;
                    
                case "delete":
                    await _syncService.HandleCustomerSiteDeletedAsync(payload.PrimaryEntityId);
                    break;
            }
            
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing customer site webhook");
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpPost("contracts")]
    public async Task<IActionResult> HandleContractWebhook([FromBody] WebhookPayload payload)
    {
        try
        {
            _logger.LogInformation("Received webhook for contract {EntityId}", payload.PrimaryEntityId);
            
            switch (payload.MessageName.ToLower())
            {
                case "create":
                    await _syncService.HandleContractCreatedAsync(payload.PrimaryEntityId);
                    break;
                    
                case "update":
                    await _syncService.HandleContractUpdatedAsync(payload.PrimaryEntityId);
                    break;
                    
                case "delete":
                    await _syncService.HandleContractDeletedAsync(payload.PrimaryEntityId);
                    break;
            }
            
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing contract webhook");
            return StatusCode(500, "Internal server error");
        }
    }
}
```

### Event-Driven Architecture

#### Azure Service Bus Integration
```csharp
public class ServiceBusEventPublisher
{
    private readonly ServiceBusClient _serviceBusClient;
    private readonly ILogger<ServiceBusEventPublisher> _logger;
    
    public ServiceBusEventPublisher(ServiceBusClient serviceBusClient, ILogger<ServiceBusEventPublisher> logger)
    {
        _serviceBusClient = serviceBusClient;
        _logger = logger;
    }
    
    public async Task PublishCustomerSiteEventAsync(CustomerSiteEvent eventData)
    {
        var sender = _serviceBusClient.CreateSender("customer-sites-topic");
        
        try
        {
            var message = new ServiceBusMessage(JsonSerializer.Serialize(eventData))
            {
                Subject = eventData.EventType,
                MessageId = Guid.NewGuid().ToString(),
                ContentType = "application/json"
            };
            
            message.ApplicationProperties["EntityType"] = "CustomerSite";
            message.ApplicationProperties["EventType"] = eventData.EventType;
            message.ApplicationProperties["SourceSystem"] = eventData.SourceSystem;
            
            await sender.SendMessageAsync(message);
            
            _logger.LogInformation("Published customer site event {EventType} for {EntityId}", 
                eventData.EventType, eventData.EntityId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error publishing customer site event");
            throw;
        }
        finally
        {
            await sender.DisposeAsync();
        }
    }
}
```

#### Event Processing Function
```csharp
public class DataverseEventProcessor
{
    private readonly IDataverseSyncService _syncService;
    private readonly ILogger<DataverseEventProcessor> _logger;
    
    [FunctionName("ProcessCustomerSiteEvents")]
    public async Task ProcessCustomerSiteEvents(
        [ServiceBusTrigger("customer-sites-topic", "dataverse-sync-subscription")] 
        ServiceBusReceivedMessage message,
        ILogger log)
    {
        try
        {
            var eventData = JsonSerializer.Deserialize<CustomerSiteEvent>(message.Body.ToString());
            
            log.LogInformation("Processing customer site event {EventType} for {EntityId}", 
                eventData.EventType, eventData.EntityId);
            
            switch (eventData.EventType)
            {
                case "Created":
                    await _syncService.SyncCustomerSiteFromSourceAsync(eventData.EntityId, eventData.SourceSystem);
                    break;
                    
                case "Updated":
                    await _syncService.SyncCustomerSiteFromSourceAsync(eventData.EntityId, eventData.SourceSystem);
                    break;
                    
                case "Deleted":
                    await _syncService.HandleCustomerSiteDeletionAsync(eventData.EntityId, eventData.SourceSystem);
                    break;
            }
            
            log.LogInformation("Successfully processed customer site event {EventType}", eventData.EventType);
        }
        catch (Exception ex)
        {
            log.LogError(ex, "Error processing customer site event");
            throw; // This will cause the message to be retried or sent to dead letter queue
        }
    }
}
```

## Business Process Integration

### Power Automate Workflows

#### Contract Approval Workflow
```json
{
  "definition": {
    "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {},
    "triggers": {
      "When_a_contract_is_created": {
        "type": "CommonDataServiceV2",
        "inputs": {
          "host": {
            "connectionName": "shared_commondataserviceforapps"
          },
          "path": "/v2/datasets/@{encodeURIComponent('org12345.crm.dynamics.com')}/tables/@{encodeURIComponent('tp_contracts')}/onnewitems"
        }
      }
    },
    "actions": {
      "Check_contract_value": {
        "type": "If",
        "expression": {
          "greater": [
            "@triggerOutputs()?['body/tp_contractvalue']",
            100000
          ]
        },
        "actions": {
          "Send_approval_request": {
            "type": "ApiConnection",
            "inputs": {
              "host": {
                "connectionName": "shared_approvals"
              },
              "path": "/approvals",
              "method": "post",
              "body": {
                "title": "Contract Approval Required",
                "assignedTo": "manager@townepark.com",
                "details": "Contract @{triggerOutputs()?['body/tp_contractnumber']} requires approval"
              }
            }
          }
        },
        "else": {
          "actions": {
            "Auto_approve_contract": {
              "type": "CommonDataServiceV2",
              "inputs": {
                "host": {
                  "connectionName": "shared_commondataserviceforapps"
                },
                "method": "patch",
                "path": "/v2/datasets/@{encodeURIComponent('org12345.crm.dynamics.com')}/tables/@{encodeURIComponent('tp_contracts')}/items/@{encodeURIComponent(triggerOutputs()?['body/tp_contractid'])}",
                "body": {
                  "tp_status": 100000001
                }
              }
            }
          }
        }
      }
    }
  }
}
```

#### Revenue Calculation Workflow
```csharp
public class RevenueCalculationWorkflow
{
    private readonly IOrganizationService _organizationService;
    private readonly IRevenueCalculationService _calculationService;
    
    [WorkflowActivity("Calculate Monthly Revenue")]
    public async Task<decimal> CalculateMonthlyRevenue(
        EntityReference customerSiteRef,
        DateTime calculationMonth)
    {
        // Retrieve customer site and contract information
        var customerSite = await RetrieveCustomerSiteAsync(customerSiteRef.Id);
        var activeContract = await GetActiveContractAsync(customerSiteRef.Id, calculationMonth);
        
        if (activeContract == null)
        {
            throw new InvalidOperationException($"No active contract found for customer site {customerSiteRef.Id}");
        }
        
        // Calculate revenue based on contract type
        var revenueResult = await _calculationService.CalculateRevenueAsync(activeContract, calculationMonth);
        
        // Create revenue record in Dataverse
        await CreateRevenueRecordAsync(customerSiteRef.Id, calculationMonth, revenueResult);
        
        return revenueResult.CalculatedAmount;
    }
    
    private async Task CreateRevenueRecordAsync(
        Guid customerSiteId, 
        DateTime month, 
        RevenueCalculationResult result)
    {
        var revenueRecord = new Entity("tp_revenuedata")
        {
            ["tp_customersiteid"] = new EntityReference("tp_customersites", customerSiteId),
            ["tp_revenuedate"] = month,
            ["tp_grossrevenue"] = new Money(result.GrossRevenue),
            ["tp_calculatedrevenue"] = new Money(result.CalculatedAmount),
            ["tp_contracttype"] = new OptionSetValue((int)result.ContractType),
            ["tp_calculationdetails"] = JsonSerializer.Serialize(result.CalculationDetails)
        };
        
        await _organizationService.CreateAsync(revenueRecord);
    }
}
```

## Error Handling and Monitoring

### Comprehensive Error Handling

#### Retry Policies
```csharp
public class DataverseRetryPolicy
{
    private readonly ILogger<DataverseRetryPolicy> _logger;
    
    public async Task<T> ExecuteWithRetryAsync<T>(
        Func<Task<T>> operation, 
        int maxRetries = 3, 
        TimeSpan? baseDelay = null)
    {
        var delay = baseDelay ?? TimeSpan.FromSeconds(1);
        var attempt = 0;
        
        while (attempt <= maxRetries)
        {
            try
            {
                return await operation();
            }
            catch (Exception ex) when (IsRetriableException(ex) && attempt < maxRetries)
            {
                attempt++;
                var currentDelay = TimeSpan.FromMilliseconds(delay.TotalMilliseconds * Math.Pow(2, attempt - 1));
                
                _logger.LogWarning("Operation failed on attempt {Attempt}. Retrying in {Delay}ms. Error: {Error}", 
                    attempt, currentDelay.TotalMilliseconds, ex.Message);
                
                await Task.Delay(currentDelay);
            }
        }
        
        throw new InvalidOperationException($"Operation failed after {maxRetries} retries");
    }
    
    private bool IsRetriableException(Exception ex)
    {
        return ex is HttpRequestException ||
               ex is TaskCanceledException ||
               ex is SocketException ||
               (ex is FaultException<OrganizationServiceFault> fault && 
                fault.Detail.ErrorCode == -2147220970); // Throttling error
    }
}
```

#### Dead Letter Queue Processing
```csharp
[FunctionName("ProcessDeadLetterQueue")]
public async Task ProcessDeadLetterQueue(
    [ServiceBusTrigger("customer-sites-topic/$deadletterqueue", "dataverse-sync-subscription")] 
    ServiceBusReceivedMessage message,
    ILogger log)
{
    try
    {
        log.LogWarning("Processing dead letter message: {MessageId}", message.MessageId);
        
        var eventData = JsonSerializer.Deserialize<CustomerSiteEvent>(message.Body.ToString());
        
        // Attempt manual processing or alert administrators
        await _alertService.SendDeadLetterAlertAsync(eventData, message.DeliveryCount);
        
        // Store for manual review
        await _deadLetterService.StoreForManualReviewAsync(eventData, message);
        
        log.LogInformation("Dead letter message {MessageId} stored for manual review", message.MessageId);
    }
    catch (Exception ex)
    {
        log.LogError(ex, "Error processing dead letter message {MessageId}", message.MessageId);
        throw;
    }
}
```

### Monitoring and Alerting

#### Health Check Implementation
```csharp
public class DataverseHealthCheck : IHealthCheck
{
    private readonly IOrganizationService _organizationService;
    private readonly ILogger<DataverseHealthCheck> _logger;
    
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, 
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Test basic connectivity
            var whoAmI = await _organizationService.ExecuteAsync(new WhoAmIRequest());
            
            // Test entity access
            var query = new QueryExpression("tp_customersites")
            {
                TopCount = 1,
                ColumnSet = new ColumnSet("tp_customersiteid")
            };
            
            var result = await _organizationService.RetrieveMultipleAsync(query);
            
            return HealthCheckResult.Healthy("Dataverse connection is healthy");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Dataverse health check failed");
            return HealthCheckResult.Unhealthy("Dataverse connection failed", ex);
        }
    }
}
```

#### Performance Metrics
```csharp
public class DataverseMetricsCollector
{
    private readonly IMetricsLogger _metricsLogger;
    
    public async Task RecordSyncMetricsAsync(SyncResult result)
    {
        _metricsLogger.LogMetric("DataverseSync.RecordsCreated", result.CreatedRecords);
        _metricsLogger.LogMetric("DataverseSync.RecordsUpdated", result.UpdatedRecords);
        _metricsLogger.LogMetric("DataverseSync.RecordsFailed", result.FailedRecords);
        _metricsLogger.LogMetric("DataverseSync.Duration", result.Duration.TotalMilliseconds);
        _metricsLogger.LogMetric("DataverseSync.SuccessRate", 
            (double)(result.CreatedRecords + result.UpdatedRecords) / 
            (result.CreatedRecords + result.UpdatedRecords + result.FailedRecords));
    }
    
    public async Task RecordApiCallMetricsAsync(string operation, TimeSpan duration, bool success)
    {
        _metricsLogger.LogMetric($"DataverseApi.{operation}.Duration", duration.TotalMilliseconds);
        _metricsLogger.LogMetric($"DataverseApi.{operation}.Success", success ? 1 : 0);
    }
}
```

This comprehensive Microsoft Dataverse integration specification ensures seamless, secure, and reliable data synchronization between Towne Park's Data Product and the Power Platform ecosystem while maintaining high performance and robust error handling capabilities.