---
title: "Towne Park Forecasting - Sprint 31 PNL Enhancement Technical Specifications"
description: "Comprehensive technical specifications for PNL (Profit & Loss) view enhancements including variance indicators, current month calculations, and data integration requirements"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-30
version: 1.0
status: Draft
owner: "Development Team"
source_documents:
  - "20250730_Sprint Planning.docx"
systems:
  - Forecasting
  - PNL
  - Revenue Management
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Financial Reporting
  - Revenue Calculation
  - Variance Analysis
user_roles:
  - Account Manager
  - Financial Analyst
  - System Administrator
tags:
  - pnl-enhancements
  - variance-analysis
  - current-month-calculations
  - revenue-integration
  - sprint-planning
---

# Towne Park Forecasting - Sprint 31 PNL Enhancement Technical Specifications

## Meeting Overview

**Date**: July 30, 2025  
**Duration**: 1 hour 25 minutes 31 seconds  
**Meeting Type**: Sprint Planning  
**Sprint**: Sprint 31  
**Participants**: Jonathan Aulson, Christopher Thompson, Cesar Figueroa, Javier Casas, Graham Olson

## Sprint 31 Theme

**Primary Focus**: PNL (Profit & Loss) view enhancements with emphasis on current month calculations and variance analysis improvements.

**Critical Timeline**: All features must be completed before pilot launch on September 2nd, 2025.

## Story 2517: PNL Default View and Variance Indicators

### Requirements

#### Default View Change
- **Current State**: PNL defaults to trend view (actuals + forecast)
- **New Requirement**: PNL defaults to variance view
- **Implementation**: Change default view configuration to show variance by default

#### Variance Indicator Enhancement
- **Current State**: Red and black indicators
- **New Requirement**: Red and green context-specific indicators

#### Variance Logic Rules

**For Expense Categories** (Payroll, Insurance, PTEB, Claims, Parking Rents, Other Expenses):
- **Positive Variance** (Actual > Budget): RED indicator (bad - overspending)
- **Negative Variance** (Actual < Budget): GREEN indicator (good - under budget)
- **Exact Match** (Actual = Budget): Circle dot icon (on target)

**For Revenue Categories** (External Revenue, Internal Revenue):
- **Positive Variance** (Actual > Budget): GREEN indicator (good - over budget)
- **Negative Variance** (Actual < Budget): RED indicator (bad - under budget)
- **Exact Match** (Actual = Budget): Circle dot icon (on target)

#### Threshold Configuration
- **Bold Formatting**: Apply to variances ≥ 7.5%
- **Icon Implementation**: Use ShadCN circle dot icon for exact matches
- **Fallback Option**: If spacing issues occur with icon, use bold black dot

### Story Points: 5

### Technical Implementation Notes
- Validate current red/black implementation correctness
- Implement context-aware variance calculation
- Add exact match detection logic
- Update UI components for new indicator system

## Story: Forecasted Parking Rates Integration

### Requirements

#### Integration Scope
- **Source**: Forecasted parking rates from Parking Rates tab
- **Target**: External revenue calculations on Parking Stats tab
- **Timeline**: Future months only

#### Current State Issue
- Parking Stats tab uses budgeted rates for future month calculations
- Forecasted parking rates are not integrated into revenue calculations

#### Implementation Requirements
- **Data Flow**: Forecasted parking rates → Parking Stats external revenue → PNL forecasted months
- **Save Logic**: When parking rates are updated, both Parking Rates and Parking Stats tabs must be saved
- **Existing Capability**: Multi-tab save functionality already implemented

### Story Points: 8

### Technical Considerations
- Ensure proper data synchronization between tabs
- Validate save button enable/disable logic
- Test external revenue recalculation accuracy

## Current Month Calculation Stories

### Story: External Revenue Current Month Calculation

#### Data Source
- **Primary Table**: Revenue Daily Detail
- **Query Requirements**: 
  ```sql
  SELECT type, date_loaded, site, date, net_external_revenue
  FROM revenue_daily_detail
  WHERE site = [site_id] 
    AND date >= [first_day_current_month]
    AND date <= [current_date]
  ORDER BY date_loaded DESC
  ```

#### Calculation Logic

**Step 1: Determine Data Availability**
- Query most recent `date_loaded` timestamp
- Identify latest date with actual revenue data
- Handle scenarios where data trails behind current date

**Step 2: Calculate Trend Value**
- **Actual Component**: Sum of `net_external_revenue` from month start to latest data date
- **Forecast Component**: Forecasted external revenue from (latest data date + 1) to month end
- **Final Value**: Actual Component + Forecast Component

#### Example Scenario (July 15th current date)
- **Data Available**: July 1-13 (loaded on July 13)
- **Actual Revenue**: Sum of July 1-13 net external revenue = $45,000
- **Forecast Revenue**: July 14-31 forecasted revenue = $35,000
- **Display Value**: $80,000 (combined actual + forecast)

