# Towne Park Financial System - May 2025 Backlog Grooming Consolidated Documentation

**Document ID:** 20250501-30_Forecasting_BacklogGrooming_Consolidated
**Created:** 2025-07-03
**Last Updated:** 2025-07-03
**Content Coverage Period:** 2025-05-01 to 2025-05-30
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Statistics, Payroll, Parking Rates, Other Expenses, Other Revenue, P&L View, FLC
**Product Owners Present:** Yes: Amy Sowells, Adam Suarez
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Processed

## Executive Summary

This document synthesizes key information from three Towne Park Forecasting system backlog grooming sessions held throughout May 2025. These sessions were pivotal in establishing core forecasting functionality, data model decisions, and integration architecture. Total meeting time: 4 hours 9 minutes across three sessions.

**Key Decisions Made:**
- Finalized payroll forecasting approach using Job Family groupings
- Established statistics calculation methodology for productivity metrics
- Confirmed P&L view structure and FLC (Front Line Contribution) calculations
- Approved integration patterns with Workday and Legion systems

**Open Issues/Risks:**
- Workday Job Family implementation timeline uncertainty
- Performance concerns with large site datasets
- User training requirements for complex forecasting features

**Integration Points Discussed:**
- Workday integration for Job Family mapping
- Legion system connectivity for scheduling data
- EDW integration for historical data analysis
- Budget Data system interfaces

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Duration | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|----------|--------------|--------------------------|------------|
| 20250501_Forecasting_Backlog_1 | 2025-05-01 | Backlog Grooming | 1h 42m 38s | Jonathan Aulson, Amy Sowells, [Others] | Amy Sowells, Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250501_Backlog%20Grooming_%20Forecasting.docx |
| 20250512_Forecasting_Backlog_2 | 2025-05-12 | Backlog Grooming | 1h 25m 16s | Jonathan Aulson, Michael Foy, [Others] | Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250512_Backlog%20Grooming_%20Forecasting.docx |
| 20250530_Forecasting_Backlog_3 | 2025-05-30 | Backlog Grooming | 1h 1m 51s | Jonathan Aulson, Michael Foy, [Others] | Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250530_Backlog%20Grooming_%20Forecasting.docx |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D025 | Decision | 2025-05-01 | Job Family approach for payroll forecasting approved | Approved | Payroll | Amy Sowells | Adam Suarez | 2025-05-01 |
| D026 | Decision | 2025-05-12 | Statistics calculation methodology finalized | Approved | Statistics | Michael Foy | Development Team | 2025-05-12 |
| D027 | Decision | 2025-05-30 | P&L view structure and FLC calculations confirmed | Approved | P&L View, FLC | Jonathan Aulson | Amy Sowells | 2025-05-30 |
| I015 | Issue | 2025-05-01 | Workday Job Family implementation timing uncertain | Open | Payroll | Amy Sowells | External Team | - |
| I016 | Issue | 2025-05-12 | Performance optimization needed for large datasets | Open | Statistics | Michael Foy | Development Team | - |
| R005 | Risk | 2025-05-30 | Complex forecasting features may require extensive training | Mitigating | All Features | Jonathan Aulson | Amy Sowells | - |

## Content Sections

### 1. Core Forecasting Features

#### 1.1. Payroll Forecasting Implementation

**Source Document(s):** `20250501_Forecasting_Backlog_1`
**Date Discussed/Decided:** `2025-05-01`
**Key Stakeholders Involved:** `Amy Sowells (Product Owner)`, `Jonathan Aulson (Business Analyst)`
**User Story Reference:** `US-112`, `US-113`
**Feature Reference:** `F-23`
**Version/Status:** `v1.5 - Approved`
**Tags:** `#requirement` `#decision` `#technical` `#forecasting` `#payroll` `#workday` `#integration` `#amysowells`
**Integration Points:** `Workday` `EDW` `Budget Data`
**Decision Log References:** `D025` `I015`

The payroll forecasting approach was significantly refined during the May 1st session. Amy Sowells led the discussion on simplifying input mechanisms while maintaining accuracy for revenue calculations.

**Key Decisions:**
- Primary forecasting will use Job Family level (GSA, GSC, Valet, Bell, Shuttle, Cashier, Salaried)
- Per Labor Hour (PLH) sites will require Job Code level detail for accurate billing
- Workday integration will provide Job Family to Job Code mapping
- Manual input will be available as fallback until Workday implementation

Open Questions:

*   Timeline for complete Workday Job Family implementation
*   Handling of new job codes not yet mapped to families

#### 1.2. Statistics and Productivity Metrics

