---
title: "Towne Park Architecture - Power Platform Licensing Analysis and Strategy"
description: "Comprehensive analysis of Power Platform licensing options, cost implications, and recommendations for 600+ user deployment"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-02-11
version: 1.0
status: Draft
owner: "Johnn Hesseltine"
source_documents:
  - "Architecture Weekly Sync Teams Chat.docx"
systems:
  - Power Platform
  - Dataverse
  - Power Automate
components:
  - Licensing
  - User Management
  - Cost Analysis
business_domains:
  - Licensing Strategy
  - Cost Management
  - User Access Management
user_roles:
  - Solution Architect
  - Technical Lead
  - Business Stakeholders
tags:
  - licensing
  - power-platform
  - cost-analysis
  - dataverse
  - configuration-guide
---

# Towne Park Architecture - Power Platform Licensing Analysis and Strategy

## Purpose

This document provides a comprehensive analysis of Power Platform licensing options for Towne Park's solution serving 600+ users. It examines various licensing models, cost implications, and provides recommendations for the optimal licensing strategy based on the specific use case requirements.

## Business Context

### Core Requirements
- **User Base**: 600+ users requiring access to Dataverse
- **Architecture**: Custom client application (not canvas or model-driven Power Apps)
- **Data Access**: Users need access to Dataverse and custom tables
- **Integration**: Power Automate flows triggered by user actions
- **Connection Model**: "Connection pooling" architecture with managed backend via service principal

### Key Challenge
The solution uses a custom client application rather than native Power Apps, which complicates traditional Power Platform licensing models that are designed around canvas and model-driven applications.

## Licensing Options Analysis

### Option 1: Power Apps Per App Licensing
**Cost**: $5 per user/month = $3,000/month for 600 users

**Capabilities:**
- Access to specific Power Apps applications
- Full Dataverse access including custom tables
- Power Automate usage rights within the app context

**Limitations:**
- Designed for canvas or model-driven apps
- **CRITICAL ISSUE**: May not apply to custom client applications
- Per app licensing typically requires users to access through Power Apps interface

**Recommendation**: ❓ **REQUIRES_REVIEW** - Need Microsoft clarification on applicability to custom applications

### Option 2: Power Apps Premium Licensing
**Cost**: $20 per user/month = $12,000/month for 600 users

**Capabilities:**
- Full Power Platform access
- Unlimited Power Apps usage
- Premium connectors
- Full Dataverse access
- Power Automate premium features

**Assessment**: ⚠️ **NOT_RECOMMENDED** - Excessive cost for the use case requirements

### Option 3: Power Pages Authenticated Users
**Cost**: $200 per 100 users/month = $1,200/month for 600 users (6 packs)

**Capabilities:**
- Access to "low-code business websites" with authentication
- **Full Dataverse access including custom tables**
- Predictable licensing model
- Tiered pricing based on user count

**Limitations:**
- Designed for Power Pages websites
- **VERIFICATION NEEDED**: Applicability to custom client applications unclear

**Initial Assessment**: 🔍 **PROMISING** - Significantly lower cost but requires validation

### Option 4: Microsoft 365/Office 365 Limited Rights
**Cost**: Included with existing Microsoft 365 subscriptions

**Capabilities:**
- Limited Power Platform usage rights
- Basic Dataverse access

**Limitations:**
- **CRITICAL**: Does not work with custom tables
- Limited to standard Dataverse entities only
- Insufficient for the solution requirements

**Recommendation**: ❌ **NOT_SUITABLE** - Cannot support custom tables requirement

### Option 5: Power Automate Process Licensing
**Cost**: Varies based on process complexity

**Capabilities:**
- Licensing based on business processes rather than individual users
- Supports automated workflows
- Can handle high-volume processing

**Considerations:**
- **Current Usage**: 24 flows associated with Statement Generation process (limit: 25 flows)
- **Future Needs**: Additional flows required for Forecasting system
- **Requirement**: Likely need separate Process License for Forecasting

**Assessment**: ✅ **COMPLEMENTARY** - Required for backend automation, not user access

## Detailed Cost Analysis

### Licensing Cost Comparison Matrix

