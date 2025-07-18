using TownePark.Billing.Api.Helpers;
using TownePark.Billing.Api.Models.Dto;

namespace TownePark.Billing.Api.Adapters.Mappers
{
    public static class OtherExpenseMapper
    {
        private static readonly Dictionary<string, string> AccountMapping = new()
        {
            { "7045", nameof(OtherExpenseDetailDto.EmployeeRelations) },
            { "7075", nameof(OtherExpenseDetailDto.FuelVehicles) },
            { "7100", nameof(OtherExpenseDetailDto.LossAndDamageClaims) },
            { "7113", nameof(OtherExpenseDetailDto.OfficeSupplies) },
            { "7115", nameof(OtherExpenseDetailDto.OutsideServices) },
            { "7170", nameof(OtherExpenseDetailDto.RentsParking) },
            { "7175", nameof(OtherExpenseDetailDto.RepairsAndMaintenance) },
            { "7178", nameof(OtherExpenseDetailDto.RepairsAndMaintenanceVehicle) },
            { "7180", nameof(OtherExpenseDetailDto.Signage) },
            { "7185", nameof(OtherExpenseDetailDto.SuppliesAndEquipment) },
            { "7205", nameof(OtherExpenseDetailDto.TicketsAndPrintedMaterial) },
            { "7220", nameof(OtherExpenseDetailDto.Uniforms) }
        };

        private static readonly HashSet<string> MiscAccounts = new()
        {
            "7000", "7005", "7010", "7011", "7015", "7016", "7017", "7018", "7019", "7020", "7021", "7026",
            "7030", "7040", "7050", "7055", "7060", "7065", "7070", "7072", "7080", "7082", "7085", "7090",
            "7095", "7099", "7101", "7102", "7105", "7110", "7120", "7125", "7126", "7130", "7131", "7135",
            "7140", "7145", "7150", "7155", "7160", "7165", "7171", "7182", "7190", "7195", "7200", "7210",
            "7215", "7217", "7219", "7225", "7230", "7240", "7245", "7270", "7275", "7350", "7351"
        };

        public static OtherExpenseDto MapToOtherExpenseDto(List<Dictionary<string, object>> rawResults, bool isBudget = false)
        {
            var monthGroups = rawResults
                .GroupBy(row => row.GetValue<string>("PERIOD"))
                .OrderBy(g => g.Key);

            var expenseData = monthGroups
                .Select(monthGroup => MapToOtherExpenseDetailDto(monthGroup.ToList()))
                .ToList();

            return new OtherExpenseDto
            {
                Id = null,
                SiteNumber = rawResults.FirstOrDefault()?.GetValue<string>("COST_CENTER"),
                ActualData = isBudget ? new List<OtherExpenseDetailDto>() : expenseData,
                BudgetData = isBudget ? expenseData : new List<OtherExpenseDetailDto>()
            };
        }

        private static OtherExpenseDetailDto MapToOtherExpenseDetailDto(List<Dictionary<string, object>> monthData)
        {
            var detail = new OtherExpenseDetailDto
            {
                Id = null,
                MonthYear = monthData.FirstOrDefault()?.GetValue<string>("PERIOD") ?? ""
            };

            decimal miscTotal = 0;
            decimal mainAccountsTotal = 0;

            foreach (var row in monthData)
            {
                var account = row.GetValue<string>("MAIN_ACCOUNT");
                var balance = row.GetValue<decimal>("BALANCE");

                if (AccountMapping.TryGetValue(account, out var propertyName))
                {
                    var property = typeof(OtherExpenseDetailDto).GetProperty(propertyName);
                    property?.SetValue(detail, balance);
                    mainAccountsTotal += balance;
                }
                else if (MiscAccounts.Contains(account))
                {
                    miscTotal += balance;
                }
            }

            detail.MiscOtherExpenses = miscTotal;
            detail.TotalOtherExpenses = mainAccountsTotal + miscTotal;

            return detail;
        }
    }
}