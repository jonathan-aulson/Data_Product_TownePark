---
title: "Towne Park Development Standards - Comprehensive Guide"
description: "Complete development guidelines, standards, and best practices for Towne Park billing and forecasting systems"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-07-18
version: 1.0
status: Draft
owner: "Development Team"
source_documents:
  - "CLAUDE.md"
systems:
  - Billing
  - Forecasting
components:
  - Frontend
  - Backend
  - Testing
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Development Operations
  - Quality Assurance
user_roles:
  - Developer
  - Technical Lead
  - DevOps Engineer
  - Quality Assurance
tags:
  - development-standards
  - configuration
  - best-practices
  - architecture
  - workflow
---

# Towne Park Development Standards - Comprehensive Guide

## Overview

This document provides comprehensive development guidelines, standards, and best practices for Towne Park's billing and forecasting system modernization project. The project transitions from Excel-based processes to a cloud-based solution using Microsoft Power Platform and Azure.

## Project Context

Towne Park is a hospitality and healthcare services company specializing in parking management, serving over 700 customer sites. This modernization effort encompasses both billing system automation and forecasting capabilities to support business operations at scale.

## Technology Stack

### Frontend Architecture
- **Framework**: React with TypeScript
- **Component Library**: ShadCN components
- **Styling**: Tailwind CSS
- **Testing**: Jest and React Testing Library
- **State Management**: React Context for global state

### Backend Architecture
- **Runtime**: .NET Azure Functions
- **Data Access**: Entity Framework with Dataverse
- **Testing**: xUnit testing framework
- **Dependency Injection**: Constructor injection pattern
- **Mapping**: Mapperly for all object mapping

### Cloud Infrastructure
- **Platform**: Microsoft Azure
- **Data Storage**: Dataverse
- **Authentication**: Azure Static Web App authentication
- **Integration**: Power Platform connectors

## Git Workflow and Branch Management

### Branch Structure and Rules

#### Hierarchical Branch Model
```
develop ← feature/* ← task/*
```

#### Critical Branch Rules
- 🚫 **NEVER create PRs targeting `master` branch**
- ✅ **Maximum target**: `develop` branch for all developer PRs
- **Task branches** (`task/*`): Target parent feature branch, link Task work items
- **Feature branches** (`feature/*`): Target `develop` branch, link User Story work items

#### Branch Naming Conventions
- **Task branches**: `task/[task-id]-[brief-description]`
- **Feature branches**: `feature/[user-story-id]-[brief-description]`

### Commit Message Standards

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) specification:

#### Commit Types
- `feat`: New feature implementation
- `fix`: Bug fix resolution
- `refactor`: Code refactoring without functionality changes
- `test`: Adding or modifying tests
- `docs`: Documentation updates
- `style`: Code formatting changes (no logic changes)
- `chore`: Maintenance tasks and build updates

#### Commit Message Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Examples
```
feat(billing): add revenue share calculation logic
fix(auth): resolve token expiration handling
refactor(contracts): extract common validation logic
test(forecasting): add unit tests for data aggregation
docs(api): update endpoint documentation
```

## Code Quality Standards

### General Development Principles

