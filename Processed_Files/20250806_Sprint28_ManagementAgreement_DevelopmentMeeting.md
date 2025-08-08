---
title: "Towne Park Development - Sprint 28 Management Agreement Calculator Implementation"
description: "Comprehensive development meeting transcript and technical specifications for implementing Management Agreement billing calculations including management fees, insurance/claims, non-GL expenses, and profit share components"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-02
version: 1.0
status: Active
owner: "Development Team"
source_documents:
  - "20250703_Sprint Tasking_ 28.docx"
systems:
  - Billing
  - Forecasting
components:
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Management Agreement Processing
user_roles:
  - Developer
  - Technical Lead
  - Business Analyst
tags:
  - sprint-planning
  - management-agreement
  - billing-calculations
  - technical-architecture
  - development-meeting
---

# Sprint 28 Management Agreement Calculator Implementation

## Meeting Overview

**Date**: July 2, 2025, 3:55 PM  
**Meeting Type**: Sprint Tasking Session  
**Duration**: Approximately 3 hours  
**Primary Focus**: Management Agreement billing calculator architecture and implementation planning

### Participants
- **Javier Casas** - Developer
- **Graham Olson** - Developer  
- **Cesar Figueroa** - Technical Lead
- **Andrew Scheuer** - Developer/Architect
- **Christopher Thompson** - Senior Developer
- **Jonathan Aulson** - Product Owner/Business Analyst

## Executive Summary

This comprehensive sprint planning session focused on breaking down the complex Management Agreement billing calculator (User Story 17876) into manageable components. The team established a clear architectural pattern using separate calculators for each component while maintaining integration with the existing Internal Revenue calculation system.

## Key Technical Decisions

### 1. Calculator Architecture Pattern

**Decision**: Implement separate calculators for each Management Agreement component using strategy design pattern

**Components Identified**:
- Management Fee Calculator
- Insurance and Claims Calculator  
- Non-GL Billable Expenses Calculator
- Profit Share Calculator

**Integration Approach**:
- Each calculator implements `IManagementAgreementCalculator` interface
- Results aggregate into Internal Revenue calculation system
- Execution order enforced through calculator ordering system

### 2. Data Flow Architecture

**ETL Process Enhancements Required**:
- Add vehicle insurance account (7082) to billable expense budget table
- Add claims accounts (7099, 7100, etc.) aggregation column
- Ensure enabled/disabled account filtering in ETL queries

**API Integration Points**:
- EDW API calls minimized to prevent performance degradation
- Current P&L call already at 26 seconds for 2 sites
- Preference for ETL-based data population over real-time API calls

## Detailed Component Specifications

### Management Fee Calculator (User Story 2423)

**Calculation Logic**:
1. **Fixed Fee Branch**: Use configured fixed fee amount directly
2. **Per Labor Hour Branch**: 
   - Get forecasted hours for specific job code
   - Multiply by configured hourly rate
3. **Revenue Percentage Branch**:
   - Use forecasted external revenue
   - Apply configured percentage

**Data Sources**:
- Management agreement configuration (fixed fee, rates, percentages)
- Forecasted hours by job code
- External revenue calculations
- Escalator configurations

**Implementation Notes**:
- All configuration data available in management agreement component
- Escalator logic follows standard escalation patterns
- Output feeds into Internal Revenue total

### Insurance and Claims Calculator (User Story 2424)

**Insurance Calculation**:
1. **Check if Fixed Fee**: Use fixed fee amount if configured
2. **Percentage-Based Calculation**:
   - Base: 5.77% of forecasted payroll (base amount)
   - Additional: Vehicle insurance account 7082 from budget
   - Apply additional percentage if configured

**Claims Processing**:
1. **Claims Enabled Check**: Process only if claims enabled in configuration
2. **Account Aggregation**: Sum of accounts 7099, 7100, and additional claim accounts
3. **Cap Application Logic**:
   - **Per Claim**: No cap applied (output full amount)
   - **Annual Calendar**: Sum all claims January 1st to current month, subtract excess over cap
   - **Annual Anniversary**: Sum all claims from contract start date, subtract excess over cap

