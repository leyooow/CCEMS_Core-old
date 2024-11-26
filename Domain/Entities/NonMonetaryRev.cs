﻿using System;
using System.Collections.Generic;

namespace Infrastructure.Entities;

public partial class NonMonetaryRev
{
    public int Id { get; set; }

    public int? Type { get; set; }

    public string Cifnumber { get; set; } = null!;

    public string CustomerName { get; set; } = null!;

    public string? CustomerAccountNo { get; set; }

    public Guid ExceptionId { get; set; }

    public string? RefNo { get; set; }

    public virtual ICollection<ExceptionItemRev> ExceptionItemRevs { get; set; } = new List<ExceptionItemRev>();
}
