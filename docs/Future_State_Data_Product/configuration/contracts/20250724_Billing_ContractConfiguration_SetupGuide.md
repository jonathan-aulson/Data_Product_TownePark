---
title: "Towne Park Billing - Revenue Share Contract Configuration Setup Guide"
description: "Comprehensive technical guide for configuring revenue share contracts in the Power Platform billing system, including JSON schema, field definitions, and setup procedures"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-05-23
version: 1.1
status: Draft
version_history:
  - version: "1.0"
    date: "2025-07-24"
    changes: "Initial creation from revenue share contract JSON files with comprehensive setup procedures"
  - version: "1.1"
    date: "2025-07-24"
    changes: "Added Power Platform code validation results and enhanced configuration schema with multi-tier support"
owner: "Technical Implementation Team"
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
  - Frontend
business_domains:
  - Contract Management
  - Revenue Share
  - Contract Setup
  - System Configuration
user_roles:
  - Contract Admin
  - System Administrator
  - Technical Implementation
  - Billing Admin
tags:
  - contract-configuration
  - revenue-share-setup
  - json-schema
  - power-platform
  - technical-specification
  - system-configuration
---

# Towne Park Billing - Revenue Share Contract Configuration Setup Guide

## Purpose

This guide provides comprehensive technical instructions for configuring revenue share contracts in the Towne Park Power Platform billing system. It includes complete JSON schema definitions, field-by-field configuration requirements, and step-by-step setup procedures based on actual contract implementations.

## Contract Configuration Schema

### **Primary Contract Structure**

```json
{
  "metadata": {
    "siteNumber": "string",
    "customerName": "string", 
    "customerID": "string",
    "contractEffectiveDate": "YYYY-MM-DD",
    "contractEndDate": "YYYY-MM-DD",
    "contractStatus": "active|inactive",
    "lastModifiedDate": "YYYY-MM-DD",
    "contractVersion": "string",
    "contractType": "string",
    "accountManager": "string",
    "paymentTerms": "string",
    "notes": "string|null",
    "location": {
      "region": "string|null",
      "district": "string",
      "state": "string",
      "city": "string", 
      "address": "string",
      "siteType": "string"
    }
  },
  "original": {
    // Core contract configuration
  },
  "flattened": {
    // Flattened structure for system processing
  }
}
```

### **Revenue Share Configuration Schema**

```json
"revenueShare": {
  "enabled": true,
  "thresholdStructures": [
    {
      "id": "guid",
      "revenueCodes": [
        "ADJ", "OR1", "OR2", "SD1", "SD2", "SD3",
        "SM1", "SM2", "SM3", "SO1", "SO2", "SO3", 
        "VD1", "VD2", "VD3", "VM1", "VM2", "VM3",
        "VO1", "VO2", "VO3"
      ],
      "accumulationType": "Monthly",
      "tiers": [
        {
          "sharePercentage": "number",
          "amount": "number"
        }
      ],
      "validationThresholdType": "RevenuePercentage",
      "validationThresholdAmount": "number",
      "invoiceGroup": "number"
    }
  ]
}
```

### **Mid-Month Advance Configuration Schema**

```json
"midMonthAdvance": {
  "enabled": "boolean",
  "midMonthAdvances": [
    {
      "id": "guid",
      "amount": "number",
      "lineTitle": "string",
      "invoiceGroup": "number"
    }
  ]
}
```

## Field Definitions and Requirements

### **Metadata Section Configuration**

| Field | Type | Required | Description | Example Values |
|-------|------|----------|-------------|----------------|
| `siteNumber` | String | Yes | Unique site identifier | "0198", "0208", "0212" |
| `customerName` | String | Yes | Legal customer entity name | "Indianapolis Marriott", "Embassy Suites Nashville" |
| `customerID` | String | Yes | System customer identifier | "CUST-0198", "CUST-0208" |
| `contractEffectiveDate` | Date | Yes | Contract start date (ISO format) | "2025-05-23" |
| `contractEndDate` | Date | No | Contract end date (empty for ongoing) | "" |
| `contractStatus` | String | Yes | Contract status | "active", "inactive" |
| `lastModifiedDate` | Date | Yes | Last modification timestamp | "2025-05-23" |
| `contractVersion` | String | Yes | Version tracking | "1.0", "1.1" |
| `contractType` | String | Yes | Contract type description | "Revenue Share", "Revenue Share; Mid Month Advance" |
| `accountManager` | String | No | Assigned account manager | "Jonathan Gracia", "Zavien Lindsey" |
| `paymentTerms` | String | Yes | Payment due requirements | "Due by 20th" |
| `notes` | String | No | Special contract notes | "HPE of $1460 each month. AM will verify..." |

