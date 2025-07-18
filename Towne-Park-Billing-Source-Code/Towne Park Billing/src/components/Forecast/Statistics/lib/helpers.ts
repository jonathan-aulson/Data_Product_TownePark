import React from "react";
import { FormValuesByDate, SiteStatisticDetailData } from "@/lib/models/Statistics";
import { OVERNIGHT_ADJUSTMENT_RATE } from "./constants";

export function getDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export function syncOccupancyAndOccupiedRooms(
    values: FormValuesByDate,
    availableRooms: number
): FormValuesByDate {
    const newValues: FormValuesByDate = {};
    Object.entries(values).forEach(([periodKey, periodVals]) => {
        const occupiedRooms = periodVals["occupied-rooms"] ?? 0;
        const occupancy = periodVals["occupancy"] ?? 0;
        if (occupiedRooms && !occupancy && availableRooms) {
            newValues[periodKey] = {
                ...periodVals,
                occupancy: occupiedRooms / availableRooms,
            };
        } else if (!occupiedRooms && occupancy && availableRooms) {
            newValues[periodKey] = {
                ...periodVals,
                "occupied-rooms": Math.round(occupancy * availableRooms),
            };
        } else {
            newValues[periodKey] = { ...periodVals };
        }
    });
    return newValues;
}

export function formatPeriodLabelForDisplay(label: string): React.ReactNode {
    if (!label) return "";
    const match = label.match(/^([A-Za-z]+)\s+(.+)$/);
    if (match) {
        const month = match[1];
        const rest = match[2];
        const shortMonth = getShortMonthName(month);
        return React.createElement('div', {}, [
            shortMonth,
            React.createElement('br'),
            rest
        ]);
    }
    return label;
}

export function getShortMonthName(month: string): string {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const shortMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const idx = months.findIndex(m => m.toLowerCase() === month.toLowerCase());
    if (idx !== -1) return shortMonths[idx];
    const idxShort = shortMonths.findIndex(m => m.toLowerCase() === month.toLowerCase());
    if (idxShort !== -1) return shortMonths[idxShort];
    return month;
}

export function formatPercentage(value: number) {
    return `${(value * 100).toFixed(2)}%`;
}

