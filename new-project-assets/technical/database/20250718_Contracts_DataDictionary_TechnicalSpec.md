---
title: "Towne Park Contracts - Data Dictionary Technical Specification"
description: "Comprehensive JSON schema reference for Towne Park's contract configurations, including all field definitions, validation rules, and business logic implementation"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-07-18
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "data_dictionary.md"
systems:
  - Billing
  - Contracts
  - PowerBill
components:
  - Database
  - Configuration
  - Validation
  - Schema
business_domains:
  - Contract Management
  - Billing
  - Revenue Share
  - Management Agreement
  - Per Labor Hour
  - Fixed Fee
  - Per Occupied Room
  - GL Accounting
  - Invoice Generation
user_roles:
  - Contract Administrator
  - Billing Administrator
  - Developer
  - System Administrator
  - Database Administrator
tags:
  - contracts
  - data-dictionary
  - json-schema
  - technical-specification
  - database
  - validation
  - business-rules
  - gl-mapping
  - invoice-generation
---

# Towne Park Contracts - Data Dictionary Technical Specification

## Purpose

This technical specification provides a comprehensive JSON schema reference for Towne Park's contract configurations within the PowerBill system. It serves as the definitive guide for all contract-related data structures, field definitions, validation rules, and business logic implementation across all contract types including Revenue Share, Management Agreement, Per Labor Hour, Fixed Fee, and Per Occupied Room contracts.

## Overview

The contract data dictionary defines the complete structure and validation rules for contract configurations stored in JSON format within the PowerBill system. This specification ensures consistent data modeling, proper validation, and accurate business logic implementation across all contract types while maintaining integration with GL accounting, invoice generation, and revenue management systems.

## Core Contract Schema

### Primary Contract Fields

#### System Identifiers
```json
{
  "id": "UUID",
  "contractTypeId": "UUID",
  "vendorId": "String"
}
```

| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `id` | UUID | Unique identifier for the contract | System-generated, immutable | Primary key for contract entity |
| `contractTypeId` | UUID | ID referencing contract type | Must reference valid contract type | Links to contract type configuration |
| `vendorId` | String | Vendor identifier for invoicing | Required, format: "126840001" | Used for invoicing and GL mapping |

#### Contract Metadata
```json
{
  "purchaseOrder": "String | null",
  "notes": "String | null",
  "enabled": "Boolean",
  "startDate": "Date (ISO format)",
  "endDate": "Date (ISO format) | null"
}
```

| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `purchaseOrder` | String/null | Customer's PO number for billing | Optional, appears on invoice | Invoice header reference |
| `notes` | String/null | Contract-specific notes | Free text field | Special terms documentation |
| `enabled` | Boolean | Whether contract is active | Required, defaults to true | Controls invoice generation |
| `startDate` | Date | Contract start date | Required, ISO format | Anniversary calculations |
| `endDate` | Date/null | Contract end date | Optional, ISO format | Contract expiration tracking |

#### Payment and Billing Terms
```json
{
  "paymentTerms": "String",
  "billingType": "String",
  "supportingReports": ["String"]
}
```

| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `paymentTerms` | String | Payment deadline for invoices | Required, predefined values | Invoice payment terms |
| `billingType` | String | Service timing relationship | "Arrears" or "Advance" | Invoice timing control |
| `supportingReports` | Array[String] | Reports included with invoice | Optional array | Invoice attachments |

**Valid Payment Terms:**
- "Due on Receipt"
- "Due by 20th"
- "Due in 30 Days"
- Custom terms as needed

#### Escalation Configuration
```json
{
  "incrementMonth": "String",
  "incrementAmount": "Decimal",
  "consumerPriceIndex": "Boolean"
}
```

| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `incrementMonth` | String | Month when rate increases apply | Month name (e.g., "January") | Escalator calculation timing |
| `incrementAmount` | Decimal | Percentage increase for escalation | Decimal (e.g., 0.0, 3.0, 5.0) | Applied during incrementMonth |
| `consumerPriceIndex` | Boolean | Flag for CPI-based increases | Boolean (true/false) | Overrides fixed percentage |

#### Deviation Alert Configuration
```json
{
  "deviationAmount": "Decimal",
  "deviationPercentage": "Decimal"
}
```

| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `deviationAmount` | Decimal | Threshold for revenue deviation alerts | Decimal (e.g., 2500.0) | Absolute variance alerting |
| `deviationPercentage` | Decimal | Threshold for percentage deviation | Decimal (e.g., 10.0) | Percentage variance alerting |

