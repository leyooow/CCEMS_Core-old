using Application.Contracts.Repositories;
using Domain.FEntities;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Repositories
{
    public class BranchCodeRepository : IBranchCodeRepository
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
    }
}
