---
title: "Towne Park Database - Migration and Data Flow Technical Specifications"
description: "Comprehensive technical specifications for database node migration, job code rate data flows, and service principal configuration derived from daily scrum development activities"
created_date: 2025-07-23
last_updated_date: 2025-07-23
source_date: 2025-06-02
version: 1.0
status: Draft
owner: "Christopher Thompson"
contributors:
  - "Cesar Figueroa"
  - "Jonathan Aulson"
source_documents:
  - "20250602_20250610_DailyScrum_Batch1.md"
systems:
  - Billing
  - Forecasting
components:
  - Database
  - Backend
  - Integration
business_domains:
  - Database Migration
  - Data Flow Processing
  - Service Principal Management
  - Job Code Rate Calculation
user_roles:
  - Database Administrator
  - Backend Developer
  - System Administrator
tags:
  - database
  - migration
  - data-flow
  - technical-specification
  - node-migration
  - service-principal
  - job-codes
  - edw-integration
---

# Towne Park Database - Migration and Data Flow Technical Specifications

## Purpose

This document provides comprehensive technical specifications for critical database infrastructure components including node migration strategies, job code rate data flow implementations, and service principal configuration requirements. These specifications are derived from active development work conducted between June 2-10, 2025, and represent current implementation approaches and identified technical challenges.

## Architecture

### Database Node Migration Architecture

The database infrastructure is transitioning from Node 1 to a new development node (not Node 2) to support improved development and testing workflows.

```
Current Architecture:
Node 1 (Production) → New Development Node
    ↓
Training Environment → UAT Environment → Production Environment
```

**Migration Flow:**
1. **Training Environment Migration**: Initial migration testing in isolated training environment
2. **Privilege Resolution**: Address access control issues identified during migration
3. **Development Node Setup**: Establish new development node with proper configurations
4. **UAT Migration**: Migrate User Acceptance Testing environment
5. **Production Cutover**: Final migration to production environment

### Data Flow Architecture

```
EDW (Enterprise Data Warehouse)
    ↓
Job Code Rate Data Flow
    ↓
GP Table (Node 1) → Average Hourly Rate Calculation
    ↓
Site-Specific Job Code Rates
```

**Integration Points:**
- **EDW Integration**: Primary data source for job code information
- **GP Table Access**: Great Plains table validation for unit accounts batch processing
- **Node 1 Dependencies**: Current dependency on Node 1 for GP table access
- **Service Principal Authentication**: Automated processing authentication layer

## Data Model

### Job Code Rate Data Structure

**Primary Entities:**
- **Job Codes**: Unique identifiers for position types
- **Site Rates**: Location-specific rate information
- **Average Hourly Rates**: Calculated rates based on historical data
- **GP Table Records**: Great Plains validation data

**Field Definitions:**
- `job_code_id`: Primary key for job code records
- `site_id`: Foreign key linking to customer site information
- `hourly_rate`: Calculated average hourly rate for job code at specific site
- `effective_date`: Date when rate becomes active
- `calculation_method`: Method used for rate calculation (average, fixed, etc.)

**Relationships:**
- Job Codes → Sites (Many-to-Many through Site Rates)
- Sites → GP Table (One-to-Many for validation)
- Job Codes → Average Hourly Rates (One-to-Many for historical tracking)

## Implementation Details

### Node Migration Implementation

**Current Status**: In Progress
**Lead Developer**: Cesar Figueroa
**Implementation Date Range**: June 6, 2025 - Ongoing

**Technical Approach:**
```sql
-- Migration privilege requirements (VERIFICATION NEEDED: Exact privileges)
GRANT SELECT, INSERT, UPDATE, DELETE ON [database_name].* TO [migration_user];
GRANT EXECUTE ON [stored_procedures] TO [migration_user];
-- Additional privileges to be determined based on privilege resolution
```

**Migration Steps:**
1. **Environment Assessment**: Evaluate current Node 1 configuration and dependencies
2. **Privilege Mapping**: Identify all required permissions for new node access
3. **Data Migration Scripts**: Create scripts for transferring data and configurations
4. **Validation Procedures**: Implement validation to ensure data integrity post-migration
5. **Rollback Procedures**: Establish rollback mechanisms in case of migration issues

**Known Issues:**
- **Privilege Access Problems**: Some database operations require elevated privileges not currently available
- **Environment Dependencies**: Training environment has dependencies that need resolution
- **Timeline Uncertainty**: Migration timeline depends on privilege resolution

### Job Code Rate Data Flow Implementation

