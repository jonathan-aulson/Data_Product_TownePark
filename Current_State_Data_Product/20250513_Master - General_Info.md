---

**Towne Park Financial Systems Modernization & Forecasting Initiative: Synthesized Knowledge Base**

**Version:** 2.0 (Consolidated)
**Date:** 5/13/2025
**Compiled By:** Gemini LLM (based on all information provided by Jonathan Aulson)

**Objective:** This document synthesizes all available information regarding Towne Park's billing system modernization project (referred to as "PowerBill," or "Towne Park Billing") and the integrated forecasting system. It is designed to serve as a comprehensive data product for understanding system architecture, business requirements, processes, data elements, and user context.

**I. Executive Summary & Project Overview**

*   **Core Initiative:** A strategic modernization of Towne Park's financial operations, commencing with the transformation of its $1 billion annual revenue billing system and extending to the development of a deeply integrated forecasting solution.
*   **Key Technologies:** Microsoft Power Platform (Dataverse, Power Automate), a custom React front-end, and a suite of Azure Cloud Services including Azure Static Web Apps, Azure Functions (.NET for primary backend, Node.js for specific services), Azure Container Apps, Azure Blob Storage, and Azure Logic Apps. Integration with on-premises systems is facilitated by the On-Premises Data Gateway.
*   **Primary Business Drivers:**
    *   Transition from inefficient, error-prone, and Excel-dependent legacy financial processes.
    *   Enhance data accuracy and establish a single source of truth for contracts and financial data.
    *   Dramatically reduce manual processing time for billing and forecasting.
    *   Improve scalability to support business growth and an aggressive acquisition strategy.
    *   Increase client satisfaction through professional, accurate, and timely invoicing.
    *   Provide field-facing staff with real-time data and improved tools for operational management and forecasting.
*   **Development Methodology:** An AI-enabled design approach was utilized, featuring AI-powered prototyping tools to generate real-time clickable prototypes. This facilitated rapid iteration and strong stakeholder alignment. Development followed a phased implementation model with User Acceptance Testing (UAT) at major milestones.
*   **Target Users:**
    *   **Billing System ("PowerBill"):** Corporate billing team.
    *   **Forecasting System:** Approximately 800 field-facing Account Managers (AMs) and operational leadership.

**II. Business Context & Challenges (Pre-Transformation)**

*   **Client Profile:** A leading national hospitality company specializing in parking and mobility solutions, managing $1 billion in annual revenue across over 770 locations, primarily in the hospitality and healthcare sectors.
*   **Legacy System Pain Points:**
    *   **Excel Dependency:** All financial operations, including billing, reporting, and projections, relied on a complex network of interlinked Excel spreadsheets. Revenue Spreadsheets (RSS) often had 18+ tabs with intricate macros and formulas that were difficult to maintain.
    *   **Manual Processes:** Account Managers manually entered daily revenue and operational data into RSS files, a time-consuming and error-prone task, especially during the critical first five days of the month for closing.
    *   **Data Integrity & Accuracy:** Lack of data controls in Excel led to inaccuracies, potential revenue leakage, and diminished confidence in financial reporting. Cash balancing and matching client-reported revenue were manual verification steps.
    *   **Operational Inefficiencies:** The billing cycle consumed nearly half the month, delaying general ledger closing. Back-office inefficiencies limited responsiveness to competitive pressures.
    *   **Onboarding & Maintenance:** Complexity of Excel-based processes made employee onboarding difficult and workbook maintenance a significant challenge.
    *   **Lack of Centralized Contract Data:** Contract details were often stored in inaccessible PDFs, with no central, queryable repository.
    *   **Scalability Issues:** Each new acquisition, with differing contract structures and site requirements, exacerbated the problems of the manual system.
    *   **Legacy Data Ingestion Issues:**
        *   The "Checklist Process" (PowerShell script for tracking RSS submissions) was inefficient, prone to versioning errors, ran in long batches (45 min - 1 hour), and lacked a non-production environment for testing.
        *   The "RSS Logic App Flow" (processing RSS from SharePoint to EDW) experienced delays and "429 (Too Many Requests) Errors" under load.
    *   **Forecasting Specific Pain Points (from User Interviews):**
        *   **Data Silos & Delays:** AMs had to pull data from multiple systems ("Leads" for payroll, Power BI for actuals, old revenue workbooks for history) with significant data lags (e.g., payroll actuals taking days to update). This prevented real-time analysis and reaction.
        *   **Rate Inflexibility:** Monthly average rates in Excel made it difficult to accurately forecast for groups with discounted daily rates, requiring manual workarounds (e.g., adjusting comp vehicle counts).
        *   **Transient Business Predictability:** Difficulty in accurately predicting transient business drive-in ratios, especially for events or holidays, impacting staffing.
        *   **Group vs. Transient Data:** Inability to easily separate and forecast group vs. transient business with distinct drivers.

