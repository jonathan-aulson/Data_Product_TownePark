# Towne Park Financial System - RSS Issue Technical Meeting Documentation

**Document ID:** 20250611_RSS_TechnicalIssue_1
**Created:** 2025-06-11
**Last Updated:** 2025-06-11
**Content Coverage Period:** 2025-06-11
**Primary Systems Covered:** Billing (RSS)
**Subsystems Discussed:** SharePoint Integration, Webhook Processing, PowerShell Scripts
**Product Owners Present:** No
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures the technical investigation and resolution of RSS (Revenue Summary Sheet) submission issues for site 8725. The issue involved webhook processing failures due to incorrect file metadata (missing file extension in title). The investigation revealed timing issues with file modifications and webhook triggers, as well as the need for specific metadata formatting. This content is based on 1 meeting transcript lasting approximately 20 minutes.

**Key Decisions Made:**
- File titles must include file extension (.xlsm) for proper processing
- Reject and resubmit workflow confirmed as temporary workaround
- Delete workflow remains off unless needed for manual cleanup

**Open Issues/Risks:**
- Users modifying files after submission causing webhook failures
- Timing issues between submission and modification events
- Metadata requirements not clearly communicated to users

**Integration Points Discussed:**
- SharePoint to Dataverse synchronization
- PowerShell script scheduling
- Webhook event processing

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250611_RSS_TechnicalIssue_1 | 2025-06-11 | Technical Investigation | Jonathan Aulson, Zakary Welch, Cesar Figueroa | Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| I004 | Issue | 2025-06-11 | Site 8725 RSS file not processing due to missing .xlsm in title | Resolved | RSS Submission | Amy Sowells | Zakary Welch | 2025-06-11 |
| I005 | Issue | 2025-06-11 | Files modified within minute of submission bypass webhook | Open | RSS Submission | Zakary Welch | - | - |
| R002 | Risk | 2025-06-11 | User modifications after submission can prevent processing | Open | RSS Submission | Zakary Welch | Amy Sowells | - |
| D008 | Decision | 2025-06-11 | Delete workflow to remain off unless manual cleanup needed | Approved | RSS Submission | Zakary Welch | - | 2025-06-11 |

## 1. RSS Submission Issue Investigation

### 1.1. Initial Problem Identification

#### 1.1.1. SharePoint to Dataverse Synchronization Issue

**Source Document(s):** `20250611_RSS_TechnicalIssue_1`
**Date Discussed/Decided:** `2025-06-11`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Zakary Welch (Technical)`, `Cesar Figueroa (Developer)`
**Version/Status:** `v1.0 - Investigated`
**Tags:** `#issue` `#technical` `#billing` `#sharepoint` `#dataverse` `#integration`
**Integration Points:** `SharePoint` `Dataverse` `PowerShell`
**Decision Log References:** `I004`

Zakary explained the investigation approach: "Invoice checklist history that comes from the the PowerShell script. And that can identify if something got picked up by the PowerShell script but did not get picked up by our webhook potentially."

The investigation revealed discrepancies between SharePoint and Dataverse: "So there's what did we find in SharePoint that's not in Dataverse and what do we find in Dataverse that's not in SharePoint."

**Technical Details:**
- 677 entries found in the system
- Site 8725 identified as problematic
- PowerShell script has exclusive date range pickup

### 1.2. Root Cause Analysis

#### 1.2.1. File Modification Timing Issue

**Source Document(s):** `20250611_RSS_TechnicalIssue_1`
**Date Discussed/Decided:** `2025-06-11`
**Key Stakeholders Involved:** `Zakary Welch (Technical)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Identified`
**Tags:** `#issue` `#technical` `#webhook` `#timing` `#modification`
**Integration Points:** `SharePoint` `Webhook`
**Decision Log References:** `I005` `R002`

Zakary identified a critical timing issue: "So most of these like what happened was the file was submitted and then. It was modified it like within a minute afterwards, basically before the webhook triggered and when the webhook triggers, it checks that the status has been changed and so it's going to get the latest version and then the previous version and since something was modified other than the submissions, the doc status, then it says, oh, it wasn't changed, we're not doing something."

He noted: "It was Amy's understanding that users shouldn't really be able to modify anything on the file after submitting it."

**Key Findings:**
- Files modified within 1 minute of submission
- Webhook checks latest vs previous version
- Non-status modifications prevent processing
- User behavior contradicts system expectations

#### 1.2.2. Missing File Extension in Title

**Source Document(s):** `20250611_RSS_TechnicalIssue_1`
**Date Discussed/Decided:** `2025-06-11`
**Key Stakeholders Involved:** `Zakary Welch (Technical)`, `Jonathan Aulson (Business Analyst)`, `Cesar Figueroa (Developer)`
**Version/Status:** `v1.0 - Resolved`
**Tags:** `#issue` `#technical` `#metadata` `#validation` `#resolution`
**Integration Points:** `SharePoint` `Power Automate`
**Decision Log References:** `I004`

Through detailed log analysis, the team discovered the root cause. Zakary found: "Processing one changed item. Processing item 3. Oh, invalid title. Why is that an invalid title? Let's look closely at that. 108725 Rev. Will not process for invoicing. Why is that invalid though?"

After comparing expected vs actual values: "So we have. Expected item title. Oh, did it have the this on the end? Maybe that's the issue... Yeah, that's I think that's the issue. So it's it was missing [the .xlsm extension]."