#### Revenue Processing Flags
```json
{
  "towneParkDepositedRevenue": "Boolean",
  "towneParkResponsibleForParkingTax": "Boolean"
}
```

| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `towneParkDepositedRevenue` | Boolean | Whether Towne Park handles deposits | Boolean (true/false) | Controls "Less: Deposited Revenue" line |
| `towneParkResponsibleForParkingTax` | Boolean | Whether Towne Park handles tax | Boolean (true/false) | Tax calculation and GL posting |

#### Contract Type Classification
```json
{
  "contractType": "String"
}
```

| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `contractType` | String | Primary contract billing model | Enumerated values | Base calculation model |

**Valid Contract Types:**
- "Revenue Share"
- "Management Agmt"
- "Per Labor Hour"
- "Fixed Fee"
- "Per Occupied Room"

## Revenue Share Configuration Schema

### Core Revenue Share Structure
```json
{
  "revenueShare": {
    "enabled": "Boolean",
    "sharePercentage": "Decimal",
    "glAccount": "String",
    "thresholdStructures": [
      {
        "id": "UUID",
        "revenueCodes": ["String"],
        "accumulationType": "String",
        "tiers": [
          {
            "id": "UUID",
            "sharePercentage": "Decimal",
            "amount": "Decimal | 'infinity'",
            "order": "Integer"
          }
        ]
      }
    ]
  }
}
```

### Revenue Share Field Definitions

#### Primary Configuration
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether revenue share is active | Required when contractType is Revenue Share | Enables revenue share calculations |
| `sharePercentage` | Decimal | Simple share percentage | Decimal (e.g., 45.0) | Used when thresholdStructures not defined |
| `glAccount` | String | GL account for revenue share | Always "4790" | GL mapping for revenue share |

#### Threshold Structures
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `id` | UUID | Structure identifier | System-generated | Threshold structure reference |
| `revenueCodes` | Array[String] | Revenue types included | ["SD1", "VD1", etc.] | Revenue stream mapping |
| `accumulationType` | String | Threshold accumulation method | "Monthly", "AnnualCalendar", "AnnualAnniversary" | Reset period determination |

#### Tier Configuration
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `sharePercentage` | Decimal | Towne Park's share percentage | Decimal (e.g., 20.0, 30.0) | Percentage applied to tier revenue |
| `amount` | Decimal/String | Threshold amount | Decimal or "infinity" | Upper limit for tier |
| `order` | Integer | Tier sequence | Integer (e.g., 1, 2, 3) | Application order |

### Revenue Share Business Logic
```yaml
Calculation Process:
  1. Determine applicable revenue codes
  2. Calculate accumulated revenue based on accumulationType
  3. Apply progressive tier structure
  4. Calculate Towne Park share percentage
  5. Generate invoice line items

Threshold Reset Logic:
  - Monthly: Reset at beginning of each month
  - AnnualCalendar: Reset January 1st
  - AnnualAnniversary: Reset on contract anniversary
```

## Validation Configuration Schema

### Revenue Share Validation Structure
```json
{
  "validation": {
    "enabled": "Boolean",
    "thresholdType": "String",
    "thresholdAmount": "Decimal",
    "thresholdPercentage": "Decimal",
    "thresholdVehicleCount": "Integer",
    "useNetValidations": "Boolean"
  }
}
```

### Validation Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether validations are tracked | Required for validation tracking | Enables validation calculations |
| `thresholdType` | String | Type of validation threshold | "RevenuePercentage", "VehicleCount", "ValidationAmount" | Determines threshold calculation |
| `thresholdAmount` | Decimal | Fixed amount threshold | Used with "ValidationAmount" | Absolute validation threshold |
| `thresholdPercentage` | Decimal | Percentage of revenue threshold | Used with "RevenuePercentage" | Revenue-based threshold |
| `thresholdVehicleCount` | Integer | Number of vehicles threshold | Used with "VehicleCount" | Vehicle-based threshold |
| `useNetValidations` | Boolean | Use net vs. gross validations | Boolean (true/false) | BILLABLE_NET_VALIDATIONS column |

### Validation Business Logic
```yaml
Threshold Calculation:
  - RevenuePercentage: threshold = revenue * thresholdPercentage / 100
  - VehicleCount: threshold = thresholdVehicleCount
  - ValidationAmount: threshold = thresholdAmount

Validation Processing:
  - Compare actual validations to calculated threshold
  - Exceeding threshold creates billable validation line item
  - Net vs. gross validation selection based on useNetValidations flag
```

## Bell Service Fee Configuration Schema

