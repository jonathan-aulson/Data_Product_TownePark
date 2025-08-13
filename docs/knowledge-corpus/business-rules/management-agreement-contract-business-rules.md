---
title: "Management Agreement Contract Business Rules"
description: "Comprehensive business rules and calculation logic for Management Agreement contracts including management fees, billable accounts, insurance calculations, claims processing, profit sharing, and support services"
created_date: "2025-08-08"
last_updated_date: "2025-08-08"
source_date: "2025-07-16"
version: "1.0"
status: Active
owner: "Towne Park Finance Team"
source_documents:
  - "new-project-assets/business-rules/contracts/20250716_Contracts_BusinessRules_Comprehensive.md"
discovery_metadata:
  discovered_date: "2025-08-08"
  discovery_method: "manual_transformation"
  confidence_score: 0.95
  validation_status: "pending"
  knowledge_graph_id: "management_agreement_business_rules"
systems:
  - Billing
  - PowerBill
  - Great Plains ERP
  - Payroll System
components:
  - Backend
  - Database
  - Calculation Engine
  - Integration Layer
business_domains:
  - Contract Management
  - Revenue Calculation
  - Financial Reporting
  - Management Agreement Processing
  - Billable Accounts
  - Insurance Calculations
  - Claims Processing
  - Profit Sharing
  - PTEB Processing
user_roles:
  - Billing Admin
  - Billing Manager
  - Account Manager
  - Regional Finance
  - Corporate Finance
  - Contract Administrator
relationships:
  - target: "revenue-share-contract-business-rules.md"
    type: "association"
    strength: 0.8
  - target: "../technical-specifications/towne-park-forecasting-system-comprehensive-master-architecture.md"
    type: "dependency"
    strength: 0.9
  - target: "../validation-reports/management-agreement-code-validation-report.md"
    type: "validation"
    strength: 1.0
governance:
  access_level: "internal"
  compliance_tags: ["SOX_Compliance", "Financial_Reporting", "Contract_Management"]
  policy_constraints: ["financial_data_governance", "audit_trail", "sox_controls"]
  policy_evaluation:
    evaluated_date: 2025-08-08
    applicable_policies: ["financial_data_policy", "sox_compliance_policy"]
    compliance_status: "compliant"
    required_approvals: ["financial_controller"]
    automatic_constraints: ["audit_trail", "dual_approval", "retention_7_years"]
policy_governance:
 governance_level: "enterprise"
 policy_type: "business_rules"
 policy_authority: "finance_team"
 enforcement_mechanism: "automated_validation"
 compliance_requirements: ["sox_compliance", "audit_trail", "dual_approval"]
 approval_workflow: "dual_approval_required"
 compliance_monitoring: "continuous"
 audit_frequency: "quarterly"
 risk_level: "high"
 escalation_criteria: "calculation_discrepancies"
 stakeholder_notification: "automatic"
enterprise_metadata:
 business_criticality: "high"
 data_sensitivity: "confidential"
 document_classification: "business_rules"
 security_level: "confidential"
 retention_period: "7_years"
 review_cycle: "quarterly"
 distribution_list: ["billing_admins", "financial_controllers", "contract_administrators"]
 compliance_frameworks: ["SOX", "GAAP", "financial_reporting"]
 change_control: "version_controlled"
 approval_authority: "finance_team"
 regulatory_scope: ["sox_compliance", "financial_reporting", "contract_law"]
 integration_complexity: "high"
 maintenance_frequency: "monthly"
 stakeholder_count: 12
 system_dependencies: ["PowerBill", "Great_Plains", "Payroll_System", "Dataverse"]
 performance_impact: "high"
fibo_classification:
  fibo_type: "fibo-fnd-agr-ctr:MasterAgreement"
  domain_extensions:
    towne_park_context: "management_agreement_contract"
    billable_accounts: "6000_7000_series_processing"
    profit_sharing: "tiered_profit_share_calculations"
    insurance_calculations: "5.77_percent_payroll_plus_vehicle"
    pteb_calculations: "payroll_tax_employee_benefits"
    support_services: "fixed_and_percentage_based_fees"
  regulatory_context: ["sox_compliance", "financial_reporting", "gaap_compliance"]
