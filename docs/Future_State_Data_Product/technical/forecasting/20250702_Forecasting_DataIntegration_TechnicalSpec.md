---
title: "Towne Park Forecasting - Automated Data Integration Technical Specification"
description: "Technical specification for automated job and wage data integration from Towne Park data warehouse to forecasting system"
created_date: 2025-07-17
last_updated_date: 2025-07-17
source_date: 2025-07-02
version: 1.0
status: Draft
owner: "Product Owner"
source_documents:
  - "20250702_Completed_User_Stories_Sprint_27.md"
systems:
  - Forecasting
components:
  - Backend
  - Database
  - Integration
business_domains:
  - Parking Statistics
  - Payroll Expense
  - Field Operations
user_roles:
  - Product Owner
tags:
  - forecasting
  - data-integration
  - automation
  - technical-specification
  - job-data
  - wage-data
---

# Towne Park Forecasting - Automated Data Integration Technical Specification

## Purpose

This technical specification defines the automated data integration system that fetches job and wage data from the Towne Park data warehouse every four hours to maintain current and accurate information in the forecasting system. The integration ensures real-time data availability for forecasting operations while maintaining data integrity and quality validation.

## Architecture

### System Overview
- **Integration Type**: Automated scheduled data synchronization
- **Frequency**: Every 4 hours starting at 00:00 UTC
- **Data Source**: Towne Park data warehouse (`TP_LEGION` database)
- **Target System**: Forecasting system local database
- **Processing Method**: Batch processing with validation and retry logic

### Data Flow Architecture
```
Towne Park Data Warehouse (TP_LEGION)
    ↓ (Every 4 hours)
vwPAYROLL_SUMMARY View
    ↓ (SQL Query Processing)
Average Hourly Cost Calculation
    ↓ (Data Quality Validation)
Customer Site Filtering
    ↓ (Integration Service)
Forecasting System Local Database
```

## Data Model

### Source Data Structure
**Primary View**: `[TP_LEGION].[dbo].[vwPAYROLL_SUMMARY]`

**Key Fields**:
- `WORK_LOCATION`: Site identifier for job location
- `TITLE`: Job title/position identifier
- `TOTAL_DOLLARS`: Total compensation amount
- `TOTAL_HOURS`: Total hours worked
- `PAY_TYPE`: Type of compensation (excludes 'DIFFERENTIAL', 'MEAL PREMIUM')
- `DATE`: Transaction date for temporal filtering

### Calculated Fields
**Average Hourly Rate Calculation**:
```sql
AverageHourlyRate = CASE 
    WHEN SUM(CASE 
        WHEN [PAY_TYPE] NOT IN ('DIFFERENTIAL', 'MEAL PREMIUM') THEN [TOTAL_HOURS]
        ELSE 0
    END) > 0 
    THEN SUM([TOTAL_DOLLARS]) / SUM(CASE 
        WHEN [PAY_TYPE] NOT IN ('DIFFERENTIAL', 'MEAL PREMIUM') THEN [TOTAL_HOURS]
        ELSE 0
    END)
    ELSE 0
END
```

### Target Data Structure
**Forecasting System Tables**:
- Job data with location and title mappings
- Wage rate information with calculated averages
- Historical data retention for trend analysis
- Site assignment mappings for customer filtering

## API Endpoints

### Data Retrieval Endpoint
**Query Specification**:
```sql
SELECT 
    [WORK_LOCATION],
    [TITLE],
    SUM([TOTAL_DOLLARS]) AS TotalDollars,
    SUM(CASE 
        WHEN [PAY_TYPE] NOT IN ('DIFFERENTIAL', 'MEAL PREMIUM') THEN [TOTAL_HOURS]
        ELSE 0
    END) AS TotalHoursExcludingSpecialTypes,
    CASE 
        WHEN SUM(CASE 
            WHEN [PAY_TYPE] NOT IN ('DIFFERENTIAL', 'MEAL PREMIUM') THEN [TOTAL_HOURS]
            ELSE 0
        END) > 0 
        THEN SUM([TOTAL_DOLLARS]) / SUM(CASE 
            WHEN [PAY_TYPE] NOT IN ('DIFFERENTIAL', 'MEAL PREMIUM') THEN [TOTAL_HOURS]
            ELSE 0
        END)
        ELSE 0
    END AS AverageHourlyRate
FROM [TP_LEGION].[dbo].[vwPAYROLL_SUMMARY]
WHERE [WORK_LOCATION] IS NOT NULL 
  AND [WORK_LOCATION] <> ''
  AND [TITLE] IS NOT NULL
  AND [TITLE] <> ''
  AND [DATE] >= DATEADD(day, -14, GETDATE())
GROUP BY [WORK_LOCATION], [TITLE]
ORDER BY [WORK_LOCATION], [TITLE]
```

**Sample Response Data**:
```
WORK_LOCATION | TITLE    | TotalDollars | TotalHoursExcludingSpecialTypes | AverageHourlyRate
118           | GSA      | 630.33       | 34.84                          | 18.092135
170           | CASH     | 5381.55      | 316.1                          | 17.024833
170           | DOOR     | 1005.38      | 60.96                          | 16.492454
170           | GSA      | 7293.79      | 763.44                         | 9.553848
```

## Dependencies

### External Dependencies
- **Towne Park Data Warehouse**: `TP_LEGION` database availability
- **Network Connectivity**: Stable connection to data warehouse
- **Database Permissions**: Read access to `vwPAYROLL_SUMMARY` view

