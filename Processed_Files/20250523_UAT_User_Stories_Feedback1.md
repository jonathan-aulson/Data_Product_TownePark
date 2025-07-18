User Story	Acceptance Criteria
As a Billing Manager user, I want to log into the app & see a list of Fixed Fee & Per Labor Hour customers	"Given a user who is in the Allata AD, when I click the button to Login using SSO, then I land on a screen showing a list of Fixed Fee & Per Labor Hour Customers
Given a user who has successfully logged in, then the screen will display a list of Fixed Fee & Per Labor Hour Customers including the Site ID & Customer Name for each."
As a Billing Admin I want to select whether to generate invoices one month in advance or for the preceding month So that I can manage cash flow more effectively.	"Because the invoices are generated in a separate process we still have not implemented, it's not possible to validate the difference between the two billing types.
What we can validate for this story is that the Billing Type of Arrears or Advanced is displayed in the Contract Details tab and editable where appropriate."
As a Billing Admin I want to indicate annual increments based on the contract’s terms (e.g., CPI or fixed percentage) So that the contract details will govern when an invoice is increased and by what percentage.	"Because the invoices are generated in a separate process we still have not implemented, it's not possible to validate the incrementing logic.
What we can validate for this story is that the two fields are at least displayed in the Contract Details tab."
As a Billing Admin I want to configure Fixed Fee invoices based on predefined rates and service dates So that the contract details will drive accurate and timely billing without manual entry.	"Given a Fixed Fee contract details building block that is enabled, when I select to Add a Fixed Fee, then I'm presented with a list of services which I may select to add and set their fee
Given a Fixed Fee service that has been added to the contract details, when I am presented with the service, I may edit the Display Name, the GL Code, and the Fee (or choose to Delete the service from the contract setup)"
As a Billing Manager, I want the ability to see a detailed view of the Customer so that I can look up relevant information	Given a logged in user when they click on View Details in the Customer list, then a screen displays the General Information view of the Customer including Customer Name, Location ID, and Account Manager name, and Billing Contact Name & Info (2 fields)
As a Billing Manager, I want to be able to set the values for variables which apply to a Per Labor Hour Contract so that those deal types can be invoiced from within the application	"Given a Customer Site with Per Labor Hour contract type, when the invoice is viewed, then the billing type will always display Arrears
Given a Customer Site with Per Labor Hour contract type, when the Billing Manager configures the contract, then they are required to select which Non-Salaried (at least 1) & Salaried jobs (no minimum) associated to the Site and set their Display Names and both their Regular and Overtime Rates (Display Name, Rate, and Overtime must not be empty)
Given a Per Labor Hour Contract Details tab, when a Billing Manager selects the Payment Terms, those terms will display on the Billing Statement Invoice
Given a Per Labor Hour Contract Details tab, when a Billing Manager selects the 'Due by _____' Payment terms, any text entered will be displayed alongside 'Due by' on the Billing Statement Invoice 
Given a Per Labor Hour Contract Details tab, when a Billing Manager enters any text in the 'PO Number' field, then any text entered will be displayed alongside 'Due by' on the Billing Statement Invoice
Given a Per Labor Hour Contract Details tab, when a Billing Manager selects to 'Add Position', then another row will appear which will allow the Selection of a Job
Given a Per Labor Hour Contract Details tab, when a Billing Manager selects a Job, then the Display Name will default to the name of the job but remain editable
Given a Per Labor Hour Contract Details tab, when a Billing Manager selects a Position, then the Rate and Overtime fields will allow num char input (numbers and decimals only)
Given a Per Labor Hour Customer Site, when a Billing Manager views the Contract Details tab, then the Increment Month will default to January but remain editable
Given a Per Labor Hour Customer Site, when a Billing Manager views the Contract Details tab, then the Increment % will allow for number and decimal input
Given a Per Labor Hour Customer Site, when a Billing Manager views the Contract Details tab, then the CPI checkbox will default to non-checked however if checked will be persisted to the database and be reportable in the future (report will want to see Increment Month, Increment %, CPI checkbox, and Notes)
Given a Per Labor Hour Customer Site, when a Billing Manager views the Contract Details tab, then the Advanced/Arrears option will not be editable
Given a Per Labor Hour Customer Site, when a Billing Manager adds a note on the Contract Details tab, then the Note will be saved permanently to the Contract Details tab."
As a Billing Manager, I want the favicon and browser tab title to be meaningful for the Towne Park Billing app so that I'm not confused by 'Vite + React' and unknown iconography.	"Favicon should be the graphic portion of the TP logo (resembles an abstract person drawing)
Tab title should say ""Towne Park | Billing"""
As a Billing Manager, I want to see the invoice details for each invoice within a billing statement, so that I can ensure the details are correct	"Invoice Details screen
Invoice number (four digit site number, two digit year, two digit month.  For sites that have split invoices, the first invoice should show the typical invoice number, then following invoices should should show the typical invoice number followed by a dash and then incrementing number.... e.g. 06072406, 06072406-1, 06072406-2, etc)
Invoice date - 
for Per Labor Hour contracts, invoice date will always be the last day of the service month (preceding month) as Per Labor Hours are always billed in Arrears.  
For Advanced billing, the invoice date will always be the first day of the month preceding the service month (e.g. if service month is Aug, then Invoice Date is July 1st.)
Payment Terms - from contract details
Amount Due

Given an Invoice link on the Billing Statement details screen, when a user clicks the link, then the Invoice details are displayed

"
As a Billing Manager, I want to view the details of a billing statement so that I can review the contents	Given a Billing Statement row on the Billing Statement tab, when the expand icon is clicked, the list of documents contained in the statement is displayed
As a Billing Admin I want to optionally choose to include specific supporting documents in the billing statement so that I can control which supporting documents are ultimately sent to the customer.	"Given a Customer contract details page with Per Labor Hour enabled, when the checkbox for 'Hours Backup Report' is unchecked, the system will not include that supporting document in the Billing Statement
Given a Customer contract details page, when the Per Labor Hour deal type changes from disabled to enabled, the checkbox for 'Hours Backup Report' should automatically appear checked so that the system will include that supporting document in the Billing Statement by default for this deal type"
As a Billing Manager, I want to see a list of Billing Statements for a Customer organized by date, so that I can choose which Statement to open for view	"Given a customer site in detail view, when I click on the Billing Statements tab, then a table of Billing Statements is displayed
Given a table of Billing Statements, then up to previous 12 billing statements will display per page"
As a Billing Admin, I want to be able to input Per Occupied Room contract details in a specific customer Site, so that I may determine the mechanics of the invoice	Given the Billing Manager is logged into the billing system, when they navigate to the specific customer site's billing configuration section, then the system allows them to input the rate per occupied room during site setup.
As a Billing Manager, I want the ability to edit some General Info of the customer site, so that I can keep contact information up to date	"Editable Fields:
Given the user is on the General Info page, when the user clicks the ""Edit"" button, then the Customer Name, Billing Contact Name, Account Manager, and Billing Contact Email fields become editable
Save Changes:
Given the fields are editable, when the user makes changes to the Billing Contact Name, Account Manager, or Billing Contact Email AND clicks the ""Save"" button, then the updates are saved and reflected in the General Info section
Validation and Feedback:
Given the user is editing the fields, when invalid information is entered (e.g., incorrect email format), then the system should provide appropriate validation messages (please enter a valid email address) and prevent saving until the error is resolved
Cancel Changes:
Given the user is editing the fields, when the user clicks the ""Cancel"" button OR navigates away from page without Saving, then the fields revert to their original values and no changes are saved"
User Story	Acceptance Criteria
As a Billing Manager, I want the billing app to exist in the Towne Park Azure environment	"User must be connected to VPN

URL for Towne Park Azure - Master site: https://ambitious-grass-00554670f.5.azurestaticapps.net/"
"As a Billing Admin, I want the ability to Manage a threshold/deviation to help determine invoices that need review

"	"Admin View Access:
Given a user with admin role permissions
When accessing the admin view by clicking on their username abbreviation in the upper right hand corner of the application screen and then selecting the menu option for ""Revenue Review Threshold""
Then the user should see a list of all sites with pagination
Editable Thresholds:
Given the admin user is in the admin view
When selecting a site to edit
Then the Deviation % and Deviation $ fields become editable
Bulk Edit Functionality:
Given the admin user selects multiple sites for editing
When modifying the Deviation % and Deviation $ values
Then the changes should be applied to all selected sites
Save Confirmation:
Given an admin user has made edits
When attempting to save the changes
Then the system prompts for confirmation before saving
Read-Only for Non-admin Users:
Given a non-admin user accesses the Forecast Deviation page
When viewing the page
Then all fields should be read-only
Contract Details tab:
Given an admin viewing the Contract Details tab of a single Customer
When viewing the page
Then they have the ability to edit the Forecast % and Forecast Amount for a single Customer"
As an Admin, I want the ability to select invoice line items and designate which invoice "group" (invoice) they should appear on, so that I can customize invoice presentations to meet client requirements. The default behavior should include all line items on a single invoice unless specified otherwise.	"1. **Default Grouping:**
   - **Given** a new invoice is generated,
   - **When** the invoice is created,
   - **Then** all line items should be included on a single invoice/group by default.

2. **User Selection for Invoice Grouping:**
   - **Given** an Admin needs to split line items across multiple invoices/groups,
   - **When** the Admin selects specific line items and designates a different invoice ""group"" for them,
   - **Then** the selected line items should be moved to the specified invoice group while the remaining items stay on the original group.

3. **Invoice View:**
   - **Given** an Admin has assigned line items to specific invoice/groups,
   - **When** the invoice is viewed,
   - **Then** it should display the line items on the designated group correctly,
"
As a Billing Manager, I want the current month's Billing Statement for all Sites to appear in a single list so that the billing review process may be streamlined	"1. **Display All Generated Statements:**
   - *Given* the Billing Manager is on the Billing Statements page
   - *When* the page loads
   - *Then* the system should display the current month's generated billing statements for all sites in a single list with pagination
  
 - *Given* the Billing Manager is on the Billing Statements page
   - *When* the page loads
   - *Then* the system should allow the user to Search within the list and also to set a filter based on Status

2. **Data Accuracy:**
   - *Given* the billing statements are displayed
   - *When* the Billing Manager reviews them
   - *Then* all details (site ID, customer name, billing amounts, etc.) must be accurate and up-to-date as of time of statement generation

3. **Performance Standards:**
   - *Given* the number of sites is large
   - *When* the billing statements list is generated
   - *Then* the page load time should not exceed acceptable performance benchmarks"
As a Billing Manager, I want the ability to manually generate Billing Statements at any time for fixed fee customers, ensuring that customers can be billed based on their specific Contract configurations. After generation, I should be able to add Ad Hoc line items to customize the invoices further before finalizing them.	"Given the Billing Manager is on the Customer list page,
When they enter a Customer Name or Site ID or other info in the search bar,
Then the system should filter and display the corresponding customer(s) swiftly.

Given a Billing Manager selects a customer,
When they click on the 'Generate Invoice' action icon,
Then the system should generate a Billing Statement based solely on the customer's Fixed Fee configuration.

Given a Billing Statement is generated,
When the Billing Manager decides to add Ad Hoc line items,
Then they should be able to do so seamlessly and save the updated invoice.

Given all modifications are made to an invoice,
When the Billing Manager saves the invoice,
Then the system should ensure all changes are stored, and the invoice is marked as ready for further processing."
As a Billing Admin, I want the system to store a map of COA codes to invoice line items for the corresponding GL journal entries that need to be pulled/pushed to Microsoft GP	"All Fixed Fee services are mapped to their individual COA number as currently listed in FF building block (as part of this user story, we need to remove the fields in the Contract Details screen which allow for on-the-fly mapping to GL accounts)
All other deal types have a single account number mapping for all invoice line items to be configured in the Contract Details, per deal type, per below list;
Per Labor Hour - 4791
Per Occupied Room - 4791
Revenue Share - 4790
Management Agreement - 4791
Hybrid - map the applicable deal type invoice items to the mapping represented above
Bell Service Fee: One exception to the above is the 'Bell Service Fee' which is a single line item that may be configured on Per Occupied Room and/or Revenue Share deal structures.  This item is being built as User Story 115. This individual item must map to GL account 4795
Ad Hoc Line Items Added During Review
Client Paid Expenses 
This is a drop down of choices which all post to a 7000-7999 account range (list is static however Display Name of line item is editable once selected)
MAIN ACCT                    ACCOUNT
7010                                 Bank Fees
7011                                 Credit Card Fees
7017                                 Computer Services
7019                                 Contract Labor
7026                                 Equipment Cost
7045                                 Employee Relations
7070                                 Equipment Rental - Vehicles
7072                                 Fines & Penalties
7075                                 Fuel - Vehicles
7090                                 Internet Expenses
7095                                 License & Permits
7101                                 Service Recovery
7105                                 Meals & Entertainment
7110                                 Miscellaneous
7113                                 Office Supplies
7115                                 Outside Services
7125                                 Personnel Recruitment
7130                                 Postage
7170                                 Rents - Parking
7171                                 Rents - Office and Other
7175                                 Repairs & Maintenance
7178                                 Repairs & Maintenance - Vehicle
7180                                 Signage
7185                                 Supplies & Equipment
7200                                 Telephones
7205                                 Tickets & Printed Material
7220                                 Uniforms
7225                                 Utilities
Reimbursable Expenses
Additional billable amount which may be added as an invoice item during review
post to 4792
Miscellaneous Items
Additional invoice line item which may be added during review and could result in either a credit or an increase to the invoice total due, based on whether the Amount value is positive or negative
Help Text ""A negative amount entered will credit the invoice."" 
posts to GL account 4790"
As a Billing Admin, I want the Customer Contract Details to be organized and grouped logically so that information is easier to locate	"Given a Contract Details page, when the user views the list of fields, Payment Terms, Billing Type and PO Number will be grouped under a header ""Billing Setup"" with a divider line
Given a Contract Details page, when the user views the list of fields, Deviation Percentage, Deviation Amount will be grouped under a header ""Revenue Review Threshold"" with a divider line
Given a Contract Details page, when the user views the list of fields, Increment Month, Increment Percentage, and Consumer Price Index will be grouped under a header ""Automatic Contract Escalator"" with a divider line"
As a Billing Manager, I want to enhance the Payment Terms with options, so that all invoice payment variations are accounted for in the drop down list	"Given a Contract with no Payment Terms saved and 'Select' visible in the Payment Terms dropdown, when an Admin user attempts to Save the Contract, a message appears saying ""Please select Payment Terms in order to Save'
Given a Payment Terms dropdown, when an Admin user selects 'Due in', then an additional dropdown appears with the numbers 1 - 90 for the user to select, and following the selection the text 'Days' (so that the completed selection will read  ""Due in 20 Days"" as an example)
Given a Payment Terms dropdown, when an Admin user sees the options, there will be an option to choose ""Due on Receipt"""
As a Billing Manager, I want the ability to add line items to the current month's invoices, so that the invoice may be corrected as needed	"Miscellaneous Billing Items:
Given a need to add a miscellaneous billing item,
When the user inputs a free text description and amount,
Then the item should always map to 4790,
And the invoice must reflect the update in the Total Amount.
Client Paid Expenses:
Given a need to add a client paid expense,
When the user selects an expense from the dropdown and inputs an amount,
Then the item must post to an appropriate account within the 7000-7999 range,
And the invoice must summarize these expenses under the line item ""Less Client Paid Expenses.""
Reimbursable Expenses:
Given a need to add a reimbursable expense,
When the user inputs a positive amount,
Then the item must post to account 4792,
And the total must be limited to one entry per invoice.
Help Text for Miscellaneous Items:
Given the need to inform users about crediting an invoice,
When a user enters a negative amount for a miscellaneous item,
Then help text should indicate ""Negative value will credit the client's invoice.""
Multiple Invoices Management:
Given an invoice with multiple groups,
When the user selects an invoice group to edit (add line items into),
Then the items should appear on the selected invoice group correctly."
As a Billing Admin, I want the system to include the invoice header & footer information on invoices so that our customers will have the info upon receipt	"1. Bill To Information:
   - *Given* the invoice system has access to the Master NonFinancial tables,
   - *When* an invoice is generated,
   - *Then* the `SiteName` and `Address` are pulled from the Dataverse tables for Customer and displayed in the Bill To section of the invoice.

