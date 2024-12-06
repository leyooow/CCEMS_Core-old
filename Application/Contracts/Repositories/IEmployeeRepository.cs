using Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Repositories
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        Task<List<Employee>> GetAllAsync(int? pageNumber, int? pageSize, string? searchTerm);
        Task<int> GetTotalCountAsync(string? searchTerm);
    }
}
