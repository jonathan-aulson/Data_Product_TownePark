---
title: "Forecasting P&L View Technical Specification"
description: "Technical specification for the Forecasting P&L view implementation including data sources, calculations, and performance requirements"
author: "Towne Park Data Product Team"
date: "2025-07-17"
version: "1.0"
status: "Active"
category: "Technical Specifications"
subcategory: "Forecasting"
tags: ["forecasting", "pl-view", "profit-loss", "technical-spec", "data-sources", "calculations"]
related_systems: ["Forecasting System", "PowerBI", "Dataverse", "Legion", "Budget System"]
stakeholders: ["Development Team", "Data Engineers", "Account Managers", "Finance Team"]
review_cycle: "Quarterly"
last_updated: "2025-07-17"
---

# Forecasting P&L View Technical Specification

## Overview

This document provides the technical specification for implementing the Forecasting P&L (Profit & Loss) view, which enables account managers to analyze financial performance across customer sites with comprehensive revenue and expense breakdowns.

## Business Context

The Forecasting P&L view provides critical financial insights by combining revenue data from billing systems with operational expenses from various sources, enabling data-driven decision making for account management and financial planning.

## Technical Architecture

### System Components

#### Data Sources
1. **PowerBill System**: Revenue and billing data
2. **Legion WFM**: Labor costs and scheduling data
3. **Budget System**: Planned vs. actual expense tracking
4. **Dataverse**: Master data and configuration
5. **Customer Sites Directory**: Site metadata and classifications

#### Processing Layer
1. **Data Integration Service**: ETL processes for data consolidation
2. **Calculation Engine**: P&L computation logic
3. **Caching Layer**: Performance optimization for frequent queries
4. **API Gateway**: Secure data access for frontend applications

#### Presentation Layer
1. **PowerBI Dashboard**: Interactive P&L visualizations
2. **Web Application**: Detailed P&L analysis interface
3. **Mobile Interface**: Summary P&L views for field users

## Data Model Specification

### Core Entities

#### PLSummary Table
```sql
CREATE TABLE PLSummary (
    PLSummaryID UNIQUEIDENTIFIER PRIMARY KEY,
    SiteID UNIQUEIDENTIFIER NOT NULL,
    PeriodStartDate DATE NOT NULL,
    PeriodEndDate DATE NOT NULL,
    TotalRevenue DECIMAL(18,2),
    TotalExpenses DECIMAL(18,2),
    NetIncome DECIMAL(18,2),
    GrossMargin DECIMAL(5,2),
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    ModifiedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (SiteID) REFERENCES CustomerSites(SiteID)
);
```

#### PLLineItem Table
```sql
CREATE TABLE PLLineItem (
    PLLineItemID UNIQUEIDENTIFIER PRIMARY KEY,
    PLSummaryID UNIQUEIDENTIFIER NOT NULL,
    CategoryType VARCHAR(50) NOT NULL, -- 'Revenue', 'Expense'
    LineItemType VARCHAR(100) NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    BudgetAmount DECIMAL(18,2),
    Variance DECIMAL(18,2),
    VariancePercent DECIMAL(5,2),
    DataSource VARCHAR(50) NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (PLSummaryID) REFERENCES PLSummary(PLSummaryID)
);
```

#### PLCalculationLog Table
```sql
CREATE TABLE PLCalculationLog (
    LogID UNIQUEIDENTIFIER PRIMARY KEY,
    PLSummaryID UNIQUEIDENTIFIER NOT NULL,
    CalculationStep VARCHAR(100) NOT NULL,
    InputData NVARCHAR(MAX),
    OutputData NVARCHAR(MAX),
    ExecutionTime INT, -- milliseconds
    Status VARCHAR(20) NOT NULL, -- 'Success', 'Warning', 'Error'
    ErrorMessage NVARCHAR(500),
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (PLSummaryID) REFERENCES PLSummary(PLSummaryID)
);
```

### Data Integration Mappings

#### Revenue Data Sources
```yaml
revenue_mappings:
  powerbill:
    source_table: "BillingStatements"
    fields:
      - source: "TotalAmount"
        target: "TotalRevenue"
        transformation: "SUM"
      - source: "ServiceFees"
        target: "ServiceRevenue"
        transformation: "SUM"
      - source: "ManagementFees"
        target: "ManagementRevenue"
        transformation: "SUM"
    filters:
      - field: "StatementDate"
        condition: "BETWEEN @StartDate AND @EndDate"
      - field: "Status"
        condition: "= 'Approved'"
```

#### Expense Data Sources
```yaml
expense_mappings:
  legion:
    source_table: "PayrollSummary"
    fields:
      - source: "RegularHours * HourlyRate"
        target: "RegularWages"
        transformation: "SUM"
      - source: "OvertimeHours * OvertimeRate"
        target: "OvertimeWages"
        transformation: "SUM"
      - source: "BenefitsCost"
        target: "Benefits"
        transformation: "SUM"
  
  budget_system:
    source_table: "ExpenseActuals"
    fields:
      - source: "Amount"
        target: "OperatingExpenses"
        transformation: "SUM"
        filter: "ExpenseCategory IN ('Utilities', 'Maintenance', 'Supplies')"
```

