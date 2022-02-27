using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RoomResult:Base
    {
        public int RoomResultId { get; set; }

        public int? RoomGid { get; set; }

        public int? UserId { get; set; }

        public int? TotalPoints { get; set; }

        public int? WinningRank { get; set; }

        public double? WinningPrice { get; set; }

        public DateTime? WinningDate { get; set; }
    }

    public class vmRoomResult
    {
        public string RoomGid { get; set; }
        public string RoomName { get; set; }
        public string EntryPrice { get; set; }
        public string MemberJoined { get; set; }
        public string MyReferalCode { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string TotalPoints { get; set; }
        public string WinningRank { get; set; }
        public string WinningPrice { get; set; }
        public string WinningDate { get; set; }
        
    }
}

