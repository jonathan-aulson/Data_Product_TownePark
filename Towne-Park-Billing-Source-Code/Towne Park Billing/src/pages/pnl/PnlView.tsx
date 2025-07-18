import { CustomerFilter, SelectedFilters } from "@/components/CustomerFilter/CustomerFilter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCustomer } from "@/contexts/CustomerContext";
import { CustomerSummary } from "@/lib/models/GeneralInfo";
import { PnlResponse } from "@/lib/models/Pnl";
import { formatCurrency, getCurrentMonthIdx } from "@/lib/utils";
import { ChevronDown, ChevronUp, Filter, Info } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const VARIANCE_LEVEL_HIGH = 7.5;
const VARIANCE_LEVEL_MEDIUM = 5;

function getVarianceClass(variance: number, percent: number) {
    const absPercent = Math.abs(percent);
    if (variance > 0) {
        if (absPercent >= VARIANCE_LEVEL_HIGH) {
            return "text-black dark:text-green-400 font-bold";
        } else {
            return "text-black dark:text-green-300";
        }
    }
    if (variance < 0) {
        if (absPercent >= VARIANCE_LEVEL_HIGH) {
            return "text-red-600 dark:text-red-400 font-bold";
        } else {
            return "text-red-500 dark:text-red-300";
        }
    }
    return "text-gray-500 dark:text-gray-400";
}

const CODE_TO_API_COLUMN: Record<string, string> = {
    externalRevenue: "ExternalRevenue",
    internalRevenue: "InternalRevenue",
    payroll: "Payroll",
    claims: "Claims",
    parkingRents: "ParkingRents",
    otherExpense: "OtherExpense",
    pteb: "Pteb",
    insurance: "Insurance",
    flc: "FLC",
    flcCumulative: "FLC_CUMULATIVE",
};

