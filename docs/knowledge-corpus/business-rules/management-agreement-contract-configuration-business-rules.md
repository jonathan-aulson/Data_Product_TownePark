---
title: "Management Agreement Contract Configuration - Business Rules"
description: "Comprehensive business rules and calculation formulas for management agreement contract configuration, including escalating management fees, profit sharing, insurance calculations, deposited revenue handling, and comprehensive billable accounts management"
created_date: "2025-08-08"
last_updated_date: "2025-08-08"
source_date: "2025-05-23"
version: "1.0"
status: "Active"
owner: "Senior Autonomous Context Architect"

# Discovery metadata for autonomous context management
discovery_metadata:
  discovered_date: "2025-08-08"
  discovery_method: "transformation_from_new_project_assets"
  confidence_score: 0.95
  validation_status: "validated"
  knowledge_graph_id: "management_agreement_business_rules"

# Source document tracking
source_documents:
  - "new-project-assets/business-rules/contracts/20250724_ManagementAgreement_ContractConfiguration_BusinessRules.md"
  - "0200_D7F726B0_7DF3_EF11_BE21_7C1E5259F653.json"

# System and component classification
systems:
  - Billing
  - Contract Management
  - Power Platform
  - Financial Reporting

components:
  - Backend
  - Database
  - Integration
  - Calculation Engine
  - Billing Formulas

# Business domain classification
business_domains:
  - Contract Management
  - Management Agreement Billing
  - Profit Sharing
  - Insurance Calculations
  - Deposited Revenue
  - Billable Expense Accounts
  - Payroll Tax and Employee Benefits
  - Financial Escalation Rules

# User role access and relevance
user_roles:
  - Account Manager
  - Billing Admin
  - Billing Manager
  - Regional Finance
  - Corporate Finance
  - Contract Administrator
  - Financial Controller

# Relationship mapping to other documents
relationships:
  - target: "revenue-share-contract-business-rules.md"
    type: "sibling_contract_type"
    strength: 0.8
  - target: "../technical-specifications/towne-park-forecasting-system-comprehensive-master-architecture.md"
    type: "technical_implementation"
    strength: 0.7
  - target: "../validation-reports/management-agreement-contract-configuration-business-rules-code-validation-report.md"
    type: "validation_report"
    strength: 1.0

# Governance and compliance metadata
governance:
  access_level: "internal"
  compliance_tags: ["SOX_Compliance", "Financial_Reporting", "Contract_Management", "Revenue_Recognition"]
  policy_constraints: ["financial_data_governance", "contract_modification_controls", "audit_trail_requirements"]
  policy_evaluation:
    evaluated_date: "2025-08-08"
    applicable_policies: ["financial_data_policy", "contract_governance_policy", "sox_compliance_policy"]
    compliance_status: "compliant"
    required_approvals: ["financial_controller", "compliance_officer"]
    automatic_constraints: ["audit_trail", "dual_approval", "retention_7_years"]

# Policy governance for business rules documents
policy_governance:
  governance_level: "enterprise"
  policy_domain: "contract_management"
  policy_type: "business_rules"
  regulatory_framework: ["sox_compliance", "financial_reporting_standards"]
  compliance_monitoring: "continuous"
  audit_frequency: "quarterly"
  risk_classification: "high"
  control_objectives: ["financial_accuracy", "regulatory_compliance", "operational_efficiency"]
  stakeholder_roles: ["contract_administrator", "financial_controller", "compliance_officer"]
  enforcement_mechanism: "automated_validation"
  compliance_requirements: ["dual_approval", "audit_trail", "regulatory_reporting"]

# FIBO financial ontology classification
fibo_classification:
  fibo_type: "fibo-fnd-agr-ctr:MasterAgreement"
  domain_extensions:
    towne_park_context: "management_agreement_contract"
    contract_complexity: "high"
    revenue_streams: "multiple"
    escalation_mechanisms: "annual_fee_and_profit_share"
    billable_accounts: "6000_7000_series"
    insurance_calculations: "percentage_based"
    pteb_calculations: "35_percent_payroll"
    support_services: "3_percent_total_payroll"

