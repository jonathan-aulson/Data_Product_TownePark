---
title: "EDW Budget Data Integration - Technical Document"
version: "1.0"
last_updated_date: "2025-08-06"
document_type: "integration"
system_component: "Data Integration Layer"
integration_type: "Automated Data Retrieval"
related_documents:
  - "20250709_12MonthForecast_ArchitecturePlanning_MeetingTranscript.md"
  - "12MonthForecast_DataArchitecture_DataModel_TechnicalDocument.md"
  - "DataFlowMonitoring_Report_TechnicalDocument.md"
tags: ["integration", "edw", "budget-data", "automation", "data-pipeline"]
---

# EDW Budget Data Integration - Technical Document

## Document Overview

**Purpose:** Define the automated integration process for retrieving budget data from Enterprise Data Warehouse (EDW) and transforming it for the 12-month forecast system.

**Scope:** Complete integration pipeline from EDW budget final tables to Dataverse baseline forecast entities.

**Last Updated:** August 6, 2025

## Executive Summary

The EDW Budget Data Integration provides automated discovery, retrieval, and transformation of annual budget data from the Enterprise Data Warehouse. This integration eliminates manual Excel-based processes and ensures accurate, timely budget data availability for the 12-month forecast system.

## Integration Architecture

### High-Level Data Flow
```
EDW Budget Final → Data Gateway → Power Automate → Dataverse Budget Monthly → Baseline Forecast
```

### Integration Components
- **Source System:** Enterprise Data Warehouse (EDW)
- **Integration Platform:** Power Automate Data Flows
- **Target System:** Microsoft Dataverse
- **Monitoring:** Admin Panel Dashboard
- **Orchestration:** Automated daily discovery process

## Source System Details

### EDW Budget Final Table

**System:** Enterprise Data Warehouse  
**Database:** EDW Production  
**Schema:** Finance  
**Table:** budget_final  

**Key Attributes:**
```sql
CREATE TABLE finance.budget_final (
    budget_id BIGINT PRIMARY KEY,
    site_id VARCHAR(50) NOT NULL,
    job_code VARCHAR(20) NOT NULL,
    budget_year INT NOT NULL,
    budget_month INT NOT NULL,
    monthly_amount DECIMAL(15,2) NOT NULL,
    contract_terms NVARCHAR(MAX), -- JSON format
    effective_date DATE NOT NULL,
    created_date DATETIME2 DEFAULT GETDATE(),
    last_modified_date DATETIME2 DEFAULT GETDATE()
);
```

**Data Characteristics:**
- **Volume:** ~50,000-100,000 records per budget year
- **Update Frequency:** Annual (January 1st effective date)
- **Data Retention:** 7 years historical data
- **Availability:** 24/7 with scheduled maintenance windows

**Business Rules:**
- Budget data becomes available December 15th for following year
- Data is immutable once effective date passes
- All sites must have complete 12-month budget data
- Contract terms stored as JSON for calculation flexibility

## Integration Process

### 1. Discovery Phase

**Trigger:** Daily automated process at 6:00 AM EST

**Discovery Logic:**
```sql
-- Check for new budget year data
SELECT DISTINCT budget_year 
FROM finance.budget_final 
WHERE budget_year > (
    SELECT MAX(budget_year) 
    FROM dataverse.budget_monthly
)
AND effective_date <= GETDATE()
ORDER BY budget_year;
```

**Success Criteria:**
- New budget year identified
- Data completeness validation passed
- All required sites present in dataset

**Error Conditions:**
- Incomplete budget data (missing sites/months)
- Data quality validation failures
- EDW connectivity issues

### 2. Extraction Phase

**Data Selection Query:**
```sql
SELECT 
    bf.site_id,
    bf.job_code,
    bf.budget_year,
    bf.budget_month,
    bf.monthly_amount,
    bf.contract_terms,
    bf.effective_date,
    s.site_name,
    s.region_code,
    s.site_type
FROM finance.budget_final bf
INNER JOIN master.sites s ON bf.site_id = s.site_id
WHERE bf.budget_year = @target_year
AND bf.effective_date <= GETDATE()
ORDER BY bf.site_id, bf.budget_month;
```

