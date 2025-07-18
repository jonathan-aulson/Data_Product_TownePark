---
title: "Towne Park Forecasting System - Project Discovery Overview"
description: "Comprehensive overview of the forecasting system modernization project including current state analysis, future state vision, and implementation strategy"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-05-13
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "20250513_Master - Forecasting Project Discovery.md"
systems:
  - Forecasting
  - Billing
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Reporting
  - Forecasting
  - Field Operations
  - Profit & Loss View
user_roles:
  - Account Manager
  - District Manager
  - Regional Finance
  - Corporate Finance
  - Regional Manager/VP
tags:
  - forecasting
  - system-overview
  - project-discovery
  - modernization
  - excel-replacement
---

# Towne Park Forecasting System - Project Discovery Overview

## Purpose

This document provides a comprehensive overview of Towne Park's forecasting system modernization project, documenting the transition from Excel-based processes to a modern, integrated forecasting solution. The project aims to address operational pain points while enabling proactive business management through improved accuracy, timeliness, and user experience.

## Project Overview & Goals

### Project Mandate

Allata has been challenged to redo the forecasting process and build a new solution for Towne Park, leveraging prior experience from the billing and invoicing solution implementation. The new solution must specifically address pain points encountered by field staff in the forecasting process.

### Primary Objectives for New Forecasting System

#### Shift Focus from Input to Actionable Output
- Reduce time spent on data entry and reconciliation
- Allow users (AMs, DMs, RFDs, Corporate) to focus on analyzing forecasts and taking proactive business actions
- Transform from input-heavy to insight-driven processes

#### Improve Accuracy & Timeliness
- Provide more reliable forecasts with faster feedback loops
- Accept trade-off of small degree of pinpoint accuracy for significant gains in speed and predictability
- Enable real-time or near real-time data reflection

#### Enable Proactive Management
- Equip users at all levels with tools to anticipate issues
- Provide scenario modeling capabilities
- Drive performance through predictive insights

#### Data Consistency & Single Source of Truth
- Ensure outputs are consistent with existing EDW schemas (at minimum, with enhancements desired)
- Maintain compatibility with downstream reporting and processes
- Eliminate data fragmentation across multiple Excel files

#### Simplify the Forecasting Process
- Especially focus on Account Managers and Operations simplification
- Reduce complexity while maintaining necessary functionality
- Streamline user workflows and decision points

#### Support All Sites
- The future forecasting solution must support every site
- Include "10 percenters" (complex sites not fully supported by the new billing system yet)
- Ensure no site is left behind in the modernization

### Allata Team Roles

- **Jonathan Aulson**: Consultant at Allata, involved in requirements gathering
- **John Hesseltine**: Director in Technology and Cloud practice at Allata, provides account-level oversight, heavily involved in technical architecture and design
- **Gabriel Aquilano**: Business Analyst at Allata, supports requirements gathering and preparing information for the engineering team

## Current State Analysis

### Process Flow Overview

The current forecasting process follows a complex, Excel-based workflow:

1. **Budget as Starting Point**: Corporate Finance finalizes site budgets annually, which become the initial forecast for the year
2. **Template Preparation & Distribution**: Corporate Finance rolls forward Excel forecast templates annually (administratively burdensome)
3. **AM Data Input & Client Data Incorporation**: AMs input site-specific data into individual Excel files
4. **Actualization**: Loosely defined automated process using macros to pull EDW data into Excel files
5. **AM/DM Review Cycle**: Continuous review and adjustment of site-level forecasts (multiple times per week)
6. **Regional Finance Review & Optimization**: RFDs analyze aggregated forecasts using tools like the "Financial Review File"
7. **Corporate Finance Adjustments**: Macro-level "over the top" adjustments for contingencies, overhead, and enterprise factors
8. **Reporting & Distribution**: Various cadences including Financial Review File (~3 times/week), PowerPoint presentations (monthly/quarterly), and BI reports

### Key Current State Pain Points

#### Data Dependency & Latency
- **Heavy Reliance on Manual AM Updates**: Forecast accuracy extremely dependent on AMs updating revenue spreadsheets and forecast files
- **Delayed Updates**: AM PTO or delays cause stale forecast data, hindering accurate reporting and decision-making
- **Inconsistent Updates Cause Swings**: Forecasts show drastic swings based on when AMs update, not business changes
- **Latency in Data Reflection**: Time lag between AM updates and reflection in main forecast file
- **Actuals Latency**: AMs may not see expense impacts until significant FLC swings are reported