function SkeletonTable() {
    return (
        <div className="w-full overflow-auto animate-pulse">
            <Table className="w-full table-fixed">
                <TableHeader>
                    <TableRow className="h-[50px]">
                        <TableHead className="sticky left-0 bg-muted w-[160px] z-30">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                        </TableHead>
                        {MONTHS.map((_, idx) => (
                            <TableHead key={idx} className="text-center p-2 w-[85px] z-20 bg-muted">
                                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
                            </TableHead>
                        ))}
                        <TableHead className="text-center p-2 w-[110px] z-20 bg-muted">
                            <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
                        </TableHead>
                        <TableHead className="text-center p-2 w-[85px] z-20 bg-muted">
                            <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(10)].map((_, rowIdx) => (
                        <TableRow key={rowIdx} className="h-[50px]">
                            <TableCell className="sticky left-0 bg-background w-[140px]">
                                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
                            </TableCell>
                            {MONTHS.map((_, idx) => (
                                <TableCell key={idx} className="text-right p-1 w-[70px] h-[50px]">
                                    <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
                                </TableCell>
                            ))}
                            <TableCell className="text-right p-1 w-[90px] h-[50px]">
                                <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-right p-1 w-[70px] h-[50px]">
                                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function AnimatedLoadingText() {
    const messages = [
        "Crunching numbers...",
        "Fetching P&L data...",
        "Aggregating sites...",
        "Almost there...",
        "Still working, please wait...",
    ];
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setIdx(i => (i + 1) % messages.length), 1800);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="w-full flex justify-center mt-4">
            <span className="text-sm text-blue-700 animate-pulse">{messages[idx]}</span>
        </div>
    );
}

function ProgressBar() {
    return (
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-loop-progress" />
            <style>
                {`
                @keyframes loop-progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-loop-progress {
                    width: 50%;
                    animation: loop-progress 1.5s ease-in-out infinite;
                }
                `}
            </style>
        </div>
    );
}

export default function PnlView() {
    const { customerId } = useParams<{ customerId?: string }>();
    const { selectedCustomer, setSelectedCustomerById, customerSummaries, fetchCustomerSummaries } = useCustomer();
    
    const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
    const [viewMode, setViewMode] = useState<"Forecast" | "Budget">("Forecast");
    const [showVariance, setShowVariance] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<SelectedFilters>({});
    const [loading, setLoading] = useState(true);
    const [pnlData, setPnlData] = useState<PnlResponse | null>(null);
    const [customers, setCustomers] = useState<CustomerSummary[]>([]);
    const [filteredSiteIds, setFilteredSiteIds] = useState<string[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [routeFilterApplied, setRouteFilterApplied] = useState(false);

    useEffect(() => {
        if (customerId && (!selectedCustomer || selectedCustomer.customerSiteId !== customerId)) {
            setSelectedCustomerById(customerId);
            
            if (customerSummaries.length === 0) {
                fetchCustomerSummaries();
            }
        }
    }, [customerId, selectedCustomer, setSelectedCustomerById, customerSummaries.length, fetchCustomerSummaries]);

    useEffect(() => {
        if (selectedCustomer) {
            const initialFilters: SelectedFilters = {
                site: [selectedCustomer.siteNumber]
            };
            setAppliedFilters(initialFilters);
        }
    }, [selectedCustomer]);

    useEffect(() => {
        if (customerId && customers.length > 0 && !routeFilterApplied) {
            setAppliedFilters({ site: [customerId] });
            setFilteredSiteIds([customerId]);
            setRouteFilterApplied(true);
        }
    }, [customerId, customers.length, routeFilterApplied]);

    function filterCustomersByFilters(customersList: CustomerSummary[], filters: SelectedFilters): string[] {
        let filtered = [...customersList];

        const legalEntityFilters = filters.legalEntity || [];
        if (legalEntityFilters.length > 0) {
            filtered = filtered.filter(c =>
                c.legalEntity && legalEntityFilters.includes(c.legalEntity)
            );
        }

        const regionFilters = filters.region || [];
        if (regionFilters.length > 0) {
            filtered = filtered.filter(c =>
                c.svpRegion && regionFilters.includes(c.svpRegion)
            );
        }

        const districtFilters = filters.district || [];
        if (districtFilters.length > 0) {
            filtered = filtered.filter(c =>
                c.district && districtFilters.includes(c.district)
            );
        }

        const siteFilters = filters.site || [];
        if (siteFilters.length > 0) {
            filtered = filtered.filter(c =>
                siteFilters.includes(c.siteNumber)
            );
        }

        const accountManagerFilters = filters.accountManager || [];
        if (accountManagerFilters.length > 0) {
            filtered = filtered.filter(c =>
                (c.accountManager && accountManagerFilters.includes(c.accountManager)) ||
                (c.districtManager && accountManagerFilters.includes(c.districtManager))
            );
        }

        const plCategoryFilters = filters.plCategory || [];
        if (plCategoryFilters.length > 0) {
            filtered = filtered.filter(c =>
                c.plCategory && plCategoryFilters.includes(c.plCategory)
            );
        }

        const cogSegmentFilters = filters.cogSegment || [];
        if (cogSegmentFilters.length > 0) {
            filtered = filtered.filter(c =>
                c.cogSegment && cogSegmentFilters.includes(c.cogSegment)
            );
        }

        const businessSegmentFilters = filters.businessSegment || [];
        if (businessSegmentFilters.length > 0) {
            filtered = filtered.filter(c =>
                c.businessSegment && businessSegmentFilters.includes(c.businessSegment)
            );
        }

        const contractTypeFilters = filters.contractType || [];
        if (contractTypeFilters.length > 0) {
            filtered = filtered.filter(c =>
                c.contractType && contractTypeFilters.includes(c.contractType)
            );
        }

        return filtered.map(c => c.siteNumber);
    }

    useEffect(() => {
        let cancelled = false;
        async function fetchCustomers() {
            setLoading(true);
            setLoadError(null);
            try {
                const customersRes = await fetch("/api/customers");
                if (!customersRes.ok) throw new Error("Failed to fetch customers");
                const customersData: CustomerSummary[] = await customersRes.json();

                if (!cancelled) {
                    setCustomers(customersData);

                    if (selectedCustomer) {
                        const initialFilters: SelectedFilters = {
                            site: [selectedCustomer.siteNumber]
                        };
                        setAppliedFilters(initialFilters);
                        
                        setFilteredSiteIds([selectedCustomer.siteNumber]);
                    } else {
                        let siteIds: string[];
                        const hasFilters = Object.values(appliedFilters).some(v => Array.isArray(v) && v.length > 0);
                        if (hasFilters) {
                            siteIds = filterCustomersByFilters(customersData, appliedFilters);
                        } else {
                            siteIds = customersData.map(c => c.siteNumber);
                        }
                        setFilteredSiteIds(siteIds);
                    }
                }
            } catch (err: any) {
                if (!cancelled) {
                    setLoadError(err.message || "Unknown error");
                    setLoading(false);
                }
            }
        }
        fetchCustomers();
        return () => { cancelled = true; };
    }, [selectedYear, selectedCustomer]);

    useEffect(() => {
        if (filteredSiteIds.length === 0) return;

        if (customerId && !routeFilterApplied) {
            if (filteredSiteIds.length !== 1 || filteredSiteIds[0] !== customerId) {
                return;
            }
        }

        let cancelled = false;
        async function fetchFilteredPnlData() {
            setLoading(true);
            try {
                const pnlRes = await fetch("/api/pnl", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        siteIds: filteredSiteIds, 
                        year: Number(selectedYear) 
                    }),
                });
                if (!pnlRes.ok) throw new Error("Failed to fetch P&L data");
                const pnlData = await pnlRes.json();
                
                if (!cancelled) {
                    if (pnlData.years) {
                        const yearData = pnlData.years.find((y: PnlResponse) => y.year === Number(selectedYear));
                        if (yearData) {
                            setPnlData(yearData);
                        } else {
                            setLoadError("No data available for selected year");
                        }
                    } else if (pnlData.year) {
                        setPnlData(pnlData);
                    } else {
                        setLoadError("Invalid data format received from API");
                    }
                    setLoading(false);
                }
            } catch (err: any) {
                if (!cancelled) {
                    setLoadError(err.message || "Unknown error");
                    setLoading(false);
                }
            }
        }

        if (filteredSiteIds.length > 0) {
            fetchFilteredPnlData();
        }

        return () => { cancelled = true; };
    }, [filteredSiteIds, selectedYear, customerId]);

    const handleApplyFilters = (filters: SelectedFilters) => {
        setAppliedFilters(filters);
        const newFilteredSiteIds = filterCustomersByFilters(customers, filters);
        setFilteredSiteIds(newFilteredSiteIds);
    };

    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return [currentYear - 1, currentYear, currentYear + 1];
    }, []);

    function findRow(rows: any[], code: string) {
        if (!rows) return null;
        const apiCol = CODE_TO_API_COLUMN[code];
        return rows.find(r => 
            r.code === apiCol || 
            r.code === code || 
            r.columnName === apiCol || 
            r.columnName === code
        );
    }

    function getTrendRow(code: string) {
        if (!pnlData) return Array(MONTHS.length).fill(null);
        if (code === "flc") {
            return MONTHS.map((_, idx) => {
                const internalRevenue = idx <= currentMonthIdx
                    ? findRow(pnlData.actualRows, "internalRevenue")?.monthlyValues[idx]?.value ?? 0
                    : viewMode === "Forecast"
                        ? findRow(pnlData.forecastRows, "internalRevenue")?.monthlyValues[idx]?.value ?? 0
                        : findRow(pnlData.budgetRows, "internalRevenue")?.monthlyValues[idx]?.value ?? 0;

                const expenses = ["payroll", "claims", "parkingRents", "otherExpense", "pteb", "insurance"].reduce((sum, expenseCode) => {
                    const expenseValue = idx <= currentMonthIdx
                        ? findRow(pnlData.actualRows, expenseCode)?.monthlyValues[idx]?.value ?? 0
                        : viewMode === "Forecast"
                            ? findRow(pnlData.forecastRows, expenseCode)?.monthlyValues[idx]?.value ?? 0
                            : findRow(pnlData.budgetRows, expenseCode)?.monthlyValues[idx]?.value ?? 0;
                    return sum + (expenseValue ?? 0);
                }, 0);

                return internalRevenue - expenses;
            });
        } else if (code === "flcCumulative") {
            let cumulativeSum = 0;
            return MONTHS.map((_, idx) => {
                const actualForecastFLC = idx <= currentMonthIdx
                    ? calculateFLCForMonth(idx, "actual")
                    : viewMode === "Forecast"
                        ? calculateFLCForMonth(idx, "forecast")
                        : calculateFLCForMonth(idx, "budget");

                const budgetFLC = calculateFLCForMonth(idx, "budget");

                const monthlyVariance = actualForecastFLC - budgetFLC;
                cumulativeSum += monthlyVariance;

                return cumulativeSum;
            });
        } else {
            const actual = findRow(pnlData.actualRows, code);
            const forecast = findRow(pnlData.forecastRows, code);
            const budget = findRow(pnlData.budgetRows, code);
            return MONTHS.map((_, idx) => {
                if (idx <= currentMonthIdx) return actual?.monthlyValues[idx]?.value ?? null;
                return viewMode === "Forecast"
                    ? forecast?.monthlyValues[idx]?.value ?? null
                    : budget?.monthlyValues[idx]?.value ?? null;
            });
        }
    }

    function calculateFLCForMonth(monthIdx: number, dataType: "actual" | "forecast" | "budget") {
        if (!pnlData) return 0;
        const rowsToUse = dataType === "actual"
            ? pnlData.actualRows
            : dataType === "forecast"
                ? pnlData.forecastRows
                : pnlData.budgetRows;

        const internalRevenue = findRow(rowsToUse, "internalRevenue")?.monthlyValues[monthIdx]?.value ?? 0;

        const expenses = ["payroll", "claims", "parkingRents", "otherExpense", "pteb", "insurance"].reduce((sum, expenseCode) => {
            const expenseValue = findRow(rowsToUse, expenseCode)?.monthlyValues[monthIdx]?.value ?? 0;
            return sum + (expenseValue ?? 0);
        }, 0);

        return internalRevenue - expenses;
    }

    function getVarianceRow(code: string) {
        if (!pnlData) return Array(MONTHS.length).fill({});
        if (code === "flc") {
            return MONTHS.map((_, idx) => {
                const forecastFLC = calculateFLCForMonth(idx, "forecast");
                const budgetFLC = calculateFLCForMonth(idx, "budget");
                const amount = forecastFLC - budgetFLC;
                const percentage = budgetFLC !== 0 ? (amount / budgetFLC) * 100 : 0;

                return {
                    month: idx,
                    amount,
                    percentage
                };
            });
        } else if (code === "flcCumulative") {
            let forecastCumulative = 0;
            let budgetCumulative = 0;

            return MONTHS.map((_, idx) => {
                const forecastFLC = calculateFLCForMonth(idx, "forecast");
                const budgetFLC = calculateFLCForMonth(idx, "budget");

                forecastCumulative += forecastFLC;
                budgetCumulative += budgetFLC;

                const amount = forecastCumulative - budgetCumulative;
                const percentage = budgetCumulative !== 0 ? (amount / budgetCumulative) * 100 : 0;

                return {
                    month: idx,
                    amount,
                    percentage
                };
            });
        } else {
            const variance = findRow(pnlData.varianceRows, code);
            return variance?.monthlyVariances ?? [];
        }
    }

