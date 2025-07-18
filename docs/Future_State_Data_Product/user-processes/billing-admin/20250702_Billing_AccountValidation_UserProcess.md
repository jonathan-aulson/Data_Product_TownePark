---
title: "Billing - Account Validation User Process"
description: "User process guide for billing administrators to validate unit accounts against Great Plains master table and manage batch processing workflows"
created_date: 2025-07-17
last_updated_date: 2025-07-17
source_date: 2025-07-02
version: 1.0
status: Draft
owner: "Billing Admin"
source_documents:
  - "20250702_Completed_User_Stories_Sprint_27.md"
systems:
  - Billing
  - Great Plains
components:
  - Frontend
  - Backend
  - Integration
business_domains:
  - Account Management
  - Data Validation
  - Batch Processing
user_roles:
  - Billing Admin
  - Finance Manager
  - System Administrator
tags:
  - billing
  - account-validation
  - user-process
  - batch-processing
  - great-plains
  - data-quality
---

# Billing - Account Validation User Process

## Purpose

This user process guide provides comprehensive instructions for billing administrators to validate unit accounts against the Great Plains (GP) master table and manage batch processing workflows. The account validation process ensures data integrity, prevents billing errors, and maintains synchronization between the billing system and the Great Plains financial system.

## User Roles and Permissions

### Primary Users
- **Billing Admin**: Full access to validation processes, batch management, and error resolution
- **Finance Manager**: View validation reports, approve batch processing, escalate issues
- **System Administrator**: Configure validation rules, manage system integration, troubleshoot technical issues

### Permission Matrix
| Action | Billing Admin | Finance Manager | System Administrator |
|--------|---------------|-----------------|---------------------|
| Run Account Validation | ✅ | ❌ | ✅ |
| View Validation Results | ✅ | ✅ | ✅ |
| Process Valid Batches | ✅ | Approve Only | ✅ |
| Resolve Validation Errors | ✅ | Request Only | ✅ |
| Configure Validation Rules | ❌ | ❌ | ✅ |
| Generate Reports | ✅ | ✅ | ✅ |

## Prerequisites

### System Requirements
- Active user account with billing admin permissions
- Access to the billing system validation interface
- Network connectivity to Great Plains system
- Valid GP master table access credentials

### Data Requirements
- Unit accounts must be properly formatted in the billing system
- Great Plains master table must be accessible and current
- Batch processing queues must be operational
- Validation rules must be configured and active

## Account Validation Workflow

### Step 1: Access Account Validation Interface

1. **Login to Billing System**
   - Navigate to the billing system login page
   - Enter your billing admin credentials
   - Verify successful authentication and role permissions

2. **Navigate to Validation Module**
   - Click on "Account Management" in the main navigation menu
   - Select "Account Validation" from the dropdown menu
   - Choose "GP Master Table Validation" from the submenu

3. **Verify System Status**
   - Check Great Plains connection status indicator
   - Confirm validation rules are active and current
   - Verify batch processing queues are operational

### Step 2: Initiate Account Validation Process

1. **Select Validation Scope**
   - **All Accounts**: Validate all unit accounts in the system
   - **New Accounts**: Validate only recently added accounts
   - **Modified Accounts**: Validate accounts changed since last validation
   - **Custom Range**: Specify date range or account criteria

2. **Configure Validation Parameters**
   - **Validation Type**: 
     - Standard validation (basic GP master table check)
     - Enhanced validation (includes business rule verification)
     - Full validation (comprehensive data integrity check)
   
   - **Error Handling**:
     - Stop on first error
     - Continue with error logging
     - Skip errors and process valid accounts

   - **Batch Size**: Set number of accounts to process per batch (default: 1000)

3. **Review Validation Settings**
   - Confirm selected scope and parameters
   - Verify Great Plains connection is stable
   - Check available system resources for processing

4. **Start Validation Process**
   - Click "Start Validation" to begin the process
   - Monitor progress indicator and status messages
   - Note estimated completion time based on scope

### Step 3: Monitor Validation Progress

1. **Track Validation Status**
   - Monitor real-time progress bar and percentage completion
   - Review processing statistics:
     - Total accounts queued for validation
     - Accounts successfully validated
     - Accounts with validation errors
     - Processing rate (accounts per minute)

2. **Review Interim Results**
   - View summary statistics as validation progresses
   - Monitor error count and types
   - Check system performance metrics
   - Verify Great Plains connectivity remains stable

3. **Handle Processing Issues**
   - **Connection Errors**: Retry connection or contact IT support
   - **Performance Issues**: Reduce batch size or schedule during off-peak hours
   - **Memory Issues**: Clear cache or restart validation with smaller scope

### Step 4: Analyze Validation Results

