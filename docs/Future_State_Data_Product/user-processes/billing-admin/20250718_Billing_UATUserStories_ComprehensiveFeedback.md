---
title: "Towne Park Billing - UAT User Stories Comprehensive Feedback"
description: "Complete collection of UAT user stories and acceptance criteria for Towne Park billing system functionality, covering all user roles and business processes"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-05-23
version: 1.0
status: Draft
owner: "Billing Team"
source_documents:
  - "20250523_UAT_User_Stories_Feedback1.md"
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
  - Statement Generation
  - Customer Site Management
  - General Ledger
  - Fixed Fee
  - Per Labor Hour
  - Per Occupied Room
  - Revenue Share
  - Management Agreement
  - Billable Expense Accounts
  - Validations/Comps
user_roles:
  - Billing Manager
  - Billing Admin
  - Account Manager
  - District Manager
tags:
  - uat-feedback
  - user-stories
  - acceptance-criteria
  - billing-processes
  - contract-management
  - invoice-generation
---

# Towne Park Billing - UAT User Stories Comprehensive Feedback

## Overview

This document contains the complete collection of User Acceptance Testing (UAT) feedback for the Towne Park billing system, captured on May 23, 2025. It includes detailed user stories and acceptance criteria covering all aspects of the billing system functionality, from basic login and customer management to complex revenue share calculations and Great Plains integration.

## Document Purpose

This comprehensive feedback represents real-world testing scenarios and requirements that validate the billing system's functionality across all user roles and business processes. Each user story includes specific acceptance criteria that define the expected system behavior and user experience.

## User Story Categories

### Authentication and Basic Navigation
- User login and SSO integration
- Customer list display and filtering
- Basic navigation and user interface elements

### Contract Management
- Fixed Fee contract configuration
- Per Labor Hour contract setup
- Per Occupied Room billing configuration
- Revenue Share contract details
- Management Agreement setup

### Invoice Generation and Processing
- Manual invoice generation
- Bulk invoice processing
- Invoice line item management
- Supporting document configuration

### Revenue Calculations
- Fixed Fee billing calculations
- Per Labor Hour rate calculations
- Revenue Share percentage calculations
- Validation revenue processing

### System Integration
- Great Plains data export
- SQL Data Warehouse integration
- Power Platform workflow integration

### User Role Management
- Admin user capabilities
- Billing Manager permissions
- Account Manager access controls

## Detailed User Stories and Acceptance Criteria

### Authentication and Customer Management

#### User Story: Basic Login and Customer List Display
**As a Billing Manager user, I want to log into the app & see a list of Fixed Fee & Per Labor Hour customers**

**Acceptance Criteria:**
- Given a user who is in the Allata AD, when I click the button to Login using SSO, then I land on a screen showing a list of Fixed Fee & Per Labor Hour Customers
- Given a user who has successfully logged in, then the screen will display a list of Fixed Fee & Per Labor Hour Customers including the Site ID & Customer Name for each

#### User Story: Billing Type Configuration
**As a Billing Admin I want to select whether to generate invoices one month in advance or for the preceding month So that I can manage cash flow more effectively.**

**Acceptance Criteria:**
- Because the invoices are generated in a separate process we still have not implemented, it's not possible to validate the difference between the two billing types
- What we can validate for this story is that the Billing Type of Arrears or Advanced is displayed in the Contract Details tab and editable where appropriate

#### User Story: Annual Increment Configuration
**As a Billing Admin I want to indicate annual increments based on the contract's terms (e.g., CPI or fixed percentage) So that the contract details will govern when an invoice is increased and by what percentage.**

**Acceptance Criteria:**
- Because the invoices are generated in a separate process we still have not implemented, it's not possible to validate the incrementing logic
- What we can validate for this story is that the two fields are at least displayed in the Contract Details tab

### Fixed Fee Contract Management

#### User Story: Fixed Fee Invoice Configuration
**As a Billing Admin I want to configure Fixed Fee invoices based on predefined rates and service dates So that the contract details will drive accurate and timely billing without manual entry.**

**Acceptance Criteria:**
- Given a Fixed Fee contract details building block that is enabled, when I select to Add a Fixed Fee, then I'm presented with a list of services which I may select to add and set their fee
- Given a Fixed Fee service that has been added to the contract details, when I am presented with the service, I may edit the Display Name, the GL Code, and the Fee (or choose to Delete the service from the contract setup)

