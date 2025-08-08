---
title: "Forecasting Statistics Display Business Rules"
date: "2025-07-23"
version: "1.0"
status: "Active"
author: "Towne Park Business Analysis Team"
reviewer: "Adam Suarez"
tags: ["business-rules", "forecasting", "statistics", "variance-analysis", "comparison-logic"]
related_docs: 
  - "20250723_Forecasting_UIDesign_UserExperienceStandards.md"
  - "20250718_Forecasting_BusinessRules_CalculationsAndValidations.md"
systems: ["Forecasting", "Statistics", "Legion", "Budget Integration"]
stakeholders: ["Product Owner", "Account Managers", "Business Analyst", "Development Team"]
decision_authority: "Adam Suarez"
effective_date: "2025-05-30"
---

# Forecasting Statistics Display Business Rules

## Document Overview

This document establishes business rules governing the display and calculation logic for statistics within the Towne Park Forecasting system. These rules were derived from backlog grooming decisions made on May 30, 2025, and define how variance analysis, comparison logic, and performance measurement are implemented in the statistics tab.

## Executive Summary

The statistics display functionality focuses on forecast accuracy measurement rather than performance management. Key business rules govern comparison logic (forecast vs. budget), variance calculation methods, and the separation of concerns between forecasting accuracy and operational performance management systems.

## Business Rules Catalog

### 1. Comparison Logic Rules

#### 1.1 Forecast vs. Budget Comparison

**Rule ID:** BR-STAT-001  
**Category:** Calculation Logic  
**Priority:** High  
**Status:** Active  
**Decision Date:** 2025-05-30  
**Decision Authority:** Adam Suarez (Product Owner)  

**Business Rule:**
Statistics tab comparisons must use forecast data as the baseline for variance calculations, not budget data.

**Rationale:**
The statistics tab serves as an accuracy measurement tool for forecasting performance, not operational performance management. Comparing actuals to forecasts measures the quality of forecasting methodology and predictions.

**Implementation Requirements:**
- All variance calculations in statistics tab use forecast as comparison baseline
- Budget data is not used for variance calculations in statistics context
- Comparison logic clearly distinguishes between forecast accuracy and budget performance

**Business Justification:**
> "Yeah, I think we because the idea was like for this tab to be based on like how how accurate are you? Not really to like manage performance right? The performance management would be sort of in in like Legion and scheduling because you can't really manage your volume in terms of like up and down to an extent."

**Validation Criteria:**
- Variance calculations show (Actual - Forecast) / Forecast
- No budget-based variance calculations in statistics displays
- Clear labeling indicates forecast-based comparisons

#### 1.2 Performance Management Separation

**Rule ID:** BR-STAT-002  
**Category:** System Boundaries  
**Priority:** High  
**Status:** Active  
**Decision Date:** 2025-05-30  
**Decision Authority:** Adam Suarez (Product Owner)  

**Business Rule:**
Performance management functionality remains in Legion system and is explicitly excluded from forecasting statistics displays.

**Scope Definition:**
```
Forecasting Statistics Scope:
├── Forecast accuracy measurement
├── Prediction quality assessment
├── Variance analysis for forecasting improvement
└── Historical forecast performance tracking

Excluded from Forecasting Statistics:
├── Operational performance management
├── Employee performance evaluation
├── Volume management and control
└── Scheduling performance metrics
```

**Integration Boundaries:**
- **Legion System:** Handles performance management and scheduling
- **Forecasting System:** Handles accuracy measurement and prediction quality
- **Budget System:** Provides budget data for other contexts (not statistics variance)

**Business Rationale:**
Volume and operational performance cannot be effectively managed through forecasting tools due to external factors and operational constraints beyond forecasting control.

### 2. Variance Calculation Rules

#### 2.1 Variance Indicator Logic

**Rule ID:** BR-STAT-003  
**Category:** Display Logic  
**Priority:** Medium  
**Status:** Active  
**Decision Date:** 2025-05-30  

**Business Rule:**
Variance indicators must show directional comparison between actual and forecast values using standardized visual symbols.

**Calculation Formula:**
```
Variance Percentage = ((Actual - Forecast) / Forecast) * 100

Indicator Logic:
├── Positive Variance (Actual > Forecast): Up Arrow (↑)
├── Negative Variance (Actual < Forecast): Down Arrow (↓)
└── Zero Variance (Actual = Forecast): Neutral Symbol (—)
```

