ID (Link)	Process	User Story	Acceptance Criteria	Design Link
1172	Forecasting	"As an Account Manager, I want to have a simplified user interface where I can input site Statistics / Metrics so that my process to update these items is easy to accomplish

User Flow

1. **Access the Forecasting Page**
1. User navigates to the ""Forecasts"" section from the main navigation menu
2. **Select a Customer Site**
1. User selects a specific customer site from the dropdown menu
2. System loads the site configuration and budget data
3. **Select a Time Period**
1. User selects a month/year period from the dropdown
2. System loads all days for that month and pre-populates with budget data
3. System determines if the period is in the past (read-only) or future/current (editable)
4. **Choose Input Type**
1. User selects either ""Percentage"" or ""Occupied Rooms"" as the input method
2. System adjusts the form fields and calculations accordingly
5. **Review Budget Data**
1. User reviews the pre-populated budget data for all statistics
2. User can click ""Show Budget"" at any time to view original budget numbers
6. **Enter Forecast Data**
1. User enters forecast values for each statistic
2. As values are entered, they are highlighted:
1. Green if higher than budget
2. Red if lower than budget
3. Read-only calculated fields update automatically (Self Overnight, Valet Overnight, Occupancy/Rooms, Revenue)
7. **Toggle Between Budget and Forecast Views**
1. User can click ""Show Budget"" to temporarily view budget numbers
2. Button changes to ""Show Forecast"" when in budget view
3. User can click ""Show Forecast"" to return to their entered forecast data
8. **Save Forecast Data**
1. User clicks ""Save Statistics"" to submit the forecast data
2. System confirms the data has been saved"	"1. Site Selection and Period Navigation
**Given** I am on the Forecasts page
**When** I select a customer site from the dropdown
**Then** the system should load the site configuration and budget data
**Given** I have selected a customer site
**When** I select a period from the dropdown
**Then** the system should display all days in that month
**And** pre-populate all fields with budget data
**Given** I have selected a past period
**When** I view the form
**Then** all input fields should be read-only
**And** a warning message should indicate that past periods are read-only
**And** the ""Save Statistics"" button should be disabled

2. Input Type Selection
**Given** I am viewing the forecast form
**When** I select ""Percentage"" as the input type
**Then** the system should display the Occupancy % field
**And** hide the Occupied Rooms field
**Given** I am viewing the forecast form
**When** I select ""Occupied Rooms"" as the input type
**Then** the system should display the Occupied Rooms field
**And** hide the Occupancy % field

3. Data Entry and Visual Indicators
**Given** I am entering forecast data
**When** I enter a value different than the budget value
**Then** the input field should be highlighted in blue
**Given** I have modified some forecast values
**When** I navigate to a different period and then return
**Then** my modified values should still be highlighted in blue
**Given** I have modified some forecast values
**When** I save the statistics
**Then** the blue highlighting should remain until I navigate away from the page

4. Calculated Fields
**Given** I have entered forecast data
**When** I change any input value
**Then** the Self Overnight, Valet Overnight, Occupancy/Occupied Rooms, and External Revenue fields should update automatically

5. Budget/Forecast Toggle
**Given** I am viewing forecast data
**When** I click the ""Show Budget"" button
**Then** all input fields should display the original budget values
**And** all input fields should be read-only
**And** the button text should change to ""Show Forecast""
**Given** I am viewing budget data
**When** I click the ""Show Forecast"" button
**Then** all input fields should return to displaying my forecast values
**And** input fields should be editable (unless in a past period)
**And** appropriate highlighting should be applied to fields based on comparison with budget
**And** the button text should change to ""Show Budget""

6. Data Persistence
**Given** I have entered forecast data
**When** I toggle between budget and forecast views
**Then** my entered forecast data should be preserved
**Given** I have entered forecast data
**When** I click the ""Save Statistics"" button
**Then** the system should save all forecast data
**And** provide confirmation that the data was saved successfully

7. Input Field Sizing
**Given** I am viewing the forecast form
**When** I look at the input fields
**Then** they should be wide enough to clearly display 4-digit numbers
**Given** I am viewing the forecast table
**When** I view it on a standard screen
**Then** all columns should be visible without requiring horizontal scrolling
"	https://v0.dev/chat/account-manager-dashboard-IGTCmjqw3Rj?b=b_QesXFNnt0WS
1344	Forecasting	"As an Account Manager, I want to track Self Aggregator and Valet Aggregator statistics for each site, so that I can monitor third-party aggregator usage and its impact on our parking revenue.

User Flow
1. User navigates to the Site Statistics page
2. User selects a customer site from the dropdown
3. User selects a period to view/edit
4. The statistics table loads with Self Aggregator and Valet Aggregator columns displayed between ""Self Monthly"" and ""Valet Comps""
5. User can view budget values for these columns by clicking ""Show Budget"" (only if they exist)
6. User can enter forecast values for these columns
7. User can see actual values (if available) displayed in orange below the input fields
8. Modified values are highlighted in blue when changed from budget
9. User saves the statistics after making changes


"	"**Given** I am on the Site Statistics page
**When** I select a customer site
**Then** the statistics table should include columns for ""Self Aggregator"" and ""Valet Aggregator""

**Given** I click ""Show Budget"" (these do not yet exist in EDW)
**When** the budget values are displayed  (these do not yet exist in EDW)
**Then** budget values for Self Aggregator and Valet Aggregator should be shown (these do not yet exist in EDW)

**Given** I am in forecast mode
**When** I enter values in the Self Aggregator or Valet Aggregator fields that differ from budget
**Then** those fields should be highlighted in blue

**Given** I have entered forecast values for Self Aggregator and Valet Aggregator
**When** I click ""Save Statistics""
**Then** the system should save these values along with other statistics"	https://v0.dev/chat/account-manager-dashboard-IGTCmjqw3Rj?b=b_4AJrNcBuiaF
1343	Forecasting	"As an Account Manager, I want to access a comprehensive help guide that explains the Site Statistics features, so that I can effectively use the system without requiring additional training or support.

User Flow
1. User navigates to the Site Statistics page
2. User notices the help guide with sections explaining different aspects of the system
5. User reads through the guide to understand specific features
3. User clicks on the ""Hide Guide"" button
4. User clicks ""Hide Guide"" to collapse the guide and continue working
5. The guide remains hidden until the user chooses to show it again"	"**Given** the first time I visit the page
**When** I view the content
**Then** a help guide should be visible which includes explanations for all major features including site selection, period selection, occupancy input types, budget/forecast toggle, modified values, actual values, calculated fields, and saving data

**Given** the help guide is displayed
**When** I click the ""Hide Guide"" button
**Then** the help guide should collapse and no longer be visible

**Given** I am on the Site Statistics page
**When** I click the ""Show Guide"" button
**Then** a comprehensive help guide should appear below the button

**Given** I have hidden the help guide
**When** I navigate away from the page and return later
**Then** the help guide should remain hidden by default"	https://v0.dev/chat/account-manager-dashboard-IGTCmjqw3Rj?b=b_4AJrNcBuiaF
1265	Forecasting	"As an Account Manager, I want to view and edit parking rates across multiple years so that I can analyze historical data, manage current rates, and plan for future pricing.

User Flow:

1. User navigates to the Rates page
2. User sees the Parking Rates section with the current year (2025) selected by default
3. User views the monthly rates for all parking types in a table format
4. User selects a different year from the dropdown to view rates for that year
5. User edits rate values for editable months (non-actualized months in current year or any month in future years)
6. User toggles between budgeted and forecasted rates using the toggle button
7. User saves changes using the Save Changes button
"	"**Scenario 1: Viewing rates for different years**
GIVEN I am on the Rates page
WHEN I select a different year from the year dropdown
THEN I should see the parking rates for that specific year
AND actualized values should be displayed in orange where available