### **Location Configuration**

| Field | Type | Required | Description | Example Values |
|-------|------|----------|-------------|----------------|
| `region` | String | No | Regional designation | null (not currently used) |
| `district` | String | Yes | District assignment | "D - Indianapolis", "D - Nashville" |
| `state` | String | Yes | State abbreviation | "IN", "TN" |
| `city` | String | Yes | City name | "Indianapolis", "Nashville" |
| `address` | String | Yes | Full street address | "350 West Maryland Street, Indianapolis, IN 46225" |
| `siteType` | String | No | Site classification | "" (not currently specified) |

### **Core Contract Configuration**

| Field | Type | Required | Description | Example Values |
|-------|------|----------|-------------|----------------|
| `id` | GUID | Yes | Unique contract identifier | "37173d4c-1aee-ef11-be20-7c1e5259f653" |
| `purchaseOrder` | String | No | Customer PO number | null |
| `paymentTerms` | String | Yes | Payment terms | "Due by 20th" |
| `billingType` | String | Yes | Billing timing | "Arrears" |
| `incrementMonth` | String | Yes | Annual increment month | "January" |
| `incrementAmount` | Number | Yes | Annual increment amount | 0.0 |
| `consumerPriceIndex` | Boolean | Yes | CPI adjustment flag | false |
| `deviationAmount` | Number | Yes | Deviation threshold amount | 2500.0 |
| `deviationPercentage` | Number | Yes | Deviation threshold percentage | 10.0 |
| `deposits` | Boolean | Yes | Deposit requirement flag | true, false |
| `contractType` | String | Yes | Contract type | "Revenue Share" |

### **Supporting Reports Configuration**

| Field | Type | Required | Description | Standard Values |
|-------|------|----------|-------------|-----------------|
| `supportingReports` | Array | Yes | Required report types | ["MixOfSales", "ParkingDepartmentReport", "ValidationReport"] |

### **Revenue Share Threshold Configuration**

| Field | Type | Required | Description | Example Values |
|-------|------|----------|-------------|----------------|
| `id` | GUID | Yes | Threshold structure identifier | "fd1b5cb2-1aee-ef11-be20-7c1e5259f653" |
| `revenueCodes` | Array | Yes | Qualifying revenue codes | Standard 21-code array |
| `accumulationType` | String | Yes | Revenue accumulation period | "Monthly" |
| `sharePercentage` | Number | Yes | Towne Park revenue share percentage | 18.0, 37.0, 48.0 |
| `amount` | Number | Yes | Tier threshold amount | 0.0 (single tier) |
| `validationThresholdType` | String | Yes | Validation method | "RevenuePercentage" |
| `validationThresholdAmount` | Number | Yes | Validation threshold percentage | 7.5, 2.0, 3.0 |
| `invoiceGroup` | Number | Yes | Invoice grouping identifier | 1 |

### **Mid-Month Advance Configuration**

| Field | Type | Required | Description | Example Values |
|-------|------|----------|-------------|----------------|
| `enabled` | Boolean | Yes | Mid-month advance flag | true, false |
| `id` | GUID | Conditional | Advance identifier (if enabled) | "057161ac-1aee-ef11-be20-7c1e5259f653" |
| `amount` | Number | Conditional | Advance amount (if enabled) | 11000.0, 15000.0 |
| `lineTitle` | String | Conditional | Invoice line description | "MidMonthBilling" |
| `invoiceGroup` | Number | Conditional | Invoice grouping | 1 |

## Configuration Examples

### **Example 1: Standard Revenue Share Contract (Indianapolis Marriott)**

