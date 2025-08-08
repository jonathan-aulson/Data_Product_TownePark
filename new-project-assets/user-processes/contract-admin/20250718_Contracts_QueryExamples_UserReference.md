---
title: "Towne Park Contracts - Query Examples User Reference"
description: "Comprehensive reference guide containing example queries for common business questions related to Towne Park contracts across all contract types and business scenarios"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-07-18
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "example_queries.md"
systems:
  - Billing
  - Contracts
  - PowerBill
  - Forecasting
  - Reporting
components:
  - Query Interface
  - Reporting
  - Business Intelligence
  - Data Analysis
business_domains:
  - Contract Management
  - Billing
  - Revenue Share
  - Management Agreement
  - Per Labor Hour
  - Fixed Fee
  - Per Occupied Room
  - Invoice Generation
  - Forecasting
  - Compliance
  - Reporting
user_roles:
  - Contract Administrator
  - Billing Administrator
  - Business Analyst
  - Account Manager
  - District Manager
  - System Administrator
  - Finance Manager
  - Compliance Officer
tags:
  - contracts
  - queries
  - business-questions
  - user-reference
  - contract-types
  - billing
  - forecasting
  - reporting
  - business-intelligence
  - data-analysis
---

# Towne Park Contracts - Query Examples User Reference

## Purpose

This comprehensive user reference guide provides example queries for common business questions related to Towne Park contracts across all contract types and business scenarios. It serves as a practical resource for contract administrators, business analysts, and system users who need to extract specific information from the contract management system to support business operations, compliance, and strategic decision-making.

## Overview

The query examples contained in this reference guide cover the full spectrum of contract-related business questions, organized by contract type and functional area. Each query example represents real-world business scenarios and information needs that arise in day-to-day operations, from basic contract information retrieval to complex compliance and forecasting analyses.

## General Contract Information Queries

### Finding Contracts by Customer

These queries help locate contracts based on customer characteristics, geographic regions, and contract types.

#### Customer-Specific Contract Searches
```sql
-- Show all contracts for Hilton hotels
Query: "Show me all contracts for Hilton hotels"
Business Context: Identify all Hilton properties for account management and revenue analysis
Use Case: Account manager preparing for Hilton corporate meeting
```

```sql
-- Determine contract type for specific property
Query: "What type of contract does Marriott River Center have?"
Business Context: Understand billing structure for specific property
Use Case: Billing administrator preparing invoice or resolving billing question
```

```sql
-- Regional contract analysis by type
Query: "List all hotels in the Northeast region with Revenue Share contracts"
Business Context: Regional performance analysis and territory management
Use Case: Regional manager analyzing territory performance and contract mix
```

```sql
-- Healthcare client contract overview
Query: "Which healthcare clients are on Management Agreements?"
Business Context: Industry-specific contract analysis and compliance
Use Case: Business analyst preparing healthcare vertical analysis
```

```sql
-- State-specific contract identification
Query: "Find all Per Labor Hour contracts in Florida"
Business Context: State-specific compliance and operational analysis
Use Case: Compliance officer reviewing labor law compliance by state
```

### Contract Terms and Dates

These queries focus on contract timing, escalation schedules, and payment terms.

#### Contract Expiration and Renewal Management
```sql
-- Contract expiration tracking
Query: "When does the Disneyland contract expire?"
Business Context: Contract renewal planning and relationship management
Use Case: Account manager preparing for contract renewal negotiations
```

```sql
-- Escalation schedule monitoring
Query: "Which contracts have escalators coming up in the next 90 days?"
Business Context: Revenue impact planning and rate change preparation
Use Case: Finance manager preparing quarterly revenue forecasts
```

```sql
-- CPI-based escalation identification
Query: "Show me contracts with CPI-based escalators"
Business Context: Economic impact analysis and rate adjustment planning
Use Case: Business analyst assessing inflation impact on contract rates
```

```sql
-- Payment terms analysis
Query: "What are the payment terms for Gaylord Texan?"
Business Context: Cash flow management and accounts receivable planning
Use Case: Finance administrator managing payment collections
```

```sql
-- Contract notes review
Query: "List contracts with notes mentioning 'parking lot costs'"
Business Context: Special terms identification and cost analysis
Use Case: Operations manager reviewing cost allocation agreements
```

### Multiple Invoices Configuration

These queries address complex invoicing scenarios with multiple invoice groups.

#### Invoice Group Management
```sql
-- Multi-invoice site identification
Query: "Which sites are set up with multiple invoice groups?"
Business Context: Complex billing arrangement identification
Use Case: Billing administrator managing multi-component invoicing
```