Source Document(s): `20250512_Forecasting_Backlog_2` Date Discussed/Decided: `2025-05-12` Key Stakeholders Involved: `Michael Foy (Development)`, `Jonathan Aulson (Business Analyst)` User Story Reference: `US-108`, `US-109` Feature Reference: `F-21` Version/Status: `v1.3 - Approved` Tags: `#requirement` `#decision` `#technical` `#forecasting` `#statistics` `#productivity` `#performance` Integration Points: `EDW` `Legion` `Actual Data` Decision Log References: `D026` `I016`

Statistics calculation methodology was established to provide accurate productivity forecasting and performance analysis.

Key Decisions:

*   Productivity metrics will be calculated using rolling 12-month averages
*   Seasonal adjustments will be applied automatically based on historical patterns
*   Real-time data updates will be available for current period statistics
*   Performance benchmarking will compare against district and regional averages
Open Questions:

*   Performance optimization for sites with large transaction volumes
*   Handling of irregular seasonal patterns

#### 1.3. P&L View and FLC Calculations

Source Document(s): `20250530_Forecasting_Backlog_3` Date Discussed/Decided: `2025-05-30` Key Stakeholders Involved: `Jonathan Aulson (Business Analyst)` User Story Reference: `US-125`, `US-126` Feature Reference: `F-28`, `F-29` Version/Status: `v1.0 - Approved` Tags: `#requirement` `#decision` `#business` `#forecasting` `#pandl` `#flc` `#revenue` `#expenses` Integration Points: `Budget Data` `Actual Data` `EDW` Decision Log References: `D027` `R005`

The P&L view structure and Front Line Contribution (FLC) calculations were finalized to provide comprehensive financial forecasting.

Key Decisions:

*   P&L view will include all revenue and expense categories
*   FLC calculations will separate direct operational costs from overhead
*   Month-over-month and year-over-year comparisons will be available
*   Drill-down capability to individual cost centers
Related Components:

*   Section 2.1 (Revenue Forecasting)
*   Section 2.2 (Expense Management)

### 2\. Integration Architecture

#### 2.1. Workday Integration for Job Management

Source Document(s): `20250501_Forecasting_Backlog_1`, `20250530_Forecasting_Backlog_3` Date Discussed/Decided: `2025-05-01` to `2025-05-30` Key Stakeholders Involved: `Amy Sowells (Product Owner)`, `Jonathan Aulson (Business Analyst)` Tags: `#technical` `#integration` `#workday` `#payroll` `#jobfamily` `#amysowells` Integration Points: `Workday` `API` Decision Log References: `D025` `I015`

Workday integration strategy was defined to support Job Family management and payroll forecasting.

Key Decisions:

*   API-based integration with Workday for Job Family definitions
*   Real-time synchronization of job code changes
*   Fallback to manual entry during system maintenance
*   Data validation rules for job family assignments

## Cross-Reference Index

### By Feature

*   Statistics ? Section 1.2
*   Payroll ? Section 1.1, Section 2.1
*   P&L View ? Section 1.3
*   FLC ? Section 1.3

### By User Role

*   Account Manager ? Section 1.1, Section 1.3
*   District Manager ? Section 1.2, Section 1.3
*   Corporate Finance ? Section 1.3

### By Integration Point

*   Workday Integration ? Section 1.1, Section 2.1
*   EDW Integration ? Section 1.1, Section 1.2, Section 1.3
*   Legion Integration ? Section 1.2

### By Stakeholder

*   Amy Sowells (Product Owner) ? Section 1.1, Section 2.1, Decision D025, Issue I015
*   Jonathan Aulson (Business Analyst) ? Section 1.1, Section 1.3, Section 2.1, Decision D027, Risk R005
*   Michael Foy (Development) ? Section 1.2, Decision D026, Issue I016

### By Decision Date

*   2025-05-01 ? Section 1.1, Section 2.1, Decision D025, Issue I015
*   2025-05-12 ? Section 1.2, Decision D026, Issue I016
*   2025-05-30 ? Section 1.3, Section 2.1, Decision D027, Risk R005

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
| --- | --- | --- |
| FLC | Front Line Contribution - Revenue minus direct operational expenses | Section 1.3 |
| Job Family | Grouping of similar job codes for simplified forecasting | Section 1.1 |
| PLH | Per Labor Hour - Billing method for specific client sites | Section 1.1 |
| GSA | Ground Support Agent job family | Section 1.1 |
| GSC | Ground Support Coordinator job family | Section 1.1 |
| P&L | Profit and Loss statement view | Section 1.3 |

## Document History & Changelog

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | 2025-07-03 | AllataBot AI | Initial processing of May 2025 backlog grooming sessions (1st, 12th, 30th) |
