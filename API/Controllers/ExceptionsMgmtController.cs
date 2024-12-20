using Application.Contracts.Services;
using Application.Models.DTOs.ExceptionsMgmt;
using Application.Models.DTOs.Group;
using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExceptionsMgmtController : ControllerBase
    {
        private readonly IExceptionsMgmtService _exceptionsMgmtService;
        public ExceptionsMgmtController(IExceptionsMgmtService exceptionsMgmtService)
        {
            _exceptionsMgmtService = exceptionsMgmtService;
        }

        [HttpGet("GetExceptionsList")]
        public async Task<IActionResult> GetExceptionsList([FromQuery] int? pageNumber = 1, [FromQuery] int? pageSize = 10, [FromQuery] string? searchString = null, [FromQuery] int? status = null)
        {
            var response = await _exceptionsMgmtService.GetExceptionsList(pageNumber, pageSize, searchString, status);
            return Ok(response);
        }

        [HttpGet("GetExceptionDetails")]
        public async Task<IActionResult> GetExceptionDetails([FromQuery] string id)
        {
            var response = await _exceptionsMgmtService.GetExceptionDetails(id);
            return Ok(response);
        }

        [HttpPost("SaveException")]
        public async Task<IActionResult> SaveException(ExceptionViewDTO value)
        {
            var response = await _exceptionsMgmtService.SaveException(value);
            return Ok(response);
        }

        [HttpPut("UpdateException/{id}")]
        public async Task<IActionResult> Update(int id, ExceptionViewDTO value)
        {
            var response = await _exceptionsMgmtService.UpdateException(value);
            return Ok(response);
        }

        [HttpGet("GetExceptionsForApprovalList")]
        public async Task<IActionResult> GetExceptionsForApprovalList([FromQuery] int? pageNumber = 1, [FromQuery] int? pageSize = 10, [FromQuery] string? searchString = null, [FromQuery] string? currentFilter = null)
        {
            var response = await _exceptionsMgmtService.GetExceptionsForApprovalList(pageNumber, pageSize, searchString, currentFilter);
            return Ok(response);
        }

        [HttpGet("GetExceptionsForApprovalDetails{id}")]
        public async Task<IActionResult> GetExceptionsForApprovalDetails(string id)
        {
            var response = await _exceptionsMgmtService.GetExceptionsForApprovalDetails(id);
            return Ok(response);
        }
    }
}
