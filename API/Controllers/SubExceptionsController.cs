using Application.Contracts.Services;
using Application.Models.DTOs.ExceptionsMgmt;
using Application.Models.DTOs.SubExceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubExceptionsController : ControllerBase
    {
        private readonly ISubExceptionsService _subExceptionsService;
        public SubExceptionsController(ISubExceptionsService subExceptionsService)
        {
            _subExceptionsService = subExceptionsService;
        }

        [HttpGet("GetSubExceptionLists")]
        public async Task<IActionResult> GetSubExceptionLists([FromQuery] int? pageNumber = 1, [FromQuery] int? pageSize = 10, [FromQuery] string? searchString = null)
        {
            var response = await _subExceptionsService.GetSubExceptionLists(pageNumber, pageSize, searchString);
            return Ok(response);
        }

        [HttpGet("GetSubExceptionDetails")]
        public async Task<IActionResult> GetSubExceptionDetails([FromQuery] string subERN)
        {
            var response = await _subExceptionsService.GetSubExceptionDetails(subERN);
            return Ok(response);
        }

        [HttpDelete("DeleteSubException/{subRefNo}")]
        public async Task<IActionResult> DeleteSubException(string subRefNo, [FromQuery] string deleteSubExceptionRemarks)
        {
            var response = await _subExceptionsService.DeleteSubException(subRefNo, deleteSubExceptionRemarks);
            return Ok(response);
        }

        [HttpPut("UpdateSubException/{subRefNo}")]
        public async Task<IActionResult> UpdateSubException(string subRefNo, [FromQuery] DeviationStatusDTO NewStatus, DateTime? TaggingDate, string ExItemRefNo,
            string data, bool isDelete = false)
        {
            var response = await _subExceptionsService.UpdateSubException(subRefNo, NewStatus, TaggingDate, ExItemRefNo, data, isDelete = false);
            return Ok(response);
        }

        [HttpPut("ApproveSubException/{subRefNo}")]
        public async Task<IActionResult> ApproveSubException(string subRefNo, SubExceptionsDetailsDTO value)
        {
            var response = await _subExceptionsService.ApproveSubException(subRefNo, value);
            return Ok(response);
        }

        [HttpDelete("RejectSubException/{subRefNo}")]
        public async Task<IActionResult> RejectSubException(string subRefNo, SubExceptionsDetailsDTO value, string? remarks)
        {
            var response = await _subExceptionsService.RejectSubException(subRefNo, value, remarks);
            return Ok(response);
        }
    }
}
