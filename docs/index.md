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
| [Billing Architecture](Future_State_Data_Product/systems/billing/architecture.md) | [Fixed Fee Contracts](Future_State_Data_Product/business-rules/contract-types/fixed-fee.md) | [Frontend Systems](Future_State_Data_Product/technical/frontend/index.md) | [Account Manager Processes](Future_State_Data_Product/user-processes/account-manager/index.md) |
| [Billing Integrations](Future_State_Data_Product/systems/billing/integrations.md) | [Management Agreements](Future_State_Data_Product/business-rules/contract-types/management-agreement.md) | [Backend Services](Future_State_Data_Product/technical/backend/index.md) | [Contract Setup](Future_State_Data_Product/configuration/contract-setup/index.md) |
| [Forecasting Overview](Future_State_Data_Product/systems/forecasting/overview.md) | [Invoice Calculation](Future_State_Data_Product/business-rules/billing/invoice-calculation.md) | [Database Models](Future_State_Data_Product/technical/database/index.md) | [User Access Control](Future_State_Data_Product/configuration/user-access/index.md) |
| [Forecasting Discovery](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_Discovery.md) | [Forecasting Process](Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md) | [Billing Architecture](Future_State_Data_Product/technical/backend/20250716_Billing_TechnicalArchitecture_Development.md) | [Development Standards](Future_State_Data_Product/configuration/system-settings/20250716_Development_ConfigurationGuide_Standards.md) |
| [Forecasting Master Architecture](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_MasterArchitecture.md) | [Pilot & Rollout Process](Future_State_Data_Product/user-processes/district-manager/20250716_Forecasting_PilotRollout_ProcessWorkflow.md) | | |
| [Generate Invoices](Future_State_Data_Product/systems/billing/generate-invoices.md) | [Revenue Forecasting](Future_State_Data_Product/business-rules/forecasting/revenue.md) | [System Integrations](Future_State_Data_Product/technical/integrations/index.md) | [System Settings](Future_State_Data_Product/configuration/system-settings/index.md) |

## :octicons-workflow-24: System Architecture Overview
<iframe width="100%" height="600" src="https://miro.com/app/live-embed/uXjVNq-EF7Y=/?focusWidget=3458764634681325772&embedMode=view_only_without_ui&embedId=264161241496" frameborder="0" allowfullscreen></iframe>


## :material-folder-multiple: Documentation Structure

The Towne Park documentation is organized into the following key sections:

- **Systems Documentation** - Technical details about core systems
  - [Billing System](Future_State_Data_Product/systems/billing/overview.md)
  - [Forecasting System](Future_State_Data_Product/systems/forecasting/overview.md)
  - [Forecasting Project Discovery](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_Discovery.md)
  - [Forecasting Master Architecture](Future_State_Data_Product/systems/forecasting/20250716_Forecasting_SystemOverview_MasterArchitecture.md)

- **Business Rules** - Policies and business logic
  - [Contract Types](Future_State_Data_Product/business-rules/contract-types/revenue-share.md)
  - [Billing Rules](Future_State_Data_Product/business-rules/billing/invoice-calculation.md)
  - [Forecasting Rules](Future_State_Data_Product/business-rules/forecasting/revenue.md)
  - [Forecasting Process Workflow](Future_State_Data_Product/business-rules/forecasting/20250716_Forecasting_BusinessRules_ProcessWorkflow.md)

- **Technical Reference** - Implementation details
  - [Frontend](Future_State_Data_Product/technical/frontend/index.md)
  - [Backend](Future_State_Data_Product/technical/backend/index.md)
  - [Billing Technical Architecture](Future_State_Data_Product/technical/backend/20250716_Billing_TechnicalArchitecture_Development.md)
  - [Database](Future_State_Data_Product/technical/database/index.md)
  - [Integrations](Future_State_Data_Product/technical/integrations/index.md)

- **User Processes** - Role-based workflows
  - [Account Manager](Future_State_Data_Product/user-processes/account-manager/index.md)
  - [Billing Admin](Future_State_Data_Product/user-processes/billing-admin/index.md)
  - [District Manager](Future_State_Data_Product/user-processes/district-manager/index.md)
  - [Forecasting Pilot & Rollout Process](Future_State_Data_Product/user-processes/district-manager/20250716_Forecasting_PilotRollout_ProcessWorkflow.md)

- **Configuration Guides** - Setup and maintenance
  - [Contract Setup](Future_State_Data_Product/configuration/contract-setup/index.md)
  - [User Access](Future_State_Data_Product/configuration/user-access/index.md)
  - [System Settings](Future_State_Data_Product/configuration/system-settings/index.md)
  - [Development Configuration Guide](Future_State_Data_Product/configuration/system-settings/20250716_Development_ConfigurationGuide_Standards.md)

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
**How do I set up a new site?**

Follow the comprehensive guide in [Contract Setup](Future_State_Data_Product/configuration/contract-setup/index.md).
</div>

</div>

## :material-book-open-variant: Latest Updates

| Document | Last Updated | Description |
|:---------|:------------|:------------|
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