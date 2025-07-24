---
title: "AI SDLC Integration - Configuration Guide"
description: "Comprehensive configuration guide for setting up AI tools in the software development lifecycle, including Root Code, MCP servers, Azure DevOps integration, and context file management"
created_date: 2025-07-23
last_updated_date: 2025-07-23
source_date: 2025-06-12
version: 1.0
status: Active
owner: "Andrew Scheuer"
contributors:
  - "Javier Casas"
  - "Cesar Figueroa"
  - "Johnn Hesseltine"
  - "Jonathan Aulson"
source_documents:
  - "20250612_AI_In_Our_SDLC_Processed.md"
systems:
  - Development Infrastructure
  - Azure DevOps
  - Root Code
  - SharePoint
components:
  - AI Development Tools
  - MCP Servers
  - Authentication Systems
  - Context Management
business_domains:
  - Software Development
  - System Configuration
  - Development Productivity
user_roles:
  - System Administrator
  - DevOps Engineer
  - Technical Lead
  - Developer
tags:
  - configuration
  - setup
  - ai-tools
  - root-code
  - mcp-servers
  - azure-devops
  - sharepoint
  - authentication
  - context-management
---

# AI SDLC Integration - Configuration Guide

## Purpose

This configuration guide provides comprehensive setup instructions for integrating AI tools into Towne Park's Software Development Life Cycle. The guide covers Root Code installation and configuration, MCP server setup, Azure DevOps integration, SharePoint connectivity, and context file management to enable AI-enhanced development workflows.

## Prerequisites

### System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux Ubuntu 18.04+
- **Memory**: Minimum 8GB RAM, recommended 16GB+
- **Storage**: 10GB available disk space
- **Network**: Stable internet connection for cloud service integration
- **Development Environment**: Visual Studio Code 1.70+ or compatible IDE

### Required Accounts and Permissions
- **Allata Account**: Active license for Root Code access
- **Azure DevOps**: Organization member with work item and repository permissions
- **SharePoint**: Site access for document retrieval and context management
- **Azure AD**: Application registration permissions for service authentication

## Root Code Installation and Configuration

### Step 1: Root Code Installation

#### Download and Install
1. **Access Allata Portal**
   - Navigate to Allata licensing portal
   - Download Root Code installer for your operating system
   - Verify installer integrity with provided checksums

2. **Installation Process**
   ```bash
   # Windows
   ./RootCode-Setup.exe
   
   # macOS
   sudo installer -pkg RootCode.pkg -target /
   
   # Linux
   sudo dpkg -i rootcode_amd64.deb
   ```

3. **License Activation**
   - Launch Root Code application
   - Enter Allata-provided license key
   - Complete activation process
   - Verify installation with version check

#### Initial Configuration
```json
{
  "rootCodeConfig": {
    "workspace": "/path/to/townepark/projects",
    "defaultModel": "claude-3-sonnet",
    "tokenLimit": 8000,
    "contextFiles": [
      ".clinerules",
      "coding-guidelines.md",
      "architecture-overview.md"
    ],
    "integrations": {
      "azureDevOps": true,
      "sharePoint": true,
      "mcpServers": true
    }
  }
}
```

### Step 2: Mode Configuration

#### Custom Mode Setup
1. **Planning Mode Configuration**
   ```json
   {
     "mode": "planning",
     "model": "claude-3-sonnet",
     "temperature": 0.3,
     "maxTokens": 4000,
     "systemPrompt": "You are a technical architect for Towne Park financial systems. Focus on planning, design, and architecture decisions. Always consider Clean Architecture principles, SOLID design patterns, and the specific business context of parking management and financial operations.",
     "contextPriority": ["business-rules", "architecture", "requirements"]
   }
   ```

2. **Implementation Mode Configuration**
   ```json
   {
     "mode": "implementation",
     "model": "gpt-4-turbo",
     "temperature": 0.1,
     "maxTokens": 8000,
     "systemPrompt": "You are a senior .NET developer specializing in Clean Architecture and financial systems. Generate production-ready code following Towne Park coding standards. Always include comprehensive error handling, validation, and unit tests.",
     "contextPriority": ["coding-standards", "patterns", "examples"]
   }
   ```

