import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Contract } from "@/lib/models/Contract";
import type { JobCode } from "@/lib/models/jobCode";
import { JobCodeForecastDto, JobGroupForecastDto, PayrollDetailDto, PayrollDto } from "@/lib/models/Payroll";
import { Customer } from "@/lib/models/Statistics";
import { formatCurrency } from "@/lib/utils";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Edit3, Info } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Alert, AlertDescription } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { useToast } from "../../ui/use-toast";
import ForecastEditDialog, { ForecastDayData } from "./ForecastEditDialog";

const MAX_EXPECTED_HOURS = 1500;
const DEFAULT_HOURLY_RATE = 15;

export interface PayrollForecastProps {
    customers: Customer[];
    error: string | null;
    selectedSite: string;
    startingMonth: string;
    isGuideOpen: boolean;
    setIsGuideOpen: (value: boolean) => void;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: (dirty: boolean) => void;
    onLoadingChange?: (loading: boolean) => void;
}

const PayrollForecast = forwardRef(function PayrollForecast(
    {
        customers,
        error,
        selectedSite,
        startingMonth,
        isGuideOpen,
        setIsGuideOpen,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        onLoadingChange
    }: PayrollForecastProps,
    ref
) {
    const [isLoadingPayroll, setIsLoadingPayroll] = useState(false);

    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(isLoadingPayroll);
        }
    }, [isLoadingPayroll, onLoadingChange]);
    const [isSaving, setIsSaving] = useState(false);
    const [payrollData, setPayrollData] = useState<PayrollDto | null>(null);
    const [forecastPayrollDetails, setForecastPayrollDetails] = useState<PayrollDetailDto[]>([]);
    const [forecastJobGroups, setForecastJobGroups] = useState<JobGroupForecastDto[]>([]);

    // Enhanced state for business logic
    const [contractDetails, setContractDetails] = useState<Contract | null>(null);
    const [jobCodes, setJobCodes] = useState<JobCode[]>([]);
    const [isLoadingContract, setIsLoadingContract] = useState(false);
    const [isLoadingJobCodes, setIsLoadingJobCodes] = useState(false);
    const [budgetPayrollDetails, setBudgetPayrollDetails] = useState<PayrollDetailDto[]>([]);
    const [actualPayrollDetails, setActualPayrollDetails] = useState<PayrollDetailDto[]>([]);
    const [scheduledPayrollDetails, setScheduledPayrollDetails] = useState<PayrollDetailDto[]>([]);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [isPastPeriod, setIsPastPeriod] = useState<boolean>(false);
    const [visibleWeekIndex, setVisibleWeekIndex] = useState(0);
    const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
    const [selectedJob, setSelectedJob] = useState("all");
    const [viewMode, setViewMode] = useState<"hours" | "cost">("hours");
    const [weeks, setWeeks] = useState<{ start: Date, end: Date, dates: Date[] }[]>([]);
    const [scheduledData, setScheduledData] = useState<Record<string, Record<string, number>>>({});
    
    // Job group level data - stores group totals directly from API
    const [scheduledGroupData, setScheduledGroupData] = useState<Record<string, Record<string, number>>>({});
    const [actualGroupData, setActualGroupData] = useState<Record<string, Record<string, number>>>({});

    // Hierarchical expansion state for Days -> Job Groups -> Job Codes structure
    const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
    const [expandedJobGroups, setExpandedJobGroups] = useState<Set<string>>(new Set());
    const [actualData, setActualData] = useState<Record<string, Record<string, number>>>({}); 
    const [forecastData, setForecastData] = useState<Record<string, Record<string, number>>>({});
    const [budgetData, setBudgetData] = useState<Record<string, Record<string, number>>>({});
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState<ForecastDayData | null>(null);

    const { toast } = useToast();

    // Helper function for data transformation to eliminate duplication
    const transformJobGroupToPayrollDetails = (
        jobGroups: any[] | undefined,
        hoursProperty: string
    ): PayrollDetailDto[] => {
        const details: PayrollDetailDto[] = [];
        if (jobGroups && Array.isArray(jobGroups)) {
            jobGroups.forEach((jobGroup: any) => {
                if (jobGroup.jobCodes && Array.isArray(jobGroup.jobCodes)) {
                    jobGroup.jobCodes.forEach((jobCode: any) => {
                        details.push({
                            id: jobCode.id,
                            date: jobCode.date,
                            displayName: jobCode.displayName,
                            jobCode: jobCode.jobCode,
                            regularHours: jobCode[hoursProperty] || 0
                        });
                    });
                }
            });
        }
        return details;
    };

    // Helper functions for hierarchical expansion
    const toggleDayExpansion = (dateKey: string) => {
        setExpandedDays(prev => {
            const newSet = new Set(prev);
            if (newSet.has(dateKey)) {
                newSet.delete(dateKey);
            } else {
                newSet.add(dateKey);
            }
            return newSet;
        });
    };

    const toggleJobGroupExpansion = (jobGroupKey: string) => {
        setExpandedJobGroups(prev => {
            const newSet = new Set(prev);
            if (newSet.has(jobGroupKey)) {
                newSet.delete(jobGroupKey);
            } else {
                newSet.add(jobGroupKey);
            }
            return newSet;
        });
    };

    interface JobRole {
        displayName: string;
        jobCode: string;
        hourlyRate: number;
    }
    const jobRoles: JobRole[] = [];

    // Business logic functions
    const determineContractType = (payrollData: PayrollDto, contractDetails?: Contract | null): "Standard" | "PerLaborHour" => {
        // Primary: Check payrollForecastMode from API
        if (payrollData.payrollForecastMode === "Code") return "PerLaborHour";
        if (payrollData.payrollForecastMode === "Group") return "Standard";

        // Fallback: Check contract details
        return contractDetails?.perLaborHour?.enabled ? "PerLaborHour" : "Standard";
    };

    const fetchContractDetails = async (customerSiteId: string) => {
        setIsLoadingContract(true);
        try {
            const response = await fetch(`/api/customers/${customerSiteId}/contract`);
            if (response.ok) {
                const contract = await response.json();
                setContractDetails(contract);
            }
        } catch (error) {
            console.error('Failed to fetch contract details:', error);
        } finally {
            setIsLoadingContract(false);
        }
    };

    const fetchJobCodes = async (customerSiteId: string) => {
        setIsLoadingJobCodes(true);
        try {
            const response = await fetch(`/api/job-codes/by-site/${customerSiteId}`);
            if (response.ok) {
                const jobCodesData = await response.json();
                setJobCodes(jobCodesData);
            }
        } catch (error) {
            console.error('Failed to fetch job codes:', error);
        } finally {
            setIsLoadingJobCodes(false);
        }
    };

    const getBillableRates = (jobCode: string, contractDetails?: Contract | null) => {
        if (!contractDetails?.perLaborHour?.enabled) return undefined;

        const jobRate = contractDetails.perLaborHour.jobRates?.find(
            rate => rate.jobCode === jobCode
        );

        return jobRate ? {
            rate: jobRate.rate,
            overtimeRate: jobRate.overtimeRate
        } : undefined;
    };

    const getJobCodeDetails = (jobCodeId: string): JobCode | undefined => {
        return jobCodes.find(jc => jc.jobCodeId === jobCodeId);
    };

    useEffect(() => {
        if (!selectedSite || !startingMonth) return;

        // Clear expansion states when site changes to prevent job groups from previous site persisting
        setExpandedJobGroups(new Set());
        setExpandedDays(new Set());

        fetchPayrollData();
        fetchContractDetails(selectedSite);
        fetchJobCodes(selectedSite);
    }, [selectedSite, startingMonth]);

    useEffect(() => {
        updateDatesFromPeriod(startingMonth);
    }, [startingMonth]);

    useEffect(() => {
        if (selectedDates.length === 0) return;

        const sortedDates = [...selectedDates].sort((a, b) => a.getTime() - b.getTime());
        const groupedWeeks: { start: Date, end: Date, dates: Date[] }[] = [];

        let currentWeekStart = new Date(sortedDates[0]);
        currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());

        let currentWeekDates: Date[] = [];

        sortedDates.forEach(date => {
            const weekStart = new Date(date);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());

            if (weekStart.getTime() !== currentWeekStart.getTime()) {
                const weekEnd = new Date(currentWeekStart);
                weekEnd.setDate(weekEnd.getDate() + 6);

                groupedWeeks.push({
                    start: new Date(currentWeekStart),
                    end: weekEnd,
                    dates: currentWeekDates
                });

                currentWeekStart = weekStart;
                currentWeekDates = [date];
            } else {
                currentWeekDates.push(date);
            }
        });

        if (currentWeekDates.length > 0) {
            const weekEnd = new Date(currentWeekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);

            groupedWeeks.push({
                start: currentWeekStart,
                end: weekEnd,
                dates: currentWeekDates
            });
        }

        setWeeks(groupedWeeks);
    }, [selectedDates]);

    useEffect(() => {
        const newScheduledData: Record<string, Record<string, number>> = {};
        const newActualData: Record<string, Record<string, number>> = {};
        const newForecastData: Record<string, Record<string, number>> = {};
        const newBudgetData: Record<string, Record<string, number>> = {};

        const uniqueJobCodes = new Set<string>();
        const uniqueDateKeys = new Set<string>();

        jobRoles.forEach((job: JobRole) => uniqueJobCodes.add(job.jobCode));

        selectedDates.forEach(date => {
            uniqueDateKeys.add(formatDateKey(date));
        });

        const processPayrollDetails = (details: PayrollDetailDto[], target: Record<string, Record<string, number>>) => {
            details.forEach(detail => {
                if (detail.jobCode) {
                    uniqueJobCodes.add(detail.jobCode);
                }
                if (detail.date) {
                    uniqueDateKeys.add(detail.date);
                }
            });
        };

        processPayrollDetails(forecastPayrollDetails, newForecastData);
        processPayrollDetails(scheduledPayrollDetails, newScheduledData);
        processPayrollDetails(actualPayrollDetails, newActualData);
        processPayrollDetails(budgetPayrollDetails, newBudgetData);

        uniqueDateKeys.forEach(dateKey => {
            newScheduledData[dateKey] = {};
            newActualData[dateKey] = {};
            newForecastData[dateKey] = {};
            newBudgetData[dateKey] = {};
        });

        uniqueDateKeys.forEach(dateKey => {
            uniqueJobCodes.forEach(jobCode => {
                if (!newScheduledData[dateKey]) newScheduledData[dateKey] = {};
                if (!newActualData[dateKey]) newActualData[dateKey] = {};
                if (!newForecastData[dateKey]) newForecastData[dateKey] = {};
                if (!newBudgetData[dateKey]) newBudgetData[dateKey] = {};

                newScheduledData[dateKey][jobCode] = 0;
                newActualData[dateKey][jobCode] = 0;
                newForecastData[dateKey][jobCode] = 0;
                newBudgetData[dateKey][jobCode] = 0;
            });
        });

        scheduledPayrollDetails.forEach(detail => {
            if (!detail.date || !detail.jobCode) return;

            const dateKey = detail.date;
            const jobCode = detail.jobCode;

            if (!newScheduledData[dateKey]) newScheduledData[dateKey] = {};
            newScheduledData[dateKey][jobCode] = detail.regularHours;
        });

        actualPayrollDetails.forEach(detail => {
            if (!detail.date || !detail.jobCode) return;

            const dateKey = detail.date;
            const jobCode = detail.jobCode;

            if (!newActualData[dateKey]) newActualData[dateKey] = {};
            newActualData[dateKey][jobCode] = detail.regularHours;
        });

        forecastPayrollDetails.forEach(detail => {
            if (!detail.date || !detail.jobCode) return;

            const dateKey = detail.date;
            const jobCode = detail.jobCode;

            if (!newForecastData[dateKey]) newForecastData[dateKey] = {};
            newForecastData[dateKey][jobCode] = detail.regularHours;
        });

        budgetPayrollDetails.forEach(detail => {
            if (!detail.date || !detail.jobCode) return;

            const dateKey = detail.date;
            const jobCode = detail.jobCode;

            if (!newBudgetData[dateKey]) newBudgetData[dateKey] = {};
            newBudgetData[dateKey][jobCode] = detail.regularHours;
        });

        setScheduledData(newScheduledData);
        setActualData(newActualData);
        setForecastData(newForecastData);
        setBudgetData(newBudgetData);
    }, [forecastPayrollDetails, selectedDates, scheduledPayrollDetails, actualPayrollDetails, budgetPayrollDetails, jobCodes]);

    // Process job group level data directly from API response
    useEffect(() => {
        const newScheduledGroupData: Record<string, Record<string, number>> = {};
        const newActualGroupData: Record<string, Record<string, number>> = {};
        
        if (payrollData) {
            // Process scheduled payroll job groups
            if (payrollData.scheduledPayroll) {
                payrollData.scheduledPayroll.forEach((jobGroup: any) => {
                    if (jobGroup.date && jobGroup.jobGroupId && typeof jobGroup.scheduledHours === 'number') {
                        const dateKey = jobGroup.date;
                        const groupId = jobGroup.jobGroupId;
                        
                        if (!newScheduledGroupData[dateKey]) {
                            newScheduledGroupData[dateKey] = {};
                        }
                        newScheduledGroupData[dateKey][groupId] = jobGroup.scheduledHours;
                    }
                });
            }
            
            // Process actual payroll job groups
            if (payrollData.actualPayroll) {
                payrollData.actualPayroll.forEach((jobGroup: any) => {
                    if (jobGroup.date && jobGroup.jobGroupId && typeof jobGroup.actualHours === 'number') {
                        const dateKey = jobGroup.date;
                        const groupId = jobGroup.jobGroupId;
                        
                        if (!newActualGroupData[dateKey]) {
                            newActualGroupData[dateKey] = {};
                        }
                        newActualGroupData[dateKey][groupId] = jobGroup.actualHours;
                    }
                });
            }
        }
        
        setScheduledGroupData(newScheduledGroupData);
        setActualGroupData(newActualGroupData);
    }, [payrollData]);

    const fetchPayrollData = async () => {
        setIsLoadingPayroll(true);

        try {
            const response = await fetch(`/api/payroll/${selectedSite}/${startingMonth}`);

            if (!response.ok) {
                const emptyPayrollData: PayrollDto = {
                    customerSiteId: selectedSite,
                    siteNumber: customers.find(c => c.customerSiteId === selectedSite)?.siteNumber,
                    name: customers.find(c => c.customerSiteId === selectedSite)?.siteName,
                    billingPeriod: startingMonth,
                    forecastPayroll: [],
                    budgetPayroll: [],
                    actualPayroll: [],
                    scheduledPayroll: []
                };
                setPayrollData(emptyPayrollData);
                setForecastPayrollDetails([]);
                setBudgetPayrollDetails([]);
                setActualPayrollDetails([]);
                setScheduledPayrollDetails([]);

                if (response.status !== 404) {
                    console.error(`Error fetching payroll data: ${response.status}`);
                }

                setIsLoadingPayroll(false);
                return;
            }

            const data: PayrollDto = await response.json();
            setPayrollData(data);

            // Handle new JobGroupForecastDto structure
            setForecastJobGroups(data.forecastPayroll || []);

            // Convert JobGroupForecastDto to PayrollDetailDto for backward compatibility using helper function
            const flattenedForecastDetails = transformJobGroupToPayrollDetails(data.forecastPayroll, 'forecastHours');
            const flattenedBudgetDetails = transformJobGroupToPayrollDetails(data.budgetPayroll, 'budgetHours');
            setBudgetPayrollDetails(flattenedBudgetDetails);

            // If forecastPayroll is missing or empty, initialize from budgetPayroll
            if (flattenedForecastDetails.length === 0) {
                if (flattenedBudgetDetails.length > 0) {
                    // Copy budget details as forecast details
                    setForecastPayrollDetails(
                        flattenedBudgetDetails.map(detail => ({
                            ...detail,
                            regularHours: detail.regularHours
                        }))
                    );
                } else if (jobCodes.length > 0) {
                    // Fallback: initialize all job codes with zero, grouped by job group
                    const zeroedForecastDetails: PayrollDetailDto[] = jobCodes.map(jc => ({
                        id: jc.jobCodeId,
                        date: undefined,
                        jobCode: jc.jobCode,
                        displayName: jc.jobTitle,
                        regularHours: 0
                    }));
                    setForecastPayrollDetails(zeroedForecastDetails);
                } else {
                    setForecastPayrollDetails([]);
                }
            } else {
                setForecastPayrollDetails(flattenedForecastDetails);
            }

            // Flatten all remaining data types using helper function
            const flattenedActualDetails = transformJobGroupToPayrollDetails(data.actualPayroll, 'actualHours');
            const flattenedScheduledDetails = transformJobGroupToPayrollDetails(data.scheduledPayroll, 'scheduledHours');
            setActualPayrollDetails(flattenedActualDetails);
            setScheduledPayrollDetails(flattenedScheduledDetails);
        } catch (err) {
            console.error('Failed to fetch payroll data:', err);
            toast({
                title: "Error",
                description: "Failed to load payroll data. Please try again later.",
                variant: "destructive"
            });
            const emptyPayrollData: PayrollDto = {
                customerSiteId: selectedSite,
                siteNumber: customers.find(c => c.customerSiteId === selectedSite)?.siteNumber,
                name: customers.find(c => c.customerSiteId === selectedSite)?.siteName,
                billingPeriod: startingMonth,
                forecastPayroll: [],
                budgetPayroll: [],
                actualPayroll: [],
                scheduledPayroll: []
            };
            setPayrollData(emptyPayrollData);
            setForecastPayrollDetails([]);
            setBudgetPayrollDetails([]);
            setActualPayrollDetails([]);
            setScheduledPayrollDetails([]);
        } finally {
            setIsLoadingPayroll(false);
        }
    };

    // Always return the full set of job groups/jobs, merging in forecast values if present
    // Fallback: forecastPayroll > budgetPayroll > jobCodes (zero)
    const getJobGroupsWithFallback = (): JobGroupForecastDto[] => {
        if (!selectedDates || selectedDates.length === 0) return [];

        if (forecastPayrollDetails.length > 0) {
            // Build a lookup for forecast values: key = `${date}|${jobCode}`
            const forecastDetailMap = new Map<string, PayrollDetailDto>();
            forecastPayrollDetails.forEach(detail => {
                if (detail.date && detail.jobCode) {
                    forecastDetailMap.set(`${detail.date}|${detail.jobCode}`, detail);
                }
            });

            // Use jobCodes as the authoritative source for all jobs/groups
            const groupedByJobGroup: Record<string, JobCode[]> = {};
            jobCodes.forEach(jobCode => {
                const jobGroupId = jobCode.jobGroupId || 'unknown-group';
                if (!groupedByJobGroup[jobGroupId]) {
                    groupedByJobGroup[jobGroupId] = [];
                }
                groupedByJobGroup[jobGroupId].push(jobCode);
            });

            // For each group, create a JobGroupForecastDto for each date
            const result: JobGroupForecastDto[] = [];
            for (const dateObj of selectedDates) {
                const dateKey = formatDateKey(dateObj);
                for (const [jobGroupId, jobCodesInGroup] of Object.entries(groupedByJobGroup)) {
                    const firstJobCode = jobCodesInGroup[0];
                    const jobGroupName = firstJobCode?.jobGroupName || 'Unknown Group';
                    const jobCodes = jobCodesInGroup.map(jc => {
                        const forecast = forecastDetailMap.get(`${dateKey}|${jc.jobCode}`);
                        const hourlyRate = jc.averageHourlyRate ?? DEFAULT_HOURLY_RATE;
                        return {
                            id: forecast?.id ?? undefined,
                            jobCodeId: jc.jobCodeId,
                            jobCode: jc.jobCode,
                            displayName: jc.jobTitle,
                            forecastHours: forecast?.regularHours ?? 0,
                            date: dateKey,
                            forecastPayrollCost: (forecast?.regularHours ?? 0) * hourlyRate,
                            forecastPayrollRevenue: 0
                        };
                    });
                    const totalHours = jobCodes.reduce((sum, jc) => sum + (jc.forecastHours || 0), 0);
                    const totalCost = jobCodes.reduce((sum, jc) => sum + (jc.forecastPayrollCost || 0), 0);
                    const totalRevenue = jobCodes.reduce((sum, jc) => sum + (jc.forecastPayrollRevenue || 0), 0);
                    result.push({
                        id: undefined,
                        jobGroupId,
                        jobGroupName,
                        forecastHours: totalHours,
                        date: dateKey,
                        jobCodes,
                        forecastPayrollCost: totalCost,
                        forecastPayrollRevenue: totalRevenue
                    });
                }
            }
            return result;
        }

        // 2. If budgetPayrollDetails exist, use them as forecast
        if (budgetPayrollDetails.length > 0) {
            // Build a lookup for budget values: key = `${date}|${jobCode}`
            const budgetDetailMap = new Map<string, PayrollDetailDto>();
            budgetPayrollDetails.forEach(detail => {
                if (detail.date && detail.jobCode) {
                    budgetDetailMap.set(`${detail.date}|${detail.jobCode}`, detail);
                }
            });

            const groupedByJobGroup: Record<string, JobCode[]> = {};
            jobCodes.forEach(jobCode => {
                const jobGroupId = jobCode.jobGroupId || 'unknown-group';
                if (!groupedByJobGroup[jobGroupId]) {
                    groupedByJobGroup[jobGroupId] = [];
                }
                groupedByJobGroup[jobGroupId].push(jobCode);
            });

            const result: JobGroupForecastDto[] = [];
            for (const dateObj of selectedDates) {
                const dateKey = formatDateKey(dateObj);
                for (const [jobGroupId, jobCodesInGroup] of Object.entries(groupedByJobGroup)) {
                    const firstJobCode = jobCodesInGroup[0];
                    const jobGroupName = firstJobCode?.jobGroupName || 'Unknown Group';
                    const jobCodes = jobCodesInGroup.map(jc => {
                        const budget = budgetDetailMap.get(`${dateKey}|${jc.jobCode}`);
                        const hourlyRate = jc.averageHourlyRate ?? DEFAULT_HOURLY_RATE;
                        return {
                            id: budget?.id ?? undefined,
                            jobCodeId: jc.jobCodeId,
                            jobCode: jc.jobCode,
                            displayName: jc.jobTitle,
                            forecastHours: budget?.regularHours ?? 0,
                            date: dateKey,
                            forecastPayrollCost: (budget?.regularHours ?? 0) * hourlyRate,
                            forecastPayrollRevenue: 0
                        };
                    });
                    const totalHours = jobCodes.reduce((sum, jc) => sum + (jc.forecastHours || 0), 0);
                    const totalCost = jobCodes.reduce((sum, jc) => sum + (jc.forecastPayrollCost || 0), 0);
                    const totalRevenue = jobCodes.reduce((sum, jc) => sum + (jc.forecastPayrollRevenue || 0), 0);
                    result.push({
                        id: undefined,
                        jobGroupId,
                        jobGroupName,
                        forecastHours: totalHours,
                        date: dateKey,
                        jobCodes,
                        forecastPayrollCost: totalCost,
                        forecastPayrollRevenue: totalRevenue
                    });
                }
            }
            return result;
        }

        // 3. Fallback: use job codes by site, all zeros
        const groupedByJobGroup: Record<string, JobCode[]> = {};
        jobCodes.forEach(jobCode => {
            const jobGroupId = jobCode.jobGroupId || 'unknown-group';
            if (!groupedByJobGroup[jobGroupId]) {
                groupedByJobGroup[jobGroupId] = [];
            }
            groupedByJobGroup[jobGroupId].push(jobCode);
        });

        const result: JobGroupForecastDto[] = [];
        for (const dateObj of selectedDates) {
            const dateKey = formatDateKey(dateObj);
            for (const [jobGroupId, jobCodesInGroup] of Object.entries(groupedByJobGroup)) {
                const firstJobCode = jobCodesInGroup[0];
                const jobGroupName = firstJobCode?.jobGroupName || 'Unknown Group';
                const jobCodes = jobCodesInGroup.map(jc => {
                    const hourlyRate = jc.averageHourlyRate ?? DEFAULT_HOURLY_RATE;
                    return {
                        id: undefined,
                        jobCodeId: jc.jobCodeId,
                        jobCode: jc.jobCode,
                        displayName: jc.jobTitle,
                        forecastHours: 0,
                        date: dateKey,
                        forecastPayrollCost: 0,
                        forecastPayrollRevenue: 0
                    };
                });
                result.push({
                    id: undefined,
                    jobGroupId,
                    jobGroupName,
                    forecastHours: 0,
                    date: dateKey,
                    jobCodes,
                    forecastPayrollCost: 0,
                    forecastPayrollRevenue: 0
                });
            }
        }
        return result;
    };

    const shouldShowHRISWarning = (): boolean => {
        if (isLoadingPayroll || isLoadingContract || isLoadingJobCodes) {
            return false;
        }

        const fallbackJobGroups = getJobGroupsWithFallback();
        const fallbackFailed = fallbackJobGroups.length === 0;

        return fallbackFailed && Boolean(selectedSite);
    };

    // Create job groups from budget data
    // Use jobGroupId and jobGroupName directly from budgetPayroll (API response)
    const createJobGroupsFromBudgetData = (): JobGroupForecastDto[] => {
        // Flatten all job group objects from budgetPayrollDetails
        const groupMap: Record<string, JobGroupForecastDto> = {};

        // budgetPayrollDetails here is actually a flat array of job codes, but the API gives us jobGroupId and jobGroupName per group
        // Instead, we should use the original budgetPayroll array from payrollData if available
        if (payrollData?.budgetPayroll && payrollData.budgetPayroll.length > 0) {
            return payrollData.budgetPayroll.map(group => ({
                id: group.id,
                jobGroupId: group.jobGroupId,
                jobGroupName: group.jobGroupName,
                forecastHours: group.budgetHours,
                date: group.date,
                jobCodes: (group.jobCodes || []).map(jobCode => ({
                    id: jobCode.id,
                    jobCodeId: jobCode.jobCodeId,
                    jobCode: jobCode.jobCode,
                    displayName: jobCode.displayName,
                    forecastHours: jobCode.budgetHours,
                    date: jobCode.date,
                    forecastPayrollCost: jobCode.budgetPayrollCost,
                    forecastPayrollRevenue: jobCode.budgetPayrollRevenue
                })),
                forecastPayrollCost: group.budgetPayrollCost,
                forecastPayrollRevenue: group.budgetPayrollRevenue
            }));
        }

        // fallback: group by jobGroupId from budgetPayrollDetails (legacy)
        budgetPayrollDetails.forEach(budgetItem => {
            if (!budgetItem.jobCode || !budgetItem.date) return;
            const jobCodeInfo = jobCodes.find(jc => jc.jobCode === budgetItem.jobCode);
            const jobGroupId = jobCodeInfo?.jobGroupId || 'unknown-group';
            const jobGroupName = jobCodeInfo?.jobGroupName || 'Unknown Group';
            if (!groupMap[jobGroupId]) {
                groupMap[jobGroupId] = {
                    id: undefined,
                    jobGroupId,
                    jobGroupName,
                    forecastHours: 0,
                    date: budgetItem.date,
                    jobCodes: [],
                    forecastPayrollCost: 0,
                    forecastPayrollRevenue: 0
                };
            }
            const group = groupMap[jobGroupId];
            if (group && Array.isArray(group.jobCodes) && typeof group.forecastHours === "number" && typeof group.forecastPayrollCost === "number") {
                group.jobCodes.push({
                    id: budgetItem.id,
                    jobCodeId: jobCodeInfo?.jobCodeId || '',
                    jobCode: budgetItem.jobCode,
                    displayName: budgetItem.displayName || jobCodeInfo?.name || budgetItem.jobCode,
                    forecastHours: budgetItem.regularHours,
                    date: budgetItem.date,
                    forecastPayrollCost: budgetItem.regularHours * (jobCodeInfo?.averageHourlyRate || 15),
                    forecastPayrollRevenue: 0
                });
                group.forecastHours += budgetItem.regularHours;
                group.forecastPayrollCost += budgetItem.regularHours * (jobCodeInfo?.averageHourlyRate || 15);
            }
        });

        return Object.values(groupMap);
    };

    // Create job groups from job codes, initialized to zero
    const createJobGroupsFromJobCodes = (): JobGroupForecastDto[] => {
        const groupedByJobGroup: Record<string, JobCode[]> = {};

        jobCodes.forEach(jobCode => {
            const jobGroupId = jobCode.jobGroupId || 'unknown-group';
            if (!groupedByJobGroup[jobGroupId]) {
                groupedByJobGroup[jobGroupId] = [];
            }
            groupedByJobGroup[jobGroupId].push(jobCode);
        });

        return Object.entries(groupedByJobGroup).map(([jobGroupId, jobCodesInGroup]) => {
            const firstJobCode = jobCodesInGroup[0];

            return {
                id: undefined,
                jobGroupId: jobGroupId,
                jobGroupName: firstJobCode?.jobGroupName || 'Unknown Group',
                forecastHours: 0,
                date: undefined,
                jobCodes: jobCodesInGroup.map(jc => ({
                    id: undefined,
                    jobCodeId: jc.jobCodeId,
                    jobCode: jc.jobCode,
                    displayName: jc.jobTitle,
                    forecastHours: 0,
                    date: undefined,
                    forecastPayrollCost: 0,
                    forecastPayrollRevenue: 0
                })),
                forecastPayrollCost: 0,
                forecastPayrollRevenue: 0
            };
        });
    };

    const updateDatesFromPeriod = (period: string) => {
        const [year, month] = period.split("-").map((num) => Number.parseInt(num));
        const monthDates = [];
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);

        for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
            monthDates.push(new Date(day));
        }

        setSelectedDates(monthDates);

        const today = new Date();
        const periodDate = new Date(year, month - 1);
        setIsPastPeriod(periodDate < new Date(today.getFullYear(), today.getMonth()));
    };

    const formatDateKey = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };

    const toggleGuide = () => {
        setIsGuideOpen(!isGuideOpen);
    };

    const handleSavePayroll = async () => {
        if (!selectedSite) {
            toast({
                title: "Error",
                description: "Please select a customer site first.",
                variant: "destructive"
            });
            return;
        }

        setIsSaving(true);

        try {
            const customer = customers.find(c => c.customerSiteId === selectedSite);

            // Build full matrix: every date, every job group, every job code for that group
            const allDates = selectedDates.map(d => formatDateKey(d));
            // Group job codes by jobGroupId
            const groupedJobCodes: Record<string, JobCode[]> = {};
            jobCodes.forEach(jc => {
                const groupId = jc.jobGroupId || 'unknown-group';
                if (!groupedJobCodes[groupId]) groupedJobCodes[groupId] = [];
                groupedJobCodes[groupId].push(jc);
            });

            const jobGroups = Object.entries(groupedJobCodes).map(([jobGroupId, codes]) => {
                const jobGroupName = codes[0]?.jobGroupName || 'Unknown Group';
                return { jobGroupId, jobGroupName, jobCodes: codes };
            });

            // Build a lookup for existing forecast details
            const forecastDetailMap = new Map<string, PayrollDetailDto>();
            forecastPayrollDetails.forEach(detail => {
                // Support both jobCode and jobCodeString for robustness
                forecastDetailMap.set(`${detail.date}|${detail.jobCode}`, detail);
                if ((detail as any).jobCodeString) {
                    forecastDetailMap.set(`${detail.date}|${(detail as any).jobCodeString}`, detail);
                }
            });

            const aggregatedForecastPayroll: JobGroupForecastDto[] = [];

            for (const date of allDates) {
                for (const group of jobGroups) {
                    const jobCodesForGroup = group.jobCodes.map(jc => {
                        const codeKey = jc.jobCode || jc.jobCodeString;
                        const key = `${date}|${codeKey}`;
                        const detail = forecastDetailMap.get(key);
                        return {
                            id: detail?.id,
                            jobCodeId: jc.jobCodeId,
                            jobCode: codeKey,
                            displayName: jc.name || jc.title || detail?.displayName || codeKey,
                            forecastHours: detail?.regularHours ?? 0,
                            date: date,
                            forecastPayrollCost: (detail?.regularHours ?? 0) * (jc.averageHourlyRate ?? DEFAULT_HOURLY_RATE),
                            forecastPayrollRevenue: 0 // You can enhance this if revenue logic is needed
                        };
                    });

                    const totalHours = jobCodesForGroup.reduce((sum, jc) => sum + (jc.forecastHours || 0), 0);
                    const totalCost = jobCodesForGroup.reduce((sum, jc) => sum + (jc.forecastPayrollCost || 0), 0);
                    const totalRevenue = jobCodesForGroup.reduce((sum, jc) => sum + (jc.forecastPayrollRevenue || 0), 0);

                    aggregatedForecastPayroll.push({
                        id: undefined,
                        jobGroupId: group.jobGroupId,
                        jobGroupName: group.jobGroupName,
                        forecastHours: totalHours,
                        date: date,
                        jobCodes: jobCodesForGroup,
                        forecastPayrollCost: totalCost,
                        forecastPayrollRevenue: totalRevenue
                    });
                }
            }

            const payload: PayrollDto = {
                id: payrollData?.id,
                customerSiteId: selectedSite,
                siteNumber: customer?.siteNumber,
                name: customer?.siteName,
                billingPeriod: startingMonth,
                payrollForecastMode: payrollData?.payrollForecastMode || "Code",
                forecastPayroll: aggregatedForecastPayroll,
                budgetPayroll: payrollData?.budgetPayroll || [],
                actualPayroll: payrollData?.actualPayroll || [],
                scheduledPayroll: payrollData?.scheduledPayroll || []
            };

            const response = await fetch(`/api/payroll`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error saving payroll data: ${response.status}`);
            }

            const savedData = await response.json();

            setPayrollData(savedData);

            // Transform all data types using the helper function to eliminate duplication
            const flattenedForecastDetails = transformJobGroupToPayrollDetails(savedData.forecastPayroll, 'forecastHours');
            const flattenedBudgetDetails = transformJobGroupToPayrollDetails(savedData.budgetPayroll, 'budgetHours');
            const flattenedActualDetails = transformJobGroupToPayrollDetails(savedData.actualPayroll, 'actualHours');
            const flattenedScheduledDetails = transformJobGroupToPayrollDetails(savedData.scheduledPayroll, 'scheduledHours');

            setForecastPayrollDetails(flattenedForecastDetails);
            setBudgetPayrollDetails(flattenedBudgetDetails);
            setActualPayrollDetails(flattenedActualDetails);
            setScheduledPayrollDetails(flattenedScheduledDetails);

            toast({
                title: "Success",
                description: "Payroll data saved successfully."
            });

            setHasUnsavedChanges(false);

        } catch (err) {
            console.error('Failed to save payroll data:', err);
            toast({
                title: "Error",
                description: "Failed to save payroll data. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleHoursChange = (date: Date, jobCode: string, value: string) => {
        const numValue = value === "" ? 0 : parseFloat(value);
        const dateKey = formatDateKey(date);

        updateForecastValue(dateKey, jobCode, numValue);
        setHasUnsavedChanges(true);
    };

    const getHoursForDateAndJob = (date: Date, jobCode: string): number => {
        const dateKey = formatDateKey(date);
        const detail = forecastPayrollDetails.find(
            detail => detail.date === dateKey && detail.jobCode === jobCode
        );

        return detail?.regularHours || 0;
    };

    const getTotalHoursForDate = (date: Date): number => {
        const dateKey = formatDateKey(date);
        return forecastPayrollDetails
            .filter(detail => detail.date === dateKey)
            .reduce((sum, detail) => sum + detail.regularHours, 0);
    };

    const getTotalHoursForJob = (jobCode: string): number => {
        return forecastPayrollDetails
            .filter(detail => detail.jobCode === jobCode)
            .reduce((sum, detail) => sum + detail.regularHours, 0);
    };

    const getTotalHours = (): number => {
        return forecastPayrollDetails.reduce((sum, detail) => sum + detail.regularHours, 0);
    };

    const isReadOnly = (date: Date): boolean => {
        if (isPastPeriod) return true;

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        if (date.getFullYear() < currentYear) return true;
        if (date.getFullYear() === currentYear && date.getMonth() < currentMonth) return true;
        if (date.getFullYear() === currentYear && date.getMonth() === currentMonth && date.getDate() < new Date().getDate()) return true;

        return false;
    };

    const handlePreviousWeek = () => {
        if (visibleWeekIndex > 0) {
            setVisibleWeekIndex(visibleWeekIndex - 1);
        }
    };

    const handleNextWeek = () => {
        if (visibleWeekIndex < weeks.length - 1) {
            setVisibleWeekIndex(visibleWeekIndex + 1);
        }
    };

    const toggleDateExpand = (dateKey: string) => {
        setExpandedDates(prev => ({
            ...prev,
            [dateKey]: !prev[dateKey]
        }));
    };

    const getTotalForDate = (dateKey: string, dataSource: Record<string, Record<string, number>>): number => {
        if (!dataSource[dateKey]) return 0;

        return Object.values(dataSource[dateKey]).reduce((sum, hours) => sum + hours, 0);
    };

    // Get totals from job group level data (for accurate display in Scheduled & Actual Data section)
    const getGroupTotalForDate = (dateKey: string, groupDataSource: Record<string, Record<string, number>>): number => {
        if (!groupDataSource[dateKey]) return 0;

        return Object.values(groupDataSource[dateKey]).reduce((sum, hours) => sum + hours, 0);
    };

    const getVariancePercentage = (dateKey: string, jobId?: string): number => {
        if (!actualData[dateKey] || !scheduledData[dateKey]) return 0;

        if (jobId) {
            const scheduled = scheduledData[dateKey][jobId] || 0;
            const actual = actualData[dateKey][jobId] || 0;

            if (scheduled === 0) return 0;
            return ((actual - scheduled) / scheduled) * 100;
        } else {
            // Use job group level data for variance calculation in Scheduled & Actual Data section
            const scheduledTotal = getGroupTotalForDate(dateKey, scheduledGroupData);
            const actualTotal = getGroupTotalForDate(dateKey, actualGroupData);

            if (scheduledTotal === 0) return 0;
            return ((actualTotal - scheduledTotal) / scheduledTotal) * 100;
        }
    };

    const getBarWidth = (hours: number): number => {
        return Math.min(Math.max((hours / MAX_EXPECTED_HOURS) * 100, 1), 100);
    };

    const getMaxValueForDate = (dateKey: string): number => {
        const forecastTotal = getTotalForDate(dateKey, forecastData);
        // Use job group level data for max value calculation in Scheduled & Actual Data section
        const scheduledTotal = getGroupTotalForDate(dateKey, scheduledGroupData);
        const actualTotal = getGroupTotalForDate(dateKey, actualGroupData);
        const budgetTotal = getTotalForDate(dateKey, budgetData);

        return Math.max(forecastTotal, scheduledTotal, actualTotal, budgetTotal);
    };

    const formatDateDisplay = (date: Date): string => {
        return date.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' });
    };

    const formatDateRange = (start: Date, end: Date): string => {
        return `${start.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}`;
    };

    const hasActualData = (dateKey: string): boolean => {
        // Check job group level data for actual hours
        return Object.values(actualGroupData[dateKey] || {}).some(hours => hours > 0);
    };

    const isFutureDate = (date: Date): boolean => {
        return date > new Date();
    };

    /**
     * Returns the list of job codes actually present in scheduledPayrollDetails and actualPayrollDetails,
     * using the endpoint data, not the static jobRoles.
     */
    const getFilteredJobs = () => {
        const jobCodeSet = new Set<string>();
        scheduledPayrollDetails.forEach(detail => {
            if (detail.jobCode) jobCodeSet.add(detail.jobCode);
        });
        actualPayrollDetails.forEach(detail => {
            if (detail.jobCode) jobCodeSet.add(detail.jobCode);
        });

        const jobsFromEndpoint = Array.from(jobCodeSet).map(jobCode => {
            const detail = scheduledPayrollDetails.find(d => d.jobCode === jobCode)
                || actualPayrollDetails.find(d => d.jobCode === jobCode);

            return {
                displayName: detail?.displayName || jobCode,
                jobCode,
                hourlyRate: 0
            };
        });

        if (selectedJob === "all") {
            return jobsFromEndpoint;
        }
        return jobsFromEndpoint.filter((job) => job.jobCode === selectedJob);
    };

    const findDisplayNameForJobCode = (jobCode: string): string | undefined => {
        const predefinedRole = jobRoles.find((role: JobRole) => role.jobCode === jobCode);
        if (predefinedRole) return predefinedRole.displayName;

        const detailWithJobCode = [
            ...forecastPayrollDetails,
            ...budgetPayrollDetails,
            ...actualPayrollDetails
        ].find(detail => detail.jobCode === jobCode);

        return detailWithJobCode?.displayName;
    };

    const currentWeek = weeks[visibleWeekIndex] || { start: new Date(), end: new Date(), dates: [] };

    const getDisplayValue = (hours: number, jobId?: string): string => {
        if (viewMode === "hours") {
            return `${hours.toFixed(1)} hrs`;
        } else {
            const job = jobId ? jobRoles.find((j: JobRole) => j.jobCode === jobId) : null;
            const hourlyRate = job?.hourlyRate || DEFAULT_HOURLY_RATE;
            return formatCurrency(hours * hourlyRate);
        }
    };

    const [userModifiedData, setUserModifiedData] = useState(false);

    useEffect(() => {
        if (userModifiedData) {
            setHasUnsavedChanges(true);
            setUserModifiedData(false);
        }
    }, [userModifiedData, setHasUnsavedChanges]);

    const updateForecastValue = (dateKey: string, jobId: string, hours: number) => {
        setForecastData(prev => ({
            ...prev,
            [dateKey]: {
                ...(prev[dateKey] || {}),
                [jobId]: hours
            }
        }));
        setUserModifiedData(true);

        setForecastPayrollDetails(prevDetails => {
            const idx = prevDetails.findIndex(
                d => d.date === dateKey && d.jobCode === jobId
            );
            if (hours > 0) {
                if (idx >= 0) {
                    const updated = [...prevDetails];
                    updated[idx] = { ...updated[idx], regularHours: hours };
                    return updated;
                } else {
                    const jobRole = jobRoles.find((role: JobRole) => role.jobCode === jobId);
                    return [
                        ...prevDetails,
                        {
                            id: undefined,
                            date: dateKey,
                            jobCode: jobId,
                            displayName: jobRole?.displayName || jobId,
                            regularHours: hours
                        }
                    ];
                }
            } else {
                if (idx >= 0) {
                    const updated = [...prevDetails];
                    updated.splice(idx, 1);
                    return updated;
                }
                return prevDetails;
            }
        });
    };

    const openEditDialog = (dateKey: string, jobCode?: string) => {
        const date = new Date(dateKey);
        const contractType = determineContractType(payrollData!, contractDetails);

        const scheduledHours = jobCode
            ? scheduledData[dateKey]?.[jobCode] || 0
            : getTotalForDate(dateKey, scheduledData);
        const forecastHours = jobCode
            ? forecastData[dateKey]?.[jobCode] || 0
            : getTotalForDate(dateKey, forecastData);

        const job = jobCode ? jobRoles.find((j: JobRole) => j.jobCode === jobCode) : undefined;
        const hourlyRate = job?.hourlyRate || 15;

        let budgetHours = 0;
        let budgetCost = 0;
        if (jobCode) {
            budgetHours = budgetData[dateKey]?.[jobCode] || 0;
            budgetCost = budgetHours * hourlyRate;
        } else {
            budgetHours = getTotalForDate(dateKey, budgetData);
            budgetCost = budgetHours * hourlyRate;
        }

        // Determine editing level and context based on contract type
        let editLevel: "JobGroup" | "JobTitle" = "JobTitle";
        let jobGroupContext = undefined;
        let jobTitleContext = undefined;

        if (contractType === "Standard") {
            // Standard sites: Job Group level only
            editLevel = "JobGroup";

            // Find the job group for this job code
            const jobGroupData = getJobGroupsWithFallback().find(jg =>
                jg.jobCodes?.some((jc: JobCodeForecastDto) => jc.jobCode === jobCode)
            );

            if (jobGroupData) {
                // Get all job codes in this group with their details
                const jobCodesInGroup = jobCodes.filter(jc => jc.jobGroupId === jobGroupData.jobGroupId);

                jobGroupContext = {
                    id: jobGroupData.jobGroupId,
                    name: jobGroupData.jobGroupName || "Unknown Group",
                    averageHourlyRate: calculateGroupAverageRate(jobCodesInGroup),
                    jobCodes: jobCodesInGroup.map(jc => ({
                        jobCodeId: jc.jobCodeId,
                        jobCode: jc.jobCode,
                        displayName: jc.jobTitle || jc.name,
                        activeEmployeeCount: jc.activeEmployeeCount || 0,
                        averageHourlyRate: jc.averageHourlyRate
                    }))
                };
            }
        } else if (contractType === "PerLaborHour" && jobCode) {
            // Per Labor Hour sites: Job Title level
            editLevel = "JobTitle";
            const jobCodeDetails = getJobCodeDetails(jobCode);
            const billableRates = getBillableRates(jobCode, contractDetails);

            jobTitleContext = {
                jobCodeId: jobCode,
                jobCode: jobCode,
                displayName: job?.displayName || jobCode,
                hourlyRate: jobCodeDetails?.averageHourlyRate || hourlyRate,
                billableRates
            };
        }

        setCurrentEditData({
            date: dateKey,
            dateObj: date,
            displayDate: formatDateDisplay(date),
            scheduledHours,
            scheduledCost: scheduledHours * hourlyRate,
            forecastHours,
            jobCode,
            jobName: job?.displayName,
            hourlyRate,
            budgetHours,
            budgetCost,
            contractType,
            editLevel,
            jobGroup: jobGroupContext,
            jobTitle: jobTitleContext
        });

        setIsEditDialogOpen(true);
    };

    /**
     * Calculates the weighted average hourly rate for a job group,
     * weighted by active employee count. Accepts any object with averageHourlyRate and activeEmployeeCount.
     * Falls back to simple average if no counts.
     * @param jobCodesInGroup Array of objects with averageHourlyRate and activeEmployeeCount
     */
    const calculateGroupAverageRate = (
        jobCodesInGroup: Array<{ averageHourlyRate?: number; activeEmployeeCount?: number }>
    ): number => {
        let totalWeighted = 0;
        let totalEmployees = 0;
        let fallbackRates: number[] = [];
        jobCodesInGroup.forEach(jc => {
            const rate = jc.averageHourlyRate;
            const count = jc.activeEmployeeCount || 0;
            if (rate && rate > 0) {
                fallbackRates.push(rate);
                totalWeighted += rate * count;
                totalEmployees += count;
            }
        });
        if (totalEmployees > 0) {
            return totalWeighted / totalEmployees;
        }
        if (fallbackRates.length > 0) {
            return fallbackRates.reduce((sum, rate) => sum + rate, 0) / fallbackRates.length;
        }
        return 15; // Default rate
    };

    /**
     * Centralized payroll forecast processing function matching the flowchart logic.
     * Handles both Standard and Per Labor Hour contract types with explicit decision points.
     */
    const handleSaveEdit = (updatedData: ForecastDayData) => {
        const contractType = determineContractType(payrollData!, contractDetails);

        // Decision: Is Per Labor Hour enabled?
        if (contractType === "Standard") {
            // Standard Site Path: Job Group Level Only
            if (updatedData.editLevel === "JobGroup" && updatedData.jobGroup) {
                handleStandardSiteUpdate(updatedData);
                return;
            }
            // Restrict Job Title edits for Standard sites
            // (No-op or show error if needed)
            return;
        }

        if (contractType === "PerLaborHour") {
            // Per Labor Hour Site Path: Job Title Level
            if (updatedData.editLevel === "JobTitle" && updatedData.jobCode && updatedData.jobTitle) {
                handlePerLaborHourSiteUpdate(updatedData);
                return;
            }
            // Restrict Job Group edits for PLH sites
            // (No-op or show error if needed)
            return;
        }

        // Fallback: legacy logic (should not be reached in normal flow)
        if (updatedData.jobCode) {
            updateForecastValue(updatedData.date, updatedData.jobCode, updatedData.forecastHours);
        }
    };

    /**
     * Standard Site Path: Distribute hours proportionally by ActiveEmployeeCount,
     * and calculate job group cost using weighted average rate.
     */
    const handleStandardSiteUpdate = (updatedData: ForecastDayData) => {
        if (!updatedData.jobGroup) return;

        const totalHours = updatedData.forecastHours;
        const jobCodes = updatedData.jobGroup.jobCodes;

        // Calculate total employee count
        const totalEmployeeCount = jobCodes.reduce((sum, jc) => sum + (jc.activeEmployeeCount || 0), 0);

        // Calculate weighted average hourly rate for the group
        const avgRate = calculateGroupAverageRate(jobCodes);
        const groupCost = totalHours * avgRate;

        // Distribute hours and update forecast for each job code
        if (totalEmployeeCount === 0) {
            // Equal distribution if no employee count data
            const hoursPerJobCode = totalHours / jobCodes.length;
            jobCodes.forEach(jc => {
                updateForecastValue(updatedData.date, jc.jobCode, hoursPerJobCode);
                updateJobCodeForecast(updatedData.date, jc.jobCode, hoursPerJobCode, hoursPerJobCode * avgRate, 0);
            });
        } else {
            // Proportional distribution based on ActiveEmployeeCount
            jobCodes.forEach(jc => {
                const proportion = (jc.activeEmployeeCount || 0) / totalEmployeeCount;
                const distributedHours = totalHours * proportion;
                updateForecastValue(updatedData.date, jc.jobCode, distributedHours);
                updateJobCodeForecast(updatedData.date, jc.jobCode, distributedHours, distributedHours * avgRate, 0);
            });
        }

        // Update the job group forecast data (hours and cost)
        updateJobGroupForecast(updatedData.date, updatedData.jobGroup.id, totalHours);
    };

    /**
     * Helper to get all dates in the same Sat-Sun week as the given date.
     * @param dateStr ISO date string
     * @returns Array of ISO date strings for the week
     */
    const getWeekDatesSatToSun = (dateStr: string): string[] => {
        const date = new Date(dateStr);
        // 6 = Saturday, 0 = Sunday
        const day = date.getDay();
        // Find previous Saturday
        const prevSat = new Date(date);
        prevSat.setDate(date.getDate() - ((day + 1) % 7));
        // Find next Sunday
        const nextSun = new Date(prevSat);
        nextSun.setDate(prevSat.getDate() + 6);
        const weekDates: string[] = [];
        for (let d = new Date(prevSat); d <= nextSun; d.setDate(d.getDate() + 1)) {
            weekDates.push(d.toISOString().slice(0, 10));
        }
        return weekDates;
    };

    /**
     * Calculates total forecasted hours for a job code in the same Sat-Sun week as the given date.
     * @param dateStr ISO date string
     * @param jobCode string
     * @returns number
     */
    const getWeeklyHoursForJobCode = (dateStr: string, jobCode: string): number => {
        const weekDates = getWeekDatesSatToSun(dateStr);
        let total = 0;
        weekDates.forEach(d => {
            if (forecastData[d] && forecastData[d][jobCode]) {
                total += forecastData[d][jobCode];
            }
        });
        return total;
    };

    // Per Labor Hour Site Path: Job Title Level with cost and revenue calculations
    const handlePerLaborHourSiteUpdate = (updatedData: ForecastDayData) => {
        if (!updatedData.jobCode || !updatedData.jobTitle) return;

        const hours = updatedData.forecastHours;
        const jobCode = updatedData.jobCode;
        const hourlyRate = updatedData.jobTitle.hourlyRate;

        // Calculate cost (always calculated)
        const cost = hours * hourlyRate;

        // Calculate revenue if billable rates exist
        let revenue = 0;
        if (updatedData.jobTitle.billableRates) {
            const { rate, overtimeRate } = updatedData.jobTitle.billableRates;

            // Calculate total hours for this job code in the Sat-Sun week
            const weekTotal = getWeeklyHoursForJobCode(updatedData.date, jobCode) - (forecastData[updatedData.date]?.[jobCode] || 0) + hours;

            // Overtime logic: up to 40 hours regular, rest overtime, for the week
            const regularHours = Math.min(weekTotal, 40, hours);
            const overtimeHours = Math.max(0, weekTotal - 40, hours - regularHours);

            // If this edit pushes the week over 40, split accordingly
            let reg = 0, ot = 0;
            if (weekTotal <= 40) {
                reg = hours;
                ot = 0;
            } else if (weekTotal - hours >= 40) {
                reg = 0;
                ot = hours;
            } else {
                reg = 40 - (weekTotal - hours);
                ot = hours - reg;
            }

            const regularRevenue = reg * rate;
            const overtimeRevenue = ot * overtimeRate;
            revenue = regularRevenue + overtimeRevenue;
        }

        // Update forecast value
        updateForecastValue(updatedData.date, jobCode, hours);

        // Update the job code forecast with cost and revenue
        updateJobCodeForecast(updatedData.date, jobCode, hours, cost, revenue);
    };

    // Helper function to update job group forecast data
    const updateJobGroupForecast = (date: string, jobGroupId: string, totalHours: number) => {
        setForecastJobGroups(prevGroups => {
            return prevGroups.map(group => {
                if (group.jobGroupId === jobGroupId) {
                    // Find or create the forecast entry for this date
                    const existingEntry = group.jobCodes?.find((jc: JobCodeForecastDto) => jc.date === date);
                    if (existingEntry) {
                        // Update existing entry
                        return {
                            ...group,
                            forecastHours: totalHours,
                            date: date,
                            jobCodes: group.jobCodes?.map((jc: JobCodeForecastDto) =>
                                jc.date === date ? { ...jc, forecastHours: totalHours } : jc
                            )
                        };
                    } else {
                        // Create new entry
                        return {
                            ...group,
                            forecastHours: totalHours,
                            date: date
                        };
                    }
                }
                return group;
            });
        });
    };

    /**
     * Updates job code forecast with cost and revenue, and aggregates revenue/cost to group level.
     * @param date string
     * @param jobCode string
     * @param hours number
     * @param cost number
     * @param revenue number
     */
    const updateJobCodeForecast = (date: string, jobCode: string, hours: number, cost: number, revenue: number) => {
        setForecastJobGroups(prevGroups => {
            return prevGroups.map(group => {
                let updatedJobCodes = group.jobCodes || [];

                // Find ALL job codes with the same jobCode value (there can be multiple with same jobCode but different IDs)
                const allMatchingJobCodes = updatedJobCodes.filter((jc: JobCodeForecastDto) => jc.jobCode === jobCode);

                // Check if any of them already exist for this date
                const existingJobCodeForDate = allMatchingJobCodes.find((jc: JobCodeForecastDto) => jc.date === date || jc.date === null);

                if (existingJobCodeForDate) {
                    // Update existing job code for this date
                    updatedJobCodes = updatedJobCodes.map((jc: JobCodeForecastDto) => {
                        if (jc.id === existingJobCodeForDate.id && jc.date === date) {
                            return {
                                ...jc,
                                forecastHours: hours,
                                forecastPayrollCost: cost,
                                forecastPayrollRevenue: revenue
                            };
                        }
                        return jc;
                    });
                } else {
                    // No job code exists for this date, create new entries for ALL job codes with this jobCode
                    allMatchingJobCodes.forEach((templateJobCode) => {
                        const newJobCode: JobCodeForecastDto = {
                            ...templateJobCode,
                            id: undefined, // New entry, let backend assign ID
                            date: date,
                            forecastHours: hours,
                            forecastPayrollCost: cost,
                            forecastPayrollRevenue: revenue
                        };
                        updatedJobCodes = [...updatedJobCodes, newJobCode];
                    });
                }

                // Calculate group totals for this date
                updatedJobCodes = updatedJobCodes.filter(jc => jc.date);
                const groupJobCodesForDate = updatedJobCodes.filter((jc: JobCodeForecastDto) => jc.date === date);

                const groupTotalHours = groupJobCodesForDate.reduce((sum: number, jc: JobCodeForecastDto) => sum + (jc.forecastHours || 0), 0);
                const groupTotalCost = groupJobCodesForDate.reduce((sum: number, jc: JobCodeForecastDto) => sum + (jc.forecastPayrollCost || 0), 0);
                const groupTotalRevenue = groupJobCodesForDate.reduce((sum: number, jc: JobCodeForecastDto) => sum + (jc.forecastPayrollRevenue || 0), 0);

                return {
                    ...group,
                    jobCodes: updatedJobCodes,
                    forecastHours: groupTotalHours,
                    forecastPayrollCost: groupTotalCost,
                    forecastPayrollRevenue: groupTotalRevenue,
                    date: date
                };
            });
        });
    };

    // Effect to initialize job groups with fallback logic when data becomes available
    useEffect(() => {
        if (selectedSite && jobCodes.length > 0) {
            // If we don't have forecast data, initialize with fallback
            if (!forecastJobGroups || forecastJobGroups.length === 0) {
                const fallbackJobGroups = getJobGroupsWithFallback();
                if (fallbackJobGroups.length > 0) {
                    setForecastJobGroups(fallbackJobGroups);
                }
            }
        }
    }, [selectedSite, jobCodes, budgetPayrollDetails, forecastJobGroups]);

    useImperativeHandle(ref, () => ({
        save: handleSavePayroll
    }));

    return (
        <div className="w-full p-1 space-y-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Payroll Forecast</h1>
                    <p className="text-muted-foreground">Manage payroll hours for your staff and teams.</p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>

            {!shouldShowHRISWarning() && (
                <Button
                    variant="outline"
                    onClick={toggleGuide}
                    className="flex items-center gap-2"
                    data-qa-id="button-toggle-payroll-guide"
                >
                    <Info className="h-4 w-4" />
                    {isGuideOpen ? "Hide Guide" : "Show Guide"}
                    {isGuideOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            )}

            {!shouldShowHRISWarning() && isGuideOpen && (
                <div className="space-y-4 p-4 border rounded-md bg-muted/20 mb-6">
                    <h3 className="text-lg font-medium mb-2">Getting Started with Payroll Forecasting</h3>
                    <p>This page allows you to view and manage payroll hours across multiple job roles for the selected month.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold mb-2">Using the Timeline Interface</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Navigate between weeks using the arrow buttons</li>
                                <li>View scheduled and actual data on the left panel</li>
                                <li>Adjust forecast values on the right panel</li>
                                <li>Click on the bars to expand job breakdown details</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Important Notes</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Past dates show actual vs scheduled variance</li>
                                <li>Future dates can be edited in the forecast panel</li>
                                <li>Toggle between hours and cost views for different perspectives</li>
                                <li>Job filter allows focusing on specific job roles</li>
                            </ul>
                        </div>
                    </div>
                    <Alert>
                        <AlertDescription>
                            When you click "Save Payroll Forecast", all your forecast values will be saved for the selected month.
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            {shouldShowHRISWarning() ? (
                <Card className="w-full">
                    <CardContent className="p-8">
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center">
                                <Info className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-gray-600 dark:text-blue-500">
                                    Please contact HRIS team for Job Code assignment
                                </h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="w-full relative">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Labor Hours & Cost Timeline</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePreviousWeek}
                                data-qa-id="button-previous-week"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-medium">
                                {weeks.length > 0 ?
                                    formatDateRange(currentWeek.start, currentWeek.end) :
                                    "No dates available"}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleNextWeek}
                                data-qa-id="button-next-week"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center h-14 mb-6">
                                        <h3 className="font-semibold">Scheduled & Actual Data</h3>
                                        <div className="flex items-center justify-end h-9">
                                            <Badge variant="outline" className="flex items-center">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                Legion Data
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {isLoadingPayroll ? (
                                            <Skeleton className="h-[400px] w-full" />
                                        ) : (
                                            currentWeek.dates.map((date) => {
                                                const dateKey = formatDateKey(date);
                                                const isExpanded = expandedDates[dateKey] || false;
                                                // Use job group level data for accurate totals in Scheduled & Actual Data section
                                                const scheduledTotal = getGroupTotalForDate(dateKey, scheduledGroupData);
                                                const actualTotal = getGroupTotalForDate(dateKey, actualGroupData);
                                                const hasActualValue = hasActualData(dateKey);
                                                const variance = getVariancePercentage(dateKey);

                                                return (
                                                    <Collapsible
                                                        key={dateKey}
                                                        className="relative"
                                                        open={isExpanded}
                                                        data-qa-id={`collapsible-scheduled-${dateKey}`}
                                                    >
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-sm font-medium">
                                                                {formatDateDisplay(date)}
                                                            </span>
                                                            <span className="flex flex-col items-end text-sm">
                                                                <span>
                                                                    {hasActualValue ?
                                                                        `${actualTotal.toFixed(1)} hrs (${formatCurrency(actualTotal * DEFAULT_HOURLY_RATE)})` :
                                                                        "No actual data yet"}
                                                                    
                                                                </span>
                                                            </span>
                                                        </div>

                                                        <div
                                                            className="h-8 bg-muted rounded-md overflow-hidden relative cursor-pointer hover:bg-muted/80"
                                                            onClick={() => toggleDateExpand(dateKey)}
                                                            data-qa-id={`button-toggle-date-${dateKey}`}
                                                        >
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div className="absolute inset-0">
                                                                            <div
                                                                                className="absolute top-0 h-full opacity-0"
                                                                                style={{
                                                                                    left: `${getBarWidth(getMaxValueForDate(dateKey))}%`
                                                                                }}
                                                                            >&nbsp;</div>

                                                                            {hasActualValue && actualTotal >= scheduledTotal ? (
                                                                                <>
                                                                                    <div
                                                                                        className="absolute top-0 left-0 h-full bg-orange-500/70 rounded-md border-r-2 border-orange-700"
                                                                                        style={{ width: `${getBarWidth(actualTotal)}%` }}
                                                                                    ></div>
                                                                                    <div
                                                                                        className="absolute top-0 left-0 h-full bg-blue-500/70 rounded-md z-10"
                                                                                        style={{ width: `${getBarWidth(scheduledTotal)}%` }}
                                                                                    ></div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <div
                                                                                        className="absolute top-0 left-0 h-full bg-blue-500/70 rounded-md"
                                                                                        style={{ width: `${getBarWidth(scheduledTotal)}%` }}
                                                                                    ></div>
                                                                                    {hasActualValue && (
                                                                                        <div
                                                                                            className="absolute top-0 left-0 h-full bg-orange-500/70 rounded-md border-r-2 border-orange-700 z-10"
                                                                                            style={{ width: `${getBarWidth(actualTotal)}%` }}
                                                                                        ></div>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent side="top" className="w-48">
                                                                        <div className="space-y-1">
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex items-center">
                                                                                    <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                                                                                    <span className="text-xs">Scheduled:</span>
                                                                                </div>
                                                                                <span className="text-xs font-medium">
                                                                                    {getDisplayValue(scheduledTotal)}
                                                                                </span>
                                                                            </div>
                                                                            {hasActualValue && (
                                                                                <div className="flex items-center justify-between">
                                                                                    <div className="flex items-center">
                                                                                        <div className="w-3 h-3 bg-orange-500 rounded-sm mr-2"></div>
                                                                                        <span className="text-xs">Actual:</span>
                                                                                    </div>
                                                                                    <span className="text-xs font-medium">
                                                                                        {getDisplayValue(actualTotal)}
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                            {hasActualValue && (
                                                                                <div className="flex items-center justify-between pt-1 border-t border-border/50">
                                                                                    <span className="text-xs">Variance:</span>
                                                                                    <span className={`text-xs font-medium ${variance > 0 ? "text-red-500" : "text-green-500"}`}>
                                                                                        {variance > 0 ? "+" : ""}
                                                                                        {variance.toFixed(1)}%
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>

                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="absolute right-1 bottom-1 h-6 w-6 p-0 bg-background/80 hover:bg-background"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleDateExpand(dateKey);
                                                                }}
                                                                data-qa-id={`button-expand-date-${dateKey}`}
                                                            >
                                                                <ChevronDown
                                                                    className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                                                />
                                                            </Button>
                                                        </div>

                                                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                            <span className="text-muted-foreground text-xs">
                                                                Scheduled: {`${scheduledTotal.toFixed(1)} hrs (${formatCurrency(scheduledTotal * DEFAULT_HOURLY_RATE)})`}
                                                            </span>
                                                            {hasActualValue && (
                                                                <span className={variance > 0 ? "text-red-500" : "text-green-500"}>
                                                                    {variance > 0 ? "+" : ""}
                                                                    {variance.toFixed(1)}%
                                                                </span>
                                                            )}
                                                        </div>

                                                        <CollapsibleContent className="mt-2 pl-4 border-l-2 border-muted">
                                                            {(() => {
                                                                const contractType = payrollData ? determineContractType(payrollData, contractDetails) : "Standard";

                                                                // Group scheduled and actual details by group and code, similar to forecast/budget
                                                                // Use scheduledPayrollDetails and actualPayrollDetails for the real breakdown
                                                                // Group by jobGroupId and jobGroupName using jobCodes from the endpoint

                                                                // Build a group map
                                                                const groupMap: Record<string, { jobGroupId: string, jobGroupName: string, jobCodes: any[] }> = {};

                                                                // Use jobCodes from the endpoint to get the group-code relationship
                                                                jobCodes.forEach(jc => {
                                                                    const groupId = jc.jobGroupId || "unknown-group";
                                                                    const groupName = jc.jobGroupName || "Unknown Group";
                                                                    if (!groupMap[groupId]) {
                                                                        groupMap[groupId] = { jobGroupId: groupId, jobGroupName: groupName, jobCodes: [] };
                                                                    }
                                                                    groupMap[groupId].jobCodes.push({
                                                                        jobCode: jc.jobCode,
                                                                        displayName: jc.jobTitle || jc.name || jc.jobCode
                                                                    });
                                                                });

                                                                    // For each group, filter only the codes that have data in scheduled or actual for the date
                                                                    // Then sort jobGroups and jobCodes alphabetically
                                                                    const jobGroups = Object.values(groupMap)
                                                                        .map(group => {
                                                                            const filteredJobCodes = group.jobCodes
                                                                                .filter(jc =>
                                                                                    (scheduledData[dateKey]?.[jc.jobCode] ?? 0) > 0 ||
                                                                                    (actualData[dateKey]?.[jc.jobCode] ?? 0) > 0
                                                                                )
                                                                                .sort((a, b) =>
                                                                                    (a.displayName || a.jobCode || "").localeCompare(b.displayName || b.jobCode || "")
                                                                                );
                                                                            return {
                                                                                ...group,
                                                                                jobCodes: filteredJobCodes
                                                                            };
                                                                        })
                                                                        .filter(group => group.jobCodes.length > 0)
                                                                        .sort((a, b) =>
                                                                            (a.jobGroupName || "").localeCompare(b.jobGroupName || "")
                                                                        );


                                                                if (contractType === "PerLaborHour") {
                                                                    // Render group and code breakdown with collapsible for job codes (like right panel)
                                                                    return jobGroups.map((jobGroup) => {
                                                                        const isJobGroupExpanded = expandedJobGroups.has(`${dateKey}-${jobGroup.jobGroupId}`);
                                                                        const jobsInGroup = jobGroup.jobCodes || [];

                                                                        const toggleGroup = (e: React.MouseEvent) => {
                                                                            e.stopPropagation();
                                                                            toggleJobGroupExpansion(`${dateKey}-${jobGroup.jobGroupId}`);
                                                                        };

                                                                        // Get totals for the group from job group level data (not aggregated from job codes)
                                                                        const scheduledHours = scheduledGroupData[dateKey]?.[jobGroup.jobGroupId] || 0;
                                                                        const actualHours = actualGroupData[dateKey]?.[jobGroup.jobGroupId] || 0;
                                                                        const jobVariance = scheduledHours === 0 ? 0 : ((actualHours - scheduledHours) / scheduledHours) * 100;

                                                                        return (
                                                                            <div key={`${dateKey}-${jobGroup.jobGroupId}`} className="mb-3">
                                                                                <div
                                                                                    className="flex justify-between items-center text-xs mb-1 cursor-pointer hover:bg-muted/50 p-1 rounded"
                                                                                    onClick={toggleGroup}
                                                                                >
                                                                                    <span className="font-medium">{jobGroup.jobGroupName}</span>
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span>
                                                                                            {hasActualValue ?
                                                                                                getDisplayValue(actualHours) :
                                                                                                getDisplayValue(scheduledHours)}
                                                                                        </span>
                                                                                        <ChevronDown className={`h-3 w-3 ${isJobGroupExpanded ? "rotate-180" : ""}`} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="h-4 bg-muted/50 rounded overflow-hidden relative mb-2">
                                                                                    {/* Blue: Scheduled (scaled to group/parent total) */}
                                                                                    <div
                                                                                        className="absolute top-0 left-0 h-full bg-blue-500/70 rounded-md"
                                                                                        style={{
                                                                                            width: `${scheduledTotal > 0
                                                                                                ? Math.max(1, (scheduledHours / scheduledTotal) * 100)
                                                                                                : 0
                                                                                                }%`
                                                                                        }}
                                                                                    ></div>
                                                                                    {/* Orange: Actual (scaled to group/parent total) */}
                                                                                    <div
                                                                                        className="absolute top-0 left-0 h-full bg-orange-500/70 rounded-md border-r-2 border-orange-700 z-10"
                                                                                        style={{
                                                                                            width: `${scheduledTotal > 0
                                                                                                ? Math.max(1, (actualHours / scheduledTotal) * 100)
                                                                                                : 0
                                                                                                }%`
                                                                                        }}
                                                                                    ></div>
                                                                                </div>
                                                                                {isJobGroupExpanded && (
                                                                                    <div className="mt-2 space-y-2 pl-4 border-l-2 border-muted">
                                                                                        {(() => {
                                                                                            // Calculate group scheduled total for scaling
                                                                                            const groupScheduledTotal = jobsInGroup.reduce((sum, jc) => sum + (scheduledData[dateKey]?.[jc.jobCode] || 0), 0);

                                                                                            return jobsInGroup.map((jobCode) => {
                                                                                                const scheduledHours = scheduledData[dateKey]?.[jobCode.jobCode] || 0;
                                                                                                const actualHours = actualData[dateKey]?.[jobCode.jobCode] || 0;
                                                                                                const jobVariance = getVariancePercentage(dateKey, jobCode.jobCode);

                                                                                                // Both bars are scaled relative to group scheduled total
                                                                                                const scheduledWidth = groupScheduledTotal > 0 ? (scheduledHours / groupScheduledTotal) * 100 : 0;
                                                                                                const actualWidth = groupScheduledTotal > 0 ? (actualHours / groupScheduledTotal) * 100 : 0;

                                                                                                return (
                                                                                                    <div key={`${dateKey}-${jobCode.jobCode}`} className="mb-2">
                                                                                                        <div className="flex justify-between items-center mb-1">
                                                                                                            <span className="text-xs font-medium">{jobCode.displayName || jobCode.jobCode}</span>
                                                                                                            <span className="text-xs">
                                                                                                                {hasActualValue ?
                                                                                                                    getDisplayValue(actualHours, jobCode.jobCode) :
                                                                                                                    getDisplayValue(scheduledHours, jobCode.jobCode)}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <div className="h-4 bg-muted rounded-md overflow-hidden relative">
                                                                                                            <TooltipProvider>
                                                                                                                <Tooltip>
                                                                                                                    <TooltipTrigger asChild>
                                                                                                                        <div className="absolute inset-0">
                                                                                                                            {/* Blue: Scheduled (scaled to group scheduled total) */}
                                                                                                                            <div
                                                                                                                                className="absolute top-0 left-0 h-full bg-blue-500/70 rounded-md"
                                                                                                                                style={{
                                                                                                                                    width: `${scheduledWidth}%`
                                                                                                                                }}
                                                                                                                            ></div>
                                                                                                                            {/* Orange: Actual (scaled to group scheduled total) */}
                                                                                                                            <div
                                                                                                                                className="absolute top-0 left-0 h-full bg-orange-500/70 rounded-md border-r-2 border-orange-700 z-10"
                                                                                                                                style={{
                                                                                                                                    width: `${actualWidth}%`
                                                                                                                                }}
                                                                                                                            ></div>
                                                                                                                        </div>
                                                                                                                    </TooltipTrigger>
                                                                                                                    <TooltipContent side="top" className="w-48">
                                                                                                                        <div className="space-y-1">
                                                                                                                            <div className="flex items-center justify-between">
                                                                                                                                <div className="flex items-center">
                                                                                                                                    <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                                                                                                                                    <span className="text-xs">Scheduled:</span>
                                                                                                                                </div>
                                                                                                                                <span className="text-xs font-medium">
                                                                                                                                    {getDisplayValue(scheduledHours, jobCode.jobCode)}
                                                                                                                                </span>
                                                                                                                            </div>
                                                                                                                            {hasActualValue && (
                                                                                                                                <div className="flex items-center justify-between">
                                                                                                                                    <div className="flex items-center">
                                                                                                                                        <div className="w-3 h-3 bg-orange-500 rounded-sm mr-2"></div>
                                                                                                                                        <span className="text-xs">Actual:</span>
                                                                                                                                    </div>
                                                                                                                                    <span className="text-xs font-medium">
                                                                                                                                        {getDisplayValue(actualHours, jobCode.jobCode)}
                                                                                                                                    </span>
                                                                                                                                </div>
                                                                                                                            )}
                                                                                                                            {hasActualValue && (
                                                                                                                                <div className="flex items-center justify-between pt-1 border-t border-border/50">
                                                                                                                                    <span className="text-xs">Variance:</span>
                                                                                                                                    <span className={`text-xs font-medium ${jobVariance > 0 ? "text-red-500" : "text-green-500"}`}>
                                                                                                                                        {jobVariance > 0 ? "+" : ""}
                                                                                                                                        {jobVariance.toFixed(1)}%
                                                                                                                                    </span>
                                                                                                                                </div>
                                                                                                                            )}
                                                                                                                        </div>
                                                                                                                    </TooltipContent>
                                                                                                                </Tooltip>
                                                                                                            </TooltipProvider>
                                                                                                        </div>
                                                                                                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                                                                            <span>
                                                                                                                {hasActualValue ?
                                                                                                                    `Actual: ${getDisplayValue(actualHours, jobCode.jobCode)}` :
                                                                                                                    ""}
                                                                                                            </span>
                                                                                                            {hasActualValue && (
                                                                                                                <span className={jobVariance > 0 ? "text-red-500" : "text-green-500"}>
                                                                                                                    {jobVariance > 0 ? "+" : ""}
                                                                                                                    {jobVariance.toFixed(1)}%
                                                                                                                </span>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                );
                                                                                            });
                                                                                        })()}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    });
                                                                } else {
                                                                    // Standard: Show jobGroup progress bar and then jobCodes breakdown, read-only
                                                                    return jobGroups.map((jobGroup) => {
                                                                        const groupKey = `${dateKey}-${jobGroup.jobGroupId}`;
                                                                        const isGroupExpanded = expandedJobGroups.has(groupKey);
                                                                        const jobsInGroup = jobGroup.jobCodes || [];
                                                                        // Get totals for the group from job group level data (not aggregated from job codes)
                                                                        const scheduledHours = scheduledGroupData[dateKey]?.[jobGroup.jobGroupId] || 0;
                                                                        const actualHours = actualGroupData[dateKey]?.[jobGroup.jobGroupId] || 0;

                                                                        const toggleGroup = (e: React.MouseEvent) => {
                                                                            e.stopPropagation();
                                                                            toggleJobGroupExpansion(groupKey);
                                                                        };

                                                                        return (
                                                                            <div key={groupKey} className="relative">
                                                                                <div
                                                                                    className="flex justify-between items-center text-xs mb-1 cursor-pointer hover:bg-muted/50 p-1 rounded"
                                                                                    onClick={toggleGroup}
                                                                                >
                                                                                    <span className="font-medium">{jobGroup.jobGroupName}</span>
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className="flex items-center">
                                                                                            <span>
                                                                                                {`${actualHours.toFixed(1)} hrs (${formatCurrency(actualHours * DEFAULT_HOURLY_RATE)})`}
                                                                                            </span>
                                                                                            <span className="text-muted-foreground text-xs ml-2">
                                                                                                (Scheduled: {`${scheduledHours.toFixed(1)} hrs (${formatCurrency(scheduledHours * DEFAULT_HOURLY_RATE)})`})
                                                                                            </span>
                                                                                        </span>
                                                                                        <ChevronDown className={`h-3 w-3 ${isGroupExpanded ? "rotate-180" : ""}`} />
                                                                                    </div>
                                                                                </div>
                                                                                {/* Group progress bar */}
                                                                                <div className="h-4 bg-muted rounded-md overflow-hidden relative mb-2">
                                                                                    <div className="absolute inset-0">
                                                                                        <div
                                                                                            className="absolute top-0 h-full opacity-0"
                                                                                            style={{
                                                                                                left: `${getBarWidth(Math.max(scheduledHours, actualHours))}%`
                                                                                            }}
                                                                                        >&nbsp;</div>
                                                                                        {actualHours >= scheduledHours ? (
                                                                                            <>
                                                                                                <div
                                                                                                    className="absolute top-0 left-0 h-full bg-orange-500/70 rounded-md border-r-2 border-orange-700"
                                                                                                    style={{ width: `${getBarWidth(actualHours)}%` }}
                                                                                                ></div>
                                                                                                <div
                                                                                                    className="absolute top-0 left-0 h-full bg-blue-500/70 rounded-md z-10"
                                                                                                    style={{ width: `${getBarWidth(scheduledHours)}%` }}
                                                                                                ></div>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <div
                                                                                                    className="absolute top-0 left-0 h-full bg-blue-500/70 rounded-md"
                                                                                                    style={{ width: `${getBarWidth(scheduledHours)}%` }}
                                                                                                ></div>
                                                                                                <div
                                                                                                    className="absolute top-0 left-0 h-full bg-orange-500/70 rounded-md border-r-2 border-orange-700 z-10"
                                                                                                    style={{ width: `${getBarWidth(actualHours)}%` }}
                                                                                                ></div>
                                                                                            </>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                {isGroupExpanded && (
                                                                                    <div className="mt-2 space-y-2 pl-4 border-l-2 border-muted">
                                                                                        {jobsInGroup.map((jc) => {
                                                                                            const jobScheduled = scheduledData[dateKey]?.[jc.jobCode] || 0;
                                                                                            const jobActual = actualData[dateKey]?.[jc.jobCode] || 0;
                                                                                            const hasJobActual = jobActual > 0;
                                                                                            return (
                                                                                                <div
                                                                                                    key={`${groupKey}-${jc.jobCode}`}
                                                                                                    className="relative group"
                                                                                                    title={`Job Code: ${jc.jobCode}`}
                                                                                                >
                                                                                                    <div className="flex justify-between items-center text-xs mb-1">
                                                                                                        <span className="cursor-help hover:text-blue-600 transition-colors">
                                                                                                            {jc.displayName}
                                                                                                        </span>
                                                                                                        <div className="flex items-center gap-2">
                                                                                                            <span className="flex items-end text-xs">
                                                                                                                <span>
                                                                                                                    {`${jobActual.toFixed(1)} hrs (${formatCurrency(jobActual * DEFAULT_HOURLY_RATE)})`}
                                                                                                                </span>
                                                                                                                <span className="text-muted-foreground text-xs mt-1 block">
                                                                                                                    (S: {`${jobScheduled.toFixed(1)} hrs (${formatCurrency(jobScheduled * DEFAULT_HOURLY_RATE)})`})
                                                                                                                </span>
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="h-4 bg-muted/50 rounded overflow-hidden relative">
                                                                                                        {hasJobActual && (
                                                                                                            <div
                                                                                                                className="absolute top-0 left-0 h-full bg-orange-400/60 rounded"
                                                                                                                style={{ width: `${getBarWidth(jobActual)}%` }}
                                                                                                            ></div>
                                                                                                        )}
                                                                                                        <div
                                                                                                            className="absolute top-0 left-0 h-full bg-blue-400/60 rounded"
                                                                                                            style={{ width: `${getBarWidth(jobScheduled)}%` }}
                                                                                                        ></div>
                                                                                                    </div>
                                                                                                    {/* Tooltip for job code */}
                                                                                                    <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                                                                                                        Job Code: {jc.jobCode}
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    });
                                                                }
                                                            })()}
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                );
                                            })
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center h-14 mb-6">
                                        <h3 className="font-semibold">Forecast Data</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center text-xs space-x-1">
                                                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                                <span>Forecast</span>
                                            </div>
                                            <div className="flex items-center text-xs space-x-1">
                                                <div className="w-3 h-3 border-r-2 border-red-500"></div>
                                                <span>Budget</span>
                                            </div>
                                            <div className="flex items-center text-xs space-x-1">
                                                <Edit3 className="w-3 h-3" />
                                                <span>Click to edit</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {isLoadingPayroll ? (
                                            <Skeleton className="h-[400px] w-full" />
                                        ) : (
                                            currentWeek.dates.map((date) => {
                                                const dateKey = formatDateKey(date);
                                                const isDayExpanded = expandedDays.has(dateKey);
                                                const forecastTotal = getTotalForDate(dateKey, forecastData);
                                                const budgetTotal = getTotalForDate(dateKey, budgetData);
                                                const variancePercentage = budgetTotal > 0 ? ((forecastTotal - budgetTotal) / budgetTotal) * 100 : 0;
                                                const hasSignificantVariance = Math.abs(variancePercentage) > 10;
                                                const isFuture = isFutureDate(date);
                                                const contractType = payrollData ? determineContractType(payrollData, contractDetails) : "Standard";
                                                let jobGroups = getJobGroupsWithFallback()
                                                    .map(group => ({
                                                        ...group,
                                                        jobCodes: (group.jobCodes || [])
                                                            .map((code) => ({
                                                                ...code,
                                                                date: code.date || dateKey,
                                                            }))
                                                            .filter(jc => jc.date === dateKey)
                                                            .sort((a, b) =>
                                                                (a.displayName || a.jobCode || "").localeCompare(
                                                                    b.displayName || b.jobCode || ""
                                                                )
                                                            )
                                                    }))
                                                    .filter(group => group.jobCodes.length > 0)
                                                    .sort((a, b) =>
                                                        (a.jobGroupName || "").localeCompare(b.jobGroupName || "")
                                                    );

                                                return (
                                                    <div key={dateKey} className="relative">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-sm font-medium">{formatDateDisplay(date)}</span>
                                                            <span className="text-sm flex items-center">
                                                                {(() => {
                                                                    const groups = getJobGroupsWithFallback().filter(g => g.date === dateKey);
                                                                    const groupCost = groups.reduce((sum, group) => {
                                                                        return sum + (group.jobCodes?.reduce((s, jc) => s + (jc.forecastPayrollCost || 0), 0) || 0);
                                                                    }, 0);
                                                                    return `${forecastTotal.toFixed(1)} hrs (${formatCurrency(groupCost)})`;
                                                                })()}
                                                                {hasSignificantVariance && (
                                                                    <span
                                                                        className="ml-1 text-yellow-500"
                                                                        title={`${Math.abs(variancePercentage).toFixed(1)}% ${variancePercentage > 0 ? "above" : "below"
                                                                            } budget`}
                                                                    >
                                                                        ⚠
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="h-8 bg-muted rounded-md overflow-hidden relative cursor-pointer hover:bg-muted/80"
                                                            onClick={() => toggleDayExpansion(dateKey)}
                                                        >
                                                            <div className="absolute inset-0">
                                                                <div
                                                                    className="absolute top-0 left-0 h-full bg-green-500/70 rounded-md"
                                                                    style={{
                                                                        width: `${(() => {
                                                                            const maxVal = Math.max(forecastTotal, budgetTotal, getTotalForDate(dateKey, actualData));
                                                                            return maxVal > 0 ? Math.min(100, (forecastTotal / maxVal) * 100) : 0;
                                                                        })()
                                                                            }%`
                                                                    }}
                                                                ></div>
                                                                <div
                                                                    className="absolute top-0 h-full border-r-4 border-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)] z-20"
                                                                    style={{
                                                                        left: `${(() => {
                                                                            const maxVal = Math.max(forecastTotal, budgetTotal, getTotalForDate(dateKey, actualData));
                                                                            return maxVal > 0 ? Math.min(100, (budgetTotal / maxVal) * 100) : 0;
                                                                        })()
                                                                            }%`,
                                                                        height: "100%",
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="absolute right-1 bottom-1 h-6 w-6 p-0 bg-background/80 hover:bg-background"
                                                            >
                                                                <ChevronDown className={`h-4 w-4 ${isDayExpanded ? "rotate-180" : ""}`} />
                                                            </Button>
                                                        </div>
                                                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                            <span>
                                                                Budget: {`${budgetTotal.toFixed(1)} hrs (${formatCurrency(budgetTotal * DEFAULT_HOURLY_RATE)})`}
                                                                {hasSignificantVariance && (
                                                                    <span className={`ml-1 ${variancePercentage > 0 ? "text-green-500" : "text-red-500"}`}>
                                                                        ({variancePercentage > 0 ? "+" : ""}
                                                                        {variancePercentage.toFixed(1)}%)
                                                                    </span>
                                                                )}
                                                            </span>
                                                            <span>{isFuture ? "Future" : "Past"}</span>
                                                        </div>

                                                        {isDayExpanded && (
                                                            <div className="mt-2 space-y-2 pl-4 border-l-2 border-muted">
                                                                {jobGroups.map((jobGroup) => {
                                                                    const isJobGroupExpanded = expandedJobGroups.has(`${dateKey}-${jobGroup.jobGroupId}`);
                                                                    const jobsInGroup = jobGroup.jobCodes || [];

                                                                    const toggleGroup = (e: React.MouseEvent) => {
                                                                        e.stopPropagation();
                                                                        toggleJobGroupExpansion(`${dateKey}-${jobGroup.jobGroupId}`);
                                                                    };

                                                                    const totalGroupForecast = jobsInGroup.reduce((sum, jc) => {
                                                                        const code = jc.jobCode;
                                                                        return sum + (code ? (forecastData[dateKey]?.[code] || 0) : 0);
                                                                    }, 0);
                                                                    const totalGroupBudget = jobsInGroup.reduce((sum, jc) => {
                                                                        const code = jc.jobCode;
                                                                        return sum + (code ? (budgetData[dateKey]?.[code] || 0) : 0);
                                                                    }, 0);
                                                                    const jobVariance = totalGroupBudget > 0 ? ((totalGroupForecast - totalGroupBudget) / totalGroupBudget) * 100 : 0;
                                                                    const hasJobSignificantVariance = Math.abs(jobVariance) > 10;

                                                                    return (
                                                                        <div key={`${dateKey}-${jobGroup.jobGroupId}`} className="relative">
                                                                            <div
                                                                                className="flex justify-between items-center text-xs mb-1 cursor-pointer hover:bg-muted/50 p-1 rounded"
                                                                                onClick={toggleGroup}
                                                                            >
                                                                                <span className="font-medium">{jobGroup.jobGroupName}</span>
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="flex items-center">
                                                                                        {(() => {
                                                                                            const groupForecastHours = jobsInGroup.reduce((sum, jc) => {
                                                                                                if (!jc.jobCode) return sum;
                                                                                                return sum + (forecastData[dateKey]?.[jc.jobCode] || 0);
                                                                                            }, 0);
                                                                                            const groupForecastCost = jobsInGroup.reduce((sum, jc) => {
                                                                                                if (!jc.jobCode) return sum;
                                                                                                const hours = forecastData[dateKey]?.[jc.jobCode] || 0;
                                                                                                const codeInfo = jobCodes.find(jcInfo => jcInfo.jobCode === jc.jobCode);
                                                                                                const rate = codeInfo?.averageHourlyRate ?? DEFAULT_HOURLY_RATE;
                                                                                                return sum + hours * rate;
                                                                                            }, 0);
                                                                                            return `${groupForecastHours.toFixed(1)} hrs (${formatCurrency(groupForecastCost)})`;
                                                                                        })()}
                                                                                        {hasJobSignificantVariance && (
                                                                                            <span
                                                                                                className="ml-1 text-yellow-500"
                                                                                                title={`${Math.abs(jobVariance).toFixed(1)}% ${jobVariance > 0 ? "above" : "below"
                                                                                                    } budget`}
                                                                                            >
                                                                                                ⚠
                                                                                            </span>
                                                                                        )}
                                                                                    </span>
                                                                                    <span className="text-muted-foreground">
                                                                                        (Budget: {`${totalGroupBudget.toFixed(1)} hrs (${formatCurrency(totalGroupBudget * DEFAULT_HOURLY_RATE)})`})
                                                                                    </span>
                                                                                    <ChevronDown className={`h-3 w-3 ${isJobGroupExpanded ? "rotate-180" : ""}`} />
                                                                                </div>
                                                                            </div>

                                                                            <div
                                                                                className={`h-4 bg-muted/50 rounded overflow-hidden relative mb-2 ${contractType !== "PerLaborHour" && isFuture ? "cursor-pointer hover:bg-green-200/50 group" : ""
                                                                                    }`}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    if (contractType !== "PerLaborHour" && isFuture) {
                                                                                        openEditDialog(dateKey, jobsInGroup[0]?.jobCode);
                                                                                    }
                                                                                }}
                                                                                title={
                                                                                    contractType !== "PerLaborHour"
                                                                                        ? "Click to edit job group forecast"
                                                                                        : undefined
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className="absolute top-0 left-0 h-full bg-green-400/60 rounded"
                                                                                    style={{ width: `${Math.min(100, (totalGroupForecast / 100) * 100)}%` }}
                                                                                ></div>
                                                                                <div
                                                                                    className="absolute top-0 h-full border-r-2 border-red-500 z-10"
                                                                                    style={{
                                                                                        left: `${Math.min(100, (totalGroupBudget / 100) * 100)}%`,
                                                                                        height: "100%",
                                                                                    }}
                                                                                ></div>
                                                                                {contractType !== "PerLaborHour" && isFuture && (
                                                                                    <Edit3 className="absolute right-1 top-0.5 h-3 w-3 text-green-600 group-hover:opacity-100 opacity-100 transition-opacity" />
                                                                                )}
                                                                            </div>

                                                                            {isJobGroupExpanded && (
                                                                                <div className="mt-2 space-y-2 pl-4 border-l-2 border-muted">
                                                                                    {jobsInGroup.map((jobMapping) => {
                                                                                        const jobCode = jobMapping.jobCode;
                                                                                        if (!jobCode) return null;
                                                                                        const jobForecast = forecastData[dateKey]?.[jobCode] || 0;
                                                                                        const jobBudget = budgetData[dateKey]?.[jobCode] || 0;
                                                                                        const jobVariance = jobBudget > 0 ? ((jobForecast - jobBudget) / jobBudget) * 100 : 0;
                                                                                        const hasJobSignificantVariance = Math.abs(jobVariance) > 10;

                                                                                        return (
                                                                                            <div
                                                                                                key={`${dateKey}-${jobCode}`}
                                                                                                className="relative group"
                                                                                                title={
                                                                                                    contractType !== "PerLaborHour"
                                                                                                        ? `Job Code: ${jobCode}`
                                                                                                        : contractType === "PerLaborHour"
                                                                                                            ? `Job Code: ${jobCode} - Click to edit`
                                                                                                            : undefined
                                                                                                }
                                                                                            >
                                                                                                <div className="flex justify-between items-center text-xs mb-1">
                                                                                                    <span className="cursor-help hover:text-blue-600 transition-colors flex items-center">
                                                                                                        {jobMapping.displayName || jobMapping.jobCode}
                                                                                                    </span>
                                                                                                    <div className="flex items-center gap-2">
                                                                                                        <span className="flex items-center">
                                                                                                            {(() => {
                                                                                                                const codeInfo = jobCodes.find(jcInfo => jcInfo.jobCode === jobCode);
                                                                                                                const rate = codeInfo?.averageHourlyRate ?? DEFAULT_HOURLY_RATE;
                                                                                                                return `${jobForecast.toFixed(1)} hrs (${formatCurrency(jobForecast * rate)})`;
                                                                                                            })()}
                                                                                                            {hasJobSignificantVariance && (
                                                                                                                <span
                                                                                                                    className="ml-1 text-yellow-500"
                                                                                                                    title={`${Math.abs(jobVariance).toFixed(1)}% ${jobVariance > 0 ? "above" : "below"
                                                                                                                        } budget`}
                                                                                                                >
                                                                                                                    ⚠
                                                                                                                </span>
                                                                                                            )}
                                                                                                        </span>
                                                                                                        <span className="text-muted-foreground text-xs">
                                                                                                            (B: {`${jobBudget.toFixed(1)} hrs (${formatCurrency(jobBudget * DEFAULT_HOURLY_RATE)})`})
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className={`h-4 bg-muted/50 rounded overflow-hidden relative ${contractType === "PerLaborHour" && isFuture ? "cursor-pointer hover:bg-green-200/50" : ""
                                                                                                        }`}
                                                                                                    onClick={(e) => {
                                                                                                        e.stopPropagation();
                                                                                                        if (contractType === "PerLaborHour" && isFuture) {
                                                                                                            openEditDialog(dateKey, jobCode);
                                                                                                        }
                                                                                                    }}
                                                                                                >
                                                                                                    <div
                                                                                                        className="absolute top-0 left-0 h-full bg-green-400/60 rounded"
                                                                                                        style={{ width: `${Math.min(100, (jobForecast / 100) * 100)}%` }}
                                                                                                    ></div>
                                                                                                    <div
                                                                                                        className="absolute top-0 h-full border-r-2 border-red-500 z-10"
                                                                                                        style={{
                                                                                                            left: `${Math.min(100, (jobBudget / 100) * 100)}%`,
                                                                                                            height: "100%",
                                                                                                        }}
                                                                                                    ></div>
                                                                                                    {contractType === "PerLaborHour" && isFuture && (
                                                                                                        <Edit3 className="absolute right-1 top-0.5 h-3 w-3 text-green-600" />
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>


                    </CardContent>
                </Card>
            )}

            {currentEditData && (
                <ForecastEditDialog
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    dayData={currentEditData}
                    onSave={handleSaveEdit}
                    jobRoles={jobRoles}
                />
            )}
        </div>
    );
});

export default PayrollForecast;
