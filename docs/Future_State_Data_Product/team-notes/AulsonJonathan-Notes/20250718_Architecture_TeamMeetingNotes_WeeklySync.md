---
title: "Architecture Team Meeting Notes - Weekly Sync Sessions"
description: "Comprehensive meeting notes from Architecture Weekly Sync sessions covering key decisions, discussions, and action items"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-02-04
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "Architecture Weekly Sync Teams Chat.docx"
systems:
  - Power Platform
  - Azure Static Web Apps
  - Dataverse
components:
  - Team Collaboration
  - Decision Making
  - Project Management
business_domains:
  - Architecture Governance
  - Team Coordination
  - Project Planning
user_roles:
  - Solution Architect
  - Technical Lead
  - Development Team
tags:
  - meeting-notes
  - architecture
  - team-coordination
  - decisions
  - action-items
---

# Architecture Team Meeting Notes - Weekly Sync Sessions

## Purpose

This document captures key discussions, decisions, and action items from the Architecture Weekly Sync meetings held between February 2025 and May 2025. It serves as a historical record of architectural decisions and provides context for ongoing development efforts.

## Meeting Structure and Evolution

### Initial Meeting Format (February 2025)
- Ad-hoc discussions without formal agenda
- Focus on immediate technical challenges
- Informal decision-making process
- Limited documentation of outcomes

### Proposed Structured Format (February 17, 2025)

**Meeting Organizer Transition:**
- Original organizer: Christopher Thompson
- Proposed new organizer: Cesar Figueroa
- Decision: Make Cesar co-organizer to maintain meeting history

**Proposed Agenda Structure:**
1. **Welcome and Meeting Objectives** (5 minutes)
2. **Review of Action Items from Previous Meeting** (10 minutes)
3. **Open Questions and Issues** (10 minutes)
4. **Review and Groom Architecture and Design Backlog** (15 minutes)
5. **Proposed Solutions and Feedback** (15 minutes)
6. **Special Topics** (5 minutes, optional)
7. **Assign Action Items and Next Steps** (10 minutes)
8. **Wrap-Up and Closing** (5 minutes)

**Feedback and Refinements:**
- Jonathan Aulson suggested need for clear visibility into "Architecture and Design Backlog"
- Recommendation to extend meeting to 90 minutes or alternate agenda weeks
- Proposal to focus backlog grooming on weeks between sprint start days

## Key Technical Discussions

### Power Platform Licensing Strategy (February 11-12, 2025)

**Core Challenge:**
- 600+ users requiring Dataverse access
- Custom client application (not Power Apps canvas/model-driven)
- "Connection pooling" architecture with service principal backend

**Licensing Options Analyzed:**

1. **Power Apps Per App**: $5/user/month = $3,000/month
   - Question: Applicability to custom applications unclear
   - Requires Microsoft clarification

2. **Power Apps Premium**: $20/user/month = $12,000/month
   - Full capabilities but excessive cost

3. **Power Pages Authenticated Users**: $200/100 users = $1,200/month
   - Promising cost model but applicability uncertain
   - Includes full Dataverse access and custom tables

4. **Microsoft 365 Limited Rights**: Included with subscriptions
   - Does not support custom tables (deal-breaker)

**Key Insights:**
- Need matrix structure comparing licensing options vs. access requirements
- Service principal "connection pooling" may not align with standard licensing
- Requires formal Microsoft licensing consultation

**Action Items:**
- Schedule Microsoft licensing consultation
- Create licensing comparison matrix
- Validate Power Pages applicability to custom applications

### Application Lifecycle Management (ALM) Strategy (February 18-19, 2025)

**Current State Issues Identified:**
- Two Azure pipelines: dev deployment and prod deployment
- Production deployment triggered immediately on master branch merge
- No pre-production environment (TEST/STAGE) capability
- All testing confined to development environment

**Proposed Solutions:**
- Implement proper branching strategy with release branch
- Create QA Sandbox environment
- Establish proper CI/CD pipeline with environment gates
- Consider Power Platform pipelines vs. Azure DevOps pipelines

