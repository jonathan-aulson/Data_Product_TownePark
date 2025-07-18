---
title: "Business Rule: Service Fee Escalation"
description: "Details the rule for annual service fee increases based on Employment Cost Index (ECI) or a fixed percentage."
created_date: 2025-07-16
last_updated_date: 2025-07-16
source_date: 2025-05-20
version: 1.0
status: Draft
owner: "AI Assistant"
source_documents:
  - "Current_State_Data_Product/20250520_PROD - Contracts Table Data.md"
systems:
  - Billing
components:
  - Contract Management
business_domains:
  - Pricing
  - Billing
user_roles:
  - Finance
  - Account Manager
tags:
  - business-rule
  - billing
  - pricing
  - escalation
---

## Overview

This document outlines the business rule governing the annual escalation of service fees for specific contracts. The rule ensures that service fees are adjusted annually to reflect economic changes, using either a predefined percentage or the Employment Cost Index (ECI), whichever is more beneficial for escalation.

## Rule Definitions

### Rule Name

Service Fee Escalation

### Description

The service fee for eligible contracts increases annually. The applicable percentage for the increase is the greater of a fixed 3% or the prevailing Employment Cost Index (ECI).

### Applies To

*   **Contract Type**: Per Labor Hour
*   **Customer Site**: Baltimore Washington Medical Center (Customer Site ID: `FA3C229E-BA35-F011-8C4D-000D3A1DF1B5`, Site Number: `338`)
*   **Contract ID**: `602EA9DC-90D8-EF11-8EEA-0022480A57AC`

### Calculation Formula

The new service fee is calculated as follows:

`New Fee = Current Fee * MAX(1.03, ECI_Percentage)`

Where:
*   `Current Fee` is the service fee from the preceding year.
*   `ECI_Percentage` is the Employment Cost Index percentage for the relevant period.
*   `1.03` represents the fixed 3% escalator.

### Escalation Date

The annual escalation occurs on July 1st.

### Source

*   **Contract ID**: `602EA9DC-90D8-EF11-8EEA-0022480A57AC`
*   **Source Document**: `Current_State_Data_Product/20250520_PROD - Contracts Table Data.md` (Referencing notes for contract ID `602EA9DC-90D8-EF11-8EEA-0022480A57AC`)

### Implementation Notes

The implementation of this rule within the billing system should ensure accurate retrieval of the ECI data and apply the calculated fee increase automatically on the specified anniversary date. Cross-referencing with system configurations for ECI data sources is recommended.

## Related Documentation



## Code Validation

*   **Status**: Not Yet Performed
*   **Scope**: Business Rules (Rate Escalation Logic)
*   **Summary**: Validation against the Power Platform implementation has not yet been conducted. This step is critical to ensure the documented rule aligns with the actual system behavior.
*   **Recommendations**:
    *   Analyze relevant formula files in `Towne-Park-Billing-PA-Solution/BillingSystem/Formulas/` for the specific contract.
    *   Verify the implementation of the `MAX(1.03, ECI_Percentage)` logic in the billing system's calculation engine.
    *   Confirm the correct application of the annual escalator based on the July 1st anniversary date.