**Scenario 2: Editing rate values**
GIVEN I am viewing the Parking Rates table for the current or future year
WHEN I click on an editable field and enter a new value
THEN the field should be highlighted in blue
AND the entered value should be saved in the system's memory


**Scenario 3: Toggling between budgeted and forecasted rates**
GIVEN I have edited some rate values
WHEN I click ""Show Budgeted Rates""
THEN all fields should display budgeted values as placeholders
AND my edited values should be temporarily hidden
AND all fields should become read-only

WHEN I click ""Show Forecasted Rates""
THEN my previously edited values should reappear
AND edited fields should be highlighted in blue
AND editable fields should become interactive again

**Scenario 4: Data persistence across view changes**
GIVEN I have edited some rate values for year 2025
WHEN I switch to year 2026 and then back to year 2025
THEN my previously edited values for year 2025 should still be visible
AND the blue highlighting should be maintained for edited fields


**Scenario 5: Viewing actualized data**
GIVEN I am viewing the current year's data
WHEN I look at months that have actualized data (January through March)
THEN I should see the actualized values displayed in orange below the input fields
AND those fields should be read-only
"	https://v0.dev/chat/contract-details-layout-8RJ2GfJqRDg?b=b_TO4W83VjoD9
1194	Forecasting	"As a Product Owner, I want the system to automatically assign Account Manager & District Manager roles and Customer Site associations based on WorkDay table(s) in the Towne Park Enterprise Data Warehouse

User Flow:
User is an Account Manager or District Manager and logs into system
List of Sites is determined by WorkDay table in EDW --> WORKDAY_RLS_BISECURITY on Node 1
If User is an Account Manager
List of Sites visible is IN [COST_CENTER] column
If User is a District Manager
List of Sites visible is IN [SITE] colum



JOB_PROFILE

Forecasting “ROLE”

WorkDay Mapping to SITE

DISTMGR - District Manager

District Manager

Use [SITE] colum

AREAMGR - Area Manager

District Manager

Use [SITE] column

DOO - Director of Operations

Account Manager

Use [COST_CENTER] column

ACCTMGR - Account Manager

Account Manager

Use [COST_CENTER] column

ASSOCM - Associate Manager

Account Manager

Use [COST_CENTER] column

SRDISTMGR - Senior District Manager

District Manager

Use [SITE] colum

SRACCTMGR - Sr. Account Manager

Account Manager

Use [COST_CENTER] column

ASOPSMGR - Assistant Operations Manager

Account Manager

Use [COST_CENTER] column

TRANSMGR - Transportation Svcs Mgr

Account Manager

Use [COST_CENTER] column


"	"Scenario 1: User is an Account Manager
Given the user logs into the system and their job profile in WorkDay is mapped to an Account Manager role (e.g., DOO, ACCTMGR, ASSOCM, SRACCTMGR, ASOPSMGR, TRANSMGR),  
When the system retrieves the list of sites from the WorkDay table WORKDAY_RLS_BISECURITY in the Towne Park Enterprise Data Warehouse,  
Then the system should display the list of sites where the COST_CENTER column matches the user's assigned WorkDay data.

Scenario 2: User is a District Manager
Given the user logs into the system and their job profile in WorkDay is mapped to a District Manager role (e.g., DISTMGR, AREAMGR, SRDISTMGR),  
When the system retrieves the list of sites from the WorkDay table WORKDAY_RLS_BISECURITY in the Towne Park Enterprise Data Warehouse,  
Then the system should display the list of sites where the SITE column matches the user's assigned WorkDay data.

Scenario 3: Role Mapping Validation
Given the system is configured with the WorkDay job profile to role mapping,  
When a user's job profile is one of the following:  
- DISTMGR, AREAMGR, SRDISTMGR → District Manager role  
- DOO, ACCTMGR, ASSOCM, SRACCTMGR, ASOPSMGR, TRANSMGR → Account Manager role,  
Then the system should correctly assign the user to the corresponding role and use the appropriate column (SITE for District Manager, COST_CENTER for Account Manager) to determine site visibility and system Role.

Scenario 4: Error Handling for Missing WorkDay Data
Given a user logs into the system and their WorkDay data is missing or incomplete in the WORKDAY_RLS_BISECURITY table,  
When the system attempts to retrieve the list of sites,  
Then the system should display an appropriate error message (e.g., ""Unable to retrieve site data. Please contact support."") and restrict all access to site information.

Scenario 5: Role Change Handling
Given a user's job profile in WorkDay changes (e.g., from Account Manager to District Manager or vice versa),  
When the system retrieves the updated WorkDay data,  
Then the system should automatically update the user's role and site visibility based on the new mapping (COST_CENTER for Account Manager, SITE for District Manager).

"	
1265	Forecasting	"As an Account Manager, I want to view and edit parking rates across multiple years so that I can analyze historical data, manage current rates, and plan for future pricing.

User Flow:

1. User navigates to the Rates page
2. User sees the Parking Rates section with the current year (2025) selected by default
3. User views the monthly rates for all parking types in a table format
4. User selects a different year from the dropdown to view rates for that year
5. User edits rate values for editable months (non-actualized months in current year or any month in future years)
6. User toggles between budgeted and forecasted rates using the toggle button
7. User saves changes using the Save Changes button"	"**Scenario 1: Viewing rates for different years**
GIVEN I am on the Rates page
WHEN I select a different year from the year dropdown
THEN I should see the parking rates for that specific year
AND actualized values should be displayed in orange where available


**Scenario 2: Editing rate values**
GIVEN I am viewing the Parking Rates table for the current or future year
WHEN I click on an editable field and enter a new value
THEN the field should be highlighted in blue
AND the entered value should be saved in the system's memory


**Scenario 3: Toggling between budgeted and forecasted rates**
GIVEN I have edited some rate values
WHEN I click ""Show Budgeted Rates""
THEN all fields should display budgeted values as placeholders
AND my edited values should be temporarily hidden
AND all fields should become read-only

WHEN I click ""Show Forecasted Rates""
THEN my previously edited values should reappear
AND edited fields should be highlighted in blue
AND editable fields should become interactive again

**Scenario 4: Data persistence across view changes**
GIVEN I have edited some rate values for year 2025
WHEN I switch to year 2026 and then back to year 2025
THEN my previously edited values for year 2025 should still be visible
AND the blue highlighting should be maintained for edited fields


**Scenario 5: Viewing actualized data**
GIVEN I am viewing the current year's data
WHEN I look at months that have actualized data (January through March)
THEN I should see the actualized values displayed in orange below the input fields
AND those fields should be read-only
"	https://v0.dev/chat/contract-details-layout-8RJ2GfJqRDg?b=b_TO4W83VjoD9
1346	Forecasting	"As an Account Manager, I want access to a contextual guide that explains the Parking Rate Card features so that I can effectively use the system without requiring additional training.

User Flow:

1. User navigates to the Rates page
2. User sees the ""Show Guide"" button in the Parking Rates section header
3. User clicks the ""Show Guide"" button to display the guide
4. User reads the guide content with color-coded text for better understanding
5. User clicks ""Hide Guide"" to collapse the guide when no longer needed
"	"**Scenario 1: Toggling guide visibility**
GIVEN the first time I am on the Rates page
WHEN I click the ""Hide Guide"" button
THEN the guide section should collapse
AND the button text should change to ""Show Guide""

GIVEN I have hidden the Guide
WHEN I click the ""Show Guide"" button
THEN a guide section should expand below the header
AND the button text should change to ""Hide Guide""


**Scenario 2: Guide content and formatting**
GIVEN I have expanded the guide
WHEN I read the guide content
THEN I should see information about:
  - Year selection functionality
  - Parking rates table usage
  - Budgeted vs forecasted rates toggle
  - Color coding for actualized and edited values