**III. Implemented Solution: Billing System ("PowerBill" / Towne Park Billing)**

*   **A. Solution Overview & Objectives:**
    *   A custom, modernized billing solution built on the Microsoft Power Platform, designed to replace the legacy Excel-based system.
    *   Key objectives included improving accuracy, reducing processing time, establishing Dataverse as the single source of truth for contracts and billing data, and providing a scalable platform for growth.
*   **B. Key Features & Functionality:**
    *   Custom React-based user interface tailored for the corporate billing team.
    *   Automated generation of professionally formatted, machine-readable PDF invoices.
    *   Automated email distribution of invoices.
    *   Integration with Microsoft Great Plains for General Ledger updates.
    *   Streamlined new customer onboarding (reduced from 1-2 days to minutes).
    *   Significant reduction in manual effort for the billing process (from 7 FTEs to largely automated operations managed by 3 FTEs).
    *   **"Project Mercury" Component:** Focuses on automating revenue data collection and reconciliation for locations without on-site managers. It sources data directly from credit card merchant gateways and hotel Property Management Systems (PMS), aiming to eliminate manual RSS for these sites.
*   **C. Technical Architecture:**
    *   **Front-End:** Custom React-based User Interface.
        *   *Considerations for Server-Side Rendering (SSR) with Next.js/Remix were explored, potentially hosted on Azure Web Apps or advanced SWA features, to improve performance and SEO if needed.*
    *   **Application Hosting:** Azure Static Web Apps (SWA).
        *   **Custom Domain:** `powerbill.townepark.com`
        *   **Example SWA Default Domain:** `ambitious-grass-00554670f.5.azurestaticapps.net`
        *   *(Resource naming has evolved, e.g., `billing-pdf-create-prd-eastus2` for newer specific resources).*
    *   **API Backend:**
        *   Primary: Managed Azure Functions (.NET) associated with the SWA.
        *   Secondary: `Towne-Park-Billing-API-Functions` - A separate Azure Functions (.NET) app for direct database integration requiring VNET connectivity.
    *   **Data Storage:**
        *   **Primary:** Microsoft Dataverse (for contracts, configurations, billing data, customer data, and future forecasting data).
        *   **Documents:** Azure Blob Storage (for generated PDF invoices, etc.).
    *   **Business Logic & Workflow Automation:**
        *   **Primary:** Power Automate (extensive use for business logic, data integration, and automation).
        *   **Specific Processes:** Azure Logic Apps (e.g., legacy "RSS Logic App Flow," "SmartConnect" for Legion integration).
    *   **Specialized Services:**
        *   **PDF Generation:** `Towne-Park-Billing-PDF` - A microservice running in Azure Container Apps (using Node.js & Playwright) due to the complexities of running Playwright in standard Azure Functions.
    *   **CI/CD & Repositories (Azure DevOps):**
        *   **Azure DevOps Project:** "Towne Park Billing."
        *   **Repositories (7 identified):**
            1.  `Towne Park Billing`: Contains the SWA (React front-end) and its managed Azure Functions.
            2.  `Towne-Park-Billing-API-Functions`: For the VNET-integrated Azure Functions API.
            3.  `Towne-Park-Billing-PA-Solution`: Power Platform solutions (Power Automate flows, etc.).
            4.  `Towne-Park-Billing-PDF`: Code for the PDF Creator microservice.
            5.  `Towne-Park-Billing-QA`: Automated test scripts.
            6.  *(RSS Project)* `Towne-Park-Ready-for-Invoicing`: Likely related to the legacy RSS ingestion process.
            7.  *(Implicitly, another RSS-related repository if "RSS Project" implies two)*
        *   **Branching Strategy:**
            *   `develop`: Active development branch.
            *   `release`: Intermediary branch for staging and pre-production validation.
            *   `main` (aliased as `master` in SWA production deployment configuration): Production branch; deployments triggered from merges into this branch.
    *   **Resource Groups (Azure):**
        *   **Primary Active RGs:** `stapp-billing-prod-e2-01` (Production) and `stapp-billing-dev-e2-01` (Development). These host the core components of the new billing and forecasting solution.
    *   **App Registrations (Azure AD):**
        *   `allata-prod` and `allata-non-prod`: Used for both the billing and forecasting applications, replacing earlier "beta" named registrations.