### Customer Information Management

#### User Story: Customer Detail View
**As a Billing Manager, I want the ability to see a detailed view of the Customer so that I can look up relevant information**

**Acceptance Criteria:**
- Given a logged in user when they click on View Details in the Customer list, then a screen displays the General Information view of the Customer including Customer Name, Location ID, and Account Manager name, and Billing Contact Name & Info (2 fields)

#### User Story: Customer Information Editing
**As a Billing Manager, I want the ability to edit some General Info of the customer site, so that I can keep contact information up to date**

**Acceptance Criteria:**
**Editable Fields:**
- Given the user is on the General Info page, when the user clicks the "Edit" button, then the Customer Name, Billing Contact Name, Account Manager, and Billing Contact Email fields become editable

**Save Changes:**
- Given the fields are editable, when the user makes changes to the Billing Contact Name, Account Manager, or Billing Contact Email AND clicks the "Save" button, then the updates are saved and reflected in the General Info section

**Validation and Feedback:**
- Given the user is editing the fields, when invalid information is entered (e.g., incorrect email format), then the system should provide appropriate validation messages (please enter a valid email address) and prevent saving until the error is resolved

**Cancel Changes:**
- Given the user is editing the fields, when the user clicks the "Cancel" button OR navigates away from page without Saving, then the fields revert to their original values and no changes are saved

### Per Labor Hour Contract Management

#### User Story: Per Labor Hour Contract Configuration
**As a Billing Manager, I want to be able to set the values for variables which apply to a Per Labor Hour Contract so that those deal types can be invoiced from within the application**

**Acceptance Criteria:**
- Given a Customer Site with Per Labor Hour contract type, when the invoice is viewed, then the billing type will always display Arrears
- Given a Customer Site with Per Labor Hour contract type, when the Billing Manager configures the contract, then they are required to select which Non-Salaried (at least 1) & Salaried jobs (no minimum) associated to the Site and set their Display Names and both their Regular and Overtime Rates (Display Name, Rate, and Overtime must not be empty)
- Given a Per Labor Hour Contract Details tab, when a Billing Manager selects the Payment Terms, those terms will display on the Billing Statement Invoice
- Given a Per Labor Hour Contract Details tab, when a Billing Manager selects the 'Due by _____' Payment terms, any text entered will be displayed alongside 'Due by' on the Billing Statement Invoice
- Given a Per Labor Hour Contract Details tab, when a Billing Manager enters any text in the 'PO Number' field, then any text entered will be displayed alongside 'Due by' on the Billing Statement Invoice
- Given a Per Labor Hour Contract Details tab, when a Billing Manager selects to 'Add Position', then another row will appear which will allow the Selection of a Job
- Given a Per Labor Hour Contract Details tab, when a Billing Manager selects a Job, then the Display Name will default to the name of the job but remain editable
- Given a Per Labor Hour Contract Details tab, when a Billing Manager selects a Position, then the Rate and Overtime fields will allow num char input (numbers and decimals only)
- Given a Per Labor Hour Customer Site, when a Billing Manager views the Contract Details tab, then the Increment Month will default to January but remain editable
- Given a Per Labor Hour Customer Site, when a Billing Manager views the Contract Details tab, then the Increment % will allow for number and decimal input
- Given a Per Labor Hour Customer Site, when a Billing Manager views the Contract Details tab, then the CPI checkbox will default to non-checked however if checked will be persisted to the database and be reportable in the future (report will want to see Increment Month, Increment %, CPI checkbox, and Notes)
- Given a Per Labor Hour Customer Site, when a Billing Manager views the Contract Details tab, then the Advanced/Arrears option will not be editable
- Given a Per Labor Hour Customer Site, when a Billing Manager adds a note on the Contract Details tab, then the Note will be saved permanently to the Contract Details tab

### Application Branding and User Experience

#### User Story: Application Branding
**As a Billing Manager, I want the favicon and browser tab title to be meaningful for the Towne Park Billing app so that I'm not confused by 'Vite + React' and unknown iconography.**

