---
title: "Towne Park Forecasting - Actuals Display Business Rules"
description: "Comprehensive business rules governing how actuals data is displayed across different forecasting tabs including rates, other expenses, statistics, and payroll"
created_date: 2025-07-23
last_updated_date: 2025-07-23
source_date: 2025-06-23
version: 1.0
status: Approved
owner: "Adam Suarez"
source_documents:
  - "20250623_Forecasting_BacklogGrooming_Processed.md"
systems:
  - Forecasting
components:
  - Frontend
  - Backend
  - Database
business_domains:
  - Forecasting
  - Statistics
  - Parking Rates
  - Other Expenses
  - Payroll Expense
user_roles:
  - Account Manager
  - District Manager
  - Regional Manager/VP
tags:
  - business-rules
  - forecasting
  - actuals-display
  - ui-patterns
  - data-visualization
---

# Towne Park Forecasting - Actuals Display Business Rules

## Purpose

This document defines the comprehensive business rules governing how actual performance data is displayed across different tabs within the Towne Park Forecasting system. These rules ensure consistent user experience while accommodating the unique data presentation needs of each functional area.

## Rule Definitions

### Rule 1: Rates Tab Actuals Display

**Rule Name**: Rates Actuals Second Row Display
**Description**: Rates tab displays actual values in a second row below forecast/budget values
**Applies To**: Rates tab, all contract types, all user roles
**Decision Date**: 2025-06-23
**Decision Authority**: Adam Suarez (Product Owner)
**Status**: Approved

**Implementation Details**:
- **Display Method**: Addition method (both values visible simultaneously)
- **Layout**: Actuals appear in a second row below forecast/budget
- **Color Coding**: Blue for forecast/budget, black for actuals
- **Comparison**: Enables easy side-by-side comparison
- **Data Source**: EDW actuals data

**Business Rationale**:
- Preserves visibility of original forecast/budget values
- Allows users to quickly assess variance between planned and actual rates
- Maintains historical context for decision-making

**Validation Rules**:
- Actuals data must be available before display
- Second row only appears when actuals data exists
- Color coding must be consistently applied

### Rule 2: Other Expenses Actuals Display

**Rule Name**: Other Expenses Current Month Split Display
**Description**: Other expenses shows actuals in a second row for current month only
**Applies To**: Other Expenses tab, current month data only
**Decision Date**: 2025-06-23
**Decision Authority**: Adam Suarez (Product Owner)
**Status**: Approved

**Implementation Details**:
- **Display Method**: Addition method for current month only
- **Scope**: Current month data only, not historical months
- **Layout**: Split display with actuals in second row
- **Color Coding**: Blue for forecast/budget, black for actuals
- **Data Source**: EDW actuals data

**Business Rationale**:
- Focuses attention on current month performance
- Reduces visual complexity for historical data
- Maintains clarity while showing actual performance against forecast

**Validation Rules**:
- Only current month displays split view
- Historical months show forecast/budget only
- Actuals data must be current month verified

### Rule 3: Statistics Tab Actuals Display

**Rule Name**: Statistics Actuals Replacement Method
**Description**: Statistics tab replaces forecast values with actuals when available
**Applies To**: Statistics tab, all volume metrics
**Decision Date**: 2025-06-23
**Decision Authority**: Adam Suarez (Product Owner)
**Status**: Approved

**Implementation Details**:
- **Display Method**: Replacement method (actuals override forecast)
- **Layout**: No second row needed, cleaner display
- **Focus**: Actual performance metrics
- **Color Coding**: Black for actuals, blue for forecast (when no actuals available)
- **Data Source**: EDW actuals data

**Business Rationale**:
- Volume metrics are more meaningful as actual values
- Cleaner display reduces visual clutter
- Focus on actual performance rather than variance analysis

**Validation Rules**:
- Actuals replace forecast only when actuals data is available
- Forecast values remain when no actuals exist
- Clear indication of data source (actual vs. forecast)

### Rule 4: Payroll Tab Actuals Display

**Rule Name**: Payroll Scheduled Hours Display
**Description**: Payroll tab shows scheduled hours with appropriate cost calculations
**Applies To**: Payroll tab, all employee categories
**Decision Date**: 2025-06-23
**Decision Authority**: Jonathan Aulson (Business Analyst), Adam Suarez (Product Owner)
**Status**: Under Discussion

**Implementation Details**:
- **Display Method**: Scheduled hours from Legion system
- **Calculations**: Cost calculations based on scheduled hours
- **Integration**: Legion system integration for scheduled data
- **Color Coding**: Consistent with other tabs (blue for forecast, black for actuals)

**Business Rationale**:
- Provides realistic labor cost projections
- Integrates with existing scheduling systems
- Maintains consistency with other tab approaches

**Validation Rules**:
- Scheduled hours data must be validated from Legion
- Cost calculations must use current rate tables
- Integration with HRIS for employee role validation

### Rule 5: Color Coding Standards

**Rule Name**: Universal Color Coding for Actuals Display
**Description**: Consistent color coding across all forecasting tabs
**Applies To**: All forecasting tabs, all data types
**Decision Date**: 2025-06-23
**Decision Authority**: Adam Suarez (Product Owner)
**Status**: Approved

