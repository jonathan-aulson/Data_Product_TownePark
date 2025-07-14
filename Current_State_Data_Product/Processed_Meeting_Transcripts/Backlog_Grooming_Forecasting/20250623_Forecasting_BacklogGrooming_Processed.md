# Towne Park Financial System - Backlog Grooming: Actuals Display Documentation

**Document ID:** 20250623_Forecasting_BacklogGrooming_4
**Created:** 2025-06-23
**Last Updated:** 2025-06-23
**Content Coverage Period:** 2025-06-23
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Statistics, Rates, Other Expenses, Payroll, Actuals Display
**Product Owners Present:** Yes: Adam Suarez
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures key decisions about how actuals will be displayed across different forecasting tabs. The meeting occurred during extreme heat (over 100°F) with Amy Sowells and Mike Foy absent. Critical decisions were made about actuals display methodology, with rates and other expenses showing actuals in a second row, while statistics will replace values. The team also discussed steering committee demo preparation, project risks, and HRIS data challenges. This content is based on 1 meeting transcript lasting 42 minutes 25 seconds.

**Key Decisions Made:**
- Rates tab: Actuals display in second row (addition method)
- Other Expenses: Actuals display in second row for current month only
- Statistics: Actuals replace forecast values (replacement method)
- Payroll: Show scheduled hours with cost calculations
- Color coding: Blue for forecast/budget, black for actuals

**Open Issues/Risks:**
- HRIS data quality issues with employee role transitions
- Terminated employees appearing in security tables
- Meeting frequency concerns for project completion
- Guy (stakeholder) scheduling challenges

**Integration Points Discussed:**
- HRIS/Workday integration for employee data
- EDW for actuals data
- Legion for scheduled hours

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250623_Forecasting_BacklogGrooming_4 | 2025-06-23 | Backlog Grooming | Jonathan Aulson, Adam Suarez | Adam Suarez, Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D021 | Decision | 2025-06-23 | Rates show actuals in second row | Approved | Rates | Adam Suarez | - | 2025-06-23 |
| D022 | Decision | 2025-06-23 | Other expenses split for current month | Approved | Other Expenses | Adam Suarez | - | 2025-06-23 |
| D023 | Decision | 2025-06-23 | Statistics replace with actuals | Approved | Statistics | Adam Suarez | - | 2025-06-23 |
| I013 | Issue | 2025-06-23 | Employee role transition tracking | Open | Payroll | Jonathan Aulson | HRIS Team | - |
| R006 | Risk | 2025-06-23 | Meeting frequency for completion | Open | Project | Adam Suarez | - | - |

## 1. Actuals Display Strategy

### 1.1. Display Methodology by Tab

#### 1.1.1. Overview of Approaches

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#actualdata` `#UI` `#display` `#allfeatures`
**Decision Log References:** `D021` `D022` `D023`

Jonathan initiated the discussion: "So I thought I wanted to. Kind of go back through some of these stuff we we talked about last week related to. Showing actuals and how we're gonna show variance. I just wanted to kind of recap everything."

Initial confusion was quickly resolved:
Jonathan: "We want to show actuals, kind of replacing the values. In in the cells as opposed to like showing them. Oh no. Actually, I take that back. I think on on one of the tabs. Actually I think we said we did want it in addition."

Adam clarified: "I think other expense was in addition, statistics was over, right?"

Jonathan confirmed: "Yeah. OK. Let me make sure I've got that."

Adam added: "And I think rates rates was in addition as well."

### 1.2. Rates Tab Implementation

#### 1.2.1. Second Row Display

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#rates` `#actualdata` `#UI` `#secondrow` `#addition`
**Decision Log References:** `D021`

Jonathan documented the decision: "So we want rates to show. Actual numbers show. In. 2nd row."

**Implementation Details:**
- Actuals appear in a second row below forecast/budget
- Both values visible simultaneously
- Enables easy comparison
- Addition method (not replacement)

### 1.3. Other Expenses Implementation

#### 1.3.1. Current Month Split Display

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#otherexpenses` `#actualdata` `#currentmonth` `#split`
**Decision Log References:** `D022`

Jonathan noted: "And then other expenses as well split it?"

The discussion continued to clarify that this split display would only apply to the current month, maintaining clarity while showing actual performance against forecast.

### 1.4. Statistics Tab Implementation

#### 1.4.1. Replacement Method

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#statistics` `#actualdata` `#replacement` `#override`
**Decision Log References:** `D023`

Adam confirmed the approach: "I think other expense was in addition, statistics was over, right?"

**Implementation Details:**
- Actuals replace forecast values when available
- No second row needed
- Cleaner display for volume metrics
- Focus on actual performance

### 1.5. Payroll Tab Considerations

#### 1.5.1. Scheduled Hours Display

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - Under Discussion`
**Tags:** `#payroll` `#scheduledhours` `#legion` `#display`
**Integration Points:** `Legion`

While not explicitly detailed in this segment, the team referenced payroll display in the context of showing scheduled hours with appropriate cost calculations, maintaining consistency with other tab approaches.

## 2. HRIS Data Quality Issues

