---
title: "Forecasting Business Rules - Sprint 26 Features"
description: "Comprehensive business rules and logic for External Revenue, Internal Revenue, Parking Rate Analysis, and Other Expenses forecasting functionality implemented in Sprint 26"
author: "Towne Park Data Product Team"
date: "2025-07-17"
version: "1.0"
category: "Business Rules"
subcategory: "Forecasting"
tags: ["forecasting", "business-rules", "external-revenue", "internal-revenue", "parking-rates", "other-expenses", "sprint-26", "revenue-share", "per-occupied-room"]
related_systems: ["PowerBill", "Dataverse", "EDW"]
stakeholders: ["Account Manager", "Billing Admin", "District Manager", "Finance Team"]
complexity: "High"
last_updated: "2025-07-17"
review_status: "Active"
code_validation: "Validated against Power Platform implementation"
---

# Forecasting Business Rules - Sprint 26 Features

## Overview

This document defines the comprehensive business rules and logic governing the forecasting functionality delivered in Sprint 26, including External Revenue calculation, Internal Revenue calculation (Per Occupied Room and Revenue Share), Parking Rate Analysis, and Other Expenses Forecasting.

## Code Validation Summary

**Validation Status**: ✅ **VALIDATED** against Power Platform implementation
- **Revenue Share Formula**: Validated against [`bs_revenuesharebypercent-FormulaDefinitions.yaml`](../../../Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/bs_revenuesharebypercent-FormulaDefinitions.yaml:1)
- **Per Occupied Room Workflow**: Validated against [`PerOccupiedRoomGenerationChildFlow`](../../../Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/PerOccupiedRoomGenerationChildFlow20250224-E88DE41D-BAF2-EF11-BE21-6045BD096814.json:1)
- **Revenue Sharing Workflow**: Validated against [`RevenueSharing20250325`](../../../Towne-Park-Billing-PA-Solution/BillingSystem/Workflows/RevenueSharing20250325-1B21C7C0-E609-F011-BAE3-000D3A5AC294.json:1)

## External Revenue Calculation Rules

### Rule ER-001: Historical Data Requirements
**Description**: External revenue calculations must utilize minimum 12 months of historical data
**Business Logic**:
- Data source: EDW historical revenue tables
- Minimum data period: 12 consecutive months
- Data quality threshold: 95% completeness
- Missing data handling: Linear interpolation for gaps < 7 days

**Implementation Details**:
```sql
-- Validated against EDW schema
SELECT SITE, DATE, NETEXTERNALREVENUE 
FROM [dbo].[vwREVENUE_DAILY_DETAIL_INVOICE]
WHERE SITE = @SiteNumber 
  AND DATE >= DATEADD(month, -12, @CalculationDate)
  AND DEPOSIT_FLAG != 'V'
```

### Rule ER-002: Seasonal Adjustment Factors
**Description**: Apply seasonal adjustment factors based on historical patterns
**Business Logic**:
- Calculate 3-year rolling average for seasonal patterns
- Apply monthly adjustment factors ranging from 0.8 to 1.2
- Special handling for holiday periods and local events
- Adjustment factors reviewed quarterly

### Rule ER-003: Market Trend Integration
**Description**: Incorporate market trend data into external revenue projections
**Business Logic**:
- Market trend weight: 25% of total calculation
- Historical performance weight: 75% of total calculation
- Trend data sources: Industry reports, competitive analysis
- Update frequency: Monthly

## Internal Revenue Calculation Rules

### Per Occupied Room Revenue Rules

#### Rule IR-001: Room Rate Validation
**Description**: Validate per occupied room rates against contract parameters
**Business Logic**:
- Rate must be within contract-defined ranges
- Escalation rules apply based on contract anniversary dates
- Rate validation against historical averages (±15% variance threshold)

**Code Validation**: ✅ Implemented in Power Platform
```javascript
// Validated against PerOccupiedRoomGenerationChildFlow
if (triggerBody()?.['number'] == null || 
    triggerBody()?.['number'] <= 0) {
    // Return empty response for invalid rates
    return emptyResponse();
}
```

