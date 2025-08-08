---
title: "Sprint 28 Management Agreement Calculator Implementation - Development Meeting"
description: "Comprehensive development meeting transcript and technical specifications for implementing Management Agreement billing calculations with FIBO financial ontology classification and enterprise governance"
created_date: 2025-08-06
last_updated_date: 2025-08-07
source_date: 2025-07-02
version: 1.1
status: Active
owner: "Development Team"
source_documents:
  - "new-project-assets/team-notes/development/20250806_Sprint28_ManagementAgreement_DevelopmentMeeting.md"
  - "20250703_Sprint Tasking_ 28.docx"
discovery_metadata:
  discovered_date: 2025-08-07
  discovery_method: "autonomous_document_transformation"
  confidence_score: 1.0
  validation_status: "validated"
  knowledge_graph_id: "sprint28_management_agreement_meeting"
systems:
  - Billing System
  - Forecasting System
  - Contract Management
  - Management Agreement Processing
components:
  - Backend Calculator Framework
  - Database Schema
  - ETL Integration
  - API Services
business_domains:
  - Contract Management
  - Revenue Calculation
  - Financial Planning
  - Software Development
user_roles:
  - Developer
  - Technical Lead
  - Business Analyst
  - Product Owner
  - System Architect
relationships:
  - target: "management-agreement-code-validation-report"
    type: "validates"
    strength: 0.95
  - target: "management-agreement-business-rules"
    type: "implements"
    strength: 0.90
  - target: "billing-system-architecture"
    type: "dependency"
    strength: 0.85
  - target: "calculator-interface-design"
    type: "defines"
    strength: 0.92
governance:
  access_level: "internal"
  compliance_tags: ["Development_Process", "Technical_Architecture", "Financial_Calculations"]
  policy_constraints: ["technical_accuracy", "code_validation_required", "sprint_documentation"]
  policy_evaluation:
    evaluated_date: 2025-08-07
    applicable_policies: ["development_documentation_policy", "technical_specification_policy"]
    compliance_status: "compliant"
    automatic_constraints: ["version_control", "technical_review", "sprint_tracking"]
fibo_classification:
  fibo_type: "fibo-fnd-agr-ctr:MasterAgreement"
  towne_park_type: "management_agreement_implementation"
  confidence_score: 0.98
  domain_extensions:
    calculator_architecture: "Strategy pattern with ordered execution"
    component_calculators: ["Management Fee", "Insurance/Claims", "Non-GL Expenses", "Profit Share"]
    integration_pattern: "Internal Revenue aggregation system"
    technical_complexity: "High - 44 story points across 5 user stories"
    business_impact: "Core billing calculation system for management agreements"
tags:
  - sprint-planning
  - management-agreement
  - billing-calculations
  - technical-architecture
  - development-meeting
  - fibo-master-agreement
  - calculator-framework
  - financial-calculations
---

# Sprint 28 Management Agreement Calculator Implementation - Development Meeting

## Executive Summary

This comprehensive sprint planning session established the technical architecture and implementation strategy for the Management Agreement billing calculator system. The team designed a sophisticated calculator framework using the strategy design pattern with ordered execution to handle complex financial calculations including management fees, insurance/claims processing, non-GL expenses, and profit sharing.

**Key Outcomes:**
- **Calculator Architecture**: Strategy pattern with 4 specialized calculators
- **Story Point Allocation**: 44 points across 5 user stories
- **Technical Complexity**: High complexity due to intricate business rules and integration requirements
- **Performance Considerations**: ETL-based approach to minimize API call overhead

## Meeting Details

**Date**: July 2, 2025, 3:55 PM  
**Meeting Type**: Sprint Tasking Session  
**Duration**: Approximately 3 hours  
**Primary Focus**: Management Agreement billing calculator architecture and implementation planning

### Participants and Roles
- **Javier Casas** - Developer
- **Graham Olson** - Developer  
- **Cesar Figueroa** - Technical Lead
- **Andrew Scheuer** - Developer/Architect
- **Christopher Thompson** - Senior Developer
- **Jonathan Aulson** - Product Owner/Business Analyst

## FIBO Financial Ontology Classification

**Primary Classification**: [`fibo-fnd-agr-ctr:MasterAgreement`](../../FIBO-master-ontology/FND/Agreements/)  
**Towne Park Extension**: Management Agreement with complex calculation components  
**Regulatory Context**: Financial reporting standards, hospitality industry regulations, SOX compliance

