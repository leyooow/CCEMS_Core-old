using Application.MappingProfile;
using AutoMapper;

namespace Tests
{
    public class UnitTest1
    {
        [Fact]
        public void MappingConfiguration_IsValid()
        {
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            configuration.AssertConfigurationIsValid();
        }

    }
}