*   **D. Key Integrations:**
    *   **Microsoft Great Plains:** For General Ledger.
    *   **On-Premises SQL Data Warehouse (EDW):** Via On-Premises Data Gateway. Serves as a staging area for legacy RSS data and potentially for BI.
    *   **"Leads" (Scheduling System):** For actual payroll hours (critical for forecasting).
    *   **Legion:** Integrated via the "SmartConnect" Logic App for data exchange post-invoicing.
    *   **Credit Card Merchant Gateways & Hotel PMS:** For "Project Mercury" automated data sourcing.
    *   **Workday:** For job code/GL mapping in "Per Labor Hour" billing logic.
*   **E. Outcomes & Business Impact (from Case Study):**
    *   Dramatically reduced processing time for billing.
    *   Improved data accuracy and established Dataverse as the contract source of truth.
    *   Enhanced customer satisfaction with professional, machine-readable invoices.
    *   Provided a scalable foundation for expansion and acquisitions.
    *   Reduced new customer onboarding from 1-2 days to minutes.
    *   Transformed billing from 7 FTEs manual work to largely automated operations by 3 FTEs.
    *   As of case study: 556 of 771 sites on the new system, with phased rollout for remaining sites.

**IV. In-Progress Solution: Forecasting System**

*   **A. Objectives & User Needs (from User Interviews):**
    *   Provide a "one-stop-shop" for AMs, integrating actuals (especially payroll from "Leads") and forecast inputs in near real-time.
    *   Improve forecast accuracy by allowing more granular inputs (e.g., group vs. transient occupancy/drive-in, daily rate adjustments for group discounts).
    *   Reduce manual effort and reliance on disparate Excel workbooks and reports.
    *   Enable quick comparison against budget and previous forecasts.
    *   Support flexible time granularity (daily, weekly, monthly, quarterly) for data entry and viewing.
    *   Provide visibility into how inputs affect the P&L in real-time.
*   **B. Target Users:** ~800 field-facing Account Managers and operational/financial leadership.
*   **C. Architecture:**
    *   Built as an integrated module within the "PowerBill" ecosystem, leveraging the same core architecture: React front-end (via Azure SWA), Dataverse backend, Azure Functions for complex calculations, and Power Automate for workflows.
*   **D. Key Data Inputs & Sources:**
    *   **Occupancy:** Provided by hotels (overall % and daily breakdown for month-of); group calendars for block bookings. AMs get detailed daily forecasts from hotels around the 15th of the prior month.
    *   **Historical Data:** AMs manually reference old revenue workbooks (up to 5+ years) for recurring group performance (drive-in, valet capture).
    *   **Rates:** Parking rates (user desire for daily input capability), payroll rates (from 'Rates' tab in legacy workbook, to be managed in new system).
    *   **Payroll Actuals:** From "Leads" scheduling system (critical for near real-time updates).
    *   **Budget Data:** Used to initialize the first draft of forecasts in the new system.
    *   **Other Expenses:** Based on categories from the legacy 'Other Expenses' tab.