tags:
  - business-rules
  - management-agreement
  - billable-accounts
  - insurance-calculations
  - claims-processing
  - profit-sharing
  - pteb-calculations
  - support-services
  - financial-calculations
  - sox-compliance
---

# Management Agreement Contract Business Rules

## Overview

Management Agreement contracts represent one of the most complex contract types in Towne Park's billing system, requiring sophisticated calculations across multiple components including management fees, billable accounts, insurance, claims, profit sharing, and support services. These contracts typically involve comprehensive financial management where Towne Park provides full operational management services to client properties.

## Management Fee Calculation Rules

Management Agreements require a management fee calculated using one of three distinct methods, each with specific business rules and calculation logic.

### Fixed Fee Method

#### **Business Rule MA-001: Fixed Fee Calculation**
- **Definition**: Fixed monthly amount specified in contract
- **Application**: Same amount billed each month regardless of other factors
- **GL Mapping**: Always mapped to GL account #4790
- **Escalation**: Subject to annual escalation if configured
- **Use Case**: Contracts with predetermined management costs

#### **Calculation Formula**
```
Management Fee = Fixed Fee Amount (from contract)
```

#### **Example**
- Contract specifies: $15,000 monthly management fee
- Monthly billing: $15,000 (consistent each month)
- Annual total: $180,000

### Per Labor Hour Method

#### **Business Rule MA-002: Per Labor Hour Calculation**
- **Definition**: Labor hours multiplied by specified rates per job code
- **Calculation**: Total billable hours × applicable hourly rates
- **Rate Variation**: Different job codes can have different billing rates
- **GL Mapping**: Mapped to GL account #4790
- **Data Source**: Hours tracked in Legion workforce management system

#### **Calculation Formula**
```
Management Fee = Σ(Job Code Hours × Job Code Rate) for all billable job codes
```

#### **Job Code Rate Structure**
- **Manager**: Premium rate (typically $45-65/hour)
- **GSC (Guest Service Coordinator)**: Standard rate (typically $25-35/hour)
- **GSA (Guest Service Associate)**: Base rate (typically $18-25/hour)
- **Cashier**: Base rate (typically $16-22/hour)

#### **Example**
- Manager: 40 hours × $55/hour = $2,200
- GSC: 80 hours × $30/hour = $2,400
- GSA: 160 hours × $22/hour = $3,520
- **Total Management Fee**: $8,120

### Revenue Percentage Method

#### **Business Rule MA-003: Revenue Percentage Calculation**
- **Definition**: Specified percentage of total revenue
- **Calculation**: Total Revenue × Management Fee Percentage
- **Revenue Base**: Calculated from all applicable revenue streams
- **GL Mapping**: Mapped to GL account #4790
- **Typical Range**: 3-8% of total revenue

#### **Calculation Formula**
```
Management Fee = Total Revenue × Management Fee Percentage
```

#### **Example**
- Total Revenue: $500,000
- Management Fee Percentage: 5%
- **Management Fee**: $25,000

## Billable Accounts Rules

Management Agreements require Billable Accounts to be enabled with specific account series and inclusion/exclusion logic.

### Payroll Account Inclusion (6000-series)

#### **Business Rule MA-004: Payroll Account Configuration**
- **Configuration**: Payroll accounts can be marked as billable or excluded
- **Inclusion Logic**: Accounts marked `isEnabled: true` in payrollAccountsData are billable
- **Calculation**: Billable payroll is the sum of all enabled accounts
- **Revenue Integration**: Billable Accounts are only included in Internal Revenue when Management Agreement is enabled

#### **Standard 6000-Series Accounts**
- **6000**: Regular Payroll
- **6001**: Overtime Payroll
- **6002**: Holiday Pay
- **6003**: Vacation Pay
- **6004**: Sick Pay
- **6005**: Bonus Pay
- **6006**: Commission Pay
- **6007**: Training Pay

#### **Default Excluded Accounts**
- **6010**: PTO Hourly (excluded by default)
- **6014**: Other (excluded by default)

### Expense Account Inclusion (7000-series)

