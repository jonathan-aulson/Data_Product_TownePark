---
title: "SharePoint-Dataverse Integration Technical Specification"
version: "1.0"
last_updated: "2025-07-24"
author: "Towne Park Data Product Team"
status: "Active"
type: "Technical Specification"
tags: ["sharepoint", "dataverse", "integration", "power-platform", "technical-spec"]
related_docs:
  - "../architecture/sharepoint-integration-architecture.md"
  - "dataverse-integration.md"
  - "../../configuration/system-settings/20250724_EDW_Integration_Configuration.md"
  - "../../business-rules/billing/20250724_StatementAccess_BusinessRules.md"
---

# SharePoint-Dataverse Integration Technical Specification

## Overview

This document provides comprehensive technical specifications for the integration between Microsoft SharePoint and Microsoft Dataverse within the Towne Park Data Product platform. The integration enables seamless document management, data synchronization, and workflow automation while maintaining data integrity and security across both platforms.

## Integration Architecture

### Core Integration Components

#### SharePoint Integration Layer
- **Document Library Management**: Automated document storage and retrieval
- **Metadata Synchronization**: Bidirectional metadata sync between platforms
- **Workflow Integration**: Power Automate flows for document processing
- **Security Mapping**: Role-based access control synchronization
- **Version Control**: Document versioning and change tracking

#### Dataverse Integration Layer
- **Entity Synchronization**: Real-time data sync between SharePoint lists and Dataverse tables
- **Relationship Management**: Maintaining data relationships across platforms
- **Business Logic Processing**: Custom business rules and validation
- **Audit Trail Management**: Comprehensive change tracking and logging
- **API Gateway**: Centralized API management for integration endpoints

#### Power Platform Orchestration
- **Power Automate Flows**: Automated workflows for data and document processing
- **Power Apps Integration**: Custom applications leveraging both platforms
- **Power BI Connectivity**: Reporting and analytics across integrated data
- **AI Builder Integration**: Intelligent document processing and data extraction

## SharePoint Configuration

### Site Architecture

#### Document Libraries Structure
```json
{
  "document_libraries": {
    "billing_documents": {
      "url": "/sites/townepark/billing/documents",
      "content_types": [
        "Invoice",
        "Statement",
        "Contract",
        "Amendment"
      ],
      "metadata_fields": [
        "CustomerID",
        "ContractType",
        "BillingPeriod",
        "Amount",
        "Status",
        "ApprovalStatus"
      ],
      "retention_policy": "7_years",
      "security_groups": [
        "Billing_Administrators",
        "Finance_Team",
        "Account_Managers"
      ]
    },
    "forecasting_documents": {
      "url": "/sites/townepark/forecasting/documents",
      "content_types": [
        "ForecastReport",
        "DataAnalysis",
        "ProjectionModel",
        "ValidationReport"
      ],
      "metadata_fields": [
        "ForecastPeriod",
        "Territory",
        "ModelType",
        "Accuracy",
        "Status"
      ],
      "retention_policy": "5_years",
      "security_groups": [
        "Forecasting_Team",
        "District_Managers",
        "Analytics_Team"
      ]
    },
    "contracts_repository": {
      "url": "/sites/townepark/contracts/repository",
      "content_types": [
        "ServiceContract",
        "Amendment",
        "Addendum",
        "TerminationNotice"
      ],
      "metadata_fields": [
        "ContractID",
        "CustomerName",
        "ContractType",
        "EffectiveDate",
        "ExpirationDate",
        "Status",
        "RenewalStatus"
      ],
      "retention_policy": "10_years",
      "security_groups": [
        "Contract_Administrators",
        "Legal_Team",
        "Business_Development"
      ]
    }
  }
}
```

