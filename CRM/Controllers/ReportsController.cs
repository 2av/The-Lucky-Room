using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    public class ReportsController : BaseController
    {
        // GET: Reports
        public ActionResult Index()
        {
            string spName = Convert.ToString(Request.QueryString["spn"]);
            ViewBag.HeaderName = spName;
            return View(new Base()._Select("proc"+spName).Tables[0]);
        }
    }
}