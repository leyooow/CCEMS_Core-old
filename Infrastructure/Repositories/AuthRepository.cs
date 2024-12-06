using Application.Contracts.Repositories;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            if (string.IsNullOrWhiteSpace(loginName))
                throw new ArgumentException("Login name cannot be null or empty.", nameof(loginName));

            var user = await _context.Users
                                     .Include(u => u.Role)
                                     .Include(u => u.BranchAccesses)
                                     .SingleOrDefaultAsync(u => u.LoginName == loginName);

            if (user == null)
                throw new KeyNotFoundException($"User with login name '{loginName}' was not found.");

            return user;

        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }

}
