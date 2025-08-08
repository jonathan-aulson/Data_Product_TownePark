---
title: "Towne Park Forecasting - Technical Backlog Grooming Session"
description: "Comprehensive technical meeting covering job profile mapping, DNS configuration, feature roadmap planning, ETL processes, and resource allocation for the forecasting system"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-17
version: 1.0
status: Complete
owner: "Jonathan Aulson"
source_documents:
  - "20250717_Forecasting Backlog Grooming.docx"
systems:
  - Forecasting
  - EDW
  - Dataverse
  - Power Platform
components:
  - Frontend
  - Backend
  - Database
  - Integration
  - DNS
business_domains:
  - Data Mapping
  - Technical Architecture
  - Resource Planning
  - System Integration
user_roles:
  - Technical Lead
  - Business Analyst
  - Data Architect
  - Project Manager
meeting_details:
  date: "2025-07-17"
  time: "7:05 PM"
  duration: "35 minutes 45 seconds"
  type: "Technical Backlog Grooming"
  participants:
    - "Jonathan Aulson (Project Manager)"
    - "Amy Sowells (Business Lead)"
    - "Jim Boyer (Technical Lead)"
    - "Michael Foy (Business Stakeholder)"
    - "Catherine VanDerzee (Business Analyst)"
    - "Cesar Figueroa (Technical Architect)"
tags:
  - meeting-notes
  - technical-grooming
  - data-mapping
  - infrastructure
  - etl-planning
  - resource-allocation
  - dns-configuration
---

# Towne Park Forecasting - Technical Backlog Grooming Session

## Meeting Overview

**Date**: July 17, 2025  
**Time**: 7:05 PM  
**Duration**: 35 minutes 45 seconds  
**Meeting Type**: Technical Backlog Grooming Session  
**Primary Purpose**: Address job profile mapping, resolve technical issues, plan feature roadmap, and coordinate resource allocation

## Participants

| Name | Role | Organization |
|------|------|--------------|
| Jonathan Aulson | Project Manager | Towne Park |
| Amy Sowells | Business Lead | Towne Park |
| Jim Boyer | Technical Lead | Towne Park |
| Michael Foy | Business Stakeholder | Towne Park |
| Catherine VanDerzee | Business Analyst | Towne Park |
| Cesar Figueroa | Technical Architect | Towne Park |

## Key Technical Discussions

### 1. Job Profile Mapping Analysis

**Problem Statement**: Need to map budget job profiles to system job codes for forecasting accuracy

#### Current Data Analysis
- **Source**: 2025 budget database job profiles
- **Challenge**: Inconsistent job profile names vs. standard dropdown options
- **Examples Found**: 
  - "shift diff" (relates to fraud adjustment)
  - Various permutations of standard job codes
  - Legacy entries from prior years

#### Data Quality Assessment
**Query Criteria**: 
- Table: Budget data with PR hours balance description
- Filter: Entries where balance > 0 (actual hours exist)
- Scope: 2025 budget year only

**Key Findings**:
- Most job profiles (99%) match standard dropdown options
- "Shift diff" always relates to GSA (valet) positions
- Some entries may be legacy data without actual 2025 hours
- RFDs/RFMs occasionally free-form text instead of dropdown selection

#### Business Rules Established
1. **Shift Differential Mapping**: All "shift diff" entries map to valet job code
2. **GSA Section Handling**: Shift differential appears only in top GSA section
3. **Dropdown Compliance**: 99% of entries should match standard options
4. **Exception Handling**: "Other" bucket available for non-standard entries

#### Implementation Plan
**Owner**: Amy Sowells  
**Timeline**: Early next week  
**Process**:
1. Create pivot table from job profile data (Column B)
2. Consolidate duplicate entries
3. Map each unique job profile to appropriate job code (Column E)
4. Handle shift differential as special case (valet mapping)

**Deliverable**: Mapping spreadsheet with job profile to job code relationships

### 2. System Risk Assessment - Job Code Management

#### Potential Risk Scenarios
**Risk 1: New Job Codes Added**
- **Impact**: Job codes added without budget allocation
- **Mitigation**: Job group management panel flags new codes
- **Process**: Manual configuration required for new codes
- **Business Impact**: New positions would lack budget data initially

**Risk 2: Job Code Consolidation**
- **Scenario**: Multiple GSA variations consolidated to single GSA code
- **Impact**: Forecast shows abundance of GSA hours vs. fragmented budget
- **Concern**: Unintended consequences for per-labor-hour contracts
- **Timeline**: Future consolidation planned by Brian's team

