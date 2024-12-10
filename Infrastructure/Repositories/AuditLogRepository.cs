using Application.Contracts.Repositories;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AuditLogRepository : IAuditLogRepository
    {
        private readonly CcemQatContext _context;

        public AuditLogRepository(CcemQatContext context)
        {
            _context = context;
        }

        public async Task SaveLogAsync(AuditLog log)
        {
            _context.AuditLogs.Add(log);
            await _context.SaveChangesAsync();
        }

        public async Task<List<AuditLog>> GetLogsAsync()
        {
            return await _context.AuditLogs.ToListAsync();
        }

        public async Task<List<AuditLog>> GetLogsByUserAsync(string username)
        {
            return await _context.AuditLogs
                .Where(log => log.ActionBy == username)
                .ToListAsync();
        }
    }

}
