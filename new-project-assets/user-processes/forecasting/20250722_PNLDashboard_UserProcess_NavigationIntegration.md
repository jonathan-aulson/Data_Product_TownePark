---
title: "P&L Dashboard Navigation Integration - User Process Guide"
description: "User process guide for P&L dashboard integration with forecasting system including navigation improvements, context retention, and performance optimization for User Story 2413"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-22
version: 1.0
status: Draft
owner: "Christopher Thompson"
source_documents:
  - "20250722_Dev_demo_userStory2413.docx"
systems:
  - Forecasting
  - P&L Dashboard
  - Navigation System
components:
  - P&L View Integration
  - Context Management
  - Tab Navigation
business_domains:
  - Financial Analysis
  - User Experience
  - System Navigation
user_roles:
  - Account Manager
  - Finance User
  - District Manager
tags:
  - pnl-dashboard
  - navigation
  - context-retention
  - user-experience
  - forecasting-integration
---

# P&L Dashboard Navigation Integration - User Process Guide

## Demo Overview

**Date**: July 22, 2025  
**Duration**: ~20 minutes  
**Demo Type**: Development Demo - User Story 2413  
**Participants**: Jonathan Aulson, Christopher Thompson, Andrew Scheuer  
**User Story**: P&L Dashboard Integration with Context Retention

## Feature Summary

### New Functionality Delivered
The P&L dashboard integration introduces seamless navigation between forecasting and P&L views while maintaining user context and improving overall system usability.

### Key Enhancements
- **Header Navigation**: New P&L view link added to top navigation
- **Tab Renaming**: Updated forecast tab names for clarity
- **Context Retention**: Maintains selected site, time period, and active tab when switching views
- **Performance Optimization**: Identified and planned calculator refactoring improvements

## User Interface Changes

### Navigation Enhancements

#### New P&L View Link
- **Location**: Top navigation header
- **Access Control**: Same role-based permissions as forecasting system
- **Functionality**: Direct access to P&L dashboard from any page

#### Updated Tab Names
The forecast page tabs have been renamed for improved clarity:

| Previous Name | New Name | Purpose |
|---------------|----------|---------|
| Statistics | Parking Stats | Vehicle and parking statistics |
| Payroll | Payroll Expense | Payroll cost analysis |
| Rates | Parking Rates | Rate management and forecasting |
| Other Expense | Other Expense | *(No change)* |
| Other Revenue | Other Revenue | *(No change)* |

### Context Retention System

#### Maintained Context Elements
When navigating between forecast and P&L views, the system preserves:

1. **Selected Site**: Current site selection carries over
2. **Time Period**: Active date range maintained
3. **Active Tab**: Last viewed tab remembered
4. **Filter Settings**: Applied filters persist across views

#### Navigation Behavior
- **From Forecast to P&L**: All context maintained
- **From P&L to Forecast**: Returns to previous state
- **Cross-Navigation**: Seamless switching without data loss

## User Workflows

### Primary Navigation Workflow

#### Scenario 1: Forecast-First Navigation
1. **User Action**: Select site and time period in forecasting
2. **User Action**: Navigate to specific forecast tab (e.g., Parking Stats)
3. **User Action**: Click P&L view link in header
4. **System Response**: P&L opens with same site and time period
5. **User Action**: Return to forecasting
6. **System Response**: Returns to previously selected tab with all context intact

#### Scenario 2: Direct P&L Access
1. **User Action**: Access P&L view directly from top navigation
2. **System Response**: P&L opens with default settings
3. **User Action**: Navigate to forecasting
4. **System Response**: Forecasting opens with default context

### Advanced Navigation Features

#### Filter Consistency
- **Site Selector**: Acts as global filter across both views
- **Year Selection**: Carries over between forecast and P&L views
- **Date Range**: Maintains consistency across navigation

#### Role-Based Access
- **Account Manager**: Full access to both forecast and P&L views
- **Finance User**: Can set forecasts and access P&L with maintained context
- **District Manager**: Multi-site access with context preservation

## Performance Considerations

### Current Performance Issues

#### Management Agreement Calculator Bottleneck
- **Issue**: Synchronous processing causing delays
- **Impact**: Single site loading takes excessive time
- **Root Cause**: Calculators waiting for sequential completion

#### Identified Improvements
- **Parallel Processing**: Run sites concurrently instead of sequentially
- **Asynchronous Architecture**: Refactor calculator execution model
- **Timeout Prevention**: Implement non-blocking operations

