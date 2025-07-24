---
title: "Towne Park RSS - Revenue Summary Sheet Troubleshooting User Process Guide"
description: "Comprehensive user process guide for billing administrators and technical support teams to troubleshoot RSS submission issues and resolve processing failures"
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
  - User Support
  - Issue Resolution
user_roles:
  - Billing Admin
  - Technical Support
  - Site Administrator
  - Business Analyst
tags:
  - rss
  - troubleshooting
  - user-process
  - billing-admin
  - support
  - sharepoint
  - submission
  - validation
---

# Towne Park RSS - Revenue Summary Sheet Troubleshooting User Process Guide

## Process Overview

This user process guide provides step-by-step troubleshooting procedures for RSS (Revenue Summary Sheet) submission issues. The guide is designed for billing administrators, technical support teams, and site administrators who need to diagnose and resolve RSS processing failures quickly and effectively.

## Prerequisites

### Required Access and Permissions
- **SharePoint Access**: Read/write permissions to RSS document library
- **Dataverse Access**: View permissions for RSS synchronization status
- **Azure Portal Access**: Read access to application logs (for technical support)
- **Power Automate Access**: View flow run history (for technical support)

### Required Knowledge
- Basic understanding of RSS submission process
- Familiarity with SharePoint document properties
- Knowledge of file naming conventions
- Understanding of submission status workflow

### Tools and Resources Needed
- **Web Browser**: For accessing SharePoint and Power Platform
- **Azure Storage Explorer**: For technical log analysis (technical support only)
- **PowerShell Scripts**: Available on Allata SharePoint site (technical support only)
- **Contact Information**: Technical support escalation contacts

## Process Steps

### Step 1: Initial Issue Identification

#### 1.1 Gather Issue Information
**User Action**: Collect comprehensive details about the RSS submission problem
**System Response**: Document all relevant information for investigation
**Decision Points**: Determine if issue is site-specific or system-wide
**Validation**: Confirm issue scope and impact level

**Information to Collect**:
- Site number experiencing the issue
- Date and time of submission attempt
- File name and format used
- Error messages received (if any)
- User who submitted the file
- Previous successful submissions from same site

**Tips**: 
- Screenshot any error messages
- Note exact time of submission for log correlation
- Check if other sites are experiencing similar issues

#### 1.2 Verify File Submission Status
**User Action**: Check SharePoint library for file presence and properties
**System Response**: Display file metadata and submission status
**Decision Points**: File present in SharePoint vs. missing entirely
**Validation**: Confirm file was actually uploaded to correct location

**Verification Steps**:
1. Navigate to RSS SharePoint document library
2. Search for file by site number or date
3. Check file properties and metadata
4. Verify submission status field
5. Note last modified timestamp

**Error Handling**: If file not found in SharePoint, guide user through proper submission process

### Step 2: File Metadata Validation

#### 2.1 Check File Title Format
**User Action**: Examine file title for proper formatting and extension
**System Response**: Validate against required naming convention
**Decision Points**: Title includes extension vs. missing extension
**Validation**: Confirm title matches expected format exactly

**Required Format**: `{SiteNumber} {DocumentType}.xlsm`
**Example**: `108725 Rev.xlsm`

**Validation Checklist**:
- [ ] Site number is correct and matches submission
- [ ] Document type is specified (typically "Rev")
- [ ] File extension ".xlsm" is included in title
- [ ] No extra spaces or special characters
- [ ] Title matches actual file name

**Common Issues**:
- Missing file extension in title
- Extra spaces in title
- Incorrect site number
- Special characters in title

#### 2.2 Verify File Properties
**User Action**: Review all file metadata fields for completeness
**System Response**: Display current property values
**Decision Points**: All required fields populated vs. missing data
**Validation**: Ensure all metadata meets system requirements

**Required Properties**:
- **Title**: Complete filename with extension
- **Site Number**: Numeric site identifier
- **Submission Status**: Current processing status
- **Document Type**: Type of RSS submission
- **Last Modified**: Recent timestamp

