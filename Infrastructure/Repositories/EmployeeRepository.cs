using Application.Contracts.Repositories;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        private readonly CcemQatContext _context;
        public EmployeeRepository(CcemQatContext context) : base(context)
        {
            _context = context;

        }

        public new async Task AddAsync(Employee employee)
        {
            await base.AddAsync(employee);
        }


        public async Task<List<Employee>> GetAllAsync(int? pageNumber, int? pageSize, string? searchTerm)
        {
            IQueryable<Employee> query = _context.Set<Employee>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(g => g.FirstName.Contains(searchTerm) ||
                g.MiddleName.Contains(searchTerm) ||
                g.EmployeeId.Contains(searchTerm) ||
                g.LastName.Contains(searchTerm)
                );
            }

            if (pageNumber.HasValue && pageSize.HasValue)
            {
                query = query
                    .Skip((pageNumber.Value - 1) * pageSize.Value)
                    .Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }

      


        public async Task<int> GetTotalCountAsync(string? searchTerm)
        {
            IQueryable<Employee> query = _context.Set<Employee>();


            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(g => g.FirstName.Contains(searchTerm) ||
                g.MiddleName.Contains(searchTerm) ||
                g.EmployeeId.Contains(searchTerm) ||
                g.LastName.Contains(searchTerm)
                );
            }

            return await query.CountAsync();
        }

    }
}