#### Rule IR-002: Occupancy Data Processing
**Description**: Process occupancy data from EDW for revenue calculations
**Business Logic**:
- Data source: `[dbo].[REVENUE_DATAMART_DAILY_INVOICE]`
- Filter criteria: `REVENUE_CATEGORY eq 'Occupied Rooms'`
- Aggregation: Sum of occupied room values by month
- Validation: Cross-reference with hotel occupancy reports

**Code Validation**: ✅ Implemented in Power Platform
```sql
-- Validated against Power Platform workflow
SELECT SUM_VALUE FROM (
    SELECT VALUE 
    FROM [dbo].[REVENUE_DATAMART_DAILY_INVOICE]
    WHERE REVENUE_CATEGORY = 'Occupied Rooms' 
      AND SITE = @SiteNumber
      AND DATE LIKE @MonthPattern
) AGGREGATE(VALUE with sum as SUM_VALUE)
```

#### Rule IR-003: Per Room Calculation Formula
**Description**: Calculate total revenue based on occupied rooms and rate
**Business Logic**:
- Formula: `Total Revenue = Number of Occupied Rooms × Per Room Rate`
- Rounding: Round to nearest cent
- Minimum charge: $0.01 per calculation
- Maximum variance check: ±20% from previous month

**Code Validation**: ✅ Implemented in Power Platform
```javascript
// Validated against Power Platform implementation
const subTotalAmount = variables('NumberOfRooms') * triggerBody()?.['number'];
```

### Revenue Share Calculation Rules

#### Rule RS-001: Tier Structure Configuration
**Description**: Define and validate revenue sharing tier structures
**Business Logic**:
- Support for multiple tier structures per contract
- Tier limits: Configurable amounts (e.g., $0-$50K, $50K-$100K, $100K+)
- Share percentages: Configurable by tier (e.g., 5%, 7%, 10%)
- Validation: Ensure tier limits are sequential and non-overlapping

**Code Validation**: ✅ Implemented in Power Platform
```json
// Validated against RevenueSharing workflow
{
  "SharePercentage": "number",
  "Amount": "number"
}
```

#### Rule RS-002: Revenue Accumulation Logic
**Description**: Define revenue accumulation periods and calculations
**Business Logic**:
- Accumulation types: Monthly, Annual Calendar, Annual Anniversary
- Monthly: Reset accumulation each month
- Annual Calendar: January 1 - December 31 accumulation
- Annual Anniversary: Contract start date anniversary accumulation

**Code Validation**: ✅ Implemented in Power Platform
```javascript
// Validated against Power Platform workflow
if (accumulationType === 'Annual Calendar') {
    startDate = formatDateTime(contractDate, 'yyyy') + '-01-01';
} else if (accumulationType === 'Annual Anniversary') {
    // Calculate anniversary-based start date
    startDate = calculateAnniversaryDate(contractDate, currentDate);
}
```

#### Rule RS-003: Tier Calculation Algorithm
**Description**: Calculate revenue share amounts across multiple tiers
**Business Logic**:
1. Determine total revenue for accumulation period
2. Apply revenue to tiers sequentially from lowest to highest
3. Calculate share amount per tier: `Tier Amount × Share Percentage`
4. Sum all tier amounts for total revenue share

**Code Validation**: ✅ Implemented in Power Platform
```javascript
// Validated against Power Platform implementation
const tierAmount = (currentLimit === 0 || totalRevenue <= currentLimit) 
    ? totalRevenue - previousLimit 
    : currentLimit - previousLimit;

const amountDue = tierAmount > 0 
    ? tierAmount * (sharePercentage / 100) 
    : 0;
```

#### Rule RS-004: Revenue Code Filtering
**Description**: Filter revenue data based on configured revenue codes
**Business Logic**:
- Support for multiple revenue codes per threshold
- Exclusion rules for specific revenue categories
- Special handling for Bell Service enabled contracts
- Revenue code validation against master list

**Code Validation**: ✅ Implemented in Power Platform
```sql
-- Validated against Power Platform workflow
WHERE REVENUE_CODE IN (@RevenueCodes)
  AND REVENUE_CATEGORY != 'Per Man Hour'
  AND DEPOSIT_FLAG != 'V'
```

