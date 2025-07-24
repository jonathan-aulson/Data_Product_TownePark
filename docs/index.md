# Towne Park Data Product Documentation

<div class="grid cards" markdown>

-   :material-cash-register:{ .lg .middle } __Billing System__

    ---

    Access comprehensive documentation for the Towne Park billing system including architecture, invoice generation processes, and integrations.

    [:octicons-arrow-right-24: Billing System Overview](Future_State_Data_Product/systems/billing/overview.md)

-   :material-chart-line:{ .lg .middle } __Forecasting System__

    ---

    Explore Towne Park's forecasting system documentation covering revenue predictions, labor forecasting, and statistical models.

    [:octicons-arrow-right-24: Forecasting System Overview](Future_State_Data_Product/systems/forecasting/overview.md)

-   :material-file-document-outline:{ .lg .middle } __Contract Management__

    ---

    Complete documentation for Towne Park's contract management system within PowerBill, including escalation rules and configuration.

    [:octicons-arrow-right-24: Contract Management System](Future_State_Data_Product/systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md)

-   :material-map-marker:{ .lg .middle } __Customer Site Management__

    ---

    Comprehensive documentation for Towne Park's customer site management system, territory organization, and operational data.

    [:octicons-arrow-right-24: Customer Site Management System](Future_State_Data_Product/systems/customer-sites/20250716_CustomerSites_SystemOverview_Management.md)

-   :material-file-document-multiple:{ .lg .middle } __Business Rules__

    ---

    Review the core business rules that govern Towne Park's operations, from contract structures to billing calculations.

    [:octicons-arrow-right-24: Revenue Share Contracts](Future_State_Data_Product/business-rules/contract-types/revenue-share.md)

-   :material-account-group:{ .lg .middle } __User Processes__

    ---

    Step-by-step guides for common user workflows and processes across different roles.

    [:octicons-arrow-right-24: Billing Admin Processes](Future_State_Data_Product/user-processes/billing-admin/index.md)

</div>

## :material-compass: Quick Navigation

| System Components | Business Rules | Technical Documentation | User & Configuration |
|:-----------------|:---------------|:------------------------|:---------------------|
| [Billing Architecture](Future_State_Data_Product/systems/billing/architecture.md) | [Fixed Fee Contracts](Future_State_Data_Product/business-rules/contract-types/fixed-fee.md) | [RSS Troubleshooting Technical Spec](Future_State_Data_Product/technical/specifications/20250723_RSS_TechnicalSpec_TroubleshootingProcedures.md) | [RSS Troubleshooting User Guide](Future_State_Data_Product/user-processes/billing-admin/20250723_RSS_TroubleshootingProcess_UserGuide.md) |
| [Contract Management](Future_State_Data_Product/systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md) | [Comprehensive Business Rules](Future_State_Data_Product/business-rules/contracts/20250716_Contracts_BusinessRules_Comprehensive.md) | [ALM Strategy for Power Platform](Future_State_Data_Product/technical/backend/20250718_Architecture_ALMStrategy_PowerPlatform.md) | [Contract Setup Workflow](Future_State_Data_Product/user-processes/contract-admin/contract-setup-workflow.md) |
| [Customer Site Management](Future_State_Data_Product/systems/customer-sites/20250716_CustomerSites_SystemOverview_Management.md) | [Site Classification Rules](Future_State_Data_Product/business-rules/customer-sites/site-classification-rules.md) | [Integration Strategy for Hybrid Connections](Future_State_Data_Product/technical/integrations/20250718_Architecture_IntegrationStrategy_HybridConnections.md) | [Definition of Done Guide](Future_State_Data_Product/configuration/system-settings/20250718_Development_DefinitionOfDone_ComprehensiveGuide.md) |
| [Pull Request Review Guide](Future_State_Data_Product/configuration/system-settings/20250718_Development_PRReview_ComprehensiveGuide.md) | [PowerBill ROI Analysis](Future_State_Data_Product/business-rules/billing/20250717_Billing_ROIAnalysis_PowerBillSuccessMetrics.md) | [Database Migration & Data Flows](Future_State_Data_Product/technical/database/20250723_Database_TechnicalSpec_MigrationDataFlows.md) | [Development Workflow Standards](Future_State_Data_Product/user-processes/development/20250723_Development_UserProcess_WorkflowStandards.md) |
| [Billing Integrations](Future_State_Data_Product/systems/billing/integrations.md) | [PowerBill ROI Analysis](Future_State_Data_Product/business-rules/billing/20250717_Billing_ROIAnalysis_PowerBillSuccessMetrics.md) | [Power Platform Licensing Analysis](Future_State_Data_Product/configuration/system-settings/20250718_Architecture_LicensingAnalysis_PowerPlatform.md) | [Site Setup Configuration](Future_State_Data_Product/configuration/customer-sites/site-setup-configuration.md) |
| [Forecasting Overview](Future_State_Data_Product/systems/forecasting/overview.md) | [Invoice Calculation](Future_State_Data_Product/business-rules/billing/invoice-calculation.md) | [Database Models](Future_State_Data_Product/technical/database/index.md) | [User Access Control](Future_State_Data_Product/configuration/user-access/index.md) |
| [Generate Invoices](Future_State_Data_Product/systems/billing/generate-invoices.md) | [Forecasting Calculations & Validations](Future_State_Data_Product/business-rules/forecasting/20250718_Forecasting_BusinessRules_CalculationsAndValidations.md) | [Forecasting Database Integration](Future_State_Data_Product/technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md) | [Account Manager Forecasting Workflows](Future_State_Data_Product/user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md) |
| [Customer Site Directory](Future_State_Data_Product/systems/customer-sites/customer-site-directory.md) | [Account Validation Rules](Future_State_Data_Product/business-rules/billing/20250702_Billing_AccountValidation_BusinessRules.md) | [Forecasting Data Integration](Future_State_Data_Product/technical/forecasting/20250702_Forecasting_DataIntegration_TechnicalSpec.md) | [UAT User Stories Comprehensive Feedback](Future_State_Data_Product/user-processes/billing-admin/20250718_Billing_UATUserStories_ComprehensiveFeedback.md) |
| [Customer Site Directory](Future_State_Data_Product/systems/customer-sites/customer-site-directory.md) | [Job Code Management Rules](Future_State_Data_Product/business-rules/forecasting/20250702_Forecasting_JobCodeManagement_BusinessRules.md) | [Forecasting P&L View Technical Spec](Future_State_Data_Product/technical/specifications/forecasting-pl-view-technical-spec.md) | [Job Group Management Process](Future_State_Data_Product/user-processes/forecasting/20250702_Forecasting_JobGroupManagement_UserProcess.md) |
| [Payroll Forecasting System](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_PayrollForecasting_SystemOverview.md) | [PTEB Escalation Rules](Future_State_Data_Product/business-rules/billing/pteb-escalation-rules.md) | [SharePoint Delta Token Management](Future_State_Data_Product/technical/specifications/sharepoint-delta-token-management.md) | [Statistics Pagination Process](Future_State_Data_Product/user-processes/account-manager/20250716_Forecasting_StatisticsPagination_UserProcess.md) |
| [Forecasting Discovery](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_Discovery.md) | [Forecasting Process](Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md) | [Billing Architecture](Future_State_Data_Product/technical/backend/20250716_Billing_TechnicalArchitecture_Development.md) | [Development Standards](Future_State_Data_Product/configuration/system-settings/20250716_Development_ConfigurationGuide_Standards.md) |
| [Comprehensive Development Standards](Future_State_Data_Product/configuration/system-settings/20250718_Development_Standards_ComprehensiveGuide.md) | [Sprint 26 Features Rules](Future_State_Data_Product/business-rules/forecasting/20250717_Forecasting_BusinessRules_Sprint26Features.md) | [Forecasting Technical Specs](Future_State_Data_Product/technical/forecasting/20250717_Forecasting_TechnicalSpec_Sprint26Features.md) | [Pilot & Rollout Process](Future_State_Data_Product/user-processes/district-manager/20250716_Forecasting_PilotRollout_ProcessWorkflow.md) |
| [Forecasting Master Architecture](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_MasterArchitecture.md) | [Billable Accounts Rules](Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BillableAccounts_BusinessRules.md) | [Forecasting Data Sources](Future_State_Data_Product/technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md) | [Data Table Editing Process](Future_State_Data_Product/user-processes/account-manager/20250716_Forecasting_DataTableEditing_UserProcess.md) |
| [Generate Invoices](Future_State_Data_Product/systems/billing/generate-invoices.md) | [Revenue Forecasting](Future_State_Data_Product/business-rules/forecasting/revenue.md) | [Daily Scrum Insights](Future_State_Data_Product/team-notes/development/20250723_Development_TeamNotes_DailyScrumInsights.md) | [System Settings](Future_State_Data_Product/configuration/system-settings/index.md) |