export function formatDateKey(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function calculateOvernight(
    periodStart: string,
    type: "self" | "valet",
    formValues: FormValuesByDate,
    inputType: string,
    availableRooms: number,
    getOccupiedRooms: (periodStart: string) => number
) {
    const values = formValues[periodStart] || {};

    const driveInRatio = values["drive-in-ratio-input"] || 0;
    const captureRatio = values["capture-ratio-input"] || 0;
    const occupiedRooms = inputType === "occupied-rooms" ? values["occupied-rooms"] || 0 : getOccupiedRooms(periodStart);

    if (type === "self" && captureRatio >= 1) return 0;
    const totalOvernight = driveInRatio * occupiedRooms;
    return type === "self" 
        ? totalOvernight * (1 - captureRatio) 
        : totalOvernight * captureRatio;
}

// Backward compatibility exports
export function calculateOvernightSelf(
    periodStart: string,
    formValues: FormValuesByDate,
    inputType: string,
    availableRooms: number,
    getOccupiedRooms: (periodStart: string) => number
) {
    return calculateOvernight(periodStart, "self", formValues, inputType, availableRooms, getOccupiedRooms);
}

export function calculateOvernightValet(
    periodStart: string,
    formValues: FormValuesByDate,
    inputType: string,
    availableRooms: number,
    getOccupiedRooms: (periodStart: string) => number
) {
    return calculateOvernight(periodStart, "valet", formValues, inputType, availableRooms, getOccupiedRooms);
}

export function calculateActualOvernight(
    periodStart: string,
    type: "self" | "valet",
    actualValues: FormValuesByDate
) {
    if (!actualValues[periodStart]) return 0;

    const values = actualValues[periodStart];

    const driveInRatio = values["drive-in-ratio-input"] || 0;
    const captureRatio = values["capture-ratio-input"] || 0;
    const occupiedRooms = values["occupied-rooms"] || 0;

    if (type === "self" && captureRatio >= 1) return 0;

    const totalOvernight = driveInRatio * occupiedRooms;
    return type === "self"
        ? totalOvernight * (1 - captureRatio)
        : totalOvernight * captureRatio;
}

export function calculateOccupancy(
    periodStart: string,
    formValues: FormValuesByDate,
    availableRooms: number
) {
    const values = formValues[periodStart] || {};

    const occupiedRooms = values["occupied-rooms"] || 0;
    if (availableRooms === 0) return 0;

    return occupiedRooms / availableRooms;
}

export function getOccupiedRooms(
    periodStart: string,
    formValues: FormValuesByDate,
    availableRooms: number
) {
    const values = formValues[periodStart] || {};

    const occupancy = values["occupancy"] || 0;
    return occupancy * availableRooms;
}

export function calculateExternalRevenue(
    periodStart: string,
    formValues: FormValuesByDate,
    budgetRatesByPeriod: Record<string, any>,
    calculateOvernightSelfFn: (periodStart: string) => number,
    calculateOvernightValetFn: (periodStart: string) => number,
    selectedSite: string
) {
    if (!selectedSite) return 0;

    const values = formValues[periodStart] || {};

    const rates = budgetRatesByPeriod[periodStart] || {
        valetRateDaily: 0,
        valetRateMonthly: 0,
        valetRateOvernight: 0,
        selfRateDaily: 0,
        selfRateMonthly: 0,
        selfRateOvernight: 0,
        baseRevenue: 0,
        selfOvernight: 0,
        valetOvernight: 0,
        selfAggregator: 0,
        valetAggregator: 0,
    };

    const {
        valetRateDaily,
        valetRateMonthly,
        valetRateOvernight,
        selfRateDaily,
        selfRateMonthly,
        selfRateOvernight,
    } = rates;

    const valetDaily = values["valet-daily"] || 0;
    const valetMonthly = values["valet-monthly"] || 0;
    const valetOvernight = calculateOvernightValetFn(periodStart);
    const selfDaily = values["self-daily"] || 0;
    const selfMonthly = values["self-monthly"] || 0;
    const selfOvernight = calculateOvernightSelfFn(periodStart);

    const valetDailyRevenue = valetDaily * valetRateDaily;
    const valetMonthlyRevenue = valetMonthly * valetRateMonthly;
    const valetOvernightRevenue = valetOvernight * valetRateOvernight;
    const selfDailyRevenue = selfDaily * selfRateDaily;
    const selfMonthlyRevenue = selfMonthly * selfRateMonthly;
    const selfOvernightRevenue = selfOvernight * selfRateOvernight;

    const totalRevenue =
        valetDailyRevenue +
        valetMonthlyRevenue +
        valetOvernightRevenue +
        selfDailyRevenue +
        selfMonthlyRevenue +
        selfOvernightRevenue;

    return Math.round(totalRevenue);
}

export function calculateExternalRevenueForPeriod(periodData: SiteStatisticDetailData) {
    if (!periodData) return 0;

    const {
        valetRateDaily = 0,
        valetRateMonthly = 0,
        valetRateOvernight = 0,
        selfRateDaily = 0,
        selfRateMonthly = 0,
        selfRateOvernight = 0,
        valetDaily = 0,
        valetMonthly = 0,
        valetOvernight = 0,
        selfDaily = 0,
        selfMonthly = 0,
        selfOvernight = 0
    } = periodData;

    const valetDailyRevenue = valetDaily * valetRateDaily;
    const valetMonthlyRevenue = valetMonthly * valetRateMonthly;
    const valetOvernightRevenue = valetOvernight * valetRateOvernight;
    const selfDailyRevenue = selfDaily * selfRateDaily;
    const selfMonthlyRevenue = selfMonthly * selfRateMonthly;
    const selfOvernightRevenue = selfOvernight * selfRateOvernight;

    const totalRevenue =
        valetDailyRevenue +
        valetMonthlyRevenue +
        valetOvernightRevenue +
        selfDailyRevenue +
        selfMonthlyRevenue +
        selfOvernightRevenue;

    return Math.round(totalRevenue);
}

export function calculateActualExternalRevenue(
    periodStart: string,
    actualValues: FormValuesByDate,
    budgetRatesByPeriod: Record<string, any>,
    availableRooms: number,
    selectedSite: string
) {
    if (!selectedSite) return 0;

    if (!actualValues[periodStart]) return 0;

    const values = actualValues[periodStart];

    const rates = budgetRatesByPeriod[periodStart] || {
        valetRateDaily: 0,
        valetRateMonthly: 0,
        selfRateDaily: 0,
        selfRateMonthly: 0,
        baseRevenue: 0,
        selfOvernight: 0,
        valetOvernight: 0,
        selfAggregator: 0,
        valetAggregator: 0,
    };

    const {
        valetRateDaily,
        valetRateMonthly,
        selfRateDaily,
        selfRateMonthly,
        baseRevenue,
        selfOvernight: budgetOvernightSelf,
        valetOvernight: budgetOvernightValet
    } = rates;

    const occupiedRooms = values["occupied-rooms"] || 0;
    const overnightSelf = calculateActualOvernight(periodStart, "self", actualValues);
    const overnightValet = calculateActualOvernight(periodStart, "valet", actualValues);
    const valetDaily = values["valet-daily"] || 0;
    const valetMonthly = values["valet-monthly"] || 0;
    const selfDaily = values["self-daily"] || 0;
    const selfMonthly = values["self-monthly"] || 0;

    const occupancyFactor = availableRooms > 0 ? occupiedRooms / availableRooms : 1;
    const calculatedBaseRevenue = baseRevenue * occupancyFactor;

    const valetDailyRevenue = valetDaily * valetRateDaily;
    const valetMonthlyRevenue = valetMonthly * valetRateMonthly;
    const selfDailyRevenue = selfDaily * selfRateDaily;
    const selfMonthlyRevenue = selfMonthly * selfRateMonthly;

    const overnightAdjustment =
        (overnightSelf - budgetOvernightSelf) * selfRateDaily * OVERNIGHT_ADJUSTMENT_RATE +
        (overnightValet - budgetOvernightValet) * valetRateDaily * OVERNIGHT_ADJUSTMENT_RATE;

    const totalRevenue = [
        calculatedBaseRevenue,
        valetDailyRevenue,
        valetMonthlyRevenue,
        selfDailyRevenue,
        selfMonthlyRevenue,
        overnightAdjustment
    ].reduce((sum, revenue) => sum + revenue, 0);

    return Math.round(totalRevenue);
} 