**Configuration Migration Tool Opportunities:**
- Capture and source control test data
- Transport configuration between environments
- Automate testing with consistent data sets
- Enable "pristine development environment daily" approach

**Priority Assessment:**
- Marked as "relatively urgent" due to production deployment risks
- Current state forces all QA/UAT testing in development environment

### Integration Architecture Evolution (March-April 2025)

**Current Solution Analysis:**
- Power Automate + On-premises Data Gateway (working solution)
- Secure, no firewall changes required
- Limited flexibility for complex scenarios

**Alternative Approaches Evaluated:**

1. **Azure Function + Hybrid Connection**
   - Full control over custom logic
   - Requires App Service Plan (not Consumption)
   - More complex setup but greater flexibility

2. **Azure Function in VNet + VPN/ExpressRoute**
   - Enterprise-grade connectivity
   - Higher cost and complexity
   - Suitable for broader on-premise integration needs

3. **Public API Exposure**
   - Simple but higher security risk
   - Not recommended due to security concerns

**Recommendation:**
- Continue Power Automate for current use cases
- Implement Azure Function + Hybrid Connection for complex scenarios
- Develop hybrid approach based on specific requirements

### Data Management and Storage Strategy (March 2025)

**Multi-Environment Data Strategy:**
- Separate data servers for Dev, QA, and Production
- QA server shared by QA, UAT, and Training environments
- Multi-tenant storage strategy with environment prefixes

**Storage Path Structure:**
```
/dev/{site_id}/reports/{filename}
/qa/{site_id}/reports/{filename}
/uat/{site_id}/reports/{filename}
/prod/{site_id}/reports/{filename}
```

**Benefits:**
- Prevents cross-environment data contamination
- Simplifies administration
- Maintains data integrity
- Enables environment-specific data management

**Dataflow Limitations Identified:**
- 24-hour maximum refresh duration
- 48 refreshes per 24 hours maximum
- 4-hour maximum per query/partition
- Concurrency limit of 4 queries/partitions

### Security and Compliance Considerations (March 2025)

**Azure AD App Role Assignment Challenge:**
- AppRoleAssignment.ReadWrite.All is tenant-wide permission
- Cannot be scoped to specific groups or resource groups
- Need for restricted access to specific user groups

**Proposed Solutions:**
1. **Azure AD Administrative Units**
   - Segment users/groups into containers
   - Delegate admin rights over specific units
   - Limitation: Still tenant-wide for app role assignments

2. **Proxy Layer with Custom Logic**
   - Azure Function as middleman
   - Validate group membership before Graph API calls
   - Enforce group-based restrictions programmatically

3. **Least-Privilege Alternative**
   - Pre-assign app roles to allowed groups
   - Use User.ReadWrite.All scoped to administrative units
   - Avoid dynamic role assignments

**Security Recommendations:**
- Audit and monitor all app role assignments
- Use Azure AD Privileged Identity Management (PIM)
- Implement Zero Trust principles
- Restrict service principal to specific IP ranges

## Operational Issues and Resolutions

### SSL Certificate Management (May 2025)

**Issue Identified:**
- SSL certificate for powerbill.townepark.com expired (2025-05-25)
- Automatic renewal failed
- Chrome blocking access, Edge showing warnings

**Root Cause:**
- Certificate expired on 2025-05-25 17:59:59
- Automatic renewal process failed

**Proposed Resolution:**
- Delete and recreate custom domain record
- Force certificate renewal through Azure portal
- Backup plan: Use default domain (ambitious-grass-00554670f.5.azurestaticapps.net)

**Action Items:**
- Obtain approval for custom domain deletion/recreation
- Implement monitoring for future certificate renewals
- Document certificate management procedures

### Power Automate Flow Management (February 2025)

**Process License Constraints:**
- Maximum 25 cloud flows per process license
- Current count: 24 flows for Statement Generation
- Additional flows needed for Forecasting system

**Strategic Implications:**
- Forecasting likely requires separate Process License
- Need to audit and remove duplicate/unused flows
- Plan for future flow management and optimization

## Team Coordination and Process Improvements

### Meeting Effectiveness Initiatives (February 2025)

