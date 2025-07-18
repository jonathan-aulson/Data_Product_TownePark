---
title: "Towne Park Customer Sites - Site Setup Configuration Guide"
description: "Comprehensive configuration guide for customer site setup, system parameters, validation rules, and integration settings"
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
  - Configuration Management
  - System Administration
  - Integration Management
components:
  - Configuration Engine
  - Validation Framework
  - Integration Layer
  - User Interface
business_domains:
  - Customer Site Management
  - System Configuration
  - Data Validation
  - Integration Management
  - System Administration
user_roles:
  - System Administrator
  - Configuration Manager
  - Site Administrator
  - Integration Specialist
  - Database Administrator
tags:
  - configuration-guide
  - site-setup
  - system-parameters
  - validation-rules
  - integration-settings
---

# Towne Park Customer Sites - Site Setup Configuration Guide

## Purpose

This configuration guide provides comprehensive instructions for setting up and maintaining customer site configuration parameters, validation rules, system settings, and integration configurations. It ensures consistent, accurate, and compliant site setup across Towne Park's customer site management system.

## Configuration Overview

### Configuration Scope
- **Site Data Parameters**: Field definitions, validation rules, and data constraints
- **Territory Configuration**: Regional assignments, management hierarchy, and geographic boundaries
- **Contact Management**: Contact types, validation requirements, and communication preferences
- **Capacity Settings**: Parking and room capacity parameters, utilization targets, and optimization rules
- **Financial Integration**: GL string mappings, vendor configurations, and billing system integration
- **System Integration**: Cross-system data synchronization and workflow configurations

### Configuration Principles
- **Standardization**: Consistent configuration across all environments
- **Validation**: Comprehensive data validation and integrity checks
- **Flexibility**: Configurable parameters to accommodate business changes
- **Security**: Role-based access control and audit logging
- **Performance**: Optimized configuration for system performance

## Site Data Configuration

### **Configuration 1: Site Identification Parameters**

#### Site Number Configuration
```yaml
site_number:
  data_type: INTEGER
  constraints:
    - NOT_NULL: true
    - UNIQUE: true
    - MIN_VALUE: 1
    - MAX_VALUE: 999999
  validation_rules:
    - positive_integer: "Site number must be positive integer"
    - uniqueness_check: "Site number must be unique across all sites"
  auto_generation:
    enabled: true
    sequence_start: 1000
    increment: 1
  error_handling:
    duplicate_number: "Generate next available number"
    invalid_format: "Reject with validation error"
```

#### Site Name Configuration
```yaml
site_name:
  data_type: VARCHAR
  max_length: 100
  constraints:
    - NOT_NULL: true
    - UNIQUE: true
  validation_rules:
    - length_check: "Site name must be 1-100 characters"
    - uniqueness_check: "Site name must be unique"
    - format_validation: "Alphanumeric and standard punctuation only"
  standardization:
    trim_whitespace: true
    title_case: true
    remove_special_chars: false
  error_handling:
    duplicate_name: "Suggest alternative with suffix"
    invalid_characters: "Remove invalid characters and retry"
```

### **Configuration 2: Location Data Parameters**

#### Address Validation Configuration
```yaml
address_validation:
  street_address:
    max_length: 200
    required: true
    validation_service: "USPS Address Validation"
  city:
    max_length: 100
    required: true
    standardization: "Title Case"
  state:
    format: "Two-letter abbreviation"
    validation_list: "US_STATES_LOOKUP"
    required: true
  zip_code:
    format: "NNNNN or NNNNN-NNNN"
    validation_pattern: "^\\d{5}(-\\d{4})?$"
    required: true
  geographic_coordinates:
    latitude:
      range: [-90, 90]
      precision: 8
      required: false
    longitude:
      range: [-180, 180]
      precision: 8
      required: false
```

## Territory Configuration

### **Configuration 3: Territory Assignment Parameters**

#### Regional Structure Configuration
```yaml
territory_structure:
  svp_regions:
    - region_id: 1
      region_name: "Southeast"
      region_code: "SE"
      geographic_coverage: ["FL", "GA", "SC", "NC", "TN", "AL", "MS"]
    - region_id: 2
      region_name: "Northeast"
      region_code: "NE"
      geographic_coverage: ["NY", "NJ", "CT", "MA", "PA", "MD", "VA"]
    - region_id: 3
      region_name: "West Coast"
      region_code: "WC"
      geographic_coverage: ["CA", "OR", "WA", "NV", "AZ"]
    - region_id: 4
      region_name: "Central"
      region_code: "CT"
      geographic_coverage: ["TX", "OK", "AR", "LA", "NM"]
    - region_id: 5
      region_name: "Midwest"
      region_code: "MW"
      geographic_coverage: ["IL", "IN", "OH", "MI", "WI", "MN", "IA", "MO"]
```

