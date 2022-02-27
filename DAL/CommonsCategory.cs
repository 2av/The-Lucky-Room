using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CommonsCategory : Base
    {
        public int CommonCategoryId { get; set; }

        public int? CommonId { get; set; }

        public string CommonCategoryName { get; set; }


    }
}
