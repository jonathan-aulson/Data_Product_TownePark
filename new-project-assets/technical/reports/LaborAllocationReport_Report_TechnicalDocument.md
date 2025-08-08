---
title: "Labor Allocation Report - Technical Documentation"
description: "Comprehensive technical documentation for the Labor Allocation Report used for user access validation and employee visibility in the forecasting system"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-21
version: 1.0
status: Complete
owner: "Jonathan Aulson"
source_documents:
  - "20250721_Backlog Grooming_ Forecasting (2).docx"
systems:
  - Forecasting
  - User Management
  - Reporting
components:
  - Reports
  - User Access Control
  - Data Validation
business_domains:
  - User Access Management
  - Employee Tracking
  - System Administration
user_roles:
  - System Administrator
  - Project Manager
  - Business Analyst
tags:
  - report
  - user-access
  - labor-allocation
  - employee-tracking
  - technical-specification
---

# Labor Allocation Report - Technical Documentation

## Purpose

The Labor Allocation Report serves as a comprehensive employee visibility and user access validation tool within the Towne Park forecasting system, providing complete visibility into all system users and their access patterns.

**Primary Functions**:
- Display all employees who use the forecasting system
- Validate user access control implementation
- Support DOO (Director of Operations) access verification
- Enable system administration and user management
- Provide audit trail for user access patterns

**Business Audience**: System administrators, project managers, and business analysts responsible for user access control and system oversight.

## Business Data Sources and Systems

### Primary Data Sources

| Source System | Data Type | Refresh Frequency | Purpose |
|---------------|-----------|-------------------|---------|
| Workday | Employee Records | Daily | Current employee status and job assignments |
| Forecasting System | User Activity | Real-time | System usage and access patterns |
| Active Directory | Authentication | Real-time | User login and permission validation |
| Job Management System | Job Code Assignments | Weekly | Job code and role mappings |

### Data Integration Points
- **Workday Integration**: Employee master data and job assignments
- **Forecasting Database**: User activity logs and access records
- **Authentication System**: Login events and permission grants
- **Job Code Management**: Role-based access control mappings

## Report Output Structure

### Visual Layout (Markdown Approximation)

```
LABOR ALLOCATION REPORT
Generated: [Current Date/Time]
Report Period: [Date Range]

EMPLOYEE ACCESS SUMMARY
┌─────────────────┬──────────────┬─────────────────┬──────────────┬─────────────────┐
│ Employee ID     │ Employee Name│ Job Title       │ Access Level │ Last Login      │
├─────────────────┼──────────────┼─────────────────┼──────────────┼─────────────────┤
│ EMP001         │ John Smith   │ District Manager│ District     │ 2025-07-21 09:15│
│ EMP002         │ Jane Doe     │ Site Manager    │ Site         │ 2025-07-21 08:30│
│ EMP003         │ Bob Johnson  │ DOO             │ All Sites    │ 2025-07-21 10:45│
│ EMP004         │ Mary Wilson  │ Account Manager │ Territory    │ 2025-07-20 16:20│
└─────────────────┴──────────────┴─────────────────┴──────────────┴─────────────────┘

ACCESS LEVEL DISTRIBUTION
┌─────────────────┬───────────┬────────────┐
│ Access Level    │ Count     │ Percentage │
├─────────────────┼───────────┼────────────┤
│ All Sites (DOO) │ 5         │ 2.5%       │
│ District        │ 45        │ 22.5%      │
│ Territory       │ 75        │ 37.5%      │
│ Site            │ 75        │ 37.5%      │
└─────────────────┴───────────┴────────────┘

SYSTEM USAGE METRICS
┌─────────────────┬─────────────┬─────────────────┐
│ Metric          │ Value       │ Period          │
├─────────────────┼─────────────┼─────────────────┤
│ Total Users     │ 200         │ Current         │
│ Active Users    │ 185         │ Last 30 Days    │
│ New Users       │ 15          │ Last 30 Days    │
│ Inactive Users  │ 15          │ Last 30 Days    │
└─────────────────┴─────────────┴─────────────────┘
```

### Report Sections

#### Section 1: Employee Access Summary
- **Employee ID**: Unique identifier from Workday
- **Employee Name**: Full name from employee master data
- **Job Title**: Current job title determining access level
- **Access Level**: System-determined access scope
- **Last Login**: Most recent system access timestamp

#### Section 2: Access Level Distribution
- **Access Level**: Categorized permission levels
- **Count**: Number of users in each category
- **Percentage**: Distribution across access levels

#### Section 3: System Usage Metrics
- **Total Users**: All users with system access
- **Active Users**: Users with recent login activity
- **New Users**: Recently added user accounts
- **Inactive Users**: Users without recent activity

## Hard-coded and User-driven Filters