AND the information should be organized in clear sections with headings


**Scenario 3: Color-coded text in guide**
GIVEN I have expanded the guide
WHEN I read references to colors in the text
THEN the word ""blue"" should appear in blue text
AND the word ""orange"" should appear in orange text


**Scenario 4: Guide persistence**
GIVEN I have revealed/hidden the guide
WHEN I change the selected year or toggle between budgeted and forecasted rates
THEN the guide should remain revealed/hidden until I explicitly change its state


**Scenario 5: Guide interaction independence**
GIVEN I am viewing the guide
WHEN I click on other controls in the interface
THEN those controls should function normally without closing the guide
AND clicking the guide itself should not affect other interface elements
"	https://v0.dev/chat/contract-details-layout-8RJ2GfJqRDg?b=b_TO4W83VjoD9
1345	Forecasting	"As an Account Manager, I want to see actual performance statistics alongside my budget and forecast figures, so that I can make data-driven decisions and improve the accuracy of future forecasts.

User Flow:
User navigates to the Site Statistics page
User selects a customer site from the dropdown
User selects a period to view/edit
The system queries the data source for front end display of actual statistics for the selected site and period
If actual statistics exist for any date and metric, they are displayed in orange text below the corresponding input field
User can compare actual values with budget and forecast values to assess performance
User can adjust future forecasts based on actual performance trends"	"**Given** the system is connected to the enterprise data warehouse
**When** I select a customer site and period
**Then** the system should query for actual statistics from the data source for front end display

**Given** actual statistics exist in the data source for front end display for my selected site and period
**When** the page loads
**Then** actual values should be displayed in orange text below the corresponding input fields

**Given** actual statistics do not exist for certain dates or metrics
**When** the page loads
**Then** no actual values should be displayed for those dates/metrics

**Given** I am viewing a past period
**When** I look at the statistics table
**Then** actual values should be displayed and input fields should be read-only

**Given** actual statistics are updated in the data source for front end display
**When** I refresh the page or select the site again
**Then** the system should display the updated actual values

**Given** I am viewing actual statistics alongside budget and forecast values
**When** I compare the values
**Then** I should be able to easily identify variances to inform my future forecasts

**Given** actual statistics exist for a specific metric
**When** I view that metric in the table
**Then** the actual value should be formatted appropriately (e.g., percentages shown with % symbol, numbers rounded appropriately)"	https://v0.dev/chat/account-manager-dashboard-IGTCmjqw3Rj?b=b_4AJrNcBuiaF
ID (Link)	Process	User Story	Acceptance Criteria	Design Link
USER STORY 1600	Forecasting	"As an Account Manager, I want to create a forecast in a structured workflow of tabs so that I can easily follow the creation process



User Flow

 

1. Tab Navigation

1. Access the Forecast Editor

1. User navigates to the Forecasts Editor page

2. System displays the default tab (Parking)

2. Switch Between Tabs

1. User clicks on a different tab (Rates, Payroll, Other Revenue, Summary, or Graphs)

2. System updates the main content area to display the selected tab's interface

3. System maintains the currently selected site and view options across tab changes

3. Tab-Specific Interactions

1. Parking Tab: User views and edits vehicle metrics and occupancy data

2. Rates Tab: User views and edits parking rates by service type

3. Payroll Tab: User views and edits labor hours and costs

4. Other Revenue Tab: User views and edits additional revenue streams

5. Summary Tab: User views detailed financial analysis in an income statement format

6. Graphs Tab: User views charts and metrics summarizing the forecast

2. Site Selection

1. View Current Site

1. User sees the currently selected site displayed in the Site Selection widget

2. System displays site-specific information (site number, available rooms)

2. Change Selected Site

1. User clicks on the site dropdown in the Site Selection widget

2. System displays a list of available sites

3. User selects a different site

4. System updates all tabs to display data for the newly selected site

3. Access Quick Links

1. User views the Quick Links section in the Site Selection widget

2. User clicks on ""P&L View"" link

3. System navigates to the P&L View for the currently selected site

3. View Options Configuration

1. Adjust Starting Month

1. User views the current starting month in the View Options widget

2. User clicks the left/right arrows to navigate to previous/next months

3. System updates all tabs to display data starting from the selected month

2. Change Time Period Granularity

1. User selects a different time period option (Daily, Weekly, Monthly, or Quarterly)

2. System updates the data display format across all applicable tabs

3. System maintains the selected starting month while changing the data aggregation level

3. Configure Comparison Options1. User selects a comparison type (Budget, Previous Quarter, Prior Year, or FP&A Projection)

2. System automatically enables comparison mode

3. User views the comparison data across all tabs

4. Toggle Comparison View

1. User clicks the ""Show Comparison""/""Show Forecast"" button within a specific tab

2. System toggles between displaying forecast data and comparison data for that tab only

"	"Tab Navigation

 

Given I am on the Forecast Editor page
When I click on any tab in the tab row
Then the main content area should update to display that tab's interface
And my selected site and view options should be preserved

 

Given I am on the Other Revenue tab
When I select a different time period granularity
Then the system should automatically switch to Monthly View
And display a message indicating that Other Revenue can only be input by month

 

Given I navigate between tabs
When I return to a previously visited tab
Then any data I edited on that tab should be preserved

 

Site Selection

 

Given I am on the Forecast Editor page
When I select a different site from the Site Selection dropdown
Then all tabs should update to display data for the newly selected site
And the page title should update to show the selected site name

 

Given I have selected a site
When I view the Site Selection widget
Then I should see the site number and available rooms information
And I should see the last updated date and status

 

Given I am viewing a site's forecast
When I click on the ""P&L View"" link in the Quick Links section
Then I should be navigated to the P&L View for the currently selected site

 

View Options

 

Given I am on the Forecast Editor page
When I click the left/right arrows in the Starting Month control
Then the starting month should change accordingly
And all tabs should update to display data for the new time period

 

Given I am viewing forecast data
When I select a different Time Period option (Daily, Weekly, Monthly, or Quarterly)
Then the data display format should update across all applicable tabs
And the data should be aggregated according to the selected granularity

 

Given I am on the Forecast Editor page
When I select a comparison type from the Comparison dropdown
Then comparison mode should be automatically enabled
And all tabs should display the selected comparison data instead of forecast data

 

Given I am viewing comparison data
When I click the ""Show Forecast"" button within a specific tab
Then that tab should switch back to displaying forecast data
And the button should change to ""Show Comparison""

 

Given I am on the Other Revenue tab
When I attempt to change the Time Period to anything other than Monthly
Then the system should maintain Monthly View
And display a message explaining the restriction

 

Cross-Component Interactions

 

Given I have selected a specific site, starting month, and time period
When I navigate between different tabs
Then all tabs should display data for the same site, starting month, and time period

 

Given I have made edits to forecast data in multiple tabs
When I change the selected site
Then the system should prompt me to save changes before switching sitesOr automatically save my changes

 

Given I am viewing comparison data
When I change the comparison type
Then all tabs should update to display the new comparison data
And remain in comparison mode

"	https://v0.dev/chat/customer-forecast-software-2HRTUgLLdLU
USER STORY 1437	Forecasting	"As an Account Manager, I want to input Payroll Forecast data so that I can project Payroll expenses for the sites I manage



User Flow

 

1. User navigates to the Forecast Editor page

2. User clicks on the ""Payroll"" tab in the main content area

3. User sees the Payroll Forecast interface with two main sections:

1. Labor Hours & Cost Timeline (top section)

2. Variance Reconciliation Dashboard (bottom section)

4. User interacts with the dual timeline interface to view scheduled/actual data and forecast data

