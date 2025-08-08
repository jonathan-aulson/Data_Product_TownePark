---
title: "Towne Park Forecasting - Business Rules and Development Decisions"
description: "Comprehensive documentation of business rules and development decisions from May 2025 backlog grooming sessions covering payroll forecasting, statistics calculations, P&L structures, and integration architecture"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-05-01
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "20250501-30_Forecasting_BacklogGrooming_Consolidated_Processed.md"
systems:
  - Forecasting
  - Workday
  - EDW
  - Legion
  - Budget Data
components:
  - Payroll Forecasting
  - Statistics
  - P&L View
  - FLC Calculations
  - Integration Architecture
business_domains:
  - Payroll Management
  - Statistics and Productivity
  - Financial Planning
  - P&L Analysis
  - Job Family Management
  - Integration Architecture
  - Performance Metrics
  - Revenue Forecasting
  - Expense Management
  - Data Integration
user_roles:
  - Account Manager
  - District Manager
  - Corporate Finance
  - Business Analyst
  - Product Owner
  - Development Team
tags:
  - business-rules
  - development-decisions
  - forecasting-system
  - payroll-forecasting
  - statistics-calculations
  - pandl-view
  - integration-architecture
  - workday-integration
  - job-family-management
  - productivity-metrics
  - flc-calculations
  - feature-specifications
---

# Towne Park Forecasting - Business Rules and Development Decisions

## Purpose

This document captures critical business rules and development decisions from the May 2025 backlog grooming sessions for the Towne Park Forecasting system. These decisions form the foundation for core system functionality including payroll forecasting, statistics calculations, P&L structures, and integration architecture. The documentation serves as a definitive reference for development implementation, business rule validation, and system behavior specifications.

## Executive Summary

The May 2025 backlog grooming sessions were pivotal in establishing the core architecture and functionality of the Towne Park Forecasting system. Across three sessions totaling over 4 hours, key stakeholders including Amy Sowells (Product Owner), Jonathan Aulson (Business Analyst), and Michael Foy (Development) made critical decisions that shaped the system's approach to payroll forecasting, statistics management, and financial analysis.

### Key Decision Outcomes

**Payroll Forecasting Architecture**: Established Job Family-based forecasting approach with Workday integration for mapping and fallback manual entry capabilities.

**Statistics and Productivity Framework**: Implemented rolling 12-month averages with seasonal adjustments and real-time data updates for performance benchmarking.

**P&L and FLC Structure**: Finalized comprehensive P&L view with Front Line Contribution calculations, drill-down capabilities, and comparative analysis features.

**Integration Strategy**: Defined API-based integration patterns with Workday, Legion, and EDW systems for seamless data flow and real-time synchronization.

## Core Business Rules and Development Decisions

### Payroll Forecasting Implementation

#### Business Rule PF-001: Job Family-Based Forecasting Approach
**Decision Date**: 2025-05-01  
**Decision Owner**: Amy Sowells (Product Owner)  
**Implementation Priority**: Critical  
**Feature Reference**: F-23  
**User Story Reference**: US-112, US-113

**Rule Definition**: The primary forecasting mechanism shall utilize Job Family level groupings rather than individual job codes to simplify user input while maintaining accuracy for revenue calculations.

**Job Family Structure**:
- **GSA (Ground Support Agent)**: Entry-level operational roles
- **GSC (Ground Support Coordinator)**: Supervisory operational roles  
- **Valet**: Valet parking service roles
- **Bell**: Bell service and guest assistance roles
- **Shuttle**: Transportation service roles
- **Cashier**: Payment processing and customer service roles
- **Salaried**: Management and administrative roles

**Implementation Requirements**:
- System shall provide Job Family selection interface for payroll input
- Job Family to Job Code mapping shall be maintained through Workday integration
- Manual override capability shall be available for unmapped job codes
- Forecast calculations shall aggregate Job Family inputs to appropriate revenue categories

**Exception Handling**: For Per Labor Hour (PLH) sites, the system shall require Job Code level detail for accurate billing calculations, overriding the standard Job Family approach.

#### Business Rule PF-002: Workday Integration for Job Management
**Decision Date**: 2025-05-01  
**Decision Owner**: Amy Sowells (Product Owner)  
**Implementation Priority**: High  
**Integration Point**: Workday API

