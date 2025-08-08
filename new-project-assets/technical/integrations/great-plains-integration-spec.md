---
title: "Great Plains Integration Technical Specification"
version: "1.0"
last_updated: "2025-07-24"
author: "Towne Park Data Product Team"
status: "Active"
type: "Technical Specification"
tags: ["great-plains", "integration", "financial", "erp", "technical-spec"]
related_docs:
  - "20250724_EDW_Integration_TechnicalSpec.md"
  - "../../backend/20250724_Billing_RevenueCalculation_TechnicalSpec.md"
  - "../../configuration/system-settings/20250724_EDW_Integration_Configuration.md"
  - "../../business-rules/billing/20250724_Billing_RevenueShareContracts_BusinessRules.md"
---

# Great Plains Integration Technical Specification

## Overview

This document provides comprehensive technical specifications for integrating the Towne Park Data Product platform with Microsoft Dynamics Great Plains (GP) financial system. The integration enables seamless data exchange between billing calculations, financial reporting, and enterprise resource planning functions while maintaining data integrity and compliance requirements.

## System Architecture

### Integration Architecture Overview

#### Core Integration Components
- **GP Connector Service**: Primary interface for Great Plains communication
- **Data Transformation Engine**: Handles data format conversion and mapping
- **Synchronization Manager**: Manages bidirectional data synchronization
- **Error Handling Service**: Processes integration errors and exceptions
- **Audit and Logging Service**: Maintains comprehensive integration audit trails

#### Integration Patterns
- **Real-time Synchronization**: Immediate data transfer for critical transactions
- **Batch Processing**: Scheduled bulk data transfers for non-critical operations
- **Event-driven Updates**: Triggered updates based on system events
- **On-demand Queries**: Interactive data retrieval for reporting and analysis

### Great Plains System Integration Points

#### Financial Data Integration
- **General Ledger**: Chart of accounts, journal entries, financial transactions
- **Accounts Receivable**: Customer invoices, payments, credit memos, aging reports
- **Accounts Payable**: Vendor invoices, payments, purchase orders, expense tracking
- **Cash Management**: Bank reconciliation, cash flow, treasury operations

#### Customer and Vendor Management
- **Customer Master Data**: Customer information, billing addresses, payment terms
- **Vendor Master Data**: Vendor information, payment terms, tax information
- **Contract Information**: Service agreements, pricing structures, billing cycles
- **Territory Management**: Geographic assignments, sales territories, management hierarchies

#### Operational Data Integration
- **Revenue Recognition**: Revenue posting, deferred revenue, recognition schedules
- **Cost Allocation**: Direct costs, overhead allocation, departmental expenses
- **Project Accounting**: Project-based billing, cost tracking, profitability analysis
- **Multi-company Consolidation**: Inter-company transactions, consolidation reporting

## Technical Implementation

### Data Integration Specifications

#### Inbound Data Flows (From Great Plains)

##### Customer Master Data Synchronization
```json
{
  "customer_sync": {
    "source_table": "RM00101",
    "target_entity": "Customer",
    "sync_frequency": "real-time",
    "key_fields": ["CUSTNMBR", "CUSTNAME"],
    "data_mapping": {
      "CUSTNMBR": "customer_id",
      "CUSTNAME": "customer_name",
      "ADDRESS1": "billing_address_line1",
      "ADDRESS2": "billing_address_line2",
      "CITY": "billing_city",
      "STATE": "billing_state",
      "ZIP": "billing_zip",
      "PYMTRMID": "payment_terms_id"
    }
  }
}
```

##### Chart of Accounts Integration
```json
{
  "coa_sync": {
    "source_table": "GL00105",
    "target_entity": "ChartOfAccounts",
    "sync_frequency": "daily",
    "key_fields": ["ACTNUMST"],
    "data_mapping": {
      "ACTNUMST": "account_number",
      "ACTDESCR": "account_description",
      "ACCTTYPE": "account_type",
      "ACTIVE": "is_active",
      "PSTNGTYP": "posting_type"
    }
  }
}
```

##### Financial Transaction Data
```json
{
  "transaction_sync": {
    "source_table": "GL20000",
    "target_entity": "FinancialTransaction",
    "sync_frequency": "real-time",
    "key_fields": ["JRNENTRY", "SQNCLINE"],
    "data_mapping": {
      "JRNENTRY": "journal_entry_number",
      "SQNCLINE": "sequence_number",
      "ACTNUMST": "account_number",
      "DEBITAMT": "debit_amount",
      "CRDTAMNT": "credit_amount",
      "TRXDATE": "transaction_date",
      "REFRENCE": "reference_number"
    }
  }
}
```

