# Towne Park Financial System - AI in SDLC Strategy Meeting Documentation

**Document ID:** 20250612_AI_SDLC_Strategy_1
**Created:** 2025-06-12
**Last Updated:** 2025-06-12
**Content Coverage Period:** 2025-06-12
**Primary Systems Covered:** Development Infrastructure
**Subsystems Discussed:** AI Tools, Claude/Cursor, Root Code, MCP Servers, Azure DevOps Integration
**Product Owners Present:** No
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures a comprehensive discussion about AI tool implementation in the Software Development Life Cycle at Towne Park. The team demonstrated significant advances in using Claude, Cursor, and Root Code for development tasks, including automated task generation, code implementation, unit testing, and PR creation. Key innovations include MCP (Model Context Protocol) servers for Azure DevOps integration and structured markdown files for providing AI context. The meeting revealed mature AI integration practices that have substantially increased development velocity. This content is based on 1 meeting transcript lasting 1 hour 35 minutes.

**Key Decisions Made:**
- AI training strategy will go through communities, not T3 sessions
- Markdown context files (.clinerules, .cursorrules) established as standard
- MCP servers adopted for external system integration
- Root Code selected for customization capabilities over Cursor

**Open Issues/Risks:**
- Power Platform MCP server not yet available
- Consistency between code and architecture diagrams
- Token usage optimization with different models
- Hallucination management in AI responses

**Integration Points Discussed:**
- Azure DevOps via MCP
- SharePoint document access
- Power Platform (future)
- Eraser.io for diagramming

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250612_AI_SDLC_Strategy_1 | 2025-06-12 | Strategy Meeting | Jonathan Aulson, Johnn Hesseltine, Andrew Scheuer, Javier Casas, Cesar Figueroa | Jonathan Aulson, Johnn Hesseltine | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D012 | Decision | 2025-06-12 | AI training through communities, not T3 | Approved | Training | Cesar Figueroa | Ben/Mark | - |
| D013 | Decision | 2025-06-12 | Markdown files for AI context standard | Implemented | Development | Andrew Scheuer | Team | 2025-06-12 |
| D014 | Decision | 2025-06-12 | MCP servers for external integration | Implemented | Integration | Andrew Scheuer | - | 2025-06-12 |
| I007 | Issue | 2025-06-12 | Power Platform MCP not available | Open | Power Platform | Johnn Hesseltine | - | - |
| R004 | Risk | 2025-06-12 | AI hallucinations in generated code | Mitigating | Development | Javier Casas | Team | - |

## 1. AI Implementation Strategy

### 1.1. Organizational Approach

#### 1.1.1. Community-Based Training Strategy

**Source Document(s):** `20250612_AI_SDLC_Strategy_1`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Cesar Figueroa (Developer)`, `Jonathan Aulson (Business Analyst)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Approved`
**Tags:** `#strategy` `#training` `#community` `#AI`
**Decision Log References:** `D012`

Cesar outlined the organizational strategy: "I believe that the latest strategy to install implementing AI tools is through the community. The reason that I use the solution architecture meeting to to share what we are using is because I was requested from Ben and then like to do a brainstorming session to see what all the teams are using related with AI."

Process steps identified:
1. Recognition phase - documenting current AI usage
2. Ben and Mark compile training strategy with Darren
3. Meeting with community leaders to sync information
4. Training rollout through communities firm-wide

Jonathan acknowledged a misstep: "I think I may have stepped on toes by doing AT3 on this topic. I think that was a misstep, but Oh well... I don't know that the T threes still exist anymore."

### 1.2. Development Tool Implementation

#### 1.2.1. Context Files for AI Assistance

**Source Document(s):** `20250612_AI_SDLC_Strategy_1`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Andrew Scheuer (Developer)`, `Javier Casas (Developer)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#technical` `#AI` `#development` `#bestpractice` `#markdown`
**Decision Log References:** `D013`

