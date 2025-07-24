---
title: "Towne Park RSS - Revenue Summary Sheet File Validation Business Rules"
description: "Comprehensive business rules governing RSS file validation, metadata requirements, processing criteria, and workflow management for Revenue Summary Sheet submissions"
created_date: 2025-07-23
last_updated_date: 2025-07-23
source_date: 2025-06-11
version: 1.0
status: Active
owner: "Amy Sowells"
contributors:
  - "Zakary Welch"
  - "Jonathan Aulson"
  - "Cesar Figueroa"
source_documents:
  - "20250611_RSS_Issue_Troubleshooting_Revenue_Spreadsheet_Support_Processed.md"
systems:
  - Billing
components:
  - SharePoint
  - Dataverse
  - Power Automate
business_domains:
  - Revenue Summary Sheet Processing
  - File Validation
  - Workflow Management
  - Integration Rules
user_roles:
  - Site Administrator
  - Billing Admin
  - Technical Support
  - Business Analyst
tags:
  - rss
  - business-rules
  - validation
  - file-processing
  - metadata
  - workflow
  - integration
  - billing
---

# Towne Park RSS - Revenue Summary Sheet File Validation Business Rules

## Overview

This document defines the comprehensive business rules governing RSS (Revenue Summary Sheet) file validation, processing criteria, and workflow management. These rules ensure data integrity, system reliability, and consistent processing of financial submissions from customer sites.

## Rule Definitions

### Rule Category: File Naming and Format Requirements

#### Rule R001: File Extension Requirement
- **Rule Name**: Mandatory File Extension in Title
- **Description**: All RSS file titles must include the complete file extension (.xlsm) for proper system processing
- **Applies To**: All RSS submissions from all customer sites
- **Calculation Formula**: `title.endsWith('.xlsm') === true`
- **Examples**: 
  - ✅ Valid: "108725 Rev.xlsm"
  - ❌ Invalid: "108725 Rev"
  - ❌ Invalid: "108725 Rev.xlsx"
- **Source**: Technical investigation 2025-06-11 - Site 8725 processing failure
- **Implementation**: Power Automate validation flow checks title format
- **Edge Cases**: 
  - Files with multiple extensions (e.g., "file.backup.xlsm") - Only final .xlsm required
  - Case sensitivity - Extension must be lowercase ".xlsm"
  - Unicode characters in filename - Must be properly encoded

#### Rule R002: Site Number Format Validation
- **Rule Name**: Site Number Prefix Requirement
- **Description**: File title must begin with valid 6-digit site number
- **Applies To**: All RSS submissions
- **Calculation Formula**: `title.match(/^\d{6}\s/) !== null`
- **Examples**:
  - ✅ Valid: "108725 Rev.xlsm"
  - ✅ Valid: "012345 Monthly.xlsm"
  - ❌ Invalid: "8725 Rev.xlsm" (insufficient digits)
  - ❌ Invalid: "ABC725 Rev.xlsm" (non-numeric)
- **Source**: Standard site numbering convention
- **Implementation**: Regex validation in Power Automate flow
- **Edge Cases**:
  - Leading zeros required for sites with numbers < 100000
  - Site numbers must exist in master site directory
  - Inactive sites require special handling approval

#### Rule R003: Document Type Specification
- **Rule Name**: Document Type Identifier Requirement
- **Description**: File title must include document type identifier after site number
- **Applies To**: All RSS submissions
- **Calculation Formula**: `title.match(/^\d{6}\s+\w+\.xlsm$/) !== null`
- **Examples**:
  - ✅ Valid: "108725 Rev.xlsm"
  - ✅ Valid: "108725 Monthly.xlsm"
  - ✅ Valid: "108725 Revised.xlsm"
  - ❌ Invalid: "108725.xlsm" (missing document type)
- **Source**: Document classification requirements
- **Implementation**: Pattern matching validation
- **Edge Cases**:
  - Multiple word document types allowed with spaces
  - Special characters in document type not permitted
  - Document type case insensitive

