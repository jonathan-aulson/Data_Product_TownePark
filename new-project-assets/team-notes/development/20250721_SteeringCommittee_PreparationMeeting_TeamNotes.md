---
title: "Towne Park Forecasting - Steering Committee Preparation Meeting"
description: "Comprehensive team meeting notes covering steering committee presentation preparation, risk assessment, project status review, and infrastructure planning for the forecasting system pilot"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-21
version: 1.0
status: Complete
owner: "Jonathan Aulson"
source_documents:
  - "20250721_Backlog Grooming_ Forecasting (2).docx"
systems:
  - Forecasting
  - Infrastructure
  - Security
components:
  - Frontend
  - Backend
  - Database
  - Integration
  - Monitoring
business_domains:
  - Project Management
  - Risk Management
  - User Access Control
  - Infrastructure Planning
user_roles:
  - Project Manager
  - Account Manager
  - Billing Admin
  - District Manager
  - DOO (Director of Operations)
meeting_details:
  date: "2025-07-21"
  time: "6:00 PM"
  duration: "16 minutes 17 seconds"
  type: "Steering Committee Preparation"
  participants:
    - "Jonathan Aulson (Project Manager)"
    - "Jim Boyer (Technical Lead)"
    - "Amy Sowells (Business Lead)"
    - "Michael Foy (Business Stakeholder)"
tags:
  - meeting-notes
  - steering-committee
  - project-status
  - risk-management
  - infrastructure
  - user-access
  - pilot-preparation
---

# Towne Park Forecasting - Steering Committee Preparation Meeting

## Meeting Overview

**Date**: July 21, 2025  
**Time**: 6:00 PM  
**Duration**: 16 minutes 17 seconds  
**Meeting Type**: Steering Committee Preparation Session  
**Primary Purpose**: Review presentation materials, assess project risks, and confirm readiness for steering committee meeting

## Participants

| Name | Role | Organization |
|------|------|--------------|
| Jonathan Aulson | Project Manager | Towne Park |
| Jim Boyer | Technical Lead | Towne Park |
| Amy Sowells | Business Lead | Towne Park |
| Michael Foy | Business Stakeholder | Towne Park |

## Key Agenda Items Discussed

### 1. Job Profile Configuration Status Update

**Status**: In Progress  
**Owner**: Amy Sowells  
**Details**:
- Job profile work was sent back to Jonathan on the morning of July 21, 2025
- Sent to Towne Park email address
- Adam was included for review but team can proceed without waiting for his return (Monday)
- **Next Steps**: Begin moving forward with job profile implementation

**Action Items**:
- [ ] Jonathan to review received job profile documentation
- [ ] Proceed with implementation without waiting for Adam's return

### 2. 10 Percenter Sites Configuration

**Status**: Planned  
**Owner**: Amy Sowells  
**Timeline**: Before pilot launch  
**Details**:
- Need to add 10 percenter sites to the system
- Configure them as closely as possible given current feature set
- Target completion: End of July 2025

**Action Items**:
- [ ] Amy to configure 10 percenter sites starting July 22, 2025
- [ ] Complete most configurations before end of month
- [ ] Ensure configurations align with available features

### 3. Steering Committee Presentation Review

**Overall Project Status**: GREEN  
**Presentation Structure**:

#### Completed Features Since Last Call
- Multiple features completed in current sprint
- Additional features from next sprint included in presentation

#### Milestone Status
- **Status**: On track for both remaining milestones before pilot
- **Asterisk Note**: User-facing features have been prioritized, so not all user features are complete
- **Infrastructure & Security**: Will complete all items due to head start

#### Feature Completion Strategy
- Current sprint and next sprint features listed
- More features available than presentation time allows
- One additional steering committee meeting planned before pilot

### 4. Risk and Decision Log Review

#### **RISK 1: Data Gateway Hardening**
- **Status**: Open
- **Description**: Data gateway needs hardening and scaling for production and all environments
- **Current Actions**: 
  - Ongoing discussions with Guy
  - Guy implementing on Datamart servers (not yet in place)
  - Scheduled call at 2:00 PM on July 21 to get ETA
- **Impact**: Critical for production readiness
- **Escalation Path**: If no progress, escalate to Brian and Mike

#### **RISK 2: Monitoring and Alerting**
- **Status**: Open
- **Description**: Monitoring needed for systems outside of Guy's team control
- **Specific Concerns**:
  - Great Plains application and Power Bill integration
  - Azure components outside of data control
  - ETL process health metrics
  - Connection health beyond basic error messages
- **Current Actions**: 
  - Multiple meetings held with Guy's team
  - List of required monitoring items provided
  - Scheduled for discussion in July 21 call
- **Technical Details**:
  - Current visibility: Data sending and basic error messages
  - Missing visibility: Data map changes, ETL process health, Azure component status
