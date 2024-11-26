using System;
using System.Collections.Generic;

namespace Infrastructure.Entities;

public partial class User
{
    public string LoginName { get; set; } = null!;

    public string EmployeeId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string? MiddleName { get; set; }

    public string LastName { get; set; } = null!;

    public DateTime? LastLogIn { get; set; }

    public string? UserGroup { get; set; }

    public string Email { get; set; } = null!;

    public int Status { get; set; }

    public string? StatusText { get; set; }

    public string? Password { get; set; }

    public int IsLoggedIn { get; set; }

    public int LogInCounter { get; set; }

    public bool IsLocked { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? Remarks { get; set; }

    public string? Ipaddress { get; set; }

    public string? TempIpaddress { get; set; }

    public int RoleId { get; set; }

    public virtual ICollection<BranchAccess> BranchAccesses { get; set; } = new List<BranchAccess>();

    public virtual Role Role { get; set; } = null!;
}
