---
title: "12-Month Forecast Data Architecture - Data Model Technical Document"
version: "1.0"
last_updated_date: "2025-08-06"
document_type: "data_model"
system_component: "Forecasting System"
data_classification: "Internal"
related_documents:
  - "20250709_12MonthForecast_ArchitecturePlanning_MeetingTranscript.md"
  - "EDWBudgetData_Integration_TechnicalDocument.md"
  - "DataFlowMonitoring_Report_TechnicalDocument.md"
tags: ["data-model", "forecasting", "12-month-forecast", "budget-data", "azure-functions"]
---

# 12-Month Forecast Data Architecture - Data Model Technical Document

## Document Overview

**Purpose:** Define the comprehensive data architecture for the 12-month forecast system, including data structures, transformation pipelines, and storage strategies.

**Scope:** Complete data flow from EDW budget final tables through calculated forecast values to PNL display.

**Last Updated:** August 6, 2025

## Executive Summary

The 12-month forecast data architecture implements a multi-stage data pipeline that transforms budget data from EDW into calculated forecast values. The architecture supports automated budget retrieval, baseline forecast creation, calculation processing, and real-time trend analysis.

## Data Architecture Overview

### Data Flow Pipeline
```
EDW Budget Final → Budget Monthly → Baseline Forecast → Forecast Calculated → PNL Display
                                                    ↓
                                              Trend (Current Month)
```

### Storage Strategy
- **Budget Data:** Monthly storage to optimize space (vs. 3GB+ daily storage)
- **Forecast Data:** Daily storage for account manager editing flexibility
- **Calculated Data:** Daily storage with Internal Revenue and FLC calculations
- **Trend Data:** Current month only with daily actual replacements

## Data Entities

### 1. Budget Final (Source - EDW)

**Entity Purpose:** Source budget data from Enterprise Data Warehouse

**Data Classification:** Master Data

**Storage Location:** EDW (External)

**Key Attributes:**
- Budget year identifier
- Site/location codes
- Job code mappings
- Monthly budget allocations
- Contract terms and rates

**Data Volume:** Variable by year, typically 12 months × sites × job codes

**Update Frequency:** Annual (January 1st effective date)

**Business Rules:**
- Budget data cannot change after January 1st effective date
- Serves as baseline for all forecast calculations
- Must be available before forecast system initialization

### 2. Budget Monthly (Intermediate - Dataverse)

**Entity Purpose:** Transformed budget data optimized for forecast processing

**Data Classification:** Derived Data

**Storage Location:** Microsoft Dataverse

**Key Attributes:**
```json
{
  "budget_id": "string (primary key)",
  "site_id": "string (foreign key)",
  "job_code": "string",
  "budget_month": "date",
  "budget_year": "integer",
  "monthly_amount": "decimal",
  "contract_terms": "json",
  "created_date": "datetime",
  "last_updated": "datetime"
}
```

**Data Volume:** 12 months × 700+ sites × multiple job codes

**Update Frequency:** Daily sync from Budget Final

**Relationships:**
- One-to-many with Baseline Forecast
- Source for calculation processing

**Business Rules:**
- Monthly granularity only (not daily)
- Immutable once created for budget year
- Serves as source for baseline forecast generation

### 3. Baseline Forecast (Core - Dataverse)

**Entity Purpose:** Editable forecast data at daily granularity

**Data Classification:** Transactional Data

**Storage Location:** Microsoft Dataverse

**Key Attributes:**
```json
{
  "forecast_id": "string (primary key)",
  "site_id": "string (foreign key)",
  "job_code": "string",
  "forecast_date": "date",
  "forecast_month": "integer",
  "forecast_year": "integer",
  "daily_amount": "decimal",
  "payroll_forecast": "decimal",
  "statistics_forecast": "json",
  "contract_details": "json",
  "last_modified_by": "string",
  "last_modified_date": "datetime",
  "is_edited": "boolean"
}
```

**Data Volume:** 365 days × 700+ sites × multiple job codes (3GB+ estimated)

**Update Frequency:** 
- Initial: Batch load from Budget Monthly
- Ongoing: Real-time updates from account manager edits

**Relationships:**
- Many-to-one with Budget Monthly (source)
- One-to-one with Forecast Calculated (target)
- Many-to-one with Site entities

