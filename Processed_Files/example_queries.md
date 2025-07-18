# Example Contract Queries

This file contains example queries for common business questions related to Towne Park contracts.

## General Contract Information

### Finding Contracts by Customer
- Query: "Show me all contracts for Hilton hotels"
- Query: "What type of contract does Marriott River Center have?"
- Query: "List all hotels in the Northeast region with Revenue Share contracts"
- Query: "Which healthcare clients are on Management Agreements?"
- Query: "Find all Per Labor Hour contracts in Florida"

### Contract Terms and Dates
- Query: "When does the Disneyland contract expire?"
- Query: "Which contracts have escalators coming up in the next 90 days?"
- Query: "Show me contracts with CPI-based escalators"
- Query: "What are the payment terms for Gaylord Texan?"
- Query: "List contracts with notes mentioning 'parking lot costs'"

### Multiple Invoices Configuration
- Query: "Which sites are set up with multiple invoice groups?"
- Query: "Show me the invoice grouping configuration for Marriott River Center"
- Query: "How many distinct invoice groups does Gaylord have?"
- Query: "What billing email addresses are configured for each invoice group at site 0390?"

## Revenue Share Specific Queries

### Threshold Structures
- Query: "What are the revenue share tiers for Hyatt Regency Chicago?"
- Query: "Which sites have Monthly accumulation type for revenue share thresholds?"
- Query: "Show me contracts with multiple threshold structures"
- Query: "What's the share percentage for the first tier at Hilton San Francisco?"
- Query: "List all sites with annual anniversary threshold accumulation"

### Validation Configuration
- Query: "Which sites have validation thresholds based on percentage of revenue?"
- Query: "What's the validation threshold amount for Hotel Pennsylvania?"
- Query: "Show me all sites with vehicle count validation thresholds"
- Query: "How is the validation threshold calculated for Fairmont San Francisco?"
- Query: "Which sites have the highest validation thresholds?"

### Bell Service and Deposited Revenue
- Query: "Which revenue share sites have Bell Service Fee enabled?"
- Query: "List all sites where Towne Park is responsible for parking tax"
- Query: "Show me sites with Towne Park Deposited Revenue enabled"
- Query: "Which sites have both Bell Service Fee and Deposited Revenue enabled?"
- Query: "What's the Bell Service Fee amount for Westin St. Francis?"

## Management Agreement Specific Queries

### Management Fee Configuration
- Query: "Which sites have a fixed fee management fee structure?"
- Query: "What's the management fee percentage for MGM Grand?"
- Query: "Show me sites where management fee is calculated per labor hour"
- Query: "List management agreements with the highest fixed fee amounts"
- Query: "What's the average management fee percentage across all sites?"

### Billable Accounts
- Query: "What payroll accounts are excluded for Cleveland Clinic?"
- Query: "Show me sites where account 7016 is billable instead of excluded"
- Query: "Which expense accounts are most commonly excluded across contracts?"
- Query: "List sites where PTEB is calculated as a percentage rather than actual"
- Query: "What's the support services percentage for Mayo Clinic?"

### Insurance and Claims
- Query: "Which sites have fixed fee insurance configuration?"
- Query: "What's the claims cap amount for Mount Sinai Hospital?"
- Query: "Show me sites with per-claim caps rather than annual caps"
- Query: "What's the insurance additional percentage at Johns Hopkins?"
- Query: "Which sites have the highest claims caps?"

### Profit Share and Non-GL Expenses
- Query: "Which management agreements include profit share?"
- Query: "What's the profit share percentage for Wynn Las Vegas?"
- Query: "Show me sites with profit share tiers rather than flat percentage"
- Query: "List all non-GL billable expenses for Caesars Palace"
- Query: "Which sites have non-GL expenses with an end date in 2025?"

## Per Labor Hour Specific Queries

### Job Rates Configuration
- Query: "What are the per labor hour rates for GSA positions at Four Seasons?"
- Query: "Show me sites with overtime rates less than 1.5 times regular rate"
- Query: "Which job codes have the highest billing rates?"
- Query: "List all job rates for Bellagio with their effective dates"
- Query: "What's the average GSC rate across all properties?"

### Rate Changes and Escalators
- Query: "Which per labor hour rates will increase in January?"
- Query: "Show me sites where job rates have changed in the last 6 months"
- Query: "What's the increment percentage for Labor Hour rates at Venetian?"
- Query: "List sites with per labor hour rates that haven't changed in over a year"
- Query: "Which job codes will have rate changes next month?"

## Fixed Fee Specific Queries

### Fee Structure
- Query: "What fixed fee services are configured for Memorial Hospital?"
- Query: "Show me the monthly fixed fee amount for Waldorf Astoria"
- Query: "Which sites have multiple fixed fee services configured?"
- Query: "What's the total monthly fixed fee billing across all sites?"
- Query: "List fixed fee services with custom GL account mappings"

