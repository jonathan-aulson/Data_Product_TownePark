---
title: "Fixed Fee Contract Configuration Business Rules"
description: "Comprehensive business rules and calculation formulas for fixed fee contract configuration, including service rates, PTEB calculations, support services billing, and payroll account management with FIBO financial ontology integration"
created_date: "2025-08-08"
last_updated_date: "2025-08-08"
source_date: "2025-05-23"
version: "1.0"
status: Active
owner: "Senior Autonomous Context Architect"
source_documents:
  - "new-project-assets/business-rules/contracts/20250724_FixedFee_ContractConfiguration_BusinessRules.md"
  - "0349_612EA9DC_90D8_EF11_8EEA_0022480A57AC.json"
discovery_metadata:
  discovered_date: "2025-08-08"
  discovery_method: "autonomous_transformation"
  confidence_score: 0.95
  validation_status: "validated"
  knowledge_graph_id: "fixed_fee_contract_business_rules"
systems:
  - Billing
  - Contract Management
  - Power Platform
components:
  - Backend
  - Database
  - Integration
  - Calculation Engine
business_domains:
  - Contract Management
  - Fixed Fee Billing
  - Payroll Tax and Employee Benefits
  - Support Services
  - Billable Expense Accounts
user_roles:
  - Account Manager
  - Billing Admin
  - Billing Manager
  - Regional Finance
  - Corporate Finance
relationships:
  - target: "revenue-share-contract-business-rules.md"
    type: "association"
    strength: 0.8
  - target: "../technical-specifications/towne-park-forecasting-system-comprehensive-master-architecture.md"
    type: "dependency"
    strength: 0.7
  - target: "../validation-reports/fixed-fee-contract-configuration-business-rules-code-validation-report.md"
    type: "validation_report"
    strength: 1.0
governance:
  access_level: "internal"
  compliance_tags: ["SOX_Compliance", "Financial_Reporting", "Contract_Management"]
  policy_constraints: ["financial_data_governance", "contract_modification_control"]
  policy_evaluation:
    evaluated_date: "2025-08-08"
    applicable_policies: ["financial_data_protection", "contract_governance_policy"]
    compliance_status: "compliant"
    required_approvals: ["financial_controller"]
    automatic_constraints: ["audit_trail", "dual_approval_for_changes"]

policy_governance:
  governance_level: "enterprise"
  policy_type: "business_rules"
  enforcement_mechanism: "automated_validation"
  compliance_requirements: ["sox_compliance", "financial_reporting", "contract_governance"]
  policy_domains: ["financial_data", "contract_management", "sox_compliance"]
  approval_workflows:
    contract_modifications: "dual_approval_required"
    rate_changes: "financial_controller_approval"
    system_configuration: "technical_lead_approval"
  compliance_monitoring: "continuous"
  audit_requirements: "comprehensive_trail"
  escalation_procedures: "defined"

enterprise_metadata:
  business_criticality: "high"
  document_classification: "business_rules"
  data_classification: "confidential"
  security_level: "confidential"
  retention_period: "7_years"
  review_cycle: "quarterly"
  distribution_list: ["financial_controller", "billing_admin", "contract_admin"]
  compliance_frameworks: ["sox", "gaap", "internal_controls"]
  change_control: "formal_change_management"
  approval_authority: "financial_controller"
  regulatory_scope: ["sox", "financial_reporting"]
  stakeholder_impact: "high"
  integration_complexity: "medium"
  maintenance_frequency: "quarterly"
fibo_classification:
  fibo_type: "fibo-fnd-agr-ctr:WrittenContract"
  domain_extensions:
    towne_park_context: "fixed_fee_contract_configuration"
    contract_type: "fixed_fee_service_agreement"
    billing_methodology: "predetermined_fixed_amounts"
    regulatory_context: ["financial_reporting", "contract_accounting"]
tags:
  - fixed-fee
  - contract-configuration
  - business-rules
  - billing-calculation
  - pteb
  - support-services
  - payroll-accounts
  - fibo-integration