| Licensing Option | Monthly Cost | Annual Cost | Cost per User | Dataverse Access | Custom Tables | Notes |
|------------------|--------------|-------------|---------------|------------------|---------------|-------|
| Power Apps Per App | $3,000 | $36,000 | $5 | Full | Yes | Requires Microsoft clarification |
| Power Apps Premium | $12,000 | $144,000 | $20 | Full | Yes | Excessive for use case |
| Power Pages Auth Users | $1,200 | $14,400 | $2 | Full | Yes | Requires validation |
| Microsoft 365 Limited | $0* | $0* | $0* | Limited | No | Insufficient capabilities |
| Process Licensing | Variable | Variable | N/A | N/A | N/A | For automation only |

*Assuming existing Microsoft 365 subscriptions

### Additional Licensing Considerations

**Power Automate Process Licensing Requirements:**
- **Current State**: 1 Process License for Statement Generation (24/25 flows used)
- **Future State**: Additional Process License needed for Forecasting system
- **Estimated Additional Cost**: $150-$500/month per additional process

**Dataverse Storage Costs:**
- **Base Allocation**: Included with Power Platform licenses
- **Additional Storage**: $3/month/GB for overage
- **Forecasting Data Impact**: Significant additional storage requirements expected

## Architecture Licensing Implications

### Connection Pooling Architecture
**Current Approach:**
- Users access Power Platform environment through single service principal
- Backend manages authentication and authorization
- Effectively "connection pooling" for license optimization

**Licensing Challenges:**
- Traditional Power Platform licensing assumes direct user access
- Service principal approach may not align with standard licensing models
- Need Microsoft guidance on proper licensing for this architecture

### Service Principal Licensing
**Current Understanding:**
- Service principals can operate without individual user licenses
- Backend automation can run under service principal context
- User access to data may still require individual licensing

**Verification Required:**
- Confirm service principal licensing model applicability
- Validate user access requirements through service principal
- Understand audit and compliance implications

## Recommendations

### Immediate Actions (High Priority)

1. **Microsoft Licensing Consultation**
   - Schedule meeting with Microsoft licensing specialists
   - Present specific architecture and use case
   - Obtain written guidance on applicable licensing models
   - Clarify custom application licensing requirements

2. **Power Pages Validation**
   - Investigate Power Pages Authenticated Users licensing applicability
   - Test compatibility with custom client application architecture
   - Validate Dataverse access capabilities
   - Confirm cost model accuracy

3. **Service Principal Licensing Clarification**
   - Understand licensing implications of connection pooling architecture
   - Validate compliance with Microsoft licensing terms
   - Document approved licensing approach

### Short-term Strategy

**Recommended Approach (Pending Validation):**
1. **Primary**: Power Pages Authenticated Users licensing ($1,200/month)
2. **Fallback**: Power Apps Per App licensing ($3,000/month)
3. **Complement**: Power Automate Process Licensing for backend automation

**Risk Mitigation:**
- Obtain written confirmation from Microsoft before implementation
- Develop contingency plans for alternative licensing models
- Monitor licensing compliance continuously

### Long-term Considerations

**Scalability Planning:**
- Plan for user base growth beyond 600 users
- Consider enterprise licensing agreements for cost optimization
- Evaluate hybrid licensing models as solution evolves

**Architecture Evolution:**
- Consider migration to native Power Apps if licensing benefits justify effort
- Evaluate Power Pages integration opportunities
- Plan for future Power Platform feature adoption

## Technical Specifications

### Licensing Implementation Requirements

**User Management:**
- Azure AD integration for user authentication
- Role-based access control implementation
- License assignment automation
- Usage monitoring and compliance tracking

**Service Principal Configuration:**
- Proper service principal setup for backend operations
- Secure credential management
- Audit logging for service principal activities
- Compliance monitoring for licensing terms

### Monitoring and Compliance

**License Usage Tracking:**
- Automated user access monitoring
- License utilization reporting
- Compliance dashboard implementation
- Cost tracking and optimization

**Audit Requirements:**
- User access audit trails
- License assignment documentation
- Compliance reporting capabilities
- Regular license review procedures

