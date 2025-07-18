---
title: "Forecasting - Job Group Management User Process"
description: "User process guide for managing job groups in the forecasting system, including creation, editing, and assignment workflows"
created_date: 2025-07-17
last_updated_date: 2025-07-17
source_date: 2025-07-02
version: 1.0
status: Draft
owner: "Admin"
source_documents:
  - "20250702_Completed_User_Stories_Sprint_27.md"
systems:
  - Forecasting
components:
  - Frontend
  - Admin Interface
business_domains:
  - Job Management
  - Site Operations
  - Payroll Expense
user_roles:
  - Admin
  - Site Manager
  - Operations Manager
tags:
  - forecasting
  - job-management
  - user-process
  - admin-workflow
  - job-groups
  - site-assignment
---

# Forecasting - Job Group Management User Process

## Purpose

This user process guide provides comprehensive instructions for managing job groups within the forecasting system. Job groups are essential organizational units that allow administrators to categorize and manage job codes efficiently across multiple customer sites. This process enables streamlined job assignment, wage calculation, and forecasting operations.

## User Roles and Permissions

### Primary Users
- **Admin**: Full access to create, edit, delete, and assign job groups
- **Site Manager**: View job groups assigned to their sites, request modifications
- **Operations Manager**: View all job groups, approve assignment changes

### Permission Matrix
| Action | Admin | Site Manager | Operations Manager |
|--------|-------|--------------|-------------------|
| Create Job Group | ✅ | ❌ | ❌ |
| Edit Job Group | ✅ | Request Only | Approve Only |
| Delete Job Group | ✅ | ❌ | ❌ |
| Assign to Sites | ✅ | Request Only | Approve Only |
| View Job Groups | ✅ | Site-Specific | ✅ |

## Prerequisites

### System Requirements
- Active user account with appropriate permissions
- Access to the forecasting system admin interface
- Valid customer sites configured in the system
- Job codes available for assignment

### Data Requirements
- Customer sites must be active and properly configured
- Job codes must exist in the system before group assignment
- Site assignments must be validated against customer site directory

## Job Group Management Workflow

### Step 1: Access Job Group Management Interface

1. **Login to Forecasting System**
   - Navigate to the forecasting system login page
   - Enter your admin credentials
   - Verify successful authentication

2. **Navigate to Admin Interface**
   - Click on "Administration" in the main navigation menu
   - Select "Job Management" from the dropdown menu
   - Choose "Job Groups" from the submenu

3. **Verify Interface Access**
   - Confirm the Job Group Management interface loads properly
   - Verify you can see existing job groups (if any)
   - Check that all action buttons are visible and enabled

### Step 2: Create New Job Group

1. **Initiate Job Group Creation**
   - Click the "Create New Job Group" button
   - The job group creation form will open

2. **Enter Job Group Details**
   - **Job Group Name**: Enter a descriptive name for the job group
     - Must be unique across the system
     - Should clearly identify the purpose or category
     - Example: "Parking Attendants - Downtown Sites"
   
   - **Job Group Description**: Provide detailed description
     - Explain the purpose and scope of the job group
     - Include any special considerations or requirements
     - Maximum 500 characters

   - **Job Group Code**: Enter a unique identifier
     - Must be alphanumeric (no special characters)
     - Recommended format: 3-6 characters
     - Example: "PKGATT", "CASHIER", "MAINT"

3. **Configure Job Group Settings**
   - **Active Status**: Set to "Active" for immediate use
   - **Default Wage Rate**: Optional default rate for the group
   - **Overtime Rules**: Select applicable overtime calculation rules
   - **Benefits Eligibility**: Configure benefit calculation settings

4. **Save Job Group**
   - Review all entered information for accuracy
   - Click "Save Job Group" to create the new group
   - Verify successful creation with confirmation message

### Step 3: Assign Job Codes to Job Group

1. **Access Job Code Assignment**
   - From the job group list, click "Edit" on the desired job group
   - Navigate to the "Job Codes" tab
   - Click "Add Job Codes" button

2. **Select Job Codes**
   - Browse available job codes from the dropdown list
   - Use search functionality to find specific job codes
   - Select multiple job codes using checkboxes
   - Verify job codes are not already assigned to other groups