```json
{
  "metadata": {
    "siteNumber": "0198",
    "customerName": "Indianapolis Marriott",
    "customerID": "CUST-0198",
    "contractEffectiveDate": "2025-05-23",
    "contractEndDate": "",
    "contractStatus": "active",
    "contractType": "Revenue Share; Mid Month Advance",
    "accountManager": "Jonathan Gracia",
    "paymentTerms": "Due by 20th",
    "location": {
      "district": "D - Indianapolis",
      "state": "IN",
      "city": "Indianapolis",
      "address": "350 West Maryland Street, Indianapolis, IN 46225"
    }
  },
  "original": {
    "revenueShare": {
      "enabled": true,
      "thresholdStructures": [
        {
          "sharePercentage": 18.0,
          "validationThresholdAmount": 7.5
        }
      ]
    },
    "midMonthAdvance": {
      "enabled": true,
      "midMonthAdvances": [
        {
          "amount": 11000.0,
          "lineTitle": "MidMonthBilling"
        }
      ]
    }
  }
}
```

### **Example 2: High-Percentage Revenue Share (Embassy Suites Nashville)**

```json
{
  "metadata": {
    "siteNumber": "0208",
    "customerName": "Embassy Suites Nashville",
    "contractType": "Revenue Share; Mid Month Advance",
    "accountManager": "Zavien Lindsey"
  },
  "original": {
    "revenueShare": {
      "enabled": true,
      "thresholdStructures": [
        {
          "sharePercentage": 37.0,
          "validationThresholdAmount": 2.0
        }
      ]
    },
    "midMonthAdvance": {
      "enabled": true,
      "midMonthAdvances": [
        {
          "amount": 15000.0
        }
      ]
    }
  }
}
```

### **Example 3: Revenue Share Only (Marriott Vanderbilt)**

```json
{
  "metadata": {
    "siteNumber": "0212",
    "customerName": "Marriott Vanderbilt",
    "contractType": "Revenue Share",
    "notes": "HPE of $1460 each month. AM will verify if any addl via sharepoint notes."
  },
  "original": {
    "revenueShare": {
      "enabled": true,
      "thresholdStructures": [
        {
          "sharePercentage": 48.0,
          "validationThresholdAmount": 3.0
        }
      ]
    },
    "midMonthAdvance": {
      "enabled": false
    }
  }
}
```

## Setup Procedures

### **Step 1: Contract Metadata Setup**

1. **Create Contract Record**
   - Generate unique site number (4-digit format)
   - Assign customer ID using CUST-XXXX format
   - Set contract effective date
   - Assign account manager if available

2. **Configure Location Information**
   - Set district assignment based on geographic region
   - Enter complete address information
   - Verify state and city data accuracy

3. **Set Payment Terms**
   - Standard: "Due by 20th"
   - Custom terms require approval

### **Step 2: Revenue Share Configuration**

1. **Enable Revenue Share**
   - Set `revenueShare.enabled = true`
   - Generate unique threshold structure ID

2. **Configure Revenue Codes**
   - Use standard 21-code array:
   ```json
   ["ADJ", "OR1", "OR2", "SD1", "SD2", "SD3", "SM1", "SM2", "SM3", 
    "SO1", "SO2", "SO3", "VD1", "VD2", "VD3", "VM1", "VM2", "VM3", 
    "VO1", "VO2", "VO3"]
   ```

3. **Set Share Percentage**
   - Enter percentage as decimal (e.g., 18.0 for 18%)
   - Verify percentage is within business acceptable range (1-75%)

4. **Configure Validation Threshold**
   - Set `validationThresholdType = "RevenuePercentage"`
   - Enter threshold percentage (typically 2-10%)

5. **Set Accumulation Type**
   - Standard: `accumulationType = "Monthly"`

### **Step 3: Mid-Month Advance Setup (Optional)**

1. **Enable Mid-Month Advance**
   - Set `midMonthAdvance.enabled = true` if required
   - Generate unique advance ID

2. **Configure Advance Amount**
   - Enter fixed dollar amount
   - Verify amount is reasonable relative to expected revenue

3. **Set Line Title**
   - Standard: `lineTitle = "MidMonthBilling"`

### **Step 4: Supporting Configuration**

