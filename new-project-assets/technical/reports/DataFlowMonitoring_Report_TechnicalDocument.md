---
title: "Data Flow Monitoring Dashboard - Report Technical Document"
version: "1.0"
last_updated_date: "2025-08-06"
document_type: "report"
system_component: "Admin Panel"
report_type: "Operational Dashboard"
related_documents:
  - "20250709_12MonthForecast_ArchitecturePlanning_MeetingTranscript.md"
  - "12MonthForecast_DataArchitecture_DataModel_TechnicalDocument.md"
  - "EDWBudgetData_Integration_TechnicalDocument.md"
tags: ["report", "monitoring", "data-flows", "admin-panel", "operations"]
---

# Data Flow Monitoring Dashboard - Report Technical Document

## Document Overview

**Purpose:** Define the comprehensive monitoring dashboard for tracking data flow operations, providing real-time visibility into budget data retrieval, forecast calculations, and system health metrics.

**Scope:** Complete operational monitoring for all data flows in the 12-month forecast system.

**Last Updated:** August 6, 2025

## Executive Summary

The Data Flow Monitoring Dashboard provides centralized visibility into all automated data processes supporting the 12-month forecast system. This operational dashboard enables proactive monitoring, rapid issue identification, and comprehensive audit trails for all data flow operations.

## Dashboard Architecture

### User Interface Location
**Path:** Admin Panel → Data Flow Management  
**Access Level:** System Administrators, Data Operations Team  
**Refresh Rate:** Real-time updates every 30 seconds  

### Dashboard Components
1. **Data Flow Status Overview**
2. **Budget Retrieval Monitoring**
3. **Calculation Processing Metrics**
4. **Error Tracking and Alerts**
5. **Performance Analytics**
6. **Historical Trends**

## Report Specifications

### 1. Data Flow Status Overview

**Purpose:** High-level status of all active data flows

**Visual Design:** Card-based layout with status indicators

**Data Elements:**
```json
{
  "dataflow_name": "Budget Retrieval",
  "status": "Running|Completed|Failed|Scheduled",
  "last_run_timestamp": "2025-08-06T10:30:00Z",
  "next_scheduled_run": "2025-08-07T06:00:00Z",
  "success_rate_24h": "98.5%",
  "avg_duration_minutes": 42,
  "status_indicator": "Green|Yellow|Red"
}
```

**Status Indicators:**
- **Green:** Successful completion within SLA
- **Yellow:** Completed with warnings or minor delays
- **Red:** Failed execution or critical errors

**Refresh Frequency:** Every 30 seconds

### 2. Budget Retrieval Monitoring

**Purpose:** Detailed monitoring of EDW budget data integration

**Visual Design:** Tabular view with expandable details

**Primary Metrics:**
- **Discovery Status:** New budget year detection
- **Extraction Progress:** Records processed vs. total
- **Data Quality Score:** Validation success percentage
- **Processing Duration:** Current vs. target SLA

**Data Schema:**
```json
{
  "process_id": "string",
  "budget_year": "integer",
  "discovery_timestamp": "datetime",
  "extraction_start": "datetime",
  "extraction_end": "datetime",
  "records_extracted": "integer",
  "records_transformed": "integer",
  "records_loaded": "integer",
  "data_quality_score": "decimal",
  "error_count": "integer",
  "status": "string"
}
```

**Key Performance Indicators:**
- **Extraction SLA:** < 15 minutes
- **Data Quality Target:** > 99.5%
- **Error Rate Target:** < 1%
- **Completeness Target:** 100% of expected records

### 3. Calculation Processing Metrics

**Purpose:** Monitor forecast calculation performance and accuracy

**Visual Design:** Real-time metrics with drill-down capabilities

**Calculation Types Monitored:**
- Internal Revenue calculations
- External Revenue calculations
- FLC (Forecast Labor Cost) calculations
- Insurance and parking calculations
- Total PNL calculations

**Metrics Tracked:**
```json
{
  "calculation_type": "Internal Revenue",
  "sites_processed": "integer",
  "calculation_duration": "decimal (minutes)",
  "success_rate": "decimal (percentage)",
  "error_count": "integer",
  "avg_processing_time_per_site": "decimal (seconds)",
  "queue_depth": "integer",
  "concurrent_processes": "integer"
}
```

