---
title: "Billing - Account Validation Business Rules"
description: "Comprehensive business rules for validating unit accounts against Great Plains master table and managing data integrity in the billing system"
created_date: 2025-07-17
last_updated_date: 2025-07-17
source_date: 2025-07-02
version: 1.0
status: Draft
owner: "Finance Manager"
source_documents:
  - "20250702_Completed_User_Stories_Sprint_27.md"
systems:
  - Billing
  - Great Plains
components:
  - Data Validation
  - Business Logic
  - Integration
business_domains:
  - Account Management
  - Data Quality
  - Financial Controls
user_roles:
  - Billing Admin
  - Finance Manager
  - System Administrator
tags:
  - billing
  - business-rules
  - account-validation
  - data-quality
  - great-plains
  - financial-controls
---

# Billing - Account Validation Business Rules

## Purpose

This document defines the comprehensive business rules governing the validation of unit accounts against the Great Plains (GP) master table within the billing system. These rules ensure data integrity, maintain financial accuracy, and establish standardized procedures for account management and validation processes.

## Scope and Applicability

### System Scope
- **Primary System**: Towne Park Billing System
- **Integration System**: Great Plains (GP) Financial System
- **Data Scope**: All unit accounts requiring billing processing
- **Process Scope**: Account creation, modification, validation, and batch processing

### Business Domain Coverage
- Account number format and structure validation
- Great Plains master table synchronization
- Data quality and integrity requirements
- Batch processing and error handling procedures
- Financial control and compliance requirements

## Core Business Rules

### BR-AV-001: Account Number Format Requirements

**Rule Statement**: All unit account numbers must conform to established format standards before validation processing.

**Business Justification**: Standardized account numbering ensures consistent data processing, reduces errors, and maintains compatibility with Great Plains system requirements.

**Rule Details**:
- **Format Pattern**: Account numbers must follow the pattern `[A-Z0-9]{6,12}`
- **Length Requirements**: Minimum 6 characters, maximum 12 characters
- **Character Set**: Alphanumeric characters only (A-Z, 0-9)
- **Special Characters**: No special characters, spaces, or punctuation allowed
- **Case Sensitivity**: All letters must be uppercase

**Validation Logic**:
```
IF account_number MATCHES /^[A-Z0-9]{6,12}$/ THEN
    PASS format validation
ELSE
    FAIL with error "Invalid account number format"
```

**Error Handling**: Accounts failing format validation are rejected and flagged for correction before processing.

**Exceptions**: None - all accounts must meet format requirements.

### BR-AV-002: Great Plains Master Table Validation

**Rule Statement**: All unit accounts must exist in the Great Plains master table with active status before billing processing.

**Business Justification**: Ensures billing system accounts are properly synchronized with the financial system of record, preventing billing errors and maintaining financial accuracy.

**Rule Details**:
- **Existence Check**: Account number must exist in GP master table
- **Status Validation**: GP account status must be "Active"
- **Data Consistency**: Key fields must match between systems
- **Synchronization Window**: Validation must occur within 24 hours of account creation/modification

**Validation Process**:
1. Query GP master table for account number
2. Verify account exists and status is active
3. Compare key data fields for consistency
4. Log validation results and any discrepancies

**Error Conditions**:
- Account not found in GP master table
- Account exists but status is inactive
- Data mismatch between billing system and GP
- GP system unavailable during validation

### BR-AV-003: Data Consistency Requirements

**Rule Statement**: Critical account data fields must maintain consistency between the billing system and Great Plains master table.

**Business Justification**: Data consistency ensures accurate billing, proper financial reporting, and maintains audit trail integrity.

**Required Matching Fields**:
- Account Number (exact match)
- Account Description (substantial match - 90% similarity)
- Customer Assignment (exact match)
- Account Type (exact match)
- Active Status (exact match)

**Tolerance Rules**:
- **Account Description**: Allow minor formatting differences but require 90% text similarity
- **Date Fields**: Allow up to 1 business day variance for processing delays
- **Numeric Fields**: Exact match required for all monetary amounts

**Validation Algorithm**:
```
FOR each required field:
    IF field_type = "exact_match" THEN
        IF billing_value != gp_value THEN FAIL
    ELSE IF field_type = "similarity_match" THEN
        IF similarity_score < 0.90 THEN FAIL
    ELSE IF field_type = "date_tolerance" THEN
        IF abs(billing_date - gp_date) > 1_business_day THEN FAIL
```

### BR-AV-004: Batch Processing Rules

**Rule Statement**: Account validation must be performed in controlled batches with defined size limits and error thresholds.

