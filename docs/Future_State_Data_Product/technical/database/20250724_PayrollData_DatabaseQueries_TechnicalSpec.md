---
title: "Towne Park Forecasting - Payroll Data Database Queries Technical Specification"
description: "Comprehensive technical specification for payroll data database queries including daily granularity implementation, query architecture, and data retrieval patterns for forecasting system"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-07-03
version: 1.0
status: Draft
owner: "Christopher Thompson"
source_documents:
  - "20250701_20250701_DailyScrum_Batch5.md"
systems:
  - Forecasting
components:
  - Backend
  - Database
business_domains:
  - Payroll Data
  - Statistics
  - Labor Forecasting
user_roles:
  - Developer
  - Database Administrator
  - Business Analyst
tags:
  - technical-specification
  - database-queries
  - payroll-data
  - daily-granularity
  - forecasting
  - data-retrieval
---

# Towne Park Forecasting - Payroll Data Database Queries Technical Specification

## Purpose

This document provides comprehensive technical specifications for payroll data database queries used in the Towne Park Forecasting system. The specifications define the daily granularity implementation approach, query architecture, and data retrieval patterns that ensure accurate payroll data representation without relying on simple monthly averaging calculations.

## Architecture

### Query Architecture Overview

The payroll data query system implements a sophisticated daily granularity approach that retrieves precise daily data rather than estimating from monthly totals:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Forecasting   │    │   Query Engine   │    │   Data Sources  │
│     System      │◄──►│                  │◄──►│                 │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌──────────────────┐             │
         │              │ Daily Granularity│             │
         │              │   Query Logic    │             │
         │              └──────────────────┘             │
         │                       │                       │
         │              ┌──────────────────┐             │
         └──────────────►│  Aggregation     │◄────────────┘
                        │    Engine        │
                        └──────────────────┘
```

### Core Query Components

#### Daily Granularity Engine
- **Purpose**: Retrieve actual daily data rather than estimated averages
- **Implementation**: Direct daily-level queries to source systems
- **Benefit**: Eliminates calculation errors from monthly division approaches
- **Data Sources**: Legion WFM, internal payroll systems, scheduling databases

#### Query Types Architecture
- **Payroll Schedule Queries**: Planned/scheduled hours by day and job code
- **Payroll Actuals Queries**: Actual worked hours by day and job code
- **Combined Aggregation Queries**: Real-time rollup for UI display
- **Historical Comparison Queries**: Period-over-period analysis support

## Data Model

### Daily Payroll Data Structure

#### Core Data Schema
```sql
-- Daily payroll data structure
CREATE TABLE daily_payroll_data (
    site_id VARCHAR(50) NOT NULL,
    date_value DATE NOT NULL,
    job_code VARCHAR(100) NOT NULL,
    employee_id VARCHAR(50),
    scheduled_hours DECIMAL(8,2),
    actual_hours DECIMAL(8,2),
    hourly_rate DECIMAL(10,2),
    scheduled_cost DECIMAL(12,2),
    actual_cost DECIMAL(12,2),
    data_source VARCHAR(100),
    last_updated_timestamp TIMESTAMP,
    PRIMARY KEY (site_id, date_value, job_code, employee_id)
);
```

#### Aggregated Daily Summary Structure
```sql
-- Daily aggregated summary for UI display
CREATE TABLE daily_payroll_summary (
    site_id VARCHAR(50) NOT NULL,
    date_value DATE NOT NULL,
    total_scheduled_hours DECIMAL(10,2),
    total_actual_hours DECIMAL(10,2),
    total_scheduled_cost DECIMAL(15,2),
    total_actual_cost DECIMAL(15,2),
    job_code_count INTEGER,
    employee_count INTEGER,
    variance_hours DECIMAL(10,2),
    variance_cost DECIMAL(15,2),
    last_calculated_timestamp TIMESTAMP,
    PRIMARY KEY (site_id, date_value)
);
```

### Job Code Hierarchy Structure
```sql
-- Job code organization for payroll queries
CREATE TABLE job_code_hierarchy (
    job_code VARCHAR(100) NOT NULL,
    job_group VARCHAR(100),
    department VARCHAR(100),
    cost_center VARCHAR(50),
    is_billable BOOLEAN,
    hourly_rate_default DECIMAL(10,2),
    effective_start_date DATE,
    effective_end_date DATE,
    PRIMARY KEY (job_code, effective_start_date)
);
```

## Query Specifications

### Core Payroll Schedule Queries

#### Daily Scheduled Hours Query
```sql
-- Retrieve scheduled hours for specific date range
SELECT 
    site_id,
    date_value,
    job_code,
    SUM(scheduled_hours) as total_scheduled_hours,
    SUM(scheduled_cost) as total_scheduled_cost,
    COUNT(DISTINCT employee_id) as employee_count
