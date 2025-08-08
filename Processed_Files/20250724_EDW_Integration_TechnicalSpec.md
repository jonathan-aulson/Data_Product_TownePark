---
title: "Towne Park Forecasting - EDW Integration Technical Specification"
description: "Comprehensive technical specification for Enterprise Data Warehouse integration including caching strategies, performance optimization, fallback mechanisms, and data transformation requirements for the forecasting system"
created_date: 2025-07-24
last_updated_date: 2025-07-24
source_date: 2025-07-03
version: 1.0
status: Draft
owner: "Development Team"
source_documents:
  - "20250623-26_Forecasting_BacklogGrooming_Consolidated_Processed.md"
systems:
  - Forecasting
  - EDW
components:
  - Backend
  - Integration
  - Database
  - API
business_domains:
  - Statistics
  - Payroll
  - Parking Rates
  - Other Expenses
  - Other Revenue
  - Data Management
user_roles:
  - System Administrator
  - Data Administrator
  - Development Team
tags:
  - technical-specification
  - edw-integration
  - caching
  - performance
  - data-transformation
  - fallback-mechanisms
---

# Towne Park Forecasting - EDW Integration Technical Specification

## Purpose

This document provides comprehensive technical specifications for integrating the Towne Park Forecasting system with the Enterprise Data Warehouse (EDW). The specifications are based on decisions made during June 23-26, 2025 backlog grooming sessions and define the architecture, implementation requirements, performance standards, and operational procedures for reliable data integration.

## Architecture

### System Overview

The EDW integration architecture implements a multi-layered approach designed for performance, reliability, and maintainability:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Forecasting   │    │   Integration    │    │   Enterprise    │
│     System      │◄──►│     Layer        │◄──►│  Data Warehouse │
│                 │    │                  │    │      (EDW)      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌──────────────────┐             │
         │              │   Caching Layer  │             │
         │              │    (Redis)       │             │
         │              └──────────────────┘             │
         │                       │                       │
         │              ┌──────────────────┐             │
         └──────────────►│  Fallback Data   │◄────────────┘
                        │     Storage      │
                        └──────────────────┘