#### Lack of Customization & Relevance
- **Hotel-Centric Templates**: Current files designed for hotels with irrelevant metrics for other segments like Healthcare
- **Too Much Irrelevant Data**: Non-hospitality AMs must ignore many fields, making tool cumbersome

#### Manual Effort & Inefficiency
- **Manual Labor Hour Input**: For per-labor-hour contracts, AMs manually input hours even when payroll actuals are available
- **Time-Consuming Variance Analysis**: DMs/RFDs spend significant time understanding forecast variances due to lack of explanatory context
- **Fragmented Data Sources**: Users pull data from multiple sources for credible forecast analysis
- **Forecasting All Expense Lines**: AMs expected to forecast every expense line, even those they don't control
- **Manual Complex Calculations**: AMs manually calculate blended wage rates, PTO seasonality, drive-in percentages
- **Tedious Long-Range Forecasting**: Daily/granular input requirements make future month forecasting very involved
- **Custom Formula Maintenance**: Unique contractual terms require manual formula re-entry when templates roll over

#### Limited Visibility, Modeling & Decision Support
- **No Immediate Impact Visibility**: AMs cannot see real-time P&L impact of forecast changes
- **No Alerts for Actuals**: No system alerts when actual GL expenses differ from forecast
- **Difficulty Understanding FLC Drivers**: Hard to see FLC breakdown between PTEB spread vs. profit share
- **Difficulty Segmenting Profitability**: Challenging to see self-park vs. valet profitability
- **Calendar Issues**: April-March files cause issues at calendar year transitions
- **Short-Term Focus**: Tools lead to 30-day view, making quarterly/annual target management difficult
- **Lack of Predictive Assistance**: No AI or system-driven forecasting assistance
- **Seasonality & Pacing Issues**: Files treat every day equally, not accounting for seasonality or events
- **Dynamic Pricing Challenges**: Single average rate forecasting difficult with dynamic pricing

#### System & Process Issues
- **Excel Fragility**: Formulas easily broken or misinterpreted, leading to significant errors
- **Lack of Integration**: Limited direct integration with systems like Concur or deeper Legion integration
- **Client Data Timeliness/Integrity**: Forecasts impacted by delays or inaccuracies in client data
- **Self-Fulfilling Prophecy of Input Focus**: Too much time on inputs, little time for analysis and insights

### Current State Tools & Systems

- **Microsoft Excel**: Primary tool for forecast input and analysis
- **Microsoft SharePoint**: Storage and distribution of forecast files
- **EDW (Enterprise Data Warehouse)**: Central repository for actuals, budget data, and forecast snapshots
- **Legion**: Source for payroll actuals and schedules
- **Revenue Spreadsheets**: AM input for daily revenue, occupancy, etc.
- **Great Plains (GP)**: Source for expense actuals
- **Power BI**: Reporting on forecast data stored in EDW
- **PowerPoint**: Presentations to ELT/Equity Partners
- **Macros (in Excel)**: Data pulling from EDW into forecast files

## Future State Vision & Requirements

### Guiding Principles & Goals

#### Simplify Inputs
- Drastically reduce number of inputs required from AMs
- Focus on key site metrics and controllable expenses
- Eliminate redundant or non-value-added data entry

#### Automate Where Possible
- Leverage system integrations and logic to pre-populate data
- Calculate baseline forecasts automatically
- Reduce manual data manipulation tasks

#### User-Friendly Interface
- Intuitive, cloud-accessible, cross-device compatible
- Modern web-based interface replacing Excel
- Optimized for field user workflows

#### Role-Based Views & Access
- Tailor experience to user's role and responsibilities
- Implement granular permissions and data visibility
- Support organizational hierarchy and proxy access

#### Enable "Forecasting by Exception"
- System provides strong baseline forecasts
- Users adjust based on specific local knowledge
- Focus effort on meaningful variances and opportunities

#### Improve Speed to Answer
- Allow for quicker analysis and decision-making
- Reduce time from question to insight
- Enable real-time or near real-time responses

#### Flexibility & Scalability
- Architecture aligned with billing solution
- Support for future enhancements and growth
- Adaptable to changing business requirements

#### Focus on Actionable Outputs
- Help users identify issues and opportunities
- Drive performance through insights, not just data
- Support proactive business management

### Core Functionality Overview

The future system will include these major capability areas:

1. **Core Forecasting Engine**: Forecast roll-up, AM input/adjustment, data consistency checks, centralized repository, automatic initialization, custom billing rule incorporation

2. **Simplification & User Experience**: Simplified AM inputs, intuitive online interface, cloud accessibility, role-based access control, standardized forecast views

3. **Intelligent Automation & Advanced Analytics**: Baseline/prescriptive forecasting, recommended adjustments, automated task reduction, near real-time data reflection