#### List Configurations
```json
{
  "sharepoint_lists": {
    "customer_sites": {
      "url": "/sites/townepark/lists/customersites",
      "sync_with_dataverse": true,
      "dataverse_table": "tp_customersites",
      "sync_frequency": "real_time",
      "fields": [
        {
          "name": "SiteID",
          "type": "Text",
          "required": true,
          "unique": true,
          "dataverse_field": "tp_siteid"
        },
        {
          "name": "SiteName",
          "type": "Text",
          "required": true,
          "dataverse_field": "tp_sitename"
        },
        {
          "name": "Address",
          "type": "Note",
          "required": true,
          "dataverse_field": "tp_address"
        },
        {
          "name": "Territory",
          "type": "Lookup",
          "lookup_list": "territories",
          "dataverse_field": "tp_territory"
        },
        {
          "name": "Status",
          "type": "Choice",
          "choices": ["Active", "Inactive", "Pending"],
          "dataverse_field": "tp_status"
        }
      ]
    },
    "billing_schedules": {
      "url": "/sites/townepark/lists/billingschedules",
      "sync_with_dataverse": true,
      "dataverse_table": "tp_billingschedules",
      "sync_frequency": "hourly",
      "fields": [
        {
          "name": "ScheduleID",
          "type": "Text",
          "required": true,
          "unique": true,
          "dataverse_field": "tp_scheduleid"
        },
        {
          "name": "CustomerID",
          "type": "Text",
          "required": true,
          "dataverse_field": "tp_customerid"
        },
        {
          "name": "BillingFrequency",
          "type": "Choice",
          "choices": ["Monthly", "Quarterly", "Annual"],
          "dataverse_field": "tp_billingfrequency"
        },
        {
          "name": "NextBillingDate",
          "type": "DateTime",
          "required": true,
          "dataverse_field": "tp_nextbillingdate"
        }
      ]
    }
  }
}
```

### Content Type Management

#### Custom Content Types
```xml
<ContentType ID="0x0101001234567890ABCDEF" Name="TowneParkInvoice" Group="Towne Park Content Types">
  <FieldRefs>
    <FieldRef ID="{12345678-1234-1234-1234-123456789012}" Name="CustomerID" Required="TRUE"/>
    <FieldRef ID="{12345678-1234-1234-1234-123456789013}" Name="InvoiceNumber" Required="TRUE"/>
    <FieldRef ID="{12345678-1234-1234-1234-123456789014}" Name="InvoiceDate" Required="TRUE"/>
    <FieldRef ID="{12345678-1234-1234-1234-123456789015}" Name="Amount" Required="TRUE"/>
    <FieldRef ID="{12345678-1234-1234-1234-123456789016}" Name="Status" Required="TRUE"/>
    <FieldRef ID="{12345678-1234-1234-1234-123456789017}" Name="ApprovalStatus" Required="FALSE"/>
  </FieldRefs>
  <DocumentTemplate TargetName="/_cts/TowneParkInvoice/invoice_template.docx"/>
</ContentType>
```

#### Metadata Schema
```json
{
  "metadata_schema": {
    "billing_metadata": {
      "customer_id": {
        "type": "text",
        "required": true,
        "validation": "^CUST[0-9]{6}$",
        "dataverse_mapping": "tp_customerid"
      },
      "contract_type": {
        "type": "choice",
        "choices": [
          "Revenue Share",
          "Per Labor Hour",
          "Fixed Fee",
          "Management Agreement",
          "Hybrid"
        ],
        "required": true,
        "dataverse_mapping": "tp_contracttype"
      },
      "billing_period": {
        "type": "text",
        "format": "YYYY-MM",
        "required": true,
        "dataverse_mapping": "tp_billingperiod"
      },
      "amount": {
        "type": "currency",
        "required": true,
        "validation": ">=0",
        "dataverse_mapping": "tp_amount"
      }
    }
  }
}
```

## Dataverse Configuration

### Table Definitions

#### Customer Sites Table
```json
{
  "table_name": "tp_customersites",
  "display_name": "Customer Sites",
  "plural_name": "Customer Sites",
  "description": "Customer site information synchronized from SharePoint",
  "ownership": "UserOwned",
  "columns": [
    {
      "logical_name": "tp_siteid",
      "display_name": "Site ID",
      "type": "Text",
      "max_length": 50,
      "required": true,
      "unique": true,
      "sharepoint_field": "SiteID"
    },
    {
      "logical_name": "tp_sitename",
      "display_name": "Site Name",
      "type": "Text",
      "max_length": 255,
      "required": true,
      "sharepoint_field": "SiteName"
    },
    {
      "logical_name": "tp_address",
      "display_name": "Address",
      "type": "Memo",
      "max_length": 2000,
      "sharepoint_field": "Address"
    },
    {
      "logical_name": "tp_territory",
      "display_name": "Territory",
      "type": "Lookup",
      "target_table": "tp_territories",
      "sharepoint_field": "Territory"
    },
    {
      "logical_name": "tp_status",
      "display_name": "Status",
      "type": "OptionSet",
      "options": [
        {"value": 1, "label": "Active"},
        {"value": 2, "label": "Inactive"},
        {"value": 3, "label": "Pending"}
      ],
      "sharepoint_field": "Status"
    }
  ]
}
```