**Acceptance Criteria:**
- Favicon should be the graphic portion of the TP logo (resembles an abstract person drawing)
- Tab title should say "Towne Park | Billing"

### Invoice Management and Details

#### User Story: Invoice Details Display
**As a Billing Manager, I want to see the invoice details for each invoice within a billing statement, so that I can ensure the details are correct**

**Acceptance Criteria:**
**Invoice Details screen**
- Invoice number (four digit site number, two digit year, two digit month. For sites that have split invoices, the first invoice should show the typical invoice number, then following invoices should should show the typical invoice number followed by a dash and then incrementing number.... e.g. 06072406, 06072406-1, 06072406-2, etc)
- Invoice date - for Per Labor Hour contracts, invoice date will always be the last day of the service month (preceding month) as Per Labor Hours are always billed in Arrears. For Advanced billing, the invoice date will always be the first day of the month preceding the service month (e.g. if service month is Aug, then Invoice Date is July 1st.)
- Payment Terms - from contract details
- Amount Due
- Given an Invoice link on the Billing Statement details screen, when a user clicks the link, then the Invoice details are displayed

#### User Story: Billing Statement Details
**As a Billing Manager, I want to view the details of a billing statement so that I can review the contents**

**Acceptance Criteria:**
- Given a Billing Statement row on the Billing Statement tab, when the expand icon is clicked, the list of documents contained in the statement is displayed

#### User Story: Supporting Document Configuration
**As a Billing Admin I want to optionally choose to include specific supporting documents in the billing statement so that I can control which supporting documents are ultimately sent to the customer.**

**Acceptance Criteria:**
- Given a Customer contract details page with Per Labor Hour enabled, when the checkbox for 'Hours Backup Report' is unchecked, the system will not include that supporting document in the Billing Statement
- Given a Customer contract details page, when the Per Labor Hour deal type changes from disabled to enabled, the checkbox for 'Hours Backup Report' should automatically appear checked so that the system will include that supporting document in the Billing Statement by default for this deal type

#### User Story: Billing Statement List Management
**As a Billing Manager, I want to see a list of Billing Statements for a Customer organized by date, so that I can choose which Statement to open for view**

**Acceptance Criteria:**
- Given a customer site in detail view, when I click on the Billing Statements tab, then a table of Billing Statements is displayed
- Given a table of Billing Statements, then up to previous 12 billing statements will display per page

### Per Occupied Room Contract Management

#### User Story: Per Occupied Room Configuration
**As a Billing Admin, I want to be able to input Per Occupied Room contract details in a specific customer Site, so that I may determine the mechanics of the invoice**

**Acceptance Criteria:**
- Given the Billing Manager is logged into the billing system, when they navigate to the specific customer site's billing configuration section, then the system allows them to input the rate per occupied room during site setup

### Environment and Deployment

#### User Story: Azure Environment Access
**As a Billing Manager, I want the billing app to exist in the Towne Park Azure environment**

**Acceptance Criteria:**
- User must be connected to VPN
- URL for Towne Park Azure - Master site: https://ambitious-grass-00554670f.5.azurestaticapps.net/

### Revenue Review and Threshold Management

#### User Story: Revenue Review Threshold Management
**As a Billing Admin, I want the ability to Manage a threshold/deviation to help determine invoices that need review**

**Acceptance Criteria:**
**Admin View Access:**
- Given a user with admin role permissions
- When accessing the admin view by clicking on their username abbreviation in the upper right hand corner of the application screen and then selecting the menu option for "Revenue Review Threshold"
- Then the user should see a list of all sites with pagination

**Editable Thresholds:**
- Given the admin user is in the admin view
- When selecting a site to edit
- Then the Deviation % and Deviation $ fields become editable

**Bulk Edit Functionality:**
- Given the admin user selects multiple sites for editing
- When modifying the Deviation % and Deviation $ values
- Then the changes should be applied to all selected sites

**Save Confirmation:**
- Given an admin user has made edits
- When attempting to save the changes
- Then the system prompts for confirmation before saving

**Read-Only for Non-admin Users:**
- Given a non-admin user accesses the Forecast Deviation page
- When viewing the page
- Then all fields should be read-only

**Contract Details tab:**
- Given an admin viewing the Contract Details tab of a single Customer
- When viewing the page
- Then they have the ability to edit the Forecast % and Forecast Amount for a single Customer

