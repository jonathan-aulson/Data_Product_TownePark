---
title: "Billable Accounts Forecasting - Technical Specifications"
description: "Technical implementation details, database queries, and data integration specifications for Billable Accounts forecasting"
author: "Towne Park Data Product Team"
date: "2025-07-16"
version: "1.0"
systems: ["Forecasting", "PowerBill", "EDW", "Dataverse"]
components: ["Database Queries", "Data Integration", "Calculation Engine"]
business_domains: ["Financial Forecasting", "Data Integration"]
user_roles: ["Developer", "Database Administrator", "System Architect"]
validation_status: "✅ Verified"
related_docs:
  - "docs/Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BillableAccounts_BusinessRules.md"
  - "docs/Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md"
cross_references:
  - type: "implements"
    target: "User Story 2337"
    description: "Technical implementation for Billable Accounts calculation"
  - type: "implements"
    target: "User Story 2161"
    description: "Technical implementation for P&L View initialization"
---

# Billable Accounts Forecasting - Technical Specifications

## Overview

This document provides technical implementation details for the Billable Accounts forecasting functionality, including database queries, data integration patterns, and calculation algorithms.

## Database Schema Requirements

### Core Tables

#### BUDGET_FINAL
Primary source for budget data used in Internal Revenue calculations.

**Key Columns:**
- `COST_CENTER` - Site identifier (e.g., '0170')
- `PERIOD` - Budget period (e.g., '202503')
- `MAIN_ACCOUNT` - Chart of accounts reference
- `BALANCE` - Budget amount
- `IS_SUMMARY_CATEGORY` - Category classification

#### CHART_OF_ACCOUNT
Chart of accounts master data for account classification.

**Key Columns:**
- `MAIN_ACCOUNT` - Account number
- `ACCOUNT_DESCRIPTION` - Account description
- `CATEGORY` - Account category classification

#### PowerBill Contract Details
Contract configuration data from PowerBill system.

**Key Elements:**
- Additional Payroll Amount
- PTEB Type and Configuration
- Support Services Configuration
- Escalator Details
- Non-excluded Account Lists

#### Dataverse Forecast Data
User-entered forecast values and configuration.

**Key Elements:**
- Other Expenses Tab data
- Non-excluded Billable Accounts list
- Account Manager forecast overrides

## Core Database Queries

### Internal Revenue Budget Query

```sql
-- Base Internal Revenue calculation from budget data
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa 
    ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = @SiteCode
    AND [PERIOD] = @PeriodCode
    AND [IS_SUMMARY_CATEGORY] = 'INTERNAL REVENUE'

-- Result: BUDGETED_CATEGORY_MONTHLY_TOTAL = -279663.89000
-- Formula: [INTERNAL REVENUE] = [BUDGET_CATEGORY_MONTHLY_TOTAL] * (-1)
```

### Non-Excluded Billable Accounts Query

```sql
-- Query for non-excluded billable accounts (6000-7999 range)
SELECT 
    budget.MAIN_ACCOUNT,
    budget.BALANCE,
    coa.ACCOUNT_DESCRIPTION
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa 
    ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
LEFT JOIN [Dataverse].[dbo].[ExcludedAccounts] AS excluded
    ON budget.MAIN_ACCOUNT = excluded.ACCOUNT_NUMBER
    AND excluded.SITE_CODE = @SiteCode
WHERE budget.COST_CENTER = @SiteCode
    AND budget.PERIOD = @PeriodCode
    AND budget.MAIN_ACCOUNT BETWEEN '6000' AND '7999'
    AND excluded.ACCOUNT_NUMBER IS NULL  -- Exclude accounts in exclusion list
    AND budget.BALANCE <> 0
```

### PTEB Accounts Query

