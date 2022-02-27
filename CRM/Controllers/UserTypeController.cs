using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
namespace CRM.Controllers
{
    public class UserTypeController : BaseController
    {
        // GET: UserType
        public ActionResult Index()
        {

            return View(new UserType()._Select("procUserType").Tables[0]);
        }
        public ActionResult Create()
        {
            
            return View();
        }

        [HttpPost]
        public ActionResult Create(UserType obj)
        {
            string msg = obj._Insert("procUserType", obj);
            return View();
        }
    }
}