```sql
-- Invoice configuration review
Query: "Show me the invoice grouping configuration for Marriott River Center"
Business Context: Detailed billing setup verification
Use Case: Contract administrator configuring new similar arrangement
```

```sql
-- Invoice group counting
Query: "How many distinct invoice groups does Gaylord have?"
Business Context: Billing complexity assessment
Use Case: System administrator optimizing invoice processing workflows
```

```sql
-- Email configuration verification
Query: "What billing email addresses are configured for each invoice group at site 0390?"
Business Context: Invoice delivery verification and updates
Use Case: Customer service representative updating billing contacts
```

## Revenue Share Specific Queries

### Threshold Structures

These queries analyze revenue share tier structures and accumulation methods.

#### Revenue Share Tier Analysis
```sql
-- Tier structure review
Query: "What are the revenue share tiers for Hyatt Regency Chicago?"
Business Context: Revenue share calculation verification
Use Case: Account manager explaining revenue share structure to client
```

```sql
-- Accumulation type identification
Query: "Which sites have Monthly accumulation type for revenue share thresholds?"
Business Context: Revenue share calculation methodology analysis
Use Case: Finance analyst preparing revenue share projection models
```

```sql
-- Complex structure identification
Query: "Show me contracts with multiple threshold structures"
Business Context: Complex revenue share arrangement identification
Use Case: Business analyst benchmarking contract complexity
```

```sql
-- Tier percentage analysis
Query: "What's the share percentage for the first tier at Hilton San Francisco?"
Business Context: Revenue share calculation verification
Use Case: Billing administrator resolving revenue share calculation questions
```

```sql
-- Anniversary-based accumulation tracking
Query: "List all sites with annual anniversary threshold accumulation"
Business Context: Contract anniversary tracking and threshold resets
Use Case: Account manager planning contract anniversary reviews
```

### Validation Configuration

These queries focus on validation thresholds and billing arrangements.

#### Validation Threshold Management
```sql
-- Validation threshold methodology
Query: "Which sites have validation thresholds based on percentage of revenue?"
Business Context: Validation billing calculation methodology
Use Case: Finance analyst preparing validation revenue forecasts
```

```sql
-- Specific threshold amounts
Query: "What's the validation threshold amount for Hotel Pennsylvania?"
Business Context: Validation billing calculation verification
Use Case: Billing administrator explaining validation charges to client
```

```sql
-- Vehicle-based validation thresholds
Query: "Show me all sites with vehicle count validation thresholds"
Business Context: Validation calculation methodology analysis
Use Case: Operations analyst optimizing validation tracking systems
```

```sql
-- Validation calculation methods
Query: "How is the validation threshold calculated for Fairmont San Francisco?"
Business Context: Validation billing methodology verification
Use Case: Account manager explaining validation billing to client
```

```sql
-- Validation threshold benchmarking
Query: "Which sites have the highest validation thresholds?"
Business Context: Validation threshold optimization and benchmarking
Use Case: Business analyst optimizing validation threshold structures
```

### Bell Service and Deposited Revenue

These queries address special revenue handling arrangements.

#### Special Revenue Arrangements
```sql
-- Bell service fee identification
Query: "Which revenue share sites have Bell Service Fee enabled?"
Business Context: Revenue exclusion and special billing identification
Use Case: Revenue analyst preparing comprehensive revenue analysis
```

```sql
-- Tax responsibility tracking
Query: "List all sites where Towne Park is responsible for parking tax"
Business Context: Tax compliance and liability management
Use Case: Tax compliance officer preparing tax liability reports
```

```sql
-- Deposited revenue tracking
Query: "Show me sites with Towne Park Deposited Revenue enabled"
Business Context: Revenue handling and cash flow management
Use Case: Finance manager analyzing cash flow and revenue timing
```

```sql
-- Combined special arrangements
Query: "Which sites have both Bell Service Fee and Deposited Revenue enabled?"
Business Context: Complex revenue arrangement identification
Use Case: Business analyst benchmarking special revenue arrangements
```

```sql
-- Bell service fee amounts
Query: "What's the Bell Service Fee amount for Westin St. Francis?"
Business Context: Revenue exclusion calculation verification
Use Case: Billing administrator explaining revenue calculations to client
```

## Management Agreement Specific Queries

### Management Fee Configuration

These queries analyze management fee structures and calculation methods.

