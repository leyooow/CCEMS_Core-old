using Application.Models.DTOs.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Models.DTOs.Employee;
using Application.Models.DTOs.Common;

namespace Application.Contracts.Services
{
    public interface IEmployeeService
    {
        Task<PagedResult<EmployeeDTO>> GetAllEmployeesAsync(int? pageNumber, int? pageSize, string? searchTerm);

        Task AddEmployeeAsync(EmployeeCreateDTO employeeCreateDto);
    }
}
