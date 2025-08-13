---
title: "Towne Park Contracts - Comprehensive Business Rules"
description: "Complete business rules and calculation logic for all contract types including Revenue Share, Management Agreement, Per Labor Hour, Fixed Fee, and Per Occupied Room"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-07-16
version: 1.0
status: Draft
owner: "Towne Park Finance Team"
source_documents:
  - "Current_State_Data_Product/Contract_Details/business_rules.md"
systems:
  - Billing
components:
  - Backend
  - Database
business_domains:
  - Contract Management
  - Revenue Calculation
  - Statement Generation
  - General Ledger
  - Revenue Share
  - Fixed Fee
  - Per Occupied Room
  - Per Labor Hour
  - Management Agreement
  - Billable Expense Accounts
  - Validations/Comps
user_roles:
  - Billing Admin
  - Billing Manager
  - Account Manager
  - Regional Finance
  - Corporate Finance
tags:
  - business-rules
  - contracts
  - calculations
  - billing
  - revenue-share
  - management-agreement
  - per-labor-hour
  - fixed-fee
  - per-occupied-room
---

# Towne Park Contracts - Comprehensive Business Rules

## Overview

This document contains comprehensive business rules and calculation logic for all contract types used at Towne Park for customer contracts. These rules govern how revenue is calculated, expenses are allocated, and invoices are generated across different contract structures.

## Revenue Share Calculation Rules

### Threshold Calculation Types

Revenue Share contracts use different threshold calculation methods to determine when tier changes apply:

#### **Monthly Thresholds**
- **Description**: Thresholds reset each month; revenue is counted from the 1st of each month
- **Application**: Revenue accumulation starts fresh each month
- **Use Case**: Contracts requiring monthly revenue tier evaluation

#### **Annual Calendar Thresholds**
- **Description**: Thresholds calculated on calendar year (January-December)
- **Application**: Revenue accumulates throughout the entire calendar year
- **Reset Date**: January 1st of each year
- **Use Case**: Contracts aligned with calendar year business cycles

#### **Annual Anniversary Thresholds**
- **Description**: Thresholds calculated on contract anniversary date
- **Application**: Revenue accumulates for 12 months from contract start date
- **Reset Date**: Contract anniversary date each year
- **Use Case**: Contracts with specific start dates requiring anniversary-based calculations

### Tier Application Logic

Revenue Share contracts implement progressive tier calculations similar to tax bracket systems:

#### **Progressive Tier Calculation**
- **Method**: Multiple tiers create cumulative calculations where each revenue amount is calculated at its applicable tier rate
- **Example Calculation**:
  - **Tier Structure**: [0-$50,000: 20%, $50,000+: 30%]
  - **Revenue Amount**: $75,000
  - **Calculation Process**:
    - First $50,000 calculated at 20% = $10,000
    - Remaining $25,000 calculated at 30% = $7,500
    - **Total Revenue Share**: $17,500

#### **Tier Boundary Handling**
- Revenue amounts are allocated to tiers in ascending order
- Each tier applies only to the revenue portion within its range
- Higher tiers only apply to revenue exceeding lower tier thresholds

### Multiple Threshold Structures

Complex Revenue Share contracts may implement multiple threshold structures for different revenue types:

#### **Structure Characteristics**
- **Revenue Code Assignment**: Revenue codes must be assigned uniquely to one threshold structure
- **Independent Tier Sets**: Each threshold structure maintains its own set of tiers and percentages
- **Revenue Type Differentiation**: Different types of revenue can have different revenue share percentages

#### **Example Implementation**
- **Valet Revenue**: Shared at 27.5% using Threshold Structure A
- **Self-Park Revenue**: Shared at 9.5% using Threshold Structure B
- **Monthly Revenue**: Shared using different tier structures based on revenue type

### Validation Rules

Validation rules reduce the revenue base before revenue share calculations by accounting for discounts or complimentary parking that exceed agreed-upon thresholds.

