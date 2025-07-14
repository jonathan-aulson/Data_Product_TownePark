I want you to now synthesize everything you've learned into a comprehensive document which accurately describe the business requirements, system specifications and behavior, functional and non-functional requirements and considerations, environment and infrastructure, business processes, user flows, integrations, data schemas, data integration and business logic details and all other aspects of the financial systems we are building for Towne Park. 

The purpose of this documentation will be to use as a data product that will empower AI assisted conversation and text and/or code generation.  Do not omit details, but instead paraphrase and organize information into logical groupings based on topic with clearly articulated metadata to create documentation that is ideal for use with AI models. 


You now have all of the backlog grooming and user interview meeting transcripts for the Forecasting project.  Create a master document that details out everything you've learned in extreme detail, catalogued in such a way as to be most useful to an AI model.  Do not summarize, organize.  Do not omit anything you know, include everything.










You now have all of the backlog grooming and user interview meeting transcripts for the Forecasting project.  We will next work on creating a master document that details out everything you've learned in extreme detail, catalogued in such a way as to be most useful to an AI model, one section at a time.  For each section, do not omit anything you know, include everything that pertains (to the section requested section only).  


Remember, when we fill this in, we'll want to include:
*   **Source Document(s):** [e.g., `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`]
*   **Date Discussed/Decided:** [e.g., `2025-03-17`]
*   **Key Stakeholders Involved:** [e.g., `Jonathan Aulson, Amy Sowells, Adam Suarez`]
*   **Version/Status:** [e.g., `v1.0 - Finalized`, `v0.5 - Draft for Review`]

This metadata within each detailed section will be crucial for AI.


Begin by filling in only the section below:

---

**Towne Park Financial Systems - Master Documentation**

**Version:** `[Current Version, e.g., 0.1 - Outline]`
**Last Updated:** `[Current Date, e.g., 2025-05-14]`

**1. Introduction & Overview**
    1.1. Purpose of this Document
    1.2. Scope of Systems Covered (Billing, Forecasting, supporting data structures, etc.)
    1.3. Intended Audience (Internal Teams, AI Models)
    1.4. Project Goals & Objectives (for the financial systems)
    1.5. Key Terminology & Acronyms (Glossary)

**2. Business Context & Requirements**
    2.1. Towne Park Business Overview (as relevant to these systems)
    2.2. Pain Points Addressed by New Systems
    2.3. Overall Business Requirements
        2.3.1. High-Level Goals (e.g., accuracy, efficiency, predictability)
        2.3.2. Key Performance Indicators (KPIs) for the Business & Systems
    2.4. Stakeholder Landscape
        2.4.1. Finance Department
        2.4.2. Operations (AMs, DMs, VPs, SVPs)
        2.4.3. IT Department
        2.4.4. Executive Leadership

**3. System Architecture & Environment**
    3.1. High-Level System Diagram (Conceptual flow between systems)
    3.2. Core Systems & Their Roles
        3.2.1. **Power Bill (Billing System)** - Built on Dataverse
        3.2.2. **Forecasting System** - Built on Dataverse
        3.2.3. **Enterprise Data Warehouse (EDW)** - SQL Server (Node1, Node2)
        3.2.4. **Legion** (Scheduling & Timekeeping)
        3.2.5. **Workday** (HR, Roles, Job Families - future state for some data)
        3.2.6. **Great Plains (GP)** (Accounting - source of actuals)
        3.2.7. **Dataverse** (Underlying database for Power Bill & Forecasting)
        3.2.8. **Power BI** (Reporting & Analytics)
        3.2.9. **Microsoft Fabric** (Potential future for Silver/Gold data)
    3.3. Infrastructure & Environment
        3.3.1. Cloud Platforms (Azure, Power Platform)
        3.3.2. Database Technologies
        3.3.3. Network Considerations (Performance, Data Gateways, vNETs)
    3.4. Development & Deployment
        3.4.1. Development Lifecycle
        3.4.2. Release Management
        3.4.3. Environment Strategy (Dev, UAT, Prod)

