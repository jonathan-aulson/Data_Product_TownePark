---
title: "Customer Sites API Technical Specification"
version: "1.0"
last_updated: "2025-07-24"
author: "Towne Park Data Product Team"
status: "Active"
type: "API Specification"
tags: ["api", "customer-sites", "rest", "technical-spec", "integration"]
related_docs:
  - "../database/customer-sites-data-schema.md"
  - "../../business-rules/customer-sites/territory-assignment-rules.md"
  - "../../user-processes/site-admin/site-onboarding-workflow.md"
  - "../integration/customer-sites-billing-integration.md"
---

# Customer Sites API Technical Specification

## Overview

This document provides comprehensive technical specifications for the Customer Sites API within the Towne Park Data Product platform. The API enables management of customer site information, territory assignments, contact management, and integration with billing and forecasting systems through RESTful web services.

## API Architecture

### Core API Components

#### RESTful Service Design
- **Base URL**: `https://api.townepark.com/v1/customer-sites`
- **Protocol**: HTTPS with TLS 1.2+
- **Authentication**: OAuth 2.0 with JWT tokens
- **Content Type**: `application/json`
- **API Versioning**: URI versioning (`/v1/`, `/v2/`)

#### Resource Hierarchy
```
/customer-sites
├── /sites
│   ├── /{siteId}
│   ├── /{siteId}/contacts
│   ├── /{siteId}/territories
│   ├── /{siteId}/billing
│   └── /{siteId}/forecasting
├── /territories
│   ├── /{territoryId}
│   ├── /{territoryId}/sites
│   └── /{territoryId}/managers
├── /contacts
│   ├── /{contactId}
│   └── /{contactId}/sites
└── /search
    ├── /sites
    ├── /territories
    └── /contacts
```

### Data Models

#### Site Entity Model
```json
{
  "site": {
    "id": "string (UUID)",
    "name": "string (required, max 255)",
    "code": "string (required, unique, max 50)",
    "status": "enum [active, inactive, pending, suspended]",
    "type": "enum [hospital, office_building, retail, mixed_use, other]",
    "address": {
      "street1": "string (required, max 255)",
      "street2": "string (optional, max 255)",
      "city": "string (required, max 100)",
      "state": "string (required, 2 chars)",
      "zip": "string (required, max 10)",
      "country": "string (default: US, 2 chars)"
    },
    "coordinates": {
      "latitude": "decimal (optional, -90 to 90)",
      "longitude": "decimal (optional, -180 to 180)"
    },
    "territory": {
      "id": "string (UUID)",
      "name": "string",
      "manager_id": "string (UUID)"
    },
    "billing_info": {
      "customer_id": "string (required)",
      "contract_type": "enum [revenue_share, per_labor_hour, fixed_fee, management_agreement, hybrid]",
      "billing_cycle": "enum [monthly, quarterly, annual]",
      "payment_terms": "string"
    },
    "operational_info": {
      "parking_spaces": "integer (optional)",
      "operating_hours": {
        "monday": {"open": "time", "close": "time"},
        "tuesday": {"open": "time", "close": "time"},
        "wednesday": {"open": "time", "close": "time"},
        "thursday": {"open": "time", "close": "time"},
        "friday": {"open": "time", "close": "time"},
        "saturday": {"open": "time", "close": "time"},
        "sunday": {"open": "time", "close": "time"}
      },
      "special_requirements": "string (optional, max 1000)"
    },
    "metadata": {
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)",
      "created_by": "string (UUID)",
      "updated_by": "string (UUID)",
      "version": "integer"
    }
  }
}
```

#### Territory Entity Model
```json
{
  "territory": {
    "id": "string (UUID)",
    "name": "string (required, max 255)",
    "code": "string (required, unique, max 50)",
    "description": "string (optional, max 1000)",
    "manager": {
      "id": "string (UUID)",
      "name": "string",
      "email": "string",
      "phone": "string"
    },
    "boundaries": {
      "type": "enum [geographic, administrative, custom]",
      "definition": "object (GeoJSON or custom rules)"
    },
    "sites_count": "integer (read-only)",
    "active_sites_count": "integer (read-only)",
    "metadata": {
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)",
      "created_by": "string (UUID)",
      "updated_by": "string (UUID)"
    }
  }
}
```

