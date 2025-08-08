---
title: "Towne Park Forecasting - Job Profile Mapping Business Rules and Implementation Strategy"
description: "Business rules and implementation strategy for mapping budget job profiles to actual job codes across forecasting sites, including AI-assisted mapping challenges and manual resolution approaches"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-23
version: 1.0
status: Draft
owner: "Amy Sowells"
source_documents:
  - "20250723_Backlog Grooming_ Forecasting.docx"
systems:
  - Forecasting
  - Budget Management
  - Job Profile Management
components:
  - Job Code Mapping
  - Budget Integration
  - Data Validation
business_domains:
  - Human Resources
  - Budget Management
  - Site Operations
user_roles:
  - Site Administrator
  - Account Manager
  - HR Manager
tags:
  - job-profile-mapping
  - budget-integration
  - forecasting-setup
  - business-rules
  - data-mapping
---

# Towne Park Forecasting - Job Profile Mapping Business Rules and Implementation Strategy

## Meeting Overview

**Date**: July 23, 2025  
**Duration**: 42 minutes  
**Meeting Type**: Backlog Grooming - Forecasting  
**Participants**: Jonathan Aulson, Amy Sowells, Chad Beamesderfer, Cesar Figueroa

## Business Problem Statement

### Core Challenge
The forecasting system requires accurate mapping between budget job profiles (stored in budget database) and actual job codes (used in Legion and site operations) to enable proper payroll forecasting and budget comparison functionality.

### Current State Issues
- **Inconsistent Naming**: Budget job profiles use generic names (e.g., "GSA") while actual job codes use site-specific variants (e.g., "GSA-1", "GSA-2", "Traffic", "Parking Concierge")
- **Site Variability**: Same job function may use different job codes across different sites
- **Data Volume**: Mapping required across hundreds of sites with thousands of job code combinations
- **Budget Accuracy**: Total budgeted hours (12.9M) vs mapped hours (15M+) indicating mapping errors

## AI-Assisted Mapping Analysis

### Attempted Automation Rules
Jonathan Aulson implemented AI-assisted mapping with the following rule set:

**1. GSA Variant Mapping**
- Rule: Any GSA variant maps to GSA job code
- Challenge: Multiple GSA codes (GSA-1 through GSA-18) with different purposes

**2. Job Code Specific Rules**
- GSC variants → GSC job code
- Cashier variants → Cashier job code (with Lead Cashier preference)
- Lead GSC → Lead GSC job code
- Bell variants → Bell job code
- Door-to-door shuttle → Shuttle 1, 2, or 3 (based on availability)
- Parking Concierge → Parking Concierge (fallback to Traffic)

### AI Mapping Results
- **Initial Accuracy**: Significant variance in total hours (15M mapped vs 12.9M budgeted)
- **Shift Differential Discovery**: Major contributor to hour discrepancy
- **Improvement After Exclusion**: Removing shift differentials reduced variance to 11.37M vs 11.05M
- **Remaining Gap**: ~300K hours difference indicates remaining mapping issues

## Shift Differential Business Rules

### Problem Identification
Shift differentials were creating duplicate hour counting in the mapping process.

### Business Logic
- **Shift Differential Nature**: Additional pay rate (e.g., $2.00) applied to base hours
- **Hour Duplication**: Same 8-hour shift counted as 8 base hours + 8 differential hours = 16 total hours
- **Budget Impact**: Shift differentials budgeted at incremental rate only, not full hour duplication

### Resolution Rule
**Exclude all shift differential job codes from mapping calculations** to prevent hour duplication and maintain accurate budget-to-actual comparisons.

## Manual Mapping Business Rules

### Pilot Site Strategy
Given AI mapping limitations, implement manual mapping approach:

**1. Pilot Site Priority**
- Focus initial effort on confirmed pilot sites
- Complete accurate mapping for pilot sites before general rollout
- Use pilot site learnings to optimize mapping for remaining sites

**2. Mapping Methodology**
- Site-by-site analysis of budget positions vs active job codes
- Account for employee count weighting in multi-code scenarios
- Preserve budget allocation integrity