```

### Component Architecture

#### Integration Layer Components
- **API Gateway**: Secure endpoint management and request routing
- **Authentication Service**: OAuth 2.0 token management and validation
- **Data Transformation Engine**: ETL processing for format standardization
- **Connection Pool Manager**: Optimized connection lifecycle management
- **Error Handling Service**: Comprehensive error detection and recovery
- **Audit Logging Service**: Complete operation tracking and compliance

#### Caching Layer Components
- **Redis Cluster**: High-availability caching with automatic failover
- **Cache Manager**: TTL management and invalidation coordination
- **Cache Warming Service**: Proactive data loading for performance optimization
- **Cache Monitoring**: Performance metrics and health monitoring

#### Fallback Storage Components
- **Local Database**: Critical data persistence for offline capability
- **Data Synchronization Service**: Conflict resolution and consistency management
- **Backup Scheduler**: Automated backup and recovery procedures

## Data Model

### EDW Data Sources

#### Statistics Data Structure
```sql
-- Primary statistics table structure
CREATE TABLE edw_statistics (
    site_id VARCHAR(50) NOT NULL,
    period_date DATE NOT NULL,
    metric_type VARCHAR(100) NOT NULL,
    metric_value DECIMAL(18,4),
    unit_of_measure VARCHAR(50),
    data_quality_score DECIMAL(3,2),
    last_updated_timestamp TIMESTAMP,
    source_system VARCHAR(100),
    PRIMARY KEY (site_id, period_date, metric_type)
);
```

#### Payroll Data Structure
```sql
-- Payroll data integration structure
CREATE TABLE edw_payroll (
    site_id VARCHAR(50) NOT NULL,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    employee_category VARCHAR(100),
    total_hours DECIMAL(10,2),
    total_cost DECIMAL(18,2),
    overhead_percentage DECIMAL(5,4),
    benefits_cost DECIMAL(18,2),
    last_updated_timestamp TIMESTAMP,
    PRIMARY KEY (site_id, pay_period_start, employee_category)
);
```

#### Budget Data Structure
```sql
-- Budget data integration structure
CREATE TABLE edw_budget (
    site_id VARCHAR(50) NOT NULL,
    budget_period DATE NOT NULL,
    budget_category VARCHAR(100) NOT NULL,
    budgeted_amount DECIMAL(18,2),
    variance_threshold DECIMAL(5,4),
    approval_status VARCHAR(50),
    last_modified_by VARCHAR(100),
    last_updated_timestamp TIMESTAMP,
    PRIMARY KEY (site_id, budget_period, budget_category)
);
```

### Data Transformation Mappings

#### Currency Standardization
- **Source Format**: Various currency formats from different systems
- **Target Format**: Decimal(18,2) with USD base currency
- **Transformation Logic**: 
  ```sql
  CASE 
    WHEN source_currency = 'USD' THEN source_amount
    WHEN source_currency = 'CAD' THEN source_amount * exchange_rate_cad_usd
    ELSE source_amount * get_exchange_rate(source_currency, 'USD', effective_date)
  END
  ```

#### Date Standardization
- **Source Format**: Multiple date formats (MM/DD/YYYY, DD-MM-YYYY, YYYY-MM-DD)
- **Target Format**: ISO 8601 (YYYY-MM-DD)
- **Transformation Logic**: Automatic format detection with validation

#### Percentage Normalization
- **Source Format**: Various percentage representations (0-100, 0.0-1.0, text with %)
- **Target Format**: Decimal(5,4) representing 0.0000 to 1.0000
- **Transformation Logic**: Automatic detection and conversion with validation

## API Endpoints

### Data Retrieval Endpoints

#### GET /api/v1/edw/statistics
**Purpose**: Retrieve statistical data for forecasting calculations  
**Authentication**: OAuth 2.0 Bearer Token  
**Rate Limiting**: 100 requests per minute per client  

**Request Parameters**:
```json
{
  "site_ids": ["string array"],
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "metric_types": ["string array"],
  "include_quality_score": boolean,
  "cache_preference": "fresh|cached|any"
}
```

**Response Format**:
```json
{
  "status": "success|error",
  "data": [
    {
      "site_id": "string",
      "period_date": "YYYY-MM-DD",
      "metric_type": "string",
      "metric_value": number,
      "unit_of_measure": "string",
      "data_quality_score": number,
      "cache_status": "hit|miss|fresh",
      "last_updated": "ISO 8601 timestamp"
    }
  ],
  "metadata": {
    "total_records": number,
    "cache_hit_ratio": number,
    "response_time_ms": number,
    "data_freshness": "ISO 8601 timestamp"
  }
}
```

#### GET /api/v1/edw/payroll
**Purpose**: Retrieve payroll data for expense forecasting  
**Authentication**: OAuth 2.0 Bearer Token  
**Rate Limiting**: 50 requests per minute per client  

**Request Parameters**:
```json
{
  "site_ids": ["string array"],
  "pay_period_start": "YYYY-MM-DD",
  "pay_period_end": "YYYY-MM-DD",
  "employee_categories": ["string array"],
  "include_benefits": boolean,
  "aggregation_level": "detail|summary"
}
```

#### GET /api/v1/edw/budget
**Purpose**: Retrieve budget data for variance analysis  
**Authentication**: OAuth 2.0 Bearer Token  
**Rate Limiting**: 75 requests per minute per client  

**Request Parameters**:
```json
{
  "site_ids": ["string array"],
  "budget_periods": ["YYYY-MM-DD array"],
  "budget_categories": ["string array"],
  "approval_status": ["approved|pending|rejected"],
  "include_variance_thresholds": boolean
}
```

### Data Refresh Endpoints

#### POST /api/v1/edw/refresh
**Purpose**: Trigger manual data refresh from EDW  
**Authentication**: OAuth 2.0 Bearer Token with admin scope  
**Rate Limiting**: 10 requests per hour per client  

**Request Parameters**:
```json
{
  "refresh_scope": "full|incremental|selective",
  "data_types": ["statistics|payroll|budget"],
  "site_ids": ["string array"],
  "priority": "high|normal|low",
  "notification_email": "string"
}
```

## Dependencies

### External System Dependencies
- **Enterprise Data Warehouse (EDW)**: Primary data source requiring 99.5% availability
- **OAuth 2.0 Authentication Server**: Identity and access management
- **Redis Cluster**: Caching infrastructure with high availability configuration
- **Network Infrastructure**: Secure VPN or dedicated connection to EDW
- **Monitoring Systems**: Application performance monitoring and alerting

### Internal System Dependencies
- **Forecasting Database**: Local data storage for transformed and cached data
- **Configuration Management**: Environment-specific settings and connection parameters
- **Logging Infrastructure**: Centralized logging for audit and troubleshooting
- **Backup Systems**: Automated backup and recovery for fallback data

### Third-Party Dependencies
- **Redis**: Version 6.2+ for caching layer implementation
- **PostgreSQL**: Version 13+ for local data storage and fallback
- **Apache Kafka**: Version 2.8+ for event streaming and data synchronization
- **Prometheus**: Metrics collection and monitoring
- **Grafana**: Performance dashboard and visualization

## Implementation Details

### Caching Strategy Implementation

#### Cache Configuration
```yaml
redis_config:
  cluster_nodes:
    - host: redis-node-1.internal
      port: 6379
    - host: redis-node-2.internal
      port: 6379
    - host: redis-node-3.internal
      port: 6379
  connection_pool:
    max_connections: 50
    min_connections: 10
    connection_timeout: 5000ms
    socket_timeout: 3000ms
  failover:
    sentinel_enabled: true
    master_name: "forecasting-cache"
    sentinel_timeout: 2000ms
