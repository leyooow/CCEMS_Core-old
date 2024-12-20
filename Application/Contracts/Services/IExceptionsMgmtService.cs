using Application.Models.DTOs.Common;
using Application.Models.DTOs.Employee;
using Application.Models.DTOs.ExceptionsMgmt;
using Application.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Services
{
    public interface IExceptionsMgmtService
    {
        Task<GenericResponse<PagedResult<ExceptionItemDTO>>> GetExceptionsList(int? pageNumber, int? pageSize, string? searchString, int? status);
        Task<GenericResponse<ExceptionViewDTO>> GetExceptionDetails(string id);
        Task<GenericResponse<object>> SaveException(ExceptionViewDTO value);
        Task<GenericResponse<object>> UpdateException(ExceptionViewDTO value);
        Task<GenericResponse<PagedResult<ExceptionItemRevsDTO>>> GetExceptionsForApprovalList(int? pageNumber = 1, int? pageSize = 10, string? searchString = null, string? currentFilter = null);
        Task<GenericResponse<ExceptionViewDTO>> GetExceptionsForApprovalDetails(string id);
    }
}
