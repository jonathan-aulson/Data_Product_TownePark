---
title: "EDW Integration Configuration Guide"
description: "Comprehensive configuration guide for Enterprise Data Warehouse integration including connection settings, authentication, caching parameters, and performance optimization for the forecasting system"
created_date: 2025-07-24
last_updated_date: 2025-07-24
version: 1.0
status: Draft
owner: "System Administration Team"
systems:
  - Forecasting
  - EDW
  - Integration Layer
components:
  - Backend
  - Database
  - Caching
  - Authentication
business_domains:
  - System Configuration
  - Data Integration
  - Performance Management
  - Security
user_roles:
  - System Administrator
  - Database Administrator
  - DevOps Engineer
  - Integration Specialist
tags:
  - configuration
  - edw-integration
  - system-settings
  - performance
  - security
---

# EDW Integration Configuration Guide

## Purpose

This document provides comprehensive configuration guidance for integrating the Towne Park Forecasting system with the Enterprise Data Warehouse (EDW). It covers all aspects of setup, security, performance tuning, and operational maintenance required for reliable data integration.

## Prerequisites

### System Requirements
- **Forecasting System**: Version 2.0 or higher
- **EDW Access**: Valid credentials and network connectivity
- **Redis Cache**: Version 6.2+ for caching layer
- **Network**: Secure VPN or dedicated connection to EDW
- **Monitoring**: Application performance monitoring tools

### Required Permissions
- **Database**: Read access to EDW forecasting schemas
- **Network**: Firewall rules for EDW connectivity
- **Security**: OAuth 2.0 client registration
- **Monitoring**: Access to logging and metrics systems

## Core Configuration

### Database Connection Settings

#### Primary EDW Connection
```yaml
# config/edw-connection.yml
edw_primary:
  host: "edw-prod.townepark.internal"
  port: 1433
  database: "TP_EDW"
  connection_timeout: 30000  # 30 seconds
  command_timeout: 300000    # 5 minutes
  max_pool_size: 20
  min_pool_size: 5
  connection_lifetime: 1800  # 30 minutes
  retry_attempts: 3
  retry_delay: 5000         # 5 seconds
```

#### Failover EDW Connection
```yaml
# config/edw-connection.yml
edw_failover:
  host: "edw-dr.townepark.internal"
  port: 1433
  database: "TP_EDW_DR"
  connection_timeout: 30000
  command_timeout: 300000
  max_pool_size: 10
  min_pool_size: 2
  connection_lifetime: 1800
  retry_attempts: 2
  retry_delay: 10000        # 10 seconds
```

### Authentication Configuration

#### OAuth 2.0 Settings
```yaml
# config/oauth-config.yml
oauth:
  authorization_server: "https://auth.townepark.internal"
  client_id: "forecasting-edw-integration"
  client_secret: "${EDW_OAUTH_CLIENT_SECRET}"
  scopes:
    - "edw:read"
    - "edw:statistics"
    - "edw:payroll"
    - "edw:budget"
  token_endpoint: "/oauth2/token"
  introspection_endpoint: "/oauth2/introspect"
  token_refresh_threshold: 300  # 5 minutes before expiry
  max_token_age: 3600          # 1 hour
```

#### Service Account Configuration
```yaml
# config/service-account.yml
service_account:
  username: "${EDW_SERVICE_USERNAME}"
  password: "${EDW_SERVICE_PASSWORD}"
  domain: "TOWNEPARK"
  authentication_type: "integrated"
  encrypt_connection: true
  trust_server_certificate: false
```

## Caching Configuration

### Redis Cache Settings

#### Primary Cache Cluster
```yaml
# config/redis-config.yml
redis_primary:
  cluster_nodes:
    - host: "redis-node-1.internal"
      port: 6379
    - host: "redis-node-2.internal"
      port: 6379
    - host: "redis-node-3.internal"
      port: 6379
  connection_pool:
    max_connections: 50
    min_connections: 10
    connection_timeout: 5000
    socket_timeout: 3000
    retry_attempts: 3
  failover:
    sentinel_enabled: true
    master_name: "forecasting-cache"
    sentinel_timeout: 2000
```

#### Cache TTL Configuration
```yaml
# config/cache-ttl.yml
cache_ttl:
  statistics_data:
    current_period: 14400      # 4 hours
    historical_data: 86400     # 24 hours
    reference_data: 604800     # 7 days
  payroll_data:
    current_period: 7200       # 2 hours
    historical_data: 43200     # 12 hours
    summary_data: 86400        # 24 hours
  budget_data:
    approved_budgets: 86400    # 24 hours
    draft_budgets: 3600        # 1 hour
    variance_thresholds: 43200 # 12 hours
```

