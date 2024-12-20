using Application.Contracts.Repositories;
using Application.Contracts.Services;
using Application.Models.DTOs.Common;
using Application.Models.DTOs.Employee;
using Application.Models.DTOs.ExceptionsMgmt;
using Application.Models.DTOs.SubExceptions;
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
    public class SubExceptionsService: ISubExceptionsService
    {
        private readonly ISubExceptionsRepository _repository;
        private readonly IMapper _mapper;

        public SubExceptionsService(ISubExceptionsRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<GenericResponse<PagedResult<ExceptionCodeRevsDTO>>> GetSubExceptionLists(int? pageNumber = 1, int? pageSize = 10, string? searchString = null, string? currentFilter = null)
        {
            try
            {
                var employees = await _repository.GetSubExceptionsLists(pageNumber, pageSize, searchString, currentFilter);
                var employeeDtos = _mapper.Map<List<ExceptionCodeRevsDTO>>(employees);

                // Get the total count of groups for pagination metadata
                var totalCount = await _repository.GetTotalCountAsync(searchString);

                var pagedResult = new PagedResult<ExceptionCodeRevsDTO>
                {
                    Items = employeeDtos,
                    TotalCount = totalCount,
                    PageNumber = pageNumber ?? 1,  // Default to 1 if not provided
                    PageSize = pageSize ?? 10      // Default to 10 if not provided
                };

                return ResponseHelper.SuccessResponse(pagedResult, "Paginated Sub Exceptions List retrieved successfully");
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse<PagedResult<ExceptionCodeRevsDTO>>($"Failed to retrieve Sub Exceptions List: {ex.Message}");

            }
        }
        public async Task<GenericResponse<SubExceptionsDetailsDTO>> GetSubExceptionDetails(string subERN)
        {
            try
            {
                var result = await _repository.GetSubExceptionDetails(subERN);
                return ResponseHelper.SuccessResponse(result, "Sub exceptions details retrieved successfully");
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse<SubExceptionsDetailsDTO>($"Failed to retrieve sub exceptions details: {ex.Message}");

            }
        }
        public async Task<GenericResponse<object>> DeleteSubException(string subRefNo, string deleteSubExceptionRemarks)
        {
            try
            {
                var result = await _repository.DeleteSubException(subRefNo, deleteSubExceptionRemarks);
                return ResponseHelper.SuccessResponse<object>(null, "Sub exception deleted");
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse<object>($"Failed to retrieve Exceptions List: {ex.Message}");

            }
        }
        public async Task<GenericResponse<object>> UpdateSubException(string subRefNo, DeviationStatusDTO NewStatus, DateTime? TaggingDate, string ExItemRefNo, string data, bool isDelete = false)
        {
            try
            {
                var result = await _repository.UpdateSubException(subRefNo, NewStatus, TaggingDate, ExItemRefNo, data, isDelete);
                return ResponseHelper.SuccessResponse<object>(null, "Sub exception updated successfully");
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse<object>($"Failed to update sub exception: {ex.Message}");

            }
        }
        public async Task<GenericResponse<object>> ApproveSubException(string subRefNo, SubExceptionsDetailsDTO value)
        {
            try
            {
                var result = await _repository.ApproveSubException(subRefNo, value);
                return ResponseHelper.SuccessResponse<object>(null, result);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse<object>($"Failed to approve sub exception: {ex.Message}");

            }
        }
        public async Task<GenericResponse<object>> RejectSubException(string subRefNo, SubExceptionsDetailsDTO value, string? remarks)
        {
            try
            {
                var result = await _repository.RejectSubException(subRefNo, value, remarks);
                return ResponseHelper.SuccessResponse<object>(null, result);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse<object>($"Failed to reject sub exception: {ex.Message}");

            }
        }

    }
}
