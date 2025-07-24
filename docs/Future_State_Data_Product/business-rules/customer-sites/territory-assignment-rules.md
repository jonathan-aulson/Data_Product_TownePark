---
title: "Territory Assignment Rules"
version: "1.0"
last_updated: "2025-07-24"
author: "Towne Park Data Product Team"
status: "Active"
type: "Business Rules"
tags: ["customer-sites", "territory", "assignment", "business-rules", "management"]
related_docs:
  - "contact-management-rules.md"
  - "../../technical/database/customer-sites-data-schema.md"
  - "../../user-processes/site-admin/site-onboarding-workflow.md"
  - "../../configuration/customer-sites/territory-configuration-guide.md"
---

# Territory Assignment Rules

## Overview

This document defines the comprehensive business rules for assigning customer sites to territories within the Towne Park Data Product platform. These rules ensure optimal territory management, balanced workload distribution, and effective customer service delivery while maintaining operational efficiency and revenue optimization.

## Core Assignment Principles

### Geographic Proximity Rules

#### Primary Geographic Assignment
- **Rule 1.1**: Customer sites must be assigned to the geographically closest territory based on driving distance
- **Rule 1.2**: Maximum driving time from territory center to any assigned site must not exceed 2 hours under normal traffic conditions
- **Rule 1.3**: Sites located within metropolitan areas must be assigned to the designated metro territory regardless of proximity to other territories
- **Rule 1.4**: Cross-state assignments require executive approval unless territories naturally span state boundaries

#### Geographic Boundary Definitions
- **Urban Territories**: Defined by city limits and immediate suburban areas
- **Regional Territories**: Cover multiple cities within a 150-mile radius
- **Metro Territories**: Encompass major metropolitan statistical areas (MSAs)
- **Rural Territories**: Cover areas not included in urban or metro territories

### Workload Balance Rules

#### Site Count Distribution
- **Rule 2.1**: No territory may exceed 150% of the average site count across all territories
- **Rule 2.2**: New site assignments must consider existing territory workload
- **Rule 2.3**: Territories with fewer than 50% of average site count are prioritized for new assignments
- **Rule 2.4**: Quarterly workload rebalancing reviews are mandatory

#### Revenue Balance Considerations
- **Rule 2.5**: Territory revenue distribution should not exceed 200% variance from the median
- **Rule 2.6**: High-value contracts (>$500K annually) require special consideration in territory assignment
- **Rule 2.7**: Revenue-based territory adjustments require 90-day advance notice to affected parties
- **Rule 2.8**: Contract type diversity should be maintained across territories when possible

### Manager Capacity Rules

#### Experience and Qualification Requirements
- **Rule 3.1**: Territory managers must have minimum 2 years experience for standard territories
- **Rule 3.2**: High-complexity territories require managers with 5+ years experience
- **Rule 3.3**: New managers may only be assigned territories with fewer than 25 sites initially
- **Rule 3.4**: Manager certification requirements must be met before territory assignment

#### Span of Control Limits
- **Rule 3.5**: Maximum 100 sites per territory manager under normal circumstances
- **Rule 3.6**: High-maintenance sites count as 1.5 sites for capacity calculations
- **Rule 3.7**: Complex contract sites (hybrid, management agreement) count as 2 sites for capacity
- **Rule 3.8**: Emergency assignments may temporarily exceed limits with executive approval

## Assignment Process Rules

### New Site Assignment Workflow

#### Initial Assessment Phase
1. **Geographic Analysis**: Determine optimal territory based on location
2. **Capacity Review**: Assess current territory manager workload
3. **Contract Complexity Evaluation**: Consider contract type and requirements
4. **Customer Preference Consideration**: Review any specific customer requests
5. **Revenue Impact Analysis**: Evaluate financial implications of assignment

#### Assignment Decision Matrix
```
Priority 1: Geographic proximity (40% weight)
Priority 2: Manager capacity (30% weight)
Priority 3: Workload balance (20% weight)
Priority 4: Customer preference (10% weight)
```

#### Approval Requirements
- **Standard Assignments**: Territory Director approval required
- **Cross-Territory Assignments**: Regional VP approval required
- **Exception Assignments**: Executive Committee approval required
- **Emergency Assignments**: 24-hour post-assignment notification required