## :octicons-workflow-24: System Architecture Overview
<iframe width="768" height="496" src="https://miro.com/app/live-embed/uXjVNq-EF7Y=/?focusWidget=3458764634680690809&embedMode=view_only_without_ui&embedId=103555753540" frameborder="0" allowfullscreen></iframe>

<iframe width="100%" height="600" src="https://miro.com/app/live-embed/uXjVNq-EF7Y=/?focusWidget=3458764634681325772&embedMode=view_only_without_ui&embedId=264161241496" frameborder="0" allowfullscreen></iframe>

## :material-folder-multiple: Documentation Structure

The Towne Park documentation is organized into the following key sections:

- **Systems Documentation** - Technical details about core systems
  - [Billing System](Future_State_Data_Product/systems/billing/overview.md)
  - [Contract Management System](Future_State_Data_Product/systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md)
  - [Customer Site Management System](Future_State_Data_Product/systems/customer-sites/20250716_CustomerSites_SystemOverview_Management.md)
  - [Forecasting System](Future_State_Data_Product/systems/forecasting/overview.md)
  - [Forecasting System Comprehensive Master Overview](Future_State_Data_Product/systems/forecasting/20250718_Forecasting_SystemOverview_ComprehensiveMaster.md)
  - [Forecasting Project Discovery](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_Discovery.md)
  - [Forecasting Master Architecture](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_MasterArchitecture.md)
  - [Payroll Forecasting System](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_PayrollForecasting_SystemOverview.md)

- **Business Rules** - Policies and business logic
  - [Comprehensive Contract Business Rules](Future_State_Data_Product/business-rules/contracts/20250716_Contracts_BusinessRules_Comprehensive.md)
  - [Revenue Share Contract Configuration](Future_State_Data_Product/business-rules/contracts/20250724_RevenueShare_ContractConfiguration_BusinessRules.md)
  - [Revenue Share Contract Business Rules](Future_State_Data_Product/business-rules/billing/20250724_Billing_RevenueShareContracts_BusinessRules.md)
  - [Per Labor Hour Contract Business Rules](Future_State_Data_Product/business-rules/billing/20250724_Billing_PerLaborHourContracts_BusinessRules.md)
  - [Fixed Fee Contract Configuration](Future_State_Data_Product/business-rules/contracts/20250724_FixedFee_ContractConfiguration_BusinessRules.md)
  - [Management Agreement Contract Configuration](Future_State_Data_Product/business-rules/contracts/20250724_ManagementAgreement_ContractConfiguration_BusinessRules.md)
  - [Per Labor Hour Contract Configuration](Future_State_Data_Product/business-rules/contracts/20250724_PerLaborHour_ContractConfiguration_BusinessRules.md)
  - [Hybrid Contract Configuration](Future_State_Data_Product/business-rules/contracts/20250724_HybridContract_ContractConfiguration_BusinessRules.md)
  - [Contract Types](Future_State_Data_Product/business-rules/contract-types/revenue-share.md)
  - [Contract Escalation Rules](Future_State_Data_Product/business-rules/contracts/contract-escalation-rules.md)
  - [Site Classification Rules](Future_State_Data_Product/business-rules/customer-sites/site-classification-rules.md)
  - [Billing System Modernization Case Study](Future_State_Data_Product/business-rules/billing/20250717_TownePark_CaseStudy_BillingSystemModernization.md)
  - [PowerBill ROI Analysis & Success Metrics](Future_State_Data_Product/business-rules/billing/20250717_Billing_ROIAnalysis_PowerBillSuccessMetrics.md)
  - [Billing Rules](Future_State_Data_Product/business-rules/billing/invoice-calculation.md)
  - [RSS File Validation Business Rules](Future_State_Data_Product/business-rules/billing/20250723_RSS_FileValidation_BusinessRules.md)
  - [Account Validation Business Rules](Future_State_Data_Product/business-rules/billing/20250702_Billing_AccountValidation_BusinessRules.md)
  - [Negative Invoice GL Entity Mapping](Future_State_Data_Product/business-rules/billing/negative-invoice-gl-entity-mapping.md)
  - [Management Fee Escalation Rules](Future_State_Data_Product/business-rules/billing/management-fee-escalation-rules.md)
  - [PTEB Escalation Rules](Future_State_Data_Product/business-rules/billing/pteb-escalation-rules.md)
  - [Forecasting Rules](Future_State_Data_Product/business-rules/forecasting/revenue.md)
  - [Forecasting Calculations and Validations](Future_State_Data_Product/business-rules/forecasting/20250718_Forecasting_BusinessRules_CalculationsAndValidations.md)
  - [Forecasting Development Decisions](Future_State_Data_Product/business-rules/forecasting/20250718_Forecasting_BusinessRules_DevelopmentDecisions.md)
  - [Forecasting Process Workflow](Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md)
  - [Billable Accounts Business Rules](Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BillableAccounts_BusinessRules.md)
  - [Job Code Management Business Rules](Future_State_Data_Product/business-rules/forecasting/20250702_Forecasting_JobCodeManagement_BusinessRules.md)
  - [Forecasting Actuals Display Business Rules](Future_State_Data_Product/business-rules/forecasting/20250723_Forecasting_ActualsDisplay_BusinessRules.md)