**ETL Requirements**:
- New column: `vehicle_insurance_budget` (account 7082)
- New column: `claims_accounts_total` (sum of 7099, 7100, etc.)
- Filter by enabled accounts only

**Complex Cap Logic**:
```
IF claims_cap_type = "per_claim":
    RETURN claims_total (no cap applied)
ELSE IF claims_cap_type = "annual_calendar":
    year_to_date_claims = SUM(claims_accounts FROM January 1 TO current_month)
    IF year_to_date_claims > annual_cap:
        RETURN annual_cap
        SUBTRACT (year_to_date_claims - annual_cap) FROM billable_expense_total
ELSE IF claims_cap_type = "annual_anniversary":
    contract_year_claims = SUM(claims_accounts FROM contract_start_anniversary TO current_month)
    IF contract_year_claims > annual_cap:
        RETURN annual_cap
        SUBTRACT (contract_year_claims - annual_cap) FROM billable_expense_total
```

### Non-GL Billable Expenses Calculator (User Story 2427)

**Processing Logic**:
1. **Enabled Check**: Process only if non-GL expenses enabled
2. **Iterate Through Each Non-GL Expense Item**:
   - Fixed Amount: Use configured amount directly
   - Percent of Revenue: External revenue × configured percentage
   - Percent of Payroll: Requires billable vs total payroll determination

**Payroll Type Clarification Needed**:
- **Billable Payroll**: Base amount from PTEB calculation
- **Total Payroll**: Base amount + PTEB total from P&L column
- **Confirmation Required**: Exact definition and source location

**Data Sources**:
- Non-GL expense table (expense title, amount, type)
- External revenue calculations
- PTEB calculation outputs
- Payroll expense data

### Profit Share Calculator (User Story 2426)

**Revenue Calculation**:
```
Total Revenue = External Revenue 
                - Management Fee Total
                - Insurance and Claims Total  
                - Billable Accounts Total
                - Non-GL Billable Expenses Total
```

**Threshold Processing**:
1. **Accumulation Type Handling**:
   - Monthly: Apply thresholds to current month only
   - Annual Calendar: Sum January 1st to current month
   - Annual Anniversary: Sum from contract anniversary date

2. **Tier Application**:
   - Apply percentage rates based on threshold tiers
   - Similar to revenue share tier processing
   - Support multiple threshold levels

**Critical Integration Requirement**:
- Must execute LAST in calculator sequence
- Requires outputs from all other calculators
- When profit share enabled: subtract component totals from Internal Revenue to prevent double-counting

**Escalator Support**:
- Standard escalator logic applies
- Percentage rates subject to escalation
- Threshold amounts subject to escalation

## Technical Implementation Details

### Calculator Interface Design

```csharp
public interface IManagementAgreementCalculator
{
    int ExecutionOrder { get; }
    Task<CalculationResult> CalculateAsync(CalculationContext context);
}
```

**Execution Order**:
1. Management Fee Calculator (Order: 1)
2. Insurance and Claims Calculator (Order: 2)  
3. Non-GL Billable Expenses Calculator (Order: 3)
4. Profit Share Calculator (Order: 4)

### Data Model Requirements

**Billable Expense Budget Table Enhancements**:
```sql
ALTER TABLE BillableExpenseBudget 
ADD COLUMN vehicle_insurance_budget DECIMAL(18,2),
ADD COLUMN claims_accounts_total DECIMAL(18,2);
```

**ETL Query Enhancements**:
- Filter accounts by enabled status in billable expense configuration
- Aggregate claims accounts (7099, 7100, additional codes)
- Include vehicle insurance account (7082) from budget final

### Performance Considerations

**Current Performance Baseline**:
- P&L API call: 26 seconds for 2 sites
- Preference for ETL-based data over additional API calls
- Batch processing for similar contract types recommended

**Optimization Strategies**:
- Pre-calculate common values in ETL process
- Cache frequently accessed configuration data
- Minimize real-time EDW API calls

## User Story Breakdown and Estimation

