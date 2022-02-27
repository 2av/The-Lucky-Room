using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Rooms:Base
    {
        public int ID { get; set; }

        public string RoomName { get; set; }

        public double? EntryPrice { get; set; }

        public int? MembersNo { get; set; }

        public string Description { get; set; }

        public double? FirstPrice { get; set; }

        public double? SecondPrice { get; set; }

        public double? ThirdPrice { get; set; }

        public double? FourthPrice { get; set; }

        public double? FifthPrice { get; set; }
        public int? RoundPlay { get; set; }

    }
}