**Business Justification**: Batch processing ensures system performance, enables error recovery, and provides manageable processing units for monitoring and troubleshooting.

**Batch Configuration Rules**:
- **Maximum Batch Size**: 2,000 accounts per batch
- **Minimum Batch Size**: 100 accounts per batch (except final batch)
- **Processing Window**: Batches processed during off-peak hours (6 PM - 6 AM)
- **Concurrent Batches**: Maximum 3 concurrent batches to prevent system overload

**Error Threshold Rules**:
- **Critical Error Threshold**: Stop processing if >5% of batch has critical errors
- **Warning Threshold**: Generate alert if >10% of batch has warnings
- **Retry Logic**: Failed batches automatically retry up to 3 times
- **Escalation**: Notify administrators after 3 failed retry attempts

**Batch Status Management**:
- **Queued**: Batch created and waiting for processing
- **Processing**: Batch currently being validated
- **Completed**: Batch successfully processed with <5% errors
- **Failed**: Batch failed validation or exceeded error thresholds
- **Retry**: Batch scheduled for retry processing

### BR-AV-005: Error Classification and Handling

**Rule Statement**: Validation errors must be classified by severity and handled according to established escalation procedures.

**Business Justification**: Structured error handling ensures appropriate response to different types of validation failures and maintains system reliability.

**Error Classifications**:

**Critical Errors** (Processing Stops):
- Account not found in GP master table
- GP system connectivity failure
- Data corruption detected
- Security validation failure

**High Priority Errors** (Requires immediate attention):
- Account status mismatch (Active vs Inactive)
- Customer assignment discrepancy
- Account type mismatch
- Required field missing

**Medium Priority Errors** (Resolve within 24 hours):
- Description similarity below threshold
- Minor date discrepancies
- Non-critical field mismatches
- Format warnings

**Low Priority Errors** (Resolve during maintenance):
- Cosmetic formatting differences
- Non-essential field variations
- Performance warnings
- Audit trail gaps

**Escalation Matrix**:
| Error Level | Response Time | Escalation Path | Resolution Authority |
|-------------|---------------|-----------------|---------------------|
| Critical | Immediate | System Admin → IT Director | System Administrator |
| High | 4 hours | Billing Admin → Finance Manager | Finance Manager |
| Medium | 24 hours | Billing Admin | Billing Administrator |
| Low | 1 week | Billing Admin | Billing Administrator |

### BR-AV-006: Validation Frequency and Scheduling

**Rule Statement**: Account validation must be performed according to established frequency requirements based on account activity and business needs.

**Business Justification**: Regular validation ensures data integrity while balancing system performance and business requirements.

**Validation Schedule Requirements**:

**Real-time Validation** (Immediate):
- New account creation
- Account modification
- Status changes
- Customer reassignment

**Daily Validation** (End of business day):
- All accounts modified during the day
- Accounts flagged for review
- Failed validation retries
- System synchronization check

**Weekly Validation** (Sunday night):
- Complete account validation
- Data integrity audit
- Performance metrics review
- System health check

**Monthly Validation** (First weekend):
- Comprehensive data audit
- Compliance reporting
- Archive old validation logs
- System optimization review

**Validation Triggers**:
- Scheduled time-based triggers
- Event-driven triggers (account changes)
- Manual triggers (administrator request)
- System recovery triggers (after outages)

### BR-AV-007: Data Quality Standards

**Rule Statement**: All account data must meet established quality standards before validation processing and billing operations.

**Business Justification**: High data quality standards prevent billing errors, reduce processing time, and maintain customer satisfaction.

**Quality Metrics**:

**Completeness Requirements**:
- Account Number: 100% required
- Account Description: 100% required
- Customer Assignment: 100% required
- Account Type: 100% required
- Creation Date: 100% required

**Accuracy Requirements**:
- Account Number Format: 100% compliance
- GP Master Table Match: 99.5% accuracy
- Data Field Consistency: 99% accuracy
- Status Synchronization: 100% accuracy

**Timeliness Requirements**:
- New Account Validation: Within 1 hour of creation
- Modification Validation: Within 2 hours of change
- Batch Processing: Within 24 hours of submission
- Error Resolution: According to error classification timelines

**Quality Monitoring**:
- Daily quality metrics reporting
- Weekly trend analysis
- Monthly quality review meetings
- Quarterly quality improvement initiatives

### BR-AV-008: Audit and Compliance Requirements

**Rule Statement**: All validation activities must be logged and auditable to meet regulatory and business compliance requirements.