#### Billing Documents Table
```json
{
  "table_name": "tp_billingdocuments",
  "display_name": "Billing Documents",
  "plural_name": "Billing Documents",
  "description": "Billing document metadata synchronized from SharePoint",
  "ownership": "UserOwned",
  "columns": [
    {
      "logical_name": "tp_documentid",
      "display_name": "Document ID",
      "type": "Text",
      "max_length": 100,
      "required": true,
      "unique": true
    },
    {
      "logical_name": "tp_sharepointurl",
      "display_name": "SharePoint URL",
      "type": "Text",
      "max_length": 500,
      "required": true
    },
    {
      "logical_name": "tp_documenttype",
      "display_name": "Document Type",
      "type": "OptionSet",
      "options": [
        {"value": 1, "label": "Invoice"},
        {"value": 2, "label": "Statement"},
        {"value": 3, "label": "Contract"},
        {"value": 4, "label": "Amendment"}
      ]
    },
    {
      "logical_name": "tp_customerid",
      "display_name": "Customer ID",
      "type": "Text",
      "max_length": 50,
      "required": true
    },
    {
      "logical_name": "tp_amount",
      "display_name": "Amount",
      "type": "Money",
      "precision": 2
    }
  ]
}
```

### Relationship Definitions

#### Table Relationships
```json
{
  "relationships": [
    {
      "name": "tp_customersite_billingdocuments",
      "type": "OneToMany",
      "primary_table": "tp_customersites",
      "related_table": "tp_billingdocuments",
      "primary_key": "tp_siteid",
      "foreign_key": "tp_customerid",
      "cascade_configuration": {
        "assign": "NoCascade",
        "delete": "RemoveLink",
        "merge": "NoCascade",
        "reparent": "NoCascade",
        "share": "NoCascade",
        "unshare": "NoCascade"
      }
    },
    {
      "name": "tp_territory_customersites",
      "type": "OneToMany",
      "primary_table": "tp_territories",
      "related_table": "tp_customersites",
      "primary_key": "tp_territoryid",
      "foreign_key": "tp_territory",
      "cascade_configuration": {
        "assign": "NoCascade",
        "delete": "RemoveLink",
        "merge": "NoCascade",
        "reparent": "NoCascade",
        "share": "NoCascade",
        "unshare": "NoCascade"
      }
    }
  ]
}
```

## Power Automate Integration Flows

### Document Processing Flows

#### Invoice Processing Flow
```json
{
  "flow_name": "Process_Invoice_Documents",
  "trigger": {
    "type": "SharePoint",
    "event": "When a file is created or modified",
    "site": "/sites/townepark/billing",
    "library": "documents",
    "folder": "/invoices"
  },
  "actions": [
    {
      "name": "Extract_Document_Properties",
      "type": "SharePoint",
      "action": "Get file properties",
      "inputs": {
        "site": "@triggerBody()?['SiteUrl']",
        "library": "@triggerBody()?['LibraryName']",
        "file": "@triggerBody()?['Name']"
      }
    },
    {
      "name": "Validate_Invoice_Data",
      "type": "Condition",
      "condition": {
        "and": [
          {
            "not": {
              "equals": [
                "@outputs('Extract_Document_Properties')?['body/CustomerID']",
                ""
              ]
            }
          },
          {
            "greater": [
              "@float(outputs('Extract_Document_Properties')?['body/Amount'])",
              0
            ]
          }
        ]
      }
    },
    {
      "name": "Create_Dataverse_Record",
      "type": "Dataverse",
      "action": "Add a new row",
      "inputs": {
        "table": "tp_billingdocuments",
        "item": {
          "tp_documentid": "@outputs('Extract_Document_Properties')?['body/ID']",
          "tp_sharepointurl": "@outputs('Extract_Document_Properties')?['body/ServerRedirectedEmbedUrl']",
          "tp_documenttype": "@outputs('Extract_Document_Properties')?['body/ContentType']",
          "tp_customerid": "@outputs('Extract_Document_Properties')?['body/CustomerID']",
          "tp_amount": "@float(outputs('Extract_Document_Properties')?['body/Amount'])"
        }
      }
    },
    {
      "name": "Send_Notification",
      "type": "Office365Outlook",
      "action": "Send an email (V2)",
      "inputs": {
        "to": "billing@townepark.com",
        "subject": "New Invoice Processed: @{outputs('Extract_Document_Properties')?['body/Name']}",
        "body": "A new invoice has been processed and synchronized to Dataverse."
      }
    }
  ]
}
```

