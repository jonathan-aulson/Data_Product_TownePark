---
title: "Towne Park Forecasting - Backlog Grooming Team Notes"
description: "Development team notes from forecasting backlog grooming session covering feature prioritization, phase planning, and technical implementation decisions"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-06-26
version: 1.0
status: Draft
owner: "Development Team"
source_documents:
  - "20250626_Forecasting_BacklogGrooming_Processed.md"
systems:
  - Forecasting
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Parking Statistics
  - Payroll Expense
  - Other Expenses
  - Other Revenue
  - Profit & Loss View
  - Field Operations
user_roles:
  - District Manager
  - Account Manager
  - Corporate Finance
tags:
  - team-notes
  - development
  - backlog-grooming
  - feature-prioritization
  - phase-planning
  - forecasting
  - meeting-notes
---

# Towne Park Forecasting - Backlog Grooming Team Notes

## Meeting Overview

**Meeting Date**: 2025-06-26  
**Meeting Type**: Backlog Grooming Session  
**Primary System**: Forecasting  
**Document Status**: Development Team Notes  

### Participants
- **Adam Suarez** - Product Owner
- **Jonathan Aulson** - Business Analyst  
- **Christopher Thompson** - Development Team

### Meeting Objectives
- Prioritize features for upcoming pilot deployment
- Identify which features can be deferred to Phase Two
- Finalize technical implementation approaches
- Address project risks and timeline concerns

## Executive Summary

This backlog grooming session focused on finalizing the feature set for the Forecasting system pilot deployment. The team made critical decisions about feature prioritization, with Internal Revenue on P&L with management agreements identified as the highest priority item. Several features were strategically deferred to Phase Two to ensure pilot success, including consistent variance symbols and district-level statistics aggregation.

**Key Outcomes:**
- Clear Phase One vs Phase Two feature separation established
- Technical implementation approaches confirmed
- Project risks identified and documented
- Timeline considerations addressed

## Feature Prioritization Decisions

### Phase One - Pilot Critical Features

#### 1. Internal Revenue on P&L with Management Agreements
**Priority Level**: Highest  
**Status**: Approved for immediate implementation  
**Stakeholder Decision**: Adam Suarez (Product Owner)  
**Business Justification**: Core functionality required for pilot deployment  

**Implementation Notes:**
- Identified as the "big one" that must be completed
- Targeted for next sprint implementation
- Integration required with Budget Data systems
- Critical path item for pilot success

**Technical Requirements:**
- Management agreement calculation logic
- P&L integration points
- Internal revenue rate handling
- Budget data integration

**Open Issues:**
- Handling of adjustments on internal revenue rates requires further investigation
- **Action Item**: Adam Suarez to investigate adjustment handling approach

#### 2. Actuals for Statistics
**Priority Level**: High  
**Status**: Approved for Phase One  
**Integration Point**: EDW (Enterprise Data Warehouse)  

**Implementation Scope:**
- Actual data display for statistics features
- EDW integration for data retrieval
- Site-level statistics focus (district-level deferred to Phase Two)

#### 3. Budget for Other Expenses and Actuals
**Priority Level**: High  
**Status**: Approved for Phase One  
**Integration Points**: EDW, Budget Data  

**Implementation Scope:**
- Budget data integration for Other Expenses tab
- Actuals data display functionality
- Data validation and error handling

### Phase Two - Post-Pilot Features

#### 1. Consistent Variance Symbols Implementation
**Status**: Deferred - Non-critical for pilot  
**Rationale**: UI enhancement that doesn't impact core functionality  

**Team Discussion:**
- **Jonathan Aulson**: "I think it doesn't make sense to implement this unless we do it across all tabs. We wouldn't want just stats or just other expenses to have it, and the others have like black and red."
- **Adam Suarez**: "I would agree. I think some of these are more important to just get ready for the pilot."

**Implementation Requirements (Future):**
- Consistent green/red variance symbols across all tabs
- Unified UI/UX approach
- Cross-tab standardization

#### 2. District-Level Statistics Aggregation
**Status**: Deferred to Phase Two  
**Stakeholder Decision**: Adam Suarez (Product Owner)  

