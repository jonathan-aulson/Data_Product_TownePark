---
title: "Towne Park Forecasting - Data Sources Technical Specification"
description: "Comprehensive technical specification for forecasting data sources, calculations, and database queries"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-05-12
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "20250512_Forecast_Data_Sources.md"
systems:
  - Forecasting
  - Billing
components:
  - Database
  - Backend
  - Integration
business_domains:
  - Revenue Calculation
  - Payroll Management
  - Financial Reporting
  - Data Integration
user_roles:
  - Account Manager
  - Finance Team
  - System Admin
tags:
  - technical
  - database
  - data-sources
  - calculations
  - forecasting
  - sql-queries
---

# Towne Park Forecasting - Data Sources Technical Specification

## Purpose

This document provides comprehensive technical specifications for all data sources, calculations, and database queries used in the Towne Park forecasting system. It serves as the definitive reference for data engineers, developers, and analysts working with forecasting data, ensuring accurate implementation of business logic and consistent data retrieval across all forecasting operations.

## Architecture Overview

The forecasting system integrates data from multiple sources to provide comprehensive financial forecasting capabilities. The architecture supports budget data, actual data, forecast calculations, and real-time operational metrics through a combination of SQL databases, Power Platform components, and external system integrations.

### Primary Data Sources
- **TP_EDW**: Enterprise Data Warehouse (On-Premises SQL Server)
- **TP_LEGION**: Legion scheduling system database
- **PowerBill Dataverse**: Contract and configuration data
- **Budget Systems**: Budget and planning data
- **Account Summary**: Actual financial data

## Data Model Specifications

### Core Financial Categories

The forecasting system organizes all financial data into standardized categories that support both budget and actual data comparison:

- **EXTERNAL REVENUE**: Customer-facing revenue streams
- **INTERNAL REVENUE**: Internal billing and management fees
- **PAYROLL**: Labor costs and hours
- **CLAIMS**: Insurance and liability claims
- **PARKING RENTS**: Facility rental costs
- **OTHER EXPENSE**: Operational expenses
- **PTEB**: Payroll Taxes Employee Benefits
- **INSURANCE**: Insurance costs and coverage

### Data Element Structure

Each data element supports multiple use categories:
- **Budget**: Planned/budgeted amounts
- **Forecast**: Projected amounts based on business logic
- **Daily Actuals**: Real-time operational data
- **Closed Actuals**: Final monthly/period actuals
- **Scheduled**: Planned operational metrics (primarily payroll)

## External Revenue Specifications

### Budget Calculation
```sql
-- External Revenue Budget Query
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'EXTERNAL REVENUE'
```

**Expected Result Example:**
```
BUDGETED_CATEGORY_MONTHLY_TOTAL: 1250357.92000
```

### Forecast Calculation Logic
**Formula:**
```
External Revenue = Valet Daily Revenue + Valet Monthly Revenue + 
                  Self Daily Revenue + Self Monthly Revenue + Self Aggregator Revenue +
                  Valet Aggregator Revenue + Self Overnight Revenue + Valet Overnight Revenue
```

**Component Calculations:**
- Valet Daily Revenue = Valet Daily Count × Valet Daily Rate
- Valet Monthly Revenue = Valet Monthly Count × Valet Monthly Rate
- Self Daily Revenue = Self Daily Count × Self Daily Rate
- Self Monthly Revenue = Self Monthly Count × Self Monthly Rate
- Self Aggregator Revenue = Self Aggregator Count × Self Aggregator Rate
- Valet Aggregator Revenue = Valet Aggregator Count × Valet Aggregator Rate
- Self Overnight Revenue = Self Overnight Count × Self Overnight Rate
- Valet Overnight Revenue = Valet Overnight Count × Valet Overnight Rate

**Data Source**: Forecast Parking Metrics tab
**Note**: For partially actualized months, the P&L view calculates based on combination of actual + forecast

### Daily Actuals Calculation
```sql
-- External Revenue Daily Actuals Query
SELECT SUM([NETEXTERNALREVENUE]) AS DAILY_ACTUAL_EXTERNAL_REVENUE
FROM [TP_EDW].[dbo].[vwREVENUE_DAILY_DETAIL_INVOICE]
WHERE [SITE] = '0829'
  AND [DATE] BETWEEN '2025-04-01' AND '2025-04-30'
```