#### **Business Rule MA-005: Expense Account Configuration**
- **Configuration**: Expense accounts can be marked as billable or excluded
- **Inclusion Logic**: Accounts marked `isEnabled: true` in payrollExpenseAccountsData are billable
- **Calculation**: Billable expenses is the sum of all enabled accounts
- **Impact**: Directly affects profit share calculations when enabled

#### **Standard 7000-Series Accounts**
- **7001**: Office Supplies
- **7002**: Uniforms
- **7003**: Training Materials
- **7004**: Equipment Rental
- **7006**: Professional Services
- **7007**: Maintenance Supplies

#### **Default Excluded Accounts**
- **7005**: Bad Debt (excluded by default)
- **7016**: Contract Improvements (excluded by default)

## Insurance Calculation Rules

Insurance costs are calculated using two distinct methods with specific business rules for each approach.

### Fixed Fee Insurance

#### **Business Rule MA-006: Fixed Fee Insurance**
- **Definition**: Fixed monthly amount specified in contract
- **Application**: Same amount billed each month
- **Use Case**: Contracts with predetermined insurance costs
- **Escalation**: Subject to annual escalation if configured

#### **Calculation Formula**
```
Insurance Cost = Fixed Fee Amount (from contract)
```

### Based on Billable Accounts Insurance

#### **Business Rule MA-007: Percentage-Based Insurance Calculation**
- **Standard Rate**: 5.77% of payroll plus vehicle insurance
- **Calculation Components**:
  - Sum of billable insurance accounts (7080, 7082, 7085)
  - Plus insuranceAdditionalPercentage of these accounts
- **Vehicle Insurance**: Account 7082 specifically included
- **Additional Percentage**: Optional additional rate on billable accounts

#### **Calculation Formula**
```
Insurance Cost = (Billable Payroll × 5.77%) + Vehicle Insurance (7082) + (Billable Insurance Accounts × Additional Percentage)
```

#### **Insurance Account Breakdown**
- **7080**: General Liability Insurance
- **7082**: Vehicle Insurance (always included)
- **7085**: Workers Compensation Insurance

#### **Example Calculation**
- Billable Payroll: $100,000
- Base Insurance (5.77%): $5,770
- Vehicle Insurance (7082): $2,500
- Additional Percentage (2% of $8,270): $165
- **Total Insurance**: $8,435

## Claims Calculation Rules

Claims processing includes sophisticated capping mechanisms with different reset periods and enforcement logic.

### Claims Cap Application

#### **Business Rule MA-008: Claims Cap Enforcement**
- **Cap Amount**: Claims are capped based on claimsCapAmount specified in contract
- **Billing Logic**: When cap is reached, additional claims are not billable for remainder of period
- **Tracking**: Claims amounts tracked against cap throughout applicable period
- **Reset**: Cap resets based on configured reset period type

### Claims Type Reset Periods

#### **Annual Calendar Reset**
- **Period**: Cap resets on calendar year (January-December)
- **Application**: Claims tracked from January 1 through December 31
- **Reset Date**: January 1st of each year
- **Use Case**: Contracts aligned with calendar year budgeting

#### **Annual Anniversary Reset**
- **Period**: Cap resets on contract anniversary date
- **Application**: Claims tracked for 12 months from contract start date
- **Reset Date**: Contract anniversary date each year
- **Use Case**: Contracts with specific start dates requiring anniversary-based tracking

#### **Per Claim Reset**
- **Period**: Each individual claim has its own cap amount
- **Application**: Each claim evaluated independently against cap
- **Reset**: No reset - each claim stands alone
- **Use Case**: Contracts with per-incident claim limits

#### **Claims Account Codes**
- **7099**: General Claims
- **7100**: Property Damage Claims
- **7101**: Liability Claims
- **7102**: Workers Compensation Claims

#### **Example: Annual Calendar Cap**
- Annual Cap: $50,000
- Q1 Claims: $15,000 (billable)
- Q2 Claims: $20,000 (billable)
- Q3 Claims: $18,000 (billable, but only $15,000 under cap)
- Q4 Claims: $10,000 (not billable - cap reached)
- **Total Billable**: $50,000

## Profit Share Calculation Rules

Profit sharing represents the most complex calculation component, requiring integration of all other Management Agreement calculations.

### Profit Calculation Formula

