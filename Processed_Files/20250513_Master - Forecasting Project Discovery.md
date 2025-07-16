**Master Forecasting Project Discovery Documentation for Towne Park (AI-Optimized)**

**Document Version:** 1.0
**Date Compiled:** 5/13/2025
**Source Transcripts:**
1.  Towne Park Onsite - Teams Meeting-20240530_081606-Meeting Recording (Primarily Billing, some Forecasting context)
2.  Operational Pain Points Forecasting-20250106_200702-Meeting Recording
3.  Discovery Forecasting (Current State _1)-20250107_163133-Meeting Recording
4.  Discovery Forecasting (Future State _1)-20250108_163116-Meeting Recording
5.  Discovery Forecasting (Future State _2)-20250120_195729-Meeting Recording

---

**I. Project Overview & Goals**

*   **A. Project Mandate:**
    *   Allata has been challenged to redo the forecasting process and build a new solution for Towne Park. (Source: Operational Pain Points Forecasting - 20250106)
    *   The new solution must address the pain points encountered by the field staff in the forecasting process. (Source: Operational Pain Points Forecasting - 20250106)
    *   Allata has prior experience working with Towne Park on the billing and invoicing solution. (Source: Operational Pain Points Forecasting - 20250106)

*   **B. Primary Objectives for New Forecasting System (Future State):**
    *   **Shift Focus from Input to Actionable Output:** Reduce time spent on data entry and reconciliation, allowing users (AMs, DMs, RFDs, Corporate) to focus on analyzing forecasts and taking proactive business actions. (Source: Discovery Forecasting Future State _1 - 20250108)
    *   **Improve Accuracy & Timeliness:** Provide more reliable forecasts with faster feedback loops. Willing to trade a small degree of pinpoint accuracy for significant gains in speed and predictability. (Source: Discovery Forecasting Future State _1 - 20250108)
    *   **Enable Proactive Management:** Equip users at all levels with tools to anticipate issues, model scenarios, and drive performance. (Source: Discovery Forecasting Future State _1 - 20250108)
    *   **Data Consistency & Single Source of Truth:** Ensure outputs are consistent with existing EDW schemas (at a minimum, with enhancements desired) to maintain compatibility with downstream reporting and processes. (Source: Discovery Forecasting Future State _1 - 20250108)
    *   **Simplify the Forecasting Process:** Especially for Account Managers and Operations. (Source: Discovery Forecasting Future State _2 - 20250120)
    *   **Support All Sites:** The future forecasting solution must support every site, including the "10 percenters" (complex sites not fully supported by the new billing system yet). (Source: Discovery Forecasting Current State _1 - 20250107, Discovery Forecasting Future State _1 - 20250108)

*   **C. Allata Team Roles (Forecasting Project):**
    *   **Jonathan Aulson:** Consultant at Allata. Involved in requirements gathering. (Source: Operational Pain Points Forecasting - 20250106)
    *   **John Hesseltine:** Director in Technology and Cloud practice at Allata. Provides account-level oversight. Heavily involved in technical architecture and design. (Source: Operational Pain Points Forecasting - 20250106)
    *   **Gabriel Aquilano:** Business Analyst at Allata. Supports requirements gathering and preparing information for the engineering team. (Source: Operational Pain Points Forecasting - 20250106)

---

**II. Actors/User Roles in Forecasting**

