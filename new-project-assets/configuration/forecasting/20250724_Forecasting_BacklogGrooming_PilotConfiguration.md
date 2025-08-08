---
title: "Towne Park Forecasting - Pilot Site Configuration and Job Profile Mapping"
description: "Backlog grooming session documenting pilot site job profile mapping, forecasting system configuration, and project prioritization decisions"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-24
version: 1.0
status: Draft
owner: "Amy Sowells"
source_documents:
  - "20250724_Backlog Grooming_ Forecasting.docx"
systems:
  - Forecasting
  - Job Profile Management
  - Pilot Site Configuration
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
  - pilot-configuration
  - job-profile-mapping
  - budget-integration
  - forecasting-setup
  - backlog-grooming
---

# Towne Park Forecasting - Pilot Site Configuration and Job Profile Mapping

## Meeting Overview

**Date**: July 24, 2025  
**Duration**: 43 minutes 53 seconds  
**Meeting Type**: Backlog Grooming - Forecasting  
**Participants**: Jonathan Aulson, Amy Sowells, Cesar Figueroa, Michael Foy

## Job Profile Mapping Completion

### Pilot Sites Configured

Amy Sowells completed job profile to job code mapping for all pilot sites. The mapping spreadsheet contains tabs for each pilot site with the following structure:

- **Column A**: Budget position names from budget database
- **Column B**: Corresponding job code mappings for active positions

### Mapping Examples and Scenarios

#### Straightforward Mappings
**Site Examples**: Most pilot sites had clear 1:1 mappings between budget positions and active job codes.

**Typical Pattern**:
- Budget Position: "Screener" → Job Code: "Screener"
- Budget Position: "GSA" → Job Code: "GSA"
- Budget Position: "Shuttle" → Job Code: "Shuttle 1"

#### Complex Mapping Scenarios

**1. New Site with No Budget Data**
- **Issue**: Newer locations lack budget data in database
- **Cause**: Proforma data not loaded into budget database
- **Resolution**: Coordinate with Adam for proforma data loading process
- **Testing Value**: Good test case for new site forecast process

**2. Zero Budget Hours with Job Code Present**
- **Scenario**: Job codes appear in query but have zero budgeted hours
- **Example**: GSA positions listed but no GSA hours budgeted
- **Resolution**: Display zero budget, allow actual hours to show
- **Logic**: If no budget exists, show zero as budget baseline

**3. Multiple Job Codes to Single Budget Position**
- **Example**: "Shuttle" budget maps to both "Shuttle 1" and "Shuttle 2" job codes
- **Resolution**: Split budget hours based on active employee count weighting
- **Implementation**: More employees in job code = larger portion of budget allocation

**4. Budget Positions Not Currently Worked**
- **Scenario**: Budget includes positions like "Traffic" but no active employees
- **Resolution**: Map to closest active job code to preserve budget allocation
- **Rationale**: Budget dollars must be allocated somewhere in system

**5. Active Job Codes with No Budget**
- **Scenario**: Employees working in job codes not included in budget
- **Resolution**: Show zero budget for these positions
- **Impact**: Highlights budget vs actual staffing discrepancies

### Specific Site Configurations

#### Site 0919 - Simple Configuration
- **Budget**: Only "Screener" position budgeted and worked
- **Mapping**: All GSA codes mapped to "Screener" to capture full budget
- **Note**: No GSA hours actually budgeted (zero hours confirmed)

#### Site 1129 - Multiple GSA Codes
- **Budget**: Single "GSA" budget line
- **Active Codes**: GSA, GSA-2, GSA-3, GSA-4
- **Mapping**: All GSA variants mapped to single "GSA" job code
- **Benefit**: All codes in same job group, budget distributes automatically

#### Site 2228 - Complex Mapping
- **Budget**: Team Leader position budgeted but not worked
- **Active**: Visitor Management Concierge positions
- **Resolution**: Map Team Leader budget to Lead Visitor Management position
- **Rationale**: Preserve budget allocation in active position

### Job Code Mapping Logic

#### Budget Allocation Rules
1. **Primary Rule**: Map budget to exact matching job code when possible
2. **Secondary Rule**: Map to closest equivalent active job code
3. **Tertiary Rule**: Distribute budget among multiple codes by employee count
4. **Fallback Rule**: Show zero budget if no reasonable mapping exists

#### Employee Count Weighting
- **Calculation**: Budget Hours ÷ Total Active Employees = Hours per Employee
- **Distribution**: Allocate to job codes based on relative employee counts
- **Example**: 5 Shuttle-2 employees + 1 Shuttle Supervisor = 5:1 ratio split

#### Job Group Considerations
- **Preferred**: Keep mapped codes within same job group
- **Flexibility**: System can handle cross-job-group mappings if needed
- **Implementation**: Direct job code assignment, not job group dependent

## Data Validation and Edge Cases

### Missing Budget Data Scenarios
- **New Sites**: Proforma data not in budget database
- **Timing Issues**: Budget data load timing misalignment
- **Resolution Process**: Coordinate with Adam for data loading

