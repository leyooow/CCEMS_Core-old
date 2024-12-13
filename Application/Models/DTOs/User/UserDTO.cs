using Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.DTOs.User
{
    public class UserDTO
    {
        public string LoginName { get; set; } = string.Empty;
        public string EmployeeId { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        public string LastName { get; set; } = string.Empty;
        public DateTime? LastLogIn { get; set; }
        public string? UserGroup { get; set; }
        public string Email { get; set; } = string.Empty;
        public int Status { get; set; }
        public string? StatusText { get; set; }
        public string? Password { get; set; }
        public int IsLoggedIn { get; set; }
        public int LogInCounter { get; set; }
        public bool IsLocked { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? Remarks { get; set; }
        public string? IpAddress { get; set; }
        public string? TempIpAddress { get; set; }
        public int RoleId { get; set; }
        public ICollection<BranchAccess> BranchAccesses { get; set; } = new List<BranchAccess>();
        public Role Role { get; set; } = new Role();
    }

}