### Bell Service Fee Structure
```json
{
  "bellServiceFee": {
    "enabled": "Boolean",
    "amount": "Decimal",
    "title": "String",
    "invoiceGroup": "Integer"
  }
}
```

### Bell Service Fee Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether bell service fee is active | Boolean (true/false) | OR1/OR2 exclusion from Revenue Share |
| `amount` | Decimal | Fee amount | Positive decimal | Fixed amount for bell service |
| `title` | String | Line item title | Required string | Invoice line item display |
| `invoiceGroup` | Integer | Invoice group assignment | Integer | Multiple invoice scenarios |

### Bell Service Fee Business Logic
```yaml
Revenue Impact:
  - When enabled: OR1/OR2 codes excluded from Revenue Share calculations
  - Bell service revenue treated as separate line item
  - Fixed fee applied regardless of actual bell service revenue

Invoice Processing:
  - Creates separate line item with specified title
  - Amount is fixed regardless of actual bell service activity
  - Assigned to specified invoice group
```

## Management Agreement Configuration Schema

### Management Agreement Core Structure
```json
{
  "managementAgreement": {
    "enabled": "Boolean",
    "glAccount": "String",
    "managementFee": {
      "type": "String",
      "amount": "Decimal",
      "percentage": "Decimal",
      "laborHourRates": "Object"
    }
  }
}
```

### Management Agreement Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether management agreement is active | Boolean (true/false) | Enables Management Agreement calculations |
| `glAccount` | String | GL account for management fee | Always "4790" | GL mapping for management fees |
| `type` | String | Type of management fee | "FixedFee", "PerLaborHour", "RevenuePercentage" | Fee calculation method |
| `amount` | Decimal | Fixed fee amount | Used with "FixedFee" | Monthly fixed amount |
| `percentage` | Decimal | Revenue percentage | Used with "RevenuePercentage" | Percentage of revenue |
| `laborHourRates` | Object | Labor hour rates configuration | Used with "PerLaborHour" | Rate structure definition |

### Management Agreement Business Logic
```yaml
Management Fee Calculation:
  - FixedFee: Use amount field directly
  - RevenuePercentage: revenue * percentage / 100
  - PerLaborHour: Sum of (hours * rate) by job code

Dependencies:
  - Always requires billableAccounts.enabled = true
  - Integrates with payroll, expense, and profit share calculations
```

## Billable Accounts Configuration Schema

### Billable Accounts Structure
```json
{
  "billableAccounts": {
    "enabled": "Boolean",
    "payrollAccounts": {
      "excludedAccounts": ["String"]
    },
    "expenseAccounts": {
      "excludedAccounts": ["String"]
    },
    "pteb": {
      "type": "String",
      "percentage": "Decimal"
    },
    "supportServices": {
      "type": "String",
      "amount": "Decimal",
      "percentage": "Decimal",
      "payrollType": "String"
    }
  }
}
```

### Billable Accounts Field Definitions

#### Core Configuration
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether billable accounts is active | Always true with Management Agreement | Enables account-based billing |

#### Payroll Accounts
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `excludedAccounts` | Array[String] | Excluded payroll accounts | 6000-series accounts | Default excludes ["6010", "6014"] |

**Default Excluded Payroll Accounts:**
- "6010" - PTO Hourly
- "6014" - Other

#### Expense Accounts
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `excludedAccounts` | Array[String] | Excluded expense accounts | 7000-series accounts | Default excludes ["7005", "7016"] |

**Default Excluded Expense Accounts:**
- "7005" - Bad Debt
- "7016" - Contract Improvements

#### PTEB Configuration
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `type` | String | Payroll tax calculation type | "Actual", "Percentage" | PTEB calculation method |
| `percentage` | Decimal | PTEB percentage | Used with "Percentage" type | Percentage of payroll |

#### Support Services Configuration
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `type` | String | Support services calculation type | "Fixed", "Percentage" | Calculation method |
| `amount` | Decimal | Fixed amount | Used with "Fixed" type | Monthly fixed amount |
| `percentage` | Decimal | Percentage value | Used with "Percentage" type | Percentage calculation |
| `payrollType` | String | Payroll base for percentage | "Billable", "Total" | Base for percentage calculation |

### Billable Accounts Business Logic
```yaml
Account Inclusion Logic:
  - Payroll: Include all 6000-series except excluded accounts
  - Expense: Include all 7000-series except excluded accounts
  - PTEB: Calculate based on type (Actual from GL or Percentage)
  - Support Services: Calculate based on type and payroll base

Calculation Process:
  1. Sum included payroll accounts
  2. Sum included expense accounts
  3. Calculate PTEB based on configuration
  4. Calculate support services based on configuration
  5. Generate invoice line items for each component
```

