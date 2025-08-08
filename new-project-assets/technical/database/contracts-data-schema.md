---
title: "Contracts Data Schema Technical Specification"
description: "Comprehensive technical specification for the contracts database schema, including field definitions, data types, relationships, and validation rules"
systems: ["PowerBill", "Contract Management", "Database Engine"]
components: ["Contract Repository", "Data Schema", "Validation Engine", "Relationship Management"]
business_domains: ["Contract Administration", "Data Management", "System Integration"]
user_roles: ["Database Administrator", "System Architect", "Developer", "Data Analyst"]
processes: ["Schema Management", "Data Validation", "System Integration", "Performance Optimization"]
data_classification: "Internal"
last_updated: "2025-07-16"
version: "1.0"
related_docs: 
  - "systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md"
  - "business-rules/contracts/contract-escalation-rules.md"
  - "user-processes/contract-admin/contract-setup-workflow.md"
  - "configuration/contracts/contract-configuration-guide.md"
cross_references:
  - system: "PowerBill"
    component: "Database Engine"
    relationship: "implements"
  - system: "Billing Engine"
    component: "Rate Tables"
    relationship: "feeds_data_to"
  - system: "Customer Sites"
    component: "Site Directory"
    relationship: "references"
---

# Contracts Data Schema Technical Specification

## Overview

The contracts data schema serves as the foundational data structure for Towne Park's contract management system within the PowerBill platform. This specification defines the complete data model, including field definitions, data types, constraints, relationships, and validation rules for all contract-related entities.

## Primary Contract Entity

### Contract Table Structure

#### Core Identification Fields

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_contractid` | UNIQUEIDENTIFIER | 36 | PRIMARY KEY, NOT NULL | Unique contract identifier (GUID format) |
| `bs_customersitefk` | UNIQUEIDENTIFIER | 36 | FOREIGN KEY, NOT NULL | Reference to customer site entity |
| `bs_name` | NVARCHAR | 255 | NOT NULL | Contract display name |
| `bs_contractnumber` | NVARCHAR | 50 | UNIQUE, NOT NULL | Human-readable contract number |

#### Contract Classification Fields

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_contracttype` | INT | 4 | NOT NULL | Contract type enumeration |
| `bs_billingtype` | INT | 4 | NOT NULL | Billing type classification |
| `bs_servicetype` | INT | 4 | NULL | Service delivery type |
| `bs_contractstatus` | INT | 4 | NOT NULL, DEFAULT 1 | Active/Inactive status |

#### Financial Configuration Fields

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_managementfee` | DECIMAL | 18,2 | NULL | Monthly management fee amount |
| `bs_servicefee` | DECIMAL | 18,2 | NULL | Service fee amount |
| `bs_hourlyrate` | DECIMAL | 18,2 | NULL | Standard hourly rate for PLH contracts |
| `bs_overtimerate` | DECIMAL | 18,2 | NULL | Overtime hourly rate |
| `bs_revenuesharepercentage` | DECIMAL | 5,2 | NULL, CHECK (0 <= value <= 100) | Revenue sharing percentage |

#### Escalation Configuration Fields

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_escalationtype` | INT | 4 | NOT NULL | Escalation method enumeration |
| `bs_escalationpercentage` | DECIMAL | 5,2 | NULL | Fixed escalation percentage |
| `bs_escalationanniversary` | DATE | 8 | NOT NULL | Annual escalation date |
| `bs_lastescalationdate` | DATE | 8 | NULL | Date of last escalation |
| `bs_nextescalationdate` | DATE | 8 | NULL | Calculated next escalation date |

#### Payment Terms Fields

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_paymentterms` | INT | 4 | NOT NULL | Payment terms enumeration |
| `bs_paymentduedays` | INT | 4 | NULL | Days until payment due |
| `bs_paymentduedate` | INT | 4 | NULL | Specific day of month payment due |
| `bs_advancebilling` | BIT | 1 | NOT NULL, DEFAULT 0 | Advance billing flag |

#### Validation and Reporting Fields

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_validationthreshold` | DECIMAL | 18,2 | NULL | Revenue validation threshold amount |
| `bs_validationpercentage` | DECIMAL | 5,2 | NULL | Validation threshold percentage |
| `bs_requireshourbackup` | BIT | 1 | NOT NULL, DEFAULT 0 | Hours backup documentation required |
| `bs_supportingreports` | NVARCHAR | 500 | NULL | Required supporting report types |

