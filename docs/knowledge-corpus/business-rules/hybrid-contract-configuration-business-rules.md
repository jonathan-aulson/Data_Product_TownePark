---
title: "Hybrid Contract Configuration Business Rules"
description: "Comprehensive business rules and calculation formulas for hybrid contract configurations combining multiple billing models including Fixed Fee + Per Labor Hour, Revenue Share + Per Labor Hour, and complex multi-component arrangements with advanced features like invoice grouping and mid-month advances"
created_date: "2025-07-24"
last_updated_date: "2025-08-08"
version: "1.1"
status: "Production"
owner: "Contract Management Team"
discovery_metadata:
  discovered_date: "2025-08-08"
  discovery_method: "manual_transformation"
  confidence_score: 0.98
  validation_status: "validated"
  knowledge_graph_id: "hybrid_contract_configuration_business_rules"
systems:
  - "Contracts"
  - "Billing"
  - "PowerBill"
  - "Power Platform"
  - "Revenue Management"
components:
  - "Contract Management"
  - "Invoice Generation"
  - "Revenue Calculation"
  - "Multi-Component Billing"
  - "Invoice Grouping"
business_domains:
  - "Contract Management"
  - "Hybrid Contracts"
  - "Multi-Component Billing"
  - "Revenue Calculation"
  - "Fixed Fee"
  - "Per Labor Hour"
  - "Revenue Share"
  - "Billable Expense Accounts"
  - "Invoice Grouping"
  - "Mid Month Advance"
  - "Deposited Revenue"
user_roles:
  - "Contract Administrator"
  - "Billing Admin"
  - "Account Manager"
  - "Regional Finance"
  - "Financial Controller"
  - "Revenue Analyst"
relationships:
  - target: "revenue-share-contract-business-rules.md"
    type: "composition"
    strength: 0.9
  - target: "fixed-fee-contract-configuration-business-rules.md"
    type: "composition"
    strength: 0.9
  - target: "per-labor-hour-contract-configuration-business-rules.md"
    type: "composition"
    strength: 0.9
  - target: "management-agreement-contract-configuration-business-rules.md"
    type: "composition"
    strength: 0.8
  - target: "../validation-reports/hybrid-contract-configuration-code-validation-report.md"
    type: "validation"
    strength: 1.0
governance:
  access_level: "internal"
  compliance_tags: ["Contract_Management", "Multi_Component_Billing", "Financial_Calculations", "Invoice_Processing"]
  policy_constraints: ["data_accuracy", "calculation_validation", "audit_trail", "component_segregation"]
  policy_evaluation:
    evaluated_date: "2025-08-08"
    applicable_policies: ["financial_data_policy", "contract_management_policy", "multi_component_billing_policy"]
    compliance_status: "compliant"
    required_approvals: ["contract_administrator", "financial_controller", "billing_manager"]
    automatic_constraints: ["calculation_validation", "audit_logging", "data_retention", "component_validation"]
policy_governance:
  governance_level: "enterprise"
  policy_type: "business_rules"
  policy_authority: "contract_management_team"
  enforcement_mechanism: "automated_validation"
  compliance_requirements: ["calculation_accuracy", "audit_trail", "approval_workflow", "component_segregation"]
  approval_workflow: "dual_approval_required"
  compliance_monitoring: "continuous"
  audit_frequency: "quarterly"
  risk_level: "high"
  escalation_criteria: ["calculation_discrepancies", "component_conflicts", "invoice_grouping_errors"]
  stakeholder_notification: "automatic"
enterprise_metadata:
  business_criticality: "high"
  data_sensitivity: "confidential"
  document_classification: "business_rules"
  security_level: "confidential"
  retention_period: "7_years"
  review_cycle: "quarterly"
  distribution_list: ["contract_administrators", "billing_admins", "financial_controllers", "regional_finance"]
  compliance_frameworks: ["SOX", "revenue_recognition", "contract_law", "multi_component_billing"]
  change_control: "version_controlled"
  approval_authority: "contract_management_team"
  regulatory_scope: ["revenue_recognition", "contract_law", "hospitality_regulations", "billing_standards"]
  integration_complexity: "very_high"
  maintenance_frequency: "monthly"
  stakeholder_count: 12
  system_dependencies: ["PowerBill", "Power_Platform", "Great_Plains", "Hotel_PMS", "Legion_Workforce"]
  performance_impact: "high"
