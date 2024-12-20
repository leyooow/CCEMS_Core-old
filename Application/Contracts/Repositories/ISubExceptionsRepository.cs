using Application.Models.DTOs.ExceptionsMgmt;
using Application.Models.DTOs.SubExceptions;
using Application.Models.Responses;
using Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Repositories
{
    public interface ISubExceptionsRepository : IBaseRepository<ExceptionCodeRev>
    {
        Task<List<ExceptionCodeRev>> GetSubExceptionsLists(int? pageNumber = 1, int? pageSize = 10, string? searchString = null, string? currentFilter = null);
        Task<SubExceptionsDetailsDTO> GetSubExceptionDetails(string subERN);
        Task<string> DeleteSubException(string subRefNo, string deleteSubExceptionRemarks);
        Task<string> UpdateSubException(string subRefNo, DeviationStatusDTO NewStatus, DateTime? TaggingDate, string ExItemRefNo,
            string data, bool isDelete = false);
        Task<string> ApproveSubException(string subRefNo, SubExceptionsDetailsDTO value);
        Task<string> RejectSubException(string subRefNo, SubExceptionsDetailsDTO value, string? remarks);
    }
}
