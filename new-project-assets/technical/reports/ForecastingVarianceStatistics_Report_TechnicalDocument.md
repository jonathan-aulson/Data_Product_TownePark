---
title: "Forecasting Variance Statistics Report - Technical Documentation"
description: "Comprehensive report documentation for forecasting variance statistics including occupancy, drive and capture ratios, vehicle counts, and external revenue analysis"
created_date: 2025-08-06
last_updated_date: 2025-08-06
version: 1.0
status: Active
owner: "Development Team"
source_documents:
  - "20250703_Sprint Tasking_ 28.docx"
  - "20250710_sprint_30_tasking.docx"
  - "20250710_sprint_29_tasking_addon.docx"
systems:
  - Forecasting
  - EDW
components:
  - Frontend
  - Backend
  - Reporting
business_domains:
  - Forecasting
  - Performance Analysis
  - Site Management
user_roles:
  - Account Manager
  - District Manager
  - Site Administrator
tags:
  - reporting
  - forecasting
  - variance-analysis
  - statistics
  - performance-metrics
---

# Forecasting Variance Statistics Report Technical Documentation

## Purpose of the Report

The Forecasting Variance Statistics Report provides Account Managers with comprehensive daily statistics for their assigned sites, enabling comparison between actual performance and forecasted values. This report supports data-driven decision making by highlighting variances in key operational metrics including occupancy rates, drive and capture ratios, vehicle counts by category, and external revenue performance.

### Report Audience
- **Primary Users**: Account Managers
- **Secondary Users**: District Managers, Site Administrators
- **Executive Users**: Regional Directors (summary views)

## Business Data Sources and Systems

### Primary Data Sources
- **EDW (Enterprise Data Warehouse)**: Daily operational statistics and historical data
- **Site Statistics API**: Real-time and near-real-time operational metrics
- **Forecasting System**: Projected values for comparison analysis
- **External Revenue System**: Daily revenue actuals and forecasts

### Data Integration Points
- **Daily Statistics Extraction**: Automated pull from EDW at 6:00 AM daily
- **Forecast Data Sync**: Integration with forecasting calculation engine
- **Real-time Updates**: Hourly refresh of current-day statistics during business hours
- **Historical Data**: 13-month rolling window for trend analysis

## Report Output Format and Structure

### Visual Layout (ASCII Representation)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FORECASTING VARIANCE STATISTICS REPORT                  │
│                                                                             │
│ Site: [Site Name] ([Site Code])          Period: [Date Range]              │
│ Account Manager: [Manager Name]          Generated: [Timestamp]            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ OCCUPANCY STATISTICS                                                        │
│ ┌─────────────┬──────────┬──────────┬──────────┬─────────────────────────┐ │
│ │    Date     │ Forecast │  Actual  │ Variance │      Indicator          │ │
│ ├─────────────┼──────────┼──────────┼──────────┼─────────────────────────┤ │
│ │ 2025-07-01  │   85.2%  │   87.1%  │   +1.9%  │ ↗ Above Forecast       │ │
│ │ 2025-07-02  │   84.8%  │   82.3%  │   -2.5%  │ ↘ Below Forecast       │ │
│ │ 2025-07-03  │   86.1%  │   86.1%  │    0.0%  │ ≡ On Target            │ │
│ └─────────────┴──────────┴──────────┴──────────┴─────────────────────────┘ │
│                                                                             │
│ DRIVE AND CAPTURE RATIOS                                                    │
│ ┌─────────────┬──────────┬──────────┬──────────┬─────────────────────────┐ │
│ │    Date     │ Forecast │  Actual  │ Variance │      Indicator          │ │
│ ├─────────────┼──────────┼──────────┼──────────┼─────────────────────────┤ │
│ │ 2025-07-01  │   92.5%  │   94.2%  │   +1.7%  │ ↗ Above Forecast       │ │
│ │ 2025-07-02  │   91.8%  │   89.6%  │   -2.2%  │ ↘ Below Forecast       │ │
│ └─────────────┴──────────┴──────────┴──────────┴─────────────────────────┘ │
│                                                                             │
│ VEHICLE COUNTS BY CATEGORY                                                  │
│ ┌─────────────┬──────────┬──────────┬──────────┬─────────────────────────┐ │
│ │  Category   │ Forecast │  Actual  │ Variance │      Indicator          │ │
│ ├─────────────┼──────────┼──────────┼──────────┼─────────────────────────┤ │
│ │ Compact     │    145   │    152   │     +7   │ ↗ Above Forecast       │ │
│ │ Mid-size    │    230   │    225   │     -5   │ ↘ Below Forecast       │ │
│ │ Full-size   │    180   │    180   │      0   │ ≡ On Target            │ │
│ │ Premium     │     45   │     48   │     +3   │ ↗ Above Forecast       │ │
│ └─────────────┴──────────┴──────────┴──────────┴─────────────────────────┘ │
│                                                                             │
│ EXTERNAL REVENUE ANALYSIS                                                   │
│ ┌─────────────┬──────────┬──────────┬──────────┬─────────────────────────┐ │
│ │    Date     │ Forecast │  Actual  │ Variance │      Indicator          │ │
│ ├─────────────┼──────────┼──────────┼──────────┼─────────────────────────┤ │
│ │ 2025-07-01  │ $12,450  │ $13,120  │   +$670  │ ↗ Above Forecast       │ │
│ │ 2025-07-02  │ $11,890  │ $11,340  │   -$550  │ ↘ Below Forecast       │ │
│ └─────────────┴──────────┴──────────┴──────────┴─────────────────────────┘ │
│                                                                             │
│ SUMMARY INDICATORS                                                          │
│ • Overall Performance: Above Forecast (+2.3% avg variance)                 │
│ • Key Strengths: Premium vehicle utilization, Weekend occupancy            │
│ • Areas for Attention: Mid-size vehicle availability, Tuesday revenue      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Visualization Elements

