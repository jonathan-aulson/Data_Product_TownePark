# Towne Park Financial System - Backlog Grooming: Tab Naming Documentation

**Document ID:** 20250625_Forecasting_BacklogGrooming_5  
**Created:** 2025-06-25
**Last Updated:** 2025-06-25
**Content Coverage Period:** 2025-06-25
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Statistics/Vehicle Tab, Adjustments, Legion Integration, Variance Display
**Product Owners Present:** Yes: Amy Sowells, Adam Suarez
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures critical decisions about UI terminology and feature prioritization from the June 25, 2025 backlog grooming session. The team debated renaming the Statistics tab to better reflect its content (vehicles and occupancy), discussed adjustment functionality, and prioritized copying Legion scheduled data over variance table displays. These decisions were made following steering committee feedback. This content is based on 1 meeting transcript lasting 1 hour 28 minutes 23 seconds.

**Key Decisions Made:**
- Statistics tab name retained (not changed to Vehicle/Demand)
- Legion schedule copy feature prioritized over variance tables
- Green background removal from other revenue tab
- Other expenses split display for current month only with conditional formatting

**Open Issues/Risks:**
- Tab naming still not ideal but acceptable
- Real estate constraints for column headers
- Variance table implementation deferred

**Integration Points Discussed:**
- Legion scheduled data copying
- External revenue adjustments
- Budget data integration

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250625_Forecasting_BacklogGrooming_5 | 2025-06-25 | Backlog Grooming | Jonathan Aulson, Amy Sowells, Adam Suarez | Amy Sowells, Adam Suarez, Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D024 | Decision | 2025-06-25 | Keep Statistics as tab name | Approved | Statistics | Team | - | 2025-06-25 |
| D025 | Decision | 2025-06-25 | Prioritize Legion copy over variance table | Approved | Payroll | Adam Suarez | - | 2025-06-25 |
| D026 | Decision | 2025-06-25 | Remove green background from other revenue | Approved | Other Revenue | Team | - | 2025-06-25 |
| I014 | Issue | 2025-06-25 | Real estate constraints for headers | Open | Statistics | Amy Sowells | - | - |

## 1. Tab Naming Discussion

### 1.1. Statistics Tab Nomenclature

#### 1.1.1. Naming Options Evaluation

**Source Document(s):** `20250625_Forecasting_BacklogGrooming_5`
**Date Discussed/Decided:** `2025-06-25`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Amy Sowells (Product Owner)`, `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#UI` `#naming` `#statistics` `#vehicle`
**Decision Log References:** `D024` `I014`

Jonathan initiated the discussion following steering committee feedback: "So based on our kind of conversation at the steering committee, I wanted to rehash some of the stories we have starting next Sprint. So the first one is with the. Stats page. And I guess. Before I go too much further, do we wanna? Is this statistics tab? Is that the wording that we wanna go with, or is there some other labeling that we need to think about here?"

Amy suggested alternatives: "Maybe it's, I don't know. Adam should be like vehicle volume or something."

Adam provided additional context: "Yeah, I'd be fine with. I think Brian and Mike Boy mentioned naming it demand, but I don't know if the account managers were. I mean, guess they could figure it out pretty quickly, right?"

He then elaborated on options: "So either demand volume or. Or we could just say vehicle stab. I mean, I think vehicle vehicles would be the most friendly name that I think everyone would understand exactly like what you're supposed to put in there. 'cause, there's there's nothing. Dollar related. Really in that tab."

Jonathan noted: "Yeah, just just the calculated external revenue, I suppose."

#### 1.1.2. Final Decision on Naming

**Source Document(s):** `20250625_Forecasting_BacklogGrooming_5`
**Date Discussed/Decided:** `2025-06-25`
**Key Stakeholders Involved:** `Amy Sowells (Product Owner)`, `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#compromise` `#UI` `#statistics`
**Decision Log References:** `D024`

Amy raised the complexity: "I mean, it's also occupancy too. So we could also leave it statistics and then have like. A. A header that says vehicles in each column. I know real estate is a problem though."

Adam concluded: "Yeah, I think that's fine. I don't think we don't. Probably don't need any. I think the main concern was w[hether people understand it]"

**Final Decision:**
- Keep "Statistics" as the tab name
- Acknowledges both vehicle and occupancy data
- Avoids real estate issues with headers
- Team consensus on acceptability

### 1.2. Adjustment Functionality

#### 1.2.1. External Revenue Adjustments

**Source Document(s):** `20250625_Forecasting_BacklogGrooming_5`
**Date Discussed/Decided:** `2025-06-25`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Referenced`
**Tags:** `#adjustment` `#externalrevenue` `#requirement`

Adam reminded about pending functionality: "Yep. And then I think we'll probably have to touch on the adjustment piece that you we are pinging back and forth on."

Jonathan acknowledged: "Yeah, yeah. OK."

This references ongoing discussions about adjustment capabilities for external revenue calculations, though detailed requirements were not finalized in this session.

## 2. Feature Prioritization

### 2.1. Legion Integration Features

#### 2.1.1. Copy Scheduled Data Functionality

