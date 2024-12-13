using Application.Contracts.Repositories;
using Application.Contracts.Services;
using Application.Models.DTOs.Common;
using Application.Models.DTOs.Group;
using Application.Models.DTOs.User;
using Application.Models.Helpers;
using Application.Models.Responses;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;

        }

        public async Task<GenericResponse<List<UserDTO>>> GetAllAsync()
        {
            var users = await _repository.GetAllAsync();

            var userDTOs = _mapper.Map<List<UserDTO>>(users);

            return ResponseHelper.SuccessResponse(userDTOs, "Users retrieved succesfully.");
        }

        public async Task<GenericResponse<UserDTO?>> GetUserByIdAsync(string id)
        {
            try
            {
                var User = await _repository.GetUserByIdAsync(id);
                var mapUser = User == null ? null : _mapper.Map<UserDTO>(User);

                return ResponseHelper.SuccessResponse(mapUser, "User retrieved successfully");
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse<UserDTO?>("An error occurred while retrieving the group.");
            }
        }

        public async Task<GenericResponse<PagedResult<UserDTO>>> GetPaginatedAsync(int? pageNumber, int? pageSize, string? searchTerm)
        {
            try
            {
                var Users = await _repository.GetPaginatedAsync(pageNumber, pageSize, searchTerm);
                var UserDtos = _mapper.Map<List<UserDTO>>(Users);

                // Get the total count of Users for pagination metadata
                var totalCount = await _repository.GetTotalCountAsync(searchTerm);

                var pagedResult = new PagedResult<UserDTO>
                {
                    Items = UserDtos,
                    TotalCount = totalCount,
                    PageNumber = pageNumber ?? 1,  // Default to 1 if not provided
                    PageSize = pageSize ?? 10      // Default to 10 if not provided
                };

                return ResponseHelper.SuccessResponse(pagedResult, "Paginated Users retrieved successfully");
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse<PagedResult<UserDTO>>($"Failed to retrieve groups: {ex.Message}");
            }
        }

        public async Task<GenericResponse<List<RoleDTO>>> GetAllRolesAsync()
        {
           var roles = await _repository.GetAllRolesAsync();
            
           var rolesDTOs = _mapper.Map<List<RoleDTO>>(roles);

            return ResponseHelper.SuccessResponse(rolesDTOs, "Roles retrieved successfully");
        }
    }
}
