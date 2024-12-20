using Application.Contracts.Services;
using Application.Models.DTOs.Report;
using Application.Models.Helpers;
using Application.Models.Responses;
using Application.Models;
using Infrastructure.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        public readonly IReportService _service;
        public ReportController(IReportService service)
        {
            _service = service;
        }
        [HttpGet("GetList")]
        public async Task<PaginatedList<Report>> GetList(string searchString = "")
        {
            return await _service.GetList(searchString);
        }
        [HttpGet("PopulateGroupsDropDownList")]
        public async Task<List<Group>> PopulateGroupsDropDownList()
        {
            return await _service.PopulateGroupsDropDownList();
        }
        [HttpPost("DownloadAdhoc")]
        public async Task<IActionResult> DownloadAdhoc(DownloadAdhocViewModel vm)
        {
            var result = await _service.DownloadAdhoc(vm);
            if (result.Success)
                return File(result.Data.FileByte, result.Data.ContentType, result.Data.FileName);
            else
                return Ok(result);
        }
    }
}
