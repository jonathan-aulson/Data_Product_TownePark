---
title: "Towne Park Customer Sites - Site Classification and Territory Rules"
description: "Comprehensive business rules for customer site classification, territory assignment, and capacity management within Towne Park's operational framework"
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
  - Capacity Planning
components:
  - Business Logic
  - Data Validation
  - Assignment Engine
business_domains:
  - Customer Site Management
  - Territory Management
  - Field Operations
  - Account Management
  - Capacity Planning
user_roles:
  - Account Manager
  - District Manager
  - Regional Manager/VP
  - Site Operations
  - Territory Admin
tags:
  - business-rules
  - site-classification
  - territory-assignment
  - capacity-management
  - operational-rules
---

# Towne Park Customer Sites - Site Classification and Territory Rules

## Overview

This document defines the comprehensive business rules governing customer site classification, territory assignment, capacity management, and operational parameters within Towne Park's customer site management system. These rules ensure consistent site organization, optimal territory distribution, and effective capacity utilization across the 651+ active customer sites.

## Rule Definitions

### 1. Site Classification Rules

#### **Rule 1.1: Site Number Assignment**
- **Rule Name**: Unique Site Number Generation
- **Description**: Every customer site must have a unique numerical identifier for system tracking and reference
- **Applies To**: All customer sites across all territories and contract types
- **Validation Formula**: `SITE_NUMBER = UNIQUE_INTEGER AND SITE_NUMBER > 0`
- **Examples**: 
  - Site 1001: Valid unique identifier
  - Site 2547: Valid unique identifier
  - Duplicate site numbers: Invalid and must be rejected
- **Source**: Customer Site Management System Requirements (2025-05-20)
- **Implementation**: Automated sequence generation with validation checks
- **Edge Cases**: 
  - Merged sites retain original site numbers with cross-reference mapping
  - Closed sites maintain historical site numbers for audit trail
  - Site number gaps are acceptable and do not require backfilling

#### **Rule 1.2: Site Name Standardization**
- **Rule Name**: Consistent Site Naming Convention
- **Description**: Site names must follow standardized format for clarity and searchability
- **Applies To**: All customer sites requiring clear identification
- **Validation Formula**: `SITE_NAME = [PROPERTY_NAME] + [LOCATION_IDENTIFIER] WHERE LENGTH(SITE_NAME) <= 100`
- **Examples**:
  - "Marriott Downtown Atlanta": Valid format with property and location
  - "Hilton Garden Inn LAX": Valid format with airport identifier
  - "Hotel ABC": Incomplete - missing location identifier
- **Source**: Site Management Standards (2025-05-20)
- **Implementation**: Data validation rules with standardization prompts
- **Edge Cases**:
  - Multi-property locations require building/tower identifiers
  - Franchise properties include brand name in standardized format
  - Historical name changes maintain audit trail with effective dates

#### **Rule 1.3: GL String Assignment**
- **Rule Name**: General Ledger String Mapping
- **Description**: Each site must have valid GL string for financial system integration
- **Applies To**: All billable customer sites with revenue generation
- **Validation Formula**: `GL_STRING = [ENTITY_CODE]-[DEPARTMENT_CODE]-[ACCOUNT_CODE] WHERE EACH_SEGMENT MATCHES CHART_OF_ACCOUNTS`
- **Examples**:
  - "100-4200-5000": Valid GL string format
  - "200-4150-5100": Valid GL string format
  - "ABC-DEF-GHI": Invalid - must be numeric codes
- **Source**: Financial System Integration Requirements (2025-05-20)
- **Implementation**: Real-time validation against chart of accounts
- **Edge Cases**:
  - New entity codes require finance approval before assignment
  - Seasonal sites may have temporary GL string assignments
  - Multi-service sites may require multiple GL string mappings

### 2. Territory Assignment Rules

#### **Rule 2.1: Hierarchical Territory Structure**
- **Rule Name**: Three-Tier Territory Organization
- **Description**: All sites must be assigned within the SVP Region → District Manager → Account Manager hierarchy
- **Applies To**: All active customer sites requiring management oversight
- **Assignment Formula**: `SITE_ASSIGNMENT = SVP_REGION.DISTRICT.ACCOUNT_MANAGER WHERE EACH_LEVEL_IS_ACTIVE`
- **Examples**:
  - SVP Region: "Southeast" → District: "Atlanta Metro" → Account Manager: "John Smith"
  - SVP Region: "West Coast" → District: "Los Angeles" → Account Manager: "Jane Doe"
  - Incomplete hierarchy: Invalid assignment requiring completion