### Active vs Budget Mismatches
- **Common Issue**: Job codes active but not budgeted (or vice versa)
- **Business Impact**: Highlights operational vs planning discrepancies
- **System Response**: Display zero budget, show actual hours worked

### Data Quality Considerations
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

### Multi-Code Budget Splitting
```
total_budget_hours = budget_position_hours
total_active_employees = SUM(employees_per_job_code)

FOR each_job_code IN mapped_codes:
    allocated_hours = (employees_in_code / total_active_employees) × total_budget_hours
```

## Project Prioritization Decisions

### Immediate Priority (Sprint Focus)
1. **Forecasted Parking Rates Integration**
   - **Issue**: Parking rates changes don't affect parking stats external revenue
   - **Impact**: Loose end affecting revenue calculations
   - **Timeline**: Top priority for current sprint

2. **PNL UI Enhancements**
   - **Scope**: Red/green variance indicators, default variance view
   - **Status**: Requirements defined, ready for implementation
   - **Dependencies**: Parking rates integration completion

### Medium-Term Priority (Post-Sprint)
1. **12-Month Calculated Forecast**
   - **Rationale**: Risk-averse approach to ensure completion before go-live
   - **Timeline**: Start early to allow 3 sprints for completion
   - **Impact**: Major system re-engineering effort

2. **Summary Cards**
   - **Value**: High user value features
   - **Timeline**: After pilot, around go-live timeframe
   - **Trade-off**: Delayed to prioritize calculated forecast stability

### Lower Priority (Post-Go-Live)
1. **Prior Year Comparison**
   - **Workaround**: Users can change year filter to view previous year
   - **Status**: Acceptable temporary solution
   - **Timeline**: Cannot guarantee by go-live, depends on calculated forecast progress

## Risk Assessment and Mitigation

### Job Profile Mapping Scale Concern
- **Challenge**: Manual mapping process for all sites (not just pilot)
- **Scale**: Potentially hundreds of sites requiring individual attention
- **Resource Requirement**: Dedicated team for manual mapping work
- **Precedent**: Similar to Power Bill site buildout (100+ sites completed)

### Mitigation Strategies
1. **Team Approach**: Assemble dedicated mapping team
2. **Process Optimization**: Develop efficient mapping procedures
3. **Tool Development**: Investigate automation opportunities
4. **Timeline Management**: Start early, work systematically

### Adam Coordination Requirements
- **Meeting Scheduled**: Tuesday grooming session with Adam present
- **Discussion Topics**: 
  - Budget data loading process optimization
  - Alternative approaches to manual mapping
  - Resource allocation for mapping effort
- **Decision Point**: Determine best approach for full site rollout

## Variance Indicator Enhancement

### New Requirement: Exact Match Indicator
- **Context**: Other Expenses tab will show whole dollars
- **Opportunity**: Exact matches more likely with rounded values
- **Implementation**: Circle dot icon for zero variance
- **Consistency**: Apply to all tabs with variance indicators

### Icon Implementation Details
- **Primary Option**: ShadCN circle dot icon
- **Fallback Option**: Bold black dot if spacing issues occur
- **Application**: Parking Stats (retroactive), Other Expenses (new), future tabs

## Integration and Monitoring Considerations

### Great Plains Integration Risk
- **Concern**: Monitoring of Great Plains batch posting processes
- **Expert Opinion**: Dave Noel considers monitoring unnecessary
- **Decision**: Trust expert assessment, rely on existing safeguards
- **Scope**: Only affects Account Summary and Chart of Accounts tables

### Other Monitoring Requirements
- **ETL Processes**: Verify monitoring status (Legion ETL concerns noted)
- **Data Gateway Clustering**: Scheduled for completion
- **Azure Resources**: MSP-level monitoring for security changes

## Next Steps and Action Items

### Immediate Actions
1. **Job Profile Implementation**: Load pilot site mappings into system
2. **System Testing**: Validate budget display and allocation logic
3. **Edge Case Handling**: Test zero budget and multi-code scenarios

### Coordination Requirements
1. **Adam Meeting**: Discuss full-scale mapping approach
2. **Resource Planning**: Determine team requirements for site rollout
3. **Timeline Validation**: Confirm go-live readiness timeline

### Development Priorities
1. **Complete Sprint Work**: Focus on PNL enhancements and parking rates
2. **Calculated Forecast Preparation**: Begin early development work
3. **Monitoring Setup**: Address remaining infrastructure monitoring gaps

## Related Documentation

- [Job Profile Management](../../user-processes/site-admin/)
- [Budget Integration Specifications](../../technical/database/)
- [Forecasting System Configuration](../../configuration/forecasting/)
- [Pilot Site Management](../../user-processes/deployment/)

## Meeting Participants

- **Jonathan Aulson**: Product Owner
- **Amy Sowells**: Business Analyst / Site Configuration Lead
- **Cesar Figueroa**: Developer
- **Michael Foy**: Project Manager

## Configuration Data

### Pilot Sites Mapped
- Multiple sites configured with job profile to job code mappings
- Spreadsheet delivered with individual site tabs
- Ready for system implementation and testing

### Mapping Validation Required
- Confirm budget allocation logic accuracy
- Test multi-code scenarios
- Validate zero budget handling
- Verify job group interactions