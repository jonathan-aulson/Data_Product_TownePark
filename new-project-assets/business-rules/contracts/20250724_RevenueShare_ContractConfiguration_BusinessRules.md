---
title: "Towne Park Revenue Share Contract Configuration - Business Rules"
description: "Comprehensive business rules and calculation formulas for revenue share contract configuration, including threshold structures, billing parameters, and deposited revenue handling"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-05-23
version: 1.0
status: Draft
owner: "Documentation Team"
source_documents:
  - "0170_8C749BA1_19EE_EF11_BE20_7C1E5259F653.json"
systems:
  - Billing
  - Contract Management
components:
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Revenue Share
  - Deposited Revenue
  - Billable Expense Accounts
user_roles:
  - Account Manager
  - Billing Admin
  - Billing Manager
  - Regional Finance
  - Corporate Finance
tags:
  - revenue-share
  - contract-configuration
  - business-rules
  - billing-calculation
  - threshold-structures
  - deposited-revenue
---

# Towne Park Revenue Share Contract Configuration - Business Rules

## Overview

Revenue share contracts represent a fundamental billing model where Towne Park receives a percentage of customer parking revenue. This document defines the complete business rules, calculation formulas, and configuration parameters for revenue share contract management, based on the Gaylord Opryland Hotel contract implementation (Site 0170).

## Contract Metadata Requirements

### Core Contract Information
- **Contract ID**: Unique GUID identifier for system tracking
- **Site Number**: 4-digit customer site identifier (e.g., "0170")
- **Customer Name**: Full legal customer name
- **Customer ID**: Standardized customer identifier format (CUST-XXXX)
- **Contract Type**: "Revenue Share" with optional modifiers (e.g., "Revenue Share; Deposited Revenue")
- **Contract Status**: Active, Inactive, Pending, Expired
- **Version Control**: Semantic versioning for contract modifications

### Temporal Parameters
- **Contract Effective Date**: Start date for billing calculations
- **Contract End Date**: Optional termination date (empty for ongoing contracts)
- **Last Modified Date**: System timestamp for audit trail
- **Contract Version**: Incremental version number for tracking changes

### Geographic and Organizational Structure
- **Region**: Regional classification (may be null for certain contracts)
- **District**: District assignment (e.g., "D - Nashville")
- **State**: Two-letter state code
- **City**: Primary city location
- **Address**: Complete physical address
- **Site Type**: Classification of parking facility type

## Revenue Share Calculation Rules

### Primary Revenue Share Structure

**Rule Name**: Standard Revenue Share Percentage
**Description**: Fixed percentage of qualifying revenue allocated to Towne Park
**Applies To**: All revenue codes within defined threshold structures
**Calculation Formula**: 
```
Towne Park Revenue = Qualifying Revenue × Share Percentage
Owner Revenue = Qualifying Revenue × (100% - Share Percentage)
```

**Implementation Details**:
- **Share Percentage**: 21.0% (as defined in contract)
- **Accumulation Type**: Monthly aggregation of revenue
- **Threshold Amount**: $0.00 (no minimum threshold)
- **Invoice Group**: 1 (primary billing group)

### Revenue Code Classification

**Qualifying Revenue Codes**:
- **ADJ**: Revenue adjustments
- **OR1, OR2**: Other revenue categories 1 and 2
- **SD1, SD2, SD3**: Self-park daily rates (tiers 1-3)
- **SM1, SM2, SM3**: Self-park monthly rates (tiers 1-3)
- **SO1, SO2, SO3**: Self-park other rates (tiers 1-3)
- **VD1, VD2, VD3**: Valet daily rates (tiers 1-3)
- **VM1, VM2, VM3**: Valet monthly rates (tiers 1-3)
- **VO1, VO2, VO3**: Valet other rates (tiers 1-3)

**Revenue Code Validation Rules**:
- All listed revenue codes MUST be included in share calculations
- Revenue codes not listed are excluded from share calculations
- New revenue codes require contract amendment for inclusion

### Threshold Structure Configuration

**Threshold Structure ID**: a96872bc-af08-f011-bae3-7c1e5259f653
**Accumulation Type**: Monthly
**Tier Structure**: Single tier with flat percentage
**Validation Threshold**: None (null validation threshold type)

## Billing Configuration Rules

### Payment Terms and Timing
- **Payment Terms**: "Due in 15 Days" from invoice date
- **Billing Type**: "Arrears" (billing after service period)
- **Billing Frequency**: Monthly
- **Invoice Generation**: Automated based on revenue data

### Contract Increment Parameters
- **Increment Month**: January (annual adjustment period)
- **Increment Amount**: $0.00 (no automatic increases)
- **Consumer Price Index**: False (no CPI adjustments)

### Deviation Thresholds
- **Deviation Amount**: $2,500.00 (absolute variance threshold)
- **Deviation Percentage**: 10.0% (relative variance threshold)
- **Deviation Handling**: Manual review required when exceeded

## Deposited Revenue Handling

### Deposited Revenue Configuration
**Rule Name**: Deposited Revenue Processing
**Description**: Handling of customer deposits and advance payments
**Applies To**: Contracts with deposited revenue enabled

**Configuration Parameters**:
- **Deposited Revenue Enabled**: True
- **Towne Park Responsible for Parking Tax**: False
- **Invoice Group**: 1 (primary billing group)
- **Deposit Data ID**: 159b58be-1aee-ef11-be20-7c1e5259f653

**Business Rules**:
- Customer deposits are tracked separately from revenue share calculations
- Parking tax responsibility remains with customer
- Deposits are applied against future invoices in chronological order
- Deposit interest calculations follow standard corporate policy

## Supporting Documentation Requirements