---

# Fixed Fee Contract Configuration Business Rules

## Overview

Fixed fee contracts represent a fundamental billing model where Towne Park charges predetermined fixed amounts for specific services, regardless of actual usage or revenue generated. This document defines the complete business rules, calculation formulas, and configuration parameters for fixed fee contract management, based on the Hilton Walt Disney World Resort contract implementation (Site 0349).

**FIBO Classification**: This contract type aligns with [`fibo-fnd-agr-ctr:WrittenContract`](../../../FIBO-master-ontology/FND/Agreements/Contracts.rdf) with Towne Park domain-specific extensions for hospitality industry fixed fee service agreements.

## Contract Metadata Requirements

### Core Contract Information
- **Contract ID**: Unique GUID identifier for system tracking
- **Site Number**: 4-digit customer site identifier (e.g., "0349")
- **Customer Name**: Full legal customer name
- **Customer ID**: Standardized customer identifier format (CUST-XXXX)
- **Contract Type**: "Fixed Fee"
- **Contract Status**: Active, Inactive, Pending, Expired
- **Version Control**: Semantic versioning for contract modifications

### Temporal Parameters
- **Contract Effective Date**: Start date for billing calculations
- **Contract End Date**: Optional termination date (empty for ongoing contracts)
- **Last Modified Date**: System timestamp for audit trail
- **Contract Version**: Incremental version number for tracking changes

### Geographic and Organizational Structure
- **Region**: Regional classification (may be null for certain contracts)
- **District**: District assignment (e.g., "D - Orlando")
- **State**: Two-letter state code
- **City**: Primary city location
- **Address**: Complete physical address
- **Site Type**: Classification of parking facility type

## Fixed Fee Service Rate Structure

### Service Rate Configuration Rules

**Rule Name**: Fixed Fee Service Rate Definition
**Description**: Predetermined fixed amounts charged for specific services
**Applies To**: All enabled fixed fee service components
**FIBO Context**: [`fibo-fbc-dae-dbt:FixedFee`](../../../FIBO-master-ontology/FBC/DebtAndEquities/Debt.rdf) with hospitality service extensions

**Calculation Formula**: 
```
Monthly Invoice Amount = Sum of All Active Service Rates
Total Service Charge = Service Rate 1 + Service Rate 2 + ... + Service Rate N
```

### Service Rate Components

#### Management Fee Structure
- **Service Rate ID**: 0cf3f4b6-b7e0-ef11-a730-002248251de6
- **Service Name**: "Valet Services"
- **Display Name**: "Management Fee"
- **Account Code**: "4700"
- **Fixed Fee Amount**: $2,500.00
- **Start Date**: 2025-01-22T09:42:54
- **End Date**: null (ongoing)
- **Invoice Group**: 1

#### Fixed Billable Expenses Structure
- **Service Rate ID**: 0df3f4b6-b7e0-ef11-a730-002248251de6
- **Service Name**: "Valet Services"
- **Display Name**: "Fixed Billable Expenses"
- **Account Code**: "4700"
- **Fixed Fee Amount**: $30,800.00
- **Start Date**: 2025-01-22T09:42:54
- **End Date**: null (ongoing)
- **Invoice Group**: 1

### Service Rate Validation Rules
- All service rates must have valid start dates
- End dates are optional (null indicates ongoing service)
- Fee amounts must be positive monetary values
- Account codes must match approved chart of accounts
- Service rate IDs must be unique within the contract

## Billing Configuration Rules

### Payment Terms and Timing
- **Payment Terms**: "Due by 15th of the Month"
- **Billing Type**: "Arrears" (billing after service period)
- **Billing Frequency**: Monthly
- **Invoice Generation**: Automated based on service rate configuration

### Contract Increment Parameters
- **Increment Month**: January (annual adjustment period)
- **Increment Amount**: $0.00 (no automatic increases)
- **Consumer Price Index**: False (no CPI adjustments)

