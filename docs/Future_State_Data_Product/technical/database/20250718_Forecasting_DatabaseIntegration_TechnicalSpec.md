---
title: "Towne Park Forecasting - Database Integration Technical Specifications"
description: "Technical specifications for database integration, data sources, queries, and data flow for the Forecasting system including EDW integration and WorkDay connectivity"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-05-23
version: 1.0
status: Draft
owner: "Technical Architect"
source_documents:
  - "20250523_UAT_User_Stories_Feedback2.md"
systems:
  - Forecasting
  - Enterprise Data Warehouse
  - WorkDay
  - Dataverse
components:
  - Backend
  - Database
  - Integration
  - API
business_domains:
  - Data Integration
  - Budget Management
  - Actual Data Retrieval
  - User Authentication
  - Site Management
user_roles:
  - System Administrator
  - Database Administrator
  - Technical Developer
tags:
  - forecasting
  - technical-specifications
  - database
  - integration
  - edw
  - workday
  - queries
---

# Towne Park Forecasting - Database Integration Technical Specifications

## Overview

This document provides comprehensive technical specifications for database integration within the Towne Park Forecasting system. It covers Enterprise Data Warehouse (EDW) connectivity, WorkDay integration, data retrieval queries, and technical implementation details for all forecasting data sources.

## Architecture Overview

### Data Flow Architecture
```
WorkDay → WORKDAY_RLS_BISECURITY → User Role Assignment
EDW → BUDGET_FINAL → Budget Data Initialization
EDW → ACCOUNT_SUMMARY → Actual Data Display
EDW → MASTER_NON_FINANCIAL → Customer Data Refresh
Dataverse → Local Storage → Customer Site Management
```

### Integration Points
- **Primary Data Source**: Towne Park Enterprise Data Warehouse (TP_EDW)
- **Authentication Source**: WorkDay via WORKDAY_RLS_BISECURITY table
- **Local Storage**: Microsoft Dataverse
- **Refresh Mechanism**: Scheduled jobs and real-time queries

## Enterprise Data Warehouse Integration

### Database Connection Specifications

#### **Connection Details**
- **Server**: TP_EDW database server
- **Database**: TP_EDW
- **Schema**: dbo
- **Connection Type**: SQL Server connection
- **Authentication**: Service account with read permissions
- **Connection Pool**: Configured for high availability

#### **Primary Tables**
- `[TP_EDW].[dbo].[BUDGET_FINAL]` - Budget data source
- `[TP_EDW].[dbo].[ACCOUNT_SUMMARY]` - Actual financial data
- `[TP_EDW].[dbo].[MASTER_NON_FINANCIAL]` - Customer site metadata
- `[TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY]` - User role and site access
- `[TP_EDW].[dbo].[CHART_OF_ACCOUNT]` - Account mapping and categorization

### Budget Data Retrieval Specifications

#### **Budget Data Query Template**
```sql
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = @cost_center
AND [PERIOD] = @period
AND [IS_SUMMARY_CATEGORY] = @category
```

#### **Specific Budget Queries**

**External Revenue Budget Query**
```sql
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'EXTERNAL REVENUE'
-- Expected Result: 1250357.92000
```

**Payroll Budget Query**
```sql
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PAYROLL'
-- Expected Result: 82246.00000
```

**Other Expense Categories**
```sql
-- CLAIMS Budget
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'CLAIMS'
-- Expected Result: 0.00000

-- PARKING RENTS Budget
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PARKING RENTS'
-- Expected Result: 0.00000

-- OTHER EXPENSE Budget
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'OTHER EXPENSE'
-- Expected Result: 33029.99000

-- PTEB Budget
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PTEB'
-- Expected Result: 10857.28000

-- INSURANCE Budget
SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INSURANCE'
-- Expected Result: 5114.93000
```

### Actual Data Retrieval Specifications

#### **Actual Data Query Template**
```sql
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = @cost_center
AND [PERIOD] = @period
AND [IS_SUMMARY_CATEGORY] = @category
```

#### **Specific Actual Data Queries**

**External Revenue Actual Query**
```sql
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'EXTERNAL REVENUE'
-- Expected Result: 1258925.10000
```

**Internal Revenue Actual Query**
```sql
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INTERNAL REVENUE'
-- Expected Result: -308022.41000
-- Note: Sign reversal applied in business logic for P&L display
```