### Internal Dependencies
- **Forecasting System Database**: Local storage for processed data
- **Customer Site Management**: Site filtering and validation
- **Notification System**: Azure DevOps integration for failure alerts

## Implementation Details

### Sync Process Algorithm
1. **Connection Establishment**: Connect to TP_LEGION database
2. **Data Extraction**: Execute hourly rate calculation query
3. **Data Validation**: Verify data quality and completeness
4. **Site Filtering**: Filter against customer sites in platform
5. **Data Transformation**: Process and format for local storage
6. **Database Update**: Commit validated data to forecasting system
7. **Cleanup**: Close connections and log completion status

### Error Handling Logic
- **Connection Failures**: Retry with exponential backoff
- **Data Quality Issues**: Log specific validation failures
- **Partial Data**: Reject incomplete datasets
- **Timeout Handling**: 300-second connection timeout limit

### Retry Strategy
- **Failed Sync Retry**: Upon next scheduled sync trigger
- **Backoff Strategy**: Exponential backoff for connection retries
- **Maximum Retries**: 3 attempts per sync cycle
- **Notification Trigger**: Alert Towne Park Billing team after final failure

## Performance Considerations

### Performance Requirements
- **Sync Duration**: Complete within 30 minutes for up to 50,000 wage records
- **Database Impact**: Sync operations must not block normal queries for >5 seconds
- **Memory Usage**: Sync process limited to 2GB RAM usage
- **Network Timeout**: 300-second timeout for database connections

### Optimization Strategies
- **Batch Processing**: Process data in manageable chunks
- **Incremental Updates**: Only process changed data when possible
- **Connection Pooling**: Reuse database connections efficiently
- **Parallel Processing**: Utilize multiple threads for data processing

## Security Considerations

### Data Protection
- **Connection Security**: Encrypted connections to data warehouse
- **Access Control**: Minimum required permissions for data access
- **Data Validation**: Input sanitization and validation
- **Audit Logging**: Complete audit trail of all sync operations

### Authentication Requirements
- **Service Account**: Dedicated service account for data warehouse access
- **Connection Strings**: Secure storage of database connection information
- **Permission Validation**: Regular review of access permissions

## Testing Strategy

### Unit Testing
- **Query Validation**: Test SQL query accuracy and performance
- **Data Transformation**: Validate calculation logic
- **Error Handling**: Test failure scenarios and recovery
- **Site Filtering**: Verify customer site filtering logic

### Integration Testing
- **End-to-End Sync**: Complete sync process validation
- **Performance Testing**: Load testing with maximum data volumes
- **Failure Recovery**: Test retry logic and notification systems
- **Data Integrity**: Validate data consistency across systems

### Validation Criteria
- **Data Accuracy**: 100% accuracy in hourly rate calculations
- **Performance Compliance**: Meet all performance requirements
- **Error Recovery**: Successful recovery from all failure scenarios
- **Notification Delivery**: Reliable failure notification delivery

## Deployment Considerations

### Environment Requirements
- **Database Access**: Configured access to TP_LEGION database
- **Service Scheduling**: Automated scheduling service configuration
- **Monitoring Setup**: Performance and error monitoring systems
- **Notification Configuration**: Azure DevOps integration setup

### Rollback Procedures
- **Data Backup**: Automated backup before each sync
- **Version Control**: Maintain previous data versions
- **Quick Rollback**: Ability to restore previous data state
- **Validation Testing**: Post-rollback data integrity verification

### Monitoring and Alerting
- **Sync Status Monitoring**: Real-time sync process monitoring
- **Performance Metrics**: Track sync duration and data volumes
- **Error Rate Tracking**: Monitor failure rates and patterns
- **Automated Alerts**: Immediate notification of sync failures

## Business Rules and Data Quality Requirements

### Core Data Quality Requirements
1. **No Missing or Empty Values**
   - Location identifiers (WORK_LOCATION) must not be NULL or empty strings
   - Job identifiers (TITLE) must not be NULL or empty strings
   - Results with NULL calculated values are excluded

2. **Uniqueness Controls**
   - All employee counts use COUNT(DISTINCT) to prevent duplicate counting
   - Results are grouped by appropriate dimensions to ensure accurate aggregation

3. **Standardized Output Format**
   - Results are consistently ordered by location and job-related fields
   - Job codes are standardized (extracted from longer descriptive fields)

### Average Hourly Rate Calculation Rules
1. **Recency Rule**
   - Only data from the last 14 days is used for calculations
   - Ensures rates reflect current compensation patterns

2. **Pay Type Exclusions**
   - Differential and meal premium pay types are excluded from hours calculations
   - All dollars are included regardless of pay type

3. **Rate Calculation Method**
   - Average hourly rate = Total dollars ÷ Total hours (excluding special pay types)
   - Division by zero protection is implemented

### Sync Frequency Rules
- **Primary Schedule**: Every 4 hours starting at 00:00 UTC
- **Retry Logic**: Failed syncs retry upon the next sync trigger
- **Failed Sync Notification**: Failed syncs notify the Towne Park Billing team group in Azure DevOps
- **Overlap Prevention**: New sync cannot start if previous sync is still running

### Site Filtering Rules
- **Customer Site Validation**: Results filtered against list of Customer Sites in platform
- **No Storage of Non-Customer Data**: No need to store Job or Wage information about non-added Sites
- **Real-time Filtering**: Site filtering applied during data processing

## Related Documentation

- [Forecasting System Overview](../../systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md)
- [Forecasting Data Sources Technical Specification](../database/20250716_Forecasting_DataSources_TechnicalSpec.md)
