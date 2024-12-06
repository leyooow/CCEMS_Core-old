using Application.Contracts;
using Application.Contracts.Services;
using Application.Models.DTOs;
using Application.Models.DTOs.Group;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupsController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet ("GetAllGroups")]
        public async Task<IActionResult> GetAllGroups([FromQuery] int? pageNumber = 1, [FromQuery] int? pageSize = 10, [FromQuery] string? searchTerm = null)
        {
            var result = await _groupService.GetAllGroupsAsync(pageNumber, pageSize, searchTerm);
            return Ok(result);
        }

        [HttpGet("GetGroupById/{id}")]
        public async Task<ActionResult<GroupDTO>> GetById(int id)
        {
            var group = await _groupService.GetGroupByIdAsync(id);
            if (group == null) return NotFound();

            return Ok(group);
        }

        [HttpPost("CreateGroup")]
        public async Task<IActionResult> Create(GroupCreateDTO groupCreateDto)
        {
            await _groupService.AddGroupAsync(groupCreateDto);
            return CreatedAtAction(nameof(GetById), new { id = groupCreateDto.Name }, groupCreateDto);
        }

        [HttpPut("UpdateGroup/{id}")]
        public async Task<IActionResult> Update(int id, GroupUpdateDTO groupUpdateDto)
        {
            if (id != groupUpdateDto.Id) return BadRequest("ID mismatch");

            await _groupService.UpdateGroupAsync(groupUpdateDto);
            return NoContent();
        }

        [HttpDelete("DeleteGroup/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _groupService.DeleteGroupAsync(id);
            return NoContent();
        }
    }
}