**Performance Targets:**
- **Processing Time:** < 1 minute for all sites
- **Success Rate:** > 99.9%
- **Queue Depth:** < 100 pending calculations
- **Concurrency:** Up to 10 parallel processes

### 4. Error Tracking and Alerts

**Purpose:** Comprehensive error monitoring and alert management

**Visual Design:** Alert feed with severity levels and resolution tracking

**Error Categories:**
- **Connectivity Errors:** Data gateway, EDW connection issues
- **Data Quality Errors:** Validation failures, missing data
- **Calculation Errors:** Business logic failures, constraint violations
- **Performance Errors:** Timeout, resource exhaustion

**Alert Schema:**
```json
{
  "alert_id": "string",
  "severity": "Critical|High|Medium|Low",
  "category": "string",
  "message": "string",
  "timestamp": "datetime",
  "affected_component": "string",
  "error_details": "json",
  "resolution_status": "Open|In Progress|Resolved",
  "assigned_to": "string",
  "resolution_time": "datetime"
}
```

**Alert Escalation Rules:**
- **Critical:** Immediate notification, 15-minute response SLA
- **High:** 1-hour notification, 4-hour response SLA
- **Medium:** Daily digest, next business day response
- **Low:** Weekly summary, best effort response

### 5. Performance Analytics

**Purpose:** Historical performance analysis and trend identification

**Visual Design:** Charts and graphs with configurable time ranges

**Performance Metrics:**
- **Throughput:** Records processed per hour
- **Latency:** End-to-end processing time
- **Resource Utilization:** CPU, memory, storage usage
- **Availability:** System uptime percentage

**Analytics Views:**
```json
{
  "metric_name": "string",
  "time_period": "1h|4h|24h|7d|30d",
  "data_points": [
    {
      "timestamp": "datetime",
      "value": "decimal",
      "unit": "string"
    }
  ],
  "trend_direction": "Improving|Stable|Degrading",
  "variance_percentage": "decimal"
}
```

**Trend Analysis:**
- **Performance Trends:** Week-over-week comparison
- **Capacity Planning:** Growth rate projections
- **Seasonal Patterns:** Monthly and quarterly patterns
- **Anomaly Detection:** Statistical outlier identification

### 6. Historical Trends

**Purpose:** Long-term operational insights and capacity planning

**Visual Design:** Interactive charts with drill-down capabilities

**Historical Data Retention:**
- **Real-time Data:** 24 hours
- **Hourly Aggregates:** 30 days
- **Daily Aggregates:** 1 year
- **Monthly Aggregates:** 7 years

**Trend Metrics:**
- **Data Volume Growth:** Monthly data volume increases
- **Processing Time Trends:** Performance degradation patterns
- **Error Rate Patterns:** Recurring issue identification
- **Capacity Utilization:** Resource consumption trends

## Data Sources

### Primary Data Sources

#### 1. Power Automate Flow History
**Connection:** Power Platform Connector  
**Refresh Rate:** Real-time  
**Data Elements:** Flow runs, duration, status, error messages

```sql
SELECT 
    flow_name,
    run_id,
    start_time,
    end_time,
    status,
    error_message,
    trigger_type
FROM power_automate.flow_history
WHERE start_time >= DATEADD(day, -7, GETDATE())
ORDER BY start_time DESC;
```

#### 2. Dataverse Audit Logs
**Connection:** Dataverse API  
**Refresh Rate:** Every 5 minutes  
**Data Elements:** Entity changes, user actions, system operations

```sql
SELECT 
    audit_id,
    entity_name,
    operation_type,
    user_id,
    timestamp,
    old_values,
    new_values
FROM dataverse.audit_log
WHERE entity_name IN ('budget_monthly', 'baseline_forecast', 'forecast_calculated')
AND timestamp >= DATEADD(hour, -24, GETDATE());
```

#### 3. Azure Functions Telemetry
**Connection:** Application Insights  
**Refresh Rate:** Real-time  
**Data Elements:** Function executions, performance metrics, exceptions