Andrew explained their approach to improving AI output: "In order for it to know where to put this stuff and not try to reinvent the wheel every single time that we ask the question, we had to give it some context and so by doing that. And then I included two files. One is a project summary which is. I actually got this from Allata bot with the the persona, the the data that was created by John."

**Key Implementation Details:**

Project Summary File (.clinerules):
- Business context (per labor hour, fixed fee, etc.)
- Client information
- Project purpose and goals
- Domain-specific terminology

Coding Guidelines File:
- General standards
- Subfolder structure
- Front-end specifications
- Mapping/DTO patterns
- Unit testing guidelines
- Clean architecture descriptions

Andrew emphasized continuous improvement: "And this stuff, these two files, they live in the repo. So every time that someone's using this and they find while clients consistently putting this in their own place, we add another rule. And in my experience, it's it's continually gotten better."

#### 1.2.2. MCP Server Integration

**Source Document(s):** `20250612_AI_SDLC_Strategy_1`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Andrew Scheuer (Developer)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#technical` `#integration` `#MCP` `#azuredevops` `#API`
**Decision Log References:** `D014`

Andrew introduced a significant innovation: "But what has come around recently in the past like couple months has been something called MCP servers and those enabled the LLM to communicate with outside. It's like an API for LLMS."

**MCP Implementation Benefits:**
- Direct Azure DevOps integration
- Automated task creation from user stories
- 16 tasks generated in 5 minutes
- Planning vs. Act modes for different workflows

Johnn asked about capabilities: "Is the Azure MCP. For the ADOMCP, I guess is it it's able to create the tasks on the stories for you?"

Andrew confirmed: "Yeah, yeah. So you can you you there's the incline to have the planning and act mode. So in just in the planning mode it took in the user story and it broke it up into like a markdown file."

## 2. Tool Selection and Configuration

### 2.1. Root Code vs Cursor Analysis

#### 2.1.1. Tool Comparison and Selection

**Source Document(s):** `20250612_AI_SDLC_Strategy_1`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Javier Casas (Developer)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Analyzed`
**Tags:** `#tools` `#comparison` `#rootcode` `#cursor` `#claude`

Javier explained Root Code's origins and advantages: "Roocode was original name originally named Roocline because it was a fork of client, but the difference is the the amount of options that you have to customize the requests, the models that you use. How do you want this assistant to interact with you? For example, you have four different modes. In client you only have two planning and act."

**Root Code Advantages:**
- Four interaction modes vs. two in Claude
- Custom mode creation
- Different LLM models per mode
- Alata API key/copilot license integration
- Greater customization capability

Javier noted: "GPP made a comparison between different models and tools and the most... customizable was Visual Studio with root code or client and it didn't say that cursor was bad or it just said it's. It's a different approach, it's just with less detailed definition capability."

### 2.2. Practical Implementation Examples

#### 2.2.1. Automated Development Workflow

**Source Document(s):** `20250612_AI_SDLC_Strategy_1`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Andrew Scheuer (Developer)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#workflow` `#automation` `#development` `#productivity`

Andrew demonstrated the workflow efficiency: "This in conjunction with John, who's writing extremely detailed user stories with a lot of really good acceptance criteria. It's got to the point where I can then go, OK, do for example, I'm working right now on task 2221, I can just say. Implement 2221 and with all of this context that we have, it knows it has to create an endpoint."

**Workflow Steps:**
1. Reference task number with context
2. AI generates code in correct locations
3. Generate unit tests automatically
4. Run and verify functionality
5. Create PR with proper formatting

Results: "And next my next step is create unit tests. Um. And then you can run this and then like many times it just works. And so that's increased my velocity a lot more."

#### 2.2.2. PR Generation and Documentation

**Source Document(s):** `20250612_AI_SDLC_Strategy_1`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Andrew Scheuer (Developer)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Implemented`
**Tags:** `#documentation` `#PR` `#automation` `#quality`

