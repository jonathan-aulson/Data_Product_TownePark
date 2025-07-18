using System.Collections.Generic;
using System.Data;
using TownePark.Billing.Api.Adapters.Mappers;
using TownePark.Billing.Api.Models.Common;

namespace TownePark.Billing.Api.Config
{
    public static class EDWQueryRegistry
    {
        public static readonly EDWQueryDefinition BUDGET_DAILY_DETAIL = new EDWQueryDefinition
        {
            Id = 1,
            NameOrSql = "[dbo].[spBUDGET_DAILY_DETAIL]",
            CommandType = CommandType.StoredProcedure,
            Mapper = results => results.Select(SiteStatisticDetailMapper.MapToSiteStatisticDetailVo).ToList()
        };

        public static readonly EDWQueryDefinition BUDGET_ACTUAL_SUMMARY = new EDWQueryDefinition
        {
            Id = 2,
            NameOrSql = "[dbo].[spBudget_Actual_Summary]",
            CommandType = CommandType.StoredProcedure,
            Mapper = PnlMapper.MapToPnlVo
        };

        public static readonly EDWQueryDefinition RATES_BY_YEAR = new EDWQueryDefinition
        {
            Id = 3,
            NameOrSql = @"
                        SELECT 
                        'BUDGET' AS [TYPE], 
                        [PERIOD],
                        CAST(SUM(CASE WHEN [MAIN_ACCOUNT] = '9411' THEN [BALANCE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [MAIN_ACCOUNT] = '9510' THEN [BALANCE] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Valet_Daily_Rate],
                        CAST(SUM(CASE WHEN [MAIN_ACCOUNT] = '9412' THEN [BALANCE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [MAIN_ACCOUNT] = '9520' THEN [BALANCE] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Valet_Overnight_Rate],
                        CAST(SUM(CASE WHEN [MAIN_ACCOUNT] = '9413' THEN [BALANCE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [MAIN_ACCOUNT] = '9530' THEN [BALANCE] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Valet_Monthly_Rate],
                        CAST(SUM(CASE WHEN [MAIN_ACCOUNT] = '9414' THEN [BALANCE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [MAIN_ACCOUNT] = '9550' THEN [BALANCE] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Self_Daily_Rate],
                        CAST(SUM(CASE WHEN [MAIN_ACCOUNT] = '9415' THEN [BALANCE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [MAIN_ACCOUNT] = '9560' THEN [BALANCE] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Self_Overnight_Rate],
                        CAST(SUM(CASE WHEN [MAIN_ACCOUNT] = '9416' THEN [BALANCE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [MAIN_ACCOUNT] = '9570' THEN [BALANCE] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Self_Monthly_Rate]
                    FROM [dbo].[BUDGET_FINAL]
                    WHERE LEFT([PERIOD], 4) = @YEAR
                      AND [COST_CENTER] = @COST_CENTER
                      AND [MAIN_ACCOUNT] IN ('9411','9510','9412','9520','9413','9530','9414','9550','9415','9560','9416','9570')
                    GROUP BY [PERIOD]

                    UNION ALL

                    SELECT 
                        'ACTUAL' AS [TYPE],  -- Add TYPE column
                        FORMAT(DATEADD(MONTH, DATEDIFF(MONTH, 0, [DATE]), 0), 'yyyyMM') AS [PERIOD],
                        CAST(SUM(CASE WHEN [REVENUE_CODE] IN ('VD1', 'VD2', 'VD3') THEN [NETEXTERNALREVENUE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [REVENUE_CODE] IN ('VD1', 'VD2', 'VD3') THEN [VEHICLECOUNT] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Valet_Daily_Rate],
                        CAST(SUM(CASE WHEN [REVENUE_CODE] IN ('VO1', 'VO2', 'VO3') THEN [NETEXTERNALREVENUE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [REVENUE_CODE] IN ('VO1', 'VO2', 'VO3') THEN [VEHICLECOUNT] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Valet_Overnight_Rate],
                        CAST(SUM(CASE WHEN [REVENUE_CODE] IN ('VM1', 'VM2', 'VM3') THEN [NETEXTERNALREVENUE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [REVENUE_CODE] IN ('VM1', 'VM2', 'VM3') THEN [VEHICLECOUNT] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Valet_Monthly_Rate],
                        CAST(SUM(CASE WHEN [REVENUE_CODE] IN ('SD1', 'SD2', 'SD3') THEN [NETEXTERNALREVENUE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [REVENUE_CODE] IN ('SD1', 'SD2', 'SD3') THEN [VEHICLECOUNT] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Self_Daily_Rate],
                        CAST(SUM(CASE WHEN [REVENUE_CODE] IN ('SO1', 'SO2', 'SO3') THEN [NETEXTERNALREVENUE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [REVENUE_CODE] IN ('SO1', 'SO2', 'SO3') THEN [VEHICLECOUNT] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Self_Overnight_Rate],
                        CAST(SUM(CASE WHEN [REVENUE_CODE] IN ('SM1', 'SM2', 'SM3') THEN [NETEXTERNALREVENUE] ELSE 0 END) /
                              NULLIF(SUM(CASE WHEN [REVENUE_CODE] IN ('SM1', 'SM2', 'SM3') THEN [VEHICLECOUNT] ELSE 0 END), 0) AS DECIMAL(10,2)) AS [Self_Monthly_Rate]
                    FROM [dbo].[vwREVENUE_DAILY_DETAIL_INVOICE]
                    WHERE YEAR([DATE]) = @YEAR
                      AND [SITE] = @COST_CENTER
                    GROUP BY FORMAT(DATEADD(MONTH, DATEDIFF(MONTH, 0, [DATE]), 0), 'yyyyMM')

                    ORDER BY [PERIOD], [TYPE]",
            CommandType = CommandType.Text,
            Mapper = ParkingRateMapper.MapToParkingRateDataVo
        };

        public static readonly EDWQueryDefinition BUDGET_ACTUAL_SUMMARY_BY_SITE = new EDWQueryDefinition
        {
            Id = 4,
            NameOrSql = "[dbo].[spBudget_Actual_Summary_BySite]",
            CommandType = CommandType.StoredProcedure,
            Mapper = PnlMapper.MapToPnlBySiteVo
        };

        public static readonly EDWQueryDefinition PAYROLL_BUDGET_BY_SITE = new EDWQueryDefinition
        {
            Id = 5,
            NameOrSql = @"
                  --budget hours and cost for the month
                  SELECT 
                  bd.COST_CENTER,
                  bd.[YEAR],
                  bd.[MONTH],
                  bd.JOB_PROFILE,
                  SUM(CASE WHEN bd.BALANCE_DESC = 'PR Hours' THEN bd.BALANCE ELSE 0 END) AS TOTAL_HOURS,
                  SUM(CASE WHEN bd.BALANCE_DESC = 'Payroll' THEN bd.BALANCE ELSE 0 END) AS TOTAL_COST
                  FROM 
                  BUDGET_DATATAB_PR bd
                  WHERE 
                  bd.BALANCE_DESC IN ('PR Hours', 'Payroll')
                  AND bd.COST_CENTER = @COST_CENTER
                  AND bd.[YEAR] = @YEAR
                  AND bd.[MONTH] = @MONTH
                  GROUP BY 
                  bd.COST_CENTER,
                  bd.[YEAR],
                  bd.[MONTH],
                  bd.JOB_PROFILE
                  ORDER BY 
                  bd.COST_CENTER,
                  bd.[MONTH],
                  bd.JOB_PROFILE
                  ",
            CommandType = CommandType.Text,
            Mapper = PayrollBudgetBySiteMapper.MapToPayrollBudgetBySiteDtoList
        };

        public static readonly EDWQueryDefinition PAYROLL_ACTUALS_BY_SITE = new EDWQueryDefinition
        {
            Id = 6,
            NameOrSql = @"
                  SELECT 
                  ps.TITLE AS JobCode,
                  ps.TOTAL_HOURS AS [Hours],
                  ps.TOTAL_DOLLARS AS [Cost],
                  ps.[DATE] AS [Date]
                  FROM 
                  [TP_LEGION].[dbo].[vwPAYROLL_SUMMARY] ps
                  WHERE 
                  ps.[WORK_LOCATION] = @WORK_LOCATION
                  AND ps.[PAY_TYPE] NOT IN ('DIFFERENTIAL', 'MEAL PREMIUM')
                  AND ps.[DATE] >= DATEFROMPARTS(@Year, @Month, 1)
                  AND ps.[DATE] <= EOMONTH(DATEFROMPARTS(@Year, @Month, 1))
                  ",
            CommandType = CommandType.Text,
            Mapper = PayrollStatisticsMapper.MapToPayrollStatisticsDtoList
        };

        public static readonly EDWQueryDefinition PAYROLL_SCHEDULE_BY_SITE = new EDWQueryDefinition
        {
            Id = 7,
            NameOrSql = @"
                    DECLARE @FirstDayOfMonth INT = DATEPART(DAYOFYEAR, DATEFROMPARTS(@Year, @Month, 1));
                    DECLARE @LastDayOfMonth INT = DATEPART(DAYOFYEAR, EOMONTH(DATEFROMPARTS(@Year, @Month, 1)));

                    SELECT 
                        se.WORK_ROLE as JobCode, 
                        DATEADD(DAY, se.DAY_OF_THE_YEAR - 1, DATEFROMPARTS(se.YEAR, 1, 1)) AS [Date],
                        ROUND( (se.REGULAR_MINUTES + se.OVERTIME_MINUTES) / 60.0, 2) AS [Hours],
                        se.EMPLOYEE_EXTERNAL_ID, 
                        se.LOCATION_EXTERNAL_ID, 
                        se.SCHEDULE_WEEK, 
                        se.YEAR, 
                        se.DAY_OF_THE_YEAR, 
                        se.START_DATE, 
                        se.END_DATE, 
                        se.REGULAR_MINUTES, 
                        se.OVERTIME_MINUTES
                    FROM 
                        [TP_LEGION].[dbo].[SHIFT_ENTITY] se
                    WHERE 
                        se.LOCATION_EXTERNAL_ID = @WORK_LOCATION
                        AND se.YEAR = @Year
                        AND se.DAY_OF_THE_YEAR BETWEEN @FirstDayOfMonth AND @LastDayOfMonth
                  ",
            CommandType = CommandType.Text,
            Mapper = PayrollStatisticsMapper.MapToPayrollStatisticsDtoList
        };

        public static readonly EDWQueryDefinition REVENUE_DAILY_STATS_PIVOTED = new EDWQueryDefinition
        {
            Id = 8,
            NameOrSql = @"
                -- Get revenue data with pivoted categories
                SELECT
                    r.[SITE],
                    r.[DATE],
                    -- Pivoted Vehicle Counts
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Self Daily' THEN r.[VEHICLECOUNT] ELSE 0 END) AS SelfDaily_Count,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Self Monthly' THEN r.[VEHICLECOUNT] ELSE 0 END) AS SelfMonthly_Count,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Self Overnight' THEN r.[VEHICLECOUNT] ELSE 0 END) AS SelfOvernight_Count,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Valet Daily' THEN r.[VEHICLECOUNT] ELSE 0 END) AS ValetDaily_Count,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Valet Monthly' THEN r.[VEHICLECOUNT] ELSE 0 END) AS ValetMonthly_Count,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Valet Overnight' THEN r.[VEHICLECOUNT] ELSE 0 END) AS ValetOvernight_Count,
                    
                    -- Pivoted Revenue
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Self Daily' THEN r.[NETEXTERNALREVENUE] ELSE 0 END) AS SelfDaily_Revenue,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Self Monthly' THEN r.[NETEXTERNALREVENUE] ELSE 0 END) AS SelfMonthly_Revenue,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Self Overnight' THEN r.[NETEXTERNALREVENUE] ELSE 0 END) AS SelfOvernight_Revenue,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Valet Daily' THEN r.[NETEXTERNALREVENUE] ELSE 0 END) AS ValetDaily_Revenue,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Valet Monthly' THEN r.[NETEXTERNALREVENUE] ELSE 0 END) AS ValetMonthly_Revenue,
                    SUM(CASE WHEN r.[REVENUE_CATEGORY] = 'Valet Overnight' THEN r.[NETEXTERNALREVENUE] ELSE 0 END) AS ValetOvernight_Revenue,
                    
                    -- Total for the day
                    SUM(r.[VEHICLECOUNT]) AS Total_VehicleCount,
                    SUM(r.[NETEXTERNALREVENUE]) AS Total_Revenue,
                    
                    -- Include Occupied Rooms from other table via LEFT JOIN
                    o.OccupiedRooms
                FROM
                    [TP_EDW].[dbo].[REVENUE_DAILY_DETAIL] r
                LEFT JOIN (
                    -- Subquery to get occupied rooms by date
                    SELECT
                        [SITE],
                        [DATE],
                        SUM([VALUE]) AS OccupiedRooms
                    FROM
                        [TP_EDW].[dbo].[REVENUE_DATAMART_DAILY]
                    WHERE
                        [SITE] = @SITE
                        AND [VALUE_TYPE] IN ('Other')
                        AND [REVENUE_CATEGORY] = 'Occupied Rooms'
                        AND [DATE] BETWEEN
                            DATEFROMPARTS(@YEAR, @MONTH, 1)
                            AND GETDATE()
                    GROUP BY
                        [SITE], [DATE]
                ) o ON r.[SITE] = o.[SITE] AND r.[DATE] = o.[DATE]
                WHERE
                    r.[SITE] = @SITE
                    AND r.[DATE] BETWEEN
                        DATEFROMPARTS(@YEAR, @MONTH, 1)
                        AND GETDATE()
                GROUP BY
                    r.[SITE], r.[DATE], o.OccupiedRooms
                ORDER BY
                    r.[DATE]",
            CommandType = CommandType.Text,
            Mapper = results => SiteStatisticRevenueDetailMapper.MapToSiteStatisticDetailVo(results)
        };

        public static readonly EDWQueryDefinition OTHER_EXPENSES_ACTUAL_DATA = new EDWQueryDefinition
        {
            Id = 9,
            NameOrSql = @"
                SELECT 
                    [COST_CENTER],
                    actual.[MAIN_ACCOUNT],
                    coa.[ACCOUNT_NAME],
                    [BALANCE],
                    [PERIOD]
                FROM [TP_EDW].[dbo].[ACCOUNT_SUMMARY] AS actual
                JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa 
                    ON actual.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
                WHERE [COST_CENTER] = @COST_CENTER
                    AND [PERIOD] >= FORMAT(DATEFROMPARTS(@YEAR, @MONTH, 1), 'yyyyMM')
                    AND [PERIOD] < FORMAT(DATEADD(MONTH, 12, DATEFROMPARTS(@YEAR, @MONTH, 1)), 'yyyyMM')
                    AND [IS_SUMMARY_CATEGORY] = 'OTHER EXPENSE'
                    AND actual.[MAIN_ACCOUNT] IN (
                        '7045', '7075', '7100', '7113', '7115', '7170', '7175', '7178', '7180', '7185', '7205', '7220',
                        '7000', '7005', '7010', '7011', '7015', '7016', '7017', '7018', '7019', '7020', '7021', '7026',
                        '7030', '7040', '7050', '7055', '7060', '7065', '7070', '7072', '7080', '7082', '7085', '7090',
                        '7095', '7099', '7101', '7102', '7105', '7110', '7120', '7125', '7126', '7130', '7131', '7135',
                        '7140', '7145', '7150', '7155', '7160', '7165', '7171', '7182', '7190', '7195', '7200', '7210',
                        '7215', '7217', '7219', '7225', '7230', '7240', '7245', '7270', '7275', '7350', '7351'
                    )
                ORDER BY [PERIOD], actual.[MAIN_ACCOUNT]",
            CommandType = CommandType.Text,
            Mapper = results => OtherExpenseMapper.MapToOtherExpenseDto(results, isBudget: false)
        };

        public static readonly EDWQueryDefinition OTHER_EXPENSES_BUDGET_DATA = new EDWQueryDefinition
        {
            Id = 10,
            NameOrSql = @"
                SELECT 
                    [COST_CENTER],
                    budget.[MAIN_ACCOUNT],
                    coa.[ACCOUNT_NAME],
                    [BALANCE],
                    [PERIOD]
                FROM [TP_EDW].[dbo].[BUDGET_FINAL] AS budget
                JOIN [TP_EDW].[dbo].[CHART_OF_ACCOUNT] AS coa 
                    ON budget.MAIN_ACCOUNT = coa.MAIN_ACCOUNT
                WHERE [COST_CENTER] = @COST_CENTER
                    AND [PERIOD] >= FORMAT(DATEFROMPARTS(@YEAR, @MONTH, 1), 'yyyyMM')
                    AND [PERIOD] < FORMAT(DATEADD(MONTH, 12, DATEFROMPARTS(@YEAR, @MONTH, 1)), 'yyyyMM')
                    AND budget.[MAIN_ACCOUNT] IN (
                        '7045', '7075', '7100', '7113', '7115', '7170', '7175', '7178', '7180', '7185', '7205', '7220',
                        '7000', '7005', '7010', '7011', '7015', '7016', '7017', '7018', '7019', '7020', '7021', '7026',
                        '7030', '7040', '7050', '7055', '7060', '7065', '7070', '7072', '7080', '7082', '7085', '7090',
                        '7095', '7099', '7101', '7102', '7105', '7110', '7120', '7125', '7126', '7130', '7131', '7135',
                        '7140', '7145', '7150', '7155', '7160', '7165', '7171', '7182', '7190', '7195', '7200', '7210',
                        '7215', '7217', '7219', '7225', '7230', '7240', '7245', '7270', '7275', '7350', '7351'
                    )
                ORDER BY [PERIOD], budget.[MAIN_ACCOUNT]",
            CommandType = CommandType.Text,
            Mapper = results => OtherExpenseMapper.MapToOtherExpenseDto(results, isBudget: true)
        };

        public static readonly Dictionary<int, EDWQueryDefinition> Definitions = new()
        {
            { BUDGET_DAILY_DETAIL.Id, BUDGET_DAILY_DETAIL },
            { BUDGET_ACTUAL_SUMMARY.Id, BUDGET_ACTUAL_SUMMARY },
            { RATES_BY_YEAR.Id, RATES_BY_YEAR },
            { BUDGET_ACTUAL_SUMMARY_BY_SITE.Id, BUDGET_ACTUAL_SUMMARY_BY_SITE },
            { PAYROLL_BUDGET_BY_SITE.Id, PAYROLL_BUDGET_BY_SITE },
            { PAYROLL_ACTUALS_BY_SITE.Id, PAYROLL_ACTUALS_BY_SITE },
            { PAYROLL_SCHEDULE_BY_SITE.Id, PAYROLL_SCHEDULE_BY_SITE },
            { REVENUE_DAILY_STATS_PIVOTED.Id, REVENUE_DAILY_STATS_PIVOTED },
            { OTHER_EXPENSES_ACTUAL_DATA.Id, OTHER_EXPENSES_ACTUAL_DATA },
            { OTHER_EXPENSES_BUDGET_DATA.Id, OTHER_EXPENSES_BUDGET_DATA }
        };
    }
}