2. Attention Configuration:
   - *Given* the General Info in Contract Details tab (Billing Setup section),
   - *When* configuring the billing information,
   - *Then* the ""Attn: Accounts Payable"" should default to ""Attn: Accounts Payable"" and be editable by Admin users.

3. Towne Park Logo and Address:
   - *Given* the system database,
   - *When* an invoice is generated,
   - *Then* the Towne Park logo and address are displayed as per the static configuration stored in the database.

4. Invoice Number Format:
   - *Given* an invoice is generated,
   - *When* generating the invoice number,
   - *Then* it follows the convention of [SiteID]-[YYYYMM]-[InvoiceGroup] (e.g., [0500]-[202408]-[01])."
"The General Info tab of the Customer will be enhanced and reorganized with 2 new section headers, ""Account Mgmt"" and ""Billing Info"" and the following new fields.

General Info (top of tab)
Site ID
GL String - format: ""NN-NN-NNNN-""
Site Name
Address - string

Account Mgmt (section label only)
District - string 
Account Manager
Account Manager ID - whole number format

Billing Info (section label only)
Billing Contact Email
Invoice Recipient (NOTE: the existing field ""Billing Contact Name""was given a new label)
Start Date - date format YYYY-MM-DD
Close Date - date format YYYY-MM-DD