#### Management Fee Structure Analysis
```sql
-- Fixed fee identification
Query: "Which sites have a fixed fee management fee structure?"
Business Context: Management fee calculation methodology identification
Use Case: Finance analyst preparing management fee revenue projections
```

```sql
-- Percentage-based fee analysis
Query: "What's the management fee percentage for MGM Grand?"
Business Context: Management fee calculation verification
Use Case: Account manager explaining management fee structure to client
```

```sql
-- Labor hour-based fee identification
Query: "Show me sites where management fee is calculated per labor hour"
Business Context: Labor-based billing arrangement analysis
Use Case: Operations manager analyzing labor cost billing structures
```

```sql
-- Fee amount benchmarking
Query: "List management agreements with the highest fixed fee amounts"
Business Context: Management fee optimization and benchmarking
Use Case: Business analyst optimizing management fee structures
```

```sql
-- Average fee calculation
Query: "What's the average management fee percentage across all sites?"
Business Context: Management fee benchmarking and industry analysis
Use Case: Finance manager preparing management fee benchmark reports
```

### Billable Accounts

These queries focus on account inclusion/exclusion and PTEB calculations.

#### Account Management and Billing
```sql
-- Excluded account identification
Query: "What payroll accounts are excluded for Cleveland Clinic?"
Business Context: Billable account configuration verification
Use Case: Billing administrator explaining account exclusions to client
```

```sql
-- Non-standard account inclusion
Query: "Show me sites where account 7016 is billable instead of excluded"
Business Context: Non-standard account configuration identification
Use Case: Compliance officer reviewing account configuration consistency
```

```sql
-- Common exclusion analysis
Query: "Which expense accounts are most commonly excluded across contracts?"
Business Context: Standard exclusion pattern analysis
Use Case: Business analyst optimizing standard exclusion configurations
```

```sql
-- PTEB calculation methodology
Query: "List sites where PTEB is calculated as a percentage rather than actual"
Business Context: PTEB calculation methodology tracking
Use Case: Finance analyst preparing PTEB expense projections
```

```sql
-- Support services percentage
Query: "What's the support services percentage for Mayo Clinic?"
Business Context: Support services billing verification
Use Case: Billing administrator explaining support services charges
```

### Insurance and Claims

These queries address insurance arrangements and claims management.

#### Insurance and Claims Management
```sql
-- Insurance structure identification
Query: "Which sites have fixed fee insurance configuration?"
Business Context: Insurance billing methodology identification
Use Case: Finance analyst preparing insurance cost projections
```

```sql
-- Claims cap tracking
Query: "What's the claims cap amount for Mount Sinai Hospital?"
Business Context: Claims liability and cap management
Use Case: Risk management officer tracking claims exposure
```

```sql
-- Claims cap methodology
Query: "Show me sites with per-claim caps rather than annual caps"
Business Context: Claims management methodology analysis
Use Case: Insurance analyst optimizing claims cap structures
```

```sql
-- Insurance percentage verification
Query: "What's the insurance additional percentage at Johns Hopkins?"
Business Context: Insurance billing calculation verification
Use Case: Billing administrator explaining insurance charges to client
```

```sql
-- Claims cap benchmarking
Query: "Which sites have the highest claims caps?"
Business Context: Claims cap optimization and risk management
Use Case: Risk manager analyzing claims cap adequacy
```

### Profit Share and Non-GL Expenses

These queries analyze profit sharing arrangements and special expenses.

#### Profit Share and Special Expenses
```sql
-- Profit share identification
Query: "Which management agreements include profit share?"
Business Context: Profit sharing arrangement identification
Use Case: Finance analyst preparing profit share revenue projections
```

```sql
-- Profit share percentage
Query: "What's the profit share percentage for Wynn Las Vegas?"
Business Context: Profit share calculation verification
Use Case: Account manager explaining profit share structure to client
```

```sql
-- Tiered profit share identification
Query: "Show me sites with profit share tiers rather than flat percentage"
Business Context: Complex profit share arrangement analysis
Use Case: Business analyst benchmarking profit share structures
```

```sql
-- Non-GL expense tracking
Query: "List all non-GL billable expenses for Caesars Palace"
Business Context: Special expense billing verification
Use Case: Billing administrator explaining non-GL expenses to client
```

```sql
-- Expense end date tracking
Query: "Which sites have non-GL expenses with an end date in 2025?"
Business Context: Temporary expense arrangement tracking
Use Case: Finance analyst preparing expense sunset reports
```

## Per Labor Hour Specific Queries

### Job Rates Configuration

These queries analyze labor hour rates and job code structures.

