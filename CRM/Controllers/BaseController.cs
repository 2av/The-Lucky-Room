using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
using System.Data;

namespace CRM.Controllers
{
    public abstract class BaseController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //Menu objMenu = new Menu();
            //DataTable dt = new DataTable();
            ////if (Session["MenuList"] == null)
            ////{
            //    dt = objMenu._Select("procMenu", "dd_Menu").Tables[0];
            //    Session["MenuList"] = dt.AsEnumerable();
            ////}

            //ViewBag.MenuList = Session["MenuList"];
            base.OnActionExecuting(filterContext);
        }
        public List<SelectListItem> DropDownData(string Action,DropDown ClassName=null, bool CheckSession=false, string ProcedureName="procDropDown")
        {
            DataTable dtGetAll = null;
            DropDown ddObj = new DropDown();
            List<SelectListItem> list = new List<SelectListItem>();

            string SessionName = ProcedureName + "_" + Action;
            if (CheckSession)
            {
                if (HttpContext.Session[SessionName] != null)
                {
                    dtGetAll = HttpContext.Session[SessionName] as DataTable;
                }
                else
                {
                    dtGetAll = ddObj._Select(ProcedureName,Action,ClassName).Tables[0];
                    HttpContext.Session[SessionName] = dtGetAll;
                }
            }
            else
            {
                dtGetAll = ddObj._Select(ProcedureName,Action,ClassName).Tables[0];

            }

            foreach (DataRow row in dtGetAll.Rows)
            {
                list.Add(new SelectListItem(){Text = row["ID"].ToString(),Value = row["Name"].ToString()});
            }
            return list;
        }
        
    }
}