#### Contact Entity Model
```json
{
  "contact": {
    "id": "string (UUID)",
    "site_id": "string (UUID, required)",
    "type": "enum [primary, billing, operations, emergency, other]",
    "name": {
      "first": "string (required, max 100)",
      "last": "string (required, max 100)",
      "title": "string (optional, max 100)"
    },
    "contact_info": {
      "email": "string (email format)",
      "phone": "string (phone format)",
      "mobile": "string (phone format, optional)",
      "fax": "string (phone format, optional)"
    },
    "preferences": {
      "preferred_contact_method": "enum [email, phone, mobile]",
      "notifications": {
        "billing": "boolean",
        "operations": "boolean",
        "emergency": "boolean"
      }
    },
    "is_active": "boolean (default: true)",
    "metadata": {
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)",
      "created_by": "string (UUID)",
      "updated_by": "string (UUID)"
    }
  }
}
```

## API Endpoints

### Site Management Endpoints

#### GET /sites
Retrieve a list of customer sites with optional filtering and pagination.

**Request Parameters:**
```json
{
  "query_parameters": {
    "page": "integer (default: 1, min: 1)",
    "limit": "integer (default: 50, min: 1, max: 1000)",
    "status": "string (optional, enum values)",
    "territory_id": "string (optional, UUID)",
    "type": "string (optional, enum values)",
    "search": "string (optional, searches name and code)",
    "sort": "string (optional, default: name)",
    "order": "string (optional, enum [asc, desc], default: asc)"
  }
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Downtown Medical Center",
      "code": "DMC001",
      "status": "active",
      "type": "hospital",
      "address": {
        "street1": "123 Main Street",
        "city": "Dallas",
        "state": "TX",
        "zip": "75201"
      },
      "territory": {
        "id": "456e7890-e89b-12d3-a456-426614174001",
        "name": "North Texas Region"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total_pages": 5,
    "total_count": 247,
    "has_next": true,
    "has_previous": false
  },
  "metadata": {
    "request_id": "req_123456789",
    "timestamp": "2025-07-24T19:08:15.649Z",
    "version": "1.0"
  }
}
```

#### POST /sites
Create a new customer site.

**Request Body:**
```json
{
  "name": "New Medical Center",
  "code": "NMC001",
  "status": "pending",
  "type": "hospital",
  "address": {
    "street1": "456 Oak Avenue",
    "city": "Houston",
    "state": "TX",
    "zip": "77001"
  },
  "territory_id": "456e7890-e89b-12d3-a456-426614174001",
  "billing_info": {
    "customer_id": "CUST001",
    "contract_type": "revenue_share",
    "billing_cycle": "monthly"
  },
  "operational_info": {
    "parking_spaces": 500,
    "operating_hours": {
      "monday": {"open": "06:00", "close": "22:00"},
      "tuesday": {"open": "06:00", "close": "22:00"}
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "789e0123-e89b-12d3-a456-426614174002",
    "name": "New Medical Center",
    "code": "NMC001",
    "status": "pending",
    "created_at": "2025-07-24T19:08:15.649Z"
  },
  "metadata": {
    "request_id": "req_123456790",
    "timestamp": "2025-07-24T19:08:15.649Z"
  }
}
```

#### GET /sites/{siteId}
Retrieve detailed information for a specific site.

**Path Parameters:**
- `siteId`: UUID of the site