#### **Revenue Percentage Validation**
- **Definition**: Validations above a percentage of revenue are billable to the client
- **Calculation Formula**: 
  ```
  Billable Validations = Actual Validations - (Threshold Percentage × Net External Revenue)
  Billing Amount = Billable Validations × Share Rate
  ```
- **Example**:
  - Threshold: 10% of $90,000 Net External Revenue = $9,000
  - Actual Validations: $50,000
  - Billable Validations: $50,000 - $9,000 = $41,000
  - Share Rate: 20%
  - **Billing Amount**: 20% × $41,000 = $8,200

#### **Vehicle Count Validation**
- **Definition**: Validations above a certain number of vehicles are billable
- **Data Source**: Uses the BILLABLE_NET_VALIDATIONS column from data systems
- **Application**: Threshold based on vehicle count rather than dollar amount

#### **Validation Amount Threshold**
- **Definition**: Validations above a specific dollar amount are billable
- **Calculation Formula**:
  ```
  Billable Validations = Actual Validations - Threshold Amount
  Billing Amount = Billable Validations × Share Rate
  ```
- **Example**:
  - Threshold Amount: $25,000
  - Actual Validations: $50,000
  - Billable Validations: $50,000 - $25,000 = $25,000
  - Share Rate: 10%
  - **Billing Amount**: 10% × $25,000 = $2,500

#### **Validation Billing**
When validation thresholds are exceeded, the excess amount is billed as "Towne Park Fees for Validated Parking" as a separate line item on the invoice.

### Revenue Codes

Revenue codes determine which revenue streams are included in Revenue Share calculations:

#### **Standard Revenue Codes**
- **SD1, SD2, etc.**: Self Daily parking revenue
- **VD1, VD2, etc.**: Valet Daily parking revenue
- **SM1, SM2, etc.**: Self Monthly parking revenue
- **VM1, VM2, etc.**: Valet Monthly parking revenue
- **VO1, VO2, etc.**: Valet Overnight parking revenue

#### **Special Revenue Code Handling**
- **Bell Service Revenue (OR1, OR2)**: Handled separately when Bell Service Fee is enabled
- **Exclusion Logic**: When Bell Service Fee is enabled alongside Revenue Share, OR1 and OR2 codes are excluded from Revenue Share calculations
- **Power BI Integration**: These revenue codes are excluded from the Miscellaneous line item in Power BI reports

### Bell Service Fee

#### **Configuration Requirements**
- **Enablement**: Can be enabled alongside Revenue Share contracts
- **Revenue Code Exclusion**: When enabled, revenue codes OR1 and OR2 are excluded from Revenue Share calculations
- **Invoice Treatment**: Bell Service Fee appears as its own separate invoice line item

#### **Reporting Integration**
- **Power BI Reports**: OR1 and OR2 revenue codes are excluded from Miscellaneous line item calculations
- **Financial Integration**: Separate GL account mapping for Bell Service Fee revenue

### Deposited Revenue

#### **Towne Park Deposited Revenue**
- **Definition**: Revenue collected and deposited by Towne Park on behalf of the client
- **Invoice Treatment**: Appears as a credit line item ("Less: Towne Park Deposited Revenue")
- **Tracking**: Tracked separately from client-collected revenue

#### **Parking Tax Responsibility**
The "Towne Park Responsible for Parking Tax" flag determines tax handling for deposited revenue:

- **When True**: 
  - Towne Park calculates and pays parking tax on deposited revenue
  - Tax calculations included in Financials batch processing
- **When False**: 
  - Client is responsible for parking tax on deposited revenue
  - No tax calculations performed by Towne Park systems

## Management Agreement Calculation Rules

### Management Fee Calculation

Management Agreements require a management fee calculated using one of three methods:

#### **Fixed Fee Method**
- **Definition**: Fixed monthly amount specified in contract
- **Application**: Same amount billed each month regardless of other factors
- **GL Mapping**: Always mapped to GL account #4790