*   **A. Current State Actors (Validated in Discovery Forecasting Current State _1 - 20250107):**
    *   **1. Corporate Finance (e.g., Adam Suarez's team, Matt Longo, Mike Craig):**
        *   Sets initial budget targets.
        *   Prepares and rolls forward forecast templates (Excel files).
        *   Handles administrative tasks and maintenance of the process.
        *   Makes "over the top" adjustments to the rolled-up field forecast based on macro-level trends.
        *   Manages forecast for specific cost centers: contingencies, overhead (corporate G&A), "plug" cost centers (e.g., base contingency), and "topside" adjustments (e.g., health benefit allocations, AP accruals).
        *   Finalizes and submits forecasts to ELT/Equity Partners/Board.
        *   Consumes rolled-up forecasts and specific reports.
        *   Arbiter of snapshots and preservation of forecast data.
    *   **2. Regional Finance Directors (RFDs - e.g., Ryan Esposito, Chad Beamesderfer, Chris Moore):**
        *   Also referred to as "Field Finance."
        *   Reviews and optimizes field forecasts (site-level forecasts from AMs).
        *   Works with DMs to influence and guide AMs.
        *   Consumes the "Financial Review File" (aka "Suarez File") for their analysis.
        *   Holds meetings with DMs/regional leadership to review current month flash vs. forecast and finalize next month's forecast. (Source: Discovery Forecasting Future State _1 - 20250108)
    *   **3. Account Managers (AMs):**
        *   Input site-level data (drive-in ratios, occupancy, rates, events, car counts, etc.).
        *   Incorporate client data.
        *   Handle custom formulas for unique billing rules not covered by standard templates.
        *   Manually input hours for per-labor-hour accounts (current lack of direct Legion link for this specific forecast input).
        *   Update revenue spreadsheets.
        *   Responsible for the accuracy of their site's forecast inputs.
    *   **4. District Managers (DMs - e.g., Brian Stone, Jamie MacSkimming, Brennen Stepanek, Eddie Petrini, Peter Quinan, David Arreola, Joseph Jaussi):**
        *   Review forecasts with AMs cyclically (multiple times a week).
        *   Utilize the "Financial Review File."
        *   Meet with AMs to build bottoms-up forecast for their units. (Source: Discovery Forecasting Future State _1 - 20250108)
    *   **5. Area Managers (e.g., Sebastian Rodriguez, Darius Shuler):**
        *   Likely participate in reviews with DMs and AMs for their specific areas.
    *   **6. Clients:**
        *   Their data (occupancy, events, rates, etc.) is a key input to the AMs.
        *   Not direct users of the forecasting system.
    *   **7. Senior Leadership (ELT - Executive Leadership Team, COO, CFO, SVPs, Market VPs - e.g., Brian LaChapelle):**
        *   Consumers of rolled-up forecasts and specific reports (e.g., Financial Review File, PowerPoint presentations).
        *   Not direct influencers of the forecast numbers but use the output for decision-making.
    *   **8. Board/Equity Partners (e.g., Greenbrier):**
        *   Ultimate consumers of finalized forecasts, typically via PowerPoint presentations.
    *   **9. Sales Team/FP&A Sales Analytics Team:**
        *   Manages sales pipeline reporting, which informs new business placeholders in the forecast. (Source: Discovery Forecasting Future State _2 - 20250120)
    *   **10. AR Team (Accounts Receivable):**
        *   Manually forecasts financial impacts of prior month invoice revisions in the current month's forecast. (Source: Discovery Forecasting Current State _1 - 20250107)

*   **B. Future State User Roles & Considerations:**
    *   **Role-Based Access Control (RBAC) is critical.** (Source: Discovery Forecasting Future State _2 - 20250120)
        *   Access and visibility restricted based on user role and organizational hierarchy (AM, Area/DM, Regional Manager/SVP, Corporate Finance, Enterprise).
        *   Users can see data within their scope (and below).
        *   No cross-over visibility for parallel hierarchies (e.g., SVPs comparing regions would happen at a higher, enterprise level).
    *   **Proxy/Coverage Functionality:** (Source: Discovery Forecasting Future State _2 - 20250120)
        *   Needed for situations like an AM on PTO, a vacant AM role covered by a DM, or a senior AM covering for another AM.
        *   Workday Cost Center Manager hierarchy is a primary source for identifying managers.
        *   Ad-hoc/temporary assignments need support.
        *   A "Champion" or "Subject Matter Expert" (SME) AM might train others but likely wouldn't need special system access beyond their own site or temporary coverage access (can use screen-sharing for training). The consensus was that a dedicated "champion role" with broad access might not be necessary if the system is simplified.
        *   If a champion/SME covers for a DM, they would inherit DM-level security for that scope.
    *   **Primary Users of Forecasting System (Future State):** While Corporate Finance currently "owns" much of the process due to tool limitations, the future state aims for the field (AMs, DMs, RFDs) to be primary users for driving results, with Finance monitoring and providing support/guidance. (Source: Discovery Forecasting Future State _1 - 20250108)

---

**III. Current State Forecasting Analysis**

*   **A. Process Flow (As detailed in Discovery Forecasting Current State _1 - 20250107):**
    *   **1. Budget as Starting Point:**
        *   Corporate Finance finalizes site budgets (annual process).
        *   The finalized site budget is imported/used as the initial forecast for the year in the forecast templates.
        *   Prior year data is available for reference within the Excel forecast files but does not directly drive the initial forecast numbers (budget drives forecast).
    *   **2. Template Preparation & Distribution:**
        *   Corporate Finance (primarily Adam Suarez) rolls forward Excel forecast templates annually. This is an administratively burdensome task.
        *   RFMs/RFDs assist with writing custom formulas for unique billing rules/contractual terms that don't fit the universal template.
    *   **3. AM Data Input & Client Data Incorporation:**
        *   AMs input site-specific data (drive-in ratios, occupancy, rates, events, etc.) into their individual Excel forecast files.
        *   AMs incorporate data received from clients.
        *   AMs handle custom formulas for their site if unique billing terms apply (e.g., billable uniforms, claims caps, validations, contractual rate increases). This often requires re-entry monthly or if the template is rolled over.
    *   **4. Actualization (Data Imports into Forecast Files):**
        *   This is a "loosely defined automated" process involving macros run multiple times a day (4-5 times) to pull data from EDW into the Excel forecast files and then break the links.
        *   **Payroll by Day:** Pulled from Legion data residing in EDW.
        *   **Revenue by Day:** Pulled from the Revenue Spreadsheet Database (specifically `Revenue_DataMart_Daily` table in EDW). AMs are responsible for updating the revenue spreadsheets that feed this database.
        *   **Expenses (as posted):** Pulled from Great Plains via the Account Summary database in EDW.
    *   **5. AM/DM Review Cycle:**
        *   AMs and DMs continuously review and adjust site-level forecasts. This happens multiple times a week, not on a set cadence.
        *   This review can also involve Regional Finance Directors (RFDs).
    *   **6. Regional Finance (Field Finance) Review & Optimization:**
        *   RFDs use tools like the "Financial Review File" (aka "Suarez File") to analyze aggregated forecasts.
        *   They work with DMs to optimize the field forecast, informing field leaders of necessary adjustments rather than directly changing numbers in site files.
    *   **7. Corporate Finance Adjustments (Over-the-Top):**
        *   Corporate Finance takes the roll-up of all site-level forecasts.
        *   They make macro-level adjustments ("over the top") to this aggregate forecast to align with broader trends or known enterprise-level factors.
        *   These adjustments are often for:
            *   **Contingencies:** Hedging against potential shortfalls (e.g., if overall drive-in is trending lower than field forecasts suggest).
            *   **Overhead:** Forecasting for corporate G&A cost centers (A-cost centers), district/regional overhead (P-cost centers).
            *   **Topside Adjustments:** Catch-all for items like unallocated portions of health benefits, AP accruals for unreceived invoices, volume rebates not attributable to a single site.
            *   **New Business Placeholders:** Budgeted revenue/profit for anticipated new sales (from sales pipeline/Proforma) not yet assigned to a specific site. This placeholder is drawn down as new sites actualize.
            *   **Lost Business Placeholders:** Assumption for lost business during the year.
        *   These adjustments are often managed in separate Excel files maintained by Corporate Finance, not directly in the AM-level forecast files.
    *   **8. Reporting & Distribution Cadence:**
        *   **Financial Review File ("Suarez File"):** An Excel file that rolls up site-level inputs into a full P&L. Distributed ~3 times/week to DMs, VPs, COO, CFO. Used by RFDs for optimization discussions.
        *   **PowerPoint Presentations to Equity Group/Board:**
            *   **Monthly:** Primarily a review of the prior month's close, but includes 1-2 slides on full-year and next month/quarter projections.
            *   **Quarterly:** More detailed forecast review.
            *   These presentations incorporate the "over the top" manual adjustments made by Corporate Finance.
        *   **BI Reports (e.g., "Consolidated Forecast View" in Power BI):** Provide a "living and breathing" view of forecast data extracted from the forecast files into EDW. This is not necessarily on the same snapshot cadence as the "Suarez File."
    *   **9. Flash Process (Month-End Close):**
        *   Compares actuals (from invoiced sites via the new billing system) to the latest forecast (for uninvoiced sites).
        *   A flash report is published daily during close to the entire company (executives, DMs, VPs) showing progress towards finalized month-end results.
        *   The new billing system's forecast comparison feature is starting to fulfill some of this need.
    *   **10. Handling of Site Changes:**
        *   **Site Closures:** Forecast is zeroed out for days *after* the closure date. The month of closure remains active to capture any residual financial activity.
        *   **New Sites:** A new forecast template is created, and the initial forecast is set based on the Proforma data for that site.
    *   **11. Invoice Revisions Impact:**
        *   The AR team manually forecasts the financial impact of prior month invoice revisions into the current month's forecast. AMs are generally not close enough to these revisions to forecast them accurately.

*   **B. Current State Pain Points (From Operational Pain Points Forecasting - 20250106 & other meetings):**
    *   **1. Data Dependency & Latency:**
        *   **Heavy Reliance on Manual AM Updates:** Forecast accuracy is extremely dependent on AMs updating revenue spreadsheets (for revenue, occupancy, car counts) and the forecast files themselves. (David Arreola)
        *   **Delayed Updates:** If an AM is on PTO or delays input, forecast data becomes stale, hindering accurate reporting and decision-making. (David Arreola)
        *   **Inconsistent Updates Cause Swings:** Forecasts can show drastic up/down swings based solely on *when* an AM updates their file, not necessarily due to business changes. (David Arreola)
        *   **Latency in Data Reflection:** Time lag between AMs updating source data (e.g., revenue spreadsheet) and it being pulled into/reflecting in the main forecast file. (Peter Quinan)
        *   **Actuals Latency:** AMs may not see the impact of actual expenses hitting their GL until a significant swing in FLC is reported, requiring them to dig back. (David Arreola)
    *   **2. Lack of Customization & Relevance:**
        *   **Hotel-Centric Templates:** Current forecast files are primarily designed for hotels, with metrics like occupancy and drive-in ratio that are irrelevant or confusing for other segments like Healthcare. Requires extra explanation during onboarding. (Brennen Stepanek)
        *   **Too Much Irrelevant Data:** AMs in non-hospitality segments have to ignore many fields, making the tool cumbersome. (Jeremy Smith)
    *   **3. Manual Effort & Inefficiency:**
        *   **Manual Labor Hour Input for Revenue Calculation:** For per-labor-hour contracts, AMs manually input hours into the forecast file to calculate revenue, even if payroll actuals are pulled from Legion. (Brennen Stepanek)
        *   **Time-Consuming Variance Analysis:** DMs/RFDs spend significant time digging into details to understand reasons behind forecast variances due to a "lack of color" or explanation for outliers. (Jim Boyer)
        *   **Fragmented Data Sources for Analysis:** To build a credible forecast or analyze variances, users pull data from multiple sources: current Excel forecast files, Power BI reports, previous year's forecast files, etc. (Eddie Petrini)
        *   **Forecasting All Expense Lines:** AMs are often expected to forecast every expense line item, even those they don't directly control or have timely visibility into (e.g., timing of AP, fixed costs like insurance). (Jim Boyer, Brian Stone)
        *   **Manual Calculation of Complex Metrics:** AMs manually calculate or estimate blended wage rates, PTO seasonality, and drive-in percentages. (Brennen Stepanek, Joseph Jaussi)
        *   **Tedious Nature of Long-Range Forecasting:** The current tool makes forecasting for future months (beyond the immediate) very involved due to the daily/granular level of input required. (Eddie Petrini, Adam Suarez)
        *   **Custom Formula Maintenance:** Unique contractual terms require custom formulas in Excel files, which need to be manually re-entered or checked, especially when templates roll over. (Adam Suarez)
    *   **4. Limited Visibility, Modeling & Decision Support:**
        *   **No Immediate Impact Visibility:** AMs cannot easily see the real-time P&L impact of changes they make to forecast inputs. A "sandbox" or "reset button" feature is desired. (Eddie Petrini, Peter Quinan)
        *   **No Alerts for Actuals Impacting Forecast:** No system alerts notify AMs when actual GL expenses hit and differ from forecast, leading to surprises. (David Arreola)
        *   **Difficulty Understanding FLC Drivers:** For Management Agreements, it's hard to quickly see how much FLC comes from PTEB spread vs. profit share, making it difficult to know which levers to pull. (Brennen Stepanek)
        *   **Difficulty Segmenting Profitability:** Challenging to see profitability of self-park vs. valet to inform strategy. (Brennen Stepanek)
        *   **Calendar Issues (April-March Files):** Current forecast files run April-March, causing issues at calendar year-end/start when the new budget isn't fully loaded. (Brian Stone)
        *   **Short-Term Focus:** Current process and tools lead to a very short-term view (next 30 days), making it hard to manage quarterly or annual targets effectively if early months are missed. (Chris Moore, Chad Beamesderfer)
        *   **Lack of Predictive Assistance:** No AI or system-driven assistance to help AMs forecast (e.g., average rates, drive-in based on trends). (David Arreola)
        *   **Seasonality & Pacing Issues:** The file often treats every day in a month as equal, not accounting for seasonality or events like Easter falling late in a month, which can misrepresent pacing against budget. (Jim Boyer)
        *   **Dynamic Pricing Challenges:** Forecasting a single average rate per revenue stream for the entire month is difficult with dynamic pricing and negotiated group rates. (Ryan Esposito)
    *   **5. System & Process Issues:**
        *   **Excel Fragility:** Formulas in Excel can be easily broken or misinterpreted, leading to significant errors. (Peter Quinan)
        *   **Lack of Integration:** Limited direct integration with systems like Concur for expenses or deeper, predictive integration with Legion. (Ryan Esposito)
        *   **Client Data Timeliness/Integrity:** Forecasts can be impacted by delays or inaccuracies in data received from clients. (Eddie Petrini)
        *   **"Self-Fulfilling Prophecy" of Input Focus:** So much time is spent on getting inputs correct that there's little time left for analysis and actionable insights. (Matthew Longo)
    *   **6. Specific Pain Points Mentioned:**
        *   **Validations:** Difficult for AMs to forecast, especially with complex thresholds; a major source of invoice variances. Formulas in revenue spreadsheets might exist but are often not used correctly due to manual process. (Amy Sowells, Ryan Esposito)
        *   **Contractual Rate Increases:** Manually entered into month-specific tabs. (Adam Suarez)
        *   **PTO/Sick Leave/Retro Pay:** Not fully captured in Legion data feeds for forecasting, requiring manual AM forecasting or leading to missed payroll expenses. (Adam Suarez)
        *   **Blended Wage Rate Calculation:** AMs manually calculate by adding up pay rates and dividing. (Brennen Stepanek)
        *   **Health Screening Expenses & Ticket Revenue (for specific contracts like Baylor):** These are carve-outs that can be substantial and need to be forecasted, but their variability makes it hard to pinpoint if a revenue miss is due to these or core labor hours. (Brennen Stepanek)

*   **C. Current State Tools & Systems:**
    *   **Microsoft Excel:** The primary tool for forecast input and much of the analysis (forecast files, "Suarez File").
    *   **Microsoft SharePoint:** Used for storing and distributing forecast files.
    *   **EDW (Enterprise Data Warehouse):** Central repository for actuals (Legion, Revenue Spreadsheets via `Revenue_DataMart_Daily`, Account Summary from GP), budget data (`Budget_Data_Tab`, `Budget_Final`), and snapshots of forecast data.
    *   **Legion:** Source for payroll actuals and schedules. AMs also input vehicle forecasts into Legion for scheduling.
    *   **Revenue Spreadsheets:** AMs input daily revenue, occupancy, etc., here. This data feeds EDW.
    *   **Great Plains (GP):** Source for expense actuals (via Account Summary in EDW).
    *   **Power BI:** Used for reporting on forecast data stored in EDW (e.g., "Consolidated Forecast View").
    *   **PowerPoint:** Used for presentations to ELT/Equity Partners.
    *   **Macros (in Excel):** Used to pull data from EDW into forecast files.

*   **D. Key Current State Data Sources & Artifacts:**
    *   **Forecast Templates/Files (Excel):** Individual files per site/cost center. Contain tabs for inputs, P&L, stats, deal terms, prior year reference.
    *   **Master Non-Financial Table (EDW):**
        *   Defines all cost centers (numeric for sites, alphanumeric for overhead).
        *   Site `0000` to `8999` are typically field sites.
        *   `9000` series are often "plug" or corporate cost centers (e.g., contingencies).
        *   `P` cost centers: Field overhead (P4=District, P6=Region). P5 sunsetted.
        *   `A` cost centers: Corporate FSC-facing overhead (e.g., Finance).
        *   `B100`: Benefits clearing account (no forecast activity).
        *   `C100`: Unused.
        *   Contains `PNL_Category` column (e.g., Corporate G&A, Operations, Ops Overhead, Ops Topside, G&A Topside for bonus expense, SAS for e-commerce).
        *   Contains `Business_Segment` and `P_Contract_Type` columns, useful for tailoring views.
        *   `CountSite` column: Indicates if a cost center is a "real" operating location.
    *   **Revenue Spreadsheets (Excel, feeding EDW):** AMs input daily revenue drivers.
    *   **Legion Data (in EDW):** Payroll hours, status (approved).
    *   **Account Summary (from GP, in EDW):** Expense actuals by GL account.
    *   **Budget Data (`Budget_Data_Tab`, `Budget_Final` in EDW):** Finalized budget numbers.
    *   **Forecast Data (in EDW):** Snapshots of data extracted from Excel forecast files, stored with GL-level detail. `Forecast_Consolidated` is a key view.
    *   **Financial Review File ("Suarez File") (Excel):** Roll-up of site-level P&Ls from forecast files.
    *   **PowerPoint Forecast Presentations:** Summaries for leadership.
    *   **Proforma Data:** Used for initial setup of new site forecasts. Stored in Performa database.
    *   **Sales Pipeline Data (from Salesforce, manually translated):** Informs new business forecast placeholders.

---

**IV. Future State Vision & Requirements**

*   **A. Guiding Principles & Goals for Future System:**
    *   **Simplify Inputs:** Drastically reduce the number of inputs required from AMs. Focus on key site metrics and controllable expenses. (Discovery Forecasting Future State _2 - 20250120)
    *   **Automate Where Possible:** Leverage system integrations and logic to pre-populate data and calculate baseline forecasts. (Discovery Forecasting Future State _2 - 20250120)
    *   **User-Friendly Interface:** Intuitive, cloud-accessible, cross-device compatible. (Discovery Forecasting Future State _2 - 20250120)
    *   **Role-Based Views & Access:** Tailor the experience to the user's role and responsibilities. (Discovery Forecasting Future State _2 - 20250120)
    *   **Enable "Forecasting by Exception":** System provides a strong baseline; users adjust based on specific knowledge. (Chris Moore, Discovery Forecasting Future State _1 - 20250108)
    *   **Improve Speed to Answer:** Allow for quicker analysis and decision-making. (Brian LaChapelle, Discovery Forecasting Future State _1 - 20250108)
    *   **Flexibility & Scalability:** Architecture should align with the billing solution, allowing for future enhancements. (Discovery Forecasting Future State _2 - 20250120)
    *   **Focus on Actionable Outputs:** The system should help users identify issues and opportunities to drive performance. (Brian LaChapelle, Discovery Forecasting Future State _1 - 20250108)

*   **B. Core Functionality (Epics & Features - from Discovery Forecasting Future State _2 - 20250120):**
    *   **1. Epic: Core Forecasting Engine**
        *   **Feature: Forecast Roll-up:** System must roll up forecasts from site level through district, region, to enterprise level.
        *   **Feature: AM Forecast Input/Adjustment:** AMs must be able to input/tweak their site-level forecasts based on client input, local knowledge, and site-specific metrics.
        *   **Feature: Data Consistency Checks:** Implement automated checks to ensure data integrity within the forecast.
        *   **Feature: Centralized Forecast Repository (Single Source of Truth):** All forecast data to reside in a centralized, accessible database.
        *   **Feature: Automatic Forecast Initialization:**
            *   For existing sites: System automatically initializes forecasts based on approved budget data (from EDW).
            *   For new sites: System automatically initializes forecasts based on Proforma data.
        *   **Feature: Custom Billing Rule Incorporation:**
            *   Forecasting module must integrate with the new billing module to leverage defined contractual terms for revenue and billable expense calculations.
            *   **Critical Consideration:** A strategy is needed for "10 percenter" sites whose complex billing configurations are not yet fully modeled in the new billing system. The forecast system must support these sites. (Amy Sowells) This might involve pulling from Deal Term tables in EDW or prioritizing development in the billing system for these complex contracts.
    *   **2. Epic: Simplification & User Experience**
        *   **Feature: Simplified AM Inputs:**
            *   AMs primarily input key site-level metrics/statistics (e.g., drive-in, occupancy, rate by rev stream, daily volume for hospitality; relevant drivers for healthcare).
            *   AMs forecast a limited list of "big ticket," controllable expenses (e.g., uniforms, supplies, equipment).
            *   Recurring expenses (e.g., software licenses, permits, allocated costs like Workday) should be automated/pre-populated by the system (e.g., based on budget or fixed schedules).
            *   Other immaterial expenses could default to budget or use machine learning for prediction.
        *   **Feature: Intuitive Online User Interface:** Modern, web-based, easy-to-navigate interface.
        *   **Feature: Cloud Accessibility & Cross-Device Support:** Accessible from anywhere, on various devices including tablets/phones (especially for field users like AMs).
        *   **Feature: Role-Based Access Control (RBAC):**
            *   Granular permissions based on user role (AM, DM, RFD, SVP, Corporate Finance) and position in the organizational hierarchy.
            *   Users see data relevant to their scope (e.g., AM sees their site, DM sees their district's sites).
            *   Support for proxy access/temporary coverage (e.g., DM covering a vacant AM role, AM covering another AM on PTO). This should ideally be managed via Workday hierarchy updates where possible, with a mechanism for ad-hoc assignments if necessary.
        *   **Feature: Standardized Forecast Views:**
            *   **P&L View:** A standard P&L statement view of the forecast, filterable by the user's scope.
            *   **Statistics View:** A view of key operational statistics and drivers, filterable by user's scope.
            *   (These are the primary in-app "reports"; detailed analysis via Power BI).
    *   **3. Epic: Intelligent Automation & Advanced Analytics**
        *   **Feature: Baseline/Prescriptive Forecasting (Statistical Forecasting):**
            *   System generates a baseline forecast for key drivers (e.g., vehicle volume, drive-in for hospitality) based on historical data, trends, seasonality, and budget.
            *   AMs then refine this baseline with their local knowledge ("forecast by exception").
        *   **Feature: Recommended Forecast Adjustments (DM Level & Above):**
            *   System may suggest optional forecast adjustments at DM/Region/Corporate levels based on aggregated trends or identified risks/opportunities.
            *   Consideration for incorporating external data (e.g., weather APIs, major local event calendars) if the development lift is justifiable; otherwise, rely on local user knowledge.
        *   **Feature: Automated Manual Task Reduction:** Identify and automate current manual data manipulation or calculation tasks.
        *   **Feature: Near Real-Time Data Reflection:** Actuals and forecast changes should be reflected in the system promptly.
    *   **4. Epic: Integrations**
        *   **Feature: EDW Integration:** Bidirectional flow where appropriate. EDW as a source for actuals, budget, proforma, master data. EDW as a destination for finalized forecast data for enterprise reporting. (Output schema must be consistent with current EDW forecast tables like `Forecast_Consolidated` to avoid breaking downstream dependencies).
        *   **Feature: Power BI Integration:** Forecast data must be easily consumable by Power BI for advanced reporting and dashboards.
        *   **Feature: Legion Integration (Labor Forecasting):**
            *   **Critical Vision:** The new forecasting system forecasts revenue/volume drivers. These drivers are fed to Legion. Legion generates optimal labor schedules/costs based on these drivers and its own logic. Legion's labor forecast then feeds back into the new forecasting system to complete the P&L.
            *   This aims to create single systems of record: new app for revenue forecast, Legion for labor forecast/schedule.
            *   Technical feasibility of Legion accepting external drivers and exporting its labor forecast needs confirmation. Current integration is via EDW. Future Snowflake integration for Legion data is a possibility.
        *   **Feature: Billing System Integration:** Leverage contractual terms from the new billing system for accurate revenue and billable expense forecasting.
        *   **Feature: Proforma System Integration:** Pull new site proforma data for initial forecast setup.
        *   **(No Direct Integration Planned):** Great Plains (GP) for forecast output, Salesforce for pipeline data (Proforma system preferred).
    *   **5. Epic: In-App Reporting & Exception Handling**
        *   **Feature: Limited In-Application Reporting:** Primary views are P&L and Statistics. Detailed, ad-hoc reporting via Power BI.
        *   **Feature: Exception Reporting & Alerts:**
            *   Flag significant deviations of forecast vs. **budget** (not prior year).
            *   Metrics to monitor: productivity, rates, revenue, FLC, other expenses as % of revenue, FLC growth. (Metrics from Ryan Esposito's 2025 Forecast presentation).
            *   Thresholds for flagging to be configurable, potentially varying by location/deal type.
            *   Mechanism to acknowledge/override flags if a deviation is due to a known, approved change (e.g., contractual amendment affecting revenue share).
    *   **6. Epic: Modeling & Scenario Planning ("What-If")**
        *   **Feature: Sandbox Environment (DM Level & Above):**
            *   Allow DMs, RFDs, Corporate Finance to model "what-if" scenarios by adjusting key assumptions (e.g., 1% change in drive-in across a district, impact of a rate increase, enterprise-level cost structure changes like insurance).
            *   These scenarios should not alter the official "forecast of record" but allow users to see potential impacts and plan strategies.
            *   Helps understand the magnitude of issues or opportunities.
    *   **7. Epic: Above Unit & Top-Side Forecasting**
        *   **Feature: Dedicated Input for Corporate/FP&A:**
            *   Mechanism for Corporate Finance/FP&A to forecast for:
                *   Overhead cost centers (P&A cost centers): Based on headcount, salaries, known large expenses.
                *   Top-Side Adjustments: For items like volume rebates, unallocated enterprise costs.
                *   New Business Placeholders: Input for budgeted new business revenue/profit (informed by sales pipeline/Proforma). System should allow tracking drawdown of this placeholder as new sites actualize.
                *   Lost Business Placeholders: Input for budgeted impact of anticipated lost business.
            *   These inputs are typically P&L line items, without complex billing terms or operational statistics.
    *   **8. Epic: Training & Change Management**
        *   **Feature: Training Materials & Sessions:**
            *   Town Park's internal team (Jeremy Smith, Anna) to lead deployment and create comprehensive training materials (videos, in-person sessions, "one best way" guides).
            *   Allata to provide support, potentially quick reference guides and options for different levels of training involvement.
            *   Training needs to be immersive due to the daily impact on AM/DM roles.
        *   **Feature: Power User Group/COE Support:** Leverage internal champions/SMEs for broader organizational training and support.
    *   **9. Epic: Governance & Process Standardization**
        *   **Feature: Forecast Approval Workflow:**
            *   Formalize the approval process: AM submits -> DM reviews/approves -> Regional leadership (RFD/SVP) reviews/blesses/signs off on "forecast of record."
        *   **Feature: Forecast Versioning & Locking:**
            *   "Forecast of Record": A snapshot of the forecast taken at a defined point (e.g., last Friday of the month for the next 1-3 months) stored in EDW for performance measurement.
            *   Live Forecast: AMs/DMs can continue to edit their working forecast throughout the month.
            *   Month-End Lock: Once a month closes and actuals are finalized, that month's forecast data in the system is effectively locked/superseded by actuals.
            *   Audit Trail: Track who made changes and when.
        *   **Feature: Standardized Reporting Cadence (for system outputs):** Align with defined reporting needs (e.g., data for daily flash, weekly reviews, monthly forecast of record).
        *   **Feature: Client Communication Policy (System Implication):** No planned systematic communication of detailed forecasts *to* clients *from* the system. AMs may share high-level estimated internal revenue ad-hoc.

*   **C. Specific Future State Considerations & Desired Outcomes:**
    *   **Client Profit Visibility (Management Agreements):** Make client profit (not just Towne Park FLC) a more prominent, front-and-center metric in the forecast for management agreements. Allow for earlier identification of client-side financial issues. (Matthew Longo)
    *   **Labor Forecasting (Legion Integration):**
        *   The new system should forecast revenue drivers (occupancy, volume, rate).
        *   These drivers should ideally feed Legion.
        *   Legion should use these drivers and its scheduling logic to generate a labor hour/cost forecast.
        *   This labor forecast from Legion should feed back into the new forecasting system to complete the P&L.
        *   This creates a single source of truth for revenue forecast (new system) and labor forecast (Legion).
    *   **Handling "10 Percenter" Sites:** The forecasting solution must accommodate all sites, including those with complex contracts not yet fully modeled in the new billing system. This might mean:
        *   Prioritizing development in the billing system for these contracts.
        *   Using data from EDW Deal Term tables as an interim source for contractual rules.
        *   Developing simplified or hybrid forecasting methods for these sites if full contractual modeling is delayed.
    *   **Expense Forecasting Simplification:**
        *   AMs focus on a few key controllable expenses.
        *   Recurring expenses (licenses, permits, allocations) are system-generated/pre-populated from budget or fixed schedules.
        *   Other non-controllable/immaterial expenses default to budget or use ML.
    *   **Rolling Forecast Horizon:** System should support a rolling forecast (e.g., 18-24 months) to avoid current April-March file limitations and provide better long-term visibility.
    *   **Dynamic Pricing & Group Rates:** Future system should ideally allow for more granular rate forecasting than a single monthly average per revenue stream, to better reflect dynamic pricing and negotiated group rates, especially for hospitality. This could involve breaking down business into transient vs. group.
    *   **Component Growth (COG) Analysis:** Visibility into drivers of growth (base, new business, prior year lost business) within the forecast.
    *   **Portfolio Management for DMs/RFDs:** Tools to help DMs/RFDs manage their entire portfolio, not just individual sites in isolation. Sandbox modeling supports this.
    *   **Balancing Accuracy vs. Speed:** Willingness to accept slightly less pinpoint accuracy if it means significant improvements in speed, ease of use, and ability to take timely action. (Brian LaChapelle)

*   **D. Non-Functional Requirements (Implied or Stated):**
    *   **Performance:** System must be responsive, especially with data loading and calculations for "what-if" scenarios. Near real-time updates are desired.
    *   **Scalability:** Must handle all Towne Park sites and user load. Architecture should allow for growth.
    *   **Usability:** Intuitive, easy to learn and use, especially for field users. Minimize clicks and complexity.
    *   **Reliability:** Data must be accurate and consistently available.
    *   **Maintainability:** System should be maintainable and adaptable to future business changes.
    *   **Security:** Robust role-based access control. Data secured appropriately.
    *   **Auditability:** Ability to track changes to forecast data.

---

**V. Specific Complexities & Key Decision Points**

*   **A. "10 Percenter" Sites:**
    *   How to accurately forecast for sites with complex contracts not yet fully modeled in the new billing system.
    *   Dependency on billing system development or alternative data sources (e.g., EDW Deal Term tables).
    *   Amy Sowells estimated 50-75 sites might fall into this category initially.
    *   Worst-case: hybrid average revenue per hour worked + billable/non-billable expenses, not matching deal terms exactly but getting close. (Adam Suarez)

*   **B. Legion Integration for Labor Forecasting:**
    *   Confirming technical feasibility of Legion accepting external revenue/volume drivers and exporting a detailed labor forecast.
    *   Defining the data contract between the new forecasting system and Legion.
    *   Handling scenarios where Legion's generated schedule deviates from standards (AM overrides).

*   **C. Level of Granularity for AM Inputs:**
    *   Finalizing the exact list of metrics AMs will input vs. what the system will pre-populate or derive.
    *   Defining the specific "big ticket" controllable expenses AMs will forecast.

*   **D. Machine Learning Application:**
    *   Defining specific use cases for ML (e.g., forecasting immaterial expenses, suggesting adjustments at DM+ levels based on trends).
    *   Determining data requirements and model development effort.

*   **E. Transient vs. Group Business Segmentation (Hospitality):**
    *   Confirming data availability from clients to support this level of detail.
    *   Assessing the value vs. effort of implementing this segmentation. Historically, this data hasn't been captured systematically for forecasting. (Jim Boyer)

*   **F. Exception Reporting Thresholds:**
    *   Defining how thresholds for flagging exceptions (forecast vs. budget) will be determined and managed (e.g., fixed percentages, dynamic, configurable by site/deal type).

*   **G. Change Management Strategy:**
    *   This is a significant change for AMs/DMs. A comprehensive change management and training plan, led by Towne Park's internal team with Allata support, will be crucial for adoption.

---

**VI. Open Questions & Areas for Further Discovery (From Allata's perspective after Future State _2 meeting)**

*   Exact list of simplified inputs for AMs (site metrics, specific expenses).
*   Detailed logic for reporting and exception handling (thresholds, review process).
*   Precise workflow for forecast approval at different levels.
*   Definitive strategy for handling "10 percenter" sites (contract terms not in the new billing app) for forecasting.
*   Specifics of machine learning application for DM-level overlays and other predictive elements.
*   Detailed requirements for "what-if" scenario planning tools (inputs, outputs, user interaction).
*   How Proforma data specifically impacts top-side/roll-up forecasts and new business placeholder management.
*   Further details on the desired P&L and Statistics views for each user role.
*   Clarification on how "above unit" (top-side, new/lost business) forecast inputs will be managed in the new system interface.
*   Detailed requirements for proxy access management.

---
