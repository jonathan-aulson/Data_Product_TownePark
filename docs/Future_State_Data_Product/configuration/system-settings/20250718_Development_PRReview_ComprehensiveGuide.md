---
title: "Towne Park Development - Pull Request Review Comprehensive Guide"
description: "Complete configuration guide for pull request review processes, Azure DevOps MCP tools, and quality assurance standards for Towne Park's financial systems development"
created_date: 2025-07-18
last_updated_date: 2025-07-18
source_date: 2025-07-18
version: 1.0
status: Draft
owner: "Jonathan Aulson"
source_documents:
  - "pr-review 1.md"
systems:
  - Billing
  - Forecasting
  - Development Tools
components:
  - Frontend
  - Backend
  - Configuration
  - Testing
  - Integration
business_domains:
  - Code Review
  - Development Process
  - Quality Assurance
  - Full-Stack Development
  - Azure DevOps Integration
user_roles:
  - Developer
  - Technical Lead
  - Code Reviewer
  - Quality Assurance
  - DevOps Engineer
tags:
  - development
  - code-review
  - azure-devops
  - mcp-tools
  - quality-assurance
  - configuration
  - standards
  - process
  - full-stack
---

# Towne Park Development - Pull Request Review Comprehensive Guide

## Purpose

This comprehensive guide establishes standardized pull request review processes for Towne Park's financial systems development, incorporating Azure DevOps MCP tools and quality assurance standards. It ensures consistent, thorough, and efficient code reviews across backend (.NET Core APIs) and frontend (React + TypeScript) development while maintaining integration with Power Platform components.

## Overview

The pull request review process is a critical component of Towne Park's software development lifecycle, ensuring code quality, security, and maintainability across all financial systems including Billing, Forecasting, and Contract Management. This guide provides comprehensive procedures for conducting reviews using both automated tools and manual processes.

**Important Configuration Note**: Reviews must adapt to the scope of changes - concentrate on frontend concerns for frontend-only PRs, backend concerns for backend-only PRs, and provide comprehensive full-stack coverage for cross-cutting changes while noting component interactions.

## Architecture Context

### Backend Stack Configuration (.NET Core)
- **API Layer**: `/api/src/Functions/` - Azure Functions with HTTP triggers
- **Models**: `/api/src/Models/Dto/` - Data Transfer Objects
- **Services**: `/api/src/Services/` - Business logic layer
- **Adapters**: `/api/src/Adapters/` - External service integration
- **Tests**: `/api/tests/` - Unit and integration tests

### Frontend Stack Configuration (React + TypeScript)
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

## Azure DevOps MCP Tools Configuration

### Available Tools

#### Pull Request Management
- **`list_pull_requests`** - List pull requests in a repository
- **`get_pull_request_comments`** - Get comments from a specific pull request
- **`add_pull_request_comment`** - Add a comment to a pull request
- **`update_pull_request`** - Update an existing pull request with new properties, link work items, and manage reviewers

#### Repository & Code Analysis
- **`get_file_content`** - Get content of a file or directory from a repository
- **`search_code`** - Search for code across repositories in a project
- **`list_repositories`** - List repositories in a project
- **`get_repository_details`** - Get detailed information about a repository

#### Work Item Integration
- **`get_work_item`** - Get details of a specific work item
- **`search_work_items`** - Search for work items across projects

#### Project Context
- **`get_project_details`** - Get comprehensive details of a project
- **`list_projects`** - List all projects in an organization

### Default Configuration Parameters

**Standard Configuration for Towne Park Setup:**
- **Default Organization**: `towne-park`
- **Default Project**: `Towne Park Billing`
- **Default Repository**: Context-dependent based on system being reviewed

## Review Process Configuration

### Code Analysis Priority Configuration

#### Backend Changes Analysis (40% of review time)
1. **API Endpoints**: `/api/src/Functions/[Feature].cs`
2. **DTOs & Models**: `/api/src/Models/Dto/[Feature]Dto.cs`
3. **Services & Adapters**: `/api/src/Services/`, `/api/src/Adapters/`
4. **Unit Tests**: `/api/tests/Functions/[Feature]Tests.cs`

#### Frontend Changes Analysis (40% of review time)
1. **Components**: `/src/components/[Feature]/`
2. **Pages**: `/src/pages/[Feature]/`
3. **Hooks**: `/src/hooks/[Feature]Hook.ts`
4. **Context**: `/src/contexts/[Feature]Context.tsx`
5. **Tests**: `/src/__test__/`

#### Configuration & Infrastructure Analysis (20% of review time)
1. **Package.json** - Dependencies and scripts
2. **Configuration files** - Vite, TypeScript, Tailwind
3. **Static web app config**