fibo_classification:
  fibo_type: "fibo-fnd-agr-ctr:ComplexContract"
  domain_extensions:
    towne_park_context: "hybrid_contract_configuration"
    calculation_method: "multi_component_billing_combination"
    validation_rules: "component_specific_validation"
    billing_components: ["fixed_fee", "per_labor_hour", "revenue_share", "billable_accounts"]
    advanced_features: ["invoice_grouping", "mid_month_advance", "deposited_revenue"]
    regulatory_context: ["hospitality_regulations", "revenue_recognition", "multi_component_compliance"]
tags:
  - "contracts"
  - "hybrid-contracts"
  - "business-rules"
  - "billing-calculations"
  - "contract-configuration"
  - "multi-component-billing"
  - "invoice-grouping"
  - "advanced-features"
  - "power-platform"
---

# Hybrid Contract Configuration Business Rules

## Overview

Hybrid contracts represent the most complex billing arrangements in Towne Park's contract portfolio, combining multiple billing models within a single contract to accommodate diverse customer requirements. These contracts demonstrate the flexibility of the PowerBill system to handle sophisticated billing scenarios that require multiple revenue streams, different calculation methods, and advanced features like invoice grouping and mid-month advances.

**Business Context**: Hybrid contracts are typically used for large, complex customer sites that require multiple service types with different billing models. They allow Towne Park to provide comprehensive service packages while maintaining clear billing separation and accurate revenue attribution.

**Key Characteristics:**
- Multi-component billing combining 2+ billing models
- Advanced invoice grouping for separate billing streams
- Component-specific escalation schedules
- Complex validation and compliance requirements
- Integration with multiple system components

## Hybrid Contract Types and Patterns

### **Pattern 1: Fixed Fee + Per Labor Hour Combination**
**Most Common Hybrid Pattern** - Used for sites requiring both guaranteed service levels and variable labor components.

#### **Business Rule: FF-PLH-001 - Fixed Fee Base Service with Variable Labor**
- **Description**: Combines guaranteed monthly service fees with hourly billing for additional or specialized labor
- **Applies To**: Medical centers, hospitals, and facilities requiring both base service guarantees and flexible staffing
- **Calculation Formula**: 
  ```
  Monthly Invoice Total = Fixed Fee Amount + (Labor Hours × Hourly Rate)
  ```
- **Implementation**: Both components bill to same invoice group unless otherwise specified
- **Edge Cases**: 
  - Fixed fee components may have different escalation schedules than labor hour components
  - Labor hour components may include overtime calculations
  - Some sites bill fixed insurance separately from variable labor costs

#### **Representative Examples**:

**Site 0338 - Baltimore Washington Medical Center**:
- **Fixed Fee Component**: Account Manager Fee = $7,096.27 (Code 4715)
- **Per Labor Hour Components**:
  - GSA: $25.03 regular / $37.55 overtime
  - GSC: $25.03 regular / $37.55 overtime  
  - Additional GSA (GARAGE): $25.03 regular / $37.55 overtime
- **Escalation**: 3% annual increase in July
- **Payment Terms**: 45 days

**Site 0487 - OSF Saint Francis Medical Center**:
- **Fixed Fee Component**: Shuttle Insurance = $3,125.00 (Code 4705)
- **Per Labor Hour Components**:
  - Manager (ACCTMGR): $23.21
  - Assistant Manager (ASSOCM): $21.99
  - GSA: $20.54
  - GSC: $21.99
  - Inside Shuttle Driver (SHUTL1): $20.54
  - Outside Shuttle Driver (SHUTL2): $21.99
  - Traffic Controller (TRAFFIC): $20.54
- **Escalation**: 3% annual increase in January
- **Special Notes**: Shuttle billing changed to ledger-based vs. AM reports per Finance confirmation

**Site 0534 - Nebraska Methodist Hospital**:
- **Fixed Fee Component**: Valet Services = $38,642.00 (Code 4700)
- **Per Labor Hour Component**: Additional Services (GSA3) = $19.95
- **Escalation**: No automatic escalation configured
- **Payment Terms**: 30 days

### **Pattern 2: Revenue Share + Per Labor Hour with Advanced Features**
**Complex Multi-Component Pattern** - Used for high-volume sites requiring both revenue participation and specialized labor billing.

