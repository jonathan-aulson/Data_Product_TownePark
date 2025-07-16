---
title: "Towne Park Forecasting - Business Rules and Process Workflow"
description: "Comprehensive business rules, process workflows, and operational procedures for the forecasting system including current state processes and future state requirements"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-05-13
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "20250513_Master - Forecasting Project Discovery.md"
systems:
  - Forecasting
  - Billing
  - Legion
components:
  - Backend
  - Database
  - Integration
business_domains:
  - Forecasting
  - Revenue Calculation
  - Contract Management
  - Reporting
  - Field Operations
  - Profit & Loss View
  - Fixed Fee
  - Per Occupied Room
  - Per Labor Hour
  - Management Agreement
  - Revenue Share
user_roles:
  - Account Manager
  - District Manager
  - Regional Finance
  - Corporate Finance
  - Regional Manager/VP
  - Billing Admin
tags:
  - forecasting
  - business-rules
  - process-workflow
  - approval-process
  - data-validation
---

# Towne Park Forecasting - Business Rules and Process Workflow

## Overview

This document defines the comprehensive business rules, process workflows, and operational procedures governing Towne Park's forecasting system. It covers both current state processes that must be preserved and future state requirements that will modernize and streamline forecasting operations.

## Rule Definitions

### Core Forecasting Rules

#### Rule: Budget-Based Forecast Initialization
- **Rule Name**: Budget as Forecast Starting Point
- **Description**: All site-level forecasts must initialize from approved annual budget data
- **Applies To**: All sites, all contract types, all user roles
- **Calculation Formula**: Initial_Forecast = Approved_Annual_Budget / 12 (monthly distribution)
- **Examples**: 
  - Site 1234 with $120,000 annual budget initializes with $10,000 monthly forecast
  - New sites use Proforma data instead of budget for initialization
- **Source**: Corporate Finance annual budget process, validated in Discovery Forecasting Current State _1 - 20250107
- **Implementation**: System automatically pulls from EDW Budget_Final table during forecast initialization
- **Edge Cases**: 
  - New sites without budget use Proforma data from Proforma database
  - Sites with mid-year contract changes require manual budget adjustments
  - Closed sites maintain forecast through closure month, then zero out

#### Rule: Forecast Roll-Up Hierarchy
- **Rule Name**: Hierarchical Forecast Aggregation
- **Description**: Forecasts must roll up through organizational hierarchy: Site → District → Region → Enterprise
- **Applies To**: All forecast data, all reporting levels
- **Calculation Formula**: District_Forecast = SUM(Site_Forecasts_in_District), Region_Forecast = SUM(District_Forecasts_in_Region), Enterprise_Forecast = SUM(Region_Forecasts) + Corporate_Adjustments
- **Examples**:
  - District Manager sees aggregated forecast for all sites in their district
  - Regional Finance Director sees all districts in their region
  - Corporate Finance sees enterprise total with ability to add top-side adjustments
- **Source**: Current organizational structure and reporting requirements
- **Implementation**: System maintains Master Non-Financial Table hierarchy relationships
- **Edge Cases**:
  - Sites changing districts mid-period require historical data preservation
  - Temporary organizational changes need proxy access support

#### Rule: Forecast Approval Workflow
- **Rule Name**: Multi-Level Forecast Approval Process
- **Description**: Forecasts must follow formal approval workflow before becoming "forecast of record"
- **Applies To**: All site-level forecasts, monthly forecast cycles
- **Calculation Formula**: Approval_Status = AM_Submit → DM_Review → Regional_Approve → Corporate_Finalize
- **Examples**:
  - AM submits site forecast by last Friday of month
  - DM has 3 business days to review and approve/reject
  - Regional leadership signs off on "forecast of record" for performance measurement
- **Source**: Future state governance requirements from Discovery Forecasting Future State _2 - 20250120
- **Implementation**: Workflow engine with approval status tracking and audit trail
- **Edge Cases**:
  - Proxy approvals when managers are unavailable
  - Emergency forecast changes outside normal cycle
  - Escalation procedures for approval delays