## Insurance Configuration Schema

### Insurance Structure
```json
{
  "insurance": {
    "enabled": "Boolean",
    "type": "String",
    "amount": "Decimal",
    "additionalPercentage": "Decimal",
    "title": "String",
    "invoiceGroup": "Integer"
  }
}
```

### Insurance Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether insurance is configured | Boolean (true/false) | Controls insurance line item |
| `type` | String | Insurance calculation method | "FixedFee", "BasedOnBillableAccounts" | Calculation approach |
| `amount` | Decimal | Fixed fee amount | Used with "FixedFee" | Monthly fixed amount |
| `additionalPercentage` | Decimal | Additional percentage on accounts | Used with "BasedOnBillableAccounts" | Typically 5.77% |
| `title` | String | Line item title | Default "Insurance" | Invoice line item display |
| `invoiceGroup` | Integer | Invoice group assignment | Integer | Multiple invoice scenarios |

### Insurance Business Logic
```yaml
Calculation Methods:
  - FixedFee: Use amount field directly
  - BasedOnBillableAccounts: (payroll + expenses) * additionalPercentage / 100

GL Account Integration:
  - Maps to insurance-related GL accounts (7080, 7082, 7085)
  - Typically 5.77% additional percentage for comprehensive coverage
```

## Claims Configuration Schema

### Claims Structure
```json
{
  "claims": {
    "enabled": "Boolean",
    "type": "String",
    "capAmount": "Decimal",
    "title": "String",
    "invoiceGroup": "Integer"
  }
}
```

### Claims Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether claims are configured | Boolean (true/false) | Controls claims line item |
| `type` | String | Claims cap reset type | "AnnualCalendar", "AnnualAnniversary", "PerClaim" | Reset period determination |
| `capAmount` | Decimal | Maximum billable claims amount | Positive decimal | Total cap or per-claim limit |
| `title` | String | Line item title | Default "Loss & Damage" | Invoice line item display |
| `invoiceGroup` | Integer | Invoice group assignment | Integer | Multiple invoice scenarios |

### Claims Business Logic
```yaml
Cap Reset Logic:
  - AnnualCalendar: Reset January 1st
  - AnnualAnniversary: Reset on contract anniversary
  - PerClaim: Cap applies to each individual claim

Billing Process:
  - Track cumulative claims against cap
  - Bill actual claims up to cap amount
  - Reset accumulated amount based on type
```

## Profit Share Configuration Schema

### Profit Share Structure
```json
{
  "profitShare": {
    "enabled": "Boolean",
    "sharePercentage": "Decimal",
    "accumulationType": "String",
    "thresholdStructures": [
      {
        "tiers": [
          {
            "sharePercentage": "Decimal",
            "amount": "Decimal | 'infinity'",
            "order": "Integer"
          }
        ]
      }
    ]
  }
}
```

### Profit Share Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether profit share is active | Boolean (true/false) | Controls profit share calculations |
| `sharePercentage` | Decimal | Simple share percentage | Used without threshold structure | Flat percentage of profit |
| `accumulationType` | String | Threshold accumulation method | "Monthly", "AnnualCalendar", "AnnualAnniversary" | Reset period determination |
| `thresholdStructures` | Array[Object] | Threshold structures for complex agreements | Array of tier objects | Progressive profit sharing |

### Profit Share Business Logic
```yaml
Profit Calculation:
  profit = revenue - (billable_accounts + insurance + claims + management_fee)

Share Calculation:
  - Simple: profit * sharePercentage / 100
  - Tiered: Apply progressive tier structure to profit amount

Threshold Reset:
  - Monthly: Reset at beginning of each month
  - AnnualCalendar: Reset January 1st
  - AnnualAnniversary: Reset on contract anniversary
```

## Non-GL Billable Expenses Schema

### Non-GL Billable Expenses Structure
```json
{
  "nonGLBillableExpenses": {
    "enabled": "Boolean",
    "items": [
      {
        "type": "String",
        "amount": "Decimal",
        "percentage": "Decimal",
        "payrollType": "String",
        "title": "String",
        "finalPeriodBilled": {
          "month": "Integer",
          "year": "Integer"
        },
        "invoiceGroup": "Integer"
      }
    ]
  }
}
```

