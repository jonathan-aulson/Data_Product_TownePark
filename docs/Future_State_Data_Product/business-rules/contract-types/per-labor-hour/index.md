---
title: "Per Labor Hour Contract Business Rules"
description: "Business rules and specifications for per labor hour contract types, including calculation methods, validation rules, and implementation guidelines"
created_date: 2025-07-28
last_updated_date: 2025-07-28
version: 1.0
status: Active
owner: "Contract Management Team"
systems:
  - Contracts
  - Billing
  - Payroll
business_domains:
  - Contract Management
  - Per Labor Hour Contracts
  - Revenue Calculation
  - Billing
  - Payroll Management
tags:
  - contracts
  - per-labor-hour
  - business-rules
  - billing
  - payroll
  - revenue
---

# Per Labor Hour Contract Business Rules

## Overview

This section contains comprehensive business rules and specifications for per labor hour contract types within the Towne Park system. Per labor hour contracts represent agreements where Towne Park charges based on actual labor hours worked, typically with predetermined hourly rates and markup percentages.

## Contract Definition

### Per Labor Hour Contract Characteristics
- **Hourly Rate Structure**: Predetermined rates for different labor categories
- **Markup Percentage**: Towne Park markup applied to labor costs
- **Labor Categories**: Different types of labor with specific rates
- **Billing Frequency**: Regular billing cycles (monthly, bi-weekly)

### Contract Components
- **Base Hourly Rates**: Core hourly rates by labor category
- **Markup Calculation**: Towne Park markup percentage or amount
- **Overtime Rules**: Overtime rate calculations and thresholds
- **Holiday/Premium Pay**: Special rate calculations for holidays and premium time

## Business Rules

### Rate Calculation Rules
- **Rule PLH-001**: Hourly rates are predetermined and documented in contract
- **Rule PLH-002**: Markup percentage applies to all labor hours
- **Rule PLH-003**: Overtime rates calculated at 1.5x base rate (unless specified otherwise)
- **Rule PLH-004**: Holiday pay rates calculated at premium rate (typically 2x base rate)

### Billing Calculation Rules
- **Rule PLH-005**: Total billing = (Hours × Rate × (1 + Markup Percentage))
- **Rule PLH-006**: Regular hours and overtime hours calculated separately
- **Rule PLH-007**: Holiday hours billed at holiday rate with markup
- **Rule PLH-008**: Minimum billing increments (e.g., 15-minute increments)

### Time Tracking Rules
- **Rule PLH-009**: All labor hours must be tracked and documented
- **Rule PLH-010**: Time entries require approval before billing
- **Rule PLH-011**: Overtime hours require supervisor approval
- **Rule PLH-012**: Holiday hours require special authorization

### Validation Rules
- **Rule PLH-013**: Hours worked cannot exceed maximum daily/weekly limits
- **Rule PLH-014**: All time entries must have valid labor category assignments
- **Rule PLH-015**: Billing rates must match contracted rates
- **Rule PLH-016**: Markup percentages must be within contracted ranges

## Implementation Guidelines

### Contract Setup
- Define hourly rates for each labor category
- Specify markup percentages and calculation methods
- Establish overtime and holiday rate calculations
- Configure time tracking and approval workflows

### Time Tracking Configuration
- Set up labor categories and rate structures
- Configure time entry systems and validation rules
- Implement approval workflows for time entries
- Establish reporting and billing procedures

### Billing Configuration
- Configure automatic billing calculations
- Set up markup application procedures
- Implement rate validation and verification
- Establish invoice generation and review processes

## Labor Categories

### Standard Labor Categories
- **Management**: Supervisory and management personnel
- **Operations**: Front-line operational staff
- **Maintenance**: Facility and equipment maintenance
- **Administrative**: Administrative and clerical support

### Specialized Labor Categories
- **Technical**: Specialized technical personnel
- **Security**: Security and safety personnel
- **Customer Service**: Customer-facing service personnel
- **Training**: Training and development personnel

## Rate Management

### Rate Setting Procedures
- Annual rate reviews and adjustments
- Market rate analysis and benchmarking
- Contract negotiation and rate approval
- Rate change notification and implementation

### Rate Escalation
- Automatic annual rate increases (if contracted)
- Cost-of-living adjustments (COLA)
- Performance-based rate adjustments
- Market-driven rate modifications

## Time and Attendance Integration

### Payroll System Integration
- Real-time synchronization with payroll systems
- Automated time entry validation
- Exception handling and resolution
- Audit trail maintenance

### Reporting and Analytics
- Labor hour utilization reports
- Rate analysis and profitability reports
- Overtime and premium pay analysis
- Customer billing summaries

## Related Documentation

- [Contract Types Overview](../index.md)
- [Contract Configuration Business Rules](../../contracts/index.md)
- [Billing Business Rules](../../billing/index.md)
- [Payroll Business Rules](../../forecasting/payroll/index.md)
- [Contract Configuration Setup](../../../configuration/contracts/index.md)

## Validation and Compliance

### Time Entry Validation
- Verify all time entries are complete and accurate
- Validate labor category assignments
- Confirm supervisor approvals
- Review overtime and premium time authorizations

### Rate Validation
- Verify billing rates match contracted rates
- Validate markup calculations
- Confirm rate escalation applications
- Review special rate circumstances

### Billing Validation
- Validate total hour calculations
- Verify markup application accuracy
- Confirm invoice totals and breakdowns
- Review billing cycle compliance

## Performance Metrics

### Utilization Metrics
- Labor hour utilization rates
- Productivity measurements
- Efficiency indicators
- Cost per hour analysis

### Financial Metrics
- Revenue per labor hour
- Markup realization rates
- Profitability analysis
- Cost variance analysis

### Quality Metrics
- Time entry accuracy rates
- Billing error rates
- Customer satisfaction scores
- Service level compliance

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-07-28 | Initial creation of per labor hour contract business rules |