#### Rule: Data Consistency Validation
- **Rule Name**: Automated Forecast Data Integrity Checks
- **Description**: System must validate forecast data consistency and flag anomalies
- **Applies To**: All forecast inputs, all user roles
- **Calculation Formula**: Various validation rules including range checks, trend analysis, and cross-field validation
- **Examples**:
  - Revenue cannot exceed 150% of prior year without explanation
  - Labor hours must align with revenue volume drivers
  - Expense percentages flagged if >20% variance from budget
- **Source**: Current manual validation processes and future automation requirements
- **Implementation**: Real-time validation engine with configurable thresholds
- **Edge Cases**:
  - Seasonal businesses with legitimate large variances
  - New sites without historical comparison data
  - Contract amendments affecting normal validation ranges

### Revenue Forecasting Rules

#### Rule: Contract-Specific Revenue Calculation
- **Rule Name**: Revenue Calculation by Contract Type
- **Description**: Revenue forecasting must follow specific calculation methods based on contract type
- **Applies To**: All revenue streams, varies by contract type
- **Calculation Formula**: 
  - **Revenue Share**: External_Revenue × Revenue_Share_Percentage (after thresholds)
  - **Management Agreement**: (Labor_Hours × Hourly_Rate) + (Expenses × Markup_Percentage) + Management_Fee
  - **Per Labor Hour**: Labor_Hours × Contract_Rate_by_Job_Code
  - **Fixed Fee**: Monthly_Fixed_Amount (adjusted for contractual increases)
  - **Per Occupied Room**: Occupied_Rooms × Daily_Rate × Days_in_Month
- **Examples**:
  - Revenue Share site with 60/40 split after $5,000 threshold: If external revenue = $15,000, Towne Park revenue = ($15,000 - $5,000) × 0.60 = $6,000
  - PLH site with 100 hours at $15/hour = $1,500 revenue
  - Fixed Fee site with $8,000 monthly fee plus 3% annual increase in month 13
- **Source**: Contract terms from billing system and Deal Term tables in EDW
- **Implementation**: Integration with billing system contract definitions
- **Edge Cases**:
  - "10 percenter" sites with complex contracts not yet in billing system
  - Mid-contract amendments affecting calculation methods
  - Hybrid contracts with multiple calculation components

#### Rule: Dynamic Pricing and Rate Forecasting
- **Rule Name**: Rate Forecasting for Dynamic Pricing Environments
- **Description**: For hospitality sites with dynamic pricing, forecast must account for rate variability
- **Applies To**: Hospitality sites with dynamic pricing, transient vs. group business
- **Calculation Formula**: Blended_Rate = (Transient_Volume × Transient_Rate) + (Group_Volume × Group_Rate) / Total_Volume
- **Examples**:
  - Hotel site with 70% transient at $12/day and 30% group at $8/day: Blended rate = (0.70 × $12) + (0.30 × $8) = $10.80
  - Seasonal rate adjustments for peak/off-peak periods
- **Source**: Current manual rate calculation challenges identified in pain points analysis
- **Implementation**: Enhanced rate forecasting with business mix segmentation
- **Edge Cases**:
  - Last-minute group bookings affecting monthly averages
  - Seasonal events causing significant rate spikes
  - Negotiated group rates below standard pricing

### Expense Forecasting Rules

#### Rule: Controllable vs. Non-Controllable Expense Classification
- **Rule Name**: Expense Forecasting Responsibility Matrix
- **Description**: Expenses classified by AM control level to determine forecasting responsibility
- **Applies To**: All expense line items, all sites
- **Calculation Formula**: 
  - **AM Controllable**: AM inputs forecast (uniforms, supplies, equipment, variable labor)
  - **System Automated**: Budget-based or ML prediction (licenses, permits, allocations, insurance)
  - **Corporate Managed**: Corporate Finance inputs (overhead allocations, enterprise costs)
- **Examples**:
  - Uniforms: AM forecasts based on staff turnover and replacement needs
  - Software licenses: System uses budget amount with known increase schedules
  - District overhead: Corporate Finance forecasts based on headcount and salary data
