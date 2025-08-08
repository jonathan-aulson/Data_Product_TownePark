---
title: "12-Month Forecast Architecture Planning - Meeting Transcript"
version: "1.0"
last_updated_date: "2025-08-06"
document_type: "meeting_transcript"
meeting_date: "2025-07-09"
meeting_duration: "37m 53s + 2 technical sessions"
attendees: 
  - "Jonathan Aulson (Project Lead)"
  - "Amy Sowells (Business Analyst)"
  - "Cesar Figueroa (Technical Architect)"
  - "Christopher Thompson (Developer)"
project_phase: "Development Milestone 4"
related_documents:
  - "PNL_Report_TechnicalDocument.md"
  - "BudgetDataMapping_DataModel_TechnicalDocument.md"
  - "EDW_Integration_TechnicalSpec.md"
tags: ["forecasting", "architecture", "12-month-forecast", "data-pipeline", "azure-functions"]
---

# 12-Month Forecast Architecture Planning - Meeting Transcript

## Meeting Overview

**Date:** July 9, 2025  
**Duration:** 37m 53s (primary session) + 2 technical planning sessions  
**Meeting Type:** Backlog Grooming & Technical Architecture Planning  
**Project Phase:** Development Milestone 4 (ending August 26, 2025)

## Executive Summary

Critical architecture planning session for implementing 12-month forecast functionality. Team discussed comprehensive data pipeline architecture, technical implementation strategies, and project timeline implications. Key decisions made regarding data storage strategies, calculation service architecture, and integration patterns.

## Key Participants

- **Jonathan Aulson** - Project Lead, Architecture Planning
- **Amy Sowells** - Business Analyst, Requirements Validation  
- **Cesar Figueroa** - Technical Architect, Implementation Strategy
- **Christopher Thompson** - Developer, Technical Consultation

## Meeting Context

### Project Status
- Current milestone ending August 26, 2025
- Pilot starting September 2, 2025
- Project funded through November 4, 2025
- Discussion of phase 2 forecasting features and future roadmap

### Business Driver
Implementation of 12-month forecast system that pre-calculates forecast data using contract details to calculate Internal Revenue, addressing accuracy concerns with current Excel-based process.

## Key Discussion Topics

### 1. Current State Analysis

**Excel Process Understanding:**
- Budget data remains static from January 1st (cannot change)
- Forecast files contain contract terms for every month
- Deal changes in February impact forecasted Internal Revenue from February forward
- Automatic daily sync from forecast files to database tables

**Amy Sowells (3:35):** *"The way it works today is the budget is the budget and effective January 1st. It doesn't change. It cannot change. The forecast files today house a tab with a full year, it basically has like contract terms for every single month."*

### 2. Proposed Architecture Overview

**Five-Story Development Approach:**

#### Story 1: Budget Data Retrieval
- Automated process to discover and retrieve budget data from EDW
- Pull budget final table data when new year's data becomes available
- Admin panel UI for monitoring data flow status

#### Story 2: Baseline Forecast Creation  
- Transform budget data into forecast structure
- Store at monthly level initially, then convert to daily level
- Create intermediate data structures for calculation processing

#### Story 3: Calculation Logic Implementation
- Migrate current PNL calculation logic to separate Azure Functions service
- Split single endpoint into multiple calculation-specific endpoints
- Implement Power Automate orchestration for triggering calculations

#### Story 4: Account Manager Integration
- Connect existing account manager editing functionality
- Ensure edits trigger recalculation through new architecture
- Maintain existing UI patterns while leveraging new backend

#### Story 5: Trend Implementation
- Current month forecast with daily replacement of forecast with actuals
- Integration with revenue daily detail data
- Real-time calculation updates

### 3. Technical Architecture Decisions

**Data Storage Strategy:**
- **Budget Monthly:** 12 months of budget data stored monthly (not daily)
- **Baseline Forecast:** 12 months of forecast data stored daily (editable by account managers)
- **Forecast Calculated:** Post-calculation values with Internal Revenue and FLC calculations

**Cesar Figueroa (14:22):** *"For example for payroll we'll go way beyond than 3 gigabytes. That is basically the tier part of the entire tenant database for one year."*

**Calculation Service Architecture:**
- Migrate current backend calculation logic to separate Azure Functions service
- Power Automate controls "what and when" to calculate
- Backend code controls calculation logic and processing
- Multiple instances for scalability and performance

**Cesar Figueroa (37:46):** *"What we already have as a single endpoint on our back end, that is the PNL view, will be a completely separate service that will run in Azure function like the building block."*

### 4. Project Timeline and Prioritization