#### **Business Rule: RS-PLH-001 - Revenue Share with Separated Labor Billing**
- **Description**: Revenue share for parking operations with separate per labor hour billing for specialized services
- **Applies To**: Large hotels and resorts with significant parking revenue and specialized service requirements
- **Calculation Formula**:
  ```
  Revenue Share Amount = (Qualifying Revenue × Share Percentage) - Validation Threshold
  Labor Hour Amount = Σ(Job Hours × Job Rate) by Job Code
  Total Invoice = Revenue Share Amount + Labor Hour Amount + Mid Month Advance + Other Components
  ```
- **Implementation**: Requires invoice grouping to separate revenue share from labor hour billing
- **Edge Cases**:
  - Mid-month advances affect cash flow timing
  - Deposited revenue handling requires special tax considerations
  - Different escalation schedules for labor rates vs. revenue share percentages

#### **Representative Example**:

**Site 0429 - Anaheim Marriott**:
- **Revenue Share Component**:
  - Share Percentage: 24% (flat rate)
  - Accumulation Type: Monthly
  - Validation Threshold: 3% of revenue
  - Revenue Codes: All standard parking codes (ADJ, OR1-3, SD1-3, SM1-3, SO1-3, VD1-3, VM1-3, VO1-3)
  - Invoice Group: 1 ("Rev Share")
- **Per Labor Hour Components**:
  - Bell (BELL): $24.84 regular and overtime
  - Room Steward (ROOMSTEW): $26.00 regular / $32.50 overtime
  - Invoice Group: 2 ("PLH")
- **Advanced Features**:
  - Mid Month Advance: $30,000 (Invoice Group 1)
  - Deposited Revenue: Enabled (Invoice Group 1)
  - Invoice Grouping: Separate invoices for Rev Share vs. PLH
- **Escalation**: Bell PLH rate increases 2.5% annually on January 1st
- **Special Notes**: 2025 rate catch-up implemented - Bell rate increased to $24.84

### **Pattern 3: Fixed Fee + Revenue Share + Billable Accounts**
**Comprehensive Service Pattern** - Used for sites requiring guaranteed services, revenue participation, and expense reimbursement.

#### **Business Rule: FF-RS-BA-001 - Multi-Component Service Agreement**
- **Description**: Combines fixed service fees, revenue sharing, and billable expense accounts for comprehensive service agreements
- **Applies To**: Premium hotel properties requiring full-service management with revenue participation
- **Calculation Formula**:
  ```
  Fixed Fee Amount = Service Rate (subject to escalation)
  Revenue Share Amount = (Qualifying Revenue × Share Percentage) above Threshold
  Billable Accounts = Σ(Enabled Expense Accounts) + PTEB Calculations
  Total Invoice = Fixed Fee Amount + Revenue Share Amount + Billable Accounts
  ```
- **Implementation**: All components typically bill to same invoice group unless separated
- **Edge Cases**:
  - Revenue share thresholds may have multiple tiers
  - Billable accounts may include both payroll and expense components
  - Different validation thresholds for revenue vs. expense components

#### **Representative Example**:

**Site 0293 - Hilton Dallas Lincoln Center**:
- **Fixed Fee Component**: Shuttle Services = $1,000.00 (Code 4705)
- **Revenue Share Component**:
  - Tier 1: 32.5% on revenue above $750,000 annually
  - Tier 2: 25% on revenue up to $750,000 annually
  - Accumulation Type: Annual Calendar
  - Validation Threshold: 5% of revenue
  - Revenue Codes: All standard parking codes
- **Billable Accounts Component**:
  - Payroll Accounts: Site Salaries & Wages (all disabled in this example)
  - PTEB: Disabled
  - Support Services: Disabled
  - Expense Accounts: Vehicle-related expenses enabled
    - Equipment Lease - Vehicles (7060): Enabled
    - Equipment Rental - Vehicles (7070): Enabled
    - Fuel - Vehicles (7075): Enabled
    - Insurance - Vehicle (7082): Enabled
    - Repairs & Maintenance - Vehicle (7178): Enabled
    - Vehicle Expense (7230): Enabled
- **Escalation**: No automatic escalation configured
- **Payment Terms**: 30 days

## Advanced Hybrid Contract Features

### **Invoice Grouping for Hybrid Contracts**