#### Data Synchronization Flow
```json
{
  "flow_name": "Sync_SharePoint_To_Dataverse",
  "trigger": {
    "type": "SharePoint",
    "event": "When an item is created or modified",
    "site": "/sites/townepark",
    "list": "Customer Sites"
  },
  "actions": [
    {
      "name": "Check_Dataverse_Record_Exists",
      "type": "Dataverse",
      "action": "List rows",
      "inputs": {
        "table": "tp_customersites",
        "filter": "tp_siteid eq '@{triggerBody()?['SiteID']}'"
      }
    },
    {
      "name": "Determine_Action",
      "type": "Condition",
      "condition": {
        "greater": [
          "@length(outputs('Check_Dataverse_Record_Exists')?['body/value'])",
          0
        ]
      },
      "if_yes": [
        {
          "name": "Update_Dataverse_Record",
          "type": "Dataverse",
          "action": "Update a row",
          "inputs": {
            "table": "tp_customersites",
            "row_id": "@first(outputs('Check_Dataverse_Record_Exists')?['body/value'])?['tp_customersitesid']",
            "item": {
              "tp_sitename": "@triggerBody()?['SiteName']",
              "tp_address": "@triggerBody()?['Address']",
              "tp_status": "@triggerBody()?['Status/Value']"
            }
          }
        }
      ],
      "if_no": [
        {
          "name": "Create_Dataverse_Record",
          "type": "Dataverse",
          "action": "Add a new row",
          "inputs": {
            "table": "tp_customersites",
            "item": {
              "tp_siteid": "@triggerBody()?['SiteID']",
              "tp_sitename": "@triggerBody()?['SiteName']",
              "tp_address": "@triggerBody()?['Address']",
              "tp_status": "@triggerBody()?['Status/Value']"
            }
          }
        }
      ]
    }
  ]
}
```

### Bidirectional Synchronization

#### Dataverse to SharePoint Sync
```json
{
  "flow_name": "Sync_Dataverse_To_SharePoint",
  "trigger": {
    "type": "Dataverse",
    "event": "When a row is added, modified or deleted",
    "table": "tp_customersites"
  },
  "actions": [
    {
      "name": "Get_SharePoint_Item",
      "type": "SharePoint",
      "action": "Get items",
      "inputs": {
        "site": "/sites/townepark",
        "list": "Customer Sites",
        "filter": "SiteID eq '@{triggerBody()?['tp_siteid']}'"
      }
    },
    {
      "name": "Check_SharePoint_Item_Exists",
      "type": "Condition",
      "condition": {
        "greater": [
          "@length(outputs('Get_SharePoint_Item')?['body/value'])",
          0
        ]
      },
      "if_yes": [
        {
          "name": "Update_SharePoint_Item",
          "type": "SharePoint",
          "action": "Update item",
          "inputs": {
            "site": "/sites/townepark",
            "list": "Customer Sites",
            "id": "@first(outputs('Get_SharePoint_Item')?['body/value'])?['ID']",
            "item": {
              "SiteName": "@triggerBody()?['tp_sitename']",
              "Address": "@triggerBody()?['tp_address']",
              "Status": "@triggerBody()?['tp_status@OData.Community.Display.V1.FormattedValue']"
            }
          }
        }
      ],
      "if_no": [
        {
          "name": "Create_SharePoint_Item",
          "type": "SharePoint",
          "action": "Create item",
          "inputs": {
            "site": "/sites/townepark",
            "list": "Customer Sites",
            "item": {
              "SiteID": "@triggerBody()?['tp_siteid']",
              "SiteName": "@triggerBody()?['tp_sitename']",
              "Address": "@triggerBody()?['tp_address']",
              "Status": "@triggerBody()?['tp_status@OData.Community.Display.V1.FormattedValue']"
            }
          }
        }
      ]
    }
  ]
}
```

## Security and Permissions

### SharePoint Security Configuration