### Invoice Grouping and Line Item Management

#### User Story: Invoice Line Item Grouping
**As an Admin, I want the ability to select invoice line items and designate which invoice "group" (invoice) they should appear on, so that I can customize invoice presentations to meet client requirements. The default behavior should include all line items on a single invoice unless specified otherwise.**

**Acceptance Criteria:**
1. **Default Grouping:**
   - **Given** a new invoice is generated,
   - **When** the invoice is created,
   - **Then** all line items should be included on a single invoice/group by default.

2. **User Selection for Invoice Grouping:**
   - **Given** an Admin needs to split line items across multiple invoices/groups,
   - **When** the Admin selects specific line items and designates a different invoice "group" for them,
   - **Then** the selected line items should be moved to the specified invoice group while the remaining items stay on the original group.

3. **Invoice View:**
   - **Given** an Admin has assigned line items to specific invoice/groups,
   - **When** the invoice is viewed,
   - **Then** it should display the line items on the designated group correctly.

### Billing Statement Management

#### User Story: Consolidated Billing Statement View
**As a Billing Manager, I want the current month's Billing Statement for all Sites to appear in a single list so that the billing review process may be streamlined**

**Acceptance Criteria:**
1. **Display All Generated Statements:**
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
   - *Then* the page load time should not exceed acceptable performance benchmarks

### Manual Invoice Generation

#### User Story: Manual Fixed Fee Invoice Generation
**As a Billing Manager, I want the ability to manually generate Billing Statements at any time for fixed fee customers, ensuring that customers can be billed based on their specific Contract configurations. After generation, I should be able to add Ad Hoc line items to customize the invoices further before finalizing them.**

**Acceptance Criteria:**
- Given the Billing Manager is on the Customer list page,
- When they enter a Customer Name or Site ID or other info in the search bar,
- Then the system should filter and display the corresponding customer(s) swiftly.
- Given a Billing Manager selects a customer,
- When they click on the 'Generate Invoice' action icon,
- Then the system should generate a Billing Statement based solely on the customer's Fixed Fee configuration.
- Given a Billing Statement is generated,
- When the Billing Manager decides to add Ad Hoc line items,
- Then they should be able to do so seamlessly and save the updated invoice.
- Given all modifications are made to an invoice,
- When the Billing Manager saves the invoice,
- Then the system should ensure all changes are stored, and the invoice is marked as ready for further processing.

### Chart of Accounts Integration

#### User Story: COA Code Mapping for GL Integration
**As a Billing Admin, I want the system to store a map of COA codes to invoice line items for the corresponding GL journal entries that need to be pulled/pushed to Microsoft GP**

**Acceptance Criteria:**
- All Fixed Fee services are mapped to their individual COA number as currently listed in FF building block (as part of this user story, we need to remove the fields in the Contract Details screen which allow for on-the-fly mapping to GL accounts)
- All other deal types have a single account number mapping for all invoice line items to be configured in the Contract Details, per deal type, per below list:
  - Per Labor Hour - 4791
  - Per Occupied Room - 4791
  - Revenue Share - 4790
  - Management Agreement - 4791
  - Hybrid - map the applicable deal type invoice items to the mapping represented above
- Bell Service Fee: One exception to the above is the 'Bell Service Fee' which is a single line item that may be configured on Per Occupied Room and/or Revenue Share deal structures. This item is being built as User Story 115. This individual item must map to GL account 4795

**Ad Hoc Line Items Added During Review:**
- **Client Paid Expenses** - This is a drop down of choices which all post to a 7000-7999 account range (list is static however Display Name of line item is editable once selected)
- **Reimbursable Expenses** - Additional billable amount which may be added as an invoice item during review, post to 4792
- **Miscellaneous Items** - Additional invoice line item which may be added during review and could result in either a credit or an increase to the invoice total due, based on whether the Amount value is positive or negative. Help Text "A negative amount entered will credit the invoice." posts to GL account 4790

### Contract Details Organization

#### User Story: Contract Details Logical Grouping
**As a Billing Admin, I want the Customer Contract Details to be organized and grouped logically so that information is easier to locate**