**4. Core System Modules & Functionalities**
    4.1. **Billing System (Power Bill)**
        4.1.1. Customer & Site Management
            4.1.1.1. Data Sourced from Master Non-Financial
            4.1.1.2. Refreshable Fields (Site Name, District, Region, Rooms, Spaces)
            4.1.1.3. Non-Refreshable/Manually Maintained Fields (Vendor ID, Billing Email, Invoice Recipient, Address)
        4.1.2. Contract Management
            4.1.2.1. Deal Types (Fixed Fee, Per Occupied Room, Per Labor Hour, Revenue Share, Management Agreement)
            4.1.2.2. "10 Percenter" Complex Deals
            4.1.2.3. Contract Term Configuration (Rates, Escalators, Billable Accounts, Profit Splits, Management Fees, etc.)
        4.1.3. Invoice Generation
            4.1.3.1. Data Aggregation for Invoicing
            4.1.3.2. Statement Generation & Delivery
            4.1.3.3. Handling of Ad Hoc Billable Items (e.g., Non-GL Billable Expenses)
            4.1.3.4. PDF Generation Engine
        4.1.4. Revenue Recognition Logic
        4.1.5. User Interface (UI) & User Experience (UX)
            4.1.5.1. Admin Panel
            4.1.5.2. Sidebar Widgets (Future Concept)
    4.2. **Forecasting System**
        4.2.1. Site Selection & Period Definition
        4.2.2. Site Statistics Forecasting
            4.2.2.1. Input Metrics (Occupancy, Drive-in, Valet Vehicles, Self-Park Vehicles, Comps, Aggregators etc.)
            4.2.2.2. Data Views (Budget, Forecast, Actuals, Prior Year)
            4.2.2.3. Time Granularity (Daily, Weekly, Monthly, Quarterly input/view)
            4.2.2.4. UI for Stat Input (Calendar view, Metric view, Grid editing)
            4.2.2.5. Calculation Logic (Capture Ratio, Drive-in Ratio, External Revenue from stats)
        4.2.3. Parking Rate Forecasting
            4.2.3.1. Rate Categories (Valet Overnight, Self Daily, etc., including Aggregators)
            4.2.3.2. Data Views (Budget, Forecast, Actuals, Prior Year)
            4.2.3.3. Rate Input & Overrides (Handling of rate increases, guardrails for input)
        4.2.4. Payroll Forecasting
            4.2.4.1. Input by Job Family (GSA, GSC, Valet, Bell, Shuttle, Cashier, Salaried)
            4.2.4.2. Input by Job Code (for Per Labor Hour sites or detailed views)
            4.2.4.3. Input Metrics (Hours, Cost)
            4.2.4.4. Data Views (Budget, Scheduled, Forecast, Actuals - from Legion/Payroll Summary)
            4.2.4.5. Time Granularity (Daily, Weekly, Monthly input/view)
            4.2.4.6. UI for Payroll Input (Slider bars, direct input, alerts for variance)
            4.2.4.7. Handling of Salaried Employee Costs & Allocations
        4.2.5. Other Internal Revenue Forecasting
            4.2.5.1. Categories (Billable Expenses, Revenue Validations, Credits/Other Billable Items, GPO Fees, Signing Bonuses)
            4.2.5.2. Monthly Input
            4.2.5.3. Data Views (Forecast, Actuals - where available)
        4.2.6. Other Expenses Forecasting (Manual Adjustments)
            4.2.6.1. Input by Expense Category (e.g., Uniforms, Tickets)
            4.2.6.2. Monthly Input against Budget
        4.2.7. P&L (Profit & Loss) Views
            4.2.7.1. Line Items (External Revenue, Internal Revenue, Payroll, Claims, PTAB, Insurance, Other Expenses, Parking Rents, FLC)
            4.2.7.2. Data Views (Budget, Forecast, Actuals, Prior Year, Variances in $ and %)
            4.2.7.3. Roll-up Hierarchy (Site, District, Region, SVP Region, Corporate)
            4.2.7.4. Filtering (Org Filters, Customer Filters - COG, Contract Type, P&L Category)
            4.2.7.5. Trend Analysis (Year-over-year, Quarter-over-quarter)
        4.2.8. DM+ Overrides & Audit Trail
        4.2.9. Proforma & New Site Forecasting ("Average Billing Profile" concept)
        4.2.10. UI/UX Considerations
            4.2.10.1. "Show Budget" / "Show Actuals" toggles
            4.2.10.2. Save Mechanisms (Auto-save vs. Manual with warning)
            4.2.10.3. Visual Alerts for Variances
            4.2.10.4. "Show Guide" / Help Text
            4.2.10.5. Monthly Summary Tab (Future Concept)
    4.3. **Budgeting System** (Future - Placeholder for details when defined)