**Current Status**: Partially Complete
**Lead Developer**: Christopher Thompson
**Implementation Date Range**: June 9, 2025 - Ongoing

**Completed Components:**
- ✅ **Average Hourly Rate Calculation**: Successfully implemented and tested
- ✅ **GP Table Validation**: Confirmed availability of GP table in Node 1 for unit accounts batch validation
- ✅ **Basic Data Flow Structure**: Core data flow framework established

**Implementation Logic:**
```python
# Pseudocode for average hourly rate calculation
def calculate_average_hourly_rate(job_code, site_id, date_range):
    """
    Calculate average hourly rate for specific job code at site
    """
    historical_rates = get_historical_rates(job_code, site_id, date_range)
    if historical_rates:
        return sum(historical_rates) / len(historical_rates)
    else:
        return get_default_rate(job_code)

# Data flow processing
def process_job_code_rates():
    """
    Main data flow processing function
    """
    edw_data = extract_from_edw()
    for record in edw_data:
        rate = calculate_average_hourly_rate(
            record.job_code, 
            record.site_id, 
            record.date_range
        )
        update_site_rate(record.job_code, record.site_id, rate)
```

**Pending Components:**
- **Service Principal Authentication**: Blocked due to permission issues
- **Error Handling Integration**: Dependent on service principal resolution
- **Complete Data Flow Testing**: Requires service principal functionality

### Service Principal Configuration

**Current Status**: Blocked
**Lead Developer**: Christopher Thompson, Cesar Figueroa
**Issue Identified**: June 9, 2025

**Technical Challenge:**
The data flow error handling mechanism requires service principal authentication to avoid using individual developer credentials. Multiple permission configurations have been attempted without success.

**Attempted Solutions:**
```sql
-- Various permission grants attempted (specific permissions VERIFICATION NEEDED)
GRANT EXECUTE ON [stored_procedure_name] TO [service_principal_account];
GRANT db_datareader TO [service_principal_account];
GRANT db_datawriter TO [service_principal_account];
-- Additional permissions attempted but unsuccessful
```

**Current Workaround:**
- Using Christopher Thompson's personal credentials for data flow operations
- This approach is not suitable for production deployment

**Required Resolution:**
- **Security Team Consultation**: Determine appropriate permissions for service principal
- **Permission Escalation**: May require elevated access to grant necessary permissions
- **Alternative Authentication**: Explore alternative authentication mechanisms if service principal approach is not viable

## API Endpoints

**VERIFICATION NEEDED**: Specific API endpoints for data flow operations require validation against actual implementation.

**Anticipated Endpoints:**
- `GET /api/jobcodes/{site_id}/rates` - Retrieve job code rates for specific site
- `POST /api/jobcodes/rates/calculate` - Trigger rate calculation process
- `PUT /api/jobcodes/{job_code_id}/rates` - Update specific job code rate
- `GET /api/migration/status` - Check database migration status

## Dependencies

### External Dependencies
- **EDW (Enterprise Data Warehouse)**: Primary data source for job code information
- **Great Plains System**: Source of GP table data for validation
- **Azure Active Directory**: Service principal authentication provider
- **Node 1 Database**: Current dependency for GP table access

### Internal Dependencies
- **Database Migration Completion**: Data flow operations depend on successful node migration
- **Service Principal Resolution**: Error handling and automated processing depend on service principal authentication
- **Privilege Access**: All operations depend on proper database privilege configuration

## Performance Considerations

**Data Flow Performance:**
- **Processing Volume**: VERIFICATION NEEDED - Specific volume of job code records processed daily
- **Calculation Complexity**: Average hourly rate calculations may require optimization for large datasets
- **EDW Query Performance**: Data extraction from EDW may require query optimization

**Migration Performance:**
- **Downtime Requirements**: Migration process may require scheduled downtime
- **Data Transfer Speed**: Large data transfers between nodes may impact performance
- **Validation Time**: Post-migration validation procedures may require significant processing time

## Security Considerations

**Service Principal Security:**
- **Least Privilege Principle**: Service principal should have minimum required permissions
- **Credential Management**: Secure storage and rotation of service principal credentials
- **Audit Trail**: All service principal operations should be logged for security auditing

**Migration Security:**
- **Data Encryption**: Ensure data encryption during migration process
- **Access Control**: Restrict migration process access to authorized personnel only
- **Backup Security**: Secure backup procedures before migration execution

## Testing Strategy

### Unit Testing
- **Rate Calculation Testing**: Verify accuracy of average hourly rate calculations
- **Data Validation Testing**: Ensure GP table validation logic functions correctly
- **Error Handling Testing**: Test error scenarios and recovery procedures