```

#### TTL Configuration by Data Type
```yaml
cache_ttl_settings:
  statistics_data:
    current_period: 4h
    historical_data: 24h
    reference_data: 7d
  payroll_data:
    current_period: 2h
    historical_data: 12h
    summary_data: 24h
  budget_data:
    approved_budgets: 24h
    draft_budgets: 1h
    variance_thresholds: 12h
```

#### Cache Warming Strategy
```python
# Pseudo-code for cache warming implementation
class CacheWarmingService:
    def warm_critical_data(self):
        # Warm frequently accessed current period data
        current_sites = get_active_sites()
        current_period = get_current_period()
        
        for site_id in current_sites:
            # Pre-load statistics data
            self.cache_statistics_data(site_id, current_period)
            # Pre-load payroll data
            self.cache_payroll_data(site_id, current_period)
            # Pre-load budget data
            self.cache_budget_data(site_id, current_period)
    
    def schedule_warming_jobs(self):
        # Schedule warming 30 minutes before peak usage
        schedule.every().day.at("07:30").do(self.warm_critical_data)
        schedule.every().monday.at("06:00").do(self.warm_weekly_data)
```

### Connection Pool Management

#### Connection Pool Configuration
```java
// Java configuration example for connection pooling
@Configuration
public class EDWConnectionConfig {
    
    @Bean
    public DataSource edwDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:sqlserver://edw.internal:1433;database=forecasting");
        config.setUsername("${edw.username}");
        config.setPassword("${edw.password}");
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        config.setLeakDetectionThreshold(60000);
        return new HikariDataSource(config);
    }
}
```

#### Retry Logic Implementation
```python
# Python implementation for retry logic with exponential backoff
import time
import random
from functools import wraps

def retry_with_backoff(max_retries=3, base_delay=1, max_delay=60):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries:
                        raise e
                    
                    delay = min(base_delay * (2 ** attempt) + random.uniform(0, 1), max_delay)
                    time.sleep(delay)
                    
            return None
        return wrapper
    return decorator

