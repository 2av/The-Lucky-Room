using CRM.Models;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Controllers
{
    public class UsersController : Controller
    {
        // GET: Users
        public ActionResult Index()
        {
            Users obj = new Users();
            return View(obj._Select("procUsers").Tables[0]);
        }
        public ActionResult UserRegistration()
        {
            return View();
        }
        public ActionResult SaveData(Users obj)
        {
            obj.UserType = 3;// users
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            obj.MyReferalCode = new string(
                Enumerable.Repeat(chars, 8)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());
            obj.MyReferalCode = obj.FirstName.Substring(0,2).ToUpper()+obj.MyReferalCode;
            string validationmesage = "";
            bool isvalid = true;
            if (obj.UserName.Trim().Length > 50)
            {
                isvalid = false;
                validationmesage = "UserName should be less than 50 characers";
            }
            else if (obj.FirstName.Trim().Length > 50)
            {
                isvalid = false;
                validationmesage = "Name should be less than 50 characers";
            }
            else if (obj.MobileNo.Length > 12)
            {
                isvalid = false;
                validationmesage = "Mobile no should be less than 12 characers";
            }
            else if (obj.Password.Length > 50)
            {
                isvalid = false;
                validationmesage = "Password should be less than 50 characers";
            }
            if (isvalid)
            {
                validationmesage = obj._Insert("procUsers", obj);                
            }
            return Json(validationmesage);
        }
        public ActionResult checkUserExists(Users obj)
        {
            
            DataTable dt = obj._Select("procUsers", "IsUserExists", obj).Tables[0];
            string msg = "";
            if (dt.Rows.Count > 0)
            {
                msg =Convert.ToString( dt.Rows[0]["MSG"]);
            }
            return Json(msg);
        }
        public ActionResult checkReferalCode(Users obj)
        {

            DataTable dt = obj._Select("procUsers", "IsReferalExists", obj).Tables[0];
            string msg = "";
            if (dt.Rows.Count > 0)
            {
                msg = Convert.ToString(dt.Rows[0]["MSG"]);
            }
            return Json(msg);
        }
        public ActionResult Login()
        {
            
            ViewBag.MyReferalCode =Convert.ToString( Request.QueryString["ref"]);
            GlobalFunctions.ExpireAllCookies();
            GlobalFunctions.SetCookie("IsLogin", "True");
            Session["IsLogin"] = "False";
            return View();
        }
        public ActionResult CheckLogin(Users obj)
        {
            string msg =Convert.ToString(obj._Select("procUsers", "CheckLogin", obj).Tables[0].Rows[0]["MSG"]);
            if (msg.ToLower().Contains("Success".ToLower()))
            {
                Session["IsLogin"] = "True";
                Session["UserName"] = obj.UserName;
                Session["UserId"] = msg.Split('^')[1];

                GlobalFunctions.SetCookie("IsLogin", "True");
                GlobalFunctions.SetCookie("UserName", obj.UserName);
                GlobalFunctions.SetCookie("UserId", msg.Split('^')[1]);
                
                msg = msg.Split('^')[0];
            }
            else
            {
                Session["IsLogin"] = "Fail";
                Session["IsLogin"] = "Fail";
                GlobalFunctions.SetCookie("IsLogin", "Fail");
            }
            return Json(msg);
        }

        public ActionResult SendSMS(string mobileno)
        {
            string[] saAllowedCharacters = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };
            string otp = GenerateRandomOTP(5, saAllowedCharacters);
            SMS sms = new SMS();
            string msg = otp + " is the OTP for your new registration on The Lucky Room. Please do not share with anyone";
            string response = "";// sms.sendSMS(mobileno, msg);

            OTPSentDetails objotp = new OTPSentDetails();
            objotp.MobileNo = mobileno;
            objotp.OTPFor = "New Registration";
            objotp.Response = response;
            objotp.SMSSent = msg;
            objotp.OTP = otp;
            objotp.IsVarified = false;
            msg = objotp._Insert("procOTPSentDetails", objotp);
            return Json(msg);
        }
        private string GenerateRandomOTP(int iOTPLength, string[] saAllowedCharacters)

        {

            string sOTP = String.Empty;

            string sTempChars = String.Empty;

            Random rand = new Random();

            for (int i = 0; i < iOTPLength; i++)

            {

                int p = rand.Next(0, saAllowedCharacters.Length);

                sTempChars = saAllowedCharacters[rand.Next(0, saAllowedCharacters.Length)];

                sOTP += sTempChars;

            }

            return sOTP;

        }
    }
}
