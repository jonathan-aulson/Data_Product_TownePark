---
title: "Towne Park Architecture & Revenue Calculations - Team Meeting Notes"
description: "Comprehensive team meeting notes covering 12-month forecasting architecture, EDW internal revenue calculations, and current month trending implementation"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-08-05
version: 1.0
status: Active
owner: "Development Team"
source_documents:
  - "20250805_Architecture_Weekly_Sync.docx"
  - "20250805_edw_internal_revenue_current_month_calcs.docx"
  - "20250804_User Story 2655_ Current month Internal Revenue.docx"
systems:
  - Forecasting
  - EDW
  - Legion
  - Dataverse
components:
  - ETL
  - Power Automate
  - Database
  - Integration
business_domains:
  - Revenue Calculation
  - Payroll Management
  - Forecasting
  - Data Integration
user_roles:
  - Development Team
  - Architecture Team
  - Data Engineers
tags:
  - team-notes
  - architecture
  - revenue-calculations
  - forecasting
  - edw-integration
  - development-meetings
---

# Towne Park Architecture & Revenue Calculations - Team Meeting Notes

## Meeting Overview

This document consolidates critical team meeting discussions from August 4-5, 2025, covering architecture decisions for 12-month forecasting, EDW internal revenue calculation specifications, and current month trending implementation details.

## Meeting 1: Architecture Weekly Sync (2025-08-05)

### Participants
- **Cesar Figueroa** - Lead Architect
- **Jonathan Aulson** - Development Lead
- **Johnn Hesseltine** - Project Manager

### 12-Month Forecasting Architecture Review

#### Overall Process Design
Cesar presented the comprehensive architecture for 12-month forecasting with the following key components:

1. **ETL Process for Daily Detail Data**
   - Initial forecasting at daily detail level
   - Same ETL process stores budget data without changes at monthly level
   - Triggering process calls Power Automate flow for monitoring

2. **Power Automate Flow Integration**
   - Acts as monitor to create patches
   - Paginates logic for performing calculations
   - Calculations stored in Dataverse table for availability across systems

3. **Data Distribution**
   - Makes calculated data available for P&L view
   - Supports other microservices requiring forecast data
   - Centralized storage approach in Dataverse

#### Process Breakdown and Requirements
The team divided the process into discrete steps with specific requirements:

- **Step-by-step implementation approach** agreed upon
- **Sample requirements creation** completed for initial phases
- **Validation checkpoints** established for each major component

#### Azure Data Factory Limitations Discussion

**Current Limitations Identified:**
- **Evaluation Limits**: Minimum 1000 evaluations per hour supported
- **Daily Processing Time**: Maximum 8 hours daily for all data flows
- **Concurrent Processing**: Maximum 1 evaluation concurrently
- **Documentation Gap**: Azure doesn't publish exact source limits

**Alternative Solutions Explored:**
- **Data Factory Data Flows**: Alternative approach identified
- **Current Adequacy**: Present data flows working for current site and row volumes
- **Future Scalability**: Option to review alternatives if current solution insufficient

#### Load Testing Considerations

**Current Status:**
- Load testing approach not yet fully formed
- Testing will be part of process validation
- Production release will serve as real-world test with 2025 budget data

**Action Items:**
- Jonathan to develop load testing plan
- Consider involving Yash in load testing efforts
- Plan for production release testing with full 2025 dataset

### Next Steps from Architecture Meeting
1. **Cesar**: Review Data Factory alternatives if needed
2. **Cesar**: Document filtering solution based on forecast data presence
3. **Jonathan**: Coordinate next steps for implementation
4. **Team**: Continue systematic approach to process development

## Meeting 2: EDW Internal Revenue Current Month Calculations (2025-08-05)

### Participants
- **Jonathan Aulson** - Development Lead
- **Andrew Scheuer** - Developer
- **Christopher Thompson** - Business Analyst

### Demo Cancellation and Issues
- Demo cancelled due to issues with main client features
- Three bugs registered related to payroll functionality
- Copy feature problems identified and documented

### PTEB Calculation Logic Deep Dive

#### Account Code Structure
**PTEB Components** (Payroll Tax and Employee Benefits):
- **Account 6200**: General Ledger component
- **Account 6399**: General Ledger component  
- **Account 6500**: General Ledger component
- **PTEB Total**: Sum of all three accounts (6200 + 6399 + 6500)

#### Billing Implementation Details
**Management Agreement Contracts:**
- Use specific account codes when actual PTEB enabled
- Percentage-based calculation for billable payroll
- Active payroll accounts determine calculation base

**Calculation Methods:**
1. **Actual PTEB**: Uses three specific GL accounts
2. **Percentage of Billable Payroll**: Uses active payroll accounts as base
3. **Budget Integration**: All PTEB accounts get budgeted values

### Current Month Revenue Calculation Specifications

