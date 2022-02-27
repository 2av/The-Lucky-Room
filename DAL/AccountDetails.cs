using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AccountDetails:Base
    {
        public int AccountId { get; set; }

        public int? UserId { get; set; }

        public string AccountNo { get; set; }

        public string BankName { get; set; }

        public string IFSCCode { get; set; }
    }
}
