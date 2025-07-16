---
title: "Towne Park Billing System - PowerBill Overview"
description: "Comprehensive overview of Towne Park's PowerBill billing system including architecture, features, and business impact"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-05-13
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "20250513_Master - General_Info.md"
  - "20250609_Success Metrics & ROI Analysis.md"
systems:
  - Billing
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Invoice Generation
user_roles:
  - Billing Admin
  - Account Manager
  - Corporate Billing Team
tags:
  - billing
  - powerbill
  - overview
  - system-architecture
  - business-impact
---

# Towne Park Billing System - PowerBill Overview

## Purpose & Scope

PowerBill is Towne Park's strategic modernization initiative for financial operations, representing a comprehensive transformation of the company's $1 billion annual revenue billing system. The system replaces legacy Excel-dependent processes with a modern, automated solution built on Microsoft Power Platform, designed to establish Dataverse as the single source of truth for contracts and billing data while providing a scalable platform for business growth and acquisitions.

## Business Context

Towne Park is a leading national hospitality company specializing in parking and mobility solutions, managing $1 billion in annual revenue across over 770 locations, primarily in the hospitality and healthcare sectors. The PowerBill system addresses critical business challenges including Excel dependency, manual processes, data integrity issues, operational inefficiencies, and scalability limitations that previously constrained the company's growth and acquisition strategy.

### Legacy System Challenges Addressed

**Excel Dependency Issues:**
- Complex network of interlinked Excel spreadsheets with 18+ tabs
- Intricate macros and formulas difficult to maintain
- Revenue Spreadsheets (RSS) requiring manual data entry by Account Managers
- Time-consuming and error-prone processes, especially during month-end closing

**Data Integrity & Accuracy Problems:**
- Lack of data controls leading to inaccuracies and potential revenue leakage
- Diminished confidence in financial reporting
- Manual cash balancing and client revenue matching verification
- No centralized, queryable repository for contract details

**Operational Inefficiencies:**
- Billing cycle consuming nearly half the month
- Delayed general ledger closing
- Back-office inefficiencies limiting competitive responsiveness
- Complex employee onboarding due to Excel-based process complexity

**Scalability Limitations:**
- Each acquisition with differing contract structures exacerbated manual system problems
- Inefficient "Checklist Process" (PowerShell script) prone to versioning errors
- "RSS Logic App Flow" experiencing delays and "429 (Too Many Requests) Errors" under load
- Lack of non-production environment for testing

## Key Features & Functionality

### Core Billing Capabilities
- **Custom React-based User Interface**: Tailored specifically for the corporate billing team
- **Automated PDF Invoice Generation**: Professionally formatted, machine-readable invoices
- **Automated Email Distribution**: Streamlined invoice delivery to customers
- **Microsoft Great Plains Integration**: Seamless General Ledger updates
- **Streamlined Customer Onboarding**: Reduced from 1-2 days to minutes
- **Significant Manual Effort Reduction**: From 7 FTEs to largely automated operations managed by 3 FTEs

### Project Mercury Component
**Purpose**: Automates revenue data collection and reconciliation for locations without on-site managers

**Key Features:**
- Direct data sourcing from credit card merchant gateways
- Integration with hotel Property Management Systems (PMS)
- Elimination of manual RSS for unmanaged sites
- Utilizes data warehouses and specialized "Auto Recon" database for processing

### Contract Type Support
- **Revenue Sharing (Profit Split)**: Invoice based on percentage of reported net revenue
- **Management Agreements**: Client pays Towne Park's expenses; billed back or reduces profit split
- **Per Labor Hour (PLH)**: Invoice based on labor hours using Job Codes from Workday and rates from Dataverse
- **Fixed Fee**: Set monthly amount (common in hospitals) with potential annual increases
- **Per Occupied Room**: Flat rate per occupied room per day (hospitality) with scheduled fee increases

## Technical Architecture

