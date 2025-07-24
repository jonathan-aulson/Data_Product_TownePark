# Forecasting - Backlog Grooming Documentation

**Document ID:** 20250626_Forecasting_BacklogGrooming_1
**Created:** 2025-06-26
**Last Updated:** 2025-07-03
**Content Coverage Period:** 2025-06-26
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Statistics, Payroll, Other Expenses, Other Revenue, P&L, Internal Revenue, External Revenue
**Product Owners Present:** Yes: Adam Suarez
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Draft

## Executive Summary

This document captures key information from a Backlog Grooming session focused on the Forecasting system. It covers feature prioritization, upcoming development work, and phase planning decisions. The discussion primarily addressed finishing core functionality for pilot deployment while identifying which features could be deferred to a later phase.

**Key Decisions Made:**
- Prioritization of Internal Revenue on P&L with management agreements as the highest priority
- Consistent variance symbols (green/red) implementation across all tabs deferred as non-critical for pilot
- Job Family groupings will be used for Payroll forecasting, with Job Code level detail for PLH sites
- Site-level statistics will remain the focus for phase one, with district-level aggregation moved to phase two
- Version control/snapshot functionality implementation confirmed for immediate development

**Open Issues/Risks:**
- Handling of adjustments on internal revenue rates requires further investigation
- Workday Job Family implementation timeline may impact forecasting implementation
- Adam Suarez will be out for 2-3 weeks around July 29th for paternity leave

**Integration Points Discussed:**
- EDW integration for actual data
- Workday integration for Job Family definitions
- Budget Data integration

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250626_Backlog Grooming_ Forecasting.docx | 2025-06-26 | Backlog Grooming | Jonathan Aulson, Adam Suarez, Christopher Thompson | Adam Suarez (Product Owner), Jonathan Aulson (Business Analyst) | N/A |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D001 | Decision | 2025-06-26 | Internal Revenue on P&L with management agreements prioritized as highest priority item | Approved | P&L, Internal Revenue | Jonathan Aulson | Adam Suarez | 2025-06-26 |
| D002 | Decision | 2025-06-26 | Consistent variance symbols implementation deferred as non-critical for pilot | Approved | All tabs | Jonathan Aulson | Adam Suarez | 2025-06-26 |
| D003 | Decision | 2025-06-26 | Site-level statistics views for phase one, district-level aggregation for phase two | Approved | Statistics | Adam Suarez | Adam Suarez | 2025-06-26 |
| D004 | Decision | 2025-06-26 | Version control/snapshot process implementation confirmed | Approved | System-wide | Adam Suarez | Jason's team | 2025-06-26 |
| I001 | Issue | 2025-06-26 | Handling of adjustments on internal revenue rates requires investigation | Open | Internal Revenue | Adam Suarez | Adam Suarez | - |
| R001 | Risk | 2025-06-26 | Adam Suarez will be out for paternity leave around July 29th | Noted | Project Timeline | Adam Suarez | - | - |

## 1. Feature Prioritization

### 1.1. Core Functionality for Pilot

#### 1.1.1. Internal Revenue on P&L with Management Agreements

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#decision` `#forecasting` `#internalrevenue` `#pandl`
**Integration Points:** `Budget Data`
**Decision Log References:** `D001`

Internal Revenue on P&L with management agreements was identified as the highest priority item to complete for the upcoming pilot. This feature represents core functionality that must be completed before deployment.

**Key Decisions:**
- This feature is considered the "big one" that must be completed
- Will be targeted for immediate implementation in the next sprint

#### 1.1.2. Actuals for Statistics

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#forecasting` `#statistics` `#actualdata`
**Integration Points:** `EDW`

Implementation of actuals data for the Statistics feature was identified as a high-priority item for the pilot phase.

#### 1.1.3. Budget for Other Expenses and Actuals

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#forecasting` `#otherexpenses` `#budgetdata` `#actualdata`
**Integration Points:** `EDW`, `Budget Data`

Budget data and actuals for the Other Expenses tab was discussed as a necessary component for the pilot phase.

### 1.2. Deferred Features

#### 1.2.1. Consistent Variance Symbols

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#UI` `#forecasting`
**Decision Log References:** `D002`

Implementation of consistent variance symbols (green and red) across all tabs was discussed and determined to be non-critical for the pilot phase.

Jonathan Aulson raised the question: "I think it doesn't make sense to implement this unless we do it across all tabs. Right. Like we wouldn't want, for example, we wouldn't want just stats or just other expenses to have it. And the others have like black and red. You know what I mean?"

Adam Suarez responded: "Yeah, I would agree. I mean, I think some of these are more, more important to just get ready for the pilot, like during the pilot timeframe."