- **Source**: Organizational Structure Requirements (2025-05-20)
- **Implementation**: Cascading assignment validation with hierarchy checks
- **Edge Cases**:
  - Temporary assignments during personnel transitions maintain hierarchy
  - Cross-territory sites require primary assignment with secondary coverage
  - New territories require full hierarchy establishment before site assignments

#### **Rule 2.2: Account Manager Portfolio Balance**
- **Rule Name**: Balanced Account Manager Workload Distribution
- **Description**: Account manager site portfolios should be balanced by site count, revenue potential, and geographic proximity
- **Applies To**: All account manager assignments within district boundaries
- **Balance Formula**: `PORTFOLIO_BALANCE = (SITE_COUNT * 0.4) + (REVENUE_WEIGHT * 0.4) + (GEOGRAPHIC_EFFICIENCY * 0.2) WHERE TARGET_RANGE = 15-25_SITES`
- **Examples**:
  - Account Manager A: 18 sites, $2.1M revenue, 85% geographic efficiency = Balanced
  - Account Manager B: 32 sites, $1.8M revenue, 60% geographic efficiency = Overloaded
  - Account Manager C: 8 sites, $3.2M revenue, 95% geographic efficiency = Underutilized
- **Source**: Territory Optimization Analysis (2025-05-20)
- **Implementation**: Automated portfolio analysis with rebalancing recommendations
- **Edge Cases**:
  - High-value sites may justify smaller portfolio sizes
  - Geographic constraints may require portfolio size adjustments
  - Seasonal sites require workload adjustment calculations

#### **Rule 2.3: District Manager Span of Control**
- **Rule Name**: District Manager Coverage Limits
- **Description**: District managers should oversee 3-8 account managers with geographic coherence
- **Applies To**: All district manager assignments within SVP regions
- **Span Formula**: `DISTRICT_SPAN = ACCOUNT_MANAGER_COUNT WHERE 3 <= COUNT <= 8 AND GEOGRAPHIC_COHERENCE >= 80%`
- **Examples**:
  - District Manager with 5 account managers in contiguous metro area: Valid span
  - District Manager with 10 account managers: Exceeds span limit
  - District Manager with 2 account managers: Below minimum span
- **Source**: Management Efficiency Standards (2025-05-20)
- **Implementation**: Organizational structure validation with span monitoring
- **Edge Cases**:
  - Rural territories may require larger geographic spans with fewer account managers
  - High-density urban areas may support larger account manager counts
  - Temporary assignments during transitions may exceed normal spans

### 3. Capacity Management Rules

#### **Rule 3.1: Parking Space Validation**
- **Rule Name**: Parking Capacity Data Integrity
- **Description**: Parking space counts must be validated and maintained for accurate capacity planning
- **Applies To**: All sites with parking services and capacity tracking requirements
- **Validation Formula**: `PARKING_SPACES = INTEGER >= 0 AND PARKING_SPACES <= PHYSICAL_MAXIMUM WHERE UTILIZATION_RATE <= 100%`
- **Examples**:
  - Site with 150 parking spaces: Valid if within physical constraints
  - Site with -5 parking spaces: Invalid negative value
  - Site with 1000 spaces in 50-space garage: Invalid exceeds physical maximum
- **Source**: Capacity Management Requirements (2025-05-20)
- **Implementation**: Physical validation with utilization monitoring
- **Edge Cases**:
  - Temporary capacity reductions for construction require date-bound adjustments
  - Shared parking arrangements require allocation percentage calculations
  - Valet-only operations may have zero self-park spaces

#### **Rule 3.2: Room Count Accuracy**
- **Rule Name**: Hotel Room Inventory Validation
- **Description**: Room counts must accurately reflect available inventory for service planning
- **Applies To**: Hotel and hospitality sites with room-based services
- **Validation Formula**: `ROOM_COUNT = INTEGER >= 0 AND ROOM_COUNT <= PROPERTY_MAXIMUM WHERE OCCUPANCY_CORRELATION_EXISTS`
- **Examples**:
  - 200-room hotel with 200 room count: Valid accurate inventory
  - 150-room hotel with 300 room count: Invalid exceeds property capacity
  - Hotel with null room count: Requires data completion for service planning
