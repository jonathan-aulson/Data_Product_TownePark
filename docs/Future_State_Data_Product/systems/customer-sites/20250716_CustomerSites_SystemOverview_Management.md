---
title: "Towne Park Customer Sites - Management System Overview"
description: "Comprehensive overview of Towne Park's customer site management system, territory organization, and operational data structure"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-05-20
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "20250520_PROD - Customer Site Table Data.md"
systems:
  - Customer Site Management
  - Territory Management
  - Contact Management
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Customer Site Management
  - Field Operations
  - Account Management
  - Territory Management
  - Contact Management
  - Capacity Planning
user_roles:
  - Account Manager
  - District Manager
  - Regional Manager/VP
  - Billing Admin
  - Site Operations
tags:
  - customer-sites
  - territory-management
  - site-operations
  - contact-management
  - system-overview
---

# Towne Park Customer Sites - Management System Overview

## Purpose

The Customer Site Management System serves as the central repository and operational framework for managing Towne Park's extensive portfolio of customer sites across multiple geographic territories. This system maintains comprehensive site information, organizational hierarchy, contact management, and operational capacity data for 651+ active customer sites nationwide.

## Business Context

### Strategic Importance
The customer site management system forms the foundation of Towne Park's field operations, enabling:
- **Territory-based organization** with clear hierarchical structure from SVP regions down to individual sites
- **Account management efficiency** through structured assignment of account managers to specific site portfolios
- **Operational capacity planning** with detailed parking space and room count tracking
- **Billing system integration** through GL string assignments and vendor ID management
- **Contact management** for streamlined communication and service delivery

### Operational Scope
- **651 active customer sites** across major US metropolitan areas
- **Multi-level territory organization** (SVP Region → District → Account Manager → Sites)
- **Comprehensive site data** including addresses, contacts, capacity metrics, and operational parameters
- **Integration touchpoints** with billing, forecasting, and contract management systems

## Key Features

### 1. Hierarchical Territory Management
**Three-tier organizational structure:**
- **SVP Regional Level**: Strategic oversight and regional coordination
- **District Manager Level**: Operational management and local market focus
- **Account Manager Level**: Direct client relationship management and site operations

**Territory Coverage:**
- Major metropolitan markets including Atlanta, Chicago, Dallas, Los Angeles, New York
- Regional specialization with dedicated leadership for each geographic area
- Scalable structure supporting expansion into new markets

### 2. Comprehensive Site Data Management
**Core Site Information:**
- **Site Identification**: Unique site numbers, names, and classification codes
- **Location Data**: Complete addresses with city, state, and geographic coordinates
- **Operational Metrics**: Parking space counts, room availability, and capacity utilization
- **Business Classification**: GL string assignments, vendor IDs, and legal entity associations

**Contact Management:**
- **Primary Billing Contacts**: Designated personnel for financial communications
- **Operational Contacts**: Site-level personnel for day-to-day operations
- **Management Hierarchy**: Clear escalation paths through account and district managers

### 3. Capacity Planning and Optimization
**Parking Management:**
- **Space Inventory**: Total parking spaces available at each site
- **Utilization Tracking**: Occupancy rates and capacity optimization metrics
- **Revenue Optimization**: Space allocation strategies for maximum profitability

**Room Management:**
- **Room Count Tracking**: Available rooms for hospitality and event venues
- **Capacity Planning**: Room utilization and booking optimization
- **Service Integration**: Coordination with valet and parking services

### 4. System Integration Architecture
**Billing System Integration:**
- **GL String Mapping**: Direct integration with financial systems for revenue tracking
- **Vendor ID Management**: Streamlined vendor payment and expense allocation
- **Contract Linkage**: Connection to contract management for service agreement tracking

**Operational System Integration:**
- **Forecasting Data Feed**: Site capacity data feeds into revenue forecasting models
- **Performance Metrics**: Site-level KPIs integrated with corporate dashboards
- **Reporting Infrastructure**: Automated reporting for territory and site performance

## System Architecture

### Data Model Overview
```
Customer Site Entity:
├── Site Identification
│   ├── Site Number (Primary Key)
│   ├── Site Name
│   └── Classification Code
├── Location Information
│   ├── Street Address
│   ├── City, State, ZIP
│   └── Geographic Coordinates
├── Organizational Assignment
│   ├── SVP Region
│   ├── District Manager
│   └── Account Manager
├── Operational Data
│   ├── Parking Spaces
│   ├── Room Count
│   └── Capacity Metrics
├── Business Configuration
│   ├── GL String
│   ├── Vendor ID
│   └── Legal Entity
└── Contact Management
    ├── Billing Contact
    ├── Phone Numbers
    └── Email Addresses
```