**Business Rules:**
- Daily granularity required for account manager editing
- Editable by account managers through UI
- Changes trigger recalculation pipeline
- Maintains audit trail of modifications

### 4. Forecast Calculated (Output - Dataverse)

**Entity Purpose:** Post-calculation forecast values with business logic applied

**Data Classification:** Derived Data

**Storage Location:** Microsoft Dataverse

**Key Attributes:**
```json
{
  "calculated_id": "string (primary key)",
  "forecast_id": "string (foreign key)",
  "site_id": "string (foreign key)",
  "forecast_date": "date",
  "internal_revenue": "decimal",
  "external_revenue": "decimal",
  "flc_amount": "decimal",
  "total_payroll": "decimal",
  "insurance_amount": "decimal",
  "parking_revenue": "decimal",
  "rent_expense": "decimal",
  "calculation_timestamp": "datetime",
  "calculation_version": "string"
}
```

**Data Volume:** Same as Baseline Forecast (365 days × sites × job codes)

**Update Frequency:** 
- Triggered by Baseline Forecast changes
- Batch recalculation for initial load
- Real-time calculation for individual edits

**Relationships:**
- One-to-one with Baseline Forecast
- Source for PNL display
- Input for Trend calculations

**Business Rules:**
- All calculations follow established PNL business rules
- Internal Revenue calculated using contract details
- FLC (Forecast Labor Cost) includes all payroll components
- Immutable once calculated (new records for changes)

### 5. Trend Current Month (Real-time - Dataverse)

**Entity Purpose:** Current month forecast with daily actual replacements

**Data Classification:** Hybrid Data (Forecast + Actuals)

**Storage Location:** Microsoft Dataverse

**Key Attributes:**
```json
{
  "trend_id": "string (primary key)",
  "site_id": "string (foreign key)",
  "trend_date": "date",
  "is_actual": "boolean",
  "actual_amount": "decimal",
  "forecast_amount": "decimal",
  "display_amount": "decimal",
  "source_system": "string",
  "last_updated": "datetime"
}
```

**Data Volume:** Current month only (30-31 days × sites × job codes)

**Update Frequency:** Daily from Revenue Daily Detail

**Relationships:**
- References Forecast Calculated for forecast values
- Sources from Revenue Daily Detail for actuals
- Displays in PNL current month column

**Business Rules:**
- Replaces forecast with actuals day-by-day
- Maintains forecast for future days in current month
- Recalculates Internal Revenue for actual days
- Updates automatically from EDW daily feeds

## Data Transformation Rules

### Budget Final to Budget Monthly
```sql
-- Transformation Logic
SELECT 
    site_id,
    job_code,
    DATEFROMPARTS(budget_year, month_number, 1) as budget_month,
    monthly_budget_amount,
    contract_terms_json
FROM edw.budget_final 
WHERE budget_year = @target_year
```

**Transformation Rules:**
- Convert annual budget to monthly allocations
- Preserve contract terms as JSON for calculation reference
- Validate data completeness before processing
- Log transformation metrics for monitoring

### Budget Monthly to Baseline Forecast
```sql
-- Daily Expansion Logic
WITH daily_calendar AS (
    SELECT date_value 
    FROM calendar_table 
    WHERE YEAR(date_value) = @forecast_year
)
SELECT 
    bm.site_id,
    bm.job_code,
    dc.date_value as forecast_date,
    bm.monthly_amount / DAY(EOMONTH(dc.date_value)) as daily_amount,
    bm.contract_terms
FROM budget_monthly bm
CROSS JOIN daily_calendar dc
WHERE MONTH(dc.date_value) = MONTH(bm.budget_month)
```

**Transformation Rules:**
- Divide monthly amounts by days in month for daily allocation
- Preserve all contract terms for calculation processing
- Create 365 records per site/job code combination
- Initialize edit flags to false

### Baseline Forecast to Forecast Calculated
**Calculation Service Processing:**
- Internal Revenue: Apply contract terms to baseline amounts
- External Revenue: Calculate based on site-specific rules
- FLC: Sum all payroll components with burden rates
- Insurance/Parking/Rent: Apply fixed or percentage-based rules

## Data Quality Standards