**Business Justification**: Comprehensive audit trails ensure regulatory compliance, support troubleshooting, and provide accountability for data management activities.

**Audit Log Requirements**:

**Mandatory Log Elements**:
- Timestamp (UTC with timezone)
- User identification
- Account number(s) processed
- Validation type and scope
- Results and error details
- System performance metrics

**Log Retention**:
- Active logs: 90 days online storage
- Archive logs: 7 years offline storage
- Error logs: 2 years online storage
- Performance logs: 1 year online storage

**Compliance Reporting**:
- Daily validation summary reports
- Weekly error trend analysis
- Monthly compliance dashboard
- Quarterly audit reports

**Access Controls**:
- Read access: Billing Admin, Finance Manager, Auditors
- Write access: System processes only
- Administrative access: System Administrator
- Audit access: Internal and external auditors

### BR-AV-009: System Integration Requirements

**Rule Statement**: Account validation must maintain proper integration with all connected systems while ensuring data consistency and system reliability.

**Business Justification**: Proper system integration ensures seamless data flow, prevents data silos, and maintains operational efficiency.

**Integration Points**:

**Great Plains Integration**:
- Real-time connectivity required
- Automatic failover to backup connection
- Connection timeout: 30 seconds
- Retry attempts: 3 with exponential backoff

**Billing System Integration**:
- Immediate validation result updates
- Batch status synchronization
- Error notification integration
- Performance monitoring integration

**Notification System Integration**:
- Real-time error alerts
- Batch completion notifications
- Performance threshold alerts
- System health status updates

**Reporting System Integration**:
- Automated report generation
- Data export capabilities
- Dashboard integration
- Metrics collection and analysis

### BR-AV-010: Performance and Scalability Requirements

**Rule Statement**: Account validation processes must meet established performance benchmarks and scale to accommodate business growth.

**Business Justification**: Performance standards ensure timely processing, maintain user productivity, and support business scalability.

**Performance Benchmarks**:

**Processing Speed**:
- Individual account validation: <2 seconds
- Batch validation (1000 accounts): <30 minutes
- System response time: <5 seconds
- Database query time: <1 second

**Throughput Requirements**:
- Peak processing: 10,000 accounts per hour
- Concurrent users: 50 simultaneous users
- Batch processing: 5 batches per hour
- System availability: 99.5% uptime

**Scalability Requirements**:
- Account volume growth: 20% annually
- User growth: 15% annually
- Transaction volume: 25% annually
- Data storage: 30% annually

**Performance Monitoring**:
- Real-time performance dashboards
- Automated performance alerts
- Weekly performance reports
- Monthly capacity planning reviews

## Business Rule Dependencies

### Internal Dependencies
- Customer management business rules
- Account creation and modification procedures
- Billing processing requirements
- Financial reporting standards

### External Dependencies
- Great Plains system availability and performance
- Network connectivity and security
- Database performance and capacity
- Third-party integration requirements

### Regulatory Dependencies
- Financial reporting regulations
- Data privacy requirements
- Audit and compliance standards
- Industry-specific regulations

## Implementation Guidelines

### Rule Prioritization
1. **Critical Rules**: BR-AV-001, BR-AV-002, BR-AV-005 (Must implement first)
2. **High Priority**: BR-AV-003, BR-AV-004, BR-AV-008 (Implement second)
3. **Medium Priority**: BR-AV-006, BR-AV-007, BR-AV-009 (Implement third)
4. **Standard Priority**: BR-AV-010 (Implement as resources allow)

### Testing Requirements
- Unit testing for each business rule
- Integration testing with Great Plains
- Performance testing under load
- User acceptance testing with business users

### Training Requirements
- Business rule training for all users
- System administration training
- Error handling procedures training
- Compliance and audit training

## Related Documentation

- [Billing Account Validation User Process](../../user-processes/billing-admin/20250702_Billing_AccountValidation_UserProcess.md) ✓ VERIFIED
- [Great Plains Integration Technical Specification](../../technical/integrations/great-plains-integration.md) ✓ VERIFIED
- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md) ✓ VERIFIED
- [Data Quality Standards](../../standards/data-quality-standards.md) ✓ VERIFIED
- [Financial Controls and Compliance](../../configuration/billing/financial-controls-configuration.md) 🔄 PLANNED
## Quick Links

- [Billing Account Validation User Process](../../user-processes/billing-admin/20250702_Billing_AccountValidation_UserProcess.md)
- [Great Plains Integration Technical Specification](../../technical/integrations/great-plains-integration.md)
- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Data Quality Standards](../../standards/data-quality-standards.md)