3. **Testing Mode Configuration**
   ```json
   {
     "mode": "testing",
     "model": "claude-3-haiku",
     "temperature": 0.2,
     "maxTokens": 2000,
     "systemPrompt": "You are a QA engineer focused on comprehensive testing for financial systems. Generate thorough unit tests, integration tests, and validation scenarios. Ensure 80%+ code coverage and include edge cases.",
     "contextPriority": ["testing-standards", "patterns", "coverage-requirements"]
   }
   ```

4. **Documentation Mode Configuration**
   ```json
   {
     "mode": "documentation",
     "model": "gpt-4",
     "temperature": 0.4,
     "maxTokens": 6000,
     "systemPrompt": "You are a technical writer specializing in financial software documentation. Create clear, comprehensive documentation following Towne Park standards. Include examples, diagrams, and user-focused explanations.",
     "contextPriority": ["documentation-standards", "templates", "examples"]
   }
   ```

## MCP Server Configuration

### Step 3: Azure DevOps MCP Server Setup

#### Prerequisites
1. **Personal Access Token (PAT) Creation**
   - Navigate to Azure DevOps → User Settings → Personal Access Tokens
   - Create new token with following scopes:
     - Work Items: Read & Write
     - Code: Read
     - Pull Requests: Read & Write
     - Project and Team: Read

2. **Service Principal Setup (Alternative)**
   ```bash
   # Create Azure AD application
   az ad app create --display-name "TownePark-MCP-DevOps"
   
   # Create service principal
   az ad sp create --id <app-id>
   
   # Assign permissions in Azure DevOps
   # Navigate to Organization Settings → Permissions → Add service principal
   ```

#### MCP Server Installation
1. **Install MCP Server Package**
   ```bash
   npm install -g @townepark/azure-devops-mcp-server
   ```

2. **Configuration File Setup**
   ```json
   {
     "mcpServers": {
       "azure-devops": {
         "command": "azure-devops-mcp-server",
         "args": ["--config", "/path/to/azure-devops-config.json"],
         "env": {
           "AZURE_DEVOPS_ORG": "townepark",
           "AZURE_DEVOPS_PAT": "${AZURE_DEVOPS_PAT}",
           "AZURE_DEVOPS_PROJECT": "TownePark-DataProduct"
         }
       }
     }
   }
   ```

3. **Environment Variables Setup**
   ```bash
   # Windows
   setx AZURE_DEVOPS_PAT "your-pat-token-here"
   
   # macOS/Linux
   export AZURE_DEVOPS_PAT="your-pat-token-here"
   echo 'export AZURE_DEVOPS_PAT="your-pat-token-here"' >> ~/.bashrc
   ```

#### MCP Server Configuration
```json
{
  "azureDevOpsConfig": {
    "organization": "townepark",
    "project": "TownePark-DataProduct",
    "apiVersion": "7.0",
    "capabilities": {
      "workItems": {
        "read": true,
        "write": true,
        "create": true,
        "update": true
      },
      "pullRequests": {
        "read": true,
        "create": true,
        "update": true
      },
      "repositories": {
        "read": true,
        "clone": false
      }
    },
    "rateLimiting": {
      "requestsPerMinute": 200,
      "burstLimit": 50
    },
    "caching": {
      "enabled": true,
      "ttl": 300,
      "maxSize": "100MB"
    }
  }
}
```

### Step 4: SharePoint MCP Server Setup

#### Azure AD Application Registration
1. **Create Application Registration**
   ```bash
   # Create Azure AD app
   az ad app create \
     --display-name "TownePark-SharePoint-MCP" \
     --required-resource-accesses @sharepoint-permissions.json
   ```

2. **SharePoint Permissions Configuration**
   ```json
   [
     {
       "resourceAppId": "00000003-0000-0ff1-ce00-000000000000",
       "resourceAccess": [
         {
           "id": "df021288-bdef-4463-88db-98f22de89214",
           "type": "Role"
         },
         {
           "id": "863451e7-0667-486c-a5d6-d135439485f0",
           "type": "Role"
         }
       ]
     }
   ]
   ```

3. **Certificate-Based Authentication Setup**
   ```bash
   # Generate certificate
   openssl req -x509 -newkey rsa:2048 -keyout private.key -out certificate.crt -days 365
   
   # Upload certificate to Azure AD app
   az ad app credential reset --id <app-id> --cert @certificate.crt
   ```