**Color Coding System**:
- **Green Text/Indicators**: Actual values above forecast (positive variance)
- **Red Text/Indicators**: Actual values below forecast (negative variance)  
- **Blue Text/Indicators**: Actual values matching forecast (zero variance)
- **Orange Text/Indicators**: Actual values (when displaying actuals vs budget)

**Variance Indicators**:
- ↗ (Up Arrow): Positive variance (actual > forecast)
- ↘ (Down Arrow): Negative variance (actual < forecast)
- ≡ (Equal Sign): Zero variance (actual = forecast)
- ⚠ (Warning): Variance exceeds threshold limits

## Hard-coded and User-driven Filters

### Hard-coded Filters

**Data Quality Filters**:
- Exclude records with null or negative occupancy rates
- Filter out vehicle counts below minimum threshold (5 vehicles)
- Remove revenue records with zero or negative values
- Exclude dates more than 13 months old

**Business Rule Filters**:
- Only include sites assigned to requesting Account Manager
- Filter to active sites only (status = 'Active')
- Exclude test or training sites (site_type != 'Test')

### User-driven Filters

**Date Range Selection**:
- **Default**: Last 30 days
- **Options**: Last 7 days, Last 30 days, Last 90 days, Custom date range
- **Maximum Range**: 13 months (rolling historical limit)

**Site Selection**:
- **Default**: All sites assigned to user
- **Options**: Individual site selection, Site group selection, Regional filtering
- **Multi-select**: Support for comparing multiple sites

**Metric Focus**:
- **Default**: All metrics displayed
- **Options**: Occupancy only, Revenue only, Vehicle counts only, Custom metric combination

**Variance Threshold**:
- **Default**: Show all variances
- **Options**: Variances > 5%, Variances > 10%, Significant variances only (>15%)

## Logic and Definitions (Field-by-Field Basis)

### Occupancy Statistics

**Occupancy Rate Calculation**:
```sql
occupancy_rate = (occupied_spaces / total_available_spaces) * 100
```

**Field Definitions**:
- **Forecast**: Projected occupancy rate from forecasting system
- **Actual**: Calculated occupancy rate from daily operations data
- **Variance**: (Actual - Forecast) expressed as percentage points
- **Indicator**: Visual representation of variance direction and magnitude

**Data Sources**:
- `edw.daily_site_statistics.occupied_spaces`
- `edw.daily_site_statistics.total_available_spaces`
- `forecasting.site_projections.occupancy_forecast`

