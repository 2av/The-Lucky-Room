using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    public class CityController : BaseController
    {
        // GET: City
        City objCity = new City();
        public ActionResult Index()
        {
            return View(objCity._Select("procCity").Tables[0]);
        }
        public ActionResult Create()
        {
            fillDropDown();
            return View();
        }
        [HttpPost]
        public ActionResult Create(City obj)
        {
            string returnSms = obj._Insert("procCity", obj);
            fillDropDown();
            return View();
        }

        public void fillDropDown()
        {
            ViewBag.CountryList = DropDownData("tblCountry");
            ViewBag.StateList = DropDownData("tblState");
        }
    }
}