## Calculation Engine Specification

### Core Calculation Logic

#### Revenue Calculations
```csharp
public class RevenueCalculator
{
    public decimal CalculateTotalRevenue(Guid siteId, DateTime startDate, DateTime endDate)
    {
        var serviceRevenue = GetServiceRevenue(siteId, startDate, endDate);
        var managementRevenue = GetManagementRevenue(siteId, startDate, endDate);
        var additionalRevenue = GetAdditionalRevenue(siteId, startDate, endDate);
        
        return serviceRevenue + managementRevenue + additionalRevenue;
    }
    
    private decimal GetServiceRevenue(Guid siteId, DateTime startDate, DateTime endDate)
    {
        // Implementation for service revenue calculation
        // Includes base service fees, escalations, and adjustments
        return _billingService.GetServiceFees(siteId, startDate, endDate);
    }
}
```

#### Expense Calculations
```csharp
public class ExpenseCalculator
{
    public decimal CalculateTotalExpenses(Guid siteId, DateTime startDate, DateTime endDate)
    {
        var laborCosts = CalculateLaborCosts(siteId, startDate, endDate);
        var operatingExpenses = CalculateOperatingExpenses(siteId, startDate, endDate);
        var overheadAllocation = CalculateOverheadAllocation(siteId, startDate, endDate);
        
        return laborCosts + operatingExpenses + overheadAllocation;
    }
    
    private decimal CalculateLaborCosts(Guid siteId, DateTime startDate, DateTime endDate)
    {
        var payrollData = _legionService.GetPayrollData(siteId, startDate, endDate);
        
        var regularWages = payrollData.Sum(p => p.RegularHours * p.HourlyRate);
        var overtimeWages = payrollData.Sum(p => p.OvertimeHours * p.OvertimeRate);
        var benefits = payrollData.Sum(p => p.BenefitsCost);
        var payrollTaxes = (regularWages + overtimeWages) * 0.0765m; // FICA rate
        
        return regularWages + overtimeWages + benefits + payrollTaxes;
    }
}
```

#### Variance Analysis
```csharp
public class VarianceAnalyzer
{
    public PLVarianceResult CalculateVariances(PLSummary actual, PLBudget budget)
    {
        return new PLVarianceResult
        {
            RevenueVariance = actual.TotalRevenue - budget.BudgetedRevenue,
            RevenueVariancePercent = CalculateVariancePercent(actual.TotalRevenue, budget.BudgetedRevenue),
            ExpenseVariance = actual.TotalExpenses - budget.BudgetedExpenses,
            ExpenseVariancePercent = CalculateVariancePercent(actual.TotalExpenses, budget.BudgetedExpenses),
            NetIncomeVariance = actual.NetIncome - budget.BudgetedNetIncome,
            NetIncomeVariancePercent = CalculateVariancePercent(actual.NetIncome, budget.BudgetedNetIncome)
        };
    }
    
    private decimal CalculateVariancePercent(decimal actual, decimal budget)
    {
        if (budget == 0) return 0;
        return ((actual - budget) / budget) * 100;
    }
}
```

## API Specification

### REST Endpoints

#### Get P&L Summary
```http
GET /api/forecasting/pl-summary/{siteId}
Parameters:
  - startDate: string (YYYY-MM-DD)
  - endDate: string (YYYY-MM-DD)
  - includeVariance: boolean (default: true)

Response:
{
  "siteId": "guid",
  "siteName": "string",
  "periodStart": "2025-01-01",
  "periodEnd": "2025-01-31",
  "summary": {
    "totalRevenue": 125000.00,
    "totalExpenses": 98000.00,
    "netIncome": 27000.00,
    "grossMargin": 21.6
  },
  "variance": {
    "revenueVariance": 5000.00,
    "revenueVariancePercent": 4.17,
    "expenseVariance": -2000.00,
    "expenseVariancePercent": -2.00
  }
}
```

#### Get P&L Detail
```http
GET /api/forecasting/pl-detail/{siteId}
Parameters:
  - startDate: string (YYYY-MM-DD)
  - endDate: string (YYYY-MM-DD)
  - category: string (optional: 'revenue', 'expense')

Response:
{
  "siteId": "guid",
  "lineItems": [
    {
      "category": "Revenue",
      "lineItemType": "Service Fees",
      "amount": 85000.00,
      "budgetAmount": 80000.00,
      "variance": 5000.00,
      "variancePercent": 6.25,
      "dataSource": "PowerBill"
    }
  ]
}
```

## Performance Requirements

### Response Time Targets
- **P&L Summary**: < 2 seconds for single site
- **P&L Detail**: < 5 seconds for single site
- **Multi-site Comparison**: < 10 seconds for up to 50 sites
- **Historical Trend Analysis**: < 15 seconds for 12-month period

### Scalability Requirements
- **Concurrent Users**: Support 100+ simultaneous users
- **Data Volume**: Handle 10,000+ sites with 5 years of historical data
- **Calculation Throughput**: Process 1,000+ P&L calculations per minute
- **Storage Growth**: Accommodate 20% annual data growth

