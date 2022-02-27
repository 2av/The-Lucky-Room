using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    public class CommonsCategoryController : BaseController
    {
        // GET: CommonsCategory
        CommonsCategory objCommonsCategory = new CommonsCategory();
        public ActionResult Index()
        {
            return View();
        }
    }
}