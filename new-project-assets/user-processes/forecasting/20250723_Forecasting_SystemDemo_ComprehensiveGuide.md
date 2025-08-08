---
title: "Forecasting System Demo Comprehensive Guide"
date: "2025-07-23"
version: "1.0"
status: "Active"
author: "Towne Park Training Team"
reviewer: "Jonathan Aulson"
tags: ["demo-guide", "forecasting", "training", "system-walkthrough", "account-manager", "workflow"]
related_docs: 
  - "20250723_Forecasting_JobGroups_TechnicalSpec.md"
  - "20250723_DistrictManager_ForecastingWorkflow_UserGuide.md"
systems: ["Forecasting", "Statistics", "Rates", "Payroll", "P&L"]
stakeholders: ["Account Managers", "District Managers", "Training Team", "Business Analyst"]
demo_authority: "Jonathan Aulson"
effective_date: "2025-06-23"
---

# Forecasting System Demo Comprehensive Guide

## Document Overview

This guide provides a comprehensive walkthrough of the Towne Park Forecasting system from an end-user perspective. Based on a practice demo session conducted on June 23, 2025, this document serves as both a training resource and system demonstration script for showcasing the complete forecasting workflow to stakeholders and new users.

## Executive Summary

The forecasting system demo covers the complete workflow from initial site selection through final P&L analysis. Key demonstration areas include role-based access control, three-month forecast configuration, statistics entry, parking rates management, payroll forecasting with job groups, other expenses, and integrated P&L views. The demo emphasizes practical usage scenarios and real-world account manager workflows.

## Demo Preparation and Setup

### 1. Demo Environment Configuration

#### 1.1 Sample Site Selection

**Demo Site:** Site 0349 - Hilton Walt Disney World  
**Account Manager:** Andre Johnson  
**District Manager:** Peter Quinnen  
**Demo Duration:** Approximately 60 minutes  

**Site Selection Rationale:**
- Representative of typical hotel/hospitality operations
- Complete data set available for demonstration
- Familiar location for stakeholder recognition
- Demonstrates both valet and self-parking scenarios

#### 1.2 User Role Demonstration

**Access Control Demo Script:**
> "All right, so I am going to demo a forecast for site 0349. That's the Hilton Walt Disney World. Account manager for this site is Andre Johnson and the district manager is Peter Quinnen. So if I log in as Andre or Peter, this is the only site or if I'm Peter, only sites I'm going to see in this drop down are my district sites."

**Key Points to Emphasize:**
- Role-based site visibility
- Data security and access control
- Clean separation between user types
- Intuitive site selection process

### 2. System Navigation Overview

#### 2.1 Three-Month Forecast Framework

**Demo Script:**
> "I then need to pick a starting month. So the system is built to support a three month forecast and the basis for that forecast starts here by choosing your starting month."

**Framework Features:**
- Rolling three-month forecast capability
- Starting month selection drives entire forecast
- Consistent time period across all tabs
- Flexible time view options (Daily, Weekly, Monthly)

**Demonstration Flow:**
1. Show starting month selection
2. Explain three-month rolling concept
3. Navigate between time views
4. Demonstrate consistency across tabs

## Tab-by-Tab Demo Guide

### 3. Statistics Tab Demonstration

#### 3.1 Occupancy Input Methods

**Demo Features:**
- Percentage-based occupancy input (default)
- Occupied rooms count alternative
- Toggle between input methods
- Automatic calculation conversions

**Demo Script Points:**
- Show percentage input method
- Demonstrate toggle to occupied rooms
- Explain calculation relationship
- Highlight user preference flexibility

#### 3.2 Budget vs Forecast Data Concept

**Critical Concept Explanation:**
> "Our system will serve up the budgeted values for all of these statistics, but it's not actually a forecast until I until I come into one of these cells and I make a change and so once I I've changed a value. And save this forecast. Until I take that action, there's no actual forecast data."

**Demo Sequence:**
1. Show initial budget data display
2. Make a cell edit to demonstrate change
3. Explain forecast creation process
4. Save forecast to show transition
5. Demonstrate data source distinction

**Key Teaching Points:**
- Budget data serves as initialization
- Forecast creation requires user action
- Clear distinction between data sources
- Save action triggers forecast creation

