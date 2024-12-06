using Application.Contracts.Repositories;
using Application.Contracts.Services;
using Application.Models.DTOs.Common;
using Application.Models.DTOs.Employee;
using Application.Models.DTOs.Group;
using Application.Models.Helpers;
using AutoMapper;
using Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;
        private readonly IMapper _mapper;
        private Logs _auditlogs;

        public EmployeeService(IEmployeeRepository repository, IMapper mapper, Logs auditlogs) 
        {
            _repository = repository;
            _mapper = mapper;
            _auditlogs = auditlogs;
        }
        public async Task AddEmployeeAsync(EmployeeCreateDTO employeeCreateDto)
        {
            var employee = _mapper.Map<Employee>(employeeCreateDto);

            //AuditLogsDTO auditlogs = _auditlogs.SaveLog("Group",
            //             "Create",
            //             string.Format("Created Group - [Branch Code: {0} | Name: {1} | Area: {2} | Division: {3}]", group.Code, group.Name, group.Area, group.Division),
            //             group.CreatedBy);
            //_context.Add(auditlogs);
            await _repository.AddAsync(employee);
        }

        public async Task<PagedResult<EmployeeDTO>> GetAllEmployeesAsync(int? pageNumber, int? pageSize, string? searchTerm)
        {
            var employees = await _repository.GetAllAsync(pageNumber, pageSize, searchTerm);
            var employeeDtos = _mapper.Map<List<EmployeeDTO>>(employees);

            // Get the total count of groups for pagination metadata
            var totalCount = await _repository.GetTotalCountAsync(searchTerm);

            return new PagedResult<EmployeeDTO>
            {
                Items = employeeDtos,
                TotalCount = totalCount,
                PageNumber = pageNumber ?? 1,  // Default to 1 if not provided
                PageSize = pageSize ?? 10      // Default to 10 if not provided
            };
        }
    }
}