### Integration Testing
- **EDW Integration Testing**: Verify data extraction and processing from EDW
- **Service Principal Testing**: Test service principal authentication (pending resolution)
- **End-to-End Data Flow Testing**: Complete data flow from EDW to final rate updates

### Migration Testing
- **Migration Script Testing**: Validate migration scripts in test environment
- **Rollback Testing**: Verify rollback procedures function correctly
- **Performance Testing**: Ensure migration process meets performance requirements

## Deployment Considerations

### Migration Deployment
- **Scheduled Maintenance Window**: Migration requires coordinated downtime
- **Rollback Plan**: Comprehensive rollback procedures must be available
- **Validation Checkpoints**: Multiple validation points throughout migration process
- **Communication Plan**: Stakeholder communication during migration process

### Data Flow Deployment
- **Service Principal Prerequisites**: Service principal configuration must be resolved before deployment
- **Monitoring Setup**: Implement monitoring for data flow operations
- **Error Alerting**: Configure alerts for data flow failures
- **Performance Monitoring**: Monitor data flow performance and optimization opportunities

## Code Validation Report

**Last Validated**: 2025-07-23
**Validation Scope**: Database Migration and Data Flow Implementation

### Validation Summary
- ❓ **Incomplete Documentation**: Source code validation required for specific implementation details
- 🔍 **Requires Review**: Service principal permission requirements need stakeholder verification
- ❓ **Incomplete Documentation**: Exact database migration scripts and procedures not available in source document

### Detailed Validation Results

#### Database Migration Implementation
**Source Code**: VERIFICATION NEEDED - Migration scripts and procedures require code validation
**Documented Element**: "Node migration from Node 1 to new development node with privilege resolution"
**Code Implementation**: Not available in current source document
**Validation Status**: ❓ **Incomplete Documentation**
**Findings**: Source document contains meeting discussions about migration but lacks specific implementation details
**Recommendations**: Validate against actual migration scripts in database repository

#### Job Code Rate Data Flow
**Source Code**: VERIFICATION NEEDED - Data flow implementation requires code validation
**Documented Element**: "Average hourly rate calculation successfully implemented"
**Code Implementation**: Not available in current source document
**Validation Status**: ❓ **Incomplete Documentation**
**Findings**: Implementation success reported but specific calculation logic not documented
**Recommendations**: Validate against actual data flow code in billing system repository

#### Service Principal Configuration
**Source Code**: VERIFICATION NEEDED - Permission configuration requires code validation
**Documented Element**: "Service principal lacks required permissions for stored procedures"
**Code Implementation**: Not available in current source document
**Validation Status**: 🔍 **Requires Review**
**Findings**: Permission issues documented but specific requirements not detailed
**Recommendations**: Consult with security team and validate against Azure AD configuration

### Code File References
- **Migration Scripts**: VERIFICATION NEEDED - Location of database migration scripts
- **Data Flow Implementation**: VERIFICATION NEEDED - Location of job code rate data flow code
- **Service Principal Configuration**: VERIFICATION NEEDED - Azure AD service principal configuration files
- **Stored Procedures**: VERIFICATION NEEDED - Database stored procedures for data flow operations

### Validation Methodology
- **Source Code Repositories Analyzed**: Source document analysis only - code repositories not accessed
- **Code Copy Date**: N/A - Code validation pending
- **Validation Approach**: Document analysis with identification of validation requirements
- **Limitations**: Validation limited to meeting transcript content; actual code validation required

### Discrepancy Escalation
- **Critical Discrepancies Requiring User Input**: None identified in current document scope
- **Recommended Resolution Actions**: 
  1. Access database migration repository for script validation
  2. Review data flow implementation code for calculation logic verification
  3. Consult security team for service principal permission requirements
- **User Decision Required**: Prioritization of code validation activities and repository access

## Related Documentation

- [Forecasting Data Sources Technical Specification](../database/20250716_Forecasting_DataSources_TechnicalSpec.md)
- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Development Workflow Standards](../../user-processes/development/20250723_Development_UserProcess_WorkflowStandards.md)

## Outstanding Items

**VERIFICATION NEEDED:**
- Exact database privileges required for node migration
- Specific service principal permissions for stored procedure execution
- Complete API endpoint specifications for data flow operations
- Performance benchmarks for data processing volumes

**TODO:**
- Validate implementation details against actual source code repositories
- Resolve service principal authentication configuration
- Complete migration timeline and rollback procedures documentation
- Establish monitoring and alerting for data flow operations