#### 3.3 Guide Feature Behavior

**Feature Demonstration:**
- Guide opens by default on first visit
- State persists per tab independently
- User control over visibility
- Consistent help availability

**Demo Script:**
> "So now in the rates tab you can see again the guide is open for us here because I've not yet closed it on this tab... it'll stay open, but once they hide it. When they come back to the screen, it's going to stay hidden."

### 4. Rates Tab Demonstration

#### 4.1 Monthly Rate Averages

**Concept Explanation:**
> "Correct, yeah... It's meant to be an average because they can change and as you can see the actualized are often, you know there there's some variability in there."

**Demo Elements:**
- Monthly average rate entry
- Actualized rate comparison display
- Rate variation accommodation
- Color coding for actual vs forecast

**Teaching Points:**
- Rates represent monthly averages
- Daily variations are expected
- Actual rates provide comparison context
- System accommodates rate flexibility

#### 4.2 Future Enhancement Preview

**Backlog Features to Mention:**
- Rate propagation across months
- Usability improvements for rate entry
- Time-saving features for account managers
- Enhanced rate management tools

### 5. Payroll Tab Innovation

#### 5.1 Job Groups Concept Introduction

**Demo Script:**
> "So job groups is. Kind of a new concept at Town Park. This is in line with our mission to make forecasting simpler and more straightforward for Account Manager. What we've done is take all of the job codes that exist at a site and map them to kind of groups that make sense."

**Job Groups to Demonstrate:**
- GSA (Guest Service Associate)
- GSC (Guest Service Cashier)
- Bell
- Cashier
- Valet
- Other standard groupings

**Key Benefits to Highlight:**
- Simplified forecasting process
- Logical grouping of similar roles
- Reduced complexity for account managers
- Maintained accuracy with aggregation

#### 5.2 Legion Integration Display

**Split View Demonstration:**
> "Moving on to the payroll tab, this tab looks a little different than the others, so you'll see here two kind of side by side views. On the left we have a visual that brings in the scheduled and actual data. From Legion and on the right is where we can see our forecasted and budgeted data."

**Demo Flow:**
1. Show split view layout
2. Explain Legion data on left
3. Demonstrate forecast entry on right
4. Highlight comparison capability
5. Show data integration benefits

### 6. Other Expenses Tab

#### 6.1 Expense Entry Conventions

**Important Clarification:**
Address positive value convention and billable expense concept without creating confusion about credits/debits.

**Demo Points:**
- Positive value entry convention
- Billable expense pass-through concept
- Internal revenue implications
- Clear expense categorization

### 7. P&L View Integration

#### 7.1 Variance Display Evolution

**Current vs Future Approach:**
> "Yeah, and it will be. So on the forecast screens we had. This is one of those evolution things. We started by planning for multiple comparison sets of data... We're changing that approach. I think this is maybe a little too abstract. So we're our plan is to have a show variance button like like on the PNL. And then have 3 radio buttons that we would toggle between showing forecast, showing budget and showing prior year."

**Demo Elements:**
- Current variance display
- Planned enhancement approach
- Three comparison options (Forecast, Budget, Prior Year)
- Simplified user interface

#### 7.2 Conditional Formatting

**Variance Threshold Demonstration:**
> "And there's a little bit of conditional formatting in here. You might be able to tell anything over 7 1/2% difference is in bold. So here's an example of a 2 1/2% increase in regular font. Next to it, a 9 1/2% increase in bold."

**Formatting Rules:**
- 7.5% threshold for bold formatting
- Applies to positive and negative variances
- Draws attention to significant differences
- Enhances quick variance identification

## District Manager Workflow Demo

### 8. Multi-Site Management

#### 8.1 Aggregate View Demonstration

**Demo Script:**
> "From here the the the next like workflow to talk about is probably that of a district manager or above. And so that's where these filters kind of come into play as a district manager... Peter Quinnen is going to filter down to see just his district and apply that. And then from this view, we're going to see an aggregate of all of the forecasts for all of his district."

**Features to Demonstrate:**
- District filtering capability
- Aggregate forecast views
- Budget and trend comparison
- District-level variance analysis