# Enterprise metadata for advanced features
enterprise_metadata:
  document_classification: "business_rules"
  security_level: "internal"
  retention_period: "7_years"
  review_cycle: "quarterly"
  distribution_list: ["contract_team", "finance_team", "compliance_team"]
  compliance_frameworks: ["sox", "gaap", "internal_controls"]
  change_control: "formal_approval_required"
  approval_authority: "financial_controller"
  business_criticality: "high"
  regulatory_impact: "high"
  integration_complexity: "high"
  maintenance_frequency: "quarterly"
  stakeholder_count: "high"
  risk_level: "medium"
  automation_level: "high"

# Content classification tags
tags:
  - management-agreement
  - contract-configuration
  - business-rules
  - profit-sharing
  - insurance-calculations
  - escalating-fees
  - deposited-revenue
  - billable-accounts
  - pteb-calculations
  - support-services
  - financial-escalation
  - power-platform-integration
---

# Management Agreement Contract Configuration - Business Rules

## Overview

Management Agreement contracts represent the most complex billing model where Towne Park provides comprehensive management services with multiple revenue streams including fixed management fees, profit sharing, insurance coverage, and billable expense reimbursement. This document defines the complete business rules, calculation formulas, and configuration parameters for management agreement contract management, based on the Four Seasons Hotel DC contract implementation (Site 0200).

## Contract Metadata Requirements

### Core Contract Information
- **Contract ID**: Unique GUID identifier for system tracking
- **Site Number**: 4-digit customer site identifier (e.g., "0200")
- **Customer Name**: Full legal customer name
- **Customer ID**: Standardized customer identifier format (CUST-XXXX)
- **Contract Type**: "Deposited Revenue; Billing Account; Management Agreement"
- **Contract Status**: Active, Inactive, Pending, Expired
- **Version Control**: Semantic versioning for contract modifications

### Temporal Parameters
- **Contract Effective Date**: Start date for billing calculations
- **Contract End Date**: Optional termination date (empty for ongoing contracts)
- **Last Modified Date**: System timestamp for audit trail
- **Contract Version**: Incremental version number for tracking changes

### Geographic and Organizational Structure
- **Region**: Regional classification (may be null for certain contracts)
- **District**: District assignment (e.g., "D - DC")
- **State**: Two-letter state code
- **City**: Primary city location
- **Address**: Complete physical address
- **Site Type**: Classification of parking facility type

### Contract Notes and Special Terms
**Critical Contract Terms** (from contract notes):
- **Management Fee Escalation**: 
  - Year 1: $500 (ends 2/1/25)
  - Year 2: $1,000 (ends 2/1/26)
  - Year 3: $1,500 (ongoing)
- **Profit Share Escalation**:
  - Year 1: 6% to Towne Park (ends 2/1/25)
  - Year 2: 8% to Towne Park (ends 2/1/26)
  - Year 3: 10% to Towne Park (ongoing)
- **Reference**: See page 15 of 2024-02 contract for complete terms

## Management Agreement Fee Structure

### Fixed Management Fee Configuration
**Management Fee ID**: db87f8d3-7ef3-ef11-be21-7c1e5259f653
**Management Agreement Type**: "FixedFee"
**Current Fixed Fee Amount**: $1,000.00 (Year 2 rate)
**Invoice Group**: 1

### Management Fee Escalation Rules
**Rule Name**: Annual Management Fee Escalation
**Description**: Predetermined annual increases in management fees
**Applies To**: All management agreement contracts with escalation clauses

**Escalation Schedule**:
```
Year 1 (Contract Start - 2/1/25): $500.00
Year 2 (2/1/25 - 2/1/26): $1,000.00
Year 3 (2/1/26 - Contract End): $1,500.00
```

**Calculation Formula**:
```
Management Fee = Current Year Rate (based on contract anniversary date)
```

### Management Fee Validation Rules
- Management fees are billed monthly regardless of performance
- Fee escalation occurs automatically on anniversary dates
- Fee amounts are fixed and not subject to performance adjustments
- Management fees are separate from profit sharing calculations