4. **Integrations**: EDW integration, Power BI integration, Legion integration for labor forecasting, billing system integration, Proforma system integration

5. **In-App Reporting & Exception Handling**: Limited in-application reporting, exception reporting and alerts with configurable thresholds

6. **Modeling & Scenario Planning**: Sandbox environment for "what-if" scenarios at DM level and above

7. **Above Unit & Top-Side Forecasting**: Dedicated input for Corporate/FP&A overhead, top-side adjustments, new/lost business placeholders

8. **Training & Change Management**: Comprehensive training materials and sessions, power user group support

9. **Governance & Process Standardization**: Forecast approval workflow, versioning and locking, standardized reporting cadence, client communication policy

## User Roles & Responsibilities

### Current State Actors

#### Corporate Finance
- **Key Personnel**: Adam Suarez's team, Matt Longo, Mike Craig
- **Responsibilities**: Set budget targets, prepare forecast templates, handle administrative tasks, make "over the top" adjustments, manage specific cost centers (contingencies, overhead, plug cost centers), finalize and submit forecasts to ELT/Equity Partners/Board

#### Regional Finance Directors (RFDs)
- **Key Personnel**: Ryan Esposito, Chad Beamesderfer, Chris Moore
- **Responsibilities**: Review and optimize field forecasts, work with DMs to guide AMs, consume Financial Review File, hold meetings with DMs/regional leadership for forecast finalization

#### Account Managers (AMs)
- **Responsibilities**: Input site-level data (drive-in ratios, occupancy, rates, events, car counts), incorporate client data, handle custom formulas for unique billing rules, manually input hours for per-labor-hour accounts, update revenue spreadsheets, ensure accuracy of site forecast inputs

#### District Managers (DMs)
- **Key Personnel**: Brian Stone, Jamie MacSkimming, Brennen Stepanek, Eddie Petrini, Peter Quinan, David Arreola, Joseph Jaussi
- **Responsibilities**: Review forecasts with AMs cyclically (multiple times per week), utilize Financial Review File, meet with AMs to build bottoms-up forecast for their units

#### Area Managers
- **Key Personnel**: Sebastian Rodriguez, Darius Shuler
- **Responsibilities**: Participate in reviews with DMs and AMs for their specific areas

#### Senior Leadership (ELT)
- **Key Personnel**: Brian LaChapelle (COO), CFO, SVPs, Market VPs
- **Responsibilities**: Consume rolled-up forecasts and reports, use output for decision-making (not direct influencers of forecast numbers)

#### Additional Stakeholders
- **Clients**: Provide key input data (occupancy, events, rates) but are not direct system users
- **Board/Equity Partners**: Ultimate consumers of finalized forecasts via PowerPoint presentations
- **Sales Team/FP&A Sales Analytics**: Manage sales pipeline reporting for new business placeholders
- **AR Team**: Manually forecast financial impacts of prior month invoice revisions

### Future State User Considerations

#### Role-Based Access Control (RBAC)
- Access and visibility restricted based on user role and organizational hierarchy
- Users can see data within their scope and below
- No cross-over visibility for parallel hierarchies
- Enterprise-level access for cross-regional comparisons

#### Proxy/Coverage Functionality
- Support for AM on PTO scenarios
- Vacant AM role coverage by DM
- Senior AM covering for another AM
- Workday Cost Center Manager hierarchy as primary source for identifying managers
- Ad-hoc/temporary assignments support
- Champion/SME coverage with appropriate security inheritance

#### Primary Users Shift
- Future state aims for field (AMs, DMs, RFDs) to be primary users for driving results
- Finance transitions to monitoring and providing support/guidance role
- Reduced administrative burden on Corporate Finance

## Integration Architecture

### Key System Integrations

#### EDW Integration
- **Bidirectional flow**: EDW as source for actuals, budget, proforma, master data
- EDW as destination for finalized forecast data for enterprise reporting
- Output schema consistent with current EDW forecast tables (e.g., `Forecast_Consolidated`)
- Maintain compatibility with downstream dependencies

#### Legion Integration (Labor Forecasting)
- **Critical Vision**: New forecasting system forecasts revenue/volume drivers
- Drivers fed to Legion for optimal labor schedule/cost generation
- Legion's labor forecast feeds back to complete P&L in new system
- Creates single systems of record: new app for revenue forecast, Legion for labor forecast/schedule
- **Technical Feasibility Confirmation Needed**: Legion accepting external drivers and exporting detailed labor forecast

#### Power BI Integration
- Forecast data easily consumable by Power BI for advanced reporting and dashboards
- Maintain current reporting capabilities while enhancing with new data structure