- **Source**: Pain point analysis showing AMs forecasting expenses they don't control
- **Implementation**: Expense classification table with forecasting responsibility assignments
- **Edge Cases**:
  - Expenses that shift between controllable/non-controllable based on contract type
  - Emergency expenses outside normal categories
  - Seasonal expenses with irregular timing

#### Rule: Labor Hour and Cost Forecasting Integration
- **Rule Name**: Legion Integration for Labor Forecasting
- **Description**: Labor forecasting must integrate with Legion scheduling system for accuracy
- **Applies To**: All sites using Legion, all labor-related expenses
- **Calculation Formula**: 
  - New System provides: Volume_Drivers (occupancy, car_counts, events)
  - Legion calculates: Optimal_Labor_Hours based on drivers and scheduling logic
  - Legion returns: Labor_Hours × Wage_Rates = Labor_Cost_Forecast
- **Examples**:
  - Hotel site forecasts 75% occupancy → Legion calculates 120 labor hours needed → Returns $1,800 labor cost
  - Healthcare site forecasts 500 daily procedures → Legion calculates staffing requirements
- **Source**: Future state vision for single source of truth - new system for revenue, Legion for labor
- **Implementation**: Bidirectional API integration between forecasting system and Legion
- **Edge Cases**:
  - Sites not using Legion require manual labor hour input
  - Legion overrides by AMs for special circumstances
  - New sites without Legion historical data for optimization

### Validation Rules

#### Rule: Variance Threshold Alerting
- **Rule Name**: Exception Reporting Based on Variance Thresholds
- **Description**: System must flag significant deviations from budget and trigger review processes
- **Applies To**: All forecast metrics, configurable by site/contract type
- **Calculation Formula**: 
  - **Revenue Variance**: |Forecast_Revenue - Budget_Revenue| / Budget_Revenue > Threshold_Percentage
  - **Expense Variance**: |Forecast_Expense - Budget_Expense| / Budget_Expense > Threshold_Percentage
  - **Productivity Variance**: |Forecast_Productivity - Budget_Productivity| / Budget_Productivity > Threshold_Percentage
- **Examples**:
  - Revenue forecast 15% below budget triggers alert (if threshold = 10%)
  - Labor productivity 20% above budget requires explanation
  - FLC variance >$5,000 or >25% triggers DM review
- **Source**: Ryan Esposito's 2025 Forecast presentation metrics and current manual review processes
- **Implementation**: Configurable threshold engine with alert notifications
- **Edge Cases**:
  - Approved contract amendments that justify variances
  - Seasonal businesses with expected large swings
  - New sites without meaningful budget comparisons

#### Rule: Data Quality and Completeness Validation
- **Rule Name**: Mandatory Data Completeness Checks
- **Description**: Forecasts cannot be submitted without required data elements
- **Applies To**: All forecast submissions, all user roles
- **Calculation Formula**: Completeness_Score = (Completed_Required_Fields / Total_Required_Fields) × 100, must equal 100% for submission
- **Examples**:
  - AM cannot submit forecast without occupancy rate for hospitality sites
  - PLH sites require labor hour inputs for all job codes
  - Revenue share sites need external revenue projections
- **Source**: Current data quality issues and future state requirements
- **Implementation**: Real-time validation with submission blocking for incomplete data
- **Edge Cases**:
  - Temporary data unavailability requiring estimated inputs
  - New sites with limited historical data for validation
  - System outages requiring manual override capabilities

## Process Steps

### Monthly Forecast Cycle Process

#### Step 1: Forecast Initialization
- **Action**: System automatically initializes monthly forecasts from budget or prior forecast
- **System Response**: Creates forecast templates with pre-populated baseline data
- **Decision Points**: 
  - New sites use Proforma data instead of budget
  - Closed sites require manual intervention for final month
- **Validation**: Verify budget data availability and accuracy
- **Error Handling**: Alert Corporate Finance if budget data missing or inconsistent
- **Tips**: Initialization typically occurs first business day of prior month

#### Step 2: AM Data Input and Client Data Integration
- **Action**: AMs input site-specific metrics and incorporate client-provided data
- **System Response**: Real-time validation and calculation updates
- **Decision Points**:
  - Hospitality sites: occupancy, drive-in ratio, average rates, events
  - Healthcare sites: procedure volumes, patient counts, relevant operational metrics
  - All sites: controllable expense adjustments