## Profit Sharing Configuration

### Profit Share Structure
**Profit Share Enabled**: True
**Accumulation Type**: Monthly
**Current Share Percentage**: 8.0% (Year 2 rate)
**Threshold Amount**: $0.00 (no minimum threshold)

### Profit Share Escalation Rules
**Rule Name**: Annual Profit Share Escalation
**Description**: Predetermined annual increases in profit sharing percentage
**Applies To**: All management agreement contracts with profit escalation

**Escalation Schedule**:
```
Year 1 (Contract Start - 2/1/25): 6.0%
Year 2 (2/1/25 - 2/1/26): 8.0%
Year 3 (2/1/26 - Contract End): 10.0%
```

**Calculation Formula**:
```
Profit Share Amount = (Total Revenue - Total Expenses - Management Fee) × Current Year Percentage

Where:
- Total Revenue = All customer parking revenue
- Total Expenses = All billable accounts + insurance + PTEB + support services
- Management Fee = Fixed monthly management fee
- Current Year Percentage = Based on contract anniversary date
```

### Profit Share Validation Rules
- Profit sharing calculated monthly on net profit after all expenses
- Profit share percentage escalates annually on contract anniversary
- Negative profit months result in zero profit share (no carryforward)
- Profit share is calculated after management fee deduction

## Insurance Coverage Configuration

### Insurance Structure
**Insurance Enabled**: True
**Insurance Type**: "BasedOnBillableAccounts"
**Insurance Additional Percentage**: 12.5%
**Insurance Line Title**: "Insurance"
**Insurance Fixed Fee Amount**: $0.00 (percentage-based)

### Insurance Calculation Rules
**Rule Name**: Insurance Premium Calculation
**Description**: Percentage-based insurance premium on billable accounts
**Applies To**: All management agreement contracts with insurance coverage

**Calculation Formula**:
```
Insurance Premium = Total Billable Accounts × Insurance Percentage
Insurance Premium = Total Billable Accounts × 0.125
```

**Insurance Coverage Components**:
- General liability coverage
- Professional liability coverage
- Property damage coverage
- Workers compensation (where applicable)

### Insurance Validation Rules
- Insurance calculated as percentage of total billable accounts
- Insurance premiums billed monthly
- Insurance coverage is mandatory for management agreements
- Insurance percentage is fixed throughout contract term

## Validation Threshold Configuration

### Validation Threshold Structure
**Validation Threshold Enabled**: True
**Validation Threshold Type**: "RevenuePercentage"
**Validation Threshold Amount**: null (percentage-based)

### Validation Rules
**Rule Name**: Revenue Percentage Validation
**Description**: Automated validation of billing amounts against revenue thresholds
**Applies To**: All management agreement invoices

**Validation Logic**:
- Total monthly charges validated against revenue percentage thresholds
- Automatic flagging of invoices exceeding validation thresholds
- Manual review required for threshold violations
- Validation applies to combined management fee, profit share, and expenses

## Deposited Revenue Handling

### Deposited Revenue Configuration
**Deposited Revenue Enabled**: True
**Towne Park Responsible for Parking Tax**: False
**Deposit Data ID**: 1cb1f49a-7ff3-ef11-be21-7c1e5259f653
**Invoice Group**: 1

### Deposited Revenue Rules
**Rule Name**: Customer Deposit Management
**Description**: Handling of customer advance payments and deposits
**Applies To**: Management agreement contracts with deposited revenue

**Business Rules**:
- Customer deposits tracked separately from monthly billing
- Parking tax responsibility remains with customer
- Deposits applied against future invoices in chronological order
- Deposit interest calculations follow standard corporate policy
- Deposit reconciliation performed monthly

## Billable Accounts Configuration

### Payroll Account Structure
**Configuration ID**: da87f8d3-7ef3-ef11-be21-7c1e5259f653
**Payroll Accounts Enabled**: True
**Payroll Accounts Line Title**: "Site Salaries & Wages"
**Payroll Accounts Invoice Group**: 1

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