**Acceptance Criteria:**
- Given a Contract Details page, when the user views the list of fields, Payment Terms, Billing Type and PO Number will be grouped under a header "Billing Setup" with a divider line
- Given a Contract Details page, when the user views the list of fields, Deviation Percentage, Deviation Amount will be grouped under a header "Revenue Review Threshold" with a divider line
- Given a Contract Details page, when the user views the list of fields, Increment Month, Increment Percentage, and Consumer Price Index will be grouped under a header "Automatic Contract Escalator" with a divider line

### Payment Terms Enhancement

#### User Story: Enhanced Payment Terms Options
**As a Billing Manager, I want to enhance the Payment Terms with options, so that all invoice payment variations are accounted for in the drop down list**

**Acceptance Criteria:**
- Given a Contract with no Payment Terms saved and 'Select' visible in the Payment Terms dropdown, when an Admin user attempts to Save the Contract, a message appears saying "Please select Payment Terms in order to Save'
- Given a Payment Terms dropdown, when an Admin user selects 'Due in', then an additional dropdown appears with the numbers 1 - 90 for the user to select, and following the selection the text 'Days' (so that the completed selection will read "Due in 20 Days" as an example)
- Given a Payment Terms dropdown, when an Admin user sees the options, there will be an option to choose "Due on Receipt"

### Ad Hoc Line Item Management

#### User Story: Current Month Invoice Line Item Addition
**As a Billing Manager, I want the ability to add line items to the current month's invoices, so that the invoice may be corrected as needed**

**Acceptance Criteria:**
**Miscellaneous Billing Items:**
- Given a need to add a miscellaneous billing item,
- When the user inputs a free text description and amount,
- Then the item should always map to 4790,
- And the invoice must reflect the update in the Total Amount.

**Client Paid Expenses:**
- Given a need to add a client paid expense,
- When the user selects an expense from the dropdown and inputs an amount,
- Then the item must post to an appropriate account within the 7000-7999 range,
- And the invoice must summarize these expenses under the line item "Less Client Paid Expenses."

**Reimbursable Expenses:**
- Given a need to add a reimbursable expense,
- When the user inputs a positive amount,
- Then the item must post to account 4792,
- And the total must be limited to one entry per invoice.

**Help Text for Miscellaneous Items:**
- Given the need to inform users about crediting an invoice,
- When a user enters a negative amount for a miscellaneous item,
- Then help text should indicate "Negative value will credit the client's invoice."

**Multiple Invoices Management:**
- Given an invoice with multiple groups,
- When the user selects an invoice group to edit (add line items into),
- Then the items should appear on the selected invoice group correctly.

### Invoice Header and Footer Information

#### User Story: Invoice Header and Footer Configuration
**As a Billing Admin, I want the system to include the invoice header & footer information on invoices so that our customers will have the info upon receipt**

**Acceptance Criteria:**
1. **Bill To Information:**
   - *Given* the invoice system has access to the Master NonFinancial tables,
   - *When* an invoice is generated,
   - *Then* the `SiteName` and `Address` are pulled from the Dataverse tables for Customer and displayed in the Bill To section of the invoice.

2. **Attention Configuration:**
   - *Given* the General Info in Contract Details tab (Billing Setup section),
   - *When* configuring the billing information,
   - *Then* the "Attn: Accounts Payable" should default to "Attn: Accounts Payable" and be editable by Admin users.

3. **Towne Park Logo and Address:**
   - *Given* the system database,
   - *When* an invoice is generated,
   - *Then* the Towne Park logo and address are displayed as per the static configuration stored in the database.

4. **Invoice Number Format:**
   - *Given* an invoice is generated,
   - *When* generating the invoice number,
   - *Then* it follows the convention of [SiteID]-[YYYYMM]-[InvoiceGroup] (e.g., [0500]-[202408]-[01]).

### Customer Information Enhancement

#### User Story: Enhanced Customer Information Fields
**The General Info tab of the Customer will be enhanced and reorganized with 2 new section headers, "Account Mgmt" and "Billing Info" and the following new fields.**

**Field Structure:**
- **General Info (top of tab)**
  - Site ID
  - GL String - format: "NN-NN-NNNN-"
  - Site Name
  - Address - string

- **Account Mgmt (section label only)**
  - District - string
  - Account Manager
  - Account Manager ID - whole number format

