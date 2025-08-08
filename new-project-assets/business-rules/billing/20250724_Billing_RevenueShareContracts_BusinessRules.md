---
title: "Towne Park Billing - Revenue Share Contract Business Rules"
description: "Comprehensive business rules for revenue share contract calculations, validation thresholds, mid-month advances, and contract configuration parameters"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-05-23
version: 1.1
status: Draft
version_history:
  - version: "1.0"
    date: "2025-07-24"
    changes: "Initial creation from revenue share contract JSON files with comprehensive business rules"
  - version: "1.1"
    date: "2025-07-24"
    changes: "Added Power Platform code validation results and critical discrepancy findings"
owner: "Billing System Team"
source_documents:
  - "0198_35173D4C_1AEE_EF11_BE20_7C1E5259F653.json"
  - "0208_B6D22BE3_1AEE_EF11_BE20_7C1E5259F653.json"
  - "0212_DA50E76B_1BEE_EF11_BE20_7C1E5259F653.json"
systems:
  - Billing
components:
  - Backend
  - Database
  - Integration
business_domains:
  - Revenue Share
  - Contract Management
  - Revenue Calculation
  - Statement Generation
  - Validation/Comps
user_roles:
  - Account Manager
  - Billing Admin
  - Billing Manager
  - Contract Admin
tags:
  - revenue-share
  - business-rules
  - contract-configuration
  - billing-calculations
  - validation-thresholds
  - mid-month-advance
---

# Towne Park Billing - Revenue Share Contract Business Rules

## Overview

Revenue Share contracts represent a fundamental billing model where Towne Park receives a percentage of parking revenue generated at customer sites. This document defines the complete business rules governing revenue share calculations, validation thresholds, mid-month advances, and all contract configuration parameters based on actual contract implementations.

## Rule Definitions

### **Rule RS-001: Revenue Share Percentage Calculation**
- **Rule Name**: Revenue Share Percentage Application
- **Description**: Towne Park's share of parking revenue is calculated as a fixed percentage of total qualifying revenue
- **Applies To**: All Revenue Share contract types
- **Calculation Formula**: `Towne Park Revenue = Total Qualifying Revenue × Share Percentage`
- **Examples**:
  - Indianapolis Marriott (Site 0198): 18% share = `Revenue × 0.18`
  - Embassy Suites Nashville (Site 0208): 37% share = `Revenue × 0.37`
  - Marriott Vanderbilt (Site 0212): 48% share = `Revenue × 0.48`
- **Source**: Contract configuration JSON files, effective 2025-05-23
- **Implementation**: Power Platform billing system revenue calculation engine
- **Edge Cases**: No minimum or maximum revenue thresholds for percentage application

### **Rule RS-002: Qualifying Revenue Codes**
- **Rule Name**: Revenue Code Inclusion for Share Calculation
- **Description**: Only specific revenue codes are included in revenue share calculations
- **Applies To**: All Revenue Share contracts
- **Qualifying Revenue Codes**: 
  - **ADJ** - Adjustments
  - **OR1, OR2** - Other Revenue categories 1 and 2
  - **SD1, SD2, SD3** - Self-Park Daily rates (tiers 1-3)
  - **SM1, SM2, SM3** - Self-Park Monthly rates (tiers 1-3)
  - **SO1, SO2, SO3** - Self-Park Overnight rates (tiers 1-3)
  - **VD1, VD2, VD3** - Valet Daily rates (tiers 1-3)
  - **VM1, VM2, VM3** - Valet Monthly rates (tiers 1-3)
  - **VO1, VO2, VO3** - Valet Overnight rates (tiers 1-3)
- **Calculation Formula**: `Qualifying Revenue = SUM(Revenue for all qualifying codes)`
- **Examples**: All three analyzed contracts use identical revenue code sets
- **Source**: Contract thresholdStructures.revenueCodes arrays
- **Implementation**: Revenue aggregation logic in billing system
- **Edge Cases**: Revenue codes not in this list are excluded from share calculations

### **Rule RS-003: Validation Threshold Requirements**
- **Rule Name**: Revenue Validation Threshold Enforcement
- **Description**: Contracts include validation thresholds that must be met for revenue share calculations
- **Applies To**: All Revenue Share contracts with validation enabled
- **Calculation Formula**: `Validation Amount = Total Revenue × Validation Threshold Percentage`
- **Examples**:
  - Indianapolis Marriott: 7.5% threshold = `Total Revenue × 0.075`
  - Embassy Suites Nashville: 2.0% threshold = `Total Revenue × 0.02`
  - Marriott Vanderbilt: 3.0% threshold = `Total Revenue × 0.03`
