using Application.Models.DTOs;
using Application.Models.DTOs.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Services
{
    public interface IGroupService
    {
        Task<PagedResult<GroupDTO>> GetAllGroupsAsync(int? pageNumber, int? pageSize, string? searchTerm);
        Task<GroupDTO?> GetGroupByIdAsync(int id);
        Task AddGroupAsync(GroupCreateDTO groupCreateDto);
        Task UpdateGroupAsync(GroupUpdateDTO groupUpdateDto);
        Task DeleteGroupAsync(int id);
    }
}