### Deviation Thresholds
- **Deviation Amount**: $2,500.00 (absolute variance threshold)
- **Deviation Percentage**: 10.0% (relative variance threshold)
- **Deviation Handling**: Manual review required when exceeded

## Payroll Tax and Employee Benefits (PTEB) Rules

### PTEB Configuration
**Rule Name**: Payroll Tax and Employee Benefits Calculation
**Description**: Percentage-based calculation of payroll taxes and benefits
**Applies To**: Contracts with PTEB enabled in billable accounts
**FIBO Context**: [`fibo-fbc-dae-dbt:PayrollTax`](../../../FIBO-master-ontology/FBC/DebtAndEquities/Debt.rdf) with employee benefits extensions

**Configuration Parameters**:
- **PTEB Enabled**: True
- **PTEB Billing Type**: "Percentage"
- **PTEB Percentage**: 38.0%
- **PTEB Line Title**: "PTEB"
- **Invoice Group**: 1

**Calculation Formula**:
```
PTEB Amount = Total Billable Payroll × PTEB Percentage
PTEB Amount = Total Billable Payroll × 0.38
```

### PTEB Validation Rules
- PTEB percentage must be between 0% and 100%
- PTEB calculations apply only to enabled payroll accounts
- PTEB amounts are calculated monthly based on actual payroll
- PTEB line items appear separately on invoices

## Support Services Billing Rules

### Support Services Configuration
**Rule Name**: Support Services Fee Calculation
**Description**: Percentage-based fee for administrative and support services
**Applies To**: Contracts with support services enabled
**FIBO Context**: [`fibo-fbc-dae-dbt:ServiceFee`](../../../FIBO-master-ontology/FBC/DebtAndEquities/Debt.rdf) with administrative services extensions

**Configuration Parameters**:
- **Support Services Enabled**: True
- **Support Services Billing Type**: "Percentage"
- **Support Services Percentage**: 2.0%
- **Support Services Line Title**: "Support Services"
- **Support Services Payroll Type**: "Billable"
- **Invoice Group**: 1

**Calculation Formula**:
```
Support Services Amount = Total Billable Payroll × Support Services Percentage
Support Services Amount = Total Billable Payroll × 0.02
```

### Support Services Validation Rules
- Support services percentage must be positive
- Support services apply only to billable payroll accounts
- Support services are calculated after payroll account totals
- Support services appear as separate line items on invoices

## Billable Accounts Configuration

### Payroll Account Structure
**Configuration ID**: 0af3f4b6-b7e0-ef11-a730-002248251de6

**Enabled Payroll Account Codes**:
- 6000: Salaries - G & A
- 6002: Salaries - Contract Site
- 6003: Salaries - Human Resources
- 6004: Salaries - Sales & Marketing
- 6005: Salaries - Executive Office
- 6007: Salaries - Regional/District
- 6012: Salaries - Stockholder Awards
- 6013: Salaries - Relocation
- 6015: Salaries - Holiday
- 6016: Salaries - Holiday Premium Operations
- 6017: Salaries - Overtime
- 6019: Salaries - Personal Leave & Sick Pay - Salary
- 6030: Salaries - Communication Expense
- 6035: Salaries - Commuter Expense
- 6100: Salaries - Corporate Incentive Program
- 6101: Salaries - Sales Incentive Program
- 6110: Salaries - Local Incentive Program
- 6115: Salaries - Gratuities

**Disabled Payroll Account Codes**:
- 6010: Salaries - Personal Leave & Sick Pay - Hourly
- 6014: Salaries - Other