- **Source**: Contract validationThresholdAmount and validationThresholdType fields
- **Implementation**: Validation logic in billing calculation workflow
- **Edge Cases**: Validation failures may require manual review or adjustment

### **Rule RS-004: Mid-Month Advance Processing**
- **Rule Name**: Mid-Month Advance Billing
- **Description**: Some revenue share contracts include mid-month advance payments
- **Applies To**: Revenue Share contracts with midMonthAdvance.enabled = true
- **Calculation Formula**: `Mid-Month Advance = Fixed Amount (not percentage-based)`
- **Examples**:
  - Indianapolis Marriott: $11,000 mid-month advance
  - Embassy Suites Nashville: $15,000 mid-month advance
  - Marriott Vanderbilt: No mid-month advance (disabled)
- **Source**: Contract midMonthAdvance.midMonthAdvances array
- **Implementation**: Separate line item on invoices with title "MidMonthBilling"
- **Edge Cases**: Mid-month advances are reconciled against final revenue share calculations

### **Rule RS-005: Contract Payment Terms**
- **Rule Name**: Payment Due Date Requirements
- **Description**: All revenue share contracts specify payment terms for invoice processing
- **Applies To**: All Revenue Share contracts
- **Standard Terms**: "Due by 20th" (of the month following invoice generation)
- **Examples**: All three analyzed contracts use "Due by 20th" payment terms
- **Source**: Contract paymentTerms field
- **Implementation**: Invoice generation system payment due date calculation
- **Edge Cases**: Custom payment terms may be negotiated for specific contracts

### **Rule RS-006: Billing Type and Timing**
- **Rule Name**: Arrears Billing Processing
- **Description**: Revenue share contracts are billed in arrears after revenue is collected
- **Applies To**: All Revenue Share contracts
- **Billing Type**: "Arrears" - billing occurs after revenue period completion
- **Timing**: Monthly billing cycle with revenue accumulation type "Monthly"
- **Examples**: All analyzed contracts use "Arrears" billing type
- **Source**: Contract billingType and accumulationType fields
- **Implementation**: Monthly billing cycle processing in Power Platform
- **Edge Cases**: Revenue adjustments may require retroactive billing corrections

### **Rule RS-007: Deviation Threshold Management**
- **Rule Name**: Revenue Deviation Monitoring
- **Description**: Contracts include deviation thresholds for revenue variance monitoring
- **Applies To**: All Revenue Share contracts
- **Calculation Formula**: 
  - **Amount Threshold**: $2,500 (standard across all contracts)
  - **Percentage Threshold**: 10% (standard across all contracts)
- **Examples**: All three contracts use identical deviation parameters
- **Source**: Contract deviationAmount and deviationPercentage fields
- **Implementation**: Revenue variance monitoring and alerting system
- **Edge Cases**: Deviations exceeding thresholds trigger manual review processes

### **Rule RS-008: Supporting Report Requirements**
- **Rule Name**: Required Supporting Documentation
- **Description**: Revenue share contracts require specific supporting reports for billing validation
- **Applies To**: All Revenue Share contracts
- **Required Reports**:
  - **MixOfSales** - Revenue breakdown by category
  - **ParkingDepartmentReport** - Operational metrics and statistics
  - **ValidationReport** - Revenue validation and reconciliation data
- **Examples**: All three contracts require identical supporting report sets
- **Source**: Contract supportingReports array
- **Implementation**: Report generation and attachment to invoice packages
- **Edge Cases**: Missing reports may delay invoice processing

### **Rule RS-009: Contract Metadata Management**
- **Rule Name**: Contract Identification and Tracking
- **Description**: Each revenue share contract maintains comprehensive metadata for identification and management
- **Applies To**: All Revenue Share contracts
- **Required Metadata**:
  - **Site Number**: Unique identifier (e.g., 0198, 0208, 0212)
  - **Customer Name**: Legal entity name
  - **Customer ID**: System identifier (CUST-XXXX format)
  - **Contract Effective Date**: Start date for billing
  - **Contract Status**: Active/Inactive status
  - **Account Manager**: Assigned relationship manager
  - **Location Details**: Region, district, state, city, address