### Non-GL Billable Expenses Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether non-GL expenses are active | Boolean (true/false) | Controls non-GL expense calculations |
| `type` | String | Expense calculation method | "FixedAmount", "PercentagePayroll", "PercentageRevenue" | Calculation approach |
| `amount` | Decimal | Fixed amount | Used with "FixedAmount" | Monthly fixed amount |
| `percentage` | Decimal | Percentage value | Used with percentage types | Percentage calculation |
| `payrollType` | String | Payroll base for percentage | "Billable", "Total" | Base for payroll percentage |
| `title` | String | Line item title | Required string | Invoice line item display |
| `finalPeriodBilled` | Object | Last billing period | {month, year} | Stops billing after period |
| `invoiceGroup` | Integer | Invoice group assignment | Integer | Multiple invoice scenarios |

### Non-GL Billable Expenses Business Logic
```yaml
Calculation Methods:
  - FixedAmount: Use amount field directly
  - PercentagePayroll: payroll * percentage / 100
  - PercentageRevenue: revenue * percentage / 100

Payroll Base Options:
  - Billable: Use only billable payroll accounts
  - Total: Use all payroll accounts

Billing Lifecycle:
  - Continue billing until finalPeriodBilled reached
  - Stop billing after specified month/year
  - Useful for temporary or project-based expenses
```

## Per Labor Hour Configuration Schema

### Per Labor Hour Structure
```json
{
  "perLaborHour": {
    "enabled": "Boolean",
    "glAccount": "String",
    "jobRates": [
      {
        "jobCode": "String",
        "displayName": "String",
        "regularRate": "Decimal",
        "overtimeRate": "Decimal",
        "startDate": "Date (ISO format) | null",
        "endDate": "Date (ISO format) | null"
      }
    ],
    "includeHoursBackupReport": "Boolean"
  }
}
```

### Per Labor Hour Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether per labor hour is active | Boolean (true/false) | Controls per labor hour calculations |
| `glAccount` | String | GL account for per labor hour | Always "4791" | GL mapping for labor charges |
| `jobCode` | String | Legion job code | Required string | Job identification |
| `displayName` | String | Display name for job | Defaults to job code name | Invoice line item display |
| `regularRate` | Decimal | Rate for regular hours | Positive decimal | Rate for non-overtime hours |
| `overtimeRate` | Decimal | Rate for overtime hours | Positive decimal | Typically 1.5x regular rate |
| `startDate` | Date/null | Start date for rate | ISO format | Rate effective date |
| `endDate` | Date/null | End date for rate | ISO format | Rate expiration date |
| `includeHoursBackupReport` | Boolean | Include hours report | Boolean (true/false) | Hours breakdown report |

### Per Labor Hour Business Logic
```yaml
Rate Application:
  - Apply rates based on effective date ranges
  - Use most recent rate for overlapping periods
  - Separate regular and overtime calculations

Hour Source:
  - Hours sourced from Legion timekeeping system
  - Regular hours: standard work hours
  - Overtime hours: hours exceeding standard threshold

Calculation:
  total_charge = (regular_hours * regular_rate) + (overtime_hours * overtime_rate)

Reporting:
  - Optional backup report details billable hours by job code
  - Provides transparency for labor charges
```

## Fixed Fee Configuration Schema

### Fixed Fee Structure
```json
{
  "fixedFee": {
    "enabled": "Boolean",
    "services": [
      {
        "displayName": "String",
        "amount": "Decimal",
        "glAccount": "String",
        "invoiceGroup": "Integer"
      }
    ]
  }
}
```

### Fixed Fee Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether fixed fee is active | Boolean (true/false) | Controls fixed fee calculations |
| `displayName` | String | Service display name | Required string | Invoice line item display |
| `amount` | Decimal | Service fee amount | Positive decimal | Monthly fee amount |
| `glAccount` | String | GL account for service | Individual COA | Service-specific GL mapping |
| `invoiceGroup` | Integer | Invoice group assignment | Integer | Multiple invoice scenarios |

### Fixed Fee Business Logic
```yaml
Service Configuration:
  - Multiple services can be configured
  - Each service has independent GL account mapping
  - Services can be assigned to different invoice groups

Billing Process:
  - Fixed monthly fees regardless of usage
  - Simple line item generation
  - No complex calculations required
```

## Per Occupied Room Configuration Schema

### Per Occupied Room Structure
```json
{
  "perOccupiedRoom": {
    "enabled": "Boolean",
    "glAccount": "String",
    "rate": "Decimal",
    "displayName": "String",
    "invoiceGroup": "Integer"
  }
}
```

### Per Occupied Room Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether per occupied room is active | Boolean (true/false) | Controls per occupied room calculations |
| `glAccount` | String | GL account for per occupied room | Always "4791" | GL mapping for room charges |
| `rate` | Decimal | Rate per occupied room | Positive decimal | Amount per occupied room |
| `displayName` | String | Line item display name | Required string | Invoice line item display |
| `invoiceGroup` | Integer | Invoice group assignment | Integer | Multiple invoice scenarios |