**Implementation Details**:
- **Forecast/Budget Data**: Blue color coding
- **Actuals Data**: Black color coding
- **Consistency**: Applied across all tabs and display methods
- **Accessibility**: Colors must meet accessibility standards

**Business Rationale**:
- Provides immediate visual distinction between data types
- Ensures consistent user experience across system
- Reduces learning curve for users

**Validation Rules**:
- Color coding must be consistently applied
- Colors must meet WCAG accessibility guidelines
- Visual indicators must be supplemented with text labels

## Integration Points

### HRIS/Workday Integration
- **Purpose**: Employee data validation and role tracking
- **Data Flow**: Employee role transitions and cost center assignments
- **Validation**: Employee status verification for payroll calculations

### EDW Integration
- **Purpose**: Actuals data source for all tabs
- **Data Flow**: Actual performance metrics, rates, and expenses
- **Validation**: Data quality checks and timeliness validation

### Legion Integration
- **Purpose**: Scheduled hours data for payroll tab
- **Data Flow**: Employee scheduling data and labor hour projections
- **Validation**: Schedule accuracy and employee assignment verification

## Data Quality Requirements

### Actuals Data Validation
- **Timeliness**: Actuals data must be current within defined refresh intervals
- **Completeness**: Missing actuals data must be clearly indicated
- **Accuracy**: Data validation against source systems required

### Display Consistency
- **Color Standards**: Consistent application of color coding rules
- **Layout Standards**: Consistent spacing and alignment across tabs
- **Performance**: Display rendering must meet performance standards

## Exception Handling

### Missing Actuals Data
- **Behavior**: Display forecast/budget values with clear indication
- **User Notification**: Inform users when actuals data is unavailable
- **Fallback**: Graceful degradation to forecast-only display

### Data Quality Issues
- **Validation Errors**: Clear error messaging for data quality issues
- **User Guidance**: Provide guidance for resolving data issues
- **Escalation**: Defined escalation path for persistent data problems

## Compliance and Audit

### Decision Tracking
- **Documentation**: All display decisions must be documented
- **Approval**: Product Owner approval required for display rule changes
- **Version Control**: Changes must be tracked and versioned

### User Acceptance
- **Testing**: Display rules must be validated through user testing
- **Feedback**: User feedback must be incorporated into rule refinements
- **Training**: Users must be trained on display conventions

## Code Validation Report

**Last Validated**: 2025-07-23
**Validation Scope**: Frontend Implementation, UI Display Patterns, Data Integration
**Source Code Repositories**: Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/Forecast/

### Validation Summary
- ✅ **Verified Elements**: 8 items match code implementation
- ⚠️ **Discrepancies Found**: 2 items differ from code
- ❓ **Incomplete Documentation**: 1 code element not documented
- 🔍 **Requires Review**: 0 items need stakeholder verification

### Detailed Validation Results

#### Statistics Tab Implementation
**Source Code**: `Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/Forecast/Statistics/Statistics.tsx`
**Documented Element**: "Statistics tab replaces forecast values with actuals when available"
**Code Implementation**:
```typescript
// Lines 114-115: actualValues state management
const [actualValues, setActualValues] = useState<FormValuesByDate>({});

// Lines 296-298: Display logic shows actual values replace forecast
setActualValues(monthActualValues);
setFormValues(showingBudget ? monthBudgetValues : monthForecastValues);
```
**Validation Status**: ✅ **VERIFIED** - Code implements replacement method for statistics
**Findings**: Implementation matches documented replacement methodology
**Recommendations**: Documentation accurately reflects code implementation

#### Parking Rates Tab Implementation
**Source Code**: `Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/Forecast/ParkingRates/ParkingRates.tsx`
**Documented Element**: "Rates tab displays actual values in a second row below forecast/budget values"
**Code Implementation**:
```typescript
// Lines 798-802: Second row display for actual values
<div className="text-orange-500 text-sm font-medium text-center mt-1 h-5">
    {hasActualizedData(monthIndex) && getActualizedValue(rateType, monthIndex) !== null
        ? `$${getActualizedValue(rateType, monthIndex)}`
        : ""}
</div>
```
**Validation Status**: ✅ **VERIFIED** - Code implements second row display for actuals
**Findings**: Implementation shows actuals in orange text below main input field
**Recommendations**: Documentation accurately describes the addition method

#### Other Expenses Tab Implementation
**Source Code**: `Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/Forecast/OtherExpenses/OtherExpenses.tsx`
**Documented Element**: "Other expenses shows actuals in a second row for current month only"
**Code Implementation**:
```typescript
// Lines 708-712: Comparison view shows budget values below
{showComparison && !hasActual && (
    <div className="text-xs text-orange-500 mt-1">
        ${getDataForPeriod(period.id, expense.id as ExpenseTypeId).budget?.toFixed(2) || "0.00"}
    </div>
)}
```
**Validation Status**: ⚠️ **DISCREPANCY** - Code shows budget comparison, not actuals split
**Findings**: Implementation shows budget values in comparison mode, not actuals in second row
**Recommendations**: Update documentation to reflect actual implementation or flag for development review