#### Outbound Data Flows (To Great Plains)

##### Revenue Recognition Entries
```json
{
  "revenue_posting": {
    "target_table": "GL10001",
    "source_entity": "CalculatedRevenue",
    "posting_frequency": "daily",
    "validation_rules": [
      "balanced_entries",
      "valid_account_codes",
      "positive_amounts",
      "required_references"
    ],
    "data_mapping": {
      "journal_entry_id": "JRNENTRY",
      "account_number": "ACTNUMST",
      "debit_amount": "DEBITAMT",
      "credit_amount": "CRDTAMNT",
      "transaction_date": "TRXDATE",
      "description": "DSCRIPTN",
      "reference": "REFRENCE"
    }
  }
}
```

##### Customer Invoice Generation
```json
{
  "invoice_creation": {
    "target_table": "RM10301",
    "source_entity": "BillingStatement",
    "posting_frequency": "real-time",
    "validation_rules": [
      "valid_customer_id",
      "positive_amounts",
      "valid_terms",
      "complete_addresses"
    ],
    "data_mapping": {
      "customer_id": "CUSTNMBR",
      "invoice_number": "DOCNUMBR",
      "invoice_date": "DOCDATE",
      "due_date": "DUEDATE",
      "subtotal": "SUBTOTAL",
      "tax_amount": "TAXAMNT",
      "total_amount": "DOCAMNT"
    }
  }
}
```

### API Integration Specifications

#### Great Plains eConnect Integration

##### eConnect XML Schema Implementation
```xml
<eConnect xmlns:dt="urn:schemas-microsoft-com:datatypes">
  <SOPTransactionType>
    <taSopHdrIvcInsert>
      <SOPTYPE>3</SOPTYPE>
      <SOPNUMBE>{{invoice_number}}</SOPNUMBE>
      <DOCID>STDINV</DOCID>
      <CUSTNMBR>{{customer_id}}</CUSTNMBR>
      <DOCDATE>{{invoice_date}}</DOCDATE>
      <DUEDATE>{{due_date}}</DUEDATE>
      <SUBTOTAL>{{subtotal_amount}}</SUBTOTAL>
      <DOCAMNT>{{total_amount}}</DOCAMNT>
    </taSopHdrIvcInsert>
    <taSopLineIvcInsert>
      <SOPTYPE>3</SOPTYPE>
      <SOPNUMBE>{{invoice_number}}</SOPNUMBE>
      <LNITMSEQ>{{line_sequence}}</LNITMSEQ>
      <ITEMNMBR>{{item_number}}</ITEMNMBR>
      <ITEMDESC>{{item_description}}</ITEMDESC>
      <QUANTITY>{{quantity}}</QUANTITY>
      <UNITPRCE>{{unit_price}}</UNITPRCE>
      <XTNDPRCE>{{extended_price}}</XTNDPRCE>
    </taSopLineIvcInsert>
  </SOPTransactionType>
</eConnect>
```

##### eConnect Service Configuration
```csharp
public class GreatPlainsEConnectService
{
    private readonly string _connectionString;
    private readonly string _serverName;
    private readonly string _databaseName;
    
    public async Task<bool> PostInvoiceAsync(InvoiceData invoice)
    {
        try
        {
            var eConnectDoc = BuildEConnectDocument(invoice);
            var result = await ExecuteEConnectAsync(eConnectDoc);
            return result.Success;
        }
        catch (Exception ex)
        {
            LogError($"eConnect posting failed: {ex.Message}");
            throw;
        }
    }
    
    private string BuildEConnectDocument(InvoiceData invoice)
    {
        // Build eConnect XML document
        // Apply business rules and validation
        // Return formatted XML string
    }
}
```

#### SQL Server Integration Services (SSIS)

##### SSIS Package Configuration
```xml
<DTS:Executable>
  <DTS:Property DTS:Name="PackageName">TownePark_GP_Integration</DTS:Property>
  <DTS:ConnectionManagers>
    <DTS:ConnectionManager DTS:Name="GreatPlains_OLEDB">
      <DTS:Property DTS:Name="ConnectionString">
        Data Source={{gp_server}};Initial Catalog={{gp_database}};
        Provider=SQLOLEDB;Integrated Security=SSPI;
      </DTS:Property>
    </DTS:ConnectionManager>
    <DTS:ConnectionManager DTS:Name="TownePark_OLEDB">
      <DTS:Property DTS:Name="ConnectionString">
        Data Source={{tp_server}};Initial Catalog={{tp_database}};
        Provider=SQLOLEDB;Integrated Security=SSPI;
      </DTS:Property>
    </DTS:ConnectionManager>
  </DTS:ConnectionManagers>
</DTS:Executable>
```