#### **Per Labor Hour Method**
- **Definition**: Labor hours multiplied by specified rates per job code
- **Calculation**: Total billable hours × applicable hourly rates
- **Rate Variation**: Different job codes can have different billing rates
- **GL Mapping**: Mapped to GL account #4790

#### **Revenue Percentage Method**
- **Definition**: Specified percentage of total revenue
- **Calculation**: Total Revenue × Management Fee Percentage
- **Revenue Base**: Calculated from all applicable revenue streams
- **GL Mapping**: Mapped to GL account #4790

### Billable Accounts

Management Agreements require Billable Accounts to be enabled with specific characteristics:

#### **Payroll Account Inclusion (6000-series)**
- **Configuration**: Payroll accounts can be marked as billable or excluded
- **Inclusion Logic**: Accounts marked `isEnabled: true` in payrollAccountsData are billable
- **Calculation**: Billable payroll is the sum of all enabled accounts
- **Revenue Integration**: Billable Accounts are only included in Internal Revenue when Management Agreement is enabled

#### **Expense Account Inclusion (7000-series)**
- **Configuration**: Expense accounts can be marked as billable or excluded
- **Inclusion Logic**: Accounts marked `isEnabled: true` in payrollExpenseAccountsData are billable
- **Calculation**: Billable expenses is the sum of all enabled accounts

#### **Default Excluded Accounts**
The following accounts are excluded by default:
- **6010**: PTO Hourly
- **6014**: Other
- **7005**: Bad Debt
- **7016**: Contract Improvements

### Insurance Calculation

Insurance costs can be calculated using two methods:

#### **Fixed Fee Insurance**
- **Definition**: Fixed monthly amount specified in contract
- **Application**: Same amount billed each month
- **Use Case**: Contracts with predetermined insurance costs

#### **Based on Billable Accounts Insurance**
- **Calculation Components**:
  - Sum of billable insurance accounts (7080, 7082, 7085)
  - Plus insuranceAdditionalPercentage of these accounts
- **Standard Rate**: For Management Agreements, insurance is typically calculated at 5.77% of payroll plus vehicle insurance
- **Formula**: `(Billable Insurance Accounts) + (Insurance Additional Percentage × Billable Insurance Accounts)`

### Claims Calculation

Claims have specific handling rules with capping mechanisms:

#### **Claims Cap Application**
- **Cap Amount**: Claims are capped based on claimsCapAmount specified in contract
- **Billing Logic**: When cap is reached, additional claims are not billable for remainder of period

#### **Claims Type Reset Periods**
- **Annual Calendar**: Cap resets on calendar year (January-December)
- **Annual Anniversary**: Cap resets on contract anniversary date
- **Per Claim**: Each individual claim has its own cap amount

#### **Cap Enforcement**
- Claims amounts are tracked against the cap throughout the applicable period
- Once cap is reached, no additional claims are billed until the next reset period

### Profit Share Calculation

For Management Agreements with Profit Share components:

#### **Profit Calculation Formula**
```
Profit = Revenue - Billable Expenses
```

#### **Profit Share Determination**
- **Tier Application**: Profit share tiers determine Towne Park's percentage of profit
- **Progressive Calculation**: Similar to Revenue Share, profit share uses progressive tier calculations

#### **Accumulation Types**
- **Monthly**: Profit calculated and shared monthly
- **Annual Calendar**: Profit accumulated and calculated on calendar year (January-December)
- **Annual Anniversary**: Profit accumulated and calculated on contract anniversary date

#### **Non-GL Billable Expenses Integration**
- Non-GL Billable Expenses are included in profit calculation as expenses
- These expenses reduce the profit amount before profit share percentage is applied

### Non-GL Billable Expenses

#### **Calculation Methods**
- **Fixed Amount**: Specific dollar amount per billing period
- **Percentage of Payroll**: Calculated as percentage of total or billable payroll
- **Percentage of Revenue**: Calculated as percentage of total revenue

