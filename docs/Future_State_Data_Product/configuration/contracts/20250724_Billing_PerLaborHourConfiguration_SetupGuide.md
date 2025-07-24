---
title: "Towne Park Billing - Per Labor Hour Contract Configuration Setup Guide"
description: "Technical configuration guide for setting up per labor hour contracts in the Power Platform billing system, including JSON schema, field definitions, and setup procedures"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-05-23
version: 1.0
status: Draft
version_history:
  - version: "1.0"
    date: "2025-07-24"
    changes: "Initial creation from per labor hour contract JSON analysis with comprehensive setup procedures"
source_files:
  - "0451_AD4F02E4_90D8_EF11_8EEA_0022480A57AC.json"
tags:
  - billing
  - configuration
  - per-labor-hour
  - contracts
  - setup-guide
  - json-schema
---

# Per Labor Hour Contract Configuration Setup Guide

## Overview

This guide provides comprehensive instructions for configuring per labor hour contracts in the Towne Park billing system. Per labor hour contracts bill customers based on actual hours worked, with specific rates for different job classifications.

## Configuration Schema

### Core Contract Structure

```json
{
  "metadata": {
    "siteNumber": "string",
    "customerName": "string", 
    "customerID": "string",
    "contractEffectiveDate": "YYYY-MM-DD",
    "contractEndDate": "YYYY-MM-DD",
    "contractStatus": "active|inactive|pending",
    "contractType": "Per Labor Hour",
    "accountManager": "string",
    "paymentTerms": "string",
    "location": {
      "region": "string",
      "district": "string", 
      "state": "string",
      "city": "string",
      "address": "string"
    }
  },
  "original": {
    "contractType": "Per Labor Hour",
    "billingType": "Arrears|Advance",
    "incrementMonth": "string",
    "incrementAmount": "number",
    "deviationAmount": "number",
    "deviationPercentage": "number",
    "perLaborHour": {
      "enabled": true,
      "hoursBackupReport": true,
      "jobRates": [
        {
          "id": "string",
          "name": "string",
          "displayName": "string", 
          "rate": "number",
          "overtimeRate": "number",
          "jobCode": "string",
          "startDate": "YYYY-MM-DD|null",
          "endDate": "YYYY-MM-DD|null",
          "invoiceGroup": "number"
        }
      ]
    }
  }
}
```

## Setup Procedures

### Step 1: Contract Metadata Configuration

#### Required Fields
- **siteNumber**: Unique 4-digit site identifier
- **customerName**: Full legal customer name
- **customerID**: System-generated customer identifier
- **contractEffectiveDate**: Contract start date (ISO format)
- **contractType**: Must be "Per Labor Hour"
- **accountManager**: Assigned account manager name

#### Optional Fields
- **contractEndDate**: Leave empty for ongoing contracts
- **paymentTerms**: Default "Due in 30 Days"
- **notes**: Additional contract notes

#### Location Configuration
```json
"location": {
  "region": "Central|East|West|null",
  "district": "D - [District Name]",
  "state": "Two-letter state code",
  "city": "City name",
  "address": "Full street address",
  "siteType": "Hospital|Office|Other"
}
```

### Step 2: Per Labor Hour Component Setup

#### Enable Per Labor Hour Billing
```json
"perLaborHour": {
  "enabled": true,
  "hoursBackupReport": true,
  "jobRates": []
}
```

#### Configuration Requirements
- **enabled**: Must be `true` for per labor hour contracts
- **hoursBackupReport**: Must be `true` to generate detailed hour reports
- **jobRates**: Array of job classifications with rates

### Step 3: Job Rate Configuration

#### Job Rate Structure
```json
{
  "id": "UUID-format-identifier",
  "name": "Service category name",
  "displayName": "Customer-facing display name",
  "rate": 25.08,
  "overtimeRate": 25.08,
  "jobCode": "ALPHANUMERIC_CODE",
  "startDate": null,
  "endDate": null,
  "invoiceGroup": 1
}
```

#### Field Definitions

| Field | Type | Required | Description | Validation Rules |
|-------|------|----------|-------------|------------------|
| `id` | String | Yes | Unique identifier | UUID format |
| `name` | String | Yes | Internal service name | Max 100 characters |
| `displayName` | String | Yes | Customer invoice display | Max 50 characters |
| `rate` | Number | Yes | Standard hourly rate | > 0, 2 decimal places |
| `overtimeRate` | Number | Yes | Overtime hourly rate | >= rate, 2 decimal places |
| `jobCode` | String | Yes | System job code | Alphanumeric, max 20 chars |
| `startDate` | Date/null | No | Rate effective start | ISO format or null |
| `endDate` | Date/null | No | Rate effective end | ISO format or null |
| `invoiceGroup` | Number | Yes | Invoice grouping | Positive integer |

#### Common Job Codes
- **IPT**: Inpatient Transport
- **SRACCTMGR**: Senior Account Manager
- **VALET**: Valet Services
- **SECURITY**: Security Services
- **TRANSPORT**: General Transport

### Step 4: Billing Configuration

#### Billing Type Setup
```json
"billingType": "Arrears",
"paymentTerms": "Due in 30 Days"
```

**Options:**
- **Arrears**: Bill for previous month's hours
- **Advance**: Bill estimated hours in advance

#### Annual Increment Configuration
```json
"incrementMonth": "November",
"incrementAmount": 3.0,
"consumerPriceIndex": false
```

**Parameters:**
- **incrementMonth**: Month when annual increases apply
- **incrementAmount**: Percentage increase (e.g., 3.0 = 3%)
- **consumerPriceIndex**: Whether to use CPI adjustments