#### Tooltip Requirements
- **Actual Amount**: Display in blue with date range (e.g., "Actual: $45,000 (7/1 - 7/13)")
- **Forecast Amount**: Display in black with date range (e.g., "Forecast: $35,000 (7/14 - 7/31)")
- **Labels**: Clear "Actual" and "Forecast" indicators

#### Edge Case Handling
- **Zero Values**: Treat as valid data points unless confirmed as missing data
- **Data Gaps**: Use latest available date as cutoff point
- **Missing Days**: Include in forecast calculation from gap start date

### Story Points: 13

### Technical Implementation
- New endpoint for revenue daily detail queries
- Update PNL breakdown DTO to include date cutoffs
- Frontend tooltip implementation
- Complex data structure modifications required

## Story: Internal Revenue Current Month Calculation

### Data Sources
- **Revenue Data**: Revenue Datamart Daily
- **Payroll Data**: Legion database payroll summary
- **Occupancy Data**: Revenue Datamart Daily (value_type = 'other')

### Calculation Process

#### Step 1: Gather Actual Inputs
```sql
-- Revenue and Occupancy Query
SELECT site, date, value_type, amount
FROM revenue_datamart_daily
WHERE site = [site_id]
  AND date >= [first_day_current_month]
  AND date <= [latest_data_date]
  AND value_type IN ('vehicles', 'revenue', 'other')

-- Payroll Query  
SELECT site, date, job_code, hours_worked, cost
FROM legion_payroll_summary
WHERE site = [site_id]
  AND date >= [first_day_current_month]
  AND date <= [latest_data_date]
```

#### Step 2: Calculator Integration
- **Replace Forecasted Inputs**: Use actual external revenue, occupancy, and payroll
- **Day-by-Day Basis**: Process each day individually up to latest data date
- **Power Bill Configuration**: Apply existing calculator logic with actual inputs

#### Step 3: Combine with Forecast
- **Actual Period**: Month start to latest data date using actual inputs
- **Forecast Period**: (Latest data date + 1) to month end using forecasted inputs
- **Final Calculation**: Sum of actual and forecast internal revenue

### Exclusions
- **Insurance**: Not calculated until month end
- **Claims**: Not calculated until month end
- **Scope**: Focus on core revenue calculation components only

### Tooltip Requirements
- **Simplified Display**: Show actual data date range only
- **Format**: "Actual data through [date]"
- **No Breakdown**: Do not show actual vs forecast amounts due to complexity

### Story Points: 13

### Technical Challenges
- Complex calculator integration
- Multiple data source coordination
- DTO structure modifications required

## Story: Current Month Payroll Calculation

### Data Source
- **Table**: Payroll Summary (Legion database view)
- **Query Structure**:
  ```sql
  SELECT site, date, job_code, hours, cost
  FROM payroll_summary
  WHERE site = [site_id]
    AND date >= [first_day_current_month]
    AND CAST(date AS DATE) <= [current_date]
  ORDER BY CAST(date AS DATE) DESC
  ```

### Implementation Approach
- **Actual Component**: Sum payroll costs from month start to most recent date
- **Forecast Component**: Forecasted payroll from (most recent date + 1) to month end
- **Data Availability**: Should already exist in current payroll queries

### Story Points: 5 (estimated lower due to existing query infrastructure)

### Technical Notes
- Date casting required for proper sorting
- Leverage existing payroll data structures
- Straightforward implementation compared to revenue calculations

## Story: Claims Current Month Display

### Requirements
- **Data Source**: Account Summary table
- **Logic**: Display current amount in Account Summary for claims category
- **Scope**: Current and past months
- **No Proration**: Show actual account summary value only

### Query Structure
```sql
SELECT account_summary.amount
FROM account_summary
JOIN chart_of_accounts ON account_summary.account_id = chart_of_accounts.id
WHERE chart_of_accounts.category = 'Claims'
  AND account_summary.site = [site_id]
  AND account_summary.month = [current_month]
```

### Story Points: 3

### Implementation Notes
- Likely already implemented correctly
- Validation required to confirm current behavior
- Simple account summary lookup

## Story: PTEB and Insurance Current Month Display

### Requirements
- **Data Source**: Budget Final table (not Account Summary)
- **Logic**: Show forecasted/budgeted amounts for current month
- **Rationale**: PTEB and Insurance only actualize after month end

### Hierarchy Logic
1. **Primary**: Use forecasted data if available
2. **Fallback**: Use budgeted data if no forecast exists
3. **Calculation**: PTEB = budgeted rate × forecasted payroll

### Current State Issue
- System may be showing actuals from Account Summary
- Need to replace with forecasted/budgeted values

### Story Points: 5

### Technical Implementation
- Modify query to exclude actuals for current month
- Implement forecast/budget hierarchy logic
- Validate PTEB calculation formula