### Hard-coded Filters
```sql
-- Active employees only
WHERE employee_status = 'ACTIVE'

-- Valid job assignments only
AND job_assignment_status = 'CURRENT'

-- System access granted
AND forecasting_access = 'ENABLED'

-- Exclude test accounts
AND employee_type != 'TEST'
```

### User-driven Filters

| Filter Name | Type | Options | Default |
|-------------|------|---------|---------|
| Date Range | Date Picker | Last 30/60/90 days, Custom | Last 30 days |
| Access Level | Multi-select | All Sites, District, Territory, Site | All |
| Job Title | Multi-select | All job titles from system | All |
| Activity Status | Single-select | All, Active, Inactive | All |
| Department | Multi-select | All departments | All |

### Filter Implementation
```javascript
// Example filter configuration
const reportFilters = {
  dateRange: {
    type: 'dateRange',
    default: 'last30days',
    options: ['last30days', 'last60days', 'last90days', 'custom']
  },
  accessLevel: {
    type: 'multiSelect',
    default: 'all',
    options: ['all_sites', 'district', 'territory', 'site']
  },
  activityStatus: {
    type: 'singleSelect',
    default: 'all',
    options: ['all', 'active', 'inactive']
  }
};
```

## Logic and Definitions (Field-by-Field)

### Employee ID
- **Source**: Workday employee master record
- **Format**: Alphanumeric, 6-8 characters
- **Validation**: Must exist in active employee records
- **Business Rule**: Primary identifier for all employee-related data

### Employee Name
- **Source**: Workday employee master record
- **Format**: "Last, First Middle"
- **Validation**: Non-null, valid character set
- **Business Rule**: Display name for user identification

### Job Title
- **Source**: Job management system via job code mapping
- **Logic**: 
  ```sql
  CASE 
    WHEN job_code IN ('district_manager', 'regional_manager') THEN 'District Manager'
    WHEN job_code = 'doo' THEN 'DOO'
    WHEN job_code IN ('site_manager', 'assistant_manager') THEN 'Site Manager'
    WHEN job_code = 'account_manager' THEN 'Account Manager'
    ELSE 'Other'
  END
  ```
- **Business Rule**: Determines system access level

### Access Level
- **Calculation Logic**:
  ```sql
  CASE 
    WHEN job_title = 'DOO' THEN 'All Sites'
    WHEN job_title = 'District Manager' THEN 'District'
    WHEN job_title = 'Account Manager' THEN 'Territory'
    WHEN job_title IN ('Site Manager', 'Assistant Manager') THEN 'Site'
    ELSE 'Limited'
  END
  ```
- **Business Rule**: Hierarchical access control based on job function

### Last Login
- **Source**: Authentication system login logs
- **Format**: YYYY-MM-DD HH:MM:SS
- **Calculation**: MAX(login_timestamp) for each user
- **Business Rule**: Indicates recent system usage

### Active Status Determination
- **Logic**:
  ```sql
  CASE 
    WHEN last_login >= DATEADD(day, -30, GETDATE()) THEN 'Active'
    WHEN last_login >= DATEADD(day, -90, GETDATE()) THEN 'Inactive'
    ELSE 'Dormant'
  END
  ```
- **Business Rule**: 30-day activity threshold for active status

## User Security on the Report

### Access Control Matrix

| User Role | View Report | Export Data | Modify Filters | Admin Functions |
|-----------|-------------|-------------|----------------|-----------------|
| System Administrator | ✓ | ✓ | ✓ | ✓ |
| Project Manager | ✓ | ✓ | ✓ | ✗ |
| Business Analyst | ✓ | ✓ | ✓ | ✗ |
| District Manager | ✓ (District Only) | ✓ | Limited | ✗ |
| Site Manager | ✓ (Site Only) | ✗ | Limited | ✗ |

### Security Implementation
```yaml
security_rules:
  system_administrator:
    - view_all_employees: true
    - export_data: true
    - modify_access: true
  
  project_manager:
    - view_all_employees: true
    - export_data: true
    - modify_access: false
  
  district_manager:
    - view_employees: "district_scope_only"
    - export_data: true
    - modify_access: false
```

### Data Privacy Controls
- **PII Protection**: Employee personal information masked for non-admin users
- **Audit Logging**: All report access and exports logged
- **Data Retention**: Report data retained per company policy
- **Access Monitoring**: Unusual access patterns flagged for review

## Data Refresh Schedules

### Automated Refresh Schedule
| Data Source | Refresh Frequency | Refresh Time | Dependency |
|-------------|-------------------|--------------|------------|
| Employee Master Data | Daily | 2:00 AM EST | Workday sync |
| Job Assignments | Weekly | Sunday 3:00 AM EST | HR system update |
| Login Activity | Real-time | Continuous | Authentication events |
| Access Permissions | Daily | 2:30 AM EST | Job management sync |

