---
title: "Towne Park Forecasting - Business Rules and Calculations"
description: "Comprehensive business rules, calculation formulas, and validation logic for the Forecasting system including parking rates, budget calculations, and data validation rules"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-05-23
version: 1.0
status: Draft
owner: "Business Analyst"
source_documents:
  - "20250523_UAT_User_Stories_Feedback2.md"
systems:
  - Forecasting
components:
  - Backend
  - Database
  - Integration
business_domains:
  - Parking Rate Management
  - Budget Calculations
  - Revenue Calculations
  - Data Validation
  - Financial Analysis
  - P&L Calculations
user_roles:
  - Account Manager
  - District Manager
  - Admin
  - Product Owner
tags:
  - forecasting
  - business-rules
  - calculations
  - validation
  - parking-rates
  - budget
  - revenue
---

# Towne Park Forecasting - Business Rules and Calculations

## Overview

This document defines the comprehensive business rules, calculation formulas, and validation logic for the Towne Park Forecasting system. It covers parking rate calculations, budget derivations, revenue formulas, and data validation requirements.

## Parking Rate Calculation Rules

### Rule Definitions

#### **Rule Name**: Budgeted Parking Rate Calculation
- **Description**: Calculate budgeted parking rates from revenue and vehicle count data
- **Applies To**: All parking statistics with revenue and vehicle count components
- **Calculation Formula**: 
  ```
  Budgeted Rate = Total Budgeted Revenue for Main Account / Budgeted Vehicle Count for Main Account
  ```
- **Examples**: 
  - Valet Daily Rate = $28,054.08 / 573.00 = $48.96 per vehicle
  - Self Daily Rate = [Self Daily Revenue] / [Self Daily Count]
- **Source**: Budget data initialization requirements
- **Implementation**: Applied during forecast initialization from EDW budget data
- **Edge Cases**: 
  - If vehicle count is zero, display rate as $0.00
  - If revenue data missing, initialize with $0.00
  - Handle NULL values by treating as zero

#### **Rule Name**: Parking Rate Forecast Initialization
- **Description**: Initialize parking rate forecasts with budget-derived rates on first access
- **Applies To**: All parking rate categories when forecast doesn't exist
- **Calculation Formula**: Uses Budgeted Parking Rate Calculation
- **Examples**: First-time access to Parking Rates tab loads budget-derived rates
- **Source**: User story 1676 - Parking rate initialization
- **Implementation**: System checks for existing forecast data; if none exists, calculates from budget
- **Edge Cases**: 
  - Subsequent visits load saved forecast data, not budget data
  - Missing budget data results in zero initialization

### Parking Statistics to Main Account Mapping

#### **Rule Name**: Main Account Code Mapping
- **Description**: Map parking statistics to corresponding revenue and vehicle count main account codes
- **Applies To**: All parking rate calculations and budget queries
- **Calculation Formula**: Direct mapping table lookup
- **Examples**:

| Parking Stat | Revenue Main Account | Vehicle Main Account | Type |
|--------------|---------------------|---------------------|------|
| Valet Daily | 9411 | 9510 | Revenue/Vehicles |
| Valet Overnight | 9412 | 9520 | Revenue/Vehicles |
| Valet Monthly | 9413 | 9530 | Revenue/Vehicles |
| Self Daily | 9414 | 9550 | Revenue/Vehicles |
| Self Overnight | 9415 | 9560 | Revenue/Vehicles |
| Self Monthly | 9416 | 9570 | Revenue/Vehicles |

**Non-Rate Statistics** (not used in rate calculations):
- External Revenue: 9410 (Revenue only)
- Valet Comps: 9540 (Vehicles only)
- Self Comps: 9580 (Vehicles only)
- Occupied Rooms: 9440 (Other)

- **Source**: Database schema and business requirements
- **Implementation**: Hard-coded mapping table in system configuration
- **Edge Cases**: Unknown main account codes should log error and use default handling

## Budget Data Integration Rules

### Rule Definitions

#### **Rule Name**: Budget Data Retrieval
- **Description**: Retrieve budget data from EDW BUDGET_FINAL table for forecast initialization
- **Applies To**: All forecasting modules requiring budget baseline
- **Calculation Formula**: 
  ```sql
  SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
  FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
  JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
  WHERE [COST_CENTER] = '{site_cost_center}'
  AND [PERIOD] = '{YYYYMM_period}'
  AND [IS_SUMMARY_CATEGORY] = '{category_name}'
  ```
