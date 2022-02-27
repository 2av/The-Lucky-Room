using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Menu : Base
    {

        public int MenuId { get; set; }

        public int? Submenuid { get; set; }

        public string MenuName { get; set; }

        public string ControllerName { get; set; }
        public string PageName { get; set; }
        public string MenuUrl { get; set; }

        public string Icon { get; set; }


    }
}
