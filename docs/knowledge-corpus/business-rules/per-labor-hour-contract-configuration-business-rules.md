---
title: "Per Labor Hour Contract Configuration Business Rules"
description: "Comprehensive business rules and calculation formulas for per labor hour contract configuration, including job-specific rates, overtime calculations, annual escalations, and hours backup reporting requirements with Legion workforce integration"
created_date: 2025-08-08
last_updated_date: 2025-08-08
source_date: 2025-05-23
version: 1.0
status: "Production"
owner: "Senior Autonomous Context Architect"
source_documents:
  - "new-project-assets/business-rules/contracts/20250724_PerLaborHour_ContractConfiguration_BusinessRules.md"
  - "0451_AD4F02E4_90D8_EF11_8EEA_0022480A57AC.json"
discovery_metadata:
  discovered_date: 2025-08-08
  discovery_method: "autonomous_transformation"
  confidence_score: 0.98
  validation_status: "validated"
  knowledge_graph_id: "per_labor_hour_contract_business_rules"
systems:
  - "Billing System"
  - "Contract Management"
  - "Legion Workforce Integration"
  - "Payroll Processing"
  - "Power Platform"
components:
  - "PerLaborHourCalculator"
  - "Payroll Repository"
  - "Job Rate Management"
  - "Escalation Engine"
  - "Hours Tracking"
business_domains:
  - "Contract Management"
  - "Per Labor Hour Billing"
  - "Job Code Management"
  - "Hours Tracking"
  - "Rate Escalation"
  - "Workforce Management"
user_roles:
  - "Account Manager"
  - "Billing Admin"
  - "Billing Manager"
  - "Site Manager"
  - "Regional Finance"
  - "Corporate Finance"
  - "Contract Administrator"
relationships:
  - target: "revenue-share-contract-business-rules.md"
    type: "association"
    strength: 0.7
  - target: "management-agreement-contract-configuration-business-rules.md"
    type: "association"
    strength: 0.7
  - target: "fixed-fee-contract-configuration-business-rules.md"
    type: "association"
    strength: 0.7
  - target: "../validation-reports/per-labor-hour-contract-configuration-business-rules-code-validation-report.md"
    type: "validation"
    strength: 1.0
  - target: "../technical-specifications/towne-park-forecasting-system-comprehensive-master-architecture.md"
    type: "dependency"
    strength: 0.6
governance:
  access_level: "internal"
  compliance_tags: ["Contract_Management", "Financial_Calculations", "Labor_Regulations", "SOX_Compliance"]
  policy_constraints: ["data_retention", "audit_trail", "calculation_accuracy", "labor_law_compliance"]
  policy_evaluation:
    evaluated_date: 2025-08-08
    applicable_policies: ["contract_management_policy", "financial_calculation_policy", "labor_compliance_policy"]
    compliance_status: "compliant"
    required_approvals: ["financial_controller", "legal_counsel"]
    automatic_constraints: ["audit_trail", "calculation_validation", "rate_approval"]
enterprise_metadata:
  business_criticality: "high"
  data_classification: "confidential"
  regulatory_scope: ["labor_regulations", "financial_reporting", "contract_law"]
  audit_frequency: "quarterly"
  stakeholder_groups: ["finance_team", "operations_team", "legal_team", "hr_team"]
  integration_dependencies: ["legion_workforce", "powerbill_billing", "great_plains_erp"]
  change_impact_assessment: "high_impact_financial_calculations"
fibo_classification:
  fibo_type: "fibo-fnd-agr-ctr:WrittenContract"
  domain_extensions:
    towne_park_context: "per_labor_hour_contract_configuration"
    contract_type: "labor_hour_based_billing"
    calculation_method: "job_code_hourly_rates"
    escalation_mechanism: "fixed_dollar_annual_increase"
    integration_requirements: "legion_workforce_payroll_integration"
  regulatory_context: ["labor_regulations", "wage_hour_compliance", "payroll_tax_compliance"]
  business_rules:
    - "job_specific_hourly_rates"
    - "overtime_calculation_procedures"
    - "annual_rate_escalation_3_dollar"
    - "hours_backup_reporting_requirements"
    - "legion_integration_data_validation"
