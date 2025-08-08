---
title: "Towne Park Forecasting - Backlog Grooming Meeting Transcript"
description: "Comprehensive meeting transcript covering job code mapping challenges, PNL calculation rules, and sprint planning for forecasting system development"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-15
version: 1.0
status: Complete
owner: "Jonathan Aulson"
source_documents:
  - "20250715v2_Backlog Grooming_ Forecasting.docx"
  - "20250715_Backlog Grooming_ Forecasting.docx"
  - "20250710_Architecture_Weekly_Sync.docx"
systems:
  - Forecasting
  - Power Bill
  - Legion
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Budget Management
  - Job Code Mapping
  - PNL Calculations
  - Revenue Forecasting
user_roles:
  - Account Manager
  - Development Team
  - Business Analysts
tags:
  - meeting-transcript
  - forecasting
  - job-mapping
  - pnl-calculations
  - sprint-planning
  - business-rules
---

# Towne Park Forecasting - Backlog Grooming Meeting Transcript

## Meeting Overview

**Date**: July 15, 2025  
**Duration**: 52 minutes 9 seconds  
**Meeting Type**: Forecasting Backlog Grooming  
**Participants**:
- Jonathan Aulson (Development Lead)
- Amy Sowells (Business Analyst)
- Michael Foy (Business Analyst)
- Christopher Thompson (Developer)

## Executive Summary

This comprehensive meeting addressed critical challenges in the forecasting system development, focusing on job code mapping complexities, detailed PNL calculation business rules, and sprint planning for upcoming development cycles. Key decisions were made regarding budget data integration approaches and user interface improvements.

## Key Topics Discussed

### 1. Job Code Mapping Challenge

#### Problem Statement
The team identified a significant challenge in mapping budget data job profiles to Power Bill job codes. The budget data table (`budget_data_tab_pr`) contains job profiles that don't directly correspond to job codes used in the forecasting system.

#### Current Situation
- **Source Data**: Budget hours stored in `budget_data_tab_pr` table with `job_profile` column
- **Target System**: Power Bill uses specific job codes for billable jobs (rows 1-92 identified)
- **Mapping Status**: Out of 92 job codes, only partial mapping completed by Adam
- **Challenge**: Job profiles are site-specific and don't standardize across locations

#### Examples of Mapping Complexity
- **Job Profile**: "GSA shift diff 2" 
- **Potential Job Codes**: GSA, GSA2, GSA3, GSA4, GSA5
- **Issue**: One job profile may relate to multiple job codes, or job codes may not have direct job profile equivalents

#### Proposed Solutions
1. **Manual Mapping Exercise**: Create site-by-site mapping of job profiles to job codes
2. **AI-Assisted Mapping**: Initial attempt made using AI to map combinations of job codes, site numbers, and job profiles
3. **Alternative Approach**: Map to job groups instead of individual job codes (less accurate but more feasible)

#### Action Items
- Schedule meeting with Catherine (budget subject matter expert) and Jim
- Explore existing mapping documentation within organization
- Evaluate feasibility of manual mapping exercise given time constraints

### 2. PNL Calculation Rules for Current Month

The meeting established detailed business rules for handling PNL calculations during the current month, combining actual data with forecasted amounts.

#### External Revenue
- **Data Source**: Revenue daily detail / Revenue data mart daily
- **Logic**: Day-by-day basis combining actual recorded revenue with forecasted amounts for future dates
- **Process**: Revenue spreadsheet filled daily for prior day, loaded into Datamart, then pushed to Excel forecast file

#### Internal Revenue
- **Calculation Method**: Based on other PNL components, varies by contract type
- **Revenue Share Contracts**: Calculated from external revenue using share percentage in Power Bill
- **Management Agreement Contracts**: Calculated from other PNL components based on Power Bill data
- **Implementation**: Requires replication of monthly calculations on daily basis

#### Payroll
- **Data Source**: Payroll summary in Legion
- **Logic**: Day-by-day overlay of actual payroll data where available, forecast for remaining days
- **Note**: Requires confirmation with Adam upon return

