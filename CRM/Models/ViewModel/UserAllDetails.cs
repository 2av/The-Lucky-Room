using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Models.ViewModel
{
    public class UserAllDetails
    {
        public MyDetails MyDetails { get; set; }
        public List<OnlineUser> OnlineUser { get; set; }
        public List<MyRoomsStatus> MyRoomsStatus { get; set; }
        public List<RoomTotalPlayAll> RoomTotalPlayAll { get; set; }
        public List<RoomTotalPlayToday> RoomTotalPlayToday { get; set; }
        public List<Notification> Notification { get; set; }
        public List<Rooms> Rooms { get; set; }
        public List<RoomJoinedStatus> RoomJoinedStatus { get; set; }
        public string TodayDate{ get; set; }
        public List<vmRoomResult> RoomResult = new List<vmRoomResult>();
    }
    public class MyDetails
    {
        public string AccountBalance { get; set; }
        public string MyreferalCode { get; set; }
        public string TotalRefered { get; set; }
        public string CollectedPoints { get; set; }
        public string ProfilePhoto { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string CommisionAmount { get; set; }
        
    }
    public class OnlineUser
    {
        public string UserName { get; set; }
    }
    public class Notification
    {
        public string Descriptions { get; set; }
        public string CreatedDate { get; set; }
        public string NotificationType { get; set; }
        public bool IsViews { get; set; }
    }
}