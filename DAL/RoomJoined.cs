using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RoomJoined:Base
    {
        public int RoomJoinedId { get; set; }

        public int? RoomGId { get; set; }

        public int? Userid { get; set; }
        public int? RoundPlay { get; set; }

    }
}
