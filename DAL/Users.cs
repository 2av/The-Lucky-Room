using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Users:Base
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string EmailId { get; set; }

        public int? UserType { get; set; }

        public string Password { get; set; }

        public string Gender { get; set; }

        public string MyReferalCode { get; set; }

        public string RefferedBy { get; set; }
        public string MobileNo { get; set; }
        public string ProfilePhoto { get; set; }

    }

}
