---
title: "Towne Park Development - Configuration Guide and Standards"
description: "Comprehensive configuration guide covering development workflow, code quality standards, testing requirements, and deployment procedures for Towne Park systems"
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
  - Forecasting
components:
  - Frontend
  - Backend
  - Database
  - Integration
business_domains:
  - Contract Management
  - Revenue Calculation
  - Development Standards
user_roles:
  - Account Manager
  - Billing Admin
  - District Manager
tags:
  - configuration
  - development-standards
  - workflow
  - testing
  - deployment
---

# Towne Park Development - Configuration Guide and Standards

## Purpose

This configuration guide provides comprehensive setup instructions, development workflow standards, and operational procedures for Towne Park's development teams. It ensures consistent development practices across all projects and maintains high-quality code standards throughout the development lifecycle.

## Prerequisites

Before beginning development work on Towne Park systems, ensure the following prerequisites are met:

### Required Software and Tools
- **Git**: Version control system with Azure DevOps integration
- **Node.js**: Latest LTS version for frontend development
- **.NET Core SDK**: Latest stable version for backend development
- **Azure CLI**: For cloud resource management and deployment
- **Azure DevOps CLI Extension**: For work item and pipeline management
- **Visual Studio Code**: Recommended IDE with required extensions
- **Docker**: For containerized development and testing environments

### Required Access and Permissions
- Azure DevOps organization access (towne-park)
- Azure subscription access for development resources
- Dataverse environment access for data operations
- Power Platform environment access for integration testing

### Development Environment Setup
- Local development environment configured with all required tools
- Azure Functions Core Tools installed for local function development
- Dataverse development environment provisioned and accessible
- Local testing databases and mock services configured

## Git Workflow Configuration

### Branch Structure and Rules

#### Primary Branch Hierarchy
```
master (production)
├── develop (integration)
    ├── feature/[feature-name] (feature development)
        └── task/[task-name] (individual tasks)
```

#### Critical Branch Rules
- **NEVER create PRs targeting `master` branch directly**
- **Maximum target for developer PRs**: `develop` branch only
- **Feature branches**: Must target `develop` branch exclusively
- **Task branches**: Must target their parent feature branch

#### Branch Naming Conventions
- **Feature branches**: `feature/billing-invoice-generation`
- **Task branches**: `task/implement-revenue-calculation`
- **Hotfix branches**: `hotfix/critical-bug-fix`
- **Release branches**: `release/v1.2.0`

### Pull Request Configuration

#### Branch-Based PR Requirements
- **Task branches** (`task/*`):
  - Target: Parent feature branch
  - Required: Link to Task work items in Azure DevOps
  - Review: Minimum 1 reviewer from feature team
- **Feature branches** (`feature/*`):
  - Target: `develop` branch
  - Required: Link to User Story work items in Azure DevOps
  - Review: Minimum 2 reviewers including tech lead

#### PR Quality Gates
- All automated tests must pass
- Code coverage must meet minimum thresholds (80%)
- Security scans must complete without critical issues
- Code quality metrics must meet established standards

### Commit Message Standards

#### Conventional Commits Format
Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types
- **feat**: New feature implementation
- **fix**: Bug fix resolution
- **refactor**: Code refactoring without functionality changes
- **test**: Adding or modifying tests
- **docs**: Documentation updates
- **style**: Code formatting changes (no logic changes)
- **chore**: Maintenance tasks, tooling updates, dependency updates

#### Examples
```
feat(billing): implement revenue sharing calculation

Add support for revenue sharing contracts with threshold-based
percentage calculations and client-specific rate configurations.

Closes #123
```

```
fix(forecasting): resolve data validation error for new sites

Fix validation logic that was incorrectly flagging new sites
without historical data as invalid forecast inputs.

Fixes #456
```

## Code Quality Configuration

### General Quality Principles

