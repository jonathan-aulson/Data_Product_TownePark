---
title: "Towne Park Billing - Per Labor Hour Contract Business Rules"
description: "Comprehensive business rules for per labor hour contract billing, including job rate calculations, overtime handling, deviation management, and hours reporting requirements"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-05-23
version: 1.0
status: Draft
version_history:
  - version: "1.0"
    date: "2025-07-24"
    changes: "Initial creation from per labor hour contract JSON analysis with comprehensive business rules"
source_files:
  - "0451_AD4F02E4_90D8_EF11_8EEA_0022480A57AC.json"
tags:
  - billing
  - contracts
  - per-labor-hour
  - business-rules
  - job-rates
  - overtime
---

# Per Labor Hour Contract Business Rules

## Overview

This document defines the comprehensive business rules for per labor hour contract billing within the Towne Park billing system. Per labor hour contracts bill customers based on actual hours worked by staff, with specific rates for different job classifications and overtime calculations.

## Contract Structure

### Core Components

#### 1. Job Rate Configuration
- **Job Classifications**: Each contract defines specific job codes with associated rates
- **Rate Structure**: Standard hourly rate and overtime rate per job classification
- **Display Names**: User-friendly names for job classifications on invoices
- **Invoice Grouping**: Jobs can be grouped for consolidated billing

#### 2. Hours Tracking Requirements
- **Hours Backup Report**: Mandatory detailed reporting of all hours worked
- **Job Code Assignment**: All hours must be assigned to valid job classifications
- **Overtime Identification**: System must distinguish regular vs overtime hours

### Business Rules

#### BR-PLH-001: Job Rate Assignment
- **Rule**: All billable hours must be assigned to a valid job classification
- **Implementation**: System validates job codes against contract configuration
- **Exception Handling**: Invalid job codes trigger validation errors

#### BR-PLH-002: Overtime Rate Calculation
- **Rule**: Overtime hours are billed at the specified overtime rate for each job classification
- **Standard Logic**: Overtime rate may equal or exceed standard rate
- **Validation**: System ensures overtime rates are properly configured

#### BR-PLH-003: Hours Backup Report Generation
- **Rule**: All per labor hour contracts require detailed hours backup reports
- **Content Requirements**:
  - Employee identification
  - Job classification codes
  - Regular vs overtime hour breakdown
  - Date and time tracking
  - Site-specific hour allocation

#### BR-PLH-004: Invoice Grouping Logic
- **Rule**: Jobs with the same invoice group number are consolidated on invoices
- **Implementation**: System groups line items by invoice group for billing
- **Display**: Grouped items show consolidated totals with detailed backup

## Rate Management

### Rate Structure Rules

#### BR-PLH-005: Rate Validation
- **Rule**: All job rates must be positive values greater than zero
- **Overtime Constraint**: Overtime rate must be greater than or equal to standard rate
- **Currency**: All rates stored and calculated in USD with 2 decimal precision

#### BR-PLH-006: Rate Effective Dates
- **Rule**: Job rates can have start and end dates for time-based pricing
- **Default Behavior**: Null dates indicate rates are effective for entire contract period
- **Overlap Prevention**: System prevents overlapping rate periods for same job classification

### Annual Increment Processing

#### BR-PLH-007: Rate Increment Application
- **Rule**: Annual increments apply to all job rates unless specifically excluded
- **Timing**: Increments processed during specified increment month
- **Calculation**: Percentage-based increases applied to current rates
- **Rounding**: Results rounded to 2 decimal places using standard rounding rules

## Billing Calculations

### Invoice Generation Rules

#### BR-PLH-008: Billing Period Calculation
- **Rule**: Hours are billed based on the billing type (Arrears/Advance)
- **Arrears Billing**: Previous month's hours billed in current month
- **Advance Billing**: Current month's estimated hours billed in advance
- **Cutoff Dates**: Billing periods align with customer-specified cutoff dates

#### BR-PLH-009: Deviation Threshold Management
- **Rule**: Invoices exceeding deviation thresholds require approval
- **Amount Threshold**: Absolute dollar amount deviation limit
- **Percentage Threshold**: Percentage-based deviation from expected amounts
- **Approval Process**: Deviations trigger workflow for management approval