We need to enhance the Contract Details with the following fields (In General Setup section, below SiteID);
General Setup (below Site ID)
Contract Type - String (source: ""P_CONTRACT_TYPE"")
Deposits - format: Y or N values only (represents Yes or No regarding whether the site makes deposits of collected money) (source: ""TP_DEPOSITS""A"	"Given the user is in the Customer General Info section,
When they view the list of fields,
Then the system should display the list of new fields formatted as defined in above description.

Given the user is in the Customer General Info section,
When they input data into new fields,
Then the system should save and display this data accurately (all fields except SiteID are editable by Admin).

Given the user is in the Customer General Info section,
When the field previously labelled 'Billing Contact Name' is viewed by the user,
Then it should read as 'Invoice Recipient'.

Given the user accesses the Contract Details section,
When they view the General Setup fields,
Then they should see 'Contract Type' and 'Deposits' displayed correctly.

Given the user is in the Contract Details section,
When they input data into new fields,
Then the system should save and display this data accurately (all fields except SiteID are editable by Admin)."
"As an admin user, I want to be able to add a new Customer Site in the Billing App by entering a Site ID number. The system should fetch the available customer data from the Enterprise Data Warehouse (DW) and populate the available data into the new Customer Site. 
"	"Given the admin user is authenticated and on the ""Customers"" list
When they view the upper right corner of screen,
Then the admin should have a button to 'Create a New Customer' available and enabled for use

Given the Non-Admin (Billing Manager) user is authenticated and on the ""Customers"" list
When they view the upper right corner of screen,
Then the user should not see a button to 'Add a New Customer' available (or it is disabled for use)

Given the admin user is authenticated and on the ""Add a Customer "" modal,
When they enter a valid Site ID,
Then the system should fetch the customer data from the DW.

Given the system does not find a matching Site ID, -OR- GL String, -OR- Address;
When the system attempts to add the Customer,
Then the user should see an error message that is meaningful

Given the admin has entered a valid Site ID and the system is able to retrieve the minimum required information,
When they confirm the creation,
Then the new Customer Site should be successfully saved in the Billing App with values populated from EDW."
We aim to enhance the Statements list within the invoicing application to improve usability and visibility of invoice details. This includes implementing an accordion control for easier navigation, adjusting actions across the interface, and adding functionalities such as a multi-select status filter and a new column for Billing Cycle information.	"Given a user is viewing the Statements list,
When they click on an accordion control,
Then the system should expand to reveal all related invoice groups under the selected statement without errors.

Given a statement is expanded,
When the user wants to modify invoice details,
Then the ""Edit"" action should be available within the expanded invoice group row to facilitate direct editing.

Given the updated Statements list,
When a user navigates it,
Then they should see no ""Send"" icon present in the current interface version.

Given the presence of a 'Status' filter,
When the user interacts with it,
Then it must allow for multi-selection, enabling them to view statements matching one or multiple status criteria.

Given a list of Billing Statements or the Billing Statements tab in Customer Details,
When displayed,
Then each should have a 'Billing Cycle' column correctly indicating its TP billing cycle using the format YYYY-MM."
As a Billing Manager, I want the current month's invoices to automatically pull hours worked by job from the SQL data warehouse. This data will be used to calculate Per Labor Hour invoices to ensure the invoices are calculated correctly and efficiently.	"Given the system retrieves the hours worked without errors,
When the process completes,
Then it should sum the hours worked by job, multiply by either Regular or Overtime Rate for the service period, and list those items on invoices as configured in the customer contract details

Given the invoices are generating,
When the processing is complete,
Then the Billing Statement should be saved in the system marked as 'Approved'.

Given the system encounters any issue during data retrieval or calculation,
When an error is detected,
The Billing Statement that encounters an error is aborted and the meaningful Error message is logged "
As a Billing Manager, I want the current month's invoices to automatically pull revenue spreadsheet data from the SQL data warehouse. This data will be used to calculate Per Occupied Room invoices, ensuring these invoices are accurately calculated and reflect the current revenue settings.	"Given the system retrieves the number of occupied rooms for the site without errors,
When the process completes,
Then it should multiply by the Rate configured in Contract details, and list the line item on the appropriate invoice group

Given the invoices are calculated,
When the processing is complete,
Then the Billing Statement should be saved in the system marked as 'Approved'.

Given the system encounters any issue during data retrieval or calculation,
When an error is detected,
The Billing Statement that encounters an error is aborted and the meaningful Error message is logged 
"
As a Billing Manager, I want the ability to generate Billing Statements in bulk and see the status of all current month's Billing Statements. This will ensure efficiency in the billing process and allow for better management and organization of billing activities.	"Given the Billing Manager is logged into the system with no Customers selected,
When they view the ""Bulk Invoice Generation"" button,
Then the button is not usable.

Given the Billing Manager is logged into the system with more than one Customer selected,
When they view the ""Bulk Invoice Generation"" button,
Then the button is usable to begin bulk generation.

Given the Billing Manager is logged into the system,
When they make a multi-selection of customer sites and click the ""Bulk Invoice Generation"" button,
Then the system should initiate the bulk process.

Given the bulk generation process is running,
When the process completes a Billing Statement,
Then the Billing Statement should be visible and have a status in both the Statements view and Billing Statements tab

Given the bulk generation is complete,
When the Billing Manager navigates to the current month's Billing Statements,
Then the statements should be correctly categorized according to the status

Given a billing statement which is listed,
When a user views the list,
Then they should be able to multi-select the status filter and search and sort statements by each column for better organization and tracking.

Given the system encounters any issues during the bulk process,
When an error occurs,
Then the record encountering an error should be skipped and the system should log the error using a meaningful error message to assist in troubleshooting"
User Story	Acceptance Criteria
"As a Billing Manager, I want to be able to input/edit Revenue Share details in a specific customer Site (different splits at different cutoff tiers), so that I may change the mechanics of the invoice
"	"Given the user is on the contract setup page, 
when they select a site and enable the Revenue Share building block, 
then the system should prompt them to define share percentage settings.

Given the user is configuring threshold tiers, 
when they input a share percentage, 
then the system should require threshold accumulation settings and at least two share percentage value with automatic two-digit decimal formatting, appending "".00"" when no decimal is provided.

Given the user wants to set a threshold amount, 
when they input a dollar value, 
then the system should correctly format the value with a dollar sign and two decimal places, appending "".00"" when no decimal is provided.

Given the user is customizing revenue codes for a tier, 
when they deselect revenue codes, 
then the system should ensure that all revenue codes must be mapped to a tier and prompt the user to allocate remaining codes to a new tier if necessary.

Given a contract with Threshold Structure configured,
When the user sets the Tier amounts
Then the highest Tier will always show ""infinity"" as the Amount

Given a contract with multiple Threshold Structures,
When the user associates Revenue Codes to a structure,
Then all revenue codes must belong to exactly one structure (all codes must be associated somewhere, and no revenue codes may belong to more than one structure)"
As a Billing Manager, I want the system to pull revenue data from EDW and use it to calculate a basic Revenue Share billing statement, so that these deal types have a foundational calculation upon which to add complexity	"Given the billing statement generation is triggered for a customer site with Revenue Share building block items,
When the system initiates a process to pull data from the SQL data warehouse,
Then it should retrieve the total net external revenue for the specified service period and multiply by the Share Percentage to calculate the invoice line-item Amount

Given a billing statement with calculated invoices,
When there are no other building blocks configured,
Then the statement should be marked as 'Ready to Send.'

Given there are additional building block items to be calculated,
When the system processes the initial calculations,
Then it should continue fetching data and calculating line items per the requirements for those building blocks.

Given the billing statements and invoices are generated,
When the user accesses the Statements list or Billing Statements tab,
Then they should be able to view and/or edit the billing statement and invoices."
"The billing system should generate revenue share invoices that include a single line item with a specific title, description, and amount. This line item should accurately reflect the billing calculations, showing the total base used for fee calculation and the total fees after adjustments for revenue share tiers and thresholds.

User Flow:
Initiate Invoice Generation:
The Billing Manager initiates the generation of invoices for customer sites with Revenue Share agreements.

Fetch Data from SQL Data Warehouse:
The system retrieves the NetExternalRevenue for the relevant service period from the SQL data warehouse for each site.

Perform Revenue Share Calculations:
The system calculates the total fees based on the configured variables, including multiple threshold tiers/structures.

Create Invoice Line Item:
A line item is added with:
Title: ""Towne Park Fees for Services""
Description: ""Total Base for Fee Calculation: {X}"" (where {X} is the Monthly NetExternalRevenue)
Amount: ""{Y}"" (where {Y} is the total fees calculated)

Generate Invoice:
The system generates the invoice, including the configured line item, for review and distribution."	"Given the invoice generation process is initiated, 
when the system retrieves the Monthly NetExternalRevenue from the SQL data warehouse, 
then it should correctly calculate the total fees inclusive of all revenue share calculations to be used in the invoice line item.

Given the invoice is generated, 
when viewing the line item, 
then it should display a title of ""Towne Park Fees for Services,"" a description of ""Total Base for Fee Calculation: {X},"" and an amount ""{Y},"" accurately reflecting the calculations.

Given multiple threshold tiers or structures are involved, 
when fees are calculated, 
then the system should incorporate all necessary thresholds accurately to reflect in the total amount ""{Y}"" in the invoice line item.
"
As a Billing Manager, I want the current month's invoices to automatically consider increments in Fixed Fee contract calculations	"For example, 
GIVEN a customer with a Per Labor Hour line item having a Regular rate of $10.00 / Overtime rate of $20.00 
IF customer has an Increment Percentage set (e.g. 10%).
AND the Increment Month = Current Billing Statement Service Period,
THEN at the time of Billing Statement generation, they system should;
FIRST update all Rate amounts to increase them by the Increment Percentage (making this example $11.00 and $22.00 respectively) 
THEN calculate the invoice amounts using these new rates in combination with the data warehouse data in order to generate the invoice amounts.  


Given a Fixed Fee Billing Statement is created,
When the Increment Month = Service Period,
Then the Amounts or Rates for all configured fees should be increased by the Increment Percentage in Contract Details
AND the Billing Statement & Invoice(s) should reflect the increased amounts"
As a Billing Manager, I want the current month's invoices to automatically pull revenue spreadsheet data from SQL data warehouse and use it to caclulate Revenue Share invoices, so that these invoices are calculated correctly.	"Given the billing statement generation is triggered for a customer site with Revenue Share building block items,
When the system initiates a process to pull data from the SQL data warehouse,
Then it should retrieve the total net external revenue for the specified service period and revenue codes associated with the tier.

Given the total net external revenue is retrieved,
When the revenue is within the CumulativeThreshold,
Then the system should calculate the Billing Statement Amount by multiplying the TotalNetExtRev by the RevSharePercentage configured for that tier.

Given the total net external revenue exceeds the CumulativeThreshold,
When calculating the Billing Statement Amount,
Then the system should apply the next Threshold Share Percentage to the exceeding amount.

Given a billing statement with calculated invoices,
When there are no other building block items configured,
Then the statement should be marked as 'Ready to Send.'

Given there are additional building block items to be calculated,
When the system processes the initial calculations,
Then it should continue fetching data and calculating line items per the requirements for those building blocks.

Given the billing statements and invoices are generated,
When the user accesses the Statements list or Billing Statements tab,
Then they should be able to view and/or edit the billing statement and invoices."
As a Billing Manager, I want to view which customers are marked as ReadyForInvoice, so that I can focus on generating billing statements only for sites that are ready. This feature will ensure efficiency in the invoicing process by limiting actions to pertinent accounts, thus reducing errors and unnecessary efforts.	"
New Column in Statements List for 'AM Note':
Given the user accesses the Statements list,
When there is an AM note associated with a statement,
Then a 'paper with lines' icon should appear, and upon hovering over it, a modal should display the full content of the AM note from the Dataverse table
Given the user accesses the Statements list,
When the user clicks to sort the new 'AM Note' column,
Then rows with the note icon may be sorted to the top or bottom of list

New Approve Action Button:
Given a statement is in 'AR Review' or 'Approval Team' status,
When the user views the Statements list or Billing Statement tab,
Then an approve action button should be available to move the statement past the current status.
Given a statement is in 'AR Review' or 'Approval Team' status,
When the user clicks to 'Approve' the statement,
Then a confirmation modal should appear asking ""Please confirm you wish to Approve this billing statement."" with an option to Approve or Cancel.

New Column in Customers list for 'Ready' Status:
Given the user is viewing the Customers list,
When the list is loaded,
Then it should display a sortable and filterable column for the 'Ready' status of each Customer site.
Given a new billing cycle has started,
When viewing the Customers list,
Then each site should be reset to 'Waiting' status unless marked as 'ReadyForInvoice' in Dataverse, with status descriptions being 'Waiting', 'Ready', or 'Generated' based on their readiness for the billing cycle (these may be icons with mouseover text descriptions).
Given a Customer list,
When the user views the new column,
Then the column should allow for filtering of each Ready status.
New Admin Override Button in Statement Generation Dialogue:
Given a user has selected Customers which are not in Ready status,
When the Statement Generation dialogue is displayed
Then help text should note ""You have selected [X Number] customers which are not in Ready status, these may only be generated by an Admin"" and Admin users should see a differently colored button to ""Admin Proceed""
Given an Admin has selected Customers which are not in Ready status,
When the ""Generate All Selected"" button is clicked,
Then all customers selected should have Billing Statements generated.
Given a user has clicked the generate icon for a single Customer not in Ready status,
When the generate dialogue is displayed,
Then help text should note ""This customer is not in Ready status, this may only be generated by an Admin"" and Admin users should see a differently colored button to ""Admin Proceed""
Given an Admin has selected a Customers which are not in Ready status,
When the ""Admin Proceed"" button is clicked,
Then the customer selected should have a Billing Statement generated.

Statement Generation Process:
Given the manager completes the selection of multiple Customers,
When they execute the billing statement generation process,
Then the system should confirm initiating the process and follow the progression of statuses: Generating, AR Review, Approval Team, Ready to Send
Given the manager completes the selection of multiple Customers,
When they execute the billing statement generation process,
Then a row for each Customer that is Ready should appear in Statements with the Site ID and Billing Cycle and Customer name, and Status of 'Generating' visible, however the other data will only appear once calculations are complete and all invoices generated

Given the user initiates a bulk generation process,
When they select sites that are not marked as 'Ready',
Then a modal should explain that ""Statements will not be generated for sites that aren't 'Ready.'"""
As a Billing Manager, I want the current month's invoices to automatically consider increments in Per Labor Hour contract calculations	"Given a Per Labor Hour Statement is created,
When the Increment Month = Service Period,
Then the Rates for all configured jobs should be increased by the Increment Percentage in Contract Details
AND the Billing Statement & Invoice Group(s) should reflect the increased amounts"
As a Billing Manager, I want to pull the Bell Service Fee when it exists on a revenue spreadsheet from the SQL data warehouse and include it in an invoice within the billing statement so that the fee can properly be billed to the customer	"Given a site like ""1078"" with a recurring fee (e.g., ""Bell Service Fee""), 
when generating an invoice, 
then the system sums the Amount of any such fees found in source SQL table for the service month of the billing statement AND adds it as a single line item to the invoice with a positive value number which increases the invoice total

Given a Customer with Bell Service Fee enabled, 
when the Admin configures the contract, 
then they are restricted to only enabling the Bell Service Fee and choosing which invoice group that the line item should belong to if Multiple Invoices are enabled as well.

Given a Customer with Bell Service Fee enabled, 
when the Billing Statement is generated, 
then the Bell Service fee will only appear when there are records found in the source table for the fee for the applicable service period (if no Bell Service Fee is found for the month, no fee should appear on the invoice)

Given a Customer with Bell Service Fee enabled,
when the data is persisted,
then the Bell Service Fee amount should be mapped to the GL Account #4795 for the site in order to support future GP integration"
As a Billing Manager, I want to be able to manage the mid-month advancement amount for contracts which use it	"Given an Admin accesses the Contracts section,
When they enable a contract with a mid-month advancement option,
Then the system should display fields for the Advancement Amount and (only if Multiple Invoices are enabled) the selection of to which Invoice it should be applied, and the Title selection for the line item.

Given an Admin accesses the Contracts section,
When they view the feature to enable Mid-month Advance,
Then the system should display sub text that states ""Enable Mid-month Advances to Towne Park""

Given an Admin accesses the Contracts section,
When they view the tooltip near the mid-month Advancement Amount
Then the system should display ""The amount which is advanced to Towne Park mid-month and will be credited back to the customer on the invoice selected.""

Given the system displays the advancement amount,
When the Admin modifies this amount,
Then the system should display a positive amount as input, save the changes and update the contract details accordingly

Given the advancement amount is updated,
When the changes are confirmed by the Admin,
Then the system should recalibrate the billing statement calculations to accurately reflect the new amounts (negative amount/credit)

Given the system updates the advancement amount,
When the billing cycle is processed,
Then the correct advancement is applied to invoicing in the form of credit to the customer (negative amount assuming positive advancement amount) on the Invoice selected in Contract Details (only if Multiple Invoices are enabled).

Given a Customer with Multiple Invoices enabled,
When the Admin configures the feature to select a specific invoice,
Then the line-item will appear on the selected invoice

Given an invoice with Mid-Month Advance line item,
When the user views that invoice,
Then the line-item Title will reflect the choice made in the contract configuration

Given multiple invoices for a customer with Mid-Month Advance
When the user views both invoices
The credit (negative amount) only is subtracted from the invoice upon which the Mid-Month advance appears"
As a Billing Manager, I want certain deal structures to pull Towne Park Deposited Revenue amount as a line item into the current months billing statement	"Flagging Towne Park Deposited Revenue
Given: The Billing Manager is using the invoicing application.
When: The ""Towne Park Deposited Revenue"" flag is enabled.
Then: A sub-flag for ""Towne Park Responsible for Parking Tax"" should be displayed.
And: A column for ""Invoice"" selection should appear to select the invoice group for the line item ""Less: Towne Park Deposited Revenue"" only if Multiple Invoices are enabled.

Disabling Towne Park Deposited Revenue
Given: The ""Towne Park Deposited Revenue"" flag is initially enabled.
When: The flag is disabled.
Then: The sub-flag for ""Towne Park Responsible for Parking Tax"" and the invoice group selection options should be hidden.

Towne Park Responsible for Parking Tax - Enabled
Given: The ""Towne Park Responsible for Parking Tax"" sub-flag is enabled.
When: Generating the line item for ""Less: Towne Park Deposited Revenue"".
Then: The system fetches the ExternalRevenue where DEPOSIT_FLAG = Y from [vwREVENUE_DAILY_DETAIL_INVOICE] and uses it as the Credit amount (negative number).

Towne Park Responsible for Parking Tax - Disabled
Given: The ""Towne Park Responsible for Parking Tax"" sub-flag is disabled.
When: Generating the line item for ""Less: Towne Park Deposited Revenue"".
Then: The system fetches the NetExternalRevenue where DEPOSIT_FLAG = Y from [vwREVENUE_DAILY_DETAIL_INVOICE] and uses it as the Credit amount (negative number).

Line Item Creation
Given: ""Towne Park Deposited Revenue"" is enabled and configured.
When: An invoice is generated for a specified deal structure.
Then: The line item ""Less: Towne Park Deposited Revenue"" is added to the specified invoice group with the fetched Credit amount (negative number).
"
(Validations #1) As an Admin I want to configure and include Vehicle Count validations so that this revenue may be collected from the customer.	"Vehicle Count Validation Threshold Type Application
Given: The Validation Threshold Type is ""Vehicle Count"".
When: A customer receives a certain number of vehicle passes for free parking.
Then: There is no actual money collected for these passes.
And: A projected External Revenue amount is calculated using the site's individual parking rate and the count of free parking passes issued.
Calculating [Total Validation Revenue]

Given: The projected external revenue amount for this Validation Type reflects only the total value of lost revenue due to the vehicle passes above the validation threshold for Vehicle Count.
When: The Account Manager submits this projected revenue number to Towne Park.
Then: The data is stored as rows in the [TP_EDW].[dbo].[vwREVENUE_DAILY_DETAIL_INVOICE] view.
And: It uses the column EXTERNALREVENUE where DEPOSIT_FLAG = ""V"".

Towne Park Fees Calculation for Validated Parking
Given: The Validation Threshold Type is ""Vehicle Count"".
When: Calculating Towne Park Fees for Validated Parking Invoice Item Amount.
Then: Use the Sum of ExternalRevenue where Deposit_Flag = ""V"" for the customer in the service period from the [TP_EDW].[dbo].[vwREVENUE_DAILY_DETAIL_INVOICE].

Result of Towne Park Fees Calculation
Given: The total validation revenue is $5,000.
When: The Towne Park Fees for Validated Parking are calculated.
Then: Towne Park Fees for Validated Parking Invoice Item Amount = $5,000.

Communication of Validation Revenue to Customer
Given: The validation revenue is calculated.
When: Generating the Billing Statement Invoice.
Then: The line-item title ""Towne Park Fees for Validated Parking"" is clearly communicated to the customer.
Assumptions and Exclusion of Line-Items

Given: The Total Validation Revenue is less than the Validation Threshold Amount.
When: Preparing the Billing Statement Invoice.
Then: No line-item should appear for ""Towne Park Fees for Validated Parking"".
Exclusion from Cumulative Revenue Threshold

Given: Excess Validation Revenue is calculated.
When: Managing ongoing Cumulative Revenue Threshold amounts (e.g., Annual calendar or anniversary).
Then: Excess Validation Revenue must not be added to the ongoing Cumulative Revenue Threshold amount."
(Validations #2) As an Admin I want to configure and include simple Revenue Percentage validations so that this revenue may be collected from the customer.	"Calculating [Total Validation Revenue] 
Given: The projected external revenue amount reflects the total value of lost revenue due to the vehicle passes.
When: The Account Manager submits this projected revenue number to Towne Park.
Then: The data is stored as rows in the [TP_EDW].[dbo].[vwREVENUE_DAILY_DETAIL_INVOICE] view.
And: It uses the column EXTERNALREVENUE where DEPOSIT_FLAG = ""V"".

Validation Type as Revenue Percentage
Given: The Validation Threshold Type is ""Revenue Percentage"".
When: The customer may give away parking revenue in the form of parking validations.
Then: The limit for these validations is defined as a percentage of the total NETEXTERNALREVENUE for the month.
Condition for Towne Park Fees Calculation

Given: The conditions for calculating Towne Park Fees for Validated Parking.
When: The Validation Threshold Type is ""Revenue Percentage"" and Total Validation Revenue exceeds the Validation Threshold Amount.
And: The Total Revenue Accumulation is less than the Revenue Share Threshold Tier 1 Amount.
Then: Towne Park Fees for Validated Parking are calculated using the Revenue Share Percentage for Tier 1.

Calculation of Towne Park Fees for Validated Parking
Given: The Revenue Share Percentage Tier 1 is 20%.
When: Calculating Towne Park Fees for Validated Parking Invoice Item Amount.
Then: Use the formula: 20% * ([Total Validation Revenue] - ([Validation Threshold Percentage] * [Total Monthly Net Revenue]))
And: Substitute with the actual values; 20% * ($50,000 - (10% * $90,000) to determine the fee amount.

Result of Calculation using example variables
Given: The values of variables used in the above acceptance criteria.
When: The fee amount is calculated.
Then:  The 'Towne Park Fees for Validated Parking' amount should equal $8,200.00

No Line-Item Under Other Conditions
Given: The conditions for the calculation are not met.
When: Total Validation Revenue does not exceed the Validation Threshold Amount, or the Total Revenue Accumulation is not less than the Revenue Share Threshold Tier 1 Amount.
Then: No additional calculation occurs.
And: No line-item appears for Validations on the invoice."
(Validations #3) As an Admin I want to configure and include simple Revenue Amount validations so that this revenue may be collected from the customer.	"Calculating [Total Validation Revenue] 
Given: The projected external revenue amount reflects the total value of lost revenue due to the vehicle passes.
When: The Account Manager submits this projected revenue number to Towne Park.
Then: The data is stored as rows in the [TP_EDW].[dbo].[vwREVENUE_DAILY_DETAIL_INVOICE] view.
And: It uses the column EXTERNALREVENUE where DEPOSIT_FLAG = ""V"".

Validation Type as Revenue Amount
Given: The Validation Threshold Type is ""Revenue Amount"".
When: A customer gives away parking revenue through parking validations.
Then: The limit for these validations is defined as a dollar amount.
Condition for Towne Park Fees Calculation

Given: The conditions for calculating Towne Park Fees for Validated Parking.
When: The Validation Threshold Type is ""Revenue Amount"" and Total Validation Revenue exceeds the Validation Threshold Amount.
And: The Total Revenue Accumulation is less than the Revenue Share Threshold Tier 1 Amount.
Then: Towne Park Fees for Validated Parking are calculated using the Revenue Share Percentage for Tier 1.

Calculation of Towne Park Fees for Validated Parking
Given: The Revenue Share Percentage Tier 1 is 10%.
When: Calculating Towne Park Fees for Validated Parking Invoice Item Amount.
Then: Use the formula: [Revenue Share Percentage Tier 1] * ([Total Validation Revenue] - [Validation Threshold Amount])
And: Substitute with the actual values: 10% * ($50,000 - $25,000) to determine the fee amount.

Result of Towne Park Fees Calculation
Given: The calculation is completed using the example values above.
When: The Total Validation Revenue and calculations are applied.
Then: The Towne Park Fees for Validated Parking Invoice Item Amount equals $2,500.

Communication of Validation Revenue to Customer
Given: The validation revenue is calculated.
When: Generating the Billing Statement Invoice.
Then: A line-item titled ""Towne Park Fees for Validated Parking"" is clearly communicated to the customer.

No Line-Item Under Specific Conditions
Given: The Total Validation Revenue is less than the Validation Threshold Amount.
When: Preparing the Billing Statement Invoice.
Then: No line-item should appear for ""Towne Park Fees for Validated Parking"".

Exclusion from Cumulative Revenue Threshold
Given: Excess Validation Revenue is calculated.
When: Managing ongoing Cumulative Revenue Threshold amounts (e.g., Annual calendar or annual anniversary).
Then: Excess Validation Revenue must not be added to the ongoing Cumulative Revenue Threshold amount."
User Story	Acceptance Criteria
"As a Billing Manager, I want to download a multi-page PDF of the Billing Statement Invoice(s), so that I can review and send to the Customer


User Flow:
User logs in and goes to either Customer Details >> Statements or top-level navigation >> Statements
User views generated Billing Statement
Statement is in Ready To Send status
Download action icon appears on Statement row
User clicks icon to Download PDF (see screenshot)
Multi-page PDF of all Invoices downloads to user desktop (Save As dialog)"	"Scenario: Download Multi-page PDF of Billing Statement Invoices
Given the user is logged in as a Billing Manager,
And navigates to either Customer Details >> Statements or top-level navigation >> Statements,
When the user views the generated Billing Statement,
And the Statement is in Ready To Send status
And clicks the icon to Download PDF,
Then a ""Save As"" dialog is presented to the user,
And upon confirming the download, a multi-page PDF of all invoices downloads to the user's desktop,
And the PDF contains all relevant pages and information of the Billing Statement Invoice(s)"
"As a Billing Manager, I want to see a comparison to forecasted revenue from SQL in the Billing Statement Packet, so that I can ensure the invoice amount is within a tolerable delta from the forecast.

User Flow:
Billing Manager clicks to generate Billing Statement
System retrieves forecasted revenue from EDW
System retrieves GL account balances from EDW
System generates billing statement
System uses Revenue Revue Forecast settings to generate Comparison to Forecast
System sets Billing Statement status based on Revenue Review Threshold (if both percentage threshold and dollar threshold are exceeded, then status = 'Approval Team', unless there are AM Notes, which would set status to 'AR Review' first, then 'Approval Team' status once statement is approved)  **Note: Fixed Fee invoices DO NEED to follow the revenue review process
Billing Statement row in Statements list may be expanded to show Comparison to Forecast supporting report
User clicks to View Comparison to Forecast (Report is displayed on-screen only, no PDF, no exposure to Customer)
IF status = 'AR Review' OR 'Approval Team'
User may decide to add Ad-Hoc line items optionally
User clicks button to 'Approve' billing statement
Billing Statement is set to Ready to Send status"	"Generating the Billing Statement
Given: The Billing Manager initiates the process.
When: The Billing Manager clicks to generate the Billing Statement.
Then: The system retrieves forecasted revenue from the EDW using the vwFORECAST_CONSOLIDATED view.
And: The system retrieves GL account balances from the EDW using the ACCOUNT_SUMMARY table.

Generating Comparison to Forecast
Given: The system has the necessary data.
When: The billing statement is generated.
Then: The system uses Revenue Review Forecast settings to generate a Comparison to Forecast report.

Setting Billing Statement Status
Given: The Comparison to Forecast has been generated.
When: The thresholds are compared.
Then:
-  If both percentage and dollar thresholds are exceeded: Status = 'Approval Team'
-  If AM Notes are present: Status is 'AR Review' first, then progresses to 'Approval Team' once approved
-  If all items are Fixed Fee OR neither AM Notes are present NOR both thresholds exceeded: Status skips forward to 'Ready to Send'
Given: The billing statement has finished generating,
When: A user views the statement row in Statements list
Then: The system has updated the Forecast Deviation % and the Forecast Deviation $ with correct values

Viewing the Forecast Deviation results in the Statement Row
Given: The billing statement is generated.
When: A user views the Statements list
Then: the Statement row shows the Deviation % and Deviation $ that are the results of the comparison for that Statement

Interacting with Comparison to Forecast
Given: The billing statement row is available in the Statements list and Customer Site >> Statements.
When: A user clicks to expand the row and to View the Comparison to Forecast.
Then: The Comparison to Forecast supporting report is shown on-screen, with no PDF generated and no risk of exposure to the customer.
Approving the Billing Statement
Given: The statement status is 'AR Review' or 'Approval Team'.
When: The user opts to add Ad-Hoc line items.
And: The user clicks the 'Approve' button.
Then: The Billing Statement status is set to 'Ready to Send'.
"
"As an Admin, I want to indicate which Payroll accounts are Billable, so that those amounts may be reflected on a customer invoice

User Flow:
Admin opens Contract Details for customer site 0170 and enables Billable Accounts building block
Admin adds all Payroll Accounts except for ('6002', '6015', '6016', '6017', '6019', '6030', '6100', '6110', '6115') to the Excluded Payroll Accounts list
Admin inputs the Line-item Display Name to {line_item_display_name}
Admin saves contract details
Billing Manager generates Billing Statement for site 0170 for September service period"	"Display of Billable Payroll Accounts in UI
Given: I am on the Contract Details UI.
When: I view the section 'Billable Accounts' under the sub-header 'Payroll Accounts'.
Then: I see a list of Excluded Payroll Accounts with initial default excluded accounts: 6010 Salaries - Personal Leave & Sick Pay - Hourly and 6014 Salaries - Other
And: All other accounts in the range of 6000-6199 are initially set to 'Billable'.

Excluding Billable Payroll Accounts
Given I am viewing the list of Excluded Payroll Accounts
When I click on the plus icon
Then I am presented a dialogue with the remaining list of accounts in the range of 6000-6199 and have the ability to add them to the Excluded list

Calculating Billable Payroll Accounts
Given a list of Excluded Payroll Accounts
When the line-item for Billable Payroll Accounts is calculated
Then the accounts in the Excluded list will not be summed for the total amount

Invoice Line-Item Details
Given: The amounts for billable payroll accounts are summed.
When: An invoice is generated.
Then: A single line-item is created using the Display Name configured in building block as the line-item title.
And: This line-item includes no description.
And: Account numbers do not appear on the invoice.
And: This line-item appears on the Invoice assigned (if Multiple Invoices feature is enabled)."
"As an Admin, I want to create a line-item for PTEB, so that this amount may be reflected separately from the Billable Payroll line item on a customer invoice

Payroll Taxes Employee Benefits (PTEB):  PTEB is defined at Towne Park as the sum of three general ledger accounts: 6200 - Payroll Taxes, 6399 - Health Insurance Allocation, and 6500 - Insurance - Worker's Comp.  For some contracts, there is an agreement to charge the customer for this amount, either using the sum of PTEB accounts plus an optional additional percentage of that sum, or instead it may be charged as a percentage of the total Billable Payroll (which exclude PTEB accounts). 

User Flow #1:
Admin opens site to set contract details
Billable Accounts = enabled
Admin clicks to 'Create PTEB Line-item'
Admin selects to 'Charge Based on Actual PTEB'
Admin sets Display Name to ""PTEB""
Admin saves changes 
Billing Manager generates Billing Statement

User Flow #2:
Admin opens site to set contract details
Billable Accounts = enabled
Admin reviews and confirms accounts to be Excluded
Admin clicks to 'Create PTEB Line-item'
Admin chooses to 'Charge as Percentage of Billable Payroll'
Admin sets Percentage of Billable Payroll to some percentage
Admin sets Display Name to ""PTEB at some percentage""
Admin saves changes 
Billing Manager generates Billing Statement"	"Scenario: Charge Based on Actual PTEB with Additional Percentage
Given the admin opens the site 0170 contract details with Billable Accounts enabled,
When the admin clicks to 'Create PTEB Line-item',
And selects 'Charge Based on Actual PTEB',
And sets the Display Name to ""PTEB"",
And saves the changes,
Then the Billing Manager generates the Billing Statement,
And the query for Site 170 in September 2024 calculates the PTEB as $10,496.15 
And a line-item is created with the title ""PTEB"" and the amount $10,496.15 

Scenario: Charge as Percentage of Billable Payroll
Given the admin opens the site 0170 contract details with Billable Payroll Accounts enabled,
And accounts #6002, '6015', '6016', '6017', '6019', '6030', '6100', '6110', '6115' are not excluded,
When the admin clicks to 'Create PTEB Line-item',
And chooses 'Charge as Percentage of Billable Payroll',
And sets the Percentage of Billable Payroll to 15%,
And sets the Display Name to ""PTEB"",
And saves the changes,
Then the Billing Manager generates the Billing Statement,
And the query for Site 170 in September 2024 calculates the PercentageBillablePayroll as $7,328.18 * 15% = $1,099.23,
And a line-item is created with the title ""PTEB"" and the amount $1,099.23."
"As an Admin, I want customer Supporting Reports to be configured to appear in the Billing Statement packet

User Flow:
Admin opens customer site to Contract Details
Admin configures contract based on deal type building blocks (Fixed Fee, Per Labor Hour, Per Room, Rev Share, Mgmt Agrmt)
Admin selects Supporting Documents based on deal type (Hours Backup, Labor Distribution, Mix of Sales, Other Expenses, Tax Report)
Billing Manager clicks to generate Billing Statement
Billing Statement is generated with selected Supporting Documents available to view"	"Given an Admin, 
when viewing Contract Details, 
then I should see toggle controls for enabling/disabling each report.
Given a report toggle is enabled, 
when generating a billing statement, 
then the correct report should appear in the statement.
Given data dependencies are required, 
when a billing statement is generated, 
then the system should correctly fetch these using Power Automate from the necessary data sources.
Given an Admin, 
when configuring Contract Details of a Customer, 
then each report should only be available to enable based on the concurrently enabled Deal Type (e.g., for Per Labor Hour the Hours Backup Report is available to enable, however for Fixed Fee it is not)."
"As an Admin, I want to add Support Services Line-items to Billable Payroll Accounts invoices so that these charges can be billed to the customer. The Support Services can be charged as a fixed amount, a percentage of Billable Payroll, or a percentage of Total Payroll (Billable + PTEB).

User Flow #1: 
Admin opens site contract details
Billable Accounts = enabled
Admin clicks to 'Create Support Services Line-item'
Admin selects to set Support Services charge as Fixed Fee
Admin sets Fixed Fee Amount to $7,000.00
Admin sets Display Name to ""Support Services""
Admin saves changes 
Billing Manager generates Billing Statement
The above would result in line-items with below Title & Amount;

Title                             Description            Amount
Support Services           ____________            $7,000.00


User Flow #2: NOTE: This flow is dependent on the output of the Billable Payroll sub-flow calculation
Admin opens site 0170 contract details
Billable Payroll Accounts = enabled
Admin reviews / confirms accounts not Excluded are correct
Admin clicks to 'Create Support Services Line-item'
Admin chooses to 'Charge as Percentage of Billable Payroll'
Admin sets percentage of Support Services to some percentage
Admin sets Display Name to ""Support Services at some percentage""
Admin saves changes 
Billing Manager generates Billing Statement
System calculates Billable Payroll
System passes Billable Payroll amount to Support Services calculation
System calculations Support Services

[BillablePayroll Line-item Amount] * [Some percentage] = [Support Services Amount]


User Flow #3: NOTE: This flow is dependent on the output of the Billable Payroll & PTEB sub-flow calculations
Admin opens site contract details
Billable Payroll Accounts = enabled
Admin reviews / confirms accounts not Excluded are correct
Admin clicks to 'Create Support Services Line-item'
Admin chooses to 'Charge as Percentage of Total Payroll'
Admin sets Percentage of Support Services to some percentage
Admin sets Display Name to ""Support Services at some percentage""
Admin saves changes 
Billing Manager generates Billing Statement
System calculates Billable Payroll
System calculates PTEB
System passes Billable Payroll & PTEB amounts to Support Services calculation
System calculates Support Services as [BillablePayroll] + [PTEB Line-item Amount] * [PercentageTotalPayroll] = [SupportServicesAmount]
"	"Fixed Fee Support Services
Given an Admin wants to add a fixed Support Services Line-item,
When a Fixed Fee Amount is set and saved,
Then the invoice should display a line-item with the specified amount.

Percentage of Billable Payroll
Given the site's Billable Payroll Accounts are enabled,
When Support Services are set as a percentage of Billable Payroll,
Then the invoice should show a line-item calculated as per the defined percentage of the Billable Payroll.

Percentage of Total Payroll
Given Billable Payroll and PTEB need to be calculated,
When Support Services are set as a percentage of the Total Payroll,
Then the invoice should reflect a line-item calculated with both Billable Payroll and PTEB applied to the defined percentage."
"As a Billing Manager, I want to be able to indicate which Expense accounts are Billable, so that those items can be included in a customer invoice

Billable expense accounts: Each of these accounts need to be configurable as Billable or Excluded in a new building block section labelled 'Billable Accounts' under a sub-header labelled 'Expense Accounts'.  By default, all accounts should be marked as Billable except for 7005 & 7016, which should default to Excluded.  Amounts for each Billable account is queried from the Account Summary table and are summed up into a single invoice line-item with whatever Display Name is configured in the building block, and no description.  Account numbers do not display on the invoice.

Example User Flow:
Admin opens Contract Details for customer site 0170 and enables Billable Accounts building block
Admin adds all Expense Accounts except for ('7000' ,'7010' ,'7011' ,'7017' ,'7018' ,'7019' ,'7040' ,'7045' ,'7050' ,'7055') to the Excluded Expense Accounts list
Admin inputs the Line-item Display Name to {line_item_display_name}
Admin saves contract details
Billing Manager generates Billing Statement for site 0170 for September service period

Example query for a Customer with 10 billable accounts for site 0170 in September '24;

SELECT SUM(BALANCE) AS SeptemberBillableExpenses FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] WHERE [PERIOD] = '202409' AND [COST_CENTER] = '0170' AND [MAIN_ACCOUNT] IN ('7000' ,'7010' ,'7011' ,'7017' ,'7018' ,'7019' ,'7040' ,'7045' ,'7050' ,'7055')

SeptemberBillableExpenses = 16725.08000


The above would result in a line-item with below Title & Amount;

Title                                            Description            Amount
{line_item_display_name}       _________           $16,725.08"	"Display of Billable Expense Accounts in UI
Given: I am on the Contract Details UI.
When: I view the section 'Billable Accounts' under the sub-header 'Expense Accounts'.
Then: I see a list of Excluded Expense Accounts with initial default excluded accounts: 7005 Bad Debt Expense, 7016 Contract Improvements
And: All other accounts in the range of 7000-7999 are initially set to 'Billable'.

Excluding Billable Expense Accounts
Given I am viewing the list of Excluded Expense Accounts
When I click on the plus icon
Then I am presented a dialogue with the remaining list of accounts in the range of 7000-7999 and have the ability to add them to the Excluded list

Calculating Billable Expense Accounts
Given a list of Excluded Expense Accounts
When the line-item for Billable Expense Accounts is calculated
Then the accounts in the Excluded list will not be summed for the total amount

Invoice Line-Item Details
Given: The amounts for billable Expense accounts are summed.
When: An invoice is generated.
Then: A single line-item is created using the Display Name configured in building block as the line-item title (placeholder value for Expense line-item title is ""Total Other Expenses"")
And: This line-item includes no description.
And: Account numbers do not appear on the invoice.
And: This line-item appears on the Invoice assigned (if Multiple Invoices feature is enabled)."
"As an Admin, I want to be able to enable Management Agreements with a Management Fee, so that revenue may be collected from customers with these contract types

The Management Agreement building block is dependent on also using the Billable Accounts building block, so if Mgmt Agrmt is enabled then so must the Billable Accounts (but the reverse is not true, Billable Accounts may be enabled by itself).  The Management Fee can be defined as a Fixed Fee, Per Labor Hour, or Revenue Share line-item type.  

THE MANAGEMENT FEE WILL ALWAYS BE MAPPED TO GL ACCOUNT #4790

Example User Flow:
Admin opens Contract Details for customer and enables Management Agreement building block
System enables Billable Accounts building block and enforces it to remain enabled so long as Management Agreement is enabled
Admin selects the type of Management Fee to assign > Fixed Fee, Per Labor Hour, or Revenue Share
Admin saves the Contract Details
Billing Manager generates Statement for the site
System calculates Management Fee and creates invoice with line-item amount based on previously developed logic for Fixed Fee, Per Labor Hour, or Revenue Share (see acceptance criteria)"	"Display of Management Agreement in UI
Given: I am on the Contract Details UI.
When: I enable the section 'Management Agreement' and view the sub-section 'Management Fee'.
Then: I see a list of options with which I can configure the Management Fee (Fixed Fee, Per Labor Hour, Revenue Share)
And: The building block for 'Billable Accounts' is enforced to be enabled

Calculating Fixed Fee > Management Fee
Given a Fixed Fee >> Management Fee
When the line-item for Management Fee is calculated
Then the line-item amount will equal the Fixed Fee Amount as defined in the contract details

Calculating Per Labor Hour > Management Fee
Given a Per Labor Hour >> Management Fee
When the line-item for Management Fee is calculated
Then the line-item amount will equal the (Hourly Rate * Total Regular Hours) + (Overtime Rate * Total Overtime/Holiday Hours) for the Job Code per Site per Period, as defined in the contract details

Calculating Revenue Share > Management Fee
Given a Revenue Share >> Management Fee
When the line-item for Management Fee is calculated
Then the line-item amount will equal the (Share Percentage * NetExternalRevenue) per Site, per Period, as defined in the contract details

Invoice Line-Item Details
Given: The amount for Management Fee is summed.
When: An invoice is generated.
Then: A single line-item is created using 'Management Fee' as the line-item title
And: This line-item includes no description.
And: This line-item appears on the Invoice assigned (if Multiple Invoices feature is enabled)."
"As an Admin, I want to include Insurance as a line-item on Management Agreements so that this revenue is collected on the billing statement separately from other billable expenses.

User Flow:
Admin clicks to open a Customer to Contract Details section
Admin expands Management Agreement building block and enables it, which also enables Billable Accounts
Admin configures Billable Accounts, leaving the Insurance Accounts in the Billable list (does not exclude Insurance accounts #7080, 7082, 7085)
Admin clicks to Create an Insurance line-item
Admin clicks to base the billing on Fixed Fee or Based on Billable Accounts
IF Fixed Fee, 
-     Admin sets the Amount and confirms/updates the line-item title placeholder: Insurance
IF Based on Billable Accounts, 
-     Admin reviews the read-only list of Insurance Accounts which have not been excluded in Billable Expense Accounts section of contract and doesn't change the Excluded Expense Accounts list, leaving all 3 Insurance accounts as Billable
-     Admin sets the Additional Percentage to 15% to add to the amount found in query to Account Summary table
-     System changes the calculation for related line-item 'Billable Expense Accounts' to ensure the amounts charged for any non-excluded accounts in the set of 7080, 7082, and 7085 are removed from the Billable Accounts line-item amount and instead charged here as Insurance to prevent the customer from being charged twice for the same accounts
Admin optionally sets the Insurance line-item to appear on an invoice grouping other than 1
Admin saves the contract update
Billing Manager clicks to generate a Billing Statement for the Customer"	"Fixed Fee Insurance
Given an Admin wants to add a fixed Insurance Line-item,
When a Fixed Fee Amount is set and saved,
Then the invoice should display a line-item with the specified amount.

Percentage of Billable Accounts
Given the site's Billable Accounts are enabled,
When Insurnace is set as a percentage of Billable Accounts,
Then the invoice should show a line-item calculated as per the defined percentage of the Billable Expense Accounts, plus the Additional Percentage of Billable Expense Accounts as defined in the building block
AND the sum of the non-excluded Billable Insurance Accounts will not be charged to the Billable Expense Accounts line-item (it is instead charged under the line-item for Insurance, otherwise we would be charging them twice for same accounts)"
" As an Admin, I want to include Claims as a line-item on Management Agreements so that this revenue is collected on the billing statement separately from other billable expenses.  

Claims may have a cap, based either on the Calendar Year, or Contract Anniversary of Start Date which we will need to apply such that when this cap is reached, we stop charging any amount for Claims for the remainder of the year (based on either calendar year or contract anniversary date).

User Flow: 
Admin clicks to open a Customer to Contract Details
Admin clicks to enable Management Agreement building block, which also enables Billable Accounts
Admin clicks to Create Claims line-item
Admin reviews the read-only list of non-excluded Claims accounts which appear in the Billable Expense accounts list and decides not to exclude them
Admin sets the Claims Cap Type, to define whether the Claims amount should be limited based on the Annual(Calendar) or Annual(Anniversary) of Start Date for the customer, or whether there should be a limit on the charges made Per Claim
IF Annual(Calendar) OR Annual(Annisversary) 
-     Admim sets the Claims Cap Amount and confirms/updates the placeholder Line-item Title of 'Loss & Damage'
IF Per Claims cap is selected
-     Admin reads the help text explaining that ""NOTE: A cap cannot be automatically calculated on a per-claim basis at this time. The system will add all claim amounts to the billing statement. Towne Park accounting team must ensure any amount over the Per Claim cap is credited back to the Customer by adding an Ad-hoc Line-item on the billing statement for any amount over the limit.""
Admin clicks to Save the above configuration
Billing Manager clicks to generate a Billing Statement for the Customer
System changes the Billable Expenses calculation such that the billable Claims accounts will be included in the line item for Claims and not summed in the line item for Billable Expenses
Billing Statement contains an invoice with the line-item for Claims and the amount as defined above"	"Claims Line-item Creation
Given the Admin is in the Customer to Contract Details,
When the Admin enables the Management Agreement building block,
Then the Billable Accounts should also be enabled.
Given the Management Agreement is enabled,
When the Admin clicks to create a Claims line-item,
Then a read-only list of non-excluded Claims accounts should appear in the Billable Expense accounts list for review.

Setting Claims Cap Type
Given the Admin is configuring the Claims line-item,
When the Admin sets the Claims Cap Type as Annual(Calendar) or Annual(Anniversary),
Then the Admin must set the Claims Cap Amount and confirm/update the Line-item Title as 'Loss & Damage'.
Given the Admin is configuring the Claims line-item,
When the Admin selects Per Claim cap,
Then a help text should explain that over-cap amounts need manual adjustment, and the system should present an option to save the configuration.

Saving Configuration
Given the Admin has configured the Claims line-item,
When the Admin clicks to save the configuration,
Then the settings should be stored and ready for use in the next billing statement generation.

Billing Statement Generation
Given the Claims line-item is configured and saved,
When the Billing Manager generates a Billing Statement,
Then the system should change the Billable Expenses calculation to account for Claims as a separate line item.
Given Claims accounts are non-excluded and queried,
When the summed Claims amount is calculated,
Then it should be added to any accumulated amount being tracked towards an annual claims cap.
Given a Claims cap is defined,
When the summed Claims amount reaches the cap,
Then the Claims line-item amount should not exceed the cap in the billing statement."
"As an Admin I want to calculate Validations for Profit Shares so that this revenue may be collected from the customer.

With Profit Share deals, the amount of calculation that the system needs to perform is minimal.  This is because the revenue that Profit Share Validations drive is calculated in the Profit Share calculation.  Validations just adds some additional revenue to the input of Profit Share, thereby using the calculation built into that process automatically.  

Just as in the other Validations, if the Type = Vehicle Count, then the system will assume that the data submitted via RSS to the view in EDW has already accounted for the appropriate Validation Threshold.  For this reason, when the Type is Vehicle Count, the system will query the exact same was as the 'other' Validations feature to determine Excess Validation Revenue. "	"Calculating [Excess Validation Revenue] for Vehicle Count
Given: The Validation Type is Vehicle Count, and this type assumes the info submitted via RSS file to EDW reflects the value of lost revenue due to the vehicle passes in excess of the threshold (no calculation for excess is needed).
When: The Account Manager submits this projected revenue number to Towne Park.
Then: The data is stored as rows in the [TP_EDW].[dbo].[vwREVENUE_DAILY_DETAIL_INVOICE] view.
And: It uses the column NETEXTERNALREVENUE where DEPOSIT_FLAG = ""V"".

Condition for Towne Park Profit Calculation 
Given: The Total Revenue Accumulation exceeds the Revenue Share Threshold Tier X Amount (in the 1st Threshold Structure) within the current service period.
When: The Total Validation Revenue exceeds the Validation Threshold Amount.
Then: Add the value of Validation Revenue that exceeds the Threshold Amount to the calculation for Total Profit, which will ensure the revenue is charged correctly in the final invoice

Communication of Validation Revenue to Customer
Given: The excess validation revenue is calculated.
When: Generating the Billing Statement Invoice.
Then: A line-item titled ""Value of Validations Over Threshold"" is clearly communicated to the customer.

No Line-Item Under Specific Conditions
Given: The Total Validation Revenue is less than the Validation Threshold Amount.
When: Preparing the Billing Statement Invoice.
Then: No line-item should appear for the excess validation revenue

Exclusion from Cumulative Revenue Threshold
Given: Excess Validation Revenue is calculated.
When: Managing ongoing Cumulative Profit Threshold amounts (e.g., Annual calendar or annual anniversary).
Then: Excess Validation Revenue must not be added to the ongoing Cumulative Revenue Threshold amount."
"As an Admin I want to configure Profit Share contract details so that Towne Park can collect a percentage of profit from the customer parking site as revenue in the Billing Statement.

User Flow:
Admin clicks to open Customer to Contract Details
Admin clicks to enable Management Agreement which enables Billable Accounts also
Admin sets Management Fee, Insurance, Claims, Billable Accounts (including PTEB & Support Services), and clicks to enable Profit Share
Admin either inputs a simple Share Percentage, or clicks to enable Threshold Structures
IF Threshold Structures
Admin selects an Accumulation Type (Monthly, Annual(Calendar), or Annual(Anniversary)) in this example: Admin selects ""Monthly""
Admin configures at least 2 threshold tiers, entering a Share Percentage and Threshold Amount in all except highest tier, which always sets Threshold Amount to infinite.
Admin Saves the contract details
Billing Manager clicks to generate a Billing Statement for the Customer
System adjusts calculations as appropriate for Billable Expenses based on Insurance and Claims configs
System triggers workflows to calculate all building blocks which Profit Share may depend on and are enabled in [Billable Payroll, PTEB, Support Services, Billable Expense, Management Fee, Profit Share Validations, Insurance, Claims] and they complete calculations
System applies an additional calculation for [Total Profit]
System uses logic to test the Profit Accumulation
System uses [Towne Park Share of Profit Amount] to calculate Total Amount for Line-item:

Below is a mock-up of how the Description of Profit Share line-item will likely look:


""Monthly Net Revenue:""                                  $XX,XXXX.XX
""Value of Validations Over Threshold:""        $X,XXX.XX
---------------------------------------------------------
""Site Salaries & Wages:""                                     - $YYYY.YY
""PTEB:""                                                                      - $YYYY.YY
""Support Services:""                                              - $YYYY.YY
""Insurance:""                                                           - $YYYY.YY
""Claims:""                                                                 - $YYYY.YY 
""Management Fee:""                                            - $YYYY.YY
""Billable Expenses:""                                           - $YYYY.YY
""Owner Parking Department Expenses:""    - $YYYY.YY
---------------------------------------------------------
""Profit Share A%"" :                                           $AA,AAA,AA
""Profit Share B%"" :                                           $BB,BBB.BB 
""Profit Share C%"" :                                           $CC,CCC.CC "	"Contract Details Configuration
Given the admin is on the Customer to Contract Details page,
When the admin clicks to enable the Management Agreement,
Then Billable Accounts should also be enabled.
Given the Management Agreement is enabled,
When the admin sets values for Management Fee, Insurance, Claims, and Billable Accounts and clicks to enable Profit Share,
Then the admin should be able to input a Share Percentage or enable Threshold Structures.

Threshold Structure
Given the admin has enabled Threshold Structures,
When the admin selects an Accumulation Type,
Then the options should include Monthly, Annual(Calendar), or Annual(Anniversary), and the configuration should be set based on the choice.
Given the Accumulation Type is set to Monthly,
When the admin configures at least 2 threshold tiers,
Then each tier should require a Share Percentage and Threshold Amount, except the highest tier which sets Threshold Amount to infinite.

Profit Calculation
Given the contract details are saved,
When the Billing Manager clicks to generate a Billing Statement,
Then the system should adjust calculations as appropriate for Billable Expenses based on Insurance and Claims configuration.
Given building blocks such as Billable Payroll, PTEB, Support Services, Billable Expense, Management Fee, Insurance, and Claims are enabled,
When the system triggers their workflows,
Then all these blocks should complete their calculations before calculating Profit Share.
Given the Profit Share line-item needs to be calculated,
When the system calculates the Total Monthly Net Revenue Amount,
Then it should display as a positive amount in the Profit Share line-item description
AND a line should display beneath it in the description (""-------------------------------------"")

Ad-hoc Expenses (aggregated).****THIS IS OUT OF SCOPE FOR SPRINT 13****

Given Profit Accumulation needs verification,
When the count of Customer Profit Share Threshold Structure Tiers is more than 1,
Then calculations should reflect the respective tier thresholds for Towne Park's profit share (see user story Description above).
Given Profit Share involves multiple tiers,
When calculating Towne Park's share of profit,
Then additional tier information should be displayed for each that becomes involved in calculations"
"As an Admin, I want to set the Contract Details into Edit mode to make edits, so that the editing experience is the same across the view of the Customer

User Flow:
Admin clicks to open Customer to General Info tab
Admin clicks to open Contract Details tab
Admin clicks 'Edit' button located at top of Contract Details (same as General Info) to change all inputs from read-only to editable (depending on other UI rules re: enabling)
Admin makes edits to Contract
Admin clicks to Cancel or Save
IF Cancel
-     System prompts ""Any changes since your last Save will be lost, ok to Cancel?"" Yes / No
IF Save
-     System saves changes
Contract Details returns to read-only"	"Entering Edit Mode
Given the Admin is viewing the Contract Details tab,
When the Admin clicks the 'Edit' button located at the top of the Contract Details,
Then all input fields should change from read-only to editable, adhering to existing UI enabling rules.

Editing and Saving Contract Details
Given the Contract Details are in Edit mode,
When the Admin makes edits to the Contract,
Then the changes are temporarily applied until the Admin decides to Cancel or Save.
Given edits are made in Edit mode,
When the Admin clicks 'Save',
Then the system should save the changes, and the Contract Details should return to read-only mode.

Canceling Edits
Given edits are made in Edit mode,
When the Admin clicks 'Cancel',
Then the system should prompt ""Any changes since your last Save will be lost, ok to Cancel?"" with options Yes / No.
Given the system prompts the Admin when Canceling,
When the Admin selects 'Yes',
Then any changes made since the last Save should be discarded, and Contract Details should return to read-only mode.

Viewing Contract Details
Given the Contract Details are in read-only mode,
When different users view the Contract Details,
Then they should be able to expand/collapse accordions without entering Edit mode.

Handling Multiple Admins
Given multiple Admins are accessing the Contract Details,
When one Admin begins editing,
Then the system will prioritize the user's changes based on a first-come-first-serve basis of the Save event."
User Story	Acceptance Criteria
"As a billing manager, I want to Change GP Financials batch to include taxes on TP Deposited Revenue, so that the data payload sent to GP is correct.

When the contract configurations for 'Towne Park Deposited Revenue' or 'Towne Park Responsible for Parking Tax' are enabled or disabled, they have different impacts to either the invoice line items, the Financials (taxes) batch sent to Great Plains, or both.  Currently, the billing system is performing Scenarios 1, 3, and 4 correctly.  We need to change the functionality involved with Scenario 2 below, so that when both of these settings are enabled, we calculate and include the tax amount of the deposited revenue in the data payload sent to Great Plains that is meant to document parking taxes.





Scenario 1: 

Towne Park Deposited Revenue = False

Towne Park Responsible for Parking Tax = False

There is no Deposited Revenue to sum, so no action is required and no line-item appears on the invoice.
Powerbill should not calculate any taxes nor send any data in Financials batch
 

Scenario 2: 

Towne Park Deposited Revenue = True

Towne Park Responsible for Parking Tax = True

Powerbill should calculate taxes for the Deposited Revenue amount, by multiplying the (NetExternalRevenue where deposit flag = Y) times (tax rate for site).  This amount does not appear separately on the invoice, but is added to the Financials batch to GP.
Powerbill should calculate taxes for the Client Collected amount, by multiplying the (NetExternalRevenue where deposit flag = N) times (tax rate for site).  This amount does appear separately on the invoice, AND is added to the Financials batch to GP.
 

Scenario 3: 

Towne Park Deposited Revenue = False

Towne Park Responsible for Parking Tax = True

Powerbill should calculate taxes for the Client Collected amount, by multiplying the (NetExternalRevenue where deposit flag = N) times (tax rate for site).  This amount does appear separately on the invoice, AND is added to the Financials batch to GP.
No Deposited Revenue means there is nothing to appear on the invoice nor send to GP.
 

Scenario 4: 

Towne Park Deposited Revenue = True

Towne Park Responsible for Parking Tax = False

Powerbill should find the Deposited Revenue amount by adding all rows of ExternalRevenue for the site where deposit flag = Y and this amount should appear on the invoice.
There are no tax calculations to perform nor include in the Financials batch.



"	" Given the contract configuration for ""Towne Park Deposited Revenue"" is set to True  
   And the contract configuration for ""Towne Park Responsible for Parking Tax"" is set to True,  
   When the system processes the invoice and Financials batch,  
   Then Powerbill must calculate the tax for the Deposited Revenue amount by:  
      - Multiplying (NetExternalRevenue where deposit flag = Y) by (tax rate for site)  
      - Adding this tax amount to the Financials batch sent to GP  
      - Ensuring this tax amount does not appear separately on the invoice.

2. Given the contract configuration for ""Towne Park Deposited Revenue"" is set to True  
   And the contract configuration for ""Towne Park Responsible for Parking Tax"" is set to True,  
   When the system processes the invoice and Financials batch,  
   Then Powerbill must calculate the tax for the Client Collected amount by:  
      - Multiplying (NetExternalRevenue where deposit flag = N) by (tax rate for site)  
      - Adding this tax amount to the Financials batch sent to GP  
      - Ensuring this tax amount does appear separately on the invoice.

3. Given the contract configuration for ""Towne Park Deposited Revenue"" is set to True  
   And the contract configuration for ""Towne Park Responsible for Parking Tax"" is set to True,  
   When the system processes the Financials batch,  
   Then the Financials batch sent to GP must include:  
      - The tax amount for the Deposited Revenue.  
      - The tax amount for the Client Collected amount.

4. Given the contract configuration for ""Towne Park Deposited Revenue"" is set to True  
   And the contract configuration for ""Towne Park Responsible for Parking Tax"" is set to True,  
   When the system processes the invoice,  
   Then the invoice must:  
      - Include the tax amount for the Client Collected amount as a separate line item.  
      - Exclude the tax amount for the Deposited Revenue from appearing on the invoice.
"
As a Billing Manager, I want to automatically submit REVISED AR & PARKING TAX data to Great Plains so that I can correct the General Ledger data without voiding/reimporting	"BUILT FOR AR AND TAX BATCHES ONLY AT THIS TIME

Reversal of Original Invoice Data
1. Given the Billing Manager clicks the ""Revise"" action for a billing statement,  
   When the system processes the revision,  
   Then the system must generate a full reversal of the original statement's invoice data by:  
      - Sending credits in place of debits and debits in place of credits.  
      - Posting the reversal to the same GP module (AR, AP, or Financials/Taxes) as the original data.  

2. Given the system generates a reversal of the original invoice data,  
   When the reversal is sent to GP,  
   Then the original transactions in GP must be negated, leaving no net impact from the original statement.  

Generation of Revised Invoice Data
3. Given the Billing Manager confirms the revision action,  
   When the system generates the revised billing statement,  
   Then the system must create new invoices with updated data.  

4. Given the system generates the revised invoices,  
   When the revised invoices are sent to GP,  
   Then the system must post the revised data to the appropriate GP module (AR, AP, or Financials/Taxes) as though it were a completely new statement.  

5. Given the system generates the revised invoices,  
   When the revised invoices are sent to GP,  
   Then the system must ensure that the revised data does not duplicate or overwrite the original data in GP.  

Error Handling
6. Given the system encounters an error originating from Great Plains,  
   When the error occurs,  
   Then the system must notify using the existing error email notification pattern"
As an account manager for Towne Park, I want to only see actions I'm allowed to take, so that I don't perform actions in the system that don't belong to my role	"Navigation and Lists
Given the account manager is logged into the system,
when they view the top navigation bar,
then they see links for ""Customers"" and ""Statements.""
Given the account manager is logged into the system,
when they attempt to generate, approve, send, or edit any item,
then they are unable to see the action icons & buttons that initiate those events
Given the account manager is viewing the ""Customers"" list,
when the system displays the data table to the AM,
there is no action icons nor buttons to Generate Statements nor Add Customer
Given the account manager is viewing the ""Statements"" list,
when they attempt to edit, approve, or send any customer data,
then they are unable to see the action icons & buttons that initiate those events
Given the account manager is viewing the ""Statements"" list,
when they select a statement,
then they are allowed to view AM Notes, Invoices, and all Supporting Documents (including comparison to Forecast) and they are allowed to download the statement as a PDF.
Customer Details View
Given the account manager is viewing the ""General Info,"" ""Contract Details,"" or ""Statements"" tabs for a customer site,
when they attempt to edit, approve, or send any data,
then they are unable to see the action icons & buttons that initiate those events
Given the account manager is viewing the ""Statements"" tab,
when they select a statement,
then they are allowed to download the statement as a PDF.

Customer Details View
Given the account manager is viewing the Customer Details view
when they view the navigation tabs for that Customer Details,
then they are only able to see 'Contract Details' and 'Statements' but they cannot see the 'General Info' tab
Given the account manager is viewing the Customer Details view
when they view the tab for 'Contract Details'
then they are unable to see the Revenue Review Threshold section of data"
As a Billing Manager, Admin, and/or Account Manager, I want to download PDF statements in Sent status so I can always access a customers statements	"Given a Statement is in Sent status
When a Billing Manager, Admin, and/or Account Manager views the Statements data tables
Then they are able to Download the PDF via an action icon located to the left of the Revise icon (see screenshot)"
User Story	Acceptance Criteria
"A requirement for including invoice data in the GL batch to Great Plains is that the site must be configured with ""Towne Park Responsible for Parking Tax"" = True for the invoice data to be included in the payload for financials batch.

Currently, we are including any site that has EITHER the ""Towne Park Responsible for Parking Tax"" OR the ""Towne Park Deposited Revenue"" enabled.  This needs to be changed such that we first check for ""Towne Park Responsible for Parking Tax"" = True and only then continue the flow to assemble a financials batch for GP based on the invoice data."	"1. **Given** the system is processing invoice data for inclusion in the GL batch to Great Plains,  
   **When** the site is configured with ""Towne Park Responsible for Parking Tax"" = True,  
   **Then** the invoice data for that site should be included in the payload for the financials batch.  

2. **Given** the system is processing invoice data for inclusion in the GL batch to Great Plains,  
   **When** the site is configured with ""Towne Park Responsible for Parking Tax"" = False,  
   **Then** the invoice data for that site should NOT be included in the payload for the financials batch.  

3. **Given** the system is processing invoice data for inclusion in the GL batch to Great Plains,  
   **When** the site is configured with ""Towne Park Deposited Revenue"" = True but ""Towne Park Responsible for Parking Tax"" = False,  
   **Then** the invoice data for that site should NOT be included in the payload for the financials batch.  

4. **Given** the system is processing invoice data for inclusion in the GL batch to Great Plains,  
   **When** the site is configured with both ""Towne Park Responsible for Parking Tax"" = True and ""Towne Park Deposited Revenue"" = True,  
   **Then** the invoice data for that site should be included in the payload for the financials batch.  

5. **Given** the system is processing invoice data for inclusion in the GL batch to Great Plains,  
   **When** the site is configured with neither ""Towne Park Responsible for Parking Tax"" nor ""Towne Park Deposited Revenue"" enabled,  
   **Then** the invoice data for that site should NOT be included in the payload for the financials batch.  "
"Account Manager View of Customer



As an account manager for Towne Park,

I want to log into the new system to view only my customer(s) in the Customer list,


so that the experience is simplified and streamlined




Step-by-Step Flow:


The account manager logs into the system using their credentials.
The system verifies the account manager’s role and displays the Customers list customized for their assigned customer site(s).
If the Account Manager is only responsible for 1 site, then they see only that site in the Customers list
If the Account Manager is responsible for > 1 site, then they see only those sites in the Customers list
The AM clicks the nav link to see Statements
The AM may only see Statements belonging to sites they are associated to


"	"Login and Dashboard Access
Given the account manager is responsible for =1 site,
when they log in,
then they are automatically directed to the Customers list, 
and they see only the specific customer site they are responsible for
Given an account manager who is responsible for >1 customer site,
when the account manager logs into the system with valid credentials,
then they are automatically directed to the Customers list, 
and they see only the specific customer sites they are responsible for
Navigation and Lists
Given the account manager is logged into the system,
when they view the top navigation bar,
then they see links for ""Customers"" and ""Statements.""
Given the AM is viewing the Statements list
When they view the statements in that list
Then they may only see the statements associated with Customers they belong to



"
"As a Billing Admin I want to manually trigger a 'Unit Accounts' (statistics) batch to send to GP once the close process is complete, so I can update all site statistics in one step at the end of the close process every billing cycle.

User Flow:
Billing Admin completes the monthly billing process
Billing Admin clicks the user settings menu (top right corner hamburger menu) and selects the link to 'Admin Actions' page (this replaces the 'Revenue Review Threshold' link)
Admin is navigated to the Admin-only page that contains the 'Revenue Review Threshold' table and a new tab which is 'Unit Accounts'
Admin inputs the billing cycle to be used in the query for this data
Admin clicks a button to trigger the process
System queries to gather data necessary for the stats payload to GP (see query below and attached)
System formats the data into SmartConnect xml table and sends to GP





--notes - output needs to be fully vetted before use.
-- known things to work on include: Verify that all sites make it into _invoice tables regaardless if they use powerbill & remove sites that have long past closed from pulling rooms/space stat
"	"1. **Successful Manual Trigger of Unit Accounts Batch**
   - **Given** the Billing Admin has completed the monthly billing close process  
   - **When** the Billing Admin navigates to the Admin-only page and clicks the ""Trigger Unit Accounts Batch"" button  
   - **Then** the system executes the query to gather required Unit Accounts statistics data, formats it into the SmartConnect XML table, and successfully sends the payload to GP  

2. **Validation of Data Before Submission**
   - **Given** the billing close process is complete  
   - **When** the Billing Admin triggers the batch  
   - **Then** the system validates that the queried data meets GP's requirements (e.g., non-null values, valid formats) before formatting and sending  

3. **Error Handling for Failed GP Connection**
   - **Given** the billing close process is complete  
   - **When** the system attempts to send the payload to GP and the connection fails  
   - **Then** the system logs the error, displays a notification to the Billing Admin, and retains the payload for retry  

4. **Admin-Only Access Enforcement**
   - **Given** a non-admin user attempts to access the page  
   - **When** the user navigates to the Unit Accounts batch trigger page  
   - **Then** the system blocks access and displays an ""Unauthorized"" error message OR the page is not even accessible/not visible

5. **Confirmation of Successful Submission**
   - **Given** the batch is triggered successfully  
   - **When** the payload is accepted by GP  
   - **Then** the system displays a confirmation message with a timestamp and summary of data sent (e.g., ""200 records sent to GP at [timestamp]"")  

6. **Audit Logging**
   - **Given** any batch trigger attempt (successful or failed)  
   - **When** the action is performed  
   - **Then** the system logs the Billing Admin's user ID, timestamp, and outcome in the audit trail  

7. **XML Formatting Compliance**
   - **Given** valid Unit Accounts data exists  
   - **When** the batch is triggered  
   - **Then** the generated XML strictly adheres to SmartConnect's documented table schema requirements  

8. **Idempotency for Duplicate Triggers**
    - **Given** a batch has already been successfully triggered for the current billing cycle  
    - **When** the Billing Admin attempts to trigger it again  
    - **Then** the system displays a warning: ""Unit Accounts batch for this cycle has already been submitted on [timestamp]"" and blocks duplicate submissions  
"
"As a Billing Manager, I want the ability to resend a Statement but choose to not send the data to GP, or choose not to contact the customer but instead only send to GP

User Flow:
Billing Manager creates a Statement and Sends 
For business reasons, the Statement invoices need to be resent to either GP or the Customer, but not both (re-sending to both would be accomplished via the Revise process)
Billing Manager clicks the new 'Resend' icon found on the Statement in Sent status (icon located to the right of the Revise icon)
System presents a dialog asking the user whether the user wants to ""Resend Statement to Customer or Great Plains?""  with two radio buttons, each showing one of the options, and a button to Resend (which activates the action)
If the user selects the option for Customer, then the system will re-construct the Statement email using currently configured Billing Contact Email list, attach the statement PDF and reports, and Send to the Customer only
If the user selects the option for Great Plains, then the system will re-construct the data payload for Great Plains exactly as it was the first time and send it to Great Plains integration only
Image"	"1. **Resend to Customer Only**  
   - **Given** a Statement exists in Sent status  
   - **When** the Billing Manager selects ""Resend Statement to Customer"" and confirms  
   - **Then** the system regenerates the Statement email using the current Billing Contact Email list, attaches the PDF/reports, and sends it to the customer **without** sending data to GP  

2. **Resend to Great Plains Only**  
   - **Given** a Statement exists in Sent status  
   - **When** the Billing Manager selects ""Resend Statement to Great Plains"" and confirms  
   - **Then** the system reconstructs the original GP data payload and sends it to GP **without** notifying the customer  

3. **Resend Dialog UI Requirements**  
   - **Given** a Billing Manager clicks the Resend icon on a Sent-status Statement  
   - **When** the dialog opens  
   - **Then** it displays two radio buttons (""Resend to Customer"" and ""Resend to Great Plains"") with a Resend button disabled until an option is selected  

4. **Block Unselected Resend Attempt**  
   - **Given** the Resend dialog is open  
   - **When** the Billing Manager tries to click ""Resend"" without selecting an option  
   - **Then** the button remains disabled 

5. **Resend Icon Visibility**  
   - **Given** a Statement is not in Sent status  
   - **When** the Billing Manager views the Statement  
   - **Then** the Resend icon is not displayed  

6. **GP Payload Integrity**  
   - **Given** a resend to GP is triggered  
   - **When** the system reconstructs the payload  
   - **Then** the data matches the original Statement's payload exactly, including all historical values (no recalculations)  

7. **Email Configuration Updates**  
   - **Given** the Billing Contact Email list has changed since the original Statement  
   - **When** resending to Customer  
   - **Then** the system uses the **current** email list, not the original recipient list  

8. **Error Handling for Failed GP Submission**  
   - **Given** a resend to GP is attempted  
   - **When** the GP integration fails  
   - **Then** the system retains the payload, sends an error notification email, and allows retries  

10. **No Status Change on Resend**  
    - **Given** a resend action is completed (to Customer or GP)  
    - **When** the process finishes  
    - **Then** the Statement remains in Sent status (no revision or new version created)  

11. **Permission Enforcement**  
    - **Given** a user without Billing Manager privileges attempts to resend  
    - **When** they access the Statement  
    - **Then** the Resend icon is not visible, and API calls to resend are blocked"
"As a Billing Manager, I want the system to NOT generate a line-item when that line item has an amount of $0.00 so that my Customer doesn't see unnecessary line-items.

User Flow:
Billing Manager generates a Statement for a Customer
System runs calculations to generate line-items
Line-item amount is determined to be $0.00
The Statement is generated without any zero amount line-items
OR, if all line-items are zero amount, no statement is generated


Assumptions:
The system will gracefully handle failures when a Billing Statement doesn't have an associated Invoice row"	"
Line-Item Exclusion for $0.00 Amounts
1. Given the system is generating a Billing Statement for a Customer,  
   When a line-item is calculated to have an amount of $0.00,  
   Then the system must exclude that line-item from the generated Billing Statement.  

2. Given the system is generating a Billing Statement for a Customer,  
   When all calculated line-items for the statement have an amount of $0.00,  
   Then the system must not generate the Billing Statement

Statement Generation with Non-Zero Line-Items
3. Given the system is generating a Billing Statement for a Customer,  
   When at least one line-item has a non-zero amount,  
   Then the system must generate the Billing Statement,  
   And the statement must only include line-items with non-zero amounts.  

Graceful Handling of Missing Invoice Rows
4. Given the system is generating a Billing Statement for a Customer,  
   When the Billing Statement does not have an associated Invoice row,  
   Then the system must gracefully handle the failure

Validation of Statement Output
5. Given the system generates a Billing Statement,  
   When the statement is reviewed by the Billing Manager,  
   Then the statement must not include any line-items with an amount of $0.00.  

6. Given the system generates a Billing Statement,  
   When the statement is sent to the Customer,  
   Then the statement must only include line-items with non-zero amounts,  
   And the statement must accurately reflect the Customer's billing details.  
"
"As a Billing Admin, I want the system to calculate validation line-item amounts using the ratio of NetExternalRevenue associated with each threshold of the first revenue share structure so that validations aren't using multiple threshold structure ratios

User Flow:
Billing Admin configures the Revenue Share section of Contract Details so that it has multiple tiers and/or threshold structures
Billing Admin configures Validations using Revenue Percentage or Revenue Amount only (Vehicle Count is out of scope for this change)
System calculates Validations such that the line-item created uses the ratio of NetExternalRevenue collected in the first threshold structure only as the bill-back value to calculate the validation revenue (instead of assigning a weight to the various share percentages based on their usage across multiple threshold structures)

"	"Validation Bill-Back Calculation for Revenue Percentage and Revenue Amount Types
1. Given the Billing Admin has configured the Revenue Share section of Contract Details with multiple threshold structures of differing share percentage tiers,  
   And the Billing Admin has configured a Validation using the ""Revenue Percentage"" or ""Revenue Amount"" type,  
   When the system calculates the validation bill-back value,  
   Then the system must use the NetExternalRevenue ratio of the first threshold structure only to calculate the bill-back value for the excess validation revenue.  

2. Given the Billing Admin has configured the Revenue Share section of Contract Details with a single threshold structure,
   And the Billing Admin has configured a Validation using the ""Revenue Percentage"" or ""Revenue Amount"" type,  
   When the system calculates the validation bill-back value,  
   Then the system must use the existing logic to calculate the validation revenue without applying this new logic.

Out of Scope for Vehicle Count
3. Given the Billing Admin has configured the Revenue Share section of Contract Details,  
   And the Billing Admin has configured a Validation using the ""Vehicle Count"" type,  
   When the system calculates the validation bill-back value,  
   Then the system must not apply any changes to the calculation logic for Vehicle Count validations, as it is out of scope for this change.
"



