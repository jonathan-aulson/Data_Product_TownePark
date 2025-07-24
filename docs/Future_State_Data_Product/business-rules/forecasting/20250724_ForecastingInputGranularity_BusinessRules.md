---
title: "Towne Park Forecasting - Input Granularity Business Rules"
description: "Comprehensive business rules governing forecasting input granularity levels, time period controls, and data integrity requirements based on sprint demo decisions and stakeholder feedback"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-05-13
version: 1.0
status: Active
owner: "Product Management Team"
source_documents:
  - "20250513_Master - Forecasting Sprint Demo.md"
systems:
  - Forecasting
components:
  - Frontend
  - Backend
business_domains:
  - Parking Statistics
  - Payroll Forecasting
  - Rate Management
  - Other Revenue
  - Data Integrity
user_roles:
  - Account Manager
  - District Manager
  - Product Owner
tags:
  - business-rules
  - forecasting
  - input-granularity
  - data-integrity
  - time-periods
  - validation
---

# Towne Park Forecasting - Input Granularity Business Rules

## Overview

This document establishes comprehensive business rules governing forecasting input granularity levels across all forecasting modules. These rules were developed through extensive stakeholder consultation during Sprint 20-23 demonstrations and are designed to balance user efficiency with data integrity requirements while ensuring accurate forecasting capabilities.

## Rule Definitions

### Rule Group: Parking Statistics Input Granularity

#### Rule PSG-001: Daily-Only Input Requirement
**Rule Name:** Parking Statistics Daily Input Restriction  
**Description:** All parking statistics forecasting input must be performed at the daily granularity level only  
**Applies To:** All parking statistics fields (Occupancy, Drive-In, Capture, Self Aggregator, Valet Aggregator, etc.)  
**Calculation Formula:** Input_Granularity = DAILY_ONLY WHERE forecast_type = 'parking_statistics'  
**Examples:**
- Account Manager can input occupancy percentage for each individual day
- Drive-in capture rates must be entered day by day, not as weekly averages
- Self and Valet Aggregator statistics require daily-level input precision
**Source:** Sprint 22 Demo decision (April 10, 2025) - Decision to maintain data integrity  
**Implementation:** System enforces daily input fields only, no weekly/monthly input options  
**Edge Cases:**
- Bulk input tools may assist with daily entry but must maintain daily granularity
- Copy/paste functionality preserves daily-level detail
- Import functions must validate daily-level data integrity

#### Rule PSG-002: Time Period Display Flexibility
**Rule Name:** Parking Statistics Display Aggregation Options  
**Description:** While input is restricted to daily level, display and analysis can be aggregated to weekly, monthly, or quarterly views  
**Applies To:** All parking statistics display and reporting functions  
**Calculation Formula:** Display_Options = [DAILY, WEEKLY, MONTHLY, QUARTERLY] WHERE input_granularity = DAILY  
**Examples:**
- Daily input data can be viewed as weekly averages for trend analysis
- Monthly aggregations available for high-level planning and comparison
- Quarterly views support strategic planning and budget comparison
**Source:** Sprint 22-23 Demo discussions on time granularity controls  
**Implementation:** Time period granularity dropdown controls display aggregation only  
**Edge Cases:**
- Aggregation calculations must handle partial weeks/months appropriately
- Weekend/weekday patterns preserved in weekly aggregations
- Holiday impacts visible in monthly/quarterly aggregations

#### Rule PSG-003: Historical Data Access Restrictions
**Rule Name:** Historical Parking Statistics Read-Only Access  
**Description:** Past forecast periods for parking statistics are read-only and cannot be modified  
**Applies To:** All parking statistics data for dates prior to current date  
**Calculation Formula:** Edit_Permission = FALSE WHERE forecast_date < CURRENT_DATE  
**Examples:**
- March forecasting data cannot be edited in April or later months
- Historical forecasts remain visible for comparison but locked from changes
- Actual data display alongside historical forecasts for variance analysis
**Source:** Sprint 21 Demo specification (March 28, 2025)  
**Implementation:** UI disables input fields for past dates, displays read-only styling  
**Edge Cases:**
- System date changes require real-time permission updates
- Time zone considerations for multi-region implementations
- Administrative override capabilities for data correction scenarios

### Rule Group: Payroll Forecasting Input Granularity