#### SharePoint MCP Configuration
```json
{
  "sharePointConfig": {
    "tenantId": "your-tenant-id",
    "clientId": "your-client-id",
    "certificatePath": "/path/to/certificate.crt",
    "privateKeyPath": "/path/to/private.key",
    "sites": [
      {
        "url": "https://townepark.sharepoint.com/sites/DataProduct",
        "alias": "dataproduct",
        "documentLibraries": [
          "Documents",
          "Technical Specifications",
          "Business Requirements"
        ]
      }
    ],
    "searchConfig": {
      "maxResults": 50,
      "timeout": 30000,
      "includeMetadata": true
    }
  }
}
```

## Context File Management

### Step 5: Project Context Files Setup

#### .clinerules File Configuration
```markdown
# Towne Park Data Product - AI Assistant Context

## Project Overview
**Client**: Towne Park
**Project**: Financial Systems Modernization and Data Product Development
**Domain**: Parking Management and Financial Operations
**Timeline**: Multi-phase implementation with iterative delivery

## Business Context
### Contract Types
- **PLH (Per Labor Hour)**: Hourly-based revenue contracts
- **Fixed Fee**: Predetermined monthly/annual fees
- **Revenue Share**: Percentage-based revenue agreements
- **Management Agreement**: Comprehensive operational contracts

### Key Financial Processes
- **RSS (Revenue Summary Sheet)**: Monthly financial submissions
- **PTEB (Payroll Tax and Employee Benefits)**: Employee cost calculations
- **Billing Automation**: Automated invoice generation and processing
- **Forecasting**: Predictive revenue and cost modeling

## Technical Architecture
### Backend Stack
- **Language**: C# (.NET 8)
- **Architecture**: Clean Architecture (4-layer)
- **Database**: SQL Server with Entity Framework Core
- **Patterns**: CQRS, Repository, Unit of Work, Dependency Injection

### Frontend Stack
- **Language**: TypeScript
- **Framework**: React 18+
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Build Tool**: Vite

### Cloud Infrastructure
- **Platform**: Microsoft Azure
- **Services**: App Service, SQL Database, Storage Account, Key Vault
- **CI/CD**: Azure DevOps Pipelines
- **Monitoring**: Application Insights

## Domain Terminology
| Term | Definition |
|------|------------|
| RSS | Revenue Summary Sheet - Monthly financial submission document |
| PTEB | Payroll Tax and Employee Benefits - Employee cost calculations |
| PLH | Per Labor Hour - Hourly-based contract type |
| DTO | Data Transfer Object - Object for transferring data between layers |
| VODTO | View Object Data Transfer Object - UI-specific data transfer object |
| Site | Physical parking location managed by Towne Park |
| Contract | Legal agreement defining revenue and operational terms |

## Coding Standards
### Naming Conventions
- **Classes**: PascalCase (e.g., `BillingService`, `ContractRepository`)
- **Methods**: PascalCase (e.g., `CalculateRevenue`, `ValidateContract`)
- **Variables**: camelCase (e.g., `contractAmount`, `billingPeriod`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_ATTEMPTS`)
- **Interfaces**: IPascalCase (e.g., `IBillingService`, `IContractRepository`)

### Folder Structure
```
src/
├── TownePark.Api/
│   ├── Controllers/
│   ├── Middleware/
│   └── Program.cs
├── TownePark.Application/
│   ├── Services/
│   │   ├── Interfaces/
│   │   └── Implementations/
│   ├── DTOs/
│   ├── Validators/
│   └── Mappings/
├── TownePark.Domain/
│   ├── Entities/
│   ├── ValueObjects/
│   ├── Enums/
│   └── Interfaces/
├── TownePark.Infrastructure/
│   ├── Data/
│   │   ├── Context/
│   │   ├── Repositories/
│   │   └── Configurations/
│   ├── Services/
│   └── Integrations/
└── TownePark.Tests/
    ├── Unit/
    ├── Integration/
    └── TestHelpers/
```