### Per Occupied Room Business Logic
```yaml
Calculation:
  total_charge = occupied_rooms * rate

Data Source:
  - Room occupancy data from hotel property management system
  - Typically nightly occupied room counts
  - Aggregated for billing period

Rate Application:
  - Fixed rate per occupied room
  - No tier structure or thresholds
  - Simple multiplication calculation
```

## Mid Month Advance Configuration Schema

### Mid Month Advance Structure
```json
{
  "midMonthAdvance": {
    "enabled": "Boolean",
    "amount": "Decimal",
    "title": "String",
    "invoiceGroup": "Integer"
  }
}
```

### Mid Month Advance Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether mid-month advance is active | Boolean (true/false) | Controls mid-month advance functionality |
| `amount` | Decimal | Advance amount | Positive decimal | Amount to bill mid-month |
| `title` | String | Line item title | Required string | Invoice line item display |
| `invoiceGroup` | Integer | Invoice group assignment | Integer | Multiple invoice scenarios |

### Mid Month Advance Business Logic
```yaml
Billing Timing:
  - Billed mid-month (typically 15th)
  - Separate from regular monthly billing
  - Provides cash flow for customer

Reconciliation:
  - Advance amount credited against regular monthly invoice
  - Net billing = monthly_charges - advance_amount
  - May result in credit if advance exceeds charges
```

## Invoice Grouping Configuration Schema

### Invoice Grouping Structure
```json
{
  "invoiceGroups": {
    "enabled": "Boolean",
    "groups": [
      {
        "id": "Integer",
        "vendorId": "String | null",
        "siteNumber": "String | null",
        "customerName": "String | null",
        "billingEmail": "String | null"
      }
    ]
  }
}
```

### Invoice Grouping Field Definitions
| Field | Type | Description | Validation Rules | Business Logic |
|-------|------|-------------|------------------|----------------|
| `enabled` | Boolean | Whether multiple invoices are enabled | Boolean (true/false) | Allows multiple invoices per site |
| `id` | Integer | Group identifier | Used in component configurations | Reference for components |
| `vendorId` | String/null | Vendor ID for group | When null, uses contract vendorId | Group-specific vendor |
| `siteNumber` | String/null | Site number for group | When null, uses contract site number | Group-specific site |
| `customerName` | String/null | Customer name for group | When null, uses contract customer name | Group-specific customer |
| `billingEmail` | String/null | Email for invoice delivery | When null, uses contract billing email | Group-specific email |

### Invoice Grouping Business Logic
```yaml
Group Assignment:
  - Components specify invoiceGroup in their configuration
  - Components without invoiceGroup assigned to default group (id: 1)
  - Each group generates separate invoice

Inheritance Rules:
  - Null values inherit from contract-level configuration
  - Non-null values override contract-level defaults
  - Allows flexible invoice customization

Use Cases:
  - Separate invoices for different service types
  - Different billing addresses for different components
  - Customized invoice presentation by service category
```

## Revenue and GL Code Mapping

### Revenue Code Definitions
```json
{
  "revenueCodes": {
    "SD1": "Self-Park Daily",
    "VD1": "Valet Daily",
    "SM1": "Self-Park Monthly",
    "VM1": "Valet Monthly",
    "VO1": "Valet Overnight",
    "OR1": "Bell Service Type 1",
    "OR2": "Bell Service Type 2"
  }
}
```

### Revenue Code Categories
| Code | Description | Type | Business Logic |
|------|-------------|------|----------------|
| SD1 | Self-Park Daily | Self-Park | Standard daily parking revenue |
| VD1 | Valet Daily | Valet | Standard daily valet revenue |
| SM1 | Self-Park Monthly | Self-Park | Monthly parking arrangements |
| VM1 | Valet Monthly | Valet | Monthly valet arrangements |
| VO1 | Valet Overnight | Valet | Overnight valet services |
| OR1 | Bell Service Type 1 | Bell Service | Bell service revenue - excluded from Revenue Share when Bell Service Fee enabled |
| OR2 | Bell Service Type 2 | Bell Service | Bell service revenue - excluded from Revenue Share when Bell Service Fee enabled |

### GL Account Mapping
```json
{
  "glAccounts": {
    "4790": "Revenue Share / Management Agreement Fees",
    "4791": "Other Contract Fees",
    "6000-6199": "Payroll Accounts",
    "7000-7999": "Expense Accounts",
    "7005": "Bad Debt",
    "7016": "Contract Improvements",
    "7080": "Insurance - General Liability",
    "7082": "Insurance - Automobile",
    "7085": "Insurance - Workers Compensation"
  }
}
```