### Rule Category: Metadata Validation Requirements

#### Rule R004: Required Metadata Completeness
- **Rule Name**: Complete Metadata Population
- **Description**: All required SharePoint metadata fields must be populated before processing
- **Applies To**: All RSS file submissions
- **Calculation Formula**: `requiredFields.every(field => metadata[field] !== null && metadata[field] !== '')`
- **Examples**:
  - Required fields: Title, Site Number, Document Type, Submission Status, Last Modified
  - All fields must contain valid, non-empty values
- **Source**: SharePoint integration requirements
- **Implementation**: Metadata validation in webhook processing
- **Edge Cases**:
  - Default values not acceptable for required fields
  - Null vs empty string both considered invalid
  - Whitespace-only values considered invalid

#### Rule R005: Site Number Consistency Validation
- **Rule Name**: Site Number Cross-Reference Validation
- **Description**: Site number in filename must match site number in metadata fields
- **Applies To**: All RSS submissions
- **Calculation Formula**: `extractSiteFromTitle(title) === metadata.siteNumber`
- **Examples**:
  - ✅ Valid: Title "108725 Rev.xlsm" with Site Number field "108725"
  - ❌ Invalid: Title "108725 Rev.xlsm" with Site Number field "108726"
- **Source**: Data integrity requirements
- **Implementation**: Cross-field validation logic
- **Edge Cases**:
  - Leading zeros must match exactly
  - String vs numeric comparison handling
  - Case sensitivity considerations

#### Rule R006: Submission Status Workflow Validation
- **Rule Name**: Valid Submission Status Progression
- **Description**: Submission status must follow defined workflow progression
- **Applies To**: All RSS file status changes
- **Calculation Formula**: `validTransitions[currentStatus].includes(newStatus)`
- **Examples**:
  - Valid transitions: Draft → Submitted → Processing → Completed
  - Valid transitions: Submitted → Rejected → Submitted
  - ❌ Invalid: Completed → Draft
- **Source**: Workflow management requirements
- **Implementation**: Status change validation logic
- **Edge Cases**:
  - Administrative override capabilities for support staff
  - Bulk status changes require special validation
  - System-initiated vs user-initiated status changes

### Rule Category: Timing and Processing Rules

#### Rule R007: Modification Timing Restriction
- **Rule Name**: Post-Submission Modification Window
- **Description**: Files modified within 1 minute of submission may bypass webhook processing
- **Applies To**: All RSS submissions with rapid modifications
- **Calculation Formula**: `(lastModified - submissionTime) < 60000` (milliseconds)
- **Examples**:
  - ✅ Safe: File submitted at 10:00:00, modified at 10:01:30
  - ⚠️ Risk: File submitted at 10:00:00, modified at 10:00:30
- **Source**: Technical investigation - webhook timing behavior
- **Implementation**: Timestamp comparison in processing logic
- **Edge Cases**:
  - System clock synchronization issues
  - Timezone handling for distributed users
  - Automatic system modifications vs user modifications

#### Rule R008: Processing Window Validation
- **Rule Name**: Business Hours Processing Preference
- **Description**: RSS submissions during business hours receive priority processing
- **Applies To**: All RSS submissions
- **Calculation Formula**: `isBusinessHours(submissionTime) ? priority = 'high' : priority = 'normal'`
- **Examples**:
  - High priority: Submissions 8:00 AM - 6:00 PM EST
  - Normal priority: Submissions outside business hours
- **Source**: Business operations requirements
- **Implementation**: Priority queue management
- **Edge Cases**:
  - Holiday schedule considerations
  - Multiple timezone handling for national operations
  - Emergency processing override capabilities

#### Rule R009: Duplicate Submission Prevention
- **Rule Name**: Duplicate File Detection and Handling
- **Description**: System must detect and handle duplicate RSS submissions for same site/period
- **Applies To**: All RSS submissions
- **Calculation Formula**: `existingFiles.filter(f => f.siteNumber === newFile.siteNumber && f.period === newFile.period).length > 0`
- **Examples**:
  - Duplicate detection: Same site number and reporting period
  - Resolution: Latest submission supersedes previous
