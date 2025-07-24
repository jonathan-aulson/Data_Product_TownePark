# Towne Park Financial System - Backlog Grooming: Prioritization Documentation

**Document ID:** 20250612_Forecasting_BacklogGrooming_3
**Created:** 2025-06-12
**Last Updated:** 2025-06-12
**Content Coverage Period:** 2025-06-12
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Payroll, Internal Revenue, P&L View, Legion Integration, Pilot Planning
**Product Owners Present:** Yes: Amy Sowells, Adam Suarez
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures the critical prioritization exercise conducted to plan the final 5 sprints of the Forecasting project. The team established priorities for remaining features, discussed pilot timing implications, and made key decisions about comparison features and topside adjustments. A major outcome was the realization that pilot timing would need to shift from August 12th to August 26th to accommodate all priority features. This content is based on 1 meeting transcript lasting 1 hour 5 minutes.

**Key Decisions Made:**
- Prior year comparison considered complete with existing year-change functionality
- Pilot date shifted to August 26th to accommodate all priority features
- UAT and pilot will run concurrently
- Jeremy needs immediate notification of schedule change for communications planning
- AI initiatives showing positive results for both forecasting and billing

**Open Issues/Risks:**
- UAT issues accumulating during financial close period
- Concurrent UAT and pilot execution risk
- Communication plan timing with Jeremy
- HRIS data availability for payroll forecasting

**Integration Points Discussed:**
- Legion data integration
- HRIS integration for payroll
- EDW connections

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250612_Forecasting_Backlog_3 | 2025-06-12 | Backlog Grooming | Jonathan Aulson, Amy Sowells, Adam Suarez, Christopher Thompson, Michael Foy | Amy Sowells, Adam Suarez, Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D009 | Decision | 2025-06-12 | Prior year comparison feature considered complete | Approved | Comparison | Jonathan Aulson | - | 2025-06-12 |
| D010 | Decision | 2025-06-12 | Pilot date shifted to August 26th | Approved | All | Jonathan Aulson | Amy Sowells | 2025-06-12 |
| D011 | Decision | 2025-06-12 | UAT and pilot to run concurrently | Approved | All | Jonathan Aulson | Amy Sowells | 2025-06-12 |
| I006 | Issue | 2025-06-12 | HRIS data needed for payroll forecasting | Open | Payroll | Jonathan Aulson | - | - |
| R003 | Risk | 2025-06-12 | Concurrent UAT and pilot execution | Open | All | Jonathan Aulson | Amy Sowells | - |

## 1. Sprint Planning and Prioritization

### 1.1. Current Sprint Status

#### 1.1.1. Sprint Timeline Overview

**Source Document(s):** `20250612_Forecasting_Backlog_3`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Amy Sowells (Product Owner)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - In Progress`
**Tags:** `#planning` `#milestone` `#timeline` `#forecasting`
**Decision Log References:** `D010`

Jonathan provided critical timeline context: "We're down to the last 5 sprints left. So we're we're getting down to the final stretch here."

Current Sprint themes:
- Current Sprint: Payroll forecasting features
- Next Sprint: Internal Revenue for per labor hour management agreements
- Following Sprint: Legion data integration begins

**Key Points:**
- 5 sprints remaining in project
- Need to prioritize features for completion
- Concern about getting desired features done vs. just feature list items

### 1.2. Feature Prioritization

#### 1.2.1. Prior Year Comparison Decision

**Source Document(s):** `20250612_Forecasting_Backlog_3`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Amy Sowells (Product Owner)`, `Adam Suarez (Product Owner)`, `Michael Foy`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#requirement` `#comparison` `#UI` `#complete`
**Decision Log References:** `D009`

Jonathan raised a critical design question: "For example, the set of comparison to prior year stories. I included these in here because in the features list we talk about comparing to budget and prior year on all the tabs I did want to kind of point out that the the tabs do have the ability to compare to prior year. It doesn't work the same as with budget where it's a like you click a button and it shows the the numbers underneath. You actually just change the year."

Amy provided user perspective but deferred to Adam: "I think I don't know. I don't like weigh in. I don't. I know you know how these managers use it more than I do."

**Key Decision:**
- Prior year comparison functionality exists through year change mechanism
- No additional UI needed for side-by-side comparison
- Feature considered complete as-is

#### 1.2.2. Topside Adjustments Priority

**Source Document(s):** `20250612_Forecasting_Backlog_3`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`, `Christopher Thompson`
**Version/Status:** `v1.0 - Under Discussion`
**Tags:** `#requirement` `#pandl` `#topside` `#manual`

Jonathan sought clarification on topside adjustments: "So this guy inputs in P&L view for topside. Can can you kind of walk me through what this might look like in the tool?"

Adam explained the concept: "So I sort of talked to, I think, Mike, you were there too. For these, I don't. I don't know where fully aligned on what exactly we want. These are more. Like manual input, so it's not like you're going by day and entering cars like this is almost going by month and just inputting P&L data. Like, because there's there's so many different."

**Key Points:**
- Topside adjustments are monthly manual P&L data inputs
- Not daily transactional data like statistics
- Complexity due to variety of adjustment types
- Alignment still needed on exact requirements

### 1.3. AI Initiative Update

#### 1.3.1. Team AI Tool Implementation