#### Permission Levels
```json
{
  "permission_levels": {
    "billing_full_control": {
      "name": "Billing Full Control",
      "description": "Full control over billing documents and data",
      "permissions": [
        "ManageLists",
        "ManagePermissions",
        "AddAndCustomizePages",
        "ApplyThemeAndBorder",
        "ApplyStyleSheets",
        "CreateGroups",
        "BrowseDirectories",
        "ViewListItems",
        "AddListItems",
        "EditListItems",
        "DeleteListItems",
        "ApproveItems",
        "OpenItems",
        "ViewVersions",
        "DeleteVersions",
        "CancelCheckout",
        "ManagePersonalViews",
        "ManageLists",
        "ViewFormPages",
        "Open",
        "ViewPages",
        "CreateSSCSite",
        "BrowseUserInfo",
        "ManageAlerts",
        "UseRemoteAPIs",
        "UseClientIntegration",
        "ManageWeb",
        "AddDelPrivateWebParts",
        "UpdatePersonalWebParts"
      ]
    },
    "billing_contribute": {
      "name": "Billing Contribute",
      "description": "Contribute to billing documents",
      "permissions": [
        "ViewListItems",
        "AddListItems",
        "EditListItems",
        "DeleteListItems",
        "OpenItems",
        "ViewVersions",
        "ManagePersonalViews",
        "ViewFormPages",
        "Open",
        "ViewPages",
        "BrowseUserInfo",
        "ManageAlerts",
        "UseRemoteAPIs",
        "UseClientIntegration",
        "AddDelPrivateWebParts",
        "UpdatePersonalWebParts"
      ]
    },
    "billing_read": {
      "name": "Billing Read",
      "description": "Read-only access to billing documents",
      "permissions": [
        "ViewListItems",
        "OpenItems",
        "ViewVersions",
        "ViewFormPages",
        "Open",
        "ViewPages",
        "BrowseUserInfo",
        "UseRemoteAPIs",
        "UseClientIntegration"
      ]
    }
  }
}
```

#### Security Groups Mapping
```json
{
  "security_groups": {
    "billing_administrators": {
      "sharepoint_group": "Billing Administrators",
      "dataverse_team": "Billing Admin Team",
      "permission_level": "billing_full_control",
      "members": [
        "billing.admin@townepark.com",
        "finance.manager@townepark.com"
      ]
    },
    "account_managers": {
      "sharepoint_group": "Account Managers",
      "dataverse_team": "Account Manager Team",
      "permission_level": "billing_contribute",
      "members": [
        "account.manager1@townepark.com",
        "account.manager2@townepark.com"
      ]
    },
    "finance_team": {
      "sharepoint_group": "Finance Team",
      "dataverse_team": "Finance Team",
      "permission_level": "billing_read",
      "members": [
        "finance.analyst@townepark.com",
        "finance.coordinator@townepark.com"
      ]
    }
  }
}
```

### Dataverse Security Configuration

#### Security Roles
```json
{
  "security_roles": {
    "billing_administrator": {
      "name": "Billing Administrator",
      "description": "Full access to billing data and documents",
      "privileges": {
        "tp_customersites": {
          "create": "Global",
          "read": "Global",
          "write": "Global",
          "delete": "Global",
          "append": "Global",
          "append_to": "Global",
          "assign": "Global",
          "share": "Global"
        },
        "tp_billingdocuments": {
          "create": "Global",
          "read": "Global",
          "write": "Global",
          "delete": "Global",
          "append": "Global",
          "append_to": "Global",
          "assign": "Global",
          "share": "Global"
        }
      }
    },
    "account_manager": {
      "name": "Account Manager",
      "description": "Access to assigned customer sites and billing data",
      "privileges": {
        "tp_customersites": {
          "create": "User",
          "read": "Business Unit",
          "write": "User",
          "delete": "None",
          "append": "User",
          "append_to": "User",
          "assign": "User",
          "share": "User"
        },
        "tp_billingdocuments": {
          "create": "User",
          "read": "Business Unit",
          "write": "User",
          "delete": "None",
          "append": "User",
          "append_to": "User",
          "assign": "User",
          "share": "User"
        }
      }
    }
  }
}
```

## Error Handling and Monitoring

### Error Handling Strategies

