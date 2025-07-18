---
title: "Towne Park Forecasting System - Master Architecture Overview"
description: "Comprehensive overview of the Towne Park Forecasting System architecture, business context, and core functionalities derived from master organizational documentation"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-05-13
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "20250513_Master - Towne Park Data Product Organizational Structure.md"
systems:
  - Forecasting
  - Billing
  - EDW
  - Legion
  - Workday
  - Great Plains
  - Dataverse
  - Power BI
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Statement Generation
  - Reporting
  - General Ledger
  - Customer Site Management
  - Parking Statistics
  - Payroll Expense
  - Parking Rates
  - Other Expenses
  - Other Revenue
  - Field Operations
  - Profit & Loss View
  - Fixed Fee
  - Per Occupied Room
  - Per Labor Hour
  - Management Agreement
  - Revenue Share
user_roles:
  - Account Manager
  - Billing Admin
  - Billing Manager
  - District Manager
  - Regional Manager/VP
  - Regional Finance
  - Corporate Finance
tags:
  - forecasting-system
  - system-architecture
  - business-requirements
  - master-documentation
  - financial-systems
---

# Towne Park Forecasting System - Master Architecture Overview

## Purpose

This document provides a comprehensive overview of the Towne Park Forecasting System as part of the broader financial systems modernization initiative. The forecasting system is designed to replace manual Excel-based forecasting processes with an integrated, automated solution built on Microsoft's Power Platform and Dataverse.

The purpose of this system is to empower AI-assisted conversation and text/code generation by providing detailed business requirements, system specifications, functional and non-functional requirements, environment and infrastructure details, business processes, user flows, integrations, data schemas, and business logic for the financial systems being built for Towne Park.

## Business Context & Requirements

### Towne Park Business Overview

Towne Park is a leader in turnkey parking services for the hospitality and healthcare industries, operating over 700 customer sites including high-profile clients like Disneyland. With $1 billion in revenue, the company requires sophisticated financial systems to manage complex contract structures and accurate forecasting capabilities.

### Pain Points Addressed

The forecasting system addresses critical operational inefficiencies:

- **Manual Excel-Based Processes**: Account managers at 700+ sites manually collect and submit daily/monthly data
- **Error-Prone Data Handling**: Manual processes increase risk of billing and forecasting inaccuracies
- **Lack of Scalability**: Excel-based systems struggle with growing data volume and contract complexity
- **Resource Intensive Operations**: Manual processes consume significant time and delay financial reporting
- **Limited Real-Time Visibility**: Executives lack timely access to performance data for strategic decisions

### Overall Business Requirements

#### High-Level Goals
- **Accuracy**: Eliminate manual errors in forecasting and data collection
- **Efficiency**: Reduce time required for forecast generation and updates
- **Predictability**: Provide reliable forecasting capabilities for business planning
- **Scalability**: Support growing operations across 700+ customer sites
- **Integration**: Seamlessly connect with existing systems (EDW, Legion, Workday, Great Plains)

#### Key Performance Indicators (KPIs)
- Forecast accuracy improvement vs. historical Excel-based forecasts
- Time reduction in forecast generation and monthly closing processes
- User adoption rates across Account Managers and District Managers
- Data quality metrics and error reduction
- System performance and availability metrics

## System Architecture

### High-Level System Architecture

The Forecasting System is built on Microsoft Dataverse and integrates with multiple enterprise systems to provide comprehensive forecasting capabilities:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Power BI      │    │  Forecasting    │    │   Power Bill    │
│   (Reporting)   │◄──►│    System       │◄──►│   (Billing)     │
└─────────────────┘    │  (Dataverse)    │    └─────────────────┘
                       └─────────────────┘
                              │
                              ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      EDW        │◄──►│   Data Gateway  │◄──►│     Legion      │
│  (SQL Server)   │    │   Integration   │    │  (Scheduling)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │    Workday      │
                       │   (HR/Roles)    │
                       └─────────────────┘