| User Story | Component | Complexity | Story Points | Key Challenges |
|------------|-----------|------------|--------------|----------------|
| 2423 | Management Fee | Medium | 5 | Multiple calculation branches |
| 2424 | Insurance/Claims | High | 13 | Complex cap logic, ETL changes |
| 2427 | Non-GL Expenses | Medium | 8 | Payroll type clarification needed |
| 2426 | Profit Share | High | 13 | Execution ordering, revenue aggregation |
| 2428 | Statistics Display | Low | 5 | UI enhancements, EDW API query |

**Total Sprint Capacity**: 44 story points

## Outstanding Questions and Clarifications

### 1. Payroll Type Definitions
**Question**: Exact definition of "billable" vs "total" payroll for non-GL expense calculations  
**Current Understanding**: 
- Billable = PTEB base amount
- Total = PTEB base amount + PTEB total from P&L
**Action Required**: Confirmation with Jonathan Aulson

### 2. Claims Account Configuration
**Question**: Complete list of claims account codes beyond 7099, 7100  
**Action Required**: Review billable expense configuration for all claims-related accounts

### 3. Non-Billable Expense Logic
**Question**: Definition and usage of "non-billable expense amount" in profit share calculation  
**Current Status**: Not found in current implementation, may be deprecated
**Action Required**: Verify if this logic is still required

## Integration Points

### Existing System Dependencies
- **Billable Accounts Calculator**: Provides base calculations for management agreement processing
- **Internal Revenue Service**: Aggregates all calculator outputs
- **PTEB Calculator**: Provides payroll base amounts and totals
- **External Revenue Calculator**: Provides revenue figures for percentage-based calculations

### New System Requirements
- **Management Agreement Interface**: New interface for calculator implementations
- **Calculator Ordering System**: Ensures proper execution sequence
- **ETL Process Updates**: Additional columns and account aggregations

## Risk Assessment

### High Risk Items
1. **Complex Claims Cap Logic**: Multiple cap types with different date calculations
2. **Profit Share Integration**: Risk of double-counting revenue components
3. **Performance Impact**: Additional calculations may affect P&L generation time

### Medium Risk Items
1. **ETL Process Changes**: Database schema modifications require careful deployment
2. **Calculator Ordering**: Dependency management between calculators
3. **Configuration Complexity**: Multiple configuration points for each calculator type

### Mitigation Strategies
1. **Comprehensive Testing**: Unit tests for each calculator and integration tests for full flow
2. **Phased Deployment**: Deploy calculator framework first, then individual calculators
3. **Performance Monitoring**: Track P&L generation times throughout implementation

## Next Steps

### Immediate Actions
1. **Create Calculator Interface**: Andrew Scheuer to implement base interface and merge to dev
2. **Clarify Payroll Definitions**: Follow up with Jonathan Aulson on payroll type specifications
3. **ETL Planning**: Plan database schema changes and ETL process updates

### Sprint 28 Execution Plan
1. **Week 1**: Calculator framework and Management Fee calculator
2. **Week 2**: Insurance/Claims calculator with ETL changes
3. **Week 3**: Non-GL Expenses and Profit Share calculators
4. **Week 4**: Integration testing and UI enhancements

## Code Validation Requirements

**Validation Scope**: All business rule calculations must be validated against existing Power Platform implementation

**Source Code Locations**:
- Management Agreement flows in Power Platform solution
- Billable accounts calculation logic
- Insurance and claims processing flows
- Profit share calculation implementations

**Validation Process**: Compare documented calculation logic with actual Power Platform formula implementations to ensure accuracy and completeness.

## Related Documentation

- [Billable Accounts Technical Specification](../technical/forecasting/20250718_Forecasting_BillableAccounts_TechnicalSpec.md)
- [Contract Configuration Guide](../configuration/contracts/contract-configuration-guide/index.md)
- [Internal Revenue Calculation Patterns](../technical/backend/internal-revenue-calculation-patterns.md)
- [ETL Process Documentation](../technical/integrations/20250724_EDW_Integration_TechnicalSpec.md)

---

*This document preserves the complete technical discussion and decision-making process from the Sprint 28 planning session, ensuring all implementation details and business logic are captured for development execution.*