**Johnn Hesseltine's Structured Approach:**
- Request for formal agenda structure
- Emphasis on deliberate and intentional meetings
- Focus on architecture and design backlog grooming
- Clear action item assignment and tracking

**Jonathan Aulson's Feedback:**
- Need for clear "Architecture and Design Backlog" visibility
- Suggestion for 90-minute meetings or alternating agenda weeks
- Focus on backlog grooming between sprint start days

**Cesar Figueroa's Commitment:**
- Agreement to define conversation structure
- Commitment to prepare topics and agenda items
- Willingness to take on meeting organization responsibilities

### Knowledge Management and Documentation

**Loop Integration:**
- Use of Microsoft Loop for collaborative documentation
- Shared documents for architecture proposals
- Real-time collaboration on technical specifications

**Documentation Strategy:**
- Capture architectural decisions and rationale
- Maintain historical context for future reference
- Enable knowledge transfer and team onboarding

## Key Decisions and Outcomes

### Architectural Decisions

1. **ALM Strategy**: Implement proper environment isolation with QA Sandbox as immediate priority
2. **Licensing Approach**: Pursue Power Pages Authenticated Users licensing pending Microsoft validation
3. **Integration Strategy**: Hybrid approach using both Power Automate and Azure Functions based on complexity
4. **Data Management**: Multi-tenant storage strategy with environment-specific prefixes
5. **Security Model**: Implement proxy layer for restricted Azure AD permissions

### Process Improvements

1. **Meeting Structure**: Adopt formal agenda with clear objectives and time allocation
2. **Backlog Management**: Implement "Architecture and Design Backlog" as filtered view of overall backlog
3. **Documentation**: Use Loop for collaborative documentation and decision tracking
4. **Action Items**: Clear assignment and tracking of follow-up actions

### Technical Standards

1. **Environment Strategy**: Development → QA → UAT → Production progression
2. **Branching Strategy**: Feature → Development → Release → Master flow
3. **Configuration Management**: Source control for configuration and test data
4. **Monitoring**: Comprehensive logging and monitoring for all environments

## Action Items Tracking

### Completed Actions
- ✅ Power Automate + Data Gateway validation for CSV import (February 25)
- ✅ Dataflow testing and documentation completion
- ✅ Release branch creation and QA Sandbox planning
- ✅ XRMToolbox installation and configuration planning

### In Progress Actions
- 🔄 Microsoft licensing consultation scheduling
- 🔄 Azure Function + Hybrid Connection proof of concept
- 🔄 Environment architecture diagram finalization
- 🔄 SSL certificate renewal process implementation

### Pending Actions
- ⏳ Power Platform ALM pipeline implementation
- ⏳ Configuration Migration tool setup
- ⏳ Comprehensive testing framework establishment
- ⏳ Production deployment process refinement

## Lessons Learned

### Technical Insights
1. **Licensing Complexity**: Power Platform licensing for custom applications requires careful analysis and Microsoft consultation
2. **ALM Importance**: Proper environment isolation is critical for production stability
3. **Integration Flexibility**: Multiple integration approaches needed for different scenarios
4. **Security Considerations**: Azure AD permissions require careful scoping and proxy patterns

### Process Insights
1. **Meeting Structure**: Formal agendas significantly improve meeting effectiveness
2. **Documentation**: Real-time collaborative tools enhance team coordination
3. **Decision Tracking**: Clear action item assignment and follow-up essential
4. **Knowledge Sharing**: Regular architecture reviews prevent knowledge silos

### Team Dynamics
1. **Leadership**: Clear technical leadership improves decision-making speed
2. **Collaboration**: Cross-functional input enhances solution quality
3. **Communication**: Regular sync meetings prevent misalignment
4. **Accountability**: Clear ownership of action items drives progress

## Future Considerations

### Technical Evolution
- Migration to native Power Apps if licensing benefits justify effort
- Integration platform consolidation for enterprise-scale requirements
- Advanced monitoring and observability implementation
- Performance optimization and scalability planning

### Process Maturation
- Formal architecture review board establishment
- Standardized decision documentation procedures
- Regular architecture health assessments
- Continuous improvement feedback loops