#### Purchase Order and Documentation Fields

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_purchaseorder` | NVARCHAR | 100 | NULL | Purchase order number |
| `bs_ponumber` | NVARCHAR | 100 | NULL | Alternative PO number field |
| `bs_contractdocument` | NVARCHAR | 500 | NULL | Contract document reference |
| `bs_notes` | NTEXT | MAX | NULL | Additional contract notes |

#### Audit and Tracking Fields

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `createdon` | DATETIME2 | 7 | NOT NULL, DEFAULT GETUTCDATE() | Record creation timestamp |
| `createdby` | UNIQUEIDENTIFIER | 36 | NOT NULL | User who created record |
| `modifiedon` | DATETIME2 | 7 | NOT NULL, DEFAULT GETUTCDATE() | Last modification timestamp |
| `modifiedby` | UNIQUEIDENTIFIER | 36 | NOT NULL | User who last modified record |
| `versionnumber` | BIGINT | 8 | NOT NULL | Record version for concurrency |

## Enumeration Definitions

### Contract Type Enumeration

```sql
-- Contract Type Values
126840000 = Fixed Fee
126840001 = Per Labor Hour (PLH)
126840002 = Revenue Share
126840003 = Management Agreement
126840004 = Hybrid (Multiple Types)
```

### Billing Type Enumeration

```sql
-- Billing Type Values
126840000 = Advanced Billing
126840001 = Arrears Billing
126840002 = Mid-Month Billing
126840003 = Custom Billing Schedule
```

### Escalation Type Enumeration

```sql
-- Escalation Type Values
126840000 = Fixed Percentage
126840001 = Consumer Price Index (CPI)
126840002 = Employment Cost Index (ECI)
126840003 = Greater of Fixed % or CPI
126840004 = Greater of Fixed % or ECI
126840005 = Custom Formula
```

### Payment Terms Enumeration

```sql
-- Payment Terms Values
126840000 = Due in 15 Days
126840001 = Due in 30 Days
126840002 = Due in 45 Days
126840003 = Due in 60 Days
126840004 = Due on 1st of Month
126840005 = Due on 15th of Month
126840006 = Due on 20th of Month
126840007 = Due on Receipt
```

## Related Entity Schemas

### Contract Rate History Table

#### Purpose
Maintains historical record of all rate changes for audit and analysis purposes.

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_ratehistoryid` | UNIQUEIDENTIFIER | 36 | PRIMARY KEY | Unique rate history identifier |
| `bs_contractid` | UNIQUEIDENTIFIER | 36 | FOREIGN KEY, NOT NULL | Reference to contract |
| `bs_ratetype` | INT | 4 | NOT NULL | Type of rate (management, hourly, etc.) |
| `bs_oldrate` | DECIMAL | 18,2 | NOT NULL | Previous rate value |
| `bs_newrate` | DECIMAL | 18,2 | NOT NULL | New rate value |
| `bs_effectivedate` | DATE | 8 | NOT NULL | Date rate change became effective |
| `bs_escalationmethod` | INT | 4 | NOT NULL | Method used for escalation |
| `bs_escalationpercentage` | DECIMAL | 5,2 | NULL | Actual escalation percentage applied |
| `bs_notes` | NVARCHAR | 500 | NULL | Notes about rate change |
| `createdon` | DATETIME2 | 7 | NOT NULL | Record creation timestamp |
| `createdby` | UNIQUEIDENTIFIER | 36 | NOT NULL | User who created record |

### Contract Validation Thresholds Table

