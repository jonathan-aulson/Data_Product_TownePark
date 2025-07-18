import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { formatCurrency } from "@/lib/utils"
import { useEffect, useState } from "react"

export interface ForecastDayData {
    date: string
    dateObj: Date
    displayDate: string
    forecastHours: number
    scheduledHours: number
    scheduledCost: number
    jobCode?: string
    jobName?: string
    hourlyRate?: number
    budgetHours?: number
    budgetCost?: number
    actualHours?: number
    actualCost?: number
    
    // Enhanced properties for business logic
    contractType?: "Standard" | "PerLaborHour"
    editLevel?: "JobGroup" | "JobTitle"
    
    // Job Group context (Standard sites)
    jobGroup?: {
        id: string
        name: string
        averageHourlyRate: number
        jobCodes: Array<{
            jobCodeId: string
            jobCode: string
            displayName: string
            activeEmployeeCount: number
            averageHourlyRate?: number
        }>
    }
    
    // Job Title context (PLH sites)
    jobTitle?: {
        jobCodeId: string
        jobCode: string
        displayName: string
        hourlyRate: number
        billableRates?: {
            rate: number          // Regular billable rate
            overtimeRate: number  // Overtime billable rate
        }
    }
}

export interface ForecastEditDialogProps {
    isOpen: boolean
    onClose: () => void
    dayData: ForecastDayData
    onSave: (updatedData: ForecastDayData) => void
    jobRoles: Array<{ jobCode: string, displayName: string, hourlyRate: number }>
}