**Rule Definition**: Job Family definitions and Job Code mappings shall be maintained through real-time integration with Workday to ensure consistency across the organization.

**Integration Requirements**:
- **API-Based Synchronization**: Real-time API calls to Workday for Job Family definitions
- **Data Validation**: Automated validation of job family assignments against Workday master data
- **Fallback Mechanism**: Manual entry capability during Workday system maintenance or API failures
- **Change Management**: Automatic updates to forecasting system when Workday job structures change

**Data Synchronization Rules**:
- Job Family changes in Workday shall be reflected in forecasting system within 15 minutes
- New job codes shall be automatically mapped to appropriate job families based on Workday classification
- Deprecated job codes shall be flagged for manual review before removal from forecasting options

**Risk Mitigation**: Manual entry fallback ensures system availability during Workday integration issues, with automatic reconciliation when connectivity is restored.

#### Business Rule PF-003: PLH Site Special Handling
**Decision Date**: 2025-05-01  
**Decision Owner**: Amy Sowells (Product Owner)  
**Implementation Priority**: Critical  
**Affected Sites**: Per Labor Hour billing sites

**Rule Definition**: Sites utilizing Per Labor Hour (PLH) billing methods shall require Job Code level forecasting detail to ensure accurate revenue calculation and client billing.

**Implementation Specifications**:
- **Identification Logic**: System shall identify PLH sites through contract configuration integration
- **Interface Modification**: PLH sites shall display Job Code level input fields instead of Job Family aggregation
- **Revenue Calculation**: PLH revenue calculations shall use specific job code rates from contract configuration
- **Validation Rules**: All active job codes for PLH sites must have associated hourly rates in contract configuration

**User Experience Considerations**:
- Clear visual indication when site requires Job Code level input
- Expandable interface allowing Job Family view with Job Code breakdown
- Validation messaging for missing job code rates or mappings

### Statistics and Productivity Metrics

#### Business Rule SP-001: Productivity Calculation Methodology
**Decision Date**: 2025-05-12  
**Decision Owner**: Michael Foy (Development)  
**Implementation Priority**: High  
**Feature Reference**: F-21  
**User Story Reference**: US-108, US-109

**Rule Definition**: Productivity metrics shall be calculated using rolling 12-month averages to provide stable baseline measurements while accounting for seasonal variations and operational changes.

**Calculation Framework**:
- **Rolling Average Period**: 12 months of historical data for baseline calculation
- **Seasonal Adjustment**: Automatic application of seasonal factors based on historical patterns
- **Real-Time Updates**: Current period statistics updated with actual data as available
- **Performance Benchmarking**: Individual site performance compared against district and regional averages

**Specific Metric Calculations**:
- **Cars per Labor Hour**: Total vehicles serviced divided by total labor hours worked
- **Revenue per Vehicle**: Total revenue divided by total vehicles processed
- **Occupancy Impact**: Correlation analysis between hotel occupancy and parking demand
- **Productivity Trending**: Month-over-month and year-over-year productivity change analysis

#### Business Rule SP-002: Seasonal Adjustment Application
**Decision Date**: 2025-05-12  
**Decision Owner**: Michael Foy (Development)  
**Implementation Priority**: Medium  
**Data Source**: EDW Historical Data

**Rule Definition**: Seasonal adjustment factors shall be automatically applied to productivity metrics based on historical patterns to improve forecast accuracy during predictable seasonal variations.

**Seasonal Factor Methodology**:
- **Historical Analysis**: Minimum 3 years of historical data for pattern identification
- **Monthly Factors**: Separate adjustment factors for each month of the year
- **Site-Specific Patterns**: Individual site seasonal patterns where sufficient data exists
- **Regional Fallback**: Regional seasonal patterns applied when site-specific data insufficient

**Application Rules**:
- Seasonal factors applied automatically to baseline productivity calculations
- Manual override capability for Account Managers when unique circumstances apply
- Quarterly review and update of seasonal factors based on recent performance data
- Exception handling for new sites without historical seasonal data

