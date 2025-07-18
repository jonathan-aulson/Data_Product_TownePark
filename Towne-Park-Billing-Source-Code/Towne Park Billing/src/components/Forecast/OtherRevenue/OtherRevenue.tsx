import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useSpreadsheetNavigation } from "@/hooks/useSpreadsheetNavigation";
import { OtherRevenueDto } from "@/lib/models/OtherRevenue";
import { Customer } from "@/lib/models/Statistics";
import { ChevronDown, ChevronUp, Eye, EyeOff, Info } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import useDragAndCopy from "@/hooks/useDragAndCopy";


interface OtherRevenueProps {
    customers: Customer[];
    selectedSite: string;
    startingMonth: string;
    comparisonType: string;
    isGuideOpen: boolean;
    setIsGuideOpen: (value: boolean) => void;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: (dirty: boolean) => void;
    onLoadingChange?: (loading: boolean) => void;
}

const REVENUE_TYPES = [
    { id: "billableExpense", label: "Billable Expenses" },
    { id: "revenueValidation", label: "Revenue Validations" },
    { id: "credits", label: "Credits" },
    { id: "gpoFees", label: "GPO Fees" },
    { id: "signingBonus", label: "Signing Bonuses" },
];

type RevenueTypeId = typeof REVENUE_TYPES[number]["id"];

type EditedCells = Record<string, Record<RevenueTypeId, number>>;

const REVENUE_TYPE_KEYS = {
    billableExpense: "billableExpense",
    revenueValidation: "revenueValidation",
    credits: "credits",
    gpoFees: "gpoFees",
    signingBonus: "signingBonus",
} as const;

type RevenueTypeKey = keyof typeof REVENUE_TYPE_KEYS;

