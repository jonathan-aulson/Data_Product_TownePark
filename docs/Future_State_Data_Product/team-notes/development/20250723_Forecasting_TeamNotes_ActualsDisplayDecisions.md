---
title: "Towne Park Forecasting - Actuals Display Development Team Notes"
description: "Team notes documenting key decisions, discussions, and coordination activities from backlog grooming session focused on actuals display methodology across forecasting tabs"
created_date: 2025-07-23
last_updated_date: 2025-07-23
source_date: 2025-06-23
version: 1.0
status: Approved
owner: "Adam Suarez"
source_documents:
  - "20250623_Forecasting_BacklogGrooming_Processed.md"
systems:
  - Forecasting
components:
  - Frontend
  - Backend
  - Database
business_domains:
  - Forecasting
  - Statistics
  - Parking Rates
  - Other Expenses
  - Payroll Expense
user_roles:
  - Product Owner
  - Business Analyst
  - Development Team
tags:
  - team-notes
  - forecasting
  - actuals-display
  - backlog-grooming
  - development-decisions
---

# Towne Park Forecasting - Actuals Display Development Team Notes

## Meeting Overview

**Meeting Type**: Backlog Grooming Session
**Date**: 2025-06-23
**Duration**: 42 minutes 25 seconds
**Primary Focus**: Actuals display methodology across forecasting tabs

### Attendees
- **Adam Suarez** - Product Owner (Present)
- **Jonathan Aulson** - Business Analyst (Present)
- **Amy Sowells** - (Absent - extreme heat conditions)
- **Mike Foy** - (Absent - extreme heat conditions)

### Environmental Context
Meeting conducted during extreme heat wave (over 100°F), which impacted attendance and potentially team productivity. Adam noted significant heat conditions and planned indoor activities for the week.

## Key Decisions Made

### Decision D021: Rates Tab Actuals Display
**Decision**: Rates tab will show actuals in a second row below forecast/budget values
**Rationale**: Enables easy comparison while preserving visibility of original forecast values
**Implementation**: Addition method with blue for forecast, black for actuals
**Decision Authority**: Adam Suarez (Product Owner)
**Status**: Approved
**Impact**: Affects UI design and data presentation logic for rates functionality

### Decision D022: Other Expenses Current Month Split
**Decision**: Other expenses will show split display for current month only
**Rationale**: Focuses attention on current performance while reducing visual complexity for historical data
**Implementation**: Second row display for current month, forecast-only for historical months
**Decision Authority**: Adam Suarez (Product Owner)
**Status**: Approved
**Impact**: Requires conditional display logic based on data period

### Decision D023: Statistics Replacement Method
**Decision**: Statistics tab will replace forecast values with actuals when available
**Rationale**: Volume metrics are more meaningful as actual values, provides cleaner display
**Implementation**: Replacement method with black for actuals, blue for forecast fallback
**Decision Authority**: Adam Suarez (Product Owner)
**Status**: Approved
**Impact**: Simplifies statistics display while maintaining data integrity

## Technical Discussion Points

### Display Methodology Clarification
Initial confusion was quickly resolved regarding display approaches:
- **Jonathan**: "We want to show actuals, kind of replacing the values... Oh no. Actually, I take that back. I think on one of the tabs. Actually I think we said we did want it in addition."
- **Adam**: "I think other expense was in addition, statistics was over, right?"
- **Jonathan**: "Yeah. OK. Let me make sure I've got that."
- **Adam**: "And I think rates rates was in addition as well."

This exchange demonstrates the iterative nature of design decisions and the importance of clear documentation.

### Color Coding Standards
Team established consistent color coding approach:
- **Blue**: Forecast/budget data across all tabs
- **Black**: Actuals data across all tabs
- **Consistency**: Applied uniformly to reduce user confusion

## Issues Identified

### Issue I013: HRIS Data Quality Challenges
**Description**: Employee role transition tracking problems in HRIS/Workday integration
**Details**: 
- Difficulty determining when employees exit roles
- Data shows entry but not exit from positions
- Multiple cost center assignments with blank fields
- Terminated employees appearing in security tables but not in reports

**Jonathan's Analysis**: "We just didn't have a way to, like, reliably understand when. When an employee was was not in a role like we can see when they kind of entered a role, but then it it they never left is kind of what the data made it appear."

**Impact**: Affects payroll forecasting accuracy and employee cost allocation
**Owner**: HRIS Team
**Status**: Open - requires investigation

### Data Inconsistency Concerns
**Specific Issue**: Employees with multiple cost centers showing blank fields
**Jonathan**: "Right where an employee has more than one cost center, he's we've got these blanks so. I get. You know, I'm assuming we just are meant to take this data. For this row."
**Adam**: "Yeah, I think that's the case."

**Resolution Approach**: Use available data row while documenting data quality concerns

## Project Risk Assessment

### Risk R006: Meeting Frequency Concerns
**Description**: Current meeting frequency may be insufficient for project completion
**Adam's Concern**: "So MM boy and I have like a one-on-one and I guess we were just talking about the project in general. I guess any, is there anything you guys are like? Concerned about? Maybe not as like a risk, but something that we think like there's a potential that we would need to meet on more frequently to finish."

**Risk Factors**:
- Timeline pressure for completion
- Stakeholder availability challenges
- Need for increased collaboration frequency
- Guy (stakeholder) scheduling difficulties due to travel and acquisition activities

