# Towne Park Financial System - Forecasting Demo Practice Documentation

**Document ID:** 20250623_Forecasting_DemoPrep_1
**Created:** 2025-06-23
**Last Updated:** 2025-06-23
**Content Coverage Period:** 2025-06-23
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Statistics, Rates, Payroll, Other Expenses, P&L View
**Product Owners Present:** No
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures a practice demo session for the Forecasting system conducted by Jonathan Aulson for Johnn Hesseltine. The demo covered the complete forecasting workflow from an Account Manager's perspective, including site 0349 (Hilton Walt Disney World). Key functionality demonstrated included the three-month forecast capability, statistics entry, parking rates management, payroll forecasting with job groups, other expenses, and P&L view integration. Several UI/UX improvements were identified during the session. This content is based on 1 meeting transcript lasting 59 minutes 16 seconds.

**Key Decisions Made:**
- Budget data serves as initial values until forecast is saved
- Job groups concept confirmed for simplifying payroll forecasting
- Rates shown at monthly level as averages
- Guide feature toggles persist per tab
- Show variance button approach selected over abstract comparison model

**Open Issues/Risks:**
- Several UI issues identified requiring fixes
- Inconsistent terminology between "show budget" and "show comparison"
- Job group mapping still using mock data
- In-month actualization process still under construction

**Integration Points Discussed:**
- EDW for actual rates data
- Legion for scheduled and actual payroll data
- Budget data initialization
- P&L integration with all forecast tabs

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250623_Forecasting_DemoPrep_1 | 2025-06-23 | Demo Practice | Jonathan Aulson, Johnn Hesseltine | Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D018 | Decision | 2025-06-23 | Budget data as default until forecast saved | Confirmed | All tabs | Jonathan Aulson | - | 2025-06-23 |
| D019 | Decision | 2025-06-23 | Job groups for payroll simplification | Approved | Payroll | Jonathan Aulson | - | 2025-06-23 |
| D020 | Decision | 2025-06-23 | Show variance button approach | Approved | Statistics | Jonathan Aulson | - | 2025-06-23 |
| I011 | Issue | 2025-06-23 | Inconsistent comparison terminology | Open | UI | Johnn Hesseltine | Jonathan Aulson | - |
| I012 | Issue | 2025-06-23 | Mock data for job groups | Open | Payroll | Jonathan Aulson | - | - |

## 1. System Access and Navigation

### 1.1. User Access Control

#### 1.1.1. Role-Based Site Visibility

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Demonstrated`
**Tags:** `#security` `#navigation` `#accountmanager` `#districtmanager` `#site`

Jonathan demonstrated the access control: "All right, so I am going to demo a forecast for site 0349. That's the Hilton Walt Disney World. Account manager for this site is Andre Johnson and the district manager is Peter Quinnen. So if I log in as Andre or Peter, this is the only site or if I'm Peter, only sites I'm going to see in this drop down are my district sites."

**Key Features:**
- Account Managers see only their assigned sites
- District Managers see all sites in their district
- Site dropdown filtered based on user role
- Clean separation of data access

### 1.2. Forecast Configuration

#### 1.2.1. Three-Month Forecast Framework

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#forecasting` `#timeperiod` `#configuration`
**Decision Log References:** `D018`

Jonathan explained the system design: "I then need to pick a starting month. So the system is built to support a three month forecast and the basis for that forecast starts here by choosing your starting month."

**Implementation Details:**
- Three-month rolling forecast capability
- Starting month selection drives entire forecast
- Time period views: Daily, Weekly, Monthly
- All tabs aligned to same forecast period

## 2. Statistics Tab Functionality

### 2.1. Data Entry Options

#### 2.1.1. Occupancy Input Methods

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#statistics` `#occupancy` `#UI` `#input`

The system provides flexibility in occupancy input: "Right now I have it set to accept occupancy as a percentage. And that's this first column. I can change that to instead look for occupied rooms. That's based off the total number of available rooms."

**Options Available:**
- Percentage-based occupancy input
- Occupied rooms count input
- Toggle between methods
- Automatic calculation between formats

#### 2.1.2. Budget vs Forecast Data Distinction

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Clarified`
**Tags:** `#budget` `#forecast` `#data` `#initialization`
**Decision Log References:** `D018`

Jonathan clarified a critical concept: "Our system will serve up the budgeted values for all of these statistics, but it's not actually a forecast until I until I come into one of these cells and I make a change and so once I I've changed a value. And save this forecast. Until I take that action, there's no actual forecast data."