3. **Configure Job Code Settings**
   - **Primary Job Code**: Designate one job code as primary (optional)
   - **Wage Override**: Set specific wage rates for individual codes
   - **Hours Calculation**: Configure how hours are calculated for each code
   - **Reporting Category**: Assign reporting categories for analytics

4. **Validate and Save Assignments**
   - Review all job code assignments
   - Verify no conflicts with existing assignments
   - Click "Save Assignments" to confirm changes
   - Check for validation messages or warnings

### Step 4: Assign Job Group to Customer Sites

1. **Access Site Assignment Interface**
   - From the job group details page, click "Site Assignments" tab
   - Click "Add Site Assignments" button

2. **Select Customer Sites**
   - Browse available customer sites from the filtered list
   - Use search filters to find specific sites:
     - Site Name
     - Site Code
     - Geographic Region
     - Contract Type
   - Select multiple sites using checkboxes

3. **Configure Site-Specific Settings**
   - **Effective Date**: Set when the assignment becomes active
   - **End Date**: Optional end date for temporary assignments
   - **Site-Specific Wage Rates**: Override default rates if needed
   - **Scheduling Rules**: Configure site-specific scheduling parameters

4. **Validate Site Assignments**
   - Verify selected sites are active customer sites
   - Check for conflicting job group assignments
   - Confirm wage rates are within acceptable ranges
   - Review effective dates for logical consistency

5. **Save Site Assignments**
   - Click "Save Site Assignments" to confirm
   - Monitor for validation errors or warnings
   - Verify assignments appear in the site assignment list

### Step 5: Edit Existing Job Groups

1. **Locate Job Group to Edit**
   - Use the job group search functionality
   - Filter by status, creation date, or assigned sites
   - Click "Edit" on the desired job group

2. **Modify Job Group Properties**
   - Update job group name, description, or code as needed
   - Modify wage rates or overtime rules
   - Change active status if required
   - Add or remove job codes from the group

3. **Update Site Assignments**
   - Add new site assignments following Step 4 process
   - Remove existing assignments by unchecking sites
   - Modify effective dates or site-specific settings
   - Handle assignment conflicts appropriately

4. **Save Changes**
   - Review all modifications before saving
   - Click "Save Changes" to update the job group
   - Verify changes are reflected in the system
   - Check for any downstream impacts on forecasting

### Step 6: Delete Job Groups (When Necessary)

1. **Verify Deletion Eligibility**
   - Ensure job group is not actively used in forecasting
   - Check that no active site assignments exist
   - Confirm no historical data dependencies
   - Verify admin permissions for deletion

2. **Initiate Deletion Process**
   - Click "Delete" button on the job group
   - Review deletion warning message carefully
   - Confirm understanding of data impact

3. **Complete Deletion**
   - Enter deletion confirmation code if required
   - Click "Confirm Deletion" to proceed
   - Verify job group is removed from the system
   - Check that related assignments are properly cleaned up

## Data Validation Rules

### Job Group Validation
- **Unique Names**: Job group names must be unique across the system
- **Valid Characters**: Names and codes must use alphanumeric characters only
- **Length Limits**: Names limited to 100 characters, descriptions to 500 characters
- **Required Fields**: Name, code, and active status are mandatory

### Job Code Assignment Validation
- **No Duplicate Assignments**: Job codes cannot be assigned to multiple groups
- **Active Job Codes Only**: Only active job codes can be assigned to groups
- **Wage Rate Validation**: Wage rates must be positive numbers within system limits
- **Overtime Rule Compatibility**: Overtime rules must be compatible with job types

### Site Assignment Validation
- **Customer Site Verification**: Only active customer sites can be assigned
- **Date Logic Validation**: End dates must be after start dates
- **Conflict Detection**: System prevents overlapping job group assignments
- **Geographic Restrictions**: Some job groups may have geographic limitations

## Error Handling and Troubleshooting

### Common Error Scenarios

#### Job Group Creation Errors
- **Duplicate Name Error**: "Job group name already exists"
  - **Resolution**: Choose a unique name or modify existing group
  - **Prevention**: Check existing groups before creating new ones