**Source Document(s):** `20250625_Forecasting_BacklogGrooming_5`
**Date Discussed/Decided:** `2025-06-25`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Adam Suarez (Product Owner)`, `Amy Sowells (Product Owner)`
**Version/Status:** `v1.0 - Prioritized`
**Tags:** `#priority` `#legion` `#integration` `#payroll` `#usability`
**Integration Points:** `Legion`
**Decision Log References:** `D025`

Jonathan presented the feature comparison: "And I'll give you an example there, Adam 'cause, I know we really want that table, a feature that I think might take priority over that one is the copy feature that we've talked about copying the scheduled data from Legion into the forecast. To me, that feels like a really important feature."

He detailed the implementation vision: "As we get the scheduled data from Legion, I want the account manager either from this view or from. Let me change to a future month here. Whether they're looking at it here and they can just click at the top of the card or if they're editing. I want. I want there to be a just a link that allows them to copy this any scheduled. Information scheduled hours into the forecasted date."

Adam strongly agreed: "Yeah, I think that's probably more important like that. That was like. A pretty big enhancement that we're probably gonna wanna communicate to the field."

Amy concurred: "Yeah, I agree."

**Implementation Details:**
- One-click copy from Legion scheduled to forecast
- Available from both view and edit modes
- Major workflow enhancement for users
- High communication priority for field

### 2.2. Variance Display Features

#### 2.2.1. Deferred Variance Table

**Source Document(s):** `20250625_Forecasting_BacklogGrooming_5`
**Date Discussed/Decided:** `2025-06-25`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Deferred`
**Tags:** `#deferred` `#variance` `#payroll` `#visualization`
**Decision Log References:** `D025`

Adam rationalized the deferral: "I think they can deal with the line comparison and like the hover over rollout, I mean it's should be able to visually get like a good idea with those lines where you landed in in any given day."

Jonathan documented the decision: "Until variance. They will always implemented. Harrison. And so forth."

**Rationale:**
- Existing line visualizations provide adequate information
- Copy feature provides more immediate value
- Can be implemented in future phase

## 3. UI Cleanup Items

### 3.1. Other Revenue Tab

#### 3.1.1. Green Background Removal

**Source Document(s):** `20250625_Forecasting_BacklogGrooming_5`
**Date Discussed/Decided:** `2025-06-25`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#UI` `#cleanup` `#otherrevenue` `#formatting`
**Decision Log References:** `D026`

Jonathan noted a UI issue: "Other revenue that we're not doing any comparisons there. That's just a intake form. We do need, so we built that with that green background, which we need to remove. Green background. Shan."

**Action:**
- Remove green background from other revenue tab
- Maintain as simple intake form
- No comparison functionality needed

### 3.2. Other Expenses Display

#### 3.2.1. Current Month Split Display

**Source Document(s):** `20250625_Forecasting_BacklogGrooming_5`
**Date Discussed/Decided:** `2025-06-25`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Clarified`
**Tags:** `#otherexpenses` `#display` `#currentmonth` `#actuals`

Jonathan clarified the implementation: "So for other expenses, split current month to show the 2nd row, we w[ant]"

This confirms the decision from the previous meeting about showing actuals in a second row for the current month only on the other expenses tab.

## 4. Communication Planning

### 4.1. Field Communication

#### 4.1.1. Legion Copy Feature Announcement

**Source Document(s):** `20250625_Forecasting_BacklogGrooming_5`
**Date Discussed/Decided:** `2025-06-25`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`
**Version/Status:** `v1.0 - Planned`
**Tags:** `#communication` `#fieldteam` `#enhancement` `#legion`

Adam emphasized the importance of field communication: "A pretty big enhancement that we're probably gonna wanna communicate to the field."

**Communication Points:**
- Major workflow improvement
- Reduces manual data entry
- Leverages existing Legion schedules
- Training material needed

## Cross-Reference Index

### By Feature
- Statistics → Section 1.1.1, Section 1.1.2
- Other Revenue → Section 3.1.1
- Other Expenses → Section 3.2.1
- Payroll → Section 2.1.1, Section 2.2.1
- Legion Integration → Section 2.1.1

### By User Role
- Account Manager → Section 2.1.1
- District Manager → Implicit in all features

### By Integration Point
- Legion → Section 2.1.1

### By Stakeholder
- Amy Sowells (Product Owner) → Section 1.1.1, Section 1.1.2, Section 2.1.1
- Adam Suarez (Product Owner) → All sections
- Jonathan Aulson (Business Analyst) → All sections

### By Decision Date
- 2025-06-25 → Section 1.1.2, Section 2.1.1, Section 3.1.1

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| Demand | Alternative name considered for Statistics tab | Section 1.1.1 |
| Vehicle volume | Another alternative name for Statistics tab | Section 1.1.1 |
| Legion copy | Feature to copy scheduled hours from Legion to forecast | Section 2.1.1 |
| Field | Operations teams who will use the system | Section 4.1.1 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-25 | Meeting Transcript | Initial documentation of tab naming and prioritization decisions |