- **Examples**: 
  - External Revenue for site 0170, March 2025: $1,250,357.92
  - Payroll for site 0170, March 2025: $82,246.00
- **Source**: EDW integration requirements
- **Implementation**: Automated query execution during forecast initialization
- **Edge Cases**: 
  - Missing budget data returns zero values
  - Invalid cost center or period returns empty result set
  - NULL balances treated as zero in SUM calculation

#### **Rule Name**: Budget Data Refresh Frequency
- **Description**: Define refresh schedule for budget data from EDW
- **Applies To**: All budget-dependent calculations
- **Calculation Formula**: Time-based refresh every 24 hours
- **Examples**: Daily overnight refresh at 2:00 AM
- **Source**: Data integration requirements
- **Implementation**: Scheduled job in data pipeline
- **Edge Cases**: 
  - Failed refresh maintains previous day's data
  - First-time setup requires manual initialization

## Actual Data Integration Rules

### Rule Definitions

#### **Rule Name**: Actual Data Retrieval
- **Description**: Retrieve actual performance data from EDW ACCOUNT_SUMMARY table
- **Applies To**: Historical periods with closed financial data
- **Calculation Formula**: 
  ```sql
  SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
  FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
  JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
  WHERE [COST_CENTER] = '{site_cost_center}'
  AND [PERIOD] = '{YYYYMM_period}'
  AND [IS_SUMMARY_CATEGORY] = '{category_name}'
  ```
- **Examples**: 
  - External Revenue actual for site 0170, March 2025: $1,258,925.10
  - Payroll actual for site 0170, March 2025: $82,330.62
- **Source**: EDW integration requirements
- **Implementation**: Real-time query during data display
- **Edge Cases**: 
  - NULL actual values display as zero
  - Incomplete periods show partial actual data
  - Future periods have no actual data

#### **Rule Name**: Internal Revenue Calculation
- **Description**: Calculate internal revenue with sign reversal for proper P&L presentation
- **Applies To**: Internal revenue categories in P&L calculations
- **Calculation Formula**: 
  ```
  Internal Revenue = Actual_Category_Monthly_Total * (-1)
  ```
- **Examples**: 
  - Raw value: -$308,022.41
  - Displayed value: $308,022.41
- **Source**: P&L presentation requirements
- **Implementation**: Applied during data retrieval and display
- **Edge Cases**: Handle NULL values as zero before sign reversal

## P&L Calculation Rules

### Rule Definitions

#### **Rule Name**: First Line Contribution (FLC) Calculation
- **Description**: Calculate FLC as internal revenue minus all expense categories
- **Applies To**: P&L summary calculations
- **Calculation Formula**: 
  ```
  FLC = Internal Revenue - (Payroll + Claims + Other Expense + PTEB + Insurance + Parking Rents)
  ```
- **Examples**: 
  - Internal Revenue: $308,022.41
  - Total Expenses: $130,000 (example)
  - FLC: $178,022.41
- **Source**: Financial reporting requirements
- **Implementation**: Calculated field in P&L display
- **Edge Cases**: 
  - NULL expense categories treated as zero
  - Negative FLC indicates loss

#### **Rule Name**: Variance Calculation
- **Description**: Calculate variance between forecast/actual and budget values
- **Applies To**: All P&L variance analysis
- **Calculation Formula**: 
  ```
  Dollar Variance = Forecast_Value - Budget_Value
  Percentage Variance = (Dollar_Variance / Budget_Value) * 100
  ```
- **Examples**: 
  - Budget: $100,000, Forecast: $110,000
  - Dollar Variance: $10,000
  - Percentage Variance: 10%
- **Source**: Variance analysis requirements
- **Implementation**: Real-time calculation during P&L display
- **Edge Cases**: 
  - Division by zero when budget is zero shows "N/A"
  - NULL values treated as zero in calculations

#### **Rule Name**: Variance Significance Classification
- **Description**: Classify variances by significance level for visual emphasis
- **Applies To**: P&L variance display formatting
- **Calculation Formula**: 
  ```
  High Variance: |Percentage_Variance| >= 7.5%
  Medium Variance: 5% <= |Percentage_Variance| < 7.5%
  Low Variance: |Percentage_Variance| < 5%
  ```
- **Examples**: 
  - 10% variance: High (bold formatting)
  - 6% variance: Medium (normal formatting)
  - 3% variance: Low (normal formatting)
- **Source**: User story 1488 variance analysis requirements
- **Implementation**: Conditional formatting in UI
- **Edge Cases**: 
  - Exactly 7.5% classified as high variance
  - Zero variance shows no special formatting

