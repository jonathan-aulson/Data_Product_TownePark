---
description: Guide for systematically transforming existing Towne Park data product documents into standardized, well-structured documentation
author: Jonathan Aulson
version: 1.0
globs: ["**/*.md", "**/*.docx", "**/*.txt"]
tags: ["documentation", "transformation", "towne-park", "content-migration", "knowledge-base"]
---

# Towne Park Documentation Transformation Protocol

## Objective

To systematically transform existing unstructured Towne Park data product documents into a comprehensive, well-organized documentation system following established templates, taxonomy, and cross-referencing standards, while managing content duplication and enabling incremental corpus refinement.

## 🚨 CRITICAL PROCESSING INSTRUCTIONS 🚨

This protocol MUST be applied to each document or batch of documents individually. The AI assistant MUST extract, reorganize, and transform content from source documents into the target structured format. The process MUST handle content duplication, maintain consistent cross-references, and track transformation progress across the entire documentation corpus.

## Document Analysis Process

### Step 1: Analyze Source Document(s)

<thinking>
For each source document provided, I need to analyze:
- What type of information does it contain?
- Which systems, components, and business domains does it cover?
- What is the quality and completeness of the information?
- How does this information relate to documents already processed?
- Is this information still current/relevant?
</thinking>

1. MUST identify the document's primary purpose and content type:
   - System overview information
   - Business rules and logic
   - Technical specifications
   - User processes
   - Configuration details

2. MUST extract and categorize information according to the documentation taxonomy:
   - System Tags: `billing`, `forecasting`, `integration`, `data-warehouse`, etc.
   - Technical Tags: `architecture`, `api`, `database`, `frontend`, `backend`, etc.
   - Business Domain Tags: `contract-management`, `revenue-share`, `fixed-fee`, etc.
   - User Role Tags: `account-manager`, `district-manager`, `billing-admin`, etc.
   - Process Tags: `workflow`, `approval`, `configuration`, `reporting`, etc.
   - Document Type Tags: `overview`, `specification`, `business-rule`, `user-guide`, etc.

3. MUST identify information quality and completeness:
   - Complete and detailed information
   - Partial information requiring enhancement
   - Outdated information requiring verification
   - Conflicting information requiring resolution

### Step 2: Check for Content Overlap with Existing Transformed Documents

1. MUST compare extracted information against already transformed documents:
   - Track which topics/subjects have already been documented
   - Identify information that complements existing documents
   - Flag potential duplications or conflicts
   - Note information gaps that the current document might fill

2. MUST develop a transformation strategy based on overlap analysis:
   - Create new documents for previously undocumented content
   - Enhance existing documents with additional details
   - Resolve conflicts with authoritative information
   - Consolidate duplicate information

## Content Transformation Process

### Step 3: Map Content to Target Document Types

1. MUST determine the appropriate document types for the extracted information:
   - **System Overview Documents** - For high-level system descriptions
   - **Business Rule Documents** - For business logic and calculation rules
   - **Technical Specification Documents** - For architecture and implementation details
   - **User Process Documents** - For user workflows and procedures
   - **Configuration Guide Documents** - For system configuration instructions

2. MUST prioritize document creation based on:
   - Information completeness
   - Current gaps in the transformed corpus
   - Logical dependencies between documents

### Step 4: Generate Target Documents

For each target document:

1. MUST select the appropriate template based on document type
2. MUST generate a file name following the pattern: `YYYYMMDD_[SystemName]_[DocumentType]_[FeatureName].md`
3. MUST create appropriate YAML frontmatter with:
   - Descriptive title
   - Clear description
   - Current date for created_date
   - Original document's date (if available) for source_date
   - Version set to 1.0
   - Status set to "Draft"
   - Source_documents listing original document filenames
   - Relevant systems, tags, and type-specific metadata

4. MUST transform content following the template structure:
   - Reorganize information into logical sections
   - Use consistent formatting and terminology
   - Include all relevant details from source document(s)
   - Note information gaps with "TODO" markers
   - Create appropriate cross-references

### Step 5: Resolve Duplications and Conflicts

1. When enhancing existing documents with new information:
   - MUST clearly integrate new content without disrupting existing structure
   - MUST indicate content origins in the frontmatter source_documents field
   - MUST update last_updated_date in the frontmatter
   - MUST increment the version number appropriately

2. When encountering conflicting information:
   - MUST note the conflict with a "VERIFICATION NEEDED" marker
   - MUST include both versions of information with sources
   - MUST prioritize more recent information when dates are available

3. When consolidating duplicate information:
   - MUST use the most complete and clear presentation of the information
   - MUST ensure all sources are credited in the frontmatter
   - MUST create appropriate cross-references to related documents

## Corpus Management Process

### Step 6: Track Transformation Progress

1. MUST maintain a transformation log with:
   - Source documents processed
   - Target documents created or enhanced
   - Content areas covered
   - Identified gaps requiring additional information
   - Conflicts or inconsistencies requiring resolution

2. MUST update the transformation log after each processing session

3. MUST generate a corpus status report showing:
   - Coverage metrics by system and document type
   - Quality assessment based on completeness and consistency
   - Critical gaps requiring prioritization
   - Conflict resolution status

### Step 7: Refine the Documentation Corpus

1. MUST periodically review the entire corpus to:
   - Standardize terminology and formatting
   - Enhance cross-referencing between documents
   - Resolve outstanding conflicts and verification markers
   - Fill information gaps through content synthesis

2. MUST prioritize refinement actions based on:
   - Critical knowledge gaps
   - User impact of missing information
   - Logical prerequisites for other documentation