### GL Account Categories
| Account | Description | Used By | Business Logic |
|---------|-------------|---------|----------------|
| 4790 | Revenue Share / Management Agreement Fees | Revenue Share, Management Fee | Primary revenue account |
| 4791 | Other Contract Fees | Per Labor Hour, Per Occupied Room, Management Agreement | Alternative revenue account |
| 6000-6199 | Payroll Accounts | Billable Accounts | Payroll expense tracking |
| 7000-7999 | Expense Accounts | Billable Accounts | Operating expense tracking |
| 7005 | Bad Debt | Excluded by default | Non-billable expense |
| 7016 | Contract Improvements | Excluded by default | Non-billable expense |
| 7080 | Insurance - General Liability | Insurance calculation | Insurance expense |
| 7082 | Insurance - Automobile | Insurance calculation | Insurance expense |
| 7085 | Insurance - Workers Compensation | Insurance calculation | Insurance expense |

## Calculation Rules and Business Logic

### Revenue Share Calculation Logic
```yaml
Revenue Share Process:
  1. Collect revenue by revenue codes
  2. Apply threshold structures and accumulation types
  3. Calculate progressive tier percentages
  4. Generate Towne Park share amounts
  5. Handle validation thresholds and billable validations
  6. Exclude bell service revenue if Bell Service Fee enabled
  7. Apply deposited revenue credits if configured

Validation Processing:
  - Calculate threshold based on type
  - Compare actual validations to threshold
  - Generate billable validation line items for excess
  - Use net or gross validations based on configuration
```

### Management Agreement Calculation Logic
```yaml
Management Agreement Process:
  1. Calculate management fee based on type
  2. Calculate billable accounts (payroll + expenses)
  3. Calculate PTEB based on configuration
  4. Calculate support services based on configuration
  5. Calculate insurance based on configuration
  6. Calculate claims within cap limits
  7. Calculate profit share if enabled
  8. Process non-GL billable expenses
  9. Generate comprehensive invoice

Billable Accounts Logic:
  - Include all accounts except excluded ones
  - Apply PTEB calculation (actual or percentage)
  - Apply support services calculation
  - Generate detailed line items
```

### Per Labor Hour Calculation Logic
```yaml
Per Labor Hour Process:
  1. Source hours from Legion timekeeping system
  2. Apply rate based on effective date ranges
  3. Calculate regular hours * regular rate
  4. Calculate overtime hours * overtime rate
  5. Sum total charges by job code
  6. Generate line items with display names
  7. Include hours backup report if configured

Rate Application:
  - Use most recent rate for date range
  - Handle overlapping rate periods
  - Separate regular and overtime calculations
```

### Fixed Fee Calculation Logic
```yaml
Fixed Fee Process:
  1. Iterate through configured services
  2. Apply fixed amount for each service
  3. Map to individual GL accounts
  4. Assign to specified invoice groups
  5. Generate line items with display names

Service Configuration:
  - Multiple services supported
  - Independent GL account mapping
  - Flexible invoice group assignment
```

### Per Occupied Room Calculation Logic
```yaml
Per Occupied Room Process:
  1. Source occupancy data from hotel PMS
  2. Calculate occupied rooms for billing period
  3. Apply rate per occupied room
  4. Generate single line item
  5. Map to GL account 4791

Data Integration:
  - Real-time occupancy data
  - Nightly room counts
  - Aggregated for billing period
```

### General Business Rules
```yaml
Escalation Rules:
  - Annual rate increases in specified month
  - Fixed percentage or CPI-based increases
  - Applied to all relevant rate structures

Deviation Monitoring:
  - Compare actual to budget amounts
  - Alert on absolute or percentage thresholds
  - Flag significant variances for review

Invoice Generation:
  - Support multiple invoice groups
  - Include supporting reports
  - Apply payment terms and billing type
  - Handle mid-month advances and credits
```

## Validation Rules and Data Integrity

### Schema Validation Rules
```yaml
Required Fields:
  - id, contractType, vendorId, paymentTerms, billingType
  - enabled, startDate for all contracts
  - Contract-specific required fields based on type

Data Type Validation:
  - UUID format for id fields
  - Decimal precision for monetary amounts
  - Date format validation (ISO 8601)
  - Enumerated value validation for predefined lists

Business Logic Validation:
  - Management Agreement requires billableAccounts.enabled = true
  - Threshold structures require proper tier ordering
  - Rate effective dates must be logically consistent
  - GL account mappings must be valid
```