```sql
-- Query for PTEB (Payroll Taxes, Employee Benefits) accounts
SELECT 
    SUM(CASE WHEN budget.MAIN_ACCOUNT = '6200' THEN budget.BALANCE ELSE 0 END) AS PayrollTaxes,
    SUM(CASE WHEN budget.MAIN_ACCOUNT = '6399' THEN budget.BALANCE ELSE 0 END) AS HealthInsurance,
    SUM(CASE WHEN budget.MAIN_ACCOUNT = '6500' THEN budget.BALANCE ELSE 0 END) AS WorkersComp,
    SUM(budget.BALANCE) AS TotalPTEB
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
LEFT JOIN [Dataverse].[dbo].[ExcludedAccounts] AS excluded
    ON budget.MAIN_ACCOUNT = excluded.ACCOUNT_NUMBER
    AND excluded.SITE_CODE = @SiteCode
WHERE budget.COST_CENTER = @SiteCode
    AND budget.PERIOD = @PeriodCode
    AND budget.MAIN_ACCOUNT IN ('6200', '6399', '6500')  -- PTEB accounts
    AND excluded.ACCOUNT_NUMBER IS NULL  -- Only non-excluded accounts
```

### Account Manager Forecast Override Query

```sql
-- Query for Account Manager entered forecast values
SELECT 
    forecast.ACCOUNT_NUMBER,
    forecast.FORECAST_AMOUNT,
    forecast.PERIOD,
    forecast.ENTERED_BY,
    forecast.ENTRY_DATE
FROM [Dataverse].[dbo].[OtherExpensesForecast] AS forecast
WHERE forecast.SITE_CODE = @SiteCode
    AND forecast.PERIOD = @PeriodCode
    AND forecast.FORECAST_AMOUNT IS NOT NULL
    AND forecast.FORECAST_AMOUNT <> 0
    AND forecast.ACCOUNT_NUMBER BETWEEN '6000' AND '7999'
```

## Calculation Algorithms

### Billable Accounts Internal Revenue Calculation

```sql
-- Complete Billable Accounts calculation procedure
CREATE PROCEDURE [dbo].[CalculateBillableAccountsInternalRevenue]
    @SiteCode VARCHAR(10),
    @PeriodCode VARCHAR(10)
AS
BEGIN
    DECLARE @InternalRevenue DECIMAL(18,2) = 0
    DECLARE @AdditionalPayroll DECIMAL(18,2) = 0
    DECLARE @PTEBAmount DECIMAL(18,2) = 0
    DECLARE @SupportServices DECIMAL(18,2) = 0
    DECLARE @BillableAccountsTotal DECIMAL(18,2) = 0
    
    -- Step 1: Get Additional Payroll Amount from contract
    SELECT @AdditionalPayroll = ISNULL(AdditionalPayrollAmount, 0)
    FROM [PowerBill].[dbo].[ContractDetails]
    WHERE SiteCode = @SiteCode
        AND BillableAccountsEnabled = 1
    
    -- Step 2: Calculate PTEB based on configuration
    EXEC [dbo].[CalculatePTEBAmount] @SiteCode, @PeriodCode, @PTEBAmount OUTPUT
    
    -- Step 3: Calculate Support Services
    EXEC [dbo].[CalculateSupportServices] @SiteCode, @PeriodCode, @SupportServices OUTPUT
    
    -- Step 4: Calculate Non-Excluded Billable Accounts
    EXEC [dbo].[CalculateNonExcludedAccounts] @SiteCode, @PeriodCode, @BillableAccountsTotal OUTPUT
    
    -- Step 5: Apply escalators if applicable
    DECLARE @EscalatorAmount DECIMAL(18,2) = 0
    EXEC [dbo].[ApplyEscalators] @SiteCode, @PeriodCode, 
        (@AdditionalPayroll + @PTEBAmount + @SupportServices + @BillableAccountsTotal), 
        @EscalatorAmount OUTPUT
    
    -- Step 6: Calculate final Internal Revenue
    SET @InternalRevenue = @AdditionalPayroll + @PTEBAmount + @SupportServices + @BillableAccountsTotal + @EscalatorAmount
    
    -- Return result
    SELECT @InternalRevenue AS BillableAccountsInternalRevenue
END
```

### PTEB Calculation Sub-Procedure

