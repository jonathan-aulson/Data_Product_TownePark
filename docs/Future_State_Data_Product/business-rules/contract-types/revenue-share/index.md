---
title: "Revenue Share Contract Business Rules"
description: "Business rules and specifications for revenue share contract types, including calculation methods, validation rules, and implementation guidelines"
created_date: 2025-07-28
last_updated_date: 2025-07-28
version: 1.0
status: Active
owner: "Contract Management Team"
systems:
  - Contracts
  - Billing
  - Revenue Management
business_domains:
  - Contract Management
  - Revenue Share Contracts
  - Revenue Calculation
  - Billing
  - Financial Management
tags:
  - contracts
  - revenue-share
  - business-rules
  - billing
  - revenue
  - percentage
---

# Revenue Share Contract Business Rules

## Overview

This section contains comprehensive business rules and specifications for revenue share contract types within the Towne Park system. Revenue share contracts represent agreements where Towne Park receives a percentage of the total revenue generated from parking operations or other revenue-generating activities.

## Contract Definition

### Revenue Share Contract Characteristics
- **Percentage-Based Compensation**: Towne Park receives a predetermined percentage of gross revenue
- **Revenue Categories**: Different revenue streams with potentially different percentages
- **Minimum Guarantees**: Optional minimum payment guarantees regardless of revenue
- **Revenue Reporting**: Regular revenue reporting and validation requirements

### Contract Components
- **Base Percentage**: Core revenue share percentage
- **Tiered Percentages**: Different percentages based on revenue thresholds
- **Revenue Categories**: Specific revenue types included/excluded
- **Minimum Guarantees**: Guaranteed minimum payments

## Business Rules

### Revenue Share Calculation Rules
- **Rule RS-001**: Revenue share = Gross Revenue × Revenue Share Percentage
- **Rule RS-002**: Owner percentage = 100% - Towne Park percentage (with zero floor)
- **Rule RS-003**: Minimum guarantee applies when calculated share is below minimum
- **Rule RS-004**: Revenue categories are calculated separately if different percentages apply

### Revenue Recognition Rules
- **Rule RS-005**: Only contracted revenue categories are included in calculations
- **Rule RS-006**: Revenue must be validated and verified before calculation
- **Rule RS-007**: Adjustments and refunds are deducted from gross revenue
- **Rule RS-008**: Revenue is recognized in the period it is earned

### Tiered Percentage Rules
- **Rule RS-009**: Tiered percentages apply to revenue thresholds progressively
- **Rule RS-010**: Each tier applies only to revenue within that tier's range
- **Rule RS-011**: Higher tiers typically have higher Towne Park percentages
- **Rule RS-012**: Tier thresholds are typically monthly or annual

### Validation Rules
- **Rule RS-013**: Revenue share percentage must be between 0% and 100%
- **Rule RS-014**: Owner percentage calculation must include zero floor protection
- **Rule RS-015**: Minimum guarantees cannot exceed maximum possible revenue share
- **Rule RS-016**: All revenue must be supported by documentation

## Implementation Guidelines

### Contract Setup
- Define revenue share percentages for each revenue category
- Establish tiered percentage structures if applicable
- Configure minimum guarantee amounts and terms
- Set up revenue reporting and validation procedures

### Revenue Tracking Configuration
- Configure revenue category definitions and tracking
- Set up automated revenue data collection
- Implement revenue validation and verification procedures
- Establish reporting cycles and deadlines

### Calculation Configuration
- Configure automated revenue share calculations
- Set up tiered percentage calculation logic
- Implement minimum guarantee comparison and application
- Establish calculation validation and review procedures

## Revenue Categories

### Primary Revenue Categories
- **Parking Revenue**: Core parking operation revenue
- **Monthly Parking**: Monthly parking permit revenue
- **Event Parking**: Special event parking revenue
- **Validation Revenue**: Parking validation revenue

### Secondary Revenue Categories
- **Ancillary Services**: Additional service revenue
- **Equipment Revenue**: Equipment rental or lease revenue
- **Penalty Revenue**: Parking violation penalty revenue
- **Other Revenue**: Miscellaneous revenue streams

### Excluded Revenue Categories
- **Capital Improvements**: Revenue from capital asset sales
- **Insurance Proceeds**: Insurance claim proceeds
- **Tax Refunds**: Government tax refunds
- **Interest Income**: Investment interest income

## Percentage Structures

### Flat Percentage Structure
- Single percentage applies to all qualifying revenue
- Simplest calculation method
- Most common for smaller operations
- Easy to understand and implement

### Tiered Percentage Structure
- Different percentages for different revenue levels
- Incentivizes higher revenue performance
- More complex calculation requirements
- Common for larger operations

### Category-Specific Percentages
- Different percentages for different revenue categories
- Reflects different profit margins by category
- Requires detailed revenue categorization
- More complex but more precise

## Minimum Guarantees

### Guarantee Types
- **Monthly Minimum**: Guaranteed minimum monthly payment
- **Annual Minimum**: Guaranteed minimum annual payment
- **Seasonal Minimum**: Guaranteed minimum for specific seasons
- **Performance Minimum**: Minimum based on performance metrics

### Guarantee Application
- Applied when calculated revenue share is below guarantee
- Typically reconciled annually or at contract end
- May include true-up provisions for over-payments
- Often includes performance requirements

## Revenue Validation

### Validation Procedures
- Monthly revenue reporting and reconciliation
- Third-party audit rights and procedures
- Revenue documentation and support requirements
- Dispute resolution procedures

### Documentation Requirements
- Daily revenue reports and cash reconciliation
- Monthly financial statements
- Annual audited financial statements
- Supporting documentation for all revenue

## Related Documentation

- [Contract Types Overview](../index.md)
- [Contract Configuration Business Rules](../../contracts/index.md)
- [Billing Business Rules](../../billing/index.md)
- [Revenue Management Business Rules](../../billing/index.md)
- [Contract Configuration Setup](../../../configuration/contracts/index.md)

## Validation and Compliance

### Revenue Validation
- Verify all revenue is properly categorized
- Validate revenue documentation and support
- Confirm revenue recognition timing
- Review revenue adjustments and corrections

### Calculation Validation
- Verify percentage calculations are accurate
- Validate tiered percentage applications
- Confirm minimum guarantee comparisons
- Review calculation methodology compliance

### Reporting Validation
- Validate revenue reporting accuracy and completeness
- Verify reporting timeline compliance
- Confirm documentation requirements are met
- Review audit trail completeness

## Performance Metrics

### Revenue Metrics
- Gross revenue by category
- Revenue growth trends
- Revenue per unit metrics
- Seasonal revenue patterns

### Share Metrics
- Revenue share amounts
- Percentage realization rates
- Minimum guarantee utilization
- Owner vs. Towne Park share analysis

### Performance Metrics
- Revenue per space
- Occupancy rates
- Average transaction values
- Customer satisfaction scores

## Code Validation

### Power Platform Formula Validation
Based on validation against Power Platform formulas:

```powerplatform
bs_ownerpercent: =If(bs_percenttocharge >= 0, 100 - bs_percenttocharge, 0)
```

**Validation Finding**: ✅ **VERIFIED** - Owner percentage calculation includes zero floor protection as documented in Rule RS-002.

**Code Location**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_ownerpercent-FormulaDefinitions.yaml`

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-07-28 | Initial creation of revenue share contract business rules |