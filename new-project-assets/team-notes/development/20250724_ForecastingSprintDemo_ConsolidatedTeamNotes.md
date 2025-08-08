---
title: "Towne Park Forecasting - Sprint Demo Consolidated Team Notes"
description: "Comprehensive team notes consolidating forecasting system sprint demo outcomes from March-April 2025, covering system development decisions, functional specifications, and stakeholder feedback"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-05-13
version: 1.0
status: Active
owner: "Development Team"
source_documents:
  - "20250513_Master - Forecasting Sprint Demo.md"
  - "Forecasting Sprint Demo - 20250313_155711-Meeting Recording (Sprint 20 Demo)"
  - "Forecasting Sprint Demo - 20250328_163415-Meeting Recording (Sprint 21 Demo)"
  - "Forecasting Sprint Demo - 20250410_165037-Meeting Recording (Sprint 22 Demo)"
  - "Forecasting Sprint Demo - 20250425_173826-Meeting Recording (Sprint 23 Demo)"
systems:
  - Forecasting
  - Billing
components:
  - Frontend
  - Backend
  - Integration
business_domains:
  - Sprint Demos
  - System Development
  - User Interface Design
  - Data Integration
  - Project Management
user_roles:
  - Account Manager
  - District Manager
  - Billing Admin
  - Product Owner
  - Business Analyst
  - Developer
tags:
  - team-notes
  - development
  - sprint-demos
  - forecasting
  - system-development
  - stakeholder-feedback
  - project-milestones
---

# Towne Park Forecasting - Sprint Demo Consolidated Team Notes

## Purpose

This document consolidates comprehensive team notes from Towne Park Forecasting system sprint demonstrations conducted from March through April 2025 (Sprints 20-23). These sessions documented critical system development decisions, functional specifications, stakeholder feedback, and project milestone achievements that shaped the forecasting system's evolution and implementation approach.

## Sprint Demo Overview

### Sprint Demonstration Series Summary
**Coverage Period:** March 13 - April 25, 2025  
**Sprint Range:** Sprint 20 through Sprint 23  
**Total Documentation:** 4 comprehensive sprint demonstrations  
**Primary Focus:** Forecasting system development with billing system support  
**Key Stakeholders:** Jim Boyer, Amy Sowells, Adam Suarez, Jonathan Aulson, Ryan Esposito, Chris Moore, Jeremy Smith, Tia Gonia

### Sprint Progression and Achievements

#### Sprint 20 (Demo: March 13, 2025)
**Key Achievements:**
- Implemented Workday-driven role assignments for Account Manager data visibility
- Developed Account Manager access to billing statements with filtering
- Created Unit Accounts/Statistics batch functionality for Great Plains integration
- Established resend statement functionality with dual options
- Implemented zero amount line item handling
- Completed complex validation calculation requirements

**Major Decisions:**
- Account Managers restricted to assigned sites/customers only
- Role-based access control via Microsoft Entra ID and Workday integration
- Neutral color highlighting for edited fields (avoiding red/green confusion)

#### Sprint 21 (Demo: March 28, 2025)
**Key Achievements:**
- Enhanced PDF invoice template to match HTML version
- Implemented SmartConnect API concurrency improvements (serial payloads)
- Developed forecasting interface with site selection and time period controls
- Created parking statistics tab with budget data integration planning
- Established data persistence and session management for forecast inputs

**Major Decisions:**
- Daily granularity as most granular forecasting input level
- One-year historical view and one-year forward forecasting capability
- Percentage display format preferred over decimal format
- Save confirmation dialog improvements needed

#### Sprint 22 (Demo: April 10, 2025)
**Key Achievements:**
- Implemented automatic role assignment based on Workday job titles
- Added Self Aggregator and Valet Aggregator columns to parking statistics
- Developed rates tab with budget data integration
- Created actual data display with orange highlighting
- Established time period granularity control framework

**Major Decisions:**
- Parking statistics input restricted to daily level only for data integrity
- Variance display thresholds needed to avoid overwhelming users
- Account Manager control over parking rates questioned - leaning toward system-driven approach
- Workday job title governance identified as critical need

#### Sprint 23 (Demo: April 25, 2025)
**Key Achievements:**
- Completed budget data integration from EDW Budget Final table
- Developed payroll tab with Legion integration for scheduled/actual hours
- Created Other Internal Revenue tab with monthly input granularity
- Implemented collapsible sidebar widgets for improved screen real estate
- Established P&L view preview for Sprint 24