**Expected Result Example:**
```
DAILY_ACTUAL_EXTERNAL_REVENUE: 36070.00
```

**Note**: For partially actualized months, the P&L view calculates based on combination of actual + forecast

### Closed Actuals Calculation
```sql
-- External Revenue Closed Actuals Query
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'EXTERNAL REVENUE'
```

**Expected Result Example:**
```
ACTUAL_CATEGORY_MONTHLY_TOTAL: 1258925.10000
```

## Internal Revenue Specifications

### Budget Calculation
```sql
-- Internal Revenue Budget Query
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INTERNAL REVENUE'
```

**Expected Result Example:**
```
BUDGETED_CATEGORY_MONTHLY_TOTAL: -279663.89000
```

**Note**: Internal Revenue budget amounts are multiplied by (-1) for proper P&L presentation

### Forecast Calculation Logic
**Primary Formula:**
```
[INTERNAL REVENUE] = [FIXED FEE IR] + [PER OCCUPIED ROOM IR] + [PER LABOR HOUR IR] + 
                     [REVENUE SHARE IR] + [BILLABLE ACCOUNTS IR] + [MANAGEMENT AGREEMENT IR] + 
                     [OTHER REVENUE (from Forecast)]
```

**Component Calculations:**

**Fixed Fee Internal Revenue:**
```
[FIXED FEE IR] = [SUM OF POWERBILL FIXED FEES] + [ESCALATORS]
```

**Per Occupied Room Internal Revenue:**
```
[PER OCCUPIED ROOM IR] = [PER OCCUPIED ROOM FEE] * [FORECASTED OCCUPIED ROOMS] + [ESCALATORS]
```

**Per Labor Hour Internal Revenue:**
```
[PER LABOR HOUR IR] = [FORECASTED HOURS PER JOB CODE (if configured)] * 
                      [POWERBILL BILLABLE RATE PER JOB CODE (Regular Rate Only)] + [ESCALATORS]
```

**Revenue Share Internal Revenue:**
```
[REVENUE SHARE IR] = [FORECASTED EXTERNAL REVENUE] * [POWERBILL REVENUE SHARE PERCENTAGE PER TIER] + 
                     [ESCALATORS (Including Threshold Escalators)]
```

**Billable Accounts Internal Revenue:**
```
[BILLABLE ACCOUNTS IR] = [SUM OF ACCOUNT SUMMARY FOR NON-EXCLUDED BILLABLE ACCOUNTS]
```

**Management Agreement Internal Revenue:**
```
[MANAGEMENT AGREEMENT IR] = [MANAGEMENT AGREEMENT CONFIGURATION, REPLACING 'NET EXTERNAL REVENUE' WITH 
                            'FORECASTED EXTERNAL REVENUE' AND REPLACING 'PAYROLL' WITH 'FORECASTED PAYROLL' 
                            AND REPLACING 'INSURANCE' WITH [5.77% of FORECASTED PAYROLL] + 
                            [BUDGET_FINAL AMOUNT IN 7082 (Vehicle Insurance Account)] + 
                            POWERBILL INSURANCE ADD'L AMOUNT'] + [OTHER EXPENSES FORECAST] + 
                            [SUM OF THE DELTA OF BILLABLE EXPENSE ACCOUNTS LIST COMPARED TO OTHER EXPENSES TAB ACCOUNTS LIST] + 
                            [ESCALATORS]
```

**Business Rules:**
- Escalators only apply to months following their trigger date
- BILLABLE ACCOUNTS should only be included in INTERNAL REVENUE when [BILLABLE ACCOUNTS] = ENABLED AND [MANAGEMENT AGREEMENTS] = DISABLED

### Actual Calculation
```sql
-- Internal Revenue Actual Query
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INTERNAL REVENUE'
```

**Expected Result Example:**
```
ACTUAL_CATEGORY_MONTHLY_TOTAL: -308022.41000
```

**Note**: Internal Revenue actual amounts are multiplied by (-1) for proper P&L presentation

