---
title: "Towne Park Billing System - Technical Architecture and Development Standards"
description: "Comprehensive technical architecture, development standards, and implementation guidelines for the Towne Park billing system including frontend, backend, and deployment specifications"
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-07-16
version: 1.0
status: Draft
owner: "Development Team"
source_documents:
  - "Towne Park Billing System - General Technical.md"
systems:
  - Billing
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Statement Generation
  - Reporting
  - Customer Site Management
user_roles:
  - Account Manager
  - Billing Admin
  - Billing Manager
  - District Manager
tags:
  - billing
  - technical-architecture
  - development-standards
  - react
  - dotnet
  - azure
---

# Towne Park Billing System - Technical Architecture and Development Standards

## Purpose

This document defines the comprehensive technical architecture, development standards, and implementation guidelines for Towne Park's billing system modernization project. It serves as the authoritative reference for development teams transitioning from Excel-based processes to a cloud-based solution using Microsoft Power Platform and Azure.

## Architecture Overview

### Project Context

Towne Park is a hospitality and healthcare services company specializing in parking management, serving over 700 customer sites. The billing system modernization project represents a critical transition from Excel-based processes to a modern, scalable, cloud-based solution.

### Technology Stack

#### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: ShadCN components with Radix UI foundation
- **Styling**: Tailwind CSS for utility-first styling approach
- **State Management**: React hooks and Context API for application state
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Routing**: React Router DOM for client-side navigation
- **Testing**: Jest and React Testing Library for comprehensive testing
- **Data Visualization**: Nivo charts library for interactive charts
- **Data Tables**: TanStack React Table for advanced table functionality

#### Backend Stack
- **Runtime**: .NET Core with Azure Functions for serverless architecture
- **Data Access**: Entity Framework for ORM capabilities
- **Data Storage**: Microsoft Dataverse for business data management
- **API Architecture**: HTTP-triggered Azure Functions for RESTful endpoints
- **Testing**: xUnit testing framework with Moq for mocking

#### Infrastructure and Deployment
- **Cloud Platform**: Microsoft Azure
- **Hosting**: Azure Static Web Apps for frontend deployment
- **Authentication**: Azure Active Directory integration
- **Database**: Microsoft Dataverse with EDW integration
- **CI/CD**: Azure DevOps pipelines for automated deployment

## Backend Architecture

### 4-Layer Architecture Pattern

The backend follows a strict 4-layer architecture pattern to ensure separation of concerns, maintainability, and testability:

#### Layer 1: Repository Layer (`Data/Impl/`)
- **Purpose**: Handle direct data access operations
- **Responsibilities**:
  - Direct interaction with Dataverse and SQL databases
  - Accept and return domain models (e.g., `bs_Entity`)
  - Inject `IDataverseService` for `IOrganizationService` access
  - No business logic - purely data access operations
- **Implementation Guidelines**:
  - Use dependency injection for data service access
  - Implement repository interfaces for testability
  - Handle data mapping between storage and domain models
  - Provide error handling for data access failures

#### Layer 2: Service Layer (`Services/Impl/`)
- **Purpose**: Contain business logic, validation, and orchestration
- **Responsibilities**:
  - Implement core business rules and validation logic
  - Orchestrate complex business operations
  - Work with Value Objects (VOs) for data transfer
  - Apply business rules and domain validation
- **Implementation Guidelines**:
  - Use repositories for all data operations
  - Implement service interfaces for dependency injection
  - Focus on business logic without data access concerns
  - Provide comprehensive error handling and logging

#### Layer 3: Adapter Layer (`Adapters/Impl/` and `Adapters/Mappers/`)
- **Purpose**: Bridge between services and external interfaces
- **Components**:
  - **Service Adapters**: Accept and return DTOs, delegate to services
  - **Mappers**: Use Mapperly for all VO ↔ DTO mapping operations
- **Responsibilities**:
  - Keep adapters thin with no business logic
  - Handle data transformation between layers
  - Provide clean interfaces for external consumption