#### 8.2 District-Level Editing Workflow

**Editing Approach:**
- Filter-based site selection
- Maintain site-level granularity
- Flexible editing capabilities
- Workflow refinement ongoing

## Demo Best Practices

### 9. Presentation Techniques

#### 9.1 Audience Engagement

**Engagement Strategies:**
- Ask clarifying questions throughout demo
- Encourage questions and discussion
- Relate features to real-world scenarios
- Highlight user benefits and time savings

**Example Interaction:**
- Pause for questions after each major section
- Ask audience about their current processes
- Relate new features to existing pain points
- Demonstrate clear before/after scenarios

#### 9.2 Technical Issue Handling

**Common Issues and Responses:**
- Mock data acknowledgment
- Feature development status
- Enhancement timeline communication
- Feedback collection and documentation

**Issue Communication Script:**
> "Now right now what we're looking at is is still mock data. This is still under construction, but what you'll see in production is our groups like GSA."

### 10. Demo Customization Guidelines

#### 10.1 Audience-Specific Adaptations

**For Account Managers:**
- Focus on daily workflow efficiency
- Emphasize time-saving features
- Demonstrate practical data entry scenarios
- Highlight integration with existing tools

**For District Managers:**
- Emphasize aggregate views and filtering
- Show district-level analysis capabilities
- Demonstrate oversight and management features
- Highlight reporting and variance analysis

**For Executive Stakeholders:**
- Focus on business value and ROI
- Demonstrate strategic planning capabilities
- Show integration with existing systems
- Highlight accuracy and efficiency improvements

#### 10.2 Demo Duration Management

**60-Minute Full Demo:**
- 10 minutes: Introduction and setup
- 15 minutes: Statistics and rates tabs
- 15 minutes: Payroll and job groups
- 10 minutes: Other expenses and P&L
- 10 minutes: District manager workflow

**30-Minute Executive Demo:**
- 5 minutes: System overview
- 10 minutes: Key feature highlights
- 10 minutes: Business value demonstration
- 5 minutes: Questions and next steps

## Training and Support Materials

### 11. Supporting Documentation

#### 11.1 Demo Preparation Checklist

**Pre-Demo Setup:**
- [ ] Verify demo environment access
- [ ] Confirm sample data availability
- [ ] Test all major features and workflows
- [ ] Prepare backup scenarios for technical issues
- [ ] Review audience background and needs

**Demo Materials:**
- [ ] Presentation slides for context
- [ ] Handout materials for key concepts
- [ ] Contact information for follow-up
- [ ] Feedback collection forms
- [ ] Next steps documentation

#### 11.2 Post-Demo Follow-up

**Immediate Actions:**
- Collect feedback and questions
- Document any issues encountered
- Schedule follow-up sessions if needed
- Provide additional resources and documentation

**Long-term Support:**
- Training session scheduling
- User onboarding planning
- Ongoing support resource identification
- Feedback integration into development process

## Cross-References

### Related Documentation
- [Forecasting Job Groups Technical Specification](../../technical/forecasting/20250723_Forecasting_JobGroups_TechnicalSpec.md)
- [District Manager Forecasting Workflow User Guide](../district-manager/20250723_DistrictManager_ForecastingWorkflow_UserGuide.md)

### Integration Points
- **Legion System:** Payroll data integration and display
- **EDW:** Actual rates and historical data
- **Budget System:** Initial data population and comparison
- **P&L System:** Integrated financial view and variance analysis

## Glossary

| Term | Definition |
|------|------------|
| **Three-Month Forecast** | Rolling 90-day forecast period with monthly granularity |
| **Job Groups** | Simplified groupings of job codes for easier payroll forecasting |
| **Guide Feature** | Context-sensitive help that persists per tab |
| **Variance Threshold** | 7.5% difference threshold for bold formatting in P&L view |
| **Split View** | Dual-panel layout showing Legion data alongside forecast entry |
| **District Filtering** | Capability to view and manage forecasts at district level |

---

**Document History:**
- v1.0 (2025-07-23): Initial creation from demo practice session
- Source: Demo Practice session June 23, 2025
- Contributors: Jonathan Aulson, Johnn Hesseltine, Training Team