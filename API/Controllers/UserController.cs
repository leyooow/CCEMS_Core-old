using Application.Contracts.Services;
using Application.Models.DTOs.User;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAll()
        {
            var response = await _userService.GetAllAsync();
            return Ok(response);
        }
        [HttpGet("GetPaginatedUsers")]
        public async Task<IActionResult> GetPaginated([FromQuery] int? pageNumber = 1, [FromQuery] int? pageSize = 10, [FromQuery] string? searchTerm = null)
        {

            var response = await _userService.GetPaginatedAsync(pageNumber, pageSize, searchTerm);
            return Ok(response);
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<UserDTO>> GetById(string id)
        {
            var response = await _userService.GetUserByIdAsync(id);
            return Ok(response);

        }

        [HttpGet("GetAllRoles")]
        public async Task<IActionResult> GetallRoles()
        {
            var response = await _userService.GetAllRolesAsync();
            return Ok(response);
        }
    }
}
