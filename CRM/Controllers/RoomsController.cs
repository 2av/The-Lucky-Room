using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    public class RoomsController : Controller
    {
        // GET: Rooms
        
        public ActionResult Index()
        {
            Rooms obj = new Rooms();
            return View(obj._Select("procRooms").Tables[0]);
        }
        public ActionResult Create()
        {
            Rooms obj = new Rooms();
            int ID = Convert.ToInt32(RouteData.Values["id"]);
            if (ID != 0)
            {
                obj.ID = ID;
                DataTable dt = obj._Select("procRooms", "", obj).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    obj.ID = ID;
                    obj.RoomName = Convert.ToString(dt.Rows[0]["RoomName"]);
                    obj.EntryPrice = Convert.ToDouble(dt.Rows[0]["EntryPrice"]);
                    obj.MembersNo = Convert.ToInt32(dt.Rows[0]["MembersNo"]);
                    obj.Description = Convert.ToString(dt.Rows[0]["Description"]);
                    obj.FirstPrice = Convert.ToDouble(dt.Rows[0]["FirstPrice"]);
                    obj.SecondPrice = Convert.ToDouble(dt.Rows[0]["SecondPrice"]);
                    obj.ThirdPrice = Convert.ToDouble(dt.Rows[0]["ThirdPrice"]);
                    obj.FourthPrice = Convert.ToDouble(dt.Rows[0]["FourthPrice"]);
                    obj.FifthPrice = Convert.ToDouble(dt.Rows[0]["FifthPrice"]);
                    obj.RoundPlay = Convert.ToInt32(dt.Rows[0]["RoundPlay"]);
                }
            }
            return View(obj);
        }
        public ActionResult SaveData(Rooms obj)
        {
            string msg = string.Empty;
            if (obj.ID > 0)
            {
                msg = obj._Update("procRooms", obj);
            }
            else
            {
                msg = obj._Insert("procRooms", obj);
            }

            return Json(msg);
        }
    }
}