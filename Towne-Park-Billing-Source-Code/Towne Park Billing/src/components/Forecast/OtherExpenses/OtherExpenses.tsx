import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useSpreadsheetNavigation } from "@/hooks/useSpreadsheetNavigation";
import { OtherExpenseDto } from "@/lib/models/OtherExpenses";
import { Customer } from "@/lib/models/Statistics";
import { ChevronDown, ChevronUp, Eye, EyeOff, Info } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import useDragAndCopy from "@/hooks/useDragAndCopy";


interface OtherExpensesProps {
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

const EXPENSE_TYPES = [
    { id: "employeeRelations", label: "Employee Relations" },
    { id: "fuelVehicles", label: "Fuel Vehicles" },
    { id: "lossAndDamageClaims", label: "Loss & Damage Claims" },
    { id: "officeSupplies", label: "Office Supplies" },
    { id: "outsideServices", label: "Outside Services" },
    { id: "rentsParking", label: "Rents Parking" },
    { id: "repairsAndMaintenance", label: "Repairs & Maintenance" },
    { id: "repairsAndMaintenanceVehicle", label: "Repairs & Maintenance Vehicle" },
    { id: "signage", label: "Signage" },
    { id: "suppliesAndEquipment", label: "Supplies & Equipment" },
    { id: "ticketsAndPrintedMaterial", label: "Tickets & Printed Material" },
    { id: "uniforms", label: "Uniforms" },
];

type ExpenseTypeId = typeof EXPENSE_TYPES[number]["id"];

type EditedCells = Record<string, Record<ExpenseTypeId, number>>;

const EXPENSE_TYPE_KEYS = {
    employeeRelations: "employeeRelations",
    fuelVehicles: "fuelVehicles",
    lossAndDamageClaims: "lossAndDamageClaims",
    officeSupplies: "officeSupplies",
    outsideServices: "outsideServices",
    rentsParking: "rentsParking",
    repairsAndMaintenance: "repairsAndMaintenance",
    repairsAndMaintenanceVehicle: "repairsAndMaintenanceVehicle",
    signage: "signage",
    suppliesAndEquipment: "suppliesAndEquipment",
    ticketsAndPrintedMaterial: "ticketsAndPrintedMaterial",
    uniforms: "uniforms",
} as const;

type ExpenseTypeKey = keyof typeof EXPENSE_TYPE_KEYS;

const OtherExpenses = forwardRef(function OtherExpenses(
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
    }: OtherExpensesProps,
    ref
) {
    const [data, setData] = useState<OtherExpenseDto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [editedCells, setEditedCells] = useState<EditedCells>({});
    const [lastFetchKey, setLastFetchKey] = useState<string>("");
    // For spreadsheet-like replace-on-type (per-cell)
    const replaceOnNextInputRef = useRef<{ [key: string]: boolean }>({});


    const tableRef = useRef<HTMLTableElement>(null);



    const { toast } = useToast();

    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(isLoading);
        }
    }, [isLoading, onLoadingChange]);

    useEffect(() => {
        if (!selectedSite || !startingMonth) return;

        const currentFetchKey = `${selectedSite}-${startingMonth}`;

        if (currentFetchKey !== lastFetchKey) {
            setIsLoading(true);
            setEditedCells({});
            setLastFetchKey(currentFetchKey);

            fetch(`/api/otherExpense/${selectedSite}/${startingMonth}`)
                .then(res => res.ok ? res.json() : Promise.reject(res.status))
                .then(data => setData(data))
                .catch(() => setData(null))
                .finally(() => setIsLoading(false));
        }
    }, [selectedSite, startingMonth, lastFetchKey]);

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
                label: `${monthNames[currentMonth].substring(0, 3)} ${currentYear}`,
                date: new Date(currentYear, currentMonth, 1),
            });
        }
        return periods;
    };

    const isPastMonth = (periodDate: Date) => {
        const today = new Date();
        return periodDate < new Date(today.getFullYear(), today.getMonth(), 1);
    };

    const hasActualizedData = (periodId: string, expenseType: ExpenseTypeId): boolean => {
        const actual = data?.actualData?.find(d => d.monthYear === periodId);
        return !!(actual && actual[EXPENSE_TYPE_KEYS[expenseType as ExpenseTypeKey]] !== undefined);
    };

    const getDataForPeriod = (periodId: string, expenseType: ExpenseTypeId) => {
        const key = EXPENSE_TYPE_KEYS[expenseType as ExpenseTypeKey];

        const budget = data?.budgetData?.find(d => d.monthYear === periodId)?.[key];
        const forecast = data?.forecastData?.find(d => d.monthYear === periodId)?.[key];
        const actual = data?.actualData?.find(d => d.monthYear === periodId)?.[key];

        return { budget, forecast, actual };
    };

    const handleCellChange = (periodId: string, expenseType: ExpenseTypeId, value: string) => {
        const parsedValue = Number.parseFloat(value);
        const finalValueForCell = value === "" ? 0 : parsedValue;

        if (value !== "" && isNaN(finalValueForCell)) {
            return;
        }

        if (finalValueForCell < 0) {
            return;
        }

        const { forecast, budget } = getDataForPeriod(periodId, expenseType);
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
                delete newEditedCells[periodId][expenseType];
                if (Object.keys(newEditedCells[periodId]).length === 0) {
                    delete newEditedCells[periodId];
                }
            }
        } else {
            if (!newEditedCells[periodId]) {
                newEditedCells[periodId] = {};
            }
            newEditedCells[periodId][expenseType] = finalValueForCell;
        }

        setEditedCells(newEditedCells);
        setHasUnsavedChanges(Object.keys(newEditedCells).length > 0);
    };

    const getCellValue = (periodId: string, expenseType: ExpenseTypeId): number => {
        if (editedCells[periodId]?.[expenseType] !== undefined) {
            return editedCells[periodId][expenseType];
        }
        const { forecast, budget } = getDataForPeriod(periodId, expenseType);
        if (forecast !== undefined && forecast !== null && forecast !== 0) return forecast;
        if (budget !== undefined && budget !== null) return budget;
        return 0;
    };

    const isForecastDifferentFromBudget = (periodId: string, expenseType: ExpenseTypeId) => {
        const { forecast, budget } = getDataForPeriod(periodId, expenseType);
        const forecastValue = forecast ?? 0;
        const budgetValue = budget ?? 0;
        return Math.abs(forecastValue - budgetValue) > 0.01;
    };

    const isCellModified = (periodId: string, expenseType: ExpenseTypeId) => {
        const { budget } = getDataForPeriod(periodId, expenseType);
        const budgetValue = budget ?? 0;

        const currentValue = getCellValue(periodId, expenseType) ?? 0;

        return Math.abs(currentValue - budgetValue) > 0.01;
    };

    const calculateVariance = (forecastValue: number, actualValue: number) => {
        if (!actualValue || actualValue === 0) return 0;
        return forecastValue - actualValue;
    };

    const calculateVariancePercentage = (forecastValue: number, actualValue: number) => {
        if (!actualValue || actualValue === 0) return 0;
        return ((forecastValue - actualValue) / actualValue) * 100;
    };

    const formatVariance = (variance: number) => {
        return variance >= 0 ? `+$${variance.toFixed(2)}` : `-$${Math.abs(variance).toFixed(2)}`;
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

        const forecastData: any[] = [];

        timePeriods.forEach(period => {
            const existingForecast = data?.forecastData?.find(d => d.monthYear === period.id);
            const budgetForPeriod = data?.budgetData?.find(d => d.monthYear === period.id);
            const editsForPeriod = editedCells[period.id];

            const forecastEntry = {
                id: existingForecast?.id || null,
                monthYear: period.id,
                // For each expense type, use: edited value > existing forecast > budget > 0
                employeeRelations: editsForPeriod?.employeeRelations ??
                    existingForecast?.employeeRelations ??
                    budgetForPeriod?.employeeRelations ?? 0,
                fuelVehicles: editsForPeriod?.fuelVehicles ??
                    existingForecast?.fuelVehicles ??
                    budgetForPeriod?.fuelVehicles ?? 0,
                lossAndDamageClaims: editsForPeriod?.lossAndDamageClaims ??
                    existingForecast?.lossAndDamageClaims ??
                    budgetForPeriod?.lossAndDamageClaims ?? 0,
                officeSupplies: editsForPeriod?.officeSupplies ??
                    existingForecast?.officeSupplies ??
                    budgetForPeriod?.officeSupplies ?? 0,
                outsideServices: editsForPeriod?.outsideServices ??
                    existingForecast?.outsideServices ??
                    budgetForPeriod?.outsideServices ?? 0,
                rentsParking: editsForPeriod?.rentsParking ??
                    existingForecast?.rentsParking ??
                    budgetForPeriod?.rentsParking ?? 0,
                repairsAndMaintenance: editsForPeriod?.repairsAndMaintenance ??
                    existingForecast?.repairsAndMaintenance ??
                    budgetForPeriod?.repairsAndMaintenance ?? 0,
                repairsAndMaintenanceVehicle: editsForPeriod?.repairsAndMaintenanceVehicle ??
                    existingForecast?.repairsAndMaintenanceVehicle ??
                    budgetForPeriod?.repairsAndMaintenanceVehicle ?? 0,
                signage: editsForPeriod?.signage ??
                    existingForecast?.signage ??
                    budgetForPeriod?.signage ?? 0,
                suppliesAndEquipment: editsForPeriod?.suppliesAndEquipment ??
                    existingForecast?.suppliesAndEquipment ??
                    budgetForPeriod?.suppliesAndEquipment ?? 0,
                ticketsAndPrintedMaterial: editsForPeriod?.ticketsAndPrintedMaterial ??
                    existingForecast?.ticketsAndPrintedMaterial ??
                    budgetForPeriod?.ticketsAndPrintedMaterial ?? 0,
                uniforms: editsForPeriod?.uniforms ??
                    existingForecast?.uniforms ??
                    budgetForPeriod?.uniforms ?? 0,
            };

            forecastData.push(forecastEntry);
        });

        const customer = customers.find(c => c.customerSiteId === selectedSite);

        const payload: OtherExpenseDto = {
            id: null,
            customerSiteId: selectedSite,
            siteNumber: customer?.siteNumber || "",
            name: customer?.siteName || "",
            billingPeriod: startingMonth,
            forecastData,
            budgetData: [],
            actualData: []
        };

        try {
            const response = await fetch("/api/otherExpense", {
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
                description: "Other expenses forecast data has been successfully updated.",
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
        setShowComparison(!showComparison);
    };

    const timePeriods = getTimePeriods();

    useImperativeHandle(ref, () => ({
        save: handleSave
    }));

    const spreadsheetNavigation = useSpreadsheetNavigation({
        tableRef,
        rowCountCallback: () => timePeriods.length,
        columnCountCallback: () => EXPENSE_TYPES.length,
        isCellEditableCallback: (rowIndex, colIndex) => {
            const period = timePeriods[rowIndex];
            const expenseType = EXPENSE_TYPES[colIndex];
            return !hasActualizedData(period.id, expenseType.id as ExpenseTypeId) && !isPastMonth(period.date);
        },
        onCellActivate: (rowIndex, colIndex, cellElement) => {
            if (cellElement) {
                const input = cellElement.querySelector('input');
                if (input && !input.disabled && !input.readOnly) {
                    input.focus({ preventScroll: true });
                    input.select();
                }
            }
        },
        onCellEditRequest: (rowIndex, colIndex) => {
            const period = timePeriods[rowIndex];
            const expenseType = EXPENSE_TYPES[colIndex];
            if (!hasActualizedData(period.id, expenseType.id as ExpenseTypeId) && !isPastMonth(period.date)) {
                const cell = tableRef.current?.querySelector(`#cell-${rowIndex}-${colIndex}`) as HTMLElement;
                const input = cell?.querySelector('input') as HTMLInputElement;
                if (input) {
                    input.focus({ preventScroll: true });
                    input.select();
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
        isDragPreviewCell
    } = useDragAndCopy({
        activeCell: spreadsheetNavigation.activeCell,
        rowCount: timePeriods.length,
        colCount: EXPENSE_TYPES.length,
        context: { timePeriods, expenseTypes: EXPENSE_TYPES },
        onCopy: (cells, { timePeriods, expenseTypes }) => {
            return cells.map(({ rowIndex, colIndex }) => {
                const periodId = timePeriods[rowIndex].id;
                const expenseType = expenseTypes[colIndex].id as ExpenseTypeId;
                const value = getCellValue(periodId, expenseType);
                return value == null ? "" : String(value);
            });
        },
        onPaste: (cells, clipboard, { timePeriods, expenseTypes }) => {
            const newEditedCells = { ...editedCells };

            cells.forEach((cell, i) => {
                const value = clipboard[i];
                const parsed = value === "" ? 0 : parseFloat(value);
                const periodId = timePeriods[cell.rowIndex].id;
                const expenseType = expenseTypes[cell.colIndex].id as ExpenseTypeId;

                const { forecast, budget } = getDataForPeriod(periodId, expenseType);
                const fallback = forecast ?? budget ?? 0;
                const isRevert = Math.abs(parsed - fallback) < 0.01;

                if (hasActualizedData(periodId, expenseType) || isPastMonth(timePeriods[cell.rowIndex].date)) {
                    return;
                }

                if (isRevert) {
                    delete newEditedCells[periodId]?.[expenseType];
                    if (newEditedCells[periodId] && Object.keys(newEditedCells[periodId]).length === 0) {
                        delete newEditedCells[periodId];
                    }
                } else {
                    if (!newEditedCells[periodId]) {
                        newEditedCells[periodId] = {};
                    }
                    newEditedCells[periodId][expenseType] = parsed;
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
                        <h1 className="text-2xl font-bold tracking-tight">Other Expenses</h1>
                        <p className="text-muted-foreground">Manage additional expense categories for your parking operations.</p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={() => setIsGuideOpen(!isGuideOpen)}
                    className="flex items-center gap-2 mb-2"
                    data-qa-id="button-toggle-other-expenses-guide"
                >
                    <Info className="h-4 w-4" />
                    {isGuideOpen ? "Hide Guide" : "Show Guide"}
                    {isGuideOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                {isGuideOpen && (
                    <div className="space-y-4 p-4 border rounded-md bg-muted/20 mb-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Other Expenses Guide</h3>
                            <p>
                                This page allows you to manage forecast data for operational expenses outside of standard
                                payroll costs, including employee relations, vehicle maintenance, office supplies, and more.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium mb-1">Expense Categories</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                    <li><strong>Employee Relations:</strong> Staff-related expenses and activities</li>
                                    <li><strong>Fuel Vehicles:</strong> Gasoline and fuel costs for company vehicles</li>
                                    <li><strong>Loss & Damage Claims:</strong> Insurance claims and vehicle damage costs</li>
                                    <li><strong>Office Supplies:</strong> Administrative and office material costs</li>
                                    <li><strong>Outside Services:</strong> Third-party contractor and service fees</li>
                                    <li><strong>Rents Parking:</strong> Parking space rental fees and leases</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-1">Additional Categories</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                    <li><strong>Repairs & Maintenance:</strong> General facility maintenance costs</li>
                                    <li><strong>Repairs & Maintenance Vehicle:</strong> Vehicle repair and upkeep</li>
                                    <li><strong>Signage:</strong> Signs, banners, and display materials</li>
                                    <li><strong>Supplies & Equipment:</strong> Operational tools and equipment</li>
                                    <li><strong>Tickets & Printed Material:</strong> Parking tickets and printed forms</li>
                                    <li><strong>Uniforms:</strong> Employee clothing and uniform costs</li>
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
                                    Enter dollar amounts for each expense category. Modified cells will be highlighted in
                                    <span className="text-blue-600 font-medium"> blue</span>. Only positive values are allowed.
                                    If budget values are available and no forecast exists, budget values will be used as defaults.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-1">Actual Values</h4>
                                <p className="text-sm text-muted-foreground">
                                    Past months with actual data are <span className="font-medium">read-only</span>.
                                    Cells with actualized data will show variance tooltips when hovered.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-1">Saving Data</h4>
                                <p className="text-sm text-muted-foreground">
                                    Click "Save Other Expenses" to save changes. Unsaved changes will be lost if you navigate away.
                                    Past months with actual data cannot be edited.
                                </p>
                            </div>
                        </div>

                        <Alert>
                            <AlertDescription>
                                <strong>Note:</strong> Other Expenses data is captured monthly. All expense amounts should be
                                entered as positive values representing costs to the operation.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Other Expenses</CardTitle>
                                <div className="mt-2 p-3 text-sm">
                                    <p>
                                        <strong>Note:</strong> Other Expenses may only be input by month. All values should be entered as positive dollar amounts.
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleComparisonView}
                                data-qa-id="button-toggle-other-expenses-comparison"
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
                                            {EXPENSE_TYPES.map((expense) => (
                                                <th key={expense.id} className="text-center py-2 px-2 font-medium text-sm">
                                                    {expense.label} ($)
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timePeriods.map((period, rowIndex) => (
                                            <tr key={period.id} className="border-b hover:bg-muted/50">
                                                <td className="py-2 px-2 text-sm font-medium">
                                                    <div className="flex flex-col items-start">{period.label}</div>
                                                </td>

                                                {EXPENSE_TYPES.map((expense, colIndex) => {
                                                    const hasActual = hasActualizedData(period.id, expense.id as ExpenseTypeId);
                                                    const actualValue = hasActual ? getDataForPeriod(period.id, expense.id as ExpenseTypeId).actual : null;
                                                    const forecastValue = getCellValue(period.id, expense.id as ExpenseTypeId) ?? 0;
                                                    const variance = hasActual ? calculateVariance(forecastValue, actualValue!) : 0;
                                                    const variancePercentage = hasActual ? calculateVariancePercentage(forecastValue, actualValue!) : 0;
                                                    const isDragCell = isDragPreviewCell(rowIndex, colIndex);
                                                    const isActive = spreadsheetNavigation.activeCell?.rowIndex === rowIndex && spreadsheetNavigation.activeCell?.colIndex === colIndex;
                                                    return (
                                                        <td
                                                            data-row={rowIndex}
                                                            data-col={colIndex}
                                                            key={expense.id}
                                                            className={`py-2 px-2 text-center  cursor-ns-resize ${isDragCell || isActive ? "border-2 border-blue-500 z-10 relative" : ""}`}
                                                            {...spreadsheetNavigation.getCellProps(rowIndex, colIndex)}
                                                            onMouseDown={e => {
                                                                if (e.button !== 0) return;
                                                                handleDragStart(rowIndex, colIndex);

                                                            }}
                                                            onMouseMove={(e) => {
                                                                if (isDragging) {
                                                                    handleDragMove(rowIndex, colIndex);
                                                                }
                                                            }}
                                                            onMouseUp={e => {
                                                                handleDragEnd();
                                                            }}
                                                        >
                                                            <div className="relative highlight-cell">
                                                                {hasActual ? (
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div
                                                                                className={`w-full text-center py-1 px-1 rounded cursor-help
                                                                                    bg-gray-100 dark:bg-gray-800
                                                                                    ${variance > 0 ? "text-black" : "text-red-600"}
                                                                                    border rounded-sm border-input`}
                                                                            >
                                                                                ${actualValue?.toFixed(2)}{" "}
                                                                                {variance > 0 ? (
                                                                                    <span className="text-black">▲</span>
                                                                                ) : variance < 0 ? (
                                                                                    <span className="text-red-600">▼</span>
                                                                                ) : null}
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent side="top" className="max-w-xs">
                                                                            <div className="space-y-1">
                                                                                <p className="font-medium">Actualized vs Forecast</p>
                                                                                <p>Forecast: ${forecastValue.toFixed(2)}</p>
                                                                                <p>Actual: ${actualValue?.toFixed(2)}</p>
                                                                                <p className={variance > 0 ? "text-black" : variance < 0 ? "text-red-600" : ""}>
                                                                                    Variance: {formatVariance(variance)} ({variancePercentage.toFixed(1)}%)
                                                                                    {variance > 0 ? " ▲" : variance < 0 ? " ▼" : ""}
                                                                                </p>
                                                                            </div>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                ) : (
                                                                    <NumericFormat
                                                                        value={forecastValue}
                                                                        onValueChange={(values) => {
                                                                            handleCellChange(period.id, expense.id as ExpenseTypeId, values.value);
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
                                                                                handleCellChange(period.id, expense.id as ExpenseTypeId, e.key);
                                                                                replaceOnNextInputRef.current[cellKey] = false;
                                                                            }
                                                                        }}
                                                                        thousandSeparator={true}
                                                                        prefix="$"
                                                                        decimalScale={2}
                                                                        allowNegative={false}
                                                                        placeholder="0.00"
                                                                        readOnly={isPastMonth(period.date)}
                                                                        disabled={isPastMonth(period.date)}
                                                                        className={`w-full text-center py-1 px-1 rounded
                                                                        ${isCellModified(period.id, expense.id as ExpenseTypeId) ? "border-blue-600 bg-blue-50 dark:bg-slate-800" : ""}
                                                                        text-foreground dark:text-foreground
                                                                        rounded-sm border border-input bg-background
                                                                        focus-visible:outline-none focus-visible:ring-1
                                                                        disabled:cursor-not-allowed disabled:opacity-50`}
                                                                        data-qa-id={`input-${expense.id}-${period.id}`}
                                                                    />
                                                                )}

                                                                {showComparison && !hasActual && (
                                                                    <div className="text-xs text-orange-500 mt-1">
                                                                        ${getDataForPeriod(period.id, expense.id as ExpenseTypeId).budget?.toFixed(2) || "0.00"}
                                                                    </div>
                                                                )}
                                                            </div>
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

export { OtherExpenses };
export default OtherExpenses;