Johnn confirmed understanding: "That external revenue at the monthly view, I guess either visualizes. Or or as a function of budget data if I've not made any changes. Otherwise the moment I save a forecasted value, it's now a function of forecasted data. Is that correct?"

Jonathan confirmed: "That's correct, yeah."

### 2.2. UI Enhancements

#### 2.2.1. Guide Feature Behavior

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#UI` `#guide` `#usability` `#help`

Jonathan explained the guide persistence: "So now in the rates tab you can see again the guide is open for us here because I've not yet closed it on this tab... it'll stay open, but once they hide it. When they come back to the screen, it's going to stay hidden."

**Behavior:**
- Guide state persists per tab
- User preference remembered
- Independent toggle for each tab
- Consistent help availability

#### 2.2.2. Visual Enhancements Planned

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Planned`
**Tags:** `#UI` `#enhancement` `#visualization` `#statistics`

Jonathan outlined upcoming improvements: "There's a couple of plan enhancements we have for this screen. One is that we're going to add a row of blank white space, a kind of smaller white space row to break up the week visually in this in this list."

**Planned Enhancements:**
- Week divider rows for visual separation
- Column reordering (valet and self grouped)
- Improved data grouping
- Enhanced readability

## 3. Rates Tab Implementation

### 3.1. Rate Management

#### 3.1.1. Monthly Rate Averages

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Confirmed`
**Tags:** `#rates` `#parkingrates` `#monthly` `#averages`
**Decision Log References:** `D019`

Johnn asked for clarification: "Rates are at a monthly level, I gather."

Jonathan confirmed and explained: "Correct, yeah... It's meant to be an average because they can change and as you can see the actualized are often, you know there there's some variability in there."

**Implementation:**
- Rates entered as monthly averages
- Accommodates daily rate variations
- Actualized rates shown for comparison
- Orange color coding for actuals (temporary)

#### 3.1.2. Rate Propagation Enhancement

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Backlog`
**Tags:** `#enhancement` `#rates` `#usability` `#backlog`

Jonathan mentioned future usability improvements: "There's a couple of usability enhancements that we have in the backlog. We're not sure right now if they'll be in by MVP or not, but things like, you know, if I change a rate in in the month of June, having that propagate out. Out towards all future months just for kinda to save a little time for the account manager."

## 4. Payroll Tab Innovation

### 4.1. Job Group Concept

#### 4.1.1. Simplified Payroll Forecasting

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - In Development`
**Tags:** `#payroll` `#jobgroups` `#simplification` `#forecasting`
**Integration Points:** `Legion`
**Decision Log References:** `D019` `I012`

Jonathan introduced the job group concept: "So job groups is. Kind of a new concept at Town Park. This is in line with our mission to make forecasting simpler and more straightforward for Account Manager. What we've done is take all of the job codes that exist at a site and map them to kind of groups that make sense."

**Job Groups Identified:**
- GSA (Guest Service Associate)
- GSC (Guest Service Cashier)
- Bell
- Cashier
- Valet
- Other standard groupings

Jonathan noted current limitations: "Now right now what we're looking at is is still mock data. This is still under construction, but what you'll see in production is our groups like GSA."

### 4.2. Legion Integration

#### 4.2.1. Scheduled vs Actual Data Visualization

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#payroll` `#legion` `#visualization` `#integration`
**Integration Points:** `Legion`

Jonathan explained the dual view: "Moving on to the payroll tab, this tab looks a little different than the others, so you'll see here two kind of side by side views. On the left we have a visual that brings in the scheduled and actual data. From Legion and on the right is where we can see our forecasted and budgeted data."

**Features:**
- Split view design
- Legion data on left
- Forecast entry on right
- Visual comparison capability

## 5. Other Expenses Tab

### 5.1. Expense Entry Design

#### 5.1.1. Positive Value Convention

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Clarified`
**Tags:** `#otherexpenses` `#UI` `#accounting` `#billable`

Johnn raised an important question about the UI language: "There's language here that says all value should be entered as positive dollar amounts. And so if that's if every single amount is positive now I don't know I can't. Distinguish between what's a credit and a, you know, and a debit, right?"

Jonathan clarified the intent: "No, you are. And I as soon as I heard myself say it, I winced. The what I I shouldn't have talked about it in terms of credit. What what I meant was I was what I was thinking about was more about billable expenses. So some of these. Expense accounts may actually be billable and so they get, they get passed through to the client and so they're not, they don't actually. So, so they end up not only on the expense row but also as Internal Revenue."