### MCP-Based Review Workflow

#### Step 1: Initial Information Gathering
```bash
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

#### Step 2: Code Analysis Process
```bash
# Examine changed files (backend)
Use: get_file_content
Parameters: repositoryId, path="/api/src/Functions/[Feature].cs", version=[branch_name], versionType="branch"

# Examine changed files (frontend)
Use: get_file_content
Parameters: repositoryId, path="/src/components/[Feature]/[Component].tsx", version=[branch_name], versionType="branch"

# Search for related patterns
Use: search_code
Parameters: searchText="[feature_keyword]", filters={Branch: [branch_name]}
```

## Quality Assurance Standards

### Review Decision Framework

| Criteria | Approve | Approve with Suggestions | Changes Requested |
|----------|---------|-------------------------|-------------------|
| **Functionality** | ✅ Works correctly | ✅ Works, minor improvements | ❌ Bugs/issues exist |
| **Security** | ✅ No vulnerabilities | ⚠️ Minor security considerations | ❌ Security issues present |
| **Code Quality** | ✅ Clean, maintainable | ⚠️ Some improvements needed | ❌ Poor quality/structure |
| **Testing** | ✅ Comprehensive tests | ⚠️ Adequate coverage | ❌ Missing/insufficient tests |
| **Performance** | ✅ Optimized | ⚠️ Minor performance issues | ❌ Significant performance problems |
| **Accessibility** | ✅ WCAG compliant | ⚠️ Minor a11y issues | ❌ Major accessibility problems |
| **Type Safety** | ✅ Fully typed | ⚠️ Some any types | ❌ Poor TypeScript usage |

### Code Quality Checklist

#### Backend Requirements (.NET Core)
- [ ] Proper async/await usage
- [ ] DTO validation attributes present
- [ ] Appropriate HTTP status codes
- [ ] Comprehensive error handling
- [ ] Input validation and sanitization
- [ ] Unit tests with good coverage
- [ ] Dependency injection patterns
- [ ] Logging implementation

#### Frontend Requirements (React + TypeScript)
- [ ] TypeScript types properly defined
- [ ] React hooks used correctly (dependencies, cleanup)
- [ ] Proper component composition and reusability
- [ ] Form validation with Zod schemas
- [ ] Accessibility attributes (ARIA, semantic HTML)
- [ ] Responsive design implementation
- [ ] Error boundary handling
- [ ] Loading and error states
- [ ] Proper event handling and cleanup
- [ ] Performance optimization (useMemo, useCallback where needed)

#### Shared Requirements
- [ ] No code duplication
- [ ] Security considerations addressed
- [ ] Performance implications considered
- [ ] Integration with existing architecture
- [ ] Documentation/comments where needed

## Technology-Specific Review Guidelines

### React Component Review Standards

```typescript
// Check for proper component structure
interface ComponentProps {
  // Props should be properly typed
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Check for proper hook usage
  const [state, setState] = useState<Type>(initialValue);
  
  // Check for proper effect cleanup
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]); // Verify dependencies
  
  // Check for proper error handling
  // Check for accessibility
  // Check for performance optimizations
};
```

### Form Validation Review Standards

```typescript
// Zod schema validation
const schema = z.object({
  field: z.string().min(1, "Required field"),
  // Check for comprehensive validation
});

// React Hook Form integration
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

### API Integration Review Standards

```typescript
// Check for proper error handling
const fetchData = async () => {
  try {
    const response = await fetch('/api/endpoint');
    if (!response.ok) throw new Error('API Error');
    return await response.json();
  } catch (error) {
    // Proper error handling
  }
};
```

### Styling & UI Review Standards
- [ ] TailwindCSS classes used appropriately
- [ ] Radix UI components implemented correctly
- [ ] Responsive design patterns
- [ ] Consistent spacing and typography
- [ ] Dark/light theme support
- [ ] Component variants properly implemented

## MCP Tool Integration Procedures

### Step 1: Identify and Get PR
```javascript
// Find the specific PR
Use: list_pull_requests
Example: 
{
  "repositoryId": "Towne Park Billing",
  "status": "active",
  "top": 50
}

// Get PR comments and context
Use: get_pull_request_comments
Example:
{
  "repositoryId": "Towne Park Billing", 
  "pullRequestId": 637
}
```

