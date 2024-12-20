using Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.DTOs.Report
{
    public class BranchReplyViewModel
    {
        //public BranchReply BranchReply { get; set; }
        public List<BranchReply> BranchReplies { get; set; }
        public string ActionPlan { get; set; }
        public string ReportContentsId { get; set; }
        public int ReportId { get; set; }
        public string ExceptionNo { get; set; }
    }
}