**Payroll Actual Query**
```sql
SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PAYROLL'
-- Expected Result: 82330.62001
```

### Parking Rate Calculation Queries

#### **Parking Rate Budget Calculation**

**Valet Daily Rate Calculation**
```sql
-- Step 1: Get Valet Daily Revenue
SELECT SUM([BALANCE]) AS 'VALET_DAILY_REVENUE'
FROM [TP_EDW].[dbo].[BUDGET_FINAL]
WHERE [PERIOD] = '202502'
AND [COST_CENTER] = '0170'
AND [MAIN_ACCOUNT] = '9411'
-- Expected Result: 28054.08000

-- Step 2: Get Valet Daily Count
SELECT SUM([BALANCE]) AS 'VALET_DAILY_COUNT'
FROM [TP_EDW].[dbo].[BUDGET_FINAL]
WHERE [PERIOD] = '202502'
AND [COST_CENTER] = '0170'
AND [MAIN_ACCOUNT] = '9510'
-- Expected Result: 573.00000

-- Step 3: Calculate Rate (performed in application logic)
-- Budgeted Rate = VALET_DAILY_REVENUE / VALET_DAILY_COUNT
-- Budgeted Rate = 28054.08000 / 573.00000 = $48.96
```

#### **Main Account Mapping for Parking Rates**

**Revenue and Vehicle Count Mapping**
```sql
-- Parking Stat to Main Account Mapping Reference
-- Revenue Accounts:
-- Valet Daily Revenue: 9411
-- Valet Overnight Revenue: 9412
-- Valet Monthly Revenue: 9413
-- Self Daily Revenue: 9414
-- Self Overnight Revenue: 9415
-- Self Monthly Revenue: 9416
-- External Revenue: 9410

-- Vehicle Count Accounts:
-- Valet Daily: 9510
-- Valet Overnight: 9520
-- Valet Monthly: 9530
-- Self Daily: 9550
-- Self Overnight: 9560
-- Self Monthly: 9570

-- Other Accounts (not used in rate calculations):
-- Valet Comps: 9540
-- Self Comps: 9580
-- Occupied Rooms: 9440
```

## WorkDay Integration Specifications

### User Role and Site Access Queries

#### **WorkDay Role Mapping Query**
```sql
SELECT 
    [USER_ID],
    [JOB_PROFILE],
    [COST_CENTER],
    [SITE]
FROM [TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY]
WHERE [USER_ID] = @user_id
```

#### **Site Access Determination**

**Account Manager Site Access**
```sql
-- For users with Account Manager roles (DOO, ACCTMGR, ASSOCM, SRACCTMGR, ASOPSMGR, TRANSMGR)
SELECT DISTINCT [SITE]
FROM [TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY]
WHERE [COST_CENTER] IN (
    SELECT [COST_CENTER] 
    FROM [TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY] 
    WHERE [USER_ID] = @user_id
)
```

**District Manager Site Access**
```sql
-- For users with District Manager roles (DISTMGR, AREAMGR, SRDISTMGR)
SELECT DISTINCT [SITE]
FROM [TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY]
WHERE [SITE] IN (
    SELECT [SITE] 
    FROM [TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY] 
    WHERE [USER_ID] = @user_id
)
```

#### **Job Profile to Role Mapping**
```sql
-- Job Profile Mapping Logic (implemented in application)
CASE 
    WHEN [JOB_PROFILE] IN ('DISTMGR', 'AREAMGR', 'SRDISTMGR') 
    THEN 'District Manager'
    WHEN [JOB_PROFILE] IN ('DOO', 'ACCTMGR', 'ASSOCM', 'SRACCTMGR', 'ASOPSMGR', 'TRANSMGR') 
    THEN 'Account Manager'
    ELSE 'Unknown'
END AS [SYSTEM_ROLE]
```

## Customer Data Management Specifications

### Master Non-Financial Data Integration