### Frontend Architecture
- **Framework**: Custom React-based User Interface
- **Hosting**: Azure Static Web Apps (SWA)
- **Custom Domain**: `powerbill.townepark.com`
- **Example SWA Default Domain**: `ambitious-grass-00554670f.5.azurestaticapps.net`
- **Future Considerations**: Server-Side Rendering (SSR) with Next.js/Remix explored for performance and SEO improvements

### Backend Services
**Primary API Backend:**
- Managed Azure Functions (.NET) associated with the SWA
- Secondary: `Towne-Park-Billing-API-Functions` - Separate Azure Functions (.NET) app for direct database integration requiring VNET connectivity

**Specialized Services:**
- **PDF Generation**: `Towne-Park-Billing-PDF` - Microservice running in Azure Container Apps using Node.js & Playwright due to complexities of running Playwright in standard Azure Functions

### Data Storage Architecture
**Primary Data Storage:**
- **Microsoft Dataverse**: Contracts, configurations, billing data, customer data, and future forecasting data
- **Azure Blob Storage**: Generated PDF invoices and document storage

### Business Logic & Workflow Automation
**Primary Automation:**
- **Power Automate**: Extensive use for business logic, data integration, and automation
- **Azure Logic Apps**: Specific processes including legacy "RSS Logic App Flow" and "SmartConnect" for Legion integration

### CI/CD & Development Infrastructure
**Azure DevOps Project**: "Towne Park Billing"

**Repository Structure (7 identified repositories):**
1. `Towne Park Billing`: Contains the SWA (React front-end) and its managed Azure Functions
2. `Towne-Park-Billing-API-Functions`: For the VNET-integrated Azure Functions API
3. `Towne-Park-Billing-PA-Solution`: Power Platform solutions (Power Automate flows, etc.)
4. `Towne-Park-Billing-PDF`: Code for the PDF Creator microservice
5. `Towne-Park-Billing-QA`: Automated test scripts
6. `Towne-Park-Ready-for-Invoicing`: Related to legacy RSS ingestion process
7. Additional RSS-related repository (implied)

**Branching Strategy:**
- `develop`: Active development branch
- `release`: Intermediary branch for staging and pre-production validation
- `main` (aliased as `master`): Production branch with deployment triggers

**Azure Resource Groups:**
- **Production**: `stapp-billing-prod-e2-01`
- **Development**: `stapp-billing-dev-e2-01`

**Azure AD App Registrations:**
- `allata-prod` and `allata-non-prod`: Used for both billing and forecasting applications

## Integration Points

### External System Integrations
- **Microsoft Great Plains**: General Ledger integration
- **On-Premises SQL Data Warehouse (EDW)**: Via On-Premises Data Gateway for legacy RSS data and BI staging
- **"Leads" Scheduling System**: Actual payroll hours (critical for forecasting)
- **Legion**: Integrated via "SmartConnect" Logic App for data exchange post-invoicing
- **Credit Card Merchant Gateways**: For Project Mercury automated data sourcing
- **Hotel Property Management Systems (PMS)**: For Project Mercury revenue data collection
- **Workday**: Job code/GL mapping for Per Labor Hour billing logic

### Data Flow Architecture
**Legacy RSS Process (Being Phased Out):**
1. Account Managers submit Revenue Spreadsheets (RSS) to SharePoint
2. "RSS Logic App Flow" processes files and loads data to SQL EDW
3. Power Automate flow moves data from EDW to Dataverse
4. Supported by "Checklist Process" (PowerShell script)

**New Automated Billing Process:**
1. Dataverse serves as the source of truth
2. Automated invoice generation via PDF Creator
3. Direct GL integration with Great Plains
4. Comprehensive audit trails within Dataverse

## User Roles & Access Control

### Primary User Groups
**Corporate Billing Team:**
- Primary users of the PowerBill interface
- Responsible for invoice processing and customer management
- Reduced from 7 FTEs to 3 FTEs through automation

**Account Managers (~800 field-facing):**
- Submit revenue data through RSS process (legacy) or direct system input
- Access to forecasting module for operational management
- Site-specific access controls for assigned locations

**Operational Leadership:**
- Access to forecasting and reporting capabilities
- Strategic oversight of billing operations
- Performance metrics and ROI analysis

