using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UserType:Base
    {
        public int UserTypeId { get; set; }

        public string UserTypeName { get; set; }

        public string Description { get; set; }
    }
}
