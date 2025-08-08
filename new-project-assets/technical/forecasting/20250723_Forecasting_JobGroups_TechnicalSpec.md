---
title: "Forecasting Job Groups Technical Specification"
date: "2025-07-23"
version: "1.0"
status: "Active"
author: "Towne Park Technical Team"
reviewer: "Jonathan Aulson"
tags: ["technical-spec", "job-groups", "payroll", "forecasting", "legion-integration", "data-mapping"]
related_docs: 
  - "20250723_Forecasting_SystemDemo_ComprehensiveGuide.md"
  - "20250723_DistrictManager_ForecastingWorkflow_UserGuide.md"
systems: ["Forecasting", "Legion", "Payroll", "Job Code Management"]
stakeholders: ["Development Team", "Business Analyst", "Account Managers", "System Administrators"]
technical_lead: "Development Team"
effective_date: "2025-06-23"
---

# Forecasting Job Groups Technical Specification

## Document Overview

This technical specification defines the implementation of Job Groups functionality within the Towne Park Forecasting system. Job Groups represent a simplified approach to payroll forecasting by aggregating individual job codes into logical groupings that are more intuitive for Account Managers to work with while maintaining data accuracy and integration with existing systems.

## Executive Summary

Job Groups functionality transforms complex job code management into simplified, logical groupings that enhance Account Manager productivity while preserving data integrity. The implementation includes job code mapping, Legion system integration, forecast aggregation logic, and user interface components that support both simplified entry and detailed analysis.

## Technical Architecture

### 1. Job Groups Data Model

#### 1.1 Core Data Structures

**Job Group Entity:**
```typescript
interface JobGroup {
  id: string;
  name: string;
  description: string;
  siteId: string;
  isActive: boolean;
  createdDate: Date;
  modifiedDate: Date;
  jobCodes: JobCodeMapping[];
}

interface JobCodeMapping {
  jobCodeId: string;
  jobGroupId: string;
  jobCode: string;
  jobTitle: string;
  isActive: boolean;
  effectiveDate: Date;
  endDate?: Date;
}
```

**Forecast Data Integration:**
```typescript
interface JobGroupForecast {
  jobGroupId: string;
  siteId: string;
  forecastPeriod: ForecastPeriod;
  scheduledHours: number;
  forecastedHours: number;
  budgetedHours: number;
  actualHours?: number;
  hourlyRate: number;
  totalCost: number;
}
```

#### 1.2 Standard Job Group Classifications

**Predefined Job Groups:**
```
Standard Job Groups:
├── GSA (Guest Service Associate)
│   ├── Guest Service Representative
│   ├── Front Desk Associate
│   └── Customer Service Agent
├── GSC (Guest Service Cashier)
│   ├── Cashier
│   ├── Payment Processor
│   └── Transaction Associate
├── Bell (Bell Services)
│   ├── Bell Captain
│   ├── Bell Attendant
│   └── Luggage Assistant
├── Valet (Valet Services)
│   ├── Valet Attendant
│   ├── Valet Supervisor
│   └── Parking Attendant
└── Other (Miscellaneous Roles)
    ├── Maintenance
    ├── Security
    └── Administrative
```

### 2. Legion System Integration

#### 2.1 Data Synchronization

**Legion Data Mapping:**
```sql
-- Job Code to Job Group Mapping Query
SELECT 
    jc.job_code,
    jc.job_title,
    jg.job_group_name,
    jg.job_group_id,
    jcm.effective_date,
    jcm.end_date
FROM job_codes jc
JOIN job_code_mappings jcm ON jc.job_code_id = jcm.job_code_id
JOIN job_groups jg ON jcm.job_group_id = jg.job_group_id
WHERE jc.site_id = @siteId
    AND jcm.is_active = 1
    AND (jcm.end_date IS NULL OR jcm.end_date > GETDATE())
```

**Scheduled vs Actual Data Integration:**
```typescript
interface LegionIntegration {
  getScheduledHours(siteId: string, period: DateRange): Promise<ScheduledData[]>;
  getActualHours(siteId: string, period: DateRange): Promise<ActualData[]>;
  aggregateByJobGroup(data: PayrollData[], mappings: JobCodeMapping[]): JobGroupData[];
}

interface ScheduledData {
  jobCode: string;
  scheduledDate: Date;
  scheduledHours: number;
  hourlyRate: number;
}

interface ActualData {
  jobCode: string;
  workDate: Date;
  actualHours: number;
  actualRate: number;
}
```

