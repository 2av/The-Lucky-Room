using CRM.Models;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    [SessionExpire]
    public class DashboardController : BaseController
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            Dashboard obj = new Dashboard();
            return View(obj._Select("procDashboard", "AdminDashboard", obj).Tables[0]);
        }
    }
}