```

### Core Systems & Their Roles

#### Forecasting System (Built on Dataverse)
- **Primary Function**: Site selection, period definition, and comprehensive forecasting
- **Data Storage**: Forecast data stored in Dataverse entities
- **User Interface**: Power Apps-based interface for data input and management
- **Integration**: Connects to all source systems for data retrieval and validation

#### Enterprise Data Warehouse (EDW) - SQL Server
- **Nodes**: Node1, Node2 for high availability
- **Function**: Central repository for budget data, actuals, and historical information
- **Key Tables**: 
  - `Budget_Final` - Site statistics and P&L line items
  - `Budget_Data_Tab_PR` - Payroll hours and cost data
  - `Account_Summary` - Month-end P&L actuals from Great Plains
  - `Revenue_DataMart_Daily` - Daily external revenue and statistics
  - `VW_Payroll_Summary` - Actual payroll hours and cost from Legion

#### Legion (Scheduling & Timekeeping)
- **Function**: Workforce scheduling and actual payroll data source
- **Integration**: Provides scheduled and actual payroll hours/costs
- **Future Enhancement**: Will receive forecasted demand from Forecasting System

#### Workday (HR & Roles)
- **Function**: HR data, job families, and organizational structure
- **Key Data**: Site-to-user mappings, job codes, salaried employee allocations
- **Tables**: `Workday_Site_Salaries`, `Workday_RLS_By_Security`

#### Great Plains (GP) - Accounting System
- **Function**: Source of actual financial data for comparison
- **Integration**: Provides month-end actuals via EDW
- **Data Flow**: Receives invoice data from Power Bill system

#### Power BI (Reporting & Analytics)
- **Function**: Advanced reporting and analytics platform
- **Data Sources**: Forecasting System, EDW, and integrated systems
- **Future Consideration**: Microsoft Fabric for Silver/Gold data layers

## Core Forecasting Functionalities

### Site Selection & Period Definition
- **Capability**: Select individual sites or groups for forecasting
- **Time Periods**: Support for daily, weekly, monthly, and quarterly forecasting
- **Hierarchy Support**: Site, District, Region, SVP Region, Corporate rollups
- **Filtering**: Organizational filters, customer filters (COG), contract type filters

### Site Statistics Forecasting

#### Input Metrics
- **Occupancy**: Hotel room occupancy rates
- **Drive-in Vehicles**: Self-park vehicle counts
- **Valet Vehicles**: Valet service vehicle counts
- **Self-Park Vehicles**: Self-service parking counts
- **Comps**: Complimentary parking validations
- **Aggregators**: Third-party parking platform transactions

#### Data Views
- **Budget**: Annual budget allocations
- **Forecast**: User-generated forecasts
- **Actuals**: Historical performance data
- **Prior Year**: Previous year comparisons

#### Time Granularity
- **Input Options**: Daily, weekly, monthly, quarterly input capabilities
- **View Options**: Multiple time period views for analysis
- **Calendar Integration**: Calendar view for intuitive date selection

#### Calculation Logic
- **Capture Ratio**: Percentage of potential customers captured
- **Drive-in Ratio**: Ratio of drive-in to total vehicles
- **External Revenue Calculation**: Revenue derived from statistics and rates

### Parking Rate Forecasting

#### Rate Categories
- **Valet Overnight**: Premium valet parking rates
- **Self Daily**: Daily self-park rates
- **Aggregator Rates**: Rates for third-party platforms
- **Special Event Rates**: Premium rates for special events

#### Rate Management
- **Rate Input**: Direct rate entry and override capabilities
- **Rate Increases**: Systematic handling of rate escalations
- **Guardrails**: Input validation and reasonable range checking
- **Historical Tracking**: Rate change history and trend analysis

### Payroll Forecasting

#### Input by Job Family
- **GSA (Guest Service Associate)**: Front-line customer service roles
- **GSC (Guest Service Coordinator)**: Supervisory customer service roles
- **Valet**: Valet parking attendants
- **Bell**: Bellhop and luggage services
- **Shuttle**: Transportation services
- **Cashier**: Payment processing roles
- **Salaried**: Management and administrative roles

#### Input by Job Code
- **Detailed View**: Granular job code level input for Per Labor Hour sites
- **Flexibility**: Support for both high-level and detailed payroll planning

#### Input Metrics
- **Hours**: Scheduled and forecasted labor hours
- **Cost**: Labor cost calculations including benefits and overhead

#### Data Views
- **Budget**: Annual payroll budget allocations
- **Scheduled**: Legion-sourced scheduled hours
- **Forecast**: User-generated payroll forecasts
- **Actuals**: Historical payroll performance from Legion/Payroll Summary

#### User Interface Features
- **Slider Bars**: Intuitive adjustment controls
- **Direct Input**: Precise numerical entry
- **Variance Alerts**: Notifications for significant deviations
- **Salaried Allocation**: Handling of salaried employee cost distribution

### Other Internal Revenue Forecasting

#### Revenue Categories
- **Billable Expenses**: Reimbursable costs charged to customers
- **Revenue Validations**: Validation fees and charges
- **Credits/Other Billable Items**: Miscellaneous billable revenue
- **GPO Fees**: Group Purchasing Organization fees
- **Signing Bonuses**: New contract incentives

#### Input Characteristics
- **Monthly Input**: Monthly-level revenue forecasting
- **Data Views**: Forecast vs. Actuals comparison where available

### Other Expenses Forecasting

#### Expense Categories
- **Uniforms**: Employee uniform costs
- **Tickets**: Parking validation tickets
- **Equipment**: Operational equipment expenses
- **Maintenance**: Facility and equipment maintenance

#### Input Method
- **Monthly Input**: Monthly expense forecasting against budget
- **Budget Variance**: Tracking deviations from annual budget allocations

### Profit & Loss (P&L) Views

#### P&L Line Items
- **External Revenue**: Customer-paid parking revenue
- **Internal Revenue**: Billable expenses and other internal revenue
- **Payroll**: Total labor costs including benefits
- **Claims**: Insurance and liability claims
- **PTAB**: Parking Tax Assessment Board fees
- **Insurance**: Insurance premiums and costs
- **Other Expenses**: Miscellaneous operational expenses
- **Parking Rents**: Facility rental costs
- **FLC**: Facility and Location Costs

#### Data Views
- **Budget**: Annual budget allocations
- **Forecast**: User-generated forecasts
- **Actuals**: Historical performance data
- **Prior Year**: Previous year comparisons
- **Variances**: Dollar and percentage variance calculations

#### Hierarchy and Filtering
- **Roll-up Levels**: Site → District → Region → SVP Region → Corporate
- **Organizational Filters**: Filter by organizational structure
- **Customer Filters**: Filter by Customer Operating Group (COG)
- **Contract Type Filters**: Filter by contract structure type
- **P&L Category Filters**: Filter by specific P&L line items

#### Trend Analysis
- **Year-over-Year**: Annual comparison capabilities
- **Quarter-over-Quarter**: Quarterly trend analysis
- **Month-over-Month**: Monthly performance tracking

### District Manager+ Overrides & Audit Trail

#### Override Capabilities
- **DM+ Authority**: District Managers and above can override AM forecasts
- **Approval Workflow**: Structured approval process for forecast changes
- **Audit Trail**: Complete history of changes and approvers

#### Audit Features
- **Change Tracking**: Who, what, when for all modifications
- **Version Control**: Historical versions of forecasts
- **Approval History**: Complete approval workflow documentation

### Proforma & New Site Forecasting

#### Average Billing Profile Concept
- **Template Creation**: Standard forecasting templates for new sites
- **Industry Benchmarks**: Hospitality vs. Healthcare benchmarking
- **Scalable Onboarding**: Rapid forecasting setup for new customer sites

### User Interface & Experience Considerations

#### Toggle Features
- **Show Budget**: Toggle budget data visibility
- **Show Actuals**: Toggle actual performance data visibility
- **Comparative Views**: Side-by-side budget, forecast, and actuals

#### Save Mechanisms
- **Auto-save**: Automatic saving of user inputs
- **Manual Save**: Explicit save with warning for unsaved changes
- **Draft Management**: Save and resume incomplete forecasts

#### Visual Alerts
- **Variance Alerts**: Visual indicators for significant deviations
- **Data Quality Alerts**: Warnings for incomplete or inconsistent data
- **Performance Indicators**: Color-coded performance metrics

#### Help and Guidance
- **Show Guide**: Contextual help text and guidance
- **Training Integration**: Links to training materials and documentation
- **Best Practices**: Embedded forecasting best practices

#### Future Enhancements
- **Monthly Summary Tab**: Consolidated monthly view concept
- **Mobile Accessibility**: Mobile-optimized interface
- **Advanced Analytics**: AI/ML-driven forecasting suggestions

## Data Management

### Key Data Entities

#### Customer & Site Data
- **Source**: Master Non-Financial system
- **Refreshable Fields**: Site Name, District, Region, Rooms, Spaces
- **Non-Refreshable Fields**: Vendor ID, Billing Email, Invoice Recipient, Address
- **Integration**: Synchronized with Power Bill system

#### Contract Data
- **Deal Types**: Fixed Fee, Per Occupied Room, Per Labor Hour, Revenue Share, Management Agreement
- **Complex Deals**: "10 Percenter" deals requiring special handling
- **Configuration**: Rates, escalators, billable accounts, profit splits, management fees

#### Forecast Data Storage (Dataverse)
- **Site Statistics Forecast**: Vehicle counts, occupancy, capture ratios
- **Parking Rate Forecast**: Rate structures and escalations
- **Payroll Forecast**: Hours and cost by job family/code
- **Other Internal Revenue Forecast**: Billable expenses and revenue validations
- **Other Expenses Forecast**: Operational expense forecasts

### Data Integration & Flow

#### EDW ↔ Forecasting System
- **Inbound**: Budget data, actuals, historical performance
- **Outbound**: Forecast data for reporting and analysis
- **Frequency**: Daily for actuals, monthly for budget updates

#### Legion ↔ Forecasting System
- **Inbound**: Payroll schedules and actuals
- **Future Outbound**: Forecasted demand for scheduling optimization
- **Integration Method**: Via EDW and data gateways

#### Workday → EDW/Forecasting System
- **Role Data**: User-to-site mappings and organizational structure
- **Job Family Data**: Job codes and family classifications
- **Salary Data**: Salaried employee allocations and costs

#### Power Bill ↔ Great Plains
- **Invoice Data**: Billing transactions to Great Plains
- **Actuals Data**: Financial actuals from Great Plains via EDW

### Data Quality & Validation

#### Validation Processes
- **Input Validation**: Range checking and reasonableness tests
- **Cross-System Validation**: Consistency checks across integrated systems
- **Historical Validation**: Comparison with historical performance patterns

#### Reconciliation Processes
- **Budget Reconciliation**: Forecast vs. budget variance analysis
- **Actuals Reconciliation**: Forecast vs. actual performance tracking
- **System Reconciliation**: Cross-system data consistency verification

## User Roles & Permissions

### Account Manager (AM) / Associate Manager
- **Forecasting Authority**: Create and modify forecasts for assigned sites
- **Data Access**: Site-level data for assigned locations
- **Approval Requirements**: Submit forecasts for DM review

### District Manager (DM)
- **Override Authority**: Override AM forecasts within district
- **Data Access**: District-level rollup and site-level detail
- **Approval Authority**: Approve AM forecasts and submit to regional level

### Director of Operations (DOO)
- **Regional Authority**: Override district-level forecasts
- **Data Access**: Regional rollup and district-level detail
- **Strategic Input**: Provide regional strategic guidance

### Regional Vice President (RVP)
- **Regional Authority**: Final regional forecast approval
- **Data Access**: Regional and corporate rollup views
- **Strategic Oversight**: Regional performance and strategic planning

### Senior Vice President (SVP)
- **Read-Only Access**: View-only access to hierarchy data
- **Strategic Oversight**: Corporate-level performance monitoring

### Forecast Admin (Super User)
- **System Administration**: Edit all forecasts and system configuration
- **User Management**: Manage user access and permissions
- **Data Quality**: Monitor and maintain data quality standards

### Corporate Consumer
- **Read-Only Access**: View-only access to all corporate data
- **Reporting Access**: Access to standard and custom reports

## Integration Architecture

### Microsoft Power Platform Integration
- **Power Apps**: User interface and data entry forms
- **Power Automate**: Business logic and workflow automation
- **Power BI**: Reporting and analytics
- **Dataverse**: Primary data storage and entity management

### Azure Infrastructure
- **Data Gateways**: Secure connection to on-premises systems
- **Virtual Networks**: Secure network connectivity
- **Performance Optimization**: Optimized for user concurrency and data volume

### Development & Deployment Strategy
- **Environment Strategy**: Development, UAT, Production environments
- **Release Management**: Structured release and deployment processes
- **Version Control**: Source code and configuration management

## Performance & Scalability

### Performance Requirements
- **Page Load Times**: Sub-3 second page load targets
- **Calculation Speed**: Real-time P&L calculation and rollup
- **User Concurrency**: Support for 700+ concurrent users during peak periods

### Scalability Considerations
- **Data Volume Growth**: Designed for expanding customer site portfolio
- **User Growth**: Scalable to support organizational growth
- **Feature Expansion**: Extensible architecture for future enhancements

## Security & Compliance

### Role-Based Access Control
- **Hierarchical Security**: Access based on organizational hierarchy
- **Site-Level Security**: Granular access to specific customer sites
- **Function-Level Security**: Access to specific system functions

### Data Protection
- **PII Considerations**: Secure handling of payroll and personal data
- **Audit Trail**: Complete audit trail for compliance requirements
- **Data Encryption**: Encryption at rest and in transit

## Future Roadmap

### Planned Enhancements
- **Full Budgeting Module**: Integration of comprehensive budgeting capabilities
- **AI/ML Forecasting**: Enhanced forecasting algorithms using artificial intelligence
- **Deeper Legion Integration**: Bi-directional integration for demand-driven scheduling
- **Mobile Accessibility**: Mobile-optimized interface for field users

### Strategic Initiatives
- **"10 Percenter" Deal Automation**: Streamlined handling of complex deal structures
- **Workday Job Family Automation**: Automated job family mapping
- **Microsoft Fabric Integration**: Advanced data platform capabilities

## Related Documentation

- [Forecasting Business Rules - Process Workflow](../../business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md)
- [Forecasting Data Sources Technical Specification](../../technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md)
- [Billing System Overview - PowerBill](../billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Development Configuration Guide](../../configuration/system-settings/20250716_Development_ConfigurationGuide_Standards.md)
- [Billing Technical Architecture](../../technical/backend/20250716_Billing_TechnicalArchitecture_Development.md)

---

**Source Information:**
- **Original Document**: 20250513_Master - Towne Park Data Product Organizational Structure.md
- **Transformation Date**: 2025-07-16
- **Document Type**: System Overview
- **Completeness**: Comprehensive - All information from source preserved and organized