#### 2.2 Real-Time Data Processing

**Data Aggregation Logic:**
```typescript
class JobGroupAggregator {
  aggregatePayrollData(
    legionData: PayrollData[],
    jobGroupMappings: JobCodeMapping[]
  ): JobGroupSummary[] {
    const groupedData = new Map<string, PayrollData[]>();
    
    // Group data by job group
    legionData.forEach(data => {
      const mapping = jobGroupMappings.find(m => m.jobCode === data.jobCode);
      if (mapping) {
        const groupId = mapping.jobGroupId;
        if (!groupedData.has(groupId)) {
          groupedData.set(groupId, []);
        }
        groupedData.get(groupId)!.push(data);
      }
    });
    
    // Aggregate by group
    return Array.from(groupedData.entries()).map(([groupId, data]) => ({
      jobGroupId: groupId,
      totalScheduledHours: data.reduce((sum, d) => sum + d.scheduledHours, 0),
      totalActualHours: data.reduce((sum, d) => sum + d.actualHours, 0),
      averageHourlyRate: this.calculateWeightedAverage(data),
      totalCost: this.calculateTotalCost(data)
    }));
  }
  
  private calculateWeightedAverage(data: PayrollData[]): number {
    const totalHours = data.reduce((sum, d) => sum + d.scheduledHours, 0);
    const weightedSum = data.reduce((sum, d) => sum + (d.hourlyRate * d.scheduledHours), 0);
    return totalHours > 0 ? weightedSum / totalHours : 0;
  }
}
```

### 3. User Interface Implementation

#### 3.1 Split View Design

**Component Architecture:**
```typescript
interface PayrollTabProps {
  siteId: string;
  forecastPeriod: ForecastPeriod;
  jobGroups: JobGroup[];
  legionData: LegionPayrollData;
  forecastData: ForecastPayrollData;
}

const PayrollTab: React.FC<PayrollTabProps> = ({
  siteId,
  forecastPeriod,
  jobGroups,
  legionData,
  forecastData
}) => {
  return (
    <div className="payroll-tab-container">
      <div className="split-view">
        <div className="legion-data-panel">
          <LegionDataVisualization 
            data={legionData}
            jobGroups={jobGroups}
          />
        </div>
        <div className="forecast-entry-panel">
          <ForecastEntryForm
            jobGroups={jobGroups}
            forecastData={forecastData}
            onForecastChange={handleForecastChange}
          />
        </div>
      </div>
    </div>
  );
};
```

**Legion Data Visualization Component:**
```typescript
const LegionDataVisualization: React.FC<{
  data: LegionPayrollData;
  jobGroups: JobGroup[];
}> = ({ data, jobGroups }) => {
  const aggregatedData = useMemo(() => 
    aggregateDataByJobGroup(data, jobGroups), 
    [data, jobGroups]
  );
  
  return (
    <div className="legion-visualization">
      <h3>Scheduled vs Actual (Legion)</h3>
      <div className="data-grid">
        {aggregatedData.map(group => (
          <JobGroupRow
            key={group.jobGroupId}
            jobGroup={group}
            showComparison={true}
          />
        ))}
      </div>
    </div>
  );
};
```

#### 3.2 Forecast Entry Interface

**Job Group Entry Form:**
```typescript
const ForecastEntryForm: React.FC<{
  jobGroups: JobGroup[];
  forecastData: ForecastPayrollData;
  onForecastChange: (data: ForecastPayrollData) => void;
}> = ({ jobGroups, forecastData, onForecastChange }) => {
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  
  const handleGroupEdit = (groupId: string, field: string, value: number) => {
    const updatedData = {
      ...forecastData,
      jobGroups: forecastData.jobGroups.map(group =>
        group.jobGroupId === groupId
          ? { ...group, [field]: value }
          : group
      )
    };
    onForecastChange(updatedData);
  };
  
  return (
    <div className="forecast-entry">
      <h3>Forecast Entry</h3>
      <div className="entry-grid">
        {jobGroups.map(group => (
          <JobGroupEntryRow
            key={group.id}
            jobGroup={group}
            forecastData={forecastData.jobGroups.find(fg => fg.jobGroupId === group.id)}
            onEdit={handleGroupEdit}
            isEditing={editingGroup === group.id}
            onEditStart={() => setEditingGroup(group.id)}
            onEditEnd={() => setEditingGroup(null)}
          />
        ))}
      </div>
    </div>
  );
};
```

### 4. Data Processing and Validation

