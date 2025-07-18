# Towne Park Financial System - Billable Accounts Tasking Documentation

**Document ID:** 20250625_BillableAccounts_Tasking_1
**Created:** 2025-06-25
**Last Updated:** 2025-06-25
**Content Coverage Period:** 2025-06-24 (meeting date per transcript)
**Primary Systems Covered:** Forecasting, Billing
**Subsystems Discussed:** Billable Accounts, Management Agreements, Power Automate Flows
**Product Owners Present:** No
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures a detailed technical tasking session for implementing billable accounts calculations within the forecasting system. The team worked through complex Power Automate flow logic, identified the need for an ETL process to pre-populate billable accounts data, and discussed leveraging existing billing flows for consistency. Key technical decisions include creating a Dataverse table for billable accounts calculations, implementing forecast/budget fallback logic, and ensuring data refresh mechanisms. This content is based on 1 meeting transcript lasting over 1 hour.

**Key Decisions Made:**
- Create ETL process to pre-populate billable accounts in Dataverse
- Use forecast data from other expenses tab when available, fallback to budget
- Leverage existing billable accounts flow logic for consistency
- Implement 4x daily refresh for configuration changes
- Generate tasks using AI with manual review

**Open Issues/Risks:**
- Configuration change lag time (up to 6 hours)
- Complexity of understanding all calculation components
- Payroll data dependency from Graham's work
- Need for detailed technical specifications

**Integration Points Discussed:**
- Power Automate flows
- Dataverse tables
- EDW queries
- Contract configuration
- Other Expenses forecast tab

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250625_BillableAccounts_Tasking_1 | 2025-06-24 | Tasking Meeting | Jonathan Aulson, Christopher Thompson, Andrew Scheuer, Cesar Figueroa, Graham Olson | Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D027 | Decision | 2025-06-24 | Create ETL for billable accounts | Approved | Billable Accounts | Christopher Thompson | Team | 2025-06-24 |
| D028 | Decision | 2025-06-24 | Use forecast/budget fallback logic | Approved | Billable Accounts | Team | - | 2025-06-24 |
| D029 | Decision | 2025-06-24 | 4x daily refresh cycle | Approved | ETL Process | Christopher Thompson | - | 2025-06-24 |
| I015 | Issue | 2025-06-24 | 6-hour lag for config changes | Accepted | Billable Accounts | Christopher Thompson | - | - |
| R007 | Risk | 2025-06-24 | Payroll data dependency | Open | Billable Accounts | Christopher Thompson | Graham Olson | - |

## 1. Technical Architecture Overview

### 1.1. Flow Structure Analysis

#### 1.1.1. Initial Flow Mapping

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Cesar Figueroa (Developer)`, `Christopher Thompson (Developer)`
**Version/Status:** `v1.0 - Analyzed`
**Tags:** `#technical` `#powerautomate` `#flow` `#architecture`
**Integration Points:** `Power Automate` `Dataverse`

Cesar presented the initial flow structure: "I generated um the flow based on these steps. So step one in saying query confirmation detail to get additional payroll amount. Then PTD type with actual and escalator type and then have it be this one in three types, fixed amount, percent increase, escalator amount."

Christopher emphasized the need for clarity: "Yeah. So and and that's The thing is I I think we kind of need to like step through each one of these and and be. A little bit more detailed about like what is additional payroll amount, right?"

**Key Components Identified:**
- Additional payroll amount
- PTEB (Parking Tax Expense Base) calculations
- Support services configurations
- Non-excluded billable accounts
- Budget vs forecast logic

### 1.2. Data Flow Components

#### 1.2.1. Additional Payroll Amount

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Andrew Scheuer (Developer)`, `Christopher Thompson (Developer)`
**Version/Status:** `v1.0 - Clarified`
**Tags:** `#data` `#payroll` `#contract` `#configuration`

Andrew asked the fundamental question: "Alright, so first dumb question, what is additional payroll well?"

Christopher investigated and explained: "So I think additional payroll amount is this guy. Yes. OK. So this is just, Yep. So it's just a fixed value in data verse on their contract if they have this additional payroll amount."

Cesar confirmed: "So it's a fixed value from database."