**Major Decisions:**
- Blue highlighting consensus for editable/forecasted cells
- Other Internal Revenue limited to monthly input only
- Credits entered as negative values, revenue as positive
- UAT planning finalized for May 12th milestone

## Critical Development Decisions

### Decision: Daily-Only Input for Parking Statistics
**Sprint:** 22  
**Date:** April 10, 2025  
**Decision Owners:** Development Team, Stakeholders  
**Status:** Approved

**Decision Details:**
Despite extensive discussion about weekly input for outer months, the team decided to restrict parking statistics input to daily level only to maintain data integrity and avoid accidental overwrites of detailed data.

**Rationale:**
- **Data Integrity:** Prevents accidental overwriting of detailed daily data when editing at higher granularity levels
- **Consistency:** Maintains uniform input approach across all forecasting periods
- **Accuracy:** Avoids estimation errors from weekly or monthly averaging
- **User Safety:** Eliminates risk of unintended data loss from granularity confusion

**Implementation Requirements:**
- Input allowed only at daily level for all parking statistics
- Viewing supported at weekly, monthly, and quarterly aggregation levels
- Time period granularity controls for display only, not input
- Clear user guidance about input restrictions

**Stakeholder Input:**
- **Jim Boyer:** Emphasized accuracy concerns with daily input for outer months
- **Ryan Esposito:** Suggested dynamic input levels (daily for 60-90 days, then weekly)
- **Amy Sowells:** Raised possibility of unlocking weekly input for statistics
- **Chris Moore:** Questioned accuracy gain of daily vs. weekly for full year

### Decision: System-Driven Parking Rates Approach
**Sprint:** 22  
**Date:** April 10, 2025  
**Decision Owners:** Product Owners, Development Team  
**Status:** Under Consideration

**Decision Details:**
Strong consensus emerged that Account Manager forecasting of individual parking rates is problematic and inaccurate, with preference for more system-driven rates based on actuals and budget data.

**Current Issues with AM Rate Forecasting:**
- **Accuracy Problems:** Posted rates vs. actual netted rates (discounts, comps) create forecasting errors
- **Complexity:** Account Managers typically enter standard rates without considering discounts
- **Data Quality:** Budget data might be more reliable than AM input for rate forecasting
- **Consistency:** Similar to payroll rates, parking rates could be more system-driven

**Proposed Approach:**
- Utilize historical actual rates from invoice data or EDW
- Integrate budget rate data as baseline
- Minimize Account Manager input requirements for rates
- Focus AM effort on statistics and payroll forecasting where local knowledge adds value

**Next Steps:**
- Finalize source of actual rate data (Invoice vs. EDW)
- Develop system-driven rate calculation methodology
- Determine minimal AM input requirements for rate adjustments
- Implement rate forecasting automation similar to payroll rate approach

### Decision: UI Color Coding Standardization
**Sprint:** 23  
**Date:** April 25, 2025  
**Decision Owners:** UX Team, Stakeholders  
**Status:** Approved

**Decision Details:**
Consensus reached on blue highlighting for editable/forecasted cells across all forecasting tabs, replacing inconsistent color usage.

**Color Strategy Rationale:**
- **Accessibility:** Blue works well for color-blind users when used consistently
- **Dark Mode Compatibility:** Blue highlighting functions in both light and dark modes
- **User Psychology:** Avoids green/red associations with "good/bad" that could confuse users
- **Consistency:** Single color approach eliminates confusion across different tabs

**Implementation Requirements:**
- Standardize blue highlighting across all forecasting tabs
- Remove inconsistent green highlighting from Other Revenue tab
- Ensure color contrast meets accessibility standards
- Test color visibility in both light and dark mode interfaces

**Stakeholder Feedback:**
- **Ryan Esposito:** Emphasized need for uniform color coding
- **Jeremy Smith:** Noted green/red typically means "good/bad" in their context
- **Tia Gonia:** Provided accessibility guidance for color-blind users
- **Jonathan Aulson:** Confirmed blue as preferred consistent approach

## Functional Specification Decisions

### Forecasting Input Granularity Framework

#### Parking Statistics Input Rules
**Granularity:** Daily level only  
**Rationale:** Data integrity and accuracy requirements  
**Viewing Options:** Daily, Weekly, Monthly, Quarterly aggregation  
**Time Horizon:** Up to one year forward on rolling basis  
**Historical Access:** One year of read-only historical data