const OtherRevenue = forwardRef(function OtherRevenue(
    {
        customers,
        selectedSite,
        startingMonth,
        comparisonType,
        isGuideOpen,
        setIsGuideOpen,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        onLoadingChange
    }: OtherRevenueProps,
    ref
) {
    const [data, setData] = useState<OtherRevenueDto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [editedCells, setEditedCells] = useState<EditedCells>({});
    const [savedEditedCells, setSavedEditedCells] = useState<EditedCells>({});

    const tableRef = useRef<HTMLTableElement>(null);
    // For spreadsheet-like replace-on-type (per-cell)
    const replaceOnNextInputRef = useRef<{ [key: string]: boolean }>({});

    const { toast } = useToast();

    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(isLoading);
        }
    }, [isLoading, onLoadingChange]);

    useEffect(() => {
        if (!selectedSite || !startingMonth) return;
        setIsLoading(true);
        setEditedCells({});
        fetch(`/api/otherRevenue/${selectedSite}/${startingMonth}`)
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(data => setData(data))
            .catch(() => setData(null))
            .finally(() => setIsLoading(false));
    }, [selectedSite, startingMonth]);



    const getTimePeriods = () => {
        const [yearStr, monthStr] = startingMonth.split("-");
        const year = Number(yearStr);
        const month = Number(monthStr) - 1;
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const periods = [];
        for (let i = 0; i < 12; i++) {
            const currentMonth = (month + i) % 12;
            const currentYear = year + Math.floor((month + i) / 12);
            periods.push({
                id: `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}`,
                label: `${monthNames[currentMonth]} ${currentYear}`,
                date: new Date(currentYear, currentMonth, 1),
            });
        }
        return periods;
    };

    const isPastMonth = (periodDate: Date) => {
        const today = new Date();
        return periodDate < new Date(today.getFullYear(), today.getMonth(), 1);
    };

    const getDataForPeriod = (periodId: string, revenueType: RevenueTypeId) => {
        const key = REVENUE_TYPE_KEYS[revenueType as RevenueTypeKey];

        const budget = data?.budgetData?.find(d => d.monthYear === periodId)?.[key];
        const forecast = data?.forecastData?.find(d => d.monthYear === periodId)?.[key];
        const actual = data?.actualData?.find(d => d.monthYear === periodId)?.[key];

        return { budget, forecast, actual };
    };

    const handleCellChange = (periodId: string, revenueType: RevenueTypeId, value: string) => {
        if (showComparison) return;

        const parsedValue = Number.parseFloat(value);
        const finalValueForCell = value === "" ? 0 : parsedValue;

        if (value !== "" && isNaN(finalValueForCell)) {
            return;
        }

        const { forecast, budget } = getDataForPeriod(periodId, revenueType);
        const effectiveBudget = budget ?? 0;
        const originalDisplayValueIfNoEdit =
            forecast !== undefined && forecast !== null && forecast !== 0
                ? forecast
                : effectiveBudget;

        const isRevert = Math.abs(finalValueForCell - originalDisplayValueIfNoEdit) < 0.01;

        let newEditedCells = { ...editedCells };
        if (newEditedCells[periodId]) {
            newEditedCells[periodId] = { ...newEditedCells[periodId] };
        }

        if (isRevert) {
            if (newEditedCells[periodId]) {
                delete newEditedCells[periodId][revenueType];
                if (Object.keys(newEditedCells[periodId]).length === 0) {
                    delete newEditedCells[periodId];
                }
            }
        } else {
            if (!newEditedCells[periodId]) {
                newEditedCells[periodId] = {};
            }
            newEditedCells[periodId][revenueType] = finalValueForCell;
        }

        setEditedCells(newEditedCells);
        setHasUnsavedChanges(Object.keys(newEditedCells).length > 0);
    };

    const getCellValue = (periodId: string, revenueType: RevenueTypeId) => {
        if (showComparison) {
            // Always compare to budget for now
            return getDataForPeriod(periodId, revenueType).budget;
        }
        if (editedCells[periodId]?.[revenueType] !== undefined) {
            return editedCells[periodId][revenueType];
        }
        // If forecast exists, show forecast, else budget
        const { forecast, budget } = getDataForPeriod(periodId, revenueType);
        return forecast !== undefined && forecast !== null && forecast !== 0 ? forecast : budget;
    };

    const calculateVariance = (periodId: string, revenueType: RevenueTypeId) => {
        const { budget } = getDataForPeriod(periodId, revenueType);
        const forecast =
            editedCells[periodId]?.[revenueType] !== undefined
                ? editedCells[periodId][revenueType]
                : getDataForPeriod(periodId, revenueType).forecast ?? 0;
        if (!budget) return { percent: 0, dollars: 0 };
        const dollarVariance = forecast - budget;
        const percentVariance = (dollarVariance / budget) * 100;
        return {
            percent: Math.round(percentVariance * 10) / 10,
            dollars: dollarVariance,
        };
    };

    const getVarianceColor = (variance: number) => {
        if (variance > 5) return "text-green-500";
        if (variance > 0) return "text-green-400";
        if (variance > -5) return "text-amber-500";
        return "text-red-500";
    };

    const hasDifferentActual = (periodId: string, revenueType: RevenueTypeId, periodDate: Date) => {
        const today = new Date();
        const isPastMonth = periodDate < new Date(today.getFullYear(), today.getMonth(), 1);

        if (!isPastMonth) return false;

        const actualValue = getDataForPeriod(periodId, revenueType).actual ?? 0;
        const displayValue = getCellValue(periodId, revenueType) ?? 0;
        return actualValue !== null && Math.abs(actualValue - displayValue) > 0.01;
    };

    const handleSave = async () => {
        if (!selectedSite || !startingMonth) {
            toast({
                title: "Error",
                description: "Please select a customer site and starting month.",
                variant: "destructive"
            });
            return;
        }

        setIsSaving(true);

        const timePeriods = getTimePeriods();

        let forecastData = data?.forecastData ? [...data.forecastData] : [];

        Object.entries(editedCells).forEach(([monthYear, changes]) => {
            const idx = forecastData.findIndex(d => d.monthYear === monthYear);
            const budgetData = data?.budgetData?.find(d => d.monthYear === monthYear);

            if (idx >= 0) {
                forecastData[idx] = {
                    ...forecastData[idx],
                    ...changes,
                };
            } else if (budgetData) {
                forecastData.push({
                    id: null,
                    monthYear,
                    billableExpense: budgetData.billableExpense || 0,
                    credits: budgetData.credits || 0,
                    gpoFees: budgetData.gpoFees || 0,
                    revenueValidation: budgetData.revenueValidation || 0,
                    signingBonus: budgetData.signingBonus || 0,
                    ...changes
                });
            } else {
                forecastData.push({
                    id: null,
                    monthYear,
                    billableExpense: 0,
                    credits: 0,
                    gpoFees: 0,
                    revenueValidation: 0,
                    signingBonus: 0,
                    ...changes
                });
            }
        });

        timePeriods.forEach(period => {
            if (forecastData.some(d => d.monthYear === period.id)) {
                return;
            }

            const budgetForPeriod = data?.budgetData?.find(d => d.monthYear === period.id);
            if (budgetForPeriod) {
                forecastData.push({
                    id: null,
                    monthYear: period.id,
                    billableExpense: budgetForPeriod.billableExpense || 0,
                    credits: budgetForPeriod.credits || 0,
                    gpoFees: budgetForPeriod.gpoFees || 0,
                    revenueValidation: budgetForPeriod.revenueValidation || 0,
                    signingBonus: budgetForPeriod.signingBonus || 0,
                });
            }
        });

        // Find customer details from props
        const customer = customers.find(c => c.customerSiteId === selectedSite);

        const payload: OtherRevenueDto = {
            id: data?.id || "",
            customerSiteId: selectedSite,
            siteNumber: customer?.siteNumber || "",
            name: customer?.siteName || "",
            billingPeriod: startingMonth,
            forecastData,
            budgetData: [],
            actualData: []
        };

        try {
            const response = await fetch("/api/otherRevenue", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to save changes.");
            }

            setData(prevData => {
                if (!prevData) return payload;
                return { ...prevData, forecastData };
            });
            setEditedCells({});
            setHasUnsavedChanges(false);

            toast({
                title: "Changes saved",
                description: "Other revenue forecast data has been successfully updated.",
                variant: "default"
            });
        } catch (err) {
            toast({
                title: "Error saving changes",
                description: err instanceof Error ? err.message : "An unexpected error occurred",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    const toggleComparisonView = () => {
        if (showComparison) {
            setEditedCells(savedEditedCells);
        } else {
            setSavedEditedCells({ ...editedCells });
        }
        setShowComparison(!showComparison);
    };

    useImperativeHandle(ref, () => ({
        save: handleSave
    }));

    const timePeriods = getTimePeriods();

    // Spreadsheet navigation setup
    const spreadsheetNavigation = useSpreadsheetNavigation({
        tableRef,
        rowCountCallback: () => timePeriods.length,
        columnCountCallback: () => REVENUE_TYPES.length,
        isCellEditableCallback: (rowIndex: number, colIndex: number) => {
            const period = timePeriods[rowIndex];
            return !showComparison && !isPastMonth(period.date);
        },
        onCellActivate: (rowIndex: number, colIndex: number, cellElement: HTMLElement | null) => {
            if (cellElement) {
                const input = cellElement.querySelector('input');
                if (input && !input.disabled && !input.readOnly) {
                    input.focus({ preventScroll: true });
                    input.select();
                }
            }
        },
        onCellEditRequest: (rowIndex: number, colIndex: number) => {
            const period = timePeriods[rowIndex];
            if (!showComparison && !isPastMonth(period.date)) {
                const cellElement = tableRef.current?.querySelector(`#cell-${rowIndex}-${colIndex}`) as HTMLElement;
                if (cellElement) {
                    const input = cellElement.querySelector('input');
                    if (input) {
                        input.focus({ preventScroll: true });
                        input.select();
                    }
                }
            }
        }
    });

    const {
        isDragging,
        dragPreviewCells,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        isDragPreviewCell,
    } = useDragAndCopy({
        context: { timePeriods, revenueTypes: REVENUE_TYPES },
        activeCell: spreadsheetNavigation.activeCell,
        rowCount: timePeriods.length,
        colCount: REVENUE_TYPES.length,
        onCopy: (cells, { timePeriods, revenueTypes }) => {
            return cells.map(({ rowIndex, colIndex }) => {
                const periodId = timePeriods[rowIndex].id;
                const revenueType = revenueTypes[colIndex].id as RevenueTypeId;
                const value = getCellValue(periodId, revenueType);
                return value == null ? "" : String(value);
            });
        },
        onPaste: (cells, clipboard, { timePeriods, revenueTypes }) => {
            const newEditedCells = { ...editedCells };

            cells.forEach((cell, i) => {
                const value = clipboard[i];
                const parsed = value === "" ? 0 : parseFloat(value);
                const periodId = timePeriods[cell.rowIndex].id;
                const revenueType = revenueTypes[cell.colIndex].id as RevenueTypeId;

                const { forecast, budget } = getDataForPeriod(periodId, revenueType);
                const fallback = forecast ?? budget ?? 0;
                const isRevert = Math.abs(parsed - fallback) < 0.01;

                if (isRevert) {
                    delete newEditedCells[periodId]?.[revenueType];
                    if (newEditedCells[periodId] && Object.keys(newEditedCells[periodId]).length === 0) {
                        delete newEditedCells[periodId];
                    }
                } else {
                    if (!newEditedCells[periodId]) {
                        newEditedCells[periodId] = {};
                    }
                    newEditedCells[periodId][revenueType] = parsed;
                }
            });

            setEditedCells(newEditedCells);
            setHasUnsavedChanges(Object.keys(newEditedCells).length > 0);
        }
    });


    return (
        <TooltipProvider>
            <div className="w-full p-1 space-y-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Other Revenue</h1>
                        <p className="text-muted-foreground">Manage additional revenue streams outside of standard parking operations.</p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={() => setIsGuideOpen(!isGuideOpen)}
                    className="flex items-center gap-2 mb-2"
                    data-qa-id="button-toggle-other-revenue-guide"
                >
                    <Info className="h-4 w-4" />
                    {isGuideOpen ? "Hide Guide" : "Show Guide"}
                    {isGuideOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                {isGuideOpen && (
                    <div className="space-y-4 p-4 border rounded-md bg-muted/20 mb-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Other Revenue Guide</h3>
                            <p>
                                This page allows you to manage forecast data for revenue sources outside of standard
                                parking operations, including billable expenses, revenue validations, credits, and more.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium mb-1">Revenue Types</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                    <li><strong>Billable Expenses:</strong> Costs that can be passed on to clients</li>
                                    <li><strong>Revenue Validations:</strong> Validation-based revenue</li>
                                    <li><strong>Credits:</strong> Amounts credited to the customer</li>
                                    <li><strong>GPO Fees:</strong> Group Purchasing Organization fees</li>
                                    <li><strong>Signing Bonuses:</strong> One-time contract signing incentives</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-1">Comparison View</h4>
                                <p className="text-sm text-muted-foreground">
                                    Toggle between showing your forecast values and budget numbers for comparison
                                    using the "Show Comparison" / "Show Forecast" button in the top-right corner.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-1">Input Values</h4>
                                <p className="text-sm text-muted-foreground">
                                    Enter dollar amounts for each revenue category. Edited values will be highlighted in
                                    <span className="text-green-600 font-medium"> green</span>. If budget values are available and no
                                    forecast exists, budget values will be used as defaults.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-1">Actual Values</h4>
                                <p className="text-sm text-muted-foreground">
                                    Past months with actuals that differ from forecast will show an
                                    <span className="text-orange-500 font-medium"> orange</span> border.
                                    Hover over these cells to see the actual values and variance.
                                </p>
                            </div>
                        </div>

                        <Alert>
                            <AlertDescription>
                                <strong>Note:</strong> Other Revenue data is captured monthly. All changes will be saved
                                when you click the "Save Other Revenue" button. Unsaved changes will be lost if you navigate away.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Other Revenue</CardTitle>
                                <div className="mt-2 p-3 text-sm">
                                    <p>
                                        <strong>Note:</strong> Other Revenue may only be input by month. Please reach out to Towne Park Finance department with any questions.
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleComparisonView}
                            >
                                {showComparison ? (
                                    <>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Show Forecast
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="mr-2 h-4 w-4" />
                                        Show Comparison
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            {isLoading ? (
                                <Skeleton className="h-[400px] w-full" />
                            ) : (
                                <table
                                    ref={tableRef}
                                    className="w-full border-collapse"
                                    {...spreadsheetNavigation.tableProps}
                                >
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2 px-2 font-medium text-sm">Month</th>
                                            {REVENUE_TYPES.map((revenue) => (
                                                <th key={revenue.id} className="text-center py-2 px-2 font-medium text-sm">
                                                    {revenue.label} ($)
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timePeriods.map((period, rowIndex) => (
                                            <tr key={period.id} className="border-b hover:bg-muted/50">
                                                <td className="py-2 px-2 text-sm font-medium">
                                                    <div className="flex flex-col items-start">
                                                        {period.label}
                                                        {isPastMonth(period.date) &&
                                                            REVENUE_TYPES.some(revenue =>
                                                                getDataForPeriod(period.id, revenue.id as RevenueTypeId).actual !== undefined &&
                                                                getDataForPeriod(period.id, revenue.id as RevenueTypeId).actual !== null
                                                            ) && (
                                                                <span className="text-orange-500 text-xs mt-1">Actual</span>
                                                            )
                                                        }
                                                    </div>
                                                </td>
                                                {REVENUE_TYPES.map((revenue, colIndex) => {
                                                    const actualValue = getDataForPeriod(period.id, revenue.id as RevenueTypeId).actual ?? 0;
                                                    const displayValue = getCellValue(period.id, revenue.id as RevenueTypeId) ?? 0;
                                                    const comparisonValue = getDataForPeriod(period.id, revenue.id as RevenueTypeId).budget ?? 0;
                                                    const variance = calculateVariance(period.id, revenue.id as RevenueTypeId);
                                                    const hasDiffActual = hasDifferentActual(period.id, revenue.id as RevenueTypeId, period.date);

                                                    const isCellCurrentlyEdited = editedCells[period.id]?.[revenue.id as RevenueTypeId] !== undefined;
                                                    const isGreenHighlight = Math.abs(displayValue - comparisonValue) > 0.01 && displayValue !== 0 && !showComparison && !isPastMonth(period.date);
                                                    const isActiveCell = spreadsheetNavigation.activeCell?.rowIndex === rowIndex && spreadsheetNavigation.activeCell?.colIndex === colIndex;

                                                    return (
                                                        <td
                                                            key={`${period.id}-${revenue.id}`}
                                                            data-row={rowIndex}
                                                            data-col={colIndex}
                                                            className={`py-2 px-2 text-center cursor-ns-resize ${isActiveCell ? 'border-2 border-blue-500 z-10 relative' : ''} ${dragPreviewCells.some(cell => cell.rowIndex === rowIndex && cell.colIndex === colIndex) ? "border-2 border-blue-500" : ""}`}
                                                            {...spreadsheetNavigation.getCellProps(rowIndex, colIndex)}
                                                            onMouseDown={(e) => {
                                                                if (e.button !== 0) return;
                                                                handleDragStart(rowIndex, colIndex);
                                                            }}
                                                            onMouseMove={(e) => {
                                                                if (isDragging) {
                                                                    handleDragMove(rowIndex, colIndex);
                                                                }
                                                            }}
                                                            onMouseUp={handleDragEnd}
                                                        >
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="relative">
                                                                        <NumericFormat
                                                                            value={displayValue}
                                                                            onValueChange={(values) => {
                                                                                handleCellChange(period.id, revenue.id as RevenueTypeId, values.value);
                                                                            }}
                                                                            onFocus={() => {
                                                                                const cellKey = `${rowIndex}-${colIndex}`;
                                                                                replaceOnNextInputRef.current[cellKey] = true;
                                                                            }}
                                                                            onKeyDown={(e) => {
                                                                                const cellKey = `${rowIndex}-${colIndex}`;
                                                                                if (
                                                                                    replaceOnNextInputRef.current[cellKey] &&
                                                                                    e.key.length === 1 &&
                                                                                    !e.ctrlKey && !e.metaKey && !e.altKey
                                                                                ) {
                                                                                    e.preventDefault();
                                                                                    handleCellChange(period.id, revenue.id as RevenueTypeId, e.key);
                                                                                    replaceOnNextInputRef.current[cellKey] = false;
                                                                                }
                                                                            }}
                                                                            thousandSeparator={true}
                                                                            prefix="$"
                                                                            decimalScale={2}
                                                                            allowNegative={false}
                                                                            placeholder="0.00"
                                                                            readOnly={showComparison || isPastMonth(period.date)}
                                                                            disabled={showComparison || isPastMonth(period.date)}
                                                                            className={`w-full text-center py-1 px-1 rounded
                                                                            ${isGreenHighlight ? "bg-green-200 border-green-200 dark:bg-green-900" : ""}
                                                                            ${hasDiffActual ? "border-2 border-orange-400" : "border"}
                                                                            text-foreground dark:text-foreground
                                                                            rounded-sm border border-input bg-background
                                                                            focus-visible:outline-none focus-visible:ring-1
                                                                            disabled:cursor-not-allowed disabled:opacity-50`}
                                                                        />
                                                                    </div>
                                                                </TooltipTrigger>
                                                                {!showComparison && calculateVariance(period.id, revenue.id as RevenueTypeId).dollars !== 0 && !isPastMonth(period.date) && (
                                                                    <TooltipContent>
                                                                        <div className="text-sm">
                                                                            <div className="font-medium">Variance from Budget</div>
                                                                            <div className={getVarianceColor(variance.percent)}>
                                                                                {variance.percent > 0 ? "+" : ""}
                                                                                {variance.percent}% (${variance.dollars > 0 ? "+" : ""}{variance.dollars.toFixed(2)})
                                                                            </div>
                                                                        </div>
                                                                    </TooltipContent>
                                                                )}
                                                                {hasDiffActual && actualValue !== null && (
                                                                    <TooltipContent>
                                                                        <div className="text-sm">
                                                                            <div className="font-medium">Actual Value:</div>
                                                                            <div className={actualValue > displayValue ? "text-green-500" : "text-red-500"}>
                                                                                ${actualValue.toFixed(2)}
                                                                            </div>
                                                                            <div className={actualValue > displayValue ? "text-green-500" : "text-red-500"}>
                                                                                {actualValue > displayValue ? "+" : ""}
                                                                                {displayValue !== 0
                                                                                    ? (((actualValue - displayValue) / displayValue) * 100).toFixed(1)
                                                                                    : "0.0"}
                                                                                % ({actualValue > displayValue ? "+" : ""}${(actualValue - displayValue).toFixed(2)})
                                                                            </div>
                                                                        </div>
                                                                    </TooltipContent>
                                                                )}
                                                            </Tooltip>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    );
});

export default OtherRevenue;
