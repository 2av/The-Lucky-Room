using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    public class WithdrawlRequestController : Controller
    {
        // GET: WithdrawlRequest
        public ActionResult Index()
        {
            WithdrawlRequest obj = new WithdrawlRequest();
            obj.ID = 0;
            return View(obj._Select("procWithdrawlRequest","SELECT",obj).Tables[0]);
        }
        public ActionResult TransferInAccount(WithdrawlRequest obj)
        {
            string msg = "";
            DataTable dt = obj._Select("procWithdrawlRequest", "WithdrawConfirm", obj).Tables[0];
            if (dt != null)
            {
                if (dt.Rows.Count > 0)
                {
                    msg =Convert.ToString(dt.Rows[0][0]);
                }
            }
            return Json(msg);
        }
    }
}