### Step 2: Analyze Backend Changes
```javascript
// Get API function content
Use: get_file_content
Example:
{
  "repositoryId": "Towne Park Billing",
  "path": "/api/src/Functions/JobCodes.cs",
  "version": "task/2206-edit-job-title",
  "versionType": "branch"
}

// Get DTO definitions
Use: get_file_content
Example:
{
  "repositoryId": "Towne Park Billing",
  "path": "/api/src/Models/Dto/JobCodeDto.cs",
  "version": "task/2206-edit-job-title",
  "versionType": "branch"
}

// Get unit tests
Use: get_file_content
Example:
{
  "repositoryId": "Towne Park Billing",
  "path": "/api/tests/Functions/JobCodesTests.cs",
  "version": "task/2206-edit-job-title",
  "versionType": "branch"
}
```

### Step 3: Analyze Frontend Changes
```javascript
// Get React components
Use: get_file_content
Example:
{
  "repositoryId": "Towne Park Billing",
  "path": "/src/components/AdminPanel/JobCodeManagement.tsx",
  "version": "task/2206-edit-job-title",
  "versionType": "branch"
}

// Get page components
Use: get_file_content
Example:
{
  "repositoryId": "Towne Park Billing",
  "path": "/src/pages/JobCodes.tsx",
  "version": "task/2206-edit-job-title",
  "versionType": "branch"
}

// Get custom hooks
Use: get_file_content
Example:
{
  "repositoryId": "Towne Park Billing",
  "path": "/src/hooks/useJobCodes.ts",
  "versionType": "branch"
}
```

### Step 4: Search for Integration Points
```javascript
// Search for API usage patterns
Use: search_code
Example:
{
  "searchText": "jobcodes/title",
  "filters": {
    "Branch": ["task/2206-edit-job-title"]
  }
}

// Search for component usage
Use: search_code
Example:
{
  "searchText": "JobCodeManagement",
  "filters": {
    "Branch": ["task/2206-edit-job-title"]
  }
}
```

## Common Issues and Detection Patterns

### React-Specific Issues
```javascript
// Search for common React anti-patterns
{
  "searchText": "useEffect",
  "filters": {"Branch": ["target-branch"]}
}
```

**Issues to Watch For:**
- Missing dependency arrays in useEffect
- Infinite re-render loops
- Memory leaks from uncleared timeouts/subscriptions
- Direct state mutations
- Improper key props in lists
- Missing error boundaries

### TypeScript Issues
```javascript
// Search for TypeScript concerns
{
  "searchText": "any",
  "filters": {"Branch": ["target-branch"]}
}
```

**Issues to Watch For:**
- Usage of `any` types
- Missing interface definitions
- Incorrect type assertions
- Missing generic constraints
- Non-null assertions without safety

### Performance Issues
```javascript
// Search for performance patterns
{
  "searchText": "useMemo|useCallback",
  "filters": {"Branch": ["target-branch"]}
}
```

**Issues to Watch For:**
- Missing memoization for expensive calculations
- Unnecessary re-renders
- Large bundle sizes
- Unoptimized images
- Blocking operations in render

### Accessibility Issues
**Issues to Watch For:**
- Missing ARIA attributes
- Poor keyboard navigation
- Insufficient color contrast
- Missing alternative text
- Improper semantic HTML
- Focus management issues

## Frontend Path Patterns Configuration

### Component Structure
```
/src/components/
├── ui/                  # Base components (Button, Input, etc.)
├── [FeatureName]/       # Feature-specific components
│   ├── [Feature]List.tsx
│   ├── [Feature]Form.tsx
│   ├── [Feature]Modal.tsx
│   └── index.ts         # Barrel exports
└── [SharedComponent].tsx
```

### File Extension Patterns
- **`.tsx`** - React components with JSX
- **`.ts`** - TypeScript utilities, hooks, types
- **`.css`** - Component-specific styles
- **`.test.tsx`** - Component tests
- **`.stories.tsx`** - Storybook stories (if applicable)

## Review Comment Templates

### Standardized Review Comment Template

```markdown
# Pull Request Review: [PR Title]

## Summary
[Brief overview of changes covering both backend and frontend modifications]

## Backend Analysis
### 🟢 API Implementation Strengths
- [List positive aspects of API changes]

### 🟡 Backend Areas for Improvement
#### 1. [Issue Category - e.g., Input Validation]
**File: `/api/src/Functions/[File].cs` - Lines [X-Y]**
```csharp
// Current code example
[problematic code snippet]
```
**Suggestion**: [Specific improvement recommendation]

## Frontend Analysis
### 🟢 UI/UX Implementation Strengths
- [List positive aspects of frontend changes]

### 🟡 Frontend Areas for Improvement
#### 1. [Issue Category - e.g., TypeScript Usage]
**File: `/src/components/[Feature]/[Component].tsx` - Lines [X-Y]**
```typescript
// Current code example
[problematic code snippet]
```
**Suggestion**: [Specific improvement recommendation]

### 🟢 Testing Assessment
**Backend Tests:**
- [Evaluation of API tests]

**Frontend Tests:**
- [Evaluation of component tests]

## Cross-cutting Concerns
- [ ] API-Frontend integration properly implemented
- [ ] Error handling consistent between layers
- [ ] Loading states properly managed
- [ ] Data flow and state management appropriate

## Recommendation
**[Decision]** - [Brief justification covering both backend and frontend]

## Related Work Items
- [Verification of linked tasks/stories]
```