#### Management Assignment Rules
```yaml
management_assignment:
  district_manager:
    span_of_control:
      min_account_managers: 3
      max_account_managers: 8
      optimal_range: [4, 6]
    geographic_coherence:
      min_percentage: 80
      calculation_method: "contiguous_territory"
  account_manager:
    portfolio_balance:
      target_site_count: [15, 25]
      max_site_count: 30
      min_site_count: 10
    workload_factors:
      site_count_weight: 0.4
      revenue_weight: 0.4
      geographic_efficiency_weight: 0.2
    rebalancing_triggers:
      site_count_variance: 20
      revenue_variance: 30
      efficiency_threshold: 70
```

## Contact Management Configuration

### **Configuration 4: Contact Type Parameters**

#### Contact Categories Configuration
```yaml
contact_types:
  billing_contact:
    required: true
    validation_requirements:
      - valid_email: true
      - valid_phone: true
      - authority_verification: true
    communication_preferences:
      - email
      - phone
      - fax
    verification_frequency: 90 # days
  operational_contact:
    required: false
    validation_requirements:
      - valid_email: true
      - valid_phone: true
    communication_preferences:
      - email
      - phone
      - mobile
    verification_frequency: 180 # days
  emergency_contact:
    required: false
    validation_requirements:
      - valid_phone: true
      - 24_7_availability: true
    communication_preferences:
      - phone
      - mobile
    verification_frequency: 90 # days
```

#### Contact Validation Rules
```yaml
contact_validation:
  email_validation:
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    verification_method: "test_email"
    max_attempts: 3
  phone_validation:
    pattern: "^\\+?1?[2-9]\\d{2}[2-9]\\d{2}\\d{4}$"
    verification_method: "test_call"
    max_attempts: 2
  name_validation:
    min_length: 2
    max_length: 100
    allowed_characters: "letters, spaces, hyphens, apostrophes"
```

## Capacity Configuration

### **Configuration 5: Capacity Management Parameters**

#### Parking Capacity Configuration
```yaml
parking_capacity:
  validation_rules:
    min_spaces: 0
    max_spaces: 10000
    data_type: "INTEGER"
  utilization_targets:
    optimal_range: [80, 90] # percentage
    warning_threshold: 95
    critical_threshold: 98
  capacity_types:
    - self_park
    - valet_only
    - mixed_service
  seasonal_adjustments:
    enabled: true
    adjustment_periods:
      - name: "winter_reduction"
        months: [12, 1, 2]
        adjustment_factor: 0.9
      - name: "summer_peak"
        months: [6, 7, 8]
        adjustment_factor: 1.1
```

#### Room Capacity Configuration
```yaml
room_capacity:
  validation_rules:
    min_rooms: 0
    max_rooms: 5000
    data_type: "INTEGER"
  utilization_targets:
    optimal_range: [70, 80] # percentage
    warning_threshold: 85
    critical_threshold: 95
  room_types:
    - standard
    - suite
    - accessible
    - executive
  service_requirements:
    valet_ratio: 0.3 # rooms requiring valet service
    peak_hour_factor: 1.5
    special_event_factor: 2.0
```

## Financial Integration Configuration

### **Configuration 6: GL String Management**

#### Chart of Accounts Integration
```yaml
gl_string_configuration:
  format_specification:
    pattern: "^\\d{3}-\\d{4}-\\d{4}$"
    segments:
      entity_code:
        position: 1
        length: 3
        validation: "ENTITY_LOOKUP_TABLE"
      department_code:
        position: 2
        length: 4
        validation: "DEPARTMENT_LOOKUP_TABLE"
      account_code:
        position: 3
        length: 4
        validation: "ACCOUNT_LOOKUP_TABLE"
  validation_rules:
    real_time_validation: true
    lookup_timeout: 5 # seconds
    cache_duration: 3600 # seconds
  error_handling:
    invalid_entity: "Request new entity setup"
    invalid_department: "Verify department code"
    invalid_account: "Contact finance for account setup"
```

#### Vendor ID Configuration
```yaml
vendor_id_configuration:
  format_specification:
    pattern: "^VND\\d{6}$"
    prefix: "VND"
    numeric_length: 6
  validation_rules:
    vendor_master_lookup: true
    status_check: "ACTIVE"
    approval_required: true
  auto_generation:
    enabled: true
    sequence_start: 100000
    increment: 1
  integration_settings:
    sync_frequency: "real_time"
    backup_sync: "daily"
    error_retry_count: 3
```

## System Integration Configuration

### **Configuration 7: Cross-System Integration**

