# Towne Park Billing System - General Information and Onboarding

## Project Overview

Towne Park is a hospitality and healthcare services company specializing in parking management, serving over 700 customer sites. This repository contains the billing and forecasting system modernization project, transitioning from Excel-based processes to a cloud-based solution using Microsoft Power Platform and Azure.

### Tech Stack
- **Frontend**: React with TypeScript, ShadCN components, Tailwind CSS
- **Backend**: .NET Azure Functions, Entity Framework, Dataverse
- **Testing**: Jest/React Testing Library (frontend), xUnit (backend)

## Git Workflow & Branch Rules

### Branch Structure
- **develop** ← **feature/** ← **task/**
- 🚫 **NEVER create PRs targeting `master` branch**
- ✅ **Maximum target**: `develop` branch for all developer PRs

### Branch-Based PR Rules
- **Task branches** (`task/*`): Target parent feature branch, link Task work items
- **Feature branches** (`feature/*`): Target `develop` branch, link User Story work items

### Commit Message Standards
Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/):
- `feat`: New feature
- `fix`: Bug fix  
- `refactor`: Code refactoring
- `test`: Adding/modifying tests
- `docs`: Documentation updates
- `style`: Code formatting changes
- `chore`: Maintenance tasks

## Code Quality Standards

### General Principles
- Follow DRY, KISS, and YAGNI principles
- Write code for maintainability and readability
- Use abstraction and interfaces for decoupling
- Prioritize modular, reusable, and testable code
- Each component/function should have a single responsibility

### Frontend (React/TypeScript)

#### Project Structure
- `/src/pages/` - Route-based page components
- `/src/components/` - Reusable UI components and feature-specific logic
- Use functional components and hooks
- All components must have TypeScript interfaces for props

#### UI Guidelines
- Use ShadCN components with minimal styling customization
- Apply Tailwind for custom styles
- Follow atomic design principles for component organization

#### State Management
- Use React Context for global state
- Keep local state within components when possible
- Avoid unnecessary re-renders

#### Testing
- Write unit tests using Jest and React Testing Library
- Cover both happy paths and edge cases
- Test files should mirror component structure

#### Naming Conventions for Interactive Elements
Use `data-qa-id` attributes with pattern: `[component-type]-[iteration/index]-[specific-action]`
- Buttons: `button-revenue-management-submit`
- Inputs: `input-login-email`
- Switches: `switch-revenue-management-enabled`
- Dropdowns: `dropdown-user-role`

### Backend (.NET)

#### Architecture Flow
Follow this 4-layer architecture for all features:

1. **Repository Layer** (`Data/Impl/`)
   - Handle direct data access (Dataverse, SQL)
   - Accept/return domain models (e.g., `bs_Entity`)
   - Inject `IDataverseService` for `IOrganizationService` access
   - No business logic - only data access

2. **Service Layer** (`Services/Impl/`)
   - Contain business logic, validation, orchestration
   - Use repositories for data operations
   - Work with Value Objects (VOs)
   - Apply business rules and validation

3. **Adapter Layer** (`Adapters/Impl/` and `Adapters/Mappers/`)
   - Bridge between services and DTOs
   - **Service Adapters**: Accept/return DTOs, delegate to services
   - **Mappers**: Use Mapperly for all VO ↔ DTO mapping
   - Keep adapters thin - no business logic

4. **Function/API Layer** (`Functions/`)
   - Azure Functions exposing HTTP endpoints
   - Parse/validate input, call service adapters
   - Return HTTP responses with DTOs
   - No business or data access logic

#### Data Flow
```
Dataverse/EDW → [Mapperly] → VO → [Mapperly] → DTO → API → Frontend Interface → UI
```

#### Mapping Requirements
- **MANDATORY**: Use [Mapperly](https://mapperly.riok.app/) for ALL mappings
- No manual mapping code or other mapping libraries
- VOs in `api/src/Models/Vo/` with namespace `api.Models.Vo`
- DTOs in `api/src/Models/Dto/` with namespace `api.Models.Dto`
- Create dedicated mapper classes per feature (e.g., `ContractMapper`)

#### Namespace Standards
- **Production code**: `api` namespace (e.g., `api.Services.Impl`)
- **Test code**: `BackendTests` namespace (e.g., `BackendTests.Services`)

#### Testing
- Write unit tests for each layer with appropriate mocking
- Backend tests in `api/tests/` directory
- Use xUnit and Moq for testing framework

#### Dependency Injection
- Use constructor injection for all dependencies
- For service adapters, instantiate mappers directly (don't inject)

## Authentication & Authorization

### Static Web App Configuration
- `/`: Login page (anonymous access)
- `/billing/*`: Requires authentication
- `/api/*`: Requires authentication
- Admin routes use `.auth/me` endpoint for role validation

## Business Domain Knowledge

### Contract Types
- **Revenue Sharing**: Split parking revenue with clients based on thresholds
- **Management Agreements**: Client pays expenses, Towne Park charges management fee
- **Per Labor Hour (PLH)**: Billing based on labor hours with different job code rates
- **Fixed Fee**: Predetermined monthly amount (common in hospitals)
- **Per Occupied Room**: Flat rate per occupied room per day (hospitality)

### Key Business Terms
- **Account Managers (AMs)**: Oversee individual locations
- **PTEB**: Payroll Taxes and Employee Benefits
- **Validation Threshold**: Limit for free parking offered by clients
- **External Revenue**: Direct parking customer revenue
- **Internal Revenue**: Revenue billed to Towne Park's clients

## Development Workflow

### Feature Implementation Checklist
1. Create repository interface and implementation
2. Create service interface and implementation
3. Create service adapter and Mapperly mappers
4. Create Azure Function endpoints
5. Write unit tests for each layer
6. Update frontend interfaces and components
7. Add integration tests if needed

### Code Review Requirements
- All code must pass automated tests
- Follow conventional commit message format
- Link related Azure DevOps work items
- Ensure proper error handling and logging
- Verify security best practices (no exposed secrets)

### Testing Standards
- Minimum 80% code coverage for both frontend and backend
- All new features must include tests before implementation (TDD)
- Tests run in CI/CD pipelines

## Security Guidelines
- Never expose or log secrets/keys in code
- Never commit secrets to repository
- Use proper authentication middleware
- Validate all inputs and sanitize outputs
- Follow principle of least privilege for data access

## Performance Considerations
- Implement proper caching strategies
- Use lazy loading for large datasets
- Optimize database queries in repositories
- Monitor and log performance metrics
- Use pagination for large data sets

## Custom Commands

### PR Documentation Generator
**Command**: `generate-pr-docs <PR_ID> <TASK_ID> <USER_STORY_ID>`

**Purpose**: Automatically generate comprehensive markdown documentation for Pull Requests that includes:
- PR details and status
- Associated Task information
- User Story context and acceptance criteria
- Analysis of how the task contributes to User Story goals
- Compliance check with Towne Park standards

**Usage Example**:
```bash
./scripts/generate-pr-docs.sh 123 456 789
```

**Requirements**:
- Azure CLI installed and logged in (`az login`)
- Azure DevOps extension for CLI
- Access to towne-park Azure DevOps organization
- Valid PR, Task, and User Story IDs

**Output**: Generates a timestamped markdown file with comprehensive documentation following Azure DevOps MCP rules for HTML-to-markdown conversion.

## Architecture Overview

### Backend Stack (.NET Core)
- **API Layer**: `/api/src/Functions/` - Azure Functions with HTTP triggers
- **Models**: `/api/src/Models/Dto/` - Data Transfer Objects
- **Services**: `/api/src/Services/` - Business logic layer
- **Adapters**: `/api/src/Adapters/` - External service integration
- **Tests**: `/api/tests/` - Unit and integration tests

### Frontend Stack (React + TypeScript)
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Radix UI components
- **State Management**: React hooks + Context API
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Testing**: Jest + React Testing Library
- **Charts**: Nivo charts library
- **Tables**: TanStack React Table

### Frontend Architecture Structure
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

## PR Analysis Workflow

### 1. Initial Information Gathering
```
# Get PR details
Use: list_pull_requests
Parameters: repositoryId, status="active"

# Get specific PR information
Use: get_pull_request_comments
Parameters: repositoryId, pullRequestId

# Check related work items
Use: get_work_item
Parameters: id=[work_item_id_from_PR]
```

### 2. Code Analysis Priority Order

#### Backend Changes (40% of review time)
1. **API Endpoints**: `/api/src/Functions/[Feature].cs`
2. **DTOs & Models**: `/api/src/Models/Dto/[Feature]Dto.cs`
3. **Services & Adapters**: `/api/src/Services/`, `/api/src/Adapters/`
4. **Unit Tests**: `/api/tests/Functions/[Feature]Tests.cs`

#### Frontend Changes (40% of review time)
1. **Components**: `/src/components/[Feature]/`
2. **Pages**: `/src/pages/[Feature]/`
3. **Hooks**: `/src/hooks/[Feature]Hook.ts`
4. **Context**: `/src/contexts/[Feature]Context.tsx`
5. **Tests**: `/src/__test__/`

#### Configuration & Infrastructure (20% of review time)
1. **Package.json** - Dependencies and scripts
2. **Configuration files** - Vite, TypeScript, Tailwind
3. **Static web app config**