#### Purpose
Stores validation threshold configurations for revenue share and other variable contracts.

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|---------|-------------|-------------|
| `bs_thresholdid` | UNIQUEIDENTIFIER | 36 | PRIMARY KEY | Unique threshold identifier |
| `bs_contractid` | UNIQUEIDENTIFIER | 36 | FOREIGN KEY, NOT NULL | Reference to contract |
| `bs_thresholdtype` | INT | 4 | NOT NULL | Type of threshold validation |
| `bs_thresholdamount` | DECIMAL | 18,2 | NULL | Fixed threshold amount |
| `bs_thresholdpercentage` | DECIMAL | 5,2 | NULL | Percentage-based threshold |
| `bs_effectivedate` | DATE | 8 | NOT NULL | Date threshold became effective |
| `bs_expirationdate` | DATE | 8 | NULL | Date threshold expires |
| `bs_isactive` | BIT | 1 | NOT NULL, DEFAULT 1 | Active status flag |

## Data Relationships

### Primary Relationships

#### Customer Site Relationship
```sql
-- Foreign Key Constraint
ALTER TABLE Contracts 
ADD CONSTRAINT FK_Contract_CustomerSite 
FOREIGN KEY (bs_customersitefk) 
REFERENCES CustomerSites(bs_customersiteid)
```

#### Contract Rate History Relationship
```sql
-- Foreign Key Constraint
ALTER TABLE ContractRateHistory 
ADD CONSTRAINT FK_RateHistory_Contract 
FOREIGN KEY (bs_contractid) 
REFERENCES Contracts(bs_contractid)
ON DELETE CASCADE
```

#### Contract Validation Thresholds Relationship
```sql
-- Foreign Key Constraint
ALTER TABLE ContractValidationThresholds 
ADD CONSTRAINT FK_Threshold_Contract 
FOREIGN KEY (bs_contractid) 
REFERENCES Contracts(bs_contractid)
ON DELETE CASCADE
```

### Referential Integrity Rules

#### Cascade Delete Rules
- **Contract Rate History**: Cascade delete when contract is deleted
- **Contract Validation Thresholds**: Cascade delete when contract is deleted
- **Contract Documents**: Cascade delete when contract is deleted

#### Update Rules
- **Customer Site Changes**: Restrict updates if active contracts exist
- **Contract Status Changes**: Log all status changes in audit table
- **Rate Changes**: Automatically create rate history record

## Data Validation Rules

### Business Rule Constraints

#### Contract Type Validation
```sql
-- Ensure contract type is valid
ALTER TABLE Contracts 
ADD CONSTRAINT CHK_ContractType 
CHECK (bs_contracttype IN (126840000, 126840001, 126840002, 126840003, 126840004))
```

#### Billing Type Validation
```sql
-- Ensure billing type is valid
ALTER TABLE Contracts 
ADD CONSTRAINT CHK_BillingType 
CHECK (bs_billingtype IN (126840000, 126840001, 126840002, 126840003))
```

#### Revenue Share Percentage Validation
```sql
-- Ensure revenue share percentage is between 0 and 100
ALTER TABLE Contracts 
ADD CONSTRAINT CHK_RevenueSharePercentage 
CHECK (bs_revenuesharepercentage IS NULL OR 
       (bs_revenuesharepercentage >= 0 AND bs_revenuesharepercentage <= 100))
```

#### Escalation Date Validation
```sql
-- Ensure escalation anniversary is not in the past for new contracts
ALTER TABLE Contracts 
ADD CONSTRAINT CHK_EscalationAnniversary 
CHECK (bs_escalationanniversary >= CAST(GETDATE() AS DATE) OR 
       bs_contractstatus != 1)
```

### Data Quality Rules