#### **Business Rule: IG-001 - Separate Invoice Generation**
- **Description**: Creates separate invoices for different billing components within the same contract
- **Applies To**: Contracts requiring separate billing streams for accounting or customer preference
- **Implementation**:
  - Each invoice group generates a separate invoice document
  - Components are assigned to specific invoice groups during configuration
  - Invoice group titles provide clear identification (e.g., "Rev Share", "PLH")
- **Benefits**:
  - Clearer financial reporting and reconciliation
  - Separate payment tracking for different service types
  - Enhanced customer understanding of billing components

**Example Implementation (Site 0429)**:
- **Invoice Group 1**: "Rev Share" - Contains revenue share, mid-month advance, deposited revenue
- **Invoice Group 2**: "PLH" - Contains all per labor hour charges

### **Mid-Month Advance Integration**

#### **Business Rule: MMA-001 - Cash Flow Management**
- **Description**: Provides mid-month cash advances against expected monthly revenue share
- **Applies To**: High-volume revenue share contracts requiring improved cash flow
- **Calculation Formula**:
  ```
  Mid-Month Advance = Fixed Amount (typically 40-60% of expected monthly revenue share)
  Month-End Reconciliation = Actual Revenue Share - Mid-Month Advance
  ```
- **Implementation**: Mid-month advance appears as separate line item, reconciled at month-end
- **Edge Cases**: Negative reconciliation results in customer credit or reduced next advance

### **Deposited Revenue Handling**

#### **Business Rule: DR-001 - Tax and Revenue Management**
- **Description**: Manages revenue deposited directly by customer vs. collected by Towne Park
- **Applies To**: Contracts where customer collects and deposits parking revenue directly
- **Implementation**:
  - Deposited revenue flag indicates customer responsibility for parking tax
  - Revenue share calculations based on deposited amounts
  - Special reporting requirements for tax compliance
- **Tax Implications**: Customer responsible for parking tax when deposited revenue is enabled

## Escalation Rules for Hybrid Contracts

### **Component-Specific Escalation**

#### **Business Rule: ESC-HYB-001 - Independent Component Escalation**
- **Description**: Different contract components may have independent escalation schedules
- **Applies To**: All hybrid contracts with multiple billing components
- **Implementation**:
  - Fixed fee components: Follow contract-level escalation settings
  - Per labor hour components: May have job-code-specific escalation rates
  - Revenue share components: Typically no escalation on percentages
- **Examples**:
  - Site 0338: 3% annual escalation in July for all components
  - Site 0429: 2.5% annual escalation in January for Bell PLH rate only
  - Site 0487: 3% annual escalation in January for all components

### **Escalation Timing Coordination**

#### **Business Rule: ESC-HYB-002 - Coordinated Escalation Timing**
- **Description**: Manages escalation timing across multiple contract components
- **Applies To**: Hybrid contracts with multiple escalation schedules
- **Implementation**:
  - Contract-level escalation month applies to most components
  - Individual components may override with specific escalation timing
  - Special handling for catch-up escalations when rates fall behind schedule

## Payment Terms and Billing Coordination

### **Unified Payment Terms**

#### **Business Rule: PAY-HYB-001 - Contract-Level Payment Terms**
- **Description**: All components within a hybrid contract follow the same payment terms
- **Applies To**: All hybrid contracts regardless of component complexity
- **Implementation**: Payment terms set at contract level apply to all invoice groups
- **Standard Terms**:
  - 30 days: Most common (Sites 0429, 0487, 0534)
  - 45 days: Extended terms for specific customers (Site 0338)

### **Purchase Order Management**

#### **Business Rule: PO-HYB-001 - Component Purchase Order Assignment**
- **Description**: Purchase orders may apply to entire contract or specific components
- **Applies To**: Contracts requiring purchase order references
- **Implementation**:
  - Contract-level PO applies to all components unless overridden
  - Component-specific POs may be configured for separate billing streams
- **Examples**:
  - Site 0338: PO "777024746" applies to all components
  - Site 0487: PO "641587" applies to all components

## Validation and Compliance Rules

### **Revenue Validation for Hybrid Contracts**

#### **Business Rule: VAL-HYB-001 - Multi-Component Validation**
- **Description**: Validation thresholds apply independently to each billing component
- **Applies To**: Hybrid contracts with revenue share components
- **Implementation**:
  - Revenue share components: Standard revenue percentage validation
  - Fixed fee components: No validation threshold required
  - Per labor hour components: Hours backup report validation
- **Thresholds**:
  - Site 0293: 5% revenue validation threshold
  - Site 0429: 3% revenue validation threshold