**Future Implementation Approach:**
- Monthly roll-up functionality for District Managers
- Aggregate statistics across all sites in a district
- Similar approach to summary P&L but for statistics
- Filter capability by district for comprehensive view

**Adam Suarez's Vision**: "A DM could go in, filter on every site in their district and see here's the total occupancy in my district, here's the total drive-in in my district, and then you could do that same comparison to the aggregate of the budget for those sites."

#### 3. Additional Phase Two Features
- **P&L Cost Centers**: Advanced cost center functionality
- **Dashboards**: Executive and operational dashboards
- **Exception Reporting**: Automated variance and exception alerts
- **Mass Site Changes**: Bulk update functionality for multiple sites
- **What-If Scenario Functionality**: Scenario planning capabilities

## Technical Implementation Decisions

### Version Control and Snapshot Functionality
**Status**: Implementation confirmed  
**Technical Owner**: Jason's team  
**Dependencies**: Data schema conversion completion  

**Implementation Approach:**
- Snapshot process for version control
- Data locking functionality during updates
- Schema standardization across all data sources

**Adam Suarez's Update**: "Assuming Jason's team successfully converts all the data to the same schema, that snapshot process should be almost already set up."

**Next Steps:**
- Final confirmation meeting with Jason's team
- Schema conversion validation
- Testing of snapshot functionality

### Payroll Forecasting Implementation
**Integration Point**: Workday  
**Data Scope**: Three months of payroll data  
**Implementation Approach**: Job Family groupings  

**Technical Details:**
- Job Family level aggregation for most sites
- Job Code level detail for PLH (Per Labor Hour) sites
- Workday integration for Job Family definitions
- Historical payroll data analysis (3-month window)

**Dependencies:**
- Workday Job Family implementation timeline
- Data mapping between systems
- Integration testing requirements

## Project Risk Management

### Personnel Availability Risk
**Risk Owner**: Adam Suarez  
**Impact Level**: Medium  
**Timeline**: July 29th timeframe  

**Risk Details:**
- Adam Suarez will be out for 2-3 weeks for paternity leave
- Timing coincides with critical development phase
- Amy Sowells is aware of the situation

**Mitigation Strategies:**
- Front-load critical decisions before July 29th
- Ensure clear documentation of all requirements
- Establish backup decision-making authority
- Plan sprint schedules around availability

### Integration Dependencies
**Risk Category**: Technical Dependencies  
**Impact Level**: High  

**Identified Dependencies:**
1. **EDW Integration**: Required for actuals data
2. **Workday Integration**: Critical for Job Family definitions
3. **Budget Data Integration**: Essential for P&L functionality
4. **Schema Conversion**: Prerequisite for snapshot functionality

**Mitigation Approach:**
- Early integration testing
- Fallback data sources identification
- Phased integration approach
- Regular dependency status reviews

## Development Workflow Decisions

### Sprint Planning Approach
- Internal Revenue on P&L prioritized for immediate sprint
- Actuals for Statistics as secondary priority
- Budget/Other Expenses as tertiary priority
- Phase Two features explicitly excluded from current sprints

### Quality Assurance Strategy
- Pilot-focused testing approach
- Core functionality validation priority
- User acceptance testing with limited feature set
- Post-pilot feature validation for Phase Two items

### Stakeholder Communication Plan
- **July 18th**: Jonathan Aulson to present roadmap at steering committee
- Regular updates on Phase One progress
- Phase Two planning to begin post-pilot
- Risk communication regarding Adam's availability

## Integration Points and Dependencies

### Enterprise Data Warehouse (EDW)
**Purpose**: Actuals data retrieval  
**Features Supported**: Statistics, Other Expenses  
**Implementation Priority**: High  

### Workday Integration
**Purpose**: Job Family definitions and payroll data  
**Features Supported**: Payroll forecasting  
**Implementation Priority**: Medium  
**Dependencies**: Workday Job Family implementation timeline

### Budget Data Integration
**Purpose**: Budget vs actual comparisons  
**Features Supported**: Internal Revenue, Other Expenses  
**Implementation Priority**: High  

## Decision Log

