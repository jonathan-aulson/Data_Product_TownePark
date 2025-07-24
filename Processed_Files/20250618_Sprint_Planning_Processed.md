# Towne Park Financial System - Sprint Planning Documentation

**Document ID:** 20250618_Forecasting_SprintPlanning_28
**Created:** 2025-06-18
**Last Updated:** 2025-06-18
**Content Coverage Period:** 2025-06-18
**Primary Systems Covered:** Forecasting
**Subsystems Discussed:** Internal Revenue, Management Agreements, Per Labor Hour, AI Tools
**Product Owners Present:** No
**Business Analyst Present:** Yes: Jonathan Aulson
**Document Status:** Approved

## Executive Summary

This document captures Sprint 28 planning focused on Internal Revenue stories for management agreements and per labor hour implementations. The session included significant discussion about AI tool configuration (Root Code, Claude, Cursor) and model selection strategies. The team demonstrated mature AI-assisted development practices with specific configuration recommendations for different LLM models. A follow-up tasking session was scheduled to leverage AI for task breakdown. This content is based on 1 meeting transcript lasting 1 hour 22 minutes 28 seconds.

**Key Decisions Made:**
- Internal Revenue stories prioritized as highest priority for Sprint 28
- AI model configuration standardized with named profiles
- Tasking session scheduled immediately following planning
- Transcript access to be provided for AI-assisted task generation

**Open Issues/Risks:**
- Limited front-end work for Javier in this sprint
- Payroll feature completion timeline
- Internal Revenue complexity requiring detailed tasking

**Integration Points Discussed:**
- Management agreement calculations
- Per labor hour integrations
- AI tool APIs (Anthropic, OpenAI, Alata)

## Source Documents Registry

| Document ID | Meeting Date | Meeting Type | Participants | Key Stakeholders Present | Source URL |
|-------------|--------------|--------------|--------------|--------------------------|------------|
| 20250618_Forecasting_SprintPlanning_28 | 2025-06-18 | Sprint Planning | Jonathan Aulson, Andrew Scheuer, Javier Casas, Christopher Thompson, Graham Olson, Cesar Figueroa | Jonathan Aulson | [SharePoint URL] |

## Decision/Issue/Risk Log

| ID | Type | Date | Description | Status | Affected Features | Raised By | Resolution Owner | Resolution Date |
|----|------|------|-------------|--------|-------------------|-----------|------------------|-----------------|
| D016 | Decision | 2025-06-18 | Internal Revenue highest priority for Sprint 28 | Approved | Internal Revenue | Jonathan Aulson | Team | 2025-06-18 |
| D017 | Decision | 2025-06-18 | Tasking session in one hour | Scheduled | All Sprint 28 | Andrew Scheuer | Team | 2025-06-18 |
| I010 | Issue | 2025-06-18 | Limited front-end work available | Acknowledged | Front-end | Jonathan Aulson | - | - |

## 1. Sprint 28 Planning

### 1.1. Sprint Overview

#### 1.1.1. Internal Revenue Priority Stories

**Source Document(s):** `20250618_Forecasting_SprintPlanning_28`
**Date Discussed/Decided:** `2025-06-18`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, Team
**Version/Status:** `v1.0 - Planned`
**Tags:** `#sprint` `#planning` `#internalrevenue` `#priority`
**Decision Log References:** `D016`

Jonathan set the sprint context: "Sprint planning for Sprint 28. We've got we've got a couple old classics that have come back. This is the Internal Revenue. Story continuing on with management agreement and per labor hour. This is probably the my highest priority for us to get through, so let me walk us through that."

He acknowledged resource constraints: "Javi, I'm worried you're going to be bored this Sprint. I don't think we have much front end work."

Javier responded optimistically: "Don't worry. Don't worry, I don't if I'm gonna ever finish the payroll."

**Sprint Focus:**
- Internal Revenue calculations
- Management agreement implementation
- Per labor hour functionality
- Limited front-end work

### 1.2. Tasking Session Planning

#### 1.2.1. AI-Assisted Tasking Approach

**Source Document(s):** `20250618_Forecasting_SprintPlanning_28`
**Date Discussed/Decided:** `2025-06-18`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Andrew Scheuer (Developer)`, `Cesar Figueroa (Developer)`
**Version/Status:** `v1.0 - Scheduled`
**Tags:** `#planning` `#tasking` `#AI` `#collaboration`
**Decision Log References:** `D017`

Jonathan requested inclusion: "Awesome. If I could, I'd love to sit in on the tasking stuff. If I if I could get added to it whenever it gets created."

Andrew coordinated timing: "Yeah. Do you guys wanna meet in an hour?"

