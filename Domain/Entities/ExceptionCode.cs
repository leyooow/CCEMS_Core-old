using System;
using System.Collections.Generic;

namespace Infrastructure.Entities;

public partial class ExceptionCode
{
    public int Id { get; set; }

    public string? SubReferenceNo { get; set; }

    public int ExCode { get; set; }

    public string? ExItemRefNo { get; set; }

    public int DeviationStatus { get; set; }

    public DateTime DateCreated { get; set; }

    public int? ApprovalStatus { get; set; }

    public DateTime? EntryDate { get; set; }

    public string? ApprovalRemarks { get; set; }

    public DateTime? TaggingDate { get; set; }

    public virtual ExceptionItem? ExItemRefNoNavigation { get; set; }
}
