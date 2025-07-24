# Towne Park Financial Systems Sprint Demo Documentation (Master)

**Last Updated:** 5/13/2025, 11:09:39 PM (AI Generation Time)
**Content As Of:** April 25, 2025 (based on latest transcript)
**Source Documents:**
*   Forecasting Sprint Demo - 20250313_155711-Meeting Recording (Sprint 20 Demo)
*   Forecasting Sprint Demo - 20250328_163415-Meeting Recording (Sprint 21 Demo)
*   Forecasting Sprint Demo - 20250410_165037-Meeting Recording (Sprint 22 Demo)
*   Forecasting Sprint Demo - 20250425_173826-Meeting Recording (Sprint 23 Demo)

## 1. System Overview
*   **Purpose:** Development of new financial systems for Towne Park, encompassing forecasting and billing functionalities.
*   **Modules Discussed:** Forecasting, Billing.
*   **Project Goal (for this documentation):** To create a detailed data product that will empower AI-assisted conversation and text and/or code generation, covering all aspects of the financial systems.

## 2. Modules

### 2.1. Forecasting Module

#### 2.1.1. Business Requirements & Goals
*   **Primary Goal:** Provide Account Managers (AMs) with a simplified, approachable, and structured user interface for inputting site statistics, payroll, rates, and other revenue for forecasting. (Jonathan Aulson, Sprint 21 Demo, 1:20-1:48; Sprint 23 Demo, 2:30)
*   **Process Improvement:** Move beyond digitizing legacy Excel processes to a tool that genuinely improves forecasting results and efficiency. (Jim Boyer, Sprint 21 Demo, 9:19-10:27)
*   **User Data Visibility:** Account Managers must only see and interact with data (customers, sites, statements) for which they are responsible. (Jonathan Aulson, Sprint 20 Demo, 2:20, 16:15) - *Implemented in Sprint 20 via Workday-driven role assignments.*
*   **Forecasting Granularity & Horizon:**
    *   The system supports daily forecast input as the most granular level. (Jonathan Aulson, Sprint 21 Demo, 2:48-3:15)
    *   AMs can view up to one year of historical forecast data (read-only). (Jonathan Aulson, Sprint 21 Demo, 2:48; Sprint 23 Demo, 4:30)
    *   AMs can input forecasts up to one year forward on a rolling basis. (Jonathan Aulson, Sprint 21 Demo, 2:48; Sprint 23 Demo, 10:20 for Other Revenue)
    *   **Time Period Granularity Control:** Users will be able to "zoom in/out" of data views (Daily, Weekly, Monthly, Quarterly). (Jonathan Aulson, Sprint 23 Demo, 5:00 - *Implementation planned for Sprint 24*; Sprint 22 Demo, 18:00-19:30)
    *   **Input Detail Levels (Discussion & Emerging Consensus):**
        *   **Parking Statistics:**
            *   **Current/Next Month (e.g., up to 90 days):** Daily granularity input by AMs is expected. (Jim Boyer, Sprint 21 Demo, 16:50)
            *   **Outer Months (e.g., >60-90 days):** Daily input by AMs is considered impractical and potentially inaccurate. (Jim Boyer, Sprint 21 Demo, 10:27, 16:50; Ryan Esposito, Sprint 21 Demo, 16:03)
                *   Suggestion: Transition to weekly or monthly input for these periods. (Ryan Esposito, Sprint 21 Demo, 20:13: Daily for 60-90 days, then weekly for next 30, then monthly).
                *   The forecasting model (Mike Foy's work) would then disaggregate these higher-level inputs into daily figures using historical patterns, seasonality, and event data. (Jim Boyer, Sprint 21 Demo, 17:30-18:30; Michael Foy, Sprint 21 Demo, 18:47-19:04)
            *   **Decision (Sprint 22 Demo, 21:00-22:00):** For Parking Statistics, input will *only* be allowed at the daily level to maintain data integrity and avoid accidental overwrites of detailed data if editing at a higher granularity (e.g., quarterly). Users can view aggregated data at weekly, monthly, quarterly levels.
            *   **Further Discussion (Sprint 22 Demo, 22:00-24:30):** Possibility of unlocking weekly input for stats was raised (Amy Sowells). Ryan Esposito suggested dynamic input levels (daily up to 90 days, then weekly). Chris Moore questioned the accuracy gain of daily vs. weekly for all 365 days.
            *   **Intelligent Spreading (Sprint 22 Demo, 24:55-26:40):** If weekly input were allowed, discussion on whether the system could intelligently spread the weekly total across days based on historical patterns/seasonality, rather than equal distribution. Jonathan Aulson noted this is risky and complex, potentially a Version 2 feature.
        *   **Payroll:** Input likely by week for most job categories. Daily input is also possible. (Jonathan Aulson, Sprint 23 Demo, 19:15, 19:47)
        *   **Other Internal Revenue:** Input at the monthly level only. (Jonathan Aulson, Sprint 23 Demo, 10:00)
        *   **Rates:** Currently supports monthly input. Discussion ongoing about AMs' role in forecasting rates. (Jonathan Aulson, Sprint 22 Demo, 30:30-35:00)
*   **Integration with Forecasting Model (Mike Foy):**
    *   The UI will serve as the input mechanism for "boots on the ground" intelligence from AMs. (Jim Boyer, Sprint 21 Demo, 12:27; Michael Foy, Sprint 21 Demo, 15:12)
    *   For outer months, the model will prepopulate forecasts, which AMs can then adjust for known events or specific insights. (Michael Foy, Sprint 21 Demo, 11:33-11:50)
    *   Pre-population of data should be "smart," using model predictions and appropriately weighted for weekdays, weekends, holidays, etc. (Jim Boyer, Sprint 21 Demo, 18:30)
    *   Mike Foy's FP&A projection might be a comparison dataset in the UI. (Jonathan Aulson, Sprint 22 Demo, 29:40)
*   **Alignment with Budgeting:** The forecasting tool and its processes should be designed with future budgeting needs in mind, viewing budget as an "extended forecast." (Jim Boyer, Sprint 21 Demo, 19:19-20:00)
*   **Time Savings for AMs:** A key goal is to save AMs time compared to current processes. (Jim Boyer, Sprint 21 Demo, 26:07)
*   **Accuracy and Variance Analysis:** Enable AMs to test their own forecasts for accuracy by comparing against budget, prior year, or other datasets, and by viewing data at different granularity levels. (Jonathan Aulson, Sprint 22 Demo, 17:00-17:40)
*   **User Guidance:** Provide in-app guidance to help AMs understand how to use features and think about their forecasting. (Jonathan Aulson, Sprint 23 Demo, 6:30)

#### 2.1.2. Functional Specifications

##### 2.1.2.1. Main Forecasting Interface Layout (Introduced Sprint 23 Demo)
*   **Tab-Based Workflow:** A series of tabs along the top guides the user through the forecast creation process (e.g., Parking Stats, Rates, Payroll, Other Revenue, P&L). (Jonathan Aulson, Sprint 23 Demo, 4:00)
*   **Left Sidebar Widgets:**
    *   **Site Selection:**
        *   Dropdown list for AMs to select a site for forecast input. (Jonathan Aulson, Sprint 21 Demo, 2:25; Sprint 23 Demo, 4:15)
        *   The list displays only sites for which the logged-in AM is responsible (unless user has broader roles like Billing Admin). (Jonathan Aulson, Sprint 21 Demo, 2:30; Sprint 23 Demo, 3:45)
        *   Displays selected site name and basic site data. (Jonathan Aulson, Sprint 23 Demo, 4:20)
    *   **View Options:**
        *   **Year Selection:** Controls the year for historical view or current/future forecasting. (Jonathan Aulson, Sprint 23 Demo, 4:30)
        *   **Starting Month Selection:** Determines the initial month displayed in the views. Tabs key off this starting month. (Jonathan Aulson, Sprint 23 Demo, 4:50)
        *   **Time Period Granularity:** Dropdown to select data aggregation view (Daily, Weekly, Monthly, Quarterly). (Jonathan Aulson, Sprint 23 Demo, 5:00) - *Actual zoom functionality planned for Sprint 24.*
        *   **Comparison Data Set:** Dropdown to select the dataset for comparison against the forecast (e.g., Budget, Prior Year, FP&A Projection). Defaults to Budget. (Jonathan Aulson, Sprint 23 Demo, 5:25; Sprint 22 Demo, 29:20)
    *   **Collapsible Widgets:** The Site Selection and View Options widgets can be collapsed to save screen real estate while still showing a summary of selections. (Jonathan Aulson, Sprint 23 Demo, 5:50)
*   **"Show Guide" Buttons:**
    *   Available on various tabs/pages (e.g., Parking Stats, Rates). (Jonathan Aulson, Sprint 22 Demo, 8:00; Sprint 23 Demo, 6:30)
    *   Provides context-specific help ("who, what, where, when") for AMs. (Jonathan Aulson, Sprint 23 Demo, 6:40)
    *   Content is placeholder text; to be developed with Change Management/Jeremy Smith's team. (Jonathan Aulson, Sprint 23 Demo, 6:50, 7:58; Sprint 22 Demo, 12:00)
    *   Initially expanded for new users; once hidden by the user, the state is saved (sticky). (Jonathan Aulson, Sprint 23 Demo, 7:00; Sprint 22 Demo, 8:30)

##### 2.1.2.2. Parking Statistics Tab
*   **Data Display:**
    *   Displays a row for each day of the selected month (in daily view). (Jonathan Aulson, Sprint 21 Demo, 4:05)
    *   Columns for various parking statistics (e.g., Occupancy, Drive-In, Capture, Self Aggregator, Valet Aggregator, Total Rooms, Total Available Spaces, Self Overnight, Valet Overnight). (Sprint 21 Demo, Sprint 22 Demo)
    *   **Budget Data Integration:**
        *   Actual budget data from EDW (Budget Final table) is pulled in and spread across the days of the month. (Jonathan Aulson, Sprint 23 Demo, 8:15 - *Completed in Sprint 23*)
        *   Initially, budget data was equally spread. (Jonathan Aulson, Sprint 23 Demo, 8:40)
        *   Future: Model will provide smarter pre-population. (Jim Boyer, Sprint 21 Demo, 18:30)
    *   **Actual Data Display:**
        *   Actual data for site statistics is displayed alongside forecast data for past periods. (Jonathan Aulson, Sprint 22 Demo, 2:00)
        *   Orange color used to simulate/display actuals, Blue for forecast. (Jonathan Aulson, Sprint 22 Demo, 3:00)
        *   **Status (Sprint 23 Demo):** Actuals display (orange numbers below the line) is considered not ideal and will be revised (e.g., hover-over for variance). (Jonathan Aulson, Sprint 23 Demo, 9:15-9:45)
        *   **Status (Sprint 22 Demo):** System uses mock actual data; connection to real EDW actuals is a next step. (Jonathan Aulson, Sprint 22 Demo, 2:20)
*   **Forecast Input:**
    *   AMs can edit forecastable fields for current/future dates. (Jonathan Aulson, Sprint 23 Demo, 8:50)
    *   Past forecast periods are read-only. (Jonathan Aulson, Sprint 21 Demo, 3:05; Sprint 22 Demo, 3:25)
    *   **Input Type (Occupancy):**
        *   Choice between "Occupancy Percentage" and "Occupied Rooms" input. (Jonathan Aulson, Sprint 21 Demo, 3:20)
        *   Selection dictates which corresponding field in the statistics table becomes editable. (Jonathan Aulson, Sprint 21 Demo, 3:40-4:00)
        *   Operations feedback indicates "Percentage" is generally preferred. (Jonathan Aulson, Sprint 21 Demo, 3:20-3:40)
*   **Calculated Fields:** The system automatically calculates related metrics (e.g., if occupancy % is entered, occupied rooms are calculated) based on "total available spaces" and "total rooms" data stored in the customer section. (Jonathan Aulson, Sprint 21 Demo, 4:50-5:10)
*   **"Show Budget" / "Show Comparison" Button:**
    *   Allows toggling the display of the selected comparison dataset (e.g., budget) underneath the forecast inputs. (Jonathan Aulson, Sprint 21 Demo, 4:20; Sprint 22 Demo, 3:40, 10:28, 30:00)
*   **Revenue Calculation:**
    *   **Status (Sprint 21 Demo):** Rate card implementation is pending (planned for next sprint after Sprint 21), so revenue calculations are not yet active.
*   **Columns Added (Sprint 22):** `Self Aggregator` and `Valet Aggregator` added to the table. (Jonathan Aulson, Sprint 22 Demo, 7:27)

##### 2.1.2.3. Rates Tab
*   **Data Display:**
    *   Layout similar to existing forecasting Excel file. (Jonathan Aulson, Sprint 22 Demo, 9:10)
    *   Displays 12 months of rate data at a time. (Jonathan Aulson, Sprint 22 Demo, 9:15)
    *   User selects site and year to view/edit rates. (Jonathan Aulson, Sprint 22 Demo, 9:25)
    *   **Budget Data:** Budget data for rates is pulled in. (Jonathan Aulson, Sprint 22 Demo, 10:08 - *Backend data flow completed in Sprint 23 for rates page*)
    *   **Actual Data:** Mock actual data can be displayed (orange highlight). Source of actual rate data (Invoice, EDW) is TBD. (Jonathan Aulson, Sprint 22 Demo, 9:45, 11:15)
*   **Forecast Input:**
    *   AMs can edit rates for current/future months. Past months are read-only. (Jonathan Aulson, Sprint 22 Demo, 9:35)
    *   If a rate is changed, the table reflects the forecast. (Jonathan Aulson, Sprint 22 Demo, 10:13)
*   **"Show Budget" / "Show Comparison" Button:** Available. (Jonathan Aulson, Sprint 22 Demo, 10:28)
*   **Time Granularity:** The time period granularity zoom (Daily, Weekly, etc.) will also apply to this page, though its utility for rates is questioned. (Jonathan Aulson, Sprint 23 Demo, 16:00; Sprint 22 Demo, 30:30)
*   **Discussion on AM Control over Rates (Sprint 22 Demo, 30:30-35:00):**
    *   Question raised whether AMs should forecast rates or if it should be system-driven.
    *   Ryan Esposito: AMs do it currently, but actuals from invoice file might be better. Changes mainly due to rate increases. Dynamic pricing is a future consideration. Prefers using historical data.
    *   Chris Moore: Agrees. Current revenue forecasts are often inaccurate due to posted rates vs. actual netted rates (discounts, comps).
    *   Amy Sowells: AMs likely enter standard rates, not considering discounts. Budget might be a better source than AM input.
    *   Consensus: Opportunity to simplify rate forecasting, potentially making it less reliant on AM input and more on actuals/budget, similar to payroll rates.

##### 2.1.2.4. Payroll Tab (Introduced Sprint 23 Demo)
*   **Interface Layout:**
    *   Displays data by day initially (pending time granularity implementation). (Jonathan Aulson, Sprint 23 Demo, 16:45)
    *   **Left Side (Legion Data):** Shows Scheduled and Actual hours from Legion, broken down by job family. (Jonathan Aulson, Sprint 23 Demo, 17:00)
    *   **Right Side (Budget & Forecast):**
        *   Visual representation: Red line indicates budget for a job family; Green bar shows forecasted hours/cost. (Jonathan Aulson, Sprint 23 Demo, 17:20)
        *   Overall bar for the day also fills up. (Jonathan Aulson, Sprint 23 Demo, 18:50)
*   **Forecast Input:**
    *   For future dates, AMs can click into a job family to input forecast. (Jonathan Aulson, Sprint 23 Demo, 18:00)
    *   Input can be by hours or by cost. (Jonathan Aulson, Sprint 23 Demo, 18:30)
    *   A percentage slider can be used for adjustments. (Jonathan Aulson, Sprint 23 Demo, 18:30)
    *   Saving updates the visual green bar. (Jonathan Aulson, Sprint 23 Demo, 18:40)
*   **Data Integration Status (Sprint 23 Demo):**
    *   Connection to budget tables for the red line (budget) is pending. (Jonathan Aulson, Sprint 23 Demo, 17:20)
    *   Initially, green (forecast) will align with red (budget), then AMs adjust. (Jonathan Aulson, Sprint 23 Demo, 17:40)
*   **Time Granularity:** Expected to be most useful at weekly level for input, but daily is possible. (Jonathan Aulson, Sprint 23 Demo, 19:15, 19:47)
*   **Payroll Rates:** Discussion that payroll rates should be established in EDW as a source of truth, not forecasted by AMs in this tool. (Jonathan Aulson, Sprint 22 Demo, 35:18)
*   **Variance Dashboard for Payroll (Sprint 22 Demo, 36:20):** Initial thought for a payroll-specific variance dashboard, now evolving into a more generic variance analysis capability, potentially its own tab.

##### 2.1.2.5. Other Internal Revenue Tab (Introduced Sprint 23 Demo)
*   **Input Granularity:** Locked to monthly view only. (Jonathan Aulson, Sprint 23 Demo, 10:00, 37:15)
*   **Data Display:** Shows 12 months forward for forecast input. (Jonathan Aulson, Sprint 23 Demo, 10:20, 37:20)
*   **Input Fields:** Categories like "GPO Fees," "Billable Expenses," "Non-Billable Expenses," "Credits." (Jonathan Aulson, Sprint 23 Demo, Screenshot/UI)
*   **"Show Comparison" Button:** Shows budget data underneath. (Jonathan Aulson, Sprint 23 Demo, 10:30)
*   **Handling of Revenue Types (Discussion Sprint 23 Demo, 11:11-15:30):**
    *   Tia Gonia: Questioned if daily/weekly input needed for items like "room drop revenue" (porterage).
    *   Adam Suarez: Suggested renaming a column to "Credits/Other Revenue" and using the "Show Guide" for examples. Credits are less frequent than some other revenues (e.g., Bell revenue at ~12 sites).
    *   Ryan Esposito: Monthly input should suffice; add to it as items occur.
    *   **Clarification:** All items on this page hit a revenue GL account. "GPO Fees" are a reduction/deduction of revenue. (Adam Suarez, Sprint 23 Demo, 13:44)
    *   **Positive/Negative Input:** For a combined field like "Credits/Other Revenue," credits would be entered as negative, other revenue as positive. The system cares about the net monthly total. (Adam Suarez, Jonathan Aulson, Sprint 23 Demo, 15:04)
    *   **Decision:** Monthly input is acceptable for MVP; can iterate to daily in Phase 2 if needed for specific sites. (Adam Suarez, Sprint 23 Demo, 15:29)

##### 2.1.2.6. P&L (Profit & Loss) View (Preview for Sprint 24 - Sprint 23 Demo, 23:20)
*   **Default View:** P&L trend.
*   **Variance Display:** Click to show variance from trend compared to budget.
    *   Conditional formatting for variance: >7.5% variance in bold red/black (positive/negative); <7.5% in less bold font.
*   **"Show Budget" Button:** Standard functionality.
*   **Filters Control (Portable Component):**
    *   To be implemented on P&L view first, then other views (Stats, etc.).
    *   **Organization Filter:**
        *   Select by District Manager, Regional Manager (or other hierarchy levels as data becomes available from Workday).
        *   Multi-select uses "OR" logic (e.g., selecting Orlando district + Miami district shows sites from both).
    *   **Customer Filters:**
        *   Narrow down results using "AND" logic (e.g., filter by labor type, base contract).
    *   **Account Manager / District Manager Filter:**
        *   Search and select specific AMs/DMs to see only their responsible sites.
    *   **Workday Data Dependency:** Current hierarchy visibility limited to AM/DM levels based on Workday data. Future discussions needed for higher levels. (Jonathan Aulson, Sprint 23 Demo, 26:20)

##### 2.1.2.7. General Forecasting Functionality
*   **Data Persistence & Saving:**
    *   Changes are retained on the page during an input session. (Jonathan Aulson, Sprint 21 Demo, 5:30)
    *   Users **must** explicitly save forecast numbers before navigating away; otherwise, changes are lost. (Jonathan Aulson, Sprint 21 Demo, 5:30-5:45)
    *   A warning prompt appears if navigating away from a site/period with unsaved changes. (Jonathan Aulson, Sprint 21 Demo, 5:45-6:00)
*   **Session Management & Data Integrity (Offline Scenario):**
    *   Entered numbers are stored in the user's session. (Jonathan Aulson, Sprint 21 Demo, 8:09)
    *   If internet connectivity is briefly lost and then re-established, data in the form can still be successfully saved to the database upon clicking "Save." (Jonathan Aulson & Javier Casas, Sprint 21 Demo, 8:09-8:30)
*   **Account Manager Access to Statements (Billing System):**
    *   AMs can access/view past statements for their assigned customers. (Jonathan Aulson, Sprint 20 Demo, 16:40)
    *   The statements list is filtered to show only statements relevant to the AM's sites. (Jonathan Aulson, Sprint 20 Demo, 16:50)
    *   Available actions for AMs on statements: "View" and "Download PDF." (Jonathan Aulson, Sprint 20 Demo, 16:55, 17:06)
*   **UAT (User Acceptance Testing):**
    *   Forecasting features will undergo UAT. (Amy Sowells, Jonathan Aulson, Sprint 21 Demo, 8:36-8:40)
    *   Recommendation to conduct UAT for the main forecasting input page after the next sprint (after Sprint 21) to include budget data integration for full functionality testing. (Jonathan Aulson, Sprint 21 Demo, 8:52)
    *   **UAT Planning (Sprint 22 & 23 Demos):**
        *   Targeting week of May 7th-12th (then updated to May 12th) for first milestone of functional forecasting UAT. (Jonathan Aulson, Sprint 23 Demo, 21:30; Sprint 22 Demo, 39:00)
        *   Participants:
            *   Core testing/issue documentation: Adam Suarez, Amy Sowells, Jonathan Aulson. (Amy Sowells, Sprint 22 Demo, 41:54)
            *   Broader group for feedback/play: RFDs, select DMs, Jim Boyer. (Amy Sowells, Sprint 22 Demo, 39:45, 42:39)
            *   Select group of Account Managers to provide feedback on interface and usability. (Adam Suarez, Sprint 22 Demo, 42:50)
        *   Approach: Kickoff with core team, then an intro session for the broader group, allowing them to explore independently. (Jonathan Aulson, Amy Sowells, Sprint 22 Demo, 42:12-42:36)
        *   Training for UAT participants: Core team (Jonathan, Amy, Adam) can handle initial training for the select users. (Amy Sowells, Sprint 22 Demo, 44:28)

#### 2.1.3. User Interface (UI) & User Experience (UX)
*   **Save Confirmation Dialog:**
    *   **Current Behavior (Sprint 21 Demo):** Dialog warns about unsaved changes with "Continue" (discards changes) and "Cancel" options. (Jonathan Aulson, Sprint 21 Demo, 6:40-6:53)
    *   **Suggested Improvement (Adam Suarez, Sprint 21 Demo, 6:59):** Change "Continue" button to "Save" or add an explicit "Save" button to the dialog to prevent accidental data loss. "Cancel" would dismiss.
    *   **Decision:** Idea well-received; development team to investigate effort. (Jonathan Aulson, Sprint 21 Demo, 7:09)
*   **Data Formatting:**
    *   **Percentages:** Display ratios (e.g., occupancy, drive-in, capture) as percentages (e.g., "80%") rather than decimals (e.g., "0.80"). (Ryan Esposito, Sprint 21 Demo, 7:37; Adam Suarez, Sprint 22 Demo, 4:34)
        *   **Decision:** Agreed; to be implemented. (Jonathan Aulson, Sprint 21 Demo, 7:52; Sprint 22 Demo, 4:44)
*   **Highlighting Changed/Editable Fields:**
    *   **Forecast Input Prototype Discussion (Sprint 20 Demo):**
        *   Initial Idea: Color-code changes (green for above budget, red for below).
        *   Feedback & Decision: Red/green for individual stats disliked. Consensus for a single, neutral color (e.g., light blue or yellow) to highlight edited fields.
    *   **Live System (Sprint 22 & 23 Demos):**
        *   Forecast data in Parking Stats highlighted in blue. (Jonathan Aulson, Sprint 22 Demo, 3:00)
        *   Inconsistency noted: Parking Stats blue, Other Revenue green. (Jonathan Aulson, Sprint 23 Demo, 28:01)
        *   **Discussion on Color (Sprint 23 Demo, 27:35-29:56):**
            *   Ryan Esposito: Need uniform color coding for editable vs. budget.
            *   Jonathan Aulson: Partial to green, but open to feedback.
            *   Jeremy Smith: Green usually means "good," red "bad" in their world, not "editable."
            *   Tia Gonia: Caution with green/red for color-blind users if close together; using one is fine.
            *   Dark mode consideration: Colors need to work in both light and dark modes.
            *   Leaning towards blue highlight for editable/forecasted cells. (Jonathan Aulson, Jeremy Smith, Sprint 23 Demo, 29:44)
*   **Display of Actuals vs. Forecast:**
    *   **Sprint 22 Demo:** Actuals in orange, forecast in blue in Parking Stats.
    *   **Sprint 22 Demo (Prototype):** Orange highlighted cells indicate variance between actual and forecast. Hovering shows variance details (green/red for positive/negative). (Jonathan Aulson, Sprint 22 Demo, 26:46-27:30)
    *   **Variance Thresholds (Sprint 22 Demo, 27:44-28:54):**
        *   Ryan Esposito: If all cells with any variance are orange, it might be overwhelming. Consider thresholds to draw attention to significant variances.
        *   Jonathan Aulson: Agrees. Thresholds should differ by data type (payroll vs. stats vs. rates) and granularity level.
*   **Parking Statistics Table Layout (Sprint 22 Demo, 5:11-7:04):**
    *   Jim Boyer: Table is busy. Suggests grouping columns thematically (e.g., vehicle stats together, percentages together) and clearly highlighting editable vs. non-editable.
    *   Jonathan Aulson: Good feedback. Occupancy column moves based on input type (rooms/percentage), which could be a pain. Read-only calculated vehicle counts (Self/Valet Overnight) are a wrinkle in pure thematic grouping. Team will review.
*   **"Show Budget" / "Show Forecast" / "Show Comparison" Toggle:**
    *   Functionality: Allow users to toggle between their current forecast input view and a read-only view of the underlying comparison dataset (budget, prior year, etc.). (Jonathan Aulson, Sprint 20 Demo, 23:35-24:00; Sprint 23 Demo, 10:30)
    *   Feedback & Decision: Feature well-received.
*   **Hover-Over for Budget Value (Forecast Input Prototype Discussion - Sprint 20 Demo):**
    *   Functionality: When a forecast value has been entered in a cell, hovering over that cell could display the original budget number in a tooltip.
*   **Undo/Redo Functionality:**
    *   **Query (Tia Gonia, Sprint 21 Demo, 27:35):** Availability of undo/redo.
    *   **Current Status (Sprint 21 Demo):** No dedicated application-level undo button. Cells can be re-edited. Standard browser undo (Ctrl+Z) should function for text inputs.
    *   **Future Consideration:** Noted as a possible enhancement.
*   **Copy Feature:**
    *   **Future Consideration:** A feature to copy values (e.g., down columns or across rows) is being considered. (Jonathan Aulson, Sprint 21 Demo, 27:55)
*   **Account Manager Ability to Update Email Addresses (Billing System Context):**
    *   **Request (Amy Sowells, Sprint 20 Demo, 20:32):** Enable AMs to update customer billing email addresses directly.
    *   **Decision/Path Forward:** Feasible. A new UI location needs to be identified as the current field is on a tab AMs can't access.

#### 2.1.4. Data Requirements & Management
*   **Input Data by AMs:**
    *   Site-specific statistics (occupancy, drive-in, etc.).
    *   Parking rates (monthly).
    *   Payroll hours/costs by job family (daily/weekly).
    *   Other internal revenue items (monthly).
*   **Reference Data (System-Sourced):**
    *   **Budget Data:** Sourced from EDW (Budget Final table) for stats, rates, payroll, P&L. (Jonathan Aulson, Sprint 23 Demo, 8:15; Sprint 22 Demo, 10:08)
    *   **Actual Data:**
        *   Parking Statistics: Source from EDW (pending connection). (Jonathan Aulson, Sprint 22 Demo, 2:20)
        *   Rates: Source TBD (Invoice, EDW). (Jonathan Aulson, Sprint 22 Demo, 11:15)
        *   Payroll: Scheduled and Actual hours from Legion. (Jonathan Aulson, Sprint 23 Demo, 17:00)
    *   **Site Master Data:** Total available parking spaces, total hotel rooms (from customer section). (Jonathan Aulson, Sprint 21 Demo, 4:50)
    *   **User & Site Assignment Data:** Sourced from Workday tables for AM/DM role assignments and their associated sites, stored in Dataverse. (Jonathan Aulson, Sprint 20 Demo, 18:52; Sprint 22 Demo, 12:30)
    *   **Rate Cards (for revenue calculation in stats):** Integration pending after Sprint 21.
    *   **Payroll Rates (for cost calculation):** To be sourced from EDW. (Jonathan Aulson, Sprint 22 Demo, 35:18)
*   **Output Data:** Daily/weekly/monthly/quarterly forecasted statistics, rates, payroll hours/costs, other revenue, calculated P&L.
*   **Data Schema:** Forecasting tables built to hold forecast data, separate from EDW source data. (Jonathan Aulson, Sprint 22 Demo, 2:00)

#### 2.1.5. Non-Functional Requirements
*   **Usability:** Simplified, approachable, structured, and efficient interface for Account Managers.
*   **Data Integrity:** Accurate calculations, reliable saving mechanism, handling of session interruptions, clear distinction between input types (daily only for stats).
*   **Performance:** Responsive UI, especially with daily data views and filtering.
*   **Consistency:** UI elements (colors, buttons) should be consistent across tabs. (Ryan Esposito, Jonathan Aulson, Sprint 23 Demo, 27:35)

#### 2.1.6. Future Considerations & Open Questions
*   **Rate Card Implementation (Stats Revenue):** Integrate rate card data for revenue calculations in Parking Stats. (Pending after Sprint 21)
*   **Save Confirmation Dialog UX:** Refine wording/buttons. (To be investigated)
*   **Undo/Redo Feature:** Evaluate adding dedicated undo/redo. (Noted for consideration)
*   **Copy/Paste or Fill-Down Feature:** Explore for data entry efficiency. (Noted for consideration)
*   **Input Granularity for Outer Months (Stats):** While current decision is daily-only input for stats, the discussion about weekly input for outer months or dynamic granularity remains a point of interest for usability. (Sprint 21, Sprint 22 Demos)
*   **Intelligent Spreading of Aggregated Input:** If weekly/monthly input is ever allowed for stats, consider if system can intelligently spread data (Version 2). (Sprint 22 Demo)
*   **Variance Display Thresholds:** Define appropriate thresholds for highlighting variances for different data types and granularities. (Sprint 22 Demo)
*   **Source of Actual Rate Data:** Finalize source (Invoice, EDW). (Sprint 22 Demo)
*   **AM Control over Parking Rates:** Further discussion on simplifying this, potentially making it more system-driven. (Sprint 22 Demo)
*   **Variance Analysis Tab:** Potential dedicated tab for comprehensive variance analysis. (Sprint 22 Demo)
*   **Content for "Show Guide" Buttons:** Develop with Change Management team. (Jonathan Aulson, Sprint 23 Demo, 7:58) - *Targeted after UI is more finalized (Amy Sowells, Sprint 22 Demo, 44:59)*
*   **Hierarchy Filters for P&L:** How to get visibility into roles above District Manager from Workday. (Jonathan Aulson, Sprint 23 Demo, 26:20)
*   **Location for AMs to Manage Billing Contact Emails:** Needs to be determined. (Sprint 20 Demo)

### 2.2. Billing Module

#### 2.2.1. Business Requirements & Goals
*   **Accurate Invoicing:** Ensure correct line items, amounts, and customer details on invoices.
*   **Flexible Invoicing:** Support scenarios like multiple invoices for different services/entities at a single customer site. (Jonathan Aulson, Sprint 21 Demo, 29:20)
*   **Efficient Integration with Financial Systems:** Streamline data flow to Great Plains.
*   **Clear Reporting:** Provide necessary data for financial reporting, including management agreements.

#### 2.2.2. Functional Specifications
*   **Multiple Invoices per Customer/Site:** (Jonathan Aulson, Sprint 21 Demo, 29:20)
    *   Allows defining distinct customer names, site numbers, and billing email addresses for each sub-invoice. Defaults to main customer info if not specified.
*   **PDF Invoice Generation:**
    *   **Enhancement (Sprint 21):** PDF invoice template updated to closely match the HTML version.
*   **Unit Accounts / Statistics Batch to Great Plains:** (Functionality for Billing Admins, demoed in Sprint 20)
    *   Admin selects billing cycle, sends stats batch for *all sites* to GP.
    *   Batch chunking (e.g., 1000 records/chunk) for large payloads, forming one logical batch in GP.
    *   Error handling via email notifications per chunk.
    *   Resending duplicates if original posted; unposted can be deleted. Recommended to redo entire batch if issues.
*   **Resend Statement Functionality:** (Demoed in Sprint 20)
    *   Options (mutually exclusive): Resend to Customer (email with PDF) or Resend to Great Plains (data payload only).
*   **Zero Amount Line Item Handling:** (Demoed in Sprint 20)
    *   Line items calculating to zero are not created/displayed on statements.
*   **Validation Calculation Complexity:**
    *   A story involving complex validation calculations was completed in Sprint 20; to be reviewed during UAT.
*   **Great Plains Financials Batch - Conditional Sending (Bug Fix):** (Demoed in Sprint 20)
    *   If "Town Park Deposited Revenue" = TRUE & "Town Park Responsible for Parking Tax" = FALSE, financial data payload is NOT sent to GP financials batch. Logic in Power Automate.

#### 2.2.3. User Interface (UI) & User Experience (UX)
*   **Admin Panel:** For Billing Admin functions.
*   **Statements List:** "Resend" icon for applicable statements.

#### 2.2.4. Data Requirements & Management
*   Customer billing details, site statistics, statement data, contract terms, configuration flags.

#### 2.2.5. Integrations (Billing Specific)
*   See Section 3.1: Great Plains.

#### 2.2.6. Reporting (Billing Specific)
*   **Management Agreement Reporting Support:** (Sprint 21 Demo)
    *   Added `owner percent display` and `tier limit amount` columns to reporting table. Backend changes done; report demo pending.

#### 2.2.7. Future Considerations & Open Questions
*   Demo of Management Agreement reports.

## 3. Integrations

### 3.1. Great Plains (GP)
*   **Unit Accounts / Statistics Batch:** System -> GP. Manual trigger by Billing Admin. Site stats for all sites. Chunked transmission.
*   **Statement Data Resend to GP:** System -> GP. Manual trigger. Data payload for a specific statement.
*   **Financials Batch - Conditional Sending:** System -> GP (conditional). Logic via Power Automate based on "Town Park Responsible for Parking Tax" flag.
*   **SmartConnect API Concurrency Improvement (Sprint 21):** Changed to send serial payloads (one batch at a time) to GP to reduce random errors.

### 3.2. Workday
*   **Purpose:** Source of truth for user role assignments (Account Manager, District Manager) and their associated site/customer responsibilities. (Jonathan Aulson, Sprint 20 Demo, 18:52; Sprint 22 Demo, 12:30)
*   **Data Flow:** Workday data (job titles, site assignments) -> Dataverse tables -> Used by Microsoft Entra ID app roles for access control. (Cesar Figueroa, Jonathan Aulson, Sprint 20 Demo, 19:14; Sprint 22 Demo, 13:00)
*   **Automatic Role Assignment (Sprint 22):** Implemented automatic assignment of AM/DM roles based on Workday tables (RLS BI security). Job title drives role; site associations drive data access. (Jonathan Aulson, Sprint 22 Demo, 12:15)
*   **Data Governance Concern (Sprint 22 Demo, 13:37-15:28):** Jim Boyer highlighted issues with uncontrolled creation/modification of job titles in Workday, which could impact role-based permissions. Need for a universal approach and data governance. Amy Sowells agreed this applies to billing system (e.g., per labor hour job codes) too. To be discussed further in backlog grooming.

### 3.3. Enterprise Data Warehouse (EDW)
*   **Source for Budget Data:** Budget Final table in EDW is the source for budget figures used in Parking Stats, Rates, Payroll, and P&L. (Jonathan Aulson, Sprint 23 Demo, 8:15)
*   **Source for Actual Data (Planned/Partial):**
    *   Parking Statistics actuals. (Jonathan Aulson, Sprint 22 Demo, 2:20)
    *   Rates actuals (TBD if EDW or Invoice). (Jonathan Aulson, Sprint 22 Demo, 11:15)
    *   Payroll Rates. (Jonathan Aulson, Sprint 22 Demo, 35:18)

### 3.4. Legion
*   **Source for Payroll Data:** Provides Scheduled and Actual hours by job family for the Payroll forecasting tab. (Jonathan Aulson, Sprint 23 Demo, 17:00)

## 4. User Roles & Permissions
*   **Technology Stack:**
    *   **Microsoft Entra ID:** Defines application roles (App Roles). Users assigned roles in Entra. Application validates roles via token claim. (Jonathan Aulson, Cesar Figueroa, Sprint 20 Demo, 15:30, 18:10)
    *   **Workday:** Source system for user-to-site mappings and job titles that determine roles. (Jonathan Aulson, Sprint 20 Demo, 18:52; Sprint 22 Demo, 12:30)
    *   **Dataverse:** Stores user-to-site mappings within the application's database. (Cesar Figueroa, Sprint 20 Demo, 19:14)
*   **Defined Roles:**
    *   **Account Manager (AM):**
        *   Access restricted to their assigned sites/customers.
        *   Primary user for forecasting data input.
        *   Can view/download past billing statements for their sites.
        *   Future: Update customer billing email addresses.
    *   **District Manager (DM):**
        *   Role assigned based on Workday job title.
        *   Data access based on sites associated in Workday.
        *   Can use organizational filters in P&L view.
    *   **Billing Admin:**
        *   Access to Admin Panel for functions like sending Statistics Batch to GP.
*   **Future Roles Planned:** Finance, Regional Managers. Will use Entra ID model. (Jonathan Aulson, Sprint 20 Demo, 17:45)
*   **Accessibility Note (Sprint 22 Demo, 40:29):** Once Workday role assignment is live in production, AMs/DMs could theoretically log in and see forecasting pages (though forecast data isn't live/harmful yet). Amy Sowells not concerned as users wouldn't know where to go.

## 5. Environment & Infrastructure
*   **Application Lifecycle Management (ALM):** Ongoing improvements.
*   **Development Environments:** Individual developer environments.
*   **CI/CD Pipeline:** Established for code progression.
*   **Testing & Staging Environments:** QA, UAT, Training environments created.
*   **Data Storage & Platforms:**
    *   **Dataverse:** Underlying database.
    *   **Power Automate:** For specific business logic/integration flows.

## 6. Non-Functional Requirements (System-Wide)
*   **Concurrency Handling:** Addressed in GP integration (serial payloads).
*   **Data Integrity:** Critical; ensured via validation, save mechanisms, role-based access, input controls.
*   **Usability:** Emphasis on user-friendly, consistent, and efficient interfaces.
*   **Security:** Role-based access control via Entra ID and data scoping.
*   **Scalability:** Implied by handling "all sites" for batches, chunking data.
*   **Accessibility:** Color choices need to consider color blindness (Tia Gonia, Sprint 23 Demo, 28:38). Dark mode support.

## 7. Data Product & AI Enablement
*   **Goal:** This documentation serves as a structured, detailed data product.
*   **Purpose:** To empower AI-assisted tools for Q&A, text generation, code assistance.
*   **Characteristics:** Comprehensive, paraphrased for clarity, organized, clear metadata, structured format.

## 8. Project Management & Methodology
*   **Agile Sprints:**
    *   Sprint 20 (Demo: March 13, 2025)
    *   Sprint 21 (Demo: March 28, 2025)
    *   Sprint 22 (Demo: April 10, 2025)
    *   Sprint 23 (Demo: April 25, 2025) - Low capacity sprint (PTO, holidays). Forecasting: 36 points capacity, 36 accomplished. Billing support: 15 capacity, 26 accomplished. (Jonathan Aulson, Sprint 23 Demo, 1:40-3:00)
    *   Sprint 24 (Started: April 23, 2025 - Previewed in Sprint 23 Demo) - Bigger sprint focusing on P&L, time granularity, budget data integration.
*   **Sprint Demos:** Regular stakeholder demonstrations.
*   **UAT Process:** Detailed plans for Forecasting UAT (see section 2.1.2.7).
*   **Project Milestones (as of Sprint 23 Demo - April 25, 2025):**
    *   End of Sprint 23 / Start of Sprint 24 marks one more sprint until "Milestone B." (Jonathan Aulson, Sprint 23 Demo, 21:15)
    *   Milestone B completion marks the halfway point of the development cycle. (Jonathan Aulson, Sprint 23 Demo, 21:50; Sprint 21 Demo, 33:05)
    *   UAT for Milestone B functionality planned for week of May 12th. (Jonathan Aulson, Sprint 23 Demo, 21:30)
*   **Pilot and Rollout Planning:**
    *   First of two planning sessions completed before Sprint 21 demo. (Jonathan Aulson, Sprint 21 Demo, 33:20)
    *   Next session mid-May 2025. (Jonathan Aulson, Sprint 21 Demo, 33:20)
    *   Meeting planned second week of May to discuss rollout again with Jeremy Smith. (Jonathan Aulson, Sprint 23 Demo, 7:58)
*   **Change Management:**
    *   "Show Guide" button content to be developed with Jeremy Smith's team / Tia Gonia. (Jonathan Aulson, Sprint 23 Demo, 6:50; Sprint 22 Demo, 12:00, 44:40)
    *   Training for UAT participants. (Sprint 22 Demo)
*   **Project Scope & Timeline:**
    *   **Forecasting SOW Extension (Sprint 22 Demo, 46:16-47:33, 49:05-49:49):**
        *   Original SOW for forecasting was through July 3rd, 2025.
        *   Projected completion is October 2025.
        *   Jonathan Aulson to start process for change request/SOW extension document. Amy Sowells & Adam Suarez approved moving forward.
    *   **Support Agreement for Forecasting (Sprint 22 Demo, 45:21-46:16, 48:01-48:57):**
        *   Discussion initiated in steering committee about ongoing support for the forecasting module post-launch.
        *   Town Park (Amy Sowells) confirmed need for support, at least initially.
        *   Jonathan Aulson to provide a quote.
        *   Suggestion to align forecasting support agreement end date with billing support agreement (Nov 2027, making it ~2 years for forecasting). Agreement is cancelable monthly.

## 9. Key Discussions & Decisions Log
*   **Forecast Input Granularity (Stats):** Decision to keep input for Parking Statistics at the *daily level only* for MVP to ensure data integrity, despite discussions on potential usability benefits of weekly input for outer months. Viewing at aggregated levels (weekly, monthly, quarterly) is supported. (Sprint 22 Demo)
*   **AM Control over Parking Rates:** Strong sentiment that AMs forecasting individual parking rates is problematic and inaccurate. Leaning towards more system-driven rates based on actuals/budget, similar to payroll rates. (Sprint 22 Demo)
*   **Job Title Governance (Workday):** Critical need identified for governance around job title creation/modification in Workday due to its direct impact on role-based permissions in the new system. (Jim Boyer, Amy Sowells, Sprint 22 Demo)
*   **UI Color Coding for Editable Fields:** Consensus leaning towards a consistent *blue* highlight for editable/forecasted cells, considering usability, color blindness, and dark mode. (Sprint 23 Demo)
*   **"Other Internal Revenue" - Credits vs. Revenue:** Combined fields will require users to enter credits as negative numbers and revenue as positive, with the system summing to a net monthly total. "Show Guide" to provide examples. (Sprint 23 Demo)
*   **Intelligent Spreading of Aggregated Input (Seasonality):** Discussed for potential weekly input for stats; deemed complex and risky for MVP, possibly a Version 2 feature. (Sprint 22 Demo)
*   **Variance Display Thresholds:** Acknowledged need for configurable or context-aware thresholds for highlighting variances to avoid overwhelming users. (Sprint 22 Demo)
*   **Automatic Role Assignment:** Implemented for AM/DM roles based on Workday job titles and site associations. (Sprint 22 Demo)
*   **SOW Extension & Support Agreement:** Approved to proceed with documentation for forecasting project timeline extension and a quote for ongoing support. (Sprint 22 Demo)

---