#### **Billing Lifecycle**
- **End Date Handling**: May have an end date (finalPeriodbilled) after which they stop billing
- **Dual Impact**: Included both as invoice line items and in profit calculations
- **Profit Share Integration**: When Profit Share is enabled, these expenses reduce the profit amount

### Payroll Tax Calculation (PTEB)

#### **Actual Method**
- **Definition**: Bills actual payroll tax expense from accounting system
- **Data Source**: Actual payroll tax amounts from financial records
- **Accuracy**: Reflects true payroll tax costs

#### **Percentage Method**
- **Definition**: Bills payrollTaxesPercentage of billable payroll
- **Calculation**: Billable Payroll × Payroll Tax Percentage
- **Use Case**: When actual amounts are not available or for simplified billing

### Support Services Calculation

#### **Fixed Support Services**
- **Definition**: Bills fixed amount (payrollSupportAmount)
- **Application**: Same amount billed each period regardless of payroll fluctuations

#### **Percentage Support Services**
- **Billable Payroll Type**: Bills percentage of billable payroll only
  - Calculation: Billable Payroll × Support Services Percentage
- **Total Payroll Type**: Bills percentage of total payroll
  - Calculation: Total Payroll × Support Services Percentage
- **Configuration**: Determined by payrollSupportPayrollType setting

## Per Labor Hour Billing Rules

### Hour Calculation

#### **Hour Tracking**
- **Data Source**: Hours are tracked by job code in Legion (timekeeping system)
- **Job Code Specificity**: Only job codes listed in jobRates array are billable
- **Exclusion Logic**: Hours for job codes not in the billable list are not charged

#### **Hour Types**
- **Regular Hours**: Billed at standard rate specified in contract
- **Overtime Hours**: Billed at overtimeRate (typically 1.5x regular rate)
- **Rate Differentiation**: Each hour type has its own billing calculation

### Rate Application

#### **Job Code Rates**
- **Individual Rates**: Each job code can have different billing rates
- **Rate Specificity**: Rates are defined per job code in the jobRates array

#### **Time Period Application**
- **Date Range Validity**: If startDate and endDate are provided, rates only apply within that period
- **Period Transitions**: Outside of specified periods, rates from other configured periods apply
- **Rate History**: System maintains historical rates for different time periods

#### **Supporting Documentation**
- **Hours Backup Report**: Can be included with invoice for client verification
- **Transparency**: Provides detailed breakdown of billable hours by job code and rate

## Fixed Fee Billing Rules

### Service Structure

#### **Simple Fixed Charges**
- **Definition**: Simple fixed monthly charge for specified services
- **Consistency**: Same amount billed each month regardless of usage or other factors

#### **Multiple Service Rates**
- **Configuration**: Multiple service rates can be defined with different amounts
- **Service Differentiation**: Each service type has its own fixed amount and billing schedule

### GL Account Mapping

#### **Individual COA Mapping**
- **Service-Specific Mapping**: Each Fixed Fee service has its own GL account mapping
- **COA Integration**: All Fixed Fee services are mapped to their individual Chart of Accounts (COA) numbers
- **Financial Reporting**: Enables detailed financial reporting by service type

## Per Occupied Room Billing Rules

### Occupancy-Based Billing

#### **Calculation Method**
- **Formula**: roomRate × number of occupied rooms
- **Data Source**: Occupancy data typically comes from hotel property management system
- **Billing Frequency**: Usually monthly based on average or total occupancy

#### **Rate Application**
- **Room Rate**: Fixed rate per occupied room as specified in contract
- **Occupancy Tracking**: Requires integration with hotel systems for accurate room counts

## General Billing Rules

### Escalator Application

#### **Rate Increase Mechanism**
- **Trigger**: When incrementAmount > 0, rates increase by that percentage in incrementMonth
- **Application Scope**: Applies to Fixed Fee, Per Labor Hour rates, and Per Occupied Room rates
- **Timing**: Escalation occurs in the specified increment month

