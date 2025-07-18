# Business Rules for Contract Processing

This document contains comprehensive explanations of contract calculations and business logic used at Towne Park for customer contracts.

## Revenue Share Calculation Rules

### Threshold Calculation
- **Monthly**: Thresholds reset each month; revenue is counted from the 1st of each month
- **AnnualCalendar**: Thresholds calculated on calendar year (Jan-Dec); revenue accumulates throughout year
- **AnnualAnniversary**: Thresholds calculated on contract anniversary; revenue accumulates for 12 months from start date

### Tier Application
Multiple tiers create a progressive calculation (similar to tax brackets):

- Example: If tiers are [0-$50k: 20%, $50k+: 30%], and revenue is $75k
  - First $50k calculated at 20% = $10k
  - Remaining $25k calculated at 30% = $7.5k
  - Total = $17.5k

### Multiple Threshold Structures
Some complex revenue share contracts may have multiple threshold structures, each with their own tiers and revenue codes:

- Revenue codes must be assigned uniquely to one threshold structure
- Each threshold structure has its own set of tiers
- Different types of revenue (e.g., valet vs. self-park) can have different revenue share percentages
- Example: Ballet revenue might be shared at 27.5% while Self-Park revenue is shared at 9.5%

### Validation Rules
Validations reduce the revenue base before revenue share calculations. These are discounts or complimentary parking that clients offer which exceed an agreed-upon threshold.

Three validation threshold types:
- **RevenuePercentage**: Validations above a percentage of revenue are billable
  - Example: If threshold is 10% of $90,000 NetExternalRevenue and actual validations are $50,000, then billable validations = $50,000 - (10% × $90,000) = $41,000
  - With 20% share rate, billing would be 20% × $41,000 = $8,200
- **VehicleCount**: Validations above a certain number of vehicles are billable
  - Calculations use the BILLABLE_NET_VALIDATIONS column
- **ValidationAmount**: Validations above a specific dollar amount are billable
  - Example: If threshold is $25,000 and actual validations are $50,000, then billable validations = $50,000 - $25,000 = $25,000
  - With 10% share rate, billing would be 10% × $25,000 = $2,500

When validation threshold is exceeded, the excess is billable as "Towne Park Fees for Validated Parking"

### Revenue Codes
Revenue codes determine which revenue streams are included in calculations:
- SD1, VD1, SM1, VM1, VO1, etc. correspond to specific parking service types
- SD = Self Daily, VD = Valet Daily, etc.
- Bell Service revenue (OR1, OR2) is handled separately when Bell Service Fee is enabled

### Bell Service Fee
- When enabled alongside Revenue Share, revenue codes OR1 and OR2 are excluded from Revenue Share
- Bell Service Fee has its own invoice line item
- In Power BI reports, these revenue codes are excluded from the Miscellaneous line item

### Deposited Revenue
- When "Towne Park Deposited Revenue" is enabled, revenue deposited by Towne Park is tracked separately
- Appears as a credit line item on invoice ("Less: Towne Park Deposited Revenue")
- Flag "Towne Park Responsible for Parking Tax" determines tax handling:
  - When true: Towne Park calculates and pays parking tax on deposited revenue
  - When false: Client is responsible for parking tax on deposited revenue

## Management Agreement Calculation Rules

### Management Fee Calculation
Management Agreements require a management fee, which can be calculated in three ways:
- **FixedFee**: Fixed monthly amount specified in contract
- **PerLaborHour**: Labor hours multiplied by specified rates per job code
- **RevenuePercentage**: Specified percentage of revenue

The Management Fee will always be mapped to GL account #4790.

### Billable Accounts
Management Agreement requires Billable Accounts to be enabled, with these characteristics:
- Payroll accounts (6000-series) can be marked as billable or excluded
- Expense accounts (7000-series) can be marked as billable or excluded
- Default excluded accounts: 
  - 6010 (PTO Hourly)
  - 6014 (Other)
  - 7005 (Bad Debt)
  - 7016 (Contract Improvements)

### Insurance Calculation
Insurance can be calculated in two ways:
- **FixedFee**: Fixed monthly amount specified in contract
- **BasedOnBillableAccounts**:
  - Sum of billable insurance accounts (7080, 7082, 7085)
  - Plus insuranceAdditionalPercentage of these accounts
  - For Management Agreements, insurance is typically calculated at 5.77% of payroll plus vehicle insurance

### Claims Calculation
Claims have specific handling rules:
- Claims are capped based on claimsCapAmount
- Cap resets according to claimsType:
  - **AnnualCalendar**: Calendar year (Jan-Dec)
  - **AnnualAnniversary**: Contract anniversary date
  - **PerClaim**: Each claim has its own cap
- When cap is reached, additional claims are not billable for remainder of period

### Profit Share Calculation
For Management Agreements with Profit Share:
- Profit = Revenue - Billable Expenses
- Profit share tiers determine Towne Park's percentage of profit
- Accumulation type determines how profit is tracked:
  - **Monthly**: Profit calculated monthly
  - **AnnualCalendar**: Calendar year (Jan-Dec)
  - **AnnualAnniversary**: Contract anniversary date
- Non-GL Billable Expenses are included in profit calculation