5. User can select different sites from the dropdown

6. User can switch between different time horizons (day, week, month)

7. User can expand periods to see hours and costs by job role

8. User can click on forecast bars to edit future period forecasts



 

 

Detailed Behavior

 

Labor Hours & Cost Timeline

 

- Displays a dual timeline showing scheduled/actual data (left) and forecast data (right)

- Supports different time horizons (day, week, month, quarter)

- Shows labor hours and costs for different job roles (valet attendant, bell staff, cashier, etc.)

- Allows editing of forecast data for future periods





 



 


"	"Scenario 1: Viewing Payroll Data for a Selected Site

 

Given I am on the Forecast Editor page
When I click on the ""Payroll"" tab and select ""Hilton Downtown"" from the site dropdown
Then I should see:

 

- The Labor Hours & Cost Timeline for Hilton Downtown

- Data specific to the selected site's staffing requirements and labor costs

 

 

Scenario 2: Switching Between Time Horizons

 

Given I am viewing the Payroll tab for a selected site
When I change the time horizon from ""day"" to ""week"" using the time horizon selector
Then the interface should update to show:

 

- Weekly aggregated labor hours and costs

- Data grouped by week instead of by day

 

 

Scenario 3: Expanding Job Role Details

 

Given I am viewing the Payroll tab with the Labor Hours & Cost Timeline
When I click on a specific period (day, week, or month) in the timeline
Then the interface should expand to show:

 

- A breakdown of hours and costs by job role for that period

- Detailed information for each role (valet attendant, bell staff, cashier, etc.)

- Budget, actual (if available), and forecast values for each role

 

 

Scenario 4: Editing Forecast Data

 

Given I am viewing the Payroll tab with the Labor Hours & Cost Timeline
When I click on a green forecast bar for a future period
Then I should see:

 

- An edit dialog or inline editing capability

- The ability to modify forecast hours and/or rates for each job role

- Validation to ensure reasonable values are entered

- Immediate visual feedback of my changes in the timeline

 

 

Scenario 5: Viewing Historical Actual Data

 

Given I am viewing the Payroll tab for a period that includes past dates
When I look at the timeline for dates that have passed (e.g., April 1-8, 2025)
Then I should see:

 

- Actual labor hours and costs displayed for those dates

- Visual distinction between actual and forecast data

- The ability to compare actual data with budget and forecast

- Variance analysis for the actual data

 

 

Scenario 6: Accessing Help Information

 

Given I am viewing the Payroll tab
When I click on the Show Guide button
Then I should see:

 

- A comprehensive help guide explaining the Payroll Forecast interface

- Information about what the interface shows and how to use it

- Explanations of key features like the dual timeline

"	https://v0.dev/chat/customer-forecast-software-2HRTUgLLdLU
USER STORY 1439	Forecasting	"As an Account Manager, I want to input Other Internal Revenue forecast amounts, so that it may inform my overall site forecast for the quarter


User Flow

 

1. Access the Other Revenue Tab

1. User navigates to the Forecasts Editor page

2. User selects the ""Other Revenue"" tab from the navigation menu

2. View Revenue Data

1. User sees a table displaying other revenue categories (Billable Expenses, Revenue Validations, Credits, GPO Fees, Signing Bonuses)

2. Data is displayed by month beginning with the Starting Month

3. Months with actual data (before current date) are marked with an ""Actual"" indicator

3. Input Revenue Forecasts

1. User clicks on a cell in the table

2. User enters a new forecast value for a specific revenue category and month

3. System highlights the edited cell with a green background

4. System displays a tooltip showing variance from budget when hovering over edited cells

4. Compare with Benchmarks

1. User clicks the ""Show Comparison"" button

2. System displays comparison data (Budget, Prior Year, or FP&A Projection)

3. User reviews the comparison data

4. User clicks ""Show Forecast"" to return to forecast view

5. Review Actual vs. Forecast

1. For months with actual data, user hovers over cells with orange borders

2. System displays a tooltip showing the actual value and variance from forecast




"	"Viewing Monthly Revenue Data

Given I am an account manager on the Forecasts Editor page
When I navigate to the Other Revenue tab
Then I should see a table with months as rows and revenue categories as columns
And I should see a note indicating that ""Other Revenue may only be input by month""


Given I am viewing the Other Revenue tab
When I look at months that have passed (before current date)
Then I should see an ""Actual"" indicator for those months
And any cells with actual data that differs from forecast should have an orange border

 

Inputting Revenue Forecasts


Given I am on the Other Revenue tab
When I click on a cell and enter a new value
Then the cell should be highlighted with a green background
And the new value should be saved as my forecast


Given I have edited a forecast value
When I hover over the edited cell
Then I should see a tooltip showing the variance from budget in both percentage and dollar amount

 

Comparing with Benchmarks


Given I am on the Other Revenue tab
When I click the ""Show Comparison"" button
Then the table should display comparison data instead of my forecast
And the button should change to ""Show Forecast""


Given I am viewing comparison data
When I click the ""Show Forecast"" button
Then the table should return to displaying my forecast data
And the button should change to ""Show Comparison""

 

Reviewing Actual vs. Forecast


Given I am on the Other Revenue tab
When I hover over a cell with an orange border (indicating different actual data)
Then I should see a tooltip showing the actual value
And the tooltip should display the variance from forecast in both percentage and dollar amount

 

Data Input Restriction


Given I am on the Other Revenue tab
When I attempt to input data
Then I should only be able to input at the monthly level
And I should see a note explaining this restriction


Given I need assistance with Other Revenue input
When I read the note on the Other Revenue tab
Then I should see instructions to contact the Towne Park Finance department with questions

"	https://v0.dev/chat/customer-forecast-software-2HRTUgLLdLU
USER STORY 1484	Forecasting	"As an Account Manager, I want to see Budget data from the EDW as placeholders when I input Parking Metrics so that it can be used as a point of reference for Forecasting

User Flow
1. System administrator configures connection to the enterprise data warehouse
2. User navigates to the Site Statistics page
3. User selects a customer site from the dropdown
4. User selects a period to view/edit
5. The system automatically queries the data source for budget data for the selected site and period
6. Budget values are loaded into the system and displayed when the user clicks ""Show Budget""
7. User can toggle between budget and forecast views to compare their forecasts with official budget figures"	"**Given** the system is connected to the enterprise data warehouse
**When** I select a customer site and period
**Then** the system should automatically retrieve budget data from the source for front end display

**Given** budget data exists in the data warehouse for my selected site and period
**When** I click ""Show Budget""
**Then** the budget values displayed should match those in the source for front end display

**Given** budget data does not exist in the data warehouse for my selected site and period
**When** the system attempts to retrieve the data
**Then** it should display zeros in each cell (not NULL or blank)

**Given** budget data has been updated in the data warehouse
**When** an hour has elapsed since the update
**Then** the system should display the updated budget values

**Given** I am viewing budget data
**When** I switch to forecast mode and make changes
**Then** my changes should not affect the budget values stored in or retrieved from the data warehouse nor source for front end display
"	https://v0.dev/chat/customer-forecast-software-2HRTUgLLdLU
ID (Link)	Process	User Story	Acceptance Criteria	Design Link
1488	Forecasting	"As an Account Manager, I want to view and analyze financial forecast trend using a P&L view so that I can make informed financial decisions and track performance against forecast, budget, actuals, and historical data.

User Flow

 

Initial Access

1. User navigates to the P&L View page

2. System displays the P&L data in Forecast mode with Trend view by default

3. The table shows monthly data for the current year with actual data highlighted for past months

4. User selects a different year from the Year dropdown

5. System updates the table to show data for the selected year

6. User clicks ""Show Budget"" button

7. System switches from Forecast to Budget mode, updating all non-actual data points