## Document Placement Guidelines

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


## Cross-Referencing Requirements

1. MUST include a "Related Documentation" section in each document
2. MUST use relative Markdown links with descriptive text
3. MUST reference existing documentation impacted by the new content
4. MUST update existing documentation to reference new documents where appropriate

## Completion Criteria

The transformation process is complete when:

1. All source documents have been processed
2. All information has been organized into appropriate document types
3. No "TODO" or "VERIFICATION NEEDED" markers remain
4. Coverage assessment shows documentation for all systems and components
5. Cross-references are complete and consistent
6. No duplicate content exists across the corpus
7. Terminology and formatting are standardized throughout

### Completion Verification Checklist

To determine if no further refinement is needed, verify:

- [ ] **Document Coverage**: Every system, component, business rule, and user process has appropriate documentation
- [ ] **Content Completeness**: No information gaps exist within documents
- [ ] **Cross-Reference Integrity**: All references link to existing documents and sections
- [ ] **Terminology Consistency**: Terms are used consistently across all documents
- [ ] **Metadata Accuracy**: All frontmatter is complete and accurate
- [ ] **Structure Adherence**: All documents follow the appropriate templates
- [ ] **Duplication Elimination**: No redundant content exists across documents
- [ ] **Conflict Resolution**: All conflicting information has been resolved

## Transformation Examples

### ✅ CORRECT: Source Document Analysis

Source Document: "20250513\_Master - General\_Info.md" Primary Purpose: System overview and context Content Categories:

*   System descriptions (Billing, Forecasting)
*   Business context (Contract types, operational management)
*   High-level architecture
*   Strategic business drivers

Information Quality: High-quality, comprehensive overview Overlap Status: Partial overlap with existing system overview documents Transformation Strategy: Create/enhance system overview documents and extract business rule information into separate documents


### ✅ CORRECT: Document Transformation

**Original Content:**
```markdown
**Core Initiative:** A strategic modernization of Towne Park's financial operations, commencing with the transformation of its $1 billion annual revenue billing system and extending to the development of a deeply integrated forecasting solution.

**Key Technologies:** Microsoft Power Platform (Dataverse, Power Automate), a custom React front-end, and a suite of Azure Cloud Services including Azure Static Web Apps, Azure Functions (.NET for primary backend, Node.js for specific services), Azure Container Apps, Azure Blob Storage, and Azure Logic Apps. Integration with on-premises systems is facilitated by the On-Premises Data Gateway.


## Transformed Content:
---
title: "Towne Park Financial Systems - Technical Architecture Overview"
description: "Overview of the technical architecture for Towne Park's billing and forecasting systems"
created_date: 2025-07-14
last_updated_date: 2025-07-14
source_date: 2025-05-13
version: 1.0
status: Draft
source_documents:
  - "20250513_Master - General_Info.md"
systems:
  - Billing
  - Forecasting
components:
  - Frontend
  - Backend
  - Integration
  - Database
tags:
  - architecture
  - overview
  - technical
---

# Towne Park Financial Systems - Technical Architecture Overview

## System Purpose

Towne Park's financial systems represent a strategic modernization initiative for the company's financial operations. This transformation begins with the $1 billion annual revenue billing system and extends to a deeply integrated forecasting solution.

## Architecture Components

### Platform Foundation

The systems are built on Microsoft Power Platform, specifically leveraging:

- **Dataverse**: Core data storage and business logic
- **Power Automate**: Workflow automation and integrations

### Frontend Architecture

- **Framework**: Custom React front-end
- **Hosting**: Azure Static Web Apps

### Backend Services

The backend consists of several Azure services:

- **Azure Functions**: 
  - Primary business logic implemented in .NET
  - Specialized services using Node.js
- **Azure Container Apps**: For containerized services
- **Azure Blob Storage**: Document and file storage
- **Azure Logic Apps**: Integration workflows and scheduling

### On-Premises Integration

Integration with on-premises systems is facilitated by the On-Premises Data Gateway, enabling secure connectivity between cloud services and on-premises data sources.

## Related Documentation

- [Billing System Overview](../billing/overview.md)
- [Forecasting System Overview](../forecasting/overview.md)
- [Integration Architecture Details](../../technical/integrations/on-premises-integration.md)

### ❌ INCORRECT: Poor Document Transformation

---
title: "Towne Park Info"
created_date: 2025-07-14
---

# Towne Park Financial Systems

This is a strategic modernization of Towne Park's financial operations.

## Technologies

- Microsoft Power Platform
- React
- Azure services

## AI Verification Steps

### 

<thinking> Before finalizing document transformation, I must verify:

1.  Have I thoroughly analyzed the source document's content and purpose?
2.  Have I identified all relevant information categories and quality issues?
3.  Have I checked for overlap with existing transformed documents?
4.  Have I selected the appropriate target document types?
5.  Have I created proper frontmatter with all required metadata?
6.  Have I structured the content according to the templates?
7.  Have I handled any duplications or conflicts appropriately?
8.  Have I created comprehensive cross-references?
9.  Have I placed the documents in the correct directories?
10.  Have I updated the transformation log to track progress?
11.  Have I identified any information gaps or verification needs?
12.  Have I standardized terminology and formatting throughout? </thinking>

## Process Summary

### 

1.  Analyze source documents to understand content and quality
2.  Check for overlap with existing transformed documents
3.  Map content to appropriate target document types
4.  Generate structured documents using templates
5.  Resolve duplications and conflicts
6.  Track transformation progress and corpus status
7.  Refine the documentation corpus iteratively
8.  Verify completion criteria