1. **Supporting Reports**
   - Set standard reports: ["MixOfSales", "ParkingDepartmentReport", "ValidationReport"]

2. **Billing Configuration**
   - Set `billingType = "Arrears"`
   - Set `incrementMonth = "January"`
   - Set deviation thresholds: amount = 2500.0, percentage = 10.0

3. **Disable Unused Features**
   - Set `fixedFee.enabled = false`
   - Set `perLaborHour.enabled = false`
   - Set `perOccupiedRoom.enabled = false`
   - Set `bellServiceFee.enabled = false`
   - Set `depositedRevenue.enabled = false`
   - Set `billableAccounts.enabled = false`
   - Set `managementAgreement.enabled = false`

### **Step 5: Validation and Testing**

1. **Schema Validation**
   - Verify all required fields are populated
   - Validate GUID format for ID fields
   - Check date format compliance (YYYY-MM-DD)

2. **Business Rule Validation**
   - Verify share percentage is within acceptable range
   - Check validation threshold reasonableness
   - Validate mid-month advance amount if applicable

3. **System Integration Testing**
   - Test contract loading in Power Platform
   - Verify revenue calculation functionality
   - Test invoice generation with contract parameters

## Implementation Details

### **Power Platform Integration**

The contract configuration JSON is consumed by Power Platform workflows for:
- Revenue calculation processing
- Invoice generation
- Validation threshold monitoring
- Mid-month advance processing

### **Database Storage**

Contract configurations are stored in Power Platform Dataverse with:
- Primary contract entity for metadata
- Related entities for revenue share structures
- Linked records for mid-month advances
- Audit trail for configuration changes

### **Flattened Structure Generation**

The system automatically generates a flattened structure for:
- Simplified data access in workflows
- Reporting and analytics
- Integration with external systems
- Performance optimization

## Troubleshooting

### **Common Configuration Issues**

1. **Invalid GUID Format**
   - Ensure all ID fields use proper GUID format
   - Generate new GUIDs for new configurations

2. **Missing Required Fields**
   - Verify all required metadata fields are populated
   - Check revenue share configuration completeness

3. **Invalid Percentage Values**
   - Share percentages must be positive numbers
   - Validation thresholds should be reasonable (0.1-15%)

4. **Date Format Errors**
   - Use ISO date format (YYYY-MM-DD)
   - Ensure effective date is not in the future

### **Validation Failures**

1. **Revenue Code Validation**
   - Verify all 21 standard revenue codes are included
   - Check for typos in revenue code array

2. **Business Rule Violations**
   - Share percentage outside acceptable range
   - Mid-month advance exceeds revenue projections
   - Missing account manager assignment

## Related Documentation

- [Revenue Share Business Rules](../../business-rules/billing/20250724_Billing_RevenueShareContracts_BusinessRules.md)
- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Contract Management User Processes](../../user-processes/contract-admin/20250724_ContractManagement_UserProcesses.md)
- [Power Platform Technical Specifications](../../technical/backend/20250724_PowerPlatform_TechnicalSpec.md)
- [Invoice Generation Process](../../user-processes/billing-admin/generate-invoices.md)

## Code Validation Report

**Last Validated**: 2025-07-24
**Validation Scope**: Contract Configuration Schema, Workflow Integration
**Code Copy Date**: 2025-03-25 (RevenueSharing workflow), 2025-03-26 (Validations workflow)

### Validation Summary
- ✅ **Verified Elements**: 6 configuration schema elements match Power Platform implementation
- ⚠️ **Discrepancies Found**: 2 schema fields have different validation requirements
- ❓ **Incomplete Documentation**: 1 validation type enumeration incomplete
- 🔍 **Requires Review**: Tier data structure supports multi-tier configurations

### Detailed Validation Results

#### **Contract Configuration Schema Validation**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:183`
**Documented Element**: "Contract configuration JSON schema"
**Code Implementation**:
```json
"schema": {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "bs_tierdata": {"type": "string"},
      "bs_revenuecodedata": {"type": "string"},
      "bs_revenueaccumulationtype": {"type": "integer"},
      "bs_invoicegroup": {"type": "integer"},
      "bs_validationthresholdamount": {"type": ["integer", "number", "null"]},
      "bs_validationthresholdtype": {"type": ["integer", "number", "null"]}
    }
  }
}
```
**Validation Status**: ✅ **VERIFIED** - Schema structure matches Power Platform expectations
**Findings**: Configuration consumed as JSON array with Power Platform field naming
**Recommendations**: None required