8. User clicks ""Show Variance"" button

9. System transforms the display to show variance between Forecast and Budget data


1. Positive variances are shown in black with upward arrows (▲)


2. Negative variances are shown in red with downward arrows (▼)


3. Variance percentages are displayed beneath the dollar amounts


4. Color intensity indicates the significance of the variance


10. User clicks the ""Filters"" button

11. System displays the filter modal with organizational and customer filter options

12. User selects desired filters (e.g., specific regions, districts, sites)

13. User clicks ""Apply Filters""

14. System updates the P&L view to show only data matching the selected filters

15. Filter count badge updates to show the number of active filters

16. User clicks ""Show Trend"" button

17. System reverts to showing trend data instead of variances

18. User can continue analyzing data or apply different filters

"	"Scenario 1: Default View

GIVEN I am a financial analyst

WHEN I navigate to the P&L View page

THEN I should see the P&L data in Forecast mode with Trend view for the current year

AND actual data for past months should be highlighted with a light blue background

 

 

Scenario 2: Year Selection

GIVEN I am viewing the P&L data

WHEN I select a different year from the Year dropdown

THEN the table should update to show data for the selected year

 

 

Scenario 3: Switching Between Forecast and Budget

GIVEN I am viewing the P&L data in Forecast mode

WHEN I click the ""Show Budget"" button

THEN the display should switch to Budget mode

AND the button text should change to ""Show Forecast""

AND all non-actual data points should update to show budget values

 

 

Variance Analysis

 

Scenario 4: Toggling Variance View

GIVEN I am viewing the P&L data in Trend view

WHEN I click the ""Show Variance"" button

THEN the display should switch to Variance view

AND the button text should change to ""Show Trend""

AND each cell should display the variance between Forecast and Budget data

 

 

Scenario 5: Variance Indicators

GIVEN I am viewing the P&L data in Variance view

WHEN I look at a cell with a positive variance

THEN I should see an upward arrow (▲) and the variance amount in black

AND the percentage variance should be displayed beneath the dollar amount

 

 

Scenario 6: Variance Indicators for Negative Values

GIVEN I am viewing the P&L data in Variance view

WHEN I look at a cell with a negative variance

THEN I should see a downward arrow (▼) and the variance amount in red

AND the percentage variance should be displayed beneath the dollar amount

 

 

Scenario 7: Variance Significance

GIVEN I am viewing the P&L data in Variance view

WHEN I look at cells with different variance percentages

THEN high variances (7.5%+) should be displayed in bold

AND medium variances (5-7.5%) should be displayed with normal emphasis

AND low variances (0-5%) should be displayed with normal emphasis

**NOTE: The above AC describes 3 levels of variance formatting.  For Go-Live, the client wants only 2 levels of formatting in use (0-7.5% and 7.5%+) however at some point afterwards they want to fine tune this formatting so it makes sense for us to ""build"" 3 levels using easily set variables.**

 

 

Scenario 8: Consistent Variance Display

GIVEN I am viewing the P&L data in Variance view

WHEN I switch between Forecast and Budget modes

THEN the variance calculations should remain consistent

AND always show the difference between Forecast and Budget values



 

 

Visual Consistency

 

Scenario 12: Consistent Cell Heights

GIVEN I am viewing the P&L data

WHEN I toggle between Trend and Variance views

THEN the table cell heights should remain consistent

AND the table should not change its vertical dimensions

 

 

Scenario 14: Sticky Header and First Column

GIVEN I am viewing the P&L data

WHEN I scroll horizontally or vertically (such as on Mobile)

THEN the table header should remain fixed at the top

AND the first column should remain fixed on the left

 

 

Non-functional Requirements

1. The P&L view must maintain consistent cell dimensions when toggling between Trend and Variance views

2. Variance calculations must always compare Trend (ie: Actual + Forecast) to Budget data, regardless of the current view mode

3. The table must be responsive and handle different screen sizes appropriately

4. The Guide must be visible without requiring vertical scrolling

5. Actual data must be visually distinguished from forecast/budget data

6. The filter functionality must support both organizational and customer filters

7. All numerical data must be properly formatted with commas for thousands and dollar signs where appropriate


"	https://v0.dev/chat/fork-of-account-manager-ui-nuzJ2kD0qTa
1774	Forecasting	"As an Account Manager, I want to initialize my P&L View using budget data and see actual data for closed months, so that I can observe financial trend of the sites for which I'm responsible.




User Flow

Account Manager navigates to the Forecasting module in the system
Account Manager selects the ""P&L View"" from the sidebar widget (View Options)
System initializes the P&L View with budget data from BUDGET_FINAL table for future months (excluding Internal Revenue)
System automatically populates closed months with actual data from ACCOUNT_SUMMARY table
Account Manager can toggle between viewing dollars and percentages for variance calculations
Account Manager can filter the P&L View using additional filters (P&L Category, Entity, COG, Business Segment, Contract Type)