## Payroll Specifications

### Budget - Hours
**Formula:**
```
[PAYROLL] = [SUM OF BALANCE FROM BUDGET_DATATAB_PR WHERE BALANCE_DESC = "PR Hours" 
            AND WHERE JOB_PROFILE MAPS TO JOB FAMILY PER SITE]
```

### Budget - Cost
**Formula:**
```
[PAYROLL] = [SUM OF BALANCE FROM BUDGET_DATATAB_PR WHERE BALANCE_DESC = "Payroll" 
            AND WHERE JOB_PROFILE MAPS TO JOB FAMILY PER SITE]
```

**Reference Data Source:**
```sql
-- Workday Site Salaries Reference
FROM [TP_EDW].[dbo].[WORKDAY_SITE_SALARIES] 
-- Key Fields: [COST_CENTER], TOTAL_BASEPAY_ANNUALIZED_AMOUNT, ALLOCATION_PER_COST_CENTER_AMOUNT, 
--             DISTRIBUTION_PERCENT, COST_CENTER
```

### Forecast - Hours
**Formula:**
```
[PAYROLL] = [FORECASTED_PAYROLL_HOURS_PER_JOB_FAMILY]
```

**Data Source**: Forecast Payroll tab
**Rate Source**: `[TP_LEGION].[dbo].[vwPAYROLL_SUMMARY]`

### Forecast - Cost
**Formula:**
```
[PAYROLL] = [FORECASTED_PAYROLL_HOURS_PER_JOB_FAMILY] * [JOB_FAMILY_HOURLY_RATE]
```

**Hourly Rate Calculation:**
```sql
-- Job Family Hourly Rate Query
SELECT SUM([TOTAL_DOLLARS])/SUM([TOTAL_HOURS]) AS 'HOURLY_RATE'
FROM [TP_LEGION].[dbo].[vwPAYROLL_SUMMARY]
WHERE [WORK_LOCATION] = '0170'
  AND [DATE] BETWEEN '3/1/2025' AND '3/31/2025'
  AND [TITLE] = 'GSC'
  AND [PAY_TYPE] = 'Regular'
```

**Expected Result Example:**
```
HOURLY_RATE: 11.994453
```

### Actual - Hours
```sql
-- Actual Hours Query
SELECT SUM([TOTAL_HOURS]) AS 'ACTUAL_HOURS'
FROM [TP_LEGION].[dbo].[vwPAYROLL_SUMMARY]
WHERE [WORK_LOCATION] = '0170'
  AND [DATE] BETWEEN '3/1/2025' AND '3/31/2025'
  AND [TITLE] = 'GSC'
```

**Expected Result Example:**
```
ACTUAL_HOURS: 407.69
```

**Alternative Source (Account Summary):**
```sql
-- Account Summary Payroll Actual
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PAYROLL'
```

**Expected Result Example:**
```
ACTUAL_CATEGORY_MONTHLY_TOTAL: 82330.62001
```

### Actual - Cost
```sql
-- Actual Cost Query
SELECT SUM([TOTAL_DOLLARS]) AS 'ACTUAL_COST'
FROM [TP_LEGION].[dbo].[vwPAYROLL_SUMMARY]
WHERE [WORK_LOCATION] = '0170'
  AND [DATE] BETWEEN '3/1/2025' AND '3/31/2025'
  AND [TITLE] = 'GSC'
```

**Expected Result Example:**
```
ACTUAL_COST: 4912.90
```

### Scheduled - Hours
```sql
-- Scheduled Regular Hours Query
SELECT sum([REGULAR_MINUTES])/60 AS 'SCHEDULED_REGULAR_HOURS'
FROM [TP_LEGION].[dbo].[SHIFT_ENTITY]
WHERE [LOCATION_EXTERNAL_ID] = '0170'
  AND [DAY_OF_THE_YEAR] = '108'
  AND [DELETED] = 'No'
  AND [WORK_ROLE] = 'GSA'
```

**Expected Result Example:**
```
SCHEDULED_REGULAR_HOURS: 80
```

