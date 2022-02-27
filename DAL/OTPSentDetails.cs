using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class OTPSentDetails:Base
    {
        public int OTPSendID { get; set; }

        public string MobileNo { get; set; }
        public string SMSSent { get; set; }

        public string OTP { get; set; }

        public string OTPFor { get; set; }
        public string Response { get; set; }

        public bool? IsVarified { get; set; }
                 

    }
}