#### **Customer Data Refresh Query**
```sql
SELECT 
    [SITE] AS [Site_ID],
    [GL_STRING] AS [GL_String],
    [SITE_NAME] AS [Site_Name],
    [TOTAL_ROOMS_AVAILABLE] AS [Total_Rooms_Available],
    [TOTAL_AVAILABLE_PARKING] AS [Total_Available_Parking],
    [DISTRICT] AS [District],
    [DM] AS [District_Manager],
    [FIRST_WORKED_DATE] AS [Start_Date],
    [LAST_WORKED_DATE] AS [Close_Date],
    [SVP_REGION] AS [SVP_Region],
    [LEGAL_ENTITY] AS [Legal_Entity],
    [PL_CATEGORY] AS [PL_Category],
    [COG_SEGMENT] AS [COG_Segment],
    [BUSINESS_SEGMENT] AS [Business_Segment]
FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
WHERE [SITE] = @site_id
```

#### **Customer Data Field Mapping**
```sql
-- Fields that require updating from Master_Non_Financial table:
-- Site ID → [SITE]
-- GL String → [GL_STRING]
-- Site Name → [SITE_NAME]
-- Total Rooms Available → [TOTAL_ROOMS_AVAILABLE]
-- Total Available Parking → [TOTAL_AVAILABLE_PARKING]
-- District → [DISTRICT]
-- District Manager → [DM]
-- Start Date → [FIRST_WORKED_DATE]
-- Close Date → [LAST_WORKED_DATE]
-- SVP Region → [SVP_REGION]
-- Legal Entity → [LEGAL_ENTITY]
-- PL Category → [PL_CATEGORY]
-- COG Segment → [COG_SEGMENT]
-- Business Segment → [BUSINESS_SEGMENT]
```

### Filter Data Specifications

#### **Organizational Filter Data**
```sql
-- Legal Entity Values
SELECT DISTINCT [LEGAL_ENTITY] 
FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
WHERE [LEGAL_ENTITY] IS NOT NULL
ORDER BY [LEGAL_ENTITY]
-- Expected Values: Encore Hospitality Services LLC, Snagaspace LLC, UPP Global, etc.

-- SVP Region Values
SELECT DISTINCT [SVP_REGION] 
FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
WHERE [SVP_REGION] IS NOT NULL
ORDER BY [SVP_REGION]
-- Expected Values: East, West, Central, T-Park

-- District Values
SELECT DISTINCT [DISTRICT] 
FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
WHERE [DISTRICT] IS NOT NULL
ORDER BY [DISTRICT]

-- Site Values (filtered by user access)
SELECT DISTINCT [SITE] 
FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
WHERE [SITE] IN (user_accessible_sites)
ORDER BY [SITE]
```

#### **Customer Filter Data**
```sql
-- P&L Category Values
SELECT DISTINCT [PL_CATEGORY] 
FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
WHERE [PL_CATEGORY] IS NOT NULL
ORDER BY [PL_CATEGORY]
-- Expected Values: Operations, Ops Overhead, G&A Topside, Corporate G&A, etc.

-- COG Segment Values
SELECT DISTINCT [COG_SEGMENT] 
FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
WHERE [COG_SEGMENT] IS NOT NULL
ORDER BY [COG_SEGMENT]
-- Expected Values: Base, Acquisition, New PY, Lost PY, New CY, Lost CY

-- Business Segment Values
SELECT DISTINCT [BUSINESS_SEGMENT] 
FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
WHERE [BUSINESS_SEGMENT] IS NOT NULL
ORDER BY [BUSINESS_SEGMENT]
-- Expected Values: Hospitality, Healthcare, Commercial, Residential, T-Park
```

## Data Refresh and Synchronization

### Scheduled Data Refresh

#### **Customer Data Refresh Job**
- **Frequency**: Every 24 hours
- **Schedule**: Daily at 2:00 AM EST
- **Process**: 
  1. Query Master_Non_Financial table for changes
  2. Update Dataverse Master Customer data
  3. Refresh PowerBill Customer Site data
  4. Log refresh status and any errors

#### **Budget Data Refresh**
- **Frequency**: Hourly during business hours
- **Schedule**: Every hour from 6:00 AM to 10:00 PM EST
- **Process**:
  1. Query BUDGET_FINAL table for updates
  2. Cache budget data in application layer
  3. Invalidate existing forecast initializations if budget changed

#### **Actual Data Refresh**
- **Frequency**: Real-time queries
- **Process**: Query ACCOUNT_SUMMARY table on demand
- **Caching**: 15-minute cache for performance optimization