#### Claims
- **Forecast Amount**: Zero (claims are not forecasted)
- **Actual Handling**: Sum claims from account summary daily, display actual amounts only
- **Logic**: Simple accumulation of actual claim amounts as they occur

#### Parking Rents and Other Expenses
- **Business Rule**: Use greater of (Budget/Forecast) vs (Account Summary Actual)
- **Rationale**: Prevents early-month skewing when few expenses have posted
- **Example**: 
  - Budget: $50,000
  - Early month actual: $1,000
  - System uses: $50,000 (budget) until actuals exceed budget
- **Override Logic**: If Account Manager changes forecast from budget, use greater of (AM Forecast) vs (Account Summary)

#### PTEB (Payroll Taxes, Employee Benefits)
- **Calculation Method**: Percentage of payroll
- **Formula**: (Budgeted PTEB ÷ Forecasted Payroll) × Actual/Forecasted Payroll
- **Current Month Handling**: Continue using calculated percentage, no actual PTEB data during month
- **Timing**: Actual PTEB typically not available until month-end

#### Insurance
- **Calculation Method**: Percentage of payroll (similar to PTEB)
- **Timing**: Insurance not posted until 1st of following month (July insurance posted August 1st)
- **Current Month Handling**: Use calculated percentage based on payroll, no actuals available

#### Other Expenses Breakdown
- **Included in Other Expenses**: All 7000-range accounts except:
  - Parking rents (separate line item)
  - Claims (4 specific claim accounts, separate line item)
  - Insurance (3 insurance accounts, separate line item)
- **Logic**: Each main account follows same greater-of logic as parking rents

### 3. Sprint Planning and User Stories

#### High Priority Stories for Upcoming Sprint

**Story 1: Copy Legion Schedule to Forecast**
- **Feature**: Single-click button to copy scheduled hours from Legion to forecast
- **UI Design**: "Copy Schedule to Forecast" button with confirmation dialog
- **Functionality**: Overwrites forecast for all scheduled dates, requires save to persist
- **Business Value**: Significant efficiency improvement for Account Managers

**Story 2: External Revenue Adjustments on Stats Tab**
- **Problem**: Stats tab external revenue doesn't include adjustments, causing discrepancy with PNL
- **Solution**: Apply budgeted adjustment percentages to forecasted revenue
- **Method**: Calculate percentage of adjustments to external revenue from budget, apply to stats
- **Actual Handling**: Use actual adjustments for actual revenue periods

**Story 3: Payroll UI Improvements for Per Labor Hour Sites**
- **Current Issue**: Job groups create cluttered, zigzag UI for per labor hour sites
- **Proposed Solution**: Show job codes directly instead of job groups for per labor hour contracts
- **Rationale**: Per labor hour sites work at job code level, job groups add unnecessary complexity

**Story 4: Forecasting Dialog Navigation Enhancement**
- **Feature**: Navigate between dates and jobs within forecasting dialog
- **Benefit**: Allows Account Managers to stay in editing mode without leaving dialog
- **User Experience**: Streamlined workflow for bulk forecasting updates

**Story 5: Other Revenue Tab UI Cleanup**
- **Scope**: Modernize first-built tab to match current UI standards
- **Changes**: 
  - Consistent coloring scheme
  - Remove dollar signs from display
  - Update mouse-over behaviors
  - Change "Credits" to "Miscellaneous"
  - Add "Client Paid Expenses" category
- **Validation Rules**:
  - Miscellaneous: Can be positive or negative
  - Client Paid Expenses: Enforce negative numbers
  - Billable Expenses: Enforce positive numbers

#### Additional Stories (Lower Priority)
- PNL view show variance by default (steering committee requirement)
- Consistent look and feel improvements across all tabs
- Various UI polish and user experience enhancements

### 4. Technical Architecture Discussion

#### Data Flow Performance Considerations
- Discussion of 12-month forecasting data and performance improvements
- Evaluation of reusable API approach vs current service architecture
- Monitoring and alerting capabilities for data flows
- Scalability features assessment for data flow architecture

#### AI Integration Discussion
- Current AI assistant implementation proving valuable for development team
- Consideration of Account Manager-facing AI assistant for system help
- Discussion of implementation timing (system launch vs post-launch)
- Data restriction considerations for user-facing AI implementation

