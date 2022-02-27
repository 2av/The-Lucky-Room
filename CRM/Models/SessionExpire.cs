using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CRM.Models
{
    public class SessionExpire : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                string userid = "";
                List<string> AllKeys = HttpContext.Current.Request.Cookies.AllKeys.ToList();
                if (AllKeys.IndexOf("IsLogin") > -1)
                {
                    userid = GlobalFunctions.GetCookie("IsLogin");
                }
                if (string.IsNullOrEmpty(userid) || userid == "False")
                {
                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary
                {
                    { "action", "Login" },
                    { "controller", "Users" }
                    //,{ "returnUrl", filterContext.HttpContext.Request.RawUrl}
                });
                    return;
                }
                else
                {
                    HttpContext.Current.Session.Timeout = 60 * 24 * 365;
                }
            }
            catch (Exception ex)
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary
                {
                    { "action", "Login" },
                    { "controller", "Users" }
                    //,{ "returnUrl", filterContext.HttpContext.Request.RawUrl}
                });
                return;
            }
        }
       
    }
    
}