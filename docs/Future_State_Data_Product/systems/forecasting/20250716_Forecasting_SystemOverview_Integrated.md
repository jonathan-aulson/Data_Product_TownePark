---
title: "Towne Park Forecasting System - Integrated Overview"
description: "Comprehensive overview of Towne Park's integrated forecasting system built within the PowerBill ecosystem"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-05-13
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "20250513_Master - General_Info.md"
systems:
  - Forecasting
  - Billing
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Revenue Forecasting
  - Payroll Management
  - Financial Planning
  - Operational Management
user_roles:
  - Account Manager
  - District Manager
  - Regional Manager
  - Finance Team
tags:
  - forecasting
  - financial-planning
  - overview
  - system-architecture
  - account-managers
---

# Towne Park Forecasting System - Integrated Overview

## Purpose & Scope

The Towne Park Forecasting System is an integrated module within the PowerBill ecosystem designed to provide approximately 800 field-facing Account Managers (AMs) and operational leadership with comprehensive forecasting capabilities. The system addresses critical forecasting challenges by providing a "one-stop-shop" that integrates actuals (especially payroll from "Leads") and forecast inputs in near real-time, replacing disparate Excel workbooks and manual processes with automated, accurate, and scalable forecasting tools.

## Business Context

### Legacy Forecasting Challenges

The forecasting system addresses specific pain points identified through user interviews with Account Managers:

**Data Silos & Delays:**
- AMs previously had to pull data from multiple systems:
  - "Leads" for payroll actuals
  - Power BI for revenue actuals
  - Old revenue workbooks for historical data (up to 5+ years)
- Significant data lags (e.g., payroll actuals taking days to update)
- Prevented real-time analysis and reaction to operational changes

**Rate Inflexibility:**
- Monthly average rates in Excel made it difficult to accurately forecast for groups with discounted daily rates
- Required manual workarounds (e.g., adjusting comp vehicle counts)
- Limited ability to handle complex pricing scenarios

**Transient Business Predictability:**
- Difficulty in accurately predicting transient business drive-in ratios
- Especially challenging for events or holidays
- Impacted staffing decisions and operational efficiency

**Group vs. Transient Data Separation:**
- Inability to easily separate and forecast group vs. transient business
- Different business segments have distinct drivers and behaviors
- Required separate analysis approaches that were difficult to implement in Excel

## Key Features & Functionality

### Core Forecasting Objectives
- **Integrated Data Access**: Provide single interface for actuals and forecast inputs
- **Improved Forecast Accuracy**: Enable granular inputs (group vs. transient occupancy/drive-in, daily rate adjustments)
- **Manual Effort Reduction**: Eliminate reliance on disparate Excel workbooks and reports
- **Budget Comparison**: Enable quick comparison against budget and previous forecasts
- **Flexible Time Granularity**: Support daily, weekly, monthly, quarterly data entry and viewing
- **Real-time P&L Visibility**: Show how inputs affect P&L in real-time

### Target User Base
- **Primary Users**: ~800 field-facing Account Managers
- **Secondary Users**: Operational and financial leadership
- **Access Model**: Site-specific access for AMs (only their assigned sites)

### Data Input Capabilities

**Occupancy Data:**
- Overall percentage and daily breakdown for month-of forecasting
- Group calendars for block bookings
- Detailed daily forecasts from hotels (typically received around 15th of prior month)

**Historical Data Integration:**
- Access to old revenue workbooks (up to 5+ years) for recurring group performance analysis
- Drive-in ratio historical patterns
- Valet capture rate trends

**Rate Management:**
- Parking rates with daily input capability (user-requested feature)
- Payroll rates (migrated from legacy 'Rates' tab to new system management)
- Dynamic rate application for different customer segments

**Payroll Actuals Integration:**
- Real-time data from "Leads" scheduling system
- Critical for near real-time forecast updates
- Enables comparison of planned vs. actual staffing