**Key Decisions:**
- Implementation should be consistent across all tabs when implemented
- Feature is deferred as non-critical for pilot phase
- Will be revisited after higher priority items are completed

#### 1.2.2. District-Level Statistics Aggregation

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#forecasting` `#statistics` `#districtmanager`
**Decision Log References:** `D003`

The ability to view aggregated statistics at the district level was discussed and determined to be a phase two feature.

Adam Suarez explained: "That's gotta be like, I think at this point in phase two where we have like a monthly roll up. So like a DM could go in filter on every site in their district and see here's the total occupancy in my district. Direct here's the total drive in in my district, right. And then you could do that same comparison to the aggregate of the budget for those sites. So kind of like what we have for the summary P&L except for like a list of stats."

**Key Decisions:**
- Site-level statistics will remain the focus for phase one
- District-level aggregation of statistics will be implemented in phase two
- The approach will be similar to the summary P&L but for statistics

## 2. Technical Implementation Details

### 2.1. Version Control and Locking

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - In Progress`
**Tags:** `#technical` `#forecasting` `#security`
**Decision Log References:** `D004`

Version control and locking functionality (referred to as "snapshotting") was discussed as a completed item pending final implementation details.

Adam Suarez mentioned: "Assuming Jason's team successfully converts all the data in here to the same schema, like the stuff we talked about on the IT huddle that that snapshot process should be almost already set up."

**Key Decisions:**
- Implementation is pending final confirmation in an upcoming meeting
- Functionality is considered complete from a requirements perspective
- Technical implementation is dependent on data schema conversion by Jason's team

### 2.2. Payroll Forecasting Implementation

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#technical` `#forecasting` `#payroll` `#workday`
**Integration Points:** `Workday`

A brief reference was made to three months of payroll data, which appears to be an implementation detail for the payroll forecasting feature.

## 3. Phase Planning

### 3.1. Phase Two Features

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#forecasting` `#planning`

Several features were explicitly identified as Phase Two items:
- P&L cost centers
- Dashboards
- Exception reporting
- Mass site changes
- District-level statistics aggregation

Adam Suarez mentioned regarding mass site changes: "That would be phase two. The only thing I can see that really for is is like insurance and then the other. Then I guess if we put in any what if scenario functionality in this going forward."

**Key Decisions:**
- Phase Two features clearly identified and separated from Phase One priorities
- Jonathan Aulson will present this roadmap at the upcoming steering committee meeting on July 18th

## 4. Project Risks and Concerns

### 4.1. Personnel Availability

**Source Document(s):** `20250626_Backlog Grooming_ Forecasting.docx`
**Date Discussed/Decided:** `2025-06-26`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Noted`
**Tags:** `#risk` `#planning` `#adamsuarez`
**Decision Log References:** `R001`

Adam Suarez informed the team about his upcoming paternity leave:

"I thought I told the full group... So they're depend sometime between now and August or July 29th. There will be like a two, maybe three-week period that I'm I'll be out, but Amy's aware but."

**Key Concerns:**
- Project continuity during Adam's absence
- Timing of key decisions that may require Adam's input
- Potential impact on sprint planning and delivery timelines

## Cross-Reference Index

### By Feature
- Statistics → Section [1.1.2], Section [1.2.2]
- Payroll → Section [2.2]
- Other Expenses → Section [1.1.3]
- P&L View → Section [1.1.1], Section [3.1]
- Internal Revenue → Section [1.1.1]
- External Revenue → N/A

### By User Role
- Account Manager → N/A
- District Manager → Section [1.2.2]
- Corporate Finance → N/A

### By Integration Point
- EDW Integration → Section [1.1.2], Section [1.1.3]
- Budget Data Integration → Section [1.1.1], Section [1.1.3]
- Actual Data Integration → Section [1.1.2], Section [1.1.3]
- Workday Integration → Section [2.2]

### By Stakeholder
- Amy Sowells (Product Owner) → Referenced but not present
- Adam Suarez (Product Owner) → Section [1.1.1], Section [1.2.1], Section [1.2.2], Section [2.1], Section [3.1], Section [4.1]
- Jonathan Aulson (Business Analyst) → Section [1.1.1], Section [1.2.1], Section [3.1]

### By Decision Date
- 2025-06-26 → Section [1.1.1], Section [1.2.1], Section [1.2.2], Section [2.1], Section [3.1]

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| PLH | Per Labor Hour (sites) | Section [2.2] |
| PTEB | Parking Tax Expense Base | Section [1.1.3] |
| EDW | Enterprise Data Warehouse | Section [1.1.2] |
| DM | District Manager | Section [1.2.2] |
| P&L | Profit and Loss | Section [1.1.1] |
