---
description: Guide for automatic generation of system documentation as part of the PR process for Towne Park financial systems
author: Jonathan Aulson
version: 1.0
globs: ["**/*.ts", "**/*.tsx", "**/*.cs", "**/*.sql", "**/*.yaml", "**/*.json"]
tags: ["documentation", "pr-process", "towne-park", "code-quality", "automation"]
---

# Towne Park Documentation Generation Rule

## 🚨 CRITICAL INSTRUCTIONS 🚨

This rule MUST ONLY be applied during the Pull Request process, after feature development is substantially complete. The AI assistant MUST generate appropriate documentation based on the PR content without modifying any functional code. All documentation MUST be written to separate markdown files in the designated documentation directories.

## Objective

To automatically generate comprehensive, well-structured documentation for Towne Park's financial systems during the PR process, ensuring all features are properly documented according to established templates, taxonomy, and cross-referencing standards.

## Triggering Conditions

This rule is triggered when:
- A Pull Request is being prepared or reviewed
- The PR contains substantial feature implementation, bug fixes, or enhancements
- The documentation generation process is explicitly requested

## Documentation Analysis Process

### Step 1: Analyze PR Content

1. MUST analyze the PR content to identify:
   - What systems are affected (Billing, Forecasting, Integration, etc.)
   - What components are modified (Frontend, Backend, Database, API, etc.)
   - What business domains are impacted (Contract Management, Revenue Calculation, etc.)
   - What user roles will interact with the changes
   - What processes are being modified or created

2. MUST map the changes to the documentation taxonomy:
   - System Tags: `billing`, `forecasting`, `integration`, `data-warehouse`, `power-platform`, `azure`
   - Technical Tags: `architecture`, `api`, `database`, `frontend`, `backend`, `security`, etc.
   - Business Domain Tags: `contract-management`, `revenue-share`, `fixed-fee`, etc.
   - User Role Tags: `account-manager`, `district-manager`, `billing-admin`, etc.
   - Process Tags: `workflow`, `approval`, `configuration`, `reporting`, etc.
   - Document Type Tags: `overview`, `specification`, `business-rule`, `user-guide`, etc.

### Step 2: Determine Required Document Types

Based on the analysis, the AI MUST determine which document types are required:

1. For new features or significant enhancements:
   - Technical Specification Document
   - User Process Document (if user-facing)
   - Business Rule Document (if implementing business logic)
   - Configuration Guide (if configurable)
   - Updates to relevant System Overview Documents

2. For integration changes:
   - Technical Specification Document focusing on integration details
   - Business Rule Document covering when/how integration is triggered

3. For database changes:
   - Technical Specification Document with data model updates
   - Updates to any affected Business Rule Documents

4. For UI changes:
   - User Process Document
   - Updates to relevant Configuration Guides

5. For bug fixes:
   - Updates to affected documentation to clarify correct behavior

## Document Generation Process

### Step 3: Generate Required Documents

For each required document type, the AI MUST:

1. Select the appropriate template based on document type
2. Generate a file name following the pattern: `YYYYMMDD_[SystemName]_[DocumentType]_[FeatureName].md`
3. Create appropriate YAML frontmatter with:
   - Descriptive title
   - Clear description
   - Current date for created_date and last_updated_date
   - Version set to 1.0
   - Status set to "Draft"
   - Owner set to PR author
   - Contributors including team members
   - Relevant systems, tags, and type-specific metadata

4. Generate comprehensive document content following the template structure:
   - Extract details from PR description, code changes, and commit messages
   - Reference related documentation or technical specifications
   - Include code examples where appropriate
   - Document edge cases and limitations
   - Add appropriate cross-references to existing documentation

### Step 4: Determine Documentation File Placement

The AI MUST place generated documents in the correct location following this structure:

towne-park-documentation/
├── README.md                       # Project overview and navigation guide
├── systems/                        # System-level documentation
│   ├── billing/                    # Billing system docs
│   │   ├── overview.md             # System overview
│   │   ├── architecture.md         # Technical architecture
│   │   └── integrations.md         # Integration points
│   └── forecasting/                # Forecasting system docs
│       ├── overview.md             # System overview
│       ├── architecture.md         # Technical architecture
│       └── integrations.md         # Integration points
├── business-rules/                 # Business rules documentation
│   ├── contract-types/             # Contract-related rules
│   │   ├── revenue-share.md
│   │   ├── fixed-fee.md
│   │   ├── per-labor-hour.md
│   │   └── management-agreement.md
│   ├── billing/                    # Billing-related rules
│   │   ├── invoice-calculation.md
│   │   ├── validation.md
│   │   └── bell-service-fee.md
│   └── forecasting/                # Forecasting-related rules
│       ├── payroll.md
│       ├── revenue.md
│       └── statistics.md
├── technical/                      # Technical documentation
│   ├── frontend/                   # Frontend components
│   ├── backend/                    # Backend services
│   ├── database/                   # Database models and schemas
│   └── integrations/               # Integration specifications
├── user-processes/                 # User process documentation
│   ├── account-manager/            # Account Manager processes
│   ├── billing-admin/              # Billing Admin processes
│   └── district-manager/           # District Manager processes
├── configuration/                  # Configuration guides
│   ├── contract-setup/             # Contract configuration
│   ├── user-access/                # User access configuration
│   └── system-settings/            # System settings configuration
└── glossary.md                     # Terminology definitions