## Security Considerations

### Access Control
- Principle of least privilege for user access
- Service principal security hardening
- Regular access reviews and cleanup
- Multi-factor authentication requirements

### Compliance
- Data protection regulation compliance
- License agreement adherence
- Audit trail maintenance
- Regular compliance assessments

## Code Validation Report

**Last Validated**: 2025-07-18
**Validation Scope**: Technical Configuration
**Code Copy Date**: Current local copy analysis

### Validation Summary
- ✅ **Verified Elements**: 0 items (no direct code validation applicable)
- ⚠️ **Discrepancies Found**: 0 items
- ❓ **Incomplete Documentation**: 1 item requires external validation
- 🔍 **Requires Review**: 2 items need stakeholder verification

### Detailed Validation Results

#### Licensing Configuration: Service Principal Usage
**Documented Element**: "Connection pooling architecture with service principal backend"
**Validation Status**: 🔍 **REQUIRES_REVIEW** - Service principal licensing model needs Microsoft validation
**Findings**: Current architecture uses service principal for backend operations, but licensing implications need clarification
**Recommendations**: Obtain Microsoft guidance on proper licensing for service principal-based architectures

#### User Access Configuration: Custom Application Licensing
**Documented Element**: "Custom client application requiring Dataverse access for 600+ users"
**Validation Status**: ❓ **INCOMPLETE** - Microsoft clarification needed on custom application licensing
**Findings**: Traditional Power Platform licensing models may not directly apply to custom applications
**Recommendations**: Schedule Microsoft licensing consultation to clarify applicable licensing models

### Code File References
- No direct code files applicable for licensing analysis
- Configuration validation would require access to Azure AD and Power Platform admin center

### Validation Methodology
- **Code Copy Date**: N/A - Licensing strategy document
- **Validation Approach**: Business requirements validation against licensing models
- **Limitations**: Requires external validation with Microsoft licensing team

## Related Documentation

- [ALM and CI/CD Strategy](../../technical/backend/20250718_Architecture_ALMStrategy_PowerPlatform.md)
- [Integration Architecture Strategy](../../technical/integrations/20250718_Architecture_IntegrationStrategy_HybridConnections.md)
- [Architecture Team Meeting Notes](../../team-notes/20250718_Architecture_TeamMeetingNotes_WeeklySync.md)
- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [User Access Management](../../configuration/user-access/)

## Action Items and Next Steps

### Critical Actions (Immediate)
1. **Schedule Microsoft Licensing Consultation**
   - Present architecture and use case to Microsoft licensing team
   - Obtain written guidance on applicable licensing models
   - Document approved licensing approach

2. **Power Pages Investigation**
   - Research Power Pages Authenticated Users licensing model
   - Test compatibility with current architecture
   - Validate cost projections

3. **Service Principal Licensing Validation**
   - Clarify licensing requirements for service principal usage
   - Understand compliance implications
   - Document approved implementation approach

### Planning Actions (Short-term)
1. **Cost-Benefit Analysis**
   - Compare licensing options with implementation costs
   - Evaluate potential architecture modifications
   - Develop business case for recommended approach

2. **Implementation Planning**
   - Develop licensing implementation timeline
   - Plan user migration strategy
   - Establish monitoring and compliance procedures

### Strategic Actions (Long-term)
1. **Enterprise Licensing Evaluation**
   - Investigate enterprise agreement opportunities
   - Plan for user base growth scenarios
   - Evaluate long-term cost optimization strategies

2. **Architecture Evolution Planning**
   - Consider native Power Apps migration benefits
   - Evaluate Power Pages integration opportunities
   - Plan for future Power Platform feature adoption

## Stakeholder Review Requirements

**Business Review Required:**
- Cost approval for recommended licensing approach
- Budget planning for ongoing licensing costs
- User access policy validation
- Compliance requirements review

**Technical Review Required:**
- Architecture compatibility with licensing model
- Implementation feasibility assessment
- Security and compliance validation
- Monitoring and management capability review

**Legal Review Required:**
- License agreement terms validation
- Compliance requirements assessment
- Risk mitigation strategy review
- Audit and reporting requirements validation