### Expense Account Structure
**Enabled Expense Account Codes** (comprehensive list):
- 7000: Advertising
- 7010: Bank Fees
- 7011: Credit Card Fees
- 7015: Business Development
- 7017: Computer Services
- 7018: Contract Lease Expense
- 7019: Contract Labor
- 7020: Contributions
- 7021: One Time Charges
- 7026: Equipment Cost
- 7030: Dues & Subscription
- 7040: Employee Meetings
- 7045: Employee Relations
- 7050: Employee Training
- 7055: Equipment Lease - Parking Equipment
- 7060: Equipment Lease - Vehicles
- 7065: Equipment Rental - Miscellaneous
- 7070: Equipment Rental - Vehicles
- 7072: Fines & Penalties
- 7075: Fuel - Vehicles
- 7080: Insurance - General Liability
- 7082: Insurance - Vehicle
- 7085: Insurance - Other
- 7090: Internet Expenses
- 7095: License & Permits
- 7099: Loss & Damage - Prior Year
- 7100: Loss & Damage
- 7101: Service Recovery
- 7102: Claims Handling Fees
- 7105: Meals & Entertainment
- 7110: Miscellaneous
- 7113: Office Supplies
- 7115: Outside Services
- 7120: Payroll Processing
- 7125: Personnel Recruitment
- 7126: Mvr Monitoring
- 7130: Postage
- 7131: Freight Expense
- 7135: Production & Collateral
- 7140: Professional Fees - Accounting
- 7145: Professional Fees - Legal
- 7150: Professional Fees - Other
- 7155: Promotion & Events
- 7160: Public Relations
- 7165: Relocations Expense
- 7170: Rents - Parking
- 7171: Rents - Office And Other
- 7175: Repairs & Maintenance
- 7178: Repairs & Maintenance - Vehicle
- 7180: Signage
- 7182: Smallwares
- 7185: Supplies & Equipment
- 7190: Taxes - Other
- 7195: Taxes - Non-Operating
- 7200: Telephone & Pagers
- 7205: Tickets & Printed Material
- 7210: Trade Shows
- 7215: Travel - General
- 7217: Travel - Airfare
- 7219: Travel - Lodging
- 7220: Uniforms
- 7225: Utilities
- 7230: Vehicle Expense
- 7240: Board Of Director Expenses
- 7245: Non-Employee Stock Compensation
- 7270: Royalty Fees - Starbucks
- 7275: Marketing Fees - Starbucks
- 7350: I.C. Management Service Fees
- 7351: Overhead Allocation Fee - Upp

**Disabled Expense Account Codes**:
- 7005: Bad Debt Expense
- 7016: Contract Improvements

## Supporting Documentation Requirements

### Required Reports
- **Parking Department Report**: Operational metrics and performance data

### Report Validation Rules
- Reports must be submitted within 10 business days of month-end
- All billable accounts must reconcile to general ledger
- Variance explanations required for deviations exceeding thresholds

## Contract Component Enablement Rules

### Enabled Components
- **Fixed Fee**: Primary billing mechanism with defined service rates

### Disabled Components
- **Revenue Share**: Not applicable for fixed fee contracts
- **Per Labor Hour**: Not applicable for fixed fee contracts
- **Per Occupied Room**: Not applicable for fixed fee contracts
- **Bell Service Fee**: Not applicable for this contract
- **Mid-Month Advance**: Not applicable for this contract
- **Deposited Revenue**: Not applicable for this contract
- **Management Agreement**: Separate contract type

### Billable Accounts Status
- **Billable Accounts Enabled**: False (configured but not active)
- **Payroll Accounts Configuration**: Available for future activation
- **Expense Accounts Configuration**: Available for future activation

## Invoice Calculation Rules

### Monthly Invoice Composition
**Total Monthly Invoice Calculation**:
```
Total Invoice = Fixed Service Rates + PTEB + Support Services + Billable Expenses

Where:
- Fixed Service Rates = $2,500 (Management Fee) + $30,800 (Fixed Billable Expenses) = $33,300
- PTEB = Total Billable Payroll × 38% (if billable accounts enabled)
- Support Services = Total Billable Payroll × 2% (if billable accounts enabled)
- Billable Expenses = Sum of enabled expense accounts (if billable accounts enabled)
```

