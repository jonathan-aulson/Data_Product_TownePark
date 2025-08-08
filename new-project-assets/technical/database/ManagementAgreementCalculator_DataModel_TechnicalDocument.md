---
title: "Management Agreement Calculator Data Model - Technical Documentation"
description: "Comprehensive data model documentation for management agreement calculator system including execution dependencies, data structures, and performance optimization patterns"
created_date: 2025-08-06
last_updated_date: 2025-08-06
source_date: 2025-07-23
version: 1.0
status: Draft
owner: "Andrew Scheuer"
source_documents:
  - "20250723_Dev_demo_userStory2511.docx"
systems:
  - Management Agreement
  - External Revenue
  - Internal Revenue
components:
  - Calculator Engine
  - Dependency Management
  - Execution Orchestration
business_domains:
  - Financial Calculations
  - Revenue Management
  - Contract Processing
user_roles:
  - System Architect
  - Database Administrator
  - Development Team
tags:
  - data-model
  - management-agreement
  - calculator-architecture
  - execution-dependencies
  - performance-optimization
---

# Management Agreement Calculator Data Model - Technical Documentation

## Data Model Overview

This document defines the comprehensive data model for the Management Agreement Calculator system, including execution dependencies, data structures, performance optimization patterns, and integration points with revenue calculation systems.

## Core Entity Definitions

### Calculator Execution Entity

#### CalculatorExecution
```typescript
interface CalculatorExecution {
  id: string;
  calculatorType: CalculatorType;
  siteId: string;
  executionDate: Date;
  status: ExecutionStatus;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  dependencies: string[];
  results: CalculationResult;
  errorDetails?: ErrorInfo;
  performanceMetrics: PerformanceMetrics;
}
```

#### CalculatorType Enumeration
```typescript
enum CalculatorType {
  EXTERNAL_REVENUE = 'external_revenue',
  INTERNAL_REVENUE = 'internal_revenue',
  MANAGEMENT_AGREEMENT = 'management_agreement',
  PROFIT_SHARE = 'profit_share'
}
```

#### ExecutionStatus Enumeration
```typescript
enum ExecutionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  TIMEOUT = 'timeout'
}
```

### Revenue Calculation Entities

#### ExternalRevenueCalculation
```typescript
interface ExternalRevenueCalculation {
  id: string;
  siteId: string;
  calculationDate: Date;
  vehicleCounts: VehicleCountData[];
  parkingRates: ParkingRateData[];
  grossRevenue: number;
  adjustmentPercentage: number;
  adjustmentValue: number;
  finalRevenue: number;
  budgetSource: BudgetDataSource;
  createdAt: Date;
  updatedAt: Date;
}
```