**Implementation Details:**
- Fixed value stored in Dataverse
- Part of contract configuration
- Not calculated, just retrieved

#### 1.2.2. PTEB Type Classifications

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Christopher Thompson (Developer)`, `Andrew Scheuer (Developer)`
**Version/Status:** `v1.0 - Detailed`
**Tags:** `#PTEB` `#calculation` `#percentage` `#payroll`

Christopher raised the complexity: "What does that mean? When it's a percent billable payroll, we apply a percent to what payroll number? You know what I mean?"

The team identified that PTEB calculations depend on:
- Payroll type (fixed, percentage of payroll, percentage of billable)
- Base payroll calculations
- Percentage applications

## 2. ETL Process Design

### 2.1. Dataverse Table Creation

#### 2.1.1. Billable Accounts ETL Strategy

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Christopher Thompson (Developer)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#ETL` `#dataverse` `#architecture` `#performance`
**Integration Points:** `Dataverse` `EDW`
**Decision Log References:** `D027`

Christopher proposed the solution: "So the the solution I'm proposing and and I don't necessarily I I think this is is the best one, but we can talk through it is that we should just have an ETL process that kind of gets us this data from all the different spots... and basically pre populate a table for them of billable accounts."

He detailed the benefits: "So similar to what we're doing with like occupancy and rates and vehicle, all that stuff, we just have data verse rows for all the sites for all the months of of their billable accounts. And that's gonna make the calculation on the forecasting side a lot simpler. They don't have to worry about calling child flows and stuff."

**Architecture Benefits:**
- Simplified forecast calculations
- Consistent with existing patterns
- Improved performance
- Reduced complexity in forecast flows

#### 2.1.2. Refresh Cycle Design

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Christopher Thompson (Developer)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#ETL` `#refresh` `#schedule` `#performance`
**Decision Log References:** `D029` `I015`

Christopher outlined the refresh strategy: "We can run it a couple times a day 'cause like the. Like all this stuff, all this contract config, it's not changing that regularly, so we don't have to worry about it being up to the minute. We can schedule it to run like four times a day."

Jonathan confirmed acceptance: "Nope. Sounds good."

Christopher added context about lag time: "There is gonna be a lag if they change their contract config to to see the accurate number there... It won't be like real time, real time."

**Implementation Details:**
- 4x daily refresh schedule
- Maximum 6-hour lag for changes
- Balances performance with data freshness
- Acceptable for contract configuration changes

### 2.2. Forecast/Budget Logic

#### 2.2.1. Data Source Hierarchy

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Christopher Thompson (Developer)`, `Andrew Scheuer (Developer)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#logic` `#forecast` `#budget` `#hierarchy`
**Integration Points:** `Other Expenses Tab` `Budget Data`
**Decision Log References:** `D028`

Christopher explained the logic: "This value, we'll have to get, we'll have to look at the other expenses tab, and if it doesn't exist, use this column [budget]."

He documented: "Or the Expense tab. Do not exist. So we'll need to hash out some, you know, better naming and solidify this a little bit."

**Data Hierarchy:**
1. Check Other Expenses forecast tab for values
2. If forecast exists, use forecast
3. If no forecast, fallback to budget
4. Consistent with overall system design

## 3. Integration Opportunities

### 3.1. Existing Flow Reuse

#### 3.1.1. Leveraging Billing Flow Logic

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Christopher Thompson (Developer)`
**Version/Status:** `v1.0 - Proposed`
**Tags:** `#reuse` `#integration` `#consistency` `#billing`
**Integration Points:** `Billing Flows` `Power Automate`

Jonathan asked a crucial question: "I I have a dumb question, Chris. The flow that today calculates billable accounts. Is it possible for us to use that exact same flow for this kind of ETL table that we're talking about having so that if we make changes to that flow? We will be like we can update both at [once]"

Christopher saw the opportunity: "Only include one change in one place. Once the the new flow populates that table, we could totally replace it in this flow, right? And instead of actually getting the the details from EDW, it could just use. The Dataverse columns that we have pre-populated and that would probably go a lot faster and it would be consistent with what we we show."

