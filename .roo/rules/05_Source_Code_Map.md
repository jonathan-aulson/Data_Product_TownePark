---
title: "Towne Park Source Code Map"
description: "Comprehensive index of source code components, features, and workflows for validation and discovery processes"
created_date: 2025-08-07
last_updated_date: 2025-08-07
version: 1.0
status: Active
owner: "Autonomous Context AI Protocol"
discovery_metadata:
  discovered_date: 2025-08-07
  discovery_method: "autonomous_source_scan"
  confidence_score: 1.0
  validation_status: "validated"
  knowledge_graph_id: "source_code_map_root"
systems:
  - Source Code Management
  - Code Validation
  - Discovery Engine
components:
  - Source Code Index
  - Component Mapping
  - Validation Framework
business_domains:
  - Software Architecture
  - Code Quality
  - System Integration
user_roles:
  - Developer
  - System Architect
  - Quality Assurance
governance:
  access_level: "internal"
  compliance_tags: ["Code_Quality", "System_Documentation"]
  policy_constraints: ["access_control", "audit_trail"]
tags:
  - source-code-map
  - code-validation
  - component-index
  - system-architecture
---

# Towne Park Source Code Map

## Overview

This Source Code Map serves as a comprehensive index of all source code components, features, workflows, and architectural elements within the Towne Park financial systems. It supports the mandatory code validation process defined in the Autonomous Context AI Protocol and enables discovery-driven validation.

**CRITICAL NOTE**: This document is maintained separately from mkdocs navigation to avoid build warnings, as source code directories are outside the scope of mkdocs documentation.

## Primary Source Code Repositories

### **1. Towne Park Billing (React Frontend)**

**Location**: `Towne-Park-Billing-Source-Code/Towne Park Billing/`

#### **Frontend Architecture Components**

```yaml
frontend_components:
  core_application:
    location: "src/"
    description: "Main React application with Vite build system"
    key_features:
      - "Modern React with TypeScript"
      - "Vite build optimization"
      - "Component-based architecture"
      - "Responsive design implementation"
    
    main_modules:
      - path: "src/App.tsx"
        description: "Main application component and routing"
        business_purpose: "Application entry point and navigation"
        validation_notes: "Core routing and authentication flow"
      
      - path: "src/main.tsx"
        description: "Application bootstrap and initialization"
        business_purpose: "Application startup and configuration"
        validation_notes: "React root mounting and provider setup"
  
  billing_components:
    location: "src/components/BillingStatement/"
    description: "Billing statement generation and management"
    key_features:
      - "Statement data display"
      - "PDF generation integration"
      - "Approval workflow interface"
      - "Supporting document management"
    
    critical_files:
      - path: "src/components/BillingStatement/billingStatementDataTable.tsx"
        description: "Statement data table with filtering and sorting"
        business_purpose: "Display and manage billing statement data"
        validation_notes: "Data grid implementation with business rules"
      
      - path: "src/components/BillingStatement/billingStatementDetails.tsx"
        description: "Detailed statement view and editing"
        business_purpose: "Statement detail management and modification"
        validation_notes: "Form validation and business rule enforcement"
  
  contract_management:
    location: "src/components/"
    description: "Contract type management and configuration"
    key_features:
      - "Revenue share contract handling"
      - "Management agreement processing"
      - "Per labor hour calculations"
      - "Fixed fee contract management"
    
    contract_components:
      - path: "src/components/RevenueShare/"
        description: "Revenue share contract management"
        business_purpose: "Progressive tier calculations and revenue code handling"
        validation_notes: "SD1/SD2, VD1/VD2, OR1/OR2 revenue code processing"
      
      - path: "src/components/ManagementAgreement/"
        description: "Management agreement contract handling"
        business_purpose: "Billable accounts and profit sharing calculations"
        validation_notes: "6000/7000 series account processing, PTEB calculations"
  
  forecasting_components:
    location: "src/components/Forecast/"
    description: "Financial forecasting and analysis"
    key_features:
      - "Payroll data analysis"
      - "Revenue projections"
      - "Statistical reporting"
      - "Data table editing"
    
    forecasting_modules:
      - path: "src/components/Forecast/Statistics/"
        description: "Statistical analysis and reporting"
        business_purpose: "Financial metrics and trend analysis"
        validation_notes: "Statistical calculation algorithms and data visualization"
      
      - path: "src/components/Forecast/Payroll/"
        description: "Payroll data management and analysis"
        business_purpose: "Labor cost analysis and forecasting"
        validation_notes: "Legion integration data processing"
```

