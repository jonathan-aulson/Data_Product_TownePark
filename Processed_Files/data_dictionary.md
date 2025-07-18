# Contract JSON Data Dictionary

This document provides a comprehensive schema reference for Towne Park's contract configurations in JSON format, including all possible fields, their descriptions, possible values, and business rules.

## Core Contract Fields

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `id` | Unique identifier for the contract | UUID format (e.g., "ADED2F8E-EAEE-EF11-BE20-7C1E5259F653") | System-generated |
| `purchaseOrder` | Customer's PO number for billing | String or null | Optional, appears on invoice |
| `paymentTerms` | Payment deadline for invoices | "Due on Receipt", "Due by 20th", "Due in 30 Days", etc. | Required field |
| `billingType` | When billing occurs relative to service | "Arrears" or "Advance" | Default is "Arrears" |
| `incrementMonth` | Month when rate increases apply | Month name (e.g., "January") | For escalator calculation |
| `incrementAmount` | Percentage increase for escalation | Decimal (e.g., 0.0, 3.0, 5.0) | Applied to rates during incrementMonth |
| `consumerPriceIndex` | Flag for CPI-based increases | Boolean (true/false) | When true, uses CPI instead of fixed percentage |
| `notes` | Contract-specific notes | String or null | Free text field for special terms |
| `deviationAmount` | Threshold for revenue deviation alerts | Decimal (e.g., 2500.0) | Alerts when actual differs from budget by this amount |
| `deviationPercentage` | Threshold for percentage deviation | Decimal (e.g., 10.0) | Alerts when actual differs from budget by this percentage |
| `towneParkDepositedRevenue` | Whether Towne Park handles deposits | Boolean (true/false) | Controls "Less: Towne Park Deposited Revenue" line item |
| `towneParkResponsibleForParkingTax` | Whether Towne Park handles tax | Boolean (true/false) | Controls tax calculation and GL posting |
| `contractType` | Primary contract billing model | "Revenue Share", "Management Agmt", "Per Labor Hour", "Fixed Fee", "Per Occupied Room" | Determines base calculation model |
| `startDate` | Contract start date | Date (ISO format) | Used for anniversary calculations |
| `endDate` | Contract end date | Date (ISO format) or null | Optional |
| `contractTypeId` | ID referencing contract type | UUID format | System reference |
| `vendorId` | Vendor identifier | String (e.g., "126840001") | Used for invoicing and GL |
| `enabled` | Whether contract is active | Boolean (true/false) | Controls if invoices are generated |
| `supportingReports` | List of reports to include with invoice | Array of report names | Example: ["Mix Of Sales", "Parking Department Report", "Validation Report"] |

## Revenue Share Configuration

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `revenueShare.enabled` | Whether revenue share is active | Boolean (true/false) | When true, enables revenue share calculations |
| `revenueShare.sharePercentage` | Simple share percentage | Decimal (e.g., 45.0) | Used when thresholdStructures not defined |
| `revenueShare.glAccount` | GL account for revenue share | String (e.g., "4790") | Always maps to 4790 |
| `revenueShare.thresholdStructures` | Array of threshold structures | Array of objects | For complex contracts with multiple revenue streams |
| `revenueShare.thresholdStructures[].id` | Structure identifier | UUID format | System-generated |
| `revenueShare.thresholdStructures[].revenueCodes` | Revenue types included | Array of code strings (e.g., ["SD1", "VD1"]) | Maps to specific revenue streams |
| `revenueShare.thresholdStructures[].accumulationType` | How thresholds accumulate | "Monthly", "AnnualCalendar", "AnnualAnniversary" | Determines reset period for thresholds |
| `revenueShare.thresholdStructures[].tiers` | Array of threshold tiers | Array of objects | Progressive tiers like tax brackets |
| `revenueShare.thresholdStructures[].tiers[].id` | Tier identifier | UUID format | System-generated |
| `revenueShare.thresholdStructures[].tiers[].sharePercentage` | Towne Park's share percentage | Decimal (e.g., 20.0, 30.0) | Percentage applied to revenue in this tier |
| `revenueShare.thresholdStructures[].tiers[].amount` | Threshold amount | Decimal or "infinity" | Upper limit for this tier; highest tier uses "infinity" |
| `revenueShare.thresholdStructures[].tiers[].order` | Tier sequence | Integer (e.g., 1, 2, 3) | Order in which tiers are applied |