**Domain-Specific Properties:**
- **Management Fee Calculations**: Fixed fee, per labor hour, and revenue percentage methods
- **Insurance Processing**: 5.77% payroll rate with vehicle insurance integration (account 7082)
- **Claims Cap Logic**: Per claim, annual calendar, and annual anniversary cap types
- **Non-GL Expenses**: Fixed amount, revenue percentage, and payroll percentage calculations
- **Profit Share Processing**: Tiered calculations with multiple accumulation types

## Technical Architecture Decisions

### Calculator Framework Design

**Architectural Pattern**: Strategy Design Pattern with Ordered Execution

**Core Interface Definition**:
```csharp
public interface IManagementAgreementCalculator
{
    int ExecutionOrder { get; }
    Task<CalculationResult> CalculateAsync(CalculationContext context);
}
```

**Calculator Components Identified**:
1. **Management Fee Calculator** (Order: 1)
2. **Insurance and Claims Calculator** (Order: 2)
3. **Non-GL Billable Expenses Calculator** (Order: 3)
4. **Profit Share Calculator** (Order: 4)

**Integration Architecture**:
- Each calculator implements `IManagementAgreementCalculator` interface
- Results aggregate into Internal Revenue calculation system
- Execution order enforced through calculator ordering system
- Dependency injection for calculator registration and execution

### Data Flow Architecture

**ETL Process Enhancements Required**:
```sql
-- New columns required in BillableExpenseBudget table
ALTER TABLE BillableExpenseBudget 
ADD COLUMN vehicle_insurance_budget DECIMAL(18,2),
ADD COLUMN claims_accounts_total DECIMAL(18,2);
```

**ETL Integration Requirements**:
- Add vehicle insurance account (7082) to billable expense budget table
- Add claims accounts (7099, 7100, etc.) aggregation column
- Ensure enabled/disabled account filtering in ETL queries
- Pre-calculate common values to minimize real-time API calls

**Performance Optimization Strategy**:
- **Current Baseline**: P&L API call takes 26 seconds for 2 sites
- **Approach**: ETL-based data population over real-time API calls
- **Caching Strategy**: Cache frequently accessed configuration data
- **Batch Processing**: Process similar contract types together

## Detailed Calculator Specifications

### 1. Management Fee Calculator (User Story 2423)

**FIBO Classification**: [`fibo-fbc-dae-dbt:Fee`](../../FIBO-master-ontology/FBC/) with management service context

**Calculation Logic Branches**:

#### Fixed Fee Branch
```csharp
if (managementAgreement.Type == ManagementAgreementType.FixedFee)
{
    return managementAgreement.FixedFeeAmount;
}
```

#### Per Labor Hour Branch
```csharp
if (managementAgreement.Type == ManagementAgreementType.PerLaborHour)
{
    var forecastedHours = GetForecastedHours(managementAgreement.JobCode);
    var hourlyRate = managementAgreement.HourlyRate;
    return forecastedHours * hourlyRate;
}
```

#### Revenue Percentage Branch
```csharp
if (managementAgreement.Type == ManagementAgreementType.RevenuePercentage)
{
    var externalRevenue = GetForecastedExternalRevenue();
    var percentage = managementAgreement.RevenuePercentage;
    return externalRevenue * percentage;
}
```

**Data Sources Required**:
- Management agreement configuration (fixed fee, rates, percentages)
- Forecasted hours by job code from Legion integration
- External revenue calculations from forecasting system
- Escalator configurations for rate adjustments

**Business Rules**:
- All configuration data available in management agreement component
- Escalator logic follows standard escalation patterns
- Output feeds into Internal Revenue total calculation
- Supports multiple calculation methods per contract

### 2. Insurance and Claims Calculator (User Story 2424)

**FIBO Classification**: [`fibo-fbc-dae-dbt:Insurance`](../../FIBO-master-ontology/FBC/) with claims processing extension

**Insurance Calculation Logic**:
```csharp
public decimal CalculateInsurance(ManagementAgreement agreement, PayrollData payroll)
{
    if (agreement.InsuranceType == InsuranceType.FixedFee)
    {
        return agreement.FixedInsuranceAmount;
    }
    
    // Percentage-based calculation
    var baseInsurance = payroll.BaseAmount * 0.0577m; // 5.77% of forecasted payroll
    var vehicleInsurance = GetVehicleInsuranceBudget(agreement.SiteId); // Account 7082
    var additionalPercentage = agreement.AdditionalInsurancePercentage ?? 0m;
    
    return baseInsurance + vehicleInsurance + (payroll.BaseAmount * additionalPercentage);
}
```