- **Source**: Data integrity and business process requirements
- **Implementation**: Duplicate detection logic with user notification
- **Edge Cases**:
  - Legitimate resubmissions for corrections
  - Partial month submissions vs full month
  - Multi-site submissions from single file

### Rule Category: Integration and Synchronization Rules

#### Rule R010: SharePoint-Dataverse Synchronization Validation
- **Rule Name**: Bi-directional Synchronization Integrity
- **Description**: Data must remain consistent between SharePoint and Dataverse systems
- **Applies To**: All RSS file processing and updates
- **Calculation Formula**: `sharePointData.equals(dataverseData) === true`
- **Examples**:
  - All metadata fields must match exactly
  - Timestamps must be within acceptable variance (< 5 minutes)
- **Source**: Integration architecture requirements
- **Implementation**: Synchronization validation checks
- **Edge Cases**:
  - Network latency causing temporary inconsistencies
  - Partial synchronization failures requiring retry
  - Manual data corrections requiring re-sync

#### Rule R011: Webhook Subscription Health Validation
- **Rule Name**: Active Webhook Subscription Requirement
- **Description**: RSS processing requires active, healthy webhook subscriptions
- **Applies To**: All automated RSS processing
- **Calculation Formula**: `webhookSubscription.status === 'active' && webhookSubscription.lastHeartbeat > (now - 300000)`
- **Examples**:
  - Active subscription with recent heartbeat (< 5 minutes)
  - Expired subscriptions trigger automatic renewal
- **Source**: Technical architecture requirements
- **Implementation**: Subscription health monitoring
- **Edge Cases**:
  - Subscription renewal during processing
  - Multiple subscription conflicts
  - Manual processing fallback when webhooks unavailable

#### Rule R012: PowerShell Script Backup Processing
- **Rule Name**: Alternative Processing Path Activation
- **Description**: PowerShell scripts provide backup processing when webhook processing fails
- **Applies To**: RSS files that fail webhook processing
- **Calculation Formula**: `webhookProcessingFailed === true ? activateBackupProcessing() : continueNormalFlow()`
- **Examples**:
  - Webhook timeout triggers PowerShell processing
  - Validation failures escalate to manual review
- **Source**: System resilience requirements
- **Implementation**: Fallback processing logic
- **Edge Cases**:
  - Concurrent processing prevention
  - Data consistency during processing method switches
  - Performance impact of backup processing

### Rule Category: Error Handling and Recovery Rules

#### Rule R013: Validation Failure Response Protocol
- **Rule Name**: Structured Error Response and Recovery
- **Description**: System must provide clear, actionable error messages for validation failures
- **Applies To**: All RSS validation failures
- **Calculation Formula**: `validationResult.isValid === false ? generateActionableError(validationResult.errors) : processFile()`
- **Examples**:
  - "File title missing .xlsm extension - please add extension and resubmit"
  - "Site number 12345 not found in master directory - verify site number"
- **Source**: User experience and support efficiency requirements
- **Implementation**: Error message generation and user notification
- **Edge Cases**:
  - Multiple simultaneous validation errors
  - Technical errors vs business rule violations
  - Escalation triggers for repeated failures

#### Rule R014: Automatic Retry Logic
- **Rule Name**: Intelligent Retry Mechanism for Transient Failures
- **Description**: System automatically retries processing for transient technical failures
- **Applies To**: RSS processing failures due to temporary system issues
- **Calculation Formula**: `isTransientError(error) && retryCount < maxRetries ? scheduleRetry(exponentialBackoff(retryCount)) : escalateToSupport()`
- **Examples**:
  - Network timeouts: Retry after 1, 2, 4, 8 minutes
  - Service unavailable: Retry after 5, 10, 20 minutes
  - Authentication failures: Immediate escalation (no retry)