### Complex Mapping Scenarios

**1. New Sites with No Budget Data**
- **Issue**: Newer locations lack budget data in database
- **Cause**: Proforma data not loaded into budget database
- **Resolution**: Coordinate with Adam for proforma data loading
- **Business Value**: Good test case for new site forecast process

**2. Zero Budget Hours with Active Job Codes**
- **Scenario**: Job codes appear in queries but have zero budgeted hours
- **Example**: GSA positions listed but no GSA hours budgeted
- **Business Rule**: Display zero budget, allow actual hours to show
- **Logic**: If no budget exists, show zero as budget baseline

**3. Multiple Job Codes to Single Budget Position**
- **Example**: "Shuttle" budget maps to "Shuttle 1" and "Shuttle 2" job codes
- **Resolution**: Split budget hours based on active employee count weighting
- **Calculation**: More employees in job code = larger portion of budget allocation

**4. Budget Positions Not Currently Worked**
- **Scenario**: Budget includes positions like "Traffic" but no active employees
- **Resolution**: Map to closest active job code to preserve budget allocation
- **Rationale**: Budget dollars must be allocated somewhere in system

**5. Active Job Codes with No Budget**
- **Scenario**: Employees working in job codes not included in budget
- **Resolution**: Show zero budget for these positions
- **Business Impact**: Highlights budget vs actual staffing discrepancies

## Site-Specific Mapping Examples

### Site 0919 - Simple Configuration
- **Budget**: Only "Screener" position budgeted and worked
- **Mapping**: All GSA codes mapped to "Screener" to capture full budget
- **Note**: No GSA hours actually budgeted (zero hours confirmed)

### Site 1129 - Multiple GSA Codes
- **Budget**: Single "GSA" budget line
- **Active Codes**: GSA, GSA-2, GSA-3, GSA-4
- **Mapping**: All GSA variants mapped to single "GSA" job code
- **Benefit**: All codes in same job group, budget distributes automatically

### Site 2228 - Complex Mapping
- **Budget**: Team Leader position budgeted but not worked
- **Active**: Visitor Management Concierge positions
- **Resolution**: Map Team Leader budget to Lead Visitor Management position
- **Rationale**: Preserve budget allocation in active position

## Budget Allocation Business Rules

### Primary Mapping Rules (Priority Order)
1. **Exact Match Rule**: Map budget to exact matching job code when possible
2. **Equivalent Match Rule**: Map to closest equivalent active job code
3. **Distribution Rule**: Distribute budget among multiple codes by employee count
4. **Zero Budget Rule**: Show zero budget if no reasonable mapping exists

### Employee Count Weighting Formula
```
Budget Hours ÷ Total Active Employees = Hours per Employee
Allocate to job codes based on relative employee counts

Example: 5 Shuttle-2 employees + 1 Shuttle Supervisor = 5:1 ratio split
```

### Job Group Considerations
- **Preferred**: Keep mapped codes within same job group
- **Flexibility**: System can handle cross-job-group mappings if needed
- **Implementation**: Direct job code assignment, not job group dependent

## Data Validation Business Rules

### Missing Budget Data Scenarios
- **New Sites**: Proforma data not in budget database
- **Timing Issues**: Budget data load timing misalignment
- **Resolution Process**: Coordinate with Adam for data loading

### Active vs Budget Mismatches
- **Common Issue**: Job codes active but not budgeted (or vice versa)
- **Business Impact**: Highlights operational vs planning discrepancies
- **System Response**: Display zero budget, show actual hours worked

### Data Quality Monitoring
- **Source Period**: Mapping based on June 2025 hours worked
- **Limitation**: New July positions may not be captured
- **Monitoring**: System should flag unmapped job codes for review

## System Configuration Requirements

### Budget Display Logic
```
IF budget_hours > 0 THEN
    display_budget = budget_hours
ELSE IF job_code_active = true THEN
    display_budget = 0
ELSE
    do_not_display_line
END IF
```