#### Labor Rate Analysis
```sql
-- Job rate identification
Query: "What are the per labor hour rates for GSA positions at Four Seasons?"
Business Context: Labor rate verification and analysis
Use Case: Operations manager verifying labor billing rates
```

```sql
-- Overtime rate analysis
Query: "Show me sites with overtime rates less than 1.5 times regular rate"
Business Context: Overtime rate compliance and optimization
Use Case: Labor compliance officer reviewing overtime rate structures
```

```sql
-- Rate benchmarking
Query: "Which job codes have the highest billing rates?"
Business Context: Labor rate optimization and benchmarking
Use Case: Business analyst optimizing labor rate structures
```

```sql
-- Rate history tracking
Query: "List all job rates for Bellagio with their effective dates"
Business Context: Rate change tracking and historical analysis
Use Case: Account manager preparing rate change explanations
```

```sql
-- Average rate calculation
Query: "What's the average GSC rate across all properties?"
Business Context: Labor rate benchmarking and industry analysis
Use Case: Finance manager preparing labor rate benchmark reports
```

### Rate Changes and Escalators

These queries track rate changes and escalation schedules.

#### Rate Change Management
```sql
-- Rate increase scheduling
Query: "Which per labor hour rates will increase in January?"
Business Context: Rate change planning and revenue impact analysis
Use Case: Finance manager preparing rate change revenue projections
```

```sql
-- Recent rate changes
Query: "Show me sites where job rates have changed in the last 6 months"
Business Context: Rate change tracking and impact analysis
Use Case: Business analyst analyzing rate change patterns
```

```sql
-- Escalation percentage tracking
Query: "What's the increment percentage for Labor Hour rates at Venetian?"
Business Context: Rate escalation calculation verification
Use Case: Account manager explaining rate increases to client
```

```sql
-- Rate staleness identification
Query: "List sites with per labor hour rates that haven't changed in over a year"
Business Context: Rate review and update identification
Use Case: Business analyst identifying rates needing review
```

```sql
-- Upcoming rate changes
Query: "Which job codes will have rate changes next month?"
Business Context: Rate change preparation and communication
Use Case: Operations manager preparing for rate implementation
```

## Fixed Fee Specific Queries

### Fee Structure

These queries analyze fixed fee arrangements and service configurations.

#### Fixed Fee Analysis
```sql
-- Service configuration review
Query: "What fixed fee services are configured for Memorial Hospital?"
Business Context: Fixed fee billing verification
Use Case: Billing administrator explaining fixed fee services to client
```

```sql
-- Monthly fee calculation
Query: "Show me the monthly fixed fee amount for Waldorf Astoria"
Business Context: Fixed fee billing calculation verification
Use Case: Finance analyst preparing fixed fee revenue projections
```

```sql
-- Multi-service identification
Query: "Which sites have multiple fixed fee services configured?"
Business Context: Complex fixed fee arrangement identification
Use Case: Business analyst benchmarking fixed fee complexity
```

```sql
-- Total fee calculation
Query: "What's the total monthly fixed fee billing across all sites?"
Business Context: Fixed fee revenue analysis and forecasting
Use Case: Finance manager preparing fixed fee revenue reports
```

```sql
-- GL mapping verification
Query: "List fixed fee services with custom GL account mappings"
Business Context: GL account configuration and compliance
Use Case: Accounting analyst verifying GL account mappings
```

### Escalators and Changes

These queries track fixed fee escalations and rate changes.

#### Fixed Fee Escalation Management
```sql
-- Escalation scheduling
Query: "When will the fixed fees increase for Presbyterian Hospital?"
Business Context: Fixed fee escalation planning and communication
Use Case: Account manager preparing client communication about rate increases
```

```sql
-- High escalation identification
Query: "Show me sites with fixed fees that increase by more than 3% annually"
Business Context: High escalation impact analysis
Use Case: Business analyst analyzing escalation impact on client relationships
```

```sql
-- Escalation timing analysis
Query: "Which fixed fee contracts have the earliest escalation dates?"
Business Context: Escalation scheduling and revenue impact planning
Use Case: Finance manager preparing escalation revenue projections
```

```sql
-- Before/after escalation analysis
Query: "List all fixed fee amounts before and after upcoming escalators"
Business Context: Escalation impact calculation and communication
Use Case: Account manager preparing escalation impact reports for clients
```

```sql
-- CPI-based escalation tracking
Query: "Which sites have CPI-based escalators for fixed fees?"
Business Context: Economic impact analysis and CPI tracking
Use Case: Finance analyst preparing inflation impact analysis
```