```sql
CREATE PROCEDURE [dbo].[CalculatePTEBAmount]
    @SiteCode VARCHAR(10),
    @PeriodCode VARCHAR(10),
    @PTEBAmount DECIMAL(18,2) OUTPUT
AS
BEGIN
    DECLARE @PTEBType VARCHAR(50)
    DECLARE @PTEBPercentage DECIMAL(5,2)
    DECLARE @BillablePayrollTotal DECIMAL(18,2)
    DECLARE @ActualPTEBTotal DECIMAL(18,2)
    
    -- Get PTEB configuration
    SELECT 
        @PTEBType = PTEBType,
        @PTEBPercentage = PTEBPercentage
    FROM [PowerBill].[dbo].[ContractDetails]
    WHERE SiteCode = @SiteCode
    
    IF @PTEBType = 'Actual PTEB'
    BEGIN
        -- Use actual PTEB account balances
        SELECT @ActualPTEBTotal = SUM(budget.BALANCE)
        FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
        LEFT JOIN [Dataverse].[dbo].[ExcludedAccounts] AS excluded
            ON budget.MAIN_ACCOUNT = excluded.ACCOUNT_NUMBER
            AND excluded.SITE_CODE = @SiteCode
        WHERE budget.COST_CENTER = @SiteCode
            AND budget.PERIOD = @PeriodCode
            AND budget.MAIN_ACCOUNT IN ('6200', '6399', '6500')
            AND excluded.ACCOUNT_NUMBER IS NULL
        
        SET @PTEBAmount = ISNULL(@ActualPTEBTotal, 0)
    END
    ELSE IF @PTEBType = '% of Billable Payroll'
    BEGIN
        -- Calculate as percentage of billable payroll
        SELECT @BillablePayrollTotal = SUM(budget.BALANCE)
        FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
        LEFT JOIN [Dataverse].[dbo].[ExcludedAccounts] AS excluded
            ON budget.MAIN_ACCOUNT = excluded.ACCOUNT_NUMBER
            AND excluded.SITE_CODE = @SiteCode
        WHERE budget.COST_CENTER = @SiteCode
            AND budget.PERIOD = @PeriodCode
            AND budget.MAIN_ACCOUNT BETWEEN '6000' AND '6199'  -- Payroll accounts excluding PTEB
            AND excluded.ACCOUNT_NUMBER IS NULL
        
        SET @PTEBAmount = (@BillablePayrollTotal * @PTEBPercentage / 100)
    END
    ELSE
    BEGIN
        SET @PTEBAmount = 0
    END
END
```

### Support Services Calculation Sub-Procedure

