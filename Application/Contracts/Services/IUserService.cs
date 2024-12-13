﻿using Application.Models.DTOs.Common;
using Application.Models.DTOs.Group;
using Application.Models.DTOs.User;
using Application.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Services
{
    public interface IUserService
    {
        Task<GenericResponse<List<UserDTO>>> GetAllAsync();
        Task<GenericResponse<PagedResult<UserDTO>>> GetPaginatedAsync(int? pageNumber, int? pageSize, string? searchTerm);
        Task<GenericResponse<UserDTO?>> GetUserByIdAsync(string? id);
        Task<GenericResponse<List<RoleDTO>>> GetAllRolesAsync();
        //Task<GenericResponse<object>> AddGroupAsync(GroupCreateDTO groupCreateDto);
        //Task<GenericResponse<object>> UpdateGroupAsync(GroupUpdateDTO groupUpdateDto);
        //Task<GenericResponse<object>> DeleteGroupAsync(int id);
    }
}