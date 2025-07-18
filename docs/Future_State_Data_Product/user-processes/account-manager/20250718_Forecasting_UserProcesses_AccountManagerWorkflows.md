---
title: "Towne Park Forecasting - Account Manager User Processes"
description: "Comprehensive user processes and workflows for Account Managers using the Forecasting system, including site statistics, parking rates, payroll, and P&L analysis"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-05-23
version: 1.0
status: Draft
owner: "Account Manager"
source_documents:
  - "20250523_UAT_User_Stories_Feedback2.md"
systems:
  - Forecasting
components:
  - Frontend
  - Database
  - Integration
business_domains:
  - Site Statistics Management
  - Parking Rate Management
  - Payroll Forecasting
  - Other Revenue Management
  - P&L Analysis
  - Customer Site Management
user_roles:
  - Account Manager
  - District Manager
tags:
  - forecasting
  - user-processes
  - account-manager
  - site-statistics
  - parking-rates
  - payroll
  - p-and-l
---

# Towne Park Forecasting - Account Manager User Processes

## Overview

This document provides comprehensive user processes and workflows for Account Managers using the Towne Park Forecasting system. It covers all major forecasting activities including site statistics management, parking rate forecasting, payroll planning, other revenue tracking, and P&L analysis.

## Prerequisites

- Account Manager role assigned in the system
- Access to customer sites based on WorkDay role mapping
- Understanding of parking industry metrics and financial concepts
- Familiarity with budget vs. forecast concepts

## Core User Processes

### 1. Site Statistics Forecasting Process

#### Process Overview
Account Managers use the Site Statistics interface to input and manage parking metrics forecasts for their assigned customer sites.

#### Prerequisites
- Customer site access permissions
- Understanding of parking statistics and occupancy metrics
- Knowledge of budget data sources

#### Process Steps

**Step 1: Access the Forecasting Page**
- **Action**: Navigate to the "Forecasts" section from the main navigation menu
- **System Response**: System displays the forecasting dashboard
- **Validation**: Verify access to assigned customer sites

**Step 2: Select a Customer Site**
- **Action**: Select a specific customer site from the dropdown menu
- **System Response**: System loads the site configuration and budget data
- **Decision Points**: Choose from sites assigned based on WorkDay role mapping
- **Validation**: Confirm site data loads correctly

**Step 3: Select a Time Period**
- **Action**: Select a month/year period from the dropdown
- **System Response**: 
  - System loads all days for that month
  - Pre-populates with budget data
  - Determines if period is past (read-only) or future/current (editable)
- **Validation**: Verify correct period selection and data availability

**Step 4: Choose Input Type**
- **Action**: Select either "Percentage" or "Occupied Rooms" as the input method
- **System Response**: System adjusts form fields and calculations accordingly
- **Decision Points**: 
  - Choose "Percentage" for occupancy rate input
  - Choose "Occupied Rooms" for direct room count input
- **Validation**: Confirm appropriate input method for forecasting needs

**Step 5: Review Budget Data**
- **Action**: Review pre-populated budget data for all statistics
- **System Response**: Display budget values as baseline
- **Tips**: Click "Show Budget" at any time to view original budget numbers
- **Validation**: Verify budget data accuracy against known values

**Step 6: Enter Forecast Data**
- **Action**: Enter forecast values for each statistic
- **System Response**: 
  - Values highlighted in blue when different from budget
  - Read-only calculated fields update automatically (Self Overnight, Valet Overnight, Occupancy/Rooms, Revenue)
- **Decision Points**: Determine appropriate forecast values based on:
  - Historical performance
  - Market conditions
  - Seasonal trends
  - Business intelligence
- **Error Handling**: System validates input ranges and data types
- **Tips**: Use actual data (displayed in orange) to inform forecasting decisions

**Step 7: Toggle Between Budget and Forecast Views**
- **Action**: Click "Show Budget" to temporarily view budget numbers
- **System Response**: 
  - Button changes to "Show Forecast" when in budget view
  - All fields become read-only in budget view
- **Action**: Click "Show Forecast" to return to entered forecast data
- **System Response**: 
  - Return to editable forecast mode
  - Restore highlighting for modified fields
- **Validation**: Ensure data persistence across view toggles

