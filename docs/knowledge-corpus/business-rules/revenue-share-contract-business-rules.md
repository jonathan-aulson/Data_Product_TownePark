---
title: "Revenue Share Contract Business Rules"
description: "Comprehensive business rules and specifications for revenue share contract types, including calculation methods, validation rules, implementation guidelines, and Power Platform formula validation"
created_date: "2025-07-28"
last_updated_date: "2025-08-11"
version: "1.2"
status: "Production"
owner: "Contract Management Team"
discovery_metadata:
  discovered_date: "2025-08-08"
  discovery_method: "manual_transformation"
  confidence_score: 0.92
  validation_status: "code_validated"
  knowledge_graph_id: "revenue_share_contract_business_rules"
  code_validation_date: "2025-08-11"
  code_validation_confidence: 0.92
systems:
  - "Contracts"
  - "Billing"
  - "Revenue Management"
  - "PowerBill"
  - "Power Platform"
components:
  - "Contract Management"
  - "Revenue Calculation Engine"
  - "Billing System"
  - "Power Platform Formulas"
business_domains:
  - "Contract Management"
  - "Revenue Share Contracts"
  - "Revenue Calculation"
  - "Billing Operations"
  - "Financial Management"
user_roles:
  - "Contract Administrator"
  - "Billing Admin"
  - "Account Manager"
  - "Financial Controller"
  - "Revenue Analyst"
relationships:
  - target: "contract-types-overview.md"
    type: "composition"
    strength: 0.9
  - target: "billing-business-rules.md"
    type: "dependency"
    strength: 0.85
  - target: "contract-configuration-business-rules.md"
    type: "association"
    strength: 0.8
  - target: "management-agreement-contract-business-rules.md"
    type: "association"
    strength: 0.75
  - target: "../validation-reports/revenue-share-contract-code-validation-report.md"
    type: "validation"
    strength: 1.0
governance:
  access_level: "internal"
  compliance_tags: ["Contract_Management", "Revenue_Processing", "Financial_Calculations"]
  policy_constraints: ["data_accuracy", "calculation_validation", "audit_trail"]
  policy_evaluation:
    evaluated_date: "2025-08-08"
    applicable_policies: ["financial_data_policy", "contract_management_policy"]
    compliance_status: "compliant"
    required_approvals: ["contract_administrator", "financial_controller"]
    automatic_constraints: ["calculation_validation", "audit_logging", "data_retention"]
policy_governance:
  governance_level: "enterprise"
  policy_type: "business_rules"
  policy_authority: "contract_management_team"
  enforcement_mechanism: "automated_validation"
  compliance_requirements: ["calculation_accuracy", "audit_trail", "approval_workflow"]
  approval_workflow: "dual_approval_required"
  compliance_monitoring: "continuous"
  audit_frequency: "quarterly"
  risk_level: "medium"
  escalation_criteria: "calculation_discrepancies"
  stakeholder_notification: "automatic"
enterprise_metadata:
  business_criticality: "high"
  data_sensitivity: "confidential"
  document_classification: "business_rules"
  security_level: "confidential"
  retention_period: "7_years"
  review_cycle: "quarterly"
  distribution_list: ["contract_administrators", "billing_admins", "financial_controllers"]
  compliance_frameworks: ["SOX", "revenue_recognition", "contract_law"]
  change_control: "version_controlled"
  approval_authority: "contract_management_team"
  regulatory_scope: ["revenue_recognition", "contract_law", "hospitality_regulations"]
  integration_complexity: "high"
  maintenance_frequency: "monthly"
  stakeholder_count: 8
  system_dependencies: ["PowerBill", "Power_Platform", "Great_Plains", "Hotel_PMS"]
  performance_impact: "high"
fibo_classification:
  fibo_type: "fibo-fnd-agr-ctr:BilateralContract"
  domain_extensions:
    towne_park_context: "revenue_share_contract"
    calculation_method: "percentage_based_revenue_sharing"
    validation_rules: "progressive_tier_calculations"
    revenue_codes: ["SD1", "SD2", "VD1", "VD2", "VO1", "VO2", "OR1", "OR2"]
    collection_model: "deposited_revenue_processing"
    regulatory_context: ["hospitality_regulations", "revenue_recognition"]
tags:
  - "contracts"
  - "revenue-share"
  - "business-rules"
  - "billing"
  - "revenue-calculation"
  - "percentage-based"
  - "power-platform"
  - "formula-validation"
---

# Revenue Share Contract Business Rules

## Overview

This document contains comprehensive business rules and specifications for revenue share contract types within the Towne Park financial systems. Revenue share contracts represent agreements where Towne Park receives a percentage of the total revenue generated from parking operations or other revenue-generating activities.

**Key Characteristics:**
- Percentage-based compensation structure
- Progressive tier calculations for revenue thresholds
- Multiple revenue code classifications (SD1/SD2, VD1/VD2, VO1/VO2, OR1/OR2)
- Deposited revenue vs. client collection models
- Power Platform formula implementation with validation

## Contract Definition

### Revenue Share Contract Characteristics