Data Element	Data Use Category	Format	Example Formula	Example Queries
EXTERNAL REVENUE	Budget	Currency, USD	[EXTERNAL REVENUE] = [BUDGETED_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'EXTERNAL REVENUE'
------------------
BUDGETED_CATEGORY_MONTHLY_TOTAL
1250357.92000
EXTERNAL REVENUE	Actual	Currency, USD	[EXTERNAL REVENUE] = [ACTUAL_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'EXTERNAL REVENUE'
-------------------
ACTUAL_CATEGORY_MONTHLY_TOTAL
1258925.10000
INTERNAL REVENUE	Actual	Currency, USD	[INTERNAL REVENUE] = [ACTUAL_CATEGORY_MONTHLY_TOTAL]*(-1)	SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INTERNAL REVENUE'
------------------------------------
ACTUAL_CATEGORY_MONTHLY_TOTAL
-308022.41000
PAYROLL	Budget	Currency, USD	[PAYROLL] = [BUDGETED_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PAYROLL'
------------------
BUDGETED_CATEGORY_MONTHLY_TOTAL
82246.00000
PAYROLL	Actual	Currency, USD	[PAYROLL] = [ACTUAL_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PAYROLL'
-------------------
ACTUAL_CATEGORY_MONTHLY_TOTAL
82330.62001
CLAIMS	Budget	
Currency, USD
[CLAIMS] = [BUDGETED_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'CLAIMS'
------------------
BUDGETED_CATEGORY_MONTHLY_TOTAL
0.00000
CLAIMS	Actual	
Currency, USD
[CLAIMS] = [ACTUAL_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'CLAIMS'
-------------------
ACTUAL_CATEGORY_MONTHLY_TOTAL
NULL
PARKING RENTS	Budget	Currency, USD	[PARKING RENTS] = [BUDGETED_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PARKING RENTS'
------------------
BUDGETED_CATEGORY_MONTHLY_TOTAL
0.00000
PARKING RENTS	Actual	Currency, USD	[PARKING RENTS] = [ACTUAL_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PARKING RENTS'
-------------------
ACTUAL_CATEGORY_MONTHLY_TOTAL
NULL
OTHER EXPENSE	Budget	Currency, USD	[OTHER EXPENSE] = [BUDGETED_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'OTHER EXPENSE'
------------------
BUDGETED_CATEGORY_MONTHLY_TOTAL
33029.99000
OTHER EXPENSE	Actual	Currency, USD	[OTHER EXPENSE] = [ACTUAL_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'OTHER EXPENSE'
------------------
ACTUAL_CATEGORY_MONTHLY_TOTAL
42600.37000
PTEB	Budget	Currency, USD	[PTEB] = [BUDGETED_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PTEB'
------------------
BUDGETED_CATEGORY_MONTHLY_TOTAL
10857.28000
PTEB	Actual	Currency, USD	[OTHER EXPENSE] = [ACTUAL_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'PTEB'
------------------
ACTUAL_CATEGORY_MONTHLY_TOTAL
10980.61000
INSURANCE	Budget	Currency, USD	[INSURANCE] = [BUDGETED_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS BUDGETED_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
JOIN [CHART_OF_ACCOUNT] AS coa ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INSURANCE'
------------------
BUDGETED_CATEGORY_MONTHLY_TOTAL
5114.93000
INSURANCE	Actual	Currency, USD	[INSURANCE] = [ACTUAL_CATEGORY_MONTHLY_TOTAL]	SELECT SUM([BALANCE]) AS ACTUAL_CATEGORY_MONTHLY_TOTAL
FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
JOIN [CHART_OF_ACCOUNT] AS coa ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
WHERE [COST_CENTER] = '0170'
AND [PERIOD] = '202503'
AND [IS_SUMMARY_CATEGORY] = 'INSURANCE'
------------------
ACTUAL_CATEGORY_MONTHLY_TOTAL
5143.74000




"	"Scenario 1: P&L View Initialization with Budget Data

Given I am an Account Manager logged into the Forecasting module
And I select Cost Center '0170'
When I have selected ""P&L View"" from the navigation menu and a year including future months
Then the system should initialize the P&L View with budget data from BUDGET_FINAL for future months
And each P&L category should display the sum of relevant accounts based on IS_SUMMARY_CATEGORY
And the budget data should be displayed in USD currency format

Scenario 2: Automatic Population of Actual Data for Closed Months

Given I am viewing the P&L View for Cost Center '0170'
And the selected date range includes closed months
When the system loads data for the closed months
Then the system should populate those months with actual data from ACCOUNT_SUMMARY
And the EXTERNAL REVENUE should show $1,258,925.10 for March 2025 (period '202503')
And the INTERNAL REVENUE should show $308,022.41 for March 2025



Scenario 4: Correct Calculation of First Line Contribution (FLC)

Given I am viewing the P&L View for Cost Center '0170' for March 2025
When I look at the FLC row
Then it should display the result of INTERNAL REVENUE minus the sum of all expenses
And the expenses should include PAYROLL, CLAIMS, OTHER EXPENSE, PTEB, INSURANCE, and PARKING RENTS

Scenario 5: Handling NULL Values in Data Sources

Given I am viewing the P&L View for Cost Center '0170' for March 2025
When the system encounters NULL values for categories like CLAIMS and PARKING RENTS
Then it should display those categories with a zero as representation
And continue to correctly calculate totals and percentages that depend on those values

Scenario 6: Variance Calculation Between Budget and Actual

Given I am viewing the P&L View for Cost Center '0170' for March 2025
When I look at the variance column
Then it should display the difference between actual and budgeted values for each category
And I should be able to toggle between seeing the variance as dollar amounts or percentages

Scenario 7: Data Filtering Capabilities

Given I am viewing the P&L View
When I apply filters such as P&L Category, Entity, or Business Segment
Then the system should refresh the view to show only data matching the selected filters
And all calculations should be recalculated based on the filtered dataset

"	https://v0.dev/chat/fork-of-account-manager-ui-nuzJ2kD0qTa
1596	Forecasting	"As a financial Product Owner, I want to filter the P&L View data by various organizational and customer criteria so that I can analyze specific segments of the business and make more targeted financial decisions.

Org Filters FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
  - Legal Entity [LEGAL_ENTITY]
  - Region [SVP_REGION]
  - District [DISTRICT]
  - Site [SITE]
  - AM / DM (user-to-site association in Dataverse)

Customer Filters FROM [TP_EDW].[dbo].[MASTER_NON_FINANCIAL]
  - P&L Category [PL_CATEGORY]
  - COG [COG_SEGMENT]
  - Business Segment [BUSINESS_SEGMENT]
  - Contract Type [P_CONTRACT_TYPE] 

Security within the Org Filters

- Given I am using the Filters dialog with categories

- When I apply the Org filters to the P&L view

- Then I may only see the data belonging to Sites to which I am associated 

NOTE: Need to determine how to associate users to roles larger than DM - OOS for sprint 24




LEGAL_ENTITY
Encore Hospitality Services, LLC
Snagaspace, LLC
UPP Global
N/A
Towne Park, LLC.
Towne Park Systems LLC.
Mile Hi Valet Service, Inc.
Elite Family of Companies, LLC
E&B Parking Services, Inc.
EasyParkFly, LLC

 
PL_CATEGORY
Ops Overhead
G&A Topside
Corporate G&A
SAS
Ops Topside
Ops G&A
Exc from EBITDA
Operations
Board Contingency

 
COG_SEGMENT
Acquisition
Base
NULL
Lost PY
New PY
Lost CY
New CY

 
SVP_REGION
East
T-Park
NULL
West
Central

 
BUSINESS_SEGMENT
Residential
T-Park
Healthcare
NULL
Hospitality
Commercial

 

"	"Filter Dialog Opening and Display
 

Scenario 1: Opening the filter dialog

- Given I am on the P&L View page

- When I click the ""Filters"" button

- Then a dialog should open with filter categories on the left and selection interface on the right

 

 

Scenario 2: Filter categories organization

- Given the filter dialog is open

- When I view the filter categories

- Then I should see them organized into ""Organizational Filters"" and ""Customer Filters"" sections

- And ""Organizational Filters"" should include Legal Entity, Region, District, Site, and AM / DM

- And ""Customer Filters"" should include P&L Category, COG Segment, Contract Type, and Business Segment

 

 

 

Filter Selection

 

Scenario 3: Selecting a filter category

- Given the filter dialog is open

- When I click on a filter category (e.g., ""Legal Entity"")

- Then the right side should update to show a dropdown for that category

- And the selected category button should be highlighted

 

 

Scenario 4: Selecting filter values

- Given I have selected a filter category

- When I click on the dropdown

- Then I should see a list of available values for that category

- When I select a value

- Then it should be added to the ""Selected Filters"" section

 

 

Scenario 5: Multiple selections within a category

- Given I have selected one value in a filter category

- When I select additional values from the same category

- Then all selected values should appear in the ""Selected Filters"" section

 

 

Scenario 6: Search functionality within AM / DM filter category

- Given I have selected AM / DM as a filter category

- When I open the drop down to select a value

- Then a search field should be available inside the drop down

- And all Account Manager and District Manager users of the system should be searchable/selectable

- And selecting a user will filter the P&L to the sites that user is associated with



Scenario 7: Security within the Org Filters

- Given I am using the Filters dialog with categories

- When I apply the Org filters to the P&L view

- Then I may only see the data belonging to Sites to which I am associated 

NOTE: Need to determine how to associate users to roles larger than DM - OOS for sprint 24










Filter Management
 

Scenario 8: Removing individual filters

- Given I have selected at least one filter

- When I click the ""X"" button next to a filter badge

- Then that specific filter should be removed from the selection

 

 

Scenario 9: Clearing all filters

- Given I have selected at least one filter

- When I click the ""Clear Filters"" button

- Then all selected filters should be removed

 

 

Scenario 10: Filter organization in the selection area

- Given I have selected both organizational and customer filters

- When I view the ""Selected Filters"" section

- Then filters should be grouped by type (Organizational and Customer)

- And organizational filters should have a blue background

- And customer filters should have a green background

 

 

Applying Filters
 

Scenario 11: Applying filters to the P&L View

- Given I have selected at least one filter

- When I click the ""Apply Filters"" button

- Then the dialog should close

- And the P&L View data should update to reflect my filter selection

- And the ""Filters"" button should display a badge with the count of applied filters

 

 

Scenario 12: Filter persistence

- Given I have applied filters to the P&L View

- When I reopen the filter dialog

- Then my previously selected filters should still be selected

 

 

Scenario 13: Filter help text

- Given the filter dialog is open

- When I view the dialog

- Then I should see help text explaining how organizational and customer filters work differently

- And it should explain that organizational filters expand results

- And it should explain that customer filters narrow results

 

 

Filter Button State
 

Scenario 14: Filter button with no filters

- Given I am on the P&L View page

- When no filters are applied

- Then the ""Filters"" button should not display a count badge

 

 

Scenario 15: Filter button with applied filters

- Given I have applied filters to the P&L View

- When I view the ""Filters"" button

- Then it should display a badge with the correct count of applied filters





Filtered List of Site Numbers

Scenario 16: Identification of filtered data

- Given I have selected filters in the filter dialog

- When I view the ""Filters"" dialog

- Then it should show the user which Site Number's the set of filters resulted in so that the user can understand what sites' data is included in the P&L view they are analyzing



Scenario 17: Identification of large amount of filtered data

- Given I am viewing the list of filtered Site Number's in the filter dialog

- When the list is abbreviated due to length

- Then the full list should appear upon mouse hover over of the abbreviated list.




"	https://v0.dev/chat/fork-of-account-manager-ui-nuzJ2kD0qTa
1595	Forecasting	"As an Account Manager I want to view parking metrics at different time granularities (daily, weekly, monthly, quarterly), So that I can analyze parking trends and make data-driven forecasting decisions at the appropriate level of detail.



 User Flow

 

1. User navigates to the Forecast Editor page

2. User sees the View Options widget in the sidebar with the Time Period dropdown set to ""Daily View"" by default

3. User sees the Parking Metrics card displaying daily parking data in the main content area

4. User clicks on the Time Period dropdown in the View Options widget

5. User selects a different time period (Weekly, Monthly, or Quarterly)

6. The Parking Metrics card updates to display data at the selected granularity

7. User can interact with the data at the new time granularity

8. User can switch back to a different time period as needed

 

 

 Detailed Behavior

 

 Daily View

 

- Shows data for each day of the current month

- Displays actual values for dates that have passed and the actualized data is available

- Shows editable forecast values for future dates

- Allows direct editing of individual daily values

 

 

 Weekly View

 

- Aggregates data into weekly periods (Monday-Sunday)

- Shows weekly averages for metrics like occupancy and ratios

- Shows weekly totals for count-based metrics



 

 

 Monthly View

 

- Aggregates data into monthly periods (April, May, June for Q2)

- Shows monthly averages for metrics like occupancy and ratios

- Shows monthly totals for count-based metrics

-

 

 Quarterly View

 

- Aggregates all data for the quarter (Q2 2025)

- Shows quarterly averages for metrics like occupancy and ratios

- Shows quarterly totals for count-based metrics



"	"Scenario 1: Viewing Daily Parking Metrics


Given I am on the Forecast Editor page with the ""Parking"" tab selected
When I select ""Daily View"" from the Time Period dropdown in the View Options widget
Then the Parking Metrics card should display:
- A row for each day of the current month
- Daily parking counts and occupancy metrics for each day
- The card header should indicate ""Daily parking counts and occupancy metrics""
- Actual data should be shown for dates on or before April 6, 2025
- Editable forecast data should be shown for all dates

 

 Scenario 2: Switching from Daily to Weekly View


Given I am on the Forecast Editor page viewing daily parking metrics
When I change the Time Period dropdown to ""Weekly View""
Then the Parking Metrics card should update to display:
- A row for each week in the quarter
- Weekly average parking counts and occupancy metrics
- The card header should change to ""Weekly average parking counts and occupancy metrics""
- Weeks containing actual data should show the actual weekly averages
- The date column should show the week range (e.g., ""4/1 - 4/7"")

 

 Scenario 3: Switching from Weekly to Monthly View


Given I am on the Forecast Editor page viewing weekly parking metrics
When I change the Time Period dropdown to ""Monthly View""
Then the Parking Metrics card should update to display:
- A row for each month in the quarter (April, May, June)
- Monthly average parking counts and occupancy metrics
- The card header should change to ""Monthly average parking counts and occupancy metrics""
- Months containing actual data should show the actual monthly averages

 

 Scenario 4: Switching to Quarterly View


Given I am on the Forecast Editor page viewing parking metrics at any granularity
When I change the Time Period dropdown to ""Quarterly View""
Then the Parking Metrics card should update to display:
- A single row for the entire quarter (Q2 2025)
- Quarterly average parking counts and occupancy metrics
- The card header should change to ""Quarterly average parking counts and occupancy metrics""
- If the quarter contains actual data, it should be incorporated into the quarterly averages

 

 Scenario 5: Editing Data at Daily Granularity

Given I am on the Forecast Editor page viewing parking metrics at Daily granularity
When I edit a value in the Parking Metrics card
Then the change should be saved at that granularity level
- If attempting to edit at a higher granularity (e.g., monthly), the system will not allow editing
- The edited cell should be highlighted to indicate it has been modified
- Related calculated fields (like External Revenue) should update automatically

 

 Scenario 6: Persistence of Edits Across Granularity Changes


Given I have edited parking metrics data at Daily granularity level
When I switch to a different granularity level and then back to the original level
Then my edits should be preserved and visible in the Parking Metrics card



"	https://v0.dev/chat/customer-forecast-software-2HRTUgLLdLU
1283	Forecasting	"As an Admin, I want the system to automatically refresh certain Customer fields so that the Customer data is kept updated

User Flow:
Step 1: The Admin uses the 'Add a Customer' feature to add a new customer to PowerBill.
Step 2: The system fetches data from the Dataverse (locally stored) and uses it to create the Customer record.
Step 3: Changes are made to the Master_Non_Financial table in EDW for one or more of the identified fields.
Step 4: A timed job runs every 24 hours to pull updated data from the Master_Non_Financial table in EDW.
Step 5: The system updates the Master Customer data in Dataverse based on the refreshed data.
Step 6: The system updates the Customer Site in PowerBill with the refreshed data from Dataverse.
Step 7: Only fields on the General Info tab are updated during the refresh process. Fields in the Multiple Invoices section remain unaffected.


Fields that require updating if a change is made to underlying table in EDW
Source Table: The Master_Non_Financial table in EDW is the source for the refresh process.
Refresh Frequency: The timed job runs every 24 hours to ensure data is up-to-date.
Scope of Updates: Only fields on the General Info tab are updated during the refresh process.
Site ID
GL String
Site Name
Total Rooms Available
Total Available Parking
District
**District Manager (from [DM] column in Master_Non_Financial table)
Start Date (from [FIRST_WORKED_DATE] column in Master_Non_Financial table)
Close Date (from [LAST_WORKED_DATE] column in Master_Non_Financial table)
SVP Region (from [SVP_REGION] column in Master_Non_Financial table)

Net new fields to be added to the Customer Details screen (see mockup):
District Manager (from [DM] column in Master_Non_Financial table)
SVP Region (from [SVP_REGION] column in Master_Non_Financial table)
Legal Entity (from [LEGAL_ENTITY] column in Master_Non_Financial table)
PL Category  (from [PL_CATEGORY] column in Master_Non_Financial table)
COG Segment (from [COG_SEGMENT] column in Master_Non_Financial table)
SVP Region (from [SVP_REGION] column in Master_Non_Financial table)
Business Segement (from [BUSINESS_SEGMENT] column in Master_Non_Financial table)



Example values from new customer filter fields:
LEGAL_ENTITY
Encore Hospitality Services, LLC
Snagaspace, LLC
UPP Global
N/A
Towne Park, LLC.
Towne Park Systems LLC.
Mile Hi Valet Service, Inc.
Elite Family of Companies, LLC
E&B Parking Services, Inc.
EasyParkFly, LLC

 
PL_CATEGORY
Ops Overhead
G&A Topside
Corporate G&A
SAS
Ops Topside
Ops G&A
Exc from EBITDA
Operations
Board Contingency

 
COG_SEGMENT
Acquisition
Base
NULL
Lost PY
New PY
Lost CY
New CY


SVP_REGION
East
T-Park
NULL
West
Central

 
BUSINESS_SEGMENT
Residential
T-Park
Healthcare
NULL
Hospitality
Commercial

 



"	"Scenario 1: Add a New Customer
Given the Admin uses the 'Add a Customer' feature,
When the system creates a new Customer record,
Then the system should fetch data from the Dataverse and populate the Customer fields.

Scenario 2: Timed Job to Refresh Data
Given the system runs a timed job every 24 hours,
When changes are detected in the Master_Non_Financial table for any of the identified fields,
Then the system should update the corresponding fields in the Master Customer data in Dataverse.

Scenario 3: Update Customer Site with Refreshed Data
Given the system has refreshed the Master Customer data in Dataverse,
When the Customer Site data is updated in PowerBill,
Then only the fields on the General Info tab should be updated, and fields in the Multiple Invoices section should remain unaffected.

Scenario 4: Include New Field (SVP Region) in Refresh Process
Given the SVP Region field is added to the Customer record,
When the timed job detects changes in the [SVP_REGION] column of the Master_Non_Financial table,
Then the system should update the SVP Region field in the Customer record.

Scenario 5: Include Start Date and Close Date in Refresh Process
Given the Start Date and Close Date fields are part of the Customer record,
When the timed job detects changes in the [FIRST_WORKED_DATE] and [LAST_WORKED_DATE] columns of the Master_Non_Financial table,
Then the system should update the Start Date and Close Date fields in the Customer record.

Scenario 6: Include District Manager in Refresh Process
Given the District Manager field is part of the Customer record,
When the timed job detects changes in the [DM] column of the Master_Non_Financial table,
Then the system should update the District Manager field in the Customer record.

Scenario 7: No Impact on Multiple Invoices Section
Given the system refreshes Customer data,
When the refresh process updates fields,
Then fields in the Multiple Invoices section should remain unchanged.

Scenario 8: Fields that are refreshed should not be editable
Given the system refreshes Customer data,
When an Admin user observes the fields,
Then fields that are refreshed regularly should not be editable by any user in Powerbill

Scenario 9: New fields added to Customer Details
Given I am on the Customer Details, General Info screen
When I view the list of fields
Then I see the below new fields added per the mockup:
District Manager (from [DM] column in Master_Non_Financial table)
SVP Region (from [SVP_REGION] column in Master_Non_Financial table)
Legal Entity (from [LEGAL_ENTITY] column in Master_Non_Financial table)
PL Category  (from [PL_CATEGORY] column in Master_Non_Financial table)
COG Segment (from [COG_SEGMENT] column in Master_Non_Financial table)
SVP Region (from [SVP_REGION] column in Master_Non_Financial table)
Business Segement (from [BUSINESS_SEGMENT] column in Master_Non_Financial table)



"	https://v0.dev/chat/form-field-modifications-z6O8hCiHHMV
1676	Forecasting	"As an Account Manager, I want to initialize my Parking Rates forecast using Budget data, so that I save time and follow an efficient forecasting process

When an Account manager opens the Parking Rates tab of their forecast, it should initialize with values derived from the Budget data as a starting point for the forecast.  The AM will make updates to the data as needed using the form, then when the form is Saved it is considered the new forecast.  Subsequent visits to the Parking Rates tab should load the Forecast data as per the last Save.



User Flow
Step 1: The Account Manager logs into the forecasting application.
Step 2: The Account Manager navigates to the Parking Rates tab of their forecast.
Step 3: On the first visit to the Parking Rates tab, the system automatically initializes the forecast with values derived from the Budget data.
The system calculates the Budgeted Rate for each parking stat using the formula:
{Budgeted Rate} = {{Total Budgeted Revenue for Main Account}\{Budgeted Vehicle Count for Main Account}} 
Step 4: The Account Manager reviews the initialized forecast values and makes updates as needed using the provided form.
Step 5: The Account Manager clicks the Save button to save their changes.
The updated values are stored as the new forecast.
Step 6: On subsequent visits to the Parking Rates tab, the system loads the last saved forecast data instead of reinitializing with Budget data.
Step 7: The Account Manager can continue to make updates and save changes as needed.


Formula to find the Budgeted Rate per Main Account:
(Total Budgeted Revenue for Each Main Account) / (Balance of each Main Account)

What is the query to find budgeted parking rates?

First, we find the total budgeted monthly revenue for the parking stat:

SELECT SUM([BALANCE]) AS 'VALET_DAILY_REVENUE'
  FROM [TP_EDW].[dbo].[BUDGET_FINAL]
  WHERE [PERIOD] = '202502'
  AND [COST_CENTER] = '0170'
  AND [MAIN_ACCOUNT] = '9411'
-----------------------------------------------------
VALET_DAILY_REVENUE
28054.08000


Then we find the budgeted vehicle count for the parking stat:

SELECT SUM([BALANCE]) AS 'VALET_DAILY_COUNT'
  FROM [TP_EDW].[dbo].[BUDGET_FINAL]
  WHERE [PERIOD] = '202502'
  AND [COST_CENTER] = '0170'
  AND [MAIN_ACCOUNT] = '9510'
-----------------------------------------------------
VALET_DAILY_COUNT
573.00000


Budgeted Rate = VALET_DAILY_REVENUE / VALET_DAILY_COUNT
Budgeted Rate = 28054.08000 / 573.00000
Budgeted Rate = $48.96 per Valet Daily parking sale in February 2025 for Site 0170


In the above query, the MAIN_ACCOUNT column represents the code for each stat.  The Parking Stat to MAIN_ACCOUNT value map is below:
Main Account VALUES
Parking Stat	MAIN_ACCOUNT	Type	MAIN_ACCOUNT	Type	Parking Stat
Valet Daily Revenue	9411	Revenue	9510	Vehicles	Valet Daily
Valet Overnight Revenue	9412	Revenue	9520	Vehicles	Valet Overnight
Valet Monthly Revenue	9413	Revenue	9530	Vehicles	Valet Monthly
Self Daily Revenue	9414	Revenue	9550	Vehicles	Self Daily
Self Overnight Revenue	9415	Revenue	9560	Vehicles	Self Overnight
Self Monthly Revenue	9416	Revenue	9570	Vehicles	Self Monthly


Not used in Parking Rates		
External Revenue	9410	Revenue
Valet Comps	9540	Vehicles
Self Comps	9580	Vehicles
Occupied Rooms	9440	Other



"	"Scenario 1: Initialize Parking Rates Forecast with Budget Data
Given the Account Manager opens the Parking Rates tab for the first time,
When the system loads the tab,
Then the forecast should be initialized with values derived from the Budget data using the formula:
[Budgeted Rate] = [Total Budgeted Revenue for Main Account] / [Budgeted Vehicle Count for Main Account]

Scenario 2: Save Updated Forecast Data
Given the Account Manager has updated the forecast values in the form,
When the Account Manager clicks the Save button,
Then the system should save the updated values as the new forecast.

Scenario 3: Load Last Saved Forecast Data
Given the Account Manager has previously saved forecast data,
When the Account Manager revisits the system and Parking Rates tab,
Then the system should load the last saved forecast data instead of reinitializing with Budget data.

Scenario 4: Handle Missing Budget Data
Given the Budget data is incomplete or missing for a specific parking stat,
When the system attempts to initialize the forecast,
Then the system should display a zero in place of the missing values."	