The team agreed on timing considerations:
- One hour break for lunch
- Cesar to schedule the meeting
- Jonathan to provide transcript access for AI analysis

Andrew made a specific request: "And you, oh, John, could you make sure if I'm not already that you give me access to this transcript? Does that use it to help with the transcan?"

## 2. AI Tool Configuration Discussion

### 2.1. Root Code Configuration

#### 2.1.1. Model Selection and API Configuration

**Source Document(s):** `20250618_Forecasting_SprintPlanning_28`
**Date Discussed/Decided:** `2025-06-18`
**Key Stakeholders Involved:** `Javier Casas (Developer)`, `Andrew Scheuer (Developer)`, `Jonathan Aulson (Business Analyst)`
**Version/Status:** `v1.0 - Configured`
**Tags:** `#technical` `#AI` `#configuration` `#rootcode` `#API`

The team engaged in detailed AI tool configuration discussion. Andrew asked: "Hobby in root, Klein. How do you change the model? Where's that?"

Javier provided detailed guidance: "You can see at the bottom where you can choose the mode. Right next to it is the model that you want to use in that mode. So you can choose different models for modes."

**Configuration Details:**
- Mode selection at bottom of interface
- Different models assignable per mode
- API selection in model configuration
- Named profile saving capability

Jonathan inquired about API setup: "Where do I set my API key for root code if I'm using the GitHub code?"

Javier clarified options: "Instead of on traffic, you could use the BS code LM API. If you are signed in with your Aleida account, right?"

#### 2.1.2. Model Profile Management

**Source Document(s):** `20250618_Forecasting_SprintPlanning_28`
**Date Discussed/Decided:** `2025-06-18`
**Key Stakeholders Involved:** `Javier Casas (Developer)`
**Version/Status:** `v1.0 - Best Practice`
**Tags:** `#configuration` `#bestpractice` `#AI` `#models`

Javier explained profile management: "There at that menu you can save as many as models as you want. At the top you can select the. The API, the language model. And if you click on plus you will save this specific configuration with a a name of your. You're going to be asked to to set a name when you click on, yeah."

**Naming Suggestions:**
"GPT 4.1 allata" - For Alata API usage
"GPT 4.1 open router" - For OpenRouter credits
Custom names for easy identification

Benefits:
- Multiple model configurations saved
- Easy switching between providers
- Cost optimization per use case
- Clear identification of configurations

### 2.2. Development Workflow Integration

#### 2.2.1. AI Integration with Story Implementation

**Source Document(s):** `20250618_Forecasting_SprintPlanning_28`
**Date Discussed/Decided:** `2025-06-18`
**Key Stakeholders Involved:** `Jonathan Aulson (Business Analyst)`, `Andrew Scheuer (Developer)`
**Version/Status:** `v1.0 - Established`
**Tags:** `#workflow` `#development` `#AI` `#integration`

The discussion revealed mature AI-assisted development practices:

1. **Story to Task Flow:**
   - Detailed user stories provided by Jonathan
   - AI-assisted task breakdown in tasking session
   - Transcript used as context for AI

2. **Implementation Support:**
   - Root Code for development
   - Multiple model options per task type
   - Configuration profiles for different scenarios

3. **Collaboration Enhancement:**
   - Transcript sharing for context
   - AI-assisted task generation
   - Team alignment through shared tools

## Cross-Reference Index

### By Feature
- Internal Revenue → Section 1.1.1
- Management Agreements → Section 1.1.1
- Per Labor Hour → Section 1.1.1
- Payroll → Section 1.1.1

### By Integration Point
- AI Tools → Section 2.1.1, Section 2.1.2
- Anthropic API → Section 2.1.1
- Alata API → Section 2.1.1
- OpenRouter → Section 2.1.2

### By Stakeholder
- Jonathan Aulson (Business Analyst) → All sections
- Andrew Scheuer → Section 1.2.1, Section 2.1.1
- Javier Casas → Section 1.1.1, Section 2.1.1, Section 2.1.2
- Cesar Figueroa → Section 1.2.1

### By Decision Date
- 2025-06-18 → Section 1.1.1, Section 1.2.1

## Glossary & Terminology

| Term/Acronym | Definition | First Referenced In |
|--------------|------------|---------------------|
| Roo Code/Cline | AI development assistant tool | Section 2.1.1 |
| VS code LM API | Alata's language model API | Section 2.1.1 |
| Model Profile | Saved configuration for AI model usage | Section 2.1.2 |
| Anthropic | AI company providing Claude models | Section 2.1.1 |
| OpenRouter | Third-party API aggregator for various LLMs | Section 2.1.2 |

## Document History & Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-18 | Meeting Transcript | Sprint 28 planning documentation |