**Development Phases:**
- **Current Phase (through August 26):** Focus on UI features and usability
- **Pilot Phase (September 2 - October 31):** Underlying data architecture implementation
- **Post-Pilot:** Complete 12-month forecast functionality

**Backlog Prioritization:**
- Priority 1: Pre-pilot essential features (actuals, trend support)
- Priority 2: Go-live features (summary cards, Legion schedule copy, variance tables)
- Priority 3: 12-month forecast implementation (positioned at item 27)

**Jonathan Aulson (25:30):** *"The 12 month forecast being kind of pre calculated sits right here in between 26 and 27 because this guy has all of the consistent formatting stuff to make everything look the same from a red green perspective."*

### 5. Future Roadmap Discussion

**2026 Project Sequence:**
1. **Q1 2026:** Billing Phase 3 (10 percenters and RSS)
2. **Q2-Q3 2026:** Budget system implementation  
3. **Q4 2026:** Revenue spreadsheet project
4. **Q4 2026:** Return to forecasting phase 2 features

**Resource Scaling Options:**
- Option 1: Maintain current pod size, sequential project delivery
- Option 2: Add additional pod for parallel development
- Option 3: Add 1-2 developers to existing pod for trickle forecasting work

### 6. Technical Challenges and Solutions

**Load Testing Concerns:**
- System scalability validation required before pilot
- Data gateway limitations affecting production billing during testing
- Need for additional data gateways and separate testing environments

**Calculation Performance:**
- Current PNL calculations for all sites/periods complete in under 1 minute
- Background processing will improve perceived performance
- Azure Functions provide better scalability than Power Automate flows

**Data Integration Complexity:**
- Budget final structure differs significantly from forecast structure
- Need for intermediate transformation layer
- Daily vs. monthly storage optimization decisions

## Action Items and Next Steps

### Immediate Actions (July 10, 2025)
1. **Jonathan:** Create detailed user stories for 5-story implementation approach
2. **Cesar:** Develop technical diagrams with storage capacity analysis
3. **Team:** Present architecture plan to John (stakeholder review)

### Sprint Planning
- **Stories 1-3:** Estimated 2 sprints of development work
- **Story 3:** Most complex due to calculation logic migration
- **Stories 4-5:** Integration and trend implementation

### Infrastructure Requirements
- Additional data gateways for load testing isolation
- Separate testing environment pointing to dev EDW
- Azure Functions service provisioning

## Technical Specifications

### Data Flow Architecture
```
Budget Final (EDW) → Budget Monthly (Dataverse) → Baseline Forecast (Daily) → Forecast Calculated → PNL Display
```

### Admin Panel Requirements
- Data flow monitoring dashboard
- Timestamp tracking for budget data retrieval
- Error message display and status monitoring
- Integration with existing job group management

### Calculation Service Design
- **Input:** Site list, period list, calculation type
- **Processing:** Fetch from Dataverse, apply business logic, insert results
- **Orchestration:** Power Automate triggers based on data changes
- **Scalability:** Multiple Azure Function instances

## Business Impact

### Accuracy Improvements
- Automated contract detail integration eliminates manual Excel processes
- Real-time calculation updates when deal terms change
- Consistent application of business rules across all forecasts

### Performance Benefits
- Pre-calculated 12-month view available immediately upon login
- Background processing eliminates user wait times
- Scalable architecture supports 700+ user base

### Operational Efficiency
- Reduced manual intervention in forecast processes
- Automated data synchronization from EDW
- Centralized monitoring and alerting capabilities

## Risk Mitigation

### Technical Risks
- **Storage Capacity:** 3GB+ data volume requires tenant upgrade consideration
- **Concurrency:** 700 users may overwhelm Power Automate flows
- **Integration Complexity:** Multiple data transformation layers increase failure points

### Project Risks
- **Timeline Pressure:** 2-sprint estimate for complex architecture changes
- **Resource Constraints:** Limited development time before pilot
- **Dependency Management:** EDW integration and data gateway availability

## Meeting Outcomes

### Decisions Made
1. **Architecture Approach:** Five-story sequential implementation approved
2. **Technology Stack:** Azure Functions + Power Automate hybrid approach
3. **Timeline Strategy:** UI features first, data architecture during pilot
4. **Storage Strategy:** Monthly budget data, daily forecast data structure

### Next Meeting Actions
- Technical architecture presentation to stakeholders
- Detailed user story review and estimation
- Load testing strategy finalization
- Infrastructure provisioning planning

---

**Meeting Transcript Source:** Backlog Grooming Forecasting-20250709_183926-Meeting Recording  
**Document Prepared By:** AI Documentation System  
**Review Status:** Pending stakeholder review  
**Distribution:** Development team, business stakeholders, architecture review board