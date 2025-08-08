# Report Document

**Regional Performance Comparison Report**

**Author:** Jim Boyer  
**Date:** July 15, 2025  
**Version:** 1.5

* * *

## Purpose of the Report

The Regional Performance Comparison Report provides a comprehensive view of operational and financial performance across Towne Park's geographical regions. It enables regional vice presidents, district managers, and corporate leadership to benchmark performance, identify best practices, recognize underperforming areas, and allocate resources effectively based on comparative analysis.

## Business Data Sources

| Data Source | System | Description |
|-------------|--------|-------------|
| Financial Data | EDW (Account_Summary) | Revenue and expense data by site, district, and region |
| Operational Metrics | EDW (Site_Metrics) | Key operational indicators like productivity, capture ratio |
| Site Hierarchy | EDW (Organization_Hierarchy) | Site to district to region mapping |
| Budget Data | EDW (Budget_Final) | Budgeted figures for comparison |
| Payroll Data | Legion via EDW (vwPAYROLL_SUMMARY) | Labor costs and hours by region |
| Contract Performance | Power Bill (Dataverse) | Contract performance metrics by region |
| Employee Data | Workday via EDW | Headcount, turnover, and management structure |

## Visual Representation of Report Output

```
+------------------------------------------------------+
|            REGIONAL PERFORMANCE COMPARISON           |
|                  Period: Q2 2025                     |
+------------------------------------------------------+

+------------------+-------------------+-------------------+------------------+
| REGION           | NORTHEAST         | SOUTHEAST         | CENTRAL          |
| FINANCIAL        |                   |                   |                  |
+------------------+-------------------+-------------------+------------------+
| Revenue          | $21.5M (↑4.2%)    | $19.8M (↑6.7%)    | $24.3M (↑3.1%)   |
| FLC              | $5.8M (↑7.3%)     | $4.9M (↑8.1%)     | $6.2M (↑5.4%)    |
| FLC %            | 27.0% (↑0.8%)     | 24.7% (↑0.3%)     | 25.5% (↑0.6%)    |
| vs Budget        | +2.3%             | +4.5%             | -0.8%            |
+------------------+-------------------+-------------------+------------------+

+------------------+-------------------+-------------------+------------------+
| OPERATIONAL      |                   |                   |                  |
+------------------+-------------------+-------------------+------------------+
| Sites            | 185               | 163               | 203              |
| Vehicle Volume   | 2.1M (↑3.5%)      | 1.8M (↑5.1%)      | 2.3M (↑2.7%)     |
| Productivity     | 2.93 veh/hr       | 3.18 veh/hr       | 2.85 veh/hr      |
| Labor to Revenue | 35.8% (↓1.2%)     | 37.2% (↓0.5%)     | 36.5% (↓0.2%)    |
+------------------+-------------------+-------------------+------------------+

+------------------+-------------------+-------------------+------------------+
| PEOPLE           |                   |                   |                  |
+------------------+-------------------+-------------------+------------------+
| Headcount        | 1,875             | 1,650             | 2,050            |
| Turnover         | 43.2% (↓2.1%)     | 38.7% (↓4.3%)     | 41.5% (↓1.7%)    |
| Manager Ratio    | 1:12.8            | 1:14.3            | 1:13.5           |
| Open Positions   | 58 (3.1%)         | 42 (2.5%)         | 73 (3.6%)        |
+------------------+-------------------+-------------------+------------------+

+------------------------------------------------------+
|                TOP PERFORMING DISTRICTS               |
|                                                      |
| 1. NYC Metro (NE): FLC 31.2%, Productivity 3.56      |
| 2. Atlanta (SE): FLC 29.8%, Productivity 3.42        |
| 3. Chicago (C): FLC 28.5%, Productivity 3.38         |
| 4. Florida (SE): FLC 28.3%, Productivity 3.31        |
| 5. Texas (C): FLC 27.9%, Productivity 3.24           |
+------------------------------------------------------+

+------------------+  +-------------------+  +------------------+
| GROWTH ANALYSIS  |  | RISK ASSESSMENT   |  | OPPORTUNITY AREAS|
|                  |  |                   |  |                  |
| Top Growth:      |  | High Risk Sites:  |  | Labor Efficiency:|
| SE: +6.7%        |  | NE: 18 (9.7%)     |  | Central: +1.2%   |
|                  |  | SE: 12 (7.4%)     |  |                  |
| YoY Trend:       |  | C: 22 (10.8%)     |  | Contract Renewal:|
| [Line chart of   |  |                   |  | Northeast: +3.5% |
|  quarterly YoY   |  | Risk by Type:     |  |                  |
|  growth by region]|  | [Bar chart of     |  | New Development: |
|                  |  |  contract risk]    |  | Southeast: +4.8%|
+------------------+  +-------------------+  +------------------+
```