**5. Data Management**
    5.1. Key Data Entities & Schemas
        5.1.1. Customer & Site Data (Master Non-Financial, Power Bill specific fields)
        5.1.2. Contract Data (Deal terms, rates, escalators)
        5.1.3. Statistical Data (Vehicles, Rooms, Occupancy, Drive-in, Capture Ratios)
        5.1.4. Budget Data
            5.1.4.1. `Budget_Final` (EDW) - Site stats, P&L line items
            5.1.4.2. `Budget_Data_Tab_PR` (EDW) - Payroll hours & cost
        5.1.5. Forecast Data (Stored in Dataverse)
            5.1.5.1. Site Statistics Forecast
            5.1.5.2. Parking Rate Forecast
            5.1.5.3. Payroll Forecast (Hours & Cost by Job Family/Code)
            5.1.5.4. Other Internal Revenue Forecast
            5.1.5.5. Other Expenses Forecast
        5.1.6. Actuals Data
            5.1.6.1. `Account_Summary` (EDW via GP) - Month-end P&L actuals
            5.1.6.2. `Revenue_DataMart_Daily` / `Revenue_Daily_Detail_Invoice` (EDW via RSS) - Daily external revenue & stats
            5.1.6.3. `VW_Payroll_Summary` (Legion DB via EDW) - Actual payroll hours & cost
            5.1.6.4. `Shift_Entity` & `Schedule_Cost_Entity` (Legion DB via EDW) - Scheduled payroll hours & cost
            5.1.6.5. Power Bill Invoice Data - Actuals for billable validations, some billable expenses
        5.1.7. Payroll & HR Data
            5.1.7.1. `Workday_Site_Salaries` (EDW) - Salaried employee pay & allocations
            5.1.7.2. Job Codes & Job Families (Workday - future state, manual mapping initially)
        5.1.8. User & Role Data
            5.1.8.1. `Workday_RLS_By_Security` (EDW) - AM/DM to site/district mapping
            5.1.8.2. Custom Role Mapping Table (Dataverse) - For roles above DM
    5.2. Data Sources & Lineage (Traceability from source to P&L)
    5.3. Data Integration & Flow
        5.3.1. EDW <-> Forecasting System (Budget data in, Forecast data out for reporting)
        5.3.2. Legion <-> Forecasting System (Payroll schedule/actuals in, Forecasted demand out - future)
        5.3.3. Workday -> EDW/Forecasting System (Role data, Job Family data)
        5.3.4. Power Bill <-> GP (Invoice data to GP, Actuals from GP)
        5.3.5. RSS -> EDW (Daily stats and revenue)
    5.4. Data Refresh Cadence & Latency
    5.5. Data Storage & Capacity (Dataverse limits, EDW capacity)
    5.6. Data Quality, Validation, and Reconciliation Processes

**6. Business Processes & User Flows**
    6.1. Forecasting Workflow
        6.1.1. AM Initial Forecast Creation (Stat input, Rate review, Payroll input, Other Revenue/Expense input)
        6.1.2. P&L Review by AM
        6.1.3. DM/VP Review & Override Process
        6.1.4. Forecast Submission / "Calling the Shot" (Process outside system, uses snapshot)
    6.2. Billing Workflow (High-level, as it impacts forecasting data sources)
    6.3. Budgeting Workflow (High-level, annual process)
    6.4. User Onboarding & Role Assignment Process

**7. Functional & Non-Functional Requirements**
    7.1. **Functional Requirements** (Summary - "The system shall...")
        7.1.1. Allow users to input/view/edit X data...
        7.1.2. Calculate Y based on Z inputs...
        7.1.3. Display P&L rollups based on user role...
    7.2. **Non-Functional Requirements**
        7.2.1. Performance (Page load times, calculation speed)
        7.2.2. Scalability (User concurrency, data volume growth)
        7.2.3. Security (Role-based access, data protection, PII considerations for payroll)
        7.2.4. Usability & Accessibility (Simplicity, intuitiveness, minimizing clicks)
        7.2.5. Reliability & Availability
        7.2.6. Maintainability
        7.2.7. Auditability (Tracking changes, user actions)
        7.2.8. Data Accuracy & Integrity

**8. User Roles & Permissions**
    8.1. Account Manager (AM) / Associate Manager
    8.2. District Manager (DM)
    8.3. Director of Operations (DOO)
    8.4. Regional Vice President (RVP)
    8.5. Senior Vice President (SVP) - Read-only for their hierarchy
    8.6. Forecast Admin (Super User - e.g., FP&A) - Edit all
    8.7. Corporate Consumer - Read-only all
    8.8. (Permissions matrix for viewing/editing specific modules/data)

**9. Reporting & Analytics (Beyond in-app P&L)**
    9.1. Power BI Reporting Strategy
    9.2. Key Reports for Different Audiences (AM, DM, RVP, SVP, Finance, Execs)
    9.3. Data Requirements for External Reporting

**10. Future Considerations & Roadmap**
    10.1. Full Budgeting Module Integration
    10.2. Enhanced AI/ML Driven Forecasting Algorithms
    10.3. Deeper Legion Integration (e.g., pushing forecast demand to Legion)
    10.4. Streamlining "10 Percenter" Deal Management
    10.5. Automation of Job Family Mapping via Workday
    10.6. Mobile Accessibility

**11. Appendices**
    11.1. Detailed Data Dictionary (Field names, types, descriptions, sources)
    11.2. List of Key Stored Procedures & Views Used
    11.3. UI Mockup Archive (Links or embedded images of key screens)
    11.4. Meeting Summaries & Decision Logs (Cross-references)

---