### Data Integrity Constraints
```yaml
Referential Integrity:
  - contractTypeId must reference valid contract type
  - vendorId must reference valid vendor
  - glAccount must reference valid GL account
  - jobCode must reference valid Legion job code

Business Rule Constraints:
  - Contract effective dates must be logical
  - Tier amounts must be in ascending order
  - Percentage values must be within valid ranges
  - Excluded accounts must be valid account numbers
```

## Power Platform Integration

### Power Platform Code Validation
**Validation Results**: The contract data dictionary aligns with Power Platform implementation:

#### Fixed Fee Generation Workflow
```javascript
// Contract type validation matches data dictionary
"@contains(triggerBody()?['text_1'], '126840000')" // Fixed Fee contract type

// Invoice group filtering aligns with schema
"@equals(coalesce(item()['bs_invoicegroup'], 1),triggerBody()?['number'])"

// Line item composition matches schema structure
{
  "title": "@item()?['bs_displayname']",
  "code": "@item()?['bs_code']", 
  "amount": "@item()?['bs_fee']"
}
```

#### Profit Share Calculation
```javascript
// Profit share formulas align with schema definitions
bs_ownerpercent: =If(bs_percenttocharge >= 0, 100 - bs_percenttocharge, 0)
bs_totalduetoowner: =bs_profitamount - bs_totalduetotownepark
```

### Schema Integration Points
- **Field Mapping**: Power Platform fields directly correspond to schema definitions
- **Validation Logic**: Workflow validation rules implement schema constraints
- **Calculation Formulas**: Business logic calculations match schema specifications
- **Data Flow**: Schema structure supports Power Platform data processing

## Related Documentation

- [Contract Management System Overview](../../systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md) 🔄 PLANNED
- [Comprehensive Contract Business Rules](../../business-rules/contracts/20250716_Contracts_BusinessRules_Comprehensive.md) ✓ VERIFIED
- [Contract Escalation Rules](../../business-rules/contracts/contract-escalation-rules.md) ✓ VERIFIED
- [Contracts Data Schema](contracts-data-schema.md) ✓ VERIFIED
- [Billing Technical Architecture](../backend/20250716_Billing_TechnicalArchitecture_Development.md) ✓ VERIFIED
- [PowerBill System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Contract Setup Workflow](../../user-processes/contract-admin/contract-setup-workflow.md) ✓ VERIFIED
- [Contract Configuration Guide](../../configuration/contracts/contract-configuration-guide.md) ✓ VERIFIED

## Code Validation Report

**Last Validated**: 2025-07-18
**Validation Scope**: Schema Structure and Power Platform Integration

### Validation Summary
- ✅ **Schema Accuracy**: Data dictionary fields match Power Platform implementation
- ✅ **Business Logic Alignment**: Calculation rules align with Power Platform formulas
- ✅ **Validation Rules**: Schema constraints implemented in Power Platform workflows
- ✅ **Integration Points**: Data flow supports Power Platform processing requirements

### Validation Findings
The contract data dictionary provides comprehensive schema definition that directly supports Power Platform implementation. All field definitions, validation rules, and business logic specifications align with the documented Power Platform workflows and formulas.

### Code File References
- **Power Platform Workflows**: FixedFeeGenerationChildFlow implementation
- **Formula Definitions**: bs_profitsharebypercentage calculations
- **Schema Validation**: JSON schema structure validation
- **Business Logic**: Contract type and invoice group processing

### Validation Methodology
- **Schema Mapping**: Verified field correspondence between dictionary and implementation
- **Business Logic Review**: Confirmed calculation logic matches Power Platform formulas
- **Validation Rule Check**: Ensured schema constraints are enforced in workflows
- **Integration Testing**: Verified data flow compatibility with Power Platform requirements

This comprehensive contract data dictionary technical specification provides the definitive reference for all contract-related data structures, validation rules, and business logic implementation within the Towne Park PowerBill system, ensuring consistent data modeling and accurate business rule implementation across all contract types.
## Quick Links

- [Comprehensive Contract Business Rules](../../business-rules/contracts/20250716_Contracts_BusinessRules_Comprehensive.md)
- [Contract Escalation Rules](../../business-rules/contracts/contract-escalation-rules.md)
- [Contracts Data Schema](contracts-data-schema.md)
- [Billing Technical Architecture](../backend/20250716_Billing_TechnicalArchitecture_Development.md)
- [Contract Setup Workflow](../../user-processes/contract-admin/contract-setup-workflow.md)