#### Deviation Thresholds
```json
"deviationAmount": 2500.0,
"deviationPercentage": 10.0
```

**Purpose:**
- **deviationAmount**: Dollar threshold for approval ($2,500)
- **deviationPercentage**: Percentage threshold for approval (10%)

### Step 5: Supporting Configuration

#### Disable Unused Components
```json
"fixedFee": { "enabled": false },
"perOccupiedRoom": { "enabled": false },
"revenueShare": { "enabled": false },
"bellServiceFee": { "enabled": false },
"midMonthAdvance": { "enabled": false },
"depositedRevenue": { "enabled": false },
"billableAccounts": { "enabled": false },
"managementAgreement": { "enabled": false }
```

#### Supporting Reports
```json
"supportingReports": ["HoursBackupReport"]
```

## Validation Rules

### Contract Validation

#### Required Component Validation
```javascript
// Validation logic
if (contractType === "Per Labor Hour") {
  assert(perLaborHour.enabled === true);
  assert(perLaborHour.hoursBackupReport === true);
  assert(perLaborHour.jobRates.length > 0);
}
```

#### Job Rate Validation
```javascript
// Rate validation
jobRates.forEach(rate => {
  assert(rate.rate > 0);
  assert(rate.overtimeRate >= rate.rate);
  assert(rate.jobCode.match(/^[A-Z0-9_]+$/));
  assert(rate.invoiceGroup > 0);
});
```

### Data Integrity Checks

#### Job Code Uniqueness
```javascript
// Ensure unique job codes within contract
const jobCodes = jobRates.map(r => r.jobCode);
assert(jobCodes.length === new Set(jobCodes).size);
```

#### Date Range Validation
```javascript
// Validate date ranges
if (startDate && endDate) {
  assert(new Date(endDate) > new Date(startDate));
}
```

## Configuration Examples

### Example 1: Basic Hospital Contract
```json
{
  "metadata": {
    "siteNumber": "0451",
    "customerName": "Lee's Summit Medical Center",
    "contractType": "Per Labor Hour",
    "accountManager": "ERIC HAGER",
    "location": {
      "district": "D - Kansas City",
      "state": "MO",
      "city": "Lees Summit"
    }
  },
  "original": {
    "contractType": "Per Labor Hour",
    "billingType": "Arrears",
    "incrementMonth": "November",
    "incrementAmount": 3.0,
    "deviationAmount": 2500.0,
    "deviationPercentage": 10.0,
    "perLaborHour": {
      "enabled": true,
      "hoursBackupReport": true,
      "jobRates": [
        {
          "name": "Valet Services",
          "displayName": "Inpatient Transport",
          "rate": 25.08,
          "overtimeRate": 25.08,
          "jobCode": "IPT",
          "invoiceGroup": 1
        },
        {
          "name": "Valet Services", 
          "displayName": "Manager",
          "rate": 25.08,
          "overtimeRate": 25.08,
          "jobCode": "SRACCTMGR",
          "invoiceGroup": 1
        }
      ]
    }
  }
}
```

### Example 2: Multi-Rate Contract
```json
{
  "perLaborHour": {
    "enabled": true,
    "hoursBackupReport": true,
    "jobRates": [
      {
        "displayName": "Standard Valet",
        "rate": 22.50,
        "overtimeRate": 33.75,
        "jobCode": "VALET_STD",
        "invoiceGroup": 1
      },
      {
        "displayName": "Senior Valet",
        "rate": 26.00,
        "overtimeRate": 39.00,
        "jobCode": "VALET_SR",
        "invoiceGroup": 1
      },
      {
        "displayName": "Supervisor",
        "rate": 32.00,
        "overtimeRate": 48.00,
        "jobCode": "SUPERVISOR",
        "invoiceGroup": 2
      }
    ]
  }
}
```

## Implementation Checklist

### Pre-Setup Requirements
- [ ] Customer information verified
- [ ] Site number assigned
- [ ] Account manager designated
- [ ] Job classifications defined
- [ ] Rate structure approved

### Configuration Steps
- [ ] Metadata section completed
- [ ] Per labor hour component enabled
- [ ] Job rates configured and validated
- [ ] Billing type and terms set
- [ ] Deviation thresholds configured
- [ ] Unused components disabled
- [ ] Supporting reports enabled

### Post-Setup Validation
- [ ] JSON schema validation passed
- [ ] Job code uniqueness verified
- [ ] Rate calculations tested
- [ ] Hours backup report generation tested
- [ ] Invoice generation tested
- [ ] Deviation threshold testing completed

## Troubleshooting

### Common Configuration Issues

#### Issue: Job Rate Validation Errors
**Symptoms:** Rate validation failures during setup
**Solutions:**
- Verify overtime rate >= standard rate
- Ensure rates are positive numbers
- Check decimal precision (max 2 places)

#### Issue: Job Code Conflicts
**Symptoms:** Duplicate job code errors
**Solutions:**
- Review job code uniqueness within contract
- Check against system reserved codes
- Verify alphanumeric format compliance

#### Issue: Hours Backup Report Not Generating
**Symptoms:** Missing detailed hour reports
**Solutions:**
- Verify `hoursBackupReport: true`
- Check `perLaborHour.enabled: true`
- Validate supporting reports configuration

### Performance Considerations

#### Large Job Rate Arrays
- Contracts with >20 job rates may require optimization
- Consider invoice grouping for performance
- Monitor rate lookup performance

#### High-Volume Hour Processing
- Implement efficient hour aggregation
- Consider batch processing for large datasets
- Monitor invoice generation performance

---

*This configuration guide ensures proper setup of per labor hour contracts for accurate billing and reporting. Follow all validation steps to prevent configuration errors.*