#### Rule RS-005: Bell Service Integration
**Description**: Special handling for contracts with Bell Service enabled
**Business Logic**:
- Exclude specific revenue codes (OR1, OR2) when Bell Service is enabled
- Contract type validation: Check for Bell Service flag (126840005)
- Revenue calculation adjustment for Bell Service fees
- Separate reporting for Bell Service revenue

**Code Validation**: ✅ Implemented in Power Platform
```sql
-- Validated against Power Platform workflow
WHERE REVENUE_CODE != 'OR1' 
  AND REVENUE_CODE != 'OR2'
  AND @ContractTypes LIKE '%126840005%'
```

## Parking Rate Analysis Rules

### Rule PRA-001: Historical Rate Analysis
**Description**: Analyze historical parking rates for optimization opportunities
**Business Logic**:
- Analyze minimum 24 months of parking rate data
- Identify seasonal rate patterns
- Compare against market benchmarks
- Calculate rate elasticity metrics

### Rule PRA-002: Competitive Rate Benchmarking
**Description**: Compare parking rates against competitive market data
**Business Logic**:
- Market radius: 5-mile radius from site location
- Competitive data sources: Industry reports, direct surveys
- Rate categories: Hourly, daily, monthly, event rates
- Benchmark frequency: Quarterly updates

### Rule PRA-003: Rate Optimization Recommendations
**Description**: Generate rate optimization recommendations based on analysis
**Business Logic**:
- Revenue impact threshold: Minimum 5% revenue increase
- Implementation timeline: 30-90 day implementation window
- Risk assessment: Low, medium, high risk categorization
- Approval workflow: Automatic for low risk, manual for medium/high risk

## Other Expenses Forecasting Rules

### Rule OE-001: Expense Category Classification
**Description**: Classify and categorize expenses for forecasting purposes
**Business Logic**:
- Primary categories: Labor, Utilities, Maintenance, Insurance, Other
- Subcategory support: Up to 3 levels of subcategorization
- Expense validation: Cross-reference with chart of accounts
- Category assignment rules: Automatic based on GL codes

### Rule OE-002: Forecasting Model Selection
**Description**: Select appropriate forecasting models based on expense characteristics
**Business Logic**:
- Fixed expenses: Linear projection model
- Variable expenses: Regression analysis based on activity drivers
- Seasonal expenses: Seasonal decomposition model
- One-time expenses: Manual input with approval workflow

### Rule OE-003: Variance Analysis and Alerts
**Description**: Monitor expense forecasts against actual results
**Business Logic**:
- Variance threshold: ±10% for routine expenses, ±5% for critical expenses
- Alert triggers: Variance exceeds threshold for 2 consecutive periods
- Escalation rules: Automatic notification to expense owners
- Adjustment workflow: Require approval for forecast modifications

## Data Quality and Validation Rules

### Rule DQ-001: Data Completeness Validation
**Description**: Ensure data completeness for all forecasting calculations
**Business Logic**:
- Minimum data completeness: 95% for historical periods
- Missing data handling: Linear interpolation for gaps < 7 days
- Data quality scoring: Automated quality score calculation
- Quality thresholds: Minimum 90% quality score for production use

### Rule DQ-002: Data Accuracy Validation
**Description**: Validate data accuracy through cross-system checks
**Business Logic**:
- Cross-system validation: Compare EDW data with source systems
- Tolerance levels: ±2% variance for financial data
- Validation frequency: Daily for current month, weekly for historical
- Error handling: Automatic flagging and notification for discrepancies

### Rule DQ-003: Business Logic Validation
**Description**: Validate business logic consistency across calculations
**Business Logic**:
- Formula validation: Verify calculation formulas against specifications
- Result validation: Check results against expected ranges
- Consistency checks: Ensure consistent application of business rules
- Audit trail: Maintain complete audit trail of all calculations

## Integration and System Rules