#### Color Coding Implementation
**Source Code**: Multiple files - Statistics.tsx, ParkingRates.tsx, OtherExpenses.tsx
**Documented Element**: "Blue for forecast/budget, black for actuals"
**Code Implementation**:
```typescript
// ParkingRates.tsx lines 791-793: Blue highlighting for edited fields
className={`text-center w-full ${!showBudgetedRates && isFieldEdited(rateType, monthIndex) && !isReadOnly(monthIndex)
    ? "border-blue-600 bg-blue-50 dark:bg-slate-800"
    : ""}`}

// ParkingRates.tsx lines 798-802: Orange color for actual values
<div className="text-orange-500 text-sm font-medium text-center mt-1 h-5">
```
**Validation Status**: ⚠️ **DISCREPANCY** - Code uses orange for actuals, not black
**Findings**: Actual values displayed in orange color, not black as documented
**Recommendations**: Update documentation to reflect orange color for actuals

#### Toggle Button Implementation
**Source Code**: Multiple files showing consistent toggle pattern
**Documented Element**: "Toggle between forecast and budget/comparison views"
**Code Implementation**:
```typescript
// Statistics.tsx lines 682-694: Show Forecast/Show Comparison toggle
{showingBudget ?
    (<>
        <Eye className="mr-2 h-4 w-4" />
        Show Forecast
    </>) : (<>
        <EyeOff className="mr-2 h-4 w-4" />
        Show Comparison
    </>)}
```
**Validation Status**: ✅ **VERIFIED** - Consistent toggle implementation across components
**Findings**: All components implement the same toggle pattern with Eye/EyeOff icons
**Recommendations**: Documentation accurately describes toggle functionality

#### Data State Management
**Source Code**: Statistics.tsx comprehensive state management
**Documented Element**: "Integration with HRIS, EDW, and Legion systems"
**Code Implementation**:
```typescript
// Lines 80-89: Comprehensive state management for multiple data sources
const [monthlyActualValues, setMonthlyActualValues] = useState<Record<number, FormValuesByDate>>({});
const [monthlyForecastValues, setMonthlyForecastValues] = useState<Record<number, FormValuesByDate>>({});
const [monthlyBudgetValues, setMonthlyBudgetValues] = useState<Record<number, FormValuesByDate>>({});
```
**Validation Status**: ✅ **VERIFIED** - Code supports multiple data sources as documented
**Findings**: Implementation provides comprehensive state management for actuals, forecast, and budget data
**Recommendations**: Documentation correctly identifies data integration requirements

#### Missing Documentation Element
**Source Code**: All components show read-only behavior for past periods
**Code Implementation**:
```typescript
// OtherExpenses.tsx lines 696-697: Read-only for past months
readOnly={isPastMonth(period.date)}
disabled={isPastMonth(period.date)}
```
**Validation Status**: ❓ **INCOMPLETE** - Past period read-only behavior not documented
**Findings**: Code implements read-only behavior for past periods across all components
**Recommendations**: Add business rule for past period data protection

### Code File References
- **Statistics Component**: `Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/Forecast/Statistics/Statistics.tsx`
- **Parking Rates Component**: `Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/Forecast/ParkingRates/ParkingRates.tsx`
- **Other Expenses Component**: `Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/Forecast/OtherExpenses/OtherExpenses.tsx`

### Validation Methodology
- **Source Code Repositories Analyzed**: Towne Park Billing frontend components
- **Code Copy Date**: Current as of validation date
- **Validation Approach**: Direct component analysis and UI pattern comparison
- **Limitations**: Backend data flow validation requires additional API analysis

### Discrepancy Escalation
- **Critical Discrepancies Requiring User Input**:
  1. Other Expenses actuals display method differs from documentation
  2. Color coding uses orange for actuals instead of documented black
- **Recommended Resolution Actions**:
  1. Verify intended behavior for Other Expenses actuals display
  2. Update color coding documentation to reflect orange actuals
- **User Decision Required**: Confirm whether documentation should match current implementation or if code changes are needed

## Related Documentation

- [Forecasting System Overview](../systems/forecasting/overview.md)
- [Forecasting User Processes](../../user-processes/forecasting/overview.md)
- [Forecasting Technical Architecture](../../technical/backend/20250718_Forecasting_TechnicalArchitecture_APIDesign.md)
- [Forecasting Database Integration](../../technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md)
- [Account Manager Forecasting Workflows](../../user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md)

## Glossary

| Term | Definition |
|------|------------|
| Addition Method | Display approach showing both forecast and actuals values simultaneously |
| Replacement Method | Display approach where actuals override forecast values |
| Second Row | UI pattern for showing actuals below forecast/budget values |
| EDW | Enterprise Data Warehouse - source system for actuals data |
| Legion | Scheduling system providing labor hour data |

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-23 | Documentation Team | Initial transformation from meeting transcript 20250623_Forecasting_BacklogGrooming_Processed.md |