#### **Business Rule MA-009: Profit Determination**
```
Profit = Revenue - Billable Expenses
```

#### **Revenue Components**
- External Revenue (from revenue share or other sources)
- Internal Revenue (from billable accounts and other internal sources)

#### **Billable Expense Components**
- Management Fees
- Insurance Costs
- Claims (subject to caps)
- Billable Accounts (6000/7000 series)
- Non-GL Billable Expenses
- Support Services

### Profit Share Determination

#### **Business Rule MA-010: Tiered Profit Share Calculation**
- **Tier Application**: Profit share tiers determine Towne Park's percentage of profit
- **Progressive Calculation**: Similar to Revenue Share, profit share uses progressive tier calculations
- **Threshold Structure**: Multiple tiers with increasing percentages

#### **Example Tier Structure**
- **Tier 1**: $0 - $50,000 profit = 20% to Towne Park
- **Tier 2**: $50,001 - $100,000 profit = 30% to Towne Park
- **Tier 3**: $100,001+ profit = 40% to Towne Park

#### **Progressive Calculation Example**
- Total Profit: $125,000
- Tier 1: $50,000 × 20% = $10,000
- Tier 2: $50,000 × 30% = $15,000
- Tier 3: $25,000 × 40% = $10,000
- **Total Profit Share**: $35,000

### Accumulation Types

#### **Monthly Accumulation**
- **Calculation**: Profit calculated and shared monthly
- **Reset**: Each month stands alone
- **Use Case**: Contracts requiring monthly profit distribution

#### **Annual Calendar Accumulation**
- **Calculation**: Profit accumulated and calculated on calendar year (January-December)
- **Reset**: January 1st of each year
- **Use Case**: Contracts aligned with calendar year business cycles

#### **Annual Anniversary Accumulation**
- **Calculation**: Profit accumulated and calculated on contract anniversary date
- **Reset**: Contract anniversary date each year
- **Use Case**: Contracts with specific start dates requiring anniversary-based calculations

### Non-GL Billable Expenses Integration

#### **Business Rule MA-011: Non-GL Expense Impact on Profit**
- **Integration**: Non-GL Billable Expenses are included in profit calculation as expenses
- **Impact**: These expenses reduce the profit amount before profit share percentage is applied
- **Dual Effect**: Expenses appear both as invoice line items and in profit calculations

## Non-GL Billable Expenses Rules

Non-GL Billable Expenses provide additional billing flexibility for costs not captured in standard GL accounts.

### Calculation Methods

#### **Fixed Amount Method**
- **Definition**: Specific dollar amount per billing period
- **Application**: Same amount billed each period
- **Use Case**: Predetermined costs like equipment leases

#### **Percentage of Payroll Method**
- **Definition**: Calculated as percentage of total or billable payroll
- **Payroll Types**:
  - **Billable Payroll**: Percentage of enabled 6000-series accounts only
  - **Total Payroll**: Percentage of all payroll accounts
- **Use Case**: Costs that scale with labor

#### **Percentage of Revenue Method**
- **Definition**: Calculated as percentage of total revenue
- **Revenue Base**: All revenue sources included
- **Use Case**: Costs that scale with business volume

### Billing Lifecycle

#### **Business Rule MA-012: Non-GL Expense Lifecycle**
- **End Date Handling**: May have an end date (finalPeriodbilled) after which they stop billing
- **Dual Impact**: Included both as invoice line items and in profit calculations
- **Profit Share Integration**: When Profit Share is enabled, these expenses reduce the profit amount

#### **Example Non-GL Expenses**
- **Equipment Lease**: $2,500 fixed monthly
- **Technology Fee**: 2% of revenue
- **Administrative Support**: 3% of billable payroll

## Payroll Tax Calculation (PTEB) Rules

PTEB (Payroll Tax, Employee Benefits) calculations support both actual and estimated methods.

### Actual Method

#### **Business Rule MA-013: Actual PTEB Calculation**
- **Definition**: Bills actual payroll tax expense from accounting system
- **Data Source**: Actual payroll tax amounts from financial records
- **Accuracy**: Reflects true payroll tax costs
- **Use Case**: When actual amounts are available and preferred

### Percentage Method

