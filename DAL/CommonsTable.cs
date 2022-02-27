using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    class CommonsTable
    {
        public int ID { get; set; }

        public string TableName { get; set; }

        public string TableId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? ModifyBy { get; set; }

        public DateTime? ModifyDate { get; set; }
    }
}
