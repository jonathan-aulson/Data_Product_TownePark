import { useSpreadsheetNavigation } from "@/hooks/useSpreadsheetNavigation";
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import {
    PARKING_RATE_TYPE_MAPPING,
    PARKING_RATE_TYPE_NAMES,
    ParkingRateData,
    ParkingRateDetailData
} from "@/lib/models/ParkingRates";
import { Customer } from "@/lib/models/Statistics";
import { ChevronDown, ChevronUp, Eye, EyeOff, Info } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { Alert, AlertDescription } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { useToast } from "../../ui/use-toast";
import useDragAndCopy, { DragCell } from "@/hooks/useDragAndCopy";


interface ParkingRateFormProps {
    customers: Customer[];
    error: string | null;
    isParkingRateGuideExpanded: boolean;
    setIsParkingRateGuideExpanded: (value: boolean) => void;
    selectedSite: string;
    startingMonth: string;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: (dirty: boolean) => void;
    onLoadingChange?: (loading: boolean) => void;
}

const ParkingRateForm = forwardRef(function ParkingRateForm(
    {
        customers,
        error,
        isParkingRateGuideExpanded: isGuideExpanded,
        setIsParkingRateGuideExpanded: setIsGuideExpanded,
        selectedSite,
        startingMonth,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        onLoadingChange
    }: ParkingRateFormProps,
    ref
) {
    const [isLoadingRates, setIsLoadingRates] = useState(false);
    const [manualActiveCell, setManualActiveCell] = useState<{ rowIndex: number; colIndex: number } | null>(null);


    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(isLoadingRates);
        }
    }, [isLoadingRates, onLoadingChange]);
    const [isSaving, setIsSaving] = useState(false);
    const [parkingRateId, setParkingRateId] = useState<string>("");

    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    const [showBudgetedRates, setShowBudgetedRates] = useState<boolean>(false);
    const [isParkingRatesExpanded, setIsParkingRatesExpanded] = useState<boolean>(true);

    const [actualRates, setActualRates] = useState<ParkingRateDetailData[]>([]);
    const [budgetRates, setBudgetRates] = useState<ParkingRateDetailData[]>([]);
    const [forecastRates, setForecastRates] = useState<ParkingRateDetailData[]>([]);
    const [pendingAction, setPendingAction] = useState<{ type: string, payload?: any } | null>(null);
    const [editedCells, setEditedCells] = useState<Record<string, Record<number, number>>>({});
    const [savedEditedCells, setSavedEditedCells] = useState<Record<string, Record<number, number>>>({});
    const tableRef = useRef<HTMLTableElement>(null);
    // For spreadsheet-like replace-on-type
    const shouldReplaceOnNextInput = useRef(false);

    const { toast } = useToast();

    const months = useMemo(() => [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], []);

    const parkingRateTypes = useMemo(() => PARKING_RATE_TYPE_NAMES, []);

    useEffect(() => {
        if (!selectedSite || !selectedYear) return;

        fetchParkingRates();
    }, [selectedSite, selectedYear]);

    useEffect(() => {
        const [year] = startingMonth.split("-");
        setSelectedYear(parseInt(year, 10));
    }, [startingMonth]);

    const fetchParkingRates = async () => {
        setIsLoadingRates(true);

        try {
            const response = await fetch(`/api/parkingRates/${selectedSite}/${selectedYear}`);

            if (!response.ok) {
                throw new Error(`Error fetching parking rates: ${response.status}`);
            }

            const data: ParkingRateData = await response.json();
            processParkingRatesData(data);
        } catch (err) {
            console.error('Failed to fetch parking rates:', err);
            toast({
                title: "Error",
                description: "Failed to load parking rates data. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsLoadingRates(false);
        }
    };

    const processParkingRatesData = (data: ParkingRateData): void => {
        setParkingRateId(data.parkingRateId || "");

        const newActualRates: ParkingRateDetailData[] = [];
        const newBudgetRates: ParkingRateDetailData[] = [];
        let newForecastRates: ParkingRateDetailData[] = [];

        if (data.actualRates && data.actualRates.length > 0) {
            data.actualRates.forEach(rate => {
                newActualRates.push(rate);
            });
        }

        if (data.budgetRates && data.budgetRates.length > 0) {
            data.budgetRates.forEach(rate => {
                newBudgetRates.push(rate);
            });
        }

        if (data.forecastRates && data.forecastRates.length > 0) {
            data.forecastRates.forEach(rate => {
                newForecastRates.push(rate);
            });
        } else if (newBudgetRates.length > 0) {
            newForecastRates = newBudgetRates.map(rate => ({
                ...rate,
                parkingRateDetailId: "",
            }));
        }

        setActualRates(newActualRates);
        setBudgetRates(newBudgetRates);
        setForecastRates(newForecastRates);
    };

    const ensureCompleteRateData = (rates: ParkingRateDetailData[]): ParkingRateDetailData[] => {
        const uniqueRates = new Map<string, ParkingRateDetailData>();

        rates.forEach(rate => {
            const key = `${rate.month}-${rate.rateCategory}`;
            if (!uniqueRates.has(key) ||
                (rate.parkingRateDetailId && !uniqueRates.get(key)?.parkingRateDetailId)) {
                uniqueRates.set(key, rate);
            }
        });

        for (const rateType of parkingRateTypes) {
            const rateCategory = PARKING_RATE_TYPE_MAPPING[rateType];
            if (!rateCategory) continue;

            for (let month = 1; month <= 12; month++) {
                const key = `${month}-${rateCategory}`;

                if (!uniqueRates.has(key)) {
                    uniqueRates.set(key, {
                        parkingRateDetailId: "",
                        month: month,
                        rateCategory: rateCategory,
                        rate: 0,
                        isIncrease: false,
                        increaseAmount: 0
                    });
                }
            }
        }

        return Array.from(uniqueRates.values());
    };

    const handleSaveParkingRates = async () => {
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
            const completeForecastRates = ensureCompleteRateData(forecastRates);

            const payload: ParkingRateData = {
                parkingRateId: parkingRateId,
                name: customer?.siteName || "",
                customerSiteId: selectedSite,
                siteNumber: customer?.siteNumber || "",
                year: selectedYear,
                actualRates: [],
                budgetRates: [],
                forecastRates: completeForecastRates
            };

            const response = await fetch(`/api/parkingRates`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error saving parking rates: ${response.status}`);
            }

            toast({
                title: "Success",
                description: "Parking rates saved successfully."
            });

            setEditedCells({});
            setSavedEditedCells({});
            setHasUnsavedChanges(false);

        } catch (err) {
            console.error('Failed to save parking rates:', err);
            toast({
                title: "Error",
                description: "Failed to save parking rates. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    const applyYearChange = (value: string) => {
        setSelectedYear(parseInt(value, 10));
    };

    const toggleBudgetedRates = () => {
        applyToggleView();
    };

    // Helper to check if any forecast value differs from budget value
    const hasForecastDiffFromBudget = () => {
        for (const rateType of parkingRateTypes) {
            const rateCategory = PARKING_RATE_TYPE_MAPPING[rateType];
            if (!rateCategory) continue;
            for (let month = 1; month <= 12; month++) {
                const forecastRate = forecastRates.find(r => r.month === month && r.rateCategory === rateCategory)?.rate ?? 0;
                const budgetRate = budgetRates.find(r => r.month === month && r.rateCategory === rateCategory)?.rate ?? 0;
                if (forecastRate !== budgetRate) {
                    return true;
                }
            }
        }
        return false;
    };

    const applyToggleView = () => {
        if (showBudgetedRates) {
            setEditedCells(savedEditedCells);
            setHasUnsavedChanges(hasForecastDiffFromBudget());
        } else {
            setSavedEditedCells(editedCells);
            setEditedCells({});
            setHasUnsavedChanges(false);
        }
        setShowBudgetedRates(!showBudgetedRates);
    };

    const handleRateChange = (rateType: string, monthIndex: number, value: string) => {
        const numValue = value?.trim() === "" || isNaN(parseFloat(value)) ? 0 : parseFloat(value);

        const rateCategory = PARKING_RATE_TYPE_MAPPING[rateType];
        if (!rateCategory) return;

        if (!showBudgetedRates) {
            const updatedRates = [...forecastRates];

            const existingRateIndex = updatedRates.findIndex(
                rate => rate.month === monthIndex + 1 && rate.rateCategory === rateCategory
            );

            const budgetRate = budgetRates.find(r => r.month === monthIndex + 1 && r.rateCategory === rateCategory);
            const forecastRate = forecastRates.find(r => r.month === monthIndex + 1 && r.rateCategory === rateCategory);
            const originalValue = forecastRate?.rate ?? budgetRate?.rate ?? 0;

            let newEditedCells = { ...editedCells };
            if (!newEditedCells[rateType]) {
                newEditedCells[rateType] = {};
            }
            if (numValue !== originalValue) {
                newEditedCells[rateType][monthIndex] = numValue;
            } else {
                delete newEditedCells[rateType][monthIndex];
                if (Object.keys(newEditedCells[rateType]).length === 0) {
                    delete newEditedCells[rateType];
                }
            }
            setEditedCells(newEditedCells);
            setHasUnsavedChanges(Object.keys(newEditedCells).length > 0);

            if (existingRateIndex >= 0) {
                updatedRates[existingRateIndex] = {
                    ...updatedRates[existingRateIndex],
                    rate: numValue
                };
            } else {
                updatedRates.push({
                    parkingRateDetailId: "",
                    month: monthIndex + 1,
                    rateCategory: rateCategory,
                    rate: numValue,
                    isIncrease: false,
                    increaseAmount: 0
                });
            }

            setForecastRates(updatedRates);
        }
    };

    const getRateDisplayValue = (rateType: string, monthIndex: number): string => {
        const rateCategory = PARKING_RATE_TYPE_MAPPING[rateType];
        if (!rateCategory) return "0.00";

        const month = monthIndex + 1;

        if (showBudgetedRates) {
            const rate = budgetRates.find(r => r.month === month && r.rateCategory === rateCategory);
            return rate ? rate.rate.toFixed(2) : "0.00";
        } else {
            const rate = forecastRates.find(r => r.month === month && r.rateCategory === rateCategory);
            return rate ? rate.rate.toFixed(2) : "0.00";
        }
    };

    const getBudgetedValue = (rateType: string, monthIndex: number): string => {
        const rateCategory = PARKING_RATE_TYPE_MAPPING[rateType];
        if (!rateCategory) return "0.00";

        const month = monthIndex + 1;
        const rate = budgetRates.find(r => r.month === month && r.rateCategory === rateCategory);
        return rate ? rate.rate.toFixed(2) : "0.00";
    };

    const getActualizedValue = (rateType: string, monthIndex: number): string | null => {
        const rateCategory = PARKING_RATE_TYPE_MAPPING[rateType];
        if (!rateCategory) return null;

        const month = monthIndex + 1;
        const rate = actualRates.find(r => r.month === month && r.rateCategory === rateCategory);
        return rate ? rate.rate.toFixed(2) : null;
    };

    const isFieldEdited = (rateType: string, monthIndex: number): boolean => {
        if (showBudgetedRates) return false;

        const rateCategory = PARKING_RATE_TYPE_MAPPING[rateType];
        if (!rateCategory) return false;

        const month = monthIndex + 1;
        const forecastRate = forecastRates.find(r => r.month === month && r.rateCategory === rateCategory)?.rate ?? 0;
        const budgetRate = budgetRates.find(r => r.month === month && r.rateCategory === rateCategory)?.rate ?? 0;

        return forecastRate !== budgetRate;
    };

    const isReadOnly = (monthIndex: number): boolean => {
        if (showBudgetedRates) return true;

        const currentYear = new Date().getFullYear();

        if (selectedYear < currentYear) {
            return true;
        }

        if (selectedYear === currentYear) {
            const currentMonth = new Date().getMonth();
            return monthIndex <= currentMonth - 1;
        }

        return false;
    };

    const hasActualizedData = (monthIndex: number): boolean => {
        const month = monthIndex + 1;
        const rateExists = actualRates.some(r => r.month === month);
        return rateExists;
    };

    useImperativeHandle(ref, () => ({
        save: handleSaveParkingRates
    }));

    // Spreadsheet navigation configuration
    const spreadsheetNavigation = useSpreadsheetNavigation({
        tableRef,
        rowCountCallback: () => parkingRateTypes.length,
        columnCountCallback: () => months.length,
        isCellNavigableCallback: (rowIndex: number, colIndex: number) => {
            return true; // All cells are navigable
        },
        isCellEditableCallback: (rowIndex: number, colIndex: number) => {
            return !isReadOnly(colIndex) && !showBudgetedRates;
        },
        onCellActivate: (rowIndex: number, colIndex: number, cellElement: HTMLElement | null) => {
            if (cellElement) {
                const input = cellElement.querySelector('input');
                if (input) {
                    input.focus({ preventScroll: true });
                    input.select();
                }
            }
        },
        onCellEditRequest: (rowIndex: number, colIndex: number) => {
            const cellElement = tableRef.current?.querySelector(`#cell-${rowIndex}-${colIndex}`);
            if (cellElement) {
                const input = cellElement.querySelector('input') as HTMLInputElement;
                if (input) {
                    input.focus({ preventScroll: true });
                    input.select();
                }
            }
        },
        onCellSubmit: (rowIndex: number, colIndex: number) => {
            const cellElement = tableRef.current?.querySelector(`#cell-${rowIndex}-${colIndex}`);
            if (cellElement) {
                const input = cellElement.querySelector('input') as HTMLInputElement;
                if (input) {
                    input.blur();
                }
            }
        },
        onCellCancel: (rowIndex: number, colIndex: number) => {
            const cellElement = tableRef.current?.querySelector(`#cell-${rowIndex}-${colIndex}`);
            if (cellElement) {
                const input = cellElement.querySelector('input') as HTMLInputElement;
                if (input) {
                    const rateType = parkingRateTypes[rowIndex];
                    const originalValue = getRateDisplayValue(rateType, colIndex);
                    input.value = originalValue;
                    input.blur();
                }
            }
        }
    });

    function determineStartCell(

        activeCell: { rowIndex: number; colIndex: number } | null,
        selectedCells: { rowIndex: number; colIndex: number }[]
    ): { rowIndex: number; colIndex: number } | null {
        if (activeCell) return activeCell;
        if (selectedCells.length > 0) {
            return [...selectedCells].sort((a, b) => a.rowIndex - b.rowIndex || a.colIndex - b.colIndex)[0];
        }
        return null;
    }

    function generateAutoSelection(
        startRow: number,
        startCol: number,
        rowCount: number,
        maxRows: number
    ): { rowIndex: number; colIndex: number }[] {
        const rowsToSelect = Math.min(rowCount, maxRows - startRow);
        const selection = [];
        for (let i = 0; i < rowsToSelect; i++) {
            selection.push({ rowIndex: startRow + i, colIndex: startCol });
        }
        return selection;
    }

    function generatePastedSelection(
        startRow: number,
        startCol: number,
        pastedRows: number,
        pastedCols: number,
        maxRows: number,
        maxCols: number
    ): { rowIndex: number; colIndex: number }[] {
        const selection = [];
        for (let i = 0; i < pastedRows; i++) {
            const targetRow = startRow + i;
            if (targetRow >= maxRows) break;
            selection.push({ rowIndex: targetRow, colIndex: startCol });

        }
        return selection;
    }

    // Drag/copy cell highlighting effect

    const {
        dragPreviewCells,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        isDragPreviewCell,
        isDragging
    } = useDragAndCopy({
        onCopy: (cells) => {
            return cells.map(cell => {
                const rateType = parkingRateTypes[cell.rowIndex];
                return getRateDisplayValue(rateType, cell.colIndex);
            });
        },
        onPaste: (cells, clipboard) => {
            // Parse clipboard into 2D array (rows/columns)
            let parsedRows: string[][] = [];
            if (clipboard.length === 1 && clipboard[0].includes("\n")) {
                parsedRows = clipboard[0].split("\n").map(row => row.split("\t"));
            } else if (clipboard.length === 1 && clipboard[0].includes("\t")) {
                parsedRows = [clipboard[0].split("\t")];
            } else {
                parsedRows = clipboard.map(row => [row]);
            }

            // Remove trailing empty row if present (from Excel copy)
            if (parsedRows.length > 1 && parsedRows[parsedRows.length - 1].every(cell => cell === "")) {
                parsedRows.pop();
            }

            if (parsedRows.length === 0) return;

            const startCell = determineStartCell(manualActiveCell ?? spreadsheetNavigation.activeCell, dragPreviewCells);
            if (!startCell) return;

            const { rowIndex: startRow, colIndex: startCol } = startCell;

            let updatedRates = [...forecastRates];
            let newEditedCells = { ...editedCells };

            for (let i = 0; i < parsedRows.length; i++) {
                const rowVals = parsedRows[i];
                const targetRow = startRow + i;
                if (targetRow >= parkingRateTypes.length) break;

                const rateType = parkingRateTypes[targetRow];
                const rateCategory = PARKING_RATE_TYPE_MAPPING[rateType];
                if (!rateCategory) continue;

                for (let j = 0; j < rowVals.length; j++) {
                    const targetCol = startCol + j;
                    if (targetCol >= months.length) break;

                    const value = rowVals[j] ?? "";
                    const numValue = value === "" ? 0 : parseFloat(value);
                    const month = targetCol + 1;

                    const existingRateIndex = updatedRates.findIndex(
                        rate => rate.month === month && rate.rateCategory === rateCategory
                    );
                    const budgetRate = budgetRates.find(
                        r => r.month === month && r.rateCategory === rateCategory
                    );
                    const forecastRate = forecastRates.find(
                        r => r.month === month && r.rateCategory === rateCategory
                    );
                    const originalValue = forecastRate?.rate ?? budgetRate?.rate ?? 0;

                    if (!newEditedCells[rateType]) {
                        newEditedCells[rateType] = {};
                    }

                    if (numValue !== originalValue) {
                        newEditedCells[rateType][targetCol] = numValue;
                    } else {
                        delete newEditedCells[rateType][targetCol];
                        if (Object.keys(newEditedCells[rateType]).length === 0) {
                            delete newEditedCells[rateType];
                        }
                    }

                    if (existingRateIndex >= 0) {
                        updatedRates = [
                            ...updatedRates.slice(0, existingRateIndex),
                            { ...updatedRates[existingRateIndex], rate: numValue },
                            ...updatedRates.slice(existingRateIndex + 1)
                        ];
                    } else {
                        updatedRates = [
                            ...updatedRates,
                            {
                                parkingRateDetailId: "",
                                month,
                                rateCategory,
                                rate: numValue,
                                isIncrease: false,
                                increaseAmount: 0
                            }
                        ];
                    }
                }
            }

            setForecastRates(updatedRates);
            setEditedCells(newEditedCells);
            setHasUnsavedChanges(Object.keys(newEditedCells).length > 0);
        },
        activeCell: manualActiveCell,
        rowCount: parkingRateTypes.length
    });

    return (
        <div className="w-full p-1 space-y-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Parking Rates</h1>
                    <p className="text-muted-foreground">Manage parking rates for the properties you manage.</p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
            <Button
                variant="outline"
                onClick={() => setIsGuideExpanded(!isGuideExpanded)}
                className="flex items-center gap-2"
                data-qa-id="parking-rates-button-toggle-guide"
            >
                <Info className="h-4 w-4" />
                {isGuideExpanded ? "Hide Guide" : "Show Guide"}
                {isGuideExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {isGuideExpanded && (
                <div className="space-y-4 p-4 border rounded-md bg-muted/20 mb-6">
                    <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                    <p>This page allows you to view and manage parking rates across multiple years.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold mb-2">Year Selection</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Use the year dropdown to switch between previous, current, and future years</li>
                                <li>Previous year ({new Date().getFullYear() - 1}): View historical data (read-only)</li>
                                <li>Current year ({new Date().getFullYear()}): View and edit current year data</li>
                                <li>Next year ({new Date().getFullYear() + 1}): Plan and forecast future rates</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Parking Rates Table</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Shows monthly rates for each parking type</li>
                                <li>Toggle between budgeted and forecasted rates using the button</li>
                                <li>
                                    Numbers in <span className="text-orange-500 font-medium">orange</span> show actualized values
                                    (where available)
                                </li>
                                <li>
                                    Fields you edit will be highlighted in <span className="text-blue-500 font-medium">blue</span>
                                </li>
                                <li>Your forecasted rates are preserved when switching between years or views</li>
                            </ul>
                        </div>
                    </div>
                    <Alert>
                        <AlertDescription>
                            When you click "Save Changes", all your edited values will be saved as the forecasted rates for the
                            selected year.
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Parking Rates</CardTitle>
                    <div className="grid gap-4">
                        <div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleBudgetedRates}
                                data-qa-id="parking-rates-button-toggle-budget-forecast"
                            >
                                {showBudgetedRates ?
                                    (
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
                    </div>
                </CardHeader>
                {isParkingRatesExpanded && (
                    <CardContent>

                        <div className="rounded-md border overflow-auto">
                            {isLoadingRates ? (
                                <div className="p-4">
                                    <Skeleton className="h-[400px] w-full" />
                                </div>
                            ) : (
                                <Table ref={tableRef} className="w-full" {...spreadsheetNavigation.tableProps}>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[160px] bg-muted whitespace-normal break-words text-sm sticky left-0 z-20">Rate Type</TableHead>
                                            {months.map((month) => (
                                                <TableHead
                                                    key={month}
                                                    className="text-center whitespace-normal break-words text-sm min-w-[80px]"
                                                >
                                                    {month}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {parkingRateTypes.map((rateType, rowIndex) => (
                                            <TableRow key={rateType}>
                                                <TableCell className="font-medium whitespace-nowrap bg-background sticky left-0 z-20">
                                                    {rateType}
                                                </TableCell>
                                                {months.map((_, monthIndex) => (
                                                    <TableCell
                                                        key={`${rateType}-${monthIndex}`}
                                                        data-row={rowIndex}
                                                        data-col={monthIndex}
                                                        data-cell-id={`cell-${rowIndex}-${monthIndex}`}
                                                        className={isDragPreviewCell(rowIndex, monthIndex) && !isReadOnly(monthIndex)
                                                            ? "cursor-ns-resize border-2 border-blue-500 z-10 relative"
                                                            : "cursor-ns-resize"}                                                        {...spreadsheetNavigation.getCellProps(rowIndex, monthIndex)}
                                                        onMouseDown={(e) => {
                                                            if (e.button !== 0) return;
                                                            setManualActiveCell({ rowIndex, colIndex: monthIndex });
                                                            // Clear drag selection if not dragging
                                                            if (!isDragging) {
                                                                // @ts-ignore
                                                                if (typeof dragPreviewCells !== "undefined" && dragPreviewCells.length > 0) {
                                                                    // Clear dragPreviewCells by calling handleDragEnd
                                                                    handleDragEnd();
                                                                }
                                                            }
                                                            handleDragStart(rowIndex, monthIndex);
                                                        }}
                                                        onMouseMove={(e) => {
                                                            if (isDragging) {
                                                                handleDragMove(rowIndex, monthIndex);
                                                            }
                                                        }}
                                                        onMouseUp={handleDragEnd}
                                                    >
                                                        <div className="flex flex-col">
                                                            <NumericFormat
                                                                value={getRateDisplayValue(rateType, monthIndex)}
                                                                onValueChange={(values) => {
                                                                    handleRateChange(rateType, monthIndex, values.value);
                                                                }}
                                                                onFocus={() => {
                                                                    shouldReplaceOnNextInput.current = true;
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (
                                                                        shouldReplaceOnNextInput.current &&
                                                                        e.key.length === 1 &&
                                                                        !e.ctrlKey && !e.metaKey && !e.altKey
                                                                    ) {
                                                                        e.preventDefault();
                                                                        handleRateChange(rateType, monthIndex, e.key);
                                                                        shouldReplaceOnNextInput.current = false;
                                                                    }
                                                                }}
                                                                thousandSeparator={true}
                                                                prefix="$"
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false}
                                                                placeholder={getBudgetedValue(rateType, monthIndex)}
                                                                readOnly={isReadOnly(monthIndex)}
                                                                disabled={isReadOnly(monthIndex)}
                                                                data-qa-id={`parking-rates-input-${rateType.toLowerCase().replace(' ', '-')}-${monthIndex}`}
                                                                className={`text-center w-full ${!showBudgetedRates && isFieldEdited(rateType, monthIndex) && !isReadOnly(monthIndex)
                                                                    ? "border-blue-600 bg-blue-50 dark:bg-slate-800"
                                                                    : ""
                                                                    } rounded-sm border border-input bg-background px-1 py-0.5 
                                                            focus-visible:outline-none focus-visible:ring-1 
                                                            disabled:cursor-not-allowed disabled:opacity-50`}
                                                            />
                                                            <div className="text-orange-500 text-sm font-medium text-center mt-1 h-5">
                                                                {hasActualizedData(monthIndex) && getActualizedValue(rateType, monthIndex) !== null
                                                                    ? `$${getActualizedValue(rateType, monthIndex)}`
                                                                    : ""}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    );
});

export default ParkingRateForm;
