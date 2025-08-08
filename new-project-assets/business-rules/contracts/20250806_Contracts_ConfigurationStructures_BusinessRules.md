---
title: "Towne Park Contracts - Configuration Structures Business Rules"
description: "Comprehensive business rules defining contract configuration structures, billing components, and data relationships for all contract types in the Towne Park billing system"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-05-23
version: 1.0
status: Active
owner: "Documentation Team"
source_documents:
  - "0242_D7221183_7FF3_EF11_BE21_7C1E5259F653.json"
  - "0918_56B5DB4A_91D8_EF11_8EEA_0022480A57AC.json"
  - "0237_D4DAC15F_1DEE_EF11_BE20_7C1E5259F653.json"
  - "1078_BD91A03D_98EF_EF11_BE20_7C1E5259F653.json"
systems:
  - Billing
  - Contracts
components:
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Billing Configuration
user_roles:
  - Account Manager
  - Billing Admin
  - Contract Admin
tags:
  - contracts
  - billing-rules
  - configuration
  - data-structures
---

# Towne Park Contracts - Configuration Structures Business Rules

## Overview

This document defines the comprehensive business rules governing contract configuration structures within the Towne Park billing system. These rules establish the data models, validation requirements, and business logic for all contract types including Management Agreements, Per Labor Hour contracts, Revenue Share agreements, and specialized billing arrangements.

## Contract Metadata Structure

### Required Metadata Fields

**Rule Name**: Contract Metadata Requirements
**Description**: All contracts must contain standardized metadata for identification and management
**Applies To**: All contract types
**Implementation**: Contract creation and modification processes

#### Core Identification Fields
- **siteNumber**: Unique 4-digit site identifier (e.g., "0242", "0918")
- **customerName**: Full customer business name
- **customerID**: Standardized customer identifier format "CUST-{siteNumber}"
- **contractEffectiveDate**: Contract start date in YYYY-MM-DD format
- **contractEndDate**: Contract termination date (empty string for ongoing contracts)
- **contractStatus**: Current status ("active", "inactive", "pending")
- **lastModifiedDate**: Last modification timestamp in YYYY-MM-DD format
- **contractVersion**: Version number in semantic format (e.g., "1.0")
- **contractType**: Descriptive contract type classification
- **accountManager**: Assigned account manager full name
- **paymentTerms**: Payment schedule specification
- **notes**: Optional contract-specific notes (NaN if empty)

#### Location Information Structure
```json
"location": {
  "region": "Regional designation or NaN",
  "district": "District code and name (e.g., 'D - Philadelphia')",
  "state": "Two-letter state code",
  "city": "City name",
  "address": "Complete street address",
  "siteType": "Site classification (empty string if not specified)"
}
```

## Contract Configuration Components

### Universal Contract Fields

**Rule Name**: Universal Contract Configuration
**Description**: Standard fields present in all contract configurations regardless of type
**Applies To**: All contract types
**Validation Rules**: All fields must be present with appropriate data types

#### Financial Configuration
- **id**: Unique GUID identifier for contract record
- **purchaseOrder**: Customer PO number (null if not provided)
- **paymentTerms**: Payment schedule ("Due in 30 Days", "Due in 45 Days", "Due by 20th")
- **billingType**: Billing timing ("Arrears", "Advance")
- **incrementMonth**: Annual increment month ("January", "February", etc.)
- **incrementAmount**: Annual rate increase amount (decimal)
- **consumerPriceIndex**: Boolean flag for CPI adjustments
- **notes**: Additional contract notes (null if empty)
- **deviationAmount**: Maximum deviation amount threshold (typically 2500.0)
- **deviationPercentage**: Maximum deviation percentage threshold (typically 10.0)
- **deposits**: Boolean flag indicating if deposits are required

#### Supporting Reports Configuration
- **supportingReports**: Array of required report types
  - Common values: "MixOfSales", "TaxReport", "LaborDistributionReport", "OtherExpensesReport", "ParkingDepartmentReport", "ValidationReport", "HoursBackupReport"

### Billing Component Structures

#### Invoice Grouping Component
**Rule Name**: Invoice Grouping Configuration
**Description**: Controls how billing items are grouped on invoices
**Structure**:
```json
"invoiceGrouping": {
  "enabled": boolean,
  "invoiceGroups": []
}
```