**Extraction Parameters:**
- **Batch Size:** 10,000 records per batch
- **Timeout:** 30 minutes per batch
- **Retry Logic:** 3 attempts with exponential backoff
- **Validation:** Row count and checksum verification

**Data Quality Checks:**
- All 12 months present for each site/job code
- Monthly amounts are positive values
- Contract terms are valid JSON format
- Site references exist in master data

### 3. Transformation Phase

**Transformation Rules:**

#### Data Type Conversions
```csharp
// Power Automate transformation logic
{
    "site_id": "@{items('Apply_to_each')?['site_id']}",
    "job_code": "@{items('Apply_to_each')?['job_code']}",
    "budget_month": "@{formatDateTime(
        concat(
            items('Apply_to_each')?['budget_year'], 
            '-', 
            items('Apply_to_each')?['budget_month'], 
            '-01'
        ), 
        'yyyy-MM-dd'
    )}",
    "monthly_amount": "@{float(items('Apply_to_each')?['monthly_amount'])}",
    "contract_terms": "@{json(items('Apply_to_each')?['contract_terms'])}"
}
```

#### Business Logic Transformations
- **Date Standardization:** Convert year/month to first day of month
- **Amount Validation:** Ensure positive values, round to 2 decimals
- **JSON Parsing:** Validate and parse contract terms JSON
- **Site Mapping:** Enrich with site hierarchy information

#### Data Enrichment
```sql
-- Add calculated fields
SELECT *,
    CASE 
        WHEN contract_terms LIKE '%hourly%' THEN 'HOURLY'
        WHEN contract_terms LIKE '%salary%' THEN 'SALARY'
        ELSE 'MIXED'
    END as contract_type,
    monthly_amount * 12 as annual_budget,
    GETDATE() as import_timestamp
FROM transformed_budget_data;
```

### 4. Loading Phase

**Target Entity:** dataverse.budget_monthly

**Loading Strategy:** Upsert (Insert or Update)

**Upsert Logic:**
```sql
MERGE dataverse.budget_monthly AS target
USING staging.budget_monthly AS source
ON target.site_id = source.site_id 
   AND target.job_code = source.job_code
   AND target.budget_month = source.budget_month
WHEN MATCHED THEN
    UPDATE SET 
        monthly_amount = source.monthly_amount,
        contract_terms = source.contract_terms,
        last_updated = GETDATE()
WHEN NOT MATCHED THEN
    INSERT (site_id, job_code, budget_month, monthly_amount, contract_terms, created_date)
    VALUES (source.site_id, source.job_code, source.budget_month, 
            source.monthly_amount, source.contract_terms, GETDATE());
```

**Loading Parameters:**
- **Batch Size:** 5,000 records per batch
- **Timeout:** 15 minutes per batch
- **Transaction Isolation:** Read Committed
- **Error Handling:** Rollback on any failure

### 5. Baseline Forecast Generation

**Trigger:** Successful completion of budget monthly loading

**Process:** Automated expansion to daily granularity

**Expansion Logic:**
```sql
WITH daily_calendar AS (
    SELECT 
        DATEADD(day, number, DATEFROMPARTS(@budget_year, 1, 1)) as calendar_date
    FROM master.numbers 
    WHERE number < 365 + CASE WHEN @budget_year % 4 = 0 THEN 1 ELSE 0 END
),
monthly_budget AS (
    SELECT 
        site_id,
        job_code,
        MONTH(budget_month) as month_num,
        monthly_amount,
        contract_terms,
        DAY(EOMONTH(budget_month)) as days_in_month
    FROM dataverse.budget_monthly
    WHERE YEAR(budget_month) = @budget_year
)
INSERT INTO dataverse.baseline_forecast (
    site_id, job_code, forecast_date, daily_amount, 
    contract_details, created_date, is_edited
)
SELECT 
    mb.site_id,
    mb.job_code,
    dc.calendar_date,
    mb.monthly_amount / mb.days_in_month as daily_amount,
    mb.contract_terms,
    GETDATE(),
    0 -- false
FROM daily_calendar dc
INNER JOIN monthly_budget mb ON MONTH(dc.calendar_date) = mb.month_num;
```