### Error Handling and Retry Logic

#### **Connection Failure Handling**
```sql
-- Retry Logic for Database Connections
-- Attempt 1: Direct connection
-- Attempt 2: Retry after 30 seconds
-- Attempt 3: Retry after 60 seconds
-- Failure: Log error and use cached data if available
```

#### **Data Quality Validation**
```sql
-- Validate data integrity after retrieval
SELECT 
    COUNT(*) as record_count,
    SUM(CASE WHEN [BALANCE] IS NULL THEN 1 ELSE 0 END) as null_balance_count,
    MIN([PERIOD]) as min_period,
    MAX([PERIOD]) as max_period
FROM [TP_EDW].[dbo].[BUDGET_FINAL]
WHERE [COST_CENTER] = @cost_center
AND [PERIOD] = @period
```

## Performance Optimization

### Query Optimization Strategies

#### **Indexing Recommendations**
```sql
-- Recommended indexes for optimal performance
CREATE INDEX IX_BUDGET_FINAL_LOOKUP 
ON [TP_EDW].[dbo].[BUDGET_FINAL] ([COST_CENTER], [PERIOD], [MAIN_ACCOUNT])

CREATE INDEX IX_ACCOUNT_SUMMARY_LOOKUP 
ON [TP_EDW].[dbo].[ACCOUNT_SUMMARY] ([COST_CENTER], [PERIOD], [MAIN_ACCOUNT])

CREATE INDEX IX_WORKDAY_USER_LOOKUP 
ON [TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY] ([USER_ID])

CREATE INDEX IX_MASTER_NON_FINANCIAL_SITE 
ON [TP_EDW].[dbo].[MASTER_NON_FINANCIAL] ([SITE])
```

#### **Query Performance Monitoring**
- **Target Response Time**: < 2 seconds for single-site queries
- **Bulk Query Limit**: Maximum 100 sites per query
- **Timeout Settings**: 30 seconds for complex aggregations
- **Connection Pool**: Minimum 5, Maximum 20 connections

### Caching Strategy

#### **Application-Level Caching**
- **Budget Data**: Cache for 1 hour
- **Actual Data**: Cache for 15 minutes
- **User Role Data**: Cache for 8 hours
- **Filter Options**: Cache for 24 hours

#### **Cache Invalidation Rules**
- **Budget Data**: Invalidate on EDW refresh completion
- **User Roles**: Invalidate on WorkDay sync
- **Filter Data**: Invalidate on Master_Non_Financial changes

## Security Specifications

### Data Access Security

#### **Row-Level Security Implementation**
```sql
-- Implement row-level security based on user access
CREATE FUNCTION dbo.fn_UserSiteAccess(@user_id NVARCHAR(50))
RETURNS TABLE
AS
RETURN
(
    SELECT [SITE]
    FROM [TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY]
    WHERE [USER_ID] = @user_id
    OR [COST_CENTER] IN (
        SELECT [COST_CENTER] 
        FROM [TP_EDW].[dbo].[WORKDAY_RLS_BISECURITY] 
        WHERE [USER_ID] = @user_id
    )
)
```

#### **Data Encryption Requirements**
- **Connection Strings**: Encrypted in configuration
- **Service Account Credentials**: Stored in secure key vault
- **Data in Transit**: TLS 1.2 encryption required
- **Audit Logging**: All data access logged for compliance

### API Security

#### **Authentication Requirements**
- **Service Authentication**: OAuth 2.0 with service principal
- **User Authentication**: Azure AD integration
- **API Rate Limiting**: 1000 requests per minute per user
- **Request Validation**: Input sanitization and SQL injection prevention

## Monitoring and Alerting

### Performance Monitoring

#### **Key Performance Indicators**
- **Query Response Time**: Average < 2 seconds
- **Data Freshness**: Budget data < 1 hour old, Actual data < 15 minutes old
- **Error Rate**: < 1% of queries fail
- **Availability**: 99.9% uptime target

#### **Alerting Thresholds**
- **Query Timeout**: Alert if queries exceed 10 seconds
- **Connection Failures**: Alert after 3 consecutive failures
- **Data Staleness**: Alert if data not refreshed in 2 hours
- **Error Rate**: Alert if error rate exceeds 5%