tags:
  - "per-labor-hour"
  - "contract-configuration"
  - "business-rules"
  - "job-codes"
  - "hourly-rates"
  - "overtime-calculations"
  - "rate-escalation"
  - "hours-backup"
  - "legion-integration"
  - "workforce-management"
---

# Per Labor Hour Contract Configuration Business Rules

## Overview

Per Labor Hour contracts represent a straightforward billing model where Towne Park charges predetermined hourly rates for specific job classifications, with separate rates for regular and overtime hours. This document defines the complete business rules, calculation formulas, and configuration parameters for per labor hour contract management, based on the Lee's Summit Medical Center contract implementation (Site 0451).

**Key Features:**
- Job-specific hourly rate structures
- Automated payroll integration with Legion workforce system
- Annual rate escalation mechanisms
- Comprehensive hours backup reporting
- Overtime calculation procedures
- Multi-job code support with individual rate management

## Contract Metadata Requirements

### Core Contract Information
- **Contract ID**: Unique GUID identifier for system tracking
- **Site Number**: 4-digit customer site identifier (e.g., "0451")
- **Customer Name**: Full legal customer name
- **Customer ID**: Standardized customer identifier format (CUST-XXXX)
- **Contract Type**: "Per Labor Hour"
- **Contract Status**: Active, Inactive, Pending, Expired
- **Version Control**: Semantic versioning for contract modifications

### Temporal Parameters
- **Contract Effective Date**: Start date for billing calculations
- **Contract End Date**: Optional termination date (empty for ongoing contracts)
- **Last Modified Date**: System timestamp for audit trail
- **Contract Version**: Incremental version number for tracking changes

### Geographic and Organizational Structure
- **Region**: Regional classification (may be null for certain contracts)
- **District**: District assignment (e.g., "D - Kansas City")
- **State**: Two-letter state code
- **City**: Primary city location
- **Address**: Complete physical address
- **Site Type**: Classification of parking facility type

## Job Rate Structure Configuration

### Job Rate Definition Rules
**Rule Name**: Job-Specific Hourly Rate Configuration
**Description**: Predetermined hourly rates for specific job classifications
**Applies To**: All enabled job codes within per labor hour contracts

### Job Rate Components

#### Inpatient Transport (IPT) Configuration
- **Job Rate ID**: 16f3f4b6-b7e0-ef11-a730-002248251de6
- **Service Name**: "Valet Services"
- **Display Name**: "Inpatient Transport"
- **Job Code**: "IPT"
- **Regular Rate**: $25.08 per hour
- **Overtime Rate**: $25.08 per hour
- **Start Date**: null (contract effective date applies)
- **End Date**: null (ongoing)
- **Invoice Group**: 1

#### Manager (SRACCTMGR) Configuration
- **Job Rate ID**: 17f3f4b6-b7e0-ef11-a730-002248251de6
- **Service Name**: "Valet Services"
- **Display Name**: "Manager"
- **Job Code**: "SRACCTMGR"
- **Regular Rate**: $25.08 per hour
- **Overtime Rate**: $25.08 per hour
- **Start Date**: null (contract effective date applies)
- **End Date**: null (ongoing)
- **Invoice Group**: 1

### Job Rate Validation Rules
- All job rates must have valid job codes
- Regular rates must be positive monetary values
- Overtime rates must be greater than or equal to regular rates
- Job codes must be unique within the contract
- Start and end dates are optional (null indicates ongoing applicability)

## Billing Calculation Rules

### Hourly Billing Formula
**Rule Name**: Per Labor Hour Billing Calculation
**Description**: Monthly billing based on actual hours worked by job classification
**Applies To**: All per labor hour contracts