- **Implementation Guidelines**:
  - Use Mapperly for ALL mapping operations (mandatory)
  - Implement adapter interfaces for testability
  - Focus on data transformation and delegation

#### Layer 4: Function/API Layer (`Functions/`)
- **Purpose**: Expose HTTP endpoints via Azure Functions
- **Responsibilities**:
  - Parse and validate HTTP input parameters
  - Call appropriate service adapters
  - Return properly formatted HTTP responses with DTOs
  - Handle HTTP-specific concerns (status codes, headers)
- **Implementation Guidelines**:
  - No business logic or data access in functions
  - Use dependency injection for service adapter access
  - Implement proper error handling and HTTP status codes
  - Follow RESTful API design principles

### Data Flow Architecture

```
Dataverse/EDW → [Mapperly] → VO → [Mapperly] → DTO → API → Frontend Interface → UI
```

This unidirectional data flow ensures:
- Clear separation between data storage and business logic
- Type safety through all transformation layers
- Consistent data mapping using Mapperly
- Testable components at each layer

### Mapping Requirements

#### Mandatory Mapperly Usage
- **Requirement**: Use [Mapperly](https://mapperly.riok.app/) for ALL mapping operations
- **Prohibition**: No manual mapping code or alternative mapping libraries
- **Structure**:
  - Value Objects (VOs) in `api/src/Models/Vo/` with namespace `api.Models.Vo`
  - Data Transfer Objects (DTOs) in `api/src/Models/Dto/` with namespace `api.Models.Dto`
  - Dedicated mapper classes per feature (e.g., `ContractMapper`, `BillingMapper`)

#### Mapping Implementation Standards
- Create feature-specific mapper classes for logical grouping
- Use Mapperly attributes for complex mapping scenarios
- Implement bidirectional mapping where required
- Provide comprehensive unit tests for all mappers

### Namespace Standards

#### Production Code Namespaces
- **Root Namespace**: `api`
- **Examples**:
  - `api.Services.Impl` for service implementations
  - `api.Adapters.Impl` for adapter implementations
  - `api.Functions` for Azure Function endpoints
  - `api.Models.Vo` for Value Objects
  - `api.Models.Dto` for Data Transfer Objects

#### Test Code Namespaces
- **Root Namespace**: `BackendTests`
- **Examples**:
  - `BackendTests.Services` for service layer tests
  - `BackendTests.Adapters` for adapter layer tests
  - `BackendTests.Functions` for function layer tests

### Dependency Injection Strategy

#### Constructor Injection Pattern
- Use constructor injection for all dependencies
- Implement interfaces for all injected services
- Register dependencies in Azure Functions startup configuration

#### Service Adapter Instantiation
- For service adapters, instantiate mappers directly (don't inject)
- Keep mapper instantiation lightweight and stateless
- Use singleton pattern for mapper instances where appropriate

## Frontend Architecture

### Project Structure

```
/src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Radix UI)
│   ├── [FeatureName]/   # Feature-specific components
│   └── [SharedComponent].tsx
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── contexts/            # React Context providers
├── lib/                 # Utility functions and configurations
├── assets/              # Static assets
└── __test__/            # Frontend tests
```

### Component Architecture Guidelines

#### Functional Components and Hooks
- Use functional components exclusively
- Leverage React hooks for state management and side effects
- Implement custom hooks for reusable logic
- Follow hooks rules and best practices

#### TypeScript Interface Requirements
- All components must have TypeScript interfaces for props
- Use strict TypeScript configuration
- Implement proper type definitions for all data structures
- Leverage TypeScript for compile-time error detection

#### UI Component Standards
- Use ShadCN components with minimal styling customization
- Apply Tailwind CSS for custom styling needs
- Follow atomic design principles for component organization
- Maintain consistent design system implementation

### State Management Strategy

#### React Context for Global State
- Use React Context for application-wide state management
- Implement context providers for feature-specific state
- Avoid prop drilling through context usage
- Keep context focused and feature-specific

#### Local State Management
- Keep local state within components when possible
- Use useState and useReducer for component-level state
- Avoid unnecessary state lifting
- Optimize for performance and re-render minimization

### Testing Standards

#### Unit Testing Requirements
- Write unit tests using Jest and React Testing Library
- Cover both happy paths and edge cases
- Test files should mirror component structure
- Maintain minimum 80% code coverage

#### Testing Best Practices
- Test user interactions rather than implementation details
- Use data-qa-id attributes for reliable element selection
- Mock external dependencies appropriately
- Implement integration tests for critical user flows

### Interactive Element Naming Conventions

Use `data-qa-id` attributes with pattern: `[component-type]-[iteration/index]-[specific-action]`

#### Examples:
- **Buttons**: `button-revenue-management-submit`
- **Inputs**: `input-login-email`
- **Switches**: `switch-revenue-management-enabled`
- **Dropdowns**: `dropdown-user-role`

This naming convention ensures:
- Consistent test automation support
- Clear element identification in debugging
- Maintainable test suites
- Cross-team collaboration efficiency

## Authentication & Authorization

### Static Web App Configuration

#### Route-Based Security
- **`/`**: Login page with anonymous access
- **`/billing/*`**: Requires authentication for all billing functionality
- **`/api/*`**: Requires authentication for all API endpoints
- **Admin routes**: Use `.auth/me` endpoint for role validation

#### Authentication Flow
1. User accesses protected route
2. Azure Static Web App redirects to authentication provider
3. Successful authentication returns user to original route
4. API calls include authentication headers automatically
5. Backend validates authentication on each request

#### Role-Based Access Control
- Implement granular permissions based on user roles
- Use Azure AD groups for role assignment
- Validate roles at both frontend and backend layers
- Provide appropriate error handling for unauthorized access

## Business Domain Integration

### Contract Types Support

The system must support all Towne Park contract types with specific calculation logic:

#### Revenue Sharing Contracts
- **Description**: Split parking revenue with clients based on thresholds
- **Implementation**: Complex threshold calculations with percentage splits
- **Data Requirements**: External revenue tracking, threshold definitions, split percentages

#### Management Agreements
- **Description**: Client pays expenses, Towne Park charges management fee
- **Implementation**: Expense tracking with markup calculations and management fees
- **Data Requirements**: Expense categories, markup percentages, fee structures

#### Per Labor Hour (PLH) Contracts
- **Description**: Billing based on labor hours with different job code rates
- **Implementation**: Time tracking integration with rate calculations
- **Data Requirements**: Labor hours by job code, hourly rates, overtime calculations

#### Fixed Fee Contracts
- **Description**: Predetermined monthly amount (common in hospitals)
- **Implementation**: Simple fixed amount with escalation schedules
- **Data Requirements**: Monthly amounts, escalation percentages, effective dates

#### Per Occupied Room Contracts
- **Description**: Flat rate per occupied room per day (hospitality)
- **Implementation**: Occupancy tracking with daily rate calculations
- **Data Requirements**: Occupancy data, daily rates, seasonal adjustments

### Key Business Terms Integration

#### Account Manager (AM) Functionality
- Site-specific data management and oversight
- Forecast input and adjustment capabilities
- Performance monitoring and reporting access
- Client communication and relationship management

#### PTEB (Payroll Taxes and Employee Benefits)
- Automated calculation based on payroll data
- Integration with HR systems for benefit rates
- Compliance with tax regulations and reporting
- Accurate cost allocation across contracts

#### Validation Threshold Management
- Configurable limits for free parking offered by clients
- Automated monitoring and alert systems
- Exception reporting for threshold violations
- Historical tracking and trend analysis

#### Revenue Stream Management
- **External Revenue**: Direct parking customer revenue tracking
- **Internal Revenue**: Revenue billed to Towne Park's clients
- Automated reconciliation between revenue streams
- Comprehensive reporting and analytics

## Development Workflow

### Git Workflow & Branch Rules

#### Branch Structure
- **develop** ← **feature/** ← **task/**
- **Critical Rule**: NEVER create PRs targeting `master` branch
- **Maximum Target**: `develop` branch for all developer PRs

#### Branch-Based PR Rules
- **Task branches** (`task/*`): Target parent feature branch, link Task work items
- **Feature branches** (`feature/*`): Target `develop` branch, link User Story work items

#### Commit Message Standards
Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/):
- `feat`: New feature implementation
- `fix`: Bug fix resolution
- `refactor`: Code refactoring without functionality changes
- `test`: Adding or modifying tests
- `docs`: Documentation updates
- `style`: Code formatting changes
- `chore`: Maintenance tasks and tooling updates

### Feature Implementation Checklist

1. **Repository Layer**: Create repository interface and implementation
2. **Service Layer**: Create service interface and implementation
3. **Adapter Layer**: Create service adapter and Mapperly mappers
4. **API Layer**: Create Azure Function endpoints
5. **Testing**: Write unit tests for each layer
6. **Frontend**: Update frontend interfaces and components
7. **Integration**: Add integration tests if needed

### Code Review Requirements

#### Automated Validation
- All code must pass automated tests before review
- Follow conventional commit message format
- Link related Azure DevOps work items
- Ensure proper error handling and logging implementation

#### Security Validation
- Verify security best practices implementation
- Ensure no exposed secrets or keys in code
- Validate input sanitization and output encoding
- Confirm proper authentication and authorization

#### Quality Standards
- Maintain minimum 80% code coverage
- Follow established coding standards and patterns
- Implement proper documentation and comments
- Ensure performance considerations are addressed

## Code Quality Standards

### General Principles

#### Design Principles
- **DRY (Don't Repeat Yourself)**: Eliminate code duplication through abstraction
- **KISS (Keep It Simple, Stupid)**: Favor simple solutions over complex ones
- **YAGNI (You Aren't Gonna Need It)**: Implement only required functionality
- **Single Responsibility**: Each component/function should have one clear purpose

#### Code Organization
- Write code for maintainability and readability
- Use abstraction and interfaces for decoupling
- Prioritize modular, reusable, and testable code
- Implement consistent naming conventions and structure

### Performance Considerations

#### Optimization Strategies
- Implement proper caching strategies for frequently accessed data
- Use lazy loading for large datasets and components
- Optimize database queries in repository layer
- Monitor and log performance metrics for continuous improvement

#### Scalability Planning
- Use pagination for large data sets
- Implement efficient data loading patterns
- Design for horizontal scaling capabilities
- Consider caching layers for high-traffic scenarios

### Security Guidelines

#### Data Protection
- Never expose or log secrets/keys in code
- Never commit secrets to repository
- Use proper authentication middleware throughout
- Validate all inputs and sanitize outputs appropriately

#### Access Control
- Follow principle of least privilege for data access
- Implement proper role-based access controls
- Use secure communication protocols (HTTPS/TLS)
- Regular security audits and vulnerability assessments

## Custom Commands and Tools

### PR Documentation Generator

#### Command Usage
**Command**: `generate-pr-docs <PR_ID> <TASK_ID> <USER_STORY_ID>`

#### Purpose and Functionality
Automatically generate comprehensive markdown documentation for Pull Requests including:
- PR details and current status
- Associated Task information and context
- User Story context and acceptance criteria
- Analysis of how the task contributes to User Story goals
- Compliance check with Towne Park development standards

#### Usage Example
```bash
./scripts/generate-pr-docs.sh 123 456 789
```

#### Requirements and Dependencies
- Azure CLI installed and authenticated (`az login`)
- Azure DevOps extension for CLI installed
- Access to towne-park Azure DevOps organization
- Valid PR, Task, and User Story IDs for documentation generation

#### Output Specifications
Generates timestamped markdown file with comprehensive documentation following Azure DevOps MCP rules for HTML-to-markdown conversion, ensuring consistent documentation standards across all pull requests.

## Testing Standards

### Backend Testing (.NET)

#### Unit Testing Framework
- Use xUnit testing framework for all backend tests
- Implement Moq for dependency mocking
- Backend tests located in `api/tests/` directory
- Follow AAA pattern (Arrange, Act, Assert) for test structure

#### Testing Strategy
- Write unit tests for each architectural layer with appropriate mocking
- Test both success and failure scenarios comprehensively
- Implement integration tests for critical business workflows
- Maintain test isolation and independence

### Frontend Testing (React)

#### Testing Framework
- Use Jest and React Testing Library for all frontend tests
- Focus on user behavior testing rather than implementation details
- Test files should mirror component structure for maintainability
- Implement both unit and integration tests

#### Testing Best Practices
- Test user interactions and component behavior
- Use data-qa-id attributes for reliable element selection
- Mock external API calls and dependencies appropriately
- Maintain comprehensive test coverage for critical user paths

### Test-Driven Development (TDD)

#### Implementation Requirements
- Minimum 80% code coverage for both frontend and backend
- All new features must include tests before implementation
- Tests run automatically in CI/CD pipelines
- Failed tests block deployment to production environments

## Deployment and Infrastructure

### CI/CD Pipeline Configuration

#### Automated Testing
- Unit tests run on every commit
- Integration tests run on pull request creation
- Performance tests run on staging deployment
- Security scans integrated into pipeline

#### Deployment Stages
1. **Development**: Automatic deployment on feature branch updates
2. **Staging**: Automatic deployment on develop branch updates
3. **Production**: Manual approval required for master branch deployment
4. **Rollback**: Automated rollback procedures for deployment failures

### Environment Configuration

#### Development Environment
- Local development with Azure Functions Core Tools
- Local Dataverse emulator for development testing
- Hot reload enabled for rapid development cycles
- Comprehensive logging and debugging capabilities

#### Staging Environment
- Production-like environment for final testing
- Full integration with Azure services
- Performance monitoring and load testing
- User acceptance testing environment

#### Production Environment
- High availability and disaster recovery configured
- Comprehensive monitoring and alerting
- Automated backup and recovery procedures
- Performance optimization and scaling policies

## Related Documentation

- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md) ✓ VERIFIED
- [Billing Business Rules](../../business-rules/billing/calculation-rules.md) ✓ VERIFIED
- [User Process - Billing Admin](../../user-processes/billing-admin/generate-invoices.md) ✓ VERIFIED
- [Forecasting System Integration](../../systems/forecasting/20250716_Forecasting_SystemOverview_Discovery.md) ✓ VERIFIED
- [Database Technical Specifications](../database/schema-design.md) ✓ VERIFIED

## Implementation Guidelines

### Development Team Onboarding

#### Required Knowledge
- Proficiency in React and TypeScript for frontend development
- Experience with .NET Core and Azure Functions for backend development
- Understanding of Azure cloud services and deployment
- Familiarity with Agile development methodologies

#### Training Requirements
- Towne Park business domain knowledge training
- Azure DevOps workflow and tooling training
- Code quality standards and review process training
- Security best practices and compliance training

### Quality Assurance Process

#### Code Quality Gates
- Automated code analysis and quality metrics
- Peer review requirements for all code changes
- Architecture review for significant changes
- Performance impact assessment for critical paths

#### Continuous Improvement
- Regular retrospectives and process improvement
- Technology stack evaluation and updates
- Performance monitoring and optimization
- User feedback integration and response

This technical architecture document serves as the foundation for all development activities on the Towne Park billing system, ensuring consistency, quality, and maintainability across the entire development lifecycle.
## Quick Links

- [Billing System Overview](../../systems/billing/20250716_Billing_SystemOverview_PowerBill.md)
- [Billing Business Rules](../../business-rules/billing/calculation-rules.md)
- [User Process - Billing Admin](../../user-processes/billing-admin/generate-invoices.md)
- [Forecasting System Integration](../../systems/forecasting/20250716_Forecasting_SystemOverview_Discovery.md)
- [Database Technical Specifications](../database/schema-design.md)