1. **Review Validation Summary**
   - **Total Accounts Processed**: Complete count of validated accounts
   - **Successful Validations**: Accounts that passed all validation checks
   - **Failed Validations**: Accounts with validation errors
   - **Processing Time**: Total time required for validation
   - **Error Rate**: Percentage of accounts with validation issues

2. **Examine Validation Details**
   - **Valid Accounts Report**:
     - Account numbers and descriptions
     - GP master table match confirmation
     - Business rule compliance status
     - Ready for batch processing indicator

   - **Invalid Accounts Report**:
     - Account numbers with validation errors
     - Specific error descriptions and codes
     - Recommended resolution actions
     - Priority level for error resolution

3. **Categorize Validation Errors**
   - **Missing GP Records**: Accounts not found in GP master table
   - **Data Mismatch**: Account details don't match GP records
   - **Format Errors**: Account numbers don't meet format requirements
   - **Business Rule Violations**: Accounts violate configured business rules
   - **System Errors**: Technical issues during validation process

### Step 5: Resolve Validation Errors

1. **Prioritize Error Resolution**
   - **Critical Errors**: Prevent billing processing, require immediate attention
   - **High Priority**: May cause billing delays, resolve within 24 hours
   - **Medium Priority**: Data quality issues, resolve within 1 week
   - **Low Priority**: Minor discrepancies, resolve during maintenance windows

2. **Address Missing GP Records**
   - **Verify Account Existence**: Confirm account should exist in GP
   - **Contact Finance Team**: Request GP master table update
   - **Create GP Record**: Follow established procedures for new account creation
   - **Document Resolution**: Log actions taken and resolution timeline

3. **Fix Data Mismatch Errors**
   - **Compare Data Sources**: Review billing system vs. GP master table data
   - **Identify Correct Data**: Determine which system has accurate information
   - **Update Billing System**: Correct account details in billing system
   - **Update GP System**: Request GP updates through proper channels
   - **Re-validate**: Run validation again for corrected accounts

4. **Correct Format Errors**
   - **Review Format Requirements**: Confirm current account number format rules
   - **Standardize Account Numbers**: Apply consistent formatting
   - **Update Account Records**: Modify accounts to meet format requirements
   - **Validate Format Rules**: Ensure format rules are current and appropriate

### Step 6: Process Valid Account Batches

1. **Review Valid Accounts for Batch Processing**
   - Filter validation results to show only valid accounts
   - Verify accounts are ready for billing processing
   - Check for any pending business rule validations
   - Confirm batch processing prerequisites are met

2. **Create Processing Batches**
   - **Batch Size Configuration**: Set optimal batch size (typically 500-2000 accounts)
   - **Batch Naming**: Use standardized naming convention with date/time stamps
   - **Priority Assignment**: Set processing priority based on business requirements
   - **Scheduling**: Schedule batch processing for optimal system performance

3. **Submit Batches for Processing**
   - Review batch contents and configuration
   - Verify system resources are available for processing
   - Submit batches to processing queue
   - Monitor batch status and processing progress

4. **Monitor Batch Processing**
   - Track batch processing status in real-time
   - Monitor for processing errors or failures
   - Verify successful completion of each batch
   - Generate processing reports for audit trail

### Step 7: Generate Validation Reports

1. **Create Validation Summary Report**
   - **Report Period**: Specify date range for report
   - **Report Scope**: Include all validations or filter by criteria
   - **Report Format**: Choose PDF, Excel, or CSV format
   - **Distribution List**: Select recipients for automated distribution

2. **Generate Detailed Error Report**
   - **Error Categories**: Group errors by type and severity
   - **Resolution Status**: Track error resolution progress
   - **Trend Analysis**: Identify patterns in validation errors
   - **Recommendations**: Include suggested process improvements

3. **Produce Compliance Report**
   - **Validation Coverage**: Percentage of accounts validated
   - **Error Rates**: Historical trend of validation error rates
   - **Processing Efficiency**: Batch processing performance metrics
   - **System Uptime**: Great Plains connectivity and system availability

## Data Validation Rules

### Account Number Validation
- **Format Requirements**: Account numbers must follow established format patterns
- **Length Validation**: Account numbers must be within specified length limits
- **Character Validation**: Only alphanumeric characters allowed (no special characters)
- **Uniqueness Check**: Account numbers must be unique within the system

### GP Master Table Validation
- **Record Existence**: Account must exist in GP master table
- **Status Validation**: GP account status must be active
- **Data Consistency**: Key fields must match between systems
- **Date Validation**: Account dates must be within acceptable ranges