### Drive and Capture Ratios

**Drive Ratio Calculation**:
```sql
drive_ratio = (vehicles_entering_facility / total_traffic_count) * 100
```

**Capture Ratio Calculation**:
```sql
capture_ratio = (vehicles_parked / vehicles_entering_facility) * 100
```

**Field Definitions**:
- **Drive Ratio**: Percentage of passing traffic that enters the facility
- **Capture Ratio**: Percentage of entering vehicles that complete parking
- **Combined Metric**: Drive ratio × Capture ratio for overall effectiveness

**Data Sources**:
- `edw.traffic_statistics.vehicles_entering`
- `edw.traffic_statistics.total_traffic_count`
- `edw.parking_statistics.vehicles_parked`

### Vehicle Counts by Category

**Category Definitions**:
- **Compact**: Vehicles ≤ 15 feet in length
- **Mid-size**: Vehicles 15-18 feet in length
- **Full-size**: Vehicles 18-22 feet in length
- **Premium**: Luxury vehicles and vehicles > 22 feet

**Count Calculation**:
```sql
category_count = COUNT(DISTINCT vehicle_id) 
WHERE vehicle_category = [category]
AND parking_date = [report_date]
```

**Field Definitions**:
- **Forecast**: Projected vehicle count by category
- **Actual**: Actual vehicle count from parking transactions
- **Variance**: Absolute difference (Actual - Forecast)
- **Percentage Variance**: (Variance / Forecast) * 100

### External Revenue Analysis

**Revenue Calculation**:
```sql
daily_external_revenue = SUM(parking_fees + additional_services + premium_charges)
WHERE transaction_date = [report_date]
AND revenue_type = 'external'
```

**Field Definitions**:
- **Forecast**: Projected daily external revenue
- **Actual**: Actual daily external revenue from transactions
- **Variance**: Dollar difference (Actual - Forecast)
- **Percentage Variance**: (Variance / Forecast) * 100

**Revenue Components**:
- **Parking Fees**: Standard hourly and daily parking charges
- **Additional Services**: Valet, car wash, maintenance services
- **Premium Charges**: Reserved spaces, covered parking, special events

## User Security and Access Control

### Role-based Access

**Account Manager Access**:
- **Sites**: Only sites assigned to their account management responsibility
- **Data Scope**: Full access to all metrics for assigned sites
- **Time Range**: Up to 13 months of historical data
- **Export**: Excel and PDF export capabilities

**District Manager Access**:
- **Sites**: All sites within assigned district
- **Data Scope**: Summary and detailed views for all metrics
- **Time Range**: Full historical access (no time restrictions)
- **Export**: All formats including raw data export

**Site Administrator Access**:
- **Sites**: Single site access only
- **Data Scope**: Operational metrics only (no financial details)
- **Time Range**: Last 90 days maximum
- **Export**: Limited to summary reports only

### Data Security Controls

**Authentication Requirements**:
- Active Directory integration for user authentication
- Multi-factor authentication for external access
- Session timeout after 30 minutes of inactivity

**Authorization Validation**:
```sql
-- User site access validation
SELECT s.site_id, s.site_name
FROM sites s
INNER JOIN user_site_assignments usa ON s.site_id = usa.site_id
WHERE usa.user_id = @current_user_id
AND usa.access_level IN ('Account_Manager', 'District_Manager')
AND s.status = 'Active'
```

## Data Refresh Schedules

### Automated Refresh Schedule

**Daily Refresh (6:00 AM EST)**:
- Extract previous day's operational statistics from EDW
- Update forecast vs actual variance calculations
- Refresh summary statistics and trend indicators
- Generate automated alerts for significant variances

**Hourly Refresh (Business Hours: 8 AM - 6 PM EST)**:
- Update current day statistics for real-time monitoring
- Refresh occupancy rates and vehicle counts
- Update revenue totals for current day

**Weekly Refresh (Sunday 2:00 AM EST)**:
- Recalculate historical trend indicators
- Update forecast accuracy metrics
- Refresh user access permissions and site assignments

### Manual Refresh Options