### Performance Optimization Strategy

#### Immediate Actions
1. **Calculator Refactoring**: Convert to asynchronous processing
2. **Parallel Execution**: Enable concurrent site processing
3. **Performance Monitoring**: Add logging to identify bottlenecks

#### Expected Benefits
- **Reduced Load Times**: Significant improvement in P&L view loading
- **Better User Experience**: Eliminate timeout issues
- **Scalability**: Support for larger data sets

## Known Issues and Resolutions

### Current Issues

#### Issue 1: Top Navigation Filter Inconsistency
- **Problem**: Using P&L link from top navigation doesn't maintain site filters
- **Expected Behavior**: Should apply current site selection from forecast
- **Status**: Identified for immediate fix

#### Issue 2: Year Selection Not Carried Over
- **Problem**: Year selection in forecasts doesn't transfer to P&L view
- **Example**: Selecting 2024 in forecast, P&L defaults to 2025
- **Status**: Added to current task for resolution

#### Issue 3: Performance Degradation
- **Problem**: P&L view loading slowly with larger data sets
- **Root Cause**: Synchronous management agreement calculators
- **Status**: Refactoring planned before pilot release

### Resolution Plan

#### Immediate Fixes (Current Sprint)
1. **Global Filter Implementation**: Create shared filter state
2. **Year Selection Persistence**: Ensure year carries over between views
3. **Navigation Consistency**: Fix top navigation to maintain context

#### Performance Improvements (Before Pilot)
1. **Calculator Refactoring**: Implement asynchronous processing
2. **Parallel Processing**: Enable concurrent site calculations
3. **Monitoring**: Add performance logging and metrics

## User Training Considerations

### Key Training Points

#### Navigation Training
- **New P&L Link**: Location and access in top navigation
- **Context Retention**: Understanding how selections persist
- **Tab Navigation**: Updated tab names and functionality

#### Performance Expectations
- **Loading Times**: Initial load may take time, improvements coming
- **Best Practices**: Optimal navigation patterns for efficiency
- **Troubleshooting**: What to do if performance issues occur

### User Communication
- **Feature Announcement**: Communicate new navigation capabilities
- **Performance Notice**: Set expectations about current performance
- **Improvement Timeline**: Share planned optimization schedule

## Testing and Validation

### User Acceptance Testing

#### Test Scenarios
1. **Context Retention**: Verify all context elements persist across navigation
2. **Filter Consistency**: Confirm site and year selections carry over
3. **Performance**: Test with production-scale data
4. **Role-Based Access**: Validate permissions work correctly

#### Success Criteria
- ✅ Context maintained across all navigation paths
- ✅ Filter settings persist correctly
- ✅ Performance meets acceptable thresholds
- ✅ Role-based access functions properly

### Pre-Pilot Validation
- **Performance Testing**: Validate calculator improvements
- **User Testing**: Confirm navigation improvements work as expected
- **Integration Testing**: Verify P&L and forecast integration

## Implementation Timeline

### Current Sprint Completion
- **Navigation Fixes**: Complete filter and year selection issues
- **Performance Planning**: Finalize calculator refactoring approach
- **Testing**: Validate current functionality

### Pre-Pilot Implementation
- **Calculator Refactoring**: Implement asynchronous processing
- **Performance Optimization**: Deploy parallel processing improvements
- **Final Testing**: Complete user acceptance testing

## Related Documentation

- [P&L Dashboard Technical Specifications](../../technical/frontend/)
- [Forecasting System Navigation](../forecasting/)
- [Performance Optimization Guidelines](../../technical/operations/)
- [User Role Management](../../configuration/user-access/)

## Success Metrics

### User Experience Metrics
- **Navigation Efficiency**: Reduced clicks to access P&L data
- **Context Preservation**: 100% retention of user selections
- **User Satisfaction**: Improved workflow efficiency ratings

### Performance Metrics
- **Load Time Reduction**: Target 50% improvement in P&L loading
- **Timeout Elimination**: Zero timeout errors in production
- **Concurrent Processing**: Support for parallel site calculations

## Next Steps

### Immediate Actions
1. **Fix Navigation Issues**: Complete filter and year selection fixes
2. **Performance Refactoring**: Implement calculator improvements
3. **User Testing**: Conduct final validation before pilot

### Future Enhancements
1. **Advanced Context**: Expand context retention to additional elements
2. **Performance Monitoring**: Implement real-time performance dashboards
3. **User Customization**: Allow users to customize navigation preferences