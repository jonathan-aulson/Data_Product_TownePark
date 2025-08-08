# Report Document

**Labor Productivity Dashboard**

**Author:** Michael Foy  
**Date:** July 28, 2025  
**Version:** 3.2

* * *

## Purpose of the Report

The Labor Productivity Dashboard provides operational leadership with real-time insights into labor efficiency and productivity metrics across all Towne Park locations. It helps account managers, district managers, and operations executives monitor staffing effectiveness, identify optimization opportunities, and align labor deployment with business volume to maximize profitability.

## Business Data Sources

| Data Source | System | Description |
|-------------|--------|-------------|
| Labor Hours | Legion via EDW (vwPAYROLL_SUMMARY) | Actual hours worked by job code, site, and date |
| Scheduled Hours | Legion via EDW (Schedule_Entity) | Scheduled hours by job code, site, and date |
| Vehicle Volumes | EDW (vwREVENUE_DAILY_DETAIL_INVOICE) | Vehicle counts by type and site |
| Payroll Costs | EDW (vwPAYROLL_SUMMARY) | Labor costs including regular, overtime, and premium pay |
| Revenue Data | EDW (Revenue_DataMart_Daily) | Revenue by site and date for labor-to-revenue calculations |
| Forecasted Data | Forecasting System (Dataverse) | Forecasted hours, vehicles, and revenue |
| Job Family Mapping | EDW (Job_Mapping) | Mapping of job codes to job families |

## Visual Representation of Report Output

```
+------------------------------------------------------+
|                LABOR PRODUCTIVITY DASHBOARD          |
|               Hilton Chicago (Site 0118)             |
|                   Period: July 2025                  |
+------------------------------------------------------+

+-------------------+  +-------------------+  +------------------+
| PRODUCTIVITY KPIs |  | LABOR UTILIZATION |  | JOB DISTRIBUTION |
|                   |  |                   |  |                  |
| Vehicles/Hour:    |  | Scheduled: 4,850  |  | Valet: 68%       |
| 2.83 (↑0.15)      |  | Actual: 4,755     |  | Cashier: 12%     |
|                   |  | Variance: -2.0%   |  | Supervisor: 8%   |
| Labor to Revenue: |  |                   |  | Manager: 5%      |
| 37.2% (↓1.8%)     |  | Overtime: 285 hrs |  | Shuttle: 4%      |
|                   |  | OT%: 6.0% (↓0.5%) |  | Other: 3%        |
| Valet Prod:       |  |                   |  |                  |
| 3.42 veh/hr (↑0.2)|  | Fill Rate: 98.2%  |  | [Pie chart of    |
|                   |  |                   |  |  distribution]    |
+-------------------+  +-------------------+  +------------------+

+------------------------------------------------------+
|              DAILY PRODUCTIVITY TREND                |
|                                                      |
| [Line chart showing daily vehicles/hour and          |
|  labor-to-revenue % trends for the month]            |
|                                                      |
+------------------------------------------------------+

+------------------+  +-------------------+  +------------------+
| HOURLY ANALYSIS  |  | EFFICIENCY BY     |  | PREDICTIVE       |
|                  |  | JOB FAMILY        |  | INSIGHTS         |
| [Heat map showing|  |                   |  |                  |
|  productivity by |  | Valet: 3.42 veh/hr|  | Recommended      |
|  hour of day]    |  | Cashier: 42.3 veh/|  | Staffing:        |
|                  |  | Supervisor: 18.1  |  | July 22: -2 GSAs |
| Peak periods:    |  | Manager: 12.5     |  | July 24: +1 GSC  |
| 7-9am: 3.1 veh/hr|  | Shuttle: 9.3      |  | July 28: +3 GSAs |
| 4-6pm: 3.8 veh/hr|  |                   |  | (Conf. Group)    |
+------------------+  +-------------------+  +------------------+
```

## Filters

### Hard-coded Filters
- Current month plus previous two months for trend analysis
- Active job codes only
- Excludes administrative hours (job codes AC1, AC2, AC3)
- Standard operating hours (site-specific)

### User-driven Filters
- Date range (Daily, Weekly, Monthly, Custom)
- Site selection (single or multiple)
- Job family/code selection
- Time of day (hourly breakdown)
- Day type (Weekday, Weekend, Holiday)
- View level (Site, District, Region, Enterprise)

## Field-by-Field Logic and Definitions

| Field | Definition | Logic/Calculation |
|-------|------------|-------------------|
| Vehicles/Hour | Overall productivity metric | Total Vehicle Count / Total Labor Hours |
| Labor to Revenue | Labor cost efficiency | Total Payroll Cost / Total Revenue * 100 |
| Valet Productivity | Valet-specific efficiency | Valet Vehicle Count / Valet Hours |
| Cashier Productivity | Cashier throughput | Total Vehicle Count / Cashier Hours |
| Fill Rate | Schedule fulfillment | Actual Hours / Scheduled Hours * 100 |
| Overtime % | Overtime utilization | Overtime Hours / Total Hours * 100 |
| Peak Efficiency | Productivity during peak periods | Vehicle Count during peak / Hours during peak |
| Optimal Staffing | ML-based staffing recommendation | Algorithm using historical patterns, forecasted volume, and productivity targets |

## User Security

| Role | Access Level | Description |
|------|-------------|-------------|
| Account Manager | Site-level | View productivity for assigned sites only |
| District Manager | District-level | View productivity for all sites in district |
| Operations Director | Region-level | View productivity for all sites in region |
| Legion Admin | Enterprise-level | Full access to all productivity metrics and scheduling data |
| Workforce Planning | Enterprise-level | Full access to productivity metrics and staffing recommendations |
| Executive | Enterprise-level | Summary-level access to all productivity metrics |

Security is implemented through row-level security in Power BI with user-to-site mappings from Workday.

## Data Refresh Schedules

- Labor hours and cost data: Hourly updates from Legion (near real-time)
- Vehicle and revenue data: Daily at 4:00 AM ET
- Predictive insights: Refreshed daily at 2:00 AM ET
- Job mapping data: Weekly refresh on Sundays

## Report Dissemination

- Primary access: Embedded in Towne Park Portal and Legion dashboard
- Mobile access: Optimized view in Legion mobile app for field managers
- Automated alerts: Configurable for productivity falling below threshold
- Email digest: Daily summary to operations leaders at 6:00 AM ET

## Report Format

- Primary format: Power BI dashboard with interactive elements
- Mobile format: Simplified view optimized for smartphone access
- Export options: Excel, PDF, CSV

## Business Stakeholders for Change Approval

| Stakeholder | Role | Approval Authority |
|-------------|------|-------------------|
| Ryan Esposito | VP of Operations | Primary approval for productivity metrics and targets |
| David Arreola | Workforce Planning Director | Approval for staffing algorithms and recommendations |
| Joseph Jaussi | Operations Excellence Manager | Approval for productivity standards and benchmarks |
| Amy Sowells | Product Owner | Approval for system integration and data sources |
| Jim Boyer | Data Analytics Manager | Approval for calculation methods and data modeling |

Changes require documentation and testing in development environment before approval process.