- **Technical Reference** - Implementation details
  - [Frontend](Future_State_Data_Product/technical/frontend/index.md)
  - [Backend](Future_State_Data_Product/technical/backend/index.md)
  - [ALM Strategy for Power Platform](Future_State_Data_Product/technical/backend/20250718_Architecture_ALMStrategy_PowerPlatform.md)
  - [AI Integration Technical Specification](Future_State_Data_Product/technical/backend/20250718_Development_AIIntegration_TechnicalSpec.md)
  - [AI SDLC Integration Technical Specification](Future_State_Data_Product/technical/backend/20250723_AI_TechnicalSpec_SDLCIntegration.md)
  - [AI SDLC Integration Validation Report](Future_State_Data_Product/technical/backend/20250723_AI_ValidationReport_SDLCIntegration.md)
  - [Forecasting Technical Architecture and API Design](Future_State_Data_Product/technical/backend/20250718_Forecasting_TechnicalArchitecture_APIDesign.md)
  - [Billing Technical Architecture](Future_State_Data_Product/technical/backend/20250716_Billing_TechnicalArchitecture_Development.md)
  - [Database](Future_State_Data_Product/technical/database/index.md)
  - [Database Migration and Data Flow Technical Specifications](Future_State_Data_Product/technical/database/20250723_Database_TechnicalSpec_MigrationDataFlows.md)
  - [Forecasting Database Integration](Future_State_Data_Product/technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md)
  - [Forecasting Data Sources](Future_State_Data_Product/technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md)
  - [Contracts Data Dictionary Technical Specification](Future_State_Data_Product/technical/database/20250718_Contracts_DataDictionary_TechnicalSpec.md)
  - [Forecasting Data Integration Technical Spec](Future_State_Data_Product/technical/forecasting/20250702_Forecasting_DataIntegration_TechnicalSpec.md)
  - [Forecasting Billable Accounts Technical Spec](Future_State_Data_Product/technical/forecasting/20250718_Forecasting_BillableAccounts_TechnicalSpec.md)
  - [Billable Accounts Technical Spec](Future_State_Data_Product/technical/database/20250716_Forecasting_BillableAccounts_TechnicalSpec.md)
  - [Contracts Data Schema](Future_State_Data_Product/technical/database/contracts-data-schema.md)
  - [Customer Sites Data Schema](Future_State_Data_Product/technical/database/customer-sites-data-schema.md)
  - [Forecasting P&L View Technical Spec](Future_State_Data_Product/technical/specifications/forecasting-pl-view-technical-spec.md)
  - [Power Automate Retry Mechanisms](Future_State_Data_Product/technical/specifications/power-automate-retry-mechanisms.md)
  - [RSS Troubleshooting Technical Specification](Future_State_Data_Product/technical/specifications/20250723_RSS_TechnicalSpec_TroubleshootingProcedures.md)
  - [SharePoint Delta Token Management](Future_State_Data_Product/technical/specifications/sharepoint-delta-token-management.md)
  - [Integration Strategy for Hybrid Connections](Future_State_Data_Product/technical/integrations/20250718_Architecture_IntegrationStrategy_HybridConnections.md)
  - [Integrations](Future_State_Data_Product/technical/integrations/index.md)

- **User Processes** - Role-based workflows
  - [Account Manager](Future_State_Data_Product/user-processes/account-manager/index.md)
  - [Account Manager Forecasting Workflows](Future_State_Data_Product/user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md)
  - [Account Manager Forecasting Methodology Interview Insights](Future_State_Data_Product/user-processes/account-manager/20250718_AccountManager_ForecastingMethodology_InterviewInsights.md)
  - [Data Table Editing Process](Future_State_Data_Product/user-processes/account-manager/20250716_Forecasting_DataTableEditing_UserProcess.md)
  - [Statistics Pagination Process](Future_State_Data_Product/user-processes/account-manager/20250716_Forecasting_StatisticsPagination_UserProcess.md)
  - [Billing Admin](Future_State_Data_Product/user-processes/billing-admin/index.md)
  - [RSS Troubleshooting User Guide](Future_State_Data_Product/user-processes/billing-admin/20250723_RSS_TroubleshootingProcess_UserGuide.md)
  - [UAT User Stories Comprehensive Feedback](Future_State_Data_Product/user-processes/billing-admin/20250718_Billing_UATUserStories_ComprehensiveFeedback.md)
  - [Account Validation User Process](Future_State_Data_Product/user-processes/billing-admin/20250702_Billing_AccountValidation_UserProcess.md)
  - [Contract Admin](Future_State_Data_Product/user-processes/contract-admin/contract-setup-workflow.md)
  - [Contract Query Examples User Reference](Future_State_Data_Product/user-processes/contract-admin/20250718_Contracts_QueryExamples_UserReference.md)
  - [Development Workflow and Deployment Standards](Future_State_Data_Product/user-processes/development/20250723_Development_UserProcess_WorkflowStandards.md)
  - [AI-Enhanced Development Workflow](Future_State_Data_Product/user-processes/development/20250723_AI_UserProcess_DevelopmentWorkflow.md)
  - [District Manager](Future_State_Data_Product/user-processes/district-manager/index.md)
  - [Site Admin](Future_State_Data_Product/user-processes/site-admin/site-onboarding-workflow.md)
  - [Forecasting Pilot & Rollout Process](Future_State_Data_Product/user-processes/district-manager/20250716_Forecasting_PilotRollout_ProcessWorkflow.md)
  - [Forecasting User Experience Design Decisions](Future_State_Data_Product/user-processes/forecasting/20250718_Forecasting_UserExperience_DesignDecisions.md)
  - [Job Group Management User Process](Future_State_Data_Product/user-processes/forecasting/20250702_Forecasting_JobGroupManagement_UserProcess.md)
  - [Forecasting Actuals Display User Process](Future_State_Data_Product/user-processes/account-manager/20250723_Forecasting_ActualsDisplay_UserProcess.md)

- **Configuration Guides** - Setup and maintenance
  - [Contract Configuration Guide](Future_State_Data_Product/configuration/contracts/contract-configuration-guide.md)
  - [Revenue Share Contract Setup Guide](Future_State_Data_Product/configuration/contracts/20250724_Billing_ContractConfiguration_SetupGuide.md)
  - [Per Labor Hour Contract Setup Guide](Future_State_Data_Product/configuration/contracts/20250724_Billing_PerLaborHourConfiguration_SetupGuide.md)
  - [Site Setup Configuration](Future_State_Data_Product/configuration/customer-sites/site-setup-configuration.md)
  - [Contract Setup](Future_State_Data_Product/configuration/contract-setup/index.md)
  - [User Access](Future_State_Data_Product/configuration/user-access/index.md)
  - [System Settings](Future_State_Data_Product/configuration/system-settings/index.md)
  - [Power Platform Licensing Analysis](Future_State_Data_Product/configuration/system-settings/20250718_Architecture_LicensingAnalysis_PowerPlatform.md)
  - [Development Configuration Guide](Future_State_Data_Product/configuration/system-settings/20250716_Development_ConfigurationGuide_Standards.md)
  - [Comprehensive Development Standards](Future_State_Data_Product/configuration/system-settings/20250718_Development_Standards_ComprehensiveGuide.md)
  - [Definition of Done Comprehensive Guide](Future_State_Data_Product/configuration/system-settings/20250718_Development_DefinitionOfDone_ComprehensiveGuide.md)
  - [Pull Request Review Comprehensive Guide](Future_State_Data_Product/configuration/system-settings/20250718_Development_PRReview_ComprehensiveGuide.md)
  - [AI SDLC Integration Configuration Guide](Future_State_Data_Product/configuration/system-settings/20250723_AI_ConfigurationGuide_SDLCIntegration.md)

