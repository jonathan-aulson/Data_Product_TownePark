---
title: "AI Content Safety Checklist"
description: "Mandatory safety checklist for all AI-generated content to prevent hallucinations and ensure documentation integrity"
created_date: 2025-07-28
last_updated_date: 2025-07-28
version: 1.0
status: Active
owner: "Documentation Team"
content_type: "factual"
verification_status: "verified"
verified_by: "Documentation Team"
verification_date: 2025-07-28
systems:
  - Documentation
  - AI Safety
  - Quality Assurance
business_domains:
  - AI Safety
  - Content Validation
  - Quality Control
tags:
  - ai-safety
  - checklist
  - validation
  - quality-control
---

# AI Content Safety Checklist

## Overview

This checklist MUST be completed for ALL AI-generated content before publication. It serves as a critical safeguard against hallucinations and ensures documentation integrity.

## Pre-Generation Safety Check

### ✅ Content Type Classification
- [ ] **Content type identified**: Factual | Template | Analytical | Example
- [ ] **Risk level assessed**: Critical | High | Medium | Low
- [ ] **Appropriate validation level determined**

### ✅ Source Material Verification
- [ ] **Source material available**: All factual claims have verifiable sources
- [ ] **Source accessibility confirmed**: Sources are accessible and current
- [ ] **No fictional content**: No fabricated information will be included

### ✅ Stakeholder Identification
- [ ] **Relevant stakeholders identified**: All people/teams that should review content
- [ ] **Contact information verified**: Stakeholder contact details are current
- [ ] **Review timeline established**: Realistic timeline for stakeholder review

## Content Generation Safety Prompts

### For Meeting Notes and Team Communications
```
CRITICAL SAFETY INSTRUCTION:
- Do NOT generate meeting notes without verified source material
- Do NOT create fictional attendee names or roles
- Do NOT fabricate discussions or decisions
- REQUIRE source recordings, notes, or verified transcripts
- INCLUDE verification requirements in frontmatter
- FLAG for mandatory human review
```

### For Personnel and Organizational Content
```
CRITICAL SAFETY INSTRUCTION:
- Do NOT create fictional team members or roles
- Do NOT generate organizational charts without HR verification
- Do NOT fabricate contact information or reporting structures
- REQUIRE HR/management verification for all personnel information
- INCLUDE stakeholder confirmation requirements
- FLAG for management approval
```

### For Technical Specifications
```
CRITICAL SAFETY INSTRUCTION:
- Do NOT create fictional technical capabilities
- Do NOT generate code examples without validation
- Do NOT fabricate system specifications or performance metrics
- REQUIRE validation against actual implementations
- INCLUDE code repository references where applicable
- FLAG for technical expert review
```

### For Financial and Performance Data
```
CRITICAL SAFETY INSTRUCTION:
- Do NOT generate fictional metrics or financial data
- Do NOT create estimated performance numbers without clear labeling
- Do NOT fabricate business results or projections
- REQUIRE source data from verified systems
- INCLUDE clear data source attribution
- FLAG for finance team approval
```

## Post-Generation Validation Checklist

### ✅ Content Accuracy Review
- [ ] **All names verified**: Real people confirmed, no fictional characters
- [ ] **All dates verified**: Actual dates confirmed, no fabricated timelines
- [ ] **All metrics verified**: Real data confirmed, no estimated numbers
- [ ] **All decisions verified**: Actual decisions confirmed, no fictional outcomes

### ✅ Source Attribution Check
- [ ] **Sources documented**: All sources listed in frontmatter
- [ ] **Links functional**: All source links tested and working
- [ ] **Attribution complete**: Proper credit given to all sources
- [ ] **Permissions verified**: Rights to use source material confirmed

### ✅ Stakeholder Validation
- [ ] **Stakeholders notified**: All relevant parties contacted for review
- [ ] **Feedback incorporated**: Stakeholder input integrated into content
- [ ] **Approvals obtained**: Required approvals documented
- [ ] **Confirmation recorded**: Stakeholder sign-off documented

### ✅ Technical Validation
- [ ] **Code validated**: All code references checked against repositories
- [ ] **Systems verified**: All system information confirmed with owners
- [ ] **Processes confirmed**: All procedures validated with process owners
- [ ] **Standards compliance**: Content meets all technical standards

## High-Risk Content Flags

### 🚨 IMMEDIATE STOP - Do Not Proceed
- [ ] **Fictional people mentioned**: Any non-real person names or roles
- [ ] **Fabricated meetings**: Any meetings without verified source material
- [ ] **Made-up decisions**: Any decisions without documented authority
- [ ] **Estimated data presented as fact**: Any unverified metrics or numbers

### ⚠️ ENHANCED REVIEW REQUIRED
- [ ] **Personnel information**: Names, roles, contact details, org charts
- [ ] **Meeting documentation**: Notes, decisions, action items, attendees
- [ ] **Financial data**: Metrics, budgets, performance numbers, projections
- [ ] **Technical specifications**: System capabilities, code examples, architectures

