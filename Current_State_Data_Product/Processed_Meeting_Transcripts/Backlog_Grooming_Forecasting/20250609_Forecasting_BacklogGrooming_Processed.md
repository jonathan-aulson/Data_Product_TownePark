# Towne Park Financial System - Backlog Grooming: Forecasting Documentation

**Document ID:** 20250609_Forecasting_BacklogGrooming_2
**Created:** 2025-06-09
**Last Updated:** 2025-06-09
**Content Coverage Period:** 2025-06-09
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Payroll, Internal Revenue, P&L View, UAT Planning
**Product Owners Present:** Yes: Amy Sowells, Adam Suarez
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures key information regarding UAT planning, Internal Revenue implementation, payroll override concepts, and claims forecasting discussions from the June 9, 2025 backlog grooming session. It covers critical decisions about timing for operations UAT, the completion of Internal Revenue features, and initial planning for claims integration. This content is based on 1 meeting transcript of approximately 1 hour duration.

**Key Decisions Made:**
- Operations UAT will wait until after next Sprint release for better system polish
- Focus UAT on Account Managers (AMs) and District Managers (DMs) initially
- Internal Revenue and payroll override features targeted as key UAT milestones
- Initial exploration of claims forecasting with insurance liaison

**Open Issues/Risks:**
- Amy Sowells encountering multiple UAT issues during close period
- Claims forecasting integration complexity unknown
- Limited time for UAT during financial close

**Integration Points Discussed:**
- Claims system integration
- Insurance data requirements
- P&L view connections

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250609_Forecasting_Backlog_2 | 2025-06-09 | Backlog Grooming | Jonathan Aulson, Amy Sowells, Adam Suarez, Michael Foy | Amy Sowells, Adam Suarez, Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D004 | Decision | 2025-06-09 | Delay Operations UAT until after next Sprint | Approved | UAT Process | Jonathan Aulson | Amy Sowells | 2025-06-09 |
| D005 | Decision | 2025-06-09 | Focus initial UAT on AMs and DMs | Approved | UAT Process | Amy Sowells | Amy Sowells | 2025-06-09 |
| I002 | Issue | 2025-06-09 | Multiple UAT issues encountered during close | Open | Multiple | Amy Sowells | Development Team | - |
| R001 | Risk | 2025-06-09 | Limited UAT time during financial close | Open | UAT Process | Amy Sowells | Amy Sowells | - |

## 1. UAT Planning and Strategy

### 1.1. Operations UAT Timing

#### 1.1.1. UAT Milestone Decision

**Source Document(s):** `20250609_Forecasting_Backlog_2`
**Date Discussed/Decided:** `2025-06-09`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Amy Sowells (Product Owner)`, `Adam Suarez (Product Owner)`, `Michael Foy`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#UAT` `#planning` `#milestone`
**Decision Log References:** `D004`

Jonathan proposed delaying Operations UAT to achieve better system stability: "Is that to get past this next Sprint would be a pretty good point in time 'cause at that point we've got Internal Revenue finished on the P&L and we've got this override concept on payroll built and so having them actually kind of go through a UAT process might might make sense."

Amy Sowells agreed: "Yeah, it might be better. It sounds like you're suggesting we wait until this next Sprint is released. Right, which might be better because I like I was coming across a lot of issues when I was doing UAT and I have like a whole day devoted to it."

**Key Decisions:**
- Operations UAT postponed until after next Sprint release
- Internal Revenue completion on P&L view required before UAT
- Payroll override concept must be built before UAT
- Focus on fixing current issues before field involvement

#### 1.1.2. UAT Participant Strategy

**Source Document(s):** `20250609_Forecasting_Backlog_2`
**Date Discussed/Decided:** `2025-06-09`
**Key Stakeholders Involved:** `Amy Sowells (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#decision` `#UAT` `#accountmanager` `#districtmanager`
**Decision Log References:** `D005`

Amy Sowells emphasized the target audience: "Sure. Definitely like am S and DMS." (Account Managers and District Managers)

She further clarified the UAT approach: "Yeah, exactly that way. They're not necessarily like finding errors like hopefully we find most of the errors and they get corrected before. They're more so just viewing it and giving us feedback on the system, yeah."

**Key Decisions:**
- Primary UAT participants: Account Managers and District Managers
- UAT focus shifted from error detection to system feedback
- Internal team to resolve errors before Operations UAT
- Wider pilot group planned after initial UAT

### 1.2. Current UAT Status

#### 1.2.1. System Readiness Assessment

**Source Document(s):** `20250609_Forecasting_Backlog_2`
**Date Discussed/Decided:** `2025-06-09`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Amy Sowells (Product Owner)`
**Version/Status:** `v1.0 - In Progress`
**Tags:** `#issue` `#UAT` `#quality` `#testing`
**Decision Log References:** `I002` `R001`

Jonathan acknowledged current system state: "Yeah, the the point in time which we started UAT with you guys. It's it's still a little rough. I like the idea of having a little more Polish on it before we get the the field involved."

Amy noted resource constraints: "I think on a week from today because, quite frankly, I haven't had a lot of time to do it during close."

**Key Issues:**
- System currently "rough" for UAT
- Multiple issues discovered by Amy during testing
- Time constraints during financial close period
- Need for system polish before field exposure

## 2. Feature Planning and Integration

### 2.1. Claims Forecasting Initiative

#### 2.1.1. Insurance Claims Integration Planning

**Source Document(s):** `20250609_Forecasting_Backlog_2`
**Date Discussed/Decided:** `2025-06-09`
**Key Stakeholders Involved:** `Amy Sowells (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Exploration`
**Tags:** `#exploration` `#integration` `#claims` `#insurance`
**Integration Points:** `Claims System` `Insurance Data`

Amy initiated discussion on a new integration requirement: "One I know we kinda had an open item as it related to client like forecasting claims and I had an initial call with... Like our support person. That's like kind of the liaison between town park and our claim[s]"

**Key Points:**
- Initial exploration phase for claims forecasting
- Insurance liaison identified as key contact
- Integration complexity to be determined
- Potential new feature for forecasting system

## Cross-Reference Index

### By Feature
- Internal Revenue → Section 1.1.1
- Payroll → Section 1.1.1
- P&L View → Section 1.1.1
- Claims → Section 2.1.1

### By User Role
- Account Manager → Section 1.1.2
- District Manager → Section 1.1.2

### By Integration Point
- Claims System → Section 2.1.1
- Insurance Data → Section 2.1.1

### By Stakeholder
- Amy Sowells (Product Owner) → Section 1.1.1, Section 1.1.2, Section 1.2.1, Section 2.1.1
- Adam Suarez (Product Owner) → Section 1.1.1
- Jonathan Aulson (Business Analyst) → All sections

### By Decision Date
- 2025-06-09 → Section 1.1.1, Section 1.1.2

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| AM | Account Manager | Section 1.1.2 |
| DM | District Manager | Section 1.1.2 |
| UAT | User Acceptance Testing | Section 1.1.1 |
| Claims | Insurance claims that may need forecasting | Section 2.1.1 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-09 | Meeting Transcript | Initial documentation from backlog grooming session |