## Data Validation Rules

### Rule Definitions

#### **Rule Name**: Input Field Validation
- **Description**: Validate user input for reasonable ranges and data types
- **Applies To**: All user-editable forecast fields
- **Calculation Formula**: Range and type checking
- **Examples**: 
  - Parking rates: $0.00 to $999.99
  - Vehicle counts: 0 to 99,999
  - Percentages: 0% to 100%
- **Source**: Data quality requirements
- **Implementation**: Client-side and server-side validation
- **Edge Cases**: 
  - Negative values rejected with error message
  - Non-numeric input rejected
  - Extremely high values flagged for review

#### **Rule Name**: Period Access Control
- **Description**: Control edit access based on period status (past/current/future)
- **Applies To**: All time-based forecast data
- **Calculation Formula**: 
  ```
  if (Period_Date < Current_Date) then Read_Only = true
  else Read_Only = false
  ```
- **Examples**: 
  - March 2025 data: Read-only (past)
  - July 2025 data: Editable (future)
- **Source**: Data integrity requirements
- **Implementation**: UI state management
- **Edge Cases**: 
  - Current month may be partially editable
  - System date changes affect access control

#### **Rule Name**: Data Persistence Validation
- **Description**: Ensure user edits persist across sessions and view changes
- **Applies To**: All forecast modifications
- **Calculation Formula**: State management and database persistence
- **Examples**: 
  - Modified values highlighted in blue
  - Changes maintained across budget/forecast toggle
  - Edits preserved when switching time periods
- **Source**: User experience requirements
- **Implementation**: Session state and database storage
- **Edge Cases**: 
  - Session timeout may lose unsaved changes
  - Concurrent user edits require conflict resolution

## Role-Based Access Rules

### Rule Definitions

#### **Rule Name**: WorkDay Role Mapping
- **Description**: Map WorkDay job profiles to system roles and site access
- **Applies To**: User authentication and site visibility
- **Calculation Formula**: Direct mapping table lookup
- **Examples**:

| WorkDay Job Profile | System Role | Site Access Column |
|-------------------|-------------|-------------------|
| DISTMGR | District Manager | SITE |
| AREAMGR | District Manager | SITE |
| SRDISTMGR | District Manager | SITE |
| DOO | Account Manager | COST_CENTER |
| ACCTMGR | Account Manager | COST_CENTER |
| ASSOCM | Account Manager | COST_CENTER |
| SRACCTMGR | Account Manager | COST_CENTER |
| ASOPSMGR | Account Manager | COST_CENTER |
| TRANSMGR | Account Manager | COST_CENTER |

- **Source**: User story 1194 role assignment requirements
- **Implementation**: Authentication service integration
- **Edge Cases**: 
  - Unknown job profiles denied access
  - Missing WorkDay data shows error message
  - Role changes require re-authentication

#### **Rule Name**: Site Visibility Control
- **Description**: Control which sites users can access based on role and WorkDay data
- **Applies To**: Site selection dropdowns and data access
- **Calculation Formula**: 
  ```sql
  -- For Account Managers
  SELECT DISTINCT SITE 
  FROM WORKDAY_RLS_BISECURITY 
  WHERE COST_CENTER IN (user_cost_centers)
  
  -- For District Managers  
  SELECT DISTINCT SITE 
  FROM WORKDAY_RLS_BISECURITY 
  WHERE SITE IN (user_sites)
  ```
- **Examples**: 
  - Account Manager sees sites 0170, 0180, 0190
  - District Manager sees sites 0170-0200
- **Source**: Security and access control requirements
- **Implementation**: Database query filtering
- **Edge Cases**: 
  - No site access results in empty dropdown
  - Invalid user data denies all access

## Time Granularity Rules

### Rule Definitions

#### **Rule Name**: Time Period Aggregation
- **Description**: Define how data aggregates across different time granularities
- **Applies To**: Parking metrics display at daily, weekly, monthly, quarterly levels
- **Calculation Formula**: 
  ```
  Daily: Raw daily values
  Weekly: Average for percentage metrics, Sum for count metrics
  Monthly: Average for percentage metrics, Sum for count metrics  
  Quarterly: Average for percentage metrics, Sum for count metrics
  ```
- **Examples**: 
  - Daily occupancy: 85%, 90%, 88%
  - Weekly occupancy average: 87.7%
  - Monthly vehicle count sum: 15,000 vehicles
- **Source**: User story 1595 time granularity requirements
- **Implementation**: Data aggregation service
- **Edge Cases**: 
  - Partial periods show available data only
  - Missing days excluded from averages

