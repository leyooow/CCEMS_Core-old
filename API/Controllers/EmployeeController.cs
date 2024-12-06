using Application.Contracts.Services;
using Application.Models.DTOs.Employee;
using Application.Models.DTOs.Group;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }



        [HttpGet("GetAllEmployees")]
        public async Task<IActionResult> GetAllEmployees([FromQuery] int? pageNumber = 1, [FromQuery] int? pageSize = 10, [FromQuery] string? searchTerm = null)
        {
            var result = await _employeeService.GetAllEmployeesAsync(pageNumber, pageSize, searchTerm);
            return Ok(result);
        }

        [HttpPost("CreateEmployee")]
        public async Task<IActionResult> Create(EmployeeCreateDTO employeeCreateDto)
        {
            await _employeeService.AddEmployeeAsync(employeeCreateDto);
            return NoContent();
        }

    }


}