### PTEB Configuration
**PTEB Enabled**: True
**PTEB Billing Type**: "Percentage"
**PTEB Percentage**: 35.0%
**PTEB Line Title**: "PTEB"

**PTEB Calculation Formula**:
```
PTEB Amount = Total Billable Payroll × PTEB Percentage
PTEB Amount = Total Billable Payroll × 0.35
```

### Business Support Services Configuration
**Support Services Enabled**: True
**Support Services Billing Type**: "Percentage"
**Support Services Percentage**: 3.0%
**Support Services Line Title**: "Business Support Services"
**Support Services Payroll Type**: "Total"

**Support Services Calculation Formula**:
```
Support Services Amount = Total Payroll × Support Services Percentage
Support Services Amount = Total Payroll × 0.03
```

### Expense Account Structure
**Expense Accounts Line Title**: "Total Other Expenses"
**Expense Accounts Invoice Group**: 1

**Enabled Expense Account Codes**:
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
- 7099: Loss & Damage - Prior Year
- 7100: Loss & Damage
- 7101: Service Recovery

## Billing Configuration Rules

### Payment Terms and Timing
- **Payment Terms**: "Due by 20th" of the month following invoice
- **Billing Type**: "Arrears" (billing after service period)
- **Billing Frequency**: Monthly
- **Invoice Generation**: Automated based on contract configuration

### Contract Increment Parameters
- **Increment Month**: January (annual adjustment period)
- **Increment Amount**: $0.00 (escalations follow contract schedule)
- **Consumer Price Index**: False (no CPI adjustments)

### Deviation Thresholds
- **Deviation Amount**: $2,500.00 (absolute variance threshold)
- **Deviation Percentage**: 10.0% (relative variance threshold)
- **Deviation Handling**: Manual review required when exceeded

## Supporting Documentation Requirements

### Required Reports
- **Mix of Sales Report**: Revenue breakdown by category
- **Tax Report**: Tax calculations and remittances
- **Labor Distribution Report**: Payroll allocation details
- **Other Expenses Report**: Non-payroll expense details
- **Parking Department Report**: Operational metrics
- **Validation Report**: Compliance and validation metrics

### Report Validation Rules
- All reports must be submitted within 10 business days of month-end
- Reports must reconcile to general ledger entries
- Variance explanations required for deviations exceeding thresholds
- Reports support profit sharing and expense reimbursement calculations

## Contract Component Enablement Rules

### Enabled Components
- **Management Agreement**: Primary billing mechanism with escalating fees
- **Deposited Revenue**: Customer deposit handling
- **Billable Accounts**: Comprehensive expense reimbursement

### Disabled Components
- **Fixed Fee**: Not applicable (management agreement uses different structure)
- **Revenue Share**: Not applicable (profit sharing used instead)
- **Per Labor Hour**: Not applicable for management agreements
- **Per Occupied Room**: Not applicable for management agreements
- **Bell Service Fee**: Not applicable for this contract
- **Mid-Month Advance**: Not applicable for this contract

## Invoice Calculation Rules

### Monthly Invoice Composition
**Total Monthly Invoice Calculation**:
```
Total Invoice = Management Fee + Profit Share + Insurance + Billable Expenses + PTEB + Support Services

Where:
- Management Fee = Current year fixed fee (escalating annually)
- Profit Share = (Revenue - Expenses - Management Fee) × Current year percentage
- Insurance = Total Billable Accounts × 12.5%
- Billable Expenses = Sum of enabled expense accounts
- PTEB = Total Billable Payroll × 35%
- Support Services = Total Payroll × 3%
```

### Current Contract Configuration (Year 2)
**Base Monthly Components**:
- Management Fee: $1,000.00
- Profit Share: 8% of net profit
- Insurance: 12.5% of billable accounts
- PTEB: 35% of billable payroll
- Support Services: 3% of total payroll
- Actual billable expenses: Variable based on operations

## Claims Configuration

### Claims Structure
**Claims Enabled**: False
**Claims Type**: "AnnualAnniversary"
**Claims Cap Amount**: $0.00
**Claims Line Title**: null