### Required Reports
- **Mix of Sales Report**: Detailed breakdown of revenue by category
- **Parking Department Report**: Operational metrics and performance data

### Report Validation Rules
- Reports must be submitted within 10 business days of month-end
- All revenue codes must reconcile to general ledger
- Variance explanations required for deviations exceeding thresholds

## Billable Accounts Configuration

### Payroll Account Structure
**Note**: Billable accounts are disabled for this contract type but configuration is preserved for reference.

**Enabled Payroll Account Codes**:
- 6000: Salaries - G & A
- 6002: Salaries - Contract Site
- 6003: Salaries - Human Resources
- 6004: Salaries - Sales & Marketing
- 6005: Salaries - Executive Office
- 6007: Salaries - Regional/District
- 6012: Salaries - Stockholder Awards
- 6013: Salaries - Relocation
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

**Disabled Payroll Account Codes**:
- 6010: Salaries - Personal Leave & Sick Pay - Hourly
- 6014: Salaries - Other

### Expense Account Structure
**Enabled Expense Account Codes** (partial list - see source for complete enumeration):
- 7000: Advertising
- 7010: Bank Fees
- 7011: Credit Card Fees
- 7015: Business Development
- 7017: Computer Services
- 7018: Contract Lease Expense
- 7019: Contract Labor
- [Additional codes preserved in source document]

**Disabled Expense Account Codes**:
- 7005: Bad Debt Expense
- 7016: Contract Improvements

## Contract Component Enablement Rules

### Enabled Components
- **Revenue Share**: Primary billing mechanism
- **Deposited Revenue**: Customer deposit handling

### Disabled Components
- **Fixed Fee**: Not applicable for revenue share contracts
- **Per Labor Hour**: Not applicable for revenue share contracts
- **Per Occupied Room**: Not applicable for revenue share contracts
- **Bell Service Fee**: Not applicable for this contract
- **Mid-Month Advance**: Not applicable for this contract
- **Management Agreement**: Separate contract type

## Financial Summary Calculations

### Contract Valuation
- **Annual Contract Value**: $0.00 (variable based on customer revenue)
- **Estimated Monthly Revenue**: $0.00 (requires historical data analysis)
- **Contract Term**: 36 months
- **Contract Term Unit**: Months

### Performance Metrics
- **Revenue Share Percentage**: 21.0%
- **Expected Revenue Growth**: Based on customer business performance
- **Risk Assessment**: Low (established customer with stable revenue)

## Validation Rules

### Data Integrity Requirements
- All monetary amounts must be non-negative
- Percentage values must be between 0 and 100
- Date fields must follow ISO 8601 format
- GUID fields must be valid UUID format

### Business Logic Validation
- Revenue share percentage cannot exceed 100%
- Threshold amounts must be positive or zero
- Invoice groups must be sequential integers starting from 1
- Revenue codes must match approved code list

## Integration Points

### System Dependencies
- **Power Platform Billing System**: Primary contract storage and processing
- **Revenue Calculation Engine**: Automated percentage calculations
- **General Ledger Integration**: Financial reporting and reconciliation
- **Customer Portal**: Contract visibility and reporting access

### Data Flow Requirements
- Real-time revenue data synchronization
- Monthly billing cycle automation
- Exception handling for threshold violations
- Audit trail maintenance for all modifications

## Exception Handling

### Threshold Violation Procedures
1. **Automatic Detection**: System flags deviations exceeding defined thresholds
2. **Manual Review**: Account manager investigates variance causes
3. **Customer Communication**: Notification of significant variances
4. **Adjustment Processing**: Corrections applied to subsequent billing cycles

### Contract Modification Procedures
1. **Amendment Request**: Formal change request documentation
2. **Approval Workflow**: Multi-level approval for material changes
3. **System Update**: Configuration changes in billing system
4. **Notification**: All stakeholders informed of modifications

## Related Documentation

- [Contract Management System Overview](../systems/contracts/contract-management-overview.md)
- [Revenue Calculation Technical Specification](../../technical/billing/revenue-calculation-spec.md)
- [Billing Process User Guide](../../user-processes/billing-admin/billing-process-guide.md)
- [Customer Site Configuration](../../configuration/customer-sites/site-configuration-guide.md)
- [Deposited Revenue Processing](../billing/deposited-revenue-rules.md)

## Code Validation Report

**Last Validated**: 2025-07-24
**Validation Scope**: Business Rules and Configuration Schema
**Code Copy Date**: Current system implementation

### Validation Summary
- ✅ **Verified Elements**: JSON schema structure matches documented business rules
- ❓ **Requires Validation**: Revenue calculation formulas against Power Platform implementation
- 🔍 **Requires Review**: Threshold violation handling procedures

### Detailed Validation Results

#### Revenue Share Calculation Rules
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/`
**Documented Element**: "21% revenue share with monthly accumulation"
**Validation Status**: 🔍 **REQUIRES REVIEW** - Need to validate against Power Platform formula implementation
**Findings**: JSON structure documented but formula implementation requires code validation
**Recommendations**: Validate against Power Platform billing formulas for revenue share calculations

#### Contract Configuration Schema
**Source Code**: `Current_State_Data_Product/Contract_Details/revenue-share/`
**Documented Element**: Complete JSON schema with all configuration parameters
**Validation Status**: ✅ **VERIFIED** - JSON structure matches documented schema
**Findings**: All documented fields present in source data structure
**Recommendations**: None required - documentation accurately reflects data structure

### Code File References
- `Current_State_Data_Product/Contract_Details/revenue-share/0170_8C749BA1_19EE_EF11_BE20_7C1E5259F653.json`
- `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/` (requires validation)

### Validation Limitations
- Power Platform formula validation pending access to current implementation
- Revenue calculation engine validation requires live system testing
- Threshold violation procedures require workflow documentation review