```sql
CREATE PROCEDURE [dbo].[CalculateSupportServices]
    @SiteCode VARCHAR(10),
    @PeriodCode VARCHAR(10),
    @SupportServices DECIMAL(18,2) OUTPUT
AS
BEGIN
    DECLARE @SupportServicesType VARCHAR(50)
    DECLARE @SupportServicesAmount DECIMAL(18,2)
    DECLARE @SupportServicesPercentage DECIMAL(5,2)
    DECLARE @PayrollBase DECIMAL(18,2)
    
    -- Get Support Services configuration
    SELECT 
        @SupportServicesType = SupportServicesType,
        @SupportServicesAmount = SupportServicesFixedAmount,
        @SupportServicesPercentage = SupportServicesPercentage
    FROM [PowerBill].[dbo].[ContractDetails]
    WHERE SiteCode = @SiteCode
    
    IF @SupportServicesType = 'Fixed'
    BEGIN
        SET @SupportServices = ISNULL(@SupportServicesAmount, 0)
    END
    ELSE IF @SupportServicesType = '% of Billable Payroll'
    BEGIN
        -- Calculate as percentage of billable payroll (excluding PTEB)
        SELECT @PayrollBase = SUM(budget.BALANCE)
        FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
        LEFT JOIN [Dataverse].[dbo].[ExcludedAccounts] AS excluded
            ON budget.MAIN_ACCOUNT = excluded.ACCOUNT_NUMBER
            AND excluded.SITE_CODE = @SiteCode
        WHERE budget.COST_CENTER = @SiteCode
            AND budget.PERIOD = @PeriodCode
            AND budget.MAIN_ACCOUNT BETWEEN '6000' AND '6199'
            AND excluded.ACCOUNT_NUMBER IS NULL
        
        SET @SupportServices = (@PayrollBase * @SupportServicesPercentage / 100)
    END
    ELSE IF @SupportServicesType = '% of Total Payroll'
    BEGIN
        -- Calculate as percentage of total payroll (all 6000-6999 accounts)
        SELECT @PayrollBase = SUM(budget.BALANCE)
        FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
        LEFT JOIN [Dataverse].[dbo].[ExcludedAccounts] AS excluded
            ON budget.MAIN_ACCOUNT = excluded.ACCOUNT_NUMBER
            AND excluded.SITE_CODE = @SiteCode
        WHERE budget.COST_CENTER = @SiteCode
            AND budget.PERIOD = @PeriodCode
            AND budget.MAIN_ACCOUNT BETWEEN '6000' AND '6999'
            AND excluded.ACCOUNT_NUMBER IS NULL
        
        SET @SupportServices = (@PayrollBase * @SupportServicesPercentage / 100)
    END
    ELSE
    BEGIN
        SET @SupportServices = 0
    END
END
```

## Data Integration Patterns

### PowerBill Integration

```csharp
// C# integration pattern for PowerBill contract data
public class PowerBillContractService
{
    public async Task<ContractDetails> GetContractDetailsAsync(string siteCode)
    {
        var query = @"
            SELECT 
                SiteCode,
                BillableAccountsEnabled,
                AdditionalPayrollAmount,
                PTEBType,
                PTEBPercentage,
                SupportServicesType,
                SupportServicesFixedAmount,
                SupportServicesPercentage,
                EscalatorType,
                EscalatorAmount,
                EscalatorEffectiveDate
            FROM ContractDetails 
            WHERE SiteCode = @SiteCode
                AND IsActive = 1";
        
        return await _dbConnection.QueryFirstOrDefaultAsync<ContractDetails>(query, new { SiteCode = siteCode });
    }
    
    public async Task<List<string>> GetNonExcludedAccountsAsync(string siteCode)
    {
        var query = @"
            SELECT AccountNumber 
            FROM NonExcludedBillableAccounts 
            WHERE SiteCode = @SiteCode 
                AND IsActive = 1";
        
        return await _dbConnection.QueryAsync<string>(query, new { SiteCode = siteCode });
    }
}
```

### EDW Budget Integration

```csharp
// C# integration pattern for EDW budget data
public class EDWBudgetService
{
    public async Task<decimal> GetInternalRevenueBudgetAsync(string siteCode, string period)
    {
        var query = @"
            SELECT SUM([BALANCE]) * (-1) AS InternalRevenue
            FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
            JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa 
                ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
            WHERE [COST_CENTER] = @SiteCode
                AND [PERIOD] = @Period
                AND [IS_SUMMARY_CATEGORY] = 'INTERNAL REVENUE'";
        
        return await _dbConnection.QueryFirstOrDefaultAsync<decimal>(query, 
            new { SiteCode = siteCode, Period = period });
    }
    
    public async Task<List<AccountBalance>> GetNonExcludedAccountBalancesAsync(
        string siteCode, string period, List<string> excludedAccounts)
    {
        var query = @"
            SELECT 
                budget.MAIN_ACCOUNT as AccountNumber,
                budget.BALANCE as Balance,
                coa.ACCOUNT_DESCRIPTION as Description
            FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
            JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa 
                ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
            WHERE budget.COST_CENTER = @SiteCode
                AND budget.PERIOD = @Period
                AND budget.MAIN_ACCOUNT BETWEEN '6000' AND '7999'
                AND budget.MAIN_ACCOUNT NOT IN @ExcludedAccounts
                AND budget.BALANCE <> 0";
        
        return await _dbConnection.QueryAsync<AccountBalance>(query, 
            new { SiteCode = siteCode, Period = period, ExcludedAccounts = excludedAccounts });
    }
}
```