- **Team Notes** - Meeting notes and team coordination
  - [Architecture Team Meeting Notes](Future_State_Data_Product/team-notes/AulsonJonathan-Notes/20250718_Architecture_TeamMeetingNotes_WeeklySync.md)
  - [Daily Scrum Insights and Progress Tracking](Future_State_Data_Product/team-notes/development/20250723_Development_TeamNotes_DailyScrumInsights.md)
  - [Daily Scrum Team Notes](Future_State_Data_Product/team-notes/20250718_Development_DailyScrum_TeamNotes.md)
  - [Sprint Planning Project Management](Future_State_Data_Product/team-notes/20250718_Development_SprintPlanning_ProjectManagement.md)
  - [Forecasting Actuals Display Team Notes](Future_State_Data_Product/team-notes/development/20250723_Forecasting_TeamNotes_ActualsDisplayDecisions.md)
  - [Forecasting Sprint Demo Consolidated Team Notes](Future_State_Data_Product/team-notes/development/20250724_ForecastingSprintDemo_ConsolidatedTeamNotes.md)
  - [UAT Planning Team Notes - Backlog Grooming](Future_State_Data_Product/team-notes/development/20250724_UAT_Planning_TeamNotes_BacklogGrooming.md)
  - [Sprint Planning Team Notes - Final Stretch](Future_State_Data_Product/team-notes/development/20250724_Sprint_Planning_TeamNotes_FinalStretch.md)
  - [Forecasting Backlog Grooming Team Notes](Future_State_Data_Product/team-notes/development/20250724_Forecasting_BacklogGrooming_TeamNotes.md)
  - [Daily Scrum Development Progress Team Notes](Future_State_Data_Product/team-notes/development/20250724_DailyScrum_DevelopmentProgress_TeamNotes.md)

## :material-frequently-asked-questions: Common Questions

<div class="grid" markdown>

<div class="grid-item" markdown>
**How do I create a new invoice?**

Start with the [Generate Invoices](Future_State_Data_Product/systems/billing/generate-invoices.md) guide for step-by-step instructions.
</div>

<div class="grid-item" markdown>
**What contract types does Towne Park support?**

Explore our [Contract Types](Future_State_Data_Product/business-rules/contract-types/revenue-share.md) section for details on all supported models.
</div>

<div class="grid-item" markdown>
**How is Bell Service Fee calculated?**

See the [Bell Service Fee](Future_State_Data_Product/business-rules/billing/bell-service-fee.md) documentation for calculations and examples.
</div>

<div class="grid-item" markdown>
**How do I set up a new contract?**

Follow the comprehensive guide in [Contract Setup Workflow](Future_State_Data_Product/user-processes/contract-admin/contract-setup-workflow.md).
</div>

<div class="grid-item" markdown>
**How do contract escalations work?**

See the [Contract Escalation Rules](Future_State_Data_Product/business-rules/contracts/contract-escalation-rules.md) for detailed calculations and examples.
</div>

</div>

## :material-book-open-variant: Latest Updates