### Cache Warming Configuration
```yaml
# config/cache-warming.yml
cache_warming:
  enabled: true
  schedule:
    daily_warm: "07:30"        # 7:30 AM daily
    weekly_warm: "06:00"       # 6:00 AM Monday
    monthly_warm: "05:00"      # 5:00 AM 1st of month
  data_scope:
    active_sites_only: true
    current_period_priority: true
    historical_depth: 90       # days
```

## Performance Configuration

### Query Optimization Settings

#### Connection Pool Tuning
```yaml
# config/performance.yml
connection_pool:
  initial_size: 5
  max_size: 20
  growth_increment: 2
  shrink_threshold: 10       # minutes idle
  validation_query: "SELECT 1"
  validation_interval: 300   # 5 minutes
  leak_detection_threshold: 60000  # 1 minute
```

#### Query Timeout Configuration
```yaml
# config/query-timeouts.yml
query_timeouts:
  statistics_queries: 30     # seconds
  payroll_queries: 60        # seconds
  budget_queries: 45         # seconds
  large_dataset_queries: 300 # seconds
  health_check_queries: 5    # seconds
```

### Batch Processing Settings
```yaml
# config/batch-processing.yml
batch_processing:
  max_batch_size: 1000
  batch_timeout: 300         # seconds
  parallel_batches: 4
  retry_failed_batches: true
  batch_retry_attempts: 3
  batch_retry_delay: 30      # seconds
```

## Security Configuration

### Network Security Settings

#### Firewall Rules
```yaml
# config/network-security.yml
firewall_rules:
  edw_access:
    source_ips:
      - "10.0.1.0/24"        # Forecasting subnet
      - "10.0.2.0/24"        # Integration subnet
    destination_ip: "10.1.0.100"  # EDW server
    ports:
      - 1433                 # SQL Server
      - 443                  # HTTPS
    protocol: "TCP"
```

#### SSL/TLS Configuration
```yaml
# config/ssl-config.yml
ssl_settings:
  enforce_ssl: true
  min_tls_version: "1.2"
  cipher_suites:
    - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
    - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
  certificate_validation: true
  certificate_path: "/etc/ssl/certs/edw-client.crt"
  private_key_path: "/etc/ssl/private/edw-client.key"
```

### Data Protection Settings
```yaml
# config/data-protection.yml
data_protection:
  encryption_at_rest: true
  encryption_algorithm: "AES-256"
  key_rotation_interval: 90  # days
  data_masking:
    enabled: true
    sensitive_fields:
      - "employee_ssn"
      - "employee_salary"
      - "bank_account"
  audit_logging:
    enabled: true
    log_level: "INFO"
    retention_period: 365    # days
```

## Monitoring Configuration

### Health Check Settings

#### Endpoint Configuration
```yaml
# config/health-checks.yml
health_checks:
  edw_connectivity:
    endpoint: "/health/edw"
    interval: 60             # seconds
    timeout: 10              # seconds
    failure_threshold: 3
    success_threshold: 2
  cache_connectivity:
    endpoint: "/health/cache"
    interval: 30             # seconds
    timeout: 5               # seconds
    failure_threshold: 2
    success_threshold: 1
```

#### Metrics Collection
```yaml
# config/metrics.yml
metrics:
  collection_interval: 30   # seconds
  retention_period: 30      # days
  metrics_to_collect:
    - "connection_pool_usage"
    - "query_response_times"
    - "cache_hit_ratios"
    - "error_rates"
    - "data_freshness"
  alerting_thresholds:
    high_response_time: 5000  # milliseconds
    low_cache_hit_ratio: 0.7  # 70%
    high_error_rate: 0.05     # 5%
```

### Logging Configuration
```yaml
# config/logging.yml
logging:
  level: "INFO"
  format: "json"
  output: "file"
  file_path: "/var/log/forecasting/edw-integration.log"
  max_file_size: "100MB"
  max_files: 10
  log_categories:
    - "connection_events"
    - "query_execution"
    - "cache_operations"
    - "error_conditions"
    - "performance_metrics"
```

## Environment-Specific Configuration

