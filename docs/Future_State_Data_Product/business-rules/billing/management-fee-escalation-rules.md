---
title: "Management Fee Escalation Rules"
description: "Business rules for automatic escalation of management fees including fixed fees, per labor hour rates, and revenue percentages"
author: "Towne Park Data Product Team"
date: "2025-07-17"
version: "1.0"
status: "Active"
category: "Business Rules"
subcategory: "Billing"
tags: ["billing", "management-fees", "escalation", "powerbill", "contracts"]
related_systems: ["PowerBill", "Billing System", "Contract Management"]
stakeholders: ["Billing Admin", "Contract Admin", "Finance Team"]
review_cycle: "Quarterly"
last_updated: "2025-07-17"
---

# Management Fee Escalation Rules

## Overview

This document defines the business rules for automatic escalation of management fees across different fee structures, ensuring consistent application of predefined annual increases without manual intervention.

## Business Context

Management fee escalation provides automatic annual adjustments to account for inflation, cost increases, and contractual terms. The system supports multiple escalation formats across different fee types to accommodate diverse contract structures.

## Core Business Rules

### Rule 1: Escalation Trigger Timing
- **Arrears Billing Type**: Escalation occurs on the last Friday of the month preceding the escalation month
- **Advance Billing Type**: Escalation occurs on the first business day of the escalation month
- **Escalation Month**: User-configurable per contract (January through December)

### Rule 2: Fee Type Support
The escalation system supports three management fee types:

#### Fixed Fee Escalation
- **Base Amount**: Fixed dollar amount per billing period
- **Escalation Formats**:
  - **Percentage**: Increases base amount by specified percentage
  - **Fixed Amount**: Adds specified dollar amount to base amount

#### Per Labor Hour Escalation
- **Base Rates**: Standard and overtime rates per job code
- **Escalation Formats**:
  - **Percentage**: Increases rates by specified percentage
  - **Fixed Amount**: Adds specified dollar amount to rates
- **Scope**: Applied independently to each job code's standard and overtime rates

#### Revenue Percentage Escalation
- **Base Percentage**: Percentage of revenue charged as management fee
- **Escalation Formats**:
  - **Percentage**: Increases percentage by specified amount (e.g., 10% of 10% = 11%)
  - **Fixed Amount**: Adds percentage points to base percentage (e.g., 10% + 2% = 12%)

### Rule 3: Calculation Methods

#### Percentage Escalation Formula
```
New Amount = Current Amount × (1 + Escalation Percentage)
```

**Examples**:
- Fixed Fee: $1,000 + 5% = $1,050
- Labor Rate: $25.00 + 3% = $25.75
- Revenue %: 10.00% + 10% = 11.00%

#### Fixed Amount Escalation Formula
```
New Amount = Current Amount + Escalation Amount
```

**Examples**:
- Fixed Fee: $1,000 + $100 = $1,100
- Labor Rate: $35.00 + $2.00 = $37.00
- Revenue %: 25% + 2% = 27%

### Rule 4: Escalation Persistence
- **Annual Application**: Escalations apply automatically each year on the specified month
- **Compounding**: Percentage escalations compound annually
- **Historical Tracking**: All escalation events logged in contract history
- **Billing Integration**: New amounts automatically used in subsequent billing cycles

## Implementation Requirements

### Configuration Interface
1. **Enable Escalator Checkbox**: Activates escalation feature
2. **Escalation Month Dropdown**: Selects trigger month (January-December)
3. **Escalator Format Selection**: Choose between Percentage or Fixed Amount
4. **Escalator Value Input**: Enter percentage or dollar amount based on format

### Validation Rules
- Escalation percentage must be between 0% and 100%
- Fixed amount escalations must be positive values
- Escalation month must be valid calendar month
- Fee type must support selected escalation format

### System Behavior
- **Automatic Processing**: No manual intervention required after configuration
- **Billing Cycle Integration**: New amounts effective immediately after escalation
- **Audit Trail**: Complete history of escalation events and amounts
- **Error Handling**: Failed escalations logged and flagged for manual review

## Detailed Scenarios

### Scenario 1: Fixed Fee Percentage Escalation
**Configuration**:
- Management Fee Type: Fixed Fee
- Fixed Fee Amount: $1,000.00
- Escalation Month: January
- Escalator Format: Percentage
- Escalator Percentage: 5%

**Year 1 Processing**:
- December (Last Friday): System calculates new amount
- New Amount: $1,000.00 × 1.05 = $1,050.00
- January Billing: Uses $1,050.00 for all billing cycles

**Year 2 Processing**:
- December (Last Friday): System calculates from current amount
- New Amount: $1,050.00 × 1.05 = $1,102.50
- January Billing: Uses $1,102.50 for all billing cycles

### Scenario 2: Per Labor Hour Fixed Amount Escalation
**Configuration**:
- Management Fee Type: Per Labor Hour
- Job Code 1: Standard Rate $25.00, Overtime Rate $35.00
- Job Code 2: Standard Rate $20.00, Overtime Rate $30.00
- Escalation Month: March
- Escalator Format: Fixed Amount
- Standard Rate Escalator: $2.00
- Overtime Rate Escalator: $3.00

**Processing Results**:
- Job Code 1: Standard $27.00, Overtime $38.00
- Job Code 2: Standard $22.00, Overtime $33.00

### Scenario 3: Revenue Percentage Escalation
**Configuration**:
- Management Fee Type: Revenue Percentage
- Revenue Percentage: 10.00%
- Escalation Month: July
- Escalator Format: Percentage
- Escalator Percentage: 10%

**Processing Results**:
- New Revenue Percentage: 10.00% × 1.10 = 11.00%
- Applied to all revenue calculations going forward

## Compliance and Monitoring

### Audit Requirements
- **Escalation Events**: Date, time, old amount, new amount, calculation method
- **User Actions**: Configuration changes, manual overrides, system interactions
- **System Performance**: Processing times, error rates, success confirmations

### Error Handling
- **Calculation Failures**: Log error, maintain current amount, alert administrators
- **Configuration Errors**: Validate inputs, prevent invalid configurations
- **Billing Integration**: Verify new amounts propagate correctly to billing system

### Reporting
- **Escalation Summary**: Annual report of all escalation events
- **Financial Impact**: Analysis of escalation effects on revenue
- **Contract Compliance**: Verification of escalation terms adherence

## Related Documentation

- [Contract Configuration Guide](../../configuration/contracts/contract-configuration-guide.md)
- [PowerBill System Overview](../../systems/billing/powerbill-system-overview.md)
- [Billing Admin User Guide](../../user-processes/billing-admin/powerbill-user-guide.md)
- [Contract Escalation Rules](../contracts/contract-escalation-rules.md)

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-17 | Data Product Team | Initial documentation from Sprint 25 user stories |