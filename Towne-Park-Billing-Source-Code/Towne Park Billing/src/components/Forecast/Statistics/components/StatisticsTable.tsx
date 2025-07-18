import React from "react";
import useDragAndCopy, { DragCell } from "@/hooks/useDragAndCopy";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { NumericFormat } from "react-number-format";
import { cn, formatCurrency } from "@/lib/utils";
import {
    ALL_STATISTICS,
    FormValuesByDate,
    SiteStatisticData,
    SiteStatisticDetailData,
    TimeRangeType
} from "@/lib/models/Statistics";
import { HEADER_DISPLAY_NAMES } from "../lib/constants";
import { formatPercentage, formatPeriodLabelForDisplay, getShortMonthName } from "../lib/helpers";
import { PeriodEntry } from "../hooks/usePeriodEntries";

interface StatisticsTableComponentProps {
    isLoadingStatistics: boolean;
    selectedSite: string;
    selectedPeriod: string;
    inputType: string;
    timePeriod: TimeRangeType;
    showingBudget: boolean;
    currentMonthIndex: number;
    allMonthsData: SiteStatisticData[];
    periodEntries: PeriodEntry[];
    formValues: FormValuesByDate;
    budgetValues: FormValuesByDate;
    forecastValues: FormValuesByDate;
    actualValues: FormValuesByDate;
    budgetRatesByPeriod: Record<string, any>;
    handleInputChange: (periodStart: string, statId: string, value: string) => void;
    isFieldModified: (periodStart: string, statId: string) => boolean;
    calculateOvernightSelf: (periodStart: string) => number;
    calculateOvernightValet: (periodStart: string) => number;
    calculateActualOvernight: (periodStart: string, type: "self" | "valet") => number;
    calculateOccupancy: (periodStart: string) => number;
    getOccupiedRooms: (periodStart: string) => number;
    calculateExternalRevenue: (periodStart: string) => number;
    calculateActualExternalRevenue: (periodStart: string) => number;
    isPastPeriod: boolean;
    tableRef: React.RefObject<HTMLTableElement>;
    spreadsheetNavigation: any;
    setFormValues: React.Dispatch<React.SetStateAction<FormValuesByDate>>;
    setForecastValues: React.Dispatch<React.SetStateAction<FormValuesByDate>>;
    setMonthlyForecastValues: React.Dispatch<React.SetStateAction<Record<number, FormValuesByDate>>>;
    monthlyForecastValues: Record<number, FormValuesByDate>;
    setHasUnsavedChanges: (dirty: boolean) => void;
}