#### Fixed Fee Component
**Rule Name**: Fixed Fee Billing Configuration
**Description**: Defines fixed monthly or periodic fee structures
**Structure**:
```json
"fixedFee": {
  "enabled": boolean,
  "serviceRates": []
}
```

#### Per Labor Hour Component
**Rule Name**: Per Labor Hour Billing Configuration
**Description**: Defines hourly billing rates by job classification
**Structure**:
```json
"perLaborHour": {
  "enabled": boolean,
  "hoursBackupReport": boolean,
  "jobRates": [
    {
      "id": "GUID",
      "name": "Service category name",
      "displayName": "Job title display name",
      "rate": decimal_rate,
      "overtimeRate": decimal_overtime_rate,
      "jobCode": "Job classification code",
      "startDate": "YYYY-MM-DD or null",
      "endDate": "YYYY-MM-DD or null",
      "invoiceGroup": integer
    }
  ]
}
```

**Job Rate Validation Rules**:
- Rate and overtimeRate must be positive decimal values
- jobCode must be unique within contract
- invoiceGroup must be positive integer
- startDate and endDate define rate validity period

#### Per Occupied Room Component
**Rule Name**: Per Occupied Room Billing Configuration
**Description**: Defines billing based on hotel occupancy metrics
**Structure**:
```json
"perOccupiedRoom": {
  "enabled": boolean,
  "roomRate": decimal,
  "invoiceGroup": integer
}
```

#### Revenue Share Component
**Rule Name**: Revenue Share Billing Configuration
**Description**: Defines percentage-based revenue sharing arrangements
**Structure**:
```json
"revenueShare": {
  "enabled": boolean,
  "thresholdStructures": [
    {
      "id": "GUID",
      "revenueCodes": ["array", "of", "revenue", "codes"],
      "accumulationType": "Monthly or Annual",
      "tiers": [
        {
          "sharePercentage": decimal,
          "amount": decimal_threshold
        }
      ],
      "validationThresholdType": "validation_type or null",
      "validationThresholdAmount": decimal,
      "invoiceGroup": integer
    }
  ]
}
```

**Revenue Share Validation Rules**:
- sharePercentage must be between 0 and 100
- revenueCodes must contain valid revenue classification codes
- tiers must be ordered by threshold amount
- accumulationType determines calculation period

#### Bell Service Fee Component
**Rule Name**: Bell Service Fee Configuration
**Description**: Defines bell service and hospitality fee structures
**Structure**:
```json
"bellServiceFee": {
  "enabled": boolean,
  "bellServices": [
    {
      "id": "GUID",
      "invoiceGroup": integer
    }
  ]
}
```

#### Mid-Month Advance Component
**Rule Name**: Mid-Month Advance Configuration
**Description**: Defines advance payment structures within billing periods
**Structure**:
```json
"midMonthAdvance": {
  "enabled": boolean,
  "midMonthAdvances": []
}
```

#### Deposited Revenue Component
**Rule Name**: Deposited Revenue Configuration
**Description**: Defines handling of customer-deposited revenue streams
**Structure**:
```json
"depositedRevenue": {
  "enabled": boolean,
  "depositData": [
    {
      "id": "GUID",
      "towneParkResponsibleForParkingTax": boolean,
      "depositedRevenueEnabled": boolean,
      "invoiceGroup": integer
    }
  ]
}
```

### Billable Accounts Configuration

**Rule Name**: Billable Accounts Structure
**Description**: Defines payroll and expense account configurations for billing
**Applies To**: Management Agreement and Billable Account contracts
**Structure**:
```json
"billableAccounts": {
  "enabled": boolean,
  "billableAccountsData": [
    {
      "id": "GUID",
      "payrollAccountsData": "JSON_string_of_account_array",
      "payrollAccountsInvoiceGroup": integer,
      "payrollAccountsLineTitle": "string",
      "payrollTaxesEnabled": boolean,
      "payrollTaxesBillingType": "Percentage or Fixed",
      "payrollTaxesLineTitle": "string",
      "payrollTaxesPercentage": decimal,
      "payrollSupportAmount": decimal_or_null,
      "payrollSupportBillingType": "Fixed or Percentage",
      "payrollSupportEnabled": boolean,
      "payrollSupportLineTitle": "string",
      "payrollSupportPayrollType": "Billable or NonBillable",
      "payrollExpenseAccountsData": "JSON_string_of_expense_array",
      "payrollExpenseAccountsInvoiceGroup": integer,
      "payrollExpenseAccountsLineTitle": "string"
    }
  ]
}
```

