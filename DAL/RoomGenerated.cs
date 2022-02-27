using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RoomGenerated:Base
    {
        public int RoomGId { get; set; }

        public int? RoomsId { get; set; }

        public string GroupId { get; set; }

        public int? MemberJoined { get; set; }

        public int? FirstPrice { get; set; }

        public int? SecondPrice { get; set; }

        public int? ThirdPrice { get; set; }

        public int? FourthPrice { get; set; }

        public int? FifthPrice { get; set; }

        public int? Status { get; set; }
        public int? UserId { get; set; }

    }
}