### 2.1. Employee Role Tracking

#### 2.1.1. Role Transition Challenges

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - Issue Identified`
**Tags:** `#issue` `#HRIS` `#data` `#payroll` `#workday`
**Integration Points:** `HRIS` `Workday`
**Decision Log References:** `I013`

Jonathan explained a critical data issue: "Yeah, that's that's like the. That was the piece that led us here from the last review. We were trying to work with was we just didn't have a way to, like, reliably understand when. When an employee was was not in a role like we can see when they kind of entered a role, but then it it they never left is kind of what the data made it appear."

He also noted data quality issues: "Right where an employee has more than one cost center, he's we've got these blanks so. I get. You know, I'm assuming we just are meant to take this data. For this row."

Adam agreed: "Yeah, I think that's the case."

#### 2.1.2. Terminated Employee Data

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - Under Investigation`
**Tags:** `#issue` `#security` `#data` `#termination` `#workday`
**Decision Log References:** `I013`

Jonathan identified a specific issue: "These these folks show up when I, when I look in the the work day. Rls by security table, but they don't show up in this report, so just trying to find out you know where these guys are or what what the reasoning is there."

Adam hypothesized: "Yeah, I don't know why they would be. I wonder if they were their terminated employees and they weren't weren't terminated correctly. Yeah, that doesn't make. Should match, at least in my opinion."

Jonathan agreed: "Yeah, that that. OK, that's kind of where I was headed with it too. I we just need to understand what's going on there."

## 3. Steering Committee Preparation

### 3.1. Demo Planning

#### 3.1.1. UAT Site Demonstration

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - Planned`
**Tags:** `#demo` `#steeringcommittee` `#UAT` `#presentation`

Jonathan outlined his plan: "I guess just to touch on it, we've got that steering committee meeting tomorrow. And I plan to give a demo. I'm gonna demo from the UAT site and just kind of go through these tabs and the P&L and just kinda speak to where everything is at in terms of development. Anything in particular you want me to make sure to include or? Or avoid anything top of mind for you."

### 3.2. Project Risk Assessment

#### 3.2.1. Meeting Frequency Concerns

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Risk Identified`
**Tags:** `#risk` `#project` `#meetings` `#schedule`
**Decision Log References:** `R006`

Adam raised a critical concern: "So MM boy and I have like a one-on-one and I guess we were just talking about the project in general. I guess any, is there anything you guys are like? Concerned about? Maybe not as like a risk, but something that we think like there's a potential that we would need to meet on more frequently to finish. Or are we overall he[aded in the right direction]?"

**Risk Factors:**
- Current meeting frequency may be insufficient
- Potential need for increased collaboration
- Timeline pressure for completion
- Stakeholder availability challenges

### 3.3. Stakeholder Coordination

#### 3.3.1. Scheduling Challenges

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - Noted`
**Tags:** `#coordination` `#stakeholder` `#scheduling`

The team noted ongoing challenges with stakeholder coordination, particularly mentioning "Guy" who had been traveling and dealing with acquisition-related activities, creating scheduling difficulties for required meetings.

## 4. Environmental Context

### 4.1. Meeting Conditions

#### 4.1.1. Extreme Weather Impact

**Source Document(s):** `20250623_Forecasting_BacklogGrooming_4`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Context`
**Tags:** `#environment` `#meeting` `#context`

The meeting began with discussion of extreme heat conditions:

Adam: "Pretty good. It's pretty hot here. It's like over 100° so."

Jonathan: "Yuck."

Adam: "It's getting pretty supposed to be pretty bad this week... some massive heat waves supposed to cool down and like, the back half of the week with some rain. But trying to stay, stay inside this week."

This context explains the reduced attendance (Amy and Mike absent) and potentially impacts team productivity during this period.

## Cross-Reference Index

### By Feature
- Statistics → Section 1.4.1
- Rates → Section 1.2.1
- Other Expenses → Section 1.3.1
- Payroll → Section 1.5.1, Section 2.1.1, Section 2.1.2

### By User Role
- Account Manager → Implicit in all display decisions
- District Manager → Implicit in all display decisions

### By Integration Point
- HRIS → Section 2.1.1, Section 2.1.2
- Workday → Section 2.1.1, Section 2.1.2
- Legion → Section 1.5.1
- EDW → Implicit in actuals discussions

### By Stakeholder
- Adam Suarez (Product Owner) → All sections
- Jonathan Aulson (Business Analyst) → All sections
- Amy Sowells (mentioned) → Section 4.1.1
- Mike Foy (mentioned) → Section 4.1.1

### By Decision Date
- 2025-06-23 → Section 1.1.1, Section 1.2.1, Section 1.3.1, Section 1.4.1

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| Addition method | Display approach showing both forecast and actuals | Section 1.1.1 |
| Replacement method | Display approach where actuals override forecast | Section 1.4.1 |
| Second row | UI pattern for showing actuals below forecast/budget | Section 1.2.1 |
| RLS | Row Level Security | Section 2.1.2 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-23 | Meeting Transcript | Initial documentation of actuals display decisions |
