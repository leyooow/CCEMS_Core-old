using Application.Models.DTOs;
using Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Repositories
{
    public interface IGroupRepository
    {
        Task<List<Group>> GetAllAsync(int? pageNumber, int? pageSize, string? searchTerm);
        Task AddAsync(Group group);
        Task UpdateAsync(Group group);
        Task<Group?> GetByIdAsync(int id);
        Task DeleteAsync(int id);
        Task<int> GetTotalCountAsync(string? searchTerm);
    }
}
