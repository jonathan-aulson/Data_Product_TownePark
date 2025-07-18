# Towne Park Financial System - April 2025 Backlog Grooming Consolidated Documentation

**Document ID:** 20250401-28_Forecasting_BacklogGrooming_Consolidated
**Created:** 2025-07-03
**Last Updated:** 2025-07-03
**Content Coverage Period:** 2025-04-01 to 2025-04-28
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Statistics, Payroll, Parking Rates, Other Expenses, Other Revenue, P&L View, FLC, External Revenue, Internal Revenue
**Product Owners Present:** Yes: Amy Sowells, Adam Suarez
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Processed

## Executive Summary

This document synthesizes key information from six intensive Towne Park Forecasting system backlog grooming sessions held throughout April 2025. This period represented the most active development phase with critical architectural decisions, feature specifications, and implementation approaches finalized. Total meeting time: 7 hours 23 minutes across six sessions.

**Key Decisions Made:**
- Established comprehensive forecasting data architecture and API structure
- Finalized user interface design patterns and navigation flows
- Confirmed integration patterns with EDW, Budget Data, and external systems
- Approved statistical calculation methodologies and performance optimization strategies
- Defined expense and revenue categorization frameworks
- Established user role-based access controls and permissions

**Open Issues/Risks:**
- API performance under high concurrent user load
- Data synchronization timing across multiple source systems
- User adoption strategy for complex forecasting workflows
- Integration testing coordination with external system teams

**Integration Points Discussed:**
- EDW (Enterprise Data Warehouse) for historical data
- Budget Data systems for baseline forecasting
- Actual Data systems for real-time comparisons
- Workday for employee and job management
- Legion for scheduling integration
- Power BI for advanced reporting

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Duration | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|----------|--------------|--------------------------|------------|
| 20250401_Forecasting_Backlog_1 | 2025-04-01 | Backlog Grooming | 47m 6s | Jonathan Aulson, Adam Suarez, [Others] | Adam Suarez, Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250401_Backlog%20Grooming_%20Forecasting.docx |
| 20250402_Forecasting_Backlog_2 | 2025-04-02 | Backlog Grooming | 1h 29m 46s | Jonathan Aulson, Cesar Figueroa, [Others] | Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250402_Backlog%20Grooming_%20Forecasting.docx |
| 20250407_Forecasting_Backlog_3 | 2025-04-07 | Backlog Grooming | 56m 54s | Jonathan Aulson, [Others] | Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250407_Forecasting_%20Backlog%20Grooming.docx |
| 20250414_Forecasting_Backlog_4 | 2025-04-14 | Backlog Grooming | 1h 26m 23s | Jonathan Aulson, Adam Suarez, [Others] | Adam Suarez, Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250414_Backlog%20Grooming_%20Forecasting.docx |
| 20250417_Forecasting_Backlog_5 | 2025-04-17 | Backlog Grooming | 1h 10m 33s | Jonathan Aulson, Amy Sowells, [Others] | Amy Sowells, Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250417_Backlog%20Grooming_%20Forecasting.docx |
| 20250428_Forecasting_Backlog_6 | 2025-04-28 | Backlog Grooming | 1h 23m 48s | Jonathan Aulson, Amy Sowells, Jim Boyer, [Others] | Amy Sowells, Jonathan Aulson | https://allata.sharepoint.com/sites/TownePark/Shared%20Documents/General/Data%20Products/Source%20Transcripts/20250428_Backlog%20Grooming_%20Forecasting.docx |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D015 | Decision | 2025-04-01 | Forecasting API architecture pattern established | Approved | All Features | Adam Suarez | Development Team | 2025-04-01 |
| D016 | Decision | 2025-04-02 | User interface navigation flow finalized | Approved | All Features | Cesar Figueroa | UX Team | 2025-04-02 |
| D017 | Decision | 2025-04-07 | Statistical calculation methods approved | Approved | Statistics | Jonathan Aulson | Development Team | 2025-04-07 |
| D018 | Decision | 2025-04-14 | Revenue categorization framework confirmed | Approved | External Revenue, Internal Revenue | Adam Suarez | Amy Sowells | 2025-04-14 |
| D019 | Decision | 2025-04-17 | User role permissions structure defined | Approved | All Features | Amy Sowells | Security Team | 2025-04-17 |
| D020 | Decision | 2025-04-28 | Performance optimization strategy approved | Approved | All Features | Jim Boyer | Development Team | 2025-04-28 |
| C003 | Change | 2025-04-14 | Modified payroll forecasting from Job Code to Job Family for standard sites | Approved | Payroll | Adam Suarez | Adam Suarez | 2025-04-14 |
| I010 | Issue | 2025-04-07 | API response time concerns under concurrent load | Open | All Features | Jonathan Aulson | Development Team | - |
| I011 | Issue | 2025-04-17 | Data synchronization timing coordination needed | Open | Integration | Amy Sowells | Integration Team | - |
| I012 | Issue | 2025-04-28 | Complex workflow user training requirements | Open | All Features | Jim Boyer | Training Team | - |
| R003 | Risk | 2025-04-02 | Integration testing timeline may impact go-live | Mitigating | All Features | Cesar Figueroa | Project Manager | - |
| R004 | Risk | 2025-04-28 | User adoption challenges for advanced features | Mitigating | Statistics, P&L View | Amy Sowells | Change Management | - |