### Dataverse Forecast Integration

```csharp
// C# integration pattern for Dataverse forecast data
public class DataverseForecastService
{
    public async Task<List<ForecastOverride>> GetAccountManagerForecastsAsync(string siteCode, string period)
    {
        var query = @"
            SELECT 
                AccountNumber,
                ForecastAmount,
                Period,
                EnteredBy,
                EntryDate
            FROM OtherExpensesForecast
            WHERE SiteCode = @SiteCode
                AND Period = @Period
                AND ForecastAmount IS NOT NULL
                AND ForecastAmount <> 0";
        
        return await _dbConnection.QueryAsync<ForecastOverride>(query, 
            new { SiteCode = siteCode, Period = period });
    }
    
    public async Task SaveBillableAccountsForecastAsync(BillableAccountsForecast forecast)
    {
        var query = @"
            MERGE BillableAccountsForecasts AS target
            USING (VALUES (@SiteCode, @Period, @InternalRevenue, @CalculationDate)) 
                AS source (SiteCode, Period, InternalRevenue, CalculationDate)
            ON target.SiteCode = source.SiteCode AND target.Period = source.Period
            WHEN MATCHED THEN
                UPDATE SET 
                    InternalRevenue = source.InternalRevenue,
                    CalculationDate = source.CalculationDate,
                    LastModified = GETUTCDATE()
            WHEN NOT MATCHED THEN
                INSERT (SiteCode, Period, InternalRevenue, CalculationDate, Created)
                VALUES (source.SiteCode, source.Period, source.InternalRevenue, 
                       source.CalculationDate, GETUTCDATE());";
        
        await _dbConnection.ExecuteAsync(query, forecast);
    }
}
```

## Escalator Application Logic

### Date-Based Escalator Processing

```csharp
public class EscalatorProcessor
{
    public decimal ApplyEscalators(decimal baseAmount, string siteCode, DateTime periodDate)
    {
        var escalators = GetActiveEscalators(siteCode, periodDate);
        var escalatedAmount = baseAmount;
        
        foreach (var escalator in escalators.Where(e => e.EffectiveDate <= periodDate))
        {
            if (escalator.EscalatorType == "Fixed")
            {
                escalatedAmount += escalator.Amount;
            }
            else if (escalator.EscalatorType == "Percentage")
            {
                escalatedAmount *= (1 + escalator.Percentage / 100);
            }
        }
        
        return escalatedAmount;
    }
    
    private List<Escalator> GetActiveEscalators(string siteCode, DateTime periodDate)
    {
        // Query escalators from PowerBill contract details
        var query = @"
            SELECT 
                EscalatorType,
                EscalatorAmount as Amount,
                EscalatorPercentage as Percentage,
                EscalatorEffectiveDate as EffectiveDate
            FROM ContractEscalators
            WHERE SiteCode = @SiteCode
                AND IsActive = 1
                AND EscalatorEffectiveDate <= @PeriodDate
            ORDER BY EscalatorEffectiveDate";
        
        return _dbConnection.Query<Escalator>(query, 
            new { SiteCode = siteCode, PeriodDate = periodDate }).ToList();
    }
}
```

## Performance Optimization

### Indexing Strategy