## Validation Configuration (Revenue Share)

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `validation.enabled` | Whether validations are tracked | Boolean (true/false) | When true, enables validation calculations |
| `validation.thresholdType` | Type of validation threshold | "RevenuePercentage", "VehicleCount", "ValidationAmount" | Determines how threshold is calculated |
| `validation.thresholdAmount` | Fixed amount threshold | Decimal | Used when thresholdType is "ValidationAmount" |
| `validation.thresholdPercentage` | Percentage of revenue threshold | Decimal (e.g., 10.0) | Used when thresholdType is "RevenuePercentage" |
| `validation.thresholdVehicleCount` | Number of vehicles threshold | Integer | Used when thresholdType is "VehicleCount" |
| `validation.useNetValidations` | Use net vs. gross validations | Boolean (true/false) | When true, uses BILLABLE_NET_VALIDATIONS column |

## Bell Service Fee Configuration

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `bellServiceFee.enabled` | Whether bell service fee is active | Boolean (true/false) | When true, OR1/OR2 codes excluded from Revenue Share |
| `bellServiceFee.amount` | Fee amount | Decimal | Fixed amount for bell service |
| `bellServiceFee.title` | Line item title | String | Invoice line item display name |
| `bellServiceFee.invoiceGroup` | Invoice group assignment | Integer | For multiple invoice scenarios |

## Management Agreement Configuration

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `managementAgreement.enabled` | Whether management agreement is active | Boolean (true/false) | When true, enables Management Agreement calculations |
| `managementAgreement.glAccount` | GL account for management fee | String (e.g., "4790") | Always maps to 4790 |
| `managementAgreement.managementFee.type` | Type of management fee | "FixedFee", "PerLaborHour", "RevenuePercentage" | Determines fee calculation method |
| `managementAgreement.managementFee.amount` | Fixed fee amount | Decimal | Used when type is "FixedFee" |
| `managementAgreement.managementFee.percentage` | Revenue percentage | Decimal | Used when type is "RevenuePercentage" |
| `managementAgreement.managementFee.laborHourRates` | Labor hour rates configuration | Object | Used when type is "PerLaborHour" |

## Billable Accounts Configuration (Management Agreement)

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `billableAccounts.enabled` | Whether billable accounts is active | Boolean (true/false) | Always true when Management Agreement is enabled |
| `billableAccounts.payrollAccounts` | Configuration for payroll accounts | Object | 6000-series accounts |
| `billableAccounts.payrollAccounts.excludedAccounts` | Excluded payroll accounts | Array of strings (e.g., ["6010", "6014"]) | Default excludes PTO Hourly (6010) and Other (6014) |
| `billableAccounts.expenseAccounts` | Configuration for expense accounts | Object | 7000-series accounts |
| `billableAccounts.expenseAccounts.excludedAccounts` | Excluded expense accounts | Array of strings (e.g., ["7005", "7016"]) | Default excludes Bad Debt (7005) and Contract Improvements (7016) |
| `billableAccounts.pteb.type` | Payroll tax calculation type | "Actual", "Percentage" | Determines PTEB calculation method |
| `billableAccounts.pteb.percentage` | PTEB percentage | Decimal | Used when type is "Percentage" |
| `billableAccounts.supportServices.type` | Support services calculation type | "Fixed", "Percentage" | Determines support services calculation method |
| `billableAccounts.supportServices.amount` | Fixed amount | Decimal | Used when type is "Fixed" |
| `billableAccounts.supportServices.percentage` | Percentage value | Decimal | Used when type is "Percentage" |
| `billableAccounts.supportServices.payrollType` | Payroll base for percentage | "Billable", "Total" | Base for percentage calculation |

## Insurance Configuration (Management Agreement)

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `insurance.enabled` | Whether insurance is configured | Boolean (true/false) | Controls insurance line item |
| `insurance.type` | Insurance calculation method | "FixedFee", "BasedOnBillableAccounts" | Determines calculation approach |
| `insurance.amount` | Fixed fee amount | Decimal | Used when type is "FixedFee" |
| `insurance.additionalPercentage` | Additional percentage on accounts | Decimal (e.g., 5.77) | Used when type is "BasedOnBillableAccounts"; typically 5.77% |
| `insurance.title` | Line item title | String (e.g., "Insurance") | Default is "Insurance" |
| `insurance.invoiceGroup` | Invoice group assignment | Integer | For multiple invoice scenarios |

## Claims Configuration (Management Agreement)

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `claims.enabled` | Whether claims are configured | Boolean (true/false) | Controls claims line item |
| `claims.type` | Claims cap reset type | "AnnualCalendar", "AnnualAnniversary", "PerClaim" | Determines when cap resets |
| `claims.capAmount` | Maximum billable claims amount | Decimal | Total cap for period or per claim |
| `claims.title` | Line item title | String (e.g., "Loss & Damage") | Default is "Loss & Damage" |
| `claims.invoiceGroup` | Invoice group assignment | Integer | For multiple invoice scenarios |