##### Data Flow Tasks
- **Customer Synchronization Task**: Bidirectional customer data sync
- **Financial Transaction Task**: Revenue and expense posting
- **Chart of Accounts Task**: Account structure synchronization
- **Reconciliation Task**: Data validation and reconciliation

### Web Services Integration

#### Great Plains Web Services API

##### Service Endpoint Configuration
```json
{
  "gp_web_services": {
    "base_url": "https://{{gp_server}}/DynamicsGPWebServices",
    "endpoints": {
      "customer_service": "/CustomerService.asmx",
      "gl_service": "/GLService.asmx",
      "receivables_service": "/ReceivablesService.asmx",
      "payables_service": "/PayablesService.asmx"
    },
    "authentication": {
      "type": "windows_authentication",
      "domain": "{{domain_name}}",
      "username": "{{service_account}}",
      "password": "{{encrypted_password}}"
    }
  }
}
```

##### Customer Service Integration
```csharp
public class GPCustomerService
{
    private readonly CustomerServiceClient _client;
    
    public async Task<Customer> GetCustomerAsync(string customerId)
    {
        var context = new Context
        {
            OrganizationKey = new CompanyKey { Id = _companyId }
        };
        
        var key = new CustomerKey { Id = customerId };
        return await _client.GetCustomerByKeyAsync(key, context);
    }
    
    public async Task<bool> CreateCustomerAsync(Customer customer)
    {
        var context = new Context
        {
            OrganizationKey = new CompanyKey { Id = _companyId }
        };
        
        await _client.CreateCustomerAsync(customer, context);
        return true;
    }
}
```

## Data Transformation and Mapping

### Data Type Mapping

#### Numeric Data Types
```json
{
  "numeric_mappings": {
    "gp_currency": {
      "type": "CURRENCY",
      "precision": 19,
      "scale": 5,
      "target_type": "decimal(19,5)"
    },
    "gp_percentage": {
      "type": "PERCENT",
      "precision": 19,
      "scale": 5,
      "target_type": "decimal(19,5)"
    },
    "gp_quantity": {
      "type": "QTY",
      "precision": 19,
      "scale": 5,
      "target_type": "decimal(19,5)"
    }
  }
}
```

#### Date and Time Mapping
```json
{
  "datetime_mappings": {
    "gp_date": {
      "type": "DATETIME",
      "format": "MM/dd/yyyy",
      "target_type": "datetime2",
      "timezone_handling": "convert_to_utc"
    },
    "gp_time": {
      "type": "TIME",
      "format": "HH:mm:ss",
      "target_type": "time",
      "precision": 3
    }
  }
}
```

#### String Data Mapping
```json
{
  "string_mappings": {
    "gp_char": {
      "type": "CHAR",
      "max_length": 255,
      "target_type": "nvarchar",
      "encoding": "utf-8"
    },
    "gp_text": {
      "type": "TEXT",
      "max_length": 32000,
      "target_type": "nvarchar(max)",
      "encoding": "utf-8"
    }
  }
}
```

### Business Logic Transformation

#### Revenue Recognition Rules
```csharp
public class RevenueRecognitionTransformer
{
    public GLTransaction TransformRevenue(CalculatedRevenue revenue)
    {
        var transaction = new GLTransaction
        {
            JournalEntryId = GenerateJournalEntryId(),
            TransactionDate = revenue.BillingDate,
            Reference = $"REV-{revenue.ContractId}-{revenue.BillingPeriod}"
        };
        
        // Revenue recognition entry
        transaction.Lines.Add(new GLTransactionLine
        {
            AccountNumber = GetRevenueAccount(revenue.ContractType),
            CreditAmount = revenue.TotalAmount,
            Description = $"Revenue - {revenue.CustomerName}"
        });
        
        // Accounts receivable entry
        transaction.Lines.Add(new GLTransactionLine
        {
            AccountNumber = GetReceivableAccount(revenue.CustomerId),
            DebitAmount = revenue.TotalAmount,
            Description = $"A/R - {revenue.CustomerName}"
        });
        
        return transaction;
    }
}
```

