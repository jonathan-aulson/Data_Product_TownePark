using api.Data.Impl;
using api.Services;
using api.Usecases;
using FluentAssertions;
using Microsoft.PowerPlatform.Dataverse.Client;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using NSubstitute;
using TownePark;
using Xunit;

namespace BackendTests.Data
{
    public class SiteStatisticRepositoryTest
    {
        private readonly IDataverseService _dataverseService;
        private readonly IOrganizationService _organizationService;
        private readonly SiteStatisticRepository _siteStatisticRepository;
        private readonly IMonthRangeGenerator _monthRangeGenerator;

        public SiteStatisticRepositoryTest()
        {
            _dataverseService = Substitute.For<IDataverseService>();
            _organizationService = Substitute.For<IOrganizationService>();
            _monthRangeGenerator = Substitute.For<IMonthRangeGenerator>();
            _dataverseService.GetServiceClient().Returns(_organizationService);

            _siteStatisticRepository = new SiteStatisticRepository(_dataverseService, _monthRangeGenerator);
        }

        [Fact]
        public void GetSiteStatistics_ShouldReturnStatRecord()
        {
            // Arrange
            var siteId = Guid.NewGuid();
            var siteStatisticId = Guid.NewGuid();
            var billingPeriod = "2025-07";

            // Create entity for site statistic response
            var siteStatisticEntity = new Entity("bs_sitestatistic")
            {
                Id = siteStatisticId,
                ["bs_customersiteFK"] = new EntityReference("bs_customersite", siteId),
                ["bs_billingperiod"] = billingPeriod,
                ["bs_name"] = "Hotel Parking"
            };

            // Add aliased value for CustomerSite.TotalRoomsAvailable
            siteStatisticEntity["customersite.bs_totalroomsavailable"] = new AliasedValue(
                "bs_customersite",
                "bs_totalroomsavailable",
                "100"
            );

            // Create entity collection for first query response
            var siteStatisticCollection = new EntityCollection
            {
                Entities = { siteStatisticEntity }
            };

            // Create entities for forecast and budget details
            var forecastDetail = new Entity("bs_sitestatisticdetail")
            {
                Id = Guid.NewGuid(),
                ["bs_sitestatisticfk"] = new EntityReference("bs_sitestatistic", siteStatisticId),
                ["bs_type"] = new OptionSetValue(283590000), // Forecast type
                ["bs_date"] = DateTime.Today
                // Add other relevant fields...
            };

            var budgetDetail = new Entity("bs_sitestatisticdetail")
            {
                Id = Guid.NewGuid(),
                ["bs_sitestatisticfk"] = new EntityReference("bs_sitestatistic", siteStatisticId),
                ["bs_type"] = new OptionSetValue(283590001), // Budget type
                ["bs_date"] = DateTime.Today
                // Add other relevant fields...
            };

            // Create entity collection for second query response
            var detailsCollection = new EntityCollection
            {
                Entities = { forecastDetail, budgetDetail }
            };

            // Mock the service client
            var mockServiceClient = Substitute.For<IOrganizationServiceAsync>();

            // Set up the mock to return different responses based on the query
            mockServiceClient.RetrieveMultiple(Arg.Is<QueryExpression>(q => q.EntityName == "bs_sitestatistic"))
                .Returns(siteStatisticCollection);

            mockServiceClient.RetrieveMultiple(Arg.Is<QueryExpression>(q => q.EntityName == "bs_sitestatisticdetail"))
                .Returns(detailsCollection);

            // Mock dataverseService to return our mockServiceClient
            _dataverseService.GetServiceClient().Returns(mockServiceClient);

            // Act
            var result = _siteStatisticRepository.GetSiteStatistics(siteId, billingPeriod);

            // Assert
            // First verify the first query
            mockServiceClient.Received().RetrieveMultiple(Arg.Is<QueryExpression>(query =>
                query.EntityName == "bs_sitestatistic" &&
                query.Criteria.Conditions.Any(c =>
                    c.AttributeName == "bs_customersitefk" &&
                    c.Operator == ConditionOperator.Equal &&
                    c.Values.Contains(siteId)) &&
                query.Criteria.Conditions.Any(c =>
                    c.AttributeName == "bs_billingperiod" &&
                    c.Operator == ConditionOperator.Equal &&
                    c.Values.Contains(billingPeriod))
            ));

            // Then verify the second query
            mockServiceClient.Received().RetrieveMultiple(Arg.Is<QueryExpression>(query =>
                query.EntityName == "bs_sitestatisticdetail" &&
                query.Criteria.Conditions.Any(c =>
                    c.AttributeName == "bs_sitestatisticfk" &&
                    c.Operator == ConditionOperator.Equal &&
                    c.Values.Contains(siteStatisticId))
            ));

            // Finally verify the result
            result.Should().NotBeNull();
            result.bs_BillingPeriod.Should().Be(billingPeriod);
            result.bs_SiteStatistic_SiteStatisticDetail.Should().NotBeNull();
            result.bs_SiteStatistic_SiteStatisticDetail.Should().HaveCount(2);
            result.bs_SiteStatistic_CustomerSite.Should().NotBeNull();
            result.bs_SiteStatistic_CustomerSite.bs_TotalRoomsAvailable.Should().Be("100");
        }