**Risk 3: Job Code Name Changes**
- **System Behavior**: Changed codes appear as new codes
- **Process**: Add new code, assign to appropriate group
- **Limitation**: No budget data for changed codes initially

#### Risk Mitigation Strategies
1. **New Code Detection**: Job group management panel provides visibility
2. **Manual Configuration**: System allows grouping and categorization
3. **Budget Rebuilding**: Future budget system can close data gaps
4. **Acceptable Gaps**: Team consensus that missing budget data is acceptable short-term

### 3. DNS Configuration Issue

**Problem**: Custom domain "town forecast" returning 403 error

#### Technical Details
**Domain**: town forecast (custom domain for forecasting system)  
**Error**: 403 Forbidden  
**Root Cause**: DNS configuration issue  
**Current Status**: Help ticket submitted by Cesar  
**Escalation Plan**: Jonathan to escalate if help team needs DNS access assistance

#### Technical Analysis (Cesar Figueroa)
**Issue Identified**:
- CNAME record created in ECDS
- Private endpoint configuration missing
- Private endpoint enables VPN-only access
- Missing setting in private endpoint configuration

**Resolution Path**:
- Help team working with Vincent
- Private endpoint setting requires update
- Custom DNS records show Power Bill but not town forecast
- Static web app attached to private endpoint needs configuration

**Timeline**: Sufficient time available before pilot launch

### 4. Feature Roadmap and Phase 2 Planning

#### Current Feature Status
**Completed Features**: All items marked in gray  
**In Progress**: One feature from original list  
**Non-Functional Requirements**: Set for final sprint completion  
**Phase 2 Items**: TBD timeline (pilot, rollout, or separate SOW)

#### Feature Categorization
1. **Phase 1 (Pilot Ready)**: Core functionality complete
2. **Non-Functional**: Infrastructure, security, performance
3. **Phase 2**: Advanced features, enhancements, additional capabilities
4. **Sprint Backlog**: Usability enhancements in current development

#### Steering Committee Presentation
**Purpose**: Clarify which features delayed and why  
**Content**: Feature roadmap with clear phase distinctions  
**Goal**: Provide transparency on prioritization decisions

### 5. Data Architecture and ETL Planning

#### Internal Revenue Table Requirements
**Purpose**: Convert external revenue to internal revenue calculations  
**Timeline**: Development during pilot phase  
**Technical Name**: Calculated forecast tables  
**Dependencies**: ETL team availability and resource allocation

#### Additional Data Requirements Identified
**Other Expense Detail Table**:
- **Current State**: Usable with column mapping to main account entries
- **Gap**: Not all expenses represented (e.g., insurance)
- **User Input**: Field-entered data through UI
- **System Requirement**: Background mapping for non-manipulable expenses

**Insurance Allocation Example**:
- **Challenge**: Insurance not in other expense table
- **Requirement**: Background allocation to forecast
- **Approach**: Map budgeted accounts that OPS cannot manipulate
- **Data Flow**: Budget equals forecast for non-controllable expenses

#### EDW Integration Architecture
**Technical Implementation**:
- **Data Latency**: Near-zero latency between Dataverse and EDW
- **Method**: Live data pulling (not scheduled ETL)
- **Benefit**: Real-time data availability
- **Technical Detail**: Tables are live view of Dataverse tables

**ETL Team Coordination**:
- **Timeline**: 30 days development + 2 weeks QA = 6 weeks total
- **Pilot Duration**: 6 weeks (September pilot period)
- **Go-Live**: November (parallel processing during pilot)
- **Resource Concern**: Dynamic pricing project competition

### 6. Resource Allocation and Priority Management

#### Competing Priorities Challenge
**Primary Concern**: Dynamic pricing project taking precedence  
**Impact**: Juan Pascual unavailable (Miami trip next week)  
**Risk**: ETL team availability for forecasting project  
**Timeline Pressure**: Need to establish forecasting as #1 priority

#### Proposed Solution Strategy
**Engagement Approach**: Keep ETL team involved in planning  
**Technical Leads**: Cesar and Chris to architect calculated forecast  
**Stakeholder Engagement**: Maintain Juan's attention through planning  
**Resource Strategy**: Use planning time to prepare for implementation

#### Data Mapping Strategy
**Next 3 Weeks Plan**:
1. Map required final output data
2. Identify Dataverse table coverage
3. Document data gaps
4. Prepare queries and data manipulation logic
5. Optimize data retrieval efficiency