#### Billing System Integration
```yaml
billing_system_integration:
  connection_settings:
    endpoint: "${BILLING_SYSTEM_URL}/api/v1"
    authentication: "OAuth2"
    timeout: 30 # seconds
    retry_attempts: 3
  data_synchronization:
    sync_frequency: "real_time"
    batch_size: 100
    error_threshold: 5 # percentage
  field_mappings:
    site_number: "billing.site_id"
    gl_string: "billing.account_code"
    vendor_id: "billing.vendor_reference"
    billing_contact: "billing.primary_contact"
  validation_rules:
    pre_sync_validation: true
    post_sync_verification: true
    conflict_resolution: "source_system_wins"
```

#### Forecasting System Integration
```yaml
forecasting_system_integration:
  connection_settings:
    endpoint: "${FORECASTING_SYSTEM_URL}/api/v2"
    authentication: "API_KEY"
    timeout: 60 # seconds
    retry_attempts: 2
  data_feeds:
    capacity_data:
      frequency: "daily"
      time: "02:00"
      fields: ["site_number", "parking_spaces", "room_count"]
    utilization_targets:
      frequency: "weekly"
      day: "sunday"
      fields: ["site_number", "target_utilization", "peak_factors"]
  error_handling:
    failed_sync_notification: true
    retry_schedule: [5, 15, 60] # minutes
    escalation_threshold: 3 # failed attempts
```

## Validation Framework Configuration

### **Configuration 8: Data Validation Rules**

#### Business Rule Validation
```yaml
business_rule_validation:
  site_classification:
    required_fields: ["site_number", "site_name", "site_type", "address"]
    conditional_requirements:
      hotel_sites: ["room_count"]
      parking_sites: ["parking_spaces"]
      mixed_sites: ["room_count", "parking_spaces"]
  territory_assignment:
    validation_checks:
      - geographic_boundary_check
      - manager_capacity_check
      - workload_balance_check
    auto_correction:
      enabled: false
      approval_required: true
  contact_management:
    mandatory_contacts: ["billing_contact"]
    validation_frequency: 90 # days
    auto_verification: true
```

#### Data Quality Rules
```yaml
data_quality_rules:
  completeness_checks:
    critical_fields: 100 # percentage required
    important_fields: 95 # percentage required
    optional_fields: 80 # percentage target
  accuracy_validation:
    address_verification: true
    contact_verification: true
    capacity_verification: false # manual verification
  consistency_checks:
    cross_field_validation: true
    historical_comparison: true
    system_synchronization: true
  timeliness_requirements:
    data_freshness: 24 # hours
    update_frequency: "real_time"
    batch_processing: "daily"
```

## Security Configuration

### **Configuration 9: Access Control Settings**

#### Role-Based Permissions
```yaml
role_permissions:
  site_administrator:
    permissions:
      - create_site
      - update_site
      - delete_site
      - view_all_sites
      - manage_contacts
      - configure_capacity
    restrictions:
      - no_financial_config
      - no_system_config
  territory_manager:
    permissions:
      - view_territory_sites
      - update_territory_assignments
      - manage_territory_contacts
      - generate_territory_reports
    restrictions:
      - territory_scope_only
      - no_cross_territory_access
  billing_administrator:
    permissions:
      - configure_gl_strings
      - manage_vendor_ids
      - update_billing_contacts
      - view_financial_config
    restrictions:
      - financial_data_only
      - no_operational_changes
```

#### Audit Configuration
```yaml
audit_configuration:
  logging_settings:
    log_level: "INFO"
    retention_period: 2555 # days (7 years)
    storage_location: "audit_database"
  tracked_events:
    - site_creation
    - site_modification
    - site_deletion
    - territory_changes
    - contact_updates
    - configuration_changes
  notification_settings:
    critical_changes: "immediate"
    routine_changes: "daily_summary"
    recipients: ["system_admin", "compliance_team"]
```

## Performance Configuration

### **Configuration 10: System Performance Settings**

#### Database Optimization
```yaml
database_optimization:
  indexing_strategy:
    primary_indexes:
      - site_number
      - site_name
    secondary_indexes:
      - territory_hierarchy
      - geographic_location
      - capacity_metrics
    composite_indexes:
      - [svp_region_id, district_manager_id, account_manager_id]
      - [state, city, zip_code]
  query_optimization:
    cache_duration: 3600 # seconds
    connection_pooling: true
    query_timeout: 30 # seconds
  maintenance_schedule:
    index_rebuild: "weekly"
    statistics_update: "daily"
    backup_frequency: "daily"
```

#### Application Performance
```yaml
application_performance:
  caching_configuration:
    lookup_tables: 7200 # seconds
    user_sessions: 1800 # seconds
    search_results: 300 # seconds
  connection_settings:
    max_connections: 100
    connection_timeout: 30 # seconds
    idle_timeout: 300 # seconds
  monitoring_settings:
    performance_metrics: true
    error_tracking: true
    usage_analytics: true
```

## Environment Configuration

### **Configuration 11: Environment-Specific Settings**