@retry_with_backoff(max_retries=3, base_delay=2, max_delay=30)
def query_edw_data(query, parameters):
    # Implementation for EDW data querying with retry logic
    pass
```

### Error Handling Implementation

#### Error Classification and Response
```python
class EDWIntegrationError(Exception):
    """Base exception for EDW integration errors"""
    pass

class EDWConnectionError(EDWIntegrationError):
    """Raised when EDW connection fails"""
    def __init__(self, message, retry_after=None):
        super().__init__(message)
        self.retry_after = retry_after

class EDWDataValidationError(EDWIntegrationError):
    """Raised when data validation fails"""
    def __init__(self, message, invalid_records=None):
        super().__init__(message)
        self.invalid_records = invalid_records

class EDWTimeoutError(EDWIntegrationError):
    """Raised when EDW operations timeout"""
    def __init__(self, message, operation_id=None):
        super().__init__(message)
        self.operation_id = operation_id

# Error handling strategy
def handle_edw_error(error, operation_context):
    if isinstance(error, EDWConnectionError):
        # Activate fallback data source
        return activate_fallback_data(operation_context)
    elif isinstance(error, EDWDataValidationError):
        # Log validation errors and return partial data
        log_validation_errors(error.invalid_records)
        return get_validated_data_subset(operation_context)
    elif isinstance(error, EDWTimeoutError):
        # Return cached data with staleness warning
        return get_cached_data_with_warning(operation_context)
    else:
        # Generic error handling
        raise error
```

## Performance Considerations

### Response Time Optimization

#### Query Optimization Strategies
- **Indexed Queries**: Ensure all EDW queries utilize appropriate indexes
- **Query Batching**: Combine multiple small queries into efficient batch operations
- **Parallel Processing**: Execute independent queries concurrently
- **Result Set Limiting**: Implement pagination for large data sets

#### Caching Optimization
- **Cache Hit Ratio Target**: Maintain >80% cache hit ratio for frequently accessed data
- **Cache Warming**: Proactive loading of critical data during off-peak hours
- **Cache Partitioning**: Separate cache namespaces for different data types
- **Memory Management**: Implement LRU eviction policies for memory optimization

### Scalability Considerations

#### Horizontal Scaling
- **Load Balancing**: Distribute EDW queries across multiple integration service instances
- **Cache Clustering**: Redis cluster configuration for high availability and performance
- **Database Sharding**: Partition fallback data storage by site or date ranges
- **Microservice Architecture**: Separate integration services for different data types

#### Vertical Scaling
- **Memory Optimization**: Allocate sufficient memory for caching and connection pooling
- **CPU Optimization**: Multi-threaded processing for data transformation operations
- **Network Optimization**: Dedicated network connections for high-volume data transfer
- **Storage Optimization**: SSD storage for fallback data and temporary processing

## Security Considerations

### Authentication and Authorization

#### OAuth 2.0 Implementation
```yaml
oauth_config:
  authorization_server: "https://auth.townepark.internal"
  client_id: "forecasting-edw-integration"
  client_secret: "${OAUTH_CLIENT_SECRET}"
  scopes:
    - "edw:read"
    - "edw:refresh"
    - "forecasting:write"
  token_endpoint: "/oauth2/token"
  introspection_endpoint: "/oauth2/introspect"
  token_refresh_threshold: 300s