**Primary Features:**
- **Percentage-Based Compensation**: Towne Park receives a predetermined percentage of gross revenue
- **Revenue Categories**: Different revenue streams with potentially different percentages
- **Minimum Guarantees**: Optional minimum payment guarantees regardless of revenue
- **Revenue Reporting**: Regular revenue reporting and validation requirements
- **Progressive Tiers**: Escalating percentages based on revenue thresholds

**Advanced Features:**
- **Bell Service Integration**: Special handling for OR1/OR2 revenue codes
- **Vehicle Count Validation**: Integration with hotel PMS systems for occupancy verification
- **Deposited Revenue Processing**: Automated handling of client-collected vs. Towne Park-collected revenue
- **Threshold Structures**: Complex tier calculations with multiple breakpoints

### Contract Components

**Core Components:**
- **Base Percentage**: Core revenue share percentage
- **Tiered Percentages**: Different percentages based on revenue thresholds
- **Revenue Categories**: Specific revenue types included/excluded
- **Minimum Guarantees**: Guaranteed minimum payments

**Extended Components:**
- **Revenue Code Mappings**: SD1/SD2 (daily parking), VD1/VD2 (valet daily), VO1/VO2 (valet overnight), OR1/OR2 (bell services)
- **Collection Model Configuration**: Deposited revenue vs. client collection processing
- **Threshold Tier Structures**: Progressive percentage increases at defined revenue levels
- **Bell Service Integration Rules**: Special processing for ancillary revenue streams

## Business Rules

### Core Revenue Share Calculation Rules

- **Rule RS-001**: Revenue share = Gross Revenue × Revenue Share Percentage
- **Rule RS-002**: Owner percentage = 100% - Towne Park percentage (with zero floor protection)
- **Rule RS-003**: Minimum guarantee applies when calculated share is below minimum
- **Rule RS-004**: Revenue categories are calculated separately if different percentages apply

### Progressive Tier Calculation Rules

- **Rule RS-005**: Progressive tiers apply incremental percentage increases at defined thresholds
- **Rule RS-006**: IF monthly_revenue > $50K THEN base_rate + 2% tier adjustment
- **Rule RS-007**: IF monthly_revenue > $100K THEN base_rate + 5% tier adjustment
- **Rule RS-008**: Tier calculations are cumulative and apply to revenue within each tier range

### Revenue Code Processing Rules

- **Rule RS-009**: SD1/SD2 revenue codes processed as daily parking revenue
- **Rule RS-010**: VD1/VD2 revenue codes processed as valet daily service revenue
- **Rule RS-011**: VO1/VO2 revenue codes processed as valet overnight service revenue
- **Rule RS-012**: OR1/OR2 revenue codes processed as bell service revenue with special integration

### Revenue Recognition Rules

- **Rule RS-013**: Only contracted revenue categories are included in calculations
- **Rule RS-014**: Revenue must be validated and verified before calculation
- **Rule RS-015**: Adjustments and refunds are deducted from gross revenue
- **Rule RS-016**: Revenue is recognized in the period it is earned

### Deposited Revenue Processing Rules

- **Rule RS-017**: Deposited revenue model: Towne Park collects and remits owner portion
- **Rule RS-018**: Client collection model: Client collects and remits Towne Park portion
- **Rule RS-019**: Collection model determines revenue processing workflow and timing
- **Rule RS-020**: Revenue validation requirements vary by collection model

### Validation Rules

- **Rule RS-021**: Revenue share percentage must be between 0% and 100%
- **Rule RS-022**: Owner percentage calculation must include zero floor protection
- **Rule RS-023**: Minimum guarantees cannot exceed maximum possible revenue share
- **Rule RS-024**: All revenue must be supported by documentation
- **Rule RS-025**: Vehicle count validation required for occupancy-based calculations

## Implementation Guidelines

### Contract Setup Configuration

**Primary Setup:**
- Define revenue share percentages for each revenue category
- Establish tiered percentage structures if applicable
- Configure minimum guarantee amounts and terms
- Set up revenue reporting and validation procedures

**Advanced Setup:**
- Configure revenue code mappings (SD1/SD2/VD1/VD2/VO1/VO2/OR1/OR2)
- Set up progressive tier threshold structures
- Configure deposited revenue vs. client collection processing
- Establish bell service integration parameters

### Revenue Tracking Configuration

**Standard Configuration:**
- Configure revenue category definitions and tracking
- Set up automated revenue data collection
- Implement revenue validation and verification procedures
- Establish reporting cycles and deadlines

**Advanced Configuration:**
- Configure hotel PMS integration for vehicle count validation
- Set up revenue code classification and processing rules
- Implement deposited revenue processing workflows
- Configure bell service revenue integration (OR1/OR2 handling)

### Calculation Configuration

**Core Calculation Setup:**
- Configure automated revenue share calculations
- Set up tiered percentage calculation logic
- Implement minimum guarantee comparison and application
- Establish calculation validation and review procedures

**Advanced Calculation Setup:**
- Configure progressive tier calculation algorithms
- Set up revenue code-specific calculation rules
- Implement collection model-specific processing logic
- Configure Power Platform formula integration