**Calculation Formula**:
```
Monthly Invoice Amount = Sum of (Job Hours × Job Rate) for all Job Codes

For each Job Code:
Regular Hours Charge = Regular Hours × Regular Rate
Overtime Hours Charge = Overtime Hours × Overtime Rate
Job Code Total = Regular Hours Charge + Overtime Hours Charge

Total Invoice = Sum of all Job Code Totals
```

### Current Contract Rates
**Inpatient Transport (IPT)**:
```
Regular Hours: Hours × $25.08
Overtime Hours: Overtime Hours × $25.08
```

**Manager (SRACCTMGR)**:
```
Regular Hours: Hours × $25.08
Overtime Hours: Overtime Hours × $25.08
```

### Hours Classification Rules
- **Regular Hours**: Standard work hours up to 40 hours per week
- **Overtime Hours**: Hours exceeding 40 hours per week (where applicable)
- **Holiday Hours**: Special classification for holiday work (if applicable)
- **Premium Hours**: Special rates for specific time periods (if applicable)

## Rate Escalation Configuration

### Annual Escalation Rules
**Escalation Month**: November
**Escalation Amount**: $3.00 per hour
**Escalation Type**: Fixed dollar amount increase
**Consumer Price Index**: False (no CPI adjustments)

### Escalation Calculation Formula
**Rule Name**: Annual Rate Escalation
**Description**: Automatic annual increase in hourly rates
**Applies To**: All job codes within the contract

**Escalation Formula**:
```
New Rate = Current Rate + Escalation Amount
New Rate = Current Rate + $3.00

Applied to:
- Regular Rate: $25.08 + $3.00 = $28.08 (effective November)
- Overtime Rate: $25.08 + $3.00 = $28.08 (effective November)
```

### Escalation Validation Rules
- Escalation occurs annually on the specified month
- Escalation amount applies to both regular and overtime rates
- Escalation is automatic unless contract specifies otherwise
- Historical rates are preserved for audit purposes

## Hours Backup Reporting Requirements

### Hours Backup Report Configuration
**Hours Backup Report Required**: True
**Report Type**: "HoursBackupReport"
**Submission Frequency**: Monthly
**Submission Deadline**: 10 business days after month-end

### Hours Backup Report Contents
**Required Information**:
- Employee name and identification
- Job code classification
- Daily hours worked (regular and overtime)
- Total monthly hours by job code
- Supervisor approval and signature
- Exception explanations for unusual hours

### Hours Validation Rules
**Rule Name**: Hours Data Validation
**Description**: Validation of reported hours against contract parameters
**Applies To**: All hours backup reports

**Validation Criteria**:
- Total hours must reconcile to payroll records
- Overtime hours must comply with labor regulations
- Job code assignments must match approved classifications
- Daily hours must not exceed maximum allowable limits
- Missing days must be explained and documented

## Legion Workforce Integration

### Payroll Data Integration
**Integration Method**: Real-time API integration with Legion workforce management system
**Data Synchronization**: Automated hourly data retrieval and validation
**Job Code Mapping**: Automatic mapping between Legion job codes and contract job codes

### Payroll Data Processing
**Data Source**: Legion payroll system via `IPayrollRepository`
**Billing Period Format**: "yyyy-MM" (e.g., "2025-08")
**Hours Aggregation**: Monthly aggregation by job code for billing calculations
**Fallback Mechanism**: Budget hours used when payroll data unavailable

### Integration Validation Rules
- Payroll data must be available within 5 business days of month-end
- Job code mappings must be validated and approved
- Hours discrepancies require manual review and approval
- Integration failures trigger automatic alerts and fallback procedures

## Billing Configuration Rules

### Payment Terms and Timing
- **Payment Terms**: "Due in 30 Days" from invoice date
- **Billing Type**: "Arrears" (billing after service period)
- **Billing Frequency**: Monthly
- **Invoice Generation**: Automated based on hours backup reports

### Contract Increment Parameters
- **Increment Month**: November (annual rate adjustment)
- **Increment Amount**: $3.00 (fixed dollar increase)
- **Consumer Price Index**: False (no CPI adjustments)