export function StatisticsTableComponent({
    isLoadingStatistics,
    selectedSite,
    selectedPeriod,
    inputType,
    timePeriod,
    showingBudget,
    currentMonthIndex,
    allMonthsData,
    periodEntries,
    formValues,
    budgetValues,
    forecastValues,
    actualValues,
    budgetRatesByPeriod,
    handleInputChange,
    isFieldModified,
    calculateOvernightSelf,
    calculateOvernightValet,
    calculateActualOvernight,
    calculateOccupancy,
    getOccupiedRooms,
    calculateExternalRevenue,
    calculateActualExternalRevenue,
    isPastPeriod,
    tableRef,
    spreadsheetNavigation,
    setForecastValues,
    setFormValues,
    setMonthlyForecastValues,
    monthlyForecastValues,
    setHasUnsavedChanges
}: StatisticsTableComponentProps) {

    const displayStatistics = React.useMemo(() => {
        const statsList = [
            inputType === "occupied-rooms"
                ? ALL_STATISTICS.find(s => s.id === "occupied-rooms")
                : ALL_STATISTICS.find(s => s.id === "occupancy"),
            ALL_STATISTICS.find(s => s.id === "valet-daily"),
            ALL_STATISTICS.find(s => s.id === "valet-monthly"),
            ALL_STATISTICS.find(s => s.id === "self-daily"),
            ALL_STATISTICS.find(s => s.id === "self-monthly"),
            ALL_STATISTICS.find(s => s.id === "self-aggregator"),
            ALL_STATISTICS.find(s => s.id === "valet-aggregator"),
            ALL_STATISTICS.find(s => s.id === "valet-comps"),
            ALL_STATISTICS.find(s => s.id === "self-comps"),
            ALL_STATISTICS.find(s => s.id === "drive-in-ratio-input"),
            ALL_STATISTICS.find(s => s.id === "capture-ratio-input")
        ];
        return statsList.filter((stat): stat is typeof ALL_STATISTICS[number] => stat !== undefined);
    }, [inputType]);

    const {
        isDragging,
        dragStartCell,
        dragEndCell,
        dragPreviewCells,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        isDragPreviewCell,
        resetDragSelection,
    } = useDragAndCopy({
        activeCell: spreadsheetNavigation.activeCell,
        rowCount: periodEntries.length,
        onCopy: (cells: DragCell[], context) => {
            const { periodEntries, displayStatistics, formValues } = context;
            return cells
                .sort((a, b) => a.rowIndex - b.rowIndex)
                .map(cell => {
                    const entry = periodEntries[cell.rowIndex];
                    const stat = displayStatistics[cell.colIndex];
                    const value = entry && stat ? (formValues[entry.rowKey]?.[stat.id] ?? "") : "";
                    return value === "" ? "" : String(value);
                });
        },
        onPaste: (cells: DragCell[], clipboard: string[], context) => {
            const {
                periodEntries,
                displayStatistics,
                formValues,
                forecastValues,
                monthlyForecastValues,
                setFormValues,
                setForecastValues,
                setMonthlyForecastValues,
                currentMonthIndex,
                showingBudget,
                setHasUnsavedChanges,
            } = context;

            const newFormValues = { ...formValues };
            const newForecastValues = { ...forecastValues };
            const newMonthlyForecastValues = { ...monthlyForecastValues };

            const startCell = cells[0];
            if (!startCell) return;

            const isSingleCell = cells.length === 1;
            const colIndex = startCell.colIndex;

            for (let i = 0; i < clipboard.length; i++) {
                const rowIndex = isSingleCell ? startCell.rowIndex + i : cells[i]?.rowIndex;
                const col = isSingleCell ? colIndex : cells[i]?.colIndex;

                if (rowIndex === undefined || col === undefined) continue;

                const entry = periodEntries[rowIndex];
                const stat = displayStatistics[col];
                if (!entry || !stat) continue;

                const value = clipboard[i] ?? "";
                const numValue = value === "" ? 0 : Number(value);

                if (!newFormValues[entry.rowKey]) newFormValues[entry.rowKey] = {};
                newFormValues[entry.rowKey][stat.id] = numValue;

                if (!showingBudget) {
                    if (!newForecastValues[entry.rowKey]) newForecastValues[entry.rowKey] = {};
                    newForecastValues[entry.rowKey][stat.id] = numValue;

                    if (!newMonthlyForecastValues[currentMonthIndex]) {
                        newMonthlyForecastValues[currentMonthIndex] = {};
                    }
                    if (!newMonthlyForecastValues[currentMonthIndex][entry.rowKey]) {
                        newMonthlyForecastValues[currentMonthIndex][entry.rowKey] = {};
                    }
                    newMonthlyForecastValues[currentMonthIndex][entry.rowKey][stat.id] = numValue;
                }
            }

            setFormValues(newFormValues);
            setForecastValues(newForecastValues);
            setMonthlyForecastValues(newMonthlyForecastValues);
            setHasUnsavedChanges(true);
        },

        context: {
            periodEntries,
            displayStatistics,
            formValues,
            forecastValues,
            monthlyForecastValues,
            setFormValues,
            setForecastValues,
            setMonthlyForecastValues,
            currentMonthIndex,
            showingBudget,
            setHasUnsavedChanges,
        }
    });

    // Clear drag selection when active cell changes (Tab/Enter navigation)
    React.useEffect(() => {
        resetDragSelection();
    }, [spreadsheetNavigation.activeCell]);

    if (isLoadingStatistics) {
        return (
            <div className="p-4">
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }

    return (
        <Table ref={tableRef} className="w-full table-fixed" {...spreadsheetNavigation.tableProps}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[60px] text-center whitespace-normal break-words text-xs p-1">
                        Date
                    </TableHead>
                    {displayStatistics.map((stat) => (
                        <TableHead
                            key={stat.id}
                            className="w-[80px] text-center whitespace-normal break-words text-xs p-1"
                        >
                            {HEADER_DISPLAY_NAMES[stat.id] || stat.name}
                        </TableHead>
                    ))}
                    <TableHead className="w-[70px] text-center whitespace-normal break-words text-xs p-1">
                        Self<br />Overnight
                    </TableHead>
                    <TableHead className="w-[70px] text-center whitespace-normal break-words text-xs p-1">
                        Valet<br />Overnight
                    </TableHead>
                    <TableHead className="w-[76px] text-center whitespace-normal break-words text-xs p-1">
                        {inputType === "occupied-rooms" ? "Occupancy" : <>Occupied<br />Rooms</>}
                    </TableHead>
                    <TableHead className="w-[90px] text-center whitespace-normal break-words text-xs p-1">
                        External<br />Revenue
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {periodEntries.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={displayStatistics.length + 5} className="text-center text-muted-foreground">
                            {selectedSite && selectedPeriod
                                ? "No data is available for the selected site and period."
                                : "Please select a customer site and period"}
                        </TableCell>
                    </TableRow>
                ) : (
                    periodEntries.map((entry, rowIndex) => {
                        const needsWeekendSeparatorAfter = () => {
                            if (timePeriod !== "DAILY") return false;
                            const [year, month, day] = entry.rowKey.split('-').map(Number);
                            const currentDate = new Date(year, month - 1, day);
                            const dayOfWeek = currentDate.getDay();
                            return dayOfWeek === 0;
                        };

                        const needsWeekendSeparatorBefore = () => {
                            if (timePeriod !== "DAILY") return false;
                            const [year, month, day] = entry.rowKey.split('-').map(Number);
                            const currentDate = new Date(year, month - 1, day);
                            const dayOfWeek = currentDate.getDay();
                            return dayOfWeek === 6;
                        };

                        return (
                            <React.Fragment key={entry.rowKey}>
                                {needsWeekendSeparatorBefore() && (
                                    <TableRow key={`weekend-before-${entry.rowKey}`} className="border-0">
                                        <TableCell colSpan={displayStatistics.length + 5} className="h-2 px-0 py-1 border-0 bg-gray-100 dark:bg-gray-700">
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow key={entry.rowKey}>
                                    <TableCell className="px-1 py-0.5 text-center">
                                        <div className="flex flex-col items-center">
                                            <span>
                                                {timePeriod === "WEEKLY"
                                                    ? (() => {
                                                        const match = entry.displayLabel.match(/^([A-Za-z]+)\s+(.+)$/);
                                                        if (match) {
                                                            const month = match[1];
                                                            const days = match[2];
                                                            const shortMonth = getShortMonthName(month);
                                                            return (
                                                                <>
                                                                    {shortMonth}
                                                                    <br />
                                                                    {days}
                                                                </>
                                                            );
                                                        }
                                                        return entry.displayLabel;
                                                    })()
                                                    : formatPeriodLabelForDisplay(entry.displayLabel)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    {displayStatistics.map((stat, colIndex) => {
                                        const percentFields = ["occupancy", "drive-in-ratio-input", "capture-ratio-input"];
                                        const isPercentField = percentFields.includes(stat.id);
                                        return (
                                            <TableCell
                                                data-row={rowIndex}
                                                data-col={colIndex}
                                                key={`${entry.rowKey}-${stat.id}`}
                                                data-cell-id={`cell-${rowIndex}-${colIndex}`}
                                                className={`px-1 py-0.5 min-w-[80px] cursor-ns-resize ${spreadsheetNavigation.activeCell?.rowIndex === rowIndex && spreadsheetNavigation.activeCell?.colIndex === colIndex ? 'border-2 border-blue-500 z-10 relative' : ''} ${isDragPreviewCell(rowIndex, colIndex) ? "border-2 border-blue-500 z-10 relative" : ""}`}
                                                {...spreadsheetNavigation.getCellProps(rowIndex, colIndex)}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    handleDragStart(rowIndex, colIndex);
                                                }}
                                                onMouseUp={handleDragEnd}
                                                onMouseMove={() => {
                                                    if (isDragging) handleDragMove(rowIndex, colIndex);
                                                }}
                                            >
                                                <div className="flex flex-col items-end">
                                                    <div
                                                        className={cn(
                                                            "relative group",
                                                            isDragPreviewCell(rowIndex, colIndex) && "bg-blue-100 dark:bg-blue-900/30"
                                                        )}>
                                                        <NumericFormat
                                                            value={
                                                                (() => {
                                                                    if (timePeriod === "MONTHLY" || timePeriod === "WEEKLY") {
                                                                        let value = undefined;
                                                                        for (const monthData of allMonthsData) {
                                                                            const matchingItem = (showingBudget ? monthData.budgetData : monthData.forecastData)?.find(d =>
                                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                                (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                                (timePeriod === "MONTHLY" && monthData.periodLabel === entry.rowKey)
                                                                            );
                                                                            if (matchingItem) {
                                                                                const apiFieldMap: Record<string, keyof SiteStatisticDetailData> = {
                                                                                    "occupancy": "occupancy",
                                                                                    "occupied-rooms": "occupiedRooms",
                                                                                    "valet-daily": "valetDaily",
                                                                                    "valet-monthly": "valetMonthly",
                                                                                    "self-daily": "selfDaily",
                                                                                    "self-monthly": "selfMonthly",
                                                                                    "valet-comps": "valetComps",
                                                                                    "self-comps": "selfComps",
                                                                                    "self-aggregator": "selfAggregator",
                                                                                    "valet-aggregator": "valetAggregator",
                                                                                    "drive-in-ratio-input": "driveInRatio",
                                                                                    "capture-ratio-input": "captureRatio",
                                                                                    "external-revenue": "externalRevenue"
                                                                                };
                                                                                const apiField = apiFieldMap[stat.id];
                                                                                if (apiField && matchingItem[apiField] !== undefined) {
                                                                                    value = matchingItem[apiField] as number;
                                                                                    if (stat.id === "drive-in-ratio-input" || stat.id === "capture-ratio-input") {
                                                                                        value = value / 100;
                                                                                    }
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }

                                                                        if (value !== undefined) {
                                                                            return isPercentField
                                                                                ? (value * 100).toFixed(2)
                                                                                : value.toString();
                                                                        }
                                                                        return "";
                                                                    } else {
                                                                        return isPercentField
                                                                            ? formValues[entry.rowKey]?.[stat.id] !== undefined
                                                                                ? (formValues[entry.rowKey][stat.id] * 100).toFixed(2)
                                                                                : ""
                                                                            : formValues[entry.rowKey]?.[stat.id] || "";
                                                                    }
                                                                })()
                                                            }
                                                            onValueChange={(values) => {
                                                                let inputValue = values.value;
                                                                let parsedValue: number;
                                                                if (isPercentField) {
                                                                    parsedValue = inputValue === "" ? 0 : Number(inputValue) / 100;
                                                                } else {
                                                                    parsedValue = inputValue === "" ? 0 : Number(inputValue);
                                                                }
                                                                handleInputChange(entry.rowKey, stat.id, parsedValue.toString());
                                                            }}
                                                            thousandSeparator={false}
                                                            decimalScale={isPercentField ? 2 : 2}
                                                            allowNegative={false}
                                                            placeholder={stat.placeholder}
                                                            readOnly={isPastPeriod || showingBudget || timePeriod !== "DAILY"}
                                                            disabled={isPastPeriod || showingBudget || timePeriod !== "DAILY"}
                                                            data-qa-id={`input-${stat.id}-${entry.rowKey}`}
                                                            className={`text-right w-full ${isFieldModified(entry.rowKey, stat.id) ? "border-blue-600 bg-blue-50 dark:bg-slate-800" : ""} 
                                                                rounded-sm border border-input bg-background px-1 py-0.5 
                                                                focus-visible:outline-none focus-visible:ring-1 
                                                                disabled:cursor-not-allowed disabled:opacity-50`}
                                                            suffix={isPercentField ? "%" : undefined}
                                                        />
                                                        <span className="text-orange-500 text-sm mt-1">
                                                            {actualValues[entry.rowKey]?.[stat.id] !== undefined
                                                                ? isPercentField
                                                                    ? formatPercentage(actualValues[entry.rowKey]?.[stat.id] || 0)
                                                                    : Math.round(actualValues[entry.rowKey]?.[stat.id] || 0)
                                                                : ""}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell className="text-right px-1 py-0.5">
                                        <div className="flex flex-col items-end">
                                            {(timePeriod === "MONTHLY" || timePeriod === "WEEKLY")
                                                ? (() => {
                                                    let forecastPeriod: SiteStatisticDetailData | undefined;
                                                    let budgetPeriod: SiteStatisticDetailData | undefined;

                                                    if (timePeriod === "MONTHLY") {
                                                        for (const monthData of allMonthsData) {
                                                            if (!forecastPeriod) {
                                                                forecastPeriod = monthData.forecastData?.find(d =>
                                                                    (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                    (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                    (monthData.periodLabel === entry.rowKey)
                                                                );
                                                            }
                                                            if (!budgetPeriod) {
                                                                budgetPeriod = monthData.budgetData?.find(d =>
                                                                    (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                    (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                    (monthData.periodLabel === entry.rowKey)
                                                                );
                                                            }
                                                        }
                                                    } else {
                                                        const currentMonthData = allMonthsData[currentMonthIndex];
                                                        if (currentMonthData) {
                                                            forecastPeriod = currentMonthData.forecastData?.find(d =>
                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                (d.periodLabel && d.periodLabel === entry.displayLabel)
                                                            );
                                                            budgetPeriod = currentMonthData.budgetData?.find(d =>
                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                (d.periodLabel && d.periodLabel === entry.displayLabel)
                                                            );
                                                        }
                                                    }

                                                    if (showingBudget) {
                                                        return Math.round(budgetPeriod?.selfOvernight || 0);
                                                    } else {
                                                        return Math.round(forecastPeriod?.selfOvernight ?? budgetPeriod?.selfOvernight ?? 0);
                                                    }
                                                })()
                                                : (showingBudget
                                                    ? Math.round(budgetRatesByPeriod[entry.rowKey]?.selfOvernight || 0)
                                                    : Math.round(calculateOvernightSelf(entry.rowKey)))
                                            }
                                            <span className="text-orange-500 text-sm mt-1">
                                                {actualValues[entry.rowKey] &&
                                                    (timePeriod === "DAILY"
                                                        ? Math.round(calculateActualOvernight(entry.rowKey, "self"))
                                                        : Math.round(actualValues[entry.rowKey]?.["self-overnight"] || 0))}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell data-cell-id={`cell-${rowIndex}-${displayStatistics.length}`} className="text-right px-1 py-0.5">
                                        <div className="flex flex-col items-end">
                                            {(timePeriod === "MONTHLY" || timePeriod === "WEEKLY")
                                                ? (() => {
                                                    let forecastPeriod: SiteStatisticDetailData | undefined;
                                                    let budgetPeriod: SiteStatisticDetailData | undefined;

                                                    for (const monthData of allMonthsData) {
                                                        if (!forecastPeriod) {
                                                            forecastPeriod = monthData.forecastData?.find(d =>
                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                (timePeriod === "MONTHLY" && monthData.periodLabel === entry.rowKey)
                                                            );
                                                        }
                                                        if (!budgetPeriod) {
                                                            budgetPeriod = monthData.budgetData?.find(d =>
                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                (timePeriod === "MONTHLY" && monthData.periodLabel === entry.rowKey)
                                                            );
                                                        }
                                                    }

                                                    if (showingBudget) {
                                                        return Math.round(budgetPeriod?.valetOvernight || 0);
                                                    } else {
                                                        return Math.round(forecastPeriod?.valetOvernight ?? budgetPeriod?.valetOvernight ?? 0);
                                                    }
                                                })()
                                                : (showingBudget
                                                    ? Math.round(budgetRatesByPeriod[entry.rowKey]?.valetOvernight || 0)
                                                    : Math.round(calculateOvernightValet(entry.rowKey)))
                                            }
                                            <span className="text-orange-500 text-sm mt-1">
                                                {actualValues[entry.rowKey] &&
                                                    (timePeriod === "DAILY"
                                                        ? Math.round(calculateActualOvernight(entry.rowKey, "valet"))
                                                        : Math.round(actualValues[entry.rowKey]?.["valet-overnight"] || 0))}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-1 py-0.5">
                                        <div className="flex flex-col items-end">
                                            {(timePeriod === "MONTHLY" || timePeriod === "WEEKLY")
                                                ? (() => {
                                                    let forecastPeriod: SiteStatisticDetailData | undefined;
                                                    let budgetPeriod: SiteStatisticDetailData | undefined;

                                                    for (const monthData of allMonthsData) {
                                                        if (!forecastPeriod) {
                                                            forecastPeriod = monthData.forecastData?.find(d =>
                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                (timePeriod === "MONTHLY" && monthData.periodLabel === entry.rowKey)
                                                            );
                                                        }
                                                        if (!budgetPeriod) {
                                                            budgetPeriod = monthData.budgetData?.find(d =>
                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                (timePeriod === "MONTHLY" && monthData.periodLabel === entry.rowKey)
                                                            );
                                                        }
                                                    }

                                                    if (showingBudget) {
                                                        return Math.round(budgetPeriod?.occupiedRooms || 0);
                                                    } else {
                                                        return Math.round(forecastPeriod?.occupiedRooms ?? budgetPeriod?.occupiedRooms ?? 0);
                                                    }
                                                })()
                                                : (inputType === "occupied-rooms"
                                                    ? formatPercentage(calculateOccupancy(entry.rowKey))
                                                    : Math.round(getOccupiedRooms(entry.rowKey)))
                                            }
                                            <span className="text-orange-500 text-sm mt-1">
                                                {actualValues[entry.rowKey] &&
                                                    (inputType === "occupied-rooms"
                                                        ? formatPercentage(actualValues[entry.rowKey]?.["occupancy"] || 0)
                                                        : Math.round(actualValues[entry.rowKey]?.["occupied-rooms"] || 0))}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-1 py-0.5">
                                        <div className="flex flex-col items-end">
                                            {(timePeriod === "MONTHLY" || timePeriod === "WEEKLY")
                                                ? (() => {
                                                    let forecastPeriod: SiteStatisticDetailData | undefined;
                                                    let budgetPeriod: SiteStatisticDetailData | undefined;

                                                    for (const monthData of allMonthsData) {
                                                        if (!forecastPeriod) {
                                                            forecastPeriod = monthData.forecastData?.find(d =>
                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                (timePeriod === "MONTHLY" && monthData.periodLabel === entry.rowKey)
                                                            );
                                                        }
                                                        if (!budgetPeriod) {
                                                            budgetPeriod = monthData.budgetData?.find(d =>
                                                                (d.periodStart && d.periodStart === entry.rowKey) ||
                                                                (d.periodLabel && d.periodLabel === entry.displayLabel) ||
                                                                (timePeriod === "MONTHLY" && monthData.periodLabel === entry.rowKey)
                                                            );
                                                        }
                                                    }

                                                    if (showingBudget) {
                                                        return formatCurrency(budgetPeriod?.externalRevenue || 0);
                                                    } else {
                                                        return formatCurrency(forecastPeriod?.externalRevenue || budgetPeriod?.externalRevenue || 0);
                                                    }
                                                })()
                                                : (showingBudget && timePeriod === "DAILY"
                                                    ? formatCurrency(budgetValues[entry.rowKey]?.["external-revenue"] || 0)
                                                    : formatCurrency(calculateExternalRevenue(entry.rowKey)))}
                                            <span className="text-orange-500 text-sm mt-1">
                                                {actualValues[entry.rowKey] &&
                                                    formatCurrency(calculateActualExternalRevenue(entry.rowKey))}
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {needsWeekendSeparatorAfter() && (
                                    <TableRow key={`weekend-after-${entry.rowKey}`} className="border-0">
                                        <TableCell colSpan={displayStatistics.length + 5} className="h-2 px-0 py-1 border-0 bg-gray-100 dark:bg-gray-700">
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        );
                    })
                )}
            </TableBody>
        </Table>
    );
}