### Team Development
- Architecture skills development and training
- Knowledge transfer and documentation procedures
- Cross-training for critical system components
- Succession planning for key technical roles

## Related Documentation

- [ALM and CI/CD Strategy](../../technical/backend/20250718_Architecture_ALMStrategy_PowerPlatform.md)
- [Power Platform Licensing Analysis](../../configuration/system-settings/20250718_Architecture_LicensingAnalysis_PowerPlatform.md)
- [Integration Architecture Strategy](../../technical/integrations/20250718_Architecture_IntegrationStrategy_HybridConnections.md)
- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Forecasting System Overview](../../systems/forecasting/20250716_Forecasting_SystemOverview_Integrated.md)

## Meeting Attendance and Participation

### Core Team Members
- **Johnn Hesseltine**: Solution Architect, Technical Leadership
- **Cesar Figueroa**: Technical Lead, Implementation Focus
- **Jonathan Aulson**: Development Lead, Process Improvement
- **Christopher Thompson**: Development Team, Technical Implementation
- **Lindsey Lee**: Occasional participation, Business Perspective

### Meeting Frequency and Duration
- **Frequency**: Weekly (Tuesdays 2:00 PM - 3:00 PM)
- **Duration**: Typically 1 hour, with extensions for complex topics
- **Format**: Microsoft Teams with recording capability
- **Documentation**: Teams chat for real-time collaboration and follow-up

## Code Validation Report

**Last Validated**: 2025-07-18
**Validation Scope**: Team Notes and Meeting Documentation
**Code Copy Date**: N/A - Meeting notes documentation

### Validation Summary
- ✅ **Verified Elements**: 0 items (no direct code validation applicable)
- ⚠️ **Discrepancies Found**: 0 items
- ❓ **Incomplete Documentation**: 0 items
- 🔍 **Requires Review**: 1 item needs stakeholder verification

### Detailed Validation Results

#### Meeting Documentation: Action Item Tracking
**Documented Element**: "Various action items and decisions from architecture meetings"
**Validation Status**: 🔍 **REQUIRES_REVIEW** - Action item completion status needs validation with team members
**Findings**: Meeting notes capture decisions and action items but current status may need verification
**Recommendations**: Regular review with team members to validate action item completion and update status

### Code File References
- No direct code files applicable for meeting notes
- References to technical decisions that may be implemented in various system components

### Validation Methodology
- **Code Copy Date**: N/A - Meeting documentation
- **Validation Approach**: Content accuracy validation against meeting recordings and chat logs
- **Limitations**: Requires validation with meeting participants for accuracy and completeness

## Appendix: Meeting Timeline

### February 2025
- **Feb 4**: Initial licensing discussion, ALM strategy introduction
- **Feb 11**: Deep dive on licensing options and cost analysis
- **Feb 12**: Licensing matrix development and Microsoft consultation planning
- **Feb 17**: Meeting structure improvement initiative
- **Feb 18**: ALM documentation sharing and process refinement
- **Feb 19**: CI/CD urgency identification and planning
- **Feb 20**: Power Automate flow limitations discovery
- **Feb 25**: Dataflow testing completion and environment planning

### March 2025
- **Mar 4**: Integration architecture options presentation
- **Mar 5**: Multi-environment data strategy discussion
- **Mar 14**: Environment architecture review
- **Mar 18**: SmartConnect integration troubleshooting
- **Mar 25**: Azure AD security permissions analysis

### April 2025
- **Apr 1**: Continued architecture discussions
- **Apr 3**: Hybrid connection strategy documentation
- **Apr 8**: Meeting cancellation for ALM focus
- **Apr 15**: Budget data architecture review
- **Apr 22**: Partial attendance planning
- **Apr 23**: Integration architecture proposal presentation
- **Apr 29**: Implementation progress review

### May 2025
- **May 6**: Azure Function testing and validation
- **May 13**: Continued development progress
- **May 20**: Recorded session with comprehensive review
- **May 21**: SSL certificate issue identification and resolution planning

This comprehensive meeting notes document preserves the institutional knowledge and decision-making context from the Architecture Weekly Sync sessions, providing valuable historical reference for future development and architectural decisions.