### Deviation Thresholds
- **Deviation Amount**: $2,500.00 (absolute variance threshold)
- **Deviation Percentage**: 10.0% (relative variance threshold)
- **Deviation Handling**: Manual review required when exceeded

## Supporting Documentation Requirements

### Required Reports
- **Hours Backup Report**: Detailed hours worked by employee and job code

### Report Validation Rules
- Reports must be submitted within 10 business days of month-end
- All hours must be supported by timekeeping records
- Supervisor approval required for all reported hours
- Variance explanations required for deviations exceeding thresholds

## Contract Component Enablement Rules

### Enabled Components
- **Per Labor Hour**: Primary billing mechanism with job-specific rates

### Disabled Components
- **Fixed Fee**: Not applicable for per labor hour contracts
- **Revenue Share**: Not applicable for per labor hour contracts
- **Management Agreement**: Not applicable for per labor hour contracts
- **Per Occupied Room**: Not applicable for per labor hour contracts
- **Bell Service Fee**: Not applicable for this contract
- **Mid-Month Advance**: Not applicable for this contract
- **Deposited Revenue**: Not applicable for this contract
- **Billable Accounts**: Not applicable for this contract

## Invoice Calculation Examples

### Monthly Invoice Composition
**Example Calculation** (hypothetical hours):

**Inpatient Transport (IPT)**:
- Regular Hours: 160 hours × $25.08 = $4,012.80
- Overtime Hours: 20 hours × $25.08 = $501.60
- IPT Subtotal: $4,514.40

**Manager (SRACCTMGR)**:
- Regular Hours: 40 hours × $25.08 = $1,003.20
- Overtime Hours: 5 hours × $25.08 = $125.40
- Manager Subtotal: $1,128.60

**Total Monthly Invoice**: $4,514.40 + $1,128.60 = $5,643.00

### Rate Escalation Impact
**Post-November Escalation** (same hours):

**Inpatient Transport (IPT)**:
- Regular Hours: 160 hours × $28.08 = $4,492.80
- Overtime Hours: 20 hours × $28.08 = $561.60
- IPT Subtotal: $5,054.40

**Manager (SRACCTMGR)**:
- Regular Hours: 40 hours × $28.08 = $1,123.20
- Overtime Hours: 5 hours × $28.08 = $140.40
- Manager Subtotal: $1,263.60

**Total Monthly Invoice**: $5,054.40 + $1,263.60 = $6,318.00
**Annual Increase**: $6,318.00 - $5,643.00 = $675.00 (+11.96%)

## Financial Summary Calculations

### Contract Valuation
- **Annual Contract Value**: Variable (depends on actual hours worked)
- **Estimated Annual Revenue**: Based on projected hours and current rates
- **Contract Term**: 36 months
- **Contract Term Unit**: Months

### Performance Metrics
- **Rate Predictability**: 100% predictable hourly rates
- **Volume Variability**: Revenue varies with actual hours worked
- **Escalation Impact**: Annual rate increases provide revenue growth
- **Risk Assessment**: Low (hourly rates provide cost certainty)

## Job Code Management Rules

### Job Code Classification
**Rule Name**: Job Code Assignment and Management
**Description**: Standardized job codes for consistent billing
**Applies To**: All per labor hour contracts

**Job Code Standards**:
- **IPT**: Inpatient Transport services
- **SRACCTMGR**: Senior Account Manager/Site Manager
- Additional codes may be added by contract amendment

### Job Code Validation Rules
- Job codes must match approved organizational standards
- Job code assignments must be documented and approved
- Job code changes require formal contract amendment
- Historical job code data must be preserved

## Overtime Calculation Rules

### Overtime Definition
**Rule Name**: Overtime Hours Classification
**Description**: Definition and calculation of overtime hours
**Applies To**: All applicable job codes and jurisdictions

**Overtime Criteria**:
- Hours exceeding 40 hours per week (standard)
- Hours worked on designated holidays
- Hours worked outside normal business hours (if specified)
- State and federal labor law compliance