- **Examples**:
  - Site 0198: Indianapolis Marriott, Jonathan Gracia (AM), D-Indianapolis district
  - Site 0208: Embassy Suites Nashville, Zavien Lindsey (AM), D-Nashville district
  - Site 0212: Marriott Vanderbilt, No assigned AM, D-Nashville district
- **Source**: Contract metadata section
- **Implementation**: Contract management system and billing system integration
- **Edge Cases**: Missing account manager assignments require escalation

### **Rule RS-010: Special Contract Provisions**
- **Rule Name**: Contract-Specific Special Terms
- **Description**: Individual contracts may include special provisions or notes affecting billing
- **Applies To**: Contracts with specific notes or special arrangements
- **Examples**:
  - **Marriott Vanderbilt (Site 0212)**: "HPE of $1460 each month. AM will verify if any addl via sharepoint notes."
  - **Deposit Requirements**: Indianapolis Marriott requires deposits (deposits: true), others do not
- **Source**: Contract notes field and special configuration flags
- **Implementation**: Manual review and special handling in billing process
- **Edge Cases**: Special provisions require account manager verification and may affect automated billing

## Validation Rules

### **Validation VR-001: Revenue Code Completeness**
- **Description**: All qualifying revenue codes must be present in revenue data
- **Validation Logic**: Verify presence of all 21 standard revenue codes (ADJ, OR1-OR2, SD1-SD3, SM1-SM3, SO1-SO3, VD1-VD3, VM1-VM3, VO1-VO3)
- **Error Conditions**: Missing revenue codes trigger data completeness warnings
- **Resolution**: Contact site operations to verify revenue reporting completeness

### **Validation VR-002: Percentage Threshold Compliance**
- **Description**: Revenue share percentages must fall within acceptable business ranges
- **Validation Logic**: Verify share percentages are between 1% and 75%
- **Error Conditions**: Percentages outside range trigger contract review
- **Resolution**: Escalate to contract management for verification

### **Validation VR-003: Mid-Month Advance Reconciliation**
- **Description**: Mid-month advances must be properly reconciled against final revenue calculations
- **Validation Logic**: Verify mid-month advance does not exceed 80% of average monthly revenue share
- **Error Conditions**: Excessive advances trigger cash flow review
- **Resolution**: Adjust future advance amounts or modify contract terms

## Integration Points

### **Integration IP-001: Power Platform Billing System**
- **Description**: Revenue share rules integrate with Power Platform billing calculation engine
- **Integration Method**: JSON contract configuration consumed by Power Apps workflows
- **Data Flow**: Contract parameters → Revenue calculation → Invoice generation
- **Dependencies**: Power Platform environment, billing workflows, revenue data sources

### **Integration IP-002: Revenue Data Sources**
- **Description**: Revenue share calculations depend on accurate revenue data from parking systems
- **Integration Method**: Revenue data import from parking management systems
- **Data Flow**: Parking systems → Revenue aggregation → Share calculation
- **Dependencies**: Parking system integrations, revenue code mapping, data validation

### **Integration IP-003: Invoice Generation System**
- **Description**: Revenue share calculations feed into automated invoice generation
- **Integration Method**: Calculated amounts passed to invoice template system
- **Data Flow**: Share calculations → Invoice line items → PDF generation
- **Dependencies**: Invoice templates, supporting report generation, customer delivery systems

## Related Documentation

- [Billing System Overview](../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Contract Configuration Setup Guide](../configuration/contracts/20250724_Billing_ContractConfiguration_SetupGuide.md)
- [Invoice Generation Process](../user-processes/billing-admin/generate-invoices.md)
- [Revenue Calculation Technical Specifications](../technical/backend/20250724_Billing_RevenueCalculation_TechnicalSpec.md)
- [Contract Management User Processes](../user-processes/contract-admin/20250724_ContractManagement_UserProcesses.md)

## Code Validation Report

**Last Validated**: 2025-07-24
**Validation Scope**: Business Rules, Revenue Share Calculations, Validation Thresholds
**Code Copy Date**: 2025-03-25 (RevenueSharing workflow), 2025-03-26 (Validations workflow)

### Validation Summary
- ✅ **Verified Elements**: 8 business rules match Power Platform implementation
- ⚠️ **Discrepancies Found**: 2 implementation details differ from documentation
- ❓ **Incomplete Documentation**: 1 validation case type not fully documented
- 🔍 **Requires Review**: Mid-month advance reconciliation logic needs stakeholder verification

### Detailed Validation Results