```kusto
requests
| where timestamp >= ago(24h)
| where name startswith "ForecastCalculation"
| summarize 
    count(),
    avg(duration),
    percentile(duration, 95),
    countif(success == false)
by bin(timestamp, 1h), name
| order by timestamp desc;
```

#### 4. Data Gateway Metrics
**Connection:** Power BI Gateway API  
**Refresh Rate:** Every 15 minutes  
**Data Elements:** Gateway status, query performance, connection health

### Calculated Metrics

#### Data Quality Score
```sql
-- Calculate data quality percentage
SELECT 
    (CAST(valid_records AS FLOAT) / total_records) * 100 as data_quality_score
FROM (
    SELECT 
        COUNT(*) as total_records,
        COUNT(CASE WHEN validation_status = 'Valid' THEN 1 END) as valid_records
    FROM data_validation_results
    WHERE validation_date >= DATEADD(day, -1, GETDATE())
) quality_calc;
```

#### Processing Efficiency
```sql
-- Calculate processing efficiency metrics
SELECT 
    dataflow_name,
    AVG(DATEDIFF(minute, start_time, end_time)) as avg_duration_minutes,
    COUNT(CASE WHEN status = 'Success' THEN 1 END) * 100.0 / COUNT(*) as success_rate,
    MAX(DATEDIFF(minute, start_time, end_time)) as max_duration_minutes
FROM dataflow_execution_log
WHERE execution_date >= DATEADD(day, -7, GETDATE())
GROUP BY dataflow_name;
```

## User Interface Design

### Dashboard Layout

#### Header Section
- **System Status:** Overall health indicator
- **Active Alerts:** Count of unresolved alerts by severity
- **Last Refresh:** Timestamp of last data update
- **Auto-Refresh Toggle:** Enable/disable automatic updates

#### Main Content Area
```html
<div class="dashboard-container">
  <div class="status-cards-row">
    <div class="status-card" data-status="success">
      <h3>Budget Retrieval</h3>
      <div class="status-indicator green"></div>
      <p>Last Run: 06:00 AM</p>
      <p>Duration: 42 min</p>
    </div>
    <!-- Additional status cards -->
  </div>
  
  <div class="metrics-grid">
    <div class="metric-panel">
      <h4>Processing Performance</h4>
      <canvas id="performance-chart"></canvas>
    </div>
    <div class="metric-panel">
      <h4>Error Tracking</h4>
      <div id="error-log"></div>
    </div>
  </div>
</div>
```

#### Interactive Features
- **Drill-down Capability:** Click metrics for detailed views
- **Time Range Selection:** 1h, 4h, 24h, 7d, 30d options
- **Export Functionality:** CSV, PDF report generation
- **Alert Management:** Acknowledge, assign, resolve alerts

### Responsive Design
- **Desktop:** Full dashboard with all panels visible
- **Tablet:** Collapsible panels with priority ordering
- **Mobile:** Single-column layout with swipe navigation

## Alert Configuration

### Alert Rules

#### Critical Alerts
```json
{
  "rule_name": "Budget Retrieval Failure",
  "condition": "status = 'Failed' AND component = 'Budget Retrieval'",
  "severity": "Critical",
  "notification_channels": ["email", "teams", "sms"],
  "escalation_time": "15 minutes"
}
```

#### Performance Alerts
```json
{
  "rule_name": "Processing Time Exceeded",
  "condition": "duration_minutes > 60 AND component = 'Calculation Processing'",
  "severity": "High",
  "notification_channels": ["email", "teams"],
  "escalation_time": "1 hour"
}
```

#### Data Quality Alerts
```json
{
  "rule_name": "Data Quality Degradation",
  "condition": "data_quality_score < 95",
  "severity": "Medium",
  "notification_channels": ["email"],
  "escalation_time": "4 hours"
}
```

### Notification Templates

#### Email Template
```html
<h2>Data Flow Alert: {{alert_severity}}</h2>
<p><strong>Component:</strong> {{component_name}}</p>
<p><strong>Issue:</strong> {{alert_message}}</p>
<p><strong>Time:</strong> {{timestamp}}</p>
<p><strong>Impact:</strong> {{business_impact}}</p>
<a href="{{dashboard_url}}">View Dashboard</a>
```