## Profit Share Configuration (Management Agreement)

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `profitShare.enabled` | Whether profit share is active | Boolean (true/false) | Controls profit share calculations |
| `profitShare.sharePercentage` | Simple share percentage | Decimal | Used when no threshold structure |
| `profitShare.accumulationType` | How thresholds accumulate | "Monthly", "AnnualCalendar", "AnnualAnniversary" | Determines reset period for thresholds |
| `profitShare.thresholdStructures` | Array of threshold structures | Array of objects | For complex profit share agreements |
| `profitShare.thresholdStructures[].tiers` | Array of threshold tiers | Array of objects | Progressive tiers |
| `profitShare.thresholdStructures[].tiers[].sharePercentage` | Towne Park's share percentage | Decimal | Percentage of profit in this tier |
| `profitShare.thresholdStructures[].tiers[].amount` | Threshold amount | Decimal or "infinity" | Upper limit for this tier |
| `profitShare.thresholdStructures[].tiers[].order` | Tier sequence | Integer | Order in which tiers are applied |

## Non-GL Billable Expenses (Management Agreement)

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `nonGLBillableExpenses.enabled` | Whether non-GL expenses are active | Boolean (true/false) | Controls non-GL expense calculations |
| `nonGLBillableExpenses.items` | Array of expense items | Array of objects | Multiple expense items can be configured |
| `nonGLBillableExpenses.items[].type` | Expense calculation method | "FixedAmount", "PercentagePayroll", "PercentageRevenue" | Determines calculation approach |
| `nonGLBillableExpenses.items[].amount` | Fixed amount | Decimal | Used when type is "FixedAmount" |
| `nonGLBillableExpenses.items[].percentage` | Percentage value | Decimal | Used when type is "PercentagePayroll" or "PercentageRevenue" |
| `nonGLBillableExpenses.items[].payrollType` | Payroll base for percentage | "Billable", "Total" | Used when type is "PercentagePayroll" |
| `nonGLBillableExpenses.items[].title` | Line item title | String | Invoice line item display name |
| `nonGLBillableExpenses.items[].finalPeriodBilled` | Last billing period | Object with month/year | When specified, stops billing after this period |
| `nonGLBillableExpenses.items[].invoiceGroup` | Invoice group assignment | Integer | For multiple invoice scenarios |

## Per Labor Hour Configuration

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `perLaborHour.enabled` | Whether per labor hour is active | Boolean (true/false) | Controls per labor hour calculations |
| `perLaborHour.glAccount` | GL account for per labor hour | String (e.g., "4791") | Always maps to 4791 |
| `perLaborHour.jobRates` | Array of job rates | Array of objects | Rates by job code |
| `perLaborHour.jobRates[].jobCode` | Legion job code | String | Identifies specific job |
| `perLaborHour.jobRates[].displayName` | Display name for job | String | Default is job code name, can be customized |
| `perLaborHour.jobRates[].regularRate` | Rate for regular hours | Decimal | Rate applied to non-overtime hours |
| `perLaborHour.jobRates[].overtimeRate` | Rate for overtime hours | Decimal | Rate applied to overtime hours, typically 1.5x regular rate |
| `perLaborHour.jobRates[].startDate` | Start date for rate | Date (ISO format) or null | When rate becomes effective |
| `perLaborHour.jobRates[].endDate` | End date for rate | Date (ISO format) or null | When rate expires |
| `perLaborHour.includeHoursBackupReport` | Include hours report | Boolean (true/false) | Controls inclusion of hours breakdown report |

## Fixed Fee Configuration

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `fixedFee.enabled` | Whether fixed fee is active | Boolean (true/false) | Controls fixed fee calculations |
| `fixedFee.services` | Array of fixed fee services | Array of objects | Multiple services can be configured |
| `fixedFee.services[].displayName` | Service display name | String | Invoice line item display name |
| `fixedFee.services[].amount` | Service fee amount | Decimal | Monthly fee amount |
| `fixedFee.services[].glAccount` | GL account for service | String | Individual COA for each service |
| `fixedFee.services[].invoiceGroup` | Invoice group assignment | Integer | For multiple invoice scenarios |