#### External Revenue Query
```sql
SELECT [SITE],       
       SUM([NETEXTERNALREVENUE]) AS TOTAL_NET_EXTERNAL_REVENUE
FROM [TP_EDW].[dbo].[REVENUE_DAILY_DETAIL]
WHERE [SITE] = '0170'  
  AND [DATE] BETWEEN       
      DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0) -- First day of current month      
      AND GETDATE() -- Current date
GROUP BY [SITE]
```

#### Internal Revenue Calculation Process

**STEP 1: Retrieve EDW Actual External Revenue**
- Use REVENUE_DAILY_DETAIL table
- Filter by site and current month date range
- Sum NETEXTERNALREVENUE for total

**STEP 2: Retrieve EDW Actual Vehicles and Occupancy Data**
```sql
SELECT    [SITE],
    [DATE],
    [DW_LOADED_DTTM],
    [REVENUE_CATEGORY],
    [VALUE_TYPE],
    SUM([VALUE]) AS TOTAL_VALUE
FROM     [TP_EDW].[dbo].[REVENUE_DATAMART_DAILY]
WHERE    [SITE] = '0170'
    AND [VALUE_TYPE] IN ('Other', 'Vehicles')
    AND [DATE] BETWEEN
        DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0) -- First day of current month
        AND GETDATE() -- Current date
GROUP BY    [SITE], [DATE], [DW_LOADED_DTTM], [REVENUE_CATEGORY], [VALUE_TYPE]
ORDER BY    [DATE], [DW_LOADED_DTTM], [REVENUE_CATEGORY], [VALUE_TYPE];
```

**STEP 3: Use Legion Hours Worked by Job Code Data**
- Leverage existing payroll tab data
- Integrate with EDW/Legion actuals

**STEP 4: Perform Calculations with Actual Data**
- Replace forecasted external revenue with actual external revenue
- Replace forecasted occupancy with actual occupancy  
- Replace forecasted payroll hours with actual payroll hours
- Process on day-per-day basis up to DW_LOADED_DTTM

**STEP 5: Calculate Forecast for Remaining Days**
- Calculate forecast for days (DW_LOADED_DTTM + 1) through end-of-month
- Use existing forecasting logic for future days

**STEP 6: Sum Results**
- Combine actual data (STEP 4) with forecasted data (STEP 5)
- Provide complete current month trending

#### Payroll Calculation Process

**STEP 1: Query Actual Payroll to Current Date**
```sql
SELECT [WORK_LOCATION]
    ,[TITLE]
    ,SUM([TOTAL_DOLLARS]) AS 'ACTUAL_CURRENT_COST'  
FROM [TP_LEGION].[dbo].[vwPAYROLL_SUMMARY]  
WHERE [WORK_LOCATION] = '0170'  
  AND [DATE] BETWEEN     
      DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0) -- First day of current month    
      AND GETDATE() -- Current date
GROUP BY [WORK_LOCATION], [TITLE]
ORDER BY [TITLE]
```

**STEP 2: Query Dataverse for Forecasted Payroll**
- Retrieve forecasted payroll from DW_LOADED_DTTM date through end-of-month
- Use existing Dataverse forecasting tables

**STEP 3: Combine Actual and Forecasted**
- Add results of Step 1 (actual) and Step 2 (forecasted)
- Provide complete current month payroll trending

#### Claims Calculation
```sql
SELECT SUM([BALANCE]) AS ACTUAL_CURRENT_CLAIMS
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
  AND [PERIOD] = FORMAT(GETDATE(), 'yyyyMM') -- Dynamically get current period in YYYYMM format
  AND [IS_SUMMARY_CATEGORY] = 'CLAIMS'
```

#### Parking Rents Calculation
- Compare Account_Summary and Other_Expenses (Parking Rents) forecast
- Display the greater of the two values
- Ensure accurate trending for parking rent expenses

#### Other Expense Calculation
- Same logic as Parking Rents
- Exclude specific account ranges:
  - Parking Rents accounts
  - Claims (4 accounts)
  - Insurance (3 accounts)
- Focus on accounts 7000-7999 excluding specified exceptions

#### PTEB and Insurance Handling
- **PTEB**: No current month calculation - show budgeted until month actualizes
- **Insurance**: No current month calculation - show forecast until actual value appears
- Both actualize only after month end

#### Front Line Contribution (FLC) Calculation
```
FLC = [Trending Internal Revenue] 
    - [Trending Payroll] 
    - [Trending Claims] 
    - [Trending Parking Rents] 
    - [Trending Other Expenses] 
    - [Trending PTEB] 
    - [Trending Insurance]
```

#### FLC Budget Variance (Cumulative)
```
FLC $ to Budget = [Trending FLC $] - [Budgeted FLC $]
```

## Meeting 3: User Story 2655 - Current Month Internal Revenue (2025-08-04)

### Participants
- **Jonathan Aulson** - Development Lead
- **Andrew Scheuer** - Developer

### User Story Context
- **Story ID**: 2655
- **Focus**: Current month internal revenue calculation implementation
- **Duration**: 14 minutes 47 seconds
- **Status**: Active development