#### Billing System Integration
- Leverage contractual terms from new billing system for accurate revenue and billable expense forecasting
- **Critical Consideration**: Strategy needed for "10 percenter" sites with complex billing configurations not yet in new billing system

#### Proforma System Integration
- Pull new site proforma data for initial forecast setup
- Support new business initialization and tracking

## Specific Complexities & Key Decision Points

### "10 Percenter" Sites Challenge
- **Issue**: How to accurately forecast for sites with complex contracts not yet fully modeled in new billing system
- **Dependency**: Billing system development or alternative data sources (EDW Deal Term tables)
- **Estimated Impact**: 50-75 sites initially (Amy Sowells estimate)
- **Worst-Case Solution**: Hybrid average revenue per hour worked + billable/non-billable expenses approach

### Legion Integration for Labor Forecasting
- **Technical Feasibility**: Confirming Legion can accept external revenue/volume drivers and export detailed labor forecast
- **Data Contract**: Defining integration specifications between new forecasting system and Legion
- **Override Scenarios**: Handling cases where Legion's generated schedule deviates from standards

### Level of Granularity for AM Inputs
- **Decision Required**: Exact list of metrics AMs will input vs. system pre-population/derivation
- **Scope Definition**: Specific "big ticket" controllable expenses AMs will forecast
- **Balance**: Simplification vs. accuracy and control requirements

### Machine Learning Application
- **Use Cases**: Forecasting immaterial expenses, suggesting adjustments at DM+ levels based on trends
- **Requirements**: Data requirements and model development effort assessment
- **Implementation Priority**: Determining ML features for initial vs. future releases

### Exception Reporting Thresholds
- **Configuration**: How thresholds for flagging exceptions (forecast vs. budget) will be determined and managed
- **Variability**: Fixed percentages vs. dynamic vs. configurable by site/deal type
- **Maintenance**: Ongoing threshold optimization and management

### Change Management Strategy
- **Critical Success Factor**: Comprehensive change management and training plan
- **Leadership**: Towne Park internal team (Jeremy Smith, Anna) leading deployment
- **Support**: Allata providing support and reference materials
- **Immersion Requirement**: Training needs to be comprehensive due to daily impact on AM/DM roles

## Related Documentation

- [Forecasting Business Rules](../../business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md) ✓ VERIFIED
- [Billing Technical Architecture](../../technical/backend/20250716_Billing_TechnicalArchitecture_Development.md) ✓ VERIFIED
- [Billing System Overview](../billing/overview.md) ✓ VERIFIED
- [User Process - Account Manager Forecasting](../../user-processes/account-manager/forecasting-workflow.md) ✓ VERIFIED
- [User Process - District Manager Forecasting](../../user-processes/district-manager/forecasting-review.md) ✓ VERIFIED

## Open Questions & Areas for Further Discovery

- Exact list of simplified inputs for AMs (site metrics, specific expenses)
- Detailed logic for reporting and exception handling (thresholds, review process)
- Precise workflow for forecast approval at different levels
- Definitive strategy for handling "10 percenter" sites for forecasting
- Specifics of machine learning application for DM-level overlays and predictive elements
- Detailed requirements for "what-if" scenario planning tools (inputs, outputs, user interaction)
- How Proforma data specifically impacts top-side/roll-up forecasts and new business placeholder management
- Further details on desired P&L and Statistics views for each user role
- Clarification on "above unit" (top-side, new/lost business) forecast inputs management in new system interface
- Detailed requirements for proxy access management

## Success Validation Criteria

The forecasting system transformation will be successful when:

✅ **COMPLETENESS**: Original Excel-based processes can be retired because ALL functionality is preserved and enhanced
✅ **USABILITY**: Field teams can execute forecasting processes using ONLY the new system with improved efficiency
✅ **ACCURACY**: Business teams can make decisions using forecasts with equal or better accuracy than current state
✅ **CONNECTIVITY**: All forecast data is discoverable and accessible through integrated reporting and analytics
✅ **MAINTAINABILITY**: System follows consistent architecture and can be easily updated and enhanced
✅ **SCALABILITY**: Solution supports all sites including complex "10 percenters" and can grow with business needs
## Quick Links

- [Forecasting Business Rules](../../business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md)
- [Billing Technical Architecture](../../technical/backend/20250716_Billing_TechnicalArchitecture_Development.md)
- [Billing System Overview](../billing/overview.md)
- [User Process - Account Manager Forecasting](../../user-processes/account-manager/forecasting-workflow.md)
- [User Process - District Manager Forecasting](../../user-processes/district-manager/forecasting-review.md)