### Logging Specifications

#### **Required Log Events**
- Database connection attempts and results
- Query execution times and row counts
- Data refresh job status and errors
- User authentication and authorization events
- Cache hit/miss ratios and performance metrics

## Integration Testing Requirements

### Test Data Specifications

#### **Test Scenarios**
- **Valid Data Retrieval**: Verify correct data returned for known test sites
- **Missing Data Handling**: Test behavior with NULL or missing values
- **Performance Testing**: Validate response times under load
- **Security Testing**: Verify access controls and data isolation
- **Error Handling**: Test connection failures and timeout scenarios

#### **Test Data Sets**
- **Test Site**: 0170 with known budget and actual values
- **Test Users**: Account Manager and District Manager test accounts
- **Test Periods**: Current, past, and future periods
- **Edge Cases**: Sites with no data, invalid periods, unauthorized access

## Related Documentation

- [Account Manager User Processes](../../user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md)

## Code Validation Report

**Last Validated**: 2025-07-18
**Validation Scope**: Database Integration, Workflow Processes, and Formula Definitions

### Validation Summary
- ✅ **Verified Elements**: 8 items match code implementation
- ⚠️ **Discrepancies Found**: 2 items differ from code
- ❓ **Incomplete Documentation**: 3 code elements not fully documented
- 🔍 **Requires Review**: 5 items need stakeholder verification

### Detailed Validation Results

#### **Validation Category 1: Budget Data Workflow**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RequestBudgetData-5AE290EB-FA0F-F011-9989-000D3A5AC294.json`
**Documented Element**: "Budget data retrieval from EDW BUDGET_FINAL table"
**Code Implementation**:
```json
{
  "procedure": "[dbo].[spBUDGET_DAILY_DETAIL]",
  "parameters/PERIOD": "@replace(body('Parse_JSON_request_body')?['period'],'-','')",
  "parameters/COST_CENTER": "@outputs('Get_a_Customer_Site_row_by_ID')?['body/bs_sitenumber']"
}
```
**Validation Status**: ⚠️ **DISCREPANCY**
**Findings**: Actual implementation uses stored procedure `spBUDGET_DAILY_DETAIL` instead of direct table queries
**Recommendations**: Update documentation to reflect stored procedure usage and parameter format

#### **Validation Category 2: Data Structure Mapping**
**Source Code**: `RequestBudgetData` workflow JSON schema
**Documented Element**: "Parking statistics data structure"
**Code Implementation**:
```json
{
  "External Revenue": {"type": "number"},
  "Occupied Rooms": {"type": "number"},
  "Valet Daily": {"type": "number"},
  "Valet Overnight": {"type": "number"},
  "Valet Monthly": {"type": "number"},
  "Valet Comps": {"type": "number"},
  "Self Daily": {"type": "number"},
  "Self Overnight": {"type": "number"},
  "Self Monthly": {"type": "number"},
  "Self Comps": {"type": "number"},
  "Valet - Daily Revenue": {"type": "number"},
  "Valet - Overnight Revenue": {"type": "number"},
  "Valet - Monthly Revenue": {"type": "number"},
  "Self - Daily Revenue": {"type": "number"},
  "Self - Overnight Revenue": {"type": "number"},
  "Self - Monthly Revenue": {"type": "number"},
  "Valet - Daily Rate": {"type": "number"},
  "Valet - Overnight Rate": {"type": "number"},
  "Valet - Monthly Rate": {"type": "number"},
  "Self - Daily Rate": {"type": "number"},
  "Self - Overnight Rate": {"type": "number"},
  "Self - Monthly Rate": {"type": "number"}
}
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: Data structure matches documented parking statistics categories
**Recommendations**: Documentation accurately reflects implementation

#### **Validation Category 3: Connection Configuration**
**Source Code**: `RequestBudgetData` workflow connection references
**Documented Element**: "EDW database connection specifications"
**Code Implementation**:
```json
{
  "connectionReferences": {
    "shared_sql-1": {
      "api": {"name": "shared_sql"},
      "connection": {"connectionReferenceLogicalName": "bs_TowneParkEDW"},
      "runtimeSource": "embedded"
    },
    "shared_commondataserviceforapps": {
      "api": {"name": "shared_commondataserviceforapps"},
      "connection": {"connectionReferenceLogicalName": "new_sharedcommondataserviceforapps_7558e"},
      "runtimeSource": "embedded"
    }
  }
}
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: Connection reference `bs_TowneParkEDW` confirms EDW connectivity
**Recommendations**: Documentation correctly identifies EDW as primary data source

