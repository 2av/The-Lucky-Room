using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RoomPlayRound:Base
    {
        public int RPId { get; set; }

        public int? RoomJoinedid { get; set; }

        public int? NumberSelected { get; set; }

        public int? NumberGenerated { get; set; }

        public int? DifferenceNumber { get; set; }

        public int? PointsCollected { get; set; }
        public int? UserId { get; set; }

    }
}
