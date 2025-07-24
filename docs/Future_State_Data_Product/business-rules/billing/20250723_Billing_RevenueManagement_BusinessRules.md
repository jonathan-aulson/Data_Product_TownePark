---
title: "Revenue Management Business Rules"
date: "2025-07-23"
version: "1.0"
status: "Active"
author: "Towne Park Business Analysis Team"
reviewer: "Jonathan Aulson"
tags: ["business-rules", "revenue-management", "billing", "revenue-share", "validation"]
related_docs: 
  - "20250723_DailyScrum_TechnicalIssues_ResolutionGuide.md"
  - "20250723_SystemAdministration_Operations_Procedures.md"
systems: ["Billing", "Revenue Share", "Invoice Generation"]
stakeholders: ["Business Analyst", "Account Managers", "Finance Team", "Development Team"]
decision_authority: "Jonathan Aulson (Business Analyst)"
effective_date: "2025-06-12"
---

# Revenue Management Business Rules

## Document Overview

This document establishes business rules for revenue management within the Towne Park billing system, derived from decisions and discussions during daily scrum meetings from June 12-18, 2025. These rules govern revenue share functionality, invoice generation, and validation processes.

## Executive Summary

Revenue management encompasses the configuration and processing of revenue share agreements, invoice generation with proper revenue code assignment, and validation mechanisms to ensure accuracy. Key business rules address threshold structures, revenue code visibility, and validation requirements for different revenue types.

## Business Rules Catalog

### 1. Revenue Share Configuration Rules

#### 1.1 Revenue Share Enablement

**Rule ID:** BR-RS-001  
**Category:** Configuration  
**Priority:** High  
**Status:** Active  

**Business Rule:**
Revenue share functionality must be explicitly enabled for each contract before any revenue share calculations can be performed.

**Implementation Details:**
- Revenue share is disabled by default for new contracts
- Enabling requires explicit user action through contract configuration
- Once enabled, share percentage must be greater than 0%
- Disabling revenue share removes all threshold structures and configurations

**Validation Requirements:**
- Share percentage > 0% when revenue share is enabled
- All threshold structures must have valid share percentages
- Revenue codes must be properly assigned to structures

**Code Validation Status:**
✅ **VALIDATED** - Confirmed in [`RevenueShare.tsx`](Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/RevenueShare/RevenueShare.tsx:62-69)

#### 1.2 Threshold Structure Configuration

**Rule ID:** BR-RS-002  
**Category:** Configuration  
**Priority:** High  
**Status:** Active  

**Business Rule:**
Threshold structures define revenue share percentages at different revenue levels and must follow hierarchical amount ordering.

**Configuration Requirements:**
- Each threshold structure must have at least one tier
- Tier amounts must be in ascending order (each tier > previous tier)
- Share percentages can vary between tiers within a structure
- Revenue codes must be assigned to each structure when multiple structures exist

**Validation Logic:**
```
For each threshold structure:
  - Tier[0].amount = 0 (base tier)
  - Tier[n].amount > Tier[n-1].amount (ascending order)
  - Tier[n].sharePercentage >= 0 (non-negative percentages)
  - At least one tier must have sharePercentage > 0
```

**Code Validation Status:**
✅ **VALIDATED** - Amount validation logic confirmed in [`RevenueShare.tsx`](Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/RevenueShare/RevenueShare.tsx:236-243)

#### 1.3 Revenue Code Assignment

**Rule ID:** BR-RS-003  
**Category:** Configuration  
**Priority:** Medium  
**Status:** Active  

**Business Rule:**
All revenue codes must be mapped to threshold structures when multiple structures are configured, ensuring complete revenue coverage.

**Assignment Requirements:**
- Single structure: Automatically includes all revenue codes
- Multiple structures: Each revenue code must be explicitly assigned
- No revenue code can be assigned to multiple structures
- All available revenue codes must be assigned to exactly one structure

**Validation Requirements:**
- Complete coverage: All revenue codes assigned
- No overlap: Each code assigned to only one structure
- No orphans: No unassigned revenue codes when multiple structures exist

**Code Validation Status:**
✅ **VALIDATED** - Revenue code assignment logic confirmed in [`RevenueShare.tsx`](Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/RevenueShare/RevenueShare.tsx:225-234)

### 2. Revenue Accumulation Rules

