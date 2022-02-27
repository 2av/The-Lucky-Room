using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    public class CountryController : BaseController
    {
        // GET: Country
        Country objCountry = new Country();
        public ActionResult Index()
        {
            return View(objCountry._Select("procCountry").Tables[0]);
            
            
        }
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Country obj)
        {
            string returnSms = obj._Insert("procCountry", obj);
            return View();
        }
    }
}