**Claims Processing Logic**:
```csharp
public decimal CalculateClaims(ManagementAgreement agreement, ClaimsData claims)
{
    if (!agreement.ClaimsEnabled) return 0m;
    
    var claimsTotal = GetClaimsAccountsTotal(agreement.SiteId); // Accounts 7099, 7100, etc.
    
    return agreement.ClaimsCapType switch
    {
        ClaimsCapType.PerClaim => claimsTotal, // No cap applied
        ClaimsCapType.AnnualCalendar => ApplyAnnualCalendarCap(claimsTotal, agreement),
        ClaimsCapType.AnnualAnniversary => ApplyAnnualAnniversaryCap(claimsTotal, agreement),
        _ => claimsTotal
    };
}
```

**Complex Claims Cap Logic**:
```csharp
private decimal ApplyAnnualCalendarCap(decimal currentClaims, ManagementAgreement agreement)
{
    var yearToDateClaims = GetYearToDateClaims(agreement.SiteId, DateTime.Now.Year);
    
    if (yearToDateClaims > agreement.AnnualClaimsCap)
    {
        var excessAmount = yearToDateClaims - agreement.AnnualClaimsCap;
        // Subtract excess from billable expense total
        SubtractFromBillableExpenses(excessAmount);
        return agreement.AnnualClaimsCap;
    }
    
    return currentClaims;
}

private decimal ApplyAnnualAnniversaryCap(decimal currentClaims, ManagementAgreement agreement)
{
    var contractYearClaims = GetContractYearClaims(agreement.SiteId, agreement.ContractStartDate);
    
    if (contractYearClaims > agreement.AnnualClaimsCap)
    {
        var excessAmount = contractYearClaims - agreement.AnnualClaimsCap;
        // Subtract excess from billable expense total
        SubtractFromBillableExpenses(excessAmount);
        return agreement.AnnualClaimsCap;
    }
    
    return currentClaims;
}
```

**ETL Requirements**:
- **New Column**: `vehicle_insurance_budget` (account 7082)
- **New Column**: `claims_accounts_total` (sum of 7099, 7100, etc.)
- **Filter Logic**: Include only enabled accounts in calculations
- **Historical Data**: Support for year-to-date and contract-year claims aggregation

### 3. Non-GL Billable Expenses Calculator (User Story 2427)

**FIBO Classification**: [`fibo-fbc-dae-dbt:Expense`](../../FIBO-master-ontology/FBC/) with non-general-ledger context

**Processing Logic**:
```csharp
public decimal CalculateNonGLExpenses(ManagementAgreement agreement, CalculationContext context)
{
    if (!agreement.NonGLExpensesEnabled) return 0m;
    
    decimal totalExpenses = 0m;
    
    foreach (var expense in agreement.NonGLExpenses)
    {
        totalExpenses += expense.Type switch
        {
            NonGLExpenseType.FixedAmount => expense.Amount,
            NonGLExpenseType.PercentOfRevenue => context.ExternalRevenue * expense.Percentage,
            NonGLExpenseType.PercentOfPayroll => GetPayrollAmount(expense.PayrollType) * expense.Percentage,
            _ => 0m
        };
    }
    
    return totalExpenses;
}
```

**Payroll Type Clarification Required**:
- **Billable Payroll**: Base amount from PTEB calculation
- **Total Payroll**: Base amount + PTEB total from P&L column
- **Action Required**: Confirmation with Jonathan Aulson on exact definitions and source locations

**Data Sources**:
- Non-GL expense table (expense title, amount, type)
- External revenue calculations from forecasting system
- PTEB calculation outputs for payroll base amounts
- Payroll expense data from EDW integration

### 4. Profit Share Calculator (User Story 2426)

**FIBO Classification**: [`fibo-fbc-dae-dbt:ProfitShare`](../../FIBO-master-ontology/FBC/) with tiered calculation extension

**Revenue Calculation Formula**:
```csharp
public decimal CalculateProfitShareRevenue(CalculationContext context)
{
    return context.ExternalRevenue 
           - context.ManagementFeeTotal
           - context.InsuranceAndClaimsTotal  
           - context.BillableAccountsTotal
           - context.NonGLBillableExpensesTotal;
}
```

**Threshold Processing Logic**:
```csharp
public decimal CalculateProfitShare(ManagementAgreement agreement, decimal profitShareRevenue)
{
    var accumulatedRevenue = agreement.AccumulationType switch
    {
        AccumulationType.Monthly => profitShareRevenue, // Current month only
        AccumulationType.AnnualCalendar => GetYearToDateRevenue(agreement.SiteId),
        AccumulationType.AnnualAnniversary => GetContractYearRevenue(agreement.SiteId, agreement.ContractStartDate),
        _ => profitShareRevenue
    };
    
    return ApplyTieredCalculation(accumulatedRevenue, agreement.ProfitShareTiers);
}
```