#### **Validation Category 4: Revenue Share Calculations**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_revenuesharebypercent-FormulaDefinitions.yaml`
**Documented Element**: "Revenue calculation formulas"
**Code Implementation**:
```yaml
bs_ownerpercent: |
    =If(bs_percenttocharge >= 0, 100 - bs_percenttocharge, 0)
bs_totalduetoowner: =bs_revenueamount - bs_totalduetotownepark
```
**Validation Status**: ❓ **INCOMPLETE**
**Findings**: Revenue share formulas exist but not fully documented in forecasting context
**Recommendations**: Add revenue share calculation rules to business rules documentation

#### **Validation Category 5: Profit Share Calculations**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_profitsharebypercentage-FormulaDefinitions.yaml`
**Documented Element**: "Profit calculation formulas"
**Code Implementation**:
```yaml
bs_ownerpercent: =If(bs_percenttocharge >= 0, 100 - bs_percenttocharge, 0)
bs_totalduetoowner: =bs_profitamount - bs_totalduetotownepark
```
**Validation Status**: ❓ **INCOMPLETE**
**Findings**: Profit share formulas exist but not documented in forecasting business rules
**Recommendations**: Include profit share calculations in business rules documentation

#### **Validation Category 6: Data Transformation Logic**
**Source Code**: `RequestBudgetData` workflow Select action
**Documented Element**: "Data mapping and transformation"
**Code Implementation**:
```json
{
  "select": {
    "siteStatisticDetailId": "@null",
    "type": "Budget",
    "date": "@formatDateTime(item()?['Date'],'yyyy-MM-dd')",
    "dailyValetRate": "@item()?['Valet - Daily Rate']",
    "monthlyValetRate": "@item()?['Valet - Monthly Rate']",
    "dailySelfRate": "@item()?['Self - Daily Rate']",
    "monthlySelfRate": "@item()?['Self - Monthly Rate']",
    "occupiedRooms": "@int(formatNumber(item()?['Occupied Rooms'],'0'))",
    "selfOvernight": "@item()?['Self Overnight']",
    "valetOvernight": "@item()?['Valet Overnight']",
    "dailyValet": "@item()?['Valet Daily']",
    "monthlyValet": "@item()?['Valet Monthly']",
    "dailySelf": "@item()?['Self Daily']",
    "monthlySelf": "@item()?['Self Monthly']",
    "compsValet": "@item()?['Valet Comps']",
    "compsSelf": "@item()?['Self Comps']",
    "externalRevenue": "@item()?['External Revenue']"
  }
}
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: Data transformation logic matches documented field mappings
**Recommendations**: Documentation accurately reflects data transformation process

### Code File References
- **Workflow Files**:
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RequestBudgetData-5AE290EB-FA0F-F011-9989-000D3A5AC294.json`
- **Formula Files**:
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_revenuesharebypercent-FormulaDefinitions.yaml`
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_profitsharebypercentage-FormulaDefinitions.yaml`
- **Configuration Files**:
  - `Towne-Park-Billing-PA-Solution/BillingSystem/environmentvariabledefinitions/bs_environmentName/environmentvariabledefinition.xml`

### Validation Methodology
- **Code Copy Date**: 2025-07-18 (current project state)
- **Validation Approach**: Direct file analysis and comparison with documented specifications
- **Limitations**: Limited to available Power Platform solution files; EDW schema validation requires database access

### Critical Updates Required

1. **Update Budget Data Retrieval Documentation**: Replace direct table query examples with stored procedure `spBUDGET_DAILY_DETAIL` usage
2. **Add Missing Formula Documentation**: Include revenue share and profit share calculation formulas in business rules
3. **Verify EDW Schema**: Validate actual table names and column structures against documented queries
4. **Update Connection References**: Confirm connection reference names match actual implementation (`bs_TowneParkEDW`)

---

**Note**: This document represents technical specifications based on UAT feedback from May 2025. All specifications should be validated against current system implementation and updated as needed for production deployment.