#### Rule PFG-001: Weekly Input Preference with Daily Option
**Rule Name:** Payroll Forecasting Granularity Flexibility  
**Description:** Payroll forecasting input is optimized for weekly granularity but supports daily input when needed  
**Applies To:** All payroll forecasting by job family and cost categories  
**Calculation Formula:** Input_Options = [WEEKLY_PREFERRED, DAILY_AVAILABLE] WHERE forecast_type = 'payroll'  
**Examples:**
- Account Managers typically input weekly payroll hours for most job categories
- Daily input available for special events or detailed scheduling requirements
- Percentage slider adjustments apply to selected time period granularity
**Source:** Sprint 23 Demo payroll tab specifications (April 25, 2025)  
**Implementation:** Default weekly input with option to switch to daily granularity  
**Edge Cases:**
- Mixed granularity within same forecast period requires careful aggregation
- Holiday weeks may require daily input for accuracy
- Part-time vs. full-time job categories may have different optimal granularities

#### Rule PFG-002: Hours and Cost Input Methods
**Rule Name:** Payroll Input Method Flexibility  
**Description:** Payroll forecasting supports input by either hours or cost with automatic conversion  
**Applies To:** All payroll job family forecasting inputs  
**Calculation Formula:** Cost = Hours × Hourly_Rate WHERE input_method = 'hours' OR Hours = Cost ÷ Hourly_Rate WHERE input_method = 'cost'  
**Examples:**
- Account Manager inputs 40 hours for GSC job family, system calculates cost using current rates
- Account Manager inputs $2,000 cost for management category, system calculates equivalent hours
- Percentage slider adjustments apply to selected input method (hours or cost)
**Source:** Sprint 23 Demo payroll input specifications  
**Implementation:** Toggle between hours and cost input with real-time conversion  
**Edge Cases:**
- Rate changes during forecast period require prorated calculations
- Overtime rate differentials affect hours-to-cost conversions
- Benefits and tax calculations may require separate handling

#### Rule PFG-003: Budget Integration and Variance Display
**Rule Name:** Payroll Budget Baseline and Forecast Variance  
**Description:** Payroll forecasting displays budget baseline (red line) with forecast adjustments (green bar) and variance calculations  
**Applies To:** All payroll job family forecasting with budget data available  
**Calculation Formula:** Variance = (Forecast_Value - Budget_Value) ÷ Budget_Value × 100  
**Examples:**
- Red line shows budgeted hours/cost for GSC job family
- Green bar shows Account Manager forecast adjustments above/below budget
- Variance percentage calculated and displayed for management review
**Source:** Sprint 23 Demo payroll visualization requirements  
**Implementation:** Visual budget baseline with overlay forecast adjustments  
**Edge Cases:**
- Missing budget data requires alternative baseline (prior year, model prediction)
- Zero budget values require special handling for variance calculations
- Negative budget values (credits) require appropriate variance interpretation

### Rule Group: Other Internal Revenue Input Granularity

#### Rule OIR-001: Monthly Input Restriction
**Rule Name:** Other Internal Revenue Monthly-Only Input  
**Description:** Other internal revenue forecasting is restricted to monthly input granularity only  
**Applies To:** All other internal revenue categories (GPO Fees, Billable Expenses, Non-Billable Expenses, Credits)  
**Calculation Formula:** Input_Granularity = MONTHLY_ONLY WHERE forecast_type = 'other_internal_revenue'  
**Examples:**
- GPO Fees entered as single monthly amount, not daily breakdown
- Billable Expenses aggregated to monthly total for forecasting
- Credits entered as monthly net amount with negative values
**Source:** Sprint 23 Demo decision (April 25, 2025) - Monthly sufficiency confirmed  
**Implementation:** Monthly input fields only, no daily/weekly options available  
**Edge Cases:**
- Mid-month adjustments require full month recalculation
- Seasonal variations handled through monthly planning rather than daily detail
- Large one-time items distributed across appropriate months

#### Rule OIR-002: Positive and Negative Value Handling
**Rule Name:** Other Internal Revenue Value Sign Conventions  
**Description:** Credits entered as negative values, revenue items as positive values, with system calculating net monthly totals  
**Applies To:** Combined revenue/credit fields in other internal revenue forecasting  
**Calculation Formula:** Net_Monthly_Total = SUM(Positive_Revenue_Items) + SUM(Negative_Credit_Items)  
**Examples:**
- Bell service revenue entered as +$500 for positive revenue impact
- Customer credits entered as -$200 for negative revenue impact
- Net monthly total calculated as $300 for combined field
**Source:** Sprint 23 Demo clarification on credits vs. revenue handling  
**Implementation:** Input validation accepts positive and negative values with clear labeling  
**Edge Cases:**
- Large credit amounts may result in negative monthly totals
- Mixed currency scenarios require consistent sign conventions
- Audit trail must preserve individual positive/negative components

