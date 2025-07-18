using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TownePark.Models.Vo;

namespace TownePark.Data
{
    public interface IInternalRevenueRepository
    {
        Task<List<InternalRevenueDataVo>> GetInternalRevenueDataAsync(IEnumerable<string> siteNumbers, int year);
    }
}