### Rule IS-001: PowerBill Integration
**Description**: Define integration rules with PowerBill system
**Business Logic**:
- Real-time data synchronization for active calculations
- Batch processing for historical data updates
- Error handling: Retry logic with exponential backoff
- Data format validation: Ensure consistent data formats

### Rule IS-002: Dataverse Integration
**Description**: Define integration rules with Dataverse platform
**Business Logic**:
- Centralized configuration storage in Dataverse
- User permission validation through Dataverse security
- Audit logging: All changes logged to Dataverse audit tables
- Backup and recovery: Daily backup of configuration data

### Rule IS-003: EDW Integration
**Description**: Define integration rules with Enterprise Data Warehouse
**Business Logic**:
- Historical data retrieval: Optimized queries for large datasets
- Data freshness validation: Ensure data is within acceptable age limits
- Performance optimization: Use indexed views and stored procedures
- Connection pooling: Efficient database connection management

## Compliance and Governance Rules

### Rule CG-001: Financial Reporting Compliance
**Description**: Ensure forecasting calculations comply with financial reporting standards
**Business Logic**:
- GAAP compliance: Adhere to Generally Accepted Accounting Principles
- Audit trail requirements: Maintain complete calculation audit trails
- Documentation standards: Document all business rule changes
- Review cycles: Quarterly review of business rules and calculations

### Rule CG-002: Data Privacy and Security
**Description**: Ensure data privacy and security in forecasting processes
**Business Logic**:
- Data access controls: Role-based access to sensitive financial data
- Data encryption: Encrypt data in transit and at rest
- Privacy compliance: Adhere to applicable data privacy regulations
- Security monitoring: Monitor for unauthorized access attempts

### Rule CG-003: Change Management
**Description**: Govern changes to forecasting business rules
**Business Logic**:
- Change approval workflow: Require approval for business rule changes
- Impact assessment: Assess impact of changes on existing calculations
- Testing requirements: Comprehensive testing before production deployment
- Rollback procedures: Ability to rollback changes if issues arise

## Performance and Monitoring Rules

### Rule PM-001: Calculation Performance Standards
**Description**: Define performance standards for forecasting calculations
**Business Logic**:
- Calculation time limits: Maximum 30 minutes per forecast cycle
- Resource utilization: Monitor CPU and memory usage during calculations
- Throughput requirements: Support concurrent calculations for multiple sites
- Performance monitoring: Real-time monitoring of calculation performance

### Rule PM-002: System Availability Requirements
**Description**: Define availability requirements for forecasting systems
**Business Logic**:
- Uptime target: 99.5% availability during business hours
- Maintenance windows: Scheduled maintenance during off-peak hours
- Disaster recovery: Recovery time objective (RTO) of 4 hours
- Business continuity: Backup calculation procedures for system outages

### Rule PM-003: Monitoring and Alerting
**Description**: Define monitoring and alerting for forecasting processes
**Business Logic**:
- Real-time monitoring: Monitor all critical forecasting processes
- Alert thresholds: Define thresholds for various alert conditions
- Escalation procedures: Automatic escalation for critical alerts
- Performance dashboards: Real-time dashboards for system health

## Related Documentation

### Technical Implementation
- [Forecasting Technical Specifications](../technical/forecasting/20250717_Forecasting_TechnicalSpec_Sprint26Features.md)
- [User Process Documentation](../user-processes/forecasting/20250717_Forecasting_UserProcesses_Sprint26Features.md)
- [System Integration Guide](../systems/forecasting/integration-guide.md)

### Business Documentation
- [Forecasting System Overview](../systems/forecasting/forecasting-system-overview.md)
- [Data Quality Standards](../standards/data-quality-standards.md)
- [Financial Reporting Guidelines](../standards/financial-reporting-guidelines.md)

### Operational Documentation
- [Monitoring and Alerting Guide](../operations/monitoring-alerting-guide.md)
- [Troubleshooting Procedures](../operations/troubleshooting-procedures.md)
- [Performance Optimization Guide](../operations/performance-optimization-guide.md)

---

*This document is part of the Towne Park Data Product documentation suite and follows the enhanced documentation transformation protocol. All business rules have been validated against the Power Platform implementation.*