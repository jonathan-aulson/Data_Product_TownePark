---
title: "Negative Invoice GL Entity Mapping Rules"
description: "Business rules for handling negative balance invoices with GL entity-specific routing to Great Plains modules"
author: "Towne Park Data Product Team"
date: "2025-07-17"
version: "1.0"
status: "Active"
category: "Business Rules"
subcategory: "Billing"
tags: ["billing", "great-plains", "gl-entity", "negative-invoices", "accounts-payable"]
related_systems: ["PowerBill", "Great Plains", "Billing System"]
stakeholders: ["Billing Manager", "Finance Team", "System Administrator"]
review_cycle: "Quarterly"
last_updated: "2025-07-17"
---

# Negative Invoice GL Entity Mapping Rules

## Overview

This document defines the business rules for processing negative balance invoices based on GL (General Ledger) entity codes, ensuring proper routing to the appropriate Great Plains modules with correct company and interface identifiers.

## Business Context

Towne Park operates multiple legal entities under its brand umbrella due to various acquisitions. Each entity requires specific accounting treatment in Great Plains while maintaining unified billing operations through PowerBill.

## Core Business Rules

### Rule 1: GL Entity Identification
- **GL Entity Code**: Determined by the first two digits of the GL String value
- **Supported Entities**:
  - `07`: ENC (Enclave) company customers
  - `22`: UPP (United Parking Partners) company customers

### Rule 2: Negative Invoice Processing
When a Statement status changes to "Sent" and contains invoices with negative Total Due amounts:

#### For GL Entity '07' (ENC):
- **Map ID**: `PMIMPV2` (Accounts Payable module)
- **Company Tag**: `<COMPANY>ENC</COMPANY>`
- **Interface ID**: `<tem:interID>ENC</tem:interID>`

#### For GL Entity '22' (UPP):
- **Map ID**: `PMIMPV2` (Accounts Payable module)
- **Company Tag**: `<COMPANY>UPP</COMPANY>`
- **Interface ID**: `<tem:interID>UPP</tem:interID>`

### Rule 3: Data Payload Requirements
The XML payload sent to Great Plains must include:
- Correct `mapID` for Accounts Payable processing
- Matching `COMPANY` and `interID` values based on GL entity
- All invoice line items with proper debit/credit allocations

## Implementation Requirements

### System Behavior
1. **Invoice Amount Validation**: System must detect negative Total Due amounts
2. **GL String Parsing**: Extract first two digits to determine entity code
3. **Conditional Logic**: Apply appropriate company and interface mappings
4. **XML Generation**: Create properly formatted SOAP envelope with entity-specific values

### Data Validation
- GL String format validation
- Negative amount threshold checking
- Entity code verification against supported list
- XML schema compliance

## Example Scenarios

### Scenario 1: ENC Customer Negative Invoice
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org">
  <soapenv:Header/>
  <soapenv:Body>
    <tem:RunMapDataTable>
      <tem:mapID>PMIMPV2</tem:mapID>
      <tem:interID>ENC</tem:interID>
      <tem:xml>
        <![CDATA[
        <DataSet>
          <Table>
            <BATCHID>202504POWERBILL2025-04-30</BATCHID>
            <VENDORID>TOPEXC</VENDORID>
            <COMPANY>ENC</COMPANY>
            <!-- Additional table data -->
          </Table>
        </DataSet>
        ]]>
      </tem:xml>
    </tem:RunMapDataTable>
  </soapenv:Body>
</soapenv:Envelope>
```

### Scenario 2: UPP Customer Negative Invoice
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org">
  <soapenv:Header/>
  <soapenv:Body>
    <tem:RunMapDataTable>
      <tem:mapID>PMIMPV2</tem:mapID>
      <tem:interID>UPP</tem:interID>
      <tem:xml>
        <![CDATA[
        <DataSet>
          <Table>
            <BATCHID>202504POWERBILL2025-04-30</BATCHID>
            <VENDORID>TOPEXC</VENDORID>
            <COMPANY>UPP</COMPANY>
            <!-- Additional table data -->
          </Table>
        </DataSet>
        ]]>
      </tem:xml>
    </tem:RunMapDataTable>
  </soapenv:Body>
</soapenv:Envelope>
```

## Compliance and Monitoring

### Validation Points
- Pre-processing GL entity validation
- Post-processing XML structure verification
- Great Plains integration success confirmation
- Audit trail maintenance

### Error Handling
- Invalid GL entity code detection
- Missing or malformed GL string handling
- Great Plains communication failure recovery
- Data integrity verification

## Related Documentation

- [Great Plains Integration Technical Specification](../../technical/integrations/great-plains-integration-spec.md)
- [PowerBill System Overview](../../systems/billing/powerbill-system-overview.md)
- [Billing Process Workflows](../../user-processes/billing-admin/billing-workflows.md)

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-17 | Data Product Team | Initial documentation from Sprint 25 user stories |