```

#### API Security Headers
```http
# Required security headers for all API requests
Authorization: Bearer {access_token}
Content-Type: application/json
X-API-Version: v1
X-Request-ID: {unique_request_identifier}
X-Client-ID: {client_identifier}
```

### Data Protection

#### Encryption Requirements
- **Data in Transit**: TLS 1.3 encryption for all EDW communications
- **Data at Rest**: AES-256 encryption for cached and fallback data
- **Key Management**: Secure key rotation and management procedures
- **Certificate Management**: Automated certificate renewal and validation

#### Access Control
- **Role-Based Access**: Granular permissions based on user roles and data sensitivity
- **IP Whitelisting**: Restrict EDW access to authorized network ranges
- **Audit Logging**: Comprehensive logging of all data access and modifications
- **Data Masking**: Sensitive data protection in non-production environments

## Testing Strategy

### Unit Testing Requirements
- **Connection Management**: Test connection pool behavior under various load conditions
- **Data Transformation**: Validate all data transformation logic with edge cases
- **Error Handling**: Test all error scenarios and recovery mechanisms
- **Caching Logic**: Verify cache operations, TTL behavior, and invalidation triggers

### Integration Testing Requirements
- **EDW Connectivity**: Test actual EDW connections and data retrieval
- **Performance Testing**: Validate response times under expected load
- **Failover Testing**: Test fallback mechanisms during EDW outages
- **Data Consistency**: Verify data integrity across all integration points

### Load Testing Requirements
- **Concurrent Users**: Test system behavior with 50+ simultaneous users
- **Data Volume**: Test with production-scale data volumes
- **Peak Load**: Simulate peak usage periods and validate performance
- **Stress Testing**: Test system behavior beyond normal operating parameters

## Deployment Considerations

### Environment Configuration

#### Development Environment
```yaml
development_config:
  edw_endpoint: "https://edw-dev.internal"
  cache_ttl_multiplier: 0.1  # Shorter TTL for testing
  connection_pool_size: 5
  retry_attempts: 1
  logging_level: "DEBUG"
```

#### Production Environment
```yaml
production_config:
  edw_endpoint: "https://edw-prod.internal"
  cache_ttl_multiplier: 1.0
  connection_pool_size: 20
  retry_attempts: 3
  logging_level: "INFO"
  monitoring_enabled: true
  alerting_enabled: true
```

### Rollback Procedures

#### Deployment Rollback Strategy
1. **Immediate Rollback**: Automated rollback triggers for critical failures
2. **Data Consistency**: Ensure data integrity during rollback operations
3. **Cache Invalidation**: Clear potentially corrupted cache data
4. **Monitoring Validation**: Verify system health after rollback completion

#### Emergency Procedures
1. **EDW Outage Response**: Activate fallback data sources immediately
2. **Performance Degradation**: Scale resources and optimize queries
3. **Data Corruption Detection**: Isolate affected data and initiate recovery
4. **Security Incident Response**: Secure systems and investigate breaches

## Related Documentation

### Technical Specifications
- [Forecasting System Overview](../../systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md)
- [Forecasting Data Sources Technical Specification](../database/20250716_Forecasting_DataSources_TechnicalSpec.md)

### Business Rules Documentation
- [Forecasting Data Validation Business Rules](../../business-rules/forecasting/20250724_Forecasting_DataValidation_BusinessRules.md)

### Team Notes and Decisions
- [Forecasting Backlog Grooming Consolidated Decisions](../../team-notes/development/20250724_Forecasting_BacklogGrooming_ConsolidatedDecisions.md)

### Configuration Documentation
- [EDW Integration Configuration](../../configuration/system-settings/20250724_EDW_Integration_Configuration.md)

## Code Validation Report
**Last Validated:** 2025-07-24  
**Validation Scope:** Integration Architecture and API Specifications  
**Code Copy Date:** Current as of validation date

### Validation Summary
- ✅ **Verified Elements:** 0 items (technical specifications pending implementation)
- ⚠️ **Discrepancies Found:** 0 items
- ❓ **Incomplete Documentation:** 0 items  
- 🔍 **Requires Review:** Implementation validation needed once EDW integration is developed

### Validation Limitations
- Technical specifications document architecture and requirements rather than implementation
- Code validation will be required once EDW integration components are developed
- Future validation needed against actual API implementations and caching mechanisms

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-24 | Documentation Team | Initial creation from consolidated backlog grooming decisions, establishing comprehensive technical specifications for EDW integration including architecture, API design, caching strategies, and performance requirements |