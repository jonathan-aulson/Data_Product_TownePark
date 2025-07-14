# Towne Park Financial System - Backlog Grooming: Forecasting Documentation

**Document ID:** 20250530_Forecasting_BacklogGrooming_1
**Created:** 2025-05-30
**Last Updated:** 2025-05-30
**Content Coverage Period:** 2025-05-30
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Statistics, UI/UX
**Product Owners Present:** Yes: Adam Suarez
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document synthesizes key information regarding the Forecasting system UI design and statistics functionality discussed during the May 30, 2025 backlog grooming session. It covers the design of summary cards, calendar picker implementation, actuals display format, and variance indicator decisions. This content is based on 1 meeting transcript spanning from 6:30 PM to 7:32 PM.

**Key Decisions Made:**
- Calendar picker with weekend visibility will be implemented based on account manager feedback
- Statistics tab will compare actuals to forecast (not budget) for accuracy measurement
- Arrow symbols will replace pyramid symbols for variance indicators
- Performance management remains in Legion system, not forecasting

**Open Issues/Risks:**
- Prototype not yet working with new arrow symbols
- Jim Boyer and Amy Sowells were unavailable for initial discussion

**Integration Points Discussed:**
- Legion system for performance management
- Budget data integration
- Actual data integration

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250530_Forecasting_Backlog_1 | 2025-05-30 | Backlog Grooming | Jonathan Aulson, Adam Suarez, Michael Foy | Adam Suarez, Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D001 | Decision | 2025-05-30 | Calendar picker with weekend visibility will be implemented | Approved | Statistics | Account Managers | Jonathan Aulson | 2025-05-30 |
| D002 | Decision | 2025-05-30 | Statistics tab will compare to forecast, not budget | Approved | Statistics | Adam Suarez | Jonathan Aulson | 2025-05-30 |
| D003 | Decision | 2025-05-30 | Use arrow symbols instead of pyramid symbols for variance | Approved | Statistics | Team | Jonathan Aulson | 2025-05-30 |
| I001 | Issue | 2025-05-30 | Prototype not working with new arrow symbols | Open | Statistics | Jonathan Aulson | Jonathan Aulson | - |

## 1. Forecasting System UI Updates

### 1.1. Statistics Tab Design

#### 1.1.1. Summary Cards Implementation

**Source Document(s):** `20250530_Forecasting_Backlog_1`
**Date Discussed/Decided:** `2025-05-30`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`, `Michael Foy`
**Version/Status:** `v1.0 - In Development`
**Tags:** `#requirement` `#design` `#UX` `#forecasting` `#statistics` `#accountmanager`
**Integration Points:** `Budget Data` `Actual Data`
**Decision Log References:** `D001`

Jonathan Aulson presented prototype updates for the forecasting UI, specifically focusing on summary cards for statistics. The team is working on implementing a more intuitive interface for account managers to view and interact with statistical data.

**Key Decisions:**
- Summary cards will be implemented for statistics display
- Focus on improved visibility and usability for account managers

#### 1.1.2. Calendar Picker Design

**Source Document(s):** `20250530_Forecasting_Backlog_1`
**Date Discussed/Decided:** `2025-05-30`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`, `Michael Foy`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#UX` `#UI` `#forecasting` `#statistics` `#accountmanager`
**Decision Log References:** `D001`

Jonathan described the calendar picker design: "It the feedback from the account manager's was that it helps kind of being able to quickly see a weekend and pick it. So that's that, might that might stick."

**Key Decisions:**
- Calendar picker will include weekend visibility feature
- Design based on direct account manager feedback
- Implementation approved for development

### 1.2. Actuals Display and Variance

#### 1.2.1. Actuals Number Formatting

**Source Document(s):** `20250530_Forecasting_Backlog_1`
**Date Discussed/Decided:** `2025-05-30`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - In Development`
**Tags:** `#requirement` `#UI` `#forecasting` `#statistics` `#actualdata`
**Integration Points:** `Actual Data`
**Decision Log References:** `D002` `D003` `I001`

The team reviewed the cleaned-up view of actuals numbers, which will show variance indicators for above or below comparison data.

Jonathan noted: "We cleaned up the view of actuals numbers, so we're showing actuals kind of in this format. Where there'll be an indicator whether the variance was hot above or below compared to the comparison data."

**Technical Implementation Details:**
- Variance indicators will show directional information
- Comparison will be against forecast data, not budget
- Arrow symbols to replace pyramid symbols

**Key Decisions:**
- Actuals will display with variance indicators
- Arrow symbols approved for variance display
- Compare to forecast for accuracy measurement

**Open Questions:**
- Implementation timeline for arrow symbols in prototype

#### 1.2.2. Forecast vs Budget Comparison Logic

**Source Document(s):** `20250530_Forecasting_Backlog_1`
**Date Discussed/Decided:** `2025-05-30`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#business` `#forecasting` `#statistics` `#comparison`
**Integration Points:** `Budget Data` `Forecast Data`
**Decision Log References:** `D002`

A critical decision was made regarding comparison logic for the statistics tab. Adam Suarez provided clear business justification for comparing to forecast rather than budget.

Adam explained: "Yeah, I think we because the idea was like for this tab to be based on like how how accurate are you? Not really to like manage performance right? The performance management would be sort of in in like Legion and scheduling because you can't really manage your volume in terms of like up and down to an extent."

**Key Decisions:**
- Statistics tab will compare actuals to forecast (not budget)
- Purpose is accuracy measurement, not performance management
- Performance management remains in Legion system
- Volume management acknowledged as limited in forecasting context

## 2. Technical Environment and Constraints

### 2.1. Development Environment Challenges

**Source Document(s):** `20250530_Forecasting_Backlog_1`
**Date Discussed/Decided:** `2025-05-30`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Michael Foy`
**Version/Status:** `v1.0 - Noted`
**Tags:** `#technical` `#development` `#issue`

Jonathan mentioned working from Houston with limited setup: "I feel kind of blind though. I'm used to having like my nice monitors and stuff. You know my home desk set up and down here. I've just got the laptop it's like. It's like an eye got poked out or something."

Michael Foy acknowledged: "It's tough. I it's always a challenge for sure, especially any coding related stuff you're working on. The technical side is like really tough."

**Key Points:**
- Remote work setup impacts development efficiency
- Multiple monitors important for technical work
- Team acknowledges challenges of mobile development setups

## Cross-Reference Index

### By Feature
- Statistics → Section 1.1.1, Section 1.1.2, Section 1.2.1, Section 1.2.2

### By User Role
- Account Manager → Section 1.1.1, Section 1.1.2

### By Integration Point
- Budget Data → Section 1.1.1, Section 1.2.2
- Actual Data → Section 1.1.1, Section 1.2.1
- Forecast Data → Section 1.2.2
- Legion → Section 1.2.2

### By Stakeholder
- Adam Suarez (Product Owner) → Section 1.1.1, Section 1.1.2, Section 1.2.1, Section 1.2.2
- Jonathan Aulson (Business Analyst) → All sections

### By Decision Date
- 2025-05-30 → Section 1.1.2, Section 1.2.1, Section 1.2.2

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| Legion | Performance management and scheduling system | Section 1.2.2 |
| Variance indicators | Visual elements showing difference between actual and comparison values | Section 1.2.1 |
| Calendar picker | UI component for date selection with weekend visibility | Section 1.1.2 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-05-30 | Meeting Transcript | Initial documentation from backlog grooming session |