### ℹ️ STANDARD REVIEW SUFFICIENT
- [ ] **Template content**: Clearly marked examples and templates
- [ ] **Process documentation**: Based on verified procedures
- [ ] **General guidelines**: Non-specific best practices and standards
- [ ] **Reference materials**: Links to external, verified sources

## Mandatory Frontmatter Validation

### ✅ Required Fields Present
- [ ] **content_type**: Specified as factual|template|analytical|example
- [ ] **verification_status**: Set to verified|pending|unverified
- [ ] **source_documents**: Listed if factual content
- [ ] **verified_by**: Name of person who verified content

### ✅ High-Risk Content Additional Fields
- [ ] **attendees_confirmed**: For meeting notes (true|false)
- [ ] **stakeholders_notified**: For personnel content (true|false)
- [ ] **data_source**: For financial/performance data
- [ ] **approved_by**: For content requiring approval

## Quality Gates

### Gate 1: Pre-Generation
**STOP CONDITION**: Cannot proceed without verified source material for factual content
- [ ] Source material available and verified
- [ ] Content type and risk level determined
- [ ] Appropriate safety prompts applied

### Gate 2: Post-Generation
**STOP CONDITION**: Cannot publish without completing validation checklist
- [ ] All checklist items completed
- [ ] No high-risk flags present
- [ ] Required approvals obtained

### Gate 3: Pre-Publication
**STOP CONDITION**: Cannot publish without stakeholder confirmation for high-risk content
- [ ] Stakeholder review completed
- [ ] All feedback incorporated
- [ ] Final approval documented

## Escalation Procedures

### Level 1: Standard Content Issues
- **Action**: Complete standard validation checklist
- **Authority**: Content creator and reviewer
- **Timeline**: Standard review process

### Level 2: High-Risk Content
- **Action**: Enhanced validation with stakeholder review
- **Authority**: Department manager approval required
- **Timeline**: Extended review process with stakeholder confirmation

### Level 3: Critical Safety Concerns
- **Action**: Immediate escalation to Documentation Integrity Committee
- **Authority**: Executive approval required
- **Timeline**: Immediate review and resolution

## Training Requirements

### Before Using AI Tools
- [ ] **AI Safety Training**: Completed mandatory AI safety training
- [ ] **Checklist Training**: Demonstrated proficiency with safety checklist
- [ ] **Escalation Training**: Understands when and how to escalate concerns
- [ ] **Certification Current**: Valid AI tool usage certification

### Ongoing Requirements
- [ ] **Quarterly Updates**: Completed quarterly safety training updates
- [ ] **Incident Awareness**: Reviewed recent hallucination incidents and lessons learned
- [ ] **Best Practices**: Current on latest AI safety best practices
- [ ] **Tool Updates**: Trained on any new AI tool features or safety measures

## Incident Reporting

### When to Report
- **Immediately**: Any suspected hallucination or false content
- **Within 1 Hour**: Any content that bypassed safety checks
- **Within 24 Hours**: Any stakeholder concerns about content accuracy

### How to Report
1. **Stop**: Immediately stop using the content
2. **Document**: Record all details about the issue
3. **Notify**: Contact Documentation Integrity Committee
4. **Preserve**: Keep all source materials and generation logs

### What to Include
- **Content Details**: Exact content and generation method
- **Source Information**: All source materials used
- **Validation Status**: What validation steps were completed
- **Impact Assessment**: Who might be affected by the content

## Continuous Improvement

### Monthly Reviews
- [ ] **Checklist Effectiveness**: Review checklist usage and effectiveness
- [ ] **Incident Analysis**: Analyze any safety incidents or near-misses
- [ ] **Process Updates**: Update procedures based on lessons learned
- [ ] **Training Updates**: Refresh training materials as needed

### Quarterly Assessments
- [ ] **Compliance Audit**: Audit compliance with safety checklist
- [ ] **Stakeholder Feedback**: Collect feedback on content quality
- [ ] **Technology Updates**: Assess new AI safety technologies
- [ ] **Standards Review**: Review and update safety standards

## Related Documentation

- [Documentation Integrity Standards](documentation-integrity-standards.md)
- [AI Tool Usage Policies](../business-rules/development/ai-tool-usage-policies/index.md)
- [Quality Assurance Standards](index.md)
- [Error Handling Standards](error-handling-standards.md)

## Quick Reference Card

### Before AI Generation
1. ✅ Verify source material exists
2. ✅ Classify content type and risk
3. ✅ Apply appropriate safety prompts

### During AI Generation
1. ✅ Monitor for hallucination patterns
2. ✅ Verify all factual claims
3. ✅ Flag high-risk content

### After AI Generation
1. ✅ Complete validation checklist
2. ✅ Obtain stakeholder review
3. ✅ Document approvals

### Before Publication
1. ✅ Final accuracy check
2. ✅ Confirm all approvals
3. ✅ Update verification status

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-07-28 | Initial creation following hallucination incident |