**On-Demand Refresh**:
- Available to Account Managers and above
- Maximum 3 manual refreshes per hour per user
- Full data refresh including current day actuals

**Emergency Refresh**:
- Available to System Administrators only
- Used for data correction or system recovery scenarios
- Bypasses normal refresh limitations

## Report Dissemination

### Automated Distribution

**Daily Email Reports**:
- **Recipients**: Account Managers for their assigned sites
- **Schedule**: 7:00 AM EST daily
- **Format**: PDF summary with Excel detail attachment
- **Content**: Previous day statistics with variance highlights

**Weekly Summary Reports**:
- **Recipients**: District Managers and Regional Directors
- **Schedule**: Monday 8:00 AM EST
- **Format**: Executive dashboard PDF
- **Content**: Week-over-week trends and performance summaries

### Manual Access Methods

**Web Portal Access**:
- Real-time report generation through forecasting portal
- Interactive filtering and drill-down capabilities
- Export options: Excel, PDF, CSV formats

**API Access**:
- RESTful API endpoints for programmatic access
- JSON format responses with full metric details
- Rate limiting: 100 requests per hour per user

**Mobile Application**:
- Responsive design for tablet and smartphone access
- Key metrics dashboard with variance alerts
- Offline capability for recently viewed reports

## Report Format Options

### Excel Export Format

**Worksheet Structure**:
- **Summary**: High-level variance indicators and trends
- **Occupancy**: Detailed daily occupancy statistics
- **Drive_Capture**: Drive and capture ratio analysis
- **Vehicle_Counts**: Vehicle category breakdown
- **Revenue**: External revenue analysis
- **Raw_Data**: Underlying data for custom analysis

**Excel Features**:
- Conditional formatting for variance indicators
- Pivot table templates for custom analysis
- Chart templates for trend visualization
- Data validation for filter parameters

### PDF Report Format

**Page Layout**:
- **Page 1**: Executive summary with key variance indicators
- **Page 2-3**: Detailed metric tables with visual indicators
- **Page 4**: Trend charts and historical comparison
- **Page 5**: Appendix with data sources and calculation methods

**PDF Features**:
- Professional formatting with company branding
- Interactive table of contents with bookmarks
- Embedded charts and graphs
- Print-optimized layout for physical distribution

### API Response Format

**JSON Structure**:
```json
{
  "report_metadata": {
    "generated_date": "2025-08-06T16:59:33Z",
    "user_id": "account_manager_123",
    "site_ids": ["site_001", "site_002"],
    "date_range": {
      "start_date": "2025-07-01",
      "end_date": "2025-07-31"
    }
  },
  "occupancy_statistics": [
    {
      "date": "2025-07-01",
      "site_id": "site_001",
      "forecast_rate": 85.2,
      "actual_rate": 87.1,
      "variance_percentage": 1.9,
      "variance_indicator": "above_forecast"
    }
  ],
  "summary_indicators": {
    "overall_performance": "above_forecast",
    "average_variance": 2.3,
    "key_strengths": ["premium_utilization", "weekend_occupancy"],
    "attention_areas": ["midsize_availability", "tuesday_revenue"]
  }
}
```

## Business Stakeholder Approval

### Report Content Approval

**Primary Approver**: Director of Operations
- **Responsibility**: Metric definitions and calculation methods
- **Review Cycle**: Quarterly review of business rules
- **Change Authority**: Approve modifications to variance thresholds

**Secondary Approver**: Finance Director  
- **Responsibility**: Revenue calculation accuracy and financial metrics
- **Review Cycle**: Monthly validation of revenue calculations
- **Change Authority**: Approve changes to revenue categorization

### Access and Distribution Approval

**IT Security Manager**:
- **Responsibility**: User access controls and data security
- **Review Cycle**: Annual access review and permission validation
- **Change Authority**: Approve new user roles and access levels

**Regional Operations Manager**:
- **Responsibility**: Site assignment accuracy and operational relevance
- **Review Cycle**: Bi-annual review of site assignments
- **Change Authority**: Approve changes to site groupings and territories

---

*This report documentation ensures accurate and consistent delivery of forecasting variance statistics, supporting data-driven decision making across all levels of site management and operations.*