using api.Adapters.Mappers;
using api.Data;
using api.Models.Vo;
using TownePark;
using System.Linq;

namespace api.Services.Impl
{
    class OtherExpenseService : IOtherExpenseService
    {
        private readonly IOtherExpenseRepository _otherExpenseRepository;

        public OtherExpenseService(IOtherExpenseRepository otherExpenseRepository)
        {
            _otherExpenseRepository = otherExpenseRepository;
        }

        public OtherExpenseVo? GetOtherExpenseData(Guid siteId, string period)
        {
            var model = _otherExpenseRepository.GetOtherExpenseDetail(siteId, period) ?? new List<bs_OtherExpenseDetail>();

            var otherExpense = OtherExpenseMapper.OtherExpenseModelToVo(model, siteId, period);

            otherExpense.CustomerSiteId = siteId;
            otherExpense.BillingPeriod = period;

            return otherExpense;
        }

        public void SaveOtherExpenseData(OtherExpenseVo otherExpense)
        {
            List<bs_OtherExpenseDetail> model = OtherExpenseMapper.OtherExpenseVoToModel(otherExpense);
            _otherExpenseRepository.UpdateOtherRevenueDetails(model);
        }
    }
}
