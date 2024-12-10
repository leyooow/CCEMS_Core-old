using Application.Contracts.Repositories;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly CcemQatContext _context;

        public AuthRepository(CcemQatContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByLoginNameAsync(string loginName)
        {
            //if (string.IsNullOrWhiteSpace(loginName))
            //    throw new ArgumentException("Login name cannot be null or empty.", nameof(loginName));

            var user = await _context.Users
                                     .Include(u => u.Role)
                                     .Include(u => u.BranchAccesses)
                                     .SingleOrDefaultAsync(u => u.LoginName == loginName);

            //if (user == null)
            //    throw new KeyNotFoundException($"User with login name '{loginName}' was not found.");

            return user;

        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        private static string AppendBranchIDs(User user)
        {
            if (user?.BranchAccesses == null || !user.BranchAccesses.Any())
            {
                return string.Empty; // Return empty if BranchAccess is null or empty
            }

            return string.Join(",", user.BranchAccesses.Select(item => item.BranchId));
        }

        // Example method to save logs
        public async Task SaveLoginAuditLogAsync(User user, string loginName)
        {
            var branchIDs = AppendBranchIDs(user);

            var log = new AuditLog
            {
                ModuleName = "Home",
                ActionType = "Login",
                ActionDesc = string.Format(
                    "Successfully logged-in ID - {0} [Employee ID: {1} | Full Name: {2}, {3} {4} | Role: {5} | Group: {6}]",
                    user.LoginName, user.EmployeeId, user.LastName, user.FirstName, user.MiddleName, user.RoleId, branchIDs),
                ActionBy = loginName,
                DateEntry = DateTime.UtcNow
            };

            _context.AuditLogs.Add(log);
            await _context.SaveChangesAsync();
        }
    }

}
