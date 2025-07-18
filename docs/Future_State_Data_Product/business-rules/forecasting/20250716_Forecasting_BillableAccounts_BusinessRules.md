---
title: "Billable Accounts Internal Revenue Calculation - Business Rules"
description: "Business rules and calculation logic for Billable Accounts Internal Revenue in P&L forecasting"
author: "Towne Park Data Product Team"
date: "2025-07-16"
version: "1.0"
systems: ["Forecasting", "PowerBill", "EDW"]
components: ["P&L View", "Internal Revenue", "Billable Accounts"]
business_domains: ["Financial Forecasting", "Revenue Management", "Contract Management"]
user_roles: ["Account Manager", "Financial Analyst"]
validation_status: "✅ Verified"
related_docs: 
  - "docs/Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md"
  - "docs/Future_State_Data_Product/technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md"
cross_references:
  - type: "implements"
    target: "User Story 2337"
    description: "Billable Accounts Internal Revenue calculation"
  - type: "implements" 
    target: "User Story 2161"
    description: "P&L View Internal Revenue initialization"
---

# Billable Accounts Internal Revenue Calculation - Business Rules

## Overview

This document defines the business rules and calculation logic for Billable Accounts Internal Revenue within the P&L forecasting system. These rules govern how forecasted Internal Revenue is calculated using data from PowerBill contracts combined with EDW budget data.

## Business Context

The Billable Accounts feature enables Account Managers to forecast Internal Revenue for sites with billable account configurations. This calculation combines contract details from PowerBill with budget data from EDW to provide accurate financial projections.

## Core Business Rules

### BR-BA-001: Billable Accounts Enablement
- **Rule**: Billable Accounts calculations are only performed when enabled for a site
- **Condition**: Site contract details must have "Billable Accounts" enabled
- **Impact**: When disabled, only standard budget-based Internal Revenue calculations apply

### BR-BA-002: Management Agreement Exclusion (Sprint 28)
- **Rule**: Management Agreement calculations are excluded in Sprint 28 implementation
- **Condition**: Management Agreement is disabled for the site
- **Impact**: Only Billable Accounts calculations are included in Internal Revenue

### BR-BA-003: Data Source Priority
- **Rule**: Account Manager forecast values override budget values when available
- **Priority Order**:
  1. Account Manager entered forecast values (Other Expenses tab)
  2. Budget values from BUDGET_FINAL
- **Impact**: Ensures Account Manager input drives forecasting accuracy

## Calculation Components

### Additional Payroll Amount
- **Rule**: Fixed amount added to Internal Revenue calculation
- **Source**: Site Contract Details configuration
- **Application**: Added as-is to final Internal Revenue amount
- **Example**: $5,000 Additional Payroll Amount

### PTEB (Payroll Taxes, Employee Benefits) Calculations