#### Flow Error Handling
```json
{
  "error_handling": {
    "retry_policy": {
      "type": "exponential",
      "count": 3,
      "interval": "PT10S",
      "maximum_interval": "PT1H",
      "minimum_interval": "PT5S"
    },
    "error_actions": [
      {
        "name": "Log_Error",
        "type": "Compose",
        "inputs": {
          "error_message": "@{result('Previous_Action')['error']['message']}",
          "error_code": "@{result('Previous_Action')['error']['code']}",
          "timestamp": "@utcNow()",
          "flow_run_id": "@workflow()['run']['name']"
        }
      },
      {
        "name": "Send_Error_Notification",
        "type": "Office365Outlook",
        "action": "Send an email (V2)",
        "inputs": {
          "to": "integration.support@townepark.com",
          "subject": "SharePoint-Dataverse Integration Error",
          "body": "An error occurred in the integration flow: @{outputs('Log_Error')}"
        }
      }
    ]
  }
}
```

#### Data Validation Rules
```json
{
  "validation_rules": {
    "customer_site_validation": {
      "site_id": {
        "required": true,
        "pattern": "^SITE[0-9]{6}$",
        "error_message": "Site ID must follow format SITE######"
      },
      "site_name": {
        "required": true,
        "max_length": 255,
        "error_message": "Site name is required and must be less than 255 characters"
      },
      "status": {
        "required": true,
        "allowed_values": ["Active", "Inactive", "Pending"],
        "error_message": "Status must be Active, Inactive, or Pending"
      }
    },
    "billing_document_validation": {
      "customer_id": {
        "required": true,
        "pattern": "^CUST[0-9]{6}$",
        "error_message": "Customer ID must follow format CUST######"
      },
      "amount": {
        "required": true,
        "type": "number",
        "minimum": 0,
        "error_message": "Amount must be a positive number"
      }
    }
  }
}
```

### Monitoring and Alerting

#### Performance Monitoring
```json
{
  "monitoring_metrics": {
    "sync_performance": {
      "metric_name": "SharePoint_Dataverse_Sync_Duration",
      "threshold_warning": 300000,
      "threshold_critical": 600000,
      "unit": "milliseconds"
    },
    "error_rate": {
      "metric_name": "Integration_Error_Rate",
      "threshold_warning": 5,
      "threshold_critical": 10,
      "unit": "percentage"
    },
    "data_consistency": {
      "metric_name": "Data_Consistency_Check",
      "threshold_warning": 95,
      "threshold_critical": 90,
      "unit": "percentage"
    }
  }
}
```

#### Alert Configuration
```json
{
  "alerts": {
    "sync_failure": {
      "condition": "error_rate > 10%",
      "severity": "critical",
      "notification_channels": [
        "email:integration.support@townepark.com",
        "teams:integration-alerts"
      ],
      "escalation_policy": "immediate"
    },
    "performance_degradation": {
      "condition": "sync_duration > 10_minutes",
      "severity": "warning",
      "notification_channels": [
        "email:integration.support@townepark.com"
      ],
      "escalation_policy": "after_30_minutes"
    },
    "data_inconsistency": {
      "condition": "consistency_check < 95%",
      "severity": "high",
      "notification_channels": [
        "email:data.quality@townepark.com",
        "teams:data-quality-alerts"
      ],
      "escalation_policy": "after_15_minutes"
    }
  }
}
```

## Data Consistency and Reconciliation

### Reconciliation Processes

#### Daily Reconciliation Job
```json
{
  "reconciliation_job": {
    "name": "Daily_SharePoint_Dataverse_Reconciliation",
    "schedule": "0 2 * * *",
    "steps": [
      {
        "name": "Extract_SharePoint_Data",
        "action": "query_sharepoint_lists",
        "parameters": {
          "lists": ["Customer Sites", "Billing Schedules"],
          "modified_since": "yesterday"
        }
      },
      {
        "name": "Extract_Dataverse_Data",
        "action": "query_dataverse_tables",
        "parameters": {
          "tables": ["tp_customersites", "tp_billingschedules"],
          "modified_since": "yesterday"
        }
      },
      {
        "name": "Compare_Data",
        "action": "data_comparison",
        "parameters": {
          "comparison_fields": ["id", "name", "status", "modified_date"],
          "tolerance": {
            "date_difference": "5_minutes",
            "text_difference": "exact_match"
          }
        }
      },
      {
        "name": "Generate_Discrepancy_Report",
        "action": "create_report",
        "parameters": {
          "format": "excel",
          "include_details": true,
          "email_recipients": ["data.quality@townepark.com"]
        }
      }