### Business Rule Validation
- **Account Type Rules**: Accounts must comply with type-specific business rules
- **Customer Assignment**: Accounts must be properly assigned to valid customers
- **Billing Cycle Rules**: Accounts must follow established billing cycle requirements
- **Financial Controls**: Accounts must meet financial control requirements

## Error Handling and Troubleshooting

### Common Validation Errors

#### GP Connection Errors
- **Error**: "Unable to connect to Great Plains system"
  - **Cause**: Network connectivity issues or GP system unavailability
  - **Resolution**: Check network connection, verify GP system status, contact IT support
  - **Prevention**: Monitor GP system status, schedule validations during stable periods

#### Account Format Errors
- **Error**: "Account number format invalid"
  - **Cause**: Account numbers don't meet format requirements
  - **Resolution**: Review format rules, correct account numbers, update validation rules
  - **Prevention**: Implement format validation at data entry point

#### Missing GP Records
- **Error**: "Account not found in GP master table"
  - **Cause**: Account exists in billing system but not in GP
  - **Resolution**: Verify account validity, create GP record, or remove from billing system
  - **Prevention**: Implement synchronized account creation process

#### Data Mismatch Errors
- **Error**: "Account data doesn't match GP master table"
  - **Cause**: Inconsistent data between billing system and GP
  - **Resolution**: Identify correct data source, update incorrect system
  - **Prevention**: Implement real-time data synchronization

### Escalation Procedures
1. **Level 1**: Billing Admin resolves standard validation errors
2. **Level 2**: Finance Manager approves account corrections and GP updates
3. **Level 3**: System Administrator addresses technical issues and rule configuration
4. **Level 4**: IT Support handles system connectivity and infrastructure issues

## Business Rules and Constraints

### Validation Frequency Rules
- **Daily Validation**: All new and modified accounts must be validated daily
- **Weekly Full Validation**: Complete account validation performed weekly
- **Monthly Compliance Validation**: Comprehensive validation for compliance reporting
- **Ad-hoc Validation**: On-demand validation for specific account sets

### Processing Constraints
- **Batch Size Limits**: Maximum 2000 accounts per batch to ensure system performance
- **Processing Windows**: Batch processing limited to off-peak hours (6 PM - 6 AM)
- **Concurrent Processing**: Maximum 3 concurrent batches to prevent system overload
- **Error Threshold**: Processing stops if error rate exceeds 10% of batch

### Data Quality Requirements
- **Validation Coverage**: Minimum 99% of accounts must be validated monthly
- **Error Resolution Time**: Critical errors resolved within 24 hours
- **Data Accuracy**: 99.5% accuracy rate required for GP data matching
- **Audit Trail**: Complete audit trail maintained for all validation activities

## Performance Considerations

### System Performance Guidelines
- **Optimal Batch Size**: 1000-1500 accounts per batch for best performance
- **Processing Schedule**: Schedule large validations during off-peak hours
- **Resource Monitoring**: Monitor CPU and memory usage during validation
- **Network Optimization**: Ensure stable, high-speed connection to GP system

### Best Practices for Performance
- **Incremental Validation**: Use incremental validation for daily processing
- **Parallel Processing**: Utilize parallel processing for large validation sets
- **Cache Management**: Clear system cache before large validation runs
- **Database Optimization**: Ensure database indexes are optimized for validation queries

## Integration Points

### System Integrations
- **Great Plains Integration**: Real-time connectivity for master table validation
- **Billing System Database**: Source of unit account data for validation
- **Audit System**: Logging of all validation activities and results
- **Notification System**: Automated alerts for validation failures and completions

### Data Synchronization
- **Real-time Validation**: Immediate validation for new account creation
- **Batch Synchronization**: Scheduled synchronization with GP master table
- **Error Notification**: Automatic notification of validation errors to relevant users
- **Status Updates**: Real-time status updates for validation and processing progress

## Reporting and Analytics

### Standard Reports
- **Daily Validation Summary**: Overview of daily validation activities
- **Error Analysis Report**: Detailed analysis of validation errors and trends
- **Processing Performance Report**: Batch processing efficiency and performance metrics
- **Compliance Dashboard**: Real-time view of validation compliance status

### Key Performance Indicators
- **Validation Success Rate**: Percentage of accounts passing validation
- **Error Resolution Time**: Average time to resolve validation errors
- **Processing Efficiency**: Accounts processed per hour
- **System Availability**: GP system connectivity uptime percentage

## Related Documentation

- [Billing Account Validation Business Rules](../../business-rules/billing/20250702_Billing_AccountValidation_BusinessRules.md)
- [Great Plains Integration Technical Specification](../../technical/integrations/great-plains-integration.md)
- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Batch Processing Configuration Guide](../../configuration/billing/batch-processing-configuration.md)
- [Data Quality Standards](../../standards/data-quality-standards.md)