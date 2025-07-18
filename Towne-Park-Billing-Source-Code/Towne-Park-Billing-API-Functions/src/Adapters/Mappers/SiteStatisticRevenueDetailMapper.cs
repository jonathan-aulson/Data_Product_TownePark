using System;
using TownePark.Billing.Api.Models.Vo;

namespace TownePark.Billing.Api.Adapters.Mappers
{
    public static class SiteStatisticRevenueDetailMapper
    {
        public static List<SiteStatisticDetailVo> MapToSiteStatisticDetailVo(List<Dictionary<string, object>> rows)
        {
            var result = new List<SiteStatisticDetailVo>();
            
            foreach (var row in rows)
            {
                // Convert DATE to DateOnly
                var dateValue = row["DATE"];
                DateOnly date;
                
                if (dateValue is DateOnly d)
                    date = d;
                else if (dateValue is DateTime dt)
                    date = DateOnly.FromDateTime(dt);
                else
                    DateOnly.TryParse(dateValue.ToString(), out date);
                
                // Extract vehicle counts
                decimal selfDaily = GetDecimalValue(row, "SelfDaily_Count");
                decimal selfMonthly = GetDecimalValue(row, "SelfMonthly_Count");
                decimal selfOvernight = GetDecimalValue(row, "SelfOvernight_Count");
                decimal valetDaily = GetDecimalValue(row, "ValetDaily_Count");
                decimal valetMonthly = GetDecimalValue(row, "ValetMonthly_Count");
                decimal valetOvernight = GetDecimalValue(row, "ValetOvernight_Count");
                
                // Extract revenues
                decimal selfDailyRevenue = GetDecimalValue(row, "SelfDaily_Revenue");
                decimal selfMonthlyRevenue = GetDecimalValue(row, "SelfMonthly_Revenue");
                decimal selfOvernightRevenue = GetDecimalValue(row, "SelfOvernight_Revenue");
                decimal valetDailyRevenue = GetDecimalValue(row, "ValetDaily_Revenue");
                decimal valetMonthlyRevenue = GetDecimalValue(row, "ValetMonthly_Revenue");
                decimal valetOvernightRevenue = GetDecimalValue(row, "ValetOvernight_Revenue");
                decimal totalRevenue = GetDecimalValue(row, "Total_Revenue");
                
                // Total vehicle count
                decimal totalVehicles = GetDecimalValue(row, "Total_VehicleCount");
                
                // Occupied rooms
                decimal occupiedRooms = GetDecimalValue(row, "OccupiedRooms");
                
                // Calculate rates (if counts > 0)
                decimal selfRateDaily = selfDaily > 0 ? selfDailyRevenue / selfDaily : 0;
                decimal selfRateMonthly = selfMonthly > 0 ? selfMonthlyRevenue / selfMonthly : 0;
                decimal selfRateOvernight = selfOvernight > 0 ? selfOvernightRevenue / selfOvernight : 0;
                decimal valetRateDaily = valetDaily > 0 ? valetDailyRevenue / valetDaily : 0;
                decimal valetRateMonthly = valetMonthly > 0 ? valetMonthlyRevenue / valetMonthly : 0;
                decimal valetRateOvernight = valetOvernight > 0 ? valetOvernightRevenue / valetOvernight : 0;
                
                // Calculate service type totals
                decimal selfAggregator = selfDaily + selfMonthly + selfOvernight;
                decimal valetAggregator = valetDaily + valetMonthly + valetOvernight;
                
                // Calculate ratios
                //double driveInRatio = occupiedRooms > 0 ? (double)(totalVehicles / occupiedRooms) : 0;
                //double captureRatio = totalVehicles > 0 ? (double)(valetOvernight / totalVehicles) : 0;
                
                // Create the SiteStatisticDetailVo
                result.Add(new SiteStatisticDetailVo
                {
                    Id = Guid.NewGuid(),
                    Type = SiteStatisticDetailType.Actual,
                    PeriodStart = date,
                    PeriodEnd = date,
                    PeriodLabel = null,
                    Date = date,
                    
                    // Vehicle counts by category
                    SelfDaily = selfDaily,
                    SelfMonthly = selfMonthly,
                    SelfOvernight = selfOvernight,
                    ValetDaily = valetDaily,
                    ValetMonthly = valetMonthly,
                    ValetOvernight = valetOvernight,
                    
                    // Revenue
                    ExternalRevenue = totalRevenue,
                    
                    // Calculated rates
                    SelfRateDaily = selfRateDaily,
                    SelfRateMonthly = selfRateMonthly,
                    SelfRateOvernight = selfRateOvernight,
                    ValetRateDaily = valetRateDaily,
                    ValetRateMonthly = valetRateMonthly,
                    ValetRateOvernight = valetRateOvernight,
                    
                    // Aggregators
                    SelfAggregator = selfAggregator,
                    ValetAggregator = valetAggregator,
                    
                    // Other statistics
                    OccupiedRooms = occupiedRooms,
                    DriveInRatio = 0,
                    CaptureRatio = 0,
                    
                    // Default values for fields not in query
                    ValetComps = 0,
                    SelfComps = 0,
                    Occupancy = 0, // Requires TotalRooms to calculate
                    BaseRevenue = 0 
                });
            }
            
            return result;
        }
        
        private static decimal GetDecimalValue(Dictionary<string, object> row, string key)
        {
            if (!row.ContainsKey(key) || row[key] == null || row[key] == DBNull.Value)
                return 0;
            
            try
            {
                return Convert.ToDecimal(row[key]);
            }
            catch
            {
                return 0;
            }
        }
    }
}
