using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;


namespace CRM.Controllers
{
    public class CourseController : BaseController
    {
        Menu objMenu = new Menu();
        Course objCourse = new Course();
        string returnSms;

        // GET: /Course/
        public ActionResult Index()
        {
            return View(objCourse._Select("procCourse").Tables[0]);
        }

        //
        // GET: /Course/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Course/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Course/Create
        [HttpPost]
        public ActionResult Create(Course obj)
        {
            try
            {
                string returnSms = objMenu._Insert("procCourse", obj);
                return Json(returnSms, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Course/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Course/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Course/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Course/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