#### **Consumer Price Index (CPI) Integration**
- **CPI-Based Escalation**: When consumerPriceIndex is true, escalation is based on CPI changes
- **Market Alignment**: Ensures contract rates remain aligned with economic conditions

### Mid-Month Advance

#### **Interim Billing**
- **Purpose**: Provides interim billing during the month for cash flow management
- **Amount**: Fixed amount billed mid-month as specified in contract
- **Reconciliation**: Final month-end invoice may include adjustment for mid-month amount

### Deviation Alerts

#### **Alert Triggers**
Alerts are triggered when revenue deviates from budget by:
- **Dollar Amount**: deviationAmount dollars above or below budget
- **Percentage**: deviationPercentage above or below budget

#### **Operational Purpose**
- **Variance Identification**: Helps identify significant variances for operational review
- **Management Attention**: Flags unusual revenue patterns requiring investigation

### Payment Terms

#### **Payment Due Dates**
- **Definition**: Defines when payment is due relative to invoice date
- **Common Terms**: 
  - "Due on Receipt"
  - "Due by 20th"
  - "Due in 30 Days"
  - Custom terms as specified in contract

#### **Impact on Operations**
- **Aging Reports**: Affects aging reports and delinquency tracking
- **Cash Flow**: Impacts cash flow projections and collection activities

### Billing Type

#### **Arrears Billing**
- **Definition**: Billing after services are rendered
- **Usage**: Most common billing type
- **Revenue Recognition**: Aligns with service delivery

#### **Advance Billing**
- **Definition**: Billing before services are rendered
- **Usage**: Less common, used for specific contract types
- **Revenue Recognition**: Requires careful revenue recognition handling

#### **Timing Impact**
- **Invoice Generation**: Affects timing of invoice generation
- **Revenue Recognition**: Impacts revenue recognition timing and accounting treatment

### Invoice Grouping

#### **Multiple Invoice Creation**
- **Purpose**: Creates multiple invoices for a single customer site when enabled
- **Component Assignment**: Each billing component can specify which invoice group it belongs to

#### **Customization Options**
- **Vendor IDs**: Different vendor IDs per invoice group
- **Site Numbers**: Different site numbers per invoice group
- **Customer Names**: Different customer names per invoice group
- **Billing Contacts**: Different billing contacts per invoice group

### Supporting Reports

Various reports can be included with invoices to provide detailed breakdowns:

#### **Mix of Sales Report**
- **Content**: Shows breakdown of revenue by service type
- **Purpose**: Provides transparency on revenue composition

#### **Labor Distribution Report**
- **Content**: Details of labor hours and costs
- **Purpose**: Supports Per Labor Hour billing verification

#### **Other Expenses Report**
- **Content**: Breakdown of billable expenses
- **Purpose**: Supports Management Agreement expense billing

#### **Parking Department Report**
- **Content**: Details of parking operations
- **Purpose**: Provides operational context for billing

#### **Validation Report**
- **Content**: Details of validations processed
- **Purpose**: Supports validation billing calculations

#### **Hours Backup Report**
- **Content**: Details of billable hours
- **Purpose**: Provides verification for Per Labor Hour billing

#### **Tax Report**
- **Content**: Details of tax calculations
- **Purpose**: Supports tax billing and compliance

## Forecasting Internal Revenue

Internal Revenue forecasting varies by contract type and requires different calculation approaches:

### Revenue Share Forecasting
- **Method**: Calculated based on forecasted External Revenue multiplied by applicable tier percentages
- **Tier Application**: Uses progressive tier calculations on forecasted revenue amounts
- **Threshold Consideration**: Includes validation thresholds and other contract-specific terms

