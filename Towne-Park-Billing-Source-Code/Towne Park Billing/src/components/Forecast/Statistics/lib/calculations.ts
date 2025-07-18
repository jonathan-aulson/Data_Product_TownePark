import { FormValuesByDate, SiteStatisticDetailData } from "@/lib/models/Statistics";
import { OVERNIGHT_ADJUSTMENT_RATE } from "./constants";

export class StatisticsCalculations {
    // Helper function for month-specific calculations  
    static calculateOvernightForMonth(
        monthIndex: number, 
        periodStart: string, 
        type: "self" | "valet",
        monthlyForecastValues: Record<number, FormValuesByDate>,
        inputType: string,
        availableRooms: number
    ) {
        const monthValues = monthlyForecastValues[monthIndex] || {};
        const values = monthValues[periodStart] || {};

        const driveInRatio = values["drive-in-ratio-input"] || 0;
        const captureRatio = values["capture-ratio-input"] || 0;
        const occupiedRooms = inputType === "occupied-rooms" ? 
            values["occupied-rooms"] || 0 : 
            this.getOccupiedRoomsForMonth(monthIndex, periodStart, monthlyForecastValues, availableRooms);

        if (type === "self" && captureRatio >= 1) return 0;
        const totalOvernight = driveInRatio * occupiedRooms;
        return type === "self" 
            ? totalOvernight * (1 - captureRatio) 
            : totalOvernight * captureRatio;
    }

    // Backward compatibility helpers
    static calculateOvernightSelfForMonth(
        monthIndex: number, 
        periodStart: string,
        monthlyForecastValues: Record<number, FormValuesByDate>,
        inputType: string,
        availableRooms: number
    ) {
        return this.calculateOvernightForMonth(monthIndex, periodStart, "self", monthlyForecastValues, inputType, availableRooms);
    }

    static calculateOvernightValetForMonth(
        monthIndex: number, 
        periodStart: string,
        monthlyForecastValues: Record<number, FormValuesByDate>,
        inputType: string,
        availableRooms: number
    ) {
        return this.calculateOvernightForMonth(monthIndex, periodStart, "valet", monthlyForecastValues, inputType, availableRooms);
    }

    static calculateExternalRevenueForMonth(
        monthIndex: number, 
        periodStart: string,
        selectedSite: string,
        monthlyForecastValues: Record<number, FormValuesByDate>,
        allMonthsData: any[],
        availableRooms: number,
        inputType: string
    ) {
        if (!selectedSite) return 0;

        const monthValues = monthlyForecastValues[monthIndex] || {};
        const values = monthValues[periodStart] || {};
        const monthData = allMonthsData[monthIndex];

        if (!monthData) return 0;

        // Get rates for this month and period
        const budgetItem = monthData.budgetData?.find((item: any) => 
            (item.periodStart === periodStart) || (item.periodLabel === periodStart)
        );

        if (!budgetItem) return 0;

        const rates = {
            valetRateDaily: budgetItem.valetRateDaily || 0,
            valetRateMonthly: budgetItem.valetRateMonthly || 0,
            valetRateOvernight: budgetItem.valetRateOvernight || 0,
            selfRateDaily: budgetItem.selfRateDaily || 0,
            selfRateMonthly: budgetItem.selfRateMonthly || 0,
            selfRateOvernight: budgetItem.selfRateOvernight || 0,
            baseRevenue: budgetItem.baseRevenue || 0,
        };

        const valetDaily = (values["valet-daily"] || 0) * rates.valetRateDaily;
        const valetMonthly = (values["valet-monthly"] || 0) * rates.valetRateMonthly;
        const selfDaily = (values["self-daily"] || 0) * rates.selfRateDaily;
        const selfMonthly = (values["self-monthly"] || 0) * rates.selfRateMonthly;

        const valetOvernight = this.calculateOvernightValetForMonth(monthIndex, periodStart, monthlyForecastValues, inputType, availableRooms);
        const selfOvernight = this.calculateOvernightSelfForMonth(monthIndex, periodStart, monthlyForecastValues, inputType, availableRooms);

        const valetOvernightRevenue = valetOvernight * rates.valetRateOvernight;
        const selfOvernightRevenue = selfOvernight * rates.selfRateOvernight;

        const overnightAdjustment = (valetOvernightRevenue + selfOvernightRevenue) * OVERNIGHT_ADJUSTMENT_RATE;

        const calculatedBaseRevenue = rates.baseRevenue || 0;

        const totalRevenue = [
            calculatedBaseRevenue,
            valetDaily,
            valetMonthly,
            selfDaily,
            selfMonthly,
            overnightAdjustment
        ].reduce((sum, revenue) => sum + revenue, 0);

        return Math.round(totalRevenue);
    }

