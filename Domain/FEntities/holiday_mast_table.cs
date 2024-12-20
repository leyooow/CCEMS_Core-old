using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.FEntities
{
    public class holiday_mast_table
    {
        [Key]
        [MaxLength(12)]
        public string CalB2kId { get; set; } // Primary Key, adjust based on your database.

        [MaxLength(6)]
        public string CalB2kType { get; set; }

        [MaxLength(6)]
        public string MMYYYY { get; set; }

        [MaxLength(1)]
        public string DelFlg { get; set; }

        [MaxLength(31)]
        public string HldyStr { get; set; }

        [MaxLength(496)]
        public string CommentStr { get; set; }

        [MaxLength(31)]
        public string RecdStr { get; set; }

        [MaxLength(1)]
        public string Status { get; set; }

        [MaxLength(15)]
        public string LchgUserId { get; set; }

        public DateTime? LchgTime { get; set; }

        [MaxLength(15)]
        public string RcreUserId { get; set; }

        public DateTime? RcreTime { get; set; }

        [Column(TypeName = "numeric(5, 0)")]
        public decimal? TsCnt { get; set; }

        [MaxLength(8)]
        public string BankId { get; set; }
    }
}