#### Cost Allocation Logic
```csharp
public class CostAllocationTransformer
{
    public List<GLTransaction> AllocateCosts(CostAllocationData costs)
    {
        var transactions = new List<GLTransaction>();
        
        foreach (var allocation in costs.Allocations)
        {
            var transaction = new GLTransaction
            {
                JournalEntryId = GenerateJournalEntryId(),
                TransactionDate = costs.AllocationDate,
                Reference = $"COST-{allocation.CostCenterId}"
            };
            
            // Direct cost posting
            transaction.Lines.Add(new GLTransactionLine
            {
                AccountNumber = allocation.ExpenseAccount,
                DebitAmount = allocation.DirectCosts,
                Description = $"Direct Costs - {allocation.Description}"
            });
            
            // Overhead allocation
            if (allocation.OverheadAmount > 0)
            {
                transaction.Lines.Add(new GLTransactionLine
                {
                    AccountNumber = allocation.OverheadAccount,
                    DebitAmount = allocation.OverheadAmount,
                    Description = $"Overhead - {allocation.Description}"
                });
            }
            
            transactions.Add(transaction);
        }
        
        return transactions;
    }
}
```

## Error Handling and Data Validation

### Validation Framework

#### Pre-Integration Validation
```csharp
public class GPIntegrationValidator
{
    public ValidationResult ValidateCustomer(Customer customer)
    {
        var result = new ValidationResult();
        
        // Required field validation
        if (string.IsNullOrEmpty(customer.Id))
            result.AddError("Customer ID is required");
            
        if (string.IsNullOrEmpty(customer.Name))
            result.AddError("Customer name is required");
            
        // Business rule validation
        if (customer.CreditLimit < 0)
            result.AddError("Credit limit cannot be negative");
            
        // Data format validation
        if (!IsValidCustomerId(customer.Id))
            result.AddError("Customer ID format is invalid");
            
        return result;
    }
    
    public ValidationResult ValidateGLTransaction(GLTransaction transaction)
    {
        var result = new ValidationResult();
        
        // Balanced entry validation
        var totalDebits = transaction.Lines.Sum(l => l.DebitAmount);
        var totalCredits = transaction.Lines.Sum(l => l.CreditAmount);
        
        if (Math.Abs(totalDebits - totalCredits) > 0.01m)
            result.AddError("Transaction is not balanced");
            
        // Account validation
        foreach (var line in transaction.Lines)
        {
            if (!IsValidAccount(line.AccountNumber))
                result.AddError($"Invalid account number: {line.AccountNumber}");
        }
        
        return result;
    }
}
```

#### Post-Integration Reconciliation
```csharp
public class GPReconciliationService
{
    public async Task<ReconciliationResult> ReconcileTransactions(DateTime reconciliationDate)
    {
        var result = new ReconciliationResult();
        
        // Get transactions from both systems
        var tpTransactions = await GetTowneParkTransactions(reconciliationDate);
        var gpTransactions = await GetGreatPlainsTransactions(reconciliationDate);
        
        // Compare transaction totals
        var tpTotal = tpTransactions.Sum(t => t.Amount);
        var gpTotal = gpTransactions.Sum(t => t.Amount);
        
        if (Math.Abs(tpTotal - gpTotal) > 0.01m)
        {
            result.AddDiscrepancy($"Total amount mismatch: TP={tpTotal}, GP={gpTotal}");
        }
        
        // Detailed transaction matching
        foreach (var tpTransaction in tpTransactions)
        {
            var matchingGpTransaction = gpTransactions
                .FirstOrDefault(g => g.Reference == tpTransaction.Reference);
                
            if (matchingGpTransaction == null)
            {
                result.AddDiscrepancy($"Missing GP transaction: {tpTransaction.Reference}");
            }
            else if (Math.Abs(tpTransaction.Amount - matchingGpTransaction.Amount) > 0.01m)
            {
                result.AddDiscrepancy($"Amount mismatch for {tpTransaction.Reference}");
            }
        }
        
        return result;
    }
}
```

### Error Recovery Mechanisms