FROM daily_payroll_data
WHERE site_id = @site_id
    AND date_value BETWEEN @start_date AND @end_date
    AND scheduled_hours IS NOT NULL
GROUP BY site_id, date_value, job_code
ORDER BY date_value, job_code;
```

**Query Parameters:**
- `@site_id`: Target site identifier
- `@start_date`: Beginning of date range
- `@end_date`: End of date range

**Performance Considerations:**
- Index on (site_id, date_value, job_code)
- Partition by site_id for large datasets
- Query execution time target: <2 seconds

#### Daily Actual Hours Query
```sql
-- Retrieve actual worked hours for specific date range
SELECT 
    site_id,
    date_value,
    job_code,
    SUM(actual_hours) as total_actual_hours,
    SUM(actual_cost) as total_actual_cost,
    COUNT(DISTINCT employee_id) as employee_count,
    AVG(hourly_rate) as average_hourly_rate
FROM daily_payroll_data
WHERE site_id = @site_id
    AND date_value BETWEEN @start_date AND @end_date
    AND actual_hours IS NOT NULL
GROUP BY site_id, date_value, job_code
ORDER BY date_value, job_code;
```

### Aggregated Display Queries

#### Combined Daily Summary Query
```sql
-- Combined query for UI hover functionality
SELECT 
    dpd.site_id,
    dpd.date_value,
    SUM(dpd.scheduled_hours) as total_scheduled_hours,
    SUM(dpd.actual_hours) as total_actual_hours,
    SUM(dpd.scheduled_cost) as total_scheduled_cost,
    SUM(dpd.actual_cost) as total_actual_cost,
    COUNT(DISTINCT dpd.job_code) as job_code_count,
    COUNT(DISTINCT dpd.employee_id) as employee_count,
    (SUM(dpd.actual_hours) - SUM(dpd.scheduled_hours)) as variance_hours,
    (SUM(dpd.actual_cost) - SUM(dpd.scheduled_cost)) as variance_cost
FROM daily_payroll_data dpd
INNER JOIN job_code_hierarchy jch ON dpd.job_code = jch.job_code
WHERE dpd.site_id = @site_id
    AND dpd.date_value = @target_date
    AND jch.effective_start_date <= dpd.date_value
    AND (jch.effective_end_date IS NULL OR jch.effective_end_date >= dpd.date_value)
GROUP BY dpd.site_id, dpd.date_value
ORDER BY dpd.date_value;
```

**UI Integration Requirements:**
- Real-time execution for hover functionality
- Response time target: <500ms
- Caching strategy for frequently accessed dates
- Error handling for missing data scenarios

#### Monthly Rollup Validation Query
```sql
-- Monthly aggregation for validation against UI display
SELECT 
    site_id,
    YEAR(date_value) as year_value,
    MONTH(date_value) as month_value,
    SUM(scheduled_hours) as monthly_scheduled_hours,
    SUM(actual_hours) as monthly_actual_hours,
    SUM(scheduled_cost) as monthly_scheduled_cost,
    SUM(actual_cost) as monthly_actual_cost,
    COUNT(DISTINCT date_value) as days_with_data,
    AVG(scheduled_hours) as avg_daily_scheduled,
    AVG(actual_hours) as avg_daily_actual
FROM daily_payroll_data
WHERE site_id = @site_id
    AND date_value BETWEEN @month_start AND @month_end
GROUP BY site_id, YEAR(date_value), MONTH(date_value)
ORDER BY year_value, month_value;
```

### Data Quality Validation Queries

#### Data Completeness Check
```sql
-- Validate data completeness for date range
SELECT 
    site_id,
    date_value,
    COUNT(*) as record_count,
    COUNT(CASE WHEN scheduled_hours IS NOT NULL THEN 1 END) as scheduled_records,
    COUNT(CASE WHEN actual_hours IS NOT NULL THEN 1 END) as actual_records,
    COUNT(DISTINCT job_code) as unique_job_codes,
    COUNT(DISTINCT employee_id) as unique_employees
FROM daily_payroll_data
WHERE site_id = @site_id
    AND date_value BETWEEN @start_date AND @end_date