Andrew shared PR automation: "So I've been using them for PRS to make the PRS just cause it it helps. We're really busy and so it helps us describe a feature so that Chris and Cesar don't want to pull their hair out that much when they're actually having a review."

Using commit guidelines and Azure DevOps MCP: "Formatted template PR that's easy to read. It kind of describes what has been changed in the code, if it's a new feature, bug fix... And so it kind of makes a in, you know, 30 seconds, it makes a comprehensive PR that makes reading this mess a little bit easier."

## 3. Technical Documentation Innovation

### 3.1. Automated Architecture Documentation

#### 3.1.1. Eraser.io Integration for Diagramming

**Source Document(s):** `20250612_AI_SDLC_Strategy_1`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Cesar Figueroa (Developer)`, `Johnn Hesseltine`
**Version/Status:** `v1.0 - Demonstrated`
**Tags:** `#documentation` `#architecture` `#diagramming` `#automation`
**Integration Points:** `Eraser.io`

Cesar demonstrated documentation automation: "And then the fun part is this pager can be used in other tools. To provide more context like for example this tool that is called eraser. Eraser helps you to create. Diagrams based it on on your input."

**Capabilities Demonstrated:**
- Cloud architecture diagrams
- Flow diagrams
- Entity relationship diagrams
- Model visualization
- Iterative refinement based on input

Process: "You click on generate. In this generate first will be iterating in your input and if there is any information that you need to provide is is answer you back to provide additional context."

Johnn noted the gap with standard tools: "Thing about eraser is like or well, you know, so the thing Sasar is like it doesn't sound like we have this capability from like a Miro perspective. Right, which is. Allegedly what the the diagramming tool is in the in the firm."

### 3.2. Hallucination Management

#### 3.2.1. Context Education Strategy

**Source Document(s):** `20250612_AI_SDLC_Strategy_1`
**Date Discussed/Decided:** `2025-06-12`
**Key Stakeholders Involved:** `Javier Casas (Developer)`, `Andrew Scheuer (Developer)`
**Version/Status:** `v1.0 - Ongoing`
**Tags:** `#quality` `#AI` `#hallucination` `#bestpractice`
**Decision Log References:** `R004`

Javier emphasized ongoing education: "By by my side in the future, there's something important that Andrew mentioned today when we were talking about possible MCP for importing VO. Components was we have to keep educating the the rules and the context that we give to root code or client for it stop this. Hallucinations."

**Mitigation Strategies:**
- Continuous rule refinement
- Specific context provision
- Validation of generated code
- Team knowledge sharing
- Documentation of common issues

## Cross-Reference Index

### By Feature
- AI Training → Section 1.1.1
- Development Tools → Section 1.2.1, Section 2.1.1
- Task Automation → Section 1.2.2, Section 2.2.1
- Documentation → Section 3.1.1

### By Integration Point
- Azure DevOps → Section 1.2.2
- Eraser.io → Section 3.1.1
- Power Platform → Executive Summary (future)

### By Stakeholder
- Jonathan Aulson (Business Analyst) → Section 1.1.1
- Andrew Scheuer → Section 1.2.1, Section 1.2.2, Section 2.2.1, Section 2.2.2
- Javier Casas → Section 2.1.1, Section 3.2.1
- Cesar Figueroa → Section 1.1.1, Section 3.1.1
- Johnn Hesseltine → All sections

### By Decision Date
- 2025-06-12 → Section 1.1.1, Section 1.2.1, Section 1.2.2

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| MCP | Model Context Protocol - API for LLMs to communicate with external systems | Section 1.2.2 |
| Roo Code/Roocline | Fork of Claude with enhanced customization capabilities | Section 2.1.1 |
| T3 | Legacy training session format at firm | Section 1.1.1 |
| DTO | Data Transfer Object | Section 1.2.1 |
| VODTO | View Object Data Transfer Object | Section 1.2.1 |
| Mapperly | Object mapping library | Section 1.2.1 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-12 | Meeting Transcript | Initial AI in SDLC strategy documentation |
