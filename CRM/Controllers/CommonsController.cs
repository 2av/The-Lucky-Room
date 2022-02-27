using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;




using System.Web.Mvc;

namespace CRM.Controllers
{
    public class CommonsController : BaseController
    {
        // GET: Commons
        Commons objCommons = new Commons();
        
        public ActionResult Index()
        {            
            return View(objCommons._Select("procCommons").Tables[0]);
        }
        public ActionResult Create()
        {
           return View();
        }

        [HttpPost]
        public ActionResult Create(Commons obj)
        {
            string msg = objCommons._Insert("procCommons",obj);
            return View();
        }
    }
}
