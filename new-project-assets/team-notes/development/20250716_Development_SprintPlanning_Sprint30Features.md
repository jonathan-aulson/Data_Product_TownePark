---
title: "Towne Park Development - Sprint 30 Planning and Feature Specifications"
description: "Sprint planning session documenting Sprint 30 feature requirements, technical specifications, and story point estimations for forecasting system enhancements"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-16
version: 1.0
status: Draft
owner: "Development Team"
source_documents:
  - "20250716_Sprint Planning.docx"
systems:
  - Forecasting
  - Development Process
  - User Experience
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Software Development
  - User Experience Design
  - System Architecture
user_roles:
  - Development Team
  - Product Owner
  - Account Manager
tags:
  - sprint-planning
  - feature-development
  - user-experience
  - technical-specifications
  - story-estimation
---

# Towne Park Development - Sprint 30 Planning and Feature Specifications

## Meeting Overview

**Date**: July 16, 2025  
**Duration**: 1 hour 29 minutes  
**Meeting Type**: Sprint Planning  
**Sprint**: Sprint 30  
**Participants**: Jonathan Aulson, Andrew Scheuer, Cesar Figueroa, Christopher Thompson, Graham Olson, Javier Casas

## Sprint 30 Theme and Objectives

### Primary Focus
Sprint 30 emphasizes **usability enhancements** and **user experience improvements** across the forecasting system, with particular attention to streamlining data entry workflows and improving system responsiveness.

### Strategic Context
- **Timeline Pressure**: Final sprints before August deadline require focus on user-facing features
- **Refactoring Strategy**: Performance-impacting issues addressed immediately; cosmetic refactoring deferred until post-pilot period
- **Velocity Target**: Maintain high development velocity while ensuring quality deliverables

## Sprint 30 Story Breakdown

### Story 1: Copy Scheduled Hours from Legion
**Story Points**: 5  
**Type**: Usability Enhancement  
**Primary Users**: Account Managers

#### Requirements
- **One-Click Copy**: Button to copy scheduled hours from Legion to overwrite forecasted hours
- **Date Selection**: Apply to any dates that have scheduled data in Legion
- **Warning System**: Alert users before overwriting existing forecast data
- **Undo Functionality**: Allow reversal of copy action until save is executed
- **Salary Exclusion**: Do not copy salary job codes (not scheduled in Legion)

#### Technical Implementation
- **Frontend Focus**: Primarily frontend development with existing endpoint usage
- **Data Validation**: Exclude job codes with allocated salary costs
- **State Management**: Implement undo state until save confirmation
- **User Workflow**: Copy → Review → Save or Undo → Final Save

#### Acceptance Criteria
- Copy button available on payroll forecasting page
- Warning message displays before overwrite action
- Undo button available until save is executed
- Salary positions excluded from copy operation
- Multi-date selection supported for scheduled data

### Story 2A: Actual External Revenue with Adjustments
**Story Points**: 8  
**Type**: Data Integration Enhancement  
**Dependencies**: Story 2B (Forecasted External Revenue)

#### Requirements
- **Adjustment Integration**: Incorporate revenue adjustments into external revenue calculations
- **Data Source**: Revenue Daily Detail table with adjustments field
- **Actual vs Forecast**: Apply adjustments to actual revenue data only
- **PNL Consistency**: Ensure external revenue matches between Stats tab and PNL view

#### Technical Implementation
- **Database Integration**: Query Revenue Daily Detail for adjustments
- **Calculation Logic**: net_external_revenue = gross_external_revenue - adjustments
- **Frontend Display**: Show adjusted external revenue in statistics tab
- **Data Flow**: Adjustments applied at daily level, aggregated for monthly display

#### Data Structure
```sql
SELECT type, date_loaded, site, date, net_external_revenue
FROM revenue_daily_detail
WHERE site = [site_id] 
  AND date >= [date_range]
ORDER BY date_loaded DESC
```

### Story 2B: Forecasted External Revenue with Percentage Adjustments
**Story Points**: 13  
**Type**: Complex Calculation Enhancement  
**Priority**: Implement before Story 2A

#### Requirements
- **Percentage-Based Adjustments**: Apply budgeted adjustment percentage to forecasted revenue
- **Budget Integration**: Calculate adjustment rate from Budget Final table accounts 9419 and 9410
- **Annual Application**: Fixed percentage applied for entire year based on budget calculation
- **Initialization Process**: Part of 12-month forecast initialization

