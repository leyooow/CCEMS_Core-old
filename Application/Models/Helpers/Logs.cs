using Application.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Helpers
{
    public class Logs
    {
        public AuditLogsDTO SaveLog(string moduleName, string actionType, string actionDesc, string actionBy)
        {
            AuditLogsDTO audit = new AuditLogsDTO();
            audit.ModuleName = moduleName;
            audit.ActionType = actionType;
            audit.ActionDesc = actionDesc;
            audit.ActionBy = actionBy;
            audit.DateEntry = DateTime.Now;

            return audit;
        }
    }
}
