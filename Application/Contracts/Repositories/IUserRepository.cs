using Application.Models.Responses;
using Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<List<User>> GetPaginatedAsync(int? pageNumber, int? pageSize, string? searchTerm);
        Task<User?> GetUserByIdAsync(string? id);
        Task<List<Role>> GetAllRolesAsync();
        Task<bool> IsUserExistingAsync(string username);
    }
}
