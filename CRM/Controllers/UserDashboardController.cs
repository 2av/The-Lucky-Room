using CRM.Models;
using CRM.Models.ViewModel;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace CRM.Controllers
{
    [SessionExpire]
    public class UserDashboardController : Controller
    {
        // GET: UserDashboard
        public ActionResult Index()
        {
            try
            {
                List<Rooms> rooms = ListRooms();
                ViewBag.Rooms = rooms;
                ViewBag.MembersList = rooms.ToList().Select(x => x.MembersNo).Distinct();
                ViewBag.EntryPriceList = rooms.ToList().Select(x => x.EntryPrice).Distinct();

            }
            catch (Exception ex)
            {
            }
            PaytmRequest pr = new PaytmRequest();
            pr.Amount = "50.0";
            return View(pr);
        }
        public List<Rooms> ListRooms()
        {
            List<Rooms> objList = new List<Rooms>();
            Rooms obj = new Rooms();
            DataTable dt = obj._Select("procRooms").Tables[0];
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Rooms rm = new Rooms();
                    rm.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    rm.RoomName = Convert.ToString(dt.Rows[i]["RoomName"]);
                    rm.EntryPrice = Convert.ToInt32(dt.Rows[i]["EntryPrice"]);
                    rm.MembersNo = Convert.ToInt32(dt.Rows[i]["MembersNo"]);
                    rm.Description = Convert.ToString(dt.Rows[i]["Description"]);
                    rm.FirstPrice = Convert.ToInt32(dt.Rows[i]["FirstPrice"]);
                    rm.SecondPrice = Convert.ToInt32(dt.Rows[i]["SecondPrice"]);
                    rm.ThirdPrice = Convert.ToInt32(dt.Rows[i]["ThirdPrice"]);
                    rm.FourthPrice = Convert.ToInt32(dt.Rows[i]["FourthPrice"]);
                    rm.FifthPrice = Convert.ToInt32(dt.Rows[i]["FifthPrice"]);
                    objList.Add(rm);
                }

            }
            return objList;
        }
        public ActionResult MyDetails()
        {
            try
            {
                Dashboard obj = new Dashboard();
                obj.UserId = GlobalFunctions.GetUserId();
                DataSet ds = obj._Select("procDashboard", "MyDetails", obj);
                DataTable dt = ds.Tables[0];
                string AccountBalance = "0";
                string MyreferalCode = "";
                string TotalRefered = "0";
                string CollectedPoints = "";
                if (dt.Rows.Count > 0)
                {
                    AccountBalance = Convert.ToString(dt.Rows[0]["AccountBalance"]);
                    MyreferalCode = Convert.ToString(dt.Rows[0]["MyreferalCode"]);
                    TotalRefered = Convert.ToString(dt.Rows[0]["TotalRefered"]);
                    CollectedPoints = Convert.ToString(dt.Rows[0]["CollectedPoints"]);
                    Response.Cookies.Add(new HttpCookie("MyreferalCode", MyreferalCode));
                }

                DataTable dtOnline = ds.Tables[1];
                List<Users> objonlineUser = new List<Users>();
                if (dtOnline.Rows.Count > 0)
                {
                    for (int i = 0; i < dtOnline.Rows.Count; i++)
                    {
                        Users u = new Users();
                        u.UserName = Convert.ToString(dtOnline.Rows[i]["UserName"]);
                        objonlineUser.Add(u);
                    }

                }
                var result = new { AccountBalance = AccountBalance, MyreferalCode = MyreferalCode, TotalRefered = TotalRefered, OnlineUser = objonlineUser, CollectedPoints = CollectedPoints };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult RoomJoinedStatus()
        {
            try
            {
                Dashboard obj = new Dashboard();
                DataSet ds = obj._Select("procDashboard", "RoomsJoinedUpdate");
                DataTable dt = ds.Tables[0];
                List<RoomJoinedStatus> objlist = new List<RoomJoinedStatus>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        RoomJoinedStatus objr = new DAL.RoomJoinedStatus();
                        objr.RoomsId = Convert.ToInt32(dt.Rows[i]["ID"]);
                        objr.RoomName = Convert.ToString(dt.Rows[i]["RoomName"]);
                        objr.MembersJoined = Convert.ToInt32(dt.Rows[i]["MembersJoined"]);
                        objr.GroupId = Convert.ToString(dt.Rows[i]["GroupId"]);
                        objr.RoomGId = Convert.ToInt32(dt.Rows[i]["RoomGId"]);
                        DateTime d1 = Convert.ToDateTime(dt.Rows[i]["RoomGeneratedDateTime"]);
                        objr.RoomGeneratedDateTime = d1.ToLongDateString() + " " + d1.ToLongTimeString();
                        objlist.Add(objr);
                    }
                }
                RoomJoinedStatus objtoday = new DAL.RoomJoinedStatus();
                DateTime d = Convert.ToDateTime(ds.Tables[1].Rows[0]["TodayDate"]);
                objtoday.TodayDate = d.ToLongDateString() + " " + d.ToLongTimeString();
                var result = new { RoomJoinedStatus = objlist, TodayDate = objtoday };
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult MyRoomsJoined()
        {
            try
            {
                Dashboard obj = new Dashboard();
                obj.UserId = GlobalFunctions.GetUserId();
                DataTable dt = obj._Select("procDashboard", "MyRoomsJoined", obj).Tables[0];
                List<MyRoomsStatus> objlist = new List<MyRoomsStatus>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        MyRoomsStatus objr = new DAL.MyRoomsStatus();
                        objr.RoomsId = Convert.ToInt32(dt.Rows[i]["RoomsId"]);
                        objr.RoomGid = Convert.ToInt32(dt.Rows[i]["RoomGid"]);
                        objr.MembersJoined = Convert.ToInt32(dt.Rows[i]["MembersJoined"]);
                        objr.GroupId = Convert.ToString(dt.Rows[i]["GroupId"]);
                        objr.RoomName = Convert.ToString(dt.Rows[i]["RoomName"]);
                        objr.EntryPrice = Convert.ToInt32(dt.Rows[i]["EntryPrice"]);
                        objr.RoomJoinedId = Convert.ToInt32(dt.Rows[i]["RoomJoinedId"]);
                        objr.FirstPrice = Convert.ToString(dt.Rows[i]["FirstPrice"]);
                        objr.SecondPrice = Convert.ToString(dt.Rows[i]["SecondPrice"]);
                        objr.ThirdPrice = Convert.ToString(dt.Rows[i]["ThirdPrice"]);
                        objr.FourthPrice = Convert.ToString(dt.Rows[i]["FourthPrice"]);
                        objr.FifthPrice = Convert.ToString(dt.Rows[i]["FifthPrice"]);
                        objr.MembersNo = Convert.ToString(dt.Rows[i]["MembersNo"]);
                        objlist.Add(objr);
                    }

                }
                return Json(objlist);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult PlayRound(RoomPlayRound obj)
        {
            try
            {
                obj.UserId = GlobalFunctions.GetUserId();
                string msg = obj._Insert("procRoomPlayRound", obj);
                return Json(msg);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult RoomJoined(string RoomsId)
        {
            try
            {
                RoomGenerated obj = new RoomGenerated();
                obj.RoomsId = Convert.ToInt32(RoomsId);
                obj.UserId = GlobalFunctions.GetUserId();
                string msg = obj._Insert("procRoomGenerated", obj);
                return Json(msg);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult PlayRoundStatus(int RoomJoinedId)
        {
            try
            {
                List<PlayRoundStatus> objList = new List<PlayRoundStatus>();
                Dashboard obj = new Dashboard();
                obj.UserId = GlobalFunctions.GetUserId();
                obj.RoomJoinedId = RoomJoinedId;
                DataSet ds = obj._Select("procDashboard", "PlayRoundStatus", obj);
                if (ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    if (dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            PlayRoundStatus objp = new DAL.PlayRoundStatus();
                            objp.MyReferalCode = Convert.ToString(dt.Rows[i]["MyReferalCode"]);
                            objp.UserId = Convert.ToString(dt.Rows[i]["UserId"]);
                            objp.UserName = Convert.ToString(dt.Rows[i]["UserName"]);
                            objp.NumberSelected = Convert.ToString(dt.Rows[i]["NumberSelected"]);
                            objp.NumberGenerated = Convert.ToString(dt.Rows[i]["NumberGenerated"]);
                            objp.DifferenceNumber = Convert.ToString(dt.Rows[i]["DifferenceNumber"]);
                            objp.PointsCollected = Convert.ToString(dt.Rows[i]["PointsCollected"]);
                            objp.RoundPlay = Convert.ToString(dt.Rows[i]["RoundPlay"]);
                            objList.Add(objp);
                        }
                    }
                }
                List<GroupPlayRoundStatus> objgpr = new List<GroupPlayRoundStatus>();
                if (ds.Tables.Count > 1)
                {
                    DataTable dt = ds.Tables[1];
                    if (dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            GroupPlayRoundStatus objp = new DAL.GroupPlayRoundStatus();
                            objp.MyReferalCode = Convert.ToString(dt.Rows[i]["MyReferalCode"]);
                            objp.RoomJoinedId = Convert.ToString(dt.Rows[i]["RoomJoinedId"]);
                            objp.GroupId = Convert.ToString(dt.Rows[i]["GroupId"]);
                            objp.PointsCollected = Convert.ToString(dt.Rows[i]["PointsCollected"]);
                            objp.UserName = Convert.ToString(dt.Rows[i]["UserName"]);
                            objgpr.Add(objp);
                        }
                    }
                }


                /*round play count*/
                List<RoundPlayCount> objRpc = new List<RoundPlayCount>();
                if (ds.Tables.Count > 2)
                {
                    DataTable dt = ds.Tables[2];
                    if (dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            RoundPlayCount objp = new DAL.RoundPlayCount();
                            objp.UserName = Convert.ToString(dt.Rows[i]["UserName"]);
                            objp.MyReferalCode = Convert.ToString(dt.Rows[i]["MyReferalCode"]);
                            objp.RoundPlay = Convert.ToString(dt.Rows[i]["RoundPlay"]);
                            objRpc.Add(objp);
                        }
                    }
                }


                var result = new { PlayRoundStatus = objList, GroupPlayRoundStatus = objgpr, RoundPlayCount = objRpc };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult NotificationsDetails(Notifications obj)
        {
            try
            {
                //Notifications obj = new Notifications();
                obj.UserId = GlobalFunctions.GetUserId();
                //obj.IsViews = IsViews;
                DataTable dt = obj._Select("procNotifications", "PendingNotification", obj).Tables[0];
                List<vmNotification> list = new List<vmNotification>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        vmNotification objt = new vmNotification();
                        objt.Descriptions = Convert.ToString(dt.Rows[i]["Descriptions"]);
                        objt.CreatedDate = Convert.ToString(dt.Rows[i]["CreatedDate"]);
                        objt.NotificationType = Convert.ToString(dt.Rows[i]["NotificationType"]);
                        objt.IsViews = Convert.ToBoolean(dt.Rows[i]["IsViews"]);
                        list.Add(objt);
                    }
                }
                return Json(list);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult NotificationMarkasView()
        {
            try
            {
                Notifications obj = new Notifications();
                obj.UserId = GlobalFunctions.GetUserId();
                string msg = obj._Update("procNotifications", obj);
                return Json("msg");
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult RoomResult()
        {
            try
            {
                Dashboard obj = new Dashboard();
                obj.UserId = GlobalFunctions.GetUserId();
                DataTable dt = obj._Select("procDashboard", "GameHistory", obj).Tables[0];
                List<vmRoomResult> objList = new List<vmRoomResult>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        vmRoomResult vm = new vmRoomResult();
                        vm.RoomGid = Convert.ToString(dt.Rows[i]["RoomGid"]);
                        vm.RoomName = Convert.ToString(dt.Rows[i]["RoomName"]);
                        vm.EntryPrice = Convert.ToString(dt.Rows[i]["EntryPrice"]);
                        vm.MemberJoined = Convert.ToString(dt.Rows[i]["MemberJoined"]);
                        vm.MyReferalCode = Convert.ToString(dt.Rows[i]["MyReferalCode"]);
                        vm.UserId = Convert.ToString(dt.Rows[i]["UserId"]);
                        vm.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                        vm.TotalPoints = Convert.ToString(dt.Rows[i]["TotalPoints"]);
                        vm.WinningRank = Convert.ToString(dt.Rows[i]["WinningRank"]);
                        vm.WinningPrice = Convert.ToString(dt.Rows[i]["WinningPrice"]);
                        vm.WinningDate = Convert.ToString(dt.Rows[i]["WinningDate"]);

                        objList.Add(vm);
                    }

                }
                return Json(objList);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult AccountDetails(AccountDetails obj)
        {
            try
            {
                obj.UserId = GlobalFunctions.GetUserId();
                string msg = obj._Insert("procAccountDetails", obj);
                return Json(msg);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult GetAccountDetails()
        {
            try
            {
                AccountDetails obj = new DAL.AccountDetails();
                obj.UserId = GlobalFunctions.GetUserId();
                DataTable dt = obj._Select("procAccountDetails", "MyAccountDetails", obj).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    obj.AccountNo = Convert.ToString(dt.Rows[0]["AccountNo"]);
                    obj.BankName = Convert.ToString(dt.Rows[0]["BankName"]);
                    obj.IFSCCode = Convert.ToString(dt.Rows[0]["IFSCCode"]);

                }
                return Json(obj);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult WithdrawlRequest(WithdrawlRequest obj)
        {
            try
            {
                obj.UserId = GlobalFunctions.GetUserId();
                string msg = obj._Insert("procWithdrawlRequest", obj);
                return Json(msg);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult WithdrawlRequestStatus()
        {
            try
            {
                WithdrawlRequest obj = new DAL.WithdrawlRequest();
                obj.UserId = GlobalFunctions.GetUserId();
                DataTable dt = obj._Select("procWithdrawlRequest", "SELECT", obj).Tables[0];
                List<vmWithdrawlRequestStatus> objList = new List<vmWithdrawlRequestStatus>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        vmWithdrawlRequestStatus vm = new vmWithdrawlRequestStatus();
                        vm.ID = Convert.ToString(dt.Rows[i]["ID"]);
                        vm.UserId = Convert.ToString(dt.Rows[i]["UserId"]);
                        vm.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                        vm.AccountBalance = Convert.ToString(dt.Rows[i]["AccountBalance"]);
                        vm.RequestAmount = Convert.ToString(dt.Rows[i]["RequestAmount"]);
                        vm.WithdrawStatus = Convert.ToString(dt.Rows[i]["WithdrawStatus"]);
                        vm.CreatedDate = Convert.ToString(dt.Rows[i]["CreatedDate"]);
                        vm.ModifyDate = Convert.ToString(dt.Rows[i]["ModifyDate"]);
                        vm.Comments = Convert.ToString(dt.Rows[i]["Comments"]);
                        objList.Add(vm);
                    }

                }
                return Json(objList);
            }
            catch (Exception ex)
            {
                return Json(null);
            }

        }
        public ActionResult PaymentIn()
        {
            return Json("");
        }
        public ActionResult ShareContents()
        {
            string MyreferalCode = GlobalFunctions.GetCookie("MyreferalCode");
            string msg = "I love playing  #theluckyroom. It is very easy to play and intresting. You just play with your freinds and earn real money from #theluckyroom. click here to join #theluckyroom by using my referal code. https://theluckyroom.com/Users/Login?ref=" + MyreferalCode + " Thanks to visit.";
            return Json(msg);

        }
        public ActionResult RoomTotalPlayCount()
        {
            try
            {
                List<RoomTotalPlayAll> objList = new List<RoomTotalPlayAll>();
                Dashboard obj = new Dashboard();
                DataSet ds = obj._Select("procDashboard", "RoomTotalPlayCount", obj);
                if (ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    if (dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            RoomTotalPlayAll objp = new DAL.RoomTotalPlayAll();
                            objp.RoomId = Convert.ToInt32(dt.Rows[i]["RoomId"]);
                            objp.TotalCount = Convert.ToInt32(dt.Rows[i]["TotalCount"]);
                            objList.Add(objp);
                        }
                    }
                }
                List<RoomTotalPlayToday> objgpr = new List<RoomTotalPlayToday>();
                if (ds.Tables.Count > 1)
                {
                    DataTable dt = ds.Tables[1];
                    if (dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            RoomTotalPlayToday objp = new DAL.RoomTotalPlayToday();
                            objp.RoomId = Convert.ToInt32(dt.Rows[i]["RoomId"]);
                            objp.TotalCount = Convert.ToInt32(dt.Rows[i]["TotalCount"]);
                            objgpr.Add(objp);
                        }
                    }
                }
                var result = new { RoomTotalPlayAll = objList, RoomTotalPlayToday = objgpr };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult AddPointsCollected()
        {
            try
            {
                CollectedPointsStatus obj = new CollectedPointsStatus();
                obj.UserId = GlobalFunctions.GetUserId();
                string msg = obj._Insert("procCollectedPointsStatus", obj);
                return Json(msg);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
        public ActionResult Chat()
        {
            return View();
        }
     
      
        public ActionResult GetLuckyNumber()
        {
            Dashboard obj = new Dashboard();
            obj.UserId = GlobalFunctions.GetUserId();
            DataTable dt = obj._Select("procDashboard", "GetLuckyNumber", obj).Tables[0];
            string Luckynumber = "Not Found";
            if (dt.Rows.Count > 0)
            {
                Luckynumber = Convert.ToString(dt.Rows[0]["LuckyNumber"]);
            }
            return Json(Luckynumber);
        }
        public ActionResult PlayGame()
        {
            PaytmRequest pr = new PaytmRequest();
            pr.Amount = "50.0";
            return View();
        }

        public ActionResult SetProfilePhoto(Users obj)
        {
            obj.UserId = GlobalFunctions.GetUserId();
            string msg = obj._Update("procUsers",obj, "UPDATE_ProfilePhoto");
            return Json(msg);
        }
        /*---------------------------------------*/
        public ActionResult UserAllDetails()
        {
            
            Dashboard obj = new Dashboard();
            obj.UserId = GlobalFunctions.GetUserId();
            DataSet ds = obj._Select("procDashboard", "UserAllDetails", obj);
            UserAllDetails objReturn = new UserAllDetails();
            if (ds.Tables.Count > 0)
            {
                objReturn.MyDetails = fnMyDetails(ds.Tables[0]); // MyDetails
                objReturn.OnlineUser =  fnOnlineUser(ds.Tables[1]);//Online User
                objReturn.MyRoomsStatus =  fnMyRoomsStatus(ds.Tables[2]);//My Rooms Status
                objReturn.RoomTotalPlayAll =  fnRoomTotalPlayAll(ds.Tables[3]);//Room Total Play All
                objReturn.RoomTotalPlayToday =  fnRoomTotalPlayToday(ds.Tables[4]);//Room Total Play Today
                objReturn.Notification = fnNotifcation(ds.Tables[5]); //Notofcation
                objReturn.Rooms =  fnRooms(ds.Tables[6]);//Rooms
                objReturn.RoomJoinedStatus =  fnRoomJoinedStatus(ds.Tables[7]);//Room Joined Status
                objReturn.TodayDate = Convert.ToString(ds.Tables[8].Rows[0]["TodayDate"]);// Today date
                objReturn.RoomResult =  fnRoomResult(ds.Tables[9]);// Room History
            }
            return Json(objReturn);
        }
        public MyDetails fnMyDetails(DataTable dt)
        {
            MyDetails obj = new Models.ViewModel.MyDetails();
            if (dt.Rows.Count > 0)
            {
                obj.AccountBalance = Convert.ToString(dt.Rows[0]["AccountBalance"]);
                obj.MyreferalCode = Convert.ToString(dt.Rows[0]["MyreferalCode"]);
                obj.TotalRefered = Convert.ToString(dt.Rows[0]["TotalRefered"]);
                obj.CollectedPoints = Convert.ToString(dt.Rows[0]["CollectedPoints"]);
                obj.ProfilePhoto = Convert.ToString(dt.Rows[0]["ProfilePhoto"]);
                obj.UserName = Convert.ToString(dt.Rows[0]["UserName"]);
                obj.Name = Convert.ToString(dt.Rows[0]["FirstName"]);
                obj.CommisionAmount = Convert.ToString(dt.Rows[0]["CommisionAmount"]);
                Response.Cookies.Add(new HttpCookie("MyreferalCode", obj.MyreferalCode));
            }
            return obj;
        }
        public List<OnlineUser> fnOnlineUser(DataTable dt)
        {
            List<OnlineUser> objonlineUser = new List<OnlineUser>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    OnlineUser u = new OnlineUser();
                    u.UserName = Convert.ToString(dt.Rows[i]["UserName"]);
                    objonlineUser.Add(u);
                }

            }
            return objonlineUser;
        }
        public List<MyRoomsStatus> fnMyRoomsStatus(DataTable dt)
        {
            List<MyRoomsStatus> objlist = new List<MyRoomsStatus>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    MyRoomsStatus objr = new DAL.MyRoomsStatus();
                    objr.RoomsId = Convert.ToInt32(dt.Rows[i]["RoomsId"]);
                    objr.RoomGid = Convert.ToInt32(dt.Rows[i]["RoomGid"]);
                    objr.MembersJoined = Convert.ToInt32(dt.Rows[i]["MembersJoined"]);
                    objr.GroupId = Convert.ToString(dt.Rows[i]["GroupId"]);
                    objr.RoomName = Convert.ToString(dt.Rows[i]["RoomName"]);
                    objr.EntryPrice = Convert.ToInt32(dt.Rows[i]["EntryPrice"]);
                    objr.RoomJoinedId = Convert.ToInt32(dt.Rows[i]["RoomJoinedId"]);
                    objr.FirstPrice = Convert.ToString(dt.Rows[i]["FirstPrice"]);
                    objr.SecondPrice = Convert.ToString(dt.Rows[i]["SecondPrice"]);
                    objr.ThirdPrice = Convert.ToString(dt.Rows[i]["ThirdPrice"]);
                    objr.FourthPrice = Convert.ToString(dt.Rows[i]["FourthPrice"]);
                    objr.FifthPrice = Convert.ToString(dt.Rows[i]["FifthPrice"]);
                    objr.MembersNo = Convert.ToString(dt.Rows[i]["MembersNo"]);
                    objlist.Add(objr);
                }

            }
            return objlist;
        }
        public List<RoomTotalPlayAll> fnRoomTotalPlayAll(DataTable dt)
        {
            List<RoomTotalPlayAll> objList = new List<RoomTotalPlayAll>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    RoomTotalPlayAll objp = new DAL.RoomTotalPlayAll();
                    objp.RoomId = Convert.ToInt32(dt.Rows[i]["RoomId"]);
                    objp.TotalCount = Convert.ToInt32(dt.Rows[i]["TotalCount"]);
                    objList.Add(objp);
                }
            }
            return objList;
        }
        public List<RoomTotalPlayToday> fnRoomTotalPlayToday(DataTable dt)
        {
            List<RoomTotalPlayToday> objgpr = new List<RoomTotalPlayToday>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    RoomTotalPlayToday objp = new DAL.RoomTotalPlayToday();
                    objp.RoomId = Convert.ToInt32(dt.Rows[i]["RoomId"]);
                    objp.TotalCount = Convert.ToInt32(dt.Rows[i]["TotalCount"]);
                    objgpr.Add(objp);
                }
            }

            return objgpr;
        }
        public List<Notification> fnNotifcation(DataTable dt)
        {
            List<Notification> list = new List<Notification>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {

                    Notification objt = new Notification();
                    objt.Descriptions = Convert.ToString(dt.Rows[i]["Descriptions"]);
                    objt.CreatedDate = Convert.ToString(dt.Rows[i]["CreatedDate"]);
                    objt.NotificationType = Convert.ToString(dt.Rows[i]["NotificationType"]);
                    objt.IsViews = Convert.ToBoolean(dt.Rows[i]["IsViews"]);
                    list.Add(objt);
                }
            }
            return list;
        }
        public List<Rooms> fnRooms(DataTable dt)
        {
            List<Rooms> objList = new List<Rooms>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Rooms rm = new Rooms();
                    rm.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    rm.RoomName = Convert.ToString(dt.Rows[i]["RoomName"]);
                    rm.EntryPrice = Convert.ToInt32(dt.Rows[i]["EntryPrice"]);
                    rm.MembersNo = Convert.ToInt32(dt.Rows[i]["MembersNo"]);
                    rm.Description = Convert.ToString(dt.Rows[i]["Description"]);
                    rm.FirstPrice = Convert.ToInt32(dt.Rows[i]["FirstPrice"]);
                    rm.SecondPrice = Convert.ToInt32(dt.Rows[i]["SecondPrice"]);
                    rm.ThirdPrice = Convert.ToInt32(dt.Rows[i]["ThirdPrice"]);
                    rm.FourthPrice = Convert.ToInt32(dt.Rows[i]["FourthPrice"]);
                    rm.FifthPrice = Convert.ToInt32(dt.Rows[i]["FifthPrice"]);
                    objList.Add(rm);
                }

            }
            return objList;
        }
        public List<RoomJoinedStatus> fnRoomJoinedStatus(DataTable dt)
        {
            
                List<RoomJoinedStatus> objlist = new List<RoomJoinedStatus>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        RoomJoinedStatus objr = new DAL.RoomJoinedStatus();
                        objr.RoomsId = Convert.ToInt32(dt.Rows[i]["ID"]);
                        objr.RoomName = Convert.ToString(dt.Rows[i]["RoomName"]);
                        objr.MembersJoined = Convert.ToInt32(dt.Rows[i]["MembersJoined"]);
                        objr.GroupId = Convert.ToString(dt.Rows[i]["GroupId"]);
                        objr.RoomGId = Convert.ToInt32(dt.Rows[i]["RoomGId"]);
                        DateTime d1 = Convert.ToDateTime(dt.Rows[i]["RoomGeneratedDateTime"]);
                        objr.RoomGeneratedDateTime = d1.ToLongDateString() + " " + d1.ToLongTimeString();
                        objlist.Add(objr);
                    }
                }
                //RoomJoinedStatus objtoday = new DAL.RoomJoinedStatus();
                //DateTime d = Convert.ToDateTime(ds.Tables[1].Rows[0]["TodayDate"]);
                //objtoday.TodayDate = d.ToLongDateString() + " " + d.ToLongTimeString();
                //var result = new { RoomJoinedStatus = objlist, TodayDate = objtoday };
                //return Json(result);
            return objlist;
        }
        public List<vmRoomResult> fnRoomResult(DataTable dt)
        {
            
                List<vmRoomResult> objList = new List<vmRoomResult>();
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        vmRoomResult vm = new vmRoomResult();
                        vm.RoomGid = Convert.ToString(dt.Rows[i]["RoomGid"]);
                        vm.RoomName = Convert.ToString(dt.Rows[i]["RoomName"]);
                        vm.EntryPrice = Convert.ToString(dt.Rows[i]["EntryPrice"]);
                        vm.MemberJoined = Convert.ToString(dt.Rows[i]["MemberJoined"]);
                        vm.MyReferalCode = Convert.ToString(dt.Rows[i]["MyReferalCode"]);
                        vm.UserId = Convert.ToString(dt.Rows[i]["UserId"]);
                        vm.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                        vm.TotalPoints = Convert.ToString(dt.Rows[i]["TotalPoints"]);
                        vm.WinningRank = Convert.ToString(dt.Rows[i]["WinningRank"]);
                        vm.WinningPrice = Convert.ToString(dt.Rows[i]["WinningPrice"]);
                        vm.WinningDate = Convert.ToString(dt.Rows[i]["WinningDate"]);

                        objList.Add(vm);
                    }

                }
                return objList;
           
        }
    }
}