#### **Business Rule MA-014: Percentage PTEB Calculation**
- **Definition**: Bills payrollTaxesPercentage of billable payroll
- **Calculation**: Billable Payroll × Payroll Tax Percentage
- **Standard Rate**: Typically 15-25% of payroll
- **Use Case**: When actual amounts are not available or for simplified billing

#### **PTEB Account Components**
- **6200**: Payroll Taxes
- **6399**: Health Insurance Allocation
- **6500**: Workers Compensation Insurance

#### **Calculation Formula**
```
PTEB Amount = Billable Payroll × PTEB Percentage
```

## Support Services Calculation Rules

Support services provide additional revenue streams for administrative and operational support.

### Fixed Support Services

#### **Business Rule MA-015: Fixed Support Services**
- **Definition**: Bills fixed amount (payrollSupportAmount)
- **Application**: Same amount billed each period regardless of payroll fluctuations
- **Use Case**: Predetermined support costs

### Percentage Support Services

#### **Business Rule MA-016: Percentage-Based Support Services**
- **Billable Payroll Type**: Bills percentage of billable payroll only
  - Calculation: Billable Payroll × Support Services Percentage
- **Total Payroll Type**: Bills percentage of total payroll
  - Calculation: Total Payroll × Support Services Percentage
- **Configuration**: Determined by payrollSupportPayrollType setting

#### **Support Service Types**
- **Administrative Support**: Back-office functions
- **Technology Support**: IT and system support
- **Training Services**: Employee development
- **Operational Consulting**: Process improvement

#### **Example Calculations**
- **Fixed**: $5,000 monthly administrative support
- **Percentage of Billable**: 8% × $100,000 billable payroll = $8,000
- **Percentage of Total**: 6% × $150,000 total payroll = $9,000

## General Ledger Account Mapping

### Standard GL Account Mappings

#### **Management Agreement Components**
- **GL Account #4791**: Management Agreement fees and related charges
- **Rationale**: Separate from other contract types for financial reporting clarity

#### **Component-Specific Mapping**
- **Management Fees**: GL Account #4791
- **Insurance Costs**: GL Account #4791
- **Claims**: GL Account #4791
- **Support Services**: GL Account #4791
- **PTEB**: GL Account #4791

## Escalation Rules

### Management Fee Escalation

#### **Business Rule MA-017: Management Fee Rate Increases**
- **Trigger**: When incrementAmount > 0, rates increase by that percentage in incrementMonth
- **Application Scope**: Applies to Fixed Fee and Per Labor Hour management fees
- **Timing**: Escalation occurs in the specified increment month
- **CPI Integration**: When consumerPriceIndex is true, escalation based on CPI changes

### Insurance Escalation

#### **Business Rule MA-018: Insurance Rate Escalation**
- **Fixed Fee Insurance**: Subject to same escalation rules as management fees
- **Percentage-Based Insurance**: Base percentage may be escalated annually
- **Vehicle Insurance**: Actual costs from GL account 7082

### Support Services Escalation

#### **Business Rule MA-019: Support Services Escalation**
- **Fixed Support Services**: Subject to annual escalation
- **Percentage Support Services**: Base percentage may be escalated
- **Timing**: Typically aligned with management fee escalation dates

## Validation and Business Rules

### Data Completeness Validation

#### **Business Rule MA-020: Required Configuration Elements**
- **Management Fee**: Must specify calculation method and parameters
- **Billable Accounts**: Must define enabled/disabled account lists
- **Insurance**: Must specify calculation method (fixed or percentage)
- **Claims**: Must define cap type and amounts if claims enabled
- **Profit Share**: Must define accumulation type and tiers if enabled

### Calculation Accuracy Validation

#### **Business Rule MA-021: Mathematical Consistency**
- **Sum Validation**: All components must sum to total Management Agreement amount
- **Escalator Application**: Escalators applied correctly by date
- **Account Exclusions**: Excluded accounts properly omitted from calculations
- **Cap Enforcement**: Claims caps properly enforced by period type

### Monthly Calculation Consistency

#### **Business Rule MA-022: Period-Based Calculations**
- **Escalator Timing**: Escalators only affect periods on or after effective date
- **Cap Reset Validation**: Claims caps reset properly based on configured type
- **Accumulation Periods**: Profit share accumulation follows configured period type