**Benefits**:
- ETL team preparation without full resource commitment
- Clear gap identification before implementation
- Pre-written queries for efficient development
- Reduced implementation time when resources available

### 7. UAT Planning and Timeline Coordination

#### UAT Schedule Planning
**Timing**: End of Sprint 31 (3.5 weeks from July 17)  
**Reason**: UI in significant flux until then  
**Scope**: Heavy and time-consuming testing expected  
**Preparation**: August designated as UAT month

#### Pilot Timeline Confirmation
**Pilot Start**: September 2, 2025  
**Look Forward Call**: September 5, 2025  
**Field Leader Training**: Scheduled  
**Source**: Jeremy's timeline (requires confirmation)  
**Alignment**: Team consensus on timeline accuracy

#### Sprint Planning
- **Sprint 30**: Current sprint with user-facing features
- **Sprint 31**: Final user-facing features completion
- **Final Sprint**: Non-functional requirements focus
- **Pre-Pilot**: Calculated forecast table development

### 8. Technical Infrastructure Updates

#### New Table Additions (Cesar Figueroa)
**Billable Expenses Table**: Added for budget expense replication  
**Purpose**: Handle claims, vehicle insurance, and similar expenses  
**Impact**: Original forecast table list changing  
**Action**: Updated table list to be provided to team

#### SQL Server Instance Issues
**Problem**: Left panel not showing tables in SQL Server instance  
**Workaround**: Tables can be queried directly  
**Status**: Under investigation  
**Impact**: Minimal - functionality preserved

## Action Items Summary

| Item | Owner | Due Date | Status |
|------|-------|----------|---------|
| Complete job profile mapping spreadsheet | Amy Sowells | Early week of July 21 | Pending |
| Escalate DNS configuration issue | Jonathan Aulson | If needed | Pending |
| Prepare steering committee risk log | Jonathan Aulson | Before steering committee | Pending |
| Architect calculated forecast tables | Cesar Figueroa, Chris | Next 3 weeks | Pending |
| Provide updated forecast table list | Cesar Figueroa | ASAP | Pending |
| Confirm pilot timeline with Jeremy | Amy Sowells | ASAP | Pending |
| Schedule UAT for August | Amy Sowells | End of Sprint 31 | Pending |
| Check data gateway status with Guy | Jonathan Aulson | Next week | Pending |

## Technical Decisions Made

1. **Job Profile Mapping Approach**: Manual mapping with shift differential special handling
2. **Risk Acceptance**: Missing budget data for new job codes acceptable short-term
3. **DNS Resolution**: Continue with help ticket escalation path
4. **ETL Strategy**: Engage team in planning while awaiting resource availability
5. **UAT Timing**: August UAT after Sprint 31 completion
6. **Data Architecture**: Live Dataverse-EDW integration confirmed

## Risk Items for Steering Committee

1. **ETL Team Resource Competition**: Dynamic pricing vs. forecasting priority
2. **DNS Configuration**: Custom domain resolution issues
3. **Data Gateway**: Infrastructure readiness for production
4. **Monitoring/Alerting**: External system health visibility

## Technical Architecture Notes

### Data Integration
- **Dataverse-EDW**: Live data pulling with near-zero latency
- **Power Automate**: Requires traditional data gateway (not VNet)
- **Table Structure**: Live views rather than scheduled ETL jobs

### Job Code Management
- **Detection**: System flags new job codes automatically
- **Configuration**: Manual assignment to job groups required
- **Access Control**: Job title determines system access level
- **Validation**: Labor allocation report shows all system users

### Infrastructure Requirements
- **Data Gateway**: Traditional gateway for Power Automate integration
- **DNS Configuration**: Custom domain setup for forecasting system
- **Monitoring**: External system health metrics needed
- **Backup/Recovery**: Replication processes for data protection

## Related Documentation

- [Forecasting System Overview](../../systems/forecasting/forecasting-system-overview.md)
- [EDW Integration Technical Specification](../../technical/integrations/20250724_EDW_Integration_TechnicalSpec.md)
- [Job Code Management Business Rules](../../business-rules/forecasting/)
- [Data Architecture Documentation](../../technical/database/)

## Next Steps

1. **Complete job profile mapping** for system configuration
2. **Resolve DNS issues** for custom domain access
3. **Coordinate ETL team engagement** for calculated forecast development
4. **Prepare steering committee materials** with updated risk assessment
5. **Schedule August UAT** following Sprint 31 completion

---

*Meeting notes compiled from transcript dated July 17, 2025. All technical details, business decisions, and implementation plans preserved for project continuity and development team reference.*