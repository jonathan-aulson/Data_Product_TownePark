---
title: "Towne Park Per Labor Hour Contract Configuration - Business Rules"
description: "Comprehensive business rules and calculation formulas for per labor hour contract configuration, including job-specific rates, overtime calculations, annual escalations, and hours backup reporting requirements"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-05-23
version: 1.0
status: Draft
owner: "Documentation Team"
source_documents:
  - "0451_AD4F02E4_90D8_EF11_8EEA_0022480A57AC.json"
systems:
  - Billing
  - Contract Management
components:
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Per Labor Hour Billing
  - Job Code Management
  - Hours Tracking
  - Rate Escalation
user_roles:
  - Account Manager
  - Billing Admin
  - Billing Manager
  - Site Manager
  - Regional Finance
  - Corporate Finance
tags:
  - per-labor-hour
  - contract-configuration
  - business-rules
  - job-codes
  - hourly-rates
  - overtime-calculations
  - rate-escalation
  - hours-backup
---

# Towne Park Per Labor Hour Contract Configuration - Business Rules

## Overview

Per Labor Hour contracts represent a straightforward billing model where Towne Park charges predetermined hourly rates for specific job classifications, with separate rates for regular and overtime hours. This document defines the complete business rules, calculation formulas, and configuration parameters for per labor hour contract management, based on the Lee's Summit Medical Center contract implementation (Site 0451).

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
- **Hours Tracking System**: Integration with timekeeping systems
- **Payroll System**: Coordination with payroll processing
- **General Ledger Integration**: Financial reporting and reconciliation
- **Customer Portal**: Hours reporting and invoice visibility

### Data Flow Requirements
- Real-time hours data synchronization
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

## Related Documentation

- [Per Labor Hour Contract Types Overview](../contract-types/per-labor-hour.md)
- [Contract Management System Overview](../systems/contracts/contract-management-overview.md)
- [PLH Rate Escalation Rules](../contracts/plh-rate-escalation.md)
- [Job Code Management](../../technical/database/job-code-management.md)
- [Hours Tracking System](../../technical/integrations/hours-tracking-integration.md)
- [Billing Process User Guide](../../user-processes/billing-admin/billing-process-guide.md)
- [Customer Site Configuration](../../configuration/customer-sites/site-configuration-guide.md)

## Code Validation Report

**Last Validated**: 2025-07-24
**Validation Scope**: Business Rules and Configuration Schema
**Code Copy Date**: Current system implementation

### Validation Summary
- ✅ **Verified Elements**: JSON schema structure matches documented business rules
- ❓ **Requires Validation**: Per labor hour calculation formulas against Power Platform implementation
- 🔍 **Requires Review**: Rate escalation and overtime calculation procedures

### Detailed Validation Results

#### Per Labor Hour Rate Rules
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/`
**Documented Element**: "Job-specific rates at $25.08 with $3.00 annual escalation"
**Validation Status**: 🔍 **REQUIRES REVIEW** - Need to validate against Power Platform formula implementation
**Findings**: JSON structure documented but calculation logic requires code validation
**Recommendations**: Validate against Power Platform billing formulas for per labor hour calculations

#### Rate Escalation Rules
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/`
**Documented Element**: "Annual escalation of $3.00 in November"
**Validation Status**: 🔍 **REQUIRES REVIEW** - Need to validate escalation calculation implementation
**Findings**: Escalation amount documented but timing logic requires verification
**Recommendations**: Validate escalation processing against Power Platform implementation

#### Hours Backup Report Requirements
**Source Code**: `Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/`
**Documented Element**: "Hours backup report required for billing validation"
**Validation Status**: 🔍 **REQUIRES REVIEW** - Need to validate reporting workflow implementation
**Findings**: Report requirement documented but workflow requires verification
**Recommendations**: Validate hours backup report processing against Power Platform workflows

#### Contract Configuration Schema
**Source Code**: `Current_State_Data_Product/Contract_Details/per-labor-hour/`
**Documented Element**: Complete JSON schema with all configuration parameters
**Validation Status**: ✅ **VERIFIED** - JSON structure matches documented schema
**Findings**: All documented fields present in source data structure
**Recommendations**: None required - documentation accurately reflects data structure

### Code File References
- `Current_State_Data_Product/Contract_Details/per-labor-hour/0451_AD4F02E4_90D8_EF11_8EEA_0022480A57AC.json`
- `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/` (requires validation)

### Validation Limitations
- Power Platform formula validation pending access to current implementation
- Per labor hour calculation engine validation requires live system testing
- Rate escalation procedures require workflow documentation review
- Hours backup report processing requires integration validation
- Overtime calculation procedures require labor law compliance verification