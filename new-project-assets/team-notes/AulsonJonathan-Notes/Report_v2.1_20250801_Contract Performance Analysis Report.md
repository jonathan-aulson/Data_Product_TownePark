# Report Document

**Contract Performance Analysis Report**

**Author:** Adam Suarez  
**Date:** August 1, 2025  
**Version:** 2.1

* * *

## Purpose of the Report

The Contract Performance Analysis Report provides a comprehensive evaluation of financial performance across different contract types within Towne Park's portfolio. It enables executives, finance team members, and operational leaders to analyze profitability by contract structure, identify optimization opportunities, and make data-driven decisions about contract renewals and negotiations.

## Business Data Sources

| Data Source | System | Description |
|-------------|--------|-------------|
| Contract Configuration | Power Bill (Dataverse) | Contract types, rates, terms, and effective dates |
| Revenue Data | EDW (Account_Summary) | Monthly revenue by site and GL account |
| Expense Data | EDW (Account_Summary) | Monthly expenses by site and GL account |
| Budget Data | EDW (Budget_Final) | Budgeted figures for revenue and expenses |
| Labor Hours | Legion via EDW (vwPAYROLL_SUMMARY) | Hours worked by job code for PLH contract analysis |
| Validation Data | EDW (vwREVENUE_DAILY_DETAIL_INVOICE) | Validation volumes and amounts for threshold analysis |

## Visual Representation of Report Output

```
+------------------------------------------------------+
|            CONTRACT PERFORMANCE ANALYSIS             |
|                  Period: Q2 2025                     |
+------------------------------------------------------+

+-------------------+  +-------------------+  +------------------+
| CONTRACT SUMMARY  |  | FLC BY CONTRACT   |  | CONTRACT COUNTS  |
|                   |  |                   |  |                  |
| Total Sites: 805  |  | Rev Share: $8.2M  |  | Rev Share: 345  |
| Active Sites: 782 |  | Mgmt Agree: $5.7M |  | Mgmt Agree: 227 |
| On-Hold: 23       |  | PLH: $3.1M        |  | PLH: 165        |
| Contract Value:   |  | POR: $1.8M        |  | POR: 82         |
| $18.8M (↑5.3% YoY)|  | Fixed Fee: $1.0M  |  | Fixed Fee: 63   |
+-------------------+  +-------------------+  +------------------+

+------------------------------------------------------+
|               CONTRACT TYPE COMPARISON               |
|                                                      |
| ┌────────────┬─────────┬─────────┬────────┬────────┐ |
| │ Metric     │ Rev     │ Mgmt    │ PLH    │ POR    │ |
| │            │ Share   │ Agree   │        │        │ |
| ├────────────┼─────────┼─────────┼────────┼────────┤ |
| │ Avg FLC    │ $23.8K  │ $25.1K  │ $18.8K │ $22.0K │ |
| │ FLC Margin │ 24.2%   │ 18.7%   │ 31.4%  │ 26.8%  │ |
| │ YoY Growth │ 6.5%    │ 4.2%    │ 3.8%   │ 7.1%   │ |
| │ vs Budget  │ +3.2%   │ +0.8%   │ -1.2%  │ +4.5%  │ |
| └────────────┴─────────┴─────────┴────────┴────────┘ |
+------------------------------------------------------+

+------------------+  +--------------------+  +------------------+
| TOP PERFORMERS   |  | RISK ASSESSMENT    |  | RENEWAL OUTLOOK  |
| (FLC Margin)     |  |                    |  |                  |
|                  |  | High Risk: 47      |  | Due Q3 2025: 36  |
| 1. Site 0423 (38%)|  | Medium Risk: 123   |  | Due Q4 2025: 42  |
| 2. Site 0170 (36%)|  | Low Risk: 612      |  | Due Q1 2026: 51  |
| 3. Site 0349 (35%)|  |                    |  | Forecast Renew:  |
| 4. Site 0118 (33%)|  | Risk by Type:      |  | Rate: 87%        |
| 5. Site 0231 (31%)|  | [Bar chart showing |  | Exp. Revenue:    |
|                  |  |  risk by contract   |  | $17.4M           |
+------------------+  |  type]              |  +------------------+
                      +--------------------+
```

## Filters

### Hard-coded Filters
- Active contracts only (status = 'Active' or 'On-Hold')
- Current fiscal year and previous fiscal year for comparison
- FLC Margin > -10% (filters extreme outliers)

### User-driven Filters
- Date range (Quarter, Year, Custom)
- Contract type (All, Revenue Share, Management Agreement, PLH, POR, Fixed Fee)
- Region/District selection
- Site segmentation (Hotel, Healthcare, Airport, Mixed-Use)
- Contract age (New: <1 year, Established: 1-3 years, Mature: >3 years)
- Account Manager/District Manager

## Field-by-Field Logic and Definitions

| Field | Definition | Logic/Calculation |
|-------|------------|-------------------|
| FLC | Full Location Contribution | Internal Revenue - Payroll - Claims - PTEB - Insurance - Parking Rents - Other Expenses |
| FLC Margin | FLC as percentage of Internal Revenue | FLC / Internal Revenue * 100 |
| Contract Value | Total value of contract to Towne Park | Sum of monthly Internal Revenue for the period |
| Rev Share Tier Analysis | Analysis of revenue against tier thresholds | Calculated monthly and compared to contract tier thresholds |
| PLH Rate Efficiency | Assessment of PLH contract performance | Internal Revenue / Total Billable Hours |
| Risk Assessment | Contract risk categorization | Algorithm based on FLC trend, margin, YoY comparison, and contract terms |
| Renewal Probability | Likelihood of contract renewal | ML-based score using historical renewal patterns and current performance |

## User Security

| Role | Access Level | Description |
|------|-------------|-------------|
| Account Manager | Site-level | Can view contract details for assigned sites only |
| District Manager | District-level | Can view all contracts within assigned district |
| Regional VP | Region-level | Can view all contracts within assigned region |
| Finance | Enterprise-level | Can view all contract financial metrics across the enterprise |
| Executive | Enterprise-level | Can view all contracts and summary metrics |
| Contract Admin | Enterprise-level | Full access to all contract details and configuration |

Security is implemented through Microsoft Entra ID with role assignments in Power BI.

## Data Refresh Schedules

- Contract configuration data: Daily at 6:00 AM ET
- Financial data: Daily for current month (preliminary), finalized 5 business days after month-end
- Risk assessment calculation: Weekly on Mondays at 2:00 AM ET
- Renewal probability model: Refreshed monthly on the 7th

## Report Dissemination

- Primary access: Embedded in Towne Park Portal (PowerBill)
- Email subscriptions: Monthly summary to Regional VPs and Finance team
- Automated alerts: For contracts moving into high-risk category or approaching renewal
- Executive digest: Quarterly report distributed to C-suite via email

## Report Format

- Primary format: Power BI dashboard
- Export options: Excel, PDF
- SharePoint integration: Automatic posting to Finance team site

## Business Stakeholders for Change Approval

| Stakeholder | Role | Approval Authority |
|-------------|------|-------------------|
| Eddie Petrini | VP of Revenue | Primary approval for contract metrics and analysis methods |
| Michael Foy | Finance Director | Approval for financial calculations and risk assessment |
| Amy Sowells | Product Owner | Approval for data integration and system changes |
| Adam Suarez | Product Owner | Technical implementation approval |
| Jim Boyer | Data Analytics Manager | Data model and calculation approval |

Changes require documentation in the change management system and approval from at least two stakeholders including the VP of Revenue.