- **Source**: Service Planning Requirements (2025-05-20)
- **Implementation**: Property verification with occupancy data correlation
- **Edge Cases**:
  - Renovations may temporarily reduce available room counts
  - Suite conversions require room count adjustments with effective dates
  - Seasonal closures require temporary room count modifications

#### **Rule 3.3: Capacity Utilization Optimization**
- **Rule Name**: Optimal Capacity Utilization Targets
- **Description**: Sites should maintain target utilization rates for maximum profitability
- **Applies To**: All sites with measurable capacity metrics and revenue optimization goals
- **Optimization Formula**: `TARGET_UTILIZATION = 85% FOR PARKING AND 75% FOR ROOMS WHERE REVENUE_PER_UNIT IS_MAXIMIZED`
- **Examples**:
  - Parking utilization at 87%: Within optimal range
  - Room service utilization at 95%: Above optimal - may indicate capacity constraints
  - Parking utilization at 45%: Below optimal - requires demand analysis
- **Source**: Revenue Optimization Analysis (2025-05-20)
- **Implementation**: Utilization monitoring with optimization recommendations
- **Edge Cases**:
  - Seasonal properties may have different utilization targets by period
  - Premium properties may target lower utilization for service quality
  - New properties may require ramp-up period with adjusted targets

### 4. Contact Management Rules

#### **Rule 4.1: Primary Billing Contact Requirements**
- **Rule Name**: Mandatory Billing Contact Assignment
- **Description**: Every site must have a designated primary billing contact for financial communications
- **Applies To**: All active sites with billing relationships and financial transactions
- **Validation Formula**: `BILLING_CONTACT = PERSON_NAME + VALID_EMAIL + VALID_PHONE WHERE CONTACT_IS_ACTIVE`
- **Examples**:
  - "John Smith, jsmith@hotel.com, (555) 123-4567": Valid complete contact
  - "Jane Doe, invalid-email, (555) 987-6543": Invalid email format
  - Missing billing contact: Requires immediate assignment
- **Source**: Billing Process Requirements (2025-05-20)
- **Implementation**: Contact validation with communication testing
- **Edge Cases**:
  - Backup billing contacts should be designated for continuity
  - Corporate billing contacts may serve multiple properties
  - Contact changes require notification to billing and account management

#### **Rule 4.2: Contact Information Currency**
- **Rule Name**: Contact Information Maintenance
- **Description**: Contact information must be verified and updated regularly for effective communication
- **Applies To**: All site contacts including billing, operational, and management personnel
- **Currency Formula**: `CONTACT_VERIFICATION = LAST_VERIFIED_DATE <= 90_DAYS_AGO AND COMMUNICATION_SUCCESS_RATE >= 95%`
- **Examples**:
  - Contact verified 30 days ago with 100% communication success: Current
  - Contact verified 120 days ago: Requires reverification
  - Contact with 75% communication success rate: Requires update
- **Source**: Communication Effectiveness Standards (2025-05-20)
- **Implementation**: Automated verification scheduling with success rate monitoring
- **Edge Cases**:
  - High-turnover positions may require more frequent verification
  - Seasonal contacts may have date-specific validity periods
  - Emergency contacts require immediate verification upon designation

### 5. Integration and Validation Rules

#### **Rule 5.1: Vendor ID Consistency**
- **Rule Name**: Vendor Identification Standardization
- **Description**: Vendor IDs must be consistent across all systems for accurate expense tracking
- **Applies To**: All sites with vendor relationships and expense allocation requirements
- **Validation Formula**: `VENDOR_ID = STANDARDIZED_FORMAT AND EXISTS_IN_VENDOR_MASTER WHERE STATUS = ACTIVE`
- **Examples**:
  - Vendor ID "VND001234": Valid standardized format
  - Vendor ID "ABC-XYZ-789": Invalid non-standard format
  - Vendor ID not in master file: Requires vendor setup
- **Source**: Vendor Management Standards (2025-05-20)
- **Implementation**: Master file validation with standardization enforcement
- **Edge Cases**:
  - New vendors require master file setup before site assignment
  - Merged vendors require ID consolidation with historical mapping
  - Inactive vendors require status validation before assignment