#### Rule OIR-003: Twelve-Month Forward Planning Horizon
**Rule Name:** Other Internal Revenue Planning Horizon  
**Description:** Other internal revenue forecasting supports twelve months forward planning on rolling basis  
**Applies To:** All other internal revenue categories and planning scenarios  
**Calculation Formula:** Planning_Horizon = CURRENT_MONTH + 12_MONTHS WHERE forecast_type = 'other_internal_revenue'  
**Examples:**
- January planning includes forecasts through December of same year
- July planning includes forecasts through June of following year
- Rolling horizon updates monthly to maintain twelve-month forward view
**Source:** Sprint 23 Demo planning horizon specifications  
**Implementation:** Twelve-month grid display with monthly input capabilities  
**Edge Cases:**
- Year-end transitions require careful handling of fiscal vs. calendar years
- Budget cycle alignment may require extended or shortened planning horizons
- Contract renewal timing may affect revenue planning horizon

### Rule Group: Rate Forecasting Input Granularity

#### Rule RFG-001: Monthly Rate Input with System-Driven Direction
**Rule Name:** Rate Forecasting Granularity and Automation  
**Description:** Rate forecasting currently supports monthly input but is evolving toward system-driven approach based on actuals and budget data  
**Applies To:** All parking rate categories and revenue calculation components  
**Calculation Formula:** Rate_Forecast = SYSTEM_DRIVEN_PREFERRED OR MONTHLY_INPUT_FALLBACK WHERE accuracy_requirements = HIGH  
**Examples:**
- Standard parking rates derived from historical actual rates and budget data
- Dynamic pricing adjustments based on occupancy and market conditions
- Account Manager input limited to exception scenarios and special events
**Source:** Sprint 22 Demo discussion on rate forecasting accuracy (April 10, 2025)  
**Implementation:** Transition from manual monthly input to automated system-driven rates  
**Edge Cases:**
- New rate structures require initial manual input until historical data available
- Special event pricing may require temporary manual override capabilities
- Contract rate changes need immediate system update and forecast adjustment

#### Rule RFG-002: Actual vs. Posted Rate Accuracy Requirements
**Rule Name:** Rate Forecasting Accuracy and Discount Integration  
**Description:** Rate forecasting must account for actual netted rates including discounts and comps, not just posted rates  
**Applies To:** All rate forecasting calculations and revenue projections  
**Calculation Formula:** Effective_Rate = Posted_Rate - Average_Discounts - Comp_Adjustments WHERE accuracy_level = 'actual_revenue'  
**Examples:**
- Posted rate of $25 adjusted for average 15% discount = $21.25 effective rate
- Comp adjustments for service issues reduce effective rate further
- Seasonal discount patterns incorporated into rate forecasting model
**Source:** Sprint 22 Demo stakeholder feedback on rate accuracy issues  
**Implementation:** Integration of discount and comp data into rate calculations  
**Edge Cases:**
- Variable discount rates by customer segment require segmented calculations
- Comp policies may change affecting historical discount patterns
- Promotional pricing requires temporary rate adjustment capabilities

### Rule Group: Time Horizon and Historical Access

#### Rule THA-001: One-Year Historical Access
**Rule Name:** Historical Forecast Data Access Period  
**Description:** Account Managers can access up to one year of historical forecast data in read-only mode  
**Applies To:** All forecasting modules and historical data display functions  
**Calculation Formula:** Historical_Access_Period = CURRENT_DATE - 365_DAYS WHERE access_type = 'read_only'  
**Examples:**
- March 2025 forecasts visible in March 2026 for comparison purposes
- Historical accuracy analysis available for forecast improvement
- Trend analysis supported with full year of historical forecast data
**Source:** Sprint 21 Demo historical access specifications (March 28, 2025)  
**Implementation:** Historical data display with clear read-only indicators  
**Edge Cases:**
- Data retention policies may require archival of older historical data
- Performance considerations for large historical datasets
- User role permissions may limit historical access scope