## Story: Parking Rents Current Month Logic

### Unique Requirements
- **Data Sources**: 
  - Other Expense tab (single column: "Rents - Parking")
  - Account Summary (account code 7170)
- **Logic**: Show greater of actual vs forecasted amount

### Implementation Rules
- **If Actual > Forecast**: Display actual with "Actual" tooltip
- **If Forecast > Actual**: Display forecast with "Forecast" tooltip
- **Scope**: Current and future months
- **Integration**: Ensure Other Expense column maps to PNL Parking Rents row

### Story Points: 5

### Technical Considerations
- Comparison logic implementation
- Tooltip dynamic content
- Verify Other Expense to PNL mapping
- May require separation from other expense aggregation

## Story: FLC and FLC Cumulative Validation

### Purpose
Validate Front Line Contribution (FLC) calculations after PNL modifications.

### FLC Calculation Formula
```
FLC = Internal Revenue - (Payroll + Claims + Parking Rents + Other Expenses + PTEB + Insurance)
```

### FLC to Budget Cumulative Logic
- **Monthly Variance**: Current Month FLC - Current Month Budgeted FLC
- **Cumulative Total**: Running sum of monthly variances year-to-date

### Example Calculation
- **January**: FLC $105K, Budget $95K → Cumulative $10K
- **February**: FLC $95K, Budget $98K → Monthly -$3K, Cumulative $7K
- **March**: FLC $102K, Budget $99K → Monthly $3K, Cumulative $10K

### Validation Requirements
- Ensure calculations use same logic as individual row calculations
- Verify proper handling of current month mixed actual/forecast values
- Confirm cumulative calculation accuracy

### Story Points: 3

### Implementation Approach
- Frontend calculation using visible table values
- No additional backend logic required
- Focus on validation and testing

## Story: Other Expenses Variance Indicators

### Requirements
- **Scope**: Other Expenses tab
- **Indicators**: Red/green variance triangles plus neutral circle dot
- **Rounding**: Display whole dollars only (0 decimal places)
- **Current Month**: Show both forecasted and actual values in separate rows

### Variance Logic
- **Expense Category**: Positive variance = RED, Negative variance = GREEN
- **Exact Match**: Circle dot icon for zero variance
- **Threshold**: Bold formatting for significant variances

### Current Month Display
- **Row 1**: Forecasted current month amount
- **Row 2**: Actual current month amount with variance indicators
- **Past Months**: Single row with actual amount and indicators

### Story Points: 3

### Technical Notes
- Leverage existing variance indicator logic
- Add rounding to frontend display
- Implement dual-row current month layout

## Performance and Scope Considerations

### PNL Performance Optimization
- **Current Issue**: PNL performance concerns
- **Proposed Solution**: Limit PNL to pilot sites only
- **Implementation**: Spike story to determine technical approach

### Job Profile Mapping
- **Scope**: Map job profiles to job codes for pilot sites
- **Status**: Completed by Amy Sowells
- **Implementation**: Configure system with pilot site mappings

## Sprint Capacity and Timeline

### Story Point Summary
- **Total Estimated Points**: 66 points
- **Team Velocity**: Approximately 66 points (historical average)
- **PTO Impact**: Limited impact from Friday absences

### Risk Mitigation
- **Pilot Deadline**: September 2nd, 2025 (hard deadline)
- **Buffer Strategy**: Complete Sprint 31 work to allow 3 sprints for 12-month forecast rebuild
- **Stretch Goals**: Additional stories available if capacity allows

## Related Documentation

- [PNL System Overview](../../../systems/forecasting/forecasting-system-overview.md)
- [Revenue Calculation Business Rules](../../../business-rules/forecasting/)
- [Variance Analysis Standards](../../../standards/)
- [Database Integration Specifications](../../database/)

## Technical Dependencies

### Database Tables
- **Revenue Daily Detail**: External revenue actual data
- **Revenue Datamart Daily**: Internal revenue inputs
- **Payroll Summary**: Labor cost data
- **Account Summary**: Financial account data
- **Budget Final**: Budget and forecast data

### Integration Points
- **Legion Database**: Payroll and scheduling data
- **Dataverse**: Power Platform data storage
- **Power Bill Calculators**: Internal revenue calculation logic

### Frontend Components
- **PNL View**: Main financial reporting interface
- **Variance Indicators**: Red/green/neutral display logic
- **Tooltip System**: Detailed breakdown display
- **Multi-tab Save**: Cross-tab data synchronization

## Next Steps

1. **Story Tasking**: Break down stories into specific development tasks
2. **Technical Design**: Finalize database query structures and DTO modifications
3. **Testing Strategy**: Develop comprehensive test cases for variance logic
4. **Performance Monitoring**: Track PNL performance with new calculations
5. **Pilot Preparation**: Ensure all features ready for September 2nd launch