```sql
-- Recommended indexes for optimal query performance

-- BUDGET_FINAL table indexes
CREATE NONCLUSTERED INDEX IX_BUDGET_FINAL_CostCenter_Period_Category
ON [TP_EDW].[dbo].[BUDGET_FINAL] (COST_CENTER, PERIOD, IS_SUMMARY_CATEGORY)
INCLUDE (MAIN_ACCOUNT, BALANCE)

-- CHART_OF_ACCOUNT table indexes
CREATE NONCLUSTERED INDEX IX_CHART_OF_ACCOUNT_MainAccount
ON [TP_EDW].[dbo].[CHART_OF_ACCOUNT] (MAIN_ACCOUNT)
INCLUDE (ACCOUNT_DESCRIPTION, CATEGORY)

-- Dataverse indexes
CREATE NONCLUSTERED INDEX IX_ExcludedAccounts_Site_Account
ON [Dataverse].[dbo].[ExcludedAccounts] (SITE_CODE, ACCOUNT_NUMBER)

CREATE NONCLUSTERED INDEX IX_OtherExpensesForecast_Site_Period
ON [Dataverse].[dbo].[OtherExpensesForecast] (SiteCode, Period)
INCLUDE (AccountNumber, ForecastAmount)
```

### Caching Strategy

```csharp
public class BillableAccountsCalculationService
{
    private readonly IMemoryCache _cache;
    private readonly TimeSpan _cacheExpiry = TimeSpan.FromMinutes(15);
    
    public async Task<decimal> CalculateInternalRevenueAsync(string siteCode, string period)
    {
        var cacheKey = $"billable_accounts_{siteCode}_{period}";
        
        if (_cache.TryGetValue(cacheKey, out decimal cachedResult))
        {
            return cachedResult;
        }
        
        var result = await PerformCalculationAsync(siteCode, period);
        
        _cache.Set(cacheKey, result, _cacheExpiry);
        
        return result;
    }
}
```

## Error Handling and Validation

### Data Validation Rules

```csharp
public class BillableAccountsValidator
{
    public ValidationResult ValidateCalculationInputs(string siteCode, string period)
    {
        var errors = new List<string>();
        
        // Validate site code
        if (string.IsNullOrEmpty(siteCode))
            errors.Add("Site code is required");
        
        // Validate period format
        if (!Regex.IsMatch(period, @"^\d{6}$"))
            errors.Add("Period must be in YYYYMM format");
        
        // Validate contract configuration exists
        var contractExists = CheckContractExists(siteCode);
        if (!contractExists)
            errors.Add($"No contract configuration found for site {siteCode}");
        
        // Validate billable accounts enabled
        var billableAccountsEnabled = CheckBillableAccountsEnabled(siteCode);
        if (!billableAccountsEnabled)
            errors.Add($"Billable accounts not enabled for site {siteCode}");
        
        return new ValidationResult
        {
            IsValid = !errors.Any(),
            Errors = errors
        };
    }
}
```

## API Specifications

### REST API Endpoints

```csharp
[ApiController]
[Route("api/forecasting/billable-accounts")]
public class BillableAccountsController : ControllerBase
{
    [HttpGet("{siteCode}/internal-revenue/{period}")]
    public async Task<ActionResult<BillableAccountsResult>> GetInternalRevenue(
        string siteCode, string period)
    {
        var validation = _validator.ValidateCalculationInputs(siteCode, period);
        if (!validation.IsValid)
            return BadRequest(validation.Errors);
        
        var result = await _calculationService.CalculateInternalRevenueAsync(siteCode, period);
        return Ok(result);
    }
    
    [HttpPost("{siteCode}/calculate")]
    public async Task<ActionResult<BillableAccountsResult>> CalculateInternalRevenue(
        string siteCode, [FromBody] CalculationRequest request)
    {
        var result = await _calculationService.CalculateWithOverridesAsync(siteCode, request);
        return Ok(result);
    }
}
```

## Related Technical Documentation

- [Forecasting Data Sources Technical Specification](20250716_Forecasting_DataSources_TechnicalSpec.md)
- [PowerBill Integration Specifications](../integrations/powerbill-integration.md)
- [EDW Budget Integration Specifications](../integrations/budget-integration.md)
- [Dataverse Forecast Integration Specifications](../integrations/dataverse-integration.md)

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-16 | Data Product Team | Initial technical specifications from Sprint 28 user stories |
## Quick Links

- [Forecasting Data Sources Technical Specification](20250716_Forecasting_DataSources_TechnicalSpec.md)
- [EDW Budget Integration Specifications](../integrations/budget-integration.md)