## Quality Requirements
- **Unit Test Coverage**: Minimum 80%
- **Code Review**: Required for all pull requests
- **Security Scanning**: Automated security analysis
- **Performance Testing**: Load testing for critical endpoints
- **Documentation**: Comprehensive XML documentation for public APIs

## Integration Points
- **Azure DevOps**: Work item management and CI/CD
- **SharePoint**: Document storage and retrieval
- **Power Platform**: Future low-code integrations
- **Third-party APIs**: Payment processing, tax calculation services

## Common Patterns and Examples
### Service Implementation Pattern
```csharp
public class BillingService : IBillingService
{
    private readonly IBillingRepository _repository;
    private readonly ILogger<BillingService> _logger;
    
    public BillingService(IBillingRepository repository, ILogger<BillingService> logger)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
    
    public async Task<BillingResultDto> CalculateBillingAsync(BillingRequestDto request)
    {
        try
        {
            // Validation
            if (request == null)
                throw new ArgumentNullException(nameof(request));
                
            // Business logic implementation
            // ...
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calculating billing for request {RequestId}", request?.Id);
            throw;
        }
    }
}
```

### Repository Pattern Example
```csharp
public class ContractRepository : IContractRepository
{
    private readonly DataContext _context;
    
    public ContractRepository(DataContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }
    
    public async Task<Contract> GetByIdAsync(int id)
    {
        return await _context.Contracts
            .Include(c => c.Site)
            .Include(c => c.BillingDetails)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}
```

## Error Handling Standards
- Use structured logging with correlation IDs
- Implement global exception handling middleware
- Return consistent error response format
- Include appropriate HTTP status codes
- Log errors with sufficient context for debugging

## Security Guidelines
- Validate all input parameters
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Encrypt sensitive data at rest and in transit
- Follow OWASP security guidelines
```

#### Coding Guidelines File
```markdown
# Towne Park Development Standards

