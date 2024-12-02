using Application.Contracts.Repositories;
using Application.Models.DTOs;
using AutoMapper;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly CcemQatContext _context;
        public GroupRepository(CcemQatContext context)
        {
            _context = context;
          
        }

        public async Task AddAsync(Group group)
        {
            group.DateCreated = DateTime.UtcNow; // Add default values at the repository layer if needed
            await _context.Set<Group>().AddAsync(group);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Group group)
        {
            var existingGroup = await _context.Set<Group>().FindAsync(group.Id);
            if (existingGroup == null)
            {
                throw new KeyNotFoundException("Group not found.");
            }

            // Update entity properties (this assumes the group contains the updated values)
            existingGroup.Name = group.Name;
            existingGroup.Description = group.Description;
            existingGroup.DateModified = DateTime.UtcNow;

            _context.Set<Group>().Update(existingGroup);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var group = await _context.Set<Group>().FindAsync(id);
            if (group == null)
            {
                throw new KeyNotFoundException("Group not found.");
            }

            _context.Set<Group>().Remove(group);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Group>> GetAllAsync(int? pageNumber, int? pageSize, string? searchTerm)
        {
            IQueryable<Group> query = _context.Set<Group>();

            // If searchTerm is provided, filter based on name (or any other field you wish to search)
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(g => g.Name.Contains(searchTerm));
            }

            // If pageNumber and pageSize are provided, apply pagination
            if (pageNumber.HasValue && pageSize.HasValue)
            {
                query = query
                    .Skip((pageNumber.Value - 1) * pageSize.Value)
                    .Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<Group?> GetByIdAsync(int id)
        {
            return await _context.Set<Group>().FindAsync(id);
        }

        // Method to return the total count for pagination
        public async Task<int> GetTotalCountAsync(string? searchTerm)
        {
            IQueryable<Group> query = _context.Set<Group>();

            // If searchTerm is provided, filter based on name
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(g => g.Name.Contains(searchTerm));
            }

            return await query.CountAsync();
        }
    }
}