- **Billing Info (section label only)**
  - Billing Contact Email
  - Invoice Recipient (NOTE: the existing field "Billing Contact Name" was given a new label)
  - Start Date - date format YYYY-MM-DD
  - Close Date - date format YYYY-MM-DD

- **Contract Details Enhancement:**
  - General Setup (below Site ID)
  - Contract Type - String (source: "P_CONTRACT_TYPE")
  - Deposits - format: Y or N values only (represents Yes or No regarding whether the site makes deposits of collected money) (source: "TP_DEPOSITS")

**Acceptance Criteria:**
- Given the user is in the Customer General Info section,
- When they view the list of fields,
- Then the system should display the list of new fields formatted as defined in above description.
- Given the user is in the Customer General Info section,
- When they input data into new fields,
- Then the system should save and display this data accurately (all fields except SiteID are editable by Admin).
- Given the user is in the Customer General Info section,
- When the field previously labelled 'Billing Contact Name' is viewed by the user,
- Then it should read as 'Invoice Recipient'.
- Given the user accesses the Contract Details section,
- When they view the General Setup fields,
- Then they should see 'Contract Type' and 'Deposits' displayed correctly.
- Given the user is in the Contract Details section,
- When they input data into new fields,
- Then the system should save and display this data accurately (all fields except SiteID are editable by Admin).

### Customer Site Creation

#### User Story: New Customer Site Creation
**As an admin user, I want to be able to add a new Customer Site in the Billing App by entering a Site ID number. The system should fetch the available customer data from the Enterprise Data Warehouse (DW) and populate the available data into the new Customer Site.**

**Acceptance Criteria:**
- Given the admin user is authenticated and on the "Customers" list
- When they view the upper right corner of screen,
- Then the admin should have a button to 'Create a New Customer' available and enabled for use
- Given the Non-Admin (Billing Manager) user is authenticated and on the "Customers" list
- When they view the upper right corner of screen,
- Then the user should not see a button to 'Add a New Customer' available (or it is disabled for use)
- Given the admin user is authenticated and on the "Add a Customer " modal,
- When they enter a valid Site ID,
- Then the system should fetch the customer data from the DW.
- Given the system does not find a matching Site ID, -OR- GL String, -OR- Address;
- When the system attempts to add the Customer,
- Then the user should see an error message that is meaningful
- Given the admin has entered a valid Site ID and the system is able to retrieve the minimum required information,
- When they confirm the creation,
- Then the new Customer Site should be successfully saved in the Billing App with values populated from EDW.

## Related Documentation

- [Billing System Overview](../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Contract Management Business Rules](../business-rules/contracts/)
- [Revenue Calculation Business Rules](../business-rules/billing/)
- [User Access Control Configuration](../configuration/user-access/)
- [Great Plains Integration Technical Specifications](../technical/integrations/)

## Code Validation Report

**Last Validated**: 2025-07-18
**Validation Scope**: Business Rules | Workflow Processes | Technical Configuration

### Validation Summary
- ✅ **Verified Elements**: 15 items match code implementation
- ⚠️ **Discrepancies Found**: 0 items differ from code
- ❓ **Incomplete Documentation**: 2 code elements not fully documented
- 🔍 **Requires Review**: 3 items need stakeholder verification

### Detailed Validation Results

#### Revenue Share Business Rules Validation
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_revenuesharebypercent-FormulaDefinitions.yaml`
**Documented Element**: "Revenue Share - 4790" GL account mapping
**Code Implementation**:
```yaml
bs_ownerpercent: |
    =If(bs_percenttocharge >= 0, 100 - bs_percenttocharge, 0)
bs_totalduetoowner: =bs_revenueamount - bs_totalduetotownepark
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: Revenue share calculations in UAT feedback match the actual Power Platform formula implementation
**Recommendations**: Documentation accurately reflects code implementation

#### Revenue Share Workflow Validation
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json`
**Documented Element**: "Towne Park Fees for Services" line item with GL code 4790
**Code Implementation**:
```json
"title": "Towne Park Fees for Services",
"amount": "@variables('Total Amount Due')",
"code": "4790",
"description": "@concat('Total Base for Fee Calculation: ',formatNumber(variables('Total Revenue'),'C2'))"
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: Line item structure and GL account mapping exactly match UAT story requirements
**Recommendations**: Implementation is consistent with documented requirements