**Response:**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Downtown Medical Center",
    "code": "DMC001",
    "status": "active",
    "type": "hospital",
    "address": {
      "street1": "123 Main Street",
      "street2": "Suite 100",
      "city": "Dallas",
      "state": "TX",
      "zip": "75201",
      "country": "US"
    },
    "coordinates": {
      "latitude": 32.7767,
      "longitude": -96.7970
    },
    "territory": {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "name": "North Texas Region",
      "manager_id": "mgr_001"
    },
    "billing_info": {
      "customer_id": "CUST001",
      "contract_type": "revenue_share",
      "billing_cycle": "monthly",
      "payment_terms": "Net 30"
    },
    "operational_info": {
      "parking_spaces": 750,
      "operating_hours": {
        "monday": {"open": "06:00", "close": "22:00"},
        "tuesday": {"open": "06:00", "close": "22:00"},
        "wednesday": {"open": "06:00", "close": "22:00"},
        "thursday": {"open": "06:00", "close": "22:00"},
        "friday": {"open": "06:00", "close": "22:00"},
        "saturday": {"open": "08:00", "close": "20:00"},
        "sunday": {"open": "08:00", "close": "20:00"}
      },
      "special_requirements": "24/7 emergency access required"
    },
    "metadata": {
      "created_at": "2025-01-15T10:30:00.000Z",
      "updated_at": "2025-07-24T19:08:15.649Z",
      "created_by": "user_001",
      "updated_by": "user_002",
      "version": 3
    }
  }
}
```

#### PUT /sites/{siteId}
Update an existing site.

**Path Parameters:**
- `siteId`: UUID of the site

**Request Body:**
```json
{
  "name": "Downtown Medical Center - Updated",
  "status": "active",
  "address": {
    "street1": "123 Main Street",
    "street2": "Suite 200",
    "city": "Dallas",
    "state": "TX",
    "zip": "75201"
  },
  "operational_info": {
    "parking_spaces": 800,
    "special_requirements": "24/7 emergency access required, valet service available"
  }
}
```

#### DELETE /sites/{siteId}
Deactivate a site (soft delete).

**Path Parameters:**
- `siteId`: UUID of the site

**Response:**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "status": "inactive",
    "deactivated_at": "2025-07-24T19:08:15.649Z"
  }
}
```

### Territory Management Endpoints

#### GET /territories
Retrieve a list of territories.

**Response:**
```json
{
  "data": [
    {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "name": "North Texas Region",
      "code": "NTX",
      "manager": {
        "id": "mgr_001",
        "name": "John Smith",
        "email": "john.smith@townepark.com"
      },
      "sites_count": 25,
      "active_sites_count": 23
    }
  ]
}
```

#### POST /territories
Create a new territory.

#### GET /territories/{territoryId}
Retrieve detailed territory information.

#### PUT /territories/{territoryId}
Update territory information.

#### GET /territories/{territoryId}/sites
Retrieve all sites within a territory.

### Contact Management Endpoints

#### GET /sites/{siteId}/contacts
Retrieve all contacts for a specific site.

**Response:**
```json
{
  "data": [
    {
      "id": "contact_001",
      "site_id": "123e4567-e89b-12d3-a456-426614174000",
      "type": "primary",
      "name": {
        "first": "Jane",
        "last": "Doe",
        "title": "Facility Manager"
      },
      "contact_info": {
        "email": "jane.doe@hospital.com",
        "phone": "+1-214-555-0123",
        "mobile": "+1-214-555-0124"
      },
      "preferences": {
        "preferred_contact_method": "email",
        "notifications": {
          "billing": true,
          "operations": true,
          "emergency": true
        }
      },
      "is_active": true
    }
  ]
}
```

#### POST /sites/{siteId}/contacts
Create a new contact for a site.

#### PUT /contacts/{contactId}
Update contact information.

#### DELETE /contacts/{contactId}
Deactivate a contact.

### Search and Filter Endpoints

#### GET /search/sites
Advanced site search with multiple criteria.