**Source Document(s):** `20250612_Forecasting_Backlog_3`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - In Progress`
**Tags:** `#technical` `#AI` `#tools` `#productivity`

Jonathan shared positive news: "We were just meeting internally to compare notes on some AI initiatives we're we're working on within our team. We're getting some really positive results, so I'm hopeful we can kind of come back and share with you guys soon, but. We're we're we've implemented some new tools and they're really working out well, is the headline."

When Adam asked about application, Jonathan clarified: "Really both [forecasting and billing]. But it's more applicable to forecasting because we're doing a lot more work there these days."

**Key Points:**
- AI tools showing positive results
- More applicable to forecasting due to current workload
- Plans to share results with product team soon

## 2. Pilot Planning and Timeline Adjustment

### 2.1. Schedule Impact Analysis

#### 2.1.1. Development Timeline Extension

**Source Document(s):** `20250612_Forecasting_Backlog_3`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Amy Sowells (Product Owner)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#milestone` `#pilot` `#timeline` `#risk`
**Decision Log References:** `D010` `D011` `R003`

Jonathan explained the timeline challenge: "What I was proposing was that we prioritize all the user features into these four and do and have the last Sprint be non functional... Those non functional we are. We're actually getting done ahead of time."

He revealed the impact: "So I think we need to go back to Jeremy and and and reset the expectation on when we could be ready to pilot if we wanna pilot with all these things."

Timeline details:
- Original development end date: August 12th
- New functional features end date: August 26th
- 2-week shift in pilot start date
- Scope increased compared to original features list

Amy recognized the urgency: "Because, yeah, he is kind of designing a plan. And a a communications plan will start pretty soon. So yeah, we should talk through that with him sooner rather than later."

#### 2.1.2. Concurrent UAT and Pilot Strategy

**Source Document(s):** `20250612_Forecasting_Backlog_3`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Amy Sowells (Product Owner)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#UAT` `#pilot` `#risk` `#strategy`
**Decision Log References:** `D011` `R003`

Jonathan highlighted a critical risk: "But what that what that also means just to call it out, we're we're talking about starting pilot at the same time as your UAT testing. Amy, so it's in other words, this is the earliest possible point pilot could happen. You're gonna be uat ING it at the same time and. While we also pilot for four weeks."

He provided the rationale: "So the theory is like we would catch all the stuff for, you know, in the early bits of pilot. But this was a way to get to make the pilot happen as early in the process and give the most time for it."

**Strategy Details:**
- UAT and pilot run concurrently
- Early pilot issues caught during UAT
- Maximizes pilot duration within timeline
- Risk of discovering issues during pilot

### 2.2. Communication Planning

#### 2.2.1. Jeremy Notification Priority

**Source Document(s):** `20250612_Forecasting_Backlog_3`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Amy Sowells (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Action Required`
**Tags:** `#communication` `#pilot` `#planning` `#urgent`

Amy took immediate action: "OK, I'm I'm giving Jeremy a heads up now and. Let's see. Let me figure out when our next. Pilot and rollout call is if they don't even know if there is one schedule."

She attempted real-time coordination: "Let me see if he's available. OK. No, I don't think he's available now. I was gonna see if he could hop on now."

**Action Items:**
- Schedule 30-minute meeting with Jeremy
- Communicate pilot date change
- Align on communications plan timing
- Ensure rollout planning adjusts accordingly

## 3. Feature List Completeness

### 3.1. Priority Grouping Exercise

#### 3.1.1. Prioritization Methodology

**Source Document(s):** `20250612_Forecasting_Backlog_3`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Amy Sowells (Product Owner)`, `Adam Suarez (Product Owner)`, `Michael Foy`
**Version/Status:** `v1.0 - In Progress`
**Tags:** `#methodology` `#prioritization` `#planning`

Jonathan explained the approach: "And we don't have to. I'd like to get them in a in a rank order. It doesn't so much matter like, you know, one versus 2, but in kind of groups of like say four or five, they need. We need to kind of get them into grouping so that we can tackle them in the right order here."

**Prioritization Themes Identified:**
- Comparison features (prior year, budget)
- Topside adjustments
- New business inputs
- Integration completions
- User experience enhancements

## Cross-Reference Index

### By Feature
- Payroll → Section 1.1.1
- Internal Revenue → Section 1.1.1
- P&L View → Section 1.2.2
- Comparison Features → Section 1.2.1
- Topside Adjustments → Section 1.2.2

### By User Role
- Account Manager → Section 1.2.1 (implicit users)
- District Manager → Section 1.2.1 (implicit users)

### By Integration Point
- Legion → Section 1.1.1
- HRIS → Section 1.1.1
- EDW → Section 1.1.1

### By Stakeholder
- Amy Sowells (Product Owner) → All sections
- Adam Suarez (Product Owner) → Section 1.1.1, Section 1.2.1, Section 1.2.2, Section 1.3.1
- Jonathan Aulson (Business Analyst) → All sections

### By Decision Date
- 2025-06-12 → Section 1.2.1, Section 2.1.1, Section 2.1.2

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| Topside adjustments | Manual monthly P&L data inputs | Section 1.2.2 |
| HRIS | Human Resources Information System | Section 1.1.1 |
| Concurrent UAT | Running User Acceptance Testing simultaneously with pilot | Section 2.1.2 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-12 | Meeting Transcript | Initial prioritization and pilot planning documentation |