### Overtime Rate Application
**Current Configuration**: Overtime rate equals regular rate ($25.08)
**Alternative Configurations**: 
- Time-and-a-half (1.5x regular rate)
- Double-time (2.0x regular rate)
- Premium rates for specific circumstances

## Validation Rules

### Data Integrity Requirements
- All hourly rates must be positive monetary values
- Hours worked must be non-negative
- Job codes must match approved classifications
- Date fields must follow ISO 8601 format
- GUID fields must be valid UUID format

### Business Logic Validation
- Total monthly hours must be reasonable and justified
- Overtime hours must comply with labor regulations
- Rate escalations must be applied consistently
- Invoice amounts must reconcile to hours and rates

## Integration Points

### System Dependencies
- **Power Platform Billing System**: Primary contract storage and processing
- **Legion Workforce System**: Hours tracking and payroll integration
- **Payroll System**: Coordination with payroll processing
- **General Ledger Integration**: Financial reporting and reconciliation
- **Customer Portal**: Hours reporting and invoice visibility

### Data Flow Requirements
- Real-time hours data synchronization with Legion
- Monthly billing cycle automation
- Rate escalation processing
- Exception handling for unusual hours patterns
- Audit trail maintenance for all modifications

## Exception Handling

### Hours Discrepancy Procedures
1. **Automatic Detection**: System flags unusual hours patterns
2. **Manual Review**: Site manager investigates discrepancies
3. **Documentation**: Required explanations for exceptions
4. **Approval Process**: Supervisor approval for unusual hours
5. **Correction Processing**: Adjustments applied to subsequent billing

### Rate Change Procedures
1. **Escalation Processing**: Automatic annual rate increases
2. **Manual Adjustments**: Contract amendments for rate changes
3. **System Updates**: Configuration changes in billing system
4. **Notification**: Customer communication of rate changes
5. **Audit Trail**: Complete history of rate modifications

## Regulatory Compliance

### Labor Law Compliance
- **Fair Labor Standards Act (FLSA)**: Overtime calculation compliance
- **State Labor Laws**: Jurisdiction-specific requirements
- **Wage and Hour Regulations**: Minimum wage and overtime compliance
- **Record Keeping Requirements**: Detailed hours and wage documentation

### Financial Reporting Compliance
- **Revenue Recognition**: ASC 606 compliance for service revenue
- **SOX Compliance**: Internal controls for financial calculations
- **Audit Requirements**: Comprehensive audit trail maintenance
- **Tax Compliance**: Payroll tax and employment tax obligations

## Related Documentation

- [Per Labor Hour Contract Code Validation Report](../validation-reports/per-labor-hour-contract-code-validation-report.md) ✓ LINKED
- [Revenue Share Contract Business Rules](revenue-share-contract-business-rules.md) ✓ LINKED
- [Management Agreement Contract Configuration Business Rules](management-agreement-contract-configuration-business-rules.md) ✓ LINKED
- [Fixed Fee Contract Configuration Business Rules](fixed-fee-contract-configuration-business-rules.md) ✓ LINKED
- [Towne Park Forecasting System Comprehensive Master Architecture](../technical-specifications/towne-park-forecasting-system-comprehensive-master-architecture.md) ✓ LINKED

## Quick Reference

### Key Rates
- **Current Hourly Rate**: $25.08 (both regular and overtime)
- **Annual Escalation**: $3.00 per hour (effective November)
- **Post-Escalation Rate**: $28.08 per hour

### Key Job Codes
- **IPT**: Inpatient Transport
- **SRACCTMGR**: Senior Account Manager/Site Manager

### Key Deadlines
- **Hours Backup Report**: 10 business days after month-end
- **Rate Escalation**: November annually
- **Invoice Generation**: Monthly, based on actual hours worked

### Integration Systems
- **Legion Workforce**: Payroll and hours tracking
- **Power Platform**: Contract management and billing
- **Great Plains ERP**: Financial reporting and GL posting

---

*This document serves as the authoritative source for all per labor hour contract configuration business rules and calculation procedures. All system implementations must comply with these documented requirements.*