### Salaried Employee Handling
- **Current Logic**: 8 hours per day per active salaried employee
- **Budget Source**: Not from scheduled budget (expected behavior)
- **Rate Calculation**: Daily rate × 8 hours × active employees

### Multi-Code Budget Splitting Algorithm
```
total_budget_hours = budget_position_hours
total_active_employees = SUM(employees_per_job_code)

FOR each_job_code IN mapped_codes:
    allocated_hours = (employees_in_code / total_active_employees) × total_budget_hours
```

## Implementation Strategy

### Immediate Priority (Pilot Focus)
1. **Manual Pilot Site Mapping**
   - Complete accurate mapping for all confirmed pilot sites
   - Document mapping decisions and rationale
   - Test system functionality with accurate mappings

2. **Validation Process**
   - Compare total budgeted hours to mapped hours for accuracy
   - Identify and resolve remaining discrepancies
   - Document edge cases and resolution approaches

### Medium-Term Strategy (Full Rollout)
1. **Systematic Site Mapping**
   - Assemble dedicated mapping team
   - Develop efficient mapping procedures
   - Work systematically through all sites

2. **Process Optimization**
   - Investigate automation opportunities for common patterns
   - Develop tools to assist manual mapping process
   - Create validation checks for mapping accuracy

### Long-Term Strategy (System Enhancement)
1. **Automated Mapping Intelligence**
   - Develop machine learning approaches for pattern recognition
   - Create suggestion engine for mapping decisions
   - Implement confidence scoring for automated mappings

2. **Data Standardization**
   - Work with HR and operations to standardize job code naming
   - Implement consistent job code creation processes
   - Reduce mapping complexity through standardization

## Risk Assessment and Mitigation

### Scale Concern
- **Challenge**: Manual mapping process for hundreds of sites
- **Resource Requirement**: Dedicated team for manual mapping work
- **Precedent**: Similar to Power Bill site buildout (100+ sites completed successfully)

### Mitigation Strategies
1. **Team Approach**: Assemble dedicated mapping team with domain expertise
2. **Process Optimization**: Develop efficient mapping procedures and tools
3. **Timeline Management**: Start early, work systematically, allow adequate time
4. **Quality Assurance**: Implement validation checks and review processes

### Coordination Requirements
- **Adam Integration**: Schedule regular coordination sessions
- **Budget Data Loading**: Optimize budget data loading process
- **Resource Allocation**: Determine team requirements for full site rollout
- **Decision Authority**: Establish clear decision-making process for edge cases

## Success Metrics

### Accuracy Targets
- **Hour Variance**: <1% difference between budgeted and mapped hours
- **Site Coverage**: 100% of pilot sites accurately mapped
- **Data Quality**: Zero unmapped active job codes in pilot sites

### Process Efficiency
- **Mapping Time**: Target <2 hours per site for standard configurations
- **Review Cycle**: Weekly progress reviews and issue resolution
- **Escalation Path**: Clear process for complex mapping decisions

## Related Documentation

- [Job Profile Management](../../user-processes/site-admin/)
- [Budget Integration Specifications](../../technical/database/)
- [Forecasting System Configuration](../../configuration/forecasting/)
- [Pilot Site Management](../../user-processes/deployment/)

## Next Steps

### Immediate Actions
1. **Pilot Site List**: Confirm final pilot site list with Jeremy
2. **Mapping Spreadsheet**: Receive and process pilot site mapping data from Amy
3. **System Testing**: Validate budget display and allocation logic with pilot data

### Coordination Activities
1. **Adam Meeting**: Discuss full-scale mapping approach and resource requirements
2. **Resource Planning**: Determine team composition and timeline for full rollout
3. **Process Documentation**: Create detailed mapping procedures and guidelines

### Development Priorities
1. **Pilot Implementation**: Load pilot site mappings and test system functionality
2. **Edge Case Handling**: Implement business rules for complex mapping scenarios
3. **Validation Tools**: Develop tools to verify mapping accuracy and completeness