#### Development Environment
```yaml
development_environment:
  database_settings:
    connection_string: "${DEV_DB_CONNECTION}"
    pool_size: 10
    timeout: 60
  integration_settings:
    billing_system: "mock_service"
    forecasting_system: "mock_service"
    external_apis: "sandbox_mode"
  validation_settings:
    strict_validation: false
    test_data_allowed: true
    bypass_external_validation: true
```

#### Production Environment
```yaml
production_environment:
  database_settings:
    connection_string: "${PROD_DB_CONNECTION}"
    pool_size: 50
    timeout: 30
  integration_settings:
    billing_system: "live_service"
    forecasting_system: "live_service"
    external_apis: "production_mode"
  validation_settings:
    strict_validation: true
    test_data_allowed: false
    bypass_external_validation: false
  monitoring_settings:
    health_checks: true
    performance_monitoring: true
    error_alerting: true
```

## Code Validation Report
**Last Validated**: 2025-07-16
**Validation Scope**: Configuration Management | System Parameters | Integration Settings

### Validation Summary
- ✅ **Verified Elements**: 0 items (no direct code validation opportunities identified)
- ⚠️ **Discrepancies Found**: 0 items
- ❓ **Incomplete Documentation**: 0 items
- 🔍 **Requires Review**: 3 items need stakeholder verification

### Detailed Validation Results

#### Configuration Parameter Validation
**Validation Status**: 🔍 **REQUIRES_REVIEW**
**Findings**: Configuration parameters documented are based on data structure analysis and system requirements. Actual configuration implementation requires validation against current system settings.
**Recommendations**: Review actual system configuration files and parameter settings to validate documented configurations match implementation.

#### Integration Configuration Validation
**Validation Status**: 🔍 **REQUIRES_REVIEW**
**Findings**: Integration configuration settings require validation against actual Power Platform integration configurations and connection settings.
**Recommendations**: Analyze Power Platform integration configurations and connection parameters to confirm documented settings match implementation.

#### Validation Framework Implementation
**Validation Status**: 🔍 **REQUIRES_REVIEW**
**Findings**: Validation rules and framework configuration require verification against actual validation logic implementation in the system.
**Recommendations**: Review Power Platform validation rules and business logic configurations to validate documented framework matches implementation.

### Code File References
- **Configuration Files**: Requires review of actual system configuration files and parameter settings
- **Integration Configuration**: Power Platform integration and connection configuration analysis needed
- **Validation Logic**: Business rule and validation framework implementation validation required

### Validation Methodology
- **Code Copy Date**: 2025-07-16
- **Validation Approach**: Configuration analysis based on system requirements and data structure
- **Limitations**: Limited direct configuration code validation opportunities; primarily configuration specification and parameter validation

## Related Documentation

### System Documentation
- [Customer Site Management System Overview](../../systems/customer-sites/20250716_CustomerSites_SystemOverview_Management.md) - Complete system architecture requiring configuration
- [Customer Site Directory](../../systems/customer-sites/customer-site-directory.md) - Site listings managed through configuration

### Business Rules
- [Site Classification Rules](../../business-rules/customer-sites/site-classification-rules.md) - Business rules implemented through configuration
- [Territory Assignment Rules](../../business-rules/customer-sites/territory-assignment-rules.md) - Territory rules configured through parameters
- [Contact Management Rules](../../business-rules/customer-sites/contact-management-rules.md) - Contact validation rules configured in system

### Technical Documentation
- [Customer Site Database Schema](../../technical/database/customer-sites-data-schema.md) - Database structure supporting configuration
- [Site Management API Specification](../../technical/api/customer-sites-api-spec.md) - API configuration and parameter management

### User Processes
- [Site Onboarding Workflow](../../user-processes/site-admin/site-onboarding-workflow.md) - Workflow utilizing configuration parameters
- [Contact Management Procedures](../../user-processes/site-admin/contact-management-procedures.md) - Contact procedures using configuration settings
- [Territory Management Procedures](../../user-processes/territory-admin/territory-management-procedures.md) - Territory management using configuration

### Configuration Guides
- [Territory Configuration Guide](territory-configuration-guide.md) - Territory-specific configuration settings
- [Integration Configuration Guide](integration-configuration-guide.md) - System integration configuration
- [Security Configuration Guide](security-configuration-guide.md) - Security and access control configuration

### Integration Documentation
- [Billing System Integration](../../technical/integration/customer-sites-billing-integration.md) - Billing integration configuration
- [Forecasting Data Integration](../../technical/integration/customer-sites-forecasting-integration.md) - Forecasting integration configuration

### Administration Guides
- [System Administration Guide](../../administration/system-administration-guide.md) - Overall system administration including configuration
- [Configuration Management Procedures](../../administration/configuration-management-procedures.md) - Configuration change management
- [Environment Management Guide](../../administration/environment-management-guide.md) - Environment-specific configuration management