**Benefits:**
- Single source of truth
- Consistent calculations
- Easier maintenance
- Performance improvements

### 3.2. Dependencies

#### 3.2.1. Payroll Data Requirements

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Christopher Thompson (Developer)`, `Graham Olson (Developer)`
**Version/Status:** `v1.0 - Dependency Identified`
**Tags:** `#dependency` `#payroll` `#integration` `#risk`
**Decision Log References:** `R007`

Christopher identified a critical dependency: "So like this is kind of, it seems to me kind of continued on what Graham's working on, right? Which is we need to get the payroll calculations done, right? Because this relies on having that payroll data."

He elaborated on the integration need: "Which I I think should be doable because as long as we include that payroll amount on like our Internal Revenue breakdown for the site. We can probably get at that. We just need to make sure that it goes in order."

**Dependencies:**
- Payroll calculations must complete first
- Order of operations critical
- Need payroll data for percentage calculations
- Graham's work is blocking factor

## 4. Task Generation Strategy

### 4.1. AI-Assisted Tasking

#### 4.1.1. Task Generation Approach

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Cesar Figueroa (Developer)`, `Andrew Scheuer (Developer)`, `Christopher Thompson (Developer)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#AI` `#tasking` `#productivity` `#process`

Cesar proposed: "I think that with this input, the FCP server that I already have can generate our task in minutes or on ground."

Andrew added caution: "Yeah, we just got to make sure that we're like ask it to to create a markdown of the the tasks first and we can read them."

Christopher expressed concern about premature tasking: "Yes, my my hesitation is we're going to make tasks to find out what tasks we need to make instead of just like digging through it here and and figuring out what we need to do."

**Agreed Approach:**
- Use AI to generate initial task list
- Review in markdown format first
- Manual validation required
- Balance automation with understanding

### 4.2. Technical Clarifications

#### 4.2.1. Component Understanding

**Source Document(s):** `20250625_BillableAccounts_Tasking_1`
**Date Discussed/Decided:** `2025-06-24`
**Key Stakeholders Involved:** `Andrew Scheuer (Developer)`, `Christopher Thompson (Developer)`
**Version/Status:** `v1.0 - Clarified`
**Tags:** `#understanding` `#technical` `#components`

Andrew emphasized the need for clarity: "Yeah. Can we just go through the outline 1 by 1 and and and we can ask like I'll I'm gonna be I'm gonna ask less stupid questions. So get ready."

The team systematically worked through:
- Additional payroll amount definition
- PTEB calculations
- Support services logic
- Non-excluded accounts queries
- Final summation logic

Andrew confirmed understanding: "OK, so the final result is the sum. The final result is just the sum of all of those boxes plus the the values that we get from the non excluded billable accounts."

## Cross-Reference Index

### By Feature
- Billable Accounts → All sections
- Other Expenses → Section 2.2.1
- Payroll → Section 1.2.1, Section 3.2.1
- Management Agreements → Section 1.1.1

### By Integration Point
- Power Automate → Section 1.1.1, Section 3.1.1
- Dataverse → Section 2.1.1, Section 2.1.2
- EDW → Section 2.1.1, Section 3.1.1
- Other Expenses Tab → Section 2.2.1
- Billing Flows → Section 3.1.1

### By Stakeholder
- Jonathan Aulson (Business Analyst) → Section 2.1.2, Section 3.1.1
- Christopher Thompson → All sections
- Andrew Scheuer → Section 1.2.1, Section 2.2.1, Section 4.1.1, Section 4.2.1
- Cesar Figueroa → Section 1.1.1, Section 4.1.1
- Graham Olson → Section 3.2.1

### By Decision Date
- 2025-06-24 → Section 2.1.1, Section 2.1.2, Section 2.2.1

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| ETL | Extract, Transform, Load - data processing pattern | Section 2.1.1 |
| PTEB | Parking Tax Expense Base | Section 1.2.2 |
| FCP server | AI server for task generation | Section 4.1.1 |
| Additional Payroll Amount | Fixed contract configuration value | Section 1.2.1 |
| Non-excluded billable accounts | Accounts included in billable calculations | Section 1.1.1 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-25 | Meeting Transcript | Initial technical tasking documentation |