#### 2.1 Accumulation Type Selection

**Rule ID:** BR-RA-001  
**Category:** Processing  
**Priority:** High  
**Status:** Active  

**Business Rule:**
Revenue accumulation type determines the period over which revenue is calculated for threshold evaluation and applies uniformly to all threshold structures within a contract.

**Accumulation Options:**
1. **Monthly:** Revenue calculated monthly, thresholds reset each month
2. **Annually (Calendar):** Revenue calculated January-December, thresholds reset annually
3. **Annually (Anniversary):** Revenue calculated from contract start date, thresholds reset on anniversary

**Implementation Requirements:**
- Default accumulation type: Monthly
- All threshold structures within a contract use the same accumulation type
- Accumulation type cannot be changed mid-period without recalculation
- Historical data must be recalculated if accumulation type changes

**Business Impact:**
- Monthly: More frequent threshold resets, potentially higher revenue share
- Annual: Larger accumulation periods, threshold achievement more likely
- Anniversary: Aligns with contract terms and renewal cycles

### 3. Invoice Generation Rules

#### 3.1 Revenue Code Visibility

**Rule ID:** BR-IG-001  
**Category:** Display  
**Priority:** Medium  
**Status:** Under Review  

**Business Rule:**
Revenue codes used in revenue share calculations are currently not visible on generated invoices, creating validation challenges for testing and auditing.

**Current State:**
- Revenue codes are stored and processed internally
- Invoice displays revenue amounts but not associated codes
- Testing requires database access to validate code assignments
- Auditing revenue code accuracy is manual and time-intensive

**Proposed Solutions (Pending Decision):**
1. **API Enhancement:** Surface revenue codes in invoice UI through API
2. **Regression Testing:** Use consistent invoice generation for validation
3. **Database Access:** Provide testing team with database query capabilities

**Decision Required:**
Business stakeholders must determine the appropriate balance between:
- Invoice simplicity vs. transparency
- Development effort vs. testing efficiency
- User experience vs. audit requirements

**Code Validation Status:**
✅ **VALIDATED** - Revenue code storage confirmed but UI visibility limited in [`RevenueShare.tsx`](Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/RevenueShare/RevenueShare.tsx:561-574)

#### 3.2 Error Handling in Invoice Generation

**Rule ID:** BR-IG-002  
**Category:** Processing  
**Priority:** High  
**Status:** Active  

**Business Rule:**
Invoice generation must handle timing issues and data validation errors gracefully, with appropriate retry mechanisms and user notifications.

**Error Handling Requirements:**
- Validate all input data before processing calculations
- Implement retry logic for timing-related failures
- Provide clear error messages for user-correctable issues
- Log all errors for technical analysis and resolution

**Specific Error Scenarios:**
1. **Divide by Zero:** Validate revenue amounts before calculations
2. **Missing Data:** Check for required fields before processing
3. **Timing Issues:** Implement retry mechanisms for race conditions
4. **Display Formatting:** Ensure proper number formatting and precision

### 4. Validation and Quality Assurance Rules

#### 4.1 Validation Threshold Configuration

**Rule ID:** BR-VQ-001  
**Category:** Validation  
**Priority:** Medium  
**Status:** Active  

**Business Rule:**
Validation thresholds provide additional quality assurance mechanisms for revenue share calculations and can be configured based on different validation types.

**Validation Types:**
1. **Revenue Percentage:** Validate against percentage of total revenue
2. **Validation Amount:** Validate against fixed dollar amount
3. **Vehicle Count:** Validate against monthly vehicle count metrics

**Configuration Requirements:**
- Validation thresholds are optional but recommended for high-value contracts
- Only one validation type can be active per contract
- Validation amounts must be positive values
- Vehicle count validation requires integration with operational data

**Implementation Logic:**
```
If validation threshold is enabled:
  Calculate validation metric based on type
  Compare against configured threshold
  Flag discrepancies for review
  Generate alerts for significant variances
```

**Code Validation Status:**
✅ **VALIDATED** - Validation threshold configuration confirmed in [`RevenueShare.tsx`](Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/RevenueShare/RevenueShare.tsx:614-744)

### 5. Data Processing Rules

#### 5.1 Invalid Date Handling

**Rule ID:** BR-DP-001  
**Category:** Data Quality  
**Priority:** High  
**Status:** Active  