### Non-GL Billable Expenses
- Can be Fixed Amount, % of Payroll, or % of Revenue
- May have an end date (finalPeriodbilled) after which they stop billing
- Included both as line items and in profit calculations
- If Profit Share is enabled, these are included in the Profit Share calculation as expenses (reducing the profit amount)

### Payroll Account Inclusion
- Accounts marked isEnabled:true in payrollAccountsData are billable
- Billable payroll is the sum of all enabled accounts
- Billable Accounts are only included in Internal Revenue when Management Agreement is enabled

### Payroll Tax Calculation (PTEB)
- **Actual**: Bills actual payroll tax expense from accounting system
- **Percentage**: Bills payrollTaxesPercentage of billable payroll

### Support Services Calculation
- **Fixed**: Bills fixed amount (payrollSupportAmount)
- **Percentage**:
  - If payrollSupportPayrollType is "Billable": Bills percentage of billable payroll only
  - If payrollSupportPayrollType is "Total": Bills percentage of total payroll

### Expense Account Inclusion
- Accounts marked isEnabled:true in payrollExpenseAccountsData are billable
- Billable expenses is the sum of all enabled accounts

## Per Labor Hour Billing Rules

### Hour Calculation
- Hours are tracked by job code in Legion (timekeeping system)
- Regular hours billed at standard rate
- Overtime hours billed at overtimeRate (typically 1.5x regular rate)
- Only job codes listed in jobRates array are billable

### Rate Application
- Each job code can have different billing rates
- If startDate and endDate are provided, rates only apply within that period
- Outside of period, rates from other configured periods apply
- hoursBackupReport can be included with invoice for verification

## Fixed Fee Billing Rules

- Simple fixed monthly charge for services
- Multiple service rates can be defined with different amounts
- Each service has its own GL account mapping
- All Fixed Fee services are mapped to their individual COA number

## Per Occupied Room Billing Rules

- Billing based on hotel occupancy
- roomRate multiplied by number of occupied rooms
- Data typically comes from hotel property management system

## General Billing Rules

### Escalator Application
- When incrementAmount > 0, rates increase by that percentage in incrementMonth
- Applies to Fixed Fee, Per Labor Hour rates, and Per Occupied Room rates
- Can be based on Consumer Price Index (CPI) when consumerPriceIndex is true

### Mid-Month Advance
- Provides interim billing during the month
- Fixed amount billed mid-month
- Final month-end invoice may include adjustment for mid-month amount

### Deviation Alerts
- Alerts triggered when revenue deviates from budget by:
  - deviationAmount dollars, OR
  - deviationPercentage percentage
- Helps identify significant variances for operational review

### Payment Terms
- Defines when payment is due relative to invoice date
- Common terms: "Due on Receipt", "Due by 20th", "Due in 30 Days", etc.
- Affects aging reports and delinquency tracking

### Billing Type
- **Arrears**: Billing after services are rendered (most common)
- **Advance**: Billing before services are rendered
- Affects timing of invoice generation and revenue recognition

### Invoice Grouping
- When enabled, creates multiple invoices for a single customer site
- Each billing component can specify which invoice group it belongs to
- Allows different vendor IDs, site numbers, customer names, and billing contacts per invoice

### Supporting Reports
Various reports can be included with invoices:
- **MixOfSales**: Shows breakdown of revenue by service type
- **LaborDistributionReport**: Details of labor hours and costs
- **OtherExpensesReport**: Breakdown of billable expenses
- **ParkingDepartmentReport**: Details of parking operations
- **ValidationReport**: Details of validations processed
- **HoursBackupReport**: Details of billable hours
- **TaxReport**: Details of tax calculations

## Forecasting Internal Revenue

Internal Revenue forecasting depends on contract type:
- **Revenue Share**: Calculated based on forecasted External Revenue multiplied by applicable tier percentages
- **Management Agreement**: Calculated based on forecasted expenses plus management fees
- **Per Labor Hour**: Calculated based on forecasted hours multiplied by contract rates
- **Billable Accounts** (without Management Agreement): Sum of account summary for non-excluded billable accounts
- **Fixed Fee**: Based on contracted amount including any applicable escalators
- **Per Occupied Room**: Based on forecasted room occupancy multiplied by the contracted rate

Forecasting includes consideration of escalators, validation thresholds, and other contract-specific terms.

## Tax Handling

### Parking Tax
- "Towne Park Responsible for Parking Tax" flag determines if Towne Park handles tax:
  - When true: Taxes are calculated and sent to Great Plains in Financials batch
  - When false: No tax calculations are performed
- Tax calculations are based on the tax rate for the site
- For "Towne Park Deposited Revenue":
  - Tax on deposited revenue does not appear on invoice but is added to Financials batch
  - Tax on client-collected revenue appears on invoice and is added to Financials batch

## "10 Percenter" Complex Deals

- A subset of contracts with highly customized or complex terms
- May require special handling for billing and forecasting
- System supports forecasting for these sites by selecting a base deal type template (Revenue Share, Management Agreement, etc.)
- Effort ongoing to reduce the number of these by enhancing Power Bill to accommodate more variations

## Account Mapping for GL Journal Entries

- Revenue Share mapped to GL account #4790
- Per Labor Hour mapped to GL account #4791
- Per Occupied Room mapped to GL account #4791
- Management Agreement mapped to GL account #4791
- Fixed Fee services mapped to their individual COA numbers
- Bell Service Fee has its own invoice line item and GL mapping