**Property Validation Steps**:
1. Right-click file in SharePoint
2. Select "Properties" or "Details"
3. Review all metadata fields
4. Check for empty or incorrect values
5. Verify submission status is appropriate

### Step 3: Timing and Modification Analysis

#### 3.1 Check Submission Timing
**User Action**: Analyze submission and modification timestamps
**System Response**: Display chronological sequence of file events
**Decision Points**: Normal timing vs. rapid modification issue
**Validation**: Confirm timing aligns with processing requirements

**Timing Analysis**:
1. Note original submission time
2. Check last modified timestamp
3. Calculate time difference
4. Identify any modifications within 1 minute of submission

**Critical Timing Rule**: Files modified within 1 minute of submission may bypass webhook processing

#### 3.2 Identify Modification Patterns
**User Action**: Review file modification history
**System Response**: Show sequence of changes and users involved
**Decision Points**: Single submission vs. multiple modifications
**Validation**: Determine if modifications interfere with processing

**Investigation Steps**:
1. Check version history in SharePoint
2. Identify who made modifications
3. Determine what was changed
4. Assess impact on processing workflow

### Step 4: System Status Verification

#### 4.1 Check Dataverse Synchronization
**User Action**: Verify if file appears in Dataverse system
**System Response**: Display synchronization status
**Decision Points**: Successfully synchronized vs. sync failure
**Validation**: Confirm data consistency between systems

**Synchronization Check**:
1. Access Dataverse RSS table
2. Search for file by site number and date
3. Compare metadata with SharePoint version
4. Check synchronization timestamp
5. Verify data completeness

#### 4.2 Review Processing Status
**User Action**: Check overall system processing health
**System Response**: Display current system status and any alerts
**Decision Points**: System operational vs. system-wide issues
**Validation**: Determine if issue is isolated or widespread

**System Health Indicators**:
- Recent successful submissions from other sites
- Power Automate flow execution status
- SharePoint webhook subscription health
- Azure service availability

### Step 5: Resolution Implementation

#### 5.1 Apply Standard Fixes

**For Missing File Extension**:
1. Edit file properties in SharePoint
2. Add ".xlsm" to the title field
3. Save changes
4. Monitor for automatic reprocessing
5. Verify successful synchronization

**For Timing Issues**:
1. Wait at least 5 minutes after last modification
2. Update submission status to trigger reprocessing
3. Monitor webhook execution
4. Confirm successful completion

**For Metadata Issues**:
1. Correct all invalid or missing metadata
2. Ensure site number accuracy
3. Verify document type specification
4. Save all changes simultaneously

#### 5.2 Implement Reject and Resubmit Workflow
**User Action**: Use temporary workaround for persistent issues
**System Response**: Process file through alternative workflow
**Decision Points**: Standard fix successful vs. requires workaround
**Validation**: Confirm alternative processing completes successfully

**Reject and Resubmit Process**:
1. Change submission status to "Rejected"
2. Correct all identified issues
3. Change submission status to "Submitted"
4. Monitor for successful processing
5. Verify final synchronization

### Step 6: Verification and Follow-up

#### 6.1 Confirm Resolution
**User Action**: Validate that issue has been completely resolved
**System Response**: Display updated status and confirmation
**Decision Points**: Issue resolved vs. requires escalation
**Validation**: Ensure all systems show consistent, correct data

**Resolution Verification**:
1. Check file appears correctly in Dataverse
2. Verify all metadata is accurate
3. Confirm processing timestamp is recent
4. Test related functionality if applicable
5. Document resolution for future reference

#### 6.2 Update Documentation
**User Action**: Record issue details and resolution steps
**System Response**: Store information for trend analysis
**Decision Points**: Standard issue vs. new pattern requiring documentation
**Validation**: Ensure information is complete and actionable

**Documentation Requirements**:
- Issue description and symptoms
- Root cause identified
- Resolution steps taken
- Time to resolution
- Prevention recommendations

## Alternative Flows

### Escalation to Technical Support