| Decision ID | Date | Decision | Stakeholder | Impact | Status |
|-------------|------|----------|-------------|---------|---------|
| D001 | 2025-06-26 | Internal Revenue on P&L with management agreements prioritized as highest priority | Adam Suarez | High | Approved |
| D002 | 2025-06-26 | Consistent variance symbols implementation deferred as non-critical for pilot | Adam Suarez | Low | Approved |
| D003 | 2025-06-26 | Site-level statistics for Phase One, district-level aggregation for Phase Two | Adam Suarez | Medium | Approved |
| D004 | 2025-06-26 | Version control/snapshot process implementation confirmed | Adam Suarez | High | Approved |

## Action Items and Next Steps

### Immediate Actions (Next Sprint)
1. **Adam Suarez**: Investigate handling of adjustments on internal revenue rates
2. **Development Team**: Begin implementation of Internal Revenue on P&L
3. **Jason's Team**: Complete data schema conversion for snapshot functionality
4. **Jonathan Aulson**: Prepare roadmap presentation for July 18th steering committee

### Medium-Term Actions (2-4 weeks)
1. Implement Actuals for Statistics functionality
2. Complete Budget/Other Expenses integration
3. Finalize version control/snapshot testing
4. Validate EDW integration points

### Long-Term Planning (Phase Two)
1. Design district-level statistics aggregation
2. Plan consistent variance symbols implementation
3. Scope P&L cost centers functionality
4. Define dashboard requirements

## Related Documentation

### Forecasting System Documentation
- [Forecasting System Overview](../../systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md)
- [Forecasting Data Sources Technical Specification](../../technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md)
- [Forecasting Actuals Display Business Rules](../../business-rules/forecasting/20250723_Forecasting_ActualsDisplay_BusinessRules.md)
- [Forecasting Actuals Display User Process](../../user-processes/account-manager/20250723_Forecasting_ActualsDisplay_UserProcess.md)

### Development Process Documentation
- [Daily Scrum Technical Issues Resolution Guide](20250723_DailyScrum_TechnicalIssues_ResolutionGuide.md)
- [Sprint Planning Process Guide](20250723_SprintPlanning_ProcessGuide_AIAssisted.md)

### Business Rules and Requirements
- [Forecasting UAT Process Business Rules](../../business-rules/forecasting/20250724_Forecasting_UATProcess_BusinessRules.md)

## Glossary

| Term | Definition | Context |
|------|------------|---------|
| PLH | Per Labor Hour (sites) | Contract type requiring detailed job code level payroll tracking |
| EDW | Enterprise Data Warehouse | Central data repository for actual operational data |
| P&L | Profit and Loss | Financial statement view within forecasting system |
| DM | District Manager | User role responsible for multiple site oversight |
| Job Family | Workday grouping of similar job roles | Used for payroll forecasting aggregation |
| Snapshot | Version control mechanism | Allows point-in-time data preservation and comparison |

## Code Validation Report

**Last Validated**: 2025-07-24  
**Validation Scope**: Limited - Meeting notes with minimal technical implementation details  

### Validation Summary
- ✅ **Verified Elements**: 0 items (no specific code implementations discussed)
- ⚠️ **Discrepancies Found**: 0 items 
- ❓ **Incomplete Documentation**: 2 items require future validation
- 🔍 **Requires Review**: 3 items need stakeholder verification

### Validation Opportunities Identified
1. **Version Control/Snapshot Implementation**: Technical details pending from Jason's team
2. **EDW Integration Specifications**: Actual implementation details not provided in meeting
3. **Workday Job Family Integration**: Technical approach requires validation against actual Workday configuration

### Validation Limitations
- **Source Document Type**: Meeting notes rather than technical specifications
- **Implementation Stage**: Features discussed are in planning phase, not yet implemented
- **Code Availability**: No specific code references provided in source material

### Recommendations for Future Validation
1. Validate snapshot functionality implementation against actual Power Platform workflows
2. Cross-reference EDW integration approach with existing data integration patterns
3. Verify Workday Job Family definitions against actual Workday configuration
4. Validate Internal Revenue calculation logic against existing billing system implementations

**Note**: This document captures planning and decision-making discussions rather than implemented functionality, limiting immediate code validation opportunities. Future validation should occur as features move from planning to implementation phases.