- **Invalid Character Error**: "Job group code contains invalid characters"
  - **Resolution**: Use only alphanumeric characters (A-Z, 0-9)
  - **Prevention**: Follow naming conventions consistently

#### Job Code Assignment Errors
- **Already Assigned Error**: "Job code is already assigned to another group"
  - **Resolution**: Remove from existing group first or choose different code
  - **Prevention**: Check job code availability before assignment

- **Inactive Job Code Error**: "Cannot assign inactive job code"
  - **Resolution**: Activate job code first or choose active alternative
  - **Prevention**: Verify job code status before assignment

#### Site Assignment Errors
- **Invalid Site Error**: "Selected site is not a valid customer site"
  - **Resolution**: Verify site status in customer site directory
  - **Prevention**: Use only sites from the validated customer list

- **Date Conflict Error**: "Assignment dates conflict with existing assignments"
  - **Resolution**: Adjust dates or remove conflicting assignments
  - **Prevention**: Check existing assignments before setting dates

### Escalation Procedures
1. **Level 1**: Contact system administrator for permission issues
2. **Level 2**: Contact IT support for technical system errors
3. **Level 3**: Contact development team for system bugs or data corruption

## Business Rules and Constraints

### Job Group Business Rules
1. **Uniqueness Requirements**
   - Job group names must be unique across all customer sites
   - Job group codes must be unique system-wide
   - No duplicate job code assignments within the system

2. **Assignment Limitations**
   - Maximum 50 job codes per job group
   - Maximum 100 site assignments per job group
   - Job groups cannot be deleted if actively used in forecasting

3. **Wage Rate Rules**
   - Wage rates must be positive values
   - Rates cannot exceed system-defined maximum limits
   - Site-specific rates override job group default rates

4. **Effective Date Rules**
   - Assignment effective dates cannot be in the past (except for corrections)
   - End dates must be after start dates
   - Overlapping assignments for the same site are not allowed

### Data Integrity Constraints
- Job groups maintain referential integrity with job codes and customer sites
- Deletion of job groups requires cleanup of all dependent assignments
- Historical data is preserved even when job groups are deactivated
- Audit trails are maintained for all job group modifications

## Performance Considerations

### System Performance Guidelines
- **Batch Operations**: Use batch assignment features for multiple sites
- **Search Optimization**: Use filters to reduce data load times
- **Concurrent Users**: System supports up to 10 concurrent admin users
- **Data Refresh**: Job group changes may take up to 5 minutes to propagate

### Best Practices for Performance
- Limit job group searches to specific criteria when possible
- Avoid creating excessive numbers of small job groups
- Use bulk operations for large-scale site assignments
- Schedule major job group changes during off-peak hours

## Integration Points

### System Integrations
- **Customer Site Management**: Validates site assignments against customer directory
- **Job Code Management**: Synchronizes with job code master data
- **Forecasting Engine**: Provides job group data for forecasting calculations
- **Payroll Systems**: Exports job group assignments for payroll processing

### Data Synchronization
- **Real-time Updates**: Job group changes are immediately available
- **Batch Synchronization**: Daily sync with external payroll systems
- **Conflict Resolution**: Automated conflict detection and resolution
- **Error Notification**: Automatic alerts for synchronization failures

## Reporting and Analytics

### Available Reports
- **Job Group Summary Report**: Overview of all job groups and assignments
- **Site Assignment Report**: Detailed view of job group assignments by site
- **Job Code Utilization Report**: Analysis of job code usage across groups
- **Change History Report**: Audit trail of job group modifications

### Key Performance Indicators
- Number of active job groups
- Average job codes per group
- Site assignment coverage percentage
- Job group utilization rates

## Related Documentation

- [Forecasting Data Integration Technical Specification](../../technical/forecasting/20250702_Forecasting_DataIntegration_TechnicalSpec.md)
- [Job Code Management Business Rules](../../business-rules/forecasting/20250702_Forecasting_JobCodeManagement_BusinessRules.md)
- [Customer Site Management](../../systems/customer-sites/customer-site-directory.md)
- [Forecasting System Overview](../../systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md)
- [Admin User Access Configuration](../../configuration/user-access/role-based-permissions.md)