## Integration Requirements

### PowerBill Integration

#### **Data Synchronization**
- **Contract Details**: Management Agreement configuration
- **Account Mappings**: Billable account enabled/disabled status
- **Rate Tables**: Management fee rates and escalation schedules
- **Calculation Results**: Monthly calculation outputs

### Great Plains ERP Integration

#### **Financial Posting**
- **GL Account Mapping**: All components post to appropriate GL accounts
- **Journal Entries**: Detailed breakdown by calculation component
- **Audit Trail**: Complete transaction history for SOX compliance

### Payroll System Integration

#### **Data Requirements**
- **Hours Data**: Actual hours by job code for Per Labor Hour calculations
- **Payroll Totals**: Billable and total payroll amounts
- **PTEB Actuals**: Actual payroll tax and benefit costs when using actual method

## Compliance and Audit Requirements

### SOX Compliance

#### **Business Rule MA-023: SOX Controls**
- **Segregation of Duties**: Different users for setup vs. approval
- **Dual Approval**: Management Agreement changes require dual approval
- **Audit Trail**: Complete history of all configuration and calculation changes
- **Documentation**: Supporting documentation for all calculation components

### Financial Reporting

#### **Business Rule MA-024: GAAP Compliance**
- **Revenue Recognition**: Management fees recognized when earned
- **Expense Matching**: Billable expenses matched to appropriate periods
- **Profit Share**: Recognized based on accumulation period type
- **Disclosure**: Adequate disclosure of calculation methods in financial statements

## Error Handling and Exception Processing

### Configuration Errors

#### **Missing Configuration**
- **Response**: Display specific error messages identifying missing elements
- **Guidance**: Provide configuration requirements and examples
- **Escalation**: Route to appropriate administrator for resolution

### Calculation Errors

#### **Data Validation Failures**
- **Validation Checks**:
  - Non-negative values for hours and amounts
  - Valid date ranges for escalators
  - Proper account number formats
  - Percentage values within valid ranges (0-100%)

### Business Logic Exceptions

#### **Claims Cap Exceeded**
- **Detection**: Monitor claims against configured caps
- **Action**: Stop billing additional claims when cap reached
- **Notification**: Alert billing administrators of cap status

#### **Profit Share Negative**
- **Detection**: Monitor for negative profit calculations
- **Action**: Set profit share to zero (no negative sharing)
- **Investigation**: Flag for business review of expense levels

## Performance and Scalability

### Calculation Optimization

#### **Batch Processing**
- **Monthly Calculations**: Process all sites in optimized batches
- **Parallel Processing**: Calculate independent components simultaneously
- **Caching**: Cache frequently accessed configuration data

### Data Volume Management

#### **Historical Data**
- **Retention**: Maintain 7 years of calculation history for audit
- **Archival**: Archive older data to maintain performance
- **Retrieval**: Efficient access to historical calculations for analysis

## Related Documentation

- [Revenue Share Contract Business Rules](revenue-share-contract-business-rules.md) ✓ VERIFIED
- [Towne Park Forecasting System Architecture](../technical-specifications/towne-park-forecasting-system-comprehensive-master-architecture.md) ✓ VERIFIED
- [Management Agreement Code Validation Report](../validation-reports/management-agreement-code-validation-report.md) 🔄 PLANNED
- [Contract Escalation Rules](contract-escalation-rules.md) 🔄 PLANNED
- [Billable Accounts Configuration Guide](../configuration/billable-accounts-setup.md) 🔄 PLANNED
- [PTEB Calculation Technical Specification](../technical-specifications/pteb-calculation-spec.md) 🔄 PLANNED
- [Profit Share Tier Configuration](../configuration/profit-share-setup.md) 🔄 PLANNED
- [GL Account Mapping Guide](../technical-specifications/gl-account-mapping.md) 🔄 PLANNED

## Quick Links

- [Revenue Share Business Rules](revenue-share-contract-business-rules.md)
- [Forecasting System Architecture](../technical-specifications/towne-park-forecasting-system-comprehensive-master-architecture.md)
- [Management Agreement Validation Report](../validation-reports/management-agreement-code-validation-report.md)