- **Escalation Path**: If no progress, escalate to Brian and Mike

#### **RISK 3: ETL Team Availability**
- **Status**: Open
- **Description**: Ensuring ETL build team availability during planned window
- **Current Actions**: 
  - Juan Pascual out this week
  - Planning to confirm availability when he returns
- **Timeline Impact**: Could affect ETL implementation schedule

#### **DECISION 1: Feature Prioritization During Pilot**
- **Status**: Open for Review
- **Description**: Certain features prioritized for development during pilot
- **Presentation Plan**: Review road map with steering committee
- **Road Map Structure**:
  - Completed features (Gray)
  - In progress features
  - Features planned for pilot or later
  - Features that replaced deprioritized items

### 5. User Access Control Discussion

#### Job Code Management
- **System Capability**: Job management panel identifies new job codes not seen before
- **Process**: New codes flagged as "new" for configuration
- **User Visibility**: All employees visible on labor allocation report

#### DOO (Director of Operations) Access
- **Current Approach**: DOO role has access to every site in all districts
- **Consistency Check**: Approach aligns with claims system implementation
- **Business Approval**: Company accepts this access level for reporting purposes
- **Forecasting Impact**: Same access level acceptable for forecasting system

#### Job Title Management
- **Process**: Job titles must match for role-based access
- **Configuration**: User can set job title for new job codes
- **Example**: New job code that should be "district manager" gets that title for access

### 6. Infrastructure and Technical Concerns

#### Hourly Employee Allocation Logic
- **Question Raised**: Why hourly employees have allocated costs
- **Expected Behavior**: Hours clocked should determine allocation location
- **Resolution**: Acknowledged as business process question, not system requirement

#### Data Gateway Implementation
- **Technical Approach**: Traditional gateway install vs. VNet integration
- **Power Bill Comparison**: Uses VNet integration
- **Forecasting Requirement**: Power Automate requires gateway usage
- **Technical Constraint**: Power Automate cannot use VNet integration

### 7. Project Timeline and Change Management

#### Rollout Communication Strategy
- **Change**: Discussing completion dates instead of start dates
- **Reason**: Aligns with change management plan approach
- **Feature Work**: On track to complete planned features

#### Next Steps Planning
- **Upcoming Meetings**: Additional backlog sessions planned for the week
- **Focus Areas**: 
  - Stories starting during pilot
  - Next sprint story review
- **Steering Committee**: One more meeting before pilot launch

## Action Items Summary

| Item | Owner | Due Date | Status |
|------|-------|----------|---------|
| Review job profile documentation | Jonathan Aulson | July 22, 2025 | Pending |
| Configure 10 percenter sites | Amy Sowells | End of July 2025 | In Progress |
| Data gateway ETA confirmation | Jonathan Aulson | July 21, 2025 | Pending |
| Monitoring/alerting status update | Jonathan Aulson | July 21, 2025 | Pending |
| ETL team availability confirmation | Jonathan Aulson | When Juan returns | Pending |
| Risk log preparation for steering committee | Jonathan Aulson | Before steering committee | Pending |
| Road map presentation preparation | Jonathan Aulson | Before steering committee | Pending |

## Decisions Made

1. **Proceed with job profile implementation** without waiting for Adam's review
2. **Maintain current DOO access approach** (all sites, all districts)
3. **Continue with traditional data gateway** approach for Power Automate requirements
4. **Focus steering committee presentation** on completed features and risk mitigation

## Escalation Items

1. **Data Gateway Implementation**: If no progress by July 21 call, escalate to Brian and Mike
2. **Monitoring and Alerting**: If no progress by July 21 call, escalate to Brian and Mike
3. **ETL Team Availability**: Monitor and escalate if resource conflicts arise

## Technical Notes

### User Access Control Implementation
- Job management panel provides visibility into new job codes
- System flags new codes for configuration
- Labor allocation report shows all system users
- Role-based access tied to job title configuration

### Infrastructure Dependencies
- Data gateway hardening required for production scaling
- Monitoring needed for external system integrations
- ETL team availability critical for calculated forecast implementation

### Business Process Clarifications
- Hourly employee allocation logic accepted as business requirement
- DOO access level approved for consistency with other systems
- Job title management process established for new codes

## Related Documentation

- [Forecasting System Overview](../../systems/forecasting/forecasting-system-overview.md)
- [User Access Control Business Rules](../../business-rules/user-access/role-based-permissions/)
- [Infrastructure Requirements](../../technical/operations/)
- [Risk Management Procedures](../../operations/)

## Next Meeting

**Steering Committee Meeting**  
**Date**: July 22, 2025  
**Preparation Status**: Presentation materials reviewed and approved  
**Key Topics**: Project status, risk mitigation, feature road map review

---

*Meeting notes compiled from transcript dated July 21, 2025. All technical details and business decisions preserved for project continuity and stakeholder reference.*