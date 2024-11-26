using System;
using System.Collections.Generic;

namespace Infrastructure.Entities;

public partial class RolePermission
{
    public int Id { get; set; }

    public int RoleId { get; set; }

    public string? Permission { get; set; }

    public virtual Role Role { get; set; } = null!;
}