#### Rule THA-002: One-Year Forward Planning Horizon
**Rule Name:** Forward Forecasting Planning Period  
**Description:** Account Managers can input forecasts up to one year forward on rolling basis  
**Applies To:** All forecasting input modules and planning functions  
**Calculation Formula:** Forward_Planning_Period = CURRENT_DATE + 365_DAYS WHERE input_type = 'forecast'  
**Examples:**
- March 2025 planning includes forecasts through March 2026
- Rolling horizon maintains consistent one-year forward planning capability
- Budget alignment supported through annual planning horizon
**Source:** Sprint 21 Demo forward planning specifications  
**Implementation:** Rolling one-year input horizon with monthly updates  
**Edge Cases:**
- Budget cycle timing may require extended planning horizon temporarily
- Contract renewal periods may affect planning horizon requirements
- Seasonal business patterns may require flexible horizon adjustments

## Validation Rules

### Data Integrity Validation
- All daily input data must pass range validation based on historical patterns and business logic
- Weekly and monthly aggregations must mathematically reconcile to daily input totals
- Cross-period consistency checks ensure logical progression of forecast values
- Budget variance thresholds trigger review requirements for significant deviations

### Input Method Validation
- Hours and cost input methods must produce consistent results using current rate tables
- Positive and negative value combinations must result in logical net totals
- Time period granularity selections must align with module-specific requirements
- Historical vs. forecast data boundaries must be clearly enforced

### Business Logic Validation
- Occupancy percentages cannot exceed 100% or fall below 0%
- Payroll hours must align with operational capacity and staffing models
- Revenue projections must align with rate and volume assumptions
- Seasonal patterns must be consistent with historical business cycles

## Integration Points

### Budget Data Integration
- EDW Budget Final table provides baseline data for all forecasting modules
- Budget variance calculations require real-time integration with forecast inputs
- Budget cycle timing affects planning horizon and validation requirements
- Multi-year budget data supports extended planning scenarios

### Actual Data Integration
- Historical actual data provides validation baseline for forecast accuracy
- Real-time actual data enables immediate variance analysis and course correction
- Actual vs. forecast comparison drives continuous improvement in forecasting methods
- Seasonal actual patterns inform intelligent pre-population of forecast data

### Model Integration
- Mike Foy's forecasting model provides smart pre-population for outer months
- Model predictions serve as starting point for Account Manager adjustments
- Seasonal patterns and event data enhance model accuracy and relevance
- Model learning incorporates Account Manager adjustments for continuous improvement

## Related Documentation

### Technical Specifications
- [Forecasting Technical Architecture and API Design](../../technical/backend/20250718_Forecasting_TechnicalArchitecture_APIDesign.md)
- [Forecasting Database Integration](../../technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md)

### User Process Documentation
- [Account Manager Forecasting Workflows](../../user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md)
- [District Manager Forecasting Workflow User Guide](../../user-processes/district-manager/20250723_DistrictManager_ForecastingWorkflow_UserGuide.md)

### Business Rules Documentation
- [Forecasting Business Rules and Development Decisions](20250718_Forecasting_BusinessRules_DevelopmentDecisions.md)
- [Forecasting Calculations and Validations](20250718_Forecasting_BusinessRules_CalculationsAndValidations.md)

### Team Notes and Decisions
- [Forecasting Sprint Demo Consolidated Team Notes](../../team-notes/development/20250724_ForecastingSprintDemo_ConsolidatedTeamNotes.md)

## Code Validation Report
**Last Validated:** 2025-07-24  
**Validation Scope:** Input Granularity Business Rules  
**Code Copy Date:** Current as of validation date

### Validation Summary
- ✅ **Verified Elements:** 0 items (business rules pending implementation validation)
- ⚠️ **Discrepancies Found:** 0 items
- ❓ **Incomplete Documentation:** 0 items  
- 🔍 **Requires Review:** Implementation validation needed once granularity rules are coded

### Validation Limitations
- Business rules document requirements rather than implementation details
- Code validation will be required once input granularity controls are implemented
- Future validation needed against actual forecasting system granularity enforcement
- Sprint demo outcomes validation pending system implementation

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-24 | Documentation Team | Initial creation from sprint demo decisions, establishing comprehensive business rules for forecasting input granularity across all modules with stakeholder feedback integration |