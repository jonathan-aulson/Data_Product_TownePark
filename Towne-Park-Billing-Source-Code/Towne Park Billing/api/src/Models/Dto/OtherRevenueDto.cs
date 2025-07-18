﻿using Newtonsoft.Json;

namespace api.Models.Dto
{
    public class OtherRevenueDto
    {
        [JsonProperty("id")]
        public Guid? Id { get; set; }

        [JsonProperty("customerSiteId")]
        public Guid? CustomerSiteId { get; set; }

        [JsonProperty("siteNumber")]
        public string? SiteNumber { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("billingPeriod")]
        public string? BillingPeriod { get; set; }

        [JsonProperty("budgetData")]
        public List<OtherRevenueDetailDto>? BudgetData { get; set; } = new List<OtherRevenueDetailDto>();
        [JsonProperty("forecastData")]
        public List<OtherRevenueDetailDto>? ForecastData { get; set; } = new List<OtherRevenueDetailDto>();
        [JsonProperty("actualData")]
        public List<OtherRevenueDetailDto>? ActualData { get; set; } = new List<OtherRevenueDetailDto>();
    }

    public class OtherRevenueDetailDto
    {
        [JsonProperty("id")]
        public Guid? Id { get; set; }

        [JsonProperty("monthYear")]
        public string? MonthYear { get; set; }

        [JsonProperty("billableExpense")]
        public decimal BillableExpense { get; set; }

        [JsonProperty("credits")]
        public decimal Credits { get; set; }

        [JsonProperty("gpoFees")]
        public decimal GPOFees { get; set; }

        [JsonProperty("revenueValidation")]
        public decimal RevenueValidation { get; set; }

        [JsonProperty("signingBonus")]
        public decimal SigningBonus { get; set; }
    }
}