## General Principles
1. **Clean Code**: Write code that is easy to read, understand, and maintain
2. **SOLID Principles**: Follow Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion
3. **DRY (Don't Repeat Yourself)**: Avoid code duplication through proper abstraction
4. **YAGNI (You Aren't Gonna Need It)**: Don't implement features until they are actually needed
5. **Fail Fast**: Validate inputs early and throw meaningful exceptions

## Architecture Standards
### Clean Architecture Layers
1. **API Layer** (`TownePark.Api`): Controllers, middleware, API-specific logic
2. **Application Layer** (`TownePark.Application`): Services, DTOs, business logic orchestration
3. **Domain Layer** (`TownePark.Domain`): Entities, value objects, domain logic
4. **Infrastructure Layer** (`TownePark.Infrastructure`): Data access, external integrations

### Dependency Rules
- Dependencies point inward (API → Application → Domain)
- Domain layer has no external dependencies
- Use dependency injection for all cross-layer dependencies
- Interfaces defined in inner layers, implementations in outer layers

## Code Organization
### File Naming
- Use descriptive names that reflect the file's purpose
- Match class names with file names
- Use PascalCase for all file names
- Group related files in appropriate folders

### Class Design
- Single Responsibility: Each class should have one reason to change
- Small Classes: Prefer multiple small classes over large monolithic ones
- Composition over Inheritance: Use composition when possible
- Immutable Objects: Prefer immutable objects for value types

## Testing Standards
### Unit Testing
- **Framework**: xUnit for .NET, Jest for React
- **Mocking**: Moq for .NET, Jest mocks for JavaScript
- **Coverage**: Minimum 80% code coverage
- **Naming**: `MethodName_Scenario_ExpectedResult`

### Test Structure
```csharp
[Fact]
public void CalculateBilling_ValidRequest_ReturnsCorrectAmount()
{
    // Arrange
    var service = new BillingService(mockRepository.Object, mockLogger.Object);
    var request = new BillingRequestDto { /* test data */ };
    
    // Act
    var result = await service.CalculateBillingAsync(request);
    
    // Assert
    Assert.NotNull(result);
    Assert.Equal(expectedAmount, result.Amount);
}
```

## Error Handling
### Exception Guidelines
- Use specific exception types
- Include meaningful error messages
- Log exceptions with appropriate level
- Don't catch and ignore exceptions
- Use custom exceptions for business rule violations

### Logging Standards
```csharp
// Good logging example
_logger.LogInformation("Processing billing calculation for contract {ContractId}", contractId);
_logger.LogWarning("Invalid billing amount {Amount} for contract {ContractId}", amount, contractId);
_logger.LogError(ex, "Failed to calculate billing for contract {ContractId}", contractId);
```

## Performance Guidelines
### Database Access
- Use async/await for all database operations
- Implement proper indexing strategies
- Use Include() for eager loading when needed
- Avoid N+1 query problems
- Use pagination for large result sets

### Caching Strategy
- Cache frequently accessed, rarely changing data
- Use appropriate cache expiration policies
- Implement cache invalidation strategies
- Monitor cache hit rates and effectiveness

## Security Standards
### Input Validation
- Validate all input at API boundaries
- Use data annotations for model validation
- Implement custom validators for complex business rules
- Sanitize input to prevent injection attacks

### Authentication and Authorization
- Use JWT tokens for API authentication
- Implement role-based authorization
- Validate permissions at service layer
- Log security-related events

## Documentation Requirements
### Code Documentation
- XML documentation for all public APIs
- Inline comments for complex business logic
- README files for each major component
- Architecture decision records (ADRs) for significant decisions

### API Documentation
- OpenAPI/Swagger specifications
- Request/response examples
- Error code documentation
- Authentication requirements
```

### Step 6: IDE Integration Setup

#### Visual Studio Code Configuration
1. **Install Required Extensions**
   ```json
   {
     "recommendations": [
       "ms-dotnettools.csharp",
       "ms-vscode.vscode-typescript-next",
       "bradlc.vscode-tailwindcss",
       "esbenp.prettier-vscode",
       "ms-vscode.vscode-json",
       "redhat.vscode-yaml"
     ]
   }
   ```

2. **Workspace Settings**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll": true,
       "source.organizeImports": true
     },
     "files.exclude": {
       "**/bin": true,
       "**/obj": true,
       "**/node_modules": true
     },
     "dotnet.defaultSolution": "TownePark.sln"
   }
   ```

## Authentication and Security

### Step 7: Secure Credential Management

#### Azure Key Vault Integration
1. **Key Vault Setup**
   ```bash
   # Create Key Vault
   az keyvault create \
     --name "townepark-ai-secrets" \
     --resource-group "townepark-dev" \
     --location "eastus"
   
   # Store secrets
   az keyvault secret set \
     --vault-name "townepark-ai-secrets" \
     --name "AzureDevOpsPAT" \
     --value "your-pat-token"
   ```

2. **Application Configuration**
   ```json
   {
     "KeyVault": {
       "VaultUri": "https://townepark-ai-secrets.vault.azure.net/",
       "ClientId": "your-client-id",
       "ClientSecret": "your-client-secret",
       "TenantId": "your-tenant-id"
     }
   }
   ```

#### Environment-Specific Configuration
```bash
# Development Environment
export ENVIRONMENT=Development
export AZURE_DEVOPS_PAT=$(az keyvault secret show --vault-name townepark-ai-secrets --name AzureDevOpsPAT --query value -o tsv)
export SHAREPOINT_CLIENT_ID=$(az keyvault secret show --vault-name townepark-ai-secrets --name SharePointClientId --query value -o tsv)

# Production Environment
export ENVIRONMENT=Production
# Use managed identity for production authentication
```

## Monitoring and Logging

### Step 8: Application Insights Configuration

#### Telemetry Setup
```json
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=your-key;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/",
    "EnableAdaptiveSampling": true,
    "EnablePerformanceCounterCollectionModule": true,
    "EnableDependencyTrackingTelemetryModule": true
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    },
    "ApplicationInsights": {
      "LogLevel": {
        "Default": "Information"
      }
    }
  }
}
```

#### Custom Metrics Configuration
```csharp
public class AIMetricsCollector
{
    private readonly TelemetryClient _telemetryClient;
    
    public void TrackAIUsage(string operation, TimeSpan duration, bool success)
    {
        _telemetryClient.TrackEvent("AI_Operation", new Dictionary<string, string>
        {
            ["Operation"] = operation,
            ["Success"] = success.ToString(),
            ["Duration"] = duration.TotalMilliseconds.ToString()
        });
    }
}
```

## Troubleshooting

### Common Configuration Issues

#### Root Code License Issues
**Problem**: License activation fails
**Solution**:
1. Verify internet connectivity
2. Check license key format and validity
3. Ensure system clock is synchronized
4. Contact Allata support for license verification

#### MCP Server Connection Issues
**Problem**: Azure DevOps MCP server not responding
**Diagnostic Steps**:
```bash
# Test Azure DevOps API connectivity
curl -u :{PAT_TOKEN} https://dev.azure.com/townepark/_apis/projects

# Check MCP server logs
tail -f /var/log/mcp-server/azure-devops.log

# Verify environment variables
echo $AZURE_DEVOPS_PAT
```

**Solution**:
1. Verify PAT token permissions and expiration
2. Check network connectivity and firewall rules
3. Validate MCP server configuration
4. Restart MCP server service

#### SharePoint Authentication Issues
**Problem**: SharePoint MCP returns 401 Unauthorized
**Diagnostic Steps**:
```bash
# Test certificate authentication
openssl x509 -in certificate.crt -text -noout

# Verify Azure AD app permissions
az ad app permission list --id <app-id>
```

**Solution**:
1. Verify certificate validity and format
2. Check Azure AD app permissions and admin consent
3. Validate SharePoint site access rights
4. Review audit logs for authentication failures

### Performance Optimization

#### Token Usage Optimization
```json
{
  "aiOptimization": {
    "contextCompression": true,
    "incrementalUpdates": true,
    "cacheStrategy": "moderate",
    "modelSelection": {
      "planning": "claude-3-sonnet",
      "implementation": "gpt-4-turbo",
      "testing": "claude-3-haiku",
      "documentation": "gpt-4"
    },
    "rateLimiting": {
      "requestsPerMinute": 60,
      "burstLimit": 10
    }
  }
}
```

#### Cache Configuration
```json
{
  "caching": {
    "contextFiles": {
      "enabled": true,
      "ttl": 3600,
      "maxSize": "50MB"
    },
    "azureDevOps": {
      "enabled": true,
      "ttl": 300,
      "maxSize": "100MB"
    },
    "sharePoint": {
      "enabled": true,
      "ttl": 1800,
      "maxSize": "200MB"
    }
  }
}
```

## Validation and Testing

### Step 9: Configuration Validation

#### Automated Configuration Tests
```bash
#!/bin/bash
# Configuration validation script

echo "Testing Root Code installation..."
rootcode --version || echo "ERROR: Root Code not installed"

echo "Testing Azure DevOps connectivity..."
curl -s -u ":${AZURE_DEVOPS_PAT}" https://dev.azure.com/townepark/_apis/projects > /dev/null || echo "ERROR: Azure DevOps connection failed"

echo "Testing SharePoint connectivity..."
# Add SharePoint connectivity test

echo "Validating context files..."
[ -f ".clinerules" ] || echo "ERROR: .clinerules file missing"
[ -f "coding-guidelines.md" ] || echo "ERROR: coding-guidelines.md file missing"

echo "Configuration validation complete"
```

#### Integration Testing
```csharp
[Fact]
public async Task AzureDevOpsMCP_GetWorkItem_ReturnsValidData()
{
    // Arrange
    var mcpClient = new AzureDevOpsMCPClient(configuration);
    
    // Act
    var workItem = await mcpClient.GetWorkItemAsync(12345);
    
    // Assert
    Assert.NotNull(workItem);
    Assert.Equal("Active", workItem.State);
}
```

## Related Documentation

### Setup Guides
- [AI Development Workflow User Process](../../user-processes/development/20250723_AI_UserProcess_DevelopmentWorkflow.md)
- [AI SDLC Integration Technical Specification](../../technical/backend/20250723_AI_TechnicalSpec_SDLCIntegration.md)

### Security Documentation
- [AI Development Security Guidelines](../../business-rules/security/ai-development-security.md)
- [Authentication and Authorization Standards](../../business-rules/security/authentication-standards.md)

### Operational Guides
- [Monitoring and Alerting Setup](../monitoring/monitoring-setup.md)
- [Backup and Recovery Procedures](../backup/backup-procedures.md)

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-07-23 | Technical Documentation Team | Initial configuration guide for AI SDLC integration derived from strategy meeting transcript |