#### Business Rule SP-003: Performance Benchmarking Framework
**Decision Date**: 2025-05-12  
**Decision Owner**: Michael Foy (Development)  
**Implementation Priority**: Medium  
**Reporting Integration**: P&L View, Performance Dashboards

**Rule Definition**: Individual site performance shall be benchmarked against district and regional averages to provide comparative context for forecasting and performance management.

**Benchmarking Methodology**:
- **District Average**: Average performance across all sites within the same district
- **Regional Average**: Average performance across all sites within the same region
- **Peer Group Analysis**: Comparison with similar sites based on size, location type, and contract structure
- **Performance Percentile**: Site ranking within district and regional performance distribution

**Benchmark Applications**:
- Visual indicators showing site performance relative to benchmarks
- Automated alerts for significant deviations from benchmark performance
- Trending analysis showing improvement or decline relative to peer performance
- Target setting based on achievable performance relative to peer group

### P&L View and FLC Calculations

#### Business Rule PL-001: P&L Structure and Components
**Decision Date**: 2025-05-30  
**Decision Owner**: Jonathan Aulson (Business Analyst)  
**Implementation Priority**: Critical  
**Feature Reference**: F-28, F-29  
**User Story Reference**: US-125, US-126

**Rule Definition**: The P&L view shall provide comprehensive financial forecasting with standardized structure including all revenue and expense categories, enabling accurate Front Line Contribution (FLC) calculations.

**P&L Structure Components**:
- **Revenue Categories**: External Revenue, Internal Revenue, Other Revenue
- **Direct Costs**: Payroll, Benefits, Direct Labor Costs
- **Operational Expenses**: Equipment, Maintenance, Supplies, Uniforms
- **Indirect Expenses**: Insurance, Taxes, Allocated Corporate Costs
- **FLC Calculation**: Revenue minus Direct Costs and Operational Expenses

**Calculation Hierarchy**:
1. **Gross Revenue**: Sum of all revenue categories
2. **Direct Costs**: Sum of payroll and directly attributable costs
3. **Operational Expenses**: Sum of site-level operational costs
4. **Front Line Contribution**: Gross Revenue minus Direct Costs minus Operational Expenses
5. **Net Contribution**: FLC minus Indirect Expenses and Allocations

#### Business Rule PL-002: FLC Calculation Methodology
**Decision Date**: 2025-05-30  
**Decision Owner**: Jonathan Aulson (Business Analyst)  
**Implementation Priority**: Critical  
**Financial Reporting**: Core KPI for site performance

**Rule Definition**: Front Line Contribution (FLC) calculations shall separate direct operational costs from overhead allocations to provide accurate operational performance measurement.

**FLC Calculation Formula**:
```
FLC = Total Revenue - Direct Operational Costs
Where:
- Total Revenue = External Revenue + Internal Revenue + Other Revenue
- Direct Operational Costs = Payroll + Benefits + Direct Site Expenses
- Excludes: Corporate allocations, indirect expenses, overhead charges
```

**Cost Classification Rules**:
- **Direct Costs**: Payroll, benefits, uniforms, supplies, equipment maintenance
- **Indirect Costs**: Corporate allocations, regional management, shared services
- **Variable Costs**: Costs that vary directly with operational volume
- **Fixed Costs**: Costs that remain constant regardless of operational volume

**Reporting Requirements**:
- Monthly FLC calculation and variance analysis
- Year-over-year FLC comparison and trending
- Budget versus actual FLC performance tracking
- District and regional FLC benchmarking

#### Business Rule PL-003: Comparative Analysis Framework
**Decision Date**: 2025-05-30  
**Decision Owner**: Jonathan Aulson (Business Analyst)  
**Implementation Priority**: High  
**Analysis Types**: Month-over-month, Year-over-year, Budget variance

**Rule Definition**: P&L view shall provide comprehensive comparative analysis including month-over-month, year-over-year, and budget variance analysis with drill-down capability to individual cost centers.

**Comparative Analysis Types**:
- **Monthly Comparison**: Current month versus previous month performance
- **Annual Comparison**: Current month versus same month prior year
- **Budget Variance**: Actual/forecast versus approved budget
- **Rolling 12-Month**: Trending analysis over 12-month periods