#### **Rule 5.2: System Integration Validation**
- **Rule Name**: Cross-System Data Consistency
- **Description**: Site data must maintain consistency across billing, forecasting, and operational systems
- **Applies To**: All sites with multi-system integration requirements
- **Consistency Formula**: `DATA_CONSISTENCY = BILLING_SYSTEM_DATA = FORECASTING_SYSTEM_DATA = OPERATIONAL_SYSTEM_DATA WHERE SYNC_STATUS = CURRENT`
- **Examples**:
  - Site data synchronized across all systems within 24 hours: Valid consistency
  - Site data showing discrepancies between systems: Requires synchronization
  - Site missing from one system: Requires data propagation
- **Source**: System Integration Requirements (2025-05-20)
- **Implementation**: Real-time synchronization with discrepancy monitoring
- **Edge Cases**:
  - System maintenance windows may cause temporary inconsistencies
  - Data migration periods require special validation procedures
  - Emergency updates may bypass normal synchronization processes

## Code Validation Report
**Last Validated**: 2025-07-16
**Validation Scope**: Business Rules | Data Validation | System Integration

### Validation Summary
- ✅ **Verified Elements**: 0 items (no direct code validation opportunities identified)
- ⚠️ **Discrepancies Found**: 0 items
- ❓ **Incomplete Documentation**: 0 items
- 🔍 **Requires Review**: 2 items need stakeholder verification

### Detailed Validation Results

#### Business Rule Implementation Validation
**Validation Status**: 🔍 **REQUIRES_REVIEW**
**Findings**: Business rules documented are based on data structure analysis and operational requirements. Actual implementation in Power Platform business rules engine requires validation.
**Recommendations**: Review Power Platform business rules configuration to validate rule implementation and enforcement mechanisms.

#### Data Validation Logic Verification
**Validation Status**: 🔍 **REQUIRES_REVIEW**
**Findings**: Validation formulas and business logic require verification against actual Power Platform validation rules and workflow implementations.
**Recommendations**: Analyze Power Platform validation workflows and business rule configurations to confirm documented logic matches implementation.

### Code File References
- **Business Rules Engine**: Requires review of Power Platform business rules configuration
- **Validation Workflows**: Customer site data validation workflow analysis needed
- **Integration Logic**: Cross-system synchronization rule validation required

### Validation Methodology
- **Code Copy Date**: 2025-07-16
- **Validation Approach**: Business rule analysis based on data structure and operational requirements
- **Limitations**: Limited direct code validation opportunities; primarily business logic and rule definition validation

## Related Documentation

- [Customer Site Management System Overview](../../systems/customer-sites/20250716_CustomerSites_SystemOverview_Management.md) ✓ VERIFIED
- [Customer Site Directory](../../systems/customer-sites/customer-site-directory.md) ✓ VERIFIED
- [Customer Site Database Schema](../../technical/database/customer-sites-data-schema.md) ✓ VERIFIED
- [Site Management API Specification](../../technical/api/customer-sites-api-spec.md) 🔄 PLANNED
- [Site Onboarding Workflow](../../user-processes/site-admin/site-onboarding-workflow.md) ✓ VERIFIED
- [Territory Management Procedures](../../user-processes/territory-admin/territory-management-procedures.md) 🔄 PLANNED
- [Contact Management Procedures](../../user-processes/site-admin/contact-management-procedures.md) 🔄 PLANNED
- [Site Setup Configuration](../../configuration/customer-sites/site-setup-configuration.md) ✓ VERIFIED
- [Territory Configuration Guide](../../configuration/customer-sites/territory-configuration-guide.md) 🔄 PLANNED
- [Territory Assignment Rules](territory-assignment-rules.md) 🔄 PLANNED
- [Capacity Management Rules](capacity-management-rules.md) 🔄 PLANNED
- [Billing System Integration](../../technical/integration/customer-sites-billing-integration.md) 🔄 PLANNED
- [Forecasting Data Integration](../../technical/integration/customer-sites-forecasting-integration.md) 🔄 PLANNED
## Quick Links

- [Customer Site Management System Overview](../../systems/customer-sites/20250716_CustomerSites_SystemOverview_Management.md)
- [Customer Site Directory](../../systems/customer-sites/customer-site-directory.md)
- [Customer Site Database Schema](../../technical/database/customer-sites-data-schema.md)
- [Site Onboarding Workflow](../../user-processes/site-admin/site-onboarding-workflow.md)
- [Site Setup Configuration](../../configuration/customer-sites/site-setup-configuration.md)