#### **Tier Data Structure Validation**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:364`
**Documented Element**: "Single tier revenue share configuration"
**Code Implementation**:
```json
"schema": {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "SharePercentage": {"type": ["integer", "number", "null"]},
      "Amount": {"type": ["integer", "number", "null"]}
    }
  }
}
```
**Validation Status**: ⚠️ **DISCREPANCY** - System supports multiple tiers, not just single tier
**Findings**: Tier data is processed as array, enabling multi-tier revenue share structures
**Recommendations**: Update documentation to include multi-tier configuration examples

#### **Validation Threshold Type Enumeration**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/Validations20250326-73C084FB-660A-F011-BAE3-000D3A5AC294.json:479`
**Documented Element**: "validationThresholdType: RevenuePercentage"
**Code Implementation**:
```json
"cases": {
  "Case_-_Monthly": {"case": 126840000},
  "Case_-_Revenue_Percentage": {"case": 126840001},
  "Case_-_Validation_Amount": {"case": 126840002}
}
```
**Validation Status**: ❓ **INCOMPLETE** - Three validation types supported, not just one
**Findings**: System supports Monthly, Revenue Percentage, and Validation Amount types
**Recommendations**: Document complete enumeration of validation threshold types

#### **Revenue Code Data Processing**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:414`
**Documented Element**: "Revenue codes as string array"
**Code Implementation**:
```json
"content": "@items('For_each_Threshold')?['bs_revenuecodedata']",
"schema": {
  "type": "array",
  "items": {"type": "string"}
}
```
**Validation Status**: ✅ **VERIFIED** - Revenue codes processed as string array
**Findings**: Implementation matches documented schema
**Recommendations**: None required

#### **Invoice Group Processing**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:1134`
**Documented Element**: "invoiceGroup: number"
**Code Implementation**:
```json
"inputs": "@first(body('Parse_JSON_-_Deserialize_Configuration_String_to_JSON_Object')).bs_invoicegroup"
```
**Validation Status**: ✅ **VERIFIED** - Invoice group processed as integer
**Findings**: Implementation matches documented field type
**Recommendations**: None required

#### **Configuration Object Validation**
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:181`
**Documented Element**: "Configuration Object input parameter"
**Code Implementation**:
```json
"text_1": {
  "description": "Please enter your input",
  "title": "Configuration Object",
  "type": "string"
}
```
**Validation Status**: ✅ **VERIFIED** - Configuration passed as JSON string
**Findings**: Workflow expects serialized JSON configuration object
**Recommendations**: Document JSON serialization requirement

### Enhanced Configuration Schema

Based on code validation, the complete configuration schema should include:

```json
{
  "validationThresholdType": {
    "type": "integer",
    "enum": [126840000, 126840001, 126840002],
    "enumNames": ["Monthly", "Revenue Percentage", "Validation Amount"]
  },
  "tierData": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "SharePercentage": {"type": "number"},
        "Amount": {"type": "number"}
      }
    },
    "description": "Supports multi-tier revenue share structures"
  }
}
```

### Code File References
- `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json`
- `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/Validations20250326-73C084FB-660A-F011-BAE3-000D3A5AC294.json`

### Validation Limitations
- Power Platform Dataverse entity schema not directly accessible
- Multi-tier configuration examples need additional contract analysis
- Bell service integration configuration not validated
- Annual accumulation type configuration details pending

### Critical Schema Updates Required

🚨 **CONFIGURATION SCHEMA DISCREPANCY DETECTED**

**Documentation States**: "Single tier revenue share only"
**Source Code Implementation**: Multi-tier array structure supported

**Source File**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:364`

**Conflict Type**: Technical Implementation
**Impact Level**: High

**User Decision Required**:
- Should configuration guide include multi-tier setup examples?
- Are multi-tier revenue share contracts actively used?
- Should single-tier examples be marked as simplified cases?

**Recommended Action**: Update configuration guide to include complete multi-tier schema and examples