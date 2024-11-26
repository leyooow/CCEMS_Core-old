using System;
using System.Collections.Generic;

namespace Infrastructure.Entities;

public partial class NonMonetary
{
    public int Id { get; set; }

    public int? Category { get; set; }

    public string Cifnumber { get; set; } = null!;

    public string CustomerName { get; set; } = null!;

    public string? CustomerAccountNo { get; set; }

    public Guid ExceptionId { get; set; }

    public string? RefNo { get; set; }

    public virtual ExceptionItem? RefNoNavigation { get; set; }
}