        [Fact]
        public void GetSiteStatistics_ShouldReturnNull_WhenNoRecordFound()
        {
            // Arrange
            var siteId = Guid.NewGuid();
            var billingPeriod = "2025-07";
            // Mock the service client
            var mockServiceClient = Substitute.For<IOrganizationServiceAsync>();
            // Set up the mock to return an empty collection
            mockServiceClient.RetrieveMultiple(Arg.Is<QueryExpression>(q => q.EntityName == "bs_sitestatistic"))
                .Returns(new EntityCollection());
            // Mock dataverseService to return our mockServiceClient
            _dataverseService.GetServiceClient().Returns(mockServiceClient);
            // Act
            var result = _siteStatisticRepository.GetSiteStatistics(siteId, billingPeriod);
            // Assert
            result.Should().BeNull();
        }

        [Fact]
        public void SaveSiteStatistics_ShouldUpdate_WhenUpdateIsSuccessful()
        {
            var siteStatistic = new bs_SiteStatistic
            {
                Id = Guid.NewGuid(),
                bs_Name = "1001",
                bs_CustomerSiteFK = new EntityReference("bs_customersite", Guid.NewGuid()),
                bs_BillingPeriod = "2025-07",
                bs_SiteStatistic_CustomerSite = new bs_CustomerSite
                {
                    bs_TotalRoomsAvailable = "100"
                },
                bs_SiteStatistic_SiteStatisticDetail = new List<bs_SiteStatisticDetail>
                {
                    new bs_SiteStatisticDetail
                    {
                        bs_Type = bs_sitestatisticdetailchoice.Forecast,
                        bs_Date = new DateTime(2025, 7, 1),
                        bs_SiteStatisticDetailId = Guid.NewGuid(),
                        bs_SiteStatisticFK = new EntityReference("bs_sitestatistic", Guid.NewGuid()),
                        bs_ValetRateDaily = 10,
                        bs_ValetRateMonthly = 200,
                        bs_SelfRateDaily = 5,
                        bs_SelfRateMonthly = 100,
                        bs_BaseRevenue = 7000,
                        bs_OccupiedRooms = 70,
                        bs_Occupancy = 0.91m,
                        bs_SelfOvernight = 50,
                        bs_ValetOvernight = 20,
                        bs_ValetDaily = 40,
                        bs_ValetMonthly = 60,
                        bs_SelfDaily = 30,
                        bs_SelfMonthly = 10,
                        bs_ValetComps = 5,
                        bs_SelfComps = 5,
                        bs_DriveInRatio = (decimal)0.5,
                        bs_CaptureRatio = (decimal)0.87,
                        bs_Name = "Hotel Parking"
                    },
                    new bs_SiteStatisticDetail
                    {
                        bs_Type = bs_sitestatisticdetailchoice.Budget,
                        bs_Date = new DateTime(2025, 7, 1),
                        bs_SiteStatisticDetailId = Guid.NewGuid(),
                        bs_SiteStatisticFK = new EntityReference("bs_sitestatistic", Guid.NewGuid()),
                        bs_ValetRateDaily = 10,
                        bs_ValetRateMonthly = 200,
                        bs_SelfRateDaily = 5,
                        bs_SelfRateMonthly = 100,
                        bs_BaseRevenue = 7000,
                        bs_OccupiedRooms = 70,
                        bs_Occupancy = 0.91m,
                        bs_SelfOvernight = 50,
                        bs_ValetOvernight = 20,
                        bs_ValetDaily = 40,
                        bs_ValetMonthly = 60,
                        bs_SelfDaily = 30,
                        bs_SelfMonthly = 10,
                        bs_ValetComps = 5,
                        bs_SelfComps = 5,
                        bs_DriveInRatio = (decimal)0.5,
                        bs_CaptureRatio = (decimal)0.87,
                        bs_Name = "Hotel Parking"
                    }
                }
            };

            _siteStatisticRepository.SaveSiteStatistics(siteStatistic);

            _organizationService.Received().Update(Arg.Any<bs_SiteStatistic>());
        }
    }
}