**Business Rule:**
Input data containing invalid dates must be rejected at the processing level to prevent data corruption and calculation errors.

**Validation Requirements:**
- Reject rows with invalid calendar dates (e.g., April 31st)
- Reject rows with blank or null date fields
- Log all rejected records for audit purposes
- Provide feedback to users about rejected data

**Processing Logic:**
```
For each input row:
  Validate date field format
  Verify date exists in calendar
  If invalid:
    Log rejection reason
    Skip row processing
    Continue with next row
  If valid:
    Process row normally
```

**Default Date Handling:**
- System must not assign default dates (December 30, 1899) for invalid inputs
- Existing records with default dates must be identified and cleaned
- Future processing must reject rather than default invalid dates

### 6. System Integration Rules

#### 6.1 Invoice Group Assignment

**Rule ID:** BR-SI-001  
**Category:** Integration  
**Priority:** Medium  
**Status:** Active  

**Business Rule:**
Revenue share configurations must be properly associated with invoice groups when invoice grouping is enabled, ensuring correct billing organization.

**Assignment Requirements:**
- Revenue share configurations inherit invoice group from contract settings
- Invoice group assignment is required when invoice grouping is enabled
- Changes to invoice groups must update all associated revenue share structures
- Invoice group numbers must correspond to valid, active invoice groups

**Integration Points:**
- Contract management system for invoice group definitions
- Billing system for invoice generation and grouping
- Revenue share calculations for proper assignment

## Business Decision Log

### Open Decisions

| Decision ID | Description | Priority | Decision Authority | Target Date |
|-------------|-------------|----------|-------------------|-------------|
| BD-001 | Revenue code visibility on invoices | Medium | Jonathan Aulson | TBD |
| BD-002 | Validation threshold implementation priority | Low | Finance Team | TBD |

### Resolved Decisions

| Decision ID | Description | Resolution | Date | Authority |
|-------------|-------------|------------|------|-----------|
| BD-003 | Monitoring implementation approach | Start with small POC | 2025-06-13 | Cesar Figueroa |
| BD-004 | Invalid date handling strategy | Reject at Logic App level | 2025-06-18 | Development Team |

## Compliance and Audit Requirements

### Revenue Share Accuracy
- All revenue share calculations must be auditable
- Revenue code assignments must be traceable
- Threshold structure changes must be logged with timestamps
- Validation threshold alerts must be investigated and documented

### Data Quality Standards
- Input data must pass validation before processing
- Invalid data rejection must be logged and reported
- Data correction processes must maintain audit trails
- Regular data quality reports must be generated

### System Integration Integrity
- Invoice group assignments must be validated
- Cross-system data consistency must be maintained
- Integration failures must trigger appropriate alerts
- Recovery procedures must be documented and tested

## Cross-References

### Related Documentation
- [Technical Issues Resolution Guide](20250723_DailyScrum_TechnicalIssues_ResolutionGuide.md)
- [System Administration Procedures](20250723_SystemAdministration_Operations_Procedures.md)

### Code References
- [`RevenueShare.tsx`](Towne-Park-Billing-Source-Code/Towne Park Billing/src/components/RevenueShare/RevenueShare.tsx) - Revenue share configuration UI
- Power Automate Flows - Invoice generation and revenue calculations
- Logic Apps - Data validation and processing

### Integration Points
- **Contract Management:** Revenue share configuration and invoice groups
- **Billing System:** Invoice generation and revenue calculations
- **Data Processing:** Input validation and error handling
- **Monitoring System:** Validation alerts and quality assurance

## Glossary

| Term | Definition |
|------|------------|
| **Revenue Share** | Percentage of revenue paid to Towne Park based on contract terms |
| **Threshold Structure** | Configuration defining different share percentages at revenue levels |
| **Revenue Code** | Identifier categorizing different types of revenue for billing |
| **Accumulation Type** | Period over which revenue is calculated for threshold evaluation |
| **Validation Threshold** | Quality assurance mechanism for revenue share calculations |
| **Invoice Group** | Organizational structure for grouping related billing items |

---

**Document History:**
- v1.0 (2025-07-23): Initial creation from daily scrum meeting analysis
- Source: Daily Scrum meetings June 12-18, 2025
- Contributors: Jonathan Aulson, Gayasuddin Gayasi, Development Team