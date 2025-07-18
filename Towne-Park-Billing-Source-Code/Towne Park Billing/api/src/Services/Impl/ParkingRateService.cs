using api.Adapters.Mappers;
using api.Data;
using api.Data.Impl;
using api.Models.Vo;
using System;
using TownePark; // Keep for bs_ParkingRate type if used elsewhere, maybe removable

namespace api.Services.Impl
{
    public class ParkingRateService : IParkingRateService
    {
        private readonly IParkingRateRepository _parkingRateRepository;

        public ParkingRateService(IParkingRateRepository parkingRateRepository)
        {
            _parkingRateRepository = parkingRateRepository ?? throw new ArgumentNullException(nameof(parkingRateRepository));
        }

        public async Task<ParkingRateDataVo> GetParkingRatesAsync(Guid siteId, int year)
        {
            // 1. Get Dataverse Parking Rate (forecast) data
            var dataverseParkingRate = _parkingRateRepository.GetParkingRateWithDetails(siteId, year);
            var result = dataverseParkingRate != null
                ? ParkingRateMapper.ParkingRateModelToVo(dataverseParkingRate)
                : new ParkingRateDataVo { CustomerSiteId = siteId, Year = year };

            var dataverseForecastData = result.ForecastRates ?? new List<ParkingRateDetailVo>();

            // 2. Get Site Number if missing
            if (string.IsNullOrEmpty(result.SiteNumber))
            {
                var siteNumber = _parkingRateRepository.GetSiteNumber(siteId);
                result.SiteNumber = siteNumber ?? siteId.ToString();
            }

            // 3. Get EDW Budget/Actual Data
            try
            {
                var edwParkingRateData = await _parkingRateRepository.GetParkingRateDataFromEDW(result.SiteNumber, year);

                if (edwParkingRateData != null)
                {
                    result.BudgetRates = edwParkingRateData.BudgetRates ?? new List<ParkingRateDetailVo>();
                    result.ActualRates = edwParkingRateData.ActualRates ?? new List<ParkingRateDetailVo>();

                    if (!string.IsNullOrEmpty(edwParkingRateData.Name))
                        result.Name = edwParkingRateData.Name;
                    if (!string.IsNullOrEmpty(edwParkingRateData.SiteNumber))
                        result.SiteNumber = edwParkingRateData.SiteNumber;
                }
                else
                {
                    result.BudgetRates = new List<ParkingRateDetailVo>();
                    result.ActualRates = new List<ParkingRateDetailVo>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting data from EDW: {ex.Message}");
                result.BudgetRates = new List<ParkingRateDetailVo>();
                result.ActualRates = new List<ParkingRateDetailVo>();
            }

            result.ForecastRates = dataverseForecastData;
            return result;
        }
public void SaveParkingRates(ParkingRateDataVo update)
        {
            bs_ParkingRate parkingRateModel = ParkingRateMapper.ParkingRateVoToModel(update);

            if (parkingRateModel.Id != Guid.Empty)
            {
                _parkingRateRepository.SaveParkingRates(parkingRateModel);
            }
            else
            {
                _parkingRateRepository.CreateParkingRates(parkingRateModel);
            }
        }
    }
}
