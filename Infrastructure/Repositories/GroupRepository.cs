using Application.Contracts.Repositories;
using Application.Models.DTOs;
using Application.Models.DTOs.Common;
using Application.Models.Helpers;
using Application.Services.Application.Services;
using AutoMapper;
using Infrastructure.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        private readonly CcemQatContext _context;
        private Logs _auditlogs;
        //private IHttpContextAccessor _httpContextAccessor;
        private readonly UserClaimsService _userClaimsService;


        public GroupRepository(CcemQatContext context,Logs auditLogs, UserClaimsService userClaimsService) : base(context) 
        {
            _context = context;
            _auditlogs = auditLogs;
            //_httpContextAccessor = httpContextAccessor;
            _userClaimsService = userClaimsService;
        }

        public new async Task AddAsync(Group group)
        {
            var userClaims = _userClaimsService.GetClaims();

           
            AuditLog auditlogs = _auditlogs.SaveLog("Group",
                       "Create",
                       string.Format("Created Group - [Branch Code: {0} | Name: {1} | Area: {2} | Division: {3}]", group.Code, group.Name, group.Area, group.Division),
                         userClaims.LoginName);
            _context.Add(auditlogs);

            group.DateCreated = DateTime.UtcNow;
            await base.AddAsync(group);
        }

        public new async Task UpdateAsync(Group group)
        {
            var existingGroup = await base.GetByIdAsync(group.Id); 
            if (existingGroup == null)
            {
                throw new KeyNotFoundException("Group not found.");
            }

            
            existingGroup.Name = group.Name;
            existingGroup.Description = group.Description;
            existingGroup.Name = group.Name;
            existingGroup.Code = group.Code;
            existingGroup.Area = group.Area;
            existingGroup.Division = group.Division;
            existingGroup.DateModified = DateTime.UtcNow;

            await base.UpdateAsync(existingGroup);
        }

        public new async Task DeleteAsync(int id)
        {
            await base.DeleteAsync(id);
        }

        public async Task<List<Group>> GetAllAsync(int? pageNumber, int? pageSize, string? searchTerm)
        {
            IQueryable<Group> query = _context.Set<Group>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(g =>
                    g.Name.Contains(searchTerm) ||
                    g.Id.ToString().Contains(searchTerm) ||
                    g.Code.Contains(searchTerm) ||
                    g.Description.Contains(searchTerm) ||
                    g.Area.Contains(searchTerm) ||
                    g.Division.Contains(searchTerm));
            }

            if (pageNumber.HasValue && pageSize.HasValue)
            {
                query = query
                    .Skip((pageNumber.Value - 1) * pageSize.Value)
                    .Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }


        public new async Task<Group?> GetByIdAsync(int id)
        {
            return await base.GetByIdAsync(id);
        }

        
        public async Task<int> GetTotalCountAsync(string? searchTerm)
        {
            IQueryable<Group> query = _context.Set<Group>();

           
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(g => g.Name.Contains(searchTerm));
            }

            return await query.CountAsync();
        }
    }
}