- **Source**: System reliability requirements
- **Implementation**: Retry logic with exponential backoff
- **Edge Cases**:
  - Distinguishing transient vs permanent failures
  - Resource exhaustion during retry attempts
  - User notification during retry cycles

#### Rule R015: Manual Override Capabilities
- **Rule Name**: Administrative Override for Business Exceptions
- **Description**: Authorized personnel can override validation rules for legitimate business exceptions
- **Applies To**: RSS submissions requiring business exception handling
- **Calculation Formula**: `user.hasRole('RSSAdmin') && override.businessJustification !== null ? bypassValidation() : enforceStandardRules()`
- **Examples**:
  - Emergency submissions outside normal business hours
  - Corrected submissions for closed periods
  - System maintenance period submissions
- **Source**: Business continuity requirements
- **Implementation**: Role-based override capabilities with audit trail
- **Edge Cases**:
  - Override approval workflow requirements
  - Audit trail and compliance documentation
  - Temporary vs permanent override permissions

## Validation Rules Integration

### Cross-System Validation Matrix

| Validation Point | SharePoint | Power Automate | Dataverse | Business Impact |
|------------------|------------|----------------|-----------|-----------------|
| File Extension | Primary | Secondary | Tertiary | High - Processing failure |
| Site Number | Primary | Validation | Storage | High - Data integrity |
| Metadata Completeness | Primary | Validation | Consistency | Medium - User experience |
| Timing Rules | Monitoring | Primary | Logging | Medium - Processing efficiency |
| Duplicate Detection | Detection | Processing | Prevention | High - Data accuracy |

### Rule Enforcement Hierarchy

1. **Critical Rules (Processing Blockers)**:
   - R001: File Extension Requirement
   - R002: Site Number Format Validation
   - R004: Required Metadata Completeness

2. **Important Rules (Processing Warnings)**:
   - R007: Modification Timing Restriction
   - R009: Duplicate Submission Prevention
   - R010: SharePoint-Dataverse Synchronization

3. **Advisory Rules (Best Practices)**:
   - R008: Processing Window Validation
   - R003: Document Type Specification

## Implementation Guidelines

### Validation Sequence
1. **Pre-Processing Validation**: File format and naming rules
2. **Metadata Validation**: Required fields and consistency checks
3. **Business Logic Validation**: Timing and duplicate detection
4. **Integration Validation**: Cross-system consistency
5. **Post-Processing Validation**: Synchronization confirmation

### Error Escalation Matrix
- **Level 1**: Automatic retry for transient failures
- **Level 2**: User notification for correctable issues
- **Level 3**: Support team escalation for system issues
- **Level 4**: Administrative override for business exceptions

## Compliance and Audit Requirements

### Audit Trail Elements
- **Rule Validation Results**: Pass/fail status for each rule
- **Override Usage**: Administrative overrides with justification
- **Processing Timeline**: Complete processing history
- **Error Resolution**: Issue identification and resolution tracking

### Compliance Reporting
- **Monthly Validation Summary**: Rule compliance statistics
- **Exception Analysis**: Pattern analysis of rule violations
- **System Health Report**: Integration and processing performance
- **User Training Needs**: Identified based on common violations

## Related Documentation

### Technical Implementation
- [RSS Technical Specification](../../technical/specifications/20250723_RSS_TechnicalSpec_TroubleshootingProcedures.md)
- [SharePoint Delta Token Management](../../technical/specifications/sharepoint-delta-token-management.md)
- [Power Automate Retry Mechanisms](../../technical/specifications/power-automate-retry-mechanisms.md)

### User Processes
- [RSS Troubleshooting User Guide](../../user-processes/billing-admin/20250723_RSS_TroubleshootingProcess_UserGuide.md)
- [Billing Admin Processes](../../user-processes/billing-admin/index.md)

### System Configuration
- [RSS System Configuration](../../configuration/system-settings/rss-system-configuration.md)
- [Webhook Management Configuration](../../configuration/system-settings/webhook-management-configuration.md)

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-23 | Technical Documentation Team | Initial business rules documentation derived from RSS troubleshooting meeting transcript |