## Business Rules Documented

### PNL Component Calculation Rules

| Component | Data Source | Current Month Logic | Timing |
|-----------|-------------|-------------------|---------|
| External Revenue | Revenue Daily Detail | Actual + Forecast combination | Daily |
| Internal Revenue | Calculated | Based on contract type and external revenue | Daily |
| Payroll | Legion Payroll Summary | Actual overlay + Forecast | Daily |
| Claims | Account Summary | Actual amounts only (no forecast) | As posted |
| Parking Rents | Account Summary + Forecast | Greater of forecast vs actual | Daily |
| Other Expenses | Account Summary + Forecast | Greater of forecast vs actual by main account | Daily |
| PTEB | Calculated | Percentage of payroll | Monthly calculation |
| Insurance | Calculated | Percentage of payroll | Posted following month |

### Job Code Mapping Requirements

- **Scope**: 92 billable job codes in Power Bill requiring budget mapping
- **Challenge**: Job profiles in budget data don't directly correspond to job codes
- **Complexity**: Site-specific job profile naming conventions
- **Impact**: Affects accuracy of job-level budgeting and forecasting

## Action Items and Follow-ups

### Immediate Actions
1. **Catherine and Jim Meeting**: Schedule session with budget subject matter experts
2. **Job Mapping Documentation**: Research existing organizational mapping resources
3. **Sprint Story Refinement**: Finalize story details for upcoming sprint
4. **UI Mockup Reviews**: Complete designs for payroll navigation improvements

### Development Priorities
1. Legion schedule copy functionality (highest business value)
2. PNL calculation rule implementation
3. Stats tab adjustment calculations
4. Payroll UI improvements for per labor hour sites
5. Other revenue tab modernization

### Research and Analysis
1. **Budget Data Structure**: Deep dive into job profile taxonomy
2. **Performance Optimization**: Data flow scalability assessment
3. **AI Integration Planning**: User-facing assistant implementation strategy

## Technical Implementation Notes

### Database Integration Points
- **Budget Data Table**: `budget_data_tab_pr` with job_profile column
- **Account Summary**: Source for actual expense and claim data
- **Revenue Data Mart**: Daily revenue detail for external revenue
- **Legion Integration**: Payroll summary and schedule data
- **Power Bill**: Job code definitions and contract configurations

### Calculation Complexity
- **Daily Granularity**: All PNL calculations must work on per-day basis
- **Contract Type Variations**: Internal revenue calculations vary by contract type
- **Actual vs Forecast Logic**: Complex rules for combining actual and forecasted data
- **Percentage Calculations**: PTEB and insurance require dynamic percentage calculations

## Meeting Outcomes

### Decisions Made
1. **Job Mapping Approach**: Pursue expert consultation before manual mapping exercise
2. **PNL Calculation Rules**: Detailed business rules established for all components
3. **Sprint Priorities**: Five high-priority stories identified and refined
4. **UI Improvements**: Specific enhancements approved for payroll and other revenue tabs

### Next Steps
1. Expert consultation meeting scheduling
2. Sprint story implementation beginning
3. Continued architecture discussions for performance optimization
4. AI integration planning for future phases

## Related Documentation

- [Forecasting System Overview](../../systems/forecasting/forecasting-system-overview.md)
- [Forecasting Business Rules](../../business-rules/forecasting/)
- [Account Manager Workflows](../../user-processes/account-manager/)
- [Database Integration Technical Specifications](../../technical/database/)
- [Legion Integration Documentation](../../technical/integrations/)

## Code Validation Notes

**VERIFICATION NEEDED**: PNL calculation formulas and business rules require validation against Power Platform implementation in forecasting system codebase.

**VERIFICATION NEEDED**: Job code mapping logic and budget data table structure require validation against current database schema and Power Bill configuration.

**VERIFICATION NEEDED**: Legion integration patterns and payroll data handling require validation against existing integration code.

---

*This meeting transcript captures critical business decisions and technical requirements for the forecasting system development. All business rules and technical specifications should be validated against current system implementation before final implementation.*