#### Teams Integration
```json
{
  "@type": "MessageCard",
  "summary": "Data Flow Alert",
  "themeColor": "{{severity_color}}",
  "sections": [{
    "activityTitle": "{{alert_title}}",
    "activitySubtitle": "{{component_name}}",
    "facts": [{
      "name": "Severity",
      "value": "{{severity}}"
    }, {
      "name": "Time",
      "value": "{{timestamp}}"
    }]
  }],
  "potentialAction": [{
    "@type": "OpenUri",
    "name": "View Dashboard",
    "targets": [{"os": "default", "uri": "{{dashboard_url}}"}]
  }]
}
```

## Security and Access Control

### Role-Based Access

#### System Administrator
- **Full Access:** All dashboard features and data
- **Permissions:** View, acknowledge, resolve alerts
- **Data Scope:** All systems and components

#### Data Operations Team
- **Limited Access:** Operational metrics and alerts
- **Permissions:** View, acknowledge alerts (no resolution)
- **Data Scope:** Data flow operations only

#### Business Users
- **Read-Only Access:** High-level status and trends
- **Permissions:** View only
- **Data Scope:** Summary metrics only

### Data Security
- **Authentication:** Azure AD integration
- **Authorization:** Role-based permissions
- **Audit Logging:** All access and actions logged
- **Data Encryption:** TLS 1.2 for all communications

## Performance Optimization

### Caching Strategy
- **Real-time Data:** No caching (direct API calls)
- **Historical Data:** 5-minute cache for aggregated metrics
- **Static Data:** 1-hour cache for configuration data
- **Chart Data:** Client-side caching for 2 minutes

### Query Optimization
```sql
-- Optimized query for dashboard metrics
WITH recent_runs AS (
    SELECT TOP 100 *
    FROM dataflow_execution_log
    WHERE execution_date >= DATEADD(hour, -24, GETDATE())
    ORDER BY execution_date DESC
)
SELECT 
    dataflow_name,
    COUNT(*) as total_runs,
    AVG(duration_minutes) as avg_duration,
    MAX(CASE WHEN status = 'Success' THEN 1 ELSE 0 END) as latest_success
FROM recent_runs
GROUP BY dataflow_name;
```

### Load Balancing
- **API Calls:** Distributed across multiple endpoints
- **Database Queries:** Read replicas for reporting queries
- **Client Connections:** CDN for static assets
- **Real-time Updates:** WebSocket connection pooling

## Testing and Validation

### Functional Testing
- **Dashboard Loading:** Verify all components load correctly
- **Data Accuracy:** Validate metrics against source systems
- **Alert Functionality:** Test alert generation and notifications
- **User Interactions:** Verify drill-down and filtering features

### Performance Testing
- **Load Testing:** 50 concurrent users for 1 hour
- **Stress Testing:** Peak load simulation (100+ users)
- **Endurance Testing:** 24-hour continuous operation
- **Scalability Testing:** Gradual load increase validation

### User Acceptance Testing
- **Usability Testing:** Navigation and feature discovery
- **Business Validation:** Metrics relevance and accuracy
- **Accessibility Testing:** WCAG 2.1 compliance verification
- **Cross-browser Testing:** Chrome, Firefox, Edge, Safari

## Deployment and Maintenance

### Deployment Strategy
1. **Development Environment:** Initial development and testing
2. **Test Environment:** Integration testing with sample data
3. **UAT Environment:** User acceptance testing with business users
4. **Production Environment:** Phased rollout with monitoring

### Maintenance Schedule
- **Daily:** Monitor alert queues and system health
- **Weekly:** Review performance trends and capacity metrics
- **Monthly:** Update alert thresholds and notification rules
- **Quarterly:** Comprehensive system review and optimization

### Support Procedures
- **Level 1 Support:** Dashboard access issues, basic troubleshooting
- **Level 2 Support:** Data accuracy issues, alert configuration
- **Level 3 Support:** Performance optimization, system architecture
- **Escalation:** Business impact assessment and emergency response

---

**Document Prepared By:** AI Documentation System  
**Technical Review:** Pending  
**Business Review:** Pending  
**Approval Status:** Draft  
**Next Review Date:** 2025-09-06