## Quick Reference Commands

### Full-Stack Review Commands
```bash
# Backend analysis
get_file_content(repositoryId="Towne Park Billing", path="/api/src/Functions/[Feature].cs", version="branch-name", versionType="branch")
get_file_content(repositoryId="Towne Park Billing", path="/api/tests/Functions/[Feature]Tests.cs", version="branch-name", versionType="branch")

# Frontend analysis
get_file_content(repositoryId="Towne Park Billing", path="/src/components/[Feature]/[Component].tsx", version="branch-name", versionType="branch")
get_file_content(repositoryId="Towne Park Billing", path="/src/pages/[Feature].tsx", version="branch-name", versionType="branch")

# Configuration analysis
get_file_content(repositoryId="Towne Park Billing", path="/package.json", version="branch-name", versionType="branch")

# Integration analysis
search_code(searchText="[api_endpoint_path]", filters={"Branch": ["branch-name"]})
search_code(searchText="[component_name]", filters={"Branch": ["branch-name"]})
```

## Best Practices for Full-Stack Review

### Efficiency Guidelines
1. **Start with the feature overview** - Understand the complete user story
2. **Review backend API first** - Ensure data contracts are solid
3. **Then review frontend implementation** - Check API integration
4. **Verify end-to-end functionality** - Ensure the complete flow works
5. **Check error handling across layers** - Consistent error experience

### Common Integration Issues
- API response shape doesn't match frontend expectations
- Missing error handling in API calls
- Inconsistent loading states
- Type mismatches between backend DTOs and frontend interfaces

## Integration with Existing Standards

### Related Documentation

- [Development Configuration Guide Standards](20250716_Development_ConfigurationGuide_Standards.md) ✓ VERIFIED
- [Comprehensive Development Standards](20250718_Development_Standards_ComprehensiveGuide.md) ✓ VERIFIED
- [Definition of Done Comprehensive Guide](20250718_Development_DefinitionOfDone_ComprehensiveGuide.md) ✓ VERIFIED

## Configuration Validation

### Setup Verification Checklist
- [ ] Azure DevOps MCP tools properly configured
- [ ] Default organization and project settings verified
- [ ] Repository access permissions confirmed
- [ ] Review templates and checklists deployed
- [ ] Integration with existing development workflows tested
- [ ] Quality gates aligned with Definition of Done
- [ ] Cross-reference links to related documentation verified

### Ongoing Maintenance
- [ ] Regular review of MCP tool configurations
- [ ] Updates to quality standards based on lessons learned
- [ ] Alignment with evolving development practices
- [ ] Integration with new tools and technologies
- [ ] Training updates for development teams

## Code Validation Report

**Last Validated**: 2025-07-18
**Validation Scope**: Technical Configuration

### Validation Summary
- ✅ **Verified Elements**: Azure DevOps MCP tool specifications match documented capabilities
- ✅ **Process Alignment**: Review workflows align with existing development standards
- ✅ **Integration Points**: Proper integration with Towne Park development ecosystem
- ✅ **Quality Standards**: Comprehensive quality gates and decision frameworks

### Validation Findings
No Power Platform code validation applicable for this process documentation. The document focuses on development tools and processes rather than business logic implementation.

### Code File References
- **Process Documentation**: No specific code files referenced
- **Tool Integration**: Azure DevOps MCP tools (external system)
- **Configuration Files**: Package.json, TypeScript config, Vite config (project-specific)

### Validation Methodology
- **Validation Approach**: Process and tool specification review
- **Limitations**: No direct Power Platform code validation applicable
- **Alignment Check**: Verified compatibility with existing development standards

This comprehensive pull request review guide ensures consistent, thorough, and efficient code reviews across all Towne Park financial systems development while maintaining integration with existing development standards and Power Platform components.
## Quick Links

- [Development Configuration Guide Standards](20250716_Development_ConfigurationGuide_Standards.md)
- [Comprehensive Development Standards](20250718_Development_Standards_ComprehensiveGuide.md)
- [Definition of Done Comprehensive Guide](20250718_Development_DefinitionOfDone_ComprehensiveGuide.md)