**Specific Input Requirements:**
- **Current/Next Month (0-90 days):** Daily granularity input expected and practical
- **Outer Months (>90 days):** Daily input maintained despite usability concerns
- **Model Integration:** Mike Foy's forecasting model provides smart pre-population
- **Event Adjustments:** Account Managers adjust model predictions for known events

#### Payroll Input Specifications
**Granularity:** Weekly preferred, daily possible  
**Input Methods:** Hours or cost with percentage slider adjustments  
**Data Sources:** Legion scheduled/actual hours integration  
**Budget Integration:** Red line budget display with green bar forecasts  
**Job Family Breakdown:** Individual job family input capability

#### Other Internal Revenue Rules
**Granularity:** Monthly level only  
**Time Horizon:** 12 months forward  
**Input Categories:** GPO Fees, Billable Expenses, Non-Billable Expenses, Credits  
**Value Handling:** Credits as negative, revenue as positive for net calculation  
**Rationale:** Monthly frequency sufficient for revenue planning accuracy

#### Rates Forecasting Approach
**Current Implementation:** Monthly input by Account Managers  
**Future Direction:** System-driven based on actuals and budget  
**Data Sources:** Invoice data, EDW, budget tables  
**AM Role:** Minimal input, focus on exception adjustments  
**Integration:** Rate card implementation for revenue calculations

### User Interface Specification Decisions

#### Main Interface Layout
**Navigation:** Tab-based workflow (Parking Stats, Rates, Payroll, Other Revenue, P&L)  
**Sidebar Widgets:** Site selection, view options, comparison dataset selection  
**Collapsible Design:** Widgets collapse to save screen real estate  
**State Management:** User preferences saved and persistent

#### Data Display Standards
**Forecast Highlighting:** Blue background for editable/forecasted cells  
**Actual Data Display:** Orange highlighting for historical actual data  
**Budget Comparison:** Toggle button to show/hide comparison dataset  
**Variance Indicators:** Conditional formatting with configurable thresholds

#### Save and Session Management
**Explicit Saving:** Users must save before navigation to prevent data loss  
**Session Persistence:** Data retained during input session  
**Offline Capability:** Brief connectivity loss doesn't prevent saving  
**Warning Prompts:** Alert users about unsaved changes before navigation

### Integration Architecture Decisions

#### Workday Integration for Role-Based Access
**Purpose:** Source of truth for user role assignments and site responsibilities  
**Data Flow:** Workday → Dataverse → Microsoft Entra ID app roles  
**Automatic Assignment:** Role assignment based on job titles and site associations  
**Governance Concern:** Need for controlled job title creation/modification in Workday

**Implementation Details:**
- Job titles drive role assignment (AM, DM, etc.)
- Site associations determine data access scope
- RLS BI security implementation for data filtering
- Automatic role updates based on Workday changes

#### EDW Integration for Budget and Actual Data
**Budget Source:** Budget Final table in EDW  
**Data Types:** Statistics, rates, payroll, P&L budget data  
**Actual Data Sources:** Statistics actuals, payroll rates (planned)  
**Integration Timing:** Real-time for budget, batch for actuals  
**Data Spreading:** Smart distribution across time periods using model predictions

#### Legion Integration for Payroll Data
**Data Types:** Scheduled and actual hours by job family  
**Integration Method:** Real-time API connectivity  
**Display Format:** Left side Legion data, right side budget/forecast  
**Calculation Support:** Hours and cost calculations with rate integration

## Project Management and Milestone Decisions

### UAT Planning and Execution Strategy
**Target Date:** May 12, 2025 (updated from May 7-12 range)  
**Milestone:** Functional forecasting UAT for Milestone B  
**Scope:** Complete forecasting input functionality with budget data integration

**Participant Structure:**
- **Core Testing Team:** Adam Suarez, Amy Sowells, Jonathan Aulson
- **Broader Feedback Group:** RFDs, select District Managers, Jim Boyer
- **Account Manager Representatives:** Select group for interface and usability feedback

**UAT Approach:**
1. **Kickoff Session:** Core team introduction and training
2. **Broader Group Session:** Introduction for extended stakeholder group
3. **Independent Exploration:** Self-guided testing and feedback collection
4. **Feedback Consolidation:** Structured feedback collection and analysis

### Project Timeline and Scope Decisions

