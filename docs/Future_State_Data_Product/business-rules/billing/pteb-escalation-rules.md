---
title: "PTEB Escalation Rules"
description: "Business rules for automatic escalation of PTEB (Payroll Tax and Employee Benefits) percentages in billable accounts"
author: "Towne Park Data Product Team"
date: "2025-07-17"
version: "1.0"
status: "Active"
category: "Business Rules"
subcategory: "Billing"
tags: ["billing", "pteb", "escalation", "billable-accounts", "payroll-percentage"]
related_systems: ["PowerBill", "Billing System", "Billable Accounts"]
stakeholders: ["Billing Admin", "Contract Admin", "Finance Team"]
review_cycle: "Quarterly"
last_updated: "2025-07-17"
---

# PTEB Escalation Rules

## Overview

This document defines the business rules for automatic escalation of PTEB (Payroll Tax and Employee Benefits) percentages when configured as a percentage of billable payroll, ensuring automatic adjustments to account for rising benefit costs.

## Business Context

PTEB escalation provides automatic annual adjustments to the percentage charged for payroll taxes and employee benefits. This ensures that billing accurately reflects increasing benefit costs without requiring manual intervention each billing cycle.

## Core Business Rules

### Rule 1: PTEB Configuration Prerequisites
- **Billable Accounts**: Must be enabled for the contract
- **PTEB Line Item**: "Create PTEB Line-item" checkbox must be checked
- **Charge Method**: "Charge as Percentage of Billable Payroll" must be selected
- **Base Percentage**: Initial PTEB percentage must be configured

### Rule 2: Escalation Trigger Timing
- **Arrears Billing Type**: Escalation occurs on the last Friday of the month preceding the escalation month
- **Advance Billing Type**: Escalation occurs on the first business day of the escalation month
- **Escalation Month**: User-configurable per contract (January through December)

### Rule 3: Escalation Formats

#### Percentage Escalation
- **Formula**: `New Percentage = Current Percentage × (1 + Escalation Percentage)`
- **Example**: 25% base + 5% escalation = 26.25% (25% × 1.05)
- **Compounding**: Each year applies escalation to the current percentage

#### Fixed Amount Escalation
- **Formula**: `New Percentage = Current Percentage + Escalation Amount`
- **Example**: 25% base + 2% escalation = 27%
- **Linear Growth**: Each year adds the same percentage point amount

### Rule 4: Calculation Examples

#### Scenario 1: Percentage Escalation (Compounding)
**Initial Configuration**:
- PTEB Percentage: 25%
- Escalation Format: Percentage
- Escalation Percentage: 5%
- Escalation Month: March

**Year-over-Year Progression**:
- Year 1: 25.00%
- Year 2: 26.25% (25% × 1.05)
- Year 3: 27.56% (26.25% × 1.05)
- Year 4: 28.94% (27.56% × 1.05)

#### Scenario 2: Fixed Amount Escalation (Linear)
**Initial Configuration**:
- PTEB Percentage: 25%
- Escalation Format: Fixed Amount
- Escalation Amount: 2%
- Escalation Month: July

**Year-over-Year Progression**:
- Year 1: 25%
- Year 2: 27% (25% + 2%)
- Year 3: 29% (27% + 2%)
- Year 4: 31% (29% + 2%)

### Rule 5: Multiple Escalator Independence
- **Concurrent Escalators**: PTEB escalators operate independently of other line item escalators
- **Different Timing**: Each escalator can have different escalation months
- **Separate Processing**: System processes each escalator according to its own schedule
- **Combined Billing**: Total billed amount reflects all applicable escalations

## Implementation Requirements

### Configuration Interface
1. **Enable Escalator Checkbox**: Activates PTEB escalation feature
2. **Escalation Month Dropdown**: Selects trigger month (January-December)
3. **Escalator Format Selection**: Choose between Percentage or Fixed Amount
4. **Escalator Value Input**: Enter percentage or percentage point amount
5. **Tooltip Help**: Contextual help explaining escalation mechanics

### Validation Rules
- Escalation percentage must be between 0% and 100%
- Fixed amount escalations must be positive percentage values
- Escalation month must be valid calendar month
- PTEB percentage must be configured before enabling escalation

### System Behavior
- **Automatic Processing**: No manual intervention required after configuration
- **Billing Integration**: New percentages effective immediately after escalation
- **Audit Trail**: Complete history of escalation events and percentage changes
- **Error Handling**: Failed escalations logged and flagged for manual review

## Detailed Processing Scenarios

### Scenario 1: Arrears Billing with March Escalation
**Configuration**:
- Billing Type: Arrears
- PTEB Percentage: 25%
- Escalation Month: March
- Escalator Format: Percentage (5%)

**Processing Timeline**:
- **Last Friday of February**: System calculates new percentage (26.25%)
- **March Billing Cycle**: Uses new percentage for all payroll calculations
- **Subsequent Months**: Continues using 26.25% until next escalation

### Scenario 2: Multiple Line Item Escalations
**Configuration**:
- PTEB Escalation: March (5% percentage)
- Support Services Escalation: July (3% percentage)
- Different escalation months ensure independent processing

**Processing Results**:
- **March**: PTEB increases from 25% to 26.25%
- **July**: Support Services increases independently
- **Total Bill**: Reflects both escalated amounts

### Scenario 3: Validation and Error Handling
**Invalid Configurations**:
- Escalation percentage > 100%: System rejects configuration
- Negative escalation amount: System prevents entry
- Missing base percentage: Escalation cannot be enabled

**Error Recovery**:
- Calculation failures: Maintain current percentage, log error
- System downtime during escalation: Process on next available cycle
- Data corruption: Restore from audit trail

## Compliance and Monitoring

### Audit Requirements
- **Escalation Events**: Date, time, old percentage, new percentage, calculation method
- **Configuration Changes**: User modifications, system updates, validation results
- **Billing Impact**: Revenue effect analysis, percentage change tracking

### Reporting
- **Escalation Summary**: Annual report of all PTEB escalation events
- **Financial Impact**: Analysis of escalation effects on billing amounts
- **Trend Analysis**: Multi-year percentage progression tracking

### Quality Assurance
- **Pre-escalation Validation**: Verify configuration integrity
- **Post-escalation Verification**: Confirm percentage updates in billing system
- **Cross-system Consistency**: Ensure escalated percentages propagate correctly

## Related Documentation

- [Management Fee Escalation Rules](management-fee-escalation-rules.md)
- [Billable Accounts Configuration](../../configuration/contracts/contract-configuration-guide.md)
- [PowerBill System Overview](../../systems/billing/powerbill-system-overview.md)
- [Contract Escalation Rules](../contracts/contract-escalation-rules.md)

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-17 | Data Product Team | Initial documentation from Sprint 25 user stories |