﻿using api.Models.Vo;
using api.Models.Dto;
using TownePark;

namespace api.Services
{
    public interface ISiteStatisticService
    {
        Task<IEnumerable<SiteStatisticVo>> GetSiteStatistics(Guid siteId, string billingPeriod, string timeRange);
        void SaveSiteStatistics(SiteStatisticVo updates);
        Task<List<SiteStatisticVo>> GetSiteStatisticsBatch(List<string> siteNumbers, List<string> billingPeriods);
        Task<PnlBySiteListVo> GetPNLData(List<string> siteIds, int year);
        Task<List<SiteStatisticDetailVo>> GetBudgetDailyData(string siteNumber, string billingPeriod);
 
    }
}