#### SOW Extension Approval
**Original Timeline:** Through July 3, 2025  
**Projected Completion:** October 2025  
**Extension Status:** Approved by Amy Sowells and Adam Suarez  
**Next Steps:** Jonathan Aulson to initiate change request documentation

#### Support Agreement Planning
**Need Confirmed:** Ongoing support required post-launch  
**Duration Proposal:** ~2 years (align with billing support agreement ending November 2027)  
**Flexibility:** Monthly cancellation option  
**Quote Required:** Jonathan Aulson to provide support pricing

#### Milestone B Significance
**Timeline Position:** Halfway point of development cycle  
**Completion Target:** End of Sprint 24  
**UAT Integration:** Milestone B functionality testing in May 2025  
**Project Momentum:** Critical milestone for project trajectory assessment

## Technical Architecture Decisions

### Data Storage and Management
**Primary Database:** Dataverse for application data storage  
**Forecast Data Schema:** Separate tables from EDW source data  
**Integration Platform:** Power Automate for business logic and data flows  
**Session Management:** User session storage for temporary data persistence

### Security and Access Control
**Authentication:** Microsoft Entra ID with app role validation  
**Authorization:** Role-based access with data scoping  
**Data Filtering:** Automatic filtering based on user role and site assignments  
**Audit Requirements:** User action tracking and data modification logging

### Performance and Scalability
**Concurrency Handling:** Serial payload processing for Great Plains integration  
**Data Chunking:** Batch processing for large data volumes (1000 records/chunk)  
**Response Time:** Optimized for daily data views and real-time filtering  
**Error Handling:** Comprehensive error management with email notifications

## Stakeholder Feedback Integration

### Jim Boyer (Executive Stakeholder)
**Key Contributions:**
- Emphasized move beyond digitizing legacy Excel to genuine process improvement
- Highlighted data governance concerns with Workday job title management
- Provided guidance on forecasting model integration and smart pre-population
- Advocated for time savings and accuracy improvements for Account Managers

**Critical Feedback:**
- Parking statistics table layout too busy - needs thematic grouping
- Daily input for outer months may be impractical and inaccurate
- Need for intelligent spreading of aggregated input using historical patterns
- Importance of aligning forecasting with future budgeting processes

### Amy Sowells (Product Owner)
**Key Contributions:**
- Confirmed need for ongoing support agreement post-launch
- Approved SOW extension and project timeline adjustments
- Provided UAT planning guidance and participant selection
- Emphasized importance of Account Manager email address update capability

**Critical Decisions:**
- Supported weekly input possibility for statistics (later overruled for MVP)
- Confirmed Account Managers typically enter standard rates without discount consideration
- Approved moving forward with change request documentation
- Validated UAT approach and timeline for Milestone B

### Adam Suarez (Product Owner)
**Key Contributions:**
- Provided detailed feedback on save confirmation dialog improvements
- Clarified Other Internal Revenue field definitions and usage
- Supported percentage display format over decimal format
- Contributed to Account Manager selection for UAT participation

**Technical Guidance:**
- Suggested "Save" button addition to confirmation dialog
- Recommended renaming columns for clarity (Credits/Other Revenue)
- Provided examples for "Show Guide" content development
- Confirmed monthly input sufficiency for Other Internal Revenue

### Ryan Esposito (Operations Stakeholder)
**Key Contributions:**
- Advocated for dynamic input levels (daily for 60-90 days, then weekly)
- Emphasized need for uniform color coding across interface
- Provided practical guidance on rate forecasting accuracy issues
- Supported historical data usage over Account Manager rate input

**Operational Insights:**
- Percentage input generally preferred by operations teams
- Monthly input sufficient for Other Internal Revenue items
- Variance thresholds needed to avoid overwhelming users with orange highlighting
- Historical actual rates more reliable than Account Manager forecasts

### Chris Moore (Finance Stakeholder)
**Key Contributions:**
- Highlighted accuracy issues with posted rates vs. actual netted rates
- Questioned accuracy gain of daily vs. weekly input for full year
- Supported system-driven approach for rate forecasting
- Provided financial perspective on forecasting accuracy requirements

### Jeremy Smith (Change Management)
**Key Contributions:**
- Provided accessibility guidance for color choices and user experience
- Confirmed "Show Guide" content development responsibility
- Scheduled rollout planning meetings for second week of May
- Emphasized user psychology considerations for color coding

