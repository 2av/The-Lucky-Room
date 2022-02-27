using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class WithdrawlRequest:Base
    {
        public int ID { get; set; }

        public int? UserId { get; set; }

        public double? RequestAmount { get; set; }

        public int? WithdrawStatus { get; set; }

        public string Comments { get; set; }
    }
    public class vmWithdrawlRequestStatus
    {
        public string ID{ get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string AccountBalance { get; set; }
        public string RequestAmount { get; set; }
        public string WithdrawStatus { get; set; }
        public string CreatedDate { get; set; }
        public string ModifyDate { get; set; }
        public string Comments { get; set; }
    }
}