## Content Sections

### 1. System Architecture and API Design

#### 1.1. Forecasting API Architecture

**Source Document(s):** `20250401_Forecasting_Backlog_1`, `20250402_Forecasting_Backlog_2`
**Date Discussed/Decided:** `2025-04-01` to `2025-04-02`
**Key Stakeholders Involved:** `Adam Suarez (Product Owner)`, `Cesar Figueroa (Development)`, `Jonathan Aulson (Business Analyst)`
**User Story Reference:** `US-085`, `US-086`, `US-087`
**Feature Reference:** `F-15`, `F-16`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#requirement` `#decision` `#technical` `#forecasting` `#API` `#architecture` `#integration` `#adamsuarez`
**Integration Points:** `API` `EDW` `Budget Data` `Actual Data`
**Decision Log References:** `D015` `D016` `R003`

The foundational API architecture for the forecasting system was established during the first two April sessions. Adam Suarez emphasized scalability and performance, while Cesar Figueroa focused on implementation feasibility.

**Key Decisions:**
- RESTful API design with JSON data exchange
- Microservices architecture for individual forecasting components
- Caching layer implementation for frequently accessed data
- Standardized error handling and response formats
- Authentication via OAuth 2.0 with role-based access

**Technical Implementation Details:**
```javascript
// Forecasting API Architecture
const ForecastingAPI = {
  baseUrl: '/api/v1/forecasting',
  endpoints: {
    statistics: '/statistics/{siteId}/{period}',
    payroll: '/payroll/{siteId}/{period}',
    parkingRates: '/parking-rates/{siteId}/{period}',
    otherExpenses: '/other-expenses/{siteId}/{period}',
    otherRevenue: '/other-revenue/{siteId}/{period}',
    plView: '/pl-view/{siteId}/{period}',
    flc: '/flc/{siteId}/{period}'
  },
  authentication: 'OAuth2',
  dataFormat: 'JSON',
  caching: {
    strategy: 'Redis',
    ttl: 300 // 5 minutes
  }
};

// Standard API Response Format
const APIResponse = {
  success: boolean,
  data: object | array,
  message: string,
  timestamp: string,
  requestId: string,
  errors: array
};

// Error Handling Structure
class ForecastingAPIError extends Error {
  constructor(message, code, details) {
    super(message);
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}
**Open Questions:**

*   Final API rate limiting parameters
*   Monitoring and alerting configuration

**1.2. User Interface Navigation and Workflow**

**Source Document(s):** **20250402\_Forecasting\_Backlog\_2**, **20250407\_Forecasting\_Backlog\_3** **Date Discussed/Decided:** **2025-04-02** to **2025-04-07** **Key Stakeholders Involved:** **Cesar Figueroa (Development)**, **Jonathan Aulson (Business Analyst)** **User Story Reference:** **US-090**, **US-091**, **US-092** **Feature Reference:** **F-18**, **F-19** **Version/Status:** **v2.0 - Approved** **Tags:** **#requirement** **#decision** **#UX** **#UI** **#forecasting** **#navigation** **#workflow** **Decision Log References:** **D016** **D017**

The user interface design and navigation workflows were comprehensively defined to ensure intuitive user experience across all forecasting features.

**Key Decisions:**

*   Tab-based navigation for main forecasting categories
*   Progressive disclosure for advanced features
*   Consistent data entry patterns across all modules
*   Real-time validation with inline error messages
*   Responsive design for desktop and tablet access

**2\. Core Forecasting Features Implementation**

**2.1. Statistical Analysis and Productivity Metrics**

**Source Document(s):** **20250407\_Forecasting\_Backlog\_3**, **20250414\_Forecasting\_Backlog\_4** **Date Discussed/Decided:** **2025-04-07** to **2025-04-14** **Key Stakeholders Involved:** **Jonathan Aulson (Business Analyst)**, **Adam Suarez (Product Owner)** **User Story Reference:** **US-095**, **US-096**, **US-097** **Feature Reference:** **F-21**, **F-22** **Version/Status:** **v1.5 - Approved** **Tags:** **#requirement** **#decision** **#business** **#forecasting** **#statistics** **#productivity** **#analytics** **Integration Points:** **EDW** **Legion** **Actual Data** **Decision Log References:** **D017** **D018**

Statistical analysis capabilities were defined to provide comprehensive productivity forecasting and performance benchmarking.

**Key Decisions:**

*   Multi-dimensional statistical analysis (time, location, service type)
*   Automated trend detection and anomaly identification
*   Seasonal adjustment algorithms for historical patterns
*   Predictive modeling for future period forecasts
*   Performance benchmarking against peer sites

**2.2. Revenue Categorization and Forecasting**

**Source Document(s):** **20250414\_Forecasting\_Backlog\_4**, **20250417\_Forecasting\_Backlog\_5** **Date Discussed/Decided:** **2025-04-14** to **2025-04-17** **Key Stakeholders Involved:** **Adam Suarez (Product Owner)**, **Amy Sowells (Product Owner)**, **Jonathan Aulson (Business Analyst)** **User Story Reference:** **US-102**, **US-103**, **US-104** **Feature Reference:** **F-25**, **F-26**, **F-27** **Version/Status:** **v1.2 - Approved** **Tags:** **#requirement** **#decision** **#business** **#forecasting** **#revenue** **#external** **#internal** **#categorization** **#adamsuarez** **#amysowells** **Integration Points:** **Budget Data** **Actual Data** **EDW** **Decision Log References:** **D018** **D019**

Revenue categorization framework was established to provide accurate forecasting across all revenue streams.

**Key Decisions:**

*   Clear separation between External and Internal revenue streams
*   Automated categorization based on revenue source codes
*   Flexible category management for new revenue types
*   Integration with existing budget and actual data systems
*   Monthly and quarterly forecasting capabilities

**2.3. Payroll Forecasting with Job Family Integration**

**Source Document(s):** **20250414\_Forecasting\_Backlog\_4**, **20250428\_Forecasting\_Backlog\_6** **Date Discussed/Decided:** **2025-04-14** to **2025-04-28** **Key Stakeholders Involved:** **Adam Suarez (Product Owner)**, **Amy Sowells (Product Owner)**, **Jim Boyer (BI)**, **Jonathan Aulson (Business Analyst)** **User Story Reference:** **US-112**, **US-113**, **US-114** **Feature Reference:** **F-23**, **F-24** **Version/Status:** **v2.1 - Approved** **Tags:** **#requirement** **#decision** **#change** **#technical** **#forecasting** **#payroll** **#jobfamily** **#workday** **#integration** **#adamsuarez** **#amysowells** **Integration Points:** **Workday** **EDW** **Budget Data** **Legion** **Decision Log References:** **C003** **D020** **I012**

Significant changes were made to payroll forecasting approach during April, with the shift from Job Code to Job Family level forecasting for most sites.

**Key Decisions:**

*   Standard sites will forecast at Job Family level for simplified input
*   PLH (Per Labor Hour) sites will maintain Job Code level detail for billing accuracy
*   Workday integration will provide Job Family to Job Code mapping
*   Performance optimization for large site datasets
*   Automated job code categorization based on Workday definitions

**Change Documentation:**

*   **Original Approach (pre-April 14):** All forecasting at Job Code level
*   **New Approach (post-April 14):** Job Family level for standard sites, Job Code level for PLH sites
*   **Reason for Change:** Simplified user input while maintaining billing accuracy
*   **Impact:** Reduced complexity for Account Managers, maintained precision for PLH billing
**Cross-Reference Index**

**By Feature**

*   Statistics → Section 2.1
*   Payroll → Section 2.3
*   Parking Rates → Section 1.2, Section 2.2
*   Other Expenses → Section 1.2, Section 2.2
*   Other Revenue → Section 2.2
*   P&L View → Section 2.1, Section 2.2
*   FLC → Section 2.1, Section 2.2
*   External Revenue → Section 2.2
*   Internal Revenue → Section 2.2

**By User Role**

*   Account Manager → Section 1.2, Section 2.3, Section 3.1
*   District Manager → Section 2.1, Section 2.2, Section 3.1
*   Corporate Finance → Section 2.1, Section 2.2, Section 3.1

**By Integration Point**

*   API Integration → Section 1.1
*   EDW Integration → Section 1.1, Section 2.1, Section 2.2, Section 2.3
*   Workday Integration → Section 2.3
*   Budget Data Integration → Section 1.1, Section 2.2, Section 2.3
*   Legion Integration → Section 2.1, Section 2.3

**By Stakeholder**

*   Adam Suarez (Product Owner) → Section 1.1, Section 2.1, Section 2.2, Section 2.3, Decisions D015, D018, Change C003
*   Amy Sowells (Product Owner) → Section 2.2, Section 2.3, Section 3.1, Decisions D019, Risk R004
*   Jonathan Aulson (Business Analyst) → Section 1.1, Section 1.2, Section 2.1, Section 2.2, Section 2.3, Section 3.1, Decision D017, Issue I010
*   Cesar Figueroa (Development) → Section 1.1, Section 1.2, Decision D016, Risk R003
*   Jim Boyer (BI) → Section 2.3, Section 3.1, Decision D020, Issue I012

**By Decision Date**

*   2025-04-01 → Section 1.1, Decision D015
*   2025-04-02 → Section 1.1, Section 1.2, Decision D016, Risk R003
*   2025-04-07 → Section 1.2, Section 2.1, Decision D017, Issue I010
*   2025-04-14 → Section 2.1, Section 2.2, Section 2.3, Decision D018, Change C003
*   2025-04-17 → Section 2.2, Section 3.1, Decision D019, Issue I011
*   2025-04-28 → Section 2.3, Section 3.1, Decision D020, Issue I012, Risk R004

**Glossary & Terminology**

| Term/Acronym | Definition | First Referenced In |
| --- | --- | --- |
| API | Application Programming Interface | Section 1.1 |
| PLH | Per Labor Hour - billing method for specific client sites | Section 2.3 |
| Job Family | Grouping of similar job codes for simplified forecasting | Section 2.3 |
| GSA | Ground Support Agent job family | Section 2.3 |
| GSC | Ground Support Coordinator job family | Section 2.3 |
| FLC | Front Line Contribution - Revenue minus direct operational expenses | Section 2.1 |
| TPH | Transactions Per Hour - productivity metric | Section 2.1 |
| OAuth 2.0 | Open standard for access delegation | Section 1.1 |
| REST | Representational State Transfer - architectural style for APIs | Section 1.1 |

**Document History & Changelog**

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | 2025-07-03 | AllataBot AI | Initial processing of April 2025 backlog grooming sessions (1st, 2nd, 7th, 14th, 17th, 28th) - Most intensive development period |