```sql
-- Scheduled Overtime Hours Query
SELECT sum([OVERTIME_MINUTES]+[DOUBLE_OVERTIME_MINUTES])/60 AS 'SCHEDULED_OVERTIME_HOURS'
FROM [TP_LEGION].[dbo].[SHIFT_ENTITY]
WHERE [LOCATION_EXTERNAL_ID] = '0170'
  AND [DAY_OF_THE_YEAR] = '108'
  AND [DELETED] = 'No'
  AND [WORK_ROLE] = 'GSA'
```

**Expected Result Example:**
```
SCHEDULED_OVERTIME_HOURS: 0
```

### Scheduled - Cost
```sql
-- Scheduled Cost Query
SELECT SUM(CAST([SCHEDULE_COST] AS DECIMAL(18, 2))) AS Total_SCHEDULE_COST
FROM [TP_LEGION].[dbo].[SCHEDULE_COST_ENTITY]
WHERE [LOCATION_EXTERNAL_ID] = '0170'
  AND [WORK_ROLE] = 'GSA'
  AND [YEAR] = '2025'
  AND [DAY_OF_THE_YEAR] = '108'
```

**Expected Result Example:**
```
Total_SCHEDULE_COST: 742.50
```

### Actual Payroll Variance (LDR Integration)
**Formula:**
```
[PAYROLL] = [LDR_SALARY] + [LDR_HOURLY]
```

**Note**: This variance is added to the P&L view on top of standard payroll calculations

## Claims Specifications

### Budget
**Formula:**
```
[CLAIMS] = [BUDGETED_CATEGORY_MONTHLY_TOTAL]
```

**Note**: Budgeted Claims are expected to always be zero

```sql
-- Claims Budget Query
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'CLAIMS'
```

**Expected Result Example:**
```
BUDGETED_CATEGORY_MONTHLY_TOTAL: 0.00000
```

### Actual
```sql
-- Claims Actual Query
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'CLAIMS'
```

**Expected Result Example:**
```
ACTUAL_CATEGORY_MONTHLY_TOTAL: NULL
```

## Parking Rents Specifications

### Budget and Forecast
```sql
-- Parking Rents Budget Query
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PARKING RENTS'
```

**Expected Result Example:**
```
BUDGETED_CATEGORY_MONTHLY_TOTAL: 0.00000
```

**Note**: Forecast uses the same budget calculation

### Actual
```sql
-- Parking Rents Actual Query
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PARKING RENTS'
```

**Expected Result Example:**
```
ACTUAL_CATEGORY_MONTHLY_TOTAL: NULL
```

## Other Expense Specifications

### Budget and Forecast
```sql
-- Other Expense Budget Query
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'OTHER EXPENSE'
```

**Expected Result Example:**
```
BUDGETED_CATEGORY_MONTHLY_TOTAL: 33029.99000
```

**Note**: Forecast uses the same budget calculation

### Actual
```sql
-- Other Expense Actual Query
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'OTHER EXPENSE'
```

**Expected Result Example:**
```
ACTUAL_CATEGORY_MONTHLY_TOTAL: 42600.37000
```

## PTEB (Payroll Taxes Employee Benefits) Specifications

### Budget
```sql
-- PTEB Budget Query
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PTEB'
```

**Expected Result Example:**
```
BUDGETED_CATEGORY_MONTHLY_TOTAL: 10857.28000
```

### Forecast
**Formula:**
```
[PTEB] = ([PTEB]/[BUDGET]) * [FORECASTED PAYROLL]
```

**Note**: This calculates the budgeted PTEB rate and applies it to forecasted payroll

### Actual
```sql
-- PTEB Actual Query
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PTEB'
```

**Expected Result Example:**
```
ACTUAL_CATEGORY_MONTHLY_TOTAL: 10980.61000
```

## Insurance Specifications

### Budget
```sql
-- Insurance Budget Query
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INSURANCE'
```

**Expected Result Example:**
```
BUDGETED_CATEGORY_MONTHLY_TOTAL: 5114.93000
```

### Forecast
**Formula:**
```
[INSURANCE] = [% of FORECASTED PAYROLL] + [BUDGETED AMOUNT IN 7082 (Vehicle Insurance Account)]
```