*   **E. Core Forecasting Logic & Features (Observed & Desired):**
    *   **Statistics Input:** AMs input key drivers (Occupancy, Drive-In Ratio, Valet Capture); system auto-calculates derived vehicle volumes.
    *   **Rate Application:** Application of parking rates (potentially daily) and payroll rates to calculate revenue and labor costs.
    *   **Group vs. Transient:** Strong user requirement to forecast these segments separately due to different behaviors.
    *   **Payroll Forecasting:** AMs plan GSC hours consistently, then tweak based on actual schedules from "Leads." GSA hours flexed based on arrivals/departures and productivity targets (Payroll as % of Revenue).
    *   **Verification & Analysis:** AMs compare forecast to original commitment and budget. New system to show P&L updates in real-time and allow comparisons (e.g., forecast vs. budget).
    *   **Data Aggregation:** Daily inputs roll up to weekly, monthly, quarterly, and annual views.
    *   **P&L Impact:** Real-time visibility of how forecast inputs affect P&L line items.
*   **F. User Interface (from Demo):**
    *   Forecast section within the main "PowerBill" application.
    *   Site selection for AMs (only their assigned sites).
    *   Period selection (past read-only, future editable).
    *   Statistics input similar to workbook (minimal direct inputs, many auto-calculated).
    *   Payroll input showing Legion scheduled/actuals alongside forecast input fields (hours or cost).
    *   Ability to view and edit at different time granularities.
    *   Filters for slicing data (contract type, segment).

**V. Key Operational Models & Processes**

*   **A. Legacy Billing Data Ingestion (RSS Process):**
    *   AMs submit Revenue Spreadsheets (RSS) to SharePoint.
    *   "RSS Logic App Flow" processes files, loads data to SQL EDW.
    *   Power Automate flow moves data from EDW to Dataverse.
    *   Supported by an inefficient "Checklist Process" (PowerShell script).
*   **B. New Automated Billing Process:**
    *   Dataverse as the source of truth. Automated invoice generation (PDF Creator) and GL integration.
*   **C. Revisions Process (General Principles for New System):**
    *   To include: review workflows, error identification/correction in Dataverse, record updates, automated re-issuing of corrected invoices, customer communication logs, approval workflows (likely Power Automate), and comprehensive audit trails within Dataverse.
*   **D. "Project Mercury":**
    *   Automates data collection/reconciliation for unmanaged locations (no on-site staff).
    *   Sources revenue from credit card gateways & hotel PMS.
    *   Utilizes data warehouses and potentially a specialized "Auto Recon" database for processing.
*   **E. "T-Park":**
    *   Operational model for remote parking locations (often hotels) using technology (e.g., text-to-park) and benefiting from "Project Mercury" automation.

**VI. Deal/Contract Types & Their Implications:**

*   **Revenue Sharing (Profit Split):** Invoice based on a % of reported net revenue.
*   **Management Agreements:** Client pays Towne Park's expenses; billed back or reduces profit split. Not all have profit splits.
*   **Per Labor Hour (PLH):** Invoice based on labor hours. "Per Labor Hour Generation" Power Automate flow uses Job Codes (from Workday) and rates (from Dataverse).
*   **Fixed Fee:** Set monthly amount (common in hospitals). May include annual increases (CPI or pre-defined %, rarely prorated). Invoices often generated in advance.
*   **Per Occupied Room:** Flat rate per occupied room per day (hospitality). Often has scheduled fee increases.

**VII. IT Infrastructure & Operations**

*   **A. Azure DevOps CI/CD Pipelines:**
    *   Project: "Towne Park Billing."
    *   Repositories and branching strategy as detailed in Section III.C.
*   **B. Azure Resource Groups & Naming Conventions:**
    *   Active RGs: `stapp-billing-prod-e2-01` and `stapp-billing-dev-e2-01`.
    *   Evolving resource naming (e.g., `billing-pdf-create-prd-eastus2`).