**Query Parameters:**
```json
{
  "q": "string (general search term)",
  "name": "string (site name contains)",
  "code": "string (site code contains)",
  "city": "string (city name)",
  "state": "string (state code)",
  "zip": "string (zip code)",
  "territory": "string (territory name or ID)",
  "status": "string (status filter)",
  "type": "string (site type)",
  "contract_type": "string (billing contract type)",
  "has_coordinates": "boolean (sites with GPS coordinates)",
  "parking_spaces_min": "integer (minimum parking spaces)",
  "parking_spaces_max": "integer (maximum parking spaces)"
}
```

#### GET /search/territories
Search territories by various criteria.

#### GET /search/contacts
Search contacts across all sites.

## Authentication and Authorization

### OAuth 2.0 Implementation

#### Token Endpoint
```
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id={client_id}
&client_secret={client_secret}
&scope=customer-sites:read customer-sites:write
```

#### JWT Token Structure
```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "key_001"
  },
  "payload": {
    "iss": "https://auth.townepark.com",
    "aud": "https://api.townepark.com",
    "sub": "client_001",
    "iat": 1642781234,
    "exp": 1642784834,
    "scope": "customer-sites:read customer-sites:write",
    "permissions": [
      "sites:read",
      "sites:write",
      "territories:read",
      "contacts:read",
      "contacts:write"
    ]
  }
}
```

### Permission Levels

#### Read Permissions
- `sites:read`: View site information
- `territories:read`: View territory information
- `contacts:read`: View contact information

#### Write Permissions
- `sites:write`: Create, update, delete sites
- `territories:write`: Manage territories
- `contacts:write`: Manage contacts

#### Admin Permissions
- `sites:admin`: Full site management including sensitive data
- `territories:admin`: Territory configuration and assignment
- `system:admin`: System-level configuration

## Error Handling

### Standard Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data",
    "details": [
      {
        "field": "name",
        "message": "Site name is required",
        "code": "REQUIRED_FIELD"
      },
      {
        "field": "address.zip",
        "message": "Invalid ZIP code format",
        "code": "INVALID_FORMAT"
      }
    ],
    "request_id": "req_123456789",
    "timestamp": "2025-07-24T19:08:15.649Z"
  }
}
```

### HTTP Status Codes

#### Success Codes
- `200 OK`: Successful GET, PUT requests
- `201 Created`: Successful POST requests
- `204 No Content`: Successful DELETE requests

#### Client Error Codes
- `400 Bad Request`: Invalid request format or data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (duplicate codes, etc.)
- `422 Unprocessable Entity`: Validation errors

#### Server Error Codes
- `500 Internal Server Error`: Unexpected server error
- `502 Bad Gateway`: Upstream service error
- `503 Service Unavailable`: Service temporarily unavailable
- `504 Gateway Timeout`: Upstream service timeout

### Error Code Definitions
```json
{
  "error_codes": {
    "VALIDATION_ERROR": "Request validation failed",
    "REQUIRED_FIELD": "Required field is missing",
    "INVALID_FORMAT": "Field format is invalid",
    "DUPLICATE_CODE": "Site code already exists",
    "TERRITORY_NOT_FOUND": "Specified territory does not exist",
    "SITE_NOT_FOUND": "Specified site does not exist",
    "CONTACT_NOT_FOUND": "Specified contact does not exist",
    "INSUFFICIENT_PERMISSIONS": "User lacks required permissions",
    "RATE_LIMIT_EXCEEDED": "API rate limit exceeded",
    "SERVICE_UNAVAILABLE": "Service temporarily unavailable"
  }
}
```

## Rate Limiting

### Rate Limit Configuration
```json
{
  "rate_limits": {
    "default": {
      "requests_per_minute": 1000,
      "requests_per_hour": 10000,
      "burst_limit": 100
    },
    "authenticated": {
      "requests_per_minute": 2000,
      "requests_per_hour": 50000,
      "burst_limit": 200
    },
    "premium": {
      "requests_per_minute": 5000,
      "requests_per_hour": 100000,
      "burst_limit": 500
    }
  }
}
```

### Rate Limit Headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642781294
X-RateLimit-Retry-After: 60
```