## Document Content Requirements

### Technical Specifications

- MUST include detailed architecture information
- MUST describe data flows and API contracts
- MUST document algorithms or business logic implementations
- MUST address performance and security considerations
- MUST describe testing approach and validation criteria

### Business Rules

- MUST clearly define rule conditions and application criteria
- MUST include calculation formulas with examples
- MUST specify which contract types and situations the rule applies to
- MUST document exceptions and edge cases
- MUST reference source of the business rule (meeting, stakeholder, etc.)

### User Processes

- MUST include step-by-step instructions with clear actions
- MUST document expected system responses
- MUST cover error handling and troubleshooting
- MUST specify user roles that perform the process
- MUST explain business context and purpose

### Configuration Guides

- MUST document all configurable parameters
- MUST include default values and valid ranges
- MUST explain the impact of each configuration option
- MUST provide step-by-step configuration instructions
- MUST include validation steps to confirm correct configuration

## Cross-Referencing Requirements

The AI MUST ensure proper cross-referencing:

1. MUST include a "Related Documentation" section in each document
2. MUST use relative Markdown links with descriptive text
3. MUST reference existing documentation impacted by the changes
4. MUST update existing documentation to reference new documents where appropriate

## AI Verification Steps

<thinking>
Before finalizing document generation, I must verify:

1. Have I correctly identified all systems and components affected by the PR?
2. Have I determined all the appropriate document types needed?
3. Have I generated content that follows the prescribed templates?
4. Have I included all required metadata in the frontmatter?
5. Have I provided comprehensive content for each section of the templates?
6. Have I created appropriate cross-references to existing documentation?
7. Have I placed the documents in the correct directories?
8. Have I ensured no functional code will be modified by my actions?
9. Have I extracted all relevant information from the PR for documentation?
10. Have I included all necessary business context and technical details?
</thinking>

## Example Document Generation

### ✅ CORRECT: Technical Specification Example

```markdown
---
title: "Towne Park Billing - Revenue Share Calculation Engine"
description: "Technical specification for the Revenue Share calculation engine component"
created_date: 2025-07-14
last_updated_date: 2025-07-14
version: 1.0
status: Draft
owner: "Jane Developer"
contributors: 
  - "John Reviewer"
  - "Alice Architect"
systems:
  - Billing
components:
  - Backend
  - Database
tags:
  - technical
  - architecture
  - revenue-share
  - calculation
---

# Revenue Share Calculation Engine Technical Specification

## Purpose
This component implements the calculation logic for Revenue Share contracts, supporting tiered thresholds, multiple revenue streams, and validation handling.

## Architecture
The Revenue Share Calculation Engine is implemented as a service within the Billing system's backend architecture...

[Additional comprehensive content following the template structure]

## Related Documentation
- [Revenue Share Business Rules](../../business-rules/contract-types/revenue-share.md)
- [Billing System Architecture](../../systems/billing/architecture.md)
- [Validation Threshold Rules](../../business-rules/billing/validation.md)

❌ INCORRECT: Incomplete Technical Specification
---
title: "Revenue Share Calculation"
created_date: 2025-07-14
---

# Revenue Share Calculation

This calculates revenue share for contracts.

## How it Works
The code looks at the tiers and applies the calculation.

## Important Notes

*   ⚠️ The AI MUST NEVER modify any functional code when generating documentation
*   ⚠️ The AI MUST NEVER skip the analysis step to determine appropriate document types
*   ⚠️ The AI MUST use the defined templates and follow the documentation structure
*   ⚠️ The AI MUST include all required metadata in the frontmatter
*   ⚠️ The AI MUST create cross-references to maintain documentation connectivity
*   ⚠️ The AI MUST place documents in the correct location within the documentation hierarchy

## Process Summary

1.  Analyze PR content to understand changes
2.  Determine required document types based on changes
3.  Generate each required document using appropriate templates
4.  Place documents in correct location in documentation structure
5.  Create proper cross-references between documents
6.  Verify documentation quality and completeness

