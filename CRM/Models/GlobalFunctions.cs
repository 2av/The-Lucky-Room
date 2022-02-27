using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;

namespace CRM.Models
{

    public class GlobalFunctions
    {
        public static void SetCookie(string key, string value)
        {
            TimeSpan expires = TimeSpan.FromDays(30);
            value = Convert.ToBase64String(MachineKey.Protect(Encoding.UTF8.GetBytes(value)));
            HttpCookie encodedCookie = new HttpCookie(key, value);
            if (HttpContext.Current.Request.Cookies[key] != null)
            {
                var cookieOld = HttpContext.Current.Request.Cookies[key];
                cookieOld.Expires = DateTime.Now.Add(expires);
                cookieOld.Value = encodedCookie.Value;
                HttpContext.Current.Response.Cookies.Add(cookieOld);
            }
            else
            {
                encodedCookie.Expires = DateTime.Now.Add(expires);
                HttpContext.Current.Response.Cookies.Add(encodedCookie);
            }
        }
        public static string GetCookie(string key)
        {
            try
            {
                string value = string.Empty;
                HttpCookie cookie = HttpContext.Current.Request.Cookies[key];

                if (cookie != null)
                {
                    HttpCookie decodedCookie = cookie;
                    value = decodedCookie.Value;
                    value = Encoding.UTF8.GetString(MachineKey.Unprotect(Convert.FromBase64String(value)));
                }
                return value;
            }
            catch (Exception ex)
            {
                return "";
            }
        }
        public static void ExpireAllCookies()
        {
            if (HttpContext.Current != null)
            {
                int cookieCount = HttpContext.Current.Request.Cookies.Count;
                for (var i = 0; i < cookieCount; i++)
                {
                    var cookie = HttpContext.Current.Request.Cookies[i];
                    if (cookie != null)
                    {
                        var expiredCookie = new HttpCookie(cookie.Name)
                        {
                            Expires = DateTime.Now.AddDays(-1),
                            Domain = cookie.Domain
                        };
                        HttpContext.Current.Response.Cookies.Add(expiredCookie); // overwrite it
                    }
                }

                // clear cookies server side
                HttpContext.Current.Request.Cookies.Clear();
            }
        }
        public static void SetUsersCookies(DataTable dt)
        {
            
            SetCookie("UserId", Convert.ToString(dt.Rows[0]["UserID"]));
            SetCookie("UserName", Convert.ToString(dt.Rows[0]["UserName"]));
            SetCookie("FirstName", Convert.ToString(dt.Rows[0]["FirstName"]));
            SetCookie("RoleId", Convert.ToString(dt.Rows[0]["RoleId"]));
            SetCookie("LastName", Convert.ToString(dt.Rows[0]["LastName"]));
            SetCookie("EmailID", Convert.ToString(dt.Rows[0]["EmailID"]));
            SetCookie("RoleName", Convert.ToString(dt.Rows[0]["RoleName"]));
            SetCookie("ProfilePhoto", Convert.ToString(dt.Rows[0]["ProfilePhoto"]));
            SetCookie("MobileNo", Convert.ToString(dt.Rows[0]["MobileNo"]));
        }
        public static List<T> ConverDataTableToList<T>(DataTable dt)
        {
            var columnNames = dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName.ToLower()).ToList();
            var properties = typeof(T).GetProperties();
            return dt.AsEnumerable().Select(row =>
            {
                var objT = Activator.CreateInstance<T>();
                foreach (var pro in properties)
                {
                    if (columnNames.Contains(pro.Name.ToLower()))
                    {
                        try
                        {
                            pro.SetValue(objT, row[pro.Name]);
                        }
                        catch (Exception ex)
                        {

                        }
                    }
                }
                return objT;
            }).ToList();
        }
        public static int GetUserId()
        {
            try
            {
                if (string.IsNullOrEmpty(GlobalFunctions.GetCookie("UserId")))
                {
                    return 0;
                }
                else
                {
                    return Convert.ToInt32(GlobalFunctions.GetCookie("UserId"));
                }
            }
            catch (Exception ex)
            {
                return 0;
            }

        }
        public static int GetRoleId()
        {
            try
            {
                if (string.IsNullOrEmpty(GlobalFunctions.GetCookie("RoleId")))
                {
                    return 0;
                }
                else
                {
                    return Convert.ToInt32(GlobalFunctions.GetCookie("RoleId"));
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}