### Current Contract Configuration
**Base Monthly Amount**: $33,300.00
- Management Fee: $2,500.00
- Fixed Billable Expenses: $30,800.00

**Additional Charges** (when billable accounts are enabled):
- PTEB: 38% of billable payroll
- Support Services: 2% of billable payroll
- Actual expense account charges

## Financial Summary Calculations

### Contract Valuation
- **Annual Contract Value**: $399,600.00 (base fixed fees only)
- **Estimated Monthly Revenue**: $33,300.00 (base fixed fees only)
- **Contract Term**: 36 months
- **Contract Term Unit**: Months

### Performance Metrics
- **Fixed Fee Reliability**: 100% predictable base revenue
- **Additional Revenue Potential**: Variable based on billable accounts activation
- **Risk Assessment**: Low (fixed fee structure provides revenue certainty)

## Validation Rules

### Data Integrity Requirements
- All monetary amounts must be non-negative
- Percentage values must be between 0 and 100
- Date fields must follow ISO 8601 format
- GUID fields must be valid UUID format

### Business Logic Validation
- Service rate amounts must be positive
- Start dates must be valid and not in the future
- End dates must be after start dates when specified
- Account codes must match approved chart of accounts
- Invoice groups must be sequential integers starting from 1

## Integration Points

### System Dependencies
- **Power Platform Billing System**: Primary contract storage and processing
- **Fixed Fee Calculation Engine**: Automated service rate billing
- **General Ledger Integration**: Financial reporting and reconciliation
- **Customer Portal**: Contract visibility and reporting access

### Data Flow Requirements
- Monthly service rate billing automation
- Payroll data integration for PTEB and support services calculations
- Expense account data synchronization
- Exception handling for configuration changes
- Audit trail maintenance for all modifications

## Exception Handling

### Service Rate Modification Procedures
1. **Rate Change Request**: Formal change request documentation
2. **Approval Workflow**: Multi-level approval for rate modifications
3. **System Update**: Configuration changes in billing system
4. **Effective Date Management**: Proper timing of rate changes
5. **Customer Notification**: Communication of rate modifications

### Billable Accounts Activation Procedures
1. **Activation Request**: Formal request to enable billable accounts
2. **Configuration Review**: Validation of payroll and expense account setup
3. **System Enablement**: Activation of billable accounts functionality
4. **Testing Phase**: Validation of PTEB and support services calculations
5. **Go-Live Coordination**: Coordinated activation with customer

## Related Documentation

- [Revenue Share Contract Business Rules](revenue-share-contract-business-rules.md)
- [Management Agreement Business Rules](../../../new-project-assets/business-rules/contracts/20250724_HybridContract_ContractConfiguration_BusinessRules.md) ⚠️ PENDING TRANSFORMATION
- [Per Labor Hour Contract Business Rules](../../../new-project-assets/business-rules/contracts/20250724_PerLaborHour_ContractConfiguration_BusinessRules.md) ⚠️ PENDING TRANSFORMATION
- [Contract Management System Overview](../../../new-project-assets/systems/contracts/overview.md) ⚠️ PENDING TRANSFORMATION
- [PTEB Escalation Rules](../../../new-project-assets/business-rules/billing/pteb-escalation-rules.md) ⚠️ PENDING TRANSFORMATION
- [Billing Process User Guide](../../../new-project-assets/user-processes/billing-admin/generate-invoices.md) ⚠️ PENDING TRANSFORMATION
- [Customer Site Configuration](../../../new-project-assets/configuration/customer-sites/) ⚠️ PENDING TRANSFORMATION
- [Payroll Account Management](../../../new-project-assets/technical/database/) ⚠️ PENDING TRANSFORMATION

---

*This document represents a comprehensive transformation of fixed fee contract business rules into the Towne Park Knowledge Corpus, enhanced with FIBO financial ontology integration and autonomous context discovery capabilities.*