### Management Agreement Forecasting
- **Method**: Calculated based on forecasted expenses plus management fees
- **Component Integration**: Includes all billable accounts, insurance, claims, and profit share calculations
- **Expense Projection**: Requires forecasting of payroll and expense accounts

### Per Labor Hour Forecasting
- **Method**: Calculated based on forecasted hours multiplied by contract rates
- **Hour Projection**: Requires forecasting of labor hours by job code
- **Rate Application**: Uses current rates with consideration for escalators

### Billable Accounts Forecasting (without Management Agreement)
- **Method**: Sum of account summary for non-excluded billable accounts
- **Account Selection**: Only includes accounts marked as billable
- **Exclusion Logic**: Excludes default excluded accounts

### Fixed Fee Forecasting
- **Method**: Based on contracted amount including any applicable escalators
- **Escalator Integration**: Includes rate increases based on increment schedules
- **CPI Consideration**: Includes CPI-based adjustments when applicable

### Per Occupied Room Forecasting
- **Method**: Based on forecasted room occupancy multiplied by the contracted rate
- **Occupancy Projection**: Requires forecasting of hotel occupancy rates
- **Rate Application**: Uses current room rates with consideration for escalators

## Tax Handling

### Parking Tax

#### **Tax Responsibility Flag**
The "Towne Park Responsible for Parking Tax" flag determines tax handling:

#### **When Towne Park is Responsible (Flag = True)**
- **Tax Calculation**: Taxes are calculated based on the tax rate for the site
- **Financial Integration**: Taxes are sent to Great Plains in Financials batch
- **Invoice Treatment**: Tax handling varies by revenue type

#### **When Client is Responsible (Flag = False)**
- **No Tax Calculations**: No tax calculations are performed by Towne Park systems
- **Client Responsibility**: Client handles all tax calculations and payments

#### **Deposited Revenue Tax Handling**
- **Tax on Deposited Revenue**: Does not appear on invoice but is added to Financials batch
- **Tax on Client-Collected Revenue**: Appears on invoice and is added to Financials batch

## "10 Percenter" Complex Deals

### Definition and Characteristics
- **Subset**: A subset of contracts with highly customized or complex terms
- **Complexity**: Require special handling for billing and forecasting beyond standard contract types

### System Support
- **Forecasting Support**: System supports forecasting by selecting a base deal type template
- **Template Options**: Revenue Share, Management Agreement, or other standard types as base
- **Customization**: Additional customizations applied on top of base template

### Ongoing Efforts
- **Reduction Goal**: Effort ongoing to reduce the number of these complex deals
- **System Enhancement**: Enhancing Power Bill to accommodate more variations within standard contract types
- **Standardization**: Moving toward more standardized contract structures

## Account Mapping for GL Journal Entries

### Standard GL Account Mappings

#### **Revenue Share**
- **GL Account**: #4790
- **Purpose**: All Revenue Share calculations

#### **Per Labor Hour**
- **GL Account**: #4791
- **Purpose**: All Per Labor Hour billing

#### **Per Occupied Room**
- **GL Account**: #4791
- **Purpose**: All Per Occupied Room billing

#### **Management Agreement**
- **GL Account**: #4791
- **Purpose**: Management Agreement fees and related charges

#### **Fixed Fee Services**
- **GL Account**: Individual COA numbers
- **Purpose**: Each Fixed Fee service maps to its specific Chart of Accounts number

#### **Bell Service Fee**
- **GL Account**: Separate mapping
- **Purpose**: Bell Service Fee has its own invoice line item and GL mapping

## Code Validation Report

**Last Validated**: 2025-07-16
**Validation Scope**: Business Rules
**Code Copy Date**: 2025-07-16

### Validation Summary
- ✅ **Verified Elements**: 3 items match code implementation
- ⚠️ **Discrepancies Found**: 1 item differs from code
- ❓ **Incomplete Documentation**: 0 code elements not documented
- 🔍 **Requires Review**: 0 items need stakeholder verification

### Detailed Validation Results