**Technical Implementation Details:**
Expected: "108725 Rev.xlsm" (full filename and extension) Actual: "108725 Rev" (was missing extension in filename)

**Resolution:**
- File title must include file extension
- User needs to edit title and resubmit
- Validation occurs in Power Automate flow

### 1.3. Troubleshooting Tools and Methods

#### 1.3.1. Script Repository and Access

**Source Document(s):** `20250611_RSS_TechnicalIssue_1`
**Date Discussed/Decided:** `2025-06-11`
**Key Stakeholders Involved:** `Zakary Welch (Technical)`
**Version/Status:** `v1.0 - Available`
**Tags:** `#technical` `#tools` `#scripts` `#sharepoint`

Zakary provided information about troubleshooting resources: "I've got a couple of scripts here and they all live on the on the Elata SharePoint side if you guys ever want to pull them or do anything with them."

**Available Tools:**
- PowerShell scripts for invoice checklist history
- Graph API authentication scripts
- Azure Storage Explorer for log analysis
- Power Automate flow run investigation

#### 1.3.2. Log Analysis Process

**Source Document(s):** `20250611_RSS_TechnicalIssue_1`
**Date Discussed/Decided:** `2025-06-11`
**Key Stakeholders Involved:** `Zakary Welch (Technical)`
**Version/Status:** `v1.0 - Documented`
**Tags:** `#technical` `#troubleshooting` `#logs` `#azure`
**Integration Points:** `Azure Storage` `Power Automate`

Zakary demonstrated the investigation process using Azure Storage Explorer: "So from here we can dig into the logs a little bit to kind of try and see what's going on. So I use the Azure Storage Explorer... We will go to RSS prod. Tables. We can look at event handler logs."

**Log Analysis Steps:**
1. Access Azure Storage Explorer
2. Navigate to RSS prod tables
3. Filter event handler logs by site number
4. Review flow run IDs and timestamps
5. Trace through Power Automate execution

## 2. System Architecture and Workflows

### 2.1. Webhook Processing Flow

#### 2.1.1. Event Handler Architecture

**Source Document(s):** `20250611_RSS_TechnicalIssue_1`
**Date Discussed/Decided:** `2025-06-11`
**Key Stakeholders Involved:** `Zakary Welch (Technical)`, `Cesar Figueroa (Developer)`
**Version/Status:** `v1.0 - Documented`
**Tags:** `#technical` `#architecture` `#webhook` `#powerautomate`
**Integration Points:** `SharePoint` `Power Automate` `Graph API`

The investigation revealed the webhook processing flow: "All right, so it's going to do the same thing. It does like the graph API authenticate. And then it's gonna get a list of items that were updated on that list. And then for each of those items... We're getting the delta tokens. That's like what has changed."

**Processing Flow:**
1. Graph API authentication
2. Get list of updated items
3. Retrieve delta tokens for changes
4. Validate item metadata
5. Process or reject based on validation

### 2.2. Workflow Management

#### 2.2.1. Delete Workflow Configuration

**Source Document(s):** `20250611_RSS_TechnicalIssue_1`
**Date Discussed/Decided:** `2025-06-11`
**Key Stakeholders Involved:** `Cesar Figueroa (Developer)`, `Zakary Welch (Technical)`
**Version/Status:** `v1.0 - Configured`
**Tags:** `#technical` `#workflow` `#configuration` `#maintenance`
**Decision Log References:** `D008`

Cesar asked about workflow status: "Right now going to that pipeline have a bug. Sometimes that turn off some workflows. I saw your solution and there are three workflows and only two of them are. Are on. Can you check if that is correct or I need to turn on some?"

Zakary clarified: "Oh, that's probably correct. Let's see here. I mean, I guess is 1 like the delete. Yeah, yeah, we just have that off. That's you can turn that on and manually run it to just clear out the subscriptions, the web hooks... Exactly. Yeah. It's yeah on demand. So it's a tool for us to support."

**Configuration Details:**
- Three workflows total in solution
- Two workflows remain active
- Delete workflow off by default
- Delete workflow for manual/on-demand cleanup only

## Cross-Reference Index

### By Feature
- RSS Submission → All sections
- Webhook Processing → Section 1.2.1, Section 2.1.1

### By Integration Point
- SharePoint → Section 1.1.1, Section 1.2.1, Section 1.2.2, Section 2.1.1
- Dataverse → Section 1.1.1
- PowerShell → Section 1.1.1, Section 1.3.1
- Power Automate → Section 1.2.2, Section 1.3.2, Section 2.1.1
- Graph API → Section 2.1.1
- Azure Storage → Section 1.3.2

### By Stakeholder
- Jonathan Aulson (Business Analyst) → All sections
- Zakary Welch → All sections
- Cesar Figueroa → Section 1.1.1, Section 1.2.2, Section 2.2.1
- Amy Sowells (mentioned) → Section 1.2.1

### By Decision Date
- 2025-06-11 → Section 1.2.2, Section 2.2.1

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| RSS | Revenue Summary Sheet | Title |
| Webhook | Event-driven HTTP callback | Section 1.1.1 |
| Delta tokens | Tokens indicating what has changed in SharePoint | Section 2.1.1 |
| Graph API | Microsoft Graph API for accessing Microsoft 365 data | Section 2.1.1 |
| Flow run ID | Unique identifier for Power Automate flow execution | Section 1.3.2 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-11 | Meeting Transcript | Initial technical investigation documentation |