### Manual Refresh Options
- **On-Demand Refresh**: Available to system administrators
- **Partial Refresh**: Update specific data sources only
- **Full Refresh**: Complete data reload (emergency use)

### Refresh Monitoring
```sql
-- Refresh status query
SELECT 
  data_source,
  last_refresh_time,
  refresh_status,
  record_count,
  error_message
FROM report_refresh_log 
WHERE report_name = 'labor_allocation_report'
ORDER BY last_refresh_time DESC;
```

## Report Dissemination

### Distribution Methods

#### Automated Distribution
- **Email Reports**: Weekly summary to stakeholders
- **Dashboard Embedding**: Real-time widget in management dashboard
- **API Access**: Programmatic access for other systems
- **Scheduled Exports**: Monthly Excel exports to HR team

#### Manual Distribution
- **On-Demand Generation**: User-initiated report creation
- **Custom Exports**: Filtered data exports for specific needs
- **Print Reports**: Formatted reports for offline review

### Distribution Configuration
```json
{
  "automated_distribution": {
    "weekly_summary": {
      "recipients": ["hr_team@townepark.com", "management@townepark.com"],
      "schedule": "Monday 8:00 AM EST",
      "format": "PDF"
    },
    "monthly_export": {
      "recipients": ["hr_analytics@townepark.com"],
      "schedule": "1st of month 9:00 AM EST",
      "format": "Excel"
    }
  }
}
```

## Report Format Options

### Available Formats

#### Excel Format
- **Use Case**: Data analysis and manipulation
- **Features**: Pivot tables, filtering, sorting
- **File Size**: Optimized for large datasets
- **Distribution**: Email attachment, shared drive

#### PDF Format
- **Use Case**: Formal reporting and presentations
- **Features**: Professional formatting, charts, graphs
- **Security**: Password protection available
- **Distribution**: Email, document management system

#### Power BI Format
- **Use Case**: Interactive dashboards and analytics
- **Features**: Real-time data, drill-down capabilities
- **Access**: Web-based, mobile app
- **Integration**: Embedded in company portals

#### CSV Format
- **Use Case**: Data integration and system imports
- **Features**: Raw data export, system compatibility
- **Automation**: Scheduled exports to other systems
- **Processing**: Bulk data operations

### Format Selection Logic
```javascript
const formatOptions = {
  excel: {
    maxRecords: 100000,
    features: ['pivot_tables', 'charts', 'filtering'],
    useCase: 'analysis'
  },
  pdf: {
    maxRecords: 10000,
    features: ['formatting', 'charts', 'security'],
    useCase: 'presentation'
  },
  powerbi: {
    maxRecords: 'unlimited',
    features: ['real_time', 'interactive', 'drill_down'],
    useCase: 'dashboard'
  }
};
```

## Business Stakeholders

### Primary Stakeholders

| Stakeholder | Role | Approval Authority | Use Case |
|-------------|------|-------------------|----------|
| Amy Sowells | Business Lead | Report Changes | User access validation |
| Jim Boyer | Technical Lead | Technical Changes | System administration |
| Michael Foy | Business Stakeholder | Business Rules | Strategic oversight |
| Jonathan Aulson | Project Manager | Process Changes | Project coordination |

### Approval Process
1. **Business Changes**: Amy Sowells approval required
2. **Technical Changes**: Jim Boyer approval required
3. **Access Changes**: System Administrator approval required
4. **Data Changes**: Data governance committee approval required

### Stakeholder Responsibilities
- **Business Lead**: Define reporting requirements and business rules
- **Technical Lead**: Ensure data accuracy and system performance
- **System Administrator**: Manage user access and security
- **Project Manager**: Coordinate changes and stakeholder communication

## Performance and Monitoring

### Performance Metrics
| Metric | Target | Acceptable | Critical |
|--------|--------|------------|----------|
| Report Generation Time | < 30 seconds | < 60 seconds | > 120 seconds |
| Data Refresh Time | < 5 minutes | < 10 minutes | > 15 minutes |
| Concurrent Users | 50+ | 25+ | < 10 |
| Data Accuracy | 99.9% | 99.5% | < 99% |

### Monitoring and Alerting
```yaml
monitoring:
  performance:
    - metric: "report_generation_time"
      threshold: 60
      alert_level: "warning"
    
    - metric: "data_refresh_failure"
      threshold: 1
      alert_level: "critical"
  
  usage:
    - metric: "concurrent_users"
      threshold: 40
      alert_level: "info"
```

---

*Technical documentation compiled from meeting notes dated July 21, 2025. Report specifications and business requirements preserved for implementation and operational reference.*