#### InternalRevenueCalculation
```typescript
interface InternalRevenueCalculation {
  id: string;
  siteId: string;
  calculationDate: Date;
  revenueComponents: RevenueComponent[];
  totalInternalRevenue: number;
  calculationMethod: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Management Agreement Entities

#### ManagementAgreementCalculation
```typescript
interface ManagementAgreementCalculation {
  id: string;
  siteId: string;
  contractId: string;
  calculationDate: Date;
  externalRevenueId: string;
  internalRevenueId: string;
  managementFee: number;
  feePercentage: number;
  baseRevenue: number;
  adjustments: AgreementAdjustment[];
  totalFee: number;
  executionOrder: number;
  dependsOn: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### ProfitShareCalculation
```typescript
interface ProfitShareCalculation {
  id: string;
  siteId: string;
  contractId: string;
  calculationDate: Date;
  managementAgreementId: string;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  sharePercentage: number;
  profitShare: number;
  executionOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Dependency Management Data Model

### Calculator Dependencies

#### DependencyGraph
```typescript
interface DependencyGraph {
  calculatorId: string;
  dependencies: CalculatorDependency[];
  executionOrder: number;
  canRunInParallel: boolean;
  requiredInputs: string[];
  outputs: string[];
}
```

#### CalculatorDependency
```typescript
interface CalculatorDependency {
  dependentCalculator: CalculatorType;
  requiredCalculator: CalculatorType;
  dependencyType: DependencyType;
  isBlocking: boolean;
  timeoutThreshold: number;
}
```

#### DependencyType Enumeration
```typescript
enum DependencyType {
  HARD_DEPENDENCY = 'hard',      // Must complete before dependent can start
  SOFT_DEPENDENCY = 'soft',      // Preferred order but not required
  DATA_DEPENDENCY = 'data',      // Requires specific data output
  SEQUENCE_DEPENDENCY = 'sequence' // Must run in specific sequence
}
```

### Execution Orchestration

#### ExecutionPlan
```typescript
interface ExecutionPlan {
  planId: string;
  siteId: string;
  planDate: Date;
  executionStages: ExecutionStage[];
  totalEstimatedDuration: number;
  parallelExecutionEnabled: boolean;
  createdAt: Date;
}
```

#### ExecutionStage
```typescript
interface ExecutionStage {
  stageId: string;
  stageOrder: number;
  calculators: CalculatorType[];
  canRunInParallel: boolean;
  estimatedDuration: number;
  dependencies: string[];
  status: ExecutionStatus;
}
```

## Performance Optimization Data Model

### Performance Metrics

#### PerformanceMetrics
```typescript
interface PerformanceMetrics {
  executionId: string;
  calculatorType: CalculatorType;
  siteId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  memoryUsage: number;
  cpuUsage: number;
  databaseQueries: number;
  cacheHits: number;
  cacheMisses: number;
  errorCount: number;
  warningCount: number;
}
```

#### PerformanceThresholds
```typescript
interface PerformanceThresholds {
  calculatorType: CalculatorType;
  maxDuration: number;
  maxMemoryUsage: number;
  maxCpuUsage: number;
  alertThreshold: number;
  timeoutThreshold: number;
  retryCount: number;
}
```

### Caching Data Model

#### CalculationCache
```typescript
interface CalculationCache {
  cacheKey: string;
  calculatorType: CalculatorType;
  siteId: string;
  inputHash: string;
  result: any;
  createdAt: Date;
  expiresAt: Date;
  hitCount: number;
  lastAccessed: Date;
}
```

## Budget Data Integration Model

### Budget Data Source

#### BudgetDataSource
```typescript
interface BudgetDataSource {
  sourceId: string;
  siteId: string;
  budgetPeriod: string;
  adjustmentPercentage: number;
  adjustmentValue: number;
  budgetDates: Date[];
  dataSource: string;
  lastUpdated: Date;
  isActive: boolean;
}
```

#### BudgetAdjustment
```typescript
interface BudgetAdjustment {
  adjustmentId: string;
  siteId: string;
  adjustmentType: AdjustmentType;
  percentage: number;
  value: number;
  effectiveDate: Date;
  expirationDate?: Date;
  reason: string;
  createdBy: string;
  createdAt: Date;
}
```

#### AdjustmentType Enumeration
```typescript
enum AdjustmentType {
  PERCENTAGE = 'percentage',
  FIXED_VALUE = 'fixed_value',
  SEASONAL = 'seasonal',
  PROMOTIONAL = 'promotional'
}
```

## Data Relationships and Constraints

### Primary Relationships

#### Calculator Execution Dependencies
```sql
-- External Revenue and Internal Revenue must complete before Management Agreement
ALTER TABLE ManagementAgreementCalculation 
ADD CONSTRAINT fk_external_revenue 
FOREIGN KEY (externalRevenueId) REFERENCES ExternalRevenueCalculation(id);

ALTER TABLE ManagementAgreementCalculation 
ADD CONSTRAINT fk_internal_revenue 
FOREIGN KEY (internalRevenueId) REFERENCES InternalRevenueCalculation(id);

-- Profit Share depends on Management Agreement completion
ALTER TABLE ProfitShareCalculation 
ADD CONSTRAINT fk_management_agreement 
FOREIGN KEY (managementAgreementId) REFERENCES ManagementAgreementCalculation(id);
```

#### Execution Order Constraints
```sql
-- Ensure proper execution order
ALTER TABLE CalculatorExecution 
ADD CONSTRAINT chk_execution_order 
CHECK (
  (calculatorType = 'profit_share' AND executionOrder > 
   (SELECT MAX(executionOrder) FROM CalculatorExecution 
    WHERE calculatorType = 'management_agreement' AND siteId = CalculatorExecution.siteId))
);
```

### Data Integrity Rules

#### Calculation Consistency
- External Revenue and Internal Revenue calculations must exist before Management Agreement
- Profit Share calculation must reference valid Management Agreement
- All calculations must have valid site and date references
- Performance metrics must be recorded for all executions

#### Temporal Constraints
- Calculation dates must be within valid business periods
- Execution timestamps must be in chronological order
- Cache expiration must be properly managed
- Budget data must have valid effective dates

## Performance Optimization Patterns

### Parallel Execution Model

#### Site-Level Parallelization
```typescript
// Parallel execution pattern for multiple sites
interface ParallelExecutionPlan {
  sites: string[];
  maxConcurrency: number;
  executionStrategy: ExecutionStrategy;
  failureHandling: FailureHandlingStrategy;
}

enum ExecutionStrategy {
  ALL_SITES_PARALLEL = 'all_parallel',
  BATCH_PARALLEL = 'batch_parallel',
  SEQUENTIAL = 'sequential'
}
```

#### Calculator-Level Parallelization
```typescript
// Parallel execution within calculator dependencies
interface CalculatorParallelism {
  canRunInParallel: CalculatorType[];
  mustRunSequential: CalculatorType[];
  parallelismLevel: number;
  resourceLimits: ResourceLimits;
}
```

### Caching Strategies

#### Multi-Level Caching
```typescript
interface CacheStrategy {
  level1: MemoryCache;    // In-memory for frequent access
  level2: DatabaseCache;  // Database for persistence
  level3: DistributedCache; // Redis for scalability
  ttl: CacheTTL;
  invalidationRules: InvalidationRule[];
}
```

## Error Handling and Recovery

### Error Data Model

#### CalculationError
```typescript
interface CalculationError {
  errorId: string;
  executionId: string;
  errorType: ErrorType;
  errorMessage: string;
  stackTrace: string;
  recoveryAction: RecoveryAction;
  retryCount: number;
  maxRetries: number;
  createdAt: Date;
}
```

#### ErrorType Enumeration
```typescript
enum ErrorType {
  DEPENDENCY_TIMEOUT = 'dependency_timeout',
  CALCULATION_ERROR = 'calculation_error',
  DATA_VALIDATION_ERROR = 'data_validation_error',
  SYSTEM_ERROR = 'system_error',
  RESOURCE_EXHAUSTION = 'resource_exhaustion'
}
```

### Recovery Strategies

#### RecoveryAction
```typescript
interface RecoveryAction {
  actionType: RecoveryActionType;
  retryDelay: number;
  fallbackStrategy: FallbackStrategy;
  escalationThreshold: number;
  notificationRequired: boolean;
}

enum RecoveryActionType {
  RETRY = 'retry',
  FALLBACK = 'fallback',
  SKIP = 'skip',
  ESCALATE = 'escalate'
}
```

## Data Access Patterns

### Query Optimization

#### Indexed Queries
```sql
-- Performance-critical indexes
CREATE INDEX idx_calculator_execution_site_date 
ON CalculatorExecution(siteId, executionDate);

CREATE INDEX idx_management_agreement_dependencies 
ON ManagementAgreementCalculation(externalRevenueId, internalRevenueId);

CREATE INDEX idx_performance_metrics_calculator_type 
ON PerformanceMetrics(calculatorType, startTime);
```

#### Optimized Data Retrieval
```typescript
// Efficient data loading patterns
interface DataLoadingStrategy {
  batchSize: number;
  prefetchRelated: boolean;
  cacheResults: boolean;
  lazyLoading: boolean;
}
```

## Integration Points

### External System Integration

#### Revenue System Integration
- **External Revenue**: Integration with parking rate and vehicle count systems
- **Internal Revenue**: Integration with internal billing and fee systems
- **Budget System**: Integration with budget data sources and adjustment mechanisms

#### Monitoring Integration
- **Performance Monitoring**: Real-time performance metrics collection
- **Alerting System**: Automated alerts for calculation failures and performance issues
- **Audit Trail**: Comprehensive logging of all calculation activities

## Related Documentation

- [External Revenue Calculation Logic](../backend/)
- [P&L Dashboard Performance Report](../reports/)
- [Performance Monitoring Guidelines](../operations/)
- [Calculator Architecture Specifications](../architecture/)

## Implementation Guidelines

### Database Schema Implementation
1. **Create Core Tables**: Implement all entity tables with proper constraints
2. **Add Indexes**: Create performance-critical indexes for query optimization
3. **Set Up Relationships**: Establish foreign key relationships and constraints
4. **Configure Caching**: Implement multi-level caching strategy

### Performance Considerations
1. **Parallel Execution**: Implement site-level and calculator-level parallelization
2. **Caching Strategy**: Deploy comprehensive caching for frequently accessed data
3. **Monitoring**: Set up real-time performance monitoring and alerting
4. **Error Handling**: Implement robust error handling and recovery mechanisms

### Data Governance
1. **Data Quality**: Implement validation rules for all calculation inputs
2. **Audit Trail**: Maintain comprehensive audit logs for all operations
3. **Backup Strategy**: Ensure proper backup and recovery procedures
4. **Security**: Implement appropriate access controls and data encryption

This data model provides the foundation for a scalable, performant, and reliable management agreement calculator system with proper dependency management and optimization capabilities.