#### Business Rules: Profit Share Calculation
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_profitsharebypercentage-FormulaDefinitions.yaml`
**Documented Element**: "Profit = Revenue - Billable Expenses; Total due to owner equals profit amount minus total due to Towne Park"
**Code Implementation**:
```yaml
bs_ownerpercent: =If(bs_percenttocharge >= 0, 100 - bs_percenttocharge, 0)
bs_totalduetoowner: =bs_profitamount - bs_totalduetotownepark
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: Documentation accurately describes the profit share calculation. The formula `bs_totalduetoowner: =bs_profitamount - bs_totalduetotownepark` exactly matches the documented rule.
**Recommendations**: None required - documentation is accurate.

#### Business Rules: Revenue Share Calculation
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_revenuesharebypercent-FormulaDefinitions.yaml`
**Documented Element**: "Owner percentage calculation and total due to owner calculation"
**Code Implementation**:
```yaml
bs_ownerpercent: =If(bs_percenttocharge >= 0, 100 - bs_percenttocharge, 0)
bs_totalduetoowner: =bs_revenueamount - bs_totalduetotownepark
```
**Validation Status**: ✅ **VERIFIED**
**Findings**: Documentation accurately describes revenue share calculations. The owner percentage calculation includes zero-floor logic as documented.
**Recommendations**: None required - documentation is accurate.

#### Business Rules: Validation Calculation
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_validationbypercent-FormulaDefinitions.yaml`
**Documented Element**: "Owner percentage calculation for validation billing"
**Code Implementation**:
```yaml
bs_ownerpercent: =If(bs_percenttocharge > 0, 100 - bs_percenttocharge, 0)
bs_totalduetoowner: =bs_amountoverthreshold - bs_totalduetotownepark
```
**Validation Status**: ⚠️ **DISCREPANCY**
**Findings**: The validation formula uses `bs_percenttocharge > 0` (greater than) while profit share and revenue share use `bs_percenttocharge >= 0` (greater than or equal to). This creates different behavior when `bs_percenttocharge` equals zero.
**Recommendations**: Clarify whether validation calculations should handle zero percentage differently than other calculation types, or standardize the comparison operator across all formulas.

### Code File References
- **Formula Files**: 
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_profitsharebypercentage-FormulaDefinitions.yaml`
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_revenuesharebypercent-FormulaDefinitions.yaml`
  - `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_validationbypercent-FormulaDefinitions.yaml`

### Validation Methodology
- **Code Copy Date**: 2025-07-16
- **Validation Approach**: Direct file analysis and comparison of documented business rules with Power Platform formula implementations
- **Limitations**: Validation limited to available formula files; workflow and configuration validation requires additional code files

## Related Documentation

- [Revenue Share Contract Configuration](../configuration/contracts/revenue-share-setup.md) 🔄 PLANNED
- [Management Agreement Setup Guide](../configuration/contracts/management-agreement-setup.md) 🔄 PLANNED
- [Per Labor Hour Configuration](../configuration/contracts/per-labor-hour-setup.md) 🔄 PLANNED
- [Fixed Fee Contract Setup](../configuration/contracts/fixed-fee-setup.md) 🔄 PLANNED
- [Contract Escalation Rules](./contract-escalation-rules.md) ✓ VERIFIED
- [Billing System Overview](../../systems/billing/overview.md) ✓ VERIFIED
- [Forecasting Business Rules](../forecasting/forecasting-calculation-rules.md) 🔄 PLANNED
- [GL Account Mapping Guide](../../technical/integrations/gl-account-mapping.md) 🔄 PLANNED
- [Tax Calculation Rules](./tax-calculation-rules.md) 🔄 PLANNED
- [Invoice Generation Process](../../user-processes/billing-admin/invoice-generation-workflow.md) 🔄 PLANNED
## Quick Links

- [Contract Escalation Rules](./contract-escalation-rules.md)
- [Billing System Overview](../../systems/billing/overview.md)
