using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Dashboard:Base
    {
        public int? UserId { get; set; }
        public int? RoomJoinedId { get; set; }
    }

    public class RoomJoinedStatus
    {
        public int RoomsId { get; set; }
        public string RoomName { get; set; }
        public int MembersJoined { get; set; }
        public string GroupId { get; set; }
        public int RoomGId { get; set; }
        public string RoomGeneratedDateTime { get; set; }
        public string TodayDate { get; set; }
    }
    public class MyRoomsStatus
    {
        public int RoomsId { get; set; }
        public int RoomGid { get; set; }
        public string GroupId { get; set; }
        public string RoomName { get; set; }
        public int MembersJoined { get; set; }
        public int EntryPrice { get; set; }
        public int RoomJoinedId { get; set; }
        public string FirstPrice { get; set; }
        public string SecondPrice { get; set; }
        public string ThirdPrice { get; set; }
        public string FourthPrice { get; set; }
        public string FifthPrice { get; set; }
        public string MembersNo { get; set; }
    }
    public class PlayRoundStatus
    {
        public string MyReferalCode { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string NumberSelected { get; set; }
        public string NumberGenerated { get; set; }
        public string DifferenceNumber { get; set; }
        public string PointsCollected { get; set; }
        public string RoundPlay { get; set; }
    }
    public class GroupPlayRoundStatus
    {
        public string MyReferalCode { get; set; }
        public string RoomJoinedId { get; set; }
        public string GroupId { get; set; }
        public string PointsCollected { get; set; }
        public string UserName { get; set; }

    }
    public class RoundPlayCount
    {
        public string UserName { get; set; }
        public string MyReferalCode { get; set; }
        public string RoundPlay { get; set; }
    }

    public class RoomTotalPlayAll
    {
        public int RoomId { get; set; }
        public int TotalCount { get; set; }
    }
    public class RoomTotalPlayToday
    {
        public int RoomId { get; set; }
        public int TotalCount { get; set; }
    }
}