## Data Validation

### Input Validation Rules

#### Site Validation
```json
{
  "site_validation": {
    "name": {
      "required": true,
      "max_length": 255,
      "pattern": "^[a-zA-Z0-9\\s\\-\\.]+$"
    },
    "code": {
      "required": true,
      "max_length": 50,
      "pattern": "^[A-Z0-9]+$",
      "unique": true
    },
    "status": {
      "required": true,
      "enum": ["active", "inactive", "pending", "suspended"]
    },
    "address": {
      "street1": {
        "required": true,
        "max_length": 255
      },
      "city": {
        "required": true,
        "max_length": 100
      },
      "state": {
        "required": true,
        "length": 2,
        "pattern": "^[A-Z]{2}$"
      },
      "zip": {
        "required": true,
        "pattern": "^\\d{5}(-\\d{4})?$"
      }
    }
  }
}
```

#### Territory Validation
```json
{
  "territory_validation": {
    "name": {
      "required": true,
      "max_length": 255
    },
    "code": {
      "required": true,
      "max_length": 50,
      "pattern": "^[A-Z0-9]+$",
      "unique": true
    },
    "manager_id": {
      "required": true,
      "format": "uuid"
    }
  }
}
```

### Business Rule Validation

#### Territory Assignment Rules
- Sites can only be assigned to active territories
- Territory managers must have appropriate permissions
- Geographic boundaries must not overlap with existing territories
- Site reassignment requires approval workflow for active contracts

#### Contact Management Rules
- Each site must have at least one primary contact
- Primary contact must have valid email and phone
- Emergency contacts must be available 24/7
- Billing contacts must have appropriate financial permissions

## Performance Specifications

### Response Time Requirements
- GET requests: < 200ms (95th percentile)
- POST/PUT requests: < 500ms (95th percentile)
- Search requests: < 1000ms (95th percentile)
- Bulk operations: < 5000ms (95th percentile)

### Throughput Requirements
- Concurrent requests: 1000+ simultaneous connections
- Requests per second: 10,000+ RPS peak capacity
- Data transfer: 100MB/s sustained throughput
- Database connections: 500+ concurrent connections

### Caching Strategy
```json
{
  "caching_config": {
    "site_data": {
      "ttl": 300,
      "cache_key": "site:{site_id}",
      "invalidation_events": ["site_updated", "site_deleted"]
    },
    "territory_data": {
      "ttl": 3600,
      "cache_key": "territory:{territory_id}",
      "invalidation_events": ["territory_updated", "sites_reassigned"]
    },
    "search_results": {
      "ttl": 60,
      "cache_key": "search:{query_hash}",
      "max_entries": 10000
    }
  }
}
```

## Integration Specifications

### Billing System Integration
- Real-time site status updates for billing calculations
- Contract type changes trigger billing system notifications
- Site deactivation automatically suspends billing
- Territory reassignment updates billing hierarchies

### Forecasting System Integration
- Site operational data feeds forecasting models
- Parking space capacity affects revenue projections
- Operating hours impact labor hour calculations
- Territory performance metrics aggregate to regional forecasts

### External System Webhooks
```json
{
  "webhook_events": {
    "site.created": {
      "payload": "full_site_object",
      "retry_policy": "exponential_backoff",
      "timeout": 30000
    },
    "site.updated": {
      "payload": "changed_fields_only",
      "retry_policy": "exponential_backoff",
      "timeout": 30000
    },
    "site.deactivated": {
      "payload": "site_id_and_timestamp",
      "retry_policy": "exponential_backoff",
      "timeout": 30000
    },
    "territory.reassigned": {
      "payload": "site_id_old_territory_new_territory",
      "retry_policy": "exponential_backoff",
      "timeout": 30000
    }
  }
}
```

This comprehensive Customer Sites API specification provides the technical foundation for managing customer site data, territory assignments, and contact information while ensuring integration with billing and forecasting systems, maintaining data integrity, and supporting scalable operations.