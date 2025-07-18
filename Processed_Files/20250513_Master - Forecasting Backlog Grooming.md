**Towne Park Financial Systems - Master Documentation**

**Version:** `0.2 - Section 1 Populated`
**Last Updated:** `2025-05-14`

**1. Introduction & Overview**

    **1.1. Purpose of this Document**
        *   **Source Document(s):** `User Prompt 1 (Initial Instruction)`
        *   **Date Discussed/Decided:** `2025-05-14` (based on initial instruction)
        *   **Key Stakeholders Involved:** `Jonathan Aulson`
        *   **Version/Status:** `v1.0 - Finalized`

        This master document serves as a comprehensive, centralized repository of information pertaining to the financial systems being built and enhanced for Towne Park, specifically focusing on the Billing (Power Bill) and Forecasting systems. Its primary purpose is to function as a detailed "data product." This data product is designed to empower AI-assisted capabilities, including:
        *   AI-assisted conversations for information retrieval and system understanding.
        *   AI-driven text generation (e.g., summaries, explanations, new documentation).
        *   AI-assisted code generation or analysis by providing detailed context on system logic and data structures.
        The document aims to capture business requirements, system specifications, system behavior, functional and non-functional requirements, environmental and infrastructure details, business processes, user flows, integrations, data schemas, data integration logic, and business logic details. Information will be paraphrased and organized into logical groupings with clearly articulated metadata to ensure it is ideal for consumption and utilization by AI models, while also being a valuable resource for human stakeholders. Details are to be comprehensively included and not omitted.

    **1.2. Scope of Systems Covered**
        *   **Source Document(s):** `User Prompt 1 (Initial Instruction)`, `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (synthesized from all meetings)
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer, Cesar Figueroa, Christopher Thompson, Michael Foy`
        *   **Version/Status:** `v1.0 - Finalized`

        This documentation covers the suite of financial systems being developed and enhanced for Towne Park. The core systems within this scope include:
        *   **Billing System (Power Bill):** An existing system built on Microsoft Dataverse, undergoing enhancements. It handles customer setup, contract management (various deal types including "10 Percenters"), invoice generation, and revenue recognition.
        *   **Forecasting System:** A new system also being built on Microsoft Dataverse, designed to replace the current Excel-based forecasting process. It will cover forecasting for site statistics (occupancy, vehicles), parking rates, payroll (hours and cost), other internal revenue, and other expenses, culminating in P&L views.
        *   **Supporting Data Structures and Integrations:** This includes interactions with and data sourced from:
            *   **Enterprise Data Warehouse (EDW):** SQL Server (Node1, Node2) - a primary source for budget data, actuals, and other historical information.
            *   **Legion:** The system for employee scheduling and timekeeping, providing data for payroll actuals and scheduled hours/costs.
            *   **Workday:** The HR system, intended as a source for user roles (AM, DM), job family definitions, and potentially salaried employee cost allocations.
            *   **Great Plains (GP):** The accounting system, source for month-end actuals pushed to EDW (e.g., `Account_Summary`).
            *   **Microsoft Dataverse:** The underlying data platform for both the Billing and Forecasting applications.
            *   **Power BI:** The primary tool for external reporting and analytics, consuming data from Dataverse and EDW.
            *   **Revenue Spreadsheets (RSS):** The current manual system for some daily revenue and statistics, data from which is fed into EDW tables like `Revenue_DataMart_Daily`.
            *   **Microsoft Fabric:** Mentioned as a potential future environment for silver/gold level data.

    **1.3. Intended Audience**
        *   **Source Document(s):** `User Prompt 1 (Initial Instruction)`
        *   **Date Discussed/Decided:** `2025-05-14` (based on initial instruction)
        *   **Key Stakeholders Involved:** `Jonathan Aulson`
        *   **Version/Status:** `v1.0 - Finalized`

        The primary audiences for this master document are:
        *   **AI Models:** The document is structured to be a "data product" specifically for AI consumption, enabling AI-assisted conversation, text generation, and code generation.
        *   **Internal Teams:** This includes, but is not limited to:
            *   Development teams (e.g., Allata developers like Jonathan Aulson, Cesar Figueroa, Christopher Thompson) responsible for building and maintaining the systems.
            *   Business Analysts and Product Owners (e.g., Amy Sowells, Adam Suarez) involved in defining requirements and system behavior.
            *   Finance and Operations stakeholders (e.g., Jim Boyer, Michael Foy, Account Managers, District Managers, VPs) who will use the systems or rely on their outputs.
            *   IT and Data teams responsible for infrastructure, data management, and integrations.

    **1.4. Project Goals & Objectives (for the financial systems)**
        *   **Source Document(s):** `User Prompt 1 (Initial Instruction)`, `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (synthesized from all meetings)
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer, Michael Foy, Jarrett Lagrone, Ryan (AM), James (AM)`
        *   **Version/Status:** `v1.0 - Finalized`

        The overarching goals for the new and enhanced Towne Park financial systems (Billing and Forecasting) are:
        *   **Modernization & Efficiency:** Replace manual, Excel-based forecasting processes with a streamlined, integrated system.
        *   **Simplicity & User-Friendliness:** Create a forecasting experience that is significantly simpler, more intuitive, and less overwhelming for Account Managers, especially those new to the role or with limited Excel proficiency.
        *   **Improved Accuracy:** Enhance the accuracy of financial forecasts by leveraging integrated data sources, reducing manual entry errors, and providing better tools for analysis.
        *   **Data Integration & Minimized Manual Input:** Automatically pull data from source systems like EDW (budget, actuals), Legion (payroll schedules/actuals), and Power Bill (deal terms) to reduce redundant data entry.
        *   **Real-Time/Near Real-Time Insights:** Provide users with timely access to actuals and forecast data to enable better decision-making and quicker reactions to business changes.
        *   **Enhanced Reporting & Analytics:** Facilitate more robust reporting capabilities through Power BI by providing well-structured data in Dataverse and EDW.
        *   **Support for Various User Roles:** Cater to the needs of different user levels (AM, DM, RVP, SVP, Finance Admins) with appropriate views, functionalities, and permissions.
        *   **Accountability & Performance Management:** Provide tools that help Account Managers and their supervisors understand forecast variances and improve forecasting skills.
        *   **Scalability & Maintainability:** Build systems that can adapt to future business needs and are easier to maintain than legacy solutions.
        *   **Integration with Existing Ecosystem:** Ensure the new systems work cohesively with existing Towne Park infrastructure (EDW, Legion, Workday, GP).
        *   **Successful Rollout:** Achieve a successful rollout of the forecasting system by October/November, before the holiday season.

    **1.5. Key Terminology & Acronyms (Glossary)**
        *   **Source Document(s):** All provided transcripts.
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (synthesized from all meetings)
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v1.0 - Finalized`

        *   **AM:** Account Manager - Primary user responsible for site-level forecasting.
        *   **Aggregators:** Third-party booking platforms for parking (e.g., Spot Hero), impacting external revenue.
        *   **Actuals:** Financial or statistical data representing what has already occurred. Sourced from GP (via `Account_Summary`), RSS (via `Revenue_DataMart_Daily`), Legion (via `VW_Payroll_Summary`).
        *   **`Account_Summary`:** EDW table containing month-end actuals from Great Plains.
        *   **Budget:** The financial plan for a given period. Sourced primarily from `Budget_Final` and `Budget_Data_Tab_PR` in EDW.
        *   **`Budget_Data_Tab_PR`:** EDW table for budgeted payroll hours and cost.
        *   **`Budget_Final`:** EDW table for overall budget data (site stats, P&L line items).
        *   **Billing System (Power Bill):** Towne Park's system for managing customer contracts and generating invoices, built on Dataverse.
        *   **COG Segment:** A customer operational grouping or business segment used for filtering P&L views.
        *   **Comps:** Complimentary services or vehicles, impacting revenue calculations.
        *   **COA:** Chart of Accounts - Used for mapping financial data.
        *   **Dataverse:** Microsoft Power Platform data service; the underlying database for the Billing and Forecasting systems.
        *   **DM:** District Manager - Supervises multiple Account Managers and their sites.
        *   **DOO:** Director of Operations.
        *   **EDW:** Enterprise Data Warehouse - Central repository for various data, including budget and actuals.
        *   **External Revenue:** Revenue generated from primary parking services (e.g., valet parking, self-parking fees).
        *   **FLC:** Full Location Contribution - A key financial metric on the P&L.
        *   **Forecast:** A projection of future financial or operational performance.
        *   **Forecasting System:** The new system being built to manage the forecasting process.
        *   **GP:** Great Plains - Towne Park's accounting system.
        *   **GPO Fees:** Group Purchasing Organization fees, an item under "Other Internal Revenue."
        *   **GSA:** Guest Service Agent - A common hourly job role/family.
        *   **GSC:** Guest Service Captain - A supervisory hourly job role/family.
        *   **Internal Revenue:** Revenue derived from sources other than direct customer parking fees, such as management fees, billable expenses under management agreements, profit splits, etc. Calculation is highly dependent on deal type.
        *   **Job Code (Work Role):** Specific identifier for an employee's job in Legion/Workday.
        *   **Job Family:** A higher-level grouping of similar job codes (e.g., "Valet" might include GSA, GSC, Team Lead job codes). An initiative is underway to define and implement these in Workday.
        *   **KPI:** Key Performance Indicator.
        *   **LDR:** Labor Distribution Report.
        *   **Legion:** Towne Park's system for employee scheduling and timekeeping.
        *   **Master Non-Financial:** An EDW table serving as a source for customer and site master data.
        *   **MVP:** Minimum Viable Product - The initial version of the system with core functionalities.
        *   **Other Expenses:** A category on the P&L; also a specific input tab in the forecast for AMs to manually adjust certain budgeted expenses if a material variance is known.
        *   **Other Internal Revenue:** A specific input tab in the forecast allowing AMs to manually input non-standard internal revenue items (e.g., one-off billable expenses, specific validations, GPO fees).
        *   **P&L:** Profit & Loss statement.
        *   **Power Bill:** See Billing System.
        *   **Power BI:** Microsoft's business analytics service, used for reporting.
        *   **PPIR:** Payroll Percent of Internal Revenue - A metric used in Legion, potentially for schedule optimization.
        *   **Proforma:** A financial projection for a new or potential site/business.
        *   **PTAB:** Property Tax, Licenses, and Permits - An expense category on the P&L.
        *   **Raz Report:** Report as a Service - A Workday feature for creating and accessing reports via web service.
        *   **RSS:** Revenue Spreadsheet - The current Excel-based tool used by AMs for tracking daily revenue and statistics; data is fed to EDW.
        *   **`Revenue_DataMart_Daily` / `Revenue_Daily_Detail_Invoice`:** EDW tables containing daily data from the Revenue Spreadsheets.
        *   **RVP:** Regional Vice President.
        *   **`Schedule_Cost_Entity`:** Legion database table containing scheduled costs for shifts.
        *   **`Shift_Entity`:** Legion database table containing details of scheduled shifts (hours, roles).
        *   **SVP:** Senior Vice President.
        *   **"10 Percenter":** A term for highly complex or customized client contracts that are difficult to manage within standard billing system configurations.
        *   **UAT:** User Acceptance Testing.
        *   **UPP:** Universal Parking & Transportation - A segment or type of Towne Park business.
        *   **Validations:** Discounts applied to parking fees, often for hotel guests or specific partners; can be a component of Internal Revenue if billed back.
        *   **`VW_Payroll_Summary`:** A view in the Legion database (replicated to EDW) summarizing actual payroll hours and costs.
        *   **Workday:** Towne Park's HR system, source for employee data, roles, and planned source for job family definitions.
        *   **`Workday_RLS_By_Security`:** EDW table used for Row-Level Security, mapping AMs/DMs to their respective sites/districts.
        *   **`Workday_Site_Salaries`:** EDW table containing information on salaried employee pay and their cost center allocations.

**2. Business Context & Requirements**

    **2.1. Towne Park Business Overview (as relevant to these systems)**
        *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`, `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (Synthesized from all meetings)
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer, Michael Foy, Eddie Petrini, Peter Quinan, David Arreola, Joseph Jaussi, Jarrett Lagrone, Ryan (AM), James (AM)`
        *   **Version/Status:** `v1.0 - Synthesized`

        Towne Park operates parking and transportation services, primarily for clients in the hospitality (hotels) and healthcare (hospitals) sectors. The financial systems are crucial for managing revenue and expenses related to these services. Key aspects of the business relevant to these systems include:
        *   **Diverse Contract Structures:** Towne Park utilizes various deal types with its clients, each having different implications for revenue calculation and forecasting:
            *   **Revenue Share (Rev Share):** External parking revenue is shared with the client, often based on tiered percentages and annual/monthly thresholds.
            *   **Management Agreement:** Towne Park manages the parking operation, typically billing back operational expenses (payroll, other direct costs) plus a management fee. These may also include profit-sharing components.
            *   **Per Labor Hour (PLH):** Clients are billed based on the hours worked by specific Towne Park job codes at contractually agreed-upon rates. These rates can have escalators.
            *   **Fixed Fee:** A predetermined fee is charged to the client for services, regardless of volume or other operational metrics. These can have escalators.
            *   **Per Occupied Room (POR):** Revenue is generated based on the number of occupied rooms at a client's hotel, multiplied by a contractual rate. These can have escalators.
            *   **Hybrid Deals:** Combinations of the above structures exist.
        *   **"10 Percenter" Sites:** A subset of client contracts are highly complex or customized, making them difficult to manage within standard system configurations. An effort is underway to reduce this number by onboarding more into the Power Bill system.
        *   **Operational Management:** Involves managing on-site staffing (GSAs, GSCs, Cashiers, Shuttle Drivers, Salaried Managers like AMs, DOOs), vehicle volumes (valet, self-park), parking rates, and associated expenses. Labor is a significant controllable expense.
        *   **Revenue Streams:**
            *   **External Revenue:** Primarily from direct parking fees (valet, self-park daily/monthly). Influenced by factors like occupancy, drive-in rates, capture ratios, and parking rates. Aggregators (e.g., Spot Hero) can contribute, especially for airport or theme park adjacent locations.
            *   **Internal Revenue:** Derived from management fees, billable expenses under management agreements, profit splits, billable validations, per labor hour charges, etc. Its calculation is highly dependent on the specific deal structure.
        *   **Client Interaction:** Account Managers interact with hotel sales teams and GMs to gather information on upcoming groups, events, and occupancy forecasts, which are critical inputs for Towne Park's own forecasting.
        *   **Organizational Structure:** Operations are organized geographically into sites, districts (managed by DMs), and regions (managed by RVPs/MVPs and SVPs).
        *   **Business Segments:** Includes specific segments like UPP (Universal Parking & Transportation).
        *   **Market Dynamics:** Parking rates can be influenced by competitor actions and local market conditions. Rate increases are typically planned annually or semi-annually.

    **2.2. Pain Points Addressed by New Systems**
        *   **Source Document(s):** `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-01` - `2025-05-12` (Synthesized from multiple meetings)
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer, Jarrett Lagrone, Ryan (AM), James (AM), Eddie Petrini`
        *   **Version/Status:** `v1.0 - Synthesized`

        The new forecasting system aims to address several pain points associated with the current Excel-based process:
        *   **Cumbersome and Manual Processes:** The existing Excel forecast files are described as overwhelming, especially for new Account Managers. Data entry is often manual cell-by-cell, and the files are prone to errors due to complex formulas.
            *   Jarrett Lagrone noted the difficulty for new AMs: "This can be overwhelming... this is a different language for them." (Forecasting User Interview-20250505)
            *   Adam Suarez mentioned issues with Excel formulas and the desire to avoid needing to restore old versions due to errors. (Backlog Grooming Forecasting-20250512)
        *   **Lack of Real-Time Data and Visibility:** Delays in data updates (e.g., payroll, revenue actuals from RSS to BI taking 24 hours) hinder timely decision-making and accurate in-month forecasting.
            *   Ryan (AM) and James (AM) highlighted the need for real-time information to avoid discrepancies between their corrected forecasts and what management sees. (Forecasting User Interview-20250508)
        *   **Training Challenges:** The complexity of the current system makes it difficult and time-consuming to train new Account Managers.
        *   **Inconsistent Data and Definitions:** Budgeting for certain items (like "Other Internal Revenue") is not standardized, leading to inconsistencies.
        *   **Tedious Data Entry & Limited Critical Thinking Support:** The current process is heavily focused on data input, with less support for analytical thinking or identifying key drivers.
            *   Jim Boyer expressed concern about "digitizing legacy" and the system remaining tedious without fostering critical thinking. (Backlog Grooming Forecasting-20250428)
        *   **Multiple Sources of Truth:** Users currently rely on multiple disparate systems/files (BI reports, Adam Suarez's summary file, individual forecast files), leading to confusion.
        *   **System Disconnects:** The current Legion scheduling system is driven by budget data, not the operational forecast, leading to potential misalignments in staffing.
        *   **Difficulty Managing Complex Deals:** "10 Percenter" sites with unique contract terms are challenging to handle in standardized systems.
        *   **Data Integrity Issues:** Copy-pasting and manual overrides in Excel can lead to errors. The new system aims for more controlled data input.

    **2.3. Overall Business Requirements**
        **2.3.1. High-Level Goals**
            *   **Source Document(s):** `User Prompt 1 (Initial Instruction)`, `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-04-02` - `2025-05-14` (Synthesized)
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Jim Boyer, Jarrett Lagrone`
            *   **Version/Status:** `v1.0 - Synthesized`

            *   **Simplicity and User-Friendliness:** The primary goal is to create a forecasting system that is significantly easier to use and more intuitive than the current Excel files, reducing the learning curve for AMs.
            *   **Accuracy:** Improve the reliability and precision of financial forecasts.
            *   **Efficiency:** Streamline the forecasting process, reduce manual effort, and save time for users.
            *   **Real-Time/Near Real-Time Data Access:** Provide timely updates for actuals and forecast data to support better operational decisions.
            *   **Predictability & Improved Decision Making:** Equip users with tools and data that enhance their ability to predict outcomes and make informed business decisions.
            *   **Integration:** Ensure seamless data flow between the forecasting system, Legion, EDW, Power Bill, and other relevant systems.
            *   **Standardization:** Promote consistent forecasting methodologies and data definitions across the organization.
            *   **Support Critical Thinking:** Move beyond simple data entry to provide views and tools that help users analyze their forecast and understand its drivers.

        **2.3.2. Key Performance Indicators (KPIs) for the Business & Systems**
            *   **Source Document(s):** `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-04-01` - `2025-05-08` (Synthesized)
            *   **Key Stakeholders Involved:** `Jarrett Lagrone, James (AM), Ryan (AM), Adam Suarez, Amy Sowells, Jonathan Aulson`
            *   **Version/Status:** `v1.0 - Synthesized`

            The system should support the tracking and management of the following KPIs:
            *   **FLC (Full Location Contribution):** A critical metric AMs are measured against and use to gauge performance against budget.
            *   **Budget Variance:** Performance is consistently evaluated based on variance to budget, both in dollar amounts and potentially percentages (though dollars are preferred by Ops).
            *   **Forecast Accuracy:** An implicit goal; the system's success will be partly judged on its ability to help improve this.
            *   **Payroll as a Percentage of Revenue (External or Internal - PPIR):** AMs are judged on this, and it's a key metric for managing labor costs. Legion also uses a form of PPIR for scheduling.
            *   **Productivity Metrics:** Such as GSA/GSC productivity, cars per labor hour, etc., are important for labor optimization and are considered in payroll forecasting.
            *   **External Revenue per Vehicle:** Some AMs track this as an indicator of rate realization and revenue performance.
            *   **Margin (FLC Margin):** SVPs and higher leadership focus on this percentage from the P&L.
            *   **Occupancy Percentage & Drive-in Ratio & Valet Capture Ratio:** Key input drivers for external revenue that AMs forecast and monitor.

    **2.4. Stakeholder Landscape**
        *   **Source Document(s):** All provided transcripts (implicitly and explicitly).
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (Synthesized)
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v1.0 - Synthesized`

        **2.4.1. Finance Department (FP&A)**
            *   **Key Individuals:** Amy Sowells, Adam Suarez, Michael Foy, Jim Boyer (also BI/IT).
            *   **Role & Concerns:** Heavily involved in defining system requirements, business logic, and data needs. Concerned with overall forecast accuracy, budget adherence, P&L reporting integrity, month-end close processes, data consistency, and ensuring the system supports financial analysis and strategic decision-making. They act as key liaisons between business needs and technical development.

        **2.4.2. Operations (AMs, DMs, RVPs, SVPs)**
            *   **Account Managers (AMs) / Associate Managers:** The primary end-users for forecast input. They require a system that is simple, intuitive, efficient, and helps them accurately forecast for their site(s). They are responsible for inputting stats, payroll, and other local revenue/expense drivers. Their performance is often tied to FLC and budget targets. (e.g., Jarrett Lagrone, Ryan (AM), James (AM)).
            *   **District Managers (DMs) / Directors of Operations (DOOs):** Supervise AMs, review and potentially override forecasts for sites within their district. Need visibility into district-level performance and tools to manage their teams' forecasting activities. (e.g., David Arreola, Joseph Jaussi, Eddie Petrini, Peter Quinan).
            *   **Regional Vice Presidents (RVPs) / Market Vice Presidents (MVPs):** Oversee multiple districts. Require aggregated P&L views for their region, with drill-down capabilities. May need edit access in specific scenarios (e.g., DM on PTO), but primarily consume forecast information.
            *   **Senior Vice Presidents (SVPs):** Executive-level oversight of operations. Primarily interested in high-level P&L roll-ups, key metrics (like FLC margin), and overall business performance against targets. Unlikely to directly edit forecasts. (e.g., Brian, Sam).

        **2.4.3. IT Department / Data Teams**
            *   **Key Individuals/Teams:** Jim Boyer (BI/Data Strategy), Nazeer's team (EDW/Data Engineering), Guy (IT Infrastructure), Juan (Data Engineering), Allata Development Team (Jonathan Aulson, Cesar Figueroa, Christopher Thompson).
            *   **Role & Concerns:** Responsible for data integration (EDW, Legion, Workday, Dataverse), database performance and scalability, data gateway management, network infrastructure, system security, and providing data in usable formats for reporting (Power BI). They develop and maintain stored procedures, views, and data pipelines. Concerned with the technical feasibility and sustainability of the solutions.

        **2.4.4. Executive Leadership**
            *   **Key Individuals:** Brian (SVP Operations?), Mike Morgen (CFO?), other unnamed executives.
            *   **Role & Concerns:** Provide strategic direction for the project, approve budgets and timelines. Interested in the project's impact on overall business performance, achievement of strategic goals (e.g., improved forecast accuracy, operational efficiency), and ROI. They make final decisions on project scope and priorities (e.g., go-live dates, Legion integration approach).

**3. System Architecture & Environment**

    **3.1. High-Level System Diagram (Conceptual flow between systems)**
        *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt` (Cesar's diagram discussion), `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (Synthesized)
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Cesar Figueroa, Jim Boyer, Adam Suarez, Amy Sowells, Christopher Thompson`
        *   **Version/Status:** `v0.5 - Placeholder for Diagram`

        *(Jonathan, a visual diagram would be inserted here. For now, I'll describe the conceptual flow based on our conversations. This description can serve as the basis for creating the diagram.)*

        **Conceptual Data Flow Description:**
        1.  **Master Data Origination:**
            *   **Workday:** Source for HR data, including employee information, job codes, cost center assignments, and (future state) job family definitions. This data flows into EDW. User role information (AM, DM) is derived from Workday tables like `Workday_RLS_By_Security` in EDW. Salaried employee pay and allocations are in `Workday_Site_Salaries` in EDW.
            *   **Master Non-Financial (EDW):** Source for customer and site master data (e.g., site name, address, total available rooms/spaces, district, region). This data is pulled into Power Bill/Forecasting System (Dataverse).
        2.  **Operational Data Input & Processing:**
            *   **Revenue Spreadsheets (RSS):** AMs input daily revenue and statistics. This data is ingested into EDW tables like `Revenue_DataMart_Daily` or `Revenue_Daily_Detail_Invoice`.
            *   **Legion:** AMs create employee schedules. Employees clock in/out. This generates scheduled hours/costs (from `Shift_Entity`, `Schedule_Cost_Entity`) and actual hours/costs (from `Timesheet_Entity`, summarized in `VW_Payroll_Summary`). This data flows to EDW and is accessed by the Forecasting System.
            *   **Power Bill (Dataverse):** Contract terms (deal types, rates, escalators, billable accounts) are configured. Invoices are generated. This data is used by the Forecasting System for Internal Revenue calculations. Invoice data is sent to Great Plains (GP).
        3.  **Budget Data:**
            *   **EDW (`Budget_Final`, `Budget_Data_Tab_PR`):** Stores the approved budget for P&L line items, site statistics, and payroll (hours/cost). This data is pulled into the Forecasting System to initialize forecasts.
        4.  **Forecasting System (Dataverse):**
            *   AMs input forecast data for site statistics, parking rates, payroll, other internal revenue, and other expenses, using budget data as a starting point and referencing actuals/schedules.
            *   The system calculates forecasted P&L based on these inputs and Power Bill contract configurations.
            *   Forecast data is stored in Dataverse.
        5.  **Actuals Data Consolidation:**
            *   **Great Plains (GP):** Month-end financial actuals are recorded. This data is pushed to EDW into tables like `Account_Summary`.
            *   **EDW:** Serves as a central hub for actuals from various sources (GP, RSS, Legion).
        6.  **Reporting & Analytics:**
            *   **Power BI:** Consumes data from Dataverse (forecasts, Power Bill configurations) and EDW (actuals, budget, master data) to generate reports for various stakeholders.
            *   **Forecasting System (In-App P&L):** Displays P&L views by pulling budget data from EDW, forecast data from Dataverse, and actuals from EDW (`Account_Summary` for month-end, `Revenue_DataMart_Daily` & `VW_Payroll_Summary` for intra-month).
        7.  **Future Integrations:**
            *   **Forecasting System -> Legion:** Forecasted demand (vehicles/revenue) from the Forecasting System is planned to be sent to EDW, which Legion can then consume to optimize schedules (this requires coordination with the Legion team/Workforce Planning).
            *   **Microsoft Fabric:** Potential future platform for EDW's silver/gold data layers.

    **3.2. Core Systems & Their Roles**
        *   **Source Document(s):** All provided transcripts.
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (Synthesized)
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v1.0 - Finalized`

        **3.2.1. Power Bill (Billing System) - Built on Dataverse**
            *   **Role:** Manages customer contracts, configures deal-specific terms (rates, escalators, billable accounts, profit splits, management fees), generates invoices, and handles revenue recognition logic. Provides essential contract configuration data to the Forecasting System for calculating forecasted Internal Revenue.
            *   **Key Data:** Customer master data (partially from Master Non-Financial), contract details, invoice data, rate configurations.

        **3.2.2. Forecasting System - Built on Dataverse**
            *   **Role:** The primary system for Account Managers and other operational stakeholders to input, review, and manage financial and operational forecasts. It replaces the current Excel-based process. It calculates forecasted P&L based on user inputs and integrations with other systems.
            *   **Key Data:** Forecasted site statistics, parking rates, payroll hours/costs, other internal revenue, other expenses, calculated P&L.

        **3.2.3. Enterprise Data Warehouse (EDW) - SQL Server (Node1, Node2)**
            *   **Role:** Central repository for historical data, budget data, actuals from various sources (GP, RSS, Legion), and master data (Master Non-Financial, Workday derivatives). It serves as a primary data source for the Forecasting System (for budget and actuals) and for Power BI reporting.
            *   **Key Data:** `Budget_Final`, `Budget_Data_Tab_PR`, `Account_Summary`, `Revenue_DataMart_Daily`, `VW_Payroll_Summary`, `Workday_RLS_By_Security`, `Workday_Site_Salaries`, Master Non-Financial tables.

        **3.2.4. Legion (Scheduling & Timekeeping)**
            *   **Role:** System used for employee scheduling and recording actual time worked. Provides scheduled hours/costs and actual payroll hours/costs to the EDW, which are then consumed by the Forecasting System. There's a future plan for the Forecasting System to feed demand data back to Legion.
            *   **Key Data:** `Shift_Entity`, `Schedule_Cost_Entity`, `Timesheet_Entity` (raw data), `VW_Payroll_Summary` (summarized actuals).

        **3.2.5. Workday (HR, Roles, Job Families - future state for some data)**
            *   **Role:** The system of record for HR information, including employee details, job codes, and cost center assignments. It's the source for the `Workday_RLS_By_Security` table used for AM/DM role-to-site mapping. Planned as the future source for standardized Job Family definitions. Provides data for `Workday_Site_Salaries` used for salaried employee cost calculations.
            *   **Key Data:** Employee master, job codes, organizational hierarchy, cost center assignments, (future) job family definitions, salary data.

        **3.2.6. Great Plains (GP) (Accounting - source of actuals)**
            *   **Role:** The primary accounting system. Month-end financial actuals are posted here and then pushed to the EDW (e.g., into `Account_Summary`).
            *   **Key Data:** Finalized month-end financial actuals.

        **3.2.7. Dataverse (Underlying database for Power Bill & Forecasting)**
            *   **Role:** The Microsoft Power Platform data service that hosts the application data for both the Power Bill and the new Forecasting System. Stores forecast inputs, calculated forecast P&L, and Power Bill configurations.
            *   **Key Data:** All data directly managed and created within the Power Bill and Forecasting applications.

        **3.2.8. Power BI (Reporting & Analytics)**
            *   **Role:** The primary tool for creating and distributing reports and dashboards for various stakeholders. It consumes data from both Dataverse (for forecast data) and EDW (for actuals, budget, and other historical/master data).
            *   **Key Data:** Consumes data from other systems; does not store primary data.

        **3.2.9. Microsoft Fabric (Potential future for Silver/Gold data)**
            *   **Role:** Mentioned as a potential future platform for hosting the silver (transformed) and gold (curated/reporting-ready) layers of data currently in EDW. This is a longer-term consideration.
            *   **Key Data:** (Future) Transformed and curated data from EDW.

    **3.3. Infrastructure & Environment**
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-14`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Christopher Thompson, Cesar Figueroa, Amy Sowells, Adam Suarez`
        *   **Version/Status:** `v1.0 - Synthesized`

        **3.3.1. Cloud Platforms (Azure, Power Platform)**
            *   The Power Bill and Forecasting systems are built on the Microsoft Power Platform, utilizing Dataverse.
            *   EDW is hosted on SQL Server, potentially within an Azure environment (details on EDW hosting not fully specified but implied by Azure discussions).
            *   Microsoft Fabric is being considered for future data warehousing enhancements, which is an Azure service.

        **3.3.2. Database Technologies**
            *   **Dataverse:** For Power Bill and Forecasting application data.
            *   **Microsoft SQL Server:** For the Enterprise Data Warehouse (EDW), including Node1 and Node2.
            *   **Legion Database:** Underlying database for Legion system, data from which is replicated/accessed by EDW.

        **3.3.3. Network Considerations (Performance, Data Gateways, vNETs)**
            *   **Performance Issues:** Concerns have been raised about network performance impacting data retrieval speeds, particularly between on-premise/hosted EDW and cloud-based Power Platform applications. This was noted with Auto Recon and is a concern for the Forecasting system.
                *   Jim Boyer mentioned that local queries on EDW are fast, but network latency significantly slows down remote queries. (Backlog Grooming Forecasting-20250428)
            *   **Data Gateways:** Currently used to connect Power Platform (and Power Automate flows) to EDW. The scalability and performance of the current data gateway on Node1 are under review.
                *   Jonathan Aulson mentioned a meeting with Guy from IT to discuss data gateway scalability and potential alternative designs for EDW data access. (Backlog Grooming Forecasting-20250512)
            *   **vNETs (Virtual Networks):** Discussed as a potential solution to improve network performance and connectivity between Azure-based services and EDW.
            *   **Domain Controllers:** A theory was mentioned that a downgrade in domain controller resources during a move to Azure might be contributing to network performance issues. (Backlog Grooming Forecasting-20250428)
            *   **Concurrency:** The system needs to handle concurrent users (estimated 75-100 per region for forecasting) accessing and updating data.

    **3.4. Development & Deployment**
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-17`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Christopher Thompson, Adam Suarez`
        *   **Version/Status:** `v1.0 - Synthesized`

        **3.4.1. Development Lifecycle**
            *   Agile methodology with sprints is implied by the backlog grooming sessions.
            *   Development involves creating user stories, mockups/prototypes (using tools like V0.dev), backend development (Dataverse, Power Automate, potentially C# plugins), and frontend UI development.
            *   Collaboration between Allata team (Jonathan, Cesar, Chris) and Towne Park stakeholders (Amy, Adam, Jim, Ops representatives) is key.

        **3.4.2. Release Management**
            *   Releases for Power Bill involve testing (internal, UAT by Amy Sowells) and deployment to production.
            *   A similar process is expected for the Forecasting system.
            *   Hotfixes and bug fixes are incorporated into releases (e.g., PO number issue fix in PDF generation engine for Power Bill).
            *   Deployment timing is coordinated (e.g., Power Bill release discussed for a specific day/time).

        **3.4.3. Environment Strategy (Dev, UAT, Prod)**
            *   **Development (Dev):** Used by the Allata team for building features.
            *   **User Acceptance Testing (UAT):** An environment where Towne Park stakeholders (Amy, Adam, and potentially field users for forecasting) test new features before production release. The first UAT for core forecasting features is targeted for early June.
            *   **Production (Prod):** The live environment used by end-users.
            *   Data considerations: UAT for forecasting aims to use real site data to be effective, which is dependent on resolving data gateway/EDW access performance.

**4. Core System Modules & Functionalities**

    **4.1. Billing System (Power Bill)**
        *   **General Note:** Power Bill is an existing system built on Dataverse. The Forecasting system will leverage its configurations and data. Both systems are intended to feel like one integrated platform, potentially accessed via different URLs (e.g., townepark.powerbill.com vs. townepark.forecasting.com) but sharing the same underlying Dataverse instance and user roles.
            *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-03-17`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells`
            *   **Version/Status:** `v1.0 - Synthesized`

        **4.1.1. Customer & Site Management**
            **4.1.1.1. Data Sourced from Master Non-Financial**
                *   **Description:** When a new customer/site is added to Power Bill, initial data (e.g., site number, name, address, total available rooms, total available spaces) is pulled from the `Master Non-Financial` table in EDW.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`, `2025-05-12`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

            **4.1.1.2. Refreshable Fields (Site Name, District, Region, Rooms, Spaces)**
                *   **Description:** A feature was discussed and added to the backlog to allow certain customer/site fields in Power Bill (and thus available to Forecasting) to be refreshed from their source (primarily `Master Non-Financial`). This is to ensure data like site names, available rooms, and parking spaces, which can change (though infrequently for rooms/spaces), are kept up-to-date. District and SVP Region (from `Master Non-Financial`, column `SVP_Region`) were also identified as important for roll-up reporting and should be refreshable.
                *   **Specific Fields for Refresh:**
                    *   Site Name (changes more often than available rooms)
                    *   Total Available Rooms
                    *   Total Available Spaces
                    *   District
                    *   SVP Region (sourced from `Master Non-Financial` column `SVP_Region`, to be displayed as "SVP Region" in the system)
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Feature Added to Backlog`

            **4.1.1.3. Non-Refreshable/Manually Maintained Fields (Vendor ID, Billing Email, Invoice Recipient, Address)**
                *   **Description:** Certain fields, once pulled or set up in Power Bill, should not be automatically refreshed from `Master Non-Financial` because they might be intentionally different for billing purposes.
                *   **Specific Fields to Exclude from Refresh:**
                    *   Vendor ID
                    *   Billing Email
                    *   Invoice Recipient
                    *   Address (Clients may request invoices show a corporate office address different from the physical site address in `Master Non-Financial`. `Master Non-Financial` address is preferred for physical location consistency for other reporting, e.g., by Mike Foy).
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

        **4.1.2. Contract Management**
            **4.1.2.1. Deal Types (Fixed Fee, Per Occupied Room, Per Labor Hour, Revenue Share, Management Agreement)**
                *   **Description:** Power Bill supports various contract deal types, each with specific calculation logic for Internal Revenue. These configurations are critical for the Forecasting system to accurately project Internal Revenue.
                    *   **Fixed Fee:** A set fee, potentially with escalators.
                    *   **Per Occupied Room (POR):** Rate per occupied room, potentially with escalators.
                    *   **Per Labor Hour (PLH):** Billable rates per job code for hours worked, potentially with escalators. Requires job codes to be defined with rates in Power Bill.
                    *   **Revenue Share (Rev Share):** A percentage of external revenue shared with the client, often tiered and subject to thresholds (monthly/annual).
                    *   **Management Agreement:** Towne Park bills back operational expenses (payroll, other direct costs identified as billable) plus a management fee, and may include profit sharing.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-17`, `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

            **4.1.2.2. "10 Percenter" Complex Deals**
                *   **Description:** A category of client contracts with highly customized or complex terms that are currently difficult to fully manage within Power Bill's standard configurations. There's an ongoing effort to reduce the number of these by enhancing Power Bill to accommodate more variations. The Forecasting system needs a strategy to handle sites that remain "10 Percenters" and are not fully configured in Power Bill.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`, `2025-04-02`, `2025-05-12`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Eddie Petrini`
                *   **Version/Status:** `v1.0 - Strategy for Forecasting Pending`

            **4.1.2.3. Contract Term Configuration (Rates, Escalators, Billable Accounts, Profit Splits, Management Fees, etc.)**
                *   **Description:** Power Bill stores detailed contract terms necessary for accurate billing and, consequently, for accurate Internal Revenue forecasting. This includes:
                    *   Base rates for various services/metrics.
                    *   Escalators: Defined increases in rates or fees over time (e.g., 5% increase on June 1st for PLH rates). The Forecasting system needs to consider these for future projections.
                    *   Billable Accounts: For Management Agreements, specifies which GL accounts (e.g., payroll, uniforms, specific other expenses) are billable to the client.
                    *   Profit Splits: Defines how profit (revenue less specified expenses) is shared between Towne Park and the client.
                    *   Management Fees: Can be fixed, a percentage of revenue, or based on other metrics.
                    *   Thresholds: For Revenue Share deals, defining revenue levels at which share percentages change.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-17`, `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

        **4.1.3. Invoice Generation**
            **4.1.3.1. Data Aggregation for Invoicing**
                *   **Description:** Power Bill aggregates data from various sources (e.g., stats from EDW via RSS, labor hours from Legion via EDW, configured rates) to calculate invoice amounts.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt` (implied by Jim Boyer's description of data lineage)
                *   **Date Discussed/Decided:** `2025-04-14`
                *   **Key Stakeholders Involved:** `Jim Boyer, Jonathan Aulson`
                *   **Version/Status:** `v1.0 - Synthesized`

            **4.1.3.2. Statement Generation & Delivery**
                *   **Description:** The system generates customer statements/invoices. There's functionality to regenerate past statements if needed (e.g., for a site migrated mid-year needing prior month invoices). An admin feature for ad-hoc statement generation was discussed.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Christopher Thompson`
                *   **Version/Status:** `v1.0 - Ad hoc generation feature discussed`

            **4.1.3.3. Handling of Ad Hoc Billable Items (e.g., Non-GL Billable Expenses)**
                *   **Description:** Power Bill allows for adding ad-hoc billable items to an invoice, such as "Non-GL Billable Expenses" which can be a fixed amount or a percentage of revenue. This is used for items not covered by standard contract terms or automated GL account pulls. The Forecasting system will need to source actuals for these from Power Bill for "Other Internal Revenue" reconciliation.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-14`, `2025-04-17`, `2025-04-28`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

            **4.1.3.4. PDF Generation Engine**
                *   **Description:** The system includes an engine for generating PDF versions of invoices. A bug fix related to PO numbers in this engine was discussed.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells`
                *   **Version/Status:** `v1.0 - Synthesized`

        **4.1.4. Revenue Recognition Logic**
            *   **Description:** Power Bill contains the logic to determine how revenue is recognized based on the specific deal type and contract terms. This is fundamental for both billing and for the Forecasting system's Internal Revenue calculations.
            *   **Source Document(s):** Implicit in all discussions about deal types and Internal Revenue calculations.
            *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12`
            *   **Key Stakeholders Involved:** `Amy Sowells, Adam Suarez, Jonathan Aulson`
            *   **Version/Status:** `v1.0 - Synthesized`

        **4.1.5. User Interface (UI) & User Experience (UX)**
            **4.1.5.1. Admin Panel**
                *   **Description:** An admin panel exists for managing certain aspects of the billing system. A feature was discussed to add functionality here for ad-hoc statement generation for past periods.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Christopher Thompson`
                *   **Version/Status:** `v1.0 - Feature for ad-hoc statement gen discussed`

            **4.1.5.2. Sidebar Widgets (Future Concept)**
                *   **Description:** A future UI concept was proposed involving a collapsible sidebar with context-aware widgets. For billing, this could include "at a glance" views of billing statuses (e.g., ready to invoice), statement statuses, and potentially forecast deviation comparisons relevant to billing. Filters (e.g., by region, site, status) would allow users to quickly navigate to relevant data sets.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-14`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells`
                *   **Version/Status:** `v0.5 - Concept Proposed`

    **4.2. Forecasting System**
        **4.2.1. Site Selection & Period Definition**
            *   **Description:** Users (AMs, DMs, etc.) will select the site(s) they want to forecast for. The list of available sites will be filtered based on their user role and permissions (derived from `Workday_RLS_By_Security` for AM/DM, and a custom mapping table for roles above DM). Users will also define the period (year, starting month) for their forecast.
            *   **Source Document(s):** `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-04-02`, `2025-04-07`, `2025-05-05`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Eddie Petrini, Jarrett Lagrone`
            *   **Version/Status:** `v1.0 - Synthesized`

        **4.2.2. Site Statistics Forecasting**
            **4.2.2.1. Input Metrics (Occupancy, Drive-in, Valet Vehicles, Self-Park Vehicles, Comps, Aggregators etc.)**
                *   **Description:** AMs will input forecast data for various site-level statistics. The system will initialize these fields with budget data from `Budget_Final`.
                *   **Key Metrics to Forecast:**
                    *   Occupancy (can be input as % or Occupied Rooms)
                    *   Drive-in Ratio
                    *   Valet Vehicles (Overnight, Daily, Monthly)
                    *   Self-Park Vehicles (Overnight, Daily, Monthly)
                    *   Comps (Valet Comps, Self Comps - vehicles, not revenue)
                    *   Aggregators (Valet Daily Aggregator, Self Daily Aggregator - vehicles, rates to be handled in rate forecasting. Budget data for aggregators will be $0 initially).
                    *   Other Revenue (9417) and Adjustments (9412) were initially considered but then decided against for this direct input, to be handled differently.
                    *   Available Rooms and Available Parking Spaces are sourced from customer site data (refreshed from Master Non-Financial) and used in calculations, not directly forecasted here.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`, `2025-03-20`, `2025-04-14`, `2025-05-08`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, David Arreola, Joseph Jaussi, Ryan (AM), James (AM)`
                *   **Version/Status:** `v1.0 - Synthesized`

            **4.2.2.2. Data Views (Budget, Forecast, Actuals, Prior Year)**
                *   **Description:** The UI will allow users to toggle between different data views for comparison and context.
                    *   **Forecast View:** The primary input view.
                    *   **Budget View:** Shows underlying budget numbers (read-only).
                    *   **Actuals View:** Daily actuals (from `Revenue_DataMart_Daily`) will appear (e.g., in orange, read-only) below the forecast input fields as they become available.
                    *   **Prior Year View:** AMs find prior year actuals highly valuable for context, especially for understanding seasonality and impact of unique events (e.g., hurricanes, renovations). This view should be available.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`, `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`, `2025-03-20`, `2025-05-05`, `2025-05-08`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, David Arreola, Joseph Jaussi, Jarrett Lagrone, Ryan (AM), James (AM)`
                *   **Version/Status:** `v1.0 - Synthesized`

            **4.2.2.3. Time Granularity (Daily, Weekly, Monthly, Quarterly input/view)**
                *   **Description:** Users need to input and view statistical data at a daily level for accuracy and to explain variances. However, views for weekly, monthly, and quarterly roll-ups are also desired for analysis and potentially for higher-level input spreading (though daily input is primary).
                *   **Decision:** Editing will be at the daily level. Weekly, monthly, quarterly views will be aggregations.
                *   **Source Document(s):** `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-05-01`, `2025-05-05`, `2025-05-08`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Jarrett Lagrone, Ryan (AM), James (AM), Jim Boyer, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Daily input finalized, aggregated views confirmed.`

            **4.2.2.4. UI for Stat Input (Calendar view, Metric view, Grid editing)**
                *   **Description:** Several UI approaches were prototyped and discussed:
                    *   **Grid/Spreadsheet-like View:** A table with days as rows/columns and metrics as columns/rows. This is familiar to users.
                    *   **Calendar View:** Allows selecting a day on a calendar to open a dialog for editing all stats for that day.
                    *   **Metric View:** Allows focusing on a single metric (e.g., Occupancy) and editing its values across all days in a list.
                    *   **Enhancements:** Features like clicking a column/row header to edit the entire series (Excel-like) and a summary card showing monthly totals while editing daily stats were discussed as valuable.
                *   **Source Document(s):** `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-28`, `2025-05-05`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Jarrett Lagrone, Jim Boyer, Adam Suarez`
                *   **Version/Status:** `v0.5 - UI approach still evolving based on AM feedback sessions.`

            **4.2.2.5. Calculation Logic (Capture Ratio, Drive-in Ratio, External Revenue from stats)**
                *   **Description:** The system will automatically calculate derived metrics:
                    *   **Capture Ratio:** Based on self overnight and valet overnight vehicles vs. occupied rooms.
                    *   **Drive-in Ratio:** Based on relevant vehicle counts and occupied rooms. (Formula: `Drive-in vehicles / Occupied Rooms`)
                    *   **External Revenue (on this page):** Sum of (vehicle count * respective rate) for all forecasted parking stats. This is a daily calculation that rolls up.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

        **4.2.3. Parking Rate Forecasting**
            **4.2.3.1. Rate Categories (Valet Overnight, Self Daily, etc., including Aggregators)**
                *   **Description:** AMs will forecast average collected rates for various parking categories.
                *   **Key Rate Categories:** Valet Overnight, Valet Daily, Valet Monthly, Self Overnight, Self Daily, Self Monthly.
                *   **Aggregators:** Separate rate inputs for "Valet Daily Aggregator" and "Self Daily Aggregator" are needed due to significantly different effective rates. These will initially be manual inputs as no historical blended rate for these specific aggregator sub-categories exists.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-20`, `2025-03-21`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, David Arreola, Joseph Jaussi, Jim Boyer`
                *   **Version/Status:** `v1.0 - Synthesized`

            **4.2.3.2. Data Views (Budget, Forecast, Actuals, Prior Year)**
                *   **Description:**
                    *   **Initial Seeding:** Rates will initially be seeded from Budgeted Rates (calculated as Budgeted Revenue / Budgeted Vehicles for that category from `Budget_Final`). The idea of using prior year actuals or prior month actuals was discussed but deemed problematic due to potential inaccuracies (stat errors, turnover, uncaptured rate increases).
                    *   **Actuals Display:** Actual collected rates (from `Account_Summary` or `Revenue_DataMart_Daily` by reversing the calculation: Actual Revenue / Actual Vehicles) will be displayed (e.g., in orange) below the forecast input fields as months close.
                    *   **Toggles:** Ability to toggle views to see Budgeted rates and Prior Year actual rates for context.
                    *   **Year Selection:** A dropdown to select the year for which rates are being viewed/forecasted.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-20`, `2025-03-21`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, David Arreola, Joseph Jaussi, Jim Boyer`
                *   **Version/Status:** `v1.0 - Budget seeding finalized. Actuals display confirmed.`

            **4.2.3.3. Rate Input & Overrides (Handling of rate increases, guardrails for input)**
                *   **Description:** AMs can manually override the seeded/displayed rates for future months.
                *   **Rate Increase Section (Lower part of prototype):** Initially prototyped with a section to explicitly input "Parking Rate Increases" (month, amount/percentage). Feedback was mixed. Some (David A.) liked it for visibility on planned increases. Others (Joseph J., Jim B.) preferred direct override in the main rate grid and felt this section was redundant or not the AM's primary responsibility to maintain for accountability. Decision was to make this informational, potentially showing budgeted increases vs actual increases entered, but not for AMs to directly drive the main rates table from here. This section might be de-prioritized or simplified.
                *   **Guardrails:** If an AM inputs a rate that is significantly different (e.g., > +/-10%) from the recent actual run rate or budget, a confirmation prompt should appear ("Are you sure? This is X% higher/lower than Y.").
                *   **Carry Forward:** If an AM changes a rate for a month, a prompt could ask if they want to carry this new rate forward for all subsequent months of the year.
                *   **Input by Dollars:** Rate increases should be input as dollar values, not percentages.
                *   **Daily Rate Adjustment (User Interview Feedback):** AMs (James) expressed a desire to adjust rates at a *daily* level on the stats input page to accurately reflect discounted group rates, rather than manipulating comp vehicle counts. This would then average up to the monthly rate displayed on the Rates page. This is a significant point for UI/UX consideration on the stats page.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-20`, `2025-04-28`, `2025-05-08`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, David Arreola, Joseph Jaussi, Jim Boyer, James (AM), Ryan (AM)`
                *   **Version/Status:** `v0.8 - Guardrails and carry-forward confirmed. Rate increase section de-prioritized. Daily rate adjustment on stats page is a key new consideration.`

        **4.2.4. Payroll Forecasting**
            **4.2.4.1. Input by Job Family (GSA, GSC, Valet, Bell, Shuttle, Cashier, Salaried)**
                *   **Description:** The primary method for AMs to forecast payroll will be at the Job Family level (e.g., Valet, Bell, Salaried). This simplifies input. An initiative is underway to define and implement these Job Families in Workday and map existing Job Codes to them.
                *   **Specific Families Mentioned:** GSA, GSC are key. Valet, Bell, Shuttle, Cashier. Salaried (AM, Assistant AM) also needs to be included.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-01` - `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer, Eddie Petrini, Peter Quinan`
                *   **Version/Status:** `v1.0 - Job Family approach confirmed, pending Workday implementation/mapping.`

            **4.2.4.2. Input by Job Code (for Per Labor Hour sites or detailed views)**
                *   **Description:** For sites with Per Labor Hour (PLH) contracts, forecasting must occur at the specific Job Code level because billable rates are tied to job codes in Power Bill. The UI should allow drilling down from Job Family to Job Code for these sites or if an AM needs that granularity for other reasons.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Michael Foy`
                *   **Version/Status:** `v1.0 - Confirmed`

            **4.2.4.3. Input Metrics (Hours, Cost)**
                *   **Description:** Users will be able to input their payroll forecast in terms of either Hours or Cost. The system will calculate the other value based on average pay rates. Both views are considered necessary.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-02`, `2025-04-07`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Eddie Petrini, Peter Quinan, Adam Suarez, Jim Boyer`
                *   **Version/Status:** `v1.0 - Confirmed`

            **4.2.4.4. Data Views (Budget, Scheduled, Forecast, Actuals - from Legion/Payroll Summary)**
                *   **Description:** The payroll forecasting UI will display multiple data "flavors" for context:
                    *   **Budgeted Payroll:** Hours and Cost (from `Budget_Data_Tab_PR`, mapped to Job Families).
                    *   **Scheduled Payroll:** Hours and Cost (from Legion's `Shift_Entity` for hours and `Schedule_Cost_Entity` for cost). This typically covers a rolling 2-week period but can be longer.
                    *   **Forecasted Payroll:** The user's input.
                    *   **Actual Payroll:** Hours and Cost (from `VW_Payroll_Summary` in EDW, sourced from Legion).
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-01`, `2025-04-02`, `2025-04-14`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer, Eddie Petrini`
                *   **Version/Status:** `v1.0 - Synthesized`

            **4.2.4.5. Time Granularity (Daily, Weekly, Monthly input/view)**
                *   **Description:** AMs need the ability to forecast payroll at daily, weekly, and monthly levels. Daily is crucial for accuracy, especially around events or group arrivals/departures. Weekly aligns with Legion scheduling. Monthly is needed for P&L roll-ups. The system should allow input at any of these levels, with data appropriately spreading or aggregating.
                *   **Decision:** Input will be supported at daily, weekly, and monthly levels.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-01`, `2025-04-02`, `2025-04-07`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Eddie Petrini, Peter Quinan, Amy Sowells`
                *   **Version/Status:** `v1.0 - Confirmed`

            **4.2.4.6. UI for Payroll Input (Slider bars, direct input, alerts for variance)**
                *   **Description:** A visual UI was prototyped using slider bars to adjust hours/cost, showing budget targets and actual/scheduled data. This received generally positive feedback. Direct numerical input is also essential.
                *   **Alerts:** Visual alerts for variances (e.g., scheduled hours > forecasted hours) are desired.
                *   **"Quick Set" Buttons (Optimize for Revenue, Match Budget):** Prototyped but likely deferred post-MVP due to complexity with deal structures.
                *   **Variance Dashboard:** A separate view focusing on payroll variances (hours/cost, schedule vs. actual) was well-received and might be considered for MVP or Phase 2.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-02`, `2025-04-07`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Eddie Petrini, Peter Quinan, Adam Suarez, Amy Sowells, Jim Boyer`
                *   **Version/Status:** `v0.8 - Core UI concept positive, variance dashboard TBD for MVP.`

            **4.2.4.7. Handling of Salaried Employee Costs & Allocations**
                *   **Description:** Costs for salaried employees (AMs, Assistant AMs, DOOs, etc.) need to be included in the payroll forecast. Data will be sourced from `Workday_Site_Salaries` in EDW, which includes annualized pay and cost center allocations. This data will be used for the "budgeted cost" of salaried staff. AMs will not directly forecast salaried employee costs; it will be system-derived.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Jim Boyer, Amy Sowells`
                *   **Version/Status:** `v1.0 - Data source identified.`

        **4.2.5. Other Internal Revenue Forecasting**
            **4.2.5.1. Categories (Billable Expenses, Revenue Validations, Credits/Other Billable Items, GPO Fees, Signing Bonuses)**
                *   **Description:** A dedicated input tab for AMs to manually forecast specific "Other Internal Revenue" items that are not automatically calculated through deal structures or standard revenue streams.
                *   **Categories:**
                    *   Billable Expenses (for one-off items not covered by standard billable accounts in MA)
                    *   Revenue Validations (AMs forecast the amount they expect to bill back for validations)
                    *   Credits / Other Billable Items (catch-all, GPO/Signing Bonus amounts entered here should be negative to reduce revenue)
                    *   GPO Fees (typically a negative adjustment to revenue)
                    *   Signing Bonuses (typically a negative adjustment to revenue)
                *   **Note:** For GPO Fees and Signing Bonuses, the system should enforce negative value entry.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-01` - `2025-04-28`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Eddie Petrini, Peter Quinan, Jim Boyer`
                *   **Version/Status:** `v1.0 - Categories finalized, negative enforcement for GPO/Signing Bonus confirmed.`

            **4.2.5.2. Monthly Input**
                *   **Description:** These items are forecasted as a single lump sum for the month. Daily or weekly breakdown is not required for these specific manual inputs.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-01`, `2025-04-07`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Eddie Petrini`
                *   **Version/Status:** `v1.0 - Confirmed`

            **4.2.5.3. Data Views (Forecast, Actuals - where available)**
                *   **Description:**
                    *   **Forecast:** AMs input their forecast.
                    *   **Budget:** Generally, no direct budget data pull for these specific discrete categories, as budget is often lump sum or not granular enough.
                    *   **Actuals:**
                        *   Revenue Validations: Actual billable validation amounts can be pulled from Power Bill invoice data.
                        *   Signing Bonuses: Actuals can be pulled from `Account_Summary` (account 4910).
                        *   Billable Expenses (one-off): Actuals for ad-hoc billable expenses entered in Power Bill can be pulled.
                        *   Other categories (GPO Fees, Credits): Generally no direct actuals feed for forecast comparison; these are often known amounts or reconciling items.
                    *   **Prior Year:** Once the system has a year of data, prior year forecasted amounts for these categories could be displayed for context.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-07`, `2025-04-14`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Eddie Petrini, Jim Boyer`
                *   **Version/Status:** `v1.0 - Actuals sources identified.`

        **4.2.6. Other Expenses Forecasting (Manual Adjustments)**
            **4.2.6.1. Input by Expense Category (e.g., Uniforms, Tickets)**
                *   **Description:** A new tab/section for AMs to manually adjust forecasted amounts for specific "Other Expense" categories if they know of a material variance from budget. This is not for forecasting all expenses line-by-line but for exceptions.
                *   **Categories:** The list of expense categories will be based on the current forecast file's "Other Expenses" tab, focusing on controllable/material items (e.g., Uniforms, Tickets, Repairs & Maintenance). Non-controllable or allocated expenses will likely be excluded from this manual adjustment interface.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-28`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer`
                *   **Version/Status:** `v0.8 - Concept confirmed, specific categories to be finalized.`

            **4.2.6.2. Monthly Input against Budget**
                *   **Description:** AMs will adjust the total monthly budgeted amount for these selected expense categories. The system will default to budget, and AMs only interact if a change is needed.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-28`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Confirmed`

        **4.2.7. P&L (Profit & Loss) Views**
            **4.2.7.1. Line Items (External Revenue, Internal Revenue, Payroll, Claims, PTAB, Insurance, Other Expenses, Parking Rents, FLC)**
                *   **Description:** The P&L view will display standard financial line items.
                *   **Key Line Items:** External Revenue, Internal Revenue, Payroll, Claims, PTAB, Insurance, Other Expenses, Parking Rents, FLC (as a calculation: Internal Revenue - Sum of Expenses).
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-01`, `2025-04-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Amy Sowells`
                *   **Version/Status:** `v1.0 - Line items confirmed.`

            **4.2.7.2. Data Views (Budget, Forecast, Actuals, Prior Year, Variances in $ and %)**
                *   **Description:**
                    *   **Core Views:** Users can toggle to see Budget, Forecast, and Prior Year P&L data.
                    *   **Actuals Integration:** As months close, actual data (from `Account_Summary`) will replace forecast data for those past months in the "Forecast/Trend" view. The column header will indicate "Actual" (e.g., "Jan (Act)").
                    *   **Variances:** Variances to Budget (and potentially Prior Year) will be displayed in dollar amounts. Percentage variances were discussed but dollar amounts are preferred by Ops for P&L variance. A toggle for $/ % variance display was prototyped.
                    *   **Trend Column:** The "Total" or "Trend" column will sum actuals for past months and forecast for future months. The label "Forecast" for this column will be removed to avoid confusion; it will just be "Total" or "Trend."
                    *   **% of Revenue Column:** This column will show each P&L line item as a percentage of Internal Revenue for that month/total. External Revenue line will not show a percentage here.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-02`, `2025-04-07`, `2025-04-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Amy Sowells, Eddie Petrini, Jim Boyer, Peter Quinan`
                *   **Version/Status:** `v1.0 - Synthesized. Dollar variance preferred.`

            **4.2.7.3. Roll-up Hierarchy (Site, District, Region, SVP Region, Corporate)**
                *   **Description:** The P&L view will allow users with appropriate permissions to see aggregated data rolled up by Site, District, Region (VP level), SVP Region, and ultimately a Corporate total.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`, `2025-04-02`, `2025-05-12`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer`
                *   **Version/Status:** `v1.0 - Confirmed`

            **4.2.7.4. Filtering (Org Filters, Customer Filters - COG, Contract Type, P&L Category)**
                *   **Description:** Users can filter the P&L view:
                    *   **Org Filters:** Based on user's position in the hierarchy (e.g., a DM sees sites in their district). Higher roles can select specific districts/regions.
                    *   **Customer Filters:** Further refine by COG Segment, Contract Type, P&L Category (from `Master Non-Financial`, e.g., Operating, G&A, Topside). State-level filtering is not a current requirement for internal reporting.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-02`, `2025-04-07`, `2025-04-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Amy Sowells, Eddie Petrini`
                *   **Version/Status:** `v1.0 - Filters confirmed.`

            **4.2.7.5. Trend Analysis (Year-over-year, Quarter-over-quarter)**
                *   **Description:** The P&L view will display a 12-month rolling view. A year selector will allow navigation to different years. The "Next Year" forecast display (e.g., Q1 of next year) was discussed; for initial rollout, a simple year selection is preferred. How "Next Year" forecast populates (e.g., from current year's Q4 forecast, or prior year actuals + uplift) is TBD, likely a Phase 2 enhancement.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-02`, `2025-04-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Amy Sowells`
                *   **Version/Status:** `v0.8 - Simple year selection for MVP. Next year forecast population logic TBD.`

        **4.2.8. DM+ Overrides & Audit Trail**
            *   **Description:** Users with District Manager (DM) roles and above (specifically Regional VPs/Market VPs) will have the ability to select a site within their hierarchy and directly edit its forecast values.
            *   **Edit Mode:** These users will need to explicitly click an "Edit" button (likely per tab, paired with the "Save" button) to make changes, preventing accidental edits while viewing.
            *   **Audit Trail:** Changes made by DMs or RVPs/MVPs will be logged, capturing the user, date/time of change, and ideally the specific values changed. This audit information should be visible within the app, not requiring a support ticket. Versioning of forecasts (ability to restore previous states) is a Phase 2 consideration.
            *   **Roles Above RVP/MVP (e.g., SVP):** Will have read-only access to P&L roll-ups for their hierarchy. They will not directly edit site-level forecasts.
            *   **Source Document(s):** `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-05-12`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Michael Foy, Jim Boyer`
            *   **Version/Status:** `v1.0 - Confirmed for DM & RVP/MVP. Audit trail visibility in-app confirmed.`

        **4.2.9. Proforma & New Site Forecasting ("Average Billing Profile" concept)**
            *   **Description:** The system needs a mechanism to forecast for new sites (proforma) or existing "10 Percenter" sites that are not fully configured in Power Bill.
            *   **Approach:** The current thinking is that for such sites, users would select one of the base deal types (Fixed Fee, PLH, Rev Share, Management Agreement) as a template. The specifics of how detailed inputs (e.g., specific rates for a PLH proforma if not in Power Bill) would be handled are still under discussion. The goal is to leverage Power Bill setup as much as possible; if a new site is set up in Power Bill, its forecast should derive from that. The "10 Percenter" list will be reviewed to see what makes them complex and how to simplify their forecasting.
            *   **Urgency:** A plan for this is needed by early June 2025.
            *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-03-17`, `2025-05-12`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Michael Foy`
            *   **Version/Status:** `v0.5 - High-level approach discussed, detailed solution pending internal Towne Park review of 10%ers.`

        **4.2.10. UI/UX Considerations**
            **4.2.10.1. "Show Budget" / "Show Actuals" toggles**
                *   **Description:** On input screens (Stats, Rates, Payroll), users can toggle a view to see the underlying budget numbers or incoming actuals for reference, typically displayed below or alongside the forecast input fields.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`, `2025-03-20`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, David Arreola, Joseph Jaussi`
                *   **Version/Status:** `v1.0 - Confirmed`

            **4.2.10.2. Save Mechanisms (Auto-save vs. Manual with warning)**
                *   **Description:**
                    *   **Initial Decision:** Manual save button per tab. If a user navigates away from a tab with unsaved changes within the app, a warning prompt will appear. Closing the browser tab/window will not prompt and changes will be lost.
                    *   **Auto-Save Discussion:** Ops feedback (David A.) favored auto-saving on field focus leave to prevent data loss. However, this has potential performance implications (increased database writes).
                    *   **Compromise:** Inputs are cached locally in the browser session, so if a user switches between sites or tabs *without saving*, their unsaved changes for a particular site/tab will be preserved temporarily. Explicit save is still required to commit to Dataverse.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`, `2025-03-20`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Cesar Figueroa, David Arreola, Joseph Jaussi`
                *   **Version/Status:** `v1.0 - Manual save with local caching and warning prompt confirmed.`

            **4.2.10.3. Visual Alerts for Variances**
                *   **Description:** On the payroll input screen, visual cues (e.g., an alert icon) will indicate significant variances, such as "Scheduled hours > Forecasted hours." The specific logic for what triggers an alert is still being refined. For parking rates, a confirmation prompt for inputs varying significantly from actuals/budget.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-02`, `2025-04-07`, `2025-04-28`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Peter Quinan, Eddie Petrini, Jim Boyer, Adam Suarez`
                *   **Version/Status:** `v0.8 - Concept confirmed, specific alert logic TBD.`

            **4.2.10.4. "Show Guide" / Help Text**
                *   **Description:** Each major page/tab will have a "Show Guide" button that reveals a collapsible section with instructions, legends, and help text on how to use that page. This keeps the main interface cleaner for experienced users. Content for these guides will be provided/refined by Towne Park (e.g., Jeremy).
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-21`, `2025-04-02`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Confirmed`

            **4.2.10.5. Monthly Summary Tab (Future Concept)**
                *   **Description:** Ops users (Eddie P., James AM) expressed a strong desire for a "Monthly Summary" tab, similar to the one in the current Excel forecast file. This would provide a consolidated view of key metrics for a selected month, serving as an anchor point and quick overview before diving into daily/weekly details or the full P&L. This is not currently in MVP scope but is a strong candidate for Phase 2.
                *   **Key Metrics for Summary:** Drive-in %, GSA Productivity, etc. (Specific list to be provided by Adam Suarez).
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-07`, `2025-04-14`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Eddie Petrini, Adam Suarez, Amy Sowells, James (AM)`
                *   **Version/Status:** `v0.5 - Strong desire noted, Phase 2 candidate.`

    **4.3. Budgeting System** (Future - Placeholder for details when defined)
        *   **Description:** A full budgeting module to replace current budget creation processes is planned as a future phase, after the forecasting system is rolled out. The forecasting system will consume budget data, but not create it initially.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-20`, `2025-04-01`, `2025-04-17`
        *   **Key Stakeholders Involved:** `Adam Suarez, Amy Sowells, Jonathan Aulson`
        *   **Version/Status:** `v1.0 - Noted as future phase.`

**5. Data Management**

    **5.1. Key Data Entities & Schemas**
        *   **General Note:** The Forecasting system will store its primary forecast input data in Dataverse tables designed to be easily queryable by Power BI. Budget and most actuals data will be sourced from EDW.
            *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt` (Cesar's diagram discussion), `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-03-17`, `2025-04-14`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Cesar Figueroa, Jim Boyer, Amy Sowells, Adam Suarez`
            *   **Version/Status:** `v1.0 - Synthesized`

        **5.1.1. Customer & Site Data (Master Non-Financial, Power Bill specific fields)**
            *   **Description:** Master data for customers and sites.
            *   **Source:** `Master Non-Financial` table in EDW is the primary source. Power Bill (Dataverse) stores this data and may have additional billing-specific fields.
            *   **Key Fields (from Master Non-Financial):** Site Number (Cost Center), Site Name, Address, Total Available Rooms, Total Available Spaces, District, Region, SVP Region, P&L Category, COG Segment, Contract Type.
            *   **Key Fields (Power Bill specific):** Vendor ID, Billing Email, Invoice Recipient, specific contract terms.
            *   **Schema in Forecasting/Power Bill:** Will include a `Customer Site` table with a foreign key to link to forecast/billing data. This table will hold the site number.
            *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-03-17`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
            *   **Version/Status:** `v1.0 - Synthesized`

        **5.1.2. Contract Data (Deal terms, rates, escalators)**
            *   **Description:** Configuration data for client contracts stored within Power Bill (Dataverse).
            *   **Key Fields:** Deal Type, specific rates (e.g., PLH rates per job code, POR rates, fixed fees), escalator rules (dates, percentages/amounts), billable account flags for Management Agreements, profit split percentages and tiers, management fee structures, Revenue Share tiers and percentages, thresholds.
            *   **Source Document(s):** `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-04-17`, `2025-05-01`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
            *   **Version/Status:** `v1.0 - Synthesized`

        **5.1.3. Statistical Data (Vehicles, Rooms, Occupancy, Drive-in, Capture Ratios)**
            *   **Description:** Data related to operational statistics at each site.
            *   **Budgeted Stats:** Sourced from `Budget_Final` in EDW (Main Account codes like 9410 for External Revenue, specific codes for vehicle counts, occupied rooms).
            *   **Forecasted Stats:** Stored in Dataverse in a table like `Site_Statistic_Details`. This table will have columns for each metric (e.g., `Valet_Overnight_Vehicles`, `Occupied_Rooms`, `Drive_In_Ratio_Percentage`, `External_Revenue_Amount`), a foreign key to `Customer_Site`, a date field (daily granularity), and a "Type" column (e.g., "Forecast").
            *   **Actual Stats (Daily):** Sourced from `Revenue_DataMart_Daily` or `Revenue_Daily_Detail_Invoice` in EDW.
            *   **Actual Stats (Month-End):** Aggregated values can be derived from `Account_Summary` in EDW.
            *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-03-17`, `2025-04-14`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Cesar Figueroa, Amy Sowells, Adam Suarez, Jim Boyer`
            *   **Version/Status:** `v1.0 - Synthesized`

        **5.1.4. Budget Data**
            **5.1.4.1. `Budget_Final` (EDW) - Site stats, P&L line items**
                *   **Description:** Primary EDW table for approved budget data. Contains monthly budget amounts per site (Cost Center) and Main Account (COA number).
                *   **Key Fields:** Year, Period, Cost Center (Site Number), Main Account (COA Number for stats like 9410 External Revenue, vehicle counts, occupied rooms, and P&L expense/revenue lines), Balance (budgeted amount).
                *   **Usage:** Seed initial forecast values for site statistics and P&L line items.
                *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-17`, `2025-03-21`, `2025-04-17`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Amy Sowells`
                *   **Version/Status:** `v1.0 - Synthesized`

            **5.1.4.2. `Budget_Data_Tab_PR` (EDW) - Payroll hours & cost**
                *   **Description:** EDW table containing budgeted payroll data, including hours and cost, typically by job profile/category at a monthly level.
                *   **Key Fields:** Cost Center, Job Category, Job Profile, Balance Description (e.g., "PR Hours", "Payroll"), Balance (budgeted amount), Month.
                *   **Usage:** Seed initial payroll forecast values (hours and cost). Requires mapping from its Job Profile/Category to the new Job Family structure.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-14`, `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Amy Sowells`
                *   **Version/Status:** `v1.0 - Synthesized, mapping to Job Family pending.`

        **5.1.5. Forecast Data (Stored in Dataverse)**
            *   **Description:** All forecast inputs and system-calculated forecast values will be stored in Dataverse tables. These tables will be structured for direct querying by Power BI and the in-app P&L views. A "Type" column will distinguish forecast data from potentially co-located budget/actuals snapshots if that approach were taken (though current plan is to query EDW for budget/actuals).
            *   **General Structure:** Tables will typically include keys for Site, Date (at daily granularity for stats/payroll), Period (Month/Year), and specific metric columns.
            *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt` (Cesar's diagram discussion), `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-03-17`, `2025-04-14`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Cesar Figueroa, Jim Boyer, Adam Suarez, Amy Sowells`
            *   **Version/Status:** `v1.0 - Synthesized`

            **5.1.5.1. Site Statistics Forecast**
                *   **Table:** e.g., `Site_Statistic_Details`
                *   **Key Fields:** SiteKey, Date, Occupancy_Rooms, Occupancy_Percentage, Drive_In_Ratio_Percentage, Valet_Overnight_Vehicles, Self_Daily_Vehicles, External_Revenue_Amount (calculated), etc. (one column per metric shown on the UI).
            **5.1.5.2. Parking Rate Forecast**
                *   **Table:** e.g., `Parking_Rate_Forecast`
                *   **Key Fields:** SiteKey, Year, Month, Rate_Category (e.g., "Valet Overnight"), Forecasted_Rate_Amount.
            **5.1.5.3. Payroll Forecast (Hours & Cost by Job Family/Code)**
                *   **Table:** e.g., `Payroll_Forecast_Details`
                *   **Key Fields:** SiteKey, Date, Job_Family_Key (or Job_Code_Key for PLH), Forecasted_Hours, Forecasted_Cost.
            **5.1.5.4. Other Internal Revenue Forecast**
                *   **Table:** e.g., `Other_Internal_Revenue_Forecast`
                *   **Key Fields:** SiteKey, Year, Month, Revenue_Category (e.g., "Billable Expenses", "Revenue Validations"), Forecasted_Amount.
            **5.1.5.5. Other Expenses Forecast**
                *   **Table:** e.g., `Other_Expenses_Forecast`
                *   **Key Fields:** SiteKey, Year, Month, Expense_Category (e.g., "Uniforms"), Forecasted_Amount_Adjustment (delta from budget).

        **5.1.6. Actuals Data**
            **5.1.6.1. `Account_Summary` (EDW via GP) - Month-end P&L actuals**
                *   **Description:** Contains finalized month-end actual financial data from Great Plains.
                *   **Key Fields:** Cost Center, Main Account, Year, Period, Balance.
                *   **Usage:** Primary source for actual P&L line items (External Revenue, Internal Revenue, Payroll cost, Claims, PTAB, Insurance, Other Expenses, Parking Rents) for closed months.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-17`, `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Amy Sowells`
                *   **Version/Status:** `v1.0 - Synthesized`

            **5.1.6.2. `Revenue_DataMart_Daily` / `Revenue_Daily_Detail_Invoice` (EDW via RSS) - Daily external revenue & stats**
                *   **Description:** EDW tables storing daily operational data entered via Revenue Spreadsheets. `Revenue_DataMart_Daily` was mentioned as a potential source.
                *   **Key Fields:** Site Number, Date, Value Type (to distinguish revenue vs. vehicle counts), Category (e.g., Valet Overnight), Amount/Count.
                *   **Usage:** Source for daily actuals for site statistics (vehicle counts, occupied rooms) and external revenue for display on the forecast input screens and for intra-month P&L trend calculations.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-14`, `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized, specific table to be confirmed (likely `Revenue_DataMart_Daily`).`

            **5.1.6.3. `VW_Payroll_Summary` (Legion DB via EDW) - Actual payroll hours & cost**
                *   **Description:** An EDW view summarizing actual payroll data from Legion's `Timesheet_Entity`.
                *   **Key Fields:** Work Location (Site Number), Date, Title (Job Code/Work Role), Pay Type (Regular, OT, PTO, etc.), Hours, Minutes, Dollars.
                *   **Usage:** Source for actual payroll hours and cost for display on the payroll forecast input screen and for P&L actuals (though `Account_Summary` is used for month-end P&L payroll cost).
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-01`, `2025-04-14`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Jim Boyer, Amy Sowells`
                *   **Version/Status:** `v1.0 - Synthesized`

            **5.1.6.4. `Shift_Entity` & `Schedule_Cost_Entity` (Legion DB via EDW) - Scheduled payroll hours & cost**
                *   **Description:** Legion tables providing scheduled shift data.
                *   **`Shift_Entity` Key Fields:** Site Location, Work Role, Date, Start Time, End Time, Duration (in minutes).
                *   **`Schedule_Cost_Entity` Key Fields:** Employee Details, Location, Work Role, Schedule ID (links to Shift_Entity), Date, Cost of Shift.
                *   **Usage:** Source for scheduled payroll hours and cost for display on the payroll forecast input screen.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-14`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

            **5.1.6.5. Power Bill Invoice Data - Actuals for billable validations, some billable expenses**
                *   **Description:** Data from generated invoices in Power Bill (Dataverse).
                *   **Usage:** Source for actual amounts for "Revenue Validations" and ad-hoc "Billable Expenses" entered in Power Bill, to be displayed on the "Other Internal Revenue" forecast tab.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-14`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

        **5.1.7. Payroll & HR Data**
            **5.1.7.1. `Workday_Site_Salaries` (EDW) - Salaried employee pay & allocations**
                *   **Description:** EDW table containing salary information and cost center allocations for salaried employees.
                *   **Key Fields:** Employee ID, Current Cost Center, Total Annualized Base Pay, Allocation Cost Center (if split), Allocation Percentage/Amount, DW Loaded Date.
                *   **Usage:** Source for calculating the cost component of salaried employees in the payroll forecast and P&L.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez`
                *   **Version/Status:** `v1.0 - Synthesized`

            **5.1.7.2. Job Codes & Job Families (Workday - future state, manual mapping initially)**
                *   **Description:**
                    *   **Job Codes (Work Roles):** Specific identifiers from Legion/Workday (e.g., GSA1, GSA-Overnight). `Workday_Wage_Rate` table in EDW contains a list of active job codes and their pay rates.
                    *   **Job Families:** Higher-level groupings (e.g., "Valet", "Salaried"). An initiative is underway to define these in Workday and map job codes to them. Initially, a manual mapping might be created by FP&A/Ops and potentially stored in Dataverse or a dedicated EDW table.
                *   **Usage:** Job Families simplify payroll forecasting input. Job Codes are essential for PLH revenue calculations and detailed payroll analysis.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-04-14` - `2025-05-01`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer`
                *   **Version/Status:** `v0.8 - Job Family definition in Workday pending. Initial mapping strategy TBD.`

        **5.1.8. User & Role Data**
            **5.1.8.1. `Workday_RLS_By_Security` (EDW) - AM/DM to site/district mapping**
                *   **Description:** EDW table sourced from Workday, used for row-level security in Power BI and to determine site/district access for AMs and DMs in the Forecasting system.
                *   **Key Fields:** User Principal Name (UPN), Employee ID, Job Profile (e.g., "Account Manager", "District Manager"), Cost Center (for AM direct site assignment), Site (for DM district-to-site mapping). Includes DOOs. Associate Managers will be added to this table with an "Account Manager" equivalent role for forecasting access.
                *   **Usage:** Assigns AM/DM roles in the Forecasting System and filters their site visibility.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-03-21`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Cesar Figueroa, Adam Suarez, Amy Sowells`
                *   **Version/Status:** `v1.0 - Synthesized. Associate Manager inclusion confirmed.`

            **5.1.8.2. Custom Role Mapping Table (Dataverse) - For roles above DM**
                *   **Description:** A manually maintained table in Dataverse will be created to map users to roles above DM (e.g., RVP, SVP, Forecast Admin, Corporate Consumer) and define their hierarchical access (e.g., which regions/districts an RVP can see/edit).
                *   **Usage:** Control access and visibility for users above the DM level. Updates require a support ticket.
                *   **Source Document(s):** `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
                *   **Date Discussed/Decided:** `2025-05-12`
                *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Michael Foy, Christopher Thompson`
                *   **Version/Status:** `v1.0 - Confirmed`

    **5.2. Data Sources & Lineage (Traceability from source to P&L)**
        *   **Source Document(s):** All provided transcripts (synthesized).
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12`
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v1.0 - Synthesized`

        *(This section would ideally include a more detailed flow for each P&L line item, tracing inputs back to their origin. The information below summarizes the key source-to-P&L paths.)*

        *   **External Revenue (P&L):**
            *   **Forecast:** Sum of (Forecasted Vehicle Stats * Forecasted Parking Rates) from Forecasting System (Dataverse).
            *   **Budget:** `Budget_Final` (Main Account 9410) from EDW.
            *   **Actual (Month-End):** `Account_Summary` (Main Account 9410) from EDW.
            *   **Actual (Daily/Intra-Month):** `Revenue_DataMart_Daily` (Net External Revenue column) from EDW.
        *   **Internal Revenue (P&L):**
            *   **Forecast:** Complex calculation based on:
                *   Power Bill contract configurations (deal type, rates, escalators, billable accounts, etc.).
                *   Forecasted inputs from Forecasting System:
                    *   Occupied Rooms (for POR deals).
                    *   Payroll Hours per Job Code (for PLH deals).
                    *   External Revenue (for Rev Share & some Management Agreement profit splits).
                    *   Payroll Costs & Other Expense forecasts (for Management Agreement bill-backs).
                    *   Manual inputs from "Other Internal Revenue" tab (Dataverse).
            *   **Budget:** `Budget_Final` (relevant Internal Revenue Main Accounts) from EDW.
            *   **Actual (Month-End):** `Account_Summary` (relevant Internal Revenue Main Accounts) from EDW.
        *   **Payroll Cost (P&L):**
            *   **Forecast:** Sum of Forecasted Payroll Costs (by Job Family/Code, including salaried from `Workday_Site_Salaries` logic) from Forecasting System (Dataverse).
            *   **Budget:** `Budget_Data_Tab_PR` (Payroll cost balances, mapped to Job Families) + `Workday_Site_Salaries` logic from EDW.
            *   **Actual (Month-End):** `Account_Summary` (sum of relevant payroll Main Accounts) from EDW.
            *   **Actual (Daily/Intra-Month):** `VW_Payroll_Summary` (sum of Dollars) from EDW.
        *   **Other P&L Expense Lines (Claims, PTAB, Insurance, Other Expenses, Parking Rents):**
            *   **Forecast:**
                *   Claims: Budgeted at $0 at site level. Actual claims hitting GL might be considered for MA Internal Rev calc (TBD).
                *   Insurance: % of Forecasted Payroll + Budgeted Vehicle Insurance (`Budget_Final` Acct 7082) + Power Bill fixed fee/escalator.
                *   Other Expenses: Budgeted amounts from `Budget_Final` + manual adjustments from "Other Expenses" tab (Dataverse).
                *   PTAB, Parking Rents: Budgeted amounts from `Budget_Final`. (Assumption: AMs don't typically forecast adjustments for these).
            *   **Budget:** `Budget_Final` (respective Main Accounts) from EDW.
            *   **Actual (Month-End):** `Account_Summary` (respective Main Accounts) from EDW.

    **5.3. Data Integration & Flow**
        *   **Source Document(s):** All provided transcripts (synthesized).
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12`
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v1.0 - Synthesized`

        **5.3.1. EDW <-> Forecasting System (Budget data in, Forecast data out for reporting)**
            *   **Inbound to Forecasting:** Budget data (`Budget_Final`, `Budget_Data_Tab_PR`) is queried from EDW (likely via Stored Procedures and Power Automate flows) to initialize forecasts and provide comparison views. Actuals (`Account_Summary`, `Revenue_DataMart_Daily`, `VW_Payroll_Summary`, etc.) are also queried from EDW.
            *   **Outbound from Forecasting:** Forecast data stored in Dataverse will be extracted (potentially by Towne Park data team) and loaded into EDW in a schema consistent with existing forecast data structures to support Power BI reporting and potential Legion integration.

        **5.3.2. Legion <-> Forecasting System (Payroll schedule/actuals in, Forecasted demand out - future)**
            *   **Inbound to Forecasting:** Scheduled hours/costs (`Shift_Entity`, `Schedule_Cost_Entity`) and actual payroll hours/costs (`VW_Payroll_Summary`) are sourced from Legion data in EDW.
            *   **Outbound from Forecasting (Future):** Forecasted vehicle counts or revenue data from the Forecasting System is planned to be sent to EDW. Legion would then consume this data to optimize schedules. This requires coordination with the Legion vendor and internal Workforce Planning.

        **5.3.3. Workday -> EDW/Forecasting System (Role data, Job Family data)**
            *   **Flow:** Workday data (employee roles, cost center assignments, salaries, future job families) is pushed to EDW. The Forecasting system accesses this via EDW tables (`Workday_RLS_By_Security`, `Workday_Site_Salaries`, future Job Family table).

        **5.3.4. Power Bill <-> GP (Invoice data to GP, Actuals from GP)**
            *   **Power Bill to GP:** Finalized invoice data from Power Bill is sent to Great Plains for accounting.
            *   **GP to EDW:** Month-end actuals from GP are pushed to `Account_Summary` in EDW.

        **5.3.5. RSS -> EDW (Daily stats and revenue)**
            *   **Flow:** Data from manual Revenue Spreadsheets is ingested into EDW tables like `Revenue_DataMart_Daily`.

    **5.4. Data Refresh Cadence & Latency**
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-21`, `2025-04-01`, `2025-04-14`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Cesar Figueroa`
        *   **Version/Status:** `v1.0 - Synthesized`

        *   **`Workday_RLS_By_Security`:** Updates once a day (overnight SQL job from Workday export).
        *   **`VW_Payroll_Summary` (Actual Payroll):** Updates at least once a day (e.g., 2 AM after day close), possibly more frequently, as it's a view off `Timesheet_Entity` which imports from Legion.
        *   **Legion Scheduled Data (`Shift_Entity`, `Schedule_Cost_Entity`):** Assumed to be near real-time or daily within Legion, and then replicated to EDW (cadence of replication to EDW TBD, but likely daily).
        *   **`Budget_Final`:** Updated sporadically during budget season (Nov-Feb), then potentially 1-2 times a month for new site/proforma data. Finalized typically by Feb.
        *   **`Revenue_DataMart_Daily` (RSS Data):** Updates based on RSS submission and EDW ingestion process (likely daily, but can have delays impacting Power BI reporting by up to 24 hours).
        *   **`Account_Summary` (GP Actuals):** Updated after month-end close.
        *   **Forecasting System (Dataverse):** Forecast inputs are saved in near real-time upon user save action.
        *   **Data Gateway to EDW:** Performance and potential bottlenecks are under review. Current access for budget data is via Stored Procedure and takes ~1 second to load a page.

    **5.5. Data Storage & Capacity (Dataverse limits, EDW capacity)**
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-14`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Christopher Thompson`
        *   **Version/Status:** `v1.0 - Synthesized`

        *   **Dataverse:**
            *   Has a tenant-wide storage limit (e.g., 10GB default, can be increased with cost).
            *   Decision made to query EDW for budget/actuals data on page load rather than storing full copies in Dataverse to manage storage and leverage SQL's optimization for large datasets.
            *   Will store forecast input data, which is expected to be manageable.
        *   **EDW:**
            *   Existing SQL Server infrastructure (Node1, Node2).
            *   Capacity for new forecast data extracts from Dataverse needs to be considered.
            *   Performance for concurrent queries from the Forecasting System is a consideration.
        *   **Microsoft Fabric:** Potential future solution for EDW data, which could impact storage and access strategies.

    **5.6. Data Quality, Validation, and Reconciliation Processes**
        *   **Source Document(s):** Implicit in discussions about data accuracy and system reliability.
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12`
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v0.5 - To be further detailed`

        *   **Input Validations:** The Forecasting system will have UI-level validations (e.g., numeric inputs, valid date ranges).
        *   **Guardrails:** For parking rates, prompts if input varies significantly from historicals/budget.
        *   **Data Integrity:** Storing forecast data in Dataverse with defined schemas aims to improve integrity over Excel files.
        *   **Reconciliation:**
            *   Forecast vs. Actuals: P&L views will facilitate this.
            *   Forecast vs. Budget: P&L views will facilitate this.
            *   Data lineage understanding is key for troubleshooting discrepancies.
        *   **Error Handling:** Processes for identifying and correcting data errors from source systems (e.g., incorrect job codes in Legion, stat errors in RSS) are external to the Forecasting system but impact its accuracy.
        *   **Data Consistency:** Job Family mapping initiative aims to improve consistency in payroll data. Standardizing how "Other Internal Revenue" items are budgeted and actualized is an ongoing discussion.

**6. Business Processes & User Flows**

    **6.1. Forecasting Workflow**
        *   **General Note:** The new forecasting system aims to streamline the existing process, making it more integrated and less reliant on manual Excel manipulation. The core users are Account Managers (AMs), with review and override capabilities for District Managers (DMs) and Regional VPs (RVPs).
            *   **Source Document(s):** `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-05-05` - `2025-05-12` (Synthesized)
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Jarrett Lagrone, Ryan (AM), James (AM), Adam Suarez, Michael Foy`
            *   **Version/Status:** `v1.0 - Synthesized`

        **6.1.1. AM Initial Forecast Creation (Stat input, Rate review, Payroll input, Other Revenue/Expense input)**
            *   **Trigger/Timing:** AMs typically begin detailed forecasting for an upcoming month around the 15th of the preceding month, or about two weeks before the forecast is "due" to be locked in.
            *   **Information Gathering (Current Process):**
                *   **Hotel/Client Communication:** AMs engage with hotel sales teams and GMs to get information on booked groups, expected occupancy (often available 2 weeks to a couple of months out), and any special events.
                *   **Historical Data Review:** AMs heavily rely on prior year actuals for the same period to understand seasonality, recurring groups, and typical performance. They may look back multiple years for group history. (Jarrett Lagrone: "We're gonna use the last year's existing data to help that along.")
                *   **Group Resumes/Calendars:** Hotels provide group calendars or resumes detailing room blocks and specific group needs, which AMs use to identify recurring groups and their historical performance (drive-in, capture).
            *   **System Interaction (New Forecasting System):**
                1.  **Login & Site Selection:** AM logs into the Forecasting System and selects their site(s) and the forecast period (year/month).
                2.  **Initial Data Load:** The system loads with budget data pre-populating all forecastable fields (stats, rates, payroll, etc.).
                3.  **Site Statistics Input:**
                    *   AMs input daily occupied rooms (or occupancy %).
                    *   They then input drive-in ratios and valet capture ratios. The system calculates vehicle volumes based on these inputs.
                    *   AMs adjust for known events, group characteristics (e.g., if a group is likely to use Uber vs. drive), and historical trends.
                    *   Comps and aggregator vehicle volumes are also entered.
                    *   **Key Consideration:** AMs (James) want the ability to adjust daily parking rates directly on this screen to reflect group discounts, rather than manipulating comp vehicle counts.
                4.  **Parking Rate Review/Input:**
                    *   AMs review the monthly parking rates, which are initialized from budget.
                    *   They can override these rates for future months based on planned rate increases or market changes.
                    *   The system will provide context like prior year actual rates and recent run rates. Guardrails will prompt if an input rate is significantly different.
                5.  **Payroll Input:**
                    *   AMs forecast payroll, typically by Job Family (e.g., Valet, GSC, Salaried), inputting either hours or cost.
                    *   The system displays scheduled hours/cost from Legion and actuals as they occur.
                    *   AMs adjust based on anticipated demand (driven by stats forecast), known events, and staffing needs (e.g., extra staff for overflow parking, GSC coverage).
                    *   For PLH sites, input will be at the Job Code level.
                6.  **Other Internal Revenue Input:**
                    *   AMs manually input monthly forecasts for categories like one-off Billable Expenses, Revenue Validations, Credits/Other Billable Items, GPO Fees, and Signing Bonuses.
                7.  **Other Expenses Input (Manual Adjustments):**
                    *   AMs review budgeted "Other Expenses" (e.g., uniforms, tickets) and can make monthly adjustments if they know of material variances. This is for exceptions, not line-by-line forecasting of all expenses.
                8.  **Saving:** AMs save their forecast inputs per tab.
            *   **Source Document(s):** `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Forecasting User Interview-20250508_133719-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-04-01` - `2025-05-08`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Jarrett Lagrone, Ryan (AM), James (AM), Amy Sowells, Adam Suarez, Eddie Petrini`
            *   **Version/Status:** `v1.0 - Synthesized`

        **6.1.2. P&L Review by AM**
            *   **Process:** After inputting detailed forecast drivers, AMs review the resulting P&L.
            *   **Focus:** They compare their forecasted FLC and other key lines (External Revenue, Internal Revenue, Payroll) against budget and prior year actuals.
            *   **Decision Making:** If variances are significant, they revisit their input assumptions. For example, if payroll costs are too high relative to budget or revenue, they might look for opportunities to reduce hours. If revenue is significantly off budget, they re-evaluate their stat inputs or rate assumptions, considering known factors (e.g., hotel renovations, loss of a major group).
            *   **Tools:** The in-app P&L view with toggles for Budget/Prior Year and variance displays (in dollars) will be the primary tool. The "Monthly Summary" tab (future concept) was also identified as a valuable view for this review.
            *   **Source Document(s):** `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-04-07`, `2025-05-05`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Jarrett Lagrone, Eddie Petrini, Amy Sowells, Adam Suarez`
            *   **Version/Status:** `v1.0 - Synthesized`

        **6.1.3. DM/VP Review & Override Process**
            *   **Process:** DMs and RVPs/MVPs will review the forecasts submitted by their AMs.
            *   **System Interaction:**
                *   They will use the P&L view, filtering by their district or region, to see aggregated performance and drill down to individual sites.
                *   If they identify a need for adjustment, they can select a specific site, enter "Edit Mode" for the relevant forecast tab (Stats, Rates, Payroll, etc.), and directly modify the forecast inputs.
                *   These changes will be logged with an audit trail indicating who made the change and when.
            *   **Communication:** It's expected that DMs/VPs will communicate any overrides to the AM, though the system will also track the editor.
            *   **Source Document(s):** `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-05-12`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Michael Foy, Jim Boyer`
            *   **Version/Status:** `v1.0 - Synthesized`

        **6.1.4. Forecast Submission / "Calling the Shot" (Process outside system, uses snapshot)**
            *   **Description:** The act of formally submitting or "committing" to a forecast (e.g., for a weekly cadence review or month-end finalization) is a business process that will occur *outside* the direct functionality of the new Forecasting System for MVP.
            *   **Mechanism:** The FP&A team (or similar) will take a "snapshot" of the forecast data in the system as of a specific cutoff date/time. This snapshot becomes the forecast of record for that submission period.
            *   **Locking:** The system will *not* lock users out from making further changes after a snapshot is taken. Comparisons will always be made against the official snapshot. A locking mechanism was considered too complex and potentially confusing for MVP.
            *   **Source Document(s):** `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
            *   **Date Discussed/Decided:** `2025-03-20`, `2025-04-28`
            *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, David Arreola, Jim Boyer`
            *   **Version/Status:** `v1.0 - Confirmed as external process for MVP.`

    **6.2. Billing Workflow (High-level, as it impacts forecasting data sources)**
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-14`, `2025-04-17`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Amy Sowells, Adam Suarez`
        *   **Version/Status:** `v1.0 - Synthesized`

        1.  **Customer & Contract Setup:** New customers and their contract terms (deal type, rates, billable items, etc.) are configured in Power Bill. Data is initially pulled from `Master Non-Financial`.
        2.  **Monthly Data Aggregation:** Power Bill pulls necessary data for invoicing (e.g., stats from EDW/RSS, labor hours from EDW/Legion).
        3.  **Invoice Calculation & Generation:** Invoices are calculated based on contract terms and aggregated data.
        4.  **Review & Approval:** Invoices are reviewed (e.g., by billing team, potentially RVPs in future for their regions).
        5.  **Statement Generation & Sending:** PDF statements are generated and sent to clients.
        6.  **Data to GP:** Invoice data is posted to Great Plains.
        7.  **Impact on Forecasting:**
            *   Power Bill contract configurations are a direct input for the Forecasting System's Internal Revenue calculations.
            *   Actual billed amounts for items like "Revenue Validations" or ad-hoc "Billable Expenses" from Power Bill invoices can serve as actuals for the "Other Internal Revenue" forecast tab.

    **6.3. Budgeting Workflow (High-level, annual process)**
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`, `Forecasting User Interview-20250505_200159-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-21`, `2025-05-05`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Jarrett Lagrone`
        *   **Version/Status:** `v1.0 - Synthesized`

        1.  **Annual Process:** Budgeting is an annual process, typically occurring around November-December for the upcoming year.
        2.  **AM Involvement (Current):** AMs are involved in building their site budgets, often with DM guidance. They consider historical performance, known future events, and planned rate increases.
        3.  **Data Storage:** Budget data is loaded into EDW tables (`Budget_Final`, `Budget_Data_Tab_PR`).
        4.  **Finalization:** The budget is typically finalized by February of the budget year.
        5.  **Usage in Forecasting System:** The approved budget data from EDW is used to initialize all forecastable fields in the new Forecasting System.
        6.  **Future State:** A dedicated budgeting module within the new platform is a long-term goal, which would replace the current Excel-based budget creation process.

    **6.4. User Onboarding & Role Assignment Process**
        *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250321_190718-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-21`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Cesar Figueroa, Adam Suarez, Amy Sowells, Christopher Thompson`
        *   **Version/Status:** `v1.0 - Synthesized`

        1.  **AM/DM/DOO/Associate Manager Onboarding:**
            *   User's role and site/district assignments are defined in Workday.
            *   This data flows to the `Workday_RLS_By_Security` table in EDW.
            *   The Forecasting System (and Power Bill) will query this table (likely via a dataflow/integration job managed by Christopher Thompson's team) to automatically assign the appropriate application role (e.g., "Account Manager," "District Manager") and associate them with their respective sites/districts.
            *   Associate Managers will be treated as Account Managers for system access and forecasting capabilities.
        2.  **RVP/SVP/Forecast Admin/Corporate Consumer Onboarding:**
            *   Since Workday data doesn't currently provide a clear mapping for these roles to specific operational hierarchies in the required format, a custom mapping table will be maintained in Dataverse.
            *   Initial population of this table will be manual.
            *   Ongoing maintenance (new hires, role changes) will require a support ticket to update this Dataverse table.
            *   This table will define their application role (e.g., "RVP - Edit," "SVP - ReadOnly") and the scope of their visibility/edit rights (e.g., specific regions).
        3.  **System Access:** Once roles are assigned, users can log in and will see data and functionality according to their permissions.

**7. Functional & Non-Functional Requirements**

    **7.1. Functional Requirements (Summary - "The system shall...")**
        *   **Source Document(s):** All provided transcripts (synthesized from feature discussions).
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12`
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v1.0 - Synthesized`

        *(This is a summary list; detailed functionality is described in Section 4. This section captures the "The system shall..." statements.)*

        **7.1.1. Allow users to input/view/edit X data...**
            *   The system shall allow authorized users (AMs, DMs, RVPs) to input and edit forecast data for site statistics (occupancy, vehicles, etc.) at a daily granularity.
            *   The system shall allow authorized users to input and edit forecast data for parking rates (valet, self-park, aggregators) at a monthly granularity.
            *   The system shall allow authorized users to input and edit forecast data for payroll (hours and/or cost) by Job Family (and by Job Code for PLH sites) at daily, weekly, and monthly granularities.
            *   The system shall allow authorized users to input and edit forecast data for "Other Internal Revenue" categories (billable expenses, validations, credits, GPO fees, signing bonuses) at a monthly granularity.
            *   The system shall allow authorized users to input and edit adjustments to budgeted "Other Expenses" for selected categories at a monthly granularity.
            *   The system shall allow users to view budget data for site statistics, rates, payroll, and P&L line items, sourced from EDW.
            *   The system shall allow users to view actual data (daily and month-end) for site statistics, rates, payroll, and P&L line items, sourced from EDW and Power Bill.
            *   The system shall allow users to view prior year actual data for comparison.
            *   The system shall allow DMs and RVPs to select specific sites within their hierarchy to view and edit forecasts.
            *   The system shall allow users to select the year and starting month for their forecast period.
            *   The system shall allow users to toggle P&L views between Budget, Forecast (Trend), and Prior Year.
            *   The system shall allow users to toggle P&L variance displays between dollar amounts and percentages (dollar amount preferred as default).
            *   The system shall allow users to filter P&L views by organizational hierarchy (District, Region, etc.) and customer attributes (COG Segment, Contract Type, P&L Category).
            *   The system shall allow users to save forecast changes on a per-tab basis.
            *   The system shall allow users (Forecast Admins) to manage a custom mapping table for user roles above DM level. (Implicit from role discussion)

        **7.1.2. Calculate Y based on Z inputs...**
            *   The system shall calculate forecasted External Revenue based on forecasted site statistics (vehicle counts) and forecasted parking rates.
            *   The system shall calculate forecasted Internal Revenue based on Power Bill contract configurations (deal type, rates, escalators, billable accounts, profit splits, management fees) and relevant forecast inputs (e.g., occupied rooms, payroll hours/costs, external revenue, "Other Internal Revenue" tab inputs).
            *   The system shall calculate forecasted Payroll Cost based on forecasted payroll hours and derived/configured average pay rates per Job Family/Code, including allocated salaried employee costs.
            *   The system shall calculate forecasted Insurance Expense based on a percentage of forecasted payroll and budgeted vehicle insurance amounts, plus any fixed fee/escalator amounts from Power Bill.
            *   The system shall calculate forecasted FLC (Full Location Contribution) as Internal Revenue minus the sum of forecasted Payroll, Claims (budgeted at $0), PTAB (budgeted), Insurance, Other Expenses (budget + manual adjustments), and Parking Rents (budgeted).
            *   The system shall calculate derived site statistics such as Capture Ratio and Drive-in Ratio.
            *   The system shall calculate variances (dollar and/or percentage) between Forecast, Budget, and Prior Year actuals on the P&L view.
            *   The system shall calculate P&L line items as a percentage of Internal Revenue.
            *   The system shall aggregate daily forecast inputs into weekly, monthly, and quarterly totals for display.
            *   The system shall correctly apply annual/monthly thresholds from Power Bill in Revenue Share calculations for Internal Revenue.

        **7.1.3. Display P&L rollups based on user role...**
            *   The system shall display P&L data rolled up to the appropriate level (Site, District, Region, SVP Region, Corporate) based on the logged-in user's role and permissions.
            *   The system shall restrict visibility of sites and editable forecast data based on the user's role and their position in the organizational hierarchy (AM sees their sites, DM sees sites in their district, etc.).
            *   The system shall provide a "Trend" view on the P&L that combines actual data for past closed months with forecast data for current and future months.

    **7.2. Non-Functional Requirements**
        *   **Source Document(s):** All provided transcripts (synthesized from various comments and concerns).
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12`
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v1.0 - Synthesized`

        **7.2.1. Performance (Page load times, calculation speed)**
            *   **Requirement:** The system must provide acceptable page load times and quick calculation updates, especially when users are inputting data and expecting real-time feedback (e.g., on P&L or derived metrics).
            *   **Context:** Concerns raised about EDW query performance via data gateways. Stored procedures are used for budget data retrieval (~1 second page load). Auto-save per field was initially avoided due to potential performance impact from frequent database writes.
            *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`

        **7.2.2. Scalability (User concurrency, data volume growth)**
            *   **Requirement:** The system must support a significant number of concurrent users (estimated 75-100 per region) without degradation in performance. It must also handle the growing volume of forecast and actuals data over time.
            *   **Context:** Dataverse storage limits (10GB tenant default) influenced the decision to query EDW for large datasets (budget/actuals) rather than full replication. Network and EDW server capacity are key considerations.
            *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`

        **7.2.3. Security (Role-based access, data protection, PII considerations for payroll)**
            *   **Requirement:** Access to data and functionalities must be strictly controlled based on user roles and their position in the organizational hierarchy. Sensitive data, particularly payroll information (individual salaries), must be protected.
            *   **Context:** AM/DM roles derived from `Workday_RLS_By_Security`. Higher-level roles managed via a custom Dataverse table. Concerns about Associate Managers seeing peer/supervisor salaries; mitigation by using Job Family level data and blended rates where possible, ensuring no direct employee PII (like names) is displayed with salary data in general views.
            *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`

        **7.2.4. Usability & Accessibility (Simplicity, intuitiveness, minimizing clicks)**
            *   **Requirement:** The system must be significantly simpler and more intuitive to use than the current Excel-based process. It should minimize clicks and streamline workflows to be efficient for AMs, especially those less familiar with complex financial tools.
            *   **Context:** A core project goal. Feedback from user interviews emphasized the need for simplicity and reducing the overwhelming nature of the current process. UI design choices (e.g., "Show Guide," clear navigation, Excel-like editing for grids) aim to support this.
            *   **Source Document(s):** `User Prompt 1 (Initial Instruction)`, `Forecasting User Interview-20250505_200159-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`

        **7.2.5. Reliability & Availability**
            *   **Requirement:** The system must be reliable and consistently available during business hours when forecasting activities are performed.
            *   **Context:** Standard expectation for a critical business system.

        **7.2.6. Maintainability**
            *   **Requirement:** The system should be designed in a way that is relatively easy to maintain, update, and enhance in the future.
            *   **Context:** Using Dataverse and Power Platform provides a managed environment. Clear separation of data sources (EDW vs. Dataverse) and modular design of features contribute to this.

        **7.2.7. Auditability (Tracking changes, user actions)**
            *   **Requirement:** The system must provide an audit trail for key changes, particularly for forecast overrides made by DMs or other authorized users above the AM level.
            *   **Context:** Logs should capture who made the change, when, and ideally what was changed. This information should be accessible within the application.
            *   **Source Document(s):** `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`

        **7.2.8. Data Accuracy & Integrity**
            *   **Requirement:** The system must ensure the accuracy of its calculations and maintain the integrity of the data it stores and processes.
            *   **Context:** Calculations for P&L, Internal Revenue, etc., must be precise. Data sourced from external systems (EDW, Legion) relies on the quality of that source data. The move from Excel to a structured database (Dataverse) is intended to improve data integrity for forecast inputs.

**8. User Roles & Permissions**

    *   **General Note on Role Assignment:**
        *   For Account Managers (AM), Associate Managers, District Managers (DM), and Directors of Operations (DOO), user role assignment and site/district association in the Forecasting System will be driven automatically by data from the `Workday_RLS_By_Security` table in EDW. This table is sourced from Workday.
        *   For roles above DM (RVP, SVP, Forecast Admin, Corporate Consumer), a custom mapping table will be maintained in Dataverse. This table will be manually updated via support tickets as it's not currently driven by a Workday feed for these specific application roles and their hierarchical data scope.
        *   The Billing system (Power Bill) and Forecasting system will share the same user roles and permissions framework where applicable, aiming for a unified system experience.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-21`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Cesar Figueroa, Adam Suarez, Amy Sowells, Michael Foy, Christopher Thompson`
        *   **Version/Status:** `v1.0 - Synthesized`

    **8.1. Account Manager (AM) / Associate Manager**
        *   **Description:** Primary users responsible for creating and maintaining site-level forecasts. Associate Managers will have the same system permissions and capabilities as Account Managers.
        *   **Permissions:**
            *   **View:** Their assigned site(s)' forecast data (Stats, Rates, Payroll, Other Internal Revenue, Other Expenses), P&L, budget data, actuals, and prior year data.
            *   **Edit:** Forecast data for their assigned site(s) across all input tabs (Stats, Rates, Payroll, Other Internal Revenue, Other Expenses).
            *   **Site Access:** Limited to the specific site(s) they are assigned to in `Workday_RLS_By_Security`.
        *   **Source System for Role/Site Assignment:** `Workday_RLS_By_Security` (Job Profile: "Account Manager"; Associate Managers will be mapped/added to this table with an equivalent designation).
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-21`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Amy Sowells`
        *   **Version/Status:** `v1.0 - Synthesized`

    **8.2. District Manager (DM)**
        *   **Description:** Supervise multiple Account Managers and are responsible for the overall forecast accuracy and performance of the sites within their district.
        *   **Permissions:**
            *   **View:** Forecast data, P&L, budget, actuals, and prior year data for all sites within their assigned district(s). Can view rolled-up P&L for their district.
            *   **Edit:** Forecast data for any site within their assigned district(s). An explicit "Edit Mode" button will need to be clicked on each forecast tab to prevent accidental changes. Edits will be captured in an audit trail.
            *   **Site/District Access:** Access defined by the sites associated with their district(s) in `Workday_RLS_By_Security`.
        *   **Source System for Role/Site Assignment:** `Workday_RLS_By_Security` (Job Profile: "District Manager").
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-21`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Michael Foy`
        *   **Version/Status:** `v1.0 - Synthesized`

    **8.3. Director of Operations (DOO)**
        *   **Description:** A site-level position, often considered a "super Account Manager" for very large or high-value locations. May oversee multiple sites in some contexts (e.g., Jason Mattingly over University of Maryland system).
        *   **Permissions:**
            *   Functionally similar to an Account Manager if assigned to a single site, or a District Manager if assigned to oversee multiple sites via cost center mappings in `Workday_RLS_By_Security`.
            *   **View & Edit:** Forecast data for their assigned site(s)/cost centers.
        *   **Source System for Role/Site Assignment:** `Workday_RLS_By_Security` (Job Profile: "Director of Operations"). The `Cost Center` field in this table will determine their site(s).
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250321_190718-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-21`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Amy Sowells`
        *   **Version/Status:** `v1.0 - Synthesized`

    **8.4. Regional Vice President (RVP) / Market Vice President (MVP)**
        *   **Description:** Oversee multiple districts within a defined region or market.
        *   **Permissions:**
            *   **View:** Forecast data, P&L, budget, actuals, and prior year data for all sites within their assigned region. Can view rolled-up P&L for their region and constituent districts.
            *   **Edit:** Forecast data for any site within their assigned region. An explicit "Edit Mode" button will be required. Edits will be captured in an audit trail. This edit capability is primarily for scenarios like a DM being on PTO or a DM vacancy.
            *   **Region/District Access:** Defined by the custom role mapping table in Dataverse.
        *   **Source System for Role/Hierarchy Assignment:** Custom Role Mapping Table in Dataverse.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Michael Foy`
        *   **Version/Status:** `v1.0 - Synthesized`

    **8.5. Senior Vice President (SVP) - Read-only for their hierarchy**
        *   **Description:** Executive operational leaders overseeing multiple regions.
        *   **Permissions:**
            *   **View:** Rolled-up P&L views and forecast data for all sites/districts/regions within their assigned hierarchy.
            *   **Edit:** No edit access to site-level forecasts. Their focus is on consuming aggregated information and high-level performance.
            *   **Hierarchy Access:** Defined by the custom role mapping table in Dataverse, likely leveraging the `SVP_Region` field from `Master Non-Financial` for data aggregation.
        *   **Source System for Role/Hierarchy Assignment:** Custom Role Mapping Table in Dataverse.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`, `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-17`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Michael Foy, Amy Sowells`
        *   **Version/Status:** `v1.0 - Synthesized`

    **8.6. Forecast Admin (Super User - e.g., FP&A)**
        *   **Description:** A role for users, typically within the FP&A team (e.g., Adam Suarez, Amy Sowells, Michael Foy), who require comprehensive access for system administration, oversight, and troubleshooting.
        *   **Permissions:**
            *   **View:** All forecast data, P&Ls, budget, actuals, and prior year data across the entire company.
            *   **Edit:** Ability to edit any forecast data for any site in the system. This is for administrative purposes, resolving issues, or making top-side adjustments if absolutely necessary (though direct forecast input is preferred).
            *   **Access:** Full system access.
        *   **Source System for Role Assignment:** Custom Role Mapping Table in Dataverse.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Adam Suarez, Michael Foy, Jim Boyer`
        *   **Version/Status:** `v1.0 - Synthesized`

    **8.7. Corporate Consumer - Read-only all**
        *   **Description:** A role for executive leadership (e.g., CFO Mike Morgen) or other corporate stakeholders who need to view company-wide forecast information and P&L roll-ups but will not be inputting or editing data.
        *   **Permissions:**
            *   **View:** All forecast data, P&Ls, budget, actuals, and prior year data across the entire company, primarily through aggregated views.
            *   **Edit:** No edit access.
            *   **Access:** Full read-only access to all data.
        *   **Source System for Role Assignment:** Custom Role Mapping Table in Dataverse.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Michael Foy`
        *   **Version/Status:** `v1.0 - Synthesized`

    **8.8. (Permissions matrix for viewing/editing specific modules/data)**
        *   **Source Document(s):** Synthesized from all role discussions.
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12`
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v0.5 - Placeholder for Detailed Matrix`

        *(Jonathan, a detailed matrix would be beneficial here. For now, the descriptions above cover the core access levels. The matrix would explicitly map roles to specific data entities/forecast tabs and their R/W/Edit permissions.)*

        **Conceptual Permissions Summary:**

        | Role                 | Forecast Input (Stats, Rates, Payroll, Other Rev/Exp) | P&L View (Own Hierarchy) | P&L View (Full Company) | Edit Forecast (Own Hierarchy) | Edit Forecast (Full Company) |
        |----------------------|-------------------------------------------------------|--------------------------|-------------------------|-------------------------------|------------------------------|
        | AM/Associate Mgr     | Edit (Own Sites)                                      | View (Own Sites)         | No                      | Edit (Own Sites)              | No                           |
        | DM/DOO               | View (Own District)                                   | View (Own District)      | No                      | Edit (Own District)           | No                           |
        | RVP/MVP              | View (Own Region)                                     | View (Own Region)        | No                      | Edit (Own Region)             | No                           |
        | SVP                  | Read-Only                                             | View (Own Hierarchy)     | No                      | No                            | No                           |
        | Forecast Admin       | View All                                              | View All                 | View All                | Edit All                      | Edit All                     |
        | Corporate Consumer   | Read-Only                                             | View All                 | View All                | No                            | No                           |


**9. Reporting & Analytics (Beyond in-app P&L)**

    **9.1. Power BI Reporting Strategy**
        *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-17`, `2025-04-02`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Michael Foy, Amy Sowells, Cesar Figueroa`
        *   **Version/Status:** `v1.0 - Synthesized`

        *   **Primary External Reporting Tool:** Power BI will be the primary tool for reporting and analytics that go beyond the in-app P&L views provided by the Forecasting System.
        *   **Data Sources for Power BI:**
            *   **Dataverse:** Forecast data (site statistics, rates, payroll, other internal revenue, other expenses) created and stored within the Forecasting System will be directly accessible by Power BI. The Dataverse tables are being designed with Power BI querying in mind (tabular format, not JSON objects, learning from past Billing system experiences).
            *   **EDW (Enterprise Data Warehouse):** Budget data, actuals data (from GP, Legion, RSS), and master data (customer, site, Workday-derived roles) will be sourced from EDW.
            *   **Forecast Data in EDW:** Forecast data from Dataverse will be extracted, transformed (if necessary), and loaded into EDW by the Towne Park data team (Nazeer's team). This is to ensure the data conforms to existing EDW schemas and can be easily joined with other historical and actuals data for comprehensive reporting. This also supports the planned integration where Legion might consume forecast data from EDW.
        *   **Schema Consistency:** The goal is for the forecast data, once in EDW, to have a schema consistent with existing forecast data structures, allowing for easier comparison with historical data and leveraging existing reporting logic where possible.
        *   **Reporting Development Responsibility:** The development of specific Power BI reports is the responsibility of the Towne Park finance/BI team (Jim Boyer, Pat, potentially others). The Allata team's responsibility is to ensure the data from the Forecasting System is available and structured appropriately in Dataverse and to support the Towne Park data team in getting it into EDW.
        *   **Town Vision Portal:** Existing Power BI reports are often accessed through the "Town Vision" portal. New forecast-related reports will likely be integrated here.
        *   **Org App Functionality:** Power BI's "Org App" functionality will be leveraged to tailor report visibility and content to different user groups/security roles, allowing for customized views for AMs, DMs, RFDs, SVPs, etc., from a common set of reports.

    **9.2. Key Reports for Different Audiences (AM, DM, RVP, SVP, Finance, Execs)**
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-02`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jim Boyer, Adam Suarez, Michael Foy, Amy Sowells, Eddie Petrini`
        *   **Version/Status:** `v0.5 - Requirements gathering for specific reports is ongoing by Towne Park team.`

        *   **General Requirement:** The specific reports and their detailed requirements are still being defined by the Towne Park finance and operations teams (led by Jim Boyer, with input from Chris Moore, RFDs, etc.). The following are conceptual types of reports discussed or implied:
        *   **Account Manager (AM):**
            *   While the in-app P&L and input screens are primary, AMs might benefit from Power BI reports showing deeper dives into their site's historical trends, detailed variance analysis (beyond what's in-app), or specific KPI tracking.
        *   **District Manager (DM) / Regional Field Director (RFD):**
            *   Roll-up reports for their district/region, comparing performance across sites.
            *   Variance analysis reports (Forecast vs. Budget, Forecast vs. Prior Year, Actual vs. Forecast).
            *   Reports to support weekly financial calls and performance reviews.
            *   The current Excel-based forecast summary file that Adam Suarez distributes multiple times a week is a key report that DMs and RFDs use extensively. The goal is to replace or supplement this with Power BI reports.
        *   **Regional Vice President (RVP) / Market Vice President (MVP):**
            *   Higher-level regional roll-ups, KPI dashboards, and trend analysis.
        *   **Senior Vice President (SVP) / Executive Leadership (CFO, etc.):**
            *   Company-wide P&L roll-ups, FLC margin analysis, performance against strategic targets.
            *   Executive summaries.
        *   **Finance (FP&A):**
            *   Detailed financial analysis, variance explanations, data for month-end close support, and ad-hoc reporting capabilities.
            *   Reports to monitor overall forecast accuracy and identify systemic issues or trends.
            *   "Snapshot" comparisons: Ability to compare the current forecast against previously submitted "forecasts of record."
        *   **Common Reporting Needs (Implied):**
            *   Forecast vs. Budget comparisons.
            *   Forecast vs. Prior Year Actuals comparisons.
            *   Actuals vs. Forecast (Trend) comparisons as the month/year progresses.
            *   KPI dashboards (FLC, Margins, Payroll % of Revenue, etc.).
            *   Ability to slice and dice data by various dimensions (Site, District, Region, COG Segment, Contract Type, P&L Category, Time Periods).

    **9.3. Data Requirements for External Reporting**
        *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-17`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Cesar Figueroa`
        *   **Version/Status:** `v1.0 - Synthesized`

        *   **Forecast Data from Dataverse:**
            *   All detailed forecast inputs: daily site statistics, monthly parking rates, daily/weekly/monthly payroll hours and costs (by job family/code), monthly other internal revenue inputs, monthly other expense adjustments.
            *   Calculated P&L data at the site/month level.
            *   Data needs to be in a tabular format, avoiding complex structures like JSON objects within fields, to ensure easy consumption by Power BI and EDW ingestion processes.
            *   Clear identifiers for Site (Cost Center), Date, Period (Month/Year), Main Account/Metric Name, and Value.
            *   A "Type" field (e.g., "Forecast") to distinguish it if co-located with other data types (though primary storage is separate).
        *   **EDW Data (for joining with Forecast Data):**
            *   `Budget_Final`: For budget comparisons.
            *   `Budget_Data_Tab_PR`: For payroll budget comparisons.
            *   `Account_Summary`: For month-end actual P&L comparisons.
            *   `Revenue_DataMart_Daily` / `Revenue_Daily_Detail_Invoice`: For daily/intra-month actual stats and external revenue.
            *   `VW_Payroll_Summary`: For daily/intra-month actual payroll.
            *   `Master Non-Financial`: For site attributes, organizational hierarchy (District, Region, SVP Region, P&L Category, COG, Contract Type).
            *   `Workday_RLS_By_Security`: For user-to-site/district mapping to enable row-level security in reports.
            *   Job Family Mapping Table (once established in EDW or Dataverse): To link job codes to job families for consistent reporting.
            *   Chart of Accounts (COA): For mapping Main Accounts to P&L categories and summary levels.
        *   **Timeliness:** Data needs to be available in EDW/Dataverse in a timely manner to support reporting cadences (e.g., daily updates for operational reports, month-end for financial summaries).
        *   **Granularity:** Data must be available at the lowest level of detail captured in the forecast (e.g., daily for stats and payroll) to allow for flexible aggregation in reports.

**10. Future Considerations & Roadmap**

    **10.1. Full Budgeting Module Integration**
        *   **Description:** Development of a full budgeting module within the new platform to replace the current Excel-based budget creation process. This would allow for a more integrated budget-to-forecast lifecycle.
        *   **Current Status:** Planned as a future phase, post-MVP rollout of the Forecasting System. The current forecasting system consumes budget data but does not create it.
        *   **Potential Impact:** Would streamline the annual budgeting process, improve data consistency between budget and forecast, and potentially allow for more dynamic budgeting capabilities.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250320_200055-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250417_191142-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-20`, `2025-04-01`, `2025-04-17`
        *   **Key Stakeholders Involved:** `Adam Suarez, Amy Sowells, Jonathan Aulson`
        *   **Version/Status:** `v1.0 - Identified as Future Phase`

    **10.2. Enhanced AI/ML Driven Forecasting Algorithms**
        *   **Description:** Leveraging Artificial Intelligence (AI) and Machine Learning (ML) to provide more sophisticated forecasting suggestions or automated baseline forecasts. This could involve analyzing historical trends, seasonality, and other factors to predict future performance.
        *   **Current Status:** The current system focuses on user-input forecasts with budget data as a baseline. Mike Foy is independently working on a forecast model using historical data to predict results, which, if successful, could become an alternative baseline to budget data. The master documentation itself is being created as a "data product" to empower future AI-assisted conversations and code generation.
        *   **Potential Impact:** Could improve forecast accuracy, reduce manual effort for AMs, and provide more data-driven insights.
        *   **Source Document(s):** `User Prompt 1 (Initial Instruction)`, `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-07`, `2025-04-28`, `2025-05-14` (initial prompt)
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Michael Foy, Jim Boyer`
        *   **Version/Status:** `v0.5 - Conceptual, Mike Foy's initiative noted.`

    **10.3. Deeper Legion Integration (e.g., pushing forecast demand to Legion)**
        *   **Description:** Enhancing the integration with Legion by not only pulling scheduled/actual payroll data but also pushing forecast demand (e.g., vehicle counts, revenue projections) from the Forecasting System to Legion. Legion could then use this more accurate, operational forecast to optimize employee schedules, rather than relying on potentially outdated budget data.
        *   **Current Status:** Identified as a key desired future state. The Forecasting System will make its forecast data available in EDW for Legion to consume. However, the actual development work within Legion to use this data, and the definition of the specific data points and rules for schedule optimization, require significant coordination with the Legion vendor and Towne Park's internal Workforce Planning team. This is considered a critical path item for realizing the full benefits of an accurate operational forecast.
        *   **Potential Impact:** More optimized labor scheduling, better alignment between forecasted demand and staffing, improved labor cost management.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250402_193000-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-01`, `2025-04-02`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez, Jim Boyer, Eddie Petrini, Brian (Exec)`
        *   **Version/Status:** `v0.8 - High priority future state, coordination efforts initiated.`

    **10.4. Streamlining "10 Percenter" Deal Management**
        *   **Description:** Continuously improving Power Bill and the Forecasting System to better handle "10 Percenter" (complex/custom) client contracts. The goal is to reduce the number of deals that require manual workarounds.
        *   **Current Status:** An ongoing effort for Power Bill. The Forecasting System needs a defined strategy for handling sites that remain "10 Percenters" at the time of its rollout. This involves creating a way to forecast for them even if their full deal structure isn't in Power Bill (e.g., using a base deal type template).
        *   **Potential Impact:** Increased automation, reduced manual effort for billing and forecasting complex deals, improved data consistency.
        *   **Source Document(s):** `Backlog Grooming Billing & Forecasting-20250317_191956-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-03-17`, `2025-05-12`
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Amy Sowells, Adam Suarez`
        *   **Version/Status:** `v0.5 - Strategy for forecasting 10%ers in discussion.`

    **10.5. Automation of Job Family Mapping via Workday**
        *   **Description:** Fully automating the definition and maintenance of Job Families and their mapping to specific Job Codes through Workday. This would ensure a consistent, enterprise-wide standard for payroll reporting and forecasting.
        *   **Current Status:** An initiative is underway, led by Amy Sowells and involving Jim Boyer and HRIS, to define more granular Job Families within Workday. Currently, Workday has very high-level families (e.g., "Operations"). The initial rollout of the Forecasting System may rely on a more manual or interim mapping solution if the Workday changes are not complete.
        *   **Potential Impact:** Improved consistency and accuracy in payroll forecasting and reporting, reduced manual effort in maintaining mappings.
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250501_194230-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-14` - `2025-05-01`
        *   **Key Stakeholders Involved:** `Amy Sowells, Jim Boyer, Adam Suarez, Jonathan Aulson`
        *   **Version/Status:** `v0.8 - Workday initiative in progress, timeline for full automation TBD.`

    **10.6. Mobile Accessibility**
        *   **Description:** Providing access to key forecasting functionalities or views via mobile devices.
        *   **Current Status:** Not explicitly discussed as part of the MVP. The current focus is on a web-based application.
        *   **Potential Impact:** Increased flexibility for users (especially DMs/VPs) who may need to review or input data while away from a desktop.
        *   **Source Document(s):** Not explicitly mentioned in transcripts, general future consideration.
        *   **Date Discussed/Decided:** N/A
        *   **Key Stakeholders Involved:** N/A
        *   **Version/Status:** `v0.1 - Conceptual`

    **Other Potential Future Enhancements (Synthesized from discussions):**
        *   **Forecast Versioning:** Ability to save and restore previous versions of a forecast. (Discussed as Phase 2 for `Backlog Grooming Forecasting-20250512_192537-Meeting Recording.txt`)
        *   **Monthly Summary Tab:** A dedicated tab providing a consolidated view of key metrics for a selected month, similar to the current Excel forecast file's summary. (Strongly desired by Ops, candidate for early Phase 2, discussed in `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt` and `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`)
        *   **Payroll Variance Dashboard:** A dedicated view for analyzing payroll variances (hours/cost, schedule vs. actual). (Well-received, TBD for MVP or Phase 2, discussed in `Backlog Grooming Forecasting-20250407_120017-Meeting Recording.txt`)
        *   **Enhanced Rate Forecasting Logic:** More sophisticated seeding of future parking rates, potentially using historical run rates and seasonality adjustments, rather than just budget or manual input. (Discussed by Jim Boyer in `Backlog Grooming Forecasting-20250428_192705-Meeting Recording.txt`)
        *   **Notes/Comments on Variances:** Ability for AMs to add notes explaining significant variances in their forecast, especially for historical context for new AMs. (Discussed in `Forecasting User Interview-20250505_200159-Meeting Recording.txt`)
        *   **Sidebar Widgets for Forecasting:** Extending the proposed sidebar widget concept (from Billing) to the Forecasting system for "at a glance" views of key forecast metrics or statuses. (Implied from `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`)

Okay, Jonathan, here's Section 11, "Appendices." As anticipated, this will largely be a structural placeholder, outlining what would go into a fully detailed appendix. I'll include references to specific items we've discussed that would belong here.

**11. Appendices**

    **11.1. Detailed Data Dictionary (Field names, types, descriptions, sources)**
        *   **Source Document(s):** All provided transcripts (where specific table/field names were discussed).
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (Ongoing as data sources are identified)
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Adam Suarez, Amy Sowells, Cesar Figueroa, Christopher Thompson`
        *   **Version/Status:** `v0.2 - Placeholder, key tables/views identified, full dictionary TBD`

        *(This section will contain a comprehensive dictionary of all key data elements across the involved systems: Dataverse (Forecasting & Power Bill entities), EDW tables, Legion tables/views, and Workday tables/views relevant to the financial systems. For each field, it would ideally include: Field Name, Data Type, Description/Business Meaning, Source System & Table, Allowable Values/Constraints, Notes.)*

        **Key Tables/Views to be included in Data Dictionary (examples mentioned in discussions):**
        *   **EDW:**
            *   `Budget_Final`
            *   `Budget_Data_Tab_PR`
            *   `Account_Summary`
            *   `Revenue_DataMart_Daily` (or `Revenue_Daily_Detail_Invoice`)
            *   `Master Non-Financial` (including `SVP_Region` column)
            *   `Workday_RLS_By_Security`
            *   `Workday_Site_Salaries`
            *   `Workday_Wage_Rate`
            *   Chart of Accounts (COA) table (for `Is_Summary_Category`)
        *   **Legion (via EDW):**
            *   `VW_Payroll_Summary`
            *   `Shift_Entity`
            *   `Schedule_Cost_Entity`
            *   `Timesheet_Entity` (raw source for `VW_Payroll_Summary`)
        *   **Dataverse (Forecasting System - conceptual tables):**
            *   `Customer_Site`
            *   `Site_Statistic_Details` (or similar for daily stat forecasts)
            *   `Parking_Rate_Forecast`
            *   `Payroll_Forecast_Details`
            *   `Other_Internal_Revenue_Forecast`
            *   `Other_Expenses_Forecast`
            *   Custom Role Mapping Table (for roles above DM)
        *   **Dataverse (Power Bill):**
            *   Entities for Customer, Contract, Invoice, Invoice Line Items, Rate configurations, etc.

    **11.2. List of Key Stored Procedures & Views Used**
        *   **Source Document(s):** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
        *   **Date Discussed/Decided:** `2025-04-14` (and ongoing as technical design progresses)
        *   **Key Stakeholders Involved:** `Jonathan Aulson, Jim Boyer, Christopher Thompson, Cesar Figueroa`
        *   **Version/Status:** `v0.2 - Placeholder, some identified, full list TBD`

        *(This section will list and briefly describe key database views and stored procedures utilized by the systems, particularly for data integration and retrieval from EDW.)*

        **Identified Stored Procedures/Views:**
        *   **`SP_GP_Stats` (EDW):** Currently used by Power Bill to get month-end statistics. Considered for modification to include date for daily actuals for forecasting, but decided against as it's a month-end summary.
            *   **Source Document:** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
        *   **`VW_Payroll_Summary` (Legion DB / EDW):** View summarizing actual payroll data from Legion. Key source for actual payroll hours and costs.
            *   **Source Document:** `Backlog Grooming Forecasting-20250401_184742-Meeting Recording.txt`, `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
        *   **Stored Procedure for Budget Data Retrieval (EDW):** A stored procedure is used by the Forecasting System (via Power Automate) to fetch budget data from `Budget_Final` for page loads. This approach was chosen for performance.
            *   **Source Document:** `Backlog Grooming Forecasting-20250414_192633-Meeting Recording.txt`
        *   **Potential New Stored Procedures/Views (EDW):**
            *   For fetching daily actual stats from `Revenue_DataMart_Daily` efficiently.
            *   For fetching scheduled payroll hours/costs from `Shift_Entity` and `Schedule_Cost_Entity`.
            *   For fetching salaried employee costs/allocations from `Workday_Site_Salaries`.
            *   For fetching Job Family mappings (if stored in EDW).

    **11.3. UI Mockup Archive (Links or embedded images of key screens)**
        *   **Source Document(s):** All `Backlog Grooming Forecasting` and `Forecasting User Interview` transcripts where UI was shown and discussed.
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12` (Ongoing as UI evolves)
        *   **Key Stakeholders Involved:** `Jonathan Aulson` (primary creator of mockups), all meeting participants providing feedback.
        *   **Version/Status:** `v0.2 - Placeholder, mockups exist externally (e.g., V0.dev), links/images TBD`

        *(This section will provide a visual reference to the User Interface designs for key screens within the Forecasting System. This could be direct image embeds or links to a shared repository of mockups/prototypes created in tools like V0.dev or Figma.)*

        **Key Screens for which Mockups/Prototypes were Discussed/Shown:**
        *   Forecasting System Landing Page / Site & Period Selection
        *   Site Statistics Input Tab (various iterations: grid, calendar view, metric view, daily/weekly/monthly granularity)
        *   Parking Rates Input Tab
        *   Payroll Forecasting Input Tab (slider bar UI, job family/code views, hours/cost toggle)
        *   Payroll Variance Dashboard (conceptual)
        *   Other Internal Revenue Input Tab
        *   Other Expenses Input Tab (conceptual)
        *   P&L View (with filters, data toggles, variance displays)
        *   Billing System Sidebar Widgets (conceptual)

    **11.4. Meeting Summaries & Decision Logs (Cross-references)**
        *   **Source Document(s):** This Master Document itself serves as a synthesis. Original transcripts are the source.
        *   **Date Discussed/Decided:** `2025-03-17` - `2025-05-12`
        *   **Key Stakeholders Involved:** All meeting participants.
        *   **Version/Status:** `v0.2 - Placeholder, this document is the primary log.`

        *(This section would typically cross-reference or link to more granular meeting minutes or decision logs if they were maintained separately. In our case, this Master Document, with its source document tagging per section, aims to fulfill this role. If more detailed, separate logs exist or are created, they would be referenced here.)*

        **Key Decision Points Logged within this Document (Examples - not exhaustive):**
        *   Decision to use EDW for budget/actuals queries vs. full Dataverse replication.
        *   Confirmation of user roles and their access levels.
        *   Prioritization of P&L variance display in dollars over percentages.
        *   Approach for handling "10 Percenter" and proforma forecasting (initial thoughts).
        *   Data sources for each P&L line item (budget, forecast, actuals).
        *   UI considerations like save mechanisms, "Show Guide" features.
        *   Strategy for Job Family implementation and payroll forecasting granularity.

---