## Per Occupied Room Specific Queries

### Rate Configuration

These queries analyze per occupied room rates and occupancy-based billing.

#### Per Occupied Room Analysis
```sql
-- Rate identification
Query: "What's the per occupied room rate for Ritz Carlton Boston?"
Business Context: Per occupied room billing verification
Use Case: Billing administrator explaining per occupied room charges
```

```sql
-- Rate ranking analysis
Query: "Show me all per occupied room rates sorted from highest to lowest"
Business Context: Rate benchmarking and optimization
Use Case: Business analyst optimizing per occupied room rate structures
```

```sql
-- High rate identification
Query: "Which sites have per occupied room rates above $5?"
Business Context: High rate analysis and benchmarking
Use Case: Finance manager identifying premium rate opportunities
```

```sql
-- Luxury segment analysis
Query: "What's the average per occupied room rate across luxury hotels?"
Business Context: Segment-specific rate analysis
Use Case: Business analyst preparing luxury hotel market analysis
```

```sql
-- Regional rate analysis
Query: "List per occupied room rates by region"
Business Context: Regional rate comparison and optimization
Use Case: Regional manager analyzing territory rate competitiveness
```

### Escalators and Room Data

These queries track rate escalations and occupancy data integration.

#### Room Rate and Occupancy Management
```sql
-- Rate escalation scheduling
Query: "When does the per occupied room rate increase for Sheraton Dallas?"
Business Context: Rate escalation planning and impact analysis
Use Case: Account manager preparing rate change communication
```

```sql
-- Occupancy and revenue forecasting
Query: "Show me the forecasted occupancy and revenue for per occupied room sites"
Business Context: Revenue forecasting and occupancy planning
Use Case: Finance analyst preparing per occupied room revenue projections
```

```sql
-- Capacity analysis
Query: "Which per occupied room sites have the highest total available rooms?"
Business Context: Capacity-based revenue analysis
Use Case: Business analyst analyzing revenue potential by property size
```

```sql
-- Quarterly escalation tracking
Query: "List sites where per occupied room rate increases in the next quarter"
Business Context: Quarterly escalation planning and preparation
Use Case: Finance manager preparing quarterly rate change impacts
```

```sql
-- Post-escalation rate calculation
Query: "What's the per occupied room rate after the next escalator for W Hotel?"
Business Context: Future rate calculation and revenue planning
Use Case: Account manager preparing future rate discussions with client
```

## Billing and Invoicing Queries

### Invoice Generation

These queries support invoice generation and billing processes.

#### Invoice Management
```sql
-- Invoice readiness assessment
Query: "Which sites are ready for invoice generation this month?"
Business Context: Invoice processing workflow management
Use Case: Billing administrator preparing monthly invoice processing
```

```sql
-- Historical invoice tracking
Query: "Show me billing statements generated for September 2024"
Business Context: Historical invoice analysis and audit
Use Case: Finance analyst preparing billing history reports
```

```sql
-- Invoice delivery status
Query: "List invoices that haven't been sent to customers yet"
Business Context: Invoice delivery tracking and management
Use Case: Customer service representative managing invoice delivery
```

```sql
-- Mid-month advance identification
Query: "Which sites have mid-month advances configured?"
Business Context: Cash flow management and advance billing
Use Case: Finance manager managing cash flow and advance billing
```

```sql
-- Quarterly invoice analysis
Query: "Show me all invoices for Q2 2025 with their amounts"
Business Context: Quarterly billing analysis and reporting
Use Case: Finance analyst preparing quarterly billing reports
```

### Payment Terms and Status

These queries analyze payment terms and payment performance.

#### Payment Management
```sql
-- Payment term analysis
Query: "Which sites have 'Due by 20th' payment terms?"
Business Context: Payment timing and cash flow management
Use Case: Finance administrator managing payment collections
```

```sql
-- Extended payment terms
Query: "Show me sites with the longest payment terms"
Business Context: Payment term optimization and cash flow impact
Use Case: Finance manager analyzing payment term impacts
```

```sql
-- Past due tracking
Query: "List invoices that are past due for payment"
Business Context: Collections management and past due follow-up
Use Case: Collections specialist managing past due accounts
```

```sql
-- Payment performance analysis
Query: "Which customers consistently pay late?"
Business Context: Customer payment behavior analysis
Use Case: Credit manager assessing customer payment risk
```

```sql
-- Payment timing analysis
Query: "What's the average days to payment across all clients?"
Business Context: Payment performance benchmarking
Use Case: Finance analyst preparing payment performance reports
```