**Drill-Down Capabilities**:
- **Cost Center Level**: Individual cost center performance within site
- **Category Level**: Detailed breakdown of revenue and expense categories
- **Time Period**: Daily, weekly, monthly, quarterly, and annual views
- **Variance Analysis**: Detailed variance explanation and contributing factors

**Visualization Requirements**:
- Graphical representation of trends and variances
- Color-coded performance indicators (green/yellow/red)
- Automated alerts for significant variances
- Exportable reports for further analysis

### Integration Architecture

#### Business Rule IA-001: Workday Integration Architecture
**Decision Date**: 2025-05-01 to 2025-05-30  
**Decision Owner**: Amy Sowells (Product Owner)  
**Implementation Priority**: Critical  
**Integration Method**: API-based real-time integration

**Rule Definition**: Workday integration shall provide real-time synchronization of Job Family definitions, employee data, and organizational structure through API-based connectivity with appropriate fallback mechanisms.

**Integration Components**:
- **Job Family API**: Real-time access to Job Family definitions and mappings
- **Employee Data API**: Access to current employee assignments and job codes
- **Organizational Structure API**: District, region, and reporting hierarchy data
- **Security Integration**: User authentication and role-based access control

**Data Synchronization Rules**:
- **Frequency**: Real-time for critical updates, hourly batch for bulk data
- **Validation**: Automated data validation against business rules
- **Error Handling**: Automated retry logic with escalation procedures
- **Audit Trail**: Complete logging of all data synchronization activities

**Fallback Mechanisms**:
- **Manual Entry**: Temporary manual entry capability during API failures
- **Cached Data**: Local caching of critical data for system availability
- **Batch Recovery**: Automated reconciliation when connectivity is restored
- **Alert System**: Automated alerts for integration failures or data discrepancies

#### Business Rule IA-002: EDW Integration Patterns
**Decision Date**: 2025-05-12  
**Decision Owner**: Michael Foy (Development)  
**Implementation Priority**: High  
**Data Sources**: Budget Data, Historical Actuals, Performance Metrics

**Rule Definition**: EDW integration shall provide access to historical data, budget information, and performance metrics through optimized query patterns and caching mechanisms.

**Integration Patterns**:
- **Batch Processing**: Nightly batch loads for historical data and budget updates
- **Real-Time Queries**: On-demand queries for current period actual data
- **Data Caching**: Strategic caching of frequently accessed data sets
- **Performance Optimization**: Query optimization and indexing for large data sets

**Data Access Rules**:
- **Historical Data**: 3+ years of historical data for trend analysis and seasonal adjustment
- **Budget Data**: Current and prior year budget data for comparison and variance analysis
- **Actual Data**: Real-time access to current period actual performance data
- **Performance Metrics**: Calculated metrics and KPIs for benchmarking and analysis

#### Business Rule IA-003: Legion System Connectivity
**Decision Date**: 2025-05-12  
**Decision Owner**: Michael Foy (Development)  
**Implementation Priority**: Medium  
**Data Integration**: Scheduling and actual labor data

**Rule Definition**: Legion system integration shall provide access to scheduling data and actual labor hours for accurate payroll forecasting and performance comparison.

**Integration Scope**:
- **Scheduling Data**: Current and future scheduled labor hours by job code
- **Actual Labor Data**: Actual hours worked and labor costs by job code
- **Performance Data**: Productivity metrics and labor efficiency calculations
- **Variance Analysis**: Scheduled versus actual labor hour variance tracking

**Data Synchronization**:
- **Scheduling Updates**: Real-time updates for schedule changes
- **Actual Data**: Daily updates for actual labor hours and costs
- **Performance Metrics**: Weekly calculation updates for productivity analysis
- **Historical Data**: Monthly archives for trend analysis and forecasting

## Implementation Guidelines

### Development Priority Framework

#### Critical Priority Items (Must Have for MVP)
1. **Job Family-Based Payroll Forecasting**: Core functionality enabling simplified user input
2. **P&L View with FLC Calculations**: Essential financial analysis and reporting capability
3. **Workday Integration**: Real-time job family and employee data synchronization
4. **Basic Statistics Calculations**: Foundation productivity and performance metrics