#### PTEB Type: Actual PTEB
- **Rule**: Use actual sum of PTEB accounts from budget
- **Accounts**: 6200 (Payroll Taxes), 6399 (Health Insurance Allocation), 6500 (Insurance - Worker's Comp)
- **Calculation**: Sum of non-excluded PTEB account balances
- **Source**: BUDGET_FINAL table

#### PTEB Type: Percentage of Billable Payroll
- **Rule**: Calculate PTEB as percentage of billable payroll
- **Formula**: `PTEB Amount = (% Amount) × (Sum of Non-Excluded PTEB Accounts)`
- **Example**: 15% of billable payroll
- **Application**: Added to Internal Revenue from escalator effective date forward

### Support Services Calculations

#### Fixed Support Services
- **Rule**: Fixed dollar amount added to Internal Revenue
- **Source**: Site Contract Details configuration
- **Application**: Added as fixed amount to Internal Revenue
- **Example**: $2,500 fixed Support Services

#### Percentage-Based Support Services
- **Rule**: Calculate as percentage of payroll
- **Types**:
  - **% of Billable Payroll**: Percentage of (Payroll - PTEB)
  - **% of Total Payroll**: Percentage of all non-excluded accounts (6000-6999 range)
- **Example**: 10% of Billable Payroll

### Account Exclusion Rules

#### Non-Excluded Account Processing
- **Rule**: Only non-excluded billable accounts are included in calculations
- **Source**: Dataverse Contract Details - Non-Excluded Billable Accounts list
- **Application**: Filters both budget queries and forecast value processing
- **Impact**: Ensures only billable-to-customer accounts affect Internal Revenue

#### Excluded Account Handling
- **Rule**: Excluded accounts are completely omitted from calculations
- **Source**: Site configuration for excluded accounts
- **Impact**: No values from excluded accounts contribute to Internal Revenue

## Escalator Application Rules

### Escalator Timing
- **Rule**: Escalators apply only from their effective date forward
- **Condition**: Current period >= Escalator effective date
- **Types**:
  - **Fixed Dollar**: Add fixed amount to base calculation
  - **Percentage Increase**: Multiply base amount by (1 + percentage)

### Escalator Scope
- **Rule**: Escalators apply to applicable calculation components
- **Components Affected**:
  - PTEB calculations (when configured)
  - Support Services (when configured)
  - Additional Payroll Amount (when configured)

## Data Integration Rules

### Budget Data Integration
- **Source**: BUDGET_FINAL table
- **Filter Criteria**:
  - COST_CENTER matches site
  - PERIOD matches forecast period
  - IS_SUMMARY_CATEGORY = 'INTERNAL REVENUE'
- **Calculation**: `[INTERNAL REVENUE] = [BUDGET_CATEGORY_MONTHLY_TOTAL] × (-1)`

### Forecast Data Override
- **Rule**: Account Manager forecast values take precedence over budget
- **Source**: Other Expenses tab in Dataverse
- **Condition**: Non-zero forecast value entered by Account Manager
- **Impact**: Replaces budget value for specific accounts

### PowerBill Integration
- **Source**: PowerBill contract details
- **Data Elements**:
  - Additional Payroll Amount
  - PTEB Type and percentages
  - Support Services configuration
  - Escalator details
  - Non-excluded account lists

## Validation Rules

### Data Completeness
- **Rule**: All required contract details must be configured
- **Required Elements**:
  - Site has Billable Accounts enabled
  - PTEB configuration (if applicable)
  - Support Services configuration (if applicable)
  - Non-excluded accounts list

### Calculation Accuracy
- **Rule**: All calculations must be mathematically consistent
- **Validation Points**:
  - Sum of components equals total Internal Revenue
  - Escalators applied correctly by date
  - Account exclusions properly implemented

### Monthly Calculation Consistency
- **Rule**: Each month's calculation must reflect appropriate escalators
- **Application**: Escalators only affect periods on or after effective date
- **Validation**: Pre-escalator periods use base calculations

## Error Handling Rules

### Missing Configuration
- **Rule**: Gracefully handle missing contract details
- **Response**: Display appropriate error messages
- **Guidance**: Provide specific configuration requirements

### Data Validation Failures
- **Rule**: Validate all input data before calculation
- **Checks**:
  - Non-negative values for hours and amounts
  - Valid date ranges for escalators
  - Proper account number formats

## Business Impact

### Financial Accuracy
- **Benefit**: Improved accuracy of Internal Revenue forecasting
- **Impact**: Better financial planning and budget variance analysis
- **Measurement**: Variance between forecast and actual Internal Revenue

### User Efficiency
- **Benefit**: Streamlined forecasting process for Account Managers
- **Impact**: Reduced manual calculation effort
- **Measurement**: Time savings in forecast preparation

### Compliance
- **Benefit**: Consistent application of contract terms
- **Impact**: Accurate billing and revenue recognition
- **Measurement**: Audit compliance and contract adherence

## Related Business Rules

- [PLH Rate Escalation Rules](../contracts/plh-rate-escalation.md)
- [Payroll Forecasting Rules](payroll-forecasting-business-rules.md)
- [Budget Integration Rules](budget-integration-business-rules.md)

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-16 | Data Product Team | Initial documentation from Sprint 28 user stories |