#### Core Principles
- **DRY (Don't Repeat Yourself)**: Eliminate code duplication
- **KISS (Keep It Simple, Stupid)**: Favor simple solutions
- **YAGNI (You Aren't Gonna Need It)**: Avoid premature optimization
- **Single Responsibility**: Each component/function has one clear purpose
- **Maintainability**: Write code for future developers
- **Readability**: Code should be self-documenting

#### Design Patterns
- Use abstraction and interfaces for decoupling
- Prioritize modular, reusable, and testable code
- Apply dependency injection for loose coupling
- Implement proper error handling and logging

### Frontend Development Standards

#### Project Structure
```
/src/
  /pages/          # Route-based page components
  /components/     # Reusable UI components and feature-specific logic
  /hooks/          # Custom React hooks
  /context/        # React Context providers
  /types/          # TypeScript type definitions
  /utils/          # Utility functions
```

#### Component Guidelines
- **Component Type**: Use functional components exclusively
- **TypeScript**: All components must have TypeScript interfaces for props
- **Hooks**: Leverage React hooks for state and lifecycle management
- **Props Interface**: Define clear, typed interfaces for all component props

#### UI Development Standards
- **Component Library**: Use ShadCN components with minimal styling customization
- **Custom Styles**: Apply Tailwind CSS for additional styling needs
- **Design System**: Follow atomic design principles for component organization
- **Responsive Design**: Ensure mobile-first responsive design approach

#### State Management Strategy
- **Global State**: Use React Context for application-wide state
- **Local State**: Keep component-specific state within components
- **Performance**: Avoid unnecessary re-renders through proper state design
- **State Structure**: Design state for predictability and maintainability

#### Testing Requirements
- **Framework**: Jest and React Testing Library
- **Coverage**: Test both happy paths and edge cases
- **Structure**: Test files should mirror component structure
- **Naming**: Use descriptive test names that explain behavior

#### Interactive Element Naming
Use `data-qa-id` attributes with pattern: `[component-type]-[iteration/index]-[specific-action]`

**Examples:**
- Buttons: `data-qa-id="button-revenue-management-submit"`
- Inputs: `data-qa-id="input-login-email"`
- Switches: `data-qa-id="switch-revenue-management-enabled"`
- Dropdowns: `data-qa-id="dropdown-user-role"`

### Backend Development Standards

#### 4-Layer Architecture Pattern

Follow this mandatory 4-layer architecture for all features:

##### 1. Repository Layer (`Data/Impl/`)
**Purpose**: Handle direct data access operations
- **Responsibilities**:
  - Direct data access to Dataverse and SQL databases
  - Accept and return domain models (e.g., `bs_Entity`)
  - Inject `IDataverseService` for `IOrganizationService` access
- **Restrictions**:
  - No business logic implementation
  - Only data access operations

##### 2. Service Layer (`Services/Impl/`)
**Purpose**: Contain business logic and orchestration
- **Responsibilities**:
  - Business logic implementation
  - Data validation and business rule enforcement
  - Orchestration of multiple repository operations
  - Work with Value Objects (VOs)
- **Dependencies**:
  - Use repositories for all data operations
  - Apply business rules and validation logic

##### 3. Adapter Layer (`Adapters/Impl/` and `Adapters/Mappers/`)
**Purpose**: Bridge between services and external interfaces
- **Service Adapters** (`Adapters/Impl/`):
  - Accept and return DTOs
  - Delegate business operations to services
  - Keep adapters thin with no business logic
- **Mappers** (`Adapters/Mappers/`):
  - Use Mapperly for all VO ↔ DTO mapping
  - Handle object transformation between layers

##### 4. Function/API Layer (`Functions/`)
**Purpose**: Expose HTTP endpoints via Azure Functions
- **Responsibilities**:
  - Parse and validate HTTP input
  - Call appropriate service adapters
  - Return HTTP responses with DTOs
- **Restrictions**:
  - No business logic implementation
  - No direct data access operations

#### Data Flow Architecture
```
Dataverse/EDW → [Mapperly] → VO → [Mapperly] → DTO → API → Frontend Interface → UI
```

#### Mapping Requirements

##### Mandatory Mapperly Usage
- **REQUIREMENT**: Use [Mapperly](https://mapperly.riok.app/) for ALL object mappings
- **PROHIBITION**: No manual mapping code or alternative mapping libraries
- **Implementation**: Create dedicated mapper classes per feature (e.g., `ContractMapper`)

##### Object Model Organization
- **Value Objects (VOs)**: Located in `api/src/Models/Vo/` with namespace `api.Models.Vo`
- **Data Transfer Objects (DTOs)**: Located in `api/src/Models/Dto/` with namespace `api.Models.Dto`
- **Mapper Classes**: Feature-specific mappers in `Adapters/Mappers/`

#### Namespace Standards
- **Production Code**: `api` namespace (e.g., `api.Services.Impl`, `api.Data.Impl`)
- **Test Code**: `BackendTests` namespace (e.g., `BackendTests.Services`, `BackendTests.Data`)

#### Testing Strategy
- **Framework**: xUnit and Moq for testing
- **Location**: Backend tests in `api/tests/` directory
- **Coverage**: Write unit tests for each layer with appropriate mocking
- **Isolation**: Test each layer independently with proper dependency mocking

#### Dependency Injection Guidelines
- **Constructor Injection**: Use constructor injection for all dependencies
- **Service Adapters**: Instantiate mappers directly (don't inject mappers)
- **Interface Design**: Design interfaces for testability and loose coupling

## Authentication and Authorization

### Static Web App Configuration

#### Route-Based Security
- **Public Routes**:
  - `/`: Login page (anonymous access allowed)
- **Protected Routes**:
  - `/billing/*`: Requires authentication
  - `/api/*`: Requires authentication
- **Admin Routes**: Use `.auth/me` endpoint for role validation

#### Authentication Flow
1. User accesses protected route
2. System redirects to authentication provider
3. Upon successful authentication, user gains access to authorized routes
4. Role-based access control applied for admin functions

## Business Domain Knowledge

### Contract Types and Business Models

#### Revenue Sharing Contracts
- **Model**: Split parking revenue with clients based on predefined thresholds
- **Calculation**: Percentage-based revenue distribution
- **Thresholds**: Variable based on contract terms
- **Billing Frequency**: Typically monthly

#### Management Agreements
- **Model**: Client pays operational expenses, Towne Park charges management fee
- **Fee Structure**: Fixed or percentage-based management fees
- **Expense Categories**: Labor, maintenance, utilities, insurance
- **Billing Components**: Management fee plus expense reimbursements

#### Per Labor Hour (PLH) Contracts
- **Model**: Billing based on actual labor hours worked
- **Rate Structure**: Different rates for various job codes
- **Time Tracking**: Detailed hour tracking by employee and job function
- **Billing Calculation**: Hours × job code rate + applicable taxes and benefits

#### Fixed Fee Contracts
- **Model**: Predetermined monthly amount regardless of usage
- **Common Usage**: Hospital parking management
- **Billing Simplicity**: Consistent monthly billing amount
- **Contract Terms**: Annual agreements with escalation clauses

#### Per Occupied Room Contracts
- **Model**: Flat rate per occupied room per day
- **Industry**: Primarily hospitality sector
- **Rate Calculation**: Daily occupied rooms × contracted rate
- **Billing Period**: Monthly aggregation of daily calculations

### Key Business Terminology

#### Organizational Roles
- **Account Managers (AMs)**: Oversee individual customer locations and relationships
- **District Managers**: Manage multiple locations within geographic regions
- **Regional Managers/VPs**: Oversee large geographic territories
- **Billing Administrators**: Handle billing operations and invoice generation

#### Financial Terms
- **PTEB**: Payroll Taxes and Employee Benefits
- **Validation Threshold**: Limit for complimentary parking offered by clients
- **External Revenue**: Direct parking customer revenue (cash, credit cards)
- **Internal Revenue**: Revenue billed to Towne Park's clients
- **Profit Share**: Revenue sharing calculation based on contract terms

#### Operational Terms
- **Customer Sites**: Individual locations where Towne Park provides services
- **Service Codes**: Categorization system for different service types
- **Billing Cycles**: Regular intervals for invoice generation and processing
- **Expense Categories**: Classification system for operational costs

## Development Workflow

### Feature Implementation Process

#### Implementation Checklist
1. **Repository Layer**:
   - Create repository interface defining data access methods
   - Implement repository with direct data access logic
   - Inject `IDataverseService` for Dataverse operations

2. **Service Layer**:
   - Create service interface defining business operations
   - Implement service with business logic and validation
   - Use repositories for all data operations

3. **Adapter Layer**:
   - Create service adapter for DTO handling
   - Implement Mapperly mappers for VO ↔ DTO conversion
   - Ensure adapters remain thin without business logic

4. **Function/API Layer**:
   - Create Azure Function endpoints
   - Implement input validation and HTTP response handling
   - Call service adapters for business operations

5. **Testing Implementation**:
   - Write unit tests for each layer
   - Mock dependencies appropriately
   - Achieve minimum 80% code coverage

6. **Frontend Integration**:
   - Update frontend interfaces and components
   - Implement API integration
   - Add frontend tests for new functionality

7. **Integration Testing**:
   - Add integration tests if needed
   - Test end-to-end functionality
   - Validate business scenarios

### Code Review Requirements

#### Pre-Review Checklist
- All automated tests pass successfully
- Conventional commit message format followed
- Related Azure DevOps work items linked
- Proper error handling and logging implemented
- Security best practices verified (no exposed secrets)

#### Review Criteria
- Code follows established architecture patterns
- Business logic is properly encapsulated in service layer
- Mapperly is used for all object mapping
- Tests provide adequate coverage and quality
- Documentation is updated as needed

### Testing Standards

#### Coverage Requirements
- **Minimum Coverage**: 80% code coverage for both frontend and backend
- **Test-Driven Development**: All new features must include tests before implementation
- **CI/CD Integration**: Tests run automatically in CI/CD pipelines

#### Testing Strategy
- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test component interactions and data flow
- **End-to-End Tests**: Test complete user scenarios and business workflows

## Security Guidelines

### Code Security Standards
- **Secret Management**: Never expose or log secrets/keys in code
- **Repository Security**: Never commit secrets to repository
- **Authentication**: Use proper authentication middleware for all protected routes
- **Input Validation**: Validate all inputs and sanitize outputs
- **Access Control**: Follow principle of least privilege for data access

### Data Protection
- **Sensitive Data**: Encrypt sensitive data at rest and in transit
- **Personal Information**: Follow privacy regulations for customer data
- **Audit Logging**: Log security-relevant events for compliance
- **Access Monitoring**: Monitor and alert on unusual access patterns

## Performance Considerations

### Optimization Strategies
- **Caching**: Implement proper caching strategies for frequently accessed data
- **Lazy Loading**: Use lazy loading for large datasets and components
- **Database Optimization**: Optimize database queries in repository layer
- **Monitoring**: Monitor and log performance metrics
- **Pagination**: Use pagination for large data sets to improve response times

### Performance Monitoring
- **Metrics Collection**: Collect performance metrics at all layers
- **Alerting**: Set up alerts for performance degradation
- **Optimization**: Regular performance review and optimization cycles
- **Capacity Planning**: Monitor resource usage for capacity planning

## Custom Development Tools

### PR Documentation Generator

#### Command Overview
**Command**: `generate-pr-docs <PR_ID> <TASK_ID> <USER_STORY_ID>`

#### Purpose and Functionality
Automatically generate comprehensive markdown documentation for Pull Requests including:
- Pull Request details and current status
- Associated Task information and progress
- User Story context and acceptance criteria
- Analysis of how the task contributes to User Story goals
- Compliance check with Towne Park development standards

#### Usage Example
```bash
./scripts/generate-pr-docs.sh 123 456 789
```

#### Prerequisites and Requirements
- **Azure CLI**: Installed and authenticated (`az login`)
- **Azure DevOps Extension**: CLI extension for Azure DevOps
- **Organization Access**: Access to towne-park Azure DevOps organization
- **Valid IDs**: Valid PR, Task, and User Story IDs

#### Output and Documentation
- **File Generation**: Creates timestamped markdown file
- **Content Structure**: Comprehensive documentation following Azure DevOps MCP rules
- **Format**: HTML-to-markdown conversion for consistent formatting
- **Integration**: Compatible with existing documentation workflow

## Code Validation Report

**Last Validated**: 2025-07-18
**Validation Scope**: Technical Configuration
**Code Copy Date**: 2025-07-18

### Validation Summary
- ✅ **Verified Elements**: 0 items (no direct code validation opportunities in development guidelines)
- ⚠️ **Discrepancies Found**: 0 items
- ❓ **Incomplete Documentation**: 0 items
- 🔍 **Requires Review**: 1 item (architecture alignment with Power Platform implementation)

### Validation Analysis

#### Development Standards vs. Implementation
**Validation Scope**: Development guidelines document contains standards and best practices rather than specific business logic or technical configurations that can be directly validated against Power Platform code.

**Validation Limitation**: This document establishes development standards rather than implementing specific business rules or technical configurations that would have corresponding Power Platform code.

**Recommendation**: Future validation opportunities will arise when specific business rules, workflows, or technical configurations documented in this guide are implemented and can be compared against actual Power Platform code.

### Code File References
- **Validation Note**: No specific code files analyzed as this document contains development standards rather than implementable business logic
- **Future Validation**: Implementation-specific documents derived from these standards should be validated against relevant Power Platform code files

### Validation Methodology
- **Approach**: Document review for development standard completeness
- **Limitations**: No direct code comparison possible for development guidelines
- **Future Validation**: Standards compliance can be validated in implementation-specific documentation

## Related Documentation

- [System Settings Configuration Guide](../system-settings/20250716_Development_ConfigurationGuide_Standards.md) ✓ VERIFIED
- [Environment Setup Guide](../system-settings/) 🔗 EXTERNAL
- [Backend Architecture Specifications](../../technical/backend/) 🔗 EXTERNAL
- [Frontend Architecture Specifications](../../technical/frontend/) 🔗 EXTERNAL
- [Database Design Specifications](../../technical/database/) 🔗 EXTERNAL
- [Contract Management Business Rules](../../business-rules/contracts/) 🔗 EXTERNAL
- [Billing Business Rules](../../business-rules/billing/) 🔗 EXTERNAL
- [Developer Workflow Processes](../../user-processes/) 🔗 EXTERNAL
- [Code Review Processes](../../user-processes/) 🔗 EXTERNAL

## Maintenance and Updates

### Document Maintenance
- **Regular Updates**: This document should be regularly updated as the project evolves
- **Compliance**: All developers must follow these guidelines to ensure code consistency and maintainability
- **Review Cycle**: Quarterly review of standards for relevance and effectiveness
- **Feedback Integration**: Incorporate team feedback and lessons learned

### Version Control
- **Change Tracking**: All changes to development standards must be documented
- **Approval Process**: Significant changes require team review and approval
- **Communication**: Changes must be communicated to all development team members
- **Training**: Updated standards require team training and knowledge transfer

---

*This comprehensive guide serves as the authoritative source for Towne Park development standards. All development activities must align with these guidelines to ensure system quality, maintainability, and team productivity.*
## Quick Links

- [System Settings Configuration Guide](../system-settings/20250716_Development_ConfigurationGuide_Standards.md)
