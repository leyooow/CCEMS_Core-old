using Application.Contracts.Repositories;
using Application.Contracts.Services;
using Application.Models.DTOs.Employee;
using Application.Models.DTOs.FBranch;
using Application.Models.Helpers;
using Application.Models.Responses;
using AutoMapper;
using Domain.FEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class BranchCodeService : IBranchCodeService
    {
        private readonly IBranchCodeRepository _repository;
        private readonly IMapper _mapper;


       
        public BranchCodeService(IBranchCodeRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<GenericResponse<List<BranchCodeTableDTO>>> GetAllAsync()
        {
            var branchCodes = await _repository.GetAllAsync();

            var branchCodesDtos = _mapper.Map<List<BranchCodeTableDTO>>(branchCodes);

            return ResponseHelper.SuccessResponse(branchCodesDtos, "Branches retrieved succesfully.");
        }

        public async Task<BranchCodeTable> GetByIdAsync(string? code)
        {
            return await _repository.GetByIdAsync(code);
        }

       
    }
}