#### 4.1 Job Code Mapping Validation

**Mapping Validation Rules:**
```typescript
class JobGroupValidator {
  validateJobCodeMappings(mappings: JobCodeMapping[]): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    // Check for unmapped job codes
    const unmappedCodes = this.findUnmappedJobCodes(mappings);
    if (unmappedCodes.length > 0) {
      warnings.push({
        type: 'UNMAPPED_JOB_CODES',
        message: `${unmappedCodes.length} job codes are not mapped to job groups`,
        codes: unmappedCodes
      });
    }
    
    // Check for duplicate mappings
    const duplicates = this.findDuplicateMappings(mappings);
    if (duplicates.length > 0) {
      errors.push({
        type: 'DUPLICATE_MAPPINGS',
        message: 'Job codes cannot be mapped to multiple active job groups',
        duplicates: duplicates
      });
    }
    
    // Check for inactive job groups with active mappings
    const inactiveGroupMappings = this.findInactiveGroupMappings(mappings);
    if (inactiveGroupMappings.length > 0) {
      warnings.push({
        type: 'INACTIVE_GROUP_MAPPINGS',
        message: 'Active job codes mapped to inactive job groups',
        mappings: inactiveGroupMappings
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}
```

#### 4.2 Forecast Calculation Engine

**Aggregation Calculations:**
```typescript
class ForecastCalculationEngine {
  calculateJobGroupForecast(
    jobGroup: JobGroup,
    individualForecasts: JobCodeForecast[]
  ): JobGroupForecast {
    const relevantForecasts = individualForecasts.filter(forecast =>
      jobGroup.jobCodes.some(mapping => mapping.jobCode === forecast.jobCode)
    );
    
    const totalHours = relevantForecasts.reduce((sum, forecast) => 
      sum + forecast.forecastedHours, 0
    );
    
    const weightedAverageRate = this.calculateWeightedAverageRate(relevantForecasts);
    
    const totalCost = totalHours * weightedAverageRate;
    
    return {
      jobGroupId: jobGroup.id,
      siteId: jobGroup.siteId,
      forecastPeriod: this.getCurrentForecastPeriod(),
      scheduledHours: this.getScheduledHours(jobGroup),
      forecastedHours: totalHours,
      budgetedHours: this.getBudgetedHours(jobGroup),
      hourlyRate: weightedAverageRate,
      totalCost: totalCost
    };
  }
  
  private calculateWeightedAverageRate(forecasts: JobCodeForecast[]): number {
    const totalHours = forecasts.reduce((sum, f) => sum + f.forecastedHours, 0);
    if (totalHours === 0) return 0;
    
    const weightedSum = forecasts.reduce((sum, f) => 
      sum + (f.hourlyRate * f.forecastedHours), 0
    );
    
    return weightedSum / totalHours;
  }
}
```

### 5. Configuration and Administration

#### 5.1 Job Group Management Interface

**Administrative Functions:**
```typescript
interface JobGroupAdminService {
  createJobGroup(siteId: string, jobGroup: CreateJobGroupRequest): Promise<JobGroup>;
  updateJobGroup(jobGroupId: string, updates: UpdateJobGroupRequest): Promise<JobGroup>;
  deleteJobGroup(jobGroupId: string): Promise<void>;
  addJobCodeMapping(mapping: CreateJobCodeMappingRequest): Promise<JobCodeMapping>;
  removeJobCodeMapping(mappingId: string): Promise<void>;
  bulkUpdateMappings(siteId: string, mappings: JobCodeMapping[]): Promise<ValidationResult>;
}

interface CreateJobGroupRequest {
  name: string;
  description: string;
  siteId: string;
  jobCodes: string[];
}

interface UpdateJobGroupRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}
```

#### 5.2 Site-Specific Configuration