### **Supporting Reports Requirements**

#### **Business Rule: RPT-HYB-001 - Component-Specific Reporting**
- **Description**: Supporting reports required based on active contract components
- **Applies To**: All hybrid contracts with specific component requirements
- **Required Reports by Component**:
  - **Revenue Share**: MixOfSales, ParkingDepartmentReport, ValidationReport
  - **Per Labor Hour**: HoursBackupReport
  - **Fixed Fee**: No additional reports required
  - **Billable Accounts**: Expense documentation as applicable

## System Implementation Notes

### **PowerBill Configuration Requirements**

#### **Technical Implementation: TECH-HYB-001**
- **Component Enablement**: Each billing component must be explicitly enabled
- **Invoice Group Assignment**: Components must be assigned to appropriate invoice groups
- **Rate Management**: Different rate structures require separate configuration sections
- **Escalation Configuration**: Component-specific escalation rules require individual setup

### **Data Structure Requirements**

#### **Technical Implementation: TECH-HYB-002**
- **Contract Type Designation**: Hybrid contracts identified by multiple component types in metadata
- **Component Arrays**: Each billing type maintains separate configuration arrays
- **Cross-Component References**: Invoice grouping requires consistent group number references
- **Validation Logic**: Multi-component validation requires component-aware business rules

## Integration Points

### **PowerBill System Integration**
- Multi-component contract configuration and setup
- Complex revenue data collection and processing
- Advanced calculation engine integration
- Separate invoice generation and distribution

### **Power Platform Integration**
- Multi-component workflow automation
- Component-specific approval processes
- Advanced audit trail generation
- Invoice grouping workflow management

### **Great Plains ERP Integration**
- Multi-component financial posting and reconciliation
- Separate general ledger integration by component
- Component-specific accounts receivable processing
- Advanced financial reporting

### **Hotel PMS Integration**
- Occupancy data validation for revenue share components
- Vehicle count verification
- Revenue validation cross-checks for hybrid calculations
- Real-time data synchronization

## Performance Metrics

### **Multi-Component Revenue Metrics**
- Gross revenue by component and category
- Component-specific revenue growth trends
- Revenue per unit metrics by billing type
- Seasonal revenue patterns across components

### **Billing Efficiency Metrics**
- Invoice generation time by component complexity
- Component validation accuracy rates
- Invoice grouping processing efficiency
- Payment processing time by component

### **Contract Performance Metrics**
- Component utilization rates
- Cross-component revenue correlation
- Customer satisfaction by billing component
- Operational efficiency by contract complexity

## Related Documentation

### **Component Contract Documentation**
- [Revenue Share Contract Business Rules](revenue-share-contract-business-rules.md) - Revenue share component details
- [Fixed Fee Contract Configuration Business Rules](fixed-fee-contract-configuration-business-rules.md) - Fixed fee component details  
- [Per Labor Hour Contract Configuration Business Rules](per-labor-hour-contract-configuration-business-rules.md) - Labor hour component details
- [Management Agreement Contract Configuration Business Rules](management-agreement-contract-configuration-business-rules.md) - Management agreement component details

### **System Integration Documentation**
- [Contract Management System Overview](../technical-specifications/contract-management-system-overview.md) - PowerBill contract management
- [Multi-Component Billing Technical Architecture](../technical-specifications/multi-component-billing-architecture.md) - System architecture

### **Validation and Compliance**
- [Hybrid Contract Configuration Code Validation Report](../validation-reports/hybrid-contract-configuration-code-validation-report.md) - Technical validation results
- [Multi-Component Contract Compliance Guide](../standards/multi-component-contract-compliance.md) - Compliance requirements

### **User Process Documentation**
- [Hybrid Contract Setup Workflow](../user-processes/contract-admin/hybrid-contract-setup-workflow.md) - Contract configuration process
- [Multi-Component Invoice Management](../user-processes/billing-admin/multi-component-invoice-management.md) - Invoice processing procedures

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-07-24 | Initial creation of hybrid contract configuration business rules |
| 1.1 | 2025-08-08 | Enhanced with enterprise metadata, FIBO classification, policy governance, and comprehensive validation framework |

---

**Document Control**: This document represents the complete business rules for hybrid contract configurations based on analysis of 5 representative hybrid contracts from the PowerBill system. All business rules have been validated against current system implementation and enhanced with enterprise governance controls.