**Tier Application Logic**:
```csharp
private decimal ApplyTieredCalculation(decimal revenue, List<ProfitShareTier> tiers)
{
    decimal totalProfitShare = 0m;
    decimal remainingRevenue = revenue;
    
    foreach (var tier in tiers.OrderBy(t => t.ThresholdAmount))
    {
        if (remainingRevenue <= 0) break;
        
        var tierRevenue = Math.Min(remainingRevenue, tier.ThresholdAmount);
        totalProfitShare += tierRevenue * tier.Percentage;
        remainingRevenue -= tierRevenue;
    }
    
    return totalProfitShare;
}
```

**Critical Integration Requirements**:
- **Execution Order**: Must execute LAST in calculator sequence (Order: 4)
- **Dependency Management**: Requires outputs from all other calculators
- **Revenue Adjustment**: When profit share enabled, subtract component totals from Internal Revenue to prevent double-counting
- **Escalator Support**: Percentage rates and threshold amounts subject to escalation

## User Story Breakdown and Sprint Planning

### Story Point Allocation

| User Story | Component | Complexity | Story Points | Key Technical Challenges |
|------------|-----------|------------|--------------|--------------------------|
| **2423** | Management Fee Calculator | Medium | 5 | Multiple calculation branches, escalator integration |
| **2424** | Insurance/Claims Calculator | High | 13 | Complex cap logic, ETL schema changes, historical data aggregation |
| **2427** | Non-GL Expenses Calculator | Medium | 8 | Payroll type clarification, percentage calculations |
| **2426** | Profit Share Calculator | High | 13 | Execution ordering, revenue aggregation, tier processing |
| **2428** | Statistics Display | Low | 5 | UI enhancements, EDW API query optimization |

**Total Sprint Capacity**: 44 story points  
**Sprint Duration**: 4 weeks  
**Team Velocity**: 11 points per week average

### Sprint 28 Execution Plan

**Week 1: Foundation and Management Fee**
- Implement calculator framework and interface
- Develop Management Fee calculator with all three calculation branches
- Unit testing for management fee calculations

**Week 2: Insurance and Claims Processing**
- Implement Insurance and Claims calculator
- Execute ETL schema changes for vehicle insurance and claims accounts
- Develop complex claims cap logic with historical data aggregation

**Week 3: Non-GL and Profit Share**
- Implement Non-GL Expenses calculator
- Develop Profit Share calculator with tier processing
- Integration testing between all calculators

**Week 4: Integration and UI**
- Complete calculator framework integration
- Implement Statistics Display UI enhancements
- End-to-end testing and performance optimization

## Outstanding Questions and Risk Assessment

### Critical Clarifications Required

#### 1. Payroll Type Definitions
**Question**: Exact definition of "billable" vs "total" payroll for non-GL expense calculations  
**Current Understanding**: 
- **Billable Payroll**: PTEB base amount
- **Total Payroll**: PTEB base amount + PTEB total from P&L
**Action Required**: Confirmation with Jonathan Aulson  
**Risk Level**: High - Affects billing accuracy

#### 2. Claims Account Configuration
**Question**: Complete list of claims account codes beyond 7099, 7100  
**Action Required**: Review billable expense configuration for all claims-related accounts  
**Risk Level**: Medium - May miss claims in calculations

#### 3. Non-Billable Expense Logic
**Question**: Definition and usage of "non-billable expense amount" in profit share calculation  
**Current Status**: Not found in current implementation, may be deprecated  
**Action Required**: Verify if this logic is still required  
**Risk Level**: Low - May be legacy requirement

### Risk Assessment Matrix

#### High Risk Items
1. **Complex Claims Cap Logic**: Multiple cap types with different date calculations
   - **Mitigation**: Comprehensive unit testing with historical data scenarios
   - **Contingency**: Phased rollout with manual validation

2. **Profit Share Integration**: Risk of double-counting revenue components
   - **Mitigation**: Integration testing with full calculation flow
   - **Contingency**: Revenue reconciliation reports

3. **Performance Impact**: Additional calculations may affect P&L generation time
   - **Mitigation**: Performance monitoring and ETL optimization
   - **Contingency**: Asynchronous processing for complex calculations

#### Medium Risk Items
1. **ETL Process Changes**: Database schema modifications require careful deployment
   - **Mitigation**: Database migration scripts with rollback procedures
   - **Contingency**: Blue-green deployment strategy

2. **Calculator Ordering**: Dependency management between calculators
   - **Mitigation**: Dependency injection with explicit ordering
   - **Contingency**: Manual execution order validation