### Caching Strategy
```yaml
caching_configuration:
  pl_summary:
    cache_duration: "4 hours"
    cache_key_pattern: "pl_summary_{siteId}_{startDate}_{endDate}"
    invalidation_triggers:
      - "billing_data_update"
      - "payroll_data_update"
  
  pl_detail:
    cache_duration: "2 hours"
    cache_key_pattern: "pl_detail_{siteId}_{startDate}_{endDate}_{category}"
    invalidation_triggers:
      - "expense_data_update"
      - "budget_data_update"
```

## Data Quality and Validation

### Validation Rules
```csharp
public class PLDataValidator
{
    public ValidationResult ValidatePLData(PLSummary plSummary)
    {
        var result = new ValidationResult();
        
        // Revenue validation
        if (plSummary.TotalRevenue < 0)
            result.AddError("Total revenue cannot be negative");
        
        // Expense validation
        if (plSummary.TotalExpenses < 0)
            result.AddError("Total expenses cannot be negative");
        
        // Margin validation
        var calculatedMargin = (plSummary.TotalRevenue - plSummary.TotalExpenses) / plSummary.TotalRevenue * 100;
        if (Math.Abs(calculatedMargin - plSummary.GrossMargin) > 0.01m)
            result.AddError("Gross margin calculation mismatch");
        
        // Data completeness validation
        if (plSummary.TotalRevenue == 0 && plSummary.TotalExpenses > 0)
            result.AddWarning("Revenue is zero but expenses exist - verify data completeness");
        
        return result;
    }
}
```

### Data Reconciliation
```sql
-- Daily reconciliation query
WITH RevenueReconciliation AS (
    SELECT 
        SiteID,
        SUM(Amount) as BillingSystemTotal
    FROM BillingStatements 
    WHERE StatementDate = @ReconciliationDate
    GROUP BY SiteID
),
PLReconciliation AS (
    SELECT 
        SiteID,
        TotalRevenue as PLSystemTotal
    FROM PLSummary 
    WHERE PeriodStartDate <= @ReconciliationDate 
    AND PeriodEndDate >= @ReconciliationDate
)
SELECT 
    r.SiteID,
    r.BillingSystemTotal,
    p.PLSystemTotal,
    ABS(r.BillingSystemTotal - p.PLSystemTotal) as Variance
FROM RevenueReconciliation r
FULL OUTER JOIN PLReconciliation p ON r.SiteID = p.SiteID
WHERE ABS(r.BillingSystemTotal - p.PLSystemTotal) > 100.00;
```

## Security and Access Control

### Role-Based Access
```yaml
access_control:
  account_manager:
    permissions:
      - "view_pl_summary"
      - "view_pl_detail"
      - "export_pl_data"
    scope: "assigned_sites_only"
  
  district_manager:
    permissions:
      - "view_pl_summary"
      - "view_pl_detail"
      - "view_pl_trends"
      - "export_pl_data"
    scope: "district_sites_only"
  
  finance_team:
    permissions:
      - "view_pl_summary"
      - "view_pl_detail"
      - "view_pl_trends"
      - "modify_budget_data"
      - "export_pl_data"
      - "view_reconciliation_reports"
    scope: "all_sites"
```

### Data Encryption
- **Data at Rest**: AES-256 encryption for sensitive financial data
- **Data in Transit**: TLS 1.3 for all API communications
- **Database Connections**: Encrypted connection strings with certificate validation

## Monitoring and Alerting

### Performance Monitoring
```yaml
monitoring_metrics:
  response_time:
    - metric: "pl_summary_response_time"
      threshold: "2000ms"
      alert_level: "warning"
    - metric: "pl_detail_response_time"
      threshold: "5000ms"
      alert_level: "warning"
  
  data_quality:
    - metric: "pl_calculation_errors"
      threshold: "5 per hour"
      alert_level: "critical"
    - metric: "data_reconciliation_variance"
      threshold: "1000 USD"
      alert_level: "warning"
```

### Error Handling
```csharp
public class PLCalculationService
{
    public async Task<PLResult> CalculatePLAsync(Guid siteId, DateTime startDate, DateTime endDate)
    {
        try
        {
            var result = await PerformCalculationAsync(siteId, startDate, endDate);
            await LogCalculationSuccess(siteId, result);
            return result;
        }
        catch (DataSourceException ex)
        {
            await LogCalculationError(siteId, ex, "Data source unavailable");
            return new PLResult { Status = "Error", Message = "Unable to retrieve source data" };
        }
        catch (CalculationException ex)
        {
            await LogCalculationError(siteId, ex, "Calculation error");
            return new PLResult { Status = "Error", Message = "Calculation failed - please retry" };
        }
    }
}
```

## Related Documentation

- [Forecasting System Overview](../../systems/forecasting/forecasting-system-overview.md)
- [PowerBill Integration](../integrations/powerbill-integration.md)
- [Legion Integration](../integrations/legion-integration.md)
- [Budget System Integration](../integrations/budget-integration.md)
- [Data Quality Standards](../../standards/data-quality-standards.md)

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-17 | Data Product Team | Initial technical specification from Sprint 25 user stories |