#### Payroll Account Structure
**Rule Name**: Payroll Account Configuration
**Description**: Individual payroll account definitions within billable accounts
**Structure** (within payrollAccountsData JSON string):
```json
{
  "code": "4-digit_account_code",
  "title": "Account description",
  "isEnabled": boolean
}
```

**Standard Payroll Account Codes**:
- 6000: Salaries - G & A
- 6002: Salaries - Contract Site
- 6003: Salaries - Human Resources
- 6004: Salaries - Sales & Marketing
- 6005: Salaries - Executive Office
- 6007: Salaries - Regional/District
- 6010: Salaries - Personal Leave & Sick Pay - Hourly
- 6012: Salaries - Stockholder Awards
- 6013: Salaries - Relocation
- 6014: Salaries - Other
- 6015: Salaries - Holiday
- 6016: Salaries - Holiday Premium Operations
- 6017: Salaries - Overtime
- 6019: Salaries - Personal Leave & Sick Pay - Salary
- 6030: Salaries - Communication Expense
- 6035: Salaries - Commuter Expense
- 6100: Salaries - Corporate Incentive Program
- 6101: Salaries - Sales Incentive Program
- 6110: Salaries - Local Incentive Program
- 6115: Salaries - Gratuities

#### Expense Account Structure
**Rule Name**: Expense Account Configuration
**Description**: Individual expense account definitions within billable accounts
**Structure** (within payrollExpenseAccountsData JSON string):
```json
{
  "code": "4-digit_account_code",
  "title": "Account description",
  "isEnabled": boolean
}
```

**Standard Expense Account Codes**:
- 7000: Advertising
- 7005: Bad Debt Expense
- 7010: Bank Fees
- 7011: Credit Card Fees
- 7015: Business Development
- 7016: Contract Improvements
- 7017: Computer Services
- 7018: Contract Lease Expense
- 7019: Contract Labor
- 7020: Contributions
- 7021: One Time Charges
- 7026: Equipment Cost
- 7030: Dues & Subscription
- 7040: Employee Meetings
- 7045: Employee Relations
- 7050: Employee Training
- 7055: Equipment Lease - Parking Equipment
- 7060: Equipment Lease - Vehicles
- 7065: Equipment Rental - Miscellaneous
- 7070: Equipment Rental - Vehicles
- 7072: Fines & Penalties
- 7075: Fuel - Vehicles
- 7080: Insurance - General Liability
- 7082: Insurance - Vehicle
- 7085: Insurance - Other
- 7090: Internet Expenses
- 7095: License & Permits
- 7099: Loss & Damage - Prior Year
- 7100: Loss & Damage
- 7101: Service Recovery
- 7102: Claims Handling Fees
- 7105: Meals & Entertainment
- 7110: Miscellaneous
- 7113: Office Supplies
- 7115: Outside Services
- 7120: Payroll Processing
- 7125: Personnel Recruitment
- 7126: Mvr Monitoring
- 7130: Postage
- 7131: Freight Expense
- 7135: Production & Collateral
- 7140: Professional Fees - Accounting
- 7145: Professional Fees - Legal
- 7150: Professional Fees - Other
- 7155: Promotion & Events
- 7160: Public Relations
- 7165: Relocations Expense
- 7170: Rents - Parking
- 7171: Rents - Office And Other
- 7175: Repairs & Maintenance
- 7178: Repairs & Maintenance - Vehicle
- 7180: Signage
- 7182: Smallwares
- 7185: Supplies & Equipment
- 7190: Taxes - Other
- 7195: Taxes - Non-Operating
- 7200: Telephone & Pagers
- 7205: Tickets & Printed Material
- 7210: Trade Shows
- 7215: Travel - General
- 7217: Travel - Airfare
- 7219: Travel - Lodging
- 7220: Uniforms
- 7225: Utilities
- 7230: Vehicle Expense
- 7240: Board Of Director Expenses
- 7245: Non-Employee Stock Compensation
- 7270: Royalty Fees - Starbucks
- 7275: Marketing Fees - Starbucks
- 7350: I.C. Management Service Fees
- 7351: Overhead Allocation Fee - Upp