### Escalators and Changes
- Query: "When will the fixed fees increase for Presbyterian Hospital?"
- Query: "Show me sites with fixed fees that increase by more than 3% annually"
- Query: "Which fixed fee contracts have the earliest escalation dates?"
- Query: "List all fixed fee amounts before and after upcoming escalators"
- Query: "Which sites have CPI-based escalators for fixed fees?"

## Per Occupied Room Specific Queries

### Rate Configuration
- Query: "What's the per occupied room rate for Ritz Carlton Boston?"
- Query: "Show me all per occupied room rates sorted from highest to lowest"
- Query: "Which sites have per occupied room rates above $5?"
- Query: "What's the average per occupied room rate across luxury hotels?"
- Query: "List per occupied room rates by region"

### Escalators and Room Data
- Query: "When does the per occupied room rate increase for Sheraton Dallas?"
- Query: "Show me the forecasted occupancy and revenue for per occupied room sites"
- Query: "Which per occupied room sites have the highest total available rooms?"
- Query: "List sites where per occupied room rate increases in the next quarter"
- Query: "What's the per occupied room rate after the next escalator for W Hotel?"

## Billing and Invoicing Queries

### Invoice Generation
- Query: "Which sites are ready for invoice generation this month?"
- Query: "Show me billing statements generated for September 2024"
- Query: "List invoices that haven't been sent to customers yet"
- Query: "Which sites have mid-month advances configured?"
- Query: "Show me all invoices for Q2 2025 with their amounts"

### Payment Terms and Status
- Query: "Which sites have 'Due by 20th' payment terms?"
- Query: "Show me sites with the longest payment terms"
- Query: "List invoices that are past due for payment"
- Query: "Which customers consistently pay late?"
- Query: "What's the average days to payment across all clients?"

### Supporting Reports
- Query: "Which supporting reports are included for Four Seasons invoices?"
- Query: "Show me sites that include the Validation Report"
- Query: "List all supporting reports for revenue share sites"
- Query: "Which management agreements include the Labor Distribution Report?"
- Query: "What percentage of sites use the Mix Of Sales report?"

## Forecasting and Revenue Queries

### Revenue Projections
- Query: "What's the forecasted internal revenue for Q3 for the Northeast region?"
- Query: "Show me sites with projected revenue below budget"
- Query: "Compare forecasted vs. actual revenue for August 2025"
- Query: "Which sites have the largest forecasted revenue growth?"
- Query: "What's the total forecasted revenue for management agreement sites?"

### Deviation Alerts
- Query: "Show me sites that have triggered deviation alerts this month"
- Query: "Which sites have deviation thresholds set above $5,000?"
- Query: "List sites with deviation percentage below 10%"
- Query: "What's the most common deviation percentage across all contracts?"
- Query: "Show deviation alerts for the past 6 months for Chicago sites"

### Validation and Tax Forecasting
- Query: "What's the projected validation revenue for Fontainebleau Miami?"
- Query: "Show me forecasted parking tax payments for sites where Towne Park is responsible"
- Query: "Which sites have the highest ratio of validations to total revenue?"
- Query: "List projected bell service revenue for sites with Bell Service Fee enabled"
- Query: "What's the total forecasted deposited revenue across all sites?"

## Compliance and Reporting Queries

### GL Mapping
- Query: "Show me all revenue mapped to GL account 4790"
- Query: "Which fixed fee services use non-standard GL accounts?"
- Query: "List all GL accounts used across all contracts"
- Query: "What revenue codes are associated with each GL account?"
- Query: "Show me unusual GL mapping configurations"

### Tax Handling
- Query: "Which sites is Towne Park responsible for parking tax?"
- Query: "Show me the total parking tax collected by region"
- Query: "List all sites with tax rates above 8%"
- Query: "Which sites have special tax handling notes?"
- Query: "Show me total tax submitted to Great Plains this year"

## Complex/Hybrid Contract Queries

### 10 Percenter Contracts
- Query: "List all sites classified as '10 percenters'"
- Query: "What makes site 0600 a 10 percenter contract?"
- Query: "Show me the special terms for complex contracts"
- Query: "Which 10 percenter sites have been migrated to standard contract types?"
- Query: "List the remaining 10 percenters scheduled for migration"

### Hybrid Contracts
- Query: "Which sites have both Revenue Share and Fixed Fee components?"
- Query: "Show me hybrid contracts with more than two billing components"
- Query: "List all billing components for the Atlantis Resort contract"
- Query: "What percentage of sites have hybrid contract structures?"
- Query: "Which hybrid contract generates the most revenue?"