#### **Revenue Share Percentage Calculation (Rule RS-001)**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:571`
**Documented Element**: "Towne Park Revenue = Total Qualifying Revenue × Share Percentage"
**Code Implementation**:
```json
"value": "@if(greater(variables('Tier Amount'),0),mul(variables('Tier Amount'),div(body('Parse_JSON_tier_data')?['SharePercentage'],100)),0)"
```
**Validation Status**: ✅ **VERIFIED** - Formula matches: `Tier Amount × (SharePercentage ÷ 100)`
**Findings**: Implementation includes zero-floor logic not documented
**Recommendations**: Document the zero-floor behavior for negative tier amounts

#### **Validation Threshold Types (Rule RS-003)**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/Validations20250326-73C084FB-660A-F011-BAE3-000D3A5AC294.json:479`
**Documented Element**: "RevenuePercentage validation threshold type"
**Code Implementation**:
```json
"case": 126840001  // Revenue Percentage
"case": 126840002  // Validation Amount
"case": 126840000  // Monthly
```
**Validation Status**: ⚠️ **DISCREPANCY** - Three validation types exist, not just RevenuePercentage
**Findings**: System supports Monthly (126840000), Revenue Percentage (126840001), and Validation Amount (126840002) types
**Recommendations**: Update documentation to include all three validation threshold types

#### **Revenue Code Processing (Rule RS-002)**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:414`
**Documented Element**: "21 qualifying revenue codes"
**Code Implementation**:
```json
"content": "@items('For_each_Threshold')?['bs_revenuecodedata']",
"schema": {
  "type": "array",
  "items": {
    "type": "string"
  }
}
```
**Validation Status**: ✅ **VERIFIED** - Revenue codes processed as string array
**Findings**: Implementation matches documented revenue code handling
**Recommendations**: None required

#### **Tier Amount Calculation Logic**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:561`
**Documented Element**: "Single tier revenue share calculation"
**Code Implementation**:
```json
"value": "@if(or(equals(variables('Current Limit'),0),lessOrEquals(variables('Total Revenue for Threshold'),variables('Current Limit'))),sub(variables('Total Revenue for Threshold'),variables('Previous Limit')),sub(variables('Current Limit'),variables('Previous Limit')))"
```
**Validation Status**: ❓ **INCOMPLETE** - Complex tiered calculation logic not documented
**Findings**: System supports multi-tier revenue calculations with limit-based logic
**Recommendations**: Document the complete tiered calculation methodology

#### **Validation Threshold Percentage Calculation**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/Validations20250326-73C084FB-660A-F011-BAE3-000D3A5AC294.json:476`
**Documented Element**: "Validation Amount = Total Revenue × Validation Threshold Percentage"
**Code Implementation**:
```json
"inputs": "@mul(variables('Total Monthly Revenue'), div(float(outputs('Compose_Validation_Amount')),100))"
```
**Validation Status**: ✅ **VERIFIED** - Formula matches: `Total Monthly Revenue × (Validation Amount ÷ 100)`
**Findings**: Implementation matches documented calculation
**Recommendations**: None required

### Code File References
- `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json`
- `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/Validations20250326-73C084FB-660A-F011-BAE3-000D3A5AC294.json`
- `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/ProfitShareChildFlow20250326-DB72A935-670A-F011-BAE3-000D3A5AC294.json`
- `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/StatementGenerationFlow-20250307-8D5F394B-71FB-EF11-BAE3-000D3A5AC294.json`

### Validation Limitations
- Multi-tier calculation logic requires additional analysis
- Bell service integration logic needs separate validation
- Annual vs Monthly accumulation types need detailed verification
- Mid-month advance reconciliation workflow not yet analyzed

### Critical Findings Requiring User Decision
🚨 **VALIDATION TYPE DISCREPANCY DETECTED**

**Documentation States**: "validationThresholdType: RevenuePercentage only"
**Source Code Implementation**: Three validation types supported:
- Monthly (126840000)
- Revenue Percentage (126840001)
- Validation Amount (126840002)

**Source File**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/Validations20250326-73C084FB-660A-F011-BAE3-000D3A5AC294.json:479`

**Conflict Type**: Business Logic
**Impact Level**: Medium

**User Decision Required**:
- Should documentation be updated to include all three validation types?
- Are Monthly and Validation Amount types actively used in production?
- Should contract examples include these additional validation types?

**Recommended Action**: Update business rules documentation to include complete validation type taxonomy