#### Design Principles Implementation
- **DRY (Don't Repeat Yourself)**: Eliminate code duplication through proper abstraction and reusable components
- **KISS (Keep It Simple, Stupid)**: Favor simple, understandable solutions over complex implementations
- **YAGNI (You Aren't Gonna Need It)**: Implement only currently required functionality, avoid over-engineering
- **Single Responsibility Principle**: Each component, function, or class should have one clear, well-defined purpose

#### Code Organization Standards
- Write code prioritizing maintainability and readability
- Use abstraction and interfaces for proper decoupling
- Create modular, reusable, and thoroughly testable code
- Implement consistent naming conventions across all projects

### Frontend Configuration (React/TypeScript)

#### Project Structure Standards
```
/src/
├── pages/               # Route-based page components
├── components/          # Reusable UI components and feature-specific logic
│   ├── ui/             # Base UI components (ShadCN/Radix)
│   ├── [FeatureName]/  # Feature-specific components
│   └── shared/         # Shared utility components
├── hooks/              # Custom React hooks
├── contexts/           # React Context providers
├── lib/                # Utility functions and configurations
├── assets/             # Static assets (images, fonts, etc.)
├── types/              # TypeScript type definitions
└── __test__/           # Frontend test files
```

#### Component Development Standards
- **Functional Components**: Use functional components exclusively with React hooks
- **TypeScript Interfaces**: All components must have comprehensive TypeScript interfaces for props
- **Hook Usage**: Leverage React hooks for state management and side effects
- **Custom Hooks**: Create custom hooks for reusable logic patterns

#### UI Development Guidelines
- **ShadCN Components**: Use ShadCN components as foundation with minimal customization
- **Tailwind CSS**: Apply Tailwind for custom styling needs following utility-first approach
- **Atomic Design**: Follow atomic design principles for component organization and hierarchy
- **Design System**: Maintain consistency with established design system patterns

#### State Management Configuration
- **React Context**: Use React Context for application-wide state management
- **Local State**: Keep local state within components when possible to minimize complexity
- **State Optimization**: Avoid unnecessary re-renders through proper state design
- **Context Organization**: Create feature-specific contexts to avoid monolithic state

#### Interactive Element Configuration
Use `data-qa-id` attributes with standardized pattern: `[component-type]-[iteration/index]-[specific-action]`

**Examples:**
- Buttons: `data-qa-id="button-revenue-management-submit"`
- Inputs: `data-qa-id="input-login-email"`
- Switches: `data-qa-id="switch-revenue-management-enabled"`
- Dropdowns: `data-qa-id="dropdown-user-role"`

### Backend Configuration (.NET)

#### Architecture Implementation
Follow strict 4-layer architecture pattern:

1. **Repository Layer** (`Data/Impl/`)
   - Handle direct data access operations only
   - Accept and return domain models (e.g., `bs_Entity`)
   - Inject `IDataverseService` for `IOrganizationService` access
   - No business logic - purely data access operations

2. **Service Layer** (`Services/Impl/`)
   - Implement business logic, validation, and orchestration
   - Use repositories for all data operations
   - Work with Value Objects (VOs) for data transfer
   - Apply comprehensive business rules and validation

3. **Adapter Layer** (`Adapters/Impl/` and `Adapters/Mappers/`)
   - **Service Adapters**: Accept/return DTOs, delegate to services
   - **Mappers**: Use Mapperly for ALL VO ↔ DTO mapping operations
   - Keep adapters thin with no business logic implementation

4. **Function/API Layer** (`Functions/`)
   - Azure Functions exposing HTTP endpoints
   - Parse/validate input, call service adapters
   - Return HTTP responses with DTOs
   - No business logic or data access operations

#### Mapping Configuration Requirements
- **MANDATORY**: Use [Mapperly](https://mapperly.riok.app/) for ALL mapping operations
- **PROHIBITED**: Manual mapping code or alternative mapping libraries
- **Structure**:
  - VOs in `api/src/Models/Vo/` with namespace `api.Models.Vo`
  - DTOs in `api/src/Models/Dto/` with namespace `api.Models.Dto`
  - Dedicated mapper classes per feature (e.g., `ContractMapper`)

#### Namespace Configuration Standards
- **Production Code**: `api` namespace (e.g., `api.Services.Impl`)
- **Test Code**: `BackendTests` namespace (e.g., `BackendTests.Services`)

#### Dependency Injection Configuration
- Use constructor injection for all dependencies
- For service adapters, instantiate mappers directly (don't inject)
- Register all dependencies in Azure Functions startup configuration

## Testing Configuration

### Frontend Testing Setup (React)

#### Testing Framework Configuration
- **Primary Framework**: Jest with React Testing Library
- **Coverage Requirements**: Minimum 80% code coverage
- **Test Location**: Tests mirror component structure in `src/__test__/`
- **Naming Convention**: `[ComponentName].test.tsx`

#### Testing Standards Implementation
- **User Behavior Focus**: Test user interactions rather than implementation details
- **Element Selection**: Use `data-qa-id` attributes for reliable element selection
- **Mocking Strategy**: Mock external dependencies and API calls appropriately
- **Test Coverage**: Cover both happy paths and comprehensive edge cases

#### Test Configuration Files
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Backend Testing Setup (.NET)

#### Testing Framework Configuration
- **Primary Framework**: xUnit with Moq for mocking
- **Test Location**: `api/tests/` directory with namespace `BackendTests`
- **Coverage Requirements**: Minimum 80% code coverage
- **Test Organization**: Mirror production code structure

#### Testing Strategy Implementation
- **Unit Testing**: Write unit tests for each architectural layer
- **Mocking**: Use appropriate mocking for dependencies
- **Integration Testing**: Implement integration tests for critical workflows
- **Test Isolation**: Ensure tests are independent and can run in any order

#### Test Configuration Example
```csharp
// Example test class structure
namespace BackendTests.Services
{
    public class BillingServiceTests
    {
        private readonly Mock<IBillingRepository> _mockRepository;
        private readonly BillingService _service;

        public BillingServiceTests()
        {
            _mockRepository = new Mock<IBillingRepository>();
            _service = new BillingService(_mockRepository.Object);
        }

        [Fact]
        public async Task CalculateRevenue_ValidInput_ReturnsCorrectAmount()
        {
            // Arrange
            var contract = new Contract { /* test data */ };
            _mockRepository.Setup(r => r.GetContractAsync(It.IsAny<int>()))
                          .ReturnsAsync(contract);

            // Act
            var result = await _service.CalculateRevenueAsync(contractId: 1);

            // Assert
            Assert.Equal(expectedAmount, result.Amount);
        }
    }
}
```

### Test-Driven Development (TDD) Configuration

#### TDD Implementation Requirements
- **Minimum Coverage**: 80% code coverage for both frontend and backend
- **Pre-Implementation Testing**: All new features must include tests before implementation
- **CI/CD Integration**: Tests run automatically in CI/CD pipelines
- **Deployment Blocking**: Failed tests prevent deployment to production environments

#### TDD Workflow Process
1. **Red**: Write failing test for new functionality
2. **Green**: Write minimal code to make test pass
3. **Refactor**: Improve code while maintaining test success
4. **Repeat**: Continue cycle for each new requirement

## Authentication & Authorization Configuration

### Static Web App Authentication Setup

#### Route-Based Security Configuration
```json
{
  "routes": [
    {
      "route": "/",
      "allowedRoles": ["anonymous"]
    },
    {
      "route": "/billing/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/admin/*",
      "allowedRoles": ["admin"]
    }
  ],
  "responseOverrides": {
    "401": {
      "redirect": "/login",
      "statusCode": 302
    }
  }
}
```

#### Authentication Provider Configuration
- **Primary Provider**: Azure Active Directory
- **Fallback Options**: Microsoft Account, GitHub (for development)
- **Token Management**: Automatic token refresh and validation
- **Role Validation**: Use `.auth/me` endpoint for role-based access control

### Role-Based Access Control (RBAC) Setup

#### Role Definition Configuration
```typescript
// Role definitions
export enum UserRole {
  ACCOUNT_MANAGER = 'account_manager',
  DISTRICT_MANAGER = 'district_manager',
  BILLING_ADMIN = 'billing_admin',
  BILLING_MANAGER = 'billing_manager',
  REGIONAL_FINANCE = 'regional_finance',
  CORPORATE_FINANCE = 'corporate_finance'
}

// Permission mapping
export const RolePermissions = {
  [UserRole.ACCOUNT_MANAGER]: ['read_own_sites', 'update_forecasts'],
  [UserRole.DISTRICT_MANAGER]: ['read_district_sites', 'approve_forecasts'],
  [UserRole.BILLING_ADMIN]: ['read_all_billing', 'generate_invoices'],
  // ... additional role mappings
};
```

## Performance Configuration

### Optimization Strategy Implementation

#### Caching Configuration
- **Browser Caching**: Configure appropriate cache headers for static assets
- **API Caching**: Implement Redis caching for frequently accessed data
- **Component Caching**: Use React.memo and useMemo for expensive computations
- **Database Caching**: Configure Entity Framework caching for common queries

#### Loading Strategy Configuration
- **Lazy Loading**: Implement code splitting and lazy loading for large components
- **Pagination**: Use pagination for large datasets (default: 50 items per page)
- **Progressive Loading**: Load critical content first, defer non-essential elements
- **Image Optimization**: Implement responsive images with appropriate formats

#### Performance Monitoring Setup
```typescript
// Performance monitoring configuration
export const PerformanceConfig = {
  enableMetrics: true,
  sampleRate: 0.1, // 10% sampling for production
  thresholds: {
    pageLoad: 3000, // 3 seconds
    apiResponse: 1000, // 1 second
    renderTime: 100 // 100ms
  },
  alerts: {
    enabled: true,
    channels: ['email', 'slack']
  }
};
```

## Security Configuration

### Data Protection Setup

#### Secret Management Configuration
- **Azure Key Vault**: Store all secrets and connection strings
- **Environment Variables**: Use for non-sensitive configuration
- **Local Development**: Use local.settings.json (excluded from git)
- **Production**: Azure App Configuration for runtime settings

#### Input Validation Configuration
```typescript
// Input validation schema example
import { z } from 'zod';

export const ContractSchema = z.object({
  contractId: z.number().positive(),
  contractType: z.enum(['revenue_share', 'management_agreement', 'fixed_fee']),
  startDate: z.date(),
  endDate: z.date().optional(),
  terms: z.object({
    rate: z.number().min(0),
    threshold: z.number().min(0).optional()
  })
});
```

#### Security Headers Configuration
```json
{
  "headers": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'"
  }
}
```

### Access Control Configuration

#### Principle of Least Privilege Implementation
- **Database Access**: Grant minimum required permissions for each service
- **API Access**: Implement granular endpoint-level authorization
- **File System**: Restrict file access to necessary directories only
- **Network Access**: Configure firewall rules for minimal required connectivity

## Custom Commands Configuration

### PR Documentation Generator Setup

#### Command Installation
```bash
# Install the PR documentation generator
npm install -g @townepark/pr-docs-generator

# Or use the shell script directly
chmod +x ./scripts/generate-pr-docs.sh
```

#### Usage Configuration
```bash
# Basic usage
generate-pr-docs <PR_ID> <TASK_ID> <USER_STORY_ID>

# Example with actual IDs
./scripts/generate-pr-docs.sh 123 456 789
```

#### Requirements Configuration
- **Azure CLI**: Must be installed and authenticated (`az login`)
- **Azure DevOps Extension**: Install with `az extension add --name azure-devops`
- **Organization Access**: Must have access to towne-park Azure DevOps organization
- **Work Item Access**: Valid PR, Task, and User Story IDs required

#### Output Configuration
- **File Format**: Timestamped markdown files
- **Location**: `./docs/pr-analysis/YYYYMMDD_HHMMSS_PR-{PR_ID}.md`
- **Content**: Comprehensive documentation following Azure DevOps MCP rules
- **Integration**: Automatic linking to related work items and documentation

## Deployment Configuration

### Environment Setup

#### Development Environment Configuration
```yaml
# development.yml
environment: development
database:
  connectionString: "Server=localhost;Database=TownePark_Dev;Trusted_Connection=true;"
  enableLogging: true
api:
  baseUrl: "https://localhost:7071"
  timeout: 30000
features:
  enableDebugMode: true
  enableDetailedErrors: true
```

#### Staging Environment Configuration
```yaml
# staging.yml
environment: staging
database:
  connectionString: "${STAGING_DB_CONNECTION_STRING}"
  enableLogging: false
api:
  baseUrl: "https://townepark-staging.azurewebsites.net"
  timeout: 10000
features:
  enableDebugMode: false
  enableDetailedErrors: false
```

#### Production Environment Configuration
```yaml
# production.yml
environment: production
database:
  connectionString: "${PROD_DB_CONNECTION_STRING}"
  enableLogging: false
api:
  baseUrl: "https://townepark-api.azurewebsites.net"
  timeout: 5000
features:
  enableDebugMode: false
  enableDetailedErrors: false
monitoring:
  enableApplicationInsights: true
  enablePerformanceCounters: true
```

### CI/CD Pipeline Configuration

#### Build Pipeline Setup
```yaml
# azure-pipelines.yml
trigger:
  branches:
    include:
      - develop
      - feature/*
      - release/*

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: Build
  jobs:
  - job: BuildAndTest
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '18.x'
    - task: DotNetCoreCLI@2
      inputs:
        command: 'restore'
    - task: DotNetCoreCLI@2
      inputs:
        command: 'build'
    - task: DotNetCoreCLI@2
      inputs:
        command: 'test'
        arguments: '--collect:"XPlat Code Coverage"'
```

#### Deployment Pipeline Configuration
```yaml
# deployment-pipeline.yml
stages:
- stage: DeployStaging
  condition: eq(variables['Build.SourceBranch'], 'refs/heads/develop')
  jobs:
  - deployment: DeployToStaging
    environment: 'staging'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'TownePark-Staging'
              appName: 'townepark-staging'

- stage: DeployProduction
  condition: eq(variables['Build.SourceBranch'], 'refs/heads/master')
  jobs:
  - deployment: DeployToProduction
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'TownePark-Production'
              appName: 'townepark-production'
```

## Monitoring and Logging Configuration

### Application Insights Setup
```typescript
// Application Insights configuration
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_APPINSIGHTS_KEY,
    enableAutoRouteTracking: true,
    enableCorsCorrelation: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true
  }
});

appInsights.loadAppInsights();
export { appInsights };
```

### Logging Configuration
```csharp
// Backend logging configuration
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddLogging(builder =>
        {
            builder.AddApplicationInsights();
            builder.AddConsole();
            builder.SetMinimumLevel(LogLevel.Information);
        });
    }
}
```

## Related Documentation

- [Billing Technical Architecture](../../technical/backend/20250716_Billing_TechnicalArchitecture_Development.md)
- [Forecasting System Overview](../../systems/forecasting/20250716_Forecasting_SystemOverview_Discovery.md)
- [Business Rules - Forecasting](../../business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md)
- [User Access Configuration](../user-access/role-based-permissions.md)
- [System Settings Overview](./system-configuration-overview.md)

## Troubleshooting and Support

### Common Configuration Issues

#### Git Workflow Issues
- **Problem**: PR targeting wrong branch
- **Solution**: Change target branch in PR settings, ensure feature branches target develop
- **Prevention**: Use branch protection rules and automated checks

#### Authentication Issues
- **Problem**: Users unable to access protected routes
- **Solution**: Verify Azure AD configuration and role assignments
- **Prevention**: Implement comprehensive authentication testing

#### Build Pipeline Failures
- **Problem**: Tests failing in CI/CD but passing locally
- **Solution**: Check environment differences, dependency versions, and configuration
- **Prevention**: Use containerized builds and consistent environments

### Support Contacts

#### Development Team Leads
- **Frontend Lead**: [Contact Information]
- **Backend Lead**: [Contact Information]
- **DevOps Lead**: [Contact Information]

#### Azure Support
- **Azure DevOps**: Use built-in support ticket system
- **Azure Services**: Enterprise support contract available

This configuration guide ensures consistent, high-quality development practices across all Towne Park projects while maintaining security, performance, and maintainability standards.