export default function ForecastEditDialog({
    isOpen,
    onClose,
    dayData,
    onSave,
    jobRoles
}: ForecastEditDialogProps) {
    const [hours, setHours] = useState(0)
    const [enableRateOverride, setEnableRateOverride] = useState(false)
    const [overrideHourlyRate, setOverrideHourlyRate] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (isOpen && dayData) {
            const initialHours = dayData.forecastHours !== undefined ? dayData.forecastHours : dayData.scheduledHours || 0
            setHours(initialHours)
            setEnableRateOverride(false)
            setOverrideHourlyRate(undefined)
        }
    }, [isOpen, dayData])

    if (!dayData) return null

    // Determine dialog type based on contractType and editLevel
    const isJobGroupDialog = dayData.contractType === "Standard" && dayData.editLevel === "JobGroup"
    const isJobCodeDialog = dayData.contractType === "PerLaborHour" && dayData.editLevel === "JobTitle"

    const getEditType = () => {
        return isJobGroupDialog ? "jobGroup" : "jobCode"
    }

    const getDisplayName = () => {
        if (isJobGroupDialog) {
            return dayData.jobGroup?.name || "Unknown Job Group"
        } else if (isJobCodeDialog) {
            return `${dayData.jobTitle?.displayName || "Unknown Job Title"} (${dayData.jobTitle?.jobCode || ""})`
        }
        return dayData.jobName || "Unknown"
    }

    const getDefaultHourlyRate = () => {
        if (isJobGroupDialog) {
            return dayData.jobGroup?.averageHourlyRate || 15
        } else if (isJobCodeDialog) {
            return dayData.jobTitle?.hourlyRate || 15
        }
        return dayData.hourlyRate || 15
    }

    const defaultHourlyRate = getDefaultHourlyRate()
    const hourlyRate = enableRateOverride && overrideHourlyRate !== undefined ? overrideHourlyRate : defaultHourlyRate

    // Calculate values
    const currentValue = dayData.scheduledHours || 0
    const currentCost = currentValue * defaultHourlyRate
    const budgetValue = dayData.budgetHours
    const budgetCost = budgetValue ? budgetValue * defaultHourlyRate : undefined
    const maxValue = dayData.actualHours // This represents actual hours for job code dialogs
    const newCost = hours * hourlyRate

    const formatNumber = (value: number) => value.toFixed(1)

    const handleValueChange = (value: number[]) => {
        setHours(value[0])
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0
        setHours(value)
    }

    const handleOverrideRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0
        setOverrideHourlyRate(value)
    }

    const handleResetToBudget = () => {
        if (budgetValue !== undefined) {
            setHours(budgetValue)
        }
    }

    const handleUpdate = () => {
        const updatedData = {
            ...dayData,
            forecastHours: hours,
        }
        onSave(updatedData)
        onClose()
    }

    const maxSliderValue = 500
    const minValue = 0

    return (
        <Dialog open={isOpen} onOpenChange={onClose} data-qa-id="dialog-forecast-edit">
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Forecast - {getEditType() === "jobGroup" ? "Job Group" : "Job Code"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium">{dayData.displayDate}</p>
                        <p className="text-sm text-muted-foreground">{getDisplayName()}</p>
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                                Default Hourly Rate: {formatCurrency(defaultHourlyRate)}
                            </p>
                            {enableRateOverride && overrideHourlyRate !== undefined && (
                                <p className="text-xs font-medium text-green-600">
                                    Using Override Rate: {formatCurrency(overrideHourlyRate)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Hours Forecast:</label>
                            <div className="flex items-center space-x-2">
                                <Slider
                                    value={[hours]}
                                    max={maxSliderValue}
                                    min={minValue}
                                    step={0.5}
                                    onValueChange={handleValueChange}
                                    className="flex-1"
                                    data-qa-id="slider-hours-forecast"
                                />
                                <Input 
                                    type="number" 
                                    value={hours} 
                                    onChange={handleInputChange} 
                                    className="w-24" 
                                    step={0.5}
                                    data-qa-id="input-hours-forecast"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                            <Switch 
                                id="override-rate" 
                                checked={enableRateOverride} 
                                onCheckedChange={setEnableRateOverride}
                                data-qa-id="switch-override-rate"
                            />
                            <Label htmlFor="override-rate" className="text-sm">
                                Override Hourly Cost
                            </Label>
                        </div>

                        {enableRateOverride && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Override Hourly Cost from {dayData.displayDate} forward:</label>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">$</span>
                                    <Input
                                        type="number"
                                        value={overrideHourlyRate !== undefined ? overrideHourlyRate : ""}
                                        onChange={handleOverrideRateChange}
                                        className="w-24"
                                        step={0.01}
                                        placeholder={defaultHourlyRate.toFixed(2)}
                                        data-qa-id="input-override-rate"
                                    />
                                    <span className="text-sm text-muted-foreground">per hour</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    This will apply to forecasting from {dayData.displayDate} until another override is set.
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Current Hours:</p>
                                <p className="font-medium">{formatNumber(currentValue) + " hrs"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Current Cost:</p>
                                <p className="font-medium">{formatCurrency(currentCost)}</p>
                            </div>

                            {budgetValue !== undefined && (
                                <>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Budget Hours:</p>
                                        <p className="font-medium">{formatNumber(budgetValue) + " hrs"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Budget Cost:</p>
                                        <p className="font-medium">{formatCurrency(budgetCost || 0)}</p>
                                    </div>
                                </>
                            )}

                            {maxValue && isJobCodeDialog && (
                                <>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Actual Hours:</p>
                                        <p className="font-medium">{formatNumber(maxValue) + " hrs"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Actual Cost:</p>
                                        <p className="font-medium">{formatCurrency(maxValue * hourlyRate)}</p>
                                    </div>
                                </>
                            )}

                            <div className="space-y-1">
                                <p className="text-muted-foreground">New Hours:</p>
                                <p className="font-medium text-green-600">{formatNumber(hours) + " hrs"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">New Cost:</p>
                                <p className="font-medium text-green-600">{formatCurrency(newCost)}</p>
                            </div>
                        </div>

                        {budgetValue !== undefined && (
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Variance from Budget:
                                    <span
                                        className={`ml-1 font-medium ${
                                            newCost > (budgetCost || 0)
                                                ? "text-red-600"
                                                : newCost < (budgetCost || 0)
                                                ? "text-green-600"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {budgetCost && budgetCost > 0 ? (((newCost - budgetCost) / budgetCost) * 100).toFixed(1) : 0}%
                                        {newCost > (budgetCost || 0) ? " over" : newCost < (budgetCost || 0) ? " under" : " on target"}
                                    </span>
                                </p>

                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={handleResetToBudget} 
                                    className="w-full"
                                    data-qa-id="button-reset-to-budget"
                                >
                                    Reset to Budget Value
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onClose()} data-qa-id="button-cancel">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} data-qa-id="button-update-forecast">
                        Update Forecast
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