| Document | Last Updated | Description |
|:---------|:------------|:------------|
| [Revenue Share Contract Setup Guide](Future_State_Data_Product/configuration/contracts/20250724_Billing_ContractConfiguration_SetupGuide.md) | 2025-07-24 | Comprehensive technical guide for configuring revenue share contracts in the Power Platform billing system, including JSON schema, field definitions, and setup procedures with code validation |
| [Per Labor Hour Contract Setup Guide](Future_State_Data_Product/configuration/contracts/20250724_Billing_PerLaborHourConfiguration_SetupGuide.md) | 2025-07-24 | Technical configuration guide for setting up per labor hour contracts in the Power Platform billing system, including JSON schema, field definitions, and setup procedures |
| [Per Labor Hour Contract Business Rules](Future_State_Data_Product/business-rules/billing/20250724_Billing_PerLaborHourContracts_BusinessRules.md) | 2025-07-24 | Comprehensive business rules for per labor hour contract billing, including job rate calculations, overtime handling, deviation management, and hours reporting requirements |
| [Revenue Share Contract Business Rules](Future_State_Data_Product/business-rules/billing/20250724_Billing_RevenueShareContracts_BusinessRules.md) | 2025-07-24 | Comprehensive business rules for revenue share contract calculations, validation thresholds, mid-month advances, and contract configuration parameters with Power Platform code validation |
| [Hybrid Contract Configuration Business Rules](Future_State_Data_Product/business-rules/contracts/20250724_HybridContract_ContractConfiguration_BusinessRules.md) | 2025-07-24 | Comprehensive business rules for hybrid contract configurations combining multiple billing models including Fixed Fee + Per Labor Hour, Revenue Share + Per Labor Hour, and complex multi-component arrangements with invoice grouping and advanced features |
| [Per Labor Hour Contract Configuration Business Rules](Future_State_Data_Product/business-rules/contracts/20250724_PerLaborHour_ContractConfiguration_BusinessRules.md) | 2025-07-24 | Complete business rules for per labor hour contract billing including job-specific rates, annual escalation, and hours backup reporting |
| [Management Agreement Contract Configuration Business Rules](Future_State_Data_Product/business-rules/contracts/20250724_ManagementAgreement_ContractConfiguration_BusinessRules.md) | 2025-07-24 | Comprehensive business rules and calculation formulas for management agreement contract configuration, including escalating management fees, profit sharing, insurance calculations, deposited revenue handling, and comprehensive billable accounts management |
| [Fixed Fee Contract Configuration Business Rules](Future_State_Data_Product/business-rules/contracts/20250724_FixedFee_ContractConfiguration_BusinessRules.md) | 2025-07-24 | Comprehensive business rules and calculation formulas for fixed fee contract configuration, including service rates, PTEB calculations, support services billing, and payroll account management |
| [Revenue Share Contract Configuration Business Rules](Future_State_Data_Product/business-rules/contracts/20250724_RevenueShare_ContractConfiguration_BusinessRules.md) | 2025-07-24 | Comprehensive business rules and calculation formulas for revenue share contract configuration, including threshold structures, billing parameters, and deposited revenue handling |
| [Sprint Planning Team Notes - Final Stretch](Future_State_Data_Product/team-notes/development/20250724_Sprint_Planning_TeamNotes_FinalStretch.md) | 2025-07-24 | Team notes documenting final sprint coordination, feature prioritization decisions, pilot timeline adjustments, and AI initiative progress from June 12, 2025 planning session |
| [Project Management Methodology User Process](Future_State_Data_Product/user-processes/development/20250724_Project_Management_Methodology_UserProcess.md) | 2025-07-24 | Comprehensive project management methodology for complex software development including final sprint planning, feature prioritization, pilot coordination, and timeline management |
| [AI Productivity Tools Technical Specification](Future_State_Data_Product/technical/backend/20250724_AI_Productivity_Tools_TechnicalSpec.md) | 2025-07-24 | Technical specification for AI productivity tools implementation showing positive results across forecasting and billing projects with enhanced development efficiency and workflow automation |
| [UAT Planning Team Notes - Backlog Grooming](Future_State_Data_Product/team-notes/development/20250724_UAT_Planning_TeamNotes_BacklogGrooming.md) | 2025-07-24 | Team notes documenting UAT planning decisions, coordination activities, and strategic timing discussions from June 9, 2025 backlog grooming session |
| [UAT Methodology User Process Guide](Future_State_Data_Product/user-processes/development/20250724_UAT_Methodology_UserProcess.md) | 2025-07-24 | Comprehensive user process guide for conducting effective UAT sessions including preparation, execution, feedback collection, and validation methodologies |
| [Claims Forecasting Business Rules](Future_State_Data_Product/business-rules/forecasting/20250724_Claims_Forecasting_BusinessRules.md) | 2025-07-24 | Business rules governing claims forecasting integration including insurance data requirements, prediction algorithms, and system integration criteria |
| [Forecasting Sprint Demo Consolidated Team Notes](Future_State_Data_Product/team-notes/development/20250724_ForecastingSprintDemo_ConsolidatedTeamNotes.md) | 2025-07-24 | Comprehensive team notes from forecasting sprint demo covering feature demonstrations, stakeholder feedback, implementation decisions, and technical architecture discussions |
| [Forecasting Input Granularity Business Rules](Future_State_Data_Product/business-rules/forecasting/20250724_ForecastingInputGranularity_BusinessRules.md) | 2025-07-24 | Business rules governing input granularity requirements, data validation standards, and user interface specifications for forecasting system data entry and management |
| [Daily Scrum Technical Clarifications Team Notes](Future_State_Data_Product/team-notes/development/20250724_DailyScrum_TechnicalClarifications_TeamNotes.md) | 2025-07-24 | Development team notes documenting technical clarifications, implementation decisions, and issue identification from July 1, 2025 daily scrum meeting covering payroll data queries and statement management |
| [Payroll Data Database Queries Technical Specification](Future_State_Data_Product/technical/database/20250724_PayrollData_DatabaseQueries_TechnicalSpec.md) | 2025-07-24 | Comprehensive technical specification for payroll data database queries including daily granularity implementation, query architecture, and data retrieval patterns for forecasting system |
| [Statement Management User Process](Future_State_Data_Product/user-processes/billing-admin/20250724_StatementManagement_UserProcess.md) | 2025-07-24 | Comprehensive user process guide for billing administrators managing statements including accessing older statements, navigation procedures, and statement lifecycle management |
| [Forecasting Backlog Grooming Consolidated Decisions](Future_State_Data_Product/team-notes/development/20250724_Forecasting_BacklogGrooming_ConsolidatedDecisions.md) | 2025-07-24 | Comprehensive documentation of forecasting system enhancement decisions from June 23-26, 2025 backlog grooming sessions covering UI improvements, data integration, and stakeholder requirements |
| [Forecasting Data Validation Business Rules](Future_State_Data_Product/business-rules/forecasting/20250724_Forecasting_DataValidation_BusinessRules.md) | 2025-07-24 | Comprehensive business rules governing data validation, refresh scheduling, caching strategies, and integration requirements for the forecasting system |
| [EDW Integration Technical Specification](Future_State_Data_Product/technical/integrations/20250724_EDW_Integration_TechnicalSpec.md) | 2025-07-24 | Comprehensive technical specification for Enterprise Data Warehouse integration including caching strategies, performance optimization, fallback mechanisms, and data transformation requirements |
| [Daily Scrum Development Progress Team Notes](Future_State_Data_Product/team-notes/development/20250724_DailyScrum_DevelopmentProgress_TeamNotes.md) | 2025-07-24 | Development team notes from daily scrum meetings covering billing system enhancements, performance optimization, and environment management activities |
| [Forecasting Backlog Grooming Team Notes](Future_State_Data_Product/team-notes/development/20250724_Forecasting_BacklogGrooming_TeamNotes.md) | 2025-07-24 | Development team notes from forecasting backlog grooming session covering feature prioritization, phase planning, and technical implementation decisions |
| [Forecasting System Demo Comprehensive Guide](Future_State_Data_Product/user-processes/forecasting/20250723_Forecasting_SystemDemo_ComprehensiveGuide.md) | 2025-07-23 | Comprehensive demo guide covering complete forecasting workflow from site selection through P&L analysis with training materials |
| [Forecasting Job Groups Technical Specification](Future_State_Data_Product/technical/forecasting/20250723_Forecasting_JobGroups_TechnicalSpec.md) | 2025-07-23 | Technical specification for job groups implementation including data models, Legion integration, and payroll forecasting simplification |
| [District Manager Forecasting Workflow User Guide](Future_State_Data_Product/user-processes/district-manager/20250723_DistrictManager_ForecastingWorkflow_UserGuide.md) | 2025-07-23 | User guide for district managers covering multi-site management, aggregate views, and district-level forecasting workflows |
| [Forecasting UI Design User Experience Standards](Future_State_Data_Product/user-processes/forecasting/20250723_Forecasting_UIDesign_UserExperienceStandards.md) | 2025-07-23 | UI/UX design standards for forecasting system including calendar picker, variance indicators, and summary card specifications |
| [Forecasting Statistics Display Business Rules](Future_State_Data_Product/business-rules/forecasting/20250723_Forecasting_StatisticsDisplay_BusinessRules.md) | 2025-07-23 | Business rules governing statistics display logic, variance calculations, and forecast vs budget comparison methodology |
| [AI-Assisted Sprint Planning Process Guide](Future_State_Data_Product/user-processes/development/20250723_SprintPlanning_ProcessGuide_AIAssisted.md) | 2025-07-23 | Comprehensive process guide for conducting AI-assisted sprint planning sessions with task breakdown methodology and tool integration |
| [AI Development Tools Configuration Guide](Future_State_Data_Product/configuration/system-settings/20250723_AI_ConfigurationGuide_DevelopmentTools.md) | 2025-07-23 | Configuration guide for AI development tools including Root Code setup, model selection, API configuration, and profile management |
| [Daily Scrum Technical Issues Resolution Guide](Future_State_Data_Product/team-notes/development/20250723_DailyScrum_TechnicalIssues_ResolutionGuide.md) | 2025-07-23 | Comprehensive guide for resolving technical issues identified in daily scrum meetings including divide by zero errors, invalid date handling, and revenue code visibility |
| [Revenue Management Business Rules](Future_State_Data_Product/business-rules/billing/20250723_Billing_RevenueManagement_BusinessRules.md) | 2025-07-23 | Business rules governing revenue share functionality, invoice generation, validation processes, and threshold structure configuration |
| [System Administration Operations Procedures](Future_State_Data_Product/technical/operations/20250723_SystemAdministration_Operations_Procedures.md) | 2025-07-23 | Operational procedures for monitoring implementation, database maintenance, and system health management through Power Platform CoE framework |
| [Forecasting Actuals Display Business Rules](Future_State_Data_Product/business-rules/forecasting/20250723_Forecasting_ActualsDisplay_BusinessRules.md) | 2025-07-23 | Comprehensive business rules governing how actuals data is displayed across different forecasting tabs including rates, other expenses, statistics, and payroll with code validation |
| [Forecasting Actuals Display User Process](Future_State_Data_Product/user-processes/account-manager/20250723_Forecasting_ActualsDisplay_UserProcess.md) | 2025-07-23 | Comprehensive user process guide for Account Managers working with actuals data display across forecasting tabs including interpretation, analysis, and decision-making workflows |
| [Forecasting Actuals Display Team Notes](Future_State_Data_Product/team-notes/development/20250723_Forecasting_TeamNotes_ActualsDisplayDecisions.md) | 2025-07-23 | Team notes documenting key decisions, discussions, and coordination activities from backlog grooming session focused on actuals display methodology across forecasting tabs |
| [AI SDLC Integration Technical Specification](Future_State_Data_Product/technical/backend/20250723_AI_TechnicalSpec_SDLCIntegration.md) | 2025-07-23 | Comprehensive technical specification for AI tool integration in software development lifecycle, including MCP server architecture, tool configurations, and development workflow automation |
| [AI-Enhanced Development Workflow User Guide](Future_State_Data_Product/user-processes/development/20250723_AI_UserProcess_DevelopmentWorkflow.md) | 2025-07-23 | Step-by-step user process guide for developers implementing AI tools in their daily development workflow, including Root Code configuration, MCP server usage, and automated task management |
| [AI SDLC Integration Configuration Guide](Future_State_Data_Product/configuration/system-settings/20250723_AI_ConfigurationGuide_SDLCIntegration.md) | 2025-07-23 | Comprehensive configuration guide for setting up AI tools in the software development lifecycle, including Root Code, MCP servers, Azure DevOps integration, and context file management |
| [AI SDLC Integration Validation Report](Future_State_Data_Product/technical/backend/20250723_AI_ValidationReport_SDLCIntegration.md) | 2025-07-23 | Comprehensive validation report comparing AI integration documentation against actual implementation in Towne Park Billing repository with 95% accuracy confirmation |
| [RSS Troubleshooting Technical Specification](Future_State_Data_Product/technical/specifications/20250723_RSS_TechnicalSpec_TroubleshootingProcedures.md) | 2025-07-23 | Comprehensive technical specification for RSS troubleshooting procedures, webhook processing architecture, and integration diagnostics with Power Platform code validation |
| [RSS Troubleshooting User Guide](Future_State_Data_Product/user-processes/billing-admin/20250723_RSS_TroubleshootingProcess_UserGuide.md) | 2025-07-23 | Comprehensive user process guide for billing administrators and technical support teams to troubleshoot RSS submission issues and resolve processing failures |
| [RSS File Validation Business Rules](Future_State_Data_Product/business-rules/billing/20250723_RSS_FileValidation_BusinessRules.md) | 2025-07-23 | Comprehensive business rules governing RSS file validation, metadata requirements, processing criteria, and workflow management for Revenue Summary Sheet submissions |
| [Database Migration and Data Flow Technical Specifications](Future_State_Data_Product/technical/database/20250723_Database_TechnicalSpec_MigrationDataFlows.md) | 2025-07-23 | Comprehensive technical specifications for database node migration, job code rate data flows, and service principal configuration derived from daily scrum development activities |
| [Development Workflow and Deployment Standards](Future_State_Data_Product/user-processes/development/20250723_Development_UserProcess_WorkflowStandards.md) | 2025-07-23 | Comprehensive user process documentation for development workflow standards, pull request documentation, and deployment procedures derived from daily scrum development activities |
| [Daily Scrum Insights and Progress Tracking](Future_State_Data_Product/team-notes/development/20250723_Development_TeamNotes_DailyScrumInsights.md) | 2025-07-23 | Comprehensive team notes documenting daily scrum insights, development progress, and team coordination activities for Towne Park financial systems development |
| [Forecasting Technical Architecture and API Design](Future_State_Data_Product/technical/backend/20250718_Forecasting_TechnicalArchitecture_APIDesign.md) | 2025-07-18 | Comprehensive technical architecture documentation covering API design, system architecture, user interface patterns, and implementation strategies for the Towne Park Forecasting system |
| [Forecasting Business Rules and Development Decisions](Future_State_Data_Product/business-rules/forecasting/20250718_Forecasting_BusinessRules_DevelopmentDecisions.md) | 2025-07-18 | Comprehensive documentation of business rules and development decisions covering payroll forecasting, statistics calculations, P&L structures, and integration architecture |
| [Forecasting System Comprehensive Master Overview](Future_State_Data_Product/systems/forecasting/20250718_Forecasting_SystemOverview_ComprehensiveMaster.md) | 2025-07-18 | Complete system documentation for Towne Park's forecasting and billing systems including business requirements, technical architecture, data models, user workflows, and implementation roadmap |
| [Development Sprint Planning Project Management](Future_State_Data_Product/team-notes/20250718_Development_SprintPlanning_ProjectManagement.md) | 2025-07-18 | Comprehensive project management documentation from sprint planning sessions covering story estimation, implementation priorities, and development coordination |
| [Forecasting Billable Accounts Technical Specification](Future_State_Data_Product/technical/forecasting/20250718_Forecasting_BillableAccounts_TechnicalSpec.md) | 2025-07-18 | Comprehensive technical specification for billable accounts implementation including ETL design, Power Automate integration, and data architecture |
| [Forecasting User Experience Design Decisions](Future_State_Data_Product/user-processes/forecasting/20250718_Forecasting_UserExperience_DesignDecisions.md) | 2025-07-18 | Comprehensive documentation of user experience design decisions, UI terminology, and feature prioritization for the forecasting system |
| [Daily Scrum Team Notes](Future_State_Data_Product/team-notes/20250718_Development_DailyScrum_TeamNotes.md) | 2025-07-18 | Comprehensive team notes from daily scrum meetings covering development decisions, issue resolution, and operational insights for billing and forecasting systems |
| [AI Integration Technical Specification](Future_State_Data_Product/technical/backend/20250718_Development_AIIntegration_TechnicalSpec.md) | 2025-07-18 | Comprehensive technical specification for AI integration in Towne Park's development processes, including Power Automate optimization strategies and implementation limitations |
| [Contract Query Examples User Reference](Future_State_Data_Product/user-processes/contract-admin/20250718_Contracts_QueryExamples_UserReference.md) | 2025-07-18 | Comprehensive reference guide containing example queries for common business questions related to Towne Park contracts across all contract types and business scenarios |
| [Contracts Data Dictionary Technical Specification](Future_State_Data_Product/technical/database/20250718_Contracts_DataDictionary_TechnicalSpec.md) | 2025-07-18 | Comprehensive JSON schema reference for Towne Park's contract configurations, including all field definitions, validation rules, and business logic implementation |
| [Account Manager Forecasting Methodology Interview Insights](Future_State_Data_Product/user-processes/account-manager/20250718_AccountManager_ForecastingMethodology_InterviewInsights.md) | 2025-07-18 | Comprehensive documentation of Account Manager forecasting methodologies, processes, and best practices based on field interview with Jarrett Lagrone |
| [Pull Request Review Comprehensive Guide](Future_State_Data_Product/configuration/system-settings/20250718_Development_PRReview_ComprehensiveGuide.md) | 2025-07-18 | Complete configuration guide for pull request review processes, Azure DevOps MCP tools, and quality assurance standards for Towne Park's financial systems development |
| [Definition of Done Comprehensive Guide](Future_State_Data_Product/configuration/system-settings/20250718_Development_DefinitionOfDone_ComprehensiveGuide.md) | 2025-07-18 | Complete Definition of Done checklist and workflow enforcement procedures for Towne Park's financial software development team |
| [Architecture Team Meeting Notes](Future_State_Data_Product/team-notes/AulsonJonathan-Notes/20250718_Architecture_TeamMeetingNotes_WeeklySync.md) | 2025-07-18 | Comprehensive meeting notes from Architecture Weekly Sync sessions covering key decisions, discussions, and action items |
| [Integration Strategy for Hybrid Connections](Future_State_Data_Product/technical/integrations/20250718_Architecture_IntegrationStrategy_HybridConnections.md) | 2025-07-18 | Comprehensive integration architecture strategy for connecting Azure-hosted applications to on-premise SQL databases and external systems |
| [Power Platform Licensing Analysis](Future_State_Data_Product/configuration/system-settings/20250718_Architecture_LicensingAnalysis_PowerPlatform.md) | 2025-07-18 | Comprehensive analysis of Power Platform licensing options, cost implications, and recommendations for 600+ user deployment |
| [ALM Strategy for Power Platform](Future_State_Data_Product/technical/backend/20250718_Architecture_ALMStrategy_PowerPlatform.md) | 2025-07-18 | Comprehensive Application Lifecycle Management strategy and CI/CD implementation approach for Power Platform and Azure Static Web Apps |
| [Account Manager Forecasting Workflows](Future_State_Data_Product/user-processes/account-manager/20250718_Forecasting_UserProcesses_AccountManagerWorkflows.md) | 2025-07-18 | Comprehensive user processes and workflows for Account Managers using the Forecasting system, including site statistics, parking rates, payroll, and P&L analysis |
| [Forecasting Calculations and Validations](Future_State_Data_Product/business-rules/forecasting/20250718_Forecasting_BusinessRules_CalculationsAndValidations.md) | 2025-07-18 | Comprehensive business rules, calculation formulas, and validation logic for the Forecasting system including parking rates, budget calculations, and data validation rules |
| [Forecasting Database Integration](Future_State_Data_Product/technical/database/20250718_Forecasting_DatabaseIntegration_TechnicalSpec.md) | 2025-07-18 | Technical specifications for database integration, data sources, queries, and data flow for the Forecasting system including EDW integration and WorkDay connectivity with code validation |
| [Comprehensive Development Standards](Future_State_Data_Product/configuration/system-settings/20250718_Development_Standards_ComprehensiveGuide.md) | 2025-07-18 | Complete development guidelines, standards, and best practices for Towne Park billing and forecasting systems including 4-layer architecture, Git workflow, and code quality standards |
| [UAT User Stories Comprehensive Feedback](Future_State_Data_Product/user-processes/billing-admin/20250718_Billing_UATUserStories_ComprehensiveFeedback.md) | 2025-07-18 | Comprehensive UAT feedback for Towne Park billing system with detailed user stories, acceptance criteria, and Power Platform code validation |
| [Forecasting Data Integration Technical Spec](Future_State_Data_Product/technical/forecasting/20250702_Forecasting_DataIntegration_TechnicalSpec.md) | 2025-07-02 | Technical specification for automated job and wage data integration from Towne Park data warehouse with 4-hour sync intervals |
| [Job Group Management User Process](Future_State_Data_Product/user-processes/forecasting/20250702_Forecasting_JobGroupManagement_UserProcess.md) | 2025-07-02 | User process guide for administrative management of job groups and job code organization across customer sites |
| [Account Validation User Process](Future_State_Data_Product/user-processes/billing-admin/20250702_Billing_AccountValidation_UserProcess.md) | 2025-07-02 | User process for billing administrators to validate accounts against Great Plains master table with batch processing workflows |
| [Account Validation Business Rules](Future_State_Data_Product/business-rules/billing/20250702_Billing_AccountValidation_BusinessRules.md) | 2025-07-02 | Business rules for account validation processes including Great Plains integration and automated validation workflows |
| [Job Code Management Business Rules](Future_State_Data_Product/business-rules/forecasting/20250702_Forecasting_JobCodeManagement_BusinessRules.md) | 2025-07-02 | Business rules for job code management including hierarchical organization, validation, and administrative controls |
| [Negative Invoice GL Entity Mapping](Future_State_Data_Product/business-rules/billing/negative-invoice-gl-entity-mapping.md) | 2025-07-17 | Business rules for GL entity mapping in negative invoice scenarios with automated workflow validation |
| [Management Fee Escalation Rules](Future_State_Data_Product/business-rules/billing/management-fee-escalation-rules.md) | 2025-07-17 | Comprehensive escalation rules for management fees with percentage-based calculations and validation workflows |
| [PTEB Escalation Rules](Future_State_Data_Product/business-rules/billing/pteb-escalation-rules.md) | 2025-07-17 | Payroll Tax and Employee Benefits escalation rules with automatic percentage adjustments and compliance validation |
| [Forecasting P&L View Technical Spec](Future_State_Data_Product/technical/specifications/forecasting-pl-view-technical-spec.md) | 2025-07-17 | Technical specifications for P&L view implementation in forecasting system with Power Platform integration |
| [Power Automate Retry Mechanisms](Future_State_Data_Product/technical/specifications/power-automate-retry-mechanisms.md) | 2025-07-17 | Technical specifications for implementing retry mechanisms in Power Automate workflows with exponential backoff |
| [SharePoint Delta Token Management](Future_State_Data_Product/technical/specifications/sharepoint-delta-token-management.md) | 2025-07-17 | Technical specifications for SharePoint delta token management in RSS system for incremental synchronization |
| [PowerBill ROI Analysis & Success Metrics](Future_State_Data_Product/business-rules/billing/20250717_Billing_ROIAnalysis_PowerBillSuccessMetrics.md) | 2025-07-17 | Comprehensive ROI analysis and success metrics for PowerBill billing system implementation with $3.2M-$3.7M annual value and code validation |
| [Billing System Modernization Case Study](Future_State_Data_Product/business-rules/billing/20250717_TownePark_CaseStudy_BillingSystemModernization.md) | 2025-07-17 | Comprehensive case study documenting Towne Park's billing system modernization journey with code validation analysis |
| [Billable Accounts Business Rules](Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BillableAccounts_BusinessRules.md) | 2025-07-17 | Complete business rules for billable accounts internal revenue calculations, PTEB calculations, and support services billing |
| [Billable Accounts Technical Spec](Future_State_Data_Product/technical/database/20250716_Forecasting_BillableAccounts_TechnicalSpec.md) | 2025-07-17 | Technical specifications for billable accounts database queries, Power Platform workflows, and data integration patterns |
| [Payroll Forecasting System](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_PayrollForecasting_SystemOverview.md) | 2025-07-17 | Comprehensive system overview for multi-level payroll forecasting functionality with budget and actual data display |
| [Data Table Editing Process](Future_State_Data_Product/user-processes/account-manager/20250716_Forecasting_DataTableEditing_UserProcess.md) | 2025-07-17 | User process documentation for data table cell editing capabilities and validation workflows |
| [Statistics Pagination Process](Future_State_Data_Product/user-processes/account-manager/20250716_Forecasting_StatisticsPagination_UserProcess.md) | 2025-07-17 | User process documentation for statistics data pagination and navigation functionality |
| [Comprehensive Contract Business Rules](Future_State_Data_Product/business-rules/contracts/20250716_Contracts_BusinessRules_Comprehensive.md) | 2025-07-16 | Complete business rules and calculation logic for all contract types including Revenue Share, Management Agreement, Per Labor Hour, Fixed Fee, and Per Occupied Room with code validation |
| [Customer Site Management System](Future_State_Data_Product/systems/customer-sites/20250716_CustomerSites_SystemOverview_Management.md) | 2025-07-16 | Comprehensive overview of Towne Park's customer site management system with territory organization and operational data |
| [Site Classification Rules](Future_State_Data_Product/business-rules/customer-sites/site-classification-rules.md) | 2025-07-16 | Complete business rules for customer site classification, territory assignment, and capacity management |
| [Customer Sites Data Schema](Future_State_Data_Product/technical/database/customer-sites-data-schema.md) | 2025-07-16 | Technical database schema specification for customer site management system |
| [Site Onboarding Workflow](Future_State_Data_Product/user-processes/site-admin/site-onboarding-workflow.md) | 2025-07-16 | Step-by-step workflow guide for onboarding new customer sites |
| [Site Setup Configuration](Future_State_Data_Product/configuration/customer-sites/site-setup-configuration.md) | 2025-07-16 | Comprehensive configuration guide for customer site setup and system parameters |
| [Contract Management System](Future_State_Data_Product/systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md) | 2025-07-16 | Comprehensive overview of Towne Park's contract management system within PowerBill platform |
| [Contract Escalation Rules](Future_State_Data_Product/business-rules/contracts/contract-escalation-rules.md) | 2025-07-16 | Complete business rules for contract escalation calculations including CPI, ECI, and fixed percentage methods |
| [Contracts Data Schema](Future_State_Data_Product/technical/database/contracts-data-schema.md) | 2025-07-16 | Technical database schema specification for contract management system |
| [Contract Setup Workflow](Future_State_Data_Product/user-processes/contract-admin/contract-setup-workflow.md) | 2025-07-16 | Step-by-step workflow guide for contract administrators |
| [Contract Configuration Guide](Future_State_Data_Product/configuration/contracts/contract-configuration-guide.md) | 2025-07-16 | Comprehensive configuration and maintenance guide for contract management system |
| [Forecasting Master Architecture](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_MasterArchitecture.md) | 2025-07-16 | Comprehensive overview of the Towne Park Forecasting System architecture, business context, and core functionalities |
| [Forecasting Pilot & Rollout Process](Future_State_Data_Product/user-processes/district-manager/20250716_Forecasting_PilotRollout_ProcessWorkflow.md) | 2025-07-16 | Complete workflow documentation for forecasting system pilot program and full company rollout strategy |
| [Forecasting Project Discovery](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_Discovery.md) | 2025-07-16 | Comprehensive forecasting system modernization project overview with current state analysis and future vision |
| [Forecasting Business Rules](Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md) | 2025-07-16 | Complete business rules and process workflows for forecasting system operations |
| [Billing Technical Architecture](Future_State_Data_Product/technical/backend/20250716_Billing_TechnicalArchitecture_Development.md) | 2025-07-16 | Technical architecture and development standards for billing system implementation |
| [Development Configuration Guide](Future_State_Data_Product/configuration/system-settings/20250716_Development_ConfigurationGuide_Standards.md) | 2025-07-16 | Comprehensive development workflow and configuration standards for all Towne Park systems |
| [Invoice Calculation](Future_State_Data_Product/business-rules/billing/invoice-calculation.md) | July 15, 2025 | Updated tax calculation formula for multi-state operations |
| [Revenue Forecasting](Future_State_Data_Product/business-rules/forecasting/revenue.md) | July 12, 2025 | Added seasonal adjustment factors for hospitality sites |
| [User Access Control](Future_State_Data_Product/configuration/user-access/index.md) | July 8, 2025 | Documented new role-based permission structure |
| [Billing System Architecture](Future_State_Data_Product/systems/billing/architecture.md) | July 5, 2025 | Added integration diagrams for new payment processor |