- **Validation**: Range checks against historical data and budget parameters
- **Error Handling**: Flag anomalies for AM review and explanation
- **Tips**: Focus on key drivers rather than detailed line-item forecasting

#### Step 3: Automated Data Integration
- **Action**: System pulls actual data from integrated sources (Legion, Revenue Spreadsheets, GP)
- **System Response**: Updates forecast with actual data for completed periods
- **Decision Points**: 
  - Determine cut-off dates for actual vs. forecast data
  - Handle timing differences between systems
- **Validation**: Verify data integration completeness and accuracy
- **Error Handling**: Alert users to integration failures or data quality issues
- **Tips**: Near real-time updates preferred over batch processing

#### Step 4: DM Review and Optimization
- **Action**: DMs review aggregated district forecasts and work with AMs on adjustments
- **System Response**: Provides district-level analytics and variance reporting
- **Decision Points**:
  - Identify sites requiring attention or explanation
  - Determine if adjustments needed for district-level factors
- **Validation**: Ensure all site forecasts reviewed and approved at district level
- **Error Handling**: Escalation process for unresolved forecast issues
- **Tips**: Use exception reporting to focus on significant variances

#### Step 5: Regional Finance Review
- **Action**: RFDs analyze regional forecasts and provide optimization guidance
- **System Response**: Regional roll-up views and trend analysis
- **Decision Points**:
  - Regional factors affecting multiple districts
  - Resource allocation and support needs
- **Validation**: Regional forecast consistency and reasonableness
- **Error Handling**: Flag inconsistencies for resolution before corporate review
- **Tips**: Focus on portfolio management rather than individual site details

#### Step 6: Corporate Finance Top-Side Adjustments
- **Action**: Corporate Finance adds enterprise-level adjustments and finalizes forecast
- **System Response**: Incorporates top-side adjustments into enterprise forecast
- **Decision Points**:
  - Contingency adjustments for risk management
  - Overhead cost center forecasting
  - New/lost business placeholder management
- **Validation**: Ensure all corporate adjustments properly documented and justified
- **Error Handling**: Audit trail for all corporate-level changes
- **Tips**: Maintain transparency in adjustment rationale for stakeholder communication

#### Step 7: Forecast Finalization and Distribution
- **Action**: Create "forecast of record" snapshot and distribute to stakeholders
- **System Response**: Lock forecast version and generate standard reports
- **Decision Points**:
  - Timing of forecast lock (typically last Friday of month)
  - Distribution list and format requirements
- **Validation**: Final quality checks before distribution
- **Error Handling**: Rollback procedures if critical errors discovered
- **Tips**: Automated distribution reduces manual effort and ensures consistency

### Exception Handling Process

#### Variance Investigation Workflow
1. **Automated Detection**: System flags variances exceeding thresholds
2. **Initial Review**: Responsible manager reviews flagged items
3. **Explanation Required**: Manager provides business justification for variance
4. **Escalation**: Unresolved variances escalate to next management level
5. **Resolution**: Approved explanations or forecast adjustments made
6. **Documentation**: All variance explanations maintained in audit trail

#### Data Quality Issue Resolution
1. **Issue Detection**: Automated validation identifies data quality problems
2. **User Notification**: Responsible user alerted to specific issues
3. **Correction Process**: User corrects data or provides explanation
4. **Verification**: System validates corrections meet quality standards
5. **Escalation**: Unresolved issues escalate to management
6. **Override Authority**: Designated users can override with justification

## Integration Points

### Billing System Integration
- **Purpose**: Leverage contract terms for accurate revenue forecasting
- **Data Flow**: Contract definitions → Revenue calculation rules → Forecast engine
- **Frequency**: Real-time for contract changes, daily for rate updates
- **Error Handling**: Fallback to EDW Deal Term tables for complex contracts

### Legion Integration
- **Purpose**: Optimize labor forecasting through scheduling system integration
- **Data Flow**: Volume drivers → Legion optimization → Labor hours/costs → Forecast system
- **Frequency**: Weekly forecast updates, daily for schedule changes
- **Error Handling**: Manual input capability when Legion integration unavailable