#### Required Field Combinations
```sql
-- PLH contracts must have hourly rates
ALTER TABLE Contracts 
ADD CONSTRAINT CHK_PLH_HourlyRate 
CHECK (bs_contracttype != 126840001 OR 
       (bs_hourlyrate IS NOT NULL AND bs_hourlyrate > 0))

-- Revenue share contracts must have percentage
ALTER TABLE Contracts 
ADD CONSTRAINT CHK_RevShare_Percentage 
CHECK (bs_contracttype != 126840002 OR 
       (bs_revenuesharepercentage IS NOT NULL AND bs_revenuesharepercentage > 0))

-- Fixed fee contracts must have management fee
ALTER TABLE Contracts 
ADD CONSTRAINT CHK_FixedFee_ManagementFee 
CHECK (bs_contracttype != 126840000 OR 
       (bs_managementfee IS NOT NULL AND bs_managementfee > 0))
```

## Performance Optimization

### Index Strategy

#### Primary Indexes
```sql
-- Primary key clustered index
CREATE CLUSTERED INDEX PK_Contracts 
ON Contracts(bs_contractid)

-- Customer site foreign key index
CREATE NONCLUSTERED INDEX IX_Contracts_CustomerSite 
ON Contracts(bs_customersitefk)
INCLUDE (bs_contracttype, bs_contractstatus)
```

#### Query Optimization Indexes
```sql
-- Contract type and status index for reporting
CREATE NONCLUSTERED INDEX IX_Contracts_Type_Status 
ON Contracts(bs_contracttype, bs_contractstatus)
INCLUDE (bs_managementfee, bs_hourlyrate, bs_revenuesharepercentage)

-- Escalation date index for processing
CREATE NONCLUSTERED INDEX IX_Contracts_EscalationDate 
ON Contracts(bs_nextescalationdate)
WHERE bs_contractstatus = 1 AND bs_nextescalationdate IS NOT NULL

-- Payment terms index for billing
CREATE NONCLUSTERED INDEX IX_Contracts_PaymentTerms 
ON Contracts(bs_paymentterms, bs_billingtype)
INCLUDE (bs_customersitefk, bs_contractnumber)
```

### Partitioning Strategy

#### Date-Based Partitioning
```sql
-- Partition function for contract creation date
CREATE PARTITION FUNCTION PF_ContractsByYear(DATETIME2)
AS RANGE RIGHT FOR VALUES 
('2020-01-01', '2021-01-01', '2022-01-01', '2023-01-01', '2024-01-01', '2025-01-01')

-- Partition scheme
CREATE PARTITION SCHEME PS_ContractsByYear
AS PARTITION PF_ContractsByYear
TO (FG_2019, FG_2020, FG_2021, FG_2022, FG_2023, FG_2024, FG_2025, FG_Current)
```

## Data Security and Access Control

### Row-Level Security

#### Customer Site Access Control
```sql
-- Security policy for customer site access
CREATE SECURITY POLICY ContractAccessPolicy
ADD FILTER PREDICATE 
    dbo.fn_UserHasCustomerSiteAccess(bs_customersitefk) = 1
ON Contracts
WITH (STATE = ON)
```

### Column-Level Security

#### Sensitive Financial Data
```sql
-- Dynamic data masking for financial fields
ALTER TABLE Contracts 
ALTER COLUMN bs_managementfee 
ADD MASKED WITH (FUNCTION = 'partial(2,"XXX",2)')

ALTER TABLE Contracts 
ALTER COLUMN bs_hourlyrate 
ADD MASKED WITH (FUNCTION = 'partial(2,"XXX",2)')
```

## Data Archival and Retention

### Archival Strategy

#### Inactive Contract Archival
```sql
-- Archive contracts inactive for more than 7 years
CREATE PROCEDURE sp_ArchiveInactiveContracts
AS
BEGIN
    -- Move to archive table
    INSERT INTO ContractsArchive
    SELECT * FROM Contracts
    WHERE bs_contractstatus = 0 
    AND modifiedon < DATEADD(YEAR, -7, GETDATE())
    
    -- Delete from active table
    DELETE FROM Contracts
    WHERE bs_contractstatus = 0 
    AND modifiedon < DATEADD(YEAR, -7, GETDATE())
END
```

### Backup and Recovery