### Tia Gonia (User Experience)
**Key Contributions:**
- Provided accessibility guidance for color-blind users
- Questioned daily/weekly input needs for specific revenue types
- Requested undo/redo functionality availability
- Contributed to user interface usability discussions

## Future Considerations and Open Questions

### Technical Enhancements for Future Versions
**Intelligent Spreading Algorithm:** System capability to spread weekly/monthly input across days using historical patterns and seasonality (Version 2 consideration)

**Advanced Variance Analysis:** Dedicated variance analysis tab with comprehensive comparison capabilities and configurable threshold management

**Enhanced Copy/Paste Functionality:** Data entry efficiency improvements with fill-down and copy across rows/columns capabilities

**Undo/Redo System:** Application-level undo/redo functionality beyond standard browser capabilities

### Business Process Improvements
**Rate Card Integration:** Complete implementation for revenue calculations in parking statistics with automated rate application

**Payroll Rate Automation:** Full automation of payroll rate forecasting using EDW data sources rather than Account Manager input

**Advanced Model Integration:** Enhanced integration with Mike Foy's forecasting model for smarter pre-population and seasonal adjustments

**Budgeting Process Alignment:** Integration of forecasting tool with future budgeting processes, treating budget as "extended forecast"

### User Experience Enhancements
**Content Development for Show Guide:** Collaboration with Change Management team to develop comprehensive contextual help content

**Advanced Filtering Capabilities:** Enhanced organizational and customer filters for P&L view with multi-level hierarchy support

**Mobile Responsiveness:** Interface optimization for mobile and tablet usage by field-based Account Managers

**Accessibility Improvements:** Enhanced accessibility features beyond color coding, including screen reader optimization

### Integration and Data Improvements
**Real-Time EDW Actuals:** Complete integration of actual statistics data from EDW for real-time variance analysis

**Enhanced Workday Integration:** Higher-level role visibility (Regional Managers, VPs) and improved data governance

**Legion Integration Expansion:** Enhanced payroll data integration with additional job family details and cost center mapping

**Great Plains Integration Optimization:** Further improvements to batch processing and error handling for financial data transmission

## Related Documentation

### Systems Documentation
- [Forecasting System Comprehensive Master Overview](../../systems/forecasting/20250718_Forecasting_SystemOverview_ComprehensiveMaster.md)
- [Forecasting System Master Architecture](../../systems/forecasting/20250716_Forecasting_SystemOverview_MasterArchitecture.md)

### User Process Documentation
- [Account Manager Forecasting Workflows](../../user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md)
- [District Manager Forecasting Workflow User Guide](../../user-processes/district-manager/20250723_DistrictManager_ForecastingWorkflow_UserGuide.md)

### Business Rules Documentation
- [Forecasting Business Rules and Development Decisions](../../business-rules/forecasting/20250718_Forecasting_BusinessRules_DevelopmentDecisions.md)
- [Forecasting Calculations and Validations](../../business-rules/forecasting/20250718_Forecasting_BusinessRules_CalculationsAndValidations.md)

### Technical Specifications
- [Forecasting Technical Architecture and API Design](../../technical/backend/20250718_Forecasting_TechnicalArchitecture_APIDesign.md)
- [Forecasting Database Integration](../../technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md)

### Team Notes and Project Management
- [Daily Scrum Team Notes](20250718_Development_DailyScrum_TeamNotes.md)
- [Sprint Planning Project Management](../20250718_Development_SprintPlanning_ProjectManagement.md)

## Code Validation Report
**Last Validated:** 2025-07-24  
**Validation Scope:** Sprint Demo Outcomes and Development Decisions  
**Code Copy Date:** Current as of validation date

### Validation Summary
- ✅ **Verified Elements:** 0 items (sprint demo documentation rather than implementation details)
- ⚠️ **Discrepancies Found:** 0 items
- ❓ **Incomplete Documentation:** 0 items  
- 🔍 **Requires Review:** Implementation validation needed once sprint outcomes are coded

### Validation Limitations
- Sprint demo documentation captures decisions and requirements rather than implementation details
- Code validation will be required once sprint demo outcomes are implemented in system
- Future validation needed against actual forecasting system implementation
- UAT results validation pending completion of May 2025 testing milestone

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-24 | Documentation Team | Initial creation from consolidated sprint demo documentation, preserving all development decisions, stakeholder feedback, and project milestone information with enhanced structure and cross-references |