**Step 8: Save Forecast Data**
- **Action**: Click "Save Statistics" to submit the forecast data
- **System Response**: System confirms data has been saved
- **Validation**: Verify save confirmation and data persistence

#### Alternative Flows

**Past Period Handling**
- **Condition**: Selected period is in the past
- **System Behavior**: 
  - All input fields become read-only
  - Warning message indicates past periods are read-only
  - "Save Statistics" button is disabled
- **User Action**: Review historical data only

**Data Persistence Across Sessions**
- **Condition**: User navigates away and returns
- **System Behavior**: Modified values remain highlighted in blue
- **User Action**: Continue editing from previous state

#### Related Processes
- [Parking Rate Forecasting](#2-parking-rate-forecasting-process)
- [P&L Analysis Process](#5-pl-analysis-process)
- [Actual vs. Forecast Analysis](#actual-vs-forecast-analysis)

### 2. Parking Rate Forecasting Process

#### Process Overview
Account Managers manage parking rates across multiple years to analyze historical data, manage current rates, and plan future pricing strategies.

#### Prerequisites
- Understanding of parking rate structures
- Knowledge of budgeted vs. forecasted rates
- Access to rate calculation formulas

#### Process Steps

**Step 1: Navigate to Rates Page**
- **Action**: Access the Rates page from navigation
- **System Response**: Display Parking Rates section with current year (2025) selected by default
- **Validation**: Confirm correct year and rate data display

**Step 2: Select Year for Analysis**
- **Action**: Select different year from the year dropdown
- **System Response**: Display parking rates for selected year with actualized values in orange where available
- **Decision Points**: Choose year based on analysis needs:
  - Historical analysis: Previous years
  - Current management: Current year
  - Future planning: Future years
- **Validation**: Verify rate data accuracy for selected year

**Step 3: Review Rate Structure**
- **Action**: View monthly rates for all parking types in table format
- **System Response**: Display comprehensive rate matrix
- **Validation**: Confirm all parking types and months are visible

**Step 4: Edit Rate Values**
- **Action**: Click on editable field and enter new value for non-actualized months
- **System Response**: 
  - Field highlighted in blue
  - Value saved in system memory
- **Decision Points**: Determine rate changes based on:
  - Market analysis
  - Competitive positioning
  - Revenue targets
  - Customer feedback
- **Error Handling**: System validates rate ranges and business rules
- **Tips**: Use actualized data to inform future rate decisions

**Step 5: Toggle Between Rate Views**
- **Action**: Click "Show Budgeted Rates"
- **System Response**: 
  - All fields display budgeted values as placeholders
  - Edited values temporarily hidden
  - All fields become read-only
- **Action**: Click "Show Forecasted Rates"
- **System Response**: 
  - Previously edited values reappear
  - Edited fields highlighted in blue
  - Editable fields become interactive again
- **Validation**: Ensure data persistence across view changes

**Step 6: Save Rate Changes**
- **Action**: Click "Save Changes" button
- **System Response**: System saves updated rate forecast
- **Validation**: Confirm save operation and data persistence

#### Alternative Flows

**Actualized Data Handling**
- **Condition**: Viewing months with actualized data
- **System Behavior**: 
  - Actualized values displayed in orange below input fields
  - Fields become read-only for actualized periods
- **User Action**: Use actualized data for analysis only

**Data Persistence Across Years**
- **Condition**: Switch between years and return
- **System Behavior**: Previously edited values maintained with blue highlighting
- **User Action**: Continue editing from previous state

#### Related Processes
- [Site Statistics Forecasting](#1-site-statistics-forecasting-process)
- [Revenue Forecasting](#4-other-revenue-forecasting-process)

### 3. Payroll Forecasting Process

#### Process Overview
Account Managers input payroll forecast data to project payroll expenses for managed sites using a dual timeline interface.

#### Prerequisites
- Understanding of labor roles and costs
- Knowledge of site staffing requirements
- Access to historical payroll data

#### Process Steps

**Step 1: Access Payroll Forecasting**
- **Action**: Navigate to Forecast Editor page and click "Payroll" tab
- **System Response**: Display Payroll Forecast interface with:
  - Labor Hours & Cost Timeline (top section)
  - Variance Reconciliation Dashboard (bottom section)
- **Validation**: Confirm interface loads with correct site data

**Step 2: Select Site and Time Horizon**
- **Action**: Select site from dropdown and choose time horizon (day, week, month)
- **System Response**: Update timeline to show data at selected granularity
- **Decision Points**: Choose appropriate time horizon for analysis:
  - Daily: Detailed operational planning
  - Weekly: Short-term scheduling
  - Monthly: Budget planning
  - Quarterly: Strategic planning
- **Validation**: Verify data aggregation matches selected horizon

**Step 3: Review Historical Data**
- **Action**: Examine scheduled/actual data in left timeline
- **System Response**: Display historical labor hours and costs with visual distinction
- **Tips**: Use historical patterns to inform forecast decisions
- **Validation**: Confirm historical data accuracy

**Step 4: Expand Period Details**
- **Action**: Click on specific period in timeline
- **System Response**: Expand to show breakdown by job role:
  - Valet attendant
  - Bell staff
  - Cashier
  - Other roles
- **Validation**: Verify role-specific data accuracy

**Step 5: Edit Forecast Data**
- **Action**: Click on green forecast bar for future period
- **System Response**: 
  - Display edit dialog or inline editing capability
  - Allow modification of forecast hours and/or rates for each job role
  - Provide validation for reasonable values
  - Show immediate visual feedback in timeline
- **Decision Points**: Determine forecast values based on:
  - Historical performance
  - Seasonal variations
  - Business growth projections
  - Operational changes
- **Error Handling**: System validates input ranges and business logic
- **Tips**: Consider both hours and rates when forecasting costs

**Step 6: Review Variance Analysis**
- **Action**: Examine Variance Reconciliation Dashboard
- **System Response**: Display variance analysis between actual and forecast
- **Validation**: Use variance data to refine future forecasts

**Step 7: Save Payroll Forecast**
- **Action**: Save forecast changes
- **System Response**: Confirm data persistence
- **Validation**: Verify forecast data saved correctly

#### Alternative Flows

**Historical Data Analysis**
- **Condition**: Viewing past periods with actual data
- **System Behavior**: 
  - Actual labor hours and costs displayed
  - Visual distinction between actual and forecast
  - Variance analysis available
- **User Action**: Use for forecast refinement

#### Related Processes
- [Site Statistics Forecasting](#1-site-statistics-forecasting-process)
- [P&L Analysis Process](#5-pl-analysis-process)

### 4. Other Revenue Forecasting Process

#### Process Overview
Account Managers input other internal revenue forecast amounts to inform overall site forecasts, including billable expenses, revenue validations, credits, GPO fees, and signing bonuses.

#### Prerequisites
- Understanding of other revenue categories
- Knowledge of monthly input requirements
- Access to budget comparison data

#### Process Steps

**Step 1: Access Other Revenue Tab**
- **Action**: Navigate to Forecasts Editor page and select "Other Revenue" tab
- **System Response**: Display other revenue interface with monthly input restriction notice
- **Validation**: Confirm access to revenue categories

**Step 2: Review Revenue Categories**
- **Action**: Examine revenue categories table:
  - Billable Expenses
  - Revenue Validations
  - Credits
  - GPO Fees
  - Signing Bonuses
- **System Response**: Display table with months as rows and categories as columns
- **Validation**: Verify all categories are accessible

**Step 3: Identify Actual Data Periods**
- **Action**: Review months with "Actual" indicators
- **System Response**: Display actual data indicators for past months with orange borders for variance
- **Tips**: Use actual data to inform future forecasts
- **Validation**: Confirm actual data accuracy

**Step 4: Input Revenue Forecasts**
- **Action**: Click on cell and enter new forecast value
- **System Response**: 
  - Cell highlighted with green background
  - Value saved as forecast
- **Decision Points**: Determine forecast values based on:
  - Historical performance
  - Contract terms
  - Business projections
  - Market conditions
- **Error Handling**: System validates input ranges
- **Tips**: Hover over edited cells to see variance from budget

**Step 5: Compare with Benchmarks**
- **Action**: Click "Show Comparison" button
- **System Response**: 
  - Display comparison data (Budget, Prior Year, or FP&A Projection)
  - Button changes to "Show Forecast"
- **Action**: Click "Show Forecast" to return to forecast view
- **System Response**: Return to forecast data display
- **Validation**: Use comparison data to validate forecast assumptions

**Step 6: Review Actual vs. Forecast**
- **Action**: Hover over cells with orange borders (actual data variance)
- **System Response**: Display tooltip with:
  - Actual value
  - Variance from forecast (percentage and dollar amount)
- **Tips**: Use variance analysis to improve future forecasting accuracy

**Step 7: Save Revenue Forecast**
- **Action**: Save forecast data
- **System Response**: Confirm data persistence
- **Validation**: Verify all changes saved correctly

#### Alternative Flows

**Monthly Input Restriction**
- **Condition**: Attempt to input at different granularity
- **System Behavior**: Maintain monthly view with restriction notice
- **User Action**: Contact Towne Park Finance department for questions

#### Related Processes
- [Site Statistics Forecasting](#1-site-statistics-forecasting-process)
- [P&L Analysis Process](#5-pl-analysis-process)

### 5. P&L Analysis Process

#### Process Overview
Account Managers view and analyze financial forecast trends using P&L view to make informed financial decisions and track performance against forecast, budget, actuals, and historical data.

#### Prerequisites
- Understanding of P&L structure and financial metrics
- Knowledge of variance analysis
- Access to filtering capabilities

#### Process Steps

**Step 1: Access P&L View**
- **Action**: Navigate to P&L View page
- **System Response**: Display P&L data in Forecast mode with Trend view by default for current year
- **Validation**: Confirm P&L data loads with actual data highlighted for past months

**Step 2: Select Analysis Period**
- **Action**: Select different year from Year dropdown
- **System Response**: Update table to show data for selected year
- **Decision Points**: Choose year based on analysis needs
- **Validation**: Verify data accuracy for selected period

**Step 3: Switch Between Data Views**
- **Action**: Click "Show Budget" button
- **System Response**: 
  - Switch from Forecast to Budget mode
  - Update all non-actual data points
  - Button text changes to "Show Forecast"
- **Action**: Click "Show Forecast" to return
- **System Response**: Return to forecast view
- **Validation**: Ensure consistent data presentation

**Step 4: Analyze Variances**
- **Action**: Click "Show Variance" button
- **System Response**: Transform display to show variance between Forecast and Budget:
  - Positive variances: black with upward arrows (▲)
  - Negative variances: red with downward arrows (▼)
  - Variance percentages displayed beneath dollar amounts
  - Color intensity indicates significance
- **Tips**: Focus on high variance items (7.5%+) for detailed analysis
- **Validation**: Verify variance calculations

**Step 5: Apply Filters**
- **Action**: Click "Filters" button
- **System Response**: Display filter modal with organizational and customer filter options
- **Action**: Select desired filters:
  - **Organizational Filters**: Legal Entity, Region, District, Site, AM/DM
  - **Customer Filters**: P&L Category, COG Segment, Contract Type, Business Segment
- **Action**: Click "Apply Filters"
- **System Response**: 
  - Update P&L view to show filtered data
  - Update filter count badge
  - Display filtered site numbers
- **Decision Points**: Choose filters based on analysis scope
- **Validation**: Verify filtered results match expectations

**Step 6: Review Trend Analysis**
- **Action**: Click "Show Trend" button (if in variance view)
- **System Response**: Revert to showing trend data instead of variances
- **Tips**: Use trend analysis for long-term planning
- **Validation**: Confirm trend data accuracy

**Step 7: Export or Document Findings**
- **Action**: Document analysis results for decision-making
- **Tips**: Focus on actionable insights and variance explanations

#### Alternative Flows

**Filter Management**
- **Condition**: Need to modify or clear filters
- **Actions Available**:
  - Remove individual filters: Click "X" on filter badge
  - Clear all filters: Click "Clear Filters" button
- **System Behavior**: Update P&L view accordingly

**Variance Significance Levels**
- **High Variances (7.5%+)**: Displayed in bold for immediate attention
- **Medium/Low Variances (0-7.5%)**: Normal emphasis
- **System Behavior**: Configurable thresholds for future refinement

#### Related Processes
- [Site Statistics Forecasting](#1-site-statistics-forecasting-process)
- [Payroll Forecasting Process](#3-payroll-forecasting-process)
- [Other Revenue Forecasting](#4-other-revenue-forecasting-process)

## Advanced Features

### Actual vs. Forecast Analysis

#### Purpose
Compare actual performance statistics with budget and forecast figures to make data-driven decisions and improve forecast accuracy.

#### Process Steps

**Step 1: Access Actual Data**
- **Action**: Navigate to Site Statistics page and select site/period
- **System Response**: Query enterprise data warehouse for actual statistics
- **Validation**: Confirm data source connectivity

**Step 2: Review Actual Values**
- **Action**: Examine actual values displayed in orange text below input fields
- **System Response**: Display actual values where available from data source
- **Tips**: Use actual data to identify trends and patterns
- **Validation**: Verify actual data accuracy

**Step 3: Compare Performance**
- **Action**: Analyze variance between actual, budget, and forecast values
- **Decision Points**: Identify:
  - Performance gaps
  - Forecasting accuracy
  - Trend changes
  - Seasonal patterns
- **Tips**: Use insights to improve future forecasts

**Step 4: Adjust Future Forecasts**
- **Action**: Modify future forecasts based on actual performance trends
- **System Response**: Update forecast values with improved accuracy
- **Validation**: Document rationale for forecast adjustments

### Help and Guidance Features

#### Site Statistics Help Guide
- **Access**: Click "Show Guide" button on Site Statistics page
- **Content**: Comprehensive explanations of:
  - Site selection functionality
  - Period selection process
  - Occupancy input types
  - Budget/forecast toggle
  - Modified values indication
  - Actual values display
  - Calculated fields behavior
  - Data saving process
- **Management**: Click "Hide Guide" to collapse when not needed

#### Parking Rates Help Guide
- **Access**: Click "Show Guide" button on Rates page
- **Content**: Information about:
  - Year selection functionality
  - Parking rates table usage
  - Budgeted vs forecasted rates toggle
  - Color coding for actualized and edited values
- **Features**: Color-coded text (blue/orange) for better understanding

## Data Integration and Sources

### Enterprise Data Warehouse Integration
- **Budget Data Source**: BUDGET_FINAL table for initialization
- **Actual Data Source**: ACCOUNT_SUMMARY table for historical data
- **Refresh Frequency**: Hourly updates for actual data
- **Data Validation**: Automatic validation against source systems

### WorkDay Integration
- **Role Assignment**: Automatic role mapping based on job profiles
- **Site Access**: Determined by WORKDAY_RLS_BISECURITY table
- **Security Model**: 
  - Account Managers: Access via COST_CENTER column
  - District Managers: Access via SITE column

### Data Quality Considerations
- **Missing Data Handling**: Display zeros for missing budget values
- **NULL Value Management**: Appropriate representation in calculations
- **Data Persistence**: Maintain user edits across sessions
- **Validation Rules**: Ensure data integrity and business rule compliance

## Error Handling and Troubleshooting

### Common Issues and Resolutions

**Site Access Issues**
- **Problem**: Cannot see expected sites
- **Resolution**: Verify WorkDay role mapping and WORKDAY_RLS_BISECURITY table data
- **Escalation**: Contact system administrator

**Data Loading Issues**
- **Problem**: Budget or actual data not displaying
- **Resolution**: Check EDW connectivity and data availability
- **Escalation**: Contact technical support

**Save Operation Failures**
- **Problem**: Changes not persisting
- **Resolution**: Verify user permissions and system connectivity
- **Escalation**: Contact system administrator

**Performance Issues**
- **Problem**: Slow data loading
- **Resolution**: Check network connectivity and system load
- **Escalation**: Contact technical support

## Related Documentation

- [Forecasting System Overview](../systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md)
- [Forecasting Business Rules](../business-rules/forecasting/)
- [Forecasting Technical Specifications](../technical/forecasting/)
- [Customer Site Management](../systems/customer-sites/customer-site-directory.md)
- [P&L Analysis Configuration](../configuration/system-settings/)

## Validation and Quality Assurance

### Process Validation Checklist
- [ ] All user flows tested and documented
- [ ] Error handling scenarios covered
- [ ] Data integration points verified
- [ ] Security and access controls validated
- [ ] Performance considerations documented
- [ ] Help and guidance features accessible

### Continuous Improvement
- Regular review of user feedback and UAT results
- Process refinement based on actual usage patterns
- Documentation updates for system enhancements
- Training material updates for new features

---

**Note**: This document represents comprehensive user processes based on UAT feedback from May 2025. All processes should be validated against current system implementation and updated as needed for production deployment.