#### Point-in-Time Recovery
- **Full Backup**: Daily at 2:00 AM
- **Differential Backup**: Every 6 hours
- **Transaction Log Backup**: Every 15 minutes
- **Recovery Point Objective (RPO)**: 15 minutes
- **Recovery Time Objective (RTO)**: 4 hours

## Integration Points

### PowerBill Platform Integration

#### Billing Engine Integration
```sql
-- View for billing engine consumption
CREATE VIEW vw_ActiveContractsForBilling
AS
SELECT 
    c.bs_contractid,
    c.bs_customersitefk,
    c.bs_contracttype,
    c.bs_billingtype,
    c.bs_managementfee,
    c.bs_hourlyrate,
    c.bs_revenuesharepercentage,
    c.bs_paymentterms,
    cs.bs_customername,
    cs.bs_sitename
FROM Contracts c
INNER JOIN CustomerSites cs ON c.bs_customersitefk = cs.bs_customersiteid
WHERE c.bs_contractstatus = 1
```

#### Rate Escalation Integration
```sql
-- Stored procedure for escalation processing
CREATE PROCEDURE sp_ProcessContractEscalations
    @ProcessDate DATE = NULL
AS
BEGIN
    SET @ProcessDate = ISNULL(@ProcessDate, GETDATE())
    
    -- Process contracts due for escalation
    UPDATE Contracts
    SET 
        bs_managementfee = CASE 
            WHEN bs_escalationtype = 126840000 
            THEN bs_managementfee * (1 + bs_escalationpercentage / 100)
            ELSE bs_managementfee 
        END,
        bs_lastescalationdate = @ProcessDate,
        bs_nextescalationdate = DATEADD(YEAR, 1, @ProcessDate),
        modifiedon = GETUTCDATE(),
        modifiedby = SYSTEM_USER
    WHERE bs_nextescalationdate <= @ProcessDate
    AND bs_contractstatus = 1
END
```

## Monitoring and Maintenance

### Performance Monitoring

#### Key Performance Indicators
- **Query Response Time**: < 100ms for single contract lookups
- **Bulk Operations**: < 5 seconds for 1000 record updates
- **Index Fragmentation**: < 10% fragmentation on critical indexes
- **Database Growth**: Monitor monthly growth patterns

#### Monitoring Queries
```sql
-- Monitor contract data quality
SELECT 
    'Missing Hourly Rates for PLH' as Issue,
    COUNT(*) as Count
FROM Contracts 
WHERE bs_contracttype = 126840001 
AND (bs_hourlyrate IS NULL OR bs_hourlyrate = 0)
AND bs_contractstatus = 1

UNION ALL

SELECT 
    'Missing Revenue Share % for Rev Share' as Issue,
    COUNT(*) as Count
FROM Contracts 
WHERE bs_contracttype = 126840002 
AND (bs_revenuesharepercentage IS NULL OR bs_revenuesharepercentage = 0)
AND bs_contractstatus = 1
```

### Maintenance Procedures

#### Weekly Maintenance
```sql
-- Update statistics on critical tables
UPDATE STATISTICS Contracts WITH FULLSCAN
UPDATE STATISTICS ContractRateHistory WITH FULLSCAN

-- Rebuild fragmented indexes
ALTER INDEX ALL ON Contracts REBUILD 
WHERE avg_fragmentation_in_percent > 10
```

## Related Documentation

- [Contract Management System Overview](../../systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md) ✓ VERIFIED
- [Contract Escalation Business Rules](../../business-rules/contracts/contract-escalation-rules.md) ✓ VERIFIED
- [Contract Setup User Process](../../user-processes/contract-admin/contract-setup-workflow.md) ✓ VERIFIED
- [Contract Configuration Guide](../../configuration/contracts/contract-configuration-guide.md) ✓ VERIFIED
## Quick Links

- [Contract Management System Overview](../../systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md)
- [Contract Escalation Business Rules](../../business-rules/contracts/contract-escalation-rules.md)
- [Contract Setup User Process](../../user-processes/contract-admin/contract-setup-workflow.md)
- [Contract Configuration Guide](../../configuration/contracts/contract-configuration-guide.md)