### Management Agreement Configuration

**Rule Name**: Management Agreement Structure
**Description**: Defines management fee structures and related billing components
**Applies To**: Management Agreement contracts
**Structure**:
```json
"managementAgreement": {
  "enabled": boolean,
  "ManagementFees": [
    {
      "id": "GUID",
      "invoiceGroup": integer,
      "managementAgreementType": "FixedFee, LaborHour, or RevenuePercentage",
      "fixedFeeAmount": decimal,
      "laborHourJobCode": "job_code or null",
      "perLaborHourJobCodeData": [],
      "laborHourRate": decimal,
      "laborHourOvertimeRate": decimal,
      "revenuePercentageAmount": decimal,
      "insuranceAdditionalPercentage": decimal,
      "insuranceEnabled": boolean,
      "insuranceFixedFeeAmount": decimal,
      "insuranceLineTitle": "string",
      "insuranceType": "BasedOnBillableAccounts or FixedFee",
      "claimsCapAmount": decimal,
      "claimsEnabled": boolean,
      "claimsLineTitle": "string or null",
      "claimsType": "AnnualAnniversary or Monthly",
      "profitShareAccumulationType": "Monthly or Annual",
      "profitShareEnabled": boolean,
      "profitShareTierData": [
        {
          "sharePercentage": decimal,
          "amount": decimal_threshold
        }
      ],
      "validationThresholdAmount": decimal,
      "validationThresholdEnabled": boolean,
      "validationThresholdType": "RevenuePercentage or FixedAmount",
      "nonGlBillableExpensesEnabled": boolean_or_null,
      "nonGlBillableExpenses": []
    }
  ]
}
```

**Management Agreement Validation Rules**:
- managementAgreementType determines which rate fields are required
- insuranceAdditionalPercentage must be between 0 and 100
- profitShareTierData must be ordered by threshold amount
- validationThresholdAmount must be positive when enabled

## Flattened Data Structure

### Flattened Field Naming Convention

**Rule Name**: Flattened Data Naming
**Description**: Standardized naming convention for flattened contract data
**Pattern**: `contract_{component}_{subcomponent}_{index}_{field}`

**Examples**:
- `contract_billableAccounts_billableAccountsData_1_payrollTaxesPercentage`
- `contract_revenueShare_thresholdStructures_1_tiers_1_sharePercentage`
- `contract_perLaborHour_jobRates_2_rate`

### Enabled Components Tracking

**Rule Name**: Component Enablement Tracking
**Description**: Flattened structure includes summary of enabled billing components
**Field**: `contract_enabled_components`
**Values**: Array of enabled component names
**Possible Components**:
- "billableAccounts"
- "managementAgreement"
- "perLaborHour"
- "revenueShare"
- "fixedFee"
- "perOccupiedRoom"
- "bellServiceFee"
- "midMonthAdvance"
- "depositedRevenue"

### Account Code Tracking

**Rule Name**: Account Code Enablement
**Description**: Flattened structure includes arrays of enabled account codes
**Fields**:
- `contract_payroll_accounts_enabled`: Array of enabled payroll account codes
- `contract_expense_accounts_enabled`: Array of enabled expense account codes

### Financial Summary Structure

**Rule Name**: Contract Financial Summary
**Description**: Standardized financial summary information
**Structure**:
```json
"contract_financials": {
  "annualContractValue": decimal,
  "estimatedMonthlyRevenue": decimal,
  "contractTerm": integer,
  "contractTermUnit": "Months or Years",
  "contractType": "descriptive_contract_type",
  "billingType": "Arrears or Advance",
  "district": "district_designation",
  "region": "region_name or NaN",
  "siteNumber": "site_identifier"
}
```

## Contract Type Specific Rules

### Management Agreement Contracts

**Rule Name**: Management Agreement Requirements
**Description**: Specific requirements for Management Agreement contract type
**Required Components**:
- billableAccounts: Must be enabled
- managementAgreement: Must be enabled
**Optional Components**: All other billing components
**Validation**: Must include comprehensive payroll and expense account configurations

### Per Labor Hour Contracts