**Budget Data Integration:**
- Used to initialize first draft of forecasts in new system
- Provides baseline for variance analysis
- Supports budget vs. forecast comparisons

**Other Expenses:**
- Based on categories from legacy 'Other Expenses' tab
- Comprehensive expense forecasting capabilities

## Technical Architecture

### Integration with PowerBill Ecosystem
The forecasting system is built as an integrated module within the PowerBill ecosystem, leveraging the same core architecture:

**Frontend Architecture:**
- React front-end via Azure Static Web Apps (SWA)
- Integrated user interface within main PowerBill application
- Consistent user experience across billing and forecasting functions

**Backend Services:**
- Dataverse backend for data storage and business logic
- Azure Functions for complex calculations and data processing
- Power Automate for workflow automation and data integration

**Data Storage:**
- Microsoft Dataverse as primary data repository
- Shared data model with billing system for seamless integration
- Historical data preservation and accessibility

### User Interface Design

**Forecast Section Integration:**
- Embedded within main PowerBill application
- Seamless navigation between billing and forecasting functions
- Consistent design language and user experience

**Site Selection:**
- Account Managers see only their assigned sites
- Role-based access control implementation
- Scalable to support 800+ users with site-specific permissions

**Period Selection:**
- Past periods: Read-only access for historical analysis
- Future periods: Editable for forecasting input
- Flexible time period navigation

**Statistics Input Interface:**
- Similar to legacy workbook interface for user familiarity
- Minimal direct inputs required
- Many values auto-calculated based on key drivers

**Payroll Input Integration:**
- Legion scheduled/actuals displayed alongside forecast input fields
- Support for both hours and cost input methods
- Real-time comparison capabilities

**Time Granularity Controls:**
- Ability to view and edit at different time granularities
- Daily, weekly, monthly, quarterly aggregation
- Flexible data entry and analysis capabilities

**Data Filtering:**
- Contract type filtering
- Business segment filtering (group vs. transient)
- Customizable data slicing capabilities

## Core Forecasting Logic & Features

### Statistics Input & Calculation
**Key Driver Inputs:**
- Occupancy percentage
- Drive-In Ratio
- Valet Capture rate

**Auto-Calculated Derived Values:**
- Vehicle volumes based on occupancy and drive-in ratios
- Revenue calculations based on rates and volumes
- Automated statistical relationships

### Rate Application Logic
**Parking Rates:**
- Daily rate application capability
- Support for group discounts and special pricing
- Flexible rate structures for different customer segments

**Payroll Rates:**
- Integration with current payroll rate structures
- Automatic application to forecasted hours
- Support for different job codes and pay scales

### Group vs. Transient Forecasting
**Separate Segment Analysis:**
- Strong user requirement for separate forecasting
- Different behavioral patterns and drivers
- Distinct revenue and operational characteristics

**Segment-Specific Logic:**
- Group business: Block bookings, contracted rates, predictable patterns
- Transient business: Variable demand, standard rates, seasonal patterns
- Separate calculation engines for each segment

### Payroll Forecasting Logic
**GSC (Guest Service Coordinator) Hours:**
- Consistent planning approach
- Adjustments based on actual schedules from "Leads"
- Baseline staffing requirements

**GSA (Guest Service Associate) Hours:**
- Flexible based on arrivals/departures
- Productivity targets (Payroll as % of Revenue)
- Dynamic staffing optimization

### Verification & Analysis Capabilities
**Forecast Comparison:**
- Compare forecast to original commitment
- Budget variance analysis
- Previous forecast comparison

**Real-time P&L Updates:**
- Immediate visibility of how inputs affect P&L line items
- Dynamic calculation updates
- Comprehensive financial impact analysis

**Data Aggregation:**
- Daily inputs automatically roll up to weekly, monthly, quarterly, and annual views
- Flexible reporting and analysis capabilities
- Hierarchical data organization

## Data Sources & Integration Points