### Validation Rules
1. **Completeness:** All required fields must be populated
2. **Consistency:** Cross-entity relationships must be valid
3. **Accuracy:** Calculation results must match business rules
4. **Timeliness:** Data must be updated within defined SLAs

### Data Integrity Constraints
- Primary key uniqueness across all entities
- Foreign key relationships enforced
- Date ranges must be valid and logical
- Numeric values must be within business-defined ranges

### Audit Requirements
- All data changes logged with user and timestamp
- Calculation versions tracked for reproducibility
- Data lineage maintained from source to display
- Error conditions logged and monitored

## Performance Considerations

### Storage Optimization
- **Monthly vs Daily:** Budget data stored monthly to reduce storage by 30x
- **Indexing Strategy:** Composite indexes on site_id + date for query performance
- **Partitioning:** Data partitioned by year and month for efficient access
- **Archival:** Historical data archived after 3 years

### Calculation Performance
- **Batch Processing:** Initial load uses batch calculation for efficiency
- **Incremental Updates:** Individual edits trigger targeted recalculation
- **Caching Strategy:** Frequently accessed calculations cached in memory
- **Parallel Processing:** Azure Functions enable concurrent calculation processing

### Query Optimization
- **Materialized Views:** Pre-calculated aggregations for common queries
- **Query Hints:** Optimized execution plans for complex PNL queries
- **Connection Pooling:** Efficient database connection management
- **Result Caching:** Cache PNL results for repeated access

## Integration Points

### Upstream Systems
- **EDW Budget Final:** Source budget data
- **Revenue Daily Detail:** Actual amounts for trend
- **Contract Management:** Contract terms and rates
- **Site Master:** Site configuration and hierarchy

### Downstream Systems
- **PNL Display:** Primary consumer of calculated data
- **Variance Reports:** Comparison and analysis reporting
- **Export Services:** Data extraction for external systems
- **Audit Systems:** Data lineage and change tracking

## Security and Access Control

### Data Classification
- **Budget Data:** Confidential - Finance team access only
- **Forecast Data:** Internal - Account managers and above
- **Calculated Data:** Internal - All authorized users
- **Audit Data:** Restricted - System administrators only

### Access Patterns
- **Read Access:** Role-based permissions by site and region
- **Write Access:** Account managers for assigned sites only
- **Admin Access:** System administrators for configuration
- **Audit Access:** Compliance team for review and reporting

## Monitoring and Alerting

### Data Quality Metrics
- **Completeness Rate:** Percentage of required fields populated
- **Accuracy Rate:** Calculation results validation success rate
- **Timeliness Rate:** Data updates within SLA timeframes
- **Consistency Rate:** Cross-entity relationship validation success

### Performance Metrics
- **Calculation Duration:** Time to complete forecast calculations
- **Query Response Time:** PNL display load performance
- **Storage Growth Rate:** Data volume increase monitoring
- **Error Rate:** Failed processing attempts percentage

### Alert Conditions
- Data quality metrics below threshold (95%)
- Calculation processing failures
- Storage capacity approaching limits (80%)
- Performance degradation beyond SLA

## Disaster Recovery

### Backup Strategy
- **Daily Backups:** Full database backup retained for 30 days
- **Transaction Log Backups:** 15-minute intervals for point-in-time recovery
- **Cross-Region Replication:** Secondary region for disaster recovery
- **Archive Storage:** Long-term retention in cold storage

### Recovery Procedures
- **RTO Target:** 4 hours for full system restoration
- **RPO Target:** 15 minutes maximum data loss
- **Failover Process:** Automated failover to secondary region
- **Data Validation:** Post-recovery data integrity verification

## Future Enhancements

### Planned Improvements
- **Real-time Streaming:** Event-driven calculation updates
- **Machine Learning:** Predictive forecast adjustments
- **Advanced Analytics:** Statistical analysis and trending
- **API Expansion:** External system integration capabilities

### Scalability Considerations
- **Horizontal Scaling:** Additional Azure Functions instances
- **Database Sharding:** Partition data across multiple databases
- **Caching Layer:** Distributed cache for improved performance
- **CDN Integration:** Global content delivery for reports

---

**Document Prepared By:** AI Documentation System  
**Technical Review:** Pending  
**Business Review:** Pending  
**Approval Status:** Draft  
**Next Review Date:** 2025-09-06