**Rule Name**: Per Labor Hour Requirements
**Description**: Specific requirements for Per Labor Hour contract type
**Required Components**:
- perLaborHour: Must be enabled with jobRates array
**Required Reports**: "HoursBackupReport"
**Validation**: 
- At least one job rate must be defined
- All rates must be positive values
- Job codes must be unique within contract

### Revenue Share Contracts

**Rule Name**: Revenue Share Requirements
**Description**: Specific requirements for Revenue Share contract type
**Required Components**:
- revenueShare: Must be enabled with thresholdStructures
**Optional Components**: depositedRevenue (commonly enabled)
**Required Reports**: "MixOfSales", "ParkingDepartmentReport"
**Validation**:
- At least one threshold structure must be defined
- Revenue codes must be valid
- Share percentages must be between 0 and 100

### Other Contract Types

**Rule Name**: Other Contract Type Requirements
**Description**: Requirements for specialized contract configurations
**Allowed Components**: Any combination of billing components
**Examples**:
- Per Occupied Room + Bell Service Fee
- Fixed Fee + Revenue Share
- Custom billing arrangements

## Data Validation Rules

### Required Field Validation

**Rule Name**: Required Field Validation
**Description**: All contracts must pass required field validation
**Validation Checks**:
- All metadata fields must be present and properly formatted
- Contract ID must be valid GUID format
- Site number must be 4-digit numeric string
- Dates must be in YYYY-MM-DD format
- Boolean fields must be true/false
- Decimal fields must be valid numbers
- Array fields must be properly structured

### Business Logic Validation

**Rule Name**: Business Logic Validation
**Description**: Contracts must pass business logic validation
**Validation Checks**:
- At least one billing component must be enabled
- Enabled components must have valid configuration data
- Rate values must be positive
- Percentage values must be between 0 and 100
- Invoice groups must be positive integers
- Account codes must exist in standard chart of accounts

### Data Consistency Validation

**Rule Name**: Data Consistency Validation
**Description**: Contract data must be internally consistent
**Validation Checks**:
- Flattened data must match original structure
- Enabled components list must match actual enabled components
- Account code arrays must match enabled accounts in detailed structures
- Financial summary must reflect contract configuration

## Integration Points

### Payroll System Integration

**Rule Name**: Payroll System Integration
**Description**: Contract configurations integrate with payroll processing
**Integration Points**:
- Payroll account codes map to payroll system accounts
- PTEB percentages apply to payroll tax calculations
- Job codes link to time tracking systems
- Rate structures determine billing calculations

### Revenue System Integration

**Rule Name**: Revenue System Integration
**Description**: Contract configurations integrate with revenue tracking
**Integration Points**:
- Revenue codes map to revenue classification systems
- Revenue share calculations use actual revenue data
- Deposited revenue tracking integrates with cash management
- Validation thresholds trigger review processes

### Billing System Integration

**Rule Name**: Billing System Integration
**Description**: Contract configurations drive billing system operations
**Integration Points**:
- Invoice grouping controls invoice layout
- Line titles appear on customer invoices
- Payment terms determine due dates
- Supporting reports are automatically generated

## Related Documentation

- [Contract Configuration Setup Guide](../configuration/contracts/contract-configuration-guide/index.md)
- [Billing Business Rules](../billing/overview/index.md)
- [Revenue Share Business Rules](../contract-types/revenue-share/index.md)
- [Management Agreement Business Rules](../contract-types/management-agreement/index.md)
- [Per Labor Hour Business Rules](../contract-types/per-labor-hour/index.md)
- [Contract Data Dictionary](../../technical/database/20250718_Contracts_DataDictionary_TechnicalSpec.md)

## Code Validation

**Last Validated**: 2025-08-06
**Validation Scope**: Contract data structures and business rules
**Code Copy Date**: 2025-05-23

### Validation Summary
- ✅ **Verified Elements**: Contract JSON structure matches documented schema
- ✅ **Data Model Accuracy**: All field definitions verified against source data
- ✅ **Business Rule Compliance**: Validation rules align with contract requirements
- ✅ **Integration Points**: Account codes and structures verified

**VERIFICATION NEEDED**: Source code validation against Power Platform contract management components to ensure complete accuracy of business rule implementations.

### Validation Limitations
- Contract creation and modification workflows require validation against Power Platform source code
- Business rule enforcement logic needs verification in billing system implementation
- Integration mappings require validation against actual system interfaces