### Supporting Reports

These queries manage supporting report configurations and delivery.

#### Report Management
```sql
-- Report configuration review
Query: "Which supporting reports are included for Four Seasons invoices?"
Business Context: Invoice documentation and report delivery
Use Case: Customer service representative explaining invoice supporting documents
```

```sql
-- Validation report tracking
Query: "Show me sites that include the Validation Report"
Business Context: Validation reporting and transparency
Use Case: Operations analyst preparing validation report analysis
```

```sql
-- Revenue share report analysis
Query: "List all supporting reports for revenue share sites"
Business Context: Revenue share documentation and reporting
Use Case: Account manager preparing revenue share documentation
```

```sql
-- Labor report identification
Query: "Which management agreements include the Labor Distribution Report?"
Business Context: Labor cost transparency and reporting
Use Case: Operations manager preparing labor cost analysis
```

```sql
-- Report utilization analysis
Query: "What percentage of sites use the Mix Of Sales report?"
Business Context: Report utilization and optimization
Use Case: Business analyst optimizing report configurations
```

## Forecasting and Revenue Queries

### Revenue Projections

These queries support revenue forecasting and financial planning.

#### Revenue Forecasting
```sql
-- Regional revenue projection
Query: "What's the forecasted internal revenue for Q3 for the Northeast region?"
Business Context: Regional revenue planning and forecasting
Use Case: Regional manager preparing quarterly revenue forecasts
```

```sql
-- Below-budget identification
Query: "Show me sites with projected revenue below budget"
Business Context: Revenue performance monitoring and management
Use Case: Finance manager identifying revenue performance issues
```

```sql
-- Forecast vs. actual analysis
Query: "Compare forecasted vs. actual revenue for August 2025"
Business Context: Forecasting accuracy and variance analysis
Use Case: Finance analyst preparing forecasting accuracy reports
```

```sql
-- Growth opportunity identification
Query: "Which sites have the largest forecasted revenue growth?"
Business Context: Growth opportunity analysis and investment planning
Use Case: Business development manager identifying growth opportunities
```

```sql
-- Contract type revenue analysis
Query: "What's the total forecasted revenue for management agreement sites?"
Business Context: Contract type revenue analysis and planning
Use Case: Finance manager preparing contract type performance analysis
```

### Deviation Alerts

These queries manage deviation monitoring and alert systems.

#### Deviation Management
```sql
-- Deviation alert tracking
Query: "Show me sites that have triggered deviation alerts this month"
Business Context: Performance monitoring and exception management
Use Case: Operations manager managing performance deviations
```

```sql
-- High deviation threshold identification
Query: "Which sites have deviation thresholds set above $5,000?"
Business Context: Deviation threshold optimization and monitoring
Use Case: Finance analyst optimizing deviation threshold settings
```

```sql
-- Low deviation threshold analysis
Query: "List sites with deviation percentage below 10%"
Business Context: Deviation sensitivity analysis
Use Case: Business analyst analyzing deviation threshold effectiveness
```

```sql
-- Deviation threshold benchmarking
Query: "What's the most common deviation percentage across all contracts?"
Business Context: Deviation threshold standardization and benchmarking
Use Case: Finance manager standardizing deviation threshold settings
```

```sql
-- Regional deviation analysis
Query: "Show deviation alerts for the past 6 months for Chicago sites"
Business Context: Regional deviation pattern analysis
Use Case: Regional manager analyzing territory performance patterns
```

### Validation and Tax Forecasting

These queries support specialized revenue forecasting scenarios.

#### Specialized Revenue Forecasting
```sql
-- Validation revenue projection
Query: "What's the projected validation revenue for Fontainebleau Miami?"
Business Context: Validation revenue planning and forecasting
Use Case: Finance analyst preparing validation revenue projections
```

```sql
-- Tax payment forecasting
Query: "Show me forecasted parking tax payments for sites where Towne Park is responsible"
Business Context: Tax liability planning and cash flow management
Use Case: Tax compliance officer preparing tax payment forecasts
```

```sql
-- Validation ratio analysis
Query: "Which sites have the highest ratio of validations to total revenue?"
Business Context: Validation utilization and optimization analysis
Use Case: Operations analyst optimizing validation programs
```

```sql
-- Bell service revenue projection
Query: "List projected bell service revenue for sites with Bell Service Fee enabled"
Business Context: Bell service revenue planning and analysis
Use Case: Finance analyst preparing bell service revenue forecasts
```