### Reassignment Rules

#### Mandatory Reassignment Triggers
- **Rule 4.1**: Territory manager departure requires immediate reassignment planning
- **Rule 4.2**: Workload imbalance exceeding 200% triggers mandatory review
- **Rule 4.3**: Customer service issues may trigger reassignment consideration
- **Rule 4.4**: Geographic boundary changes require territory review

#### Reassignment Process Requirements
- **30-Day Notice**: Minimum notice period for non-emergency reassignments
- **Customer Notification**: All affected customers must be notified within 48 hours
- **Transition Planning**: Detailed handover plan required for all reassignments
- **Performance Monitoring**: 90-day post-reassignment performance review mandatory

### Special Assignment Categories

#### High-Value Account Rules
- **Rule 5.1**: Accounts >$1M annually require senior territory manager assignment
- **Rule 5.2**: Strategic accounts may be assigned regardless of geographic rules
- **Rule 5.3**: High-value accounts require dedicated relationship management protocols
- **Rule 5.4**: Cross-selling opportunities must be considered in high-value assignments

#### Complex Contract Assignments
- **Rule 5.5**: Hybrid contracts require managers with multi-contract experience
- **Rule 5.6**: Management agreement sites need managers with operational expertise
- **Rule 5.7**: Revenue share contracts require managers with financial analysis skills
- **Rule 5.8**: Per-labor-hour contracts need managers experienced in workforce management

## Territory Boundary Management

### Boundary Definition Rules

#### Geographic Boundaries
- **Natural Boundaries**: Rivers, mountain ranges, major highways serve as primary boundaries
- **Political Boundaries**: State and county lines are respected where practical
- **Market Boundaries**: Economic regions and trade areas influence territory design
- **Competitive Boundaries**: Competitor presence may influence territory structure

#### Boundary Modification Process
1. **Quarterly Review**: Regular assessment of boundary effectiveness
2. **Impact Analysis**: Evaluation of proposed changes on all stakeholders
3. **Stakeholder Consultation**: Input from affected managers and customers
4. **Executive Approval**: Senior leadership approval for boundary changes
5. **Implementation Planning**: Detailed transition plan for boundary modifications

### Territory Overlap Rules

#### Prohibited Overlaps
- **Rule 6.1**: No site may be assigned to multiple territories simultaneously
- **Rule 6.2**: Territory boundaries must have clear, unambiguous definitions
- **Rule 6.3**: Disputed assignments must be resolved within 48 hours
- **Rule 6.4**: Overlap resolution follows established escalation procedures

#### Temporary Overlap Allowances
- **Emergency Coverage**: Temporary overlap allowed for emergency situations
- **Transition Periods**: 30-day overlap permitted during territory transitions
- **Training Assignments**: New managers may shadow experienced managers across territories
- **Special Projects**: Cross-territory collaboration permitted for specific initiatives

## Performance and Compliance Rules

### Territory Performance Metrics

#### Key Performance Indicators
- **Customer Satisfaction**: Minimum 85% satisfaction rating required
- **Revenue Growth**: Annual growth targets established per territory
- **Operational Efficiency**: Cost per site metrics monitored monthly
- **Contract Retention**: Minimum 95% contract retention rate required

#### Performance Review Process
- **Monthly Reviews**: Territory performance assessed monthly
- **Quarterly Business Reviews**: Comprehensive territory analysis quarterly
- **Annual Planning**: Territory goals and objectives set annually
- **Corrective Action**: Performance improvement plans for underperforming territories

### Compliance Requirements

#### Regulatory Compliance
- **Rule 7.1**: All territory assignments must comply with applicable labor laws
- **Rule 7.2**: Equal opportunity principles must be maintained in territory management
- **Rule 7.3**: Data privacy regulations must be followed in territory operations
- **Rule 7.4**: Industry-specific regulations must be considered in assignments

#### Internal Policy Compliance
- **Code of Conduct**: All territory operations must adhere to company code of conduct
- **Conflict of Interest**: Territory assignments must avoid conflicts of interest
- **Confidentiality**: Customer information confidentiality maintained across territories
- **Quality Standards**: Service quality standards enforced consistently across territories