#### Technical Implementation
- **Database Changes**: Add adjustment percentage and value columns to Dataverse
- **Calculation Logic**: 
  ```
  adjustment_rate = account_9419_amount / account_9410_amount
  forecasted_external_revenue = (rate × statistics) × (1 - adjustment_rate)
  ```
- **DTO Updates**: Add adjustment properties to data transfer objects
- **Frontend Calculation**: Apply percentage during statistics-to-revenue calculation

#### Complexity Factors
- **Multi-Layer Impact**: Database, backend, frontend, and calculation engine changes
- **Data Coordination**: Ensure consistency across multiple system components
- **Testing Requirements**: Comprehensive testing due to calculation complexity

### Story 3: Payroll Navigation Enhancement
**Story Points**: 5  
**Type**: User Experience Enhancement  
**Focus**: Data Entry Efficiency

#### Requirements
- **Date Navigation**: Forward/backward navigation between dates in edit modal
- **Job Navigation**: Move between jobs/job groups within same date
- **Dirty State Management**: Track unsaved changes with warning system
- **Auto-Save Prevention**: Avoid performance issues from excessive save operations

#### Technical Implementation
- **Frontend Only**: No backend changes required with dirty state approach
- **State Tracking**: Implement existing dirty state pattern from other tabs
- **Warning System**: Reuse existing unsaved changes warning message
- **Navigation UI**: Add navigation controls to edit modal interface

#### User Workflow
1. Open payroll edit modal for specific date/job
2. Make edits to payroll data
3. Navigate to different date/job (dirty state tracked)
4. Attempt to close modal → Warning if unsaved changes
5. Save all changes or discard before closing

### Story 4: Other Revenue Tab Redesign
**Story Points**: 8  
**Type**: UI/UX Enhancement and Business Logic  
**Scope**: Complete tab restructuring

#### Requirements
- **Visual Consistency**: Remove dollar signs, apply blue highlighting like other tabs
- **No Budget/Actuals**: Pure forecast input form (no comparison features)
- **Column Reorganization**: Add client paid expense column, reorganize existing columns
- **Input Validation**: Enforce positive/negative number rules per column
- **Behavior Standardization**: Match other tabs' save/edit behavior

#### Column Specifications
- **Positive Enforced**: Most columns require positive numbers regardless of input
- **Negative Enforced**: Client paid expense, GPO fees, signing bonuses forced negative
- **Flexible**: Miscellaneous column allows positive or negative values
- **New Column**: Client paid expense (concept exists in billing system)

#### Technical Implementation
- **Frontend Changes**: UI redesign, validation logic, column reorganization
- **Backend Changes**: Add client paid expense column to Dataverse
- **Calculator Integration**: Create other revenue calculator for Internal Revenue
- **Validation Rules**: Implement number formatting and sign enforcement

### Story 5: PNL and Tab Reorganization
**Story Points**: 5  
**Type**: Navigation and UX Enhancement  
**Scope**: System-wide navigation changes

#### Requirements
- **Top-Level PNL**: Promote PNL to main navigation for corporate/regional users
- **Context Preservation**: Maintain site/period selection when navigating between sections
- **Tab Reordering**: Reorganize tabs in logical workflow order
- **Dual Access**: Keep PNL available both in forecast section and top-level navigation

#### Tab Order Specification
1. Parking Stats (first - primary data entry)
2. Payroll Expense
3. Parking Rates
4. Other Expense
5. Other Revenue (last - supplementary data)

#### Technical Implementation
- **Navigation Updates**: Add PNL to top-level navigation structure
- **State Management**: Implement context preservation across navigation
- **Tab Reordering**: Update tab sequence in forecast section
- **URL Routing**: Support direct linking to specific site/year combinations

## Additional Stories (Prepared for Mid-Sprint Addition)

### Story 6: Statistics Summary Card
**Story Points**: TBD (Deferred)  
**Reason**: Dependency on PNL architecture changes

#### Concept
- **Mini-PNL Dashboard**: Summary metrics displayed on statistics tab
- **Three-Month View**: Aggregated data for loaded time period
- **Real-Time Updates**: Reflect changes as statistics are modified
- **Deferred Rationale**: Requires calculated PNL architecture implementation first

### Story 7: Payroll Variance Table
**Story Points**: 5  
**Type**: Analytics Enhancement

#### Requirements
- **Period Filtering**: Selectable time window for variance analysis
- **Job Filtering**: Filter by jobs or job groups based on site configuration
- **Variance Calculation**: Compare actual to budget with red/green indicators
- **Summary View**: Tabular format showing scheduled, actual, forecast, budget, and variance