#### Retry Logic Implementation
```csharp
public class GPIntegrationRetryPolicy
{
    private readonly int _maxRetries = 3;
    private readonly TimeSpan _baseDelay = TimeSpan.FromSeconds(5);
    
    public async Task<T> ExecuteWithRetryAsync<T>(Func<Task<T>> operation)
    {
        for (int attempt = 1; attempt <= _maxRetries; attempt++)
        {
            try
            {
                return await operation();
            }
            catch (Exception ex) when (IsRetriableException(ex) && attempt < _maxRetries)
            {
                var delay = TimeSpan.FromMilliseconds(_baseDelay.TotalMilliseconds * Math.Pow(2, attempt - 1));
                await Task.Delay(delay);
                
                LogWarning($"Retry attempt {attempt} after {delay.TotalSeconds} seconds: {ex.Message}");
            }
        }
        
        // Final attempt without catch
        return await operation();
    }
    
    private bool IsRetriableException(Exception ex)
    {
        return ex is SqlException sqlEx && IsTransientSqlError(sqlEx.Number) ||
               ex is TimeoutException ||
               ex is HttpRequestException;
    }
}
```

#### Dead Letter Queue Processing
```csharp
public class GPIntegrationDeadLetterProcessor
{
    public async Task ProcessFailedTransactions()
    {
        var failedTransactions = await GetFailedTransactions();
        
        foreach (var transaction in failedTransactions)
        {
            try
            {
                // Attempt to reprocess with enhanced error handling
                var result = await ReprocessTransaction(transaction);
                
                if (result.Success)
                {
                    await MarkTransactionAsProcessed(transaction.Id);
                    LogInfo($"Successfully reprocessed transaction {transaction.Id}");
                }
                else
                {
                    await EscalateTransaction(transaction, result.ErrorMessage);
                }
            }
            catch (Exception ex)
            {
                LogError($"Failed to reprocess transaction {transaction.Id}: {ex.Message}");
                await EscalateTransaction(transaction, ex.Message);
            }
        }
    }
}
```

## Performance Optimization

### Batch Processing Optimization

#### Bulk Data Transfer
```csharp
public class GPBulkDataProcessor
{
    private readonly int _batchSize = 1000;
    
    public async Task<bool> BulkInsertTransactions(List<GLTransaction> transactions)
    {
        var batches = transactions.Chunk(_batchSize);
        
        foreach (var batch in batches)
        {
            using var bulkCopy = new SqlBulkCopy(_connectionString);
            bulkCopy.DestinationTableName = "GL10001";
            bulkCopy.BatchSize = _batchSize;
            bulkCopy.BulkCopyTimeout = 300; // 5 minutes
            
            var dataTable = ConvertToDataTable(batch);
            await bulkCopy.WriteToServerAsync(dataTable);
        }
        
        return true;
    }
}
```

#### Parallel Processing
```csharp
public class GPParallelProcessor
{
    public async Task ProcessTransactionsInParallel(List<GLTransaction> transactions)
    {
        var parallelOptions = new ParallelOptions
        {
            MaxDegreeOfParallelism = Environment.ProcessorCount,
            CancellationToken = CancellationToken.None
        };
        
        await Parallel.ForEachAsync(transactions, parallelOptions, async (transaction, ct) =>
        {
            try
            {
                await ProcessSingleTransaction(transaction);
            }
            catch (Exception ex)
            {
                LogError($"Failed to process transaction {transaction.Id}: {ex.Message}");
                await QueueForRetry(transaction);
            }
        });
    }
}
```

### Caching Strategies

#### Master Data Caching
```csharp
public class GPMasterDataCache
{
    private readonly IMemoryCache _cache;
    private readonly TimeSpan _cacheExpiry = TimeSpan.FromHours(4);
    
    public async Task<Customer> GetCustomerAsync(string customerId)
    {
        var cacheKey = $"customer:{customerId}";
        
        if (_cache.TryGetValue(cacheKey, out Customer cachedCustomer))
        {
            return cachedCustomer;
        }
        
        var customer = await FetchCustomerFromGP(customerId);
        
        _cache.Set(cacheKey, customer, _cacheExpiry);
        return customer;
    }
    
    public async Task<ChartOfAccount> GetAccountAsync(string accountNumber)
    {
        var cacheKey = $"account:{accountNumber}";
        
        if (_cache.TryGetValue(cacheKey, out ChartOfAccount cachedAccount))
        {
            return cachedAccount;
        }
        
        var account = await FetchAccountFromGP(accountNumber);
        
        _cache.Set(cacheKey, account, _cacheExpiry);
        return account;
    }
}
```

## Security and Compliance

### Authentication and Authorization

#### Service Account Configuration
```json
{
  "gp_service_account": {
    "domain": "TOWNEPARK",
    "username": "svc_gp_integration",
    "permissions": [
      "GP_CONNECT",
      "GL_POST",
      "AR_POST",
      "CUSTOMER_READ",
      "CUSTOMER_WRITE"
    ],
    "password_policy": {
      "rotation_days": 90,
      "complexity_required": true,
      "history_count": 12
    }
  }
}
```