*   **C. Security Model:**
    *   Azure AD Groups and RBAC. Subscription: "Towne Park (Dev)."
*   **D. Custom Connector ("SmartConnect" Logic App):**
    *   Integrates billing system with Legion for data exchange post-invoicing.
    *   Current manual production connector reused in dev; ARM template automation for environment-specific connectors is in progress.
*   **E. Key Monitoring Priorities (Initial "Must Do" Focus):**
    *   Core Application Availability (SWA, Functions, Dataverse, Container Apps, On-Prem Gateway).
    *   Critical Data Flow Success/Failure (Power Automate, Logic Apps, integrations with Great Plains, "Leads," EDW).
    *   Basic Azure Security & Service Health.

**VIII. Glossary of Key Terms & Acronyms:**

*   **AM:** Account Manager
*   **AR:** Accounts Receivable
*   **EDW:** Enterprise Data Warehouse (On-Premises SQL Server)
*   **FLC:** Front Line Contribution
*   **"Leads":** Scheduling system for payroll actuals.
*   **Legion:** System integrated with via "SmartConnect" Logic App.
*   **LDR:** Labor Distribution Report (mentioned in meeting transcripts)
*   **PLH:** Per Labor Hour (contract type)
*   **"PowerBill":** User-facing name/project name for the new billing solution.
*   **"Project Mercury":** Component for automating unmanaged locations.
*   **PTEB:** Payroll Taxes Employee Benefits
*   **RSS:** Revenue Spreadsheet (legacy)
*   **SWA:** Static Web App (Azure service)
*   **"T-Park":** Operational model for remote locations.
*   **"Auto Recon" DB:** Specialized database for Project Mercury.

**IX. Key Data Points from Legacy Forecasting Workbook (Conceptual Summary):**

*   **P&L Structure:** Tracks External/Internal Revenue, Payroll, Claims, Parking Rents, Other Expenses, PTEB, Insurance, FLC. Includes Actual, Budget, Trend, Forecast scenarios, variance analysis.
*   **Key Statistics:** Daily/monthly Occupied Rooms, Available Rooms, Occupancy %, Drive-In Ratio, Valet Capture, detailed vehicle volumes.
*   **Rate Management:** Centralized tab for Payroll hourly rates, blended Revenue Per Vehicle, PLH rates.
*   **Daily Granularity:** Revenue and Payroll data forecasted/actualized daily, then aggregated.
*   **Other Expenses:** Detailed chart of accounts, forecasted monthly.

**X. Known Challenges & Outstanding Questions for Full System Comprehension:**

*   **Architectural Delineation of RGs:** Precise strategic reason for component separation between `stapp-billing-*` and any other potentially related RGs (e.g., if `powerbill.townepark.com` SWA is hosted distinctly from components in `stapp-billing-*`).
*   **"SmartConnect" Logic App - Specifics:** Detailed data points/triggers for Legion integration.
*   **PDF Creator Workflow:** Definitive trigger and full delivery (storage to email) mechanism.
*   **EDW Role in "Project Mercury":** Is EDW a staging/processing hub for Project Mercury data, or only for legacy RSS?
*   **"Auto Recon" Database:** Technology, specific role, and data flow into/reconciliation with Dataverse.
*   **"Leads" Integration:** Specific technical mechanism for payroll actuals integration.
*   **Workday Integration:** Specifics of automation for Job Code/GL mapping.
*   **Front-End Rendering:** Final decision and current implementation status of Client-Side React vs. SSR (Next.js/Remix) and hosting model if SSR is used.
*   **AI-Powered Prototyping Tools:** Specific tools/platforms used.
*   **React Front-End Support Model:** Long-term strategy given client's initial resource considerations.
*   **Security Group Naming:** Confirmation of primary SG naming for new `stapp-billing-*` RGs.
*   **Legacy RSS Flow Status:** Is it being actively phased out or still operational for a subset of sites?
*   **"Department Report" (Legacy):** Source and purpose.
*   **Non-Production for Legacy Flow:** Plans for establishing this.

---