**Site Configuration Management:**
```typescript
class SiteJobGroupConfiguration {
  async initializeDefaultJobGroups(siteId: string): Promise<JobGroup[]> {
    const existingJobCodes = await this.getJobCodesForSite(siteId);
    const defaultGroups = this.getDefaultJobGroupTemplates();
    
    const createdGroups: JobGroup[] = [];
    
    for (const template of defaultGroups) {
      const matchingJobCodes = this.matchJobCodesToTemplate(existingJobCodes, template);
      
      if (matchingJobCodes.length > 0) {
        const jobGroup = await this.createJobGroup({
          name: template.name,
          description: template.description,
          siteId: siteId,
          jobCodes: matchingJobCodes.map(jc => jc.jobCode)
        });
        
        createdGroups.push(jobGroup);
      }
    }
    
    return createdGroups;
  }
  
  private getDefaultJobGroupTemplates(): JobGroupTemplate[] {
    return [
      {
        name: 'GSA',
        description: 'Guest Service Associate',
        keywordMatches: ['guest service', 'front desk', 'reception', 'customer service']
      },
      {
        name: 'GSC',
        description: 'Guest Service Cashier',
        keywordMatches: ['cashier', 'payment', 'transaction', 'billing']
      },
      {
        name: 'Bell',
        description: 'Bell Services',
        keywordMatches: ['bell', 'luggage', 'concierge', 'porter']
      },
      {
        name: 'Valet',
        description: 'Valet Services',
        keywordMatches: ['valet', 'parking', 'attendant', 'driver']
      }
    ];
  }
}
```

### 6. Performance and Optimization

#### 6.1 Caching Strategy

**Data Caching Implementation:**
```typescript
class JobGroupCacheManager {
  private cache = new Map<string, CachedJobGroupData>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  async getJobGroupsForSite(siteId: string): Promise<JobGroup[]> {
    const cacheKey = `jobgroups_${siteId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isCacheValid(cached)) {
      return cached.data;
    }
    
    const freshData = await this.fetchJobGroupsFromDatabase(siteId);
    this.cache.set(cacheKey, {
      data: freshData,
      timestamp: Date.now()
    });
    
    return freshData;
  }
  
  invalidateCache(siteId: string): void {
    const cacheKey = `jobgroups_${siteId}`;
    this.cache.delete(cacheKey);
  }
  
  private isCacheValid(cached: CachedJobGroupData): boolean {
    return (Date.now() - cached.timestamp) < this.CACHE_TTL;
  }
}
```

#### 6.2 Database Optimization

**Optimized Queries:**
```sql
-- Optimized job group aggregation query
WITH JobGroupAggregation AS (
  SELECT 
    jg.job_group_id,
    jg.job_group_name,
    SUM(pd.scheduled_hours) as total_scheduled_hours,
    SUM(pd.actual_hours) as total_actual_hours,
    AVG(pd.hourly_rate) as average_hourly_rate,
    COUNT(DISTINCT jcm.job_code_id) as job_code_count
  FROM job_groups jg
  JOIN job_code_mappings jcm ON jg.job_group_id = jcm.job_group_id
  JOIN payroll_data pd ON jcm.job_code_id = pd.job_code_id
  WHERE jg.site_id = @siteId
    AND pd.payroll_date BETWEEN @startDate AND @endDate
    AND jg.is_active = 1
    AND jcm.is_active = 1
  GROUP BY jg.job_group_id, jg.job_group_name
)
SELECT * FROM JobGroupAggregation
ORDER BY job_group_name;

-- Index recommendations
CREATE INDEX IX_JobCodeMappings_SiteId_Active 
ON job_code_mappings (site_id, is_active) 
INCLUDE (job_group_id, job_code_id);

CREATE INDEX IX_PayrollData_JobCode_Date 
ON payroll_data (job_code_id, payroll_date) 
INCLUDE (scheduled_hours, actual_hours, hourly_rate);
```

## Cross-References

### Related Documentation
- [Forecasting System Demo Comprehensive Guide](20250723_Forecasting_SystemDemo_ComprehensiveGuide.md)
- [District Manager Forecasting Workflow User Guide](20250723_DistrictManager_ForecastingWorkflow_UserGuide.md)

### Integration Points
- **Legion System:** Payroll data source and job code definitions
- **Forecasting Engine:** Forecast calculation and aggregation
- **User Interface:** Simplified payroll entry and visualization
- **Reporting System:** Job group-based reporting and analysis

## Glossary

| Term | Definition |
|------|------------|
| **Job Groups** | Logical groupings of job codes for simplified payroll forecasting |
| **Job Code Mapping** | Association between individual job codes and job groups |
| **Split View** | UI design showing Legion data alongside forecast entry |
| **Weighted Average Rate** | Hourly rate calculation based on hours distribution across job codes |
| **Legion Integration** | Real-time data connection with Legion scheduling system |
| **Aggregation Logic** | Calculation method for combining individual job code data into group totals |

---

**Document History:**
- v1.0 (2025-07-23): Initial creation from demo practice session job groups discussion
- Source: Demo Practice session June 23, 2025
- Contributors: Jonathan Aulson, Development Team, Technical Architecture Team