### Development Environment
```yaml
# config/environments/development.yml
development:
  edw_host: "edw-dev.townepark.internal"
  cache_ttl_multiplier: 0.1  # Shorter TTL for testing
  connection_pool_size: 5
  retry_attempts: 1
  logging_level: "DEBUG"
  metrics_collection: false
  ssl_enforcement: false
```

### Staging Environment
```yaml
# config/environments/staging.yml
staging:
  edw_host: "edw-stage.townepark.internal"
  cache_ttl_multiplier: 0.5
  connection_pool_size: 10
  retry_attempts: 2
  logging_level: "INFO"
  metrics_collection: true
  ssl_enforcement: true
```

### Production Environment
```yaml
# config/environments/production.yml
production:
  edw_host: "edw-prod.townepark.internal"
  cache_ttl_multiplier: 1.0
  connection_pool_size: 20
  retry_attempts: 3
  logging_level: "WARN"
  metrics_collection: true
  ssl_enforcement: true
  monitoring_enabled: true
  alerting_enabled: true
```

## Deployment Configuration

### Configuration Management

#### Environment Variables
```bash
# Environment variables for EDW integration
export EDW_HOST="edw-prod.townepark.internal"
export EDW_DATABASE="TP_EDW"
export EDW_SERVICE_USERNAME="svc_forecasting"
export EDW_SERVICE_PASSWORD="<secure_password>"
export EDW_OAUTH_CLIENT_SECRET="<oauth_secret>"
export REDIS_CLUSTER_NODES="redis-node-1:6379,redis-node-2:6379,redis-node-3:6379"
export CACHE_TTL_MULTIPLIER="1.0"
export LOG_LEVEL="INFO"
```

#### Configuration Validation
```yaml
# config/validation.yml
validation_rules:
  required_settings:
    - "edw_host"
    - "edw_database"
    - "oauth_client_id"
    - "redis_cluster_nodes"
  format_validation:
    edw_host: "hostname_format"
    edw_port: "port_range"
    cache_ttl: "positive_integer"
  connectivity_tests:
    - "edw_connection_test"
    - "redis_connection_test"
    - "oauth_token_test"
```

## Troubleshooting Configuration

### Common Issues and Solutions

#### Connection Issues
```yaml
# config/troubleshooting.yml
connection_troubleshooting:
  timeout_issues:
    check_network_latency: true
    increase_timeout_values: true
    verify_firewall_rules: true
  authentication_failures:
    verify_credentials: true
    check_oauth_token_expiry: true
    validate_service_account: true
  pool_exhaustion:
    increase_max_pool_size: true
    reduce_connection_lifetime: true
    monitor_connection_leaks: true
```

#### Performance Issues
```yaml
# config/performance-troubleshooting.yml
performance_troubleshooting:
  slow_queries:
    enable_query_logging: true
    analyze_execution_plans: true
    optimize_indexes: true
  cache_misses:
    review_ttl_settings: true
    monitor_cache_eviction: true
    increase_cache_memory: true
  high_latency:
    check_network_performance: true
    optimize_batch_sizes: true
    enable_connection_pooling: true
```

## Maintenance Procedures

### Regular Maintenance Tasks

#### Daily Tasks
- Monitor connection pool usage
- Review error logs for anomalies
- Verify cache hit ratios
- Check data freshness indicators

#### Weekly Tasks
- Analyze query performance metrics
- Review and rotate log files
- Update cache warming schedules
- Validate backup procedures

#### Monthly Tasks
- Review and update configuration settings
- Perform security credential rotation
- Analyze capacity planning metrics
- Update documentation and procedures

### Emergency Procedures

#### EDW Outage Response
1. Activate failover EDW connection
2. Enable extended cache TTL
3. Notify stakeholders of degraded service
4. Monitor system performance
5. Document incident and resolution

#### Cache System Failure
1. Disable cache layer temporarily
2. Increase EDW connection pool size
3. Monitor EDW performance impact
4. Restore cache system
5. Validate data consistency

## Related Documentation

- [EDW Integration Technical Specification](../../technical/integrations/20250724_EDW_Integration_TechnicalSpec.md)
- [Forecasting System Overview](../../systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md)
- [System Administration Operations Procedures](../../technical/operations/20250723_SystemAdministration_Operations_Procedures.md)
- [Data Security Configuration Guide](../security/data-security-configuration.md)

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-24 | System Administration Team | Initial creation providing comprehensive EDW integration configuration including connection settings, authentication, caching, performance tuning, security, monitoring, and maintenance procedures |