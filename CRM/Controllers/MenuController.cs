using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
namespace CRM.Controllers
{
    public class MenuController : BaseController
    {
        Menu objMenu = new Menu();
        // GET: Menu
        public ActionResult Index()
        {
            

            return View(objMenu._Select("procMenu").Tables[0]);
        }
        public ActionResult Create()
        {
            Menu m = new Menu();
            fillDropDown();
            return View(m);
        }

        [HttpPost]
        public ActionResult Create(Menu objMenu)
        {
            string returnSms = objMenu._Insert("procMenu", objMenu);
            return View();
        }
        public void fillDropDown()
        {
            ViewBag.Submenuid = DropDownData("tblMenu_Submenu");
            
        }
        
    }
}