## 6. P&L View Integration

### 6.1. Variance Display

#### 6.1.1. Comparison Methodology Evolution

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Evolving`
**Tags:** `#pandl` `#variance` `#comparison` `#UI`
**Decision Log References:** `D020` `I011`

Johnn identified an inconsistency: "You showed me show budget versus I think show forecast on the very first screen we saw with statistics. It was show forecast and show comparison. Which you told me was showing the budgeted numbers. Should that? Is there an inconsistency there that needs to get trued up?"

Jonathan acknowledged and explained the evolution: "Yeah, and it will be. So on the forecast screens we had. This is one of those evolution things. We started by planning for multiple comparison sets of data... We're changing that approach. I think this is maybe a little too abstract. So we're our plan is to have a show variance button like like on the PNL. And then have 3 radio buttons that we would toggle between showing forecast, showing budget and showing prior year."

**New Approach:**
- Single "Show Variance" button
- Three radio options: Forecast, Budget, Prior Year
- Consistent across all views
- Less abstract than previous design

### 6.2. Conditional Formatting

#### 6.2.1. Variance Threshold Highlighting

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#pandl` `#variance` `#formatting` `#threshold`

Jonathan demonstrated the formatting rules: "And there's a little bit of conditional formatting in here. You might be able to tell anything over 7 1/2% difference is in bold. So here's an example of a 2 1/2% increase in regular font. Next to it, a 9 1/2% increase in bold. So we're showing a little bit of, we're drawing a little bit of attention to those greater numbers."

**Formatting Rules:**
- 7.5% threshold for bold formatting
- Applies to both positive and negative variances
- Draws attention to significant differences
- Enhances quick variance identification

## 7. District Manager Functionality

### 7.1. Multi-Site Management

#### 7.1.1. Aggregate View and Filtering

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#districtmanager` `#filtering` `#aggregate` `#district`

Jonathan explained district-level functionality: "From here the the the next like workflow to talk about is probably that of a district manager or above. And so that's where these filters kind of come into play as a district manager... Peter Quinnen is going to filter down to see just his district and apply that. And then from this view, we're going to see an aggregate of all of the forecasts for all of his district."

**Capabilities:**
- Filter by district
- Aggregate forecast views
- Budget and trend comparison
- Variance analysis at district level

#### 7.1.2. District-Level Forecast Editing

**Source Document(s):** `20250623_Forecasting_DemoPrep_1`
**Date Discussed/Decided:** `2025-06-23`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Under Review`
**Tags:** `#districtmanager` `#editing` `#workflow`

Jonathan explained the editing approach: "So for a district manager who wants to come in and and make changes to their district's forecast, the way they would do that is coming into the forecast. And selecting sites within their district. Essentially we're we're going to have the filters available here so that they can use that filter mechanism to select sites and edit."

He then reflected: "Although really, you know, as I say that out loud. That's really..."

**Considerations:**
- Filter-based site selection for editing
- Maintains site-level granularity
- Workflow still being refined

## Cross-Reference Index

### By Feature
- Statistics → Section 2.1.1, Section 2.1.2, Section 2.2.1, Section 2.2.2
- Parking Rates → Section 3.1.1, Section 3.1.2
- Payroll → Section 4.1.1, Section 4.2.1
- Other Expenses → Section 5.1.1
- P&L View → Section 6.1.1, Section 6.2.1

### By User Role
- Account Manager → Section 1.1.1, Section 3.1.2, Section 4.1.1
- District Manager → Section 1.1.1, Section 7.1.1, Section 7.1.2

### By Integration Point
- EDW → Section 3.1.1
- Legion → Section 4.1.1, Section 4.2.1
- Budget Data → Section 2.1.2

### By Stakeholder
- Jonathan Aulson (Business Analyst) → All sections
- Johnn Hesseltine → All sections

### By Decision Date
- 2025-06-23 → Section 2.1.2, Section 3.1.1, Section 4.1.1, Section 6.1.1

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| Job Groups | Simplified groupings of job codes for easier forecasting | Section 4.1.1 |
| GSA | Guest Service Associate | Section 4.1.1 |
| GSC | Guest Service Cashier | Section 4.1.1 |
| Three-month forecast | Rolling 90-day forecast period | Section 1.2.1 |
| Guide | Help feature that persists per tab | Section 2.2.1 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-23 | Meeting Transcript | Initial demo practice documentation |