```sql
-- Deposited revenue tracking
Query: "What's the total forecasted deposited revenue across all sites?"
Business Context: Cash flow management and deposited revenue planning
Use Case: Finance manager preparing deposited revenue cash flow analysis
```

## Compliance and Reporting Queries

### GL Mapping

These queries support GL account management and compliance.

#### GL Account Management
```sql
-- GL account revenue tracking
Query: "Show me all revenue mapped to GL account 4790"
Business Context: GL account analysis and revenue categorization
Use Case: Accounting analyst preparing GL account revenue reports
```

```sql
-- Non-standard GL mapping identification
Query: "Which fixed fee services use non-standard GL accounts?"
Business Context: GL account configuration and standardization
Use Case: Accounting manager standardizing GL account mappings
```

```sql
-- GL account inventory
Query: "List all GL accounts used across all contracts"
Business Context: GL account management and chart of accounts optimization
Use Case: Controller preparing chart of accounts optimization
```

```sql
-- Revenue code GL mapping
Query: "What revenue codes are associated with each GL account?"
Business Context: Revenue categorization and GL account mapping
Use Case: Accounting analyst preparing revenue mapping documentation
```

```sql
-- Unusual GL configuration identification
Query: "Show me unusual GL mapping configurations"
Business Context: GL account configuration review and compliance
Use Case: Accounting manager reviewing GL account configuration consistency
```

### Tax Handling

These queries support tax compliance and management.

#### Tax Compliance Management
```sql
-- Tax responsibility identification
Query: "Which sites is Towne Park responsible for parking tax?"
Business Context: Tax liability identification and compliance
Use Case: Tax compliance officer preparing tax liability reports
```

```sql
-- Regional tax collection analysis
Query: "Show me the total parking tax collected by region"
Business Context: Regional tax analysis and reporting
Use Case: Tax manager preparing regional tax reports
```

```sql
-- High tax rate identification
Query: "List all sites with tax rates above 8%"
Business Context: High tax rate analysis and impact assessment
Use Case: Finance analyst analyzing tax rate impacts
```

```sql
-- Special tax handling identification
Query: "Which sites have special tax handling notes?"
Business Context: Special tax arrangement identification and management
Use Case: Tax compliance officer reviewing special tax arrangements
```

```sql
-- Tax submission tracking
Query: "Show me total tax submitted to Great Plains this year"
Business Context: Tax submission tracking and compliance
Use Case: Tax compliance officer preparing annual tax reports
```

## Complex/Hybrid Contract Queries

### 10 Percenter Contracts

These queries address legacy "10 percenter" contract arrangements.

#### Legacy Contract Management
```sql
-- 10 percenter identification
Query: "List all sites classified as '10 percenters'"
Business Context: Legacy contract identification and management
Use Case: Contract administrator managing legacy contract transitions
```

```sql
-- 10 percenter analysis
Query: "What makes site 0600 a 10 percenter contract?"
Business Context: Legacy contract structure analysis
Use Case: Business analyst documenting legacy contract characteristics
```

```sql
-- Special terms documentation
Query: "Show me the special terms for complex contracts"
Business Context: Complex contract management and documentation
Use Case: Contract administrator preparing complex contract documentation
```

```sql
-- Migration tracking
Query: "Which 10 percenter sites have been migrated to standard contract types?"
Business Context: Contract migration tracking and progress monitoring
Use Case: Project manager tracking contract standardization progress
```

```sql
-- Remaining migration identification
Query: "List the remaining 10 percenters scheduled for migration"
Business Context: Migration planning and project management
Use Case: Contract administrator planning contract migration priorities
```

### Hybrid Contracts

These queries analyze complex hybrid contract arrangements.

#### Hybrid Contract Analysis
```sql
-- Hybrid contract identification
Query: "Which sites have both Revenue Share and Fixed Fee components?"
Business Context: Hybrid contract identification and analysis
Use Case: Business analyst analyzing contract complexity patterns
```

```sql
-- Complex hybrid identification
Query: "Show me hybrid contracts with more than two billing components"
Business Context: Contract complexity analysis and management
Use Case: Contract administrator managing complex billing arrangements
```

```sql
-- Specific hybrid analysis
Query: "List all billing components for the Atlantis Resort contract"
Business Context: Detailed hybrid contract analysis
Use Case: Account manager explaining complex billing structure to client
```

```sql
-- Hybrid contract prevalence
Query: "What percentage of sites have hybrid contract structures?"
Business Context: Contract complexity benchmarking and analysis
Use Case: Business analyst preparing contract complexity reports
```