**When to Escalate**:
- Standard troubleshooting steps don't resolve issue
- System-wide processing failures detected
- Webhook subscription issues identified
- Complex timing or integration problems

**Escalation Process**:
1. Document all troubleshooting steps attempted
2. Gather system logs and error messages
3. Prepare detailed issue summary
4. Contact technical support with complete information
5. Provide access to affected files and systems

### Emergency Processing Procedures

**When to Use Emergency Procedures**:
- Critical month-end processing deadlines
- Multiple site failures affecting business operations
- System outages preventing normal processing

**Emergency Steps**:
1. Activate PowerShell script backup processing
2. Manually verify file integrity and metadata
3. Process files through alternative workflows
4. Monitor for successful completion
5. Document emergency actions taken

## Related Processes

### RSS Submission Process
- [RSS File Submission User Guide](rss-file-submission-user-guide.md)
- [Monthly Closing Procedures](monthly-closing-procedures.md)

### Technical Support Processes
- [System Health Monitoring](../technical-support/system-health-monitoring.md)
- [Escalation Procedures](../technical-support/escalation-procedures.md)

### Integration Management
- [SharePoint-Dataverse Sync Monitoring](../integration/sharepoint-dataverse-sync-monitoring.md)
- [Webhook Management Procedures](../integration/webhook-management-procedures.md)

## Configuration Options

### User Notification Settings
- **Email Alerts**: Configure automatic notifications for processing failures
- **Dashboard Alerts**: Set up real-time status monitoring
- **Escalation Triggers**: Define automatic escalation criteria

### Processing Parameters
- **Retry Intervals**: Configure automatic retry timing
- **Validation Rules**: Customize metadata validation requirements
- **Timeout Settings**: Adjust processing timeout limits

## Troubleshooting Guide

### Common Error Messages

#### "Invalid Title" Error
**Cause**: File title missing required extension
**Solution**: Add ".xlsm" to file title in SharePoint properties
**Prevention**: User training on proper file naming

#### "Processing Timeout" Error
**Cause**: File modification during processing window
**Solution**: Wait 5 minutes, then update submission status
**Prevention**: User education on submission timing

#### "Synchronization Failed" Error
**Cause**: Dataverse connection or authentication issue
**Solution**: Escalate to technical support for system check
**Prevention**: Regular system health monitoring

### Performance Issues

#### Slow Processing Times
**Symptoms**: Files taking longer than 5 minutes to process
**Investigation**: Check system load and webhook queue depth
**Resolution**: Monitor for auto-scaling or contact technical support

#### Batch Processing Failures
**Symptoms**: Multiple files failing simultaneously
**Investigation**: Check for system-wide issues or maintenance
**Resolution**: Coordinate with technical team for system status

## Success Metrics

### Key Performance Indicators
- **Resolution Time**: Average time to resolve RSS issues
- **First-Call Resolution**: Percentage of issues resolved without escalation
- **User Satisfaction**: Feedback scores from supported users
- **System Availability**: Uptime percentage for RSS processing

### Quality Metrics
- **Accuracy Rate**: Percentage of correctly processed files
- **Error Reduction**: Trend in processing error frequency
- **Prevention Effectiveness**: Reduction in repeat issues

## Training and Support Resources

### User Training Materials
- RSS Submission Best Practices Guide
- File Naming Convention Reference
- SharePoint Navigation Tutorial
- Troubleshooting Quick Reference Card

### Technical Documentation
- [RSS Technical Specification](../../technical/specifications/20250723_RSS_TechnicalSpec_TroubleshootingProcedures.md)
- [Integration Architecture Guide](../../technical/integrations/sharepoint-dataverse-integration.md)
- [System Configuration Manual](../../configuration/system-settings/rss-system-configuration.md)

### Support Contacts
- **Level 1 Support**: Billing Admin Team
- **Level 2 Support**: Technical Support Team
- **Level 3 Support**: Development Team
- **Emergency Contact**: On-call Technical Lead

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-23 | Technical Documentation Team | Initial user process guide derived from RSS troubleshooting meeting transcript |