### Financial Calculations

#### BR-PLH-010: Line Item Calculation
```
Line Item Total = (Regular Hours × Standard Rate) + (Overtime Hours × Overtime Rate)
```

#### BR-PLH-011: Invoice Total Calculation
```
Invoice Total = Sum of all Line Items + Applicable Taxes + Additional Fees
```

#### BR-PLH-012: Deviation Calculation
```
Amount Deviation = |Actual Invoice Total - Expected Amount|
Percentage Deviation = (Amount Deviation / Expected Amount) × 100
```

## Data Validation Rules

### Contract Configuration Validation

#### BR-PLH-013: Required Field Validation
- **Job Rate Requirements**:
  - Job code (alphanumeric, max 20 characters)
  - Display name (required for invoicing)
  - Standard rate (positive decimal)
  - Overtime rate (positive decimal, >= standard rate)

#### BR-PLH-014: Job Code Standards
- **Format**: Alphanumeric codes following organizational standards
- **Uniqueness**: Job codes must be unique within each contract
- **Reserved Codes**: System reserves specific codes for administrative functions

### Hours Data Validation

#### BR-PLH-015: Hours Entry Validation
- **Range Limits**: Daily hours cannot exceed 24 hours per employee
- **Negative Values**: System rejects negative hour entries
- **Decimal Precision**: Hours tracked to 0.25 hour increments (15 minutes)

## Integration Requirements

### System Integration Rules

#### BR-PLH-016: Payroll System Integration
- **Data Synchronization**: Job codes must align with payroll system classifications
- **Rate Consistency**: Billing rates may differ from payroll rates but require reconciliation
- **Reporting**: System provides variance reports between billing and payroll data

#### BR-PLH-017: Time Tracking Integration
- **Real-time Updates**: Hours data synchronized from time tracking systems
- **Validation**: System validates time entries against employee schedules
- **Exception Handling**: Discrepancies trigger review workflows

## Reporting Requirements

### Standard Reports

#### BR-PLH-018: Hours Backup Report
- **Frequency**: Generated monthly for each billing period
- **Content**: Detailed breakdown of all billable hours by job classification
- **Format**: Standardized format for customer review and approval

#### BR-PLH-019: Rate Analysis Report
- **Purpose**: Track rate changes and increment applications
- **Frequency**: Generated annually and upon rate changes
- **Distribution**: Provided to account managers and finance teams

## Exception Handling

### Error Resolution Rules

#### BR-PLH-020: Missing Hours Data
- **Detection**: System identifies periods with missing or incomplete hours
- **Resolution**: Automated alerts to operations teams for data completion
- **Billing Impact**: Incomplete data prevents invoice generation

#### BR-PLH-021: Rate Configuration Errors
- **Validation**: System validates rate configurations during contract setup
- **Error Types**: Missing rates, invalid values, configuration conflicts
- **Resolution**: Errors must be resolved before contract activation

## Compliance and Audit

### Audit Trail Requirements

#### BR-PLH-022: Change Tracking
- **Rate Changes**: All rate modifications logged with user and timestamp
- **Hours Adjustments**: Manual hour adjustments require approval and documentation
- **Configuration Updates**: Contract configuration changes tracked for audit

#### BR-PLH-023: Data Retention
- **Hours Data**: Retained for minimum 7 years for audit purposes
- **Rate History**: Complete rate change history maintained
- **Invoice Backup**: Supporting documentation retained per contract terms

## Implementation Notes

### System Configuration
- Per labor hour contracts require `perLaborHour.enabled = true`
- Hours backup report generation requires `hoursBackupReport = true`
- Job rates configured in `jobRates` array with required fields

### Performance Considerations
- Large contracts with multiple job classifications may require optimized rate lookup
- Hours data aggregation should be performed efficiently for reporting
- Invoice generation should handle high-volume hour transactions

---

*This document serves as the authoritative source for per labor hour contract business rules. All system implementations must comply with these rules to ensure accurate billing and customer satisfaction.*