## Error Handling and Recovery

### Error Categories

#### 1. Connectivity Errors
**Symptoms:** Connection timeouts, authentication failures
**Recovery:** Automatic retry with exponential backoff
**Escalation:** Alert after 3 failed attempts
**Manual Intervention:** Check data gateway status, verify credentials

#### 2. Data Quality Errors
**Symptoms:** Missing data, invalid formats, constraint violations
**Recovery:** Skip invalid records, log for review
**Escalation:** Alert if error rate > 5%
**Manual Intervention:** Data correction in source system

#### 3. Capacity Errors
**Symptoms:** Storage limits, performance degradation
**Recovery:** Batch size reduction, process throttling
**Escalation:** Alert when storage > 80% capacity
**Manual Intervention:** Capacity planning, data archival

#### 4. Business Logic Errors
**Symptoms:** Calculation failures, validation rule violations
**Recovery:** Fallback to previous version, manual review
**Escalation:** Immediate alert for business impact
**Manual Intervention:** Business rule review and correction

### Recovery Procedures

#### Automatic Recovery
```yaml
retry_policy:
  max_attempts: 3
  backoff_strategy: exponential
  base_delay: 30_seconds
  max_delay: 300_seconds
  
circuit_breaker:
  failure_threshold: 5
  timeout: 60_seconds
  recovery_timeout: 300_seconds
```

#### Manual Recovery
1. **Data Validation:** Run data quality checks
2. **Rollback:** Restore to last known good state
3. **Correction:** Fix source data issues
4. **Reprocessing:** Re-run integration from last checkpoint
5. **Verification:** Validate results and downstream impacts

## Monitoring and Alerting

### Key Performance Indicators

#### Processing Metrics
- **Extraction Duration:** Target < 15 minutes
- **Transformation Duration:** Target < 10 minutes
- **Loading Duration:** Target < 20 minutes
- **Total Processing Time:** Target < 45 minutes

#### Data Quality Metrics
- **Completeness Rate:** Target > 99.5%
- **Accuracy Rate:** Target > 99.9%
- **Timeliness Rate:** Target > 95% within SLA
- **Error Rate:** Target < 1%

#### System Health Metrics
- **Data Gateway Availability:** Target > 99.5%
- **EDW Response Time:** Target < 5 seconds
- **Dataverse Write Performance:** Target < 2 seconds per batch

### Alert Configuration

#### Critical Alerts (Immediate Response)
- Integration process failure
- Data quality below 95%
- Processing time > 2 hours
- Data gateway unavailable

#### Warning Alerts (Next Business Day)
- Processing time > 1 hour
- Data quality 95-99%
- Error rate 1-5%
- Storage capacity > 80%

#### Information Alerts (Weekly Summary)
- Successful processing summary
- Performance trend analysis
- Capacity utilization report
- Data volume statistics

## Security and Compliance

### Data Security

#### Encryption
- **In Transit:** TLS 1.2 for all data transfers
- **At Rest:** AES-256 encryption in Dataverse
- **Key Management:** Azure Key Vault integration
- **Certificate Management:** Automated renewal and rotation

#### Access Control
- **Service Account:** Dedicated integration service account
- **Permissions:** Minimum required privileges
- **Authentication:** Azure AD with MFA
- **Authorization:** Role-based access control (RBAC)

#### Data Privacy
- **PII Handling:** No personal data in budget information
- **Data Retention:** 7 years per financial regulations
- **Data Masking:** Sensitive amounts masked in non-production
- **Audit Logging:** All access and changes logged

### Compliance Requirements

#### Financial Regulations
- **SOX Compliance:** Audit trail for all budget data changes
- **Data Integrity:** Checksums and validation for accuracy
- **Change Control:** Approval process for integration modifications
- **Documentation:** Complete technical and business documentation