### Technical Implementation Discussion

#### Data Source Strategy
**Primary Challenge**: Transition from monthly summary data to daily calculation approach
- **Previous Approach**: Query account summary for monthly totals
- **New Approach**: Calculate using daily actuals combined with forecasted data
- **Complexity**: Requires real-time calculation rather than simple data retrieval

#### Revenue Datamart Daily Table Structure

**Key Table**: `[TP_EDW].[dbo].[REVENUE_DATAMART_DAILY]`

**Table Design:**
- **Single Value Column**: All numeric data stored in one column
- **Value Type Indicator**: Distinguishes between vehicle counts, occupancy, and revenue
- **Revenue Category Alignment**: Maps to existing statistics categories
- **Daily Granularity**: Supports day-by-day calculation requirements

**Value Types:**
- **"Revenue"**: External revenue amounts for calculation input
- **"Vehicles"**: Vehicle count data for occupancy calculations
- **"Other"**: Occupancy numbers for per-occupied-room calculations

#### Data Loading Challenges

**File Submission Issues:**
- Sites may submit empty files with zero values
- Date loaded timestamp doesn't guarantee data presence
- Must validate actual data values, not just file submission

**Data Validation Logic:**
- Find most recent record with value > 0
- Consider entire day as loaded when valid data found
- Cannot rely solely on DW_LOADED_DTTM for data availability

#### Calculation Input Requirements

**For Internal Revenue Calculation:**
1. **Net External Revenue**: Sum all revenue value types for all categories and adjustments
2. **Occupancy Data**: Use "Other" value type for per-occupied-room calculations
3. **Vehicle Counts**: Use "Vehicles" value type for capacity calculations
4. **Payroll Data**: Integrate with Legion payroll system for actual hours

#### Integration Points

**Revenue Datamart Daily Table:**
- Contains revenue, occupancy, and vehicle data
- Single source for multiple calculation inputs
- Daily granularity supports trending requirements

**Legion Payroll Integration:**
- Separate data source for actual payroll costs
- Daily level payroll data available
- Integration required for complete calculation

#### Data Validation Concerns
Jonathan identified potential discrepancy between:
- External revenue from REVENUE_DATAMART_DAILY table
- Net external revenue from REVENUE_DAILY_DETAIL table
- Requires investigation to ensure data consistency

### Development Action Items
1. **Andrew**: Identify missing daily data components in current codebase
2. **Andrew**: Research data availability across required tables
3. **Jonathan**: Investigate revenue data discrepancies between tables
4. **Team**: Validate calculation inputs against existing forecast logic

## Related Documentation

### Technical Specifications
- [Forecasting Data Integration Technical Spec](../technical/forecasting/20250702_Forecasting_DataIntegration_TechnicalSpec.md)
- [EDW Integration Technical Spec](../technical/integrations/20250724_EDW_Integration_TechnicalSpec.md)
- [Forecasting Database Integration Technical Spec](../technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md)

### Business Rules
- [Payroll Data Display Business Rules](../business-rules/forecasting/20250724_PayrollDataDisplay_BusinessRules.md)
- [Forecasting Business Rules - Calculations and Validations](../business-rules/forecasting/20250718_Forecasting_BusinessRules_CalculationsAndValidations.md)

### Data Models
- [Revenue Datamart Daily Data Model](../technical/database/RevenueDatamartDaily_DataModel_TechnicalDocument.md)
- [Legion Payroll Integration Data Model](../technical/database/LegionPayrollIntegration_DataModel_TechnicalDocument.md)

### User Processes
- [Payroll Data Analysis User Process](../user-processes/account-manager/20250724_PayrollDataAnalysis_UserProcess.md)
- [Forecasting User Processes - Account Manager Workflows](../user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md)

## Action Items Summary

### Immediate Actions
1. **Architecture Team**: Finalize 12-month forecasting ETL design
2. **Development Team**: Complete User Story 2655 implementation
3. **Data Team**: Resolve revenue data discrepancies between EDW tables
4. **QA Team**: Develop load testing strategy for production release

### Medium-term Actions
1. **Infrastructure**: Evaluate Azure Data Factory alternatives if needed
2. **Development**: Implement Power Automate calculation flows
3. **Testing**: Prepare for production testing with 2025 budget data
4. **Documentation**: Update technical specifications based on implementation

### Long-term Actions
1. **Architecture**: Scale solution for increased data volumes
2. **Performance**: Optimize calculation performance for real-time trending
3. **Integration**: Enhance EDW-Legion-Dataverse data synchronization
4. **Monitoring**: Implement comprehensive data quality monitoring

## Code Validation Status

**Validation Required**: This document contains specific technical implementations and calculation logic that should be validated against:
- Power Platform solution code in `Towne-Park-Billing-PA-Solution/`
- EDW integration code in `Towne-Park-Billing-Source-Code/`
- Legion integration components

**Next Steps**: Perform comprehensive code validation to ensure documentation accuracy against actual implementation.