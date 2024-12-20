using Application.Contracts.Repositories;
using Application.Models.DTOs.Common;
using Domain.FEntities;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Repositories
{
    public class BranchCodeRepository :  IBranchCodeRepository
    {
        private readonly SitcbsContext _context;
        public BranchCodeRepository(SitcbsContext context)
        {
            _context = context;
        }
        public async Task<List<BranchCodeTable>> GetAllAsync()
        {
            return await _context.BranchCodeTables.ToListAsync();

        }

        public async Task<BranchCodeTable> GetByIdAsync(string? code)
        {
            return await _context.BranchCodeTables.FindAsync(code);
        }

        //public async Task<PagedResult<BranchCodeTable>> GetPagedBranchesAsync(int page, int pageSize, string? searchTerm)
        //{
        //    var query = _context.BranchCodeTables.AsQueryable();

        //    if (!string.IsNullOrWhiteSpace(searchTerm))
        //    {
        //        query = query.Where(b => b.BrName.Contains(searchTerm) || b.BrCode.Contains(searchTerm));
        //    }

        //    var totalCount = await query.CountAsync();
        //    var items = await query
        //        .Skip((page - 1) * pageSize)
        //        .Take(pageSize)
        //        .ToListAsync();

        //    return new PagedResult<BranchCodeTable>
        //    {
        //        Items = items,
        //        TotalCount = totalCount,
        //        PageNumber = page,
        //        PageSize = pageSize
        //    };
        //}

        public async Task<List<BranchCodeTable>> GetPaginatedAsync(int? pageNumber, int? pageSize, string? searchTerm)
        {
            IQueryable<BranchCodeTable> query = _context.Set<BranchCodeTable>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(g =>
                    g.BrName.Contains(searchTerm) ||
                    g.BrCode.ToString().Contains(searchTerm));
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
            var query = _context.BranchCodeTables.AsQueryable();

            
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                
                if (!string.IsNullOrEmpty(searchTerm))
                {
                    query = query.Where(e => e.BrCode.Contains(searchTerm));
                }
            }
            return await query.CountAsync();
        }



    }
}