### EDW Integration
- **Purpose**: Source of truth for actuals, budget, and historical data
- **Data Flow**: Bidirectional - actuals/budget in, forecast snapshots out
- **Frequency**: Daily for actuals, monthly for forecast snapshots
- **Error Handling**: Data validation and reconciliation processes

### Power BI Integration
- **Purpose**: Advanced reporting and analytics on forecast data
- **Data Flow**: Forecast data → EDW → Power BI dashboards
- **Frequency**: Near real-time for operational dashboards
- **Error Handling**: Data quality monitoring and alert systems

## Related Processes

### Budget Planning Process
- **Integration**: Annual budget becomes initial forecast baseline
- **Timing**: Budget completion drives forecast system initialization
- **Dependencies**: Budget approval required before forecast cycle begins

### Performance Management Process
- **Integration**: "Forecast of record" becomes performance measurement baseline
- **Timing**: Monthly performance reviews use locked forecast versions
- **Dependencies**: Forecast accuracy impacts performance evaluation

### Financial Reporting Process
- **Integration**: Forecast data feeds enterprise financial reporting
- **Timing**: Monthly close process incorporates latest forecast data
- **Dependencies**: Forecast timing must align with close calendar

### Sales Pipeline Management
- **Integration**: New business pipeline informs forecast placeholders
- **Timing**: Monthly pipeline updates affect new business assumptions
- **Dependencies**: Sales team data quality impacts forecast accuracy

## Alternative Flows

### Emergency Forecast Updates
- **Trigger**: Significant business changes requiring immediate forecast revision
- **Process**: Expedited approval workflow with limited review cycle
- **Authority**: Regional VP or above can authorize emergency updates
- **Documentation**: Enhanced justification required for audit trail

### System Outage Procedures
- **Trigger**: Forecasting system unavailability during critical periods
- **Process**: Temporary Excel-based backup process with manual data entry
- **Recovery**: Automated data synchronization when system restored
- **Validation**: Enhanced review required for manually entered data

### New Site Onboarding
- **Trigger**: New site contract execution
- **Process**: Proforma-based forecast initialization with accelerated review
- **Timeline**: Forecast active within 5 business days of contract start
- **Validation**: Enhanced monitoring for first 3 months of operation

### Site Closure Process
- **Trigger**: Contract termination or site closure decision
- **Process**: Forecast maintained through closure month, then zeroed
- **Timeline**: 30-day notice required for proper forecast adjustment
- **Validation**: Final month forecast includes closure costs and revenue impact

## Success Metrics

### Process Efficiency Metrics
- **Forecast Cycle Time**: Target <5 business days from initiation to finalization
- **User Adoption Rate**: >95% of users actively using system within 6 months
- **Data Quality Score**: >98% of forecasts pass validation without manual intervention
- **Exception Resolution Time**: <2 business days average for variance explanations

### Accuracy Metrics
- **Forecast Accuracy**: Within 5% of actual results for 80% of sites monthly
- **Variance Prediction**: 90% of significant variances flagged in advance
- **Trend Identification**: Early warning system identifies 75% of performance issues

### User Satisfaction Metrics
- **Ease of Use**: >4.5/5 user satisfaction rating
- **Time Savings**: 50% reduction in time spent on forecast input and reconciliation
- **Decision Support**: 80% of users report improved ability to take proactive actions

## Compliance and Audit Requirements

### Data Retention
- **Forecast Versions**: Maintain all forecast versions for 7 years
- **Audit Trail**: Complete change log with user, timestamp, and justification
- **Backup Procedures**: Daily backups with quarterly disaster recovery testing

### Access Controls
- **Role-Based Security**: Strict enforcement of hierarchical access controls
- **Proxy Access Logging**: All proxy access activities logged and monitored
- **Password Policies**: Enterprise-standard authentication and authorization

### Regulatory Compliance
- **SOX Compliance**: Controls over financial forecast data and reporting
- **Data Privacy**: Protection of client and employee data in forecasts
- **Change Management**: Formal approval process for system and process changes