---
title: "Role-Based Permissions"
description: "Role-based access control and permissions management"
---

# Role-Based Permissions

## Overview

This document defines the role-based access control (RBAC) system for the Towne Park financial systems.

## User Roles

### Billing Administrator
- Full access to billing system
- Invoice generation and management
- Customer account management
- Billing configuration

### Account Manager
- Site-level data entry
- Forecasting submission
- Performance monitoring
- Customer communication

### District Manager
- Regional oversight
- Forecasting approval
- Performance analysis
- Team management

### Contract Administrator
- Contract setup and management
- Rate structure configuration
- Contract compliance monitoring
- Amendment processing

## Permission Matrix

| Function | Billing Admin | Account Manager | District Manager | Contract Admin |
|----------|---------------|-----------------|------------------|----------------|
| View Invoices | Yes | Yes | Yes | Yes |
| Generate Invoices | Yes | No | No | No |
| Enter Forecasting Data | Yes | Yes | No | No |
| Approve Forecasting | Yes | No | Yes | No |
| Manage Contracts | Yes | No | No | Yes |
| System Configuration | Yes | No | No | Yes |

## Related Documentation

- [User Access Configuration](../../configuration/user-access/index.md) 🔄 PLANNED
- [System Security](../../../technical/security/index.md) 🔄 PLANNED