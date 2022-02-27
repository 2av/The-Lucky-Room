using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    public class StateController : BaseController
    {
        // GET: State
        State objState = new State();
        public ActionResult Index()
        {
            return View(objState._Select("procState").Tables[0]);
        }
        public ActionResult Create()
        {
            fillDropDown();
            return View();
        }
        [HttpPost]
        public ActionResult Create(State obj)
        {
            string returnSms = obj._Insert("procState", obj);
            fillDropDown();
            return View();
        }

        public void fillDropDown()
        {
            ViewBag.CountryList = DropDownData("tblCountry");
        }
    }
}