GROUP BY site_id, date_value
HAVING COUNT(*) = 0 OR 
       COUNT(CASE WHEN scheduled_hours IS NOT NULL THEN 1 END) = 0 OR
       COUNT(CASE WHEN actual_hours IS NOT NULL THEN 1 END) = 0
ORDER BY date_value;
```

#### Variance Analysis Query
```sql
-- Identify significant variances between scheduled and actual
SELECT 
    site_id,
    date_value,
    job_code,
    scheduled_hours,
    actual_hours,
    (actual_hours - scheduled_hours) as variance_hours,
    CASE 
        WHEN scheduled_hours > 0 THEN 
            ((actual_hours - scheduled_hours) / scheduled_hours) * 100
        ELSE NULL 
    END as variance_percentage
FROM daily_payroll_data
WHERE site_id = @site_id
    AND date_value BETWEEN @start_date AND @end_date
    AND ABS(actual_hours - scheduled_hours) > @variance_threshold
ORDER BY ABS(actual_hours - scheduled_hours) DESC;
```

## Implementation Details

### Query Execution Strategy

#### Daily Granularity Implementation
Christopher Thompson's clarification on the implementation approach:

"We're not taking like the full month and dividing it by 30 or 31 or whatever. We're actually running a query that gets us info for every day."

**Technical Implementation:**
- Direct daily-level data retrieval from source systems
- No estimation or averaging calculations
- Precise daily breakdown for accurate variance analysis
- Real-time aggregation for UI display requirements

#### Performance Optimization
```sql
-- Optimized index strategy for payroll queries
CREATE INDEX idx_payroll_site_date_job ON daily_payroll_data (site_id, date_value, job_code);
CREATE INDEX idx_payroll_date_site ON daily_payroll_data (date_value, site_id);
CREATE INDEX idx_payroll_employee_date ON daily_payroll_data (employee_id, date_value);

-- Partitioning strategy for large datasets
ALTER TABLE daily_payroll_data 
PARTITION BY RANGE (YEAR(date_value)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027)
);
```

### Data Integration Patterns

#### Source System Integration
```python
# Python implementation for data integration
class PayrollDataIntegrator:
    def __init__(self, config):
        self.legion_connector = LegionWFMConnector(config.legion)
        self.payroll_connector = PayrollSystemConnector(config.payroll)
        self.database = DatabaseConnector(config.database)
    
    def extract_daily_data(self, site_id, date_range):
        """Extract daily payroll data from source systems"""
        scheduled_data = self.legion_connector.get_scheduled_hours(
            site_id, date_range
        )
        actual_data = self.payroll_connector.get_actual_hours(
            site_id, date_range
        )
        
        return self.merge_scheduled_actual(scheduled_data, actual_data)
    
    def merge_scheduled_actual(self, scheduled, actual):
        """Merge scheduled and actual data by date and job code"""
        merged_data = []
        for date_value in scheduled.keys():
            for job_code in scheduled[date_value].keys():
                record = {
                    'date_value': date_value,
                    'job_code': job_code,
                    'scheduled_hours': scheduled[date_value][job_code]['hours'],
                    'actual_hours': actual.get(date_value, {}).get(job_code, {}).get('hours', 0),
                    'scheduled_cost': scheduled[date_value][job_code]['cost'],
                    'actual_cost': actual.get(date_value, {}).get(job_code, {}).get('cost', 0)
                }
                merged_data.append(record)
        return merged_data