**Display Requirements:**
- Variance indicators accompany all actual vs. forecast comparisons
- Consistent symbol usage across all statistics displays
- Color coding aligns with variance direction (green up, red down, gray neutral)

**Precision Standards:**
- Percentage variances displayed to one decimal place
- Absolute values displayed with appropriate significant digits
- Rounding follows standard business rounding rules (0.5 rounds up)

#### 2.2 Accuracy Measurement Methodology

**Rule ID:** BR-STAT-004  
**Category:** Measurement Standards  
**Priority:** High  
**Status:** Active  
**Decision Date:** 2025-05-30  

**Business Rule:**
Forecast accuracy is measured by comparing actual results to forecast predictions across defined time periods and metrics.

**Accuracy Metrics:**
```
Primary Accuracy Measures:
├── Mean Absolute Percentage Error (MAPE)
├── Forecast Bias (average variance direction)
├── Forecast Precision (variance consistency)
└── Trend Accuracy (directional prediction quality)

Secondary Measures:
├── Seasonal Accuracy (seasonal pattern prediction)
├── Peak Period Accuracy (high-volume period prediction)
├── Low Period Accuracy (low-volume period prediction)
└── Overall Forecast Quality Score
```

**Time Period Analysis:**
- Daily forecast accuracy for operational planning
- Weekly forecast accuracy for tactical adjustments
- Monthly forecast accuracy for strategic planning
- Quarterly forecast accuracy for business planning

### 3. Data Integration Rules

#### 3.1 Actual Data Integration

**Rule ID:** BR-STAT-005  
**Category:** Data Integration  
**Priority:** High  
**Status:** Active  

**Business Rule:**
Actual data must be integrated from authoritative source systems and validated before use in variance calculations.

**Data Source Hierarchy:**
```
Actual Data Sources (Priority Order):
1. Operational Systems (primary source)
2. Financial Systems (validation source)
3. Manual Entry (exception handling only)
4. Estimated Values (clearly marked, temporary only)
```

**Data Quality Requirements:**
- Actual data must be complete for the comparison period
- Data validation rules prevent obviously erroneous values
- Missing data is clearly indicated and handled appropriately
- Data freshness requirements ensure timely variance analysis

**Integration Timing:**
- Real-time integration where operationally feasible
- Batch integration with defined refresh schedules
- Manual refresh capability for urgent analysis needs
- Clear indication of data freshness and last update times

#### 3.2 Forecast Data Consistency

**Rule ID:** BR-STAT-006  
**Category:** Data Consistency  
**Priority:** High  
**Status:** Active  

**Business Rule:**
Forecast data used in variance calculations must be the original forecast values from the time period being analyzed, not revised or updated forecasts.

**Version Control Requirements:**
- Historical forecast values preserved for accuracy analysis
- No retroactive forecast adjustments in variance calculations
- Clear versioning of forecast data with timestamps
- Audit trail of forecast changes and reasons

**Comparison Integrity:**
```
Forecast Comparison Standards:
├── Use original forecast from prediction date
├── No adjustments for known outcomes
├── Preserve forecast methodology context
└── Document any forecast revision reasons
```

### 4. Display and Presentation Rules

#### 4.1 Visual Hierarchy Standards

**Rule ID:** BR-STAT-007  
**Category:** Presentation Standards  
**Priority:** Medium  
**Status:** Active  

**Business Rule:**
Statistics displays must follow established visual hierarchy to prioritize forecast accuracy information over secondary metrics.

**Information Priority:**
```
Display Priority (High to Low):
1. Primary Variance (Actual vs. Forecast)
2. Variance Direction and Magnitude
3. Historical Trend Information
4. Supporting Context and Details
5. Navigation and Action Elements
```

**Content Organization:**
- Most critical variance information prominently displayed
- Supporting details available through progressive disclosure
- Consistent layout patterns across different statistic types
- Clear visual separation between different metric categories

#### 4.2 Context and Interpretation

**Rule ID:** BR-STAT-008  
**Category:** User Guidance  
**Priority:** Medium  
**Status:** Active  

**Business Rule:**
Statistics displays must provide sufficient context for users to interpret variance information and understand forecast accuracy implications.

**Contextual Information Requirements:**
- Time period clearly indicated for all comparisons
- Forecast methodology context available
- Historical performance context for trend analysis
- Seasonal or cyclical pattern context where relevant

**Interpretation Guidance:**
```
User Guidance Elements:
├── Variance significance indicators
├── Trend direction and stability
├── Seasonal adjustment context
├── Forecast confidence levels
└── Recommended actions based on variance patterns
```