## Exception Handling Rules

### Exception Categories

#### Geographic Exceptions
- **Island Sites**: Sites geographically isolated from natural territory
- **Border Sites**: Sites near territory boundaries requiring special consideration
- **Access Issues**: Sites with unique access or logistical challenges
- **Regulatory Zones**: Sites in areas with special regulatory requirements

#### Business Exceptions
- **Customer Requests**: Specific customer territory manager preferences
- **Contract Requirements**: Contractual obligations affecting territory assignment
- **Strategic Accounts**: High-value accounts requiring special handling
- **Competitive Situations**: Assignments influenced by competitive dynamics

### Exception Approval Process

#### Standard Exception Process
1. **Exception Request**: Formal request with business justification
2. **Impact Assessment**: Analysis of exception impact on all stakeholders
3. **Alternative Evaluation**: Review of alternative solutions
4. **Approval Decision**: Formal approval or denial with reasoning
5. **Implementation**: Execution of approved exceptions with monitoring

#### Emergency Exception Process
- **Immediate Assignment**: Emergency situations allow immediate temporary assignment
- **24-Hour Review**: All emergency exceptions reviewed within 24 hours
- **Formal Documentation**: Emergency exceptions must be formally documented
- **Follow-up Action**: Permanent solution developed within 30 days

## Technology and System Rules

### System Integration Requirements

#### Data Synchronization
- **Rule 8.1**: Territory assignments must be updated in all systems within 24 hours
- **Rule 8.2**: Customer relationship management systems must reflect current assignments
- **Rule 8.3**: Billing systems must be updated to reflect territory changes
- **Rule 8.4**: Reporting systems must accurately reflect territory structures

#### Access Control
- **Territory-Based Access**: System access aligned with territory assignments
- **Data Security**: Customer data access limited to assigned territory managers
- **Audit Trails**: All territory assignment changes must be logged and auditable
- **Backup Procedures**: Territory data backup and recovery procedures maintained

### Reporting and Analytics

#### Standard Reports
- **Territory Performance Dashboard**: Real-time territory performance metrics
- **Assignment History**: Complete history of territory assignments and changes
- **Workload Analysis**: Territory workload distribution and balance analysis
- **Revenue Analysis**: Territory revenue performance and trends

#### Custom Analytics
- **Predictive Modeling**: Territory performance prediction and optimization
- **Scenario Planning**: Impact analysis of proposed territory changes
- **Competitive Analysis**: Territory performance relative to market conditions
- **Customer Segmentation**: Territory assignment optimization based on customer segments

## Continuous Improvement Rules

### Review and Optimization Process

#### Regular Review Cycles
- **Monthly Operational Reviews**: Territory operational performance assessment
- **Quarterly Strategic Reviews**: Territory strategy and alignment assessment
- **Annual Comprehensive Reviews**: Complete territory structure evaluation
- **Ad-hoc Reviews**: Special reviews triggered by significant events

#### Optimization Criteria
- **Efficiency Metrics**: Territory operational efficiency measurements
- **Customer Satisfaction**: Customer feedback and satisfaction scores
- **Revenue Performance**: Territory revenue growth and profitability
- **Manager Satisfaction**: Territory manager job satisfaction and retention

### Rule Updates and Modifications

#### Rule Change Process
1. **Change Proposal**: Formal proposal for rule modifications
2. **Impact Analysis**: Assessment of proposed changes on operations
3. **Stakeholder Review**: Input from affected parties and stakeholders
4. **Testing and Validation**: Pilot testing of proposed rule changes
5. **Implementation**: Formal implementation with training and communication

#### Version Control
- **Rule Versioning**: All rule changes tracked with version numbers
- **Change Documentation**: Complete documentation of rule modifications
- **Training Updates**: Training materials updated to reflect rule changes
- **Communication Plan**: Stakeholder communication of rule updates

This comprehensive territory assignment rules framework ensures optimal customer site assignments while maintaining operational efficiency, customer satisfaction, and business growth objectives within the Towne Park Data Product platform.