#### **Frontend Business Logic Validation Points**

```yaml
validation_targets:
  revenue_calculations:
    component: "src/components/RevenueShare/"
    business_rules:
      - "Progressive tier percentage calculations"
      - "Vehicle count validation logic"
      - "Revenue code mapping (SD1, SD2, VD1, VD2, OR1, OR2)"
      - "Deposited revenue vs client collection handling"
    validation_priority: "HIGH"
    last_validated: "pending"
  
  contract_calculations:
    component: "src/components/ManagementAgreement/"
    business_rules:
      - "Billable accounts 6000/7000 series processing"
      - "Profit sharing tier calculations"
      - "Insurance calculation (5.77% payroll + vehicle)"
      - "PTEB (Payroll Tax Employee Benefits) calculations"
    validation_priority: "HIGH"
    last_validated: "pending"
  
  forecasting_algorithms:
    component: "src/components/Forecast/Statistics/"
    business_rules:
      - "Statistical analysis algorithms"
      - "Trend calculation methods"
      - "Data aggregation logic"
      - "Projection calculation formulas"
    validation_priority: "MEDIUM"
    last_validated: "pending"
```

### **2. Towne Park Billing API Functions (Backend)**

**Location**: `Towne-Park-Billing-Source-Code/Towne-Park-Billing-API-Functions/`

#### **Backend Architecture Components**

```yaml
backend_components:
  azure_functions:
    location: "src/Functions/"
    description: "Azure Functions for API endpoints and business logic"
    key_features:
      - "RESTful API endpoints"
      - "Business logic processing"
      - "Data validation and transformation"
      - "Integration orchestration"
    
    critical_functions:
      - path: "src/Functions/"
        description: "API function implementations"
        business_purpose: "Core business logic and data processing"
        validation_notes: "Business rule implementation and data validation"
  
  data_access_layer:
    location: "src/Data/"
    description: "Data access and repository patterns"
    key_features:
      - "Database abstraction"
      - "Entity framework integration"
      - "Query optimization"
      - "Transaction management"
    
    data_components:
      - path: "src/Data/Impl/"
        description: "Data access implementations"
        business_purpose: "Database operations and data persistence"
        validation_notes: "SQL query implementation and data integrity"
  
  business_services:
    location: "src/Services/"
    description: "Business service layer implementations"
    key_features:
      - "Business logic encapsulation"
      - "Service orchestration"
      - "Validation services"
      - "Calculation engines"
    
    service_modules:
      - path: "src/Services/Impl/"
        description: "Service implementations"
        business_purpose: "Core business logic and calculations"
        validation_notes: "Business rule enforcement and calculation accuracy"
      
      - path: "src/Services/Impl/Calculators/"
        description: "Calculation engine implementations"
        business_purpose: "Financial calculations and business rule processing"
        validation_notes: "Contract-specific calculation logic"
```

#### **Backend Business Logic Validation Points**

```yaml
backend_validation_targets:
  calculation_engines:
    location: "src/Services/Impl/Calculators/"
    business_rules:
      - "Revenue share percentage calculations"
      - "Management agreement profit sharing"
      - "Per labor hour rate calculations"
      - "Fixed fee escalation processing"
    validation_priority: "CRITICAL"
    last_validated: "pending"
  
  data_validation:
    location: "src/Services/Impl/"
    business_rules:
      - "Contract data validation rules"
      - "Financial data integrity checks"
      - "Business rule constraint enforcement"
      - "Cross-system data consistency"
    validation_priority: "HIGH"
    last_validated: "pending"
  
  integration_logic:
    location: "src/Adapters/"
    business_rules:
      - "Great Plains ERP integration"
      - "Legion workforce integration"
      - "PowerBill system integration"
      - "Hotel PMS system integration"
    validation_priority: "HIGH"
    last_validated: "pending"
```

### **3. Power Platform Solutions**

**Location**: `Towne-Park-Billing-Source-Code/Towne-Park-Billing-PA-Solution/`

#### **Power Platform Components**