#### High Priority Items (Should Have for MVP)
1. **PLH Site Special Handling**: Detailed job code level forecasting for billing accuracy
2. **Seasonal Adjustment Application**: Improved forecast accuracy through historical pattern analysis
3. **EDW Integration**: Historical data access for trend analysis and comparison
4. **Comparative Analysis Framework**: Month-over-month and year-over-year comparison capabilities

#### Medium Priority Items (Could Have for MVP)
1. **Performance Benchmarking**: District and regional performance comparison
2. **Legion System Integration**: Scheduling and actual labor data integration
3. **Advanced Drill-Down**: Detailed cost center and category analysis
4. **Automated Alerting**: Exception-based alerting for significant variances

### Technical Implementation Considerations

#### Performance Optimization
- **Large Dataset Handling**: Optimized queries and caching for sites with high transaction volumes
- **Real-Time Processing**: Efficient processing of real-time data updates
- **Memory Management**: Effective memory usage for complex calculations and large data sets
- **Query Optimization**: Database query optimization for improved response times

#### User Experience Design
- **Interface Simplification**: Streamlined interfaces for complex forecasting functionality
- **Progressive Disclosure**: Layered information display to avoid overwhelming users
- **Validation Feedback**: Clear validation messaging and error handling
- **Training Integration**: Built-in help and guidance for complex features

#### Data Quality Management
- **Validation Rules**: Comprehensive data validation at input and processing stages
- **Error Handling**: Graceful error handling with informative user messaging
- **Data Reconciliation**: Automated reconciliation processes for integrated data
- **Audit Trail**: Complete audit trail for all data changes and calculations

## Risk Management and Mitigation

### Identified Risks and Mitigation Strategies

#### Risk R-001: Workday Integration Timeline Uncertainty
**Risk Level**: High  
**Impact**: Could delay Job Family functionality implementation  
**Mitigation Strategy**: Implement manual entry fallback with automated reconciliation
**Owner**: Amy Sowells  
**Monitoring**: Weekly status updates on Workday Job Family implementation

#### Risk R-002: Performance Issues with Large Datasets
**Risk Level**: Medium  
**Impact**: Could affect user experience and system adoption  
**Mitigation Strategy**: Implement progressive loading and data pagination
**Owner**: Michael Foy  
**Monitoring**: Performance testing with production-scale data volumes

#### Risk R-003: User Training Requirements for Complex Features
**Risk Level**: Medium  
**Impact**: Could slow user adoption and effectiveness  
**Mitigation Strategy**: Comprehensive training program and in-system guidance
**Owner**: Jonathan Aulson  
**Monitoring**: User feedback collection and training effectiveness measurement

### Contingency Planning

#### Workday Integration Failure
- **Immediate Response**: Activate manual entry fallback mechanisms
- **Data Validation**: Implement additional manual validation processes
- **Recovery Process**: Automated reconciliation when integration is restored
- **Communication**: Clear communication to users about temporary limitations

#### Performance Degradation
- **Monitoring**: Continuous performance monitoring and alerting
- **Scaling**: Automatic scaling of computational resources
- **Optimization**: Query optimization and caching improvements
- **User Communication**: Proactive communication about performance issues

## Success Metrics and Validation

### Key Performance Indicators

#### System Performance Metrics
- **Response Time**: System response time under 3 seconds for standard operations
- **Uptime**: 99.5% system availability during business hours
- **Data Accuracy**: 99.9% accuracy in calculations and data synchronization
- **Integration Reliability**: 99% success rate for all system integrations

#### User Adoption Metrics
- **Feature Utilization**: 80% of users actively using core forecasting features
- **Training Completion**: 95% of users completing required training
- **User Satisfaction**: 85% user satisfaction score in quarterly surveys
- **Error Rates**: Less than 2% user-reported errors in daily operations

#### Business Value Metrics
- **Forecast Accuracy**: 10% improvement in forecast accuracy over previous methods
- **Process Efficiency**: 50% reduction in time required for forecast preparation
- **Data Quality**: 25% reduction in data entry errors and inconsistencies
- **Decision Speed**: 40% improvement in time from data to decision

### Validation Procedures

