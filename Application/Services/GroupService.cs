using Application.Contracts;
using Application.Contracts.Repositories;
using Application.Contracts.Services;
using Application.Models.DTOs;
using Application.Models.DTOs.Group;
using AutoMapper;
using Infrastructure.Entities;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;

namespace Application.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _repository;
        private readonly IMapper _mapper;

        public GroupService(IGroupRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<PagedResult<GroupDTO>> GetAllGroupsAsync(int? pageNumber, int? pageSize, string? searchTerm)
        {
            try
            {
                var groups = await _repository.GetAllAsync(pageNumber, pageSize, searchTerm);
                var groupDtos = _mapper.Map<List<GroupDTO>>(groups);

                // Get the total count of groups for pagination metadata
                var totalCount = await _repository.GetTotalCountAsync(searchTerm);

                return new PagedResult<GroupDTO>
                {
                    Items = groupDtos,
                    TotalCount = totalCount,
                    PageNumber = pageNumber ?? 1,  // Default to 1 if not provided
                    PageSize = pageSize ?? 10      // Default to 10 if not provided
                };
            }
            catch (DbException ex)
            {
                throw;
            }

        }

        public async Task<GroupDTO?> GetGroupByIdAsync(int id)
        {
            var group = await _repository.GetByIdAsync(id);
            return group == null ? null : _mapper.Map<GroupDTO>(group);
        }

        public async Task AddGroupAsync(GroupCreateDTO groupCreateDto)
        {
            // Validate DTO if needed
            var group = _mapper.Map<Group>(groupCreateDto);
            await _repository.AddAsync(group);
        }

        public async Task UpdateGroupAsync(GroupUpdateDTO groupUpdateDto)
        {
            // Validate DTO if needed
            var group = _mapper.Map<Group>(groupUpdateDto);
            await _repository.UpdateAsync(group);
        }

        public async Task DeleteGroupAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