**Mitigation**: Monitor progress closely and adjust meeting frequency as needed

## Steering Committee Preparation

### Demo Planning
**Jonathan's Plan**: "I guess just to touch on it, we've got that steering committee meeting tomorrow. And I plan to give a demo. I'm gonna demo from the UAT site and just kind of go through these tabs and the P&L and just kinda speak to where everything is at in terms of development."

**Demo Scope**:
- UAT site demonstration
- Review of all forecasting tabs
- P&L functionality overview
- Development status update

**Preparation Status**: Jonathan prepared to lead demonstration with current development state

## Integration Considerations

### HRIS/Workday Integration
**Purpose**: Employee data validation and role tracking
**Challenges**: 
- Role transition tracking gaps
- Terminated employee data inconsistencies
- Cost center assignment clarity

**Action Items**:
- Investigate data quality issues with HRIS team
- Establish clear data validation procedures
- Document workarounds for known data limitations

### EDW Integration
**Purpose**: Actuals data source for all forecasting tabs
**Requirements**:
- Timely data refresh for current month actuals
- Data quality validation procedures
- Clear indication when actuals data is unavailable

### Legion Integration
**Purpose**: Scheduled hours data for payroll tab
**Considerations**:
- Integration with payroll cost calculations
- Validation of scheduled vs. actual hours
- Alignment with HRIS employee data

## Development Coordination

### UI Implementation Requirements
Based on decisions made, development team needs to implement:
1. **Conditional Display Logic**: Different display methods per tab
2. **Color Coding Standards**: Consistent visual indicators across tabs
3. **Data Source Integration**: Multiple data sources with fallback logic
4. **Performance Optimization**: Efficient rendering of dual-row displays

### Testing Considerations
- **User Acceptance Testing**: Validate display decisions with end users
- **Data Quality Testing**: Ensure graceful handling of missing or inconsistent data
- **Performance Testing**: Verify system performance with additional display complexity
- **Cross-Browser Testing**: Ensure consistent display across different browsers

## Action Items and Follow-ups

### Immediate Actions
1. **Document Display Decisions**: Formalize UI specifications based on meeting decisions
2. **HRIS Data Investigation**: Escalate data quality issues to appropriate teams
3. **Steering Committee Demo**: Prepare comprehensive demonstration for stakeholders
4. **Development Planning**: Update sprint planning to reflect display methodology decisions

### Medium-term Actions
1. **User Training Preparation**: Develop training materials for new display conventions
2. **Data Quality Monitoring**: Establish ongoing monitoring for HRIS data issues
3. **Performance Monitoring**: Track system performance impact of display changes
4. **Stakeholder Feedback Collection**: Gather feedback on display decisions post-implementation

## Lessons Learned

### Decision-Making Process
- Iterative discussion helps clarify complex UI decisions
- Visual examples and mockups would enhance decision-making efficiency
- Clear documentation prevents confusion about previous decisions

### Team Coordination
- Weather and environmental factors can impact team availability
- Remote meeting capabilities essential for business continuity
- Regular check-ins help identify project risks early

### Technical Considerations
- Data quality issues can significantly impact feature development
- Integration complexity requires careful planning and testing
- User experience consistency across tabs is critical for adoption

## Related Meetings and Documentation

### Previous Meetings
- Referenced previous week's discussion on actuals display methodology
- Built upon earlier decisions about variance display approaches

### Future Meetings
- Steering committee demonstration scheduled for following day
- Ongoing backlog grooming sessions planned
- Potential increase in meeting frequency based on project needs

### Documentation References
- [Forecasting Actuals Display Business Rules](../../business-rules/forecasting/20250723_Forecasting_ActualsDisplay_BusinessRules.md)
- [Forecasting Actuals Display User Process](../../user-processes/account-manager/20250723_Forecasting_ActualsDisplay_UserProcess.md)
- [Forecasting System Overview](../../systems/forecasting/overview.md)

## Communication and Stakeholder Management

### Internal Communication
- Clear documentation of decisions for development team
- Regular updates to stakeholders on progress and challenges
- Proactive identification and escalation of risks

### External Communication
- Steering committee demonstration preparation
- User community preparation for display changes
- Training and change management planning

## Quality Assurance

### Decision Validation
- Decisions documented with clear rationale
- Implementation approach specified for development team
- User impact considered and addressed

### Risk Management
- Project risks identified and documented
- Mitigation strategies discussed
- Escalation paths established for unresolved issues

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-23 | Documentation Team | Initial transformation from meeting transcript 20250623_Forecasting_BacklogGrooming_Processed.md |

## Appendix: Meeting Transcript Key Quotes

### Decision Clarification Process
> "So I thought I wanted to. Kind of go back through some of these stuff we we talked about last week related to. Showing actuals and how we're gonna show variance. I just wanted to kind of recap everything." - Jonathan Aulson

### HRIS Data Quality Concerns
> "Yeah, that's that's like the. That was the piece that led us here from the last review. We were trying to work with was we just didn't have a way to, like, reliably understand when. When an employee was was not in a role like we can see when they kind of entered a role, but then it it they never left is kind of what the data made it appear." - Jonathan Aulson

### Project Risk Assessment
> "So MM boy and I have like a one-on-one and I guess we were just talking about the project in general. I guess any, is there anything you guys are like? Concerned about? Maybe not as like a risk, but something that we think like there's a potential that we would need to meet on more frequently to finish." - Adam Suarez