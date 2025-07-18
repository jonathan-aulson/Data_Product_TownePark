export interface OtherRevenueDetailDto {
    id: string | null;
    monthYear?: string;
    billableExpense: number;
    credits: number;
    gpoFees: number;
    revenueValidation: number;
    signingBonus: number;
}

export interface OtherRevenueDto {
    id: string;
    customerSiteId: string;
    siteNumber?: string;
    name?: string;
    billingPeriod?: string;
    budgetData?: OtherRevenueDetailDto[];
    forecastData?: OtherRevenueDetailDto[];
    actualData?: OtherRevenueDetailDto[];
}