#### Connection Security
```csharp
public class SecureGPConnection
{
    public SqlConnection CreateSecureConnection()
    {
        var connectionStringBuilder = new SqlConnectionStringBuilder
        {
            DataSource = _serverName,
            InitialCatalog = _databaseName,
            IntegratedSecurity = true,
            Encrypt = true,
            TrustServerCertificate = false,
            ConnectTimeout = 30,
            CommandTimeout = 300
        };
        
        return new SqlConnection(connectionStringBuilder.ConnectionString);
    }
}
```

### Data Encryption and Protection

#### Sensitive Data Handling
```csharp
public class GPDataProtection
{
    private readonly IDataProtectionProvider _dataProtection;
    
    public string EncryptSensitiveData(string data)
    {
        var protector = _dataProtection.CreateProtector("GP.Integration.SensitiveData");
        return protector.Protect(data);
    }
    
    public string DecryptSensitiveData(string encryptedData)
    {
        var protector = _dataProtection.CreateProtector("GP.Integration.SensitiveData");
        return protector.Unprotect(encryptedData);
    }
}
```

### Audit and Compliance

#### Audit Trail Implementation
```csharp
public class GPIntegrationAuditService
{
    public async Task LogIntegrationActivity(IntegrationAuditEntry entry)
    {
        var auditRecord = new
        {
            Timestamp = DateTime.UtcNow,
            UserId = entry.UserId,
            Operation = entry.Operation,
            EntityType = entry.EntityType,
            EntityId = entry.EntityId,
            OldValues = JsonSerializer.Serialize(entry.OldValues),
            NewValues = JsonSerializer.Serialize(entry.NewValues),
            IPAddress = entry.IPAddress,
            UserAgent = entry.UserAgent,
            Success = entry.Success,
            ErrorMessage = entry.ErrorMessage
        };
        
        await InsertAuditRecord(auditRecord);
    }
}
```

## Monitoring and Alerting

### Performance Monitoring

#### Key Performance Indicators
```json
{
  "performance_metrics": {
    "transaction_throughput": {
      "metric": "transactions_per_minute",
      "target": 100,
      "warning_threshold": 80,
      "critical_threshold": 50
    },
    "error_rate": {
      "metric": "error_percentage",
      "target": 0.1,
      "warning_threshold": 1.0,
      "critical_threshold": 5.0
    },
    "response_time": {
      "metric": "average_response_ms",
      "target": 1000,
      "warning_threshold": 2000,
      "critical_threshold": 5000
    }
  }
}
```

#### Health Check Implementation
```csharp
public class GPIntegrationHealthCheck : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            // Test GP database connectivity
            using var connection = CreateGPConnection();
            await connection.OpenAsync(cancellationToken);
            
            // Test basic query execution
            var testQuery = "SELECT COUNT(*) FROM SY01500 WHERE USERID = 'sa'";
            using var command = new SqlCommand(testQuery, connection);
            var result = await command.ExecuteScalarAsync(cancellationToken);
            
            // Test eConnect availability
            var eConnectAvailable = await TestEConnectAvailability();
            
            if (eConnectAvailable)
            {
                return HealthCheckResult.Healthy("Great Plains integration is healthy");
            }
            else
            {
                return HealthCheckResult.Degraded("eConnect service is unavailable");
            }
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy($"Great Plains integration failed: {ex.Message}");
        }
    }
}
```

### Alert Configuration

#### Critical Alert Definitions
```json
{
  "alert_definitions": {
    "integration_failure": {
      "condition": "error_rate > 5%",
      "severity": "critical",
      "notification_channels": ["email", "sms", "teams"],
      "escalation_minutes": 15
    },
    "performance_degradation": {
      "condition": "response_time > 5000ms",
      "severity": "warning",
      "notification_channels": ["email", "teams"],
      "escalation_minutes": 30
    },
    "data_inconsistency": {
      "condition": "reconciliation_discrepancy > $1000",
      "severity": "high",
      "notification_channels": ["email", "teams"],
      "escalation_minutes": 60
    }
  }
}
```

This comprehensive Great Plains integration specification provides the technical foundation for seamless integration between Towne Park's billing system and Microsoft Dynamics Great Plains, ensuring data accuracy, performance, security, and compliance with enterprise requirements.