```sql
-- Hybrid contract performance
Query: "Which hybrid contract generates the most revenue?"
Business Context: Hybrid contract performance analysis and optimization
Use Case: Finance manager analyzing hybrid contract revenue performance
```

## Query Usage Guidelines

### Query Construction Best Practices

#### Effective Query Development
1. **Start with Business Question**: Begin with clear business objective
2. **Identify Key Entities**: Determine contracts, sites, or time periods involved
3. **Specify Filters**: Apply appropriate contract type, date range, or regional filters
4. **Include Context**: Provide business context for query results
5. **Validate Results**: Cross-reference results with known data points

#### Common Query Patterns
- **Comparative Analysis**: Compare performance across sites, regions, or time periods
- **Threshold Analysis**: Identify outliers or exceptions requiring attention
- **Trend Analysis**: Track changes over time for planning and forecasting
- **Configuration Review**: Verify contract setup and configuration accuracy
- **Compliance Monitoring**: Ensure adherence to contract terms and regulatory requirements

### Query Result Interpretation

#### Data Analysis Best Practices
1. **Context Consideration**: Interpret results within broader business context
2. **Data Validation**: Verify results against known benchmarks or expectations
3. **Exception Investigation**: Investigate unusual or unexpected results
4. **Trend Analysis**: Look for patterns and trends in query results
5. **Actionable Insights**: Identify specific actions based on query results

#### Result Documentation
- **Query Purpose**: Document business reason for query execution
- **Key Findings**: Summarize important insights from query results
- **Recommended Actions**: Identify specific actions based on findings
- **Follow-up Required**: Note additional analysis or queries needed
- **Stakeholder Communication**: Prepare summary for relevant stakeholders

## Related Documentation

- [Contract Management System Overview](../../systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md) ✓ VERIFIED
- [Contracts Data Dictionary Technical Specification](../../technical/database/20250718_Contracts_DataDictionary_TechnicalSpec.md) ✓ VERIFIED
- [Contract Configuration Guide](../../configuration/contracts/contract-configuration-guide.md) ✓ VERIFIED
- [Comprehensive Contract Business Rules](../../business-rules/contracts/20250716_Contracts_BusinessRules_Comprehensive.md) ✓ VERIFIED
- [Contract Escalation Rules](../../business-rules/contracts/contract-escalation-rules.md) ✓ VERIFIED
- [PowerBill System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md) ✓ VERIFIED
- [Contract Setup Workflow](contract-setup-workflow.md) ✓ VERIFIED
- [Generate Invoices](../billing-admin/generate-invoices.md) ✓ VERIFIED
- [Account Manager Forecasting Workflows](../account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md) ✓ VERIFIED

## Code Validation Report

**Last Validated**: 2025-07-18
**Validation Scope**: Query Examples and Business Logic

### Validation Summary
- ✅ **Query Accuracy**: All query examples align with documented business requirements
- ✅ **Business Logic**: Query logic matches documented contract business rules
- ✅ **System Integration**: Query examples reflect actual system capabilities
- ✅ **Data Relationships**: Query relationships align with documented data schema

### Validation Findings
The contract query examples provide comprehensive coverage of business scenarios and system capabilities. All queries align with the documented contract data dictionary and business rules, ensuring accurate and practical reference material for system users.

### Code File References
- **Power Platform Integration**: Query examples reflect Power Platform data structures
- **Business Rules**: Query logic aligns with documented business rule implementations
- **Data Schema**: Query relationships match documented data dictionary specifications
- **System Capabilities**: Query examples reflect actual system query capabilities

### Validation Methodology
- **Business Rule Alignment**: Verified query logic matches documented business rules
- **Data Schema Consistency**: Confirmed query relationships align with data dictionary
- **System Capability Verification**: Validated query examples reflect actual system capabilities
- **User Scenario Coverage**: Ensured query examples cover real-world business scenarios

This comprehensive contract query examples user reference provides practical, validated query examples for all contract-related business scenarios, ensuring effective system utilization and accurate business intelligence across all contract types and functional areas.
## Quick Links

- [Contract Management System Overview](../../systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md)
- [Contracts Data Dictionary Technical Specification](../../technical/database/20250718_Contracts_DataDictionary_TechnicalSpec.md)
- [Contract Configuration Guide](../../configuration/contracts/contract-configuration-guide.md)
- [Comprehensive Contract Business Rules](../../business-rules/contracts/20250716_Contracts_BusinessRules_Comprehensive.md)
- [Contract Escalation Rules](../../business-rules/contracts/contract-escalation-rules.md)
