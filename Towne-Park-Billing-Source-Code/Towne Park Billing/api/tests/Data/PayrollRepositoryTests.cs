using System;
using System.Collections.Generic;
using Xunit;
using api.Data.Impl;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using TownePark;
using api.Services;

namespace BackendTests.Data
{
    public class FakeDataverseService : IDataverseService
    {
        public IOrganizationService ServiceClient { get; set; }
        public IOrganizationService GetServiceClient() => ServiceClient;
    }

    public class FakeOrganizationService : IOrganizationService
    {
        public List<Entity> PayrollDetails { get; set; } = new();
        public List<Entity> JobCodes { get; set; } = new();
        public List<Entity> JobGroups { get; set; } = new();
        public List<Entity> JobCodesBySite { get; set; } = new();

        public EntityCollection RetrieveMultiple(QueryBase query)
        {
            var q = query as QueryExpression;
            if (q.EntityName == bs_PayrollDetail.EntityLogicalName)
                return new EntityCollection(PayrollDetails);
            if (q.EntityName == "bs_jobcode")
                return new EntityCollection(JobCodes);
            if (q.EntityName == "bs_jobgroup")
                return new EntityCollection(JobGroups);
            if (q.EntityName == "bs_jobcodesbysite")
                return new EntityCollection(JobCodesBySite);
            if (q.EntityName == bs_Payroll.EntityLogicalName)
                return new EntityCollection(new List<Entity>
                {
                    new Entity(bs_Payroll.EntityLogicalName)
                    {
                        Id = Guid.NewGuid(),
                        [bs_Payroll.Fields.bs_CustomerSiteFK] = new EntityReference("bs_customersite", Guid.NewGuid()),
                        [bs_Payroll.Fields.bs_Period] = "2025-06",
                        [bs_Payroll.Fields.bs_Name] = "Test Payroll"
                    }
                });
            return new EntityCollection();
        }

        // Unused methods for this test
        public Guid Create(Entity entity) => throw new NotImplementedException();
        public void Update(Entity entity) => throw new NotImplementedException();
        public void Delete(string entityName, Guid id) => throw new NotImplementedException();
        public Entity Retrieve(string entityName, Guid id, ColumnSet columnSet) => throw new NotImplementedException();
        public OrganizationResponse Execute(OrganizationRequest request) => throw new NotImplementedException();
        public void Associate(string entityName, Guid entityId, Relationship relationship, EntityReferenceCollection relatedEntities) => throw new NotImplementedException();
        public void Disassociate(string entityName, Guid entityId, Relationship relationship, EntityReferenceCollection relatedEntities) => throw new NotImplementedException();
    }

    public class PayrollRepositoryTests
    {
        [Fact]
        public void GetPayroll_AttachesJobCodeAndGroupDisplayFields()
        {
            // Arrange
            var jobCodeId = Guid.NewGuid();
            var jobGroupId = Guid.NewGuid();
            var siteId = Guid.NewGuid();

            var payrollDetail = new Entity(bs_PayrollDetail.EntityLogicalName)
            {
                Id = Guid.NewGuid(),
                [bs_PayrollDetail.Fields.bs_JobCodeFK] = new EntityReference("bs_jobcode", jobCodeId),
                [bs_PayrollDetail.Fields.bs_JobGroupFK] = new EntityReference("bs_jobgroup", jobGroupId),
                [bs_PayrollDetail.Fields.bs_RegularHours] = 10m
            };

            var jobCode = new Entity("bs_jobcode")
            {
                Id = jobCodeId,
                ["bs_jobcode"] = "4321",
                ["bs_jobtitle"] = "Valet Attendant"
            };

            var jobGroup = new Entity("bs_jobgroup")
            {
                Id = jobGroupId,
                ["bs_jobgrouptitle"] = "Valet"
            };

            // Add the job code assignment to site
            var jobCodeBySite = new Entity("bs_jobcodesbysite")
            {
                Id = Guid.NewGuid(),
                ["bs_customersite"] = new EntityReference("bs_customersite", siteId),
                ["bs_jobcode"] = new EntityReference("bs_jobcode", jobCodeId)
            };

            var fakeOrgService = new FakeOrganizationService
            {
                PayrollDetails = new List<Entity> { payrollDetail },
                JobCodes = new List<Entity> { jobCode },
                JobGroups = new List<Entity> { jobGroup },
                JobCodesBySite = new List<Entity> { jobCodeBySite }
            };

            var fakeDataverse = new FakeDataverseService { ServiceClient = fakeOrgService };
            var repo = new PayrollRepository(fakeDataverse);

            // Act
            var payroll = repo.GetPayroll(siteId, "2025-06");

            // Assert
            Assert.NotNull(payroll);
            Assert.NotNull(payroll.bs_PayrollDetail_Payroll);
            Assert.Single(payroll.bs_PayrollDetail_Payroll);

            var detail = System.Linq.Enumerable.First(payroll.bs_PayrollDetail_Payroll);
            Assert.True(detail.Contains("jobcode_display"));
            Assert.True(detail.Contains("jobcode_displayname"));
            Assert.Equal("4321", detail["jobcode_display"]);
            Assert.Equal("Valet Attendant", detail["jobcode_displayname"]);
        }

        [Fact]
        public void GetPayroll_WithNoPayrollDetails_ShouldReturnPayrollWithEmptyDetails()
        {
            // Arrange
            var siteId = Guid.NewGuid();

            var fakeOrgService = new FakeOrganizationService
            {
                PayrollDetails = new List<Entity>(), // Empty payroll details
                JobCodes = new List<Entity>(),
                JobGroups = new List<Entity>(),
                JobCodesBySite = new List<Entity>() // No job codes assigned to site
            };

            var fakeDataverse = new FakeDataverseService { ServiceClient = fakeOrgService };
            var repo = new PayrollRepository(fakeDataverse);

            // Act & Assert - This should not throw an exception
            var payroll = repo.GetPayroll(siteId, "2025-06");

            // Assert
            Assert.NotNull(payroll);
            // When no payroll details are found, the property should be null (not an empty collection)
            // This avoids the "Sequence contains no elements" error in the generated entity setter
            Assert.Null(payroll.bs_PayrollDetail_Payroll);
        }

        // --- Helpers for EDW mocking ---
        private PayrollRepository CreatePayrollRepositoryWithMockedHttp(string responseContent, System.Net.HttpStatusCode statusCode = System.Net.HttpStatusCode.OK)
        {
            var handler = new MockHttpMessageHandler(responseContent, statusCode);
            var httpClient = new HttpClient(handler);

            // Patch HttpClient in PayrollRepository via reflection (since it's internal)
            // Instead, use a testable subclass if needed, or patch System.Net.Http.HttpClient.DefaultProxy

            // Use real dataverse service, but it won't be called
            var fakeDataverse = new FakeDataverseService();
            return new PayrollRepository(fakeDataverse);
        }

        private class MockHttpMessageHandler : System.Net.Http.HttpMessageHandler
        {
            private readonly string _responseContent;
            private readonly System.Net.HttpStatusCode _statusCode;
            public MockHttpMessageHandler(string responseContent, System.Net.HttpStatusCode statusCode)
            {
                _responseContent = responseContent;
                _statusCode = statusCode;
            }
            protected override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync(System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
            {
                var response = new System.Net.Http.HttpResponseMessage(_statusCode)
                {
                    Content = new System.Net.Http.StringContent(_responseContent)
                };
                return System.Threading.Tasks.Task.FromResult(response);
            }
        }
    }
}