### Primary Data Sources
**"Leads" Scheduling System:**
- Actual payroll hours (critical for forecasting accuracy)
- Scheduled vs. actual comparison
- Real-time staffing data

**Hotel Systems:**
- Occupancy forecasts and actuals
- Group booking calendars
- Daily operational data

**Historical Revenue Workbooks:**
- Legacy data for trend analysis
- Recurring group performance patterns
- Long-term historical context (5+ years)

**Budget Systems:**
- Budget data for baseline forecasting
- Variance analysis capabilities
- Financial planning integration

### Legacy Data Integration
**Revenue Spreadsheet (RSS) Process:**
- Transitional data source during migration
- Historical data preservation
- Gradual phase-out as system matures

**Excel Workbook Migration:**
- Preservation of historical analysis capabilities
- User-familiar data structures
- Smooth transition from legacy processes

## Business Impact & User Benefits

### Operational Efficiency Improvements
**Real-time Data Access:**
- Elimination of data lag issues
- Immediate access to payroll actuals
- Faster decision-making capabilities

**Reduced Manual Effort:**
- Elimination of multiple system data pulls
- Automated calculations and aggregations
- Streamlined forecasting workflows

**Improved Accuracy:**
- Granular input capabilities
- Separate group vs. transient analysis
- Daily rate adjustment capabilities

### Strategic Benefits
**Enhanced Decision Making:**
- Real-time P&L impact visibility
- Comprehensive variance analysis
- Improved operational planning

**Scalability:**
- Support for 800+ Account Managers
- Site-specific access controls
- Consistent user experience across locations

**Integration Benefits:**
- Seamless connection with billing operations
- Shared data model with PowerBill
- Unified financial management platform

## Current Implementation Status

### Development Progress
- Built as integrated module within PowerBill ecosystem
- Leverages established technical architecture
- User interface design based on legacy workbook familiarity

### User Adoption Strategy
- Gradual migration from Excel-based processes
- Training and support for 800+ Account Managers
- Site-specific rollout approach

### Integration Completion
- "Leads" system integration for payroll actuals
- Budget data integration for baseline forecasting
- Historical data preservation and accessibility

## Future Enhancements

### Planned Capabilities
- Enhanced group vs. transient separation
- Advanced analytics and trend analysis
- Mobile access for field users
- Automated forecasting suggestions based on historical patterns

### Integration Expansions
- Additional hotel system integrations
- Enhanced budget system connectivity
- Advanced reporting and dashboard capabilities

## Related Documentation

- [Towne Park Billing System Overview](../billing/overview.md) ✓ VERIFIED
- [Forecasting Data Sources Technical Specification](../../technical/database/forecasting-data-sources.md) ✓ VERIFIED
- [Account Manager Forecasting Process](../../user-processes/account-manager/forecasting-workflow.md) ✓ VERIFIED
- [Forecasting Business Rules](../../business-rules/forecasting/overview.md) ✓ VERIFIED
- [Payroll Integration Specification](../../technical/integrations/leads-integration.md) ✓ VERIFIED
- [Budget Data Integration](../../technical/integrations/budget-integration.md) ✓ VERIFIED
- [Group vs Transient Business Rules](../../business-rules/forecasting/group-transient-logic.md) ✓ VERIFIED

## Glossary References

- **AM**: Account Manager
- **GSA**: Guest Service Associate
- **GSC**: Guest Service Coordinator
- **"Leads"**: Scheduling system for payroll actuals
- **P&L**: Profit and Loss
- **RSS**: Revenue Spreadsheet (legacy)
- **SWA**: Static Web App (Azure service)
## Quick Links

- [Towne Park Billing System Overview](../billing/overview.md)
- [Forecasting Data Sources Technical Specification](../../technical/database/forecasting-data-sources.md)
- [Account Manager Forecasting Process](../../user-processes/account-manager/forecasting-workflow.md)
- [Forecasting Business Rules](../../business-rules/forecasting/overview.md)
- [Payroll Integration Specification](../../technical/integrations/leads-integration.md)
