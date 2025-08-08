# Report Document

**Site Performance Dashboard**

**Author:** Jonathan Aulson  
**Date:** August 4, 2025  
**Version:** 1.2

* * *

## Purpose of the Report

The Site Performance Dashboard provides a comprehensive view of operational and financial performance metrics across Towne Park's parking and hospitality locations. This dashboard enables executives, regional managers, district managers, and account managers to monitor site health, identify trends, and make data-driven decisions to optimize performance.

## Business Data Sources

| Data Source | System | Description |
|-------------|--------|-------------|
| Revenue Data | EDW (Revenue_DataMart_Daily) | Daily revenue by site, revenue type, and revenue code |
| Vehicle Statistics | EDW (vwREVENUE_DAILY_DETAIL_INVOICE) | Vehicle counts by type (valet, self-park, etc.) |
| Payroll Data | Legion via EDW (vwPAYROLL_SUMMARY) | Labor hours and costs by site and job code |
| Budget Data | EDW (BUDGET_FINAL) | Budgeted figures for revenue, labor, and expenses |
| Contract Details | Power Bill (Dataverse) | Contract types, rates, and terms by site |
| Operational Metrics | EDW (SITE_METRICS) | Capture ratios, drive-in ratios, and other operational KPIs |

## Visual Representation of Report Output

```
+----------------------------------------------+
|              SITE PERFORMANCE                |
|           Gaylord Texan (Site 0170)          |
|          Period: July 1-31, 2025             |
+----------------------------------------------+

+------------------+  +---------------------+  +------------------+
| FINANCIAL HEALTH |  | LABOR PRODUCTIVITY  |  | VOLUME METRICS   |
|                  |  |                     |  |                  |
| Revenue:         |  | Total Hours:        |  | Valet Vehicles:  |
| $1,245,000 ↑8.2% |  | 12,500 hrs ↓4.1%    |  | 24,500 ↑12.3%    |
|                  |  |                     |  |                  |
| FLC:             |  | Veh./Labor Hour:    |  | Self Vehicles:   |
| $285,000 ↑14.5%  |  | 2.85 ↑17.3%         |  | 18,750 ↑5.7%     |
|                  |  |                     |  |                  |
| Payroll:         |  | Labor to Revenue:   |  | Occupied Rooms:  |
| $475,000 ↓2.3%   |  | 38.2% ↓9.5%         |  | 28,250 ↑3.2%     |
+------------------+  +---------------------+  +------------------+

+----------------------------------------------+
|               TREND ANALYSIS                 |
|                                              |
| [Line chart showing revenue, payroll, and    |
| FLC trends over the past 12 months]          |
|                                              |
+----------------------------------------------+

+------------------+  +---------------------+  +------------------+
| VS. BUDGET       |  | VS. PRIOR YEAR      |  | PRODUCTIVITY     |
|                  |  |                     |  |                  |
| Revenue: +5.2%   |  | Revenue: +8.2%      |  | Capture Ratio:   |
| Payroll: -3.7%   |  | Payroll: -2.3%      |  | 72.5% ↑2.1%      |
| FLC: +12.3%      |  | FLC: +14.5%         |  |                  |
| Vehicles: +7.5%  |  | Vehicles: +9.8%     |  | Drive-in Ratio:  |
|                  |  |                     |  | 0.45 ↑5.3%       |
+------------------+  +---------------------+  +------------------+
```

## Filters

### Hard-coded Filters
- Current fiscal year
- Last 12 months of data for trend analysis
- Active sites only (status = 'Active')

### User-driven Filters
- Site selection (single or multiple)
- Date range selection
- Comparison period (vs. budget, prior year, prior month)
- Contract type filter (Rev Share, Management Agreement, PLH, POR, Fixed Fee)
- View level (Site, District, Region, COG Segment)

## Field-by-Field Logic and Definitions

| Field | Definition | Logic/Calculation |
|-------|------------|-------------------|
| Revenue | Total external and internal revenue | Sum of External Revenue and Internal Revenue |
| External Revenue | Revenue from parking operations | Sum of NetExternalRevenue from Revenue_DataMart_Daily |
| Internal Revenue | Revenue from management fees, per labor hour, etc. | Sum of InternalRevenue from Account_Summary |
| FLC | Full Location Contribution | Internal Revenue - Payroll - Claims - PTEB - Insurance - Parking Rents - Other Expenses |
| Payroll | Total labor cost | Sum of TotalDollars from vwPAYROLL_SUMMARY |
| Vehicles | Total vehicle count | Sum of VehicleCount from vwREVENUE_DAILY_DETAIL_INVOICE |
| Veh./Labor Hour | Vehicles per labor hour | Total Vehicles / Total Labor Hours |
| Labor to Revenue | Labor cost as percentage of revenue | Payroll / Revenue * 100 |
| Capture Ratio | Percentage of overnight hotel guests using valet | (Valet Overnight Vehicles / Occupied Rooms) * 100 |
| Drive-in Ratio | Non-overnight guests using parking | (Total Vehicles - Overnight Vehicles) / Occupied Rooms |

## User Security

| Role | Access Level | Description |
|------|-------------|-------------|
| Account Manager | Site-level | Can view dashboard for assigned sites only |
| District Manager | District-level | Can view all sites within assigned district |
| Regional Manager | Region-level | Can view all districts within assigned region |
| Executive | Enterprise-level | Can view all sites across the enterprise |
| Finance | Enterprise-level | Can view all financial metrics across the enterprise |
| System Admin | Enterprise-level | Full access to dashboard and configuration |

Security is implemented through Microsoft Entra ID and role-based access control in Power BI. User-to-site mappings are sourced from Workday via EDW tables.

## Data Refresh Schedules

- Revenue and vehicle data: Daily at 4:00 AM ET
- Payroll data: Daily at 6:00 AM ET (Legion data updates overnight)
- Month-end financial data: Monthly on the 5th business day after month close
- Budget data: Refreshed monthly or when budget revisions are approved

## Report Dissemination

- Primary access: Embedded in Towne Park Portal (PowerBill)
- Email subscriptions: Weekly summary sent to managers every Monday at 7:00 AM ET
- Automated alerts: Configured for significant variances (>10% from budget)
- Executive summary: Monthly report emailed to executives on the 6th business day of each month

## Report Format

- Primary format: Power BI dashboard embedded in Towne Park Portal
- Export options: Excel, PDF, PowerPoint
- Mobile view: Optimized for tablet and smartphone access via Power BI mobile app

## Business Stakeholders for Change Approval

| Stakeholder | Role | Approval Authority |
|-------------|------|-------------------|
| Amy Sowells | Product Owner | Approve data source changes, metric definitions, and feature additions |
| Adam Suarez | Product Owner | Approve technical implementations and security settings |
| Michael Foy | Finance Director | Approve financial metric definitions and calculations |
| Ryan Esposito | VP of Operations | Approve operational metrics and KPIs |
| Jim Boyer | Data Analytics Manager | Approve data model changes and refresh schedules |
| Eddie Petrini | VP of Revenue | Final approval for financial reporting changes |

Changes to the dashboard require documentation and approval in the change management system, with sign-off from at least two stakeholders including the relevant functional lead.