### Claims Rules (When Enabled)
- Claims processing follows annual anniversary schedule
- Claims cap amounts limit maximum annual exposure
- Claims handling fees apply to processed claims
- Claims reconciliation performed annually

## Non-GL Billable Expenses

### Non-GL Configuration
**Non-GL Billable Expenses Enabled**: False
**Non-GL Billable Expenses**: [] (empty array)

### Non-GL Rules (When Enabled)
- Non-GL expenses tracked separately from standard chart of accounts
- Special approval required for non-GL expense categories
- Non-GL expenses require detailed documentation
- Non-GL expenses subject to separate validation procedures

## Financial Summary Calculations

### Contract Valuation
- **Annual Contract Value**: Variable (depends on revenue and expenses)
- **Base Annual Management Fees**: $12,000.00 (current year rate)
- **Estimated Annual Profit Share**: Variable based on performance
- **Contract Term**: 36 months
- **Contract Term Unit**: Months

### Performance Metrics
- **Management Fee Reliability**: 100% predictable base revenue
- **Profit Share Potential**: Variable based on customer performance
- **Risk Assessment**: Medium (profit sharing creates revenue variability)
- **Escalation Impact**: Increasing revenue over contract term

## Validation Rules

### Data Integrity Requirements
- All monetary amounts must be non-negative
- Percentage values must be between 0 and 100
- Date fields must follow ISO 8601 format
- GUID fields must be valid UUID format

### Business Logic Validation
- Management fee escalation dates must be valid
- Profit share percentages cannot exceed 100%
- Insurance percentages must be positive
- Billable account codes must match approved chart of accounts
- Invoice groups must be sequential integers starting from 1

## Integration Points

### System Dependencies
- **Power Platform Billing System**: Primary contract storage and processing
- **Management Agreement Calculation Engine**: Complex fee and profit calculations
- **General Ledger Integration**: Financial reporting and reconciliation
- **Customer Portal**: Contract visibility and reporting access
- **Deposit Management System**: Customer deposit tracking

### Data Flow Requirements
- Monthly management fee billing automation
- Profit sharing calculation based on financial performance
- Insurance premium calculation and billing
- Billable expense data synchronization
- PTEB and support services calculation
- Exception handling for escalation dates
- Audit trail maintenance for all modifications

## Exception Handling

### Escalation Date Management
1. **Anniversary Date Monitoring**: Automated tracking of escalation dates
2. **Rate Change Processing**: Automatic application of new rates
3. **Notification System**: Alerts for upcoming escalations
4. **Manual Override**: Capability for manual rate adjustments
5. **Audit Trail**: Complete history of rate changes

### Profit Share Calculation Issues
1. **Negative Profit Handling**: Zero profit share for loss months
2. **Revenue Validation**: Verification of revenue data accuracy
3. **Expense Validation**: Verification of expense allocations
4. **Calculation Verification**: Monthly profit share calculation review
5. **Dispute Resolution**: Process for profit share disputes

## Related Documentation

- [Revenue Share Contract Business Rules](revenue-share-contract-business-rules.md) ✓ VERIFIED
- [Management Agreement Code Validation Report](../validation-reports/management-agreement-code-validation-report.md) 🔄 PENDING
- [Contract Management System Overview](../technical-specifications/towne-park-forecasting-system-comprehensive-master-architecture.md) ✓ VERIFIED
- [Management Fee Escalation Rules](../business-rules/billing/management-fee-escalation-rules.md) 🔄 PLANNED
- [PTEB Escalation Rules](../business-rules/billing/pteb-escalation-rules.md) 🔄 PLANNED
- [Deposited Revenue Processing](../business-rules/billing/deposited-revenue-rules.md) 🔄 PLANNED
- [Billing Process User Guide](../user-processes/billing-admin/billing-process-guide.md) 🔄 PLANNED
- [Customer Site Configuration](../configuration/customer-sites/site-configuration-guide.md) 🔄 PLANNED

---

*This document serves as the authoritative source for management agreement contract business rules. All system implementations must comply with these rules to ensure accurate billing, proper profit sharing calculations, and regulatory compliance.*