### Security Model
- **Azure AD Groups and RBAC**: Role-based access control
- **Subscription**: "Towne Park (Dev)"
- **Environment-specific access**: Production and development environment separation

## Business Impact & Outcomes

### Operational Efficiency Improvements
**Staff Reductions:**
- Invoice Processors: 4.0 FTE → 2.0 FTE (50% reduction)
- Supervisors: 3.0 FTE → 0.0 FTE (100% reduction)
- Approvers: 1.6 FTE → 0.2 FTE (87.5% reduction)
- **Total Annual Savings**: $499,500

**Process Efficiency Gains:**
- Customer setup time: 1 hour → 5-15 minutes (~85% improvement)
- Complex case setup: 1 day → 1 hour (~87.5% improvement)
- Billing error rate: 10% → 5% (50% reduction)
- Annual error-impacted billing reduction: $51.6 million

### Customer Migration Progress
**Current Status (as of documentation date):**
- Total customers: 741
- Online system customers: 621 (83.8%)
- Excel-based customers: 120 (16.2%)
- **Projected within 60 days**: 691 online customers (93.3%)

**Customer Breakdown:**
- 95 pre-existing Excel customers awaiting migration
- 25 new customers from recent acquisition with unknown billing requirements

### Scalability Achievements
- Maintained 7-day billing cycle despite absorbing 2 new acquisition companies
- Eliminated requirement for specialized contract knowledge in staff assignments
- Reduced training time for new billing staff by 65-75%
- Enhanced M&A integration capabilities with 85-87.5% setup time reduction

### Financial Impact
**Total Estimated Annual ROI**: $3.2M - $3.7M
- Direct Labor Savings: $499,500
- Process Efficiency Savings: $855,543
- Revenue Recovery: $516,000 - $1,032,000
- Cashflow Improvement Value: $1,300,000
- M&A Integration Savings: $28,600 - $42,900

**ROI Metrics:**
- Estimated Payback Period: 4-7 months
- 3-Year ROI: 284% - 646%
- 5-Year ROI: 540% - 1,143%

## Current Implementation Status

**System Deployment:**
- 556 of 771 sites on the new system (as of case study date)
- Phased rollout continuing for remaining sites
- Successful integration of 2 acquisition companies without billing cycle impact

**Outstanding Implementation Areas:**
- Migration of remaining 95 pre-existing Excel customers
- Integration of 25 new acquisition customers
- Completion of Project Mercury rollout for unmanaged locations

## Monitoring & Operations

### Key Monitoring Priorities
**Core Application Availability:**
- Azure Static Web Apps (SWA)
- Azure Functions
- Microsoft Dataverse
- Azure Container Apps
- On-Premises Data Gateway

**Critical Data Flow Monitoring:**
- Power Automate flows
- Logic Apps integrations
- Great Plains integration
- "Leads" system integration
- EDW data flows

**Security & Service Health:**
- Azure Security monitoring
- Service health alerts
- Performance metrics tracking

## Related Documentation

- [Towne Park Forecasting System Overview](../forecasting/overview.md)
- [Billing System Technical Architecture](../../technical/backend/billing-architecture.md)
- [Contract Types Business Rules](../../business-rules/contract-types/overview.md)
- [Invoice Generation Process](../../user-processes/billing-admin/generate-invoices.md)
- [System Integration Specifications](../../technical/integrations/billing-integrations.md)
- [PowerBill User Guide](../../user-processes/billing-admin/powerbill-user-guide.md)
- [Project Mercury Technical Specification](../../technical/backend/project-mercury.md)

## Glossary References

- **AM**: Account Manager
- **EDW**: Enterprise Data Warehouse (On-Premises SQL Server)
- **PLH**: Per Labor Hour (contract type)
- **PowerBill**: User-facing name/project name for the new billing solution
- **Project Mercury**: Component for automating unmanaged locations
- **RSS**: Revenue Spreadsheet (legacy)
- **SWA**: Static Web App (Azure service)
- **T-Park**: Operational model for remote locations