**Percentage Rates:**
- Management Agreements: 5.77% of forecasted payroll
- All others: 4.45% of forecasted payroll

### Actual
```sql
-- Insurance Actual Query
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INSURANCE'
```

**Expected Result Example:**
```
ACTUAL_CATEGORY_MONTHLY_TOTAL: 5143.74000
```

## Parking Statistics Mapping

### Revenue and Vehicle Statistics Mapping

| Parking Stat | MAIN_ACCOUNT (Revenue) | Type | MAIN_ACCOUNT (Vehicles) | Type | Parking Stat |
|---------------|------------------------|------|-------------------------|------|---------------|
| Valet Daily Revenue | 9411 | Revenue | 9510 | Vehicles | Valet Daily |
| Valet Overnight Revenue | 9412 | Revenue | 9520 | Vehicles | Valet Overnight |
| Valet Monthly Revenue | 9413 | Revenue | 9530 | Vehicles | Valet Monthly |
| Self Daily Revenue | 9414 | Revenue | 9550 | Vehicles | Self Daily |
| Self Overnight Revenue | 9415 | Revenue | 9560 | Vehicles | Self Overnight |
| Self Monthly Revenue | 9416 | Revenue | 9570 | Vehicles | Self Monthly |

### Additional Parking Statistics (Not Used in Parking Rates)

| Parking Stat | MAIN_ACCOUNT | Type |
|--------------|--------------|------|
| External Revenue | 9410 | Revenue |
| Valet Comps | 9540 | Vehicles |
| Self Comps | 9580 | Vehicles |
| Occupied Rooms | 9440 | Other |

## Data Integration Points

### Primary Database Connections
- **TP_EDW**: Enterprise Data Warehouse for budget, actual, and historical data
- **TP_LEGION**: Legion system for payroll, scheduling, and cost data
- **PowerBill Dataverse**: Contract configurations and billing rules

### Data Synchronization Requirements
- Real-time integration with Legion for payroll actuals
- Daily synchronization with EDW for budget and actual data
- On-demand access to PowerBill configurations for rate and rule updates

### Performance Considerations
- Query optimization for large date ranges
- Indexing on COST_CENTER, PERIOD, and DATE fields
- Caching strategies for frequently accessed budget and rate data

## Error Handling & Data Validation

### Data Quality Checks
- Null value handling in aggregation queries
- Date range validation for period-based calculations
- Cost center existence validation
- Account mapping verification

### Exception Handling
- Missing data scenarios (NULL results)
- Invalid date ranges
- Unmapped account codes
- Division by zero in rate calculations

## Security & Access Control

### Database Access Requirements
- Read-only access to TP_EDW for forecasting queries
- Read-only access to TP_LEGION for payroll data
- Appropriate service account permissions for automated processes

### Data Privacy Considerations
- Site-specific data access controls
- User role-based query filtering
- Audit logging for data access

## Related Documentation

- [Towne Park Forecasting System Overview](../../systems/forecasting/overview.md) ✓ VERIFIED
- [Forecasting Business Rules](../../business-rules/forecasting/overview.md) ✓ VERIFIED
- [Payroll Integration Specification](../integrations/legion-integration.md) ✓ VERIFIED
- [Budget Data Integration](../integrations/budget-integration.md) ✓ VERIFIED
- [Database Schema Documentation](./database-schema.md) ✓ VERIFIED
- [Account Manager Forecasting Process](../../user-processes/account-manager/forecasting-workflow.md) ✓ VERIFIED

## Glossary References

- **EDW**: Enterprise Data Warehouse (On-Premises SQL Server)
- **GSA**: Guest Service Associate
- **GSC**: Guest Service Coordinator
- **LDR**: Labor Distribution Report
- **PTEB**: Payroll Taxes Employee Benefits
- **RSS**: Revenue Spreadsheet (legacy)
## Quick Links

- [Towne Park Forecasting System Overview](../../systems/forecasting/overview.md)
- [Forecasting Business Rules](../../business-rules/forecasting/overview.md)
- [Payroll Integration Specification](../integrations/legion-integration.md)
- [Budget Data Integration](../integrations/budget-integration.md)
- [Database Schema Documentation](./database-schema.md)
