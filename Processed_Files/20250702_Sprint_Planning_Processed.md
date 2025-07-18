# Forecasting - Sprint Planning Documentation

**Document ID:** 20250702_Forecasting_SprintPlanning_1
**Created:** 2025-07-02
**Last Updated:** 2025-07-03
**Content Coverage Period:** 2025-07-02
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Statistics, Internal Revenue, Management Agreements
**Product Owners Present:** No
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Draft

## Executive Summary

This document captures key information from a Sprint Planning session focused on the Forecasting system. The meeting addressed story estimation and technical implementation details for features being planned for the upcoming sprint. The primary focus was on management agreements for Internal Revenue and implementing statistics actuals functionality.

**Key Decisions Made:**
- Internal Revenue with Management Agreements identified as the "big monster story" for the sprint
- Statistics actuals implementation estimated at 5 points
- Revenue daily detail table identified as the data source for statistics actuals
- Date-based disabling of past dates for statistics input required

**Open Issues/Risks:**
- Deployment window timing coordination with Amy needed

**Integration Points Discussed:**
- EDW integration for statistics actuals data
- Revenue daily detail table queries

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250702_Sprint Planning.docx | 2025-07-02 | Sprint Planning | Jonathan Aulson, Andrew Scheuer, Cesar Figueroa, Christopher Thompson, Graham Olson | Jonathan Aulson (Business Analyst) | N/A |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D001 | Decision | 2025-07-02 | Management agreements for Internal Revenue prioritized as main sprint story | Approved | Internal Revenue | Jonathan Aulson | Development Team | 2025-07-02 |
| D002 | Decision | 2025-07-02 | Statistics actuals implementation estimated at 5 points | Approved | Statistics | Christopher Thompson | Development Team | 2025-07-02 |
| D003 | Decision | 2025-07-02 | Revenue daily detail table to be used for statistics actuals data | Approved | Statistics | Jonathan Aulson | Development Team | 2025-07-02 |
| D004 | Decision | 2025-07-02 | Dates that have passed should be disabled on stats page | Approved | Statistics | Jonathan Aulson | Development Team | 2025-07-02 |
| I001 | Issue | 2025-07-02 | Deployment window timing needs coordination with Amy | Open | Deployment | Cesar Figueroa | Cesar Figueroa | - |

## 1. Sprint Planning Overview

### 1.1. Sprint Priorities

#### 1.1.1. Management Agreement for Internal Revenue

**Source Document(s):** `20250702_Sprint Planning.docx`
**Date Discussed/Decided:** `2025-07-02`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Development Team`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#forecasting` `#internalrevenue` `#management`
**Decision Log References:** `D001`

The management agreement for Internal Revenue was identified as the primary focus for the sprint.

Jonathan Aulson described it as: "The big monster story this Sprint is management agreement for Internal Revenue."

**Key Decisions:**
- This feature is the highest priority for the current sprint
- Identified as a complex implementation requiring significant effort

### 1.2. Statistics Implementation

#### 1.2.1. Statistics Actuals Integration

**Source Document(s):** `20250702_Sprint Planning.docx`
**Date Discussed/Decided:** `2025-07-02`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Andrew Scheuer (Developer)`, `Christopher Thompson (Developer)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#technical` `#forecasting` `#statistics` `#integration` `#EDW` `#actualdata`
**Integration Points:** `EDW`
**Decision Log References:** `D002`, `D003`, `D004`

The implementation of statistics actuals was discussed in detail, including the data source and UI behavior requirements.

Jonathan Aulson explained: "We're going to display the statistics grid. We're going to pull in if actuals are found. And and I guess this is maybe the only kind of nuance this story is. We do want on the stats page. The way the stats page needs to work is for dates that have passed, we we need to disable them. So, and that needs to be based on today's date, right? So like you know, as of today we should have July 1st disabled, but we may not, we may not find that there are actual values yet."

The team discussed the complexity of the implementation:

Andrew Scheuer initially suggested: "Well, I'm just speaking from like my own knowledge. This involves doing an ETL if I understand correctly or getting the data flow from EDW or no?"

Cesar Figueroa clarified: "No, that's that's change. That's look like a change in the ADW API. It's like I think that we already."

Christopher Thompson provided an estimate: "Yeah, I mean, I think A5 at most for this if we anything wonky, but I'm kind of flip flop between 3:00 and 5:00 if we have. The this has the actual query. We need to get the statistics actuals data right somewhere."

**Technical Implementation Details:**
The query for retrieving statistics actuals data was identified:
```sql
-- Revenue daily detail table query
-- This query retrieves statistics actuals data
-- It can be filtered by revenue category or retrieve all
-- Revenue category determines which stat item
-- There are two columns for each stat: vehicle counts and external revenue

Key Decisions:

*   The story was estimated at 5 points
*   Revenue daily detail table was identified as the data source
*   The UI should disable dates that have passed based on the current date
*   Actual values should be displayed when available from EDW
*   Dates may be disabled before actual values are available due to delayed data submission

#### 1.2.2. Date-Based Input Restrictions

Source Document(s): `20250702_Sprint Planning.docx` Date Discussed/Decided: `2025-07-02` Key Stakeholders Involved: `Jonathan Aulson (Business Analyst)` Version/Status: `v1.0 - Approved` Tags: `#requirement` `#UX` `#forecasting` `#statistics` Decision Log References: `D004`

A specific requirement was discussed regarding disabling past dates on the statistics page.

Jonathan Aulson explained: "We do want on the stats page. The way the stats page needs to work is for dates that have passed, we we need to disable them. So, and that needs to be based on today's date, right? So like you know, as of today we should have July 1st disabled, but we may not, we may not find that there are actual values yet."

Key Decisions:

*   Dates that have passed should be disabled for input on the statistics page
*   This behavior is based on the current date, not on the existence of actual data
*   This requirement applies specifically to the statistics page

## 2\. Project Coordination

### 2.1. Deployment Planning

Source Document(s): `20250702_Sprint Planning.docx` Date Discussed/Decided: `2025-07-02` Key Stakeholders Involved: `Jonathan Aulson (Business Analyst)`, `Cesar Figueroa (Developer)` Version/Status: `v1.0 - In Progress` Tags: `#planning` `#deployment` `#amysowells` Decision Log References: `I001`

Cesar Figueroa mentioned coordination efforts with Amy regarding deployment timing:

"Just to share, I was talking with Amy trying to coordinate the deployment window with her as well and she asked if we can do this at the end of the day instead of one again, yes."

Jonathan noted the time zone difference: "Their day ends. Uh, they're an hour ahead of us."

Cesar confirmed his availability: "But I can. I mean, I saw her time window and will be like 8:00 PM from my side. I can do that for sure. It's not a problem."

Key Decisions:

*   Deployment timing to be coordinated with Amy
*   Amy requested end-of-day deployment rather than earlier timing
*   Cesar confirmed availability for evening deployment (8:00 PM his time)

## Cross-Reference Index

### By Feature

*   Statistics → Section \[1.2.1\], Section \[1.2.2\]
*   Internal Revenue → Section \[1.1.1\]
*   Management Agreements → Section \[1.1.1\]

### By User Role

*   Account Manager → Not specifically referenced

### By Integration Point

*   EDW Integration → Section \[1.2.1\]

### By Stakeholder

*   Amy Sowells (Product Owner) → Section \[2.1\]
*   Jonathan Aulson (Business Analyst) → Section \[1.1.1\], Section \[1.2.1\], Section \[1.2.2\]

### By Decision Date

*   2025-07-02 → Section \[1.1.1\], Section \[1.2.1\], Section \[1.2.2\], Section \[2.1\]

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
| --- | --- | --- |
| EDW | Enterprise Data Warehouse | Section [1.2.1] |
| API | Application Programming Interface | Section [1.2.1] |