#### **Rule Name**: Edit Granularity Restriction
- **Description**: Restrict editing to daily granularity only
- **Applies To**: All forecast data entry
- **Calculation Formula**: 
  ```
  if (Time_Granularity == "Daily") then Editable = true
  else Editable = false
  ```
- **Examples**: 
  - Daily view: All fields editable
  - Weekly/Monthly/Quarterly view: Read-only display
- **Source**: Data integrity requirements
- **Implementation**: UI state management
- **Edge Cases**: 
  - System must prevent accidental edits at wrong granularity
  - Clear messaging about edit restrictions

## Filter and Search Rules

### Rule Definitions

#### **Rule Name**: P&L Filter Logic
- **Description**: Define how organizational and customer filters affect P&L data display
- **Applies To**: P&L view filtering functionality
- **Calculation Formula**: 
  ```
  Organizational Filters: Expand results (OR logic)
  Customer Filters: Narrow results (AND logic)
  Combined: (Org1 OR Org2) AND (Cust1 AND Cust2)
  ```
- **Examples**: 
  - Region "East" OR "West" AND Contract Type "Fixed Fee"
  - Shows all East and West region sites with Fixed Fee contracts
- **Source**: User story 1596 filter requirements
- **Implementation**: Dynamic SQL query building
- **Edge Cases**: 
  - No filters shows all accessible data
  - Conflicting filters may return empty results

#### **Rule Name**: Filter Security Enforcement
- **Description**: Ensure filters respect user access permissions
- **Applies To**: All organizational filters
- **Calculation Formula**: 
  ```
  Filtered_Sites = User_Accessible_Sites ∩ Filter_Selected_Sites
  ```
- **Examples**: 
  - User has access to sites 100-200
  - Filter selects sites 150-250
  - Result shows sites 150-200 only
- **Source**: Security requirements
- **Implementation**: Server-side filter validation
- **Edge Cases**: 
  - Filters outside user access show no data
  - Clear messaging about access restrictions

## Data Quality and Error Handling Rules

### Rule Definitions

#### **Rule Name**: Missing Data Handling
- **Description**: Define how system handles missing or NULL data values
- **Applies To**: All data display and calculations
- **Calculation Formula**: 
  ```
  NULL Budget Values → Display as $0.00
  NULL Actual Values → Display as blank or "N/A"
  Missing Calculations → Show "Unable to calculate"
  ```
- **Examples**: 
  - Missing budget data shows $0.00 placeholder
  - Missing actual data shows blank field
  - Division by zero shows "N/A"
- **Source**: Data quality requirements
- **Implementation**: Data layer error handling
- **Edge Cases**: 
  - Distinguish between zero and missing data
  - Provide clear indicators for data quality issues

#### **Rule Name**: Data Refresh Error Handling
- **Description**: Handle errors during data refresh operations
- **Applies To**: EDW data integration processes
- **Calculation Formula**: 
  ```
  if (Refresh_Failed) then Use_Previous_Data + Show_Warning
  if (Partial_Refresh) then Use_Available_Data + Show_Status
  ```
- **Examples**: 
  - EDW connection failure: Use cached data with warning
  - Partial data load: Show what's available with status indicator
- **Source**: System reliability requirements
- **Implementation**: Error handling middleware
- **Edge Cases**: 
  - Extended outages require manual intervention
  - Data staleness warnings after 48 hours

## Integration Points

### Related Documentation

- [Account Manager User Processes](../user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md) 🔄 PLANNED
- [Forecasting Technical Specifications](../technical/forecasting/) 🔗 EXTERNAL
- [Database Integration Specifications](../technical/database/) 🔗 EXTERNAL
- [System Configuration Guidelines](../configuration/system-settings/) 🔗 EXTERNAL

## Validation Requirements

### Business Rule Validation Checklist
- [ ] All calculation formulas tested with sample data
- [ ] Edge cases identified and handled appropriately
- [ ] Data validation rules prevent invalid input
- [ ] Role-based access controls properly implemented
- [ ] Integration points validated against source systems
- [ ] Error handling provides clear user guidance

### Code Validation Requirements
**VERIFICATION NEEDED**: All business rules in this document should be validated against the actual Power Platform implementation in the `Towne-Park-Billing-PA-Solution/` directory to ensure accuracy and completeness.

---

**Note**: This document captures business rules based on UAT feedback from May 2025. All rules should be validated against current system implementation and updated as needed for production deployment.