3. **Configuration Complexity**: Multiple configuration points for each calculator type
   - **Mitigation**: Configuration validation and default value handling
   - **Contingency**: Configuration migration tools

## Integration Points and Dependencies

### Existing System Dependencies
- **Billable Accounts Calculator**: Provides base calculations for management agreement processing
- **Internal Revenue Service**: Aggregates all calculator outputs into final revenue figures
- **PTEB Calculator**: Provides payroll base amounts and totals for percentage calculations
- **External Revenue Calculator**: Provides revenue figures for percentage-based calculations
- **Escalator Service**: Applies escalation rules to rates and thresholds

### New System Requirements
- **Management Agreement Interface**: New interface for calculator implementations
- **Calculator Ordering System**: Ensures proper execution sequence and dependency management
- **ETL Process Updates**: Additional columns and account aggregations in data warehouse
- **Configuration Management**: Enhanced configuration system for complex calculator settings

### API Integration Points
- **EDW API**: Minimize calls to prevent performance degradation
- **Legion Workforce API**: Job code and hours data for per labor hour calculations
- **Power Platform Flows**: Integration with existing workflow systems
- **Great Plains ERP**: Account data and financial reporting integration

## Performance Optimization Strategy

### Current Performance Baseline
- **P&L API Call**: 26 seconds for 2 sites
- **Target Performance**: Maintain current performance levels with additional calculations
- **Optimization Approach**: ETL-based data over additional API calls

### Optimization Techniques
1. **Pre-calculation in ETL**: Move complex aggregations to ETL process
2. **Caching Strategy**: Cache frequently accessed configuration data
3. **Batch Processing**: Process similar contract types together
4. **Asynchronous Processing**: Non-blocking calculations where possible

### Monitoring and Alerting
- **Performance Metrics**: Track calculation execution times
- **Error Monitoring**: Alert on calculation failures or data inconsistencies
- **Business Metrics**: Monitor revenue calculation accuracy and completeness

## Code Validation and Quality Assurance

### Validation Requirements
**Validation Scope**: All business rule calculations must be validated against existing Power Platform implementation

**Source Code Locations for Validation**:
- Management Agreement flows in Power Platform solution
- Billable accounts calculation logic in existing system
- Insurance and claims processing flows
- Profit share calculation implementations in current workflows

**Validation Process**: 
1. Compare documented calculation logic with actual Power Platform formula implementations
2. Ensure accuracy and completeness of business rule translations
3. Validate data flow and integration points
4. Confirm escalator logic consistency

### Testing Strategy
1. **Unit Testing**: Individual calculator testing with mock data
2. **Integration Testing**: Full calculation flow with real data scenarios
3. **Performance Testing**: Load testing with multiple sites and complex configurations
4. **User Acceptance Testing**: Business stakeholder validation of calculation results

## Related Documentation and Cross-References

- [Management Agreement Code Validation Report](../validation-reports/management-agreement-code-validation-report.md) ✓ VALIDATED
- [Billable Accounts Technical Specification](../../Future_State_Data_Product/technical/forecasting/20250718_Forecasting_BillableAccounts_TechnicalSpec.md) 🔄 REQUIRES_VALIDATION
- [Contract Configuration Guide](../../Future_State_Data_Product/configuration/contracts/) 🔄 REQUIRES_VALIDATION
- [Internal Revenue Calculation Patterns](../../Future_State_Data_Product/technical/backend/) 🔄 PLANNED
- [ETL Process Documentation](../../Future_State_Data_Product/technical/integrations/20250724_EDW_Integration_TechnicalSpec.md) 🔄 REQUIRES_VALIDATION
- [FIBO Financial Ontology Integration](../standards/fibo-financial-ontology-integration.md) 🔄 PLANNED

## Implementation Audit Trail

**Meeting Date**: July 2, 2025  
**Documentation Date**: August 6, 2025  
**Knowledge Corpus Integration**: August 7, 2025  
**Sprint Execution**: Sprint 28 (July 2025)  
**Code Validation Status**: Validated against Power Platform implementation  

**Key Decision Makers**:
- **Technical Architecture**: Andrew Scheuer, Cesar Figueroa
- **Business Requirements**: Jonathan Aulson
- **Implementation Team**: Javier Casas, Graham Olson, Christopher Thompson

**Quality Assurance**:
- **Technical Review**: Completed by technical lead
- **Business Validation**: Pending payroll type clarification
- **Code Validation**: Cross-referenced with Power Platform implementation

---

*This comprehensive meeting transcript captures the complete technical architecture and implementation strategy for the Management Agreement calculator system, ensuring all business logic, technical decisions, and implementation details are preserved for successful sprint execution and future system maintenance.*