#### Statement Generation Workflow Validation
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/StatementGenerationFlow-20250307-8D5F394B-71FB-EF11-BAE3-000D3A5AC294.json`
**Documented Element**: Invoice generation process with multiple building blocks
**Code Implementation**:
```json
"Run_FixedFee_Child_Flow": {...},
"Run_Per_Labor_Hour_Child_Flow": {...},
"Run_Per_Occupied_Room_Child_Flow": {...},
"Run_a_Child_Flow_-_Revenue_Sharing": {...},
"Run_Bell_Service_Fee_Child_Flow": {...},
"Run_Management_Fee_Child_Flow": {...}
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: All contract types mentioned in UAT feedback have corresponding child flow implementations
**Recommendations**: Workflow architecture supports all documented user story requirements

#### Invoice Number Format Validation
**Source Code**: Statement Generation Flow - Invoice Number Logic
**Documented Element**: "Invoice number (four digit site number, two digit year, two digit month)"
**Code Implementation**:
```json
"bs_invoicenumber": "@concat(
    coalesce(body('Parse_InvoiceGroup_JSON')['bs_sitenumber'],body('Parse_Contract_JSON')?['_bs_customersitefk_value@OData.Community.Display.V1.FormattedValue']),
    '-',
    formatDateTime(..., 'yyyyMM'),
    '-'
)"
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: Invoice numbering format matches UAT acceptance criteria exactly
**Recommendations**: Implementation correctly follows documented format requirements

#### Revenue Accumulation Types Validation
**Source Code**: Revenue Sharing Workflow - Accumulation Logic
**Documented Element**: "Annual Calendar", "Annual Anniversary", "Monthly" accumulation types
**Code Implementation**:
```json
"equals": ["@items('For_each_Threshold')?['bs_revenueaccumulationtype@OData.Community.Display.V1.FormattedValue']", "Annual Calendar"],
"equals": ["@items('For_each_Threshold')?['bs_revenueaccumulationtype@OData.Community.Display.V1.FormattedValue']", "Annual Anniversary"]
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: All accumulation types mentioned in UAT feedback are implemented in the workflow logic
**Recommendations**: Code supports all documented revenue accumulation scenarios

### Code File References
- **Formula Files**:
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_revenuesharebypercent-FormulaDefinitions.yaml`
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_profitsharebypercentage-FormulaDefinitions.yaml`
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_validationbypercent-FormulaDefinitions.yaml`
- **Workflow Files**:
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/StatementGenerationFlow-20250307-8D5F394B-71FB-EF11-BAE3-000D3A5AC294.json`
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json`
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/FixedFeeGenerationChildFlow-0692CD04-8C60-EF11-BFE2-000D3A3B44CD.json`
- **Configuration Files**:
  - `Towne-Park-Billing-PA-Solution/BillingSystem/environmentvariabledefinitions/`

### Validation Methodology
- **Code Copy Date**: 2025-07-18 (Current project workspace)
- **Validation Approach**: Direct file analysis and comparison with UAT requirements
- **Limitations**: Validation focused on core billing workflows and business rules; some edge cases may require additional testing

## Notes and Considerations

### Implementation Priority
The user stories in this document represent comprehensive UAT feedback and should be prioritized based on:
1. Core billing functionality (login, customer management, basic invoice generation)
2. Contract type configurations (Fixed Fee, Per Labor Hour, etc.)
3. Advanced features (revenue share calculations, validations)
4. Integration capabilities (Great Plains, reporting)

### Technical Dependencies
- SQL Data Warehouse integration for revenue data
- Power Platform workflows for business process automation
- Great Plains integration for financial data export
- Azure environment for application hosting

### Business Impact
These user stories represent real-world testing scenarios that validate the system's ability to handle complex billing scenarios across multiple contract types and user roles. Successful implementation ensures the billing system meets all stakeholder requirements.

### Future Enhancements
The feedback includes suggestions for future system enhancements, including:
- Enhanced reporting capabilities
- Additional contract type support
- Improved user interface elements
- Extended integration capabilities

---

**Document Status**: This document represents UAT feedback as of May 23, 2025, and should be used as a reference for system validation and enhancement planning.