function getTrendTotal(code: string) {
        if (!pnlData) return null;
        if (code === "flc") {
            const months = MONTHS.length;
            let total = 0;

            for (let i = 0; i < months; i++) {
                if (i <= currentMonthIdx) {
                    total += calculateFLCForMonth(i, "actual");
                } else if (viewMode === "Forecast") {
                    total += calculateFLCForMonth(i, "forecast");
                } else {
                    total += calculateFLCForMonth(i, "budget");
                }
            }

            return total;
        } else if (code === "flcCumulative") {
            const trendRow = getTrendRow(code);
            return trendRow[trendRow.length - 1];
        } else if (code === "internalRevenue"){
            return getActualPlusForecastTotal(code);
        } else {
            let total = 0;
            for (let i = 0; i < MONTHS.length; i++) {
                if (i <= currentMonthIdx) {
                    const actual = findRow(pnlData.actualRows, code);
                    total += actual?.monthlyValues[i]?.value ?? 0;
                } else if (viewMode === "Forecast") {
                    const forecast = findRow(pnlData.forecastRows, code);
                    total += forecast?.monthlyValues[i]?.value ?? 0;
                } else {
                    const budget = findRow(pnlData.budgetRows, code);
                    total += budget?.monthlyValues[i]?.value ?? 0;
                }
            }
            return total;
        }
    } 

    function getActualPlusForecastTotal(code: string) {
        if (!pnlData) return null;
        const actual = findRow(pnlData.actualRows, code);
        const forecast = findRow(pnlData.forecastRows, code);
    
        let total = 0;
        // Sum actuals for months up to and including currentMonthIdx
        for (let i = 0; i <= currentMonthIdx; i++) {
            total += actual?.monthlyValues[i]?.value ?? 0;
        }
        // Sum forecast for months after currentMonthIdx
        for (let i = currentMonthIdx + 1; i < MONTHS.length; i++) {
            total += forecast?.monthlyValues[i]?.value ?? 0;
        }
        return total;
    }

    function getActualTotal(code: string) {
        if (!pnlData) return null;
        if (code === "flcCumulative") {
            return null;
        }

        if (code === "flc") {
            let total = 0;

            for (let i = 0; i <= currentMonthIdx; i++) {
                total += calculateFLCForMonth(i, "actual");
            }

            return total;
        } else {
            const actual = findRow(pnlData.actualRows, code);
            if (!actual) return null;
            return actual.monthlyValues
                .filter((v: any, idx: number) => idx <= currentMonthIdx)
                .reduce((sum: number, v: any) => sum + (typeof v.value === "number" ? v.value : 0), 0);
        }
    }

    function getVarianceTotal(code: string) {
        if (!pnlData) return { amount: 0, percent: 0 };
        if (code === "flc") {
            const forecastTotal = MONTHS.reduce((sum, _, idx) => sum + calculateFLCForMonth(idx, "forecast"), 0);
            const budgetTotal = MONTHS.reduce((sum, _, idx) => sum + calculateFLCForMonth(idx, "budget"), 0);
            const amount = forecastTotal - budgetTotal;
            const percent = budgetTotal !== 0 ? (amount / budgetTotal) * 100 : 0;

            return { amount, percent };
        } else if (code === "flcCumulative") {
            const lastMonth = MONTHS.length - 1;
            const forecastCumulative = MONTHS.reduce((sum, _, idx) => {
                return sum + (calculateFLCForMonth(idx, "forecast") - calculateFLCForMonth(idx, "budget"));
            }, 0);

            const budgetSum = MONTHS.reduce((sum, _, idx) => sum + calculateFLCForMonth(idx, "budget"), 0);
            const percent = budgetSum !== 0 ? (forecastCumulative / budgetSum) * 100 : 0;

            return { amount: forecastCumulative, percent };
        } else {
            const variance = findRow(pnlData.varianceRows, code);
            return { amount: variance?.totalVarianceAmount ?? 0, percent: variance?.totalVariancePercent ?? 0 };
        }
    }

    function calculatePercentOfIR(rowCode: string): number | null {
        if (!pnlData) return null;
        if (rowCode === "internalRevenue") return 100.0;
        if (rowCode === "externalRevenue" || rowCode === "flcCumulative") return null;
    
        const irTotal = getTrendTotal("internalRevenue") ?? 0;
        const rowTotal = getTrendTotal(rowCode);
    
        if (irTotal <= 0) return null;
        if (rowTotal === null) return null;
        const percent = (rowTotal / irTotal) * 100;
        
        return percent;
    }

    const rowDefs = [
        { code: "externalRevenue", label: "External Revenue" },
        { code: "internalRevenue", label: "Internal Revenue" },
        { code: "payroll", label: "Payroll" },
        { code: "claims", label: "Claims" },
        { code: "parkingRents", label: "Parking Rents" },
        { code: "otherExpense", label: "Other Expense" },
        { code: "pteb", label: "PTEB" },
        { code: "insurance", label: "Insurance" },
        { code: "flc", label: "Front Line Contribution (FLC)" },
        { code: "flcCumulative", label: "FLC $ to Budget - Cumulative" },
    ];

    const currentMonthIdx = getCurrentMonthIdx(Number(selectedYear));

    const filterCount = Object.values(appliedFilters).reduce<number>((acc, v) => acc + (Array.isArray(v) ? v.length : 0), 0);

    return (
        <div className="w-full max-w-[95vw] mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">P&amp;L View</h1>
                <div className="flex flex-wrap items-center gap-4">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => setFilterOpen(true)}
                        disabled={loading}
                        data-qa-id="button-filter"
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                        {filterCount > 0 && (
                            <Badge variant="secondary" className="ml-1">{filterCount}</Badge>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setViewMode(viewMode === "Forecast" ? "Budget" : "Forecast")}
                        disabled={loading}
                        data-qa-id="button-toggle-view-mode"
                    >
                        {viewMode === "Forecast" ? "Show Budget" : "Show Forecast"}
                    </Button>
                </div>
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGuide(g => !g)}
                className="flex items-center gap-1 mb-4"
                data-qa-id="pnl-guide-toggle"
            >
                <Info className="h-4 w-4" />
                {showGuide ? "Hide Guide" : "Show Guide"}
                {showGuide ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {showGuide && (
                <div className="space-y-4 p-4 border rounded-md bg-muted/20 mb-6" data-qa-id="guide-content">
                    <h3 className="text-lg font-semibold text-brand-navy">P&L View Guide</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div>
                                <h4 className="text-sm font-semibold mb-1">View Modes</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>Toggle between <span className="text-brand-blue font-medium">Forecast</span> and <span className="text-brand-navy font-medium">Budget</span> using the view button.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1">Data Display</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>
                                        <span className="bg-blue-50 dark:bg-blue-900 text-xs px-2 py-1 rounded font-medium">ACTUAL</span> months are highlighted with a blue background.
                                    </li>
                                    <li>
                                        <span className="font-bold">FLC</span> row values are bold for emphasis.
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1">Trend vs Variance</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li><span className="font-medium">Trend:</span> Shows actual dollar amounts for each month.</li>
                                    <li><span className="font-medium">Variance:</span> Shows the difference between Forecast and Budget values.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h4 className="text-sm font-semibold mb-1">Variance Indicators</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>
                                        <span className="text-black dark:text-green-400 font-bold">▲ +1,000</span> Positive variance (Forecast exceeds Budget)
                                    </li>
                                    <li>
                                        <span className="text-red-600 dark:text-red-400 font-bold">▼ -1,000</span> Negative variance (Forecast below Budget)
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1">Variance Significance</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>
                                        <span className="text-black dark:text-green-400 font-bold">7.5%+</span> High variance (bold, green in dark mode) - requires attention
                                    </li>
                                    <li>
                                        <span className="text-black/80 dark:text-green-300">0-7.5%</span> Medium variance (lighter, green in dark mode) - within range
                                    </li>
                                    <li>
                                        <span className="text-[9px]">(+5.2%)</span> Percentage variance is shown below the dollar amount
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1">Dark Mode Accessibility</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>
                                        Colors are optimized for visibility in both light and dark themes.
                                    </li>
                                    <li>
                                        Positive variances use <span className="text-green-400 font-bold">green</span> in dark mode for clarity.
                                    </li>
                                    <li>
                                        Negative variances use <span className="text-red-400 font-bold">red</span> in dark mode.
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1">Filtering</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>Use the <span className="font-medium">Filters</span> button to open the filter modal and narrow your data by:</li>
                                    <li><span className="bg-blue-50 dark:bg-blue-900 text-xs px-2 py-0.5 rounded">Organizational</span>: Legal Entity, Region, District, Site, Account/District Manager</li>
                                    <li><span className="bg-green-50 dark:bg-green-900 text-xs px-2 py-0.5 rounded">Customer</span>: P&L Category, COG, Business Segment, Contract Type</li>
                                </ul>
                                <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">Note: Filter data is sourced from the TP_EDW database for accurate reporting.</p>
                                <p className="text-xs text-gray-700 dark:text-gray-300 mt-2">The filter dialog shows which Site IDs are included in your current view. More organizational filters expand the list, more customer filters narrow it down.</p>
                            </div>
                        </div>
                    </div>
                    <Alert>
                        <AlertDescription>
                            Tip: For the most accurate variance analysis, compare Forecast to Budget using the Variance view.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
            <CustomerFilter 
                open={filterOpen}
                onOpenChange={setFilterOpen}
                onApplyFilters={handleApplyFilters}
                currentFilters={appliedFilters}
                customers={customers}
            />
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                    <label htmlFor="year-select" className="text-sm font-medium mr-2">Year:</label>
                    <Select 
                        value={selectedYear} 
                        onValueChange={setSelectedYear} 
                        disabled={loading}
                        data-qa-id="select-year"
                    >
                        <SelectTrigger id="year-select" className="w-[120px] focus:ring-brand-blue" data-qa-id="trigger-year">
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {yearOptions.map(y => (
                                <SelectItem key={y} value={String(y)} data-qa-id={`select-item-year-${y}`}>{y}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowVariance(v => !v)}
                    disabled={loading}
                    className={`ml-auto ${showVariance ? "bg-brand-blue/10 border-brand-blue text-brand-blue" : ""}`}
                    data-qa-id="button-toggle-variance"
                >
                    {showVariance ? "Show Trend" : "Show Variance"}
                </Button>
            </div>
            <Card>
                <CardContent className="p-0">
                    {loading ? (
                        <>
                            <ProgressBar />
                            <SkeletonTable />
                            <AnimatedLoadingText />
                        </>
                    ) : loadError ? (
                        <div className="p-6 text-center text-red-600 font-bold">{loadError}</div>
                    ) : (
                        <div className="w-full overflow-auto">
                            <Table className="w-full table-fixed">
                                <TableHeader>
                                    <TableRow className="h-[50px]">
                                        <TableHead
                                            className="sticky left-0 bg-muted w-[160px] z-30"
                                            style={{ boxShadow: "2px 0 0 0 rgba(0,0,0,0.04)" }}
                                        >
                                            {selectedYear} {showVariance ? "VARIANCE" : "TREND"} ({viewMode})
                                        </TableHead>
                                        {MONTHS.map((m, idx) => (
                                            <TableHead
                                                key={m}
                                                className="text-center p-2 w-[85px] z-20 bg-muted"
                                                style={{ left: undefined }}
                                            >
                                                <div className="flex flex-col items-center text-xs">
                                                    <span>{m.toUpperCase()}</span>
                                                    {!showVariance && idx <= currentMonthIdx && (
                                                        <span className="text-[10px] opacity-80">ACTUAL</span>
                                                    )}
                                                </div>
                                            </TableHead>
                                        ))}
                                        <TableHead className="text-center p-2 w-[110px] z-20 bg-muted">TOTAL</TableHead>
                                        <TableHead className="text-center p-2 w-[85px] z-20 bg-muted">% of IR</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rowDefs.map(row => (
                                        <TableRow key={row.code} className="hover:bg-muted/50 h-[50px]">
                                            <TableCell className="sticky left-0 font-medium p-2 bg-background w-[140px]">
                                                <div className="text-sm">{row.label}</div>
                                            </TableCell>
                                            {MONTHS.map((_, idx) => (
                                                <TableCell
                                                    key={idx}
                                                    className={`text-right p-1 w-[70px] h-[50px] ${row.code === "flcCumulative"
                                                        ? ""
                                                        : !showVariance && idx <= currentMonthIdx
                                                            ? "bg-blue-100 dark:bg-blue-950/30"
                                                            : ""
                                                        }`}
                                                >
                                                    <div className="h-[40px] flex flex-col justify-center">
                                                        {row.code === "flcCumulative" ? (
                                                            (() => {
                                                                const value = getTrendRow(row.code)[idx];
                                                                if (value == null) {
                                                                    return <span className="text-xs text-gray-400">-</span>;
                                                                }
                                                                return (
                                                                    <span className={`text-xs ${value < 0 ? "text-red-600" : "text-gray-700"}`}>
                                                                        {formatCurrency(value)}
                                                                    </span>
                                                                );
                                                            })()
                                                        ) : showVariance ? (
                                                            (() => {
                                                                const v = getVarianceRow(row.code)[idx];
                                                                if (!v || v.amount == null) return (
                                                                    <>
                                                                        <span className="text-[10px] text-gray-500">N/A</span>
                                                                        <span className="text-[8px] opacity-0">placeholder</span>
                                                                    </>
                                                                );
                                                                const cls = getVarianceClass(v.amount, v.percentage ?? 0);
                                                                return (
                                                                    <>
                                                                        <div className={`text-[10px] ${cls}`}>
                                                                            {v.amount > 0 ? "▲" : v.amount < 0 ? "▼" : ""}
                                                                            {v.amount > 0 ? "+" : ""}
                                                                            {v.amount.toLocaleString()}
                                                                        </div>
                                                                        <div className={`text-[8px] ${cls}`}>
                                                                            ({v.amount > 0 ? "+" : ""}{(v.percentage ?? 0).toFixed(1)}%)
                                                                        </div>
                                                                    </>
                                                                );
                                                            })()
                                                        ) : (
                                                            <>
                                                                <div className="text-xs">
                                                                    {getTrendRow(row.code)[idx] != null
                                                                        ? formatCurrency(getTrendRow(row.code)[idx] as number)
                                                                        : "-"}
                                                                </div>
                                                                <div className="h-[12px]"></div>
                                                            </>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            ))}
                                            <TableCell className="text-right p-1 w-[90px] h-[50px]">
                                                <div className="h-[40px] flex flex-col justify-center">
                                                    {row.code === "flcCumulative" ? (
                                                        (() => {
                                                            const value = getTrendTotal(row.code);
                                                            if (value == null) {
                                                                return <span className="text-xs text-gray-400">-</span>;
                                                            }
                                                            return (
                                                                <span className={`text-xs ${value < 0 ? "text-red-600" : "text-gray-700"}`}>
                                                                    {value < 0 ? `-$${Math.abs(value).toLocaleString()}` : value > 0 ? `+$${value.toLocaleString()}` : "$0"}
                                                                </span>
                                                            );
                                                        })()
                                                    ) : showVariance ? (
                                                        (() => {
                                                            const t = getVarianceTotal(row.code);
                                                            const cls = getVarianceClass(t.amount, t.percent);
                                                            return (
                                                                <>
                                                                    <div className={`text-[10px] ${cls} font-medium`}>
                                                                        {t.amount > 0 ? "▲" : t.amount < 0 ? "▼" : ""}
                                                                        {t.amount > 0 ? "+" : ""}
                                                                        {t.amount.toLocaleString()}
                                                                    </div>
                                                                    <div className={`text-[8px] ${cls}`}>
                                                                        ({t.amount > 0 ? "+" : ""}{(t.percent ?? 0).toFixed(1)}%)
                                                                    </div>
                                                                </>
                                                            );
                                                        })()
                                                    ) : (
                                                        <>
                                                            <div className="text-xs font-bold">
                                                                {getTrendTotal(row.code) != null
                                                                    ? formatCurrency(getTrendTotal(row.code) as number)
                                                                    : "-"}
                                                            </div>
                                                            {row.code !== "flcCumulative" ? (
                                                                <div className="text-[10px] text-blue-600">
                                                                    {getActualTotal(row.code) != null
                                                                        ? formatCurrency(getActualTotal(row.code) as number)
                                                                        : "-"}
                                                                    <span className="text-[8px] text-gray-500 ml-1">ACT</span>
                                                                </div>
                                                            ) : <div className="h-[12px]"></div>}
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right p-1 w-[70px] h-[50px]">
                                                <div className="h-[40px] flex flex-col justify-center">
                                                    {row.code === "flcCumulative" ? (
                                                        <div className="opacity-0 text-xs">-</div>
                                                    ) : !showVariance ? (
                                                        <>
                                                            <div className="text-xs">
                                                                {calculatePercentOfIR(row.code) !== null
                                                                    ? `${calculatePercentOfIR(row.code)?.toFixed(1)}%`
                                                                    : ""}
                                                            </div>
                                                            <div className="h-[12px]"></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="opacity-0 text-xs">-</div>
                                                            <div className="h-[12px]"></div>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