## Revenue Categories and Code Classifications

### Primary Revenue Categories

**Daily Parking Revenue:**
- **SD1**: Standard Daily Parking - Tier 1
  - Calculation method: daily_rate_tier_1
  - Validation rules: positive_amount_daily_frequency
  - Business impact: primary_daily_revenue_stream

- **SD2**: Standard Daily Parking - Tier 2
  - Calculation method: daily_rate_tier_2
  - Validation rules: positive_amount_daily_frequency
  - Business impact: secondary_daily_revenue_stream

**Valet Service Revenue:**
- **VD1**: Valet Daily Service - Tier 1
  - Calculation method: valet_daily_rate_tier_1
  - Validation rules: positive_amount_service_validation
  - Business impact: premium_service_revenue

- **VD2**: Valet Daily Service - Tier 2
  - Calculation method: valet_daily_rate_tier_2
  - Validation rules: positive_amount_service_validation
  - Business impact: premium_service_revenue_tier_2

- **VO1**: Valet Overnight Service - Tier 1
  - Calculation method: valet_overnight_rate_tier_1
  - Validation rules: positive_amount_overnight_validation
  - Business impact: extended_service_revenue

- **VO2**: Valet Overnight Service - Tier 2
  - Calculation method: valet_overnight_rate_tier_2
  - Validation rules: positive_amount_overnight_validation
  - Business impact: extended_service_revenue_tier_2

**Bell Service Revenue:**
- **OR1**: Other Revenue - Bell Service Tier 1
  - Calculation method: bell_service_rate_tier_1
  - Validation rules: positive_amount_service_validation
  - Business impact: ancillary_service_revenue
  - Integration notes: Special handling for bell service integration

- **OR2**: Other Revenue - Bell Service Tier 2
  - Calculation method: bell_service_rate_tier_2
  - Validation rules: positive_amount_service_validation
  - Business impact: ancillary_service_revenue_tier_2
  - Integration notes: Special handling for bell service integration

### Secondary Revenue Categories

**Monthly Parking:**
- **SM1**: Standard Monthly Parking - Tier 1
- **SM2**: Standard Monthly Parking - Tier 2

**Event and Validation Revenue:**
- Event Parking: Special event parking revenue
- Validation Revenue: Parking validation revenue
- Ancillary Services: Additional service revenue

### Excluded Revenue Categories

- **Capital Improvements**: Revenue from capital asset sales
- **Insurance Proceeds**: Insurance claim proceeds
- **Tax Refunds**: Government tax refunds
- **Interest Income**: Investment interest income

## Progressive Tier Structures

### Standard Tier Configuration

**Tier 1: Base Revenue (0 - $50,000)**
- Base percentage applies
- No tier adjustment
- Standard processing rules

**Tier 2: Growth Revenue ($50,001 - $100,000)**
- Base percentage + 2% adjustment
- Progressive calculation applies
- Enhanced validation requirements

**Tier 3: Premium Revenue ($100,001+)**
- Base percentage + 5% adjustment
- Maximum tier benefits
- Comprehensive audit requirements

### Tier Calculation Methodology

**Progressive Calculation Example:**
```
Monthly Revenue: $120,000
Base Rate: 15%

Tier 1 (0-50K): $50,000 × 15% = $7,500
Tier 2 (50K-100K): $50,000 × 17% = $8,500
Tier 3 (100K+): $20,000 × 20% = $4,000
Total Revenue Share: $20,000
```

### Collection Model Processing

**Deposited Revenue Model:**
- Towne Park collects all revenue
- Calculates owner portion
- Remits owner percentage to client
- Retains Towne Park percentage

**Client Collection Model:**
- Client collects all revenue
- Calculates Towne Park portion
- Remits Towne Park percentage
- Retains owner portion

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

## Revenue Validation and Compliance

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

## Integration Points

### PowerBill System Integration
- Contract configuration and setup
- Revenue data collection and processing
- Calculation engine integration
- Statement generation and distribution

### Hotel PMS Integration
- Occupancy data validation
- Vehicle count verification
- Revenue validation cross-checks
- Real-time data synchronization

### Power Platform Integration
- Formula-based calculations
- Workflow automation
- Approval processes
- Audit trail generation

### Great Plains ERP Integration
- Financial posting and reconciliation
- General ledger integration
- Accounts receivable processing
- Financial reporting

## Related Documentation

- [Contract Types Overview](contract-types-overview.md)
- [Management Agreement Contract Business Rules](management-agreement-contract-business-rules.md)
- [Contract Configuration Business Rules](../contracts/contract-configuration-business-rules.md)
- [Billing Business Rules](../billing/billing-business-rules.md)
- [Revenue Management Business Rules](../billing/revenue-management-business-rules.md)
- [Contract Configuration Setup](../../configuration/contracts/contract-configuration-setup.md)
- [Revenue Share Contract Code Validation Report](../validation-reports/revenue-share-contract-code-validation-report.md)

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-07-28 | Initial creation of revenue share contract business rules |
| 1.1 | 2025-08-08 | Enhanced with progressive tiers, revenue codes, collection models, Power Platform integration, and comprehensive validation rules |