#### Technical Implementation
- **Frontend Component**: New variance table component below payroll chart
- **Data Aggregation**: Sum existing payroll data over selected period
- **Calculation Logic**: Frontend calculations using existing data
- **Visual Indicators**: Red/green arrows for variance display

## Development Strategy and Considerations

### Velocity and Timeline Management
- **Story Point Target**: ~50+ points for Sprint 30
- **Completion Strategy**: Focus on user-facing features before August deadline
- **Buffer Planning**: Prepare additional stories for mid-sprint addition if capacity allows
- **Risk Mitigation**: Prioritize stories with highest user impact

### Technical Debt and Refactoring
- **Immediate Priority**: Performance-impacting issues only
- **Deferred Refactoring**: Cosmetic improvements postponed until post-pilot
- **AI Tool Integration**: Continue leveraging AI tools for development efficiency
- **Component Refactoring**: Opportunistic refactoring during feature development (2-3 hour limit)

### Code Quality and Testing
- **Story Point Accuracy**: Ensure realistic estimation to avoid under-delivery
- **Testing Strategy**: Comprehensive testing for complex stories (external revenue adjustments)
- **Integration Testing**: Verify cross-component functionality
- **Performance Monitoring**: Track impact of new features on system performance

## Story Point Estimation Rationale

### 5-Point Stories (Simple/Frontend Focus)
- **Copy Scheduled Hours**: Primarily frontend with existing backend
- **Payroll Navigation**: Frontend-only with existing patterns
- **PNL Reorganization**: Navigation and UI changes
- **Payroll Variance Table**: Frontend component with existing data

### 8-Point Stories (Moderate Complexity)
- **Actual External Revenue**: Database integration with frontend changes
- **Other Revenue Redesign**: UI changes plus backend calculator development

### 13-Point Stories (High Complexity)
- **Forecasted External Revenue**: Multi-layer changes across entire stack
- **Coordination Complexity**: Multiple components requiring careful integration
- **Testing Overhead**: Extensive testing due to calculation complexity

## Risk Assessment and Mitigation

### Technical Risks
- **External Revenue Complexity**: 13-point story may impact sprint completion
- **Integration Dependencies**: Story 2B must complete before Story 2A
- **Performance Impact**: Monitor system performance with new features

### Mitigation Strategies
- **Early Tasking**: Complete technical design before development starts
- **Incremental Development**: Break complex stories into smaller tasks
- **Continuous Testing**: Test integration points throughout development
- **Fallback Planning**: Prepare to defer lower-priority stories if needed

### Resource Management
- **Team Capacity**: Leverage full team capacity with appropriate story distribution
- **Skill Matching**: Assign stories based on team member expertise
- **Collaboration**: Ensure knowledge sharing for complex implementations
- **Support Availability**: Plan for technical support and code review needs

## Success Metrics

### Delivery Metrics
- **Story Completion**: 100% of committed stories delivered
- **Quality Standards**: All stories meet acceptance criteria
- **Performance Baseline**: No degradation in system performance
- **User Feedback**: Positive response to usability enhancements

### Process Metrics
- **Estimation Accuracy**: Story points align with actual effort
- **Velocity Maintenance**: Sustain high development velocity
- **Technical Debt**: Minimal increase in technical debt
- **Team Satisfaction**: Maintain team morale and productivity

## Related Documentation

- [User Experience Design Standards](../../standards/)
- [Development Workflow Guidelines](../../user-processes/development/)
- [Forecasting System Architecture](../../systems/forecasting/)
- [Performance Monitoring Procedures](../../technical/operations/)

## Next Steps

### Immediate Actions
1. **Story Tasking**: Break down stories into specific development tasks
2. **Technical Design**: Finalize database schema and API changes
3. **Resource Allocation**: Assign stories to team members based on expertise
4. **Timeline Validation**: Confirm sprint timeline aligns with August deadline

### Development Coordination
1. **Daily Standups**: Monitor progress and address blockers quickly
2. **Integration Planning**: Coordinate dependencies between stories
3. **Testing Strategy**: Plan comprehensive testing approach
4. **Code Review**: Ensure quality standards maintained throughout sprint

### Stakeholder Communication
1. **Progress Updates**: Regular updates to product owner and stakeholders
2. **Demo Preparation**: Plan sprint demo to showcase completed features
3. **Feedback Collection**: Gather user feedback on usability enhancements
4. **Next Sprint Planning**: Begin preparation for Sprint 31 requirements