## Per Occupied Room Configuration

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `perOccupiedRoom.enabled` | Whether per occupied room is active | Boolean (true/false) | Controls per occupied room calculations |
| `perOccupiedRoom.glAccount` | GL account for per occupied room | String (e.g., "4791") | Always maps to 4791 |
| `perOccupiedRoom.rate` | Rate per occupied room | Decimal | Amount charged per occupied room |
| `perOccupiedRoom.displayName` | Line item display name | String | Invoice line item display name |
| `perOccupiedRoom.invoiceGroup` | Invoice group assignment | Integer | For multiple invoice scenarios |

## Mid Month Advance Configuration

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `midMonthAdvance.enabled` | Whether mid-month advance is active | Boolean (true/false) | Controls mid-month advance functionality |
| `midMonthAdvance.amount` | Advance amount | Decimal | Amount to bill mid-month |
| `midMonthAdvance.title` | Line item title | String | Invoice line item display name |
| `midMonthAdvance.invoiceGroup` | Invoice group assignment | Integer | For multiple invoice scenarios |

## Invoice Grouping Configuration

| Field | Description | Possible Values | Notes |
|-------|-------------|-----------------|-------|
| `invoiceGroups.enabled` | Whether multiple invoices are enabled | Boolean (true/false) | When true, allows multiple invoices per site |
| `invoiceGroups.groups` | Array of invoice groups | Array of objects | Configuration for each invoice group |
| `invoiceGroups.groups[].id` | Group identifier | Integer | Used to reference in component configurations |
| `invoiceGroups.groups[].vendorId` | Vendor ID for group | String or null | When null, uses contract vendorId |
| `invoiceGroups.groups[].siteNumber` | Site number for group | String or null | When null, uses contract site number |
| `invoiceGroups.groups[].customerName` | Customer name for group | String or null | When null, uses contract customer name |
| `invoiceGroups.groups[].billingEmail` | Email for invoice delivery | String or null | When null, uses contract billing email |

## Revenue and GL Code Mapping

| Revenue Code | Description | Type |
|--------------|-------------|------|
| SD1 | Self-Park Daily | Self-Park |
| VD1 | Valet Daily | Valet |
| SM1 | Self-Park Monthly | Self-Park |
| VM1 | Valet Monthly | Valet |
| VO1 | Valet Overnight | Valet |
| OR1 | Bell Service Type 1 | Bell Service |
| OR2 | Bell Service Type 2 | Bell Service |

| GL Account | Description | Used By |
|------------|-------------|---------|
| 4790 | Revenue Share / Management Agreement Fees | Revenue Share, Management Fee |
| 4791 | Other Contract Fees | Per Labor Hour, Per Occupied Room, Management Agreement |
| 6000-6199 | Payroll Accounts | Billable Accounts (specific accounts can be excluded) |
| 7000-7999 | Expense Accounts | Billable Accounts (specific accounts can be excluded) |
| 7005 | Bad Debt | Default excluded expense account |
| 7016 | Contract Improvements | Default excluded expense account |
| 7080 | Insurance - General Liability | Insurance calculation |
| 7082 | Insurance - Automobile | Insurance calculation |
| 7085 | Insurance - Workers Compensation | Insurance calculation |

## Calculation Rules and Business Logic

### Revenue Share
- Revenue is shared based on tiers with progressive thresholds
- Accumulation types determine how thresholds reset (monthly, annual calendar, annual anniversary)
- Multiple threshold structures allow different revenue streams to have separate share percentages
- Validations that exceed thresholds are billable as a separate line item
- Bell Service revenue (OR1, OR2) is excluded when Bell Service Fee is enabled
- Deposited revenue appears as a credit line item when enabled

### Management Agreement
- Always requires Billable Accounts to be enabled
- Management Fee can be Fixed, Per Labor Hour, or Revenue Percentage
- Insurance can be Fixed or Based on Billable Accounts (typically 5.77% of payroll plus vehicle insurance)
- Claims are capped and reset based on configuration (annual calendar, annual anniversary, per claim)
- Profit Share calculates Towne Park's percentage of profit after expenses
- Non-GL Billable Expenses can be Fixed, % of Payroll, or % of Revenue with optional end dates

### Per Labor Hour
- Rates are configured by job code with separate regular and overtime rates
- Hours are sourced from Legion timekeeping system
- Rates can have effective date ranges
- Optional backup report details billable hours

### Fixed Fee
- Simple monthly fees for services
- Each service can have its own GL account mapping
- Multiple services can be configured

### Per Occupied Room
- Rate multiplied by number of occupied rooms
- Room occupancy data from hotel property management system

### General Rules
- Escalators increase rates annually in the specified month
- Mid-Month Advances provide interim billing
- Deviation alerts flag significant variances from budget
- Multiple invoice groups allow separate invoices for different components
- Supporting reports provide detailed backup for invoices

