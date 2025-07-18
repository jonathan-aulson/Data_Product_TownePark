using api.Models.Dto;
using System;

namespace api.Adapters
{
    public interface IParkingRateServiceAdapter
    {
        ParkingRateDataDto? GetParkingRates(Guid siteId, int year);
        void SaveParkingRates(ParkingRateDataDto update);
    }
} 