## Filters

### Hard-coded Filters
- Current quarter and previous four quarters for trend analysis
- Active sites only
- Standard regional structure (excludes specialty divisions)

### User-driven Filters
- Time period (Quarter, Year, YTD, Custom)
- Regional level (Enterprise, Region, District)
- Segment filter (Hotel, Healthcare, Airport, Mixed-Use)
- Contract type filter (Rev Share, Management Agreement, PLH, POR, Fixed Fee)
- Comparison basis (vs. Budget, vs. Prior Year, vs. Plan, vs. Benchmark)

## Field-by-Field Logic and Definitions

| Field | Definition | Logic/Calculation |
|-------|------------|-------------------|
| Revenue | Total revenue by region | Sum of Internal Revenue and External Revenue for all sites in region |
| FLC | Full Location Contribution | Sum of site-level FLC for all sites in region |
| FLC % | FLC as percentage of revenue | FLC / Revenue * 100 |
| vs Budget | Performance vs budget | (Actual FLC - Budget FLC) / Budget FLC * 100 |
| Productivity | Overall regional productivity | Total Vehicle Count / Total Labor Hours for region |
| Labor to Revenue | Labor cost efficiency | Total Payroll Cost / Total Revenue * 100 |
| Manager Ratio | Span of control metric | Total Hourly Employees / Total Managers |
| Risk Assessment | Contract risk categorization | Percentage of sites in region with negative FLC trend or below-target performance |
| Growth Analysis | Year-over-year growth | (Current Period Revenue - Prior Year Period Revenue) / Prior Year Period Revenue * 100 |

## User Security

| Role | Access Level | Description |
|------|-------------|-------------|
| Regional VP | Region-level | Full access to their region's data and limited benchmark data from other regions |
| District Manager | District-level | Full access to their district's data and summary data for peer districts |
| Corporate Executive | Enterprise-level | Full access to all regional data |
| Finance | Enterprise-level | Full access to financial metrics across all regions |
| Operations | Enterprise-level | Full access to operational metrics across all regions |

Security is implemented through row-level security in Power BI based on Workday organizational assignments.

## Data Refresh Schedules

- Financial data: Daily refresh with month-end reconciliation
- Operational metrics: Daily refresh at 6:00 AM ET
- People data: Weekly refresh on Mondays at 2:00 AM ET
- Risk assessment: Weekly calculation on Sundays
- Benchmarking: Monthly calculation after financial close

## Report Dissemination

- Primary access: Power BI workspace for leadership team
- Email distribution: Quarterly executive summary to leadership team
- Automated distribution: Month-end snapshot to regional VPs
- Presentation format: Quarterly business review materials

## Report Format

- Primary format: Power BI interactive dashboard
- Export options: PowerPoint, Excel, PDF
- Print format: Executive summary one-pager

## Business Stakeholders for Change Approval

| Stakeholder | Role | Approval Authority |
|-------------|------|-------------------|
| Eddie Petrini | VP of Revenue | Approval for financial metric definitions |
| Ryan Esposito | VP of Operations | Approval for operational metric definitions |
| Regional VPs | Region Leaders | Consulted on region-specific requirements |
| Michael Foy | Finance Director | Approval for financial calculations |
| Jim Boyer | Data Analytics Manager | Technical implementation approval |
| Peter Quinan | COO | Final approval for major changes |

Changes require documentation and review from at least three stakeholders including the COO or delegate.