#### Internal Policies
- **Data Governance:** Adherence to enterprise data standards
- **Change Management:** ITIL-compliant change processes
- **Risk Management:** Regular risk assessments and mitigation
- **Business Continuity:** Disaster recovery and backup procedures

## Performance Optimization

### Database Optimization

#### Indexing Strategy
```sql
-- Primary indexes for performance
CREATE CLUSTERED INDEX IX_BudgetMonthly_SiteDate 
ON dataverse.budget_monthly (site_id, budget_month);

CREATE NONCLUSTERED INDEX IX_BudgetMonthly_JobCode 
ON dataverse.budget_monthly (job_code) 
INCLUDE (monthly_amount, contract_terms);

-- Baseline forecast indexes
CREATE CLUSTERED INDEX IX_BaselineForecast_SiteDateJob 
ON dataverse.baseline_forecast (site_id, forecast_date, job_code);
```

#### Query Optimization
- **Parameterized Queries:** Prevent SQL injection, improve plan reuse
- **Batch Processing:** Optimize for throughput over latency
- **Connection Pooling:** Reuse database connections
- **Query Hints:** Force optimal execution plans

### Integration Optimization

#### Power Automate Optimization
```json
{
  "concurrency": {
    "runs": 1,
    "maximumWaitingRuns": 10
  },
  "runtimeConfiguration": {
    "contentTransfer": {
      "transferMode": "Chunked"
    },
    "lifetime": {
      "unit": "Hour",
      "count": 2
    }
  }
}
```

#### Data Gateway Optimization
- **Gateway Clustering:** Multiple gateways for high availability
- **Load Balancing:** Distribute queries across gateway instances
- **Resource Allocation:** Dedicated CPU and memory for gateway
- **Network Optimization:** Direct connection to EDW network

## Testing Strategy

### Unit Testing
- **Data Transformation Logic:** Validate transformation rules
- **Error Handling:** Test all error scenarios
- **Business Rules:** Verify calculation accuracy
- **Performance:** Load testing with production volumes

### Integration Testing
- **End-to-End Flow:** Complete pipeline testing
- **Data Quality:** Validate output against source
- **Error Recovery:** Test failure and recovery scenarios
- **Performance:** Stress testing under peak loads

### User Acceptance Testing
- **Business Validation:** Verify business requirements met
- **Data Accuracy:** Compare with existing Excel processes
- **Performance Acceptance:** Validate SLA compliance
- **Usability Testing:** Admin panel functionality

## Deployment Strategy

### Environment Progression
1. **Development:** Initial development and unit testing
2. **Test:** Integration testing and data validation
3. **UAT:** User acceptance testing with business users
4. **Production:** Phased rollout with monitoring

### Deployment Checklist
- [ ] Data gateway configuration verified
- [ ] Service account permissions configured
- [ ] Power Automate flows deployed and tested
- [ ] Monitoring and alerting configured
- [ ] Documentation updated and reviewed
- [ ] Rollback procedures tested and documented

### Go-Live Activities
1. **Pre-Go-Live:** Final data validation and system checks
2. **Go-Live:** Enable production integration
3. **Post-Go-Live:** Monitor for 48 hours, validate results
4. **Stabilization:** Address any issues, optimize performance

## Maintenance and Support

### Routine Maintenance
- **Weekly:** Review processing logs and performance metrics
- **Monthly:** Data quality assessment and trend analysis
- **Quarterly:** Capacity planning and performance optimization
- **Annually:** Security review and compliance audit

### Support Procedures
- **Level 1:** Monitoring alerts and basic troubleshooting
- **Level 2:** Data quality issues and performance problems
- **Level 3:** Complex technical issues and architecture changes
- **Escalation:** Business impact and critical system failures

### Change Management
- **Minor Changes:** Configuration updates, performance tuning
- **Major Changes:** Logic modifications, new data sources
- **Emergency Changes:** Critical fixes and security patches
- **Approval Process:** Technical and business stakeholder review

---

**Document Prepared By:** AI Documentation System  
**Technical Review:** Pending  
**Business Review:** Pending  
**Approval Status:** Draft  
**Next Review Date:** 2025-09-06