## :material-tools: Resources & Tools

<div class="grid cards" markdown>

-   :material-file-search:{ .lg .middle } __Glossary__

    ---

    Look up terminology and definitions specific to Towne Park operations and systems.

    [:octicons-arrow-right-24: View Glossary](Future_State_Data_Product/glossary.md)

-   :material-book-open-page-variant:{ .lg .middle } __Documentation Overview__

    ---

    Get a comprehensive overview of the documentation organization and structure.

    [:octicons-arrow-right-24: Documentation Guide](Future_State_Data_Product/README.md)

</div>
## Quick Links

- [:octicons-arrow-right-24: Billing System Overview](Future_State_Data_Product/systems/billing/overview.md)
- [:octicons-arrow-right-24: Forecasting System Overview](Future_State_Data_Product/systems/forecasting/overview.md)
- [:octicons-arrow-right-24: Contract Management System](Future_State_Data_Product/systems/contracts/20250716_Contracts_SystemOverview_PowerBill.md)
- [:octicons-arrow-right-24: Customer Site Management System](Future_State_Data_Product/systems/customer-sites/20250716_CustomerSites_SystemOverview_Management.md)
- [:octicons-arrow-right-24: Revenue Share Contracts](Future_State_Data_Product/business-rules/contract-types/revenue-share.md)