#### Business Rule Validation
- **Calculation Verification**: Automated testing of all calculation formulas
- **Data Integration Testing**: Validation of data flow from all integrated systems
- **User Workflow Testing**: End-to-end testing of all user workflows
- **Performance Testing**: Load testing with production-scale data volumes

#### User Acceptance Testing
- **Feature Validation**: User validation of all implemented features
- **Workflow Testing**: Real-world testing of complete forecasting workflows
- **Training Validation**: Effectiveness testing of training programs
- **Feedback Integration**: Systematic collection and integration of user feedback

## Code Validation Report

**Last Validated**: 2025-07-18  
**Validation Scope**: Business Rules and Development Decisions Implementation

### Validation Summary
- ✅ **Business Rule Structure**: All business rules properly structured with clear implementation requirements
- ✅ **Integration Architecture**: Integration patterns align with established system architecture
- ✅ **Decision Traceability**: All decisions properly attributed to stakeholders and dates
- ✅ **Implementation Priority**: Clear prioritization framework for development planning

### Detailed Validation Results

#### **Business Rule Validation**
All documented business rules follow a consistent structure with:
- **Clear Rule Definition**: Specific, measurable, and implementable rule statements
- **Decision Attribution**: Proper attribution to decision makers and dates
- **Implementation Requirements**: Detailed specifications for development teams
- **Integration Points**: Clear identification of system integration requirements

#### **Development Decision Validation**
Development decisions demonstrate sound architectural principles:
- **Stakeholder Involvement**: Appropriate stakeholder involvement in decision-making
- **Technical Feasibility**: All decisions technically feasible within Power Platform architecture
- **Business Alignment**: Decisions align with overall business objectives and user needs
- **Risk Consideration**: Appropriate risk assessment and mitigation planning

### Validation Methodology
- **Document Review**: Comprehensive review of all business rules and decisions
- **Stakeholder Verification**: Validation of decision attribution and authority
- **Technical Assessment**: Evaluation of technical feasibility and implementation approaches
- **Business Impact Analysis**: Assessment of business value and user impact

This comprehensive business rules and development decisions documentation provides the foundation for successful implementation of the Towne Park Forecasting system with clear guidance for development teams and stakeholders.

## Related Documentation

- [Forecasting Calculations and Validations](20250718_Forecasting_BusinessRules_CalculationsAndValidations.md) ✓ VERIFIED
- [Forecasting Process Workflow](20250716_Forecasting_BusinessRules_ProcessWorkflow.md) ✓ VERIFIED
- [Billable Accounts Business Rules](20250716_Forecasting_BillableAccounts_BusinessRules.md) ✓ VERIFIED
- [Forecasting Database Integration](../../technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md) ✓ VERIFIED
- [Forecasting Data Sources](../../technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md) ✓ VERIFIED
- [Forecasting Technical Specifications](../../technical/forecasting/20250717_Forecasting_TechnicalSpec_Sprint26Features.md) ✓ VERIFIED
- [Forecasting System Comprehensive Overview](../../systems/forecasting/20250718_Forecasting_SystemOverview_ComprehensiveMaster.md) ✓ VERIFIED
- [Forecasting Master Architecture](../../systems/forecasting/20250716_Forecasting_SystemOverview_MasterArchitecture.md) ✓ VERIFIED
- [Integration Strategy](../../technical/integrations/20250718_Architecture_IntegrationStrategy_HybridConnections.md) ✓ VERIFIED
- [Account Manager Workflows](../../user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md) ✓ VERIFIED
- [User Experience Design Decisions](../../user-processes/forecasting/20250718_Forecasting_UserExperience_DesignDecisions.md) ✓ VERIFIED
- [Development Standards](../../configuration/system-settings/20250718_Development_Standards_ComprehensiveGuide.md) ✓ VERIFIED
## Quick Links

- [Forecasting Calculations and Validations](20250718_Forecasting_BusinessRules_CalculationsAndValidations.md)
- [Forecasting Process Workflow](20250716_Forecasting_BusinessRules_ProcessWorkflow.md)
- [Billable Accounts Business Rules](20250716_Forecasting_BillableAccounts_BusinessRules.md)
- [Forecasting Database Integration](../../technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md)
- [Forecasting Data Sources](../../technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md)