    static getOccupiedRoomsForMonth(
        monthIndex: number, 
        periodStart: string,
        monthlyForecastValues: Record<number, FormValuesByDate>,
        availableRooms: number
    ) {
        const monthValues = monthlyForecastValues[monthIndex] || {};
        const values = monthValues[periodStart] || {};

        const occupancy = values["occupancy"] || 0;
        return occupancy * availableRooms;
    }

    // Current period calculations (for daily view)
    static calculateOvernightSelf(
        periodStart: string,
        formValues: FormValuesByDate,
        inputType: string,
        availableRooms: number
    ) {
        const values = formValues[periodStart] || {};

        const driveInRatio = values["drive-in-ratio-input"] || 0;
        const captureRatio = values["capture-ratio-input"] || 0;
        const occupiedRooms = inputType === "occupied-rooms" ? 
            values["occupied-rooms"] || 0 : 
            this.getOccupiedRooms(periodStart, formValues, availableRooms);

        if (captureRatio >= 1) return 0;
        const totalOvernight = driveInRatio * occupiedRooms;
        return totalOvernight * (1 - captureRatio);
    }

    static calculateOvernightValet(
        periodStart: string,
        formValues: FormValuesByDate,
        inputType: string,
        availableRooms: number
    ) {
        const values = formValues[periodStart] || {};

        const driveInRatio = values["drive-in-ratio-input"] || 0;
        const captureRatio = values["capture-ratio-input"] || 0;
        const occupiedRooms = inputType === "occupied-rooms" ? 
            values["occupied-rooms"] || 0 : 
            this.getOccupiedRooms(periodStart, formValues, availableRooms);

        const totalOvernight = driveInRatio * occupiedRooms;
        return totalOvernight * captureRatio;
    }

    static calculateActualOvernight(
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

    static calculateOccupancy(
        periodStart: string,
        formValues: FormValuesByDate,
        availableRooms: number
    ) {
        const values = formValues[periodStart] || {};

        const occupiedRooms = values["occupied-rooms"] || 0;
        if (availableRooms === 0) return 0;

        return occupiedRooms / availableRooms;
    }

    static getOccupiedRooms(
        periodStart: string,
        formValues: FormValuesByDate,
        availableRooms: number
    ) {
        const values = formValues[periodStart] || {};

        const occupancy = values["occupancy"] || 0;
        return occupancy * availableRooms;
    }

    static calculateExternalRevenue(
        periodStart: string,
        selectedSite: string,
        formValues: FormValuesByDate,
        budgetValues: FormValuesByDate,
        forecastValues: FormValuesByDate,
        budgetRatesByPeriod: Record<string, any>,
        inputType: string,
        availableRooms: number
    ) {
        if (!selectedSite) return 0;

        const values = formValues[periodStart] || {};

        if (!budgetValues[periodStart] && !forecastValues[periodStart]) {
            return 0;
        }

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
        const valetOvernight = this.calculateOvernightValet(periodStart, formValues, inputType, availableRooms);
        const selfDaily = values["self-daily"] || 0;
        const selfMonthly = values["self-monthly"] || 0;
        const selfOvernight = this.calculateOvernightSelf(periodStart, formValues, inputType, availableRooms);

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

    // Calculate externalRevenue for non-daily (weekly, monthly) periods using aggregate period data
    static calculateExternalRevenueForPeriod(periodData: SiteStatisticDetailData) {
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

    static calculateActualExternalRevenue(
        periodStart: string,
        selectedSite: string,
        actualValues: FormValuesByDate,
        budgetRatesByPeriod: Record<string, any>,
        availableRooms: number
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
        const overnightSelf = this.calculateActualOvernight(periodStart, "self", actualValues);
        const overnightValet = this.calculateActualOvernight(periodStart, "valet", actualValues);
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
} 