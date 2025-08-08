---
title: "Towne Park Contract Types - Business Rules Overview"
description: "Comprehensive overview of business rules for all contract types supported by the Towne Park billing system, including fixed fee, per labor hour, revenue share, management agreement, and hybrid contracts"
created_date: 2025-07-28
last_updated_date: 2025-07-28
version: 1.0
status: Active
owner: "Documentation Team"
systems:
  - Billing
  - Contracts
components:
  - Business Rules
  - Contract Types
business_domains:
  - Contract Management
  - Revenue Calculation
  - Billing Types
  - Contract Configuration
user_roles:
  - Contract Admin
  - Billing Admin
  - Account Manager
  - District Manager
tags:
  - contract-types
  - business-rules
  - billing-methods
  - revenue-calculation
---

# Contract Types Business Rules Overview

## Purpose

This section defines the business rules and calculation methodologies for all contract types supported by the Towne Park billing system. Each contract type has specific billing rules, revenue calculations, and configuration requirements.

## Supported Contract Types

### Primary Contract Types

#### [Fixed Fee Contracts](fixed-fee/index.md)
- **Description**: Contracts with predetermined monthly fees
- **Billing Method**: Fixed monthly amount regardless of usage
- **Key Features**: Predictable revenue, simplified billing
- **Use Cases**: Standard service agreements, basic management contracts

#### [Per Labor Hour Contracts](per-labor-hour/index.md)
- **Description**: Contracts billed based on actual labor hours
- **Billing Method**: Hourly rate × actual hours worked
- **Key Features**: Variable billing, detailed time tracking
- **Use Cases**: Consulting services, variable staffing needs

#### [Revenue Share Contracts](revenue-share/index.md)
- **Description**: Contracts based on percentage of customer revenue
- **Billing Method**: Percentage of gross revenue generated
- **Key Features**: Performance-based billing, shared risk/reward
- **Use Cases**: Parking operations, concession management

#### [Management Agreement Contracts](management-agreement/index.md)
- **Description**: Comprehensive management service contracts
- **Billing Method**: Base fee plus performance incentives
- **Key Features**: Full service management, multiple revenue streams
- **Use Cases**: Complete facility management, multi-service agreements

### Contract Type Categories

#### Standard Contracts
- **[Fixed Fee](fixed-fee/index.md)** - Predictable monthly billing
- **[Per Labor Hour](per-labor-hour/index.md)** - Time-based billing
- **[Revenue Share](revenue-share/index.md)** - Performance-based billing

#### Complex Contracts
- **[Management Agreement](management-agreement/index.md)** - Multi-component billing
- **Hybrid Contracts** - Combination of multiple billing methods

## Business Rule Categories

### Billing Calculations
- Revenue calculation formulas by contract type
- Fee structure definitions and applications
- Escalation and adjustment methodologies
- Tax and surcharge calculations

### Contract Configuration
- Required fields and validation rules
- Contract type-specific setup requirements
- Integration points with billing systems
- Approval and authorization workflows

### Performance Metrics
- Key performance indicators by contract type
- Revenue tracking and reporting requirements
- Performance-based adjustment calculations
- Compliance and audit trail requirements

## Contract Type Comparison

| Contract Type | Billing Basis | Predictability | Complexity | Risk Level |
|---------------|---------------|----------------|------------|------------|
| Fixed Fee | Fixed Amount | High | Low | Low |
| Per Labor Hour | Time-based | Medium | Medium | Medium |
| Revenue Share | Revenue % | Low | High | High |
| Management Agreement | Multi-component | Medium | High | Medium |

## Related Documentation

### Business Rules
- **[Contract Business Rules](../contracts/index.md)** - General contract management rules
- **[Billing Business Rules](../billing/index.md)** - Billing system integration rules

### System Integration
- **[Billing System](../../systems/billing/index.md)** - Technical billing system overview
- **[Contract System](../../systems/contracts/index.md)** - Contract management system

### Configuration
- **[Contract Configuration](../../configuration/contracts/index.md)** - Setup procedures
- **[System Settings](../../configuration/system-settings/index.md)** - Related configurations

### User Processes
- **[Contract Admin](../../user-processes/contract-admin/index.md)** - Administrative procedures
- **[Billing Admin](../../user-processes/billing-admin/index.md)** - Billing processes

## Navigation by Contract Type

### Fixed Fee Contracts
- **[Overview](fixed-fee/index.md)** - Fixed fee contract overview
- **Business Rules**: Detailed fixed fee calculation rules
- **Configuration**: Setup and maintenance procedures

### Per Labor Hour Contracts
- **[Overview](per-labor-hour/index.md)** - PLH contract overview
- **Business Rules**: Hourly billing and escalation rules
- **Configuration**: Time tracking and rate management

### Revenue Share Contracts
- **[Overview](revenue-share/index.md)** - Revenue share overview
- **Business Rules**: Percentage calculation and validation
- **Configuration**: Revenue tracking and reporting setup

### Management Agreement Contracts
- **[Overview](management-agreement/index.md)** - Management agreement overview
- **Business Rules**: Multi-component billing rules
- **Configuration**: Complex contract setup procedures

## Implementation Guidelines

### Contract Type Selection
1. **Assess Customer Needs** - Determine appropriate billing method
2. **Evaluate Risk Factors** - Consider revenue predictability
3. **Review Complexity** - Assess administrative requirements
4. **Validate Compliance** - Ensure regulatory compliance

### Setup Requirements
1. **Contract Configuration** - Define contract parameters
2. **Billing Integration** - Configure billing system connections
3. **Validation Rules** - Implement business rule validation
4. **Testing Procedures** - Verify calculation accuracy

## Latest Updates

| Contract Type | Date | Description |
|---------------|------|-------------|
| [Fixed Fee](fixed-fee/index.md) | 2025-07-28 | Contract type overview created |
| [Per Labor Hour](per-labor-hour/index.md) | 2025-07-28 | PLH contract documentation |
| [Revenue Share](revenue-share/index.md) | 2025-07-28 | Revenue sharing rules |
| [Management Agreement](management-agreement/index.md) | 2025-07-28 | Management contract overview |