```

### UI Integration Requirements

#### Hover Functionality Support
```javascript
// JavaScript implementation for hover functionality
class PayrollDataDisplay {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.cache = new Map();
    }
    
    async getHoverData(siteId, dateValue) {
        const cacheKey = `${siteId}_${dateValue}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            const response = await this.apiClient.get('/api/payroll/daily-summary', {
                params: { site_id: siteId, target_date: dateValue }
            });
            
            const hoverData = {
                date: dateValue,
                totalScheduled: response.data.total_scheduled_hours,
                totalActual: response.data.total_actual_hours,
                jobCodeCount: response.data.job_code_count,
                employeeCount: response.data.employee_count,
                variance: response.data.variance_hours
            };
            
            this.cache.set(cacheKey, hoverData);
            return hoverData;
            
        } catch (error) {
            console.error('Failed to fetch hover data:', error);
            return this.getDefaultHoverData();
        }
    }
    
    getDefaultHoverData() {
        return {
            date: null,
            totalScheduled: 0,
            totalActual: 0,
            jobCodeCount: 0,
            employeeCount: 0,
            variance: 0,
            error: true
        };
    }
}
```

## Performance Considerations

### Query Optimization Strategies

#### Execution Time Targets
- **Daily Summary Queries**: <2 seconds for month-long date ranges
- **Hover Functionality Queries**: <500ms for single-day requests
- **Monthly Aggregation Queries**: <5 seconds for full-year analysis
- **Data Quality Validation**: <10 seconds for comprehensive checks

#### Caching Strategy
```yaml
cache_configuration:
  daily_summaries:
    ttl: 4h
    max_entries: 10000
    eviction_policy: LRU
  hover_data:
    ttl: 1h
    max_entries: 5000
    eviction_policy: LRU
  monthly_aggregations:
    ttl: 24h
    max_entries: 1000
    eviction_policy: LRU
```

#### Database Optimization
- **Connection Pooling**: Maximum 20 concurrent connections
- **Query Timeout**: 30 seconds for complex aggregations
- **Index Maintenance**: Weekly index optimization schedule
- **Statistics Updates**: Daily statistics refresh for query optimization

## Testing Strategy

### Query Validation Testing

#### Data Accuracy Tests
```sql
-- Test query for data accuracy validation
WITH daily_totals AS (
    SELECT 
        site_id,
        date_value,
        SUM(actual_hours) as daily_actual_total
    FROM daily_payroll_data
    WHERE site_id = 'TEST_SITE_001'
        AND date_value BETWEEN '2025-06-01' AND '2025-06-30'
    GROUP BY site_id, date_value
),
monthly_total AS (
    SELECT 
        site_id,
        SUM(daily_actual_total) as monthly_actual_total
    FROM daily_totals
    GROUP BY site_id
)
SELECT 
    dt.site_id,
    dt.date_value,
    dt.daily_actual_total,
    mt.monthly_actual_total,
    (dt.daily_actual_total / mt.monthly_actual_total) * 100 as daily_percentage
FROM daily_totals dt
CROSS JOIN monthly_total mt
WHERE dt.site_id = mt.site_id
ORDER BY dt.date_value;
```

#### Performance Testing
- **Load Testing**: 100 concurrent users executing hover queries
- **Stress Testing**: 1000 simultaneous daily summary requests
- **Volume Testing**: Full-year data retrieval for large sites
- **Endurance Testing**: 24-hour continuous query execution

### Integration Testing

#### UI Integration Validation
- Test hover functionality with various date ranges
- Validate data consistency between daily and monthly displays
- Verify error handling for missing or incomplete data
- Confirm caching behavior under different load conditions

#### Data Source Integration Testing
- Validate Legion WFM data integration accuracy
- Test payroll system connectivity and data retrieval
- Verify data transformation and mapping logic
- Confirm real-time data synchronization

## Related Documentation

### Technical Specifications
- [Forecasting Database Integration](20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md)
- [Forecasting Data Sources Technical Specification](20250716_Forecasting_DataSources_TechnicalSpec.md)

### Business Rules Documentation
- [Payroll Data Display Business Rules](../../business-rules/forecasting/20250724_PayrollDataDisplay_BusinessRules.md)
- [Forecasting Calculations and Validations](../../business-rules/forecasting/20250718_Forecasting_BusinessRules_CalculationsAndValidations.md)

### Team Notes and Decisions
- [Daily Scrum Technical Clarifications Team Notes](../team-notes/development/20250724_DailyScrum_TechnicalClarifications_TeamNotes.md)

### User Process Documentation
- [Account Manager Payroll Data Analysis](../../user-processes/account-manager/20250724_PayrollDataAnalysis_UserProcess.md)

## Code Validation Report
**Last Validated:** 2025-07-24  
**Validation Scope:** Database Query Architecture and Implementation  
**Code Copy Date:** Current as of validation date

### Validation Summary
- ✅ **Verified Elements:** 0 items (query specifications pending implementation)
- ⚠️ **Discrepancies Found:** 0 items
- ❓ **Incomplete Documentation:** 1 item (actual database queries to be added to user stories)  
- 🔍 **Requires Review:** Query performance optimization and caching strategies

### Validation Limitations
- Technical specifications document architecture and requirements rather than implementation
- Code validation will be required once actual database queries are implemented
- Future validation needed against actual payroll data retrieval implementation
- Performance testing validation pending query deployment

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-24 | Documentation Team | Initial creation from daily scrum technical clarifications, establishing comprehensive database query specifications for payroll data daily granularity implementation |