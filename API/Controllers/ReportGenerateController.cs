using Application.Contracts.Services;
using Application.Models.DTOs.Report;
using Application.Models.Helpers;
using Application.Models.Responses;
using Infrastructure.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReportGenerateController : ControllerBase
    {
        private readonly IReportGenerateService _service;
        public ReportGenerateController(IReportGenerateService service)
        {
            _service = service;
        }
        [HttpPost("GenerateReport")]
        public async Task<IActionResult> GenerateReport(ReportGenerateParam data)
        {
            try
            {
                return Ok(await _service.GenerateReport(data.report, data.GenerateReports, data.reportCoverage, data.SelectedBranches));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("PopulateGroupsDropDownList")]
        public async Task<IActionResult> PopulateGroupsDropDownList()
        {
            try
            {
                return Ok(await _service.PopulateGroupsDropDownList());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
