using Application.Contracts.Repositories;
using Application.Models.DTOs.User;
using Application.Models.Helpers;
using Application.Models.Responses;
using Application.Services.Application.Services;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.AccessControl;
using System;
using Microsoft.AspNetCore.Mvc;
using System.DirectoryServices.AccountManagement;

namespace Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly CcemQatContext _context;
        private Logs _auditlogs;
        private readonly UserClaimsService _userClaimsService;
        private string UserLoginName;

        public UserRepository(CcemQatContext context, Logs auditLogs, UserClaimsService userClaimsService) : base(context) 
        {
            _context = context;
            _auditlogs = auditLogs;
            _userClaimsService = userClaimsService;
            UserLoginName = _userClaimsService.GetClaims().LoginName;
        }

        public async Task<List<User>> GetPaginatedAsync(int? pageNumber, int? pageSize, string? searchTerm)
        {
            IQueryable<User> query = _context.Set<User>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(g =>
                    g.EmployeeId.Contains(searchTerm) ||
                    g.LoginName.Contains(searchTerm) ||
                    g.CreatedDate.ToString().Contains(searchTerm) ||
                    g.Role.RoleName.Contains(searchTerm)
                    );
            }

            if (pageNumber.HasValue && pageSize.HasValue)
            {
                query = query
                    .Skip((pageNumber.Value - 1) * pageSize.Value)
                    .Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await base.GetAllAsync();
        }

        public async Task<User?> GetUserByIdAsync(string? id)
        { 
            var entity = await _context.Users.Where(x => x.EmployeeId == id).FirstOrDefaultAsync();

            return entity;
        }

        public async Task<List<Role>> GetAllRolesAsync()
        {
            var entity = await _context.Roles.ToListAsync();

            return entity;
        }

        public async Task AddAsync(User user)
        {
            var auditMessage = $"Created User - [Login Name: {user.LoginName} | Employee ID: {user.EmployeeId} | Full Name: {user.LastName}, {user.FirstName} {user.MiddleName} | Email: {user.Email} | Role ID: {user.RoleId} | Group ID: {string.Join(", ", user.BranchAccesses)}]";

            var auditLog = _auditlogs.SaveLog("Users", "Create", auditMessage, UserLoginName);
            _context.Add(auditLog);

            user.CreatedDate = DateTime.UtcNow;
            user.IsLoggedIn = 0;

            await base.AddAsync(user);
        }

        //private static string AppendBranchIDs(User user)
        //{
        //    string branchIDs = string.Empty;
        //    foreach (var item in user.BranchAccesses)
        //    {
        //        if (branchIDs != string.Empty)
        //            branchIDs += ("," + item.BranchId);
        //        else
        //            branchIDs += item.BranchId;
        //    }

        //    return branchIDs;
        //}

        public async Task<bool> IsUserExistingAsync(string username)
        {
            return await _context.Users.AnyAsync(s => s.LoginName == username);
        }
    }

}