### Integration Points
**Upstream Systems:**
- **Contract Management**: Site assignments and service agreements
- **HR Systems**: Account manager and district manager assignments
- **Legal Systems**: Entity structure and compliance requirements

**Downstream Systems:**
- **Billing System**: Revenue calculation and invoice generation
- **Forecasting System**: Capacity-based revenue projections
- **Reporting Platform**: Performance metrics and operational dashboards

## Business Impact

### Operational Efficiency
- **Streamlined territory management** with clear accountability and reporting structure
- **Optimized account manager workloads** through balanced site portfolio assignments
- **Enhanced customer service** through dedicated contact management and escalation paths

### Financial Performance
- **Revenue optimization** through capacity planning and utilization tracking
- **Cost management** through efficient territory organization and resource allocation
- **Billing accuracy** through integrated GL string and vendor ID management

### Strategic Advantages
- **Scalable growth platform** supporting expansion into new markets and territories
- **Data-driven decision making** through comprehensive site performance metrics
- **Competitive differentiation** through superior site management and customer service

## Related Documentation

- [Customer Site Directory](customer-site-directory.md) ✓ VERIFIED
- [Territory Management Workflows](../../user-processes/territory-admin/territory-management.md) 🔄 PLANNED
- [Site Classification Rules](../../business-rules/customer-sites/site-classification-rules.md) ✓ VERIFIED
- [Territory Assignment Rules](../../business-rules/customer-sites/territory-assignment-rules.md) 🔄 PLANNED
- [Capacity Management Rules](../../business-rules/customer-sites/capacity-management-rules.md) 🔄 PLANNED
- [Customer Site Database Schema](../../technical/database/customer-sites-data-schema.md) ✓ VERIFIED
- [Site Management API Specification](../../technical/api/customer-sites-api-spec.md) 🔄 PLANNED
- [Site Onboarding Workflow](../../user-processes/site-admin/site-onboarding-workflow.md) ✓ VERIFIED
- [Contact Management Procedures](../../user-processes/site-admin/contact-management-procedures.md) 🔄 PLANNED
- [Territory Reporting Procedures](../../user-processes/territory-admin/territory-reporting-procedures.md) 🔄 PLANNED
- [Site Setup Configuration](../../configuration/customer-sites/site-setup-configuration.md) ✓ VERIFIED
- [Territory Configuration Guide](../../configuration/customer-sites/territory-configuration-guide.md) 🔄 PLANNED
- [Billing System Integration](../../technical/integration/customer-sites-billing-integration.md) 🔄 PLANNED
- [Forecasting Data Integration](../../technical/integration/customer-sites-forecasting-integration.md) 🔄 PLANNED

## Code Validation Report
**Last Validated**: 2025-07-16
**Validation Scope**: Technical Configuration | Integration Points

### Validation Summary
- ✅ **Verified Elements**: 0 items (no direct code validation opportunities identified)
- ⚠️ **Discrepancies Found**: 0 items
- ❓ **Incomplete Documentation**: 0 items
- 🔍 **Requires Review**: 1 item needs stakeholder verification

### Detailed Validation Results

#### Integration Configuration Validation
**Validation Status**: 🔍 **REQUIRES_REVIEW**
**Findings**: Customer site data structure suggests integration with billing and forecasting systems, but specific integration configurations require validation against actual Power Platform implementation.
**Recommendations**: Review Power Platform connectors and data flow configurations to validate integration architecture described in this overview.

### Code File References
- **Integration Files**: Requires review of Power Platform connector configurations
- **Database Files**: Customer site table schema validation needed
- **API Files**: Site management API endpoint validation required

### Validation Methodology
- **Code Copy Date**: 2025-07-16
- **Validation Approach**: Data structure analysis and integration point identification
- **Limitations**: Limited code validation opportunities for customer site data; primarily data structure and business rule validation
## Quick Links

- [Customer Site Directory](customer-site-directory.md)
- [Site Classification Rules](../../business-rules/customer-sites/site-classification-rules.md)
- [Customer Site Database Schema](../../technical/database/customer-sites-data-schema.md)
- [Site Onboarding Workflow](../../user-processes/site-admin/site-onboarding-workflow.md)
- [Site Setup Configuration](../../configuration/customer-sites/site-setup-configuration.md)