### 5. Quality Assurance Rules

#### 5.1 Data Validation Standards

**Rule ID:** BR-STAT-009  
**Category:** Quality Assurance  
**Priority:** High  
**Status:** Active  

**Business Rule:**
All data used in statistics calculations must pass validation checks before display to ensure accuracy and reliability of variance analysis.

**Validation Checks:**
```
Data Validation Requirements:
├── Range Validation: Values within expected ranges
├── Consistency Validation: Data consistency across sources
├── Completeness Validation: Required data fields present
├── Timeliness Validation: Data freshness requirements met
└── Business Logic Validation: Values make business sense
```

**Error Handling:**
- Clear indication when data fails validation
- Graceful degradation when partial data available
- User notification of data quality issues
- Alternative analysis options when primary data unavailable

#### 5.2 Calculation Accuracy Standards

**Rule ID:** BR-STAT-010  
**Category:** Calculation Standards  
**Priority:** High  
**Status:** Active  

**Business Rule:**
All variance calculations must be mathematically accurate, consistently applied, and auditable for quality assurance purposes.

**Calculation Standards:**
- Standardized formulas across all variance calculations
- Consistent rounding and precision rules
- Documented calculation methodology
- Audit trail for all calculations

**Testing Requirements:**
```
Calculation Testing:
├── Unit Testing: Individual calculation functions
├── Integration Testing: End-to-end calculation flows
├── Regression Testing: Consistency across updates
├── User Acceptance Testing: Business logic validation
└── Performance Testing: Calculation speed and efficiency
```

## Business Decision Log

### Resolved Decisions

| Decision ID | Description | Resolution | Date | Authority |
|-------------|-------------|------------|------|-----------|
| BD-STAT-001 | Comparison baseline for variance calculations | Use forecast data, not budget | 2025-05-30 | Adam Suarez |
| BD-STAT-002 | Performance management scope | Exclude from forecasting statistics | 2025-05-30 | Adam Suarez |
| BD-STAT-003 | Variance indicator symbols | Use arrows instead of pyramids | 2025-05-30 | Team Decision |
| BD-STAT-004 | Calendar picker weekend visibility | Include weekend highlighting | 2025-05-30 | Account Manager Feedback |

### Implementation Status

| Rule ID | Implementation Status | Target Date | Notes |
|---------|----------------------|-------------|-------|
| BR-STAT-001 | In Development | Q3 2025 | Core comparison logic |
| BR-STAT-002 | Approved | Q3 2025 | System boundary definition |
| BR-STAT-003 | In Development | Q3 2025 | Arrow symbols pending prototype |
| BR-STAT-004 | Planning | Q4 2025 | Accuracy measurement framework |

## Compliance and Audit Requirements

### Accuracy Standards
- All variance calculations must be mathematically verifiable
- Forecast data integrity maintained through version control
- Actual data sourcing documented and validated
- Calculation methodology documented and consistent

### Performance Standards
- Statistics calculations complete within 3 seconds
- Data refresh cycles meet business timing requirements
- User interface response times under 1 second
- System availability during business hours 99.5%

### Documentation Standards
- All business rules documented with rationale
- Decision authority clearly identified
- Implementation requirements specified
- Testing and validation procedures defined

## Cross-References

### Related Documentation
- [Forecasting UI/UX Design Standards](20250723_Forecasting_UIDesign_UserExperienceStandards.md)
- [Forecasting Business Rules - Calculations and Validations](20250718_Forecasting_BusinessRules_CalculationsAndValidations.md)

### Integration Points
- **Legion System:** Performance management and scheduling
- **Budget System:** Budget data for non-statistics contexts
- **Operational Systems:** Actual data sources
- **Forecasting Engine:** Forecast generation and storage

## Glossary

| Term | Definition |
|------|------------|
| **Forecast Accuracy** | Measure of how closely forecast predictions match actual results |
| **Variance Analysis** | Comparison between actual and predicted values to assess forecast quality |
| **Performance Management** | Operational management of employee and system performance (excluded from statistics) |
| **Comparison Baseline** | Reference point used for variance calculations (forecast, not budget) |
| **Legion System** | External system handling performance management and scheduling |
| **MAPE** | Mean Absolute Percentage Error - statistical measure of forecast accuracy |

---

**Document History:**
- v1.0 (2025-07-23): Initial creation from backlog grooming session business decisions
- Source: Backlog Grooming meeting May 30, 2025
- Contributors: Adam Suarez, Jonathan Aulson, Michael Foy, Account Manager feedback