```yaml
power_platform_components:
  billing_system_workflows:
    location: "BillingSystem/Workflows/"
    description: "Power Automate workflows for billing processes"
    key_features:
      - "Automated approval workflows"
      - "Document generation processes"
      - "Integration orchestration"
      - "Business process automation"
    
    workflow_validation:
      - path: "BillingSystem/Workflows/"
        description: "Billing workflow implementations"
        business_purpose: "Automated billing process execution"
        validation_notes: "Workflow logic and business rule enforcement"
  
  custom_connectors:
    location: "BillingSystemCustomConnectors/"
    description: "Custom connectors for external system integration"
    key_features:
      - "API integration connectors"
      - "Data transformation logic"
      - "Authentication handling"
      - "Error handling and retry logic"
    
    connector_validation:
      - path: "BillingSystemCustomConnectors/Connector/"
        description: "Custom connector implementations"
        business_purpose: "External system integration"
        validation_notes: "Integration logic and data mapping"
  
  monitoring_workflows:
    location: "BillingSystemMonitoring/Workflows/"
    description: "System monitoring and alerting workflows"
    key_features:
      - "Performance monitoring"
      - "Error detection and alerting"
      - "Health check automation"
      - "Notification management"
    
    monitoring_validation:
      - path: "BillingSystemMonitoring/Workflows/"
        description: "Monitoring workflow implementations"
        business_purpose: "System health and performance monitoring"
        validation_notes: "Monitoring logic and alert thresholds"
```

### **4. Azure Infrastructure Components**

**Location**: `Towne-Park-Billing-Source-Code/Towne-Park-Azure-Components/`

#### **Infrastructure Components**

```yaml
azure_infrastructure:
  logic_apps:
    location: "logic-apps/"
    description: "Azure Logic Apps for integration and automation"
    key_features:
      - "System integration workflows"
      - "Data transformation processes"
      - "Event-driven automation"
      - "API orchestration"
    
    logic_app_validation:
      - path: "logic-apps/"
        description: "Logic App workflow definitions"
        business_purpose: "System integration and process automation"
        validation_notes: "Integration logic and data flow validation"
  
  custom_connectors:
    location: "logic-apps-custom-connectors/"
    description: "Custom connectors for Logic Apps"
    key_features:
      - "API integration capabilities"
      - "Data transformation logic"
      - "Authentication management"
      - "Error handling mechanisms"
    
    connector_validation:
      - path: "logic-apps-custom-connectors/"
        description: "Custom connector definitions"
        business_purpose: "External system connectivity"
        validation_notes: "Connector logic and API mapping"
```

### **5. Specialized Services**

#### **PDF Generation Service**

**Location**: `Towne-Park-Billing-Source-Code/Towne-Park-Billing-PDF/`

```yaml
pdf_service:
  core_service:
    location: "src/"
    description: "Node.js service for PDF generation"
    key_features:
      - "Invoice PDF generation"
      - "Statement PDF creation"
      - "Template-based rendering"
      - "Dynamic content generation"
    
    pdf_validation:
      - path: "src/server.js"
        description: "PDF generation server implementation"
        business_purpose: "Document generation and formatting"
        validation_notes: "PDF template logic and data rendering"
```

#### **Ready for Invoicing Infrastructure**

**Location**: `Towne-Park-Billing-Source-Code/Towne-Park-Ready-for-Invoicing/`

```yaml
invoicing_infrastructure:
  deployment_scripts:
    location: "deployment/"
    description: "Infrastructure deployment automation"
    key_features:
      - "Environment-specific deployments"
      - "Resource provisioning"
      - "Configuration management"
      - "Deployment validation"
    
    deployment_validation:
      - path: "deployment/"
        description: "Deployment script implementations"
        business_purpose: "Infrastructure automation and management"
        validation_notes: "Deployment logic and configuration accuracy"
  
  bicep_templates:
    location: "infrastructure/"
    description: "Bicep templates for Azure resource provisioning"
    key_features:
      - "Infrastructure as Code"
      - "Resource configuration"
      - "Environment parameterization"
      - "Dependency management"
    
    template_validation:
      - path: "infrastructure/main.bicep"
        description: "Main infrastructure template"
        business_purpose: "Azure resource provisioning"
        validation_notes: "Resource configuration and dependencies"
```

## Code Validation Framework

### **Validation Methodology**

```yaml
validation_process:
  discovery_driven_validation:
    step_1: "Consult Enterprise Knowledge Graph for validation targets"
    step_2: "Identify business rules documented in knowledge base"
    step_3: "Locate corresponding source code implementations"
    step_4: "Compare documentation against code implementation"
    step_5: "Document discrepancies and validation results"
    step_6: "Update knowledge graph with validation findings"
  
  validation_priorities:
    critical: "Financial calculations, business rule enforcement"
    high: "Data validation, integration logic, security controls"
    medium: "User interface logic, reporting algorithms"
    low: "Utility functions, configuration management"
  
  validation_scope:
    business_rules: "Contract calculations, revenue processing, billing logic"
    technical_specs: "API implementations, data models, integration points"
    process_workflows: "User workflows, approval processes, automation logic"
    configuration: "System settings, environment variables, deployment configs"
```

### **Validation Status Tracking**

```yaml
validation_tracking:
  revenue_share_calculations:
    documentation_location: "docs/Future_State_Data_Product/business-rules/billing/"
    source_code_location: "Towne Park Billing/src/components/RevenueShare/"
    validation_status: "pending"
    priority: "critical"
    business_impact: "revenue_accuracy"
  
  management_agreement_processing:
    documentation_location: "docs/Future_State_Data_Product/business-rules/contracts/"
    source_code_location: "Towne Park Billing/src/components/ManagementAgreement/"
    validation_status: "pending"
    priority: "critical"
    business_impact: "contract_compliance"
  
  forecasting_algorithms:
    documentation_location: "docs/Future_State_Data_Product/technical/forecasting/"
    source_code_location: "Towne Park Billing/src/components/Forecast/"
    validation_status: "pending"
    priority: "high"
    business_impact: "forecasting_accuracy"
  
  integration_implementations:
    documentation_location: "docs/Future_State_Data_Product/technical/integrations/"
    source_code_location: "Towne-Park-Billing-API-Functions/src/Adapters/"
    validation_status: "pending"
    priority: "high"
    business_impact: "system_integration"
```

## Discovery Integration Points

### **Knowledge Graph Integration**

```yaml
knowledge_graph_integration:
  entity_mapping:
    source_code_entities:
      - "React components mapped to business processes"
      - "API functions mapped to business rules"
      - "Database models mapped to data structures"
      - "Workflows mapped to process entities"
    
    relationship_mapping:
      - "Component dependencies mapped to system relationships"
      - "API calls mapped to integration points"
      - "Data flows mapped to process flows"
      - "Configuration dependencies mapped to system dependencies"
  
  validation_feedback_loop:
    discovery_to_validation: "Knowledge graph identifies validation targets"
    validation_to_discovery: "Validation results update knowledge graph"
    continuous_improvement: "Validation accuracy improves discovery confidence"
    gap_identification: "Validation identifies missing documentation or code"
```

### **Continuous Discovery Support**

```yaml
discovery_support:
  change_detection:
    file_monitoring: "Monitor source code directories for changes"
    content_analysis: "Analyze code changes for business rule impacts"
    relationship_updates: "Update knowledge graph relationships"
    validation_triggers: "Trigger validation for affected components"
  
  pattern_recognition:
    code_patterns: "Identify common coding patterns and architectures"
    business_logic_patterns: "Recognize business rule implementation patterns"
    integration_patterns: "Identify integration and data flow patterns"
    configuration_patterns: "Recognize configuration and deployment patterns"
```

## Maintenance and Updates

### **Source Code Map Maintenance**

```yaml
maintenance_protocol:
  regular_updates:
    frequency: "weekly"
    scope: "new_files_and_components"
    validation: "accuracy_verification"
    documentation: "change_documentation"
  
  validation_updates:
    trigger: "validation_completion"
    action: "update_validation_status"
    documentation: "record_findings"
    knowledge_graph: "update_relationships"
  
  discovery_integration:
    trigger: "new_discoveries"
    action: "map_to_source_code"
    validation: "verify_mappings"
    documentation: "update_index"
```

### **Quality Assurance**

```yaml
quality_assurance:
  accuracy_verification:
    method: "automated_scanning"
    frequency: "daily"
    scope: "file_existence_and_paths"
    reporting: "discrepancy_alerts"
  
  completeness_assessment:
    method: "coverage_analysis"
    frequency: "weekly"
    scope: "all_source_repositories"
    reporting: "coverage_metrics"
  
  validation_quality:
    method: "validation_accuracy_tracking"
    frequency: "continuous"
    scope: "all_validation_activities"
    reporting: "validation_effectiveness_metrics"
```

## Related Documentation

- [Enterprise Knowledge Graph](Enterprise_Knowledge_Graph.md) ✓ VERIFIED
- [Autonomous Context AI Protocol](Towne_Park_Autonomous_Context_AI_Protocol_v4.md) ✓ VERIFIED
- [Code Validation Framework](Code_Validation_Framework.md) 🔄 PLANNED
- [Discovery Engine Technical Specification](Discovery_Engine_Technical_Specification.md) 🔄 PLANNED

---

*This Source Code Map serves as the comprehensive index for all source code validation activities and supports the discovery-driven validation framework defined in the Autonomous Context AI Protocol.*