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
    //[SessionExpire]
    public class PaymentController : Controller
    {
        // GET: Payment
        [HttpPost]
        public ActionResult Index(PaytmRequest obj)
        {
            Users u = new Users();
            u.UserId = GlobalFunctions.GetUserId();
            DataTable dt = new DataTable();
            dt = u._Select("procUsers","DetailsForPayment",u).Tables[0];

            if (dt.Rows.Count > 0)
            {
                Random ran = new Random();
                string UserId = Convert.ToString(u.UserId);
                string ORDER_ID = UserId + "-" + ran.Next(1000000, 9999999).ToString().PadLeft(10,'0');
                u.MobileNo =Convert.ToString(dt.Rows[0]["MobileNo"]);
                u.EmailId = Convert.ToString(dt.Rows[0]["EmailId"]);
                String callbackUrl = Convert.ToString(dt.Rows[0]["callbackUrl"]);
                String marchantId = Convert.ToString(dt.Rows[0]["marchantId"]);
                String CHANNEL_ID= Convert.ToString(dt.Rows[0]["CHANNEL_ID"]);
                String WEBSITE = Convert.ToString(dt.Rows[0]["WEBSITE"]);
                String INDUSTRY_TYPE_ID = Convert.ToString(dt.Rows[0]["INDUSTRY_TYPE_ID"]);
                String Merchant_Key= Convert.ToString(dt.Rows[0]["Merchant_Key"]);
                
                Dictionary<String, String> paytmParams = new Dictionary<String, String>();
                paytmParams.Add("MID", marchantId);
                paytmParams.Add("CHANNEL_ID", CHANNEL_ID);
                paytmParams.Add("WEBSITE", WEBSITE);
                paytmParams.Add("INDUSTRY_TYPE_ID", INDUSTRY_TYPE_ID);
                paytmParams.Add("CUST_ID", UserId);
                paytmParams.Add("MOBILE_NO",u.MobileNo);
                paytmParams.Add("EMAIL", u.EmailId);
                paytmParams.Add("ORDER_ID", ORDER_ID);
                paytmParams.Add("TXN_AMOUNT", obj.Amount);
                paytmParams.Add("CALLBACK_URL", callbackUrl);
                string paytmChecksum = paytm.CheckSum.generateCheckSum(Merchant_Key, paytmParams);
                string transactionURL = Convert.ToString(dt.Rows[0]["transactionURL"]); 

                try
                {
                    string outputHTML = "<html>";
                    outputHTML += ("<head>");
                    outputHTML += ("<title>Merchant Checkout Page</title>");
                    outputHTML += ("</head>");
                    outputHTML += ("<body>");
                    outputHTML += "<center><h1>Please do not refresh this page...</h1></center>";
                    outputHTML += "<form method='post' action='" + transactionURL + "' name='f1'>";
                    outputHTML += "<table border='1'>";
                    outputHTML += "<tbody>";
                    foreach (string key in paytmParams.Keys)
                    {
                        outputHTML += "<input type='hidden' name='" + key + "' value='" + paytmParams[key] + "'>'";
                    }
                    outputHTML += "<input type='hidden' name='CHECKSUMHASH' value='" + paytmChecksum + "'>";
                    outputHTML += "</tbody>";
                    outputHTML += "</table>";
                    outputHTML += "<script type='text/javascript'>";
                    outputHTML += "document.f1.submit();";
                    outputHTML += "</script>";
                    outputHTML += "</form>";
                    outputHTML += "</body>";
                    outputHTML += "</html>";

                    ViewBag.list = outputHTML;
                    return View();
                }
                catch (Exception ex)
                {
                    Response.Write("Exception message: " + ex.Message.ToString());
                }
            }
            return View();

        }
        public ActionResult PaymentStatus(PaytmResponse obj)
        {
            PaymentStatus objst = new DAL.PaymentStatus();
            try
            {
                objst.MID = Convert.ToString(obj.MID);
                objst.ORDERID = Convert.ToString(obj.ORDERID);
                objst.TXNAMOUNT = Convert.ToString(obj.TXNAMOUNT);
                objst.CURRENCY = Convert.ToString(obj.CURRENCY);
                objst.TXNID = Convert.ToString(obj.TXNID);
                objst.BANKTXNID = Convert.ToString(obj.BANKTXNID);
                objst.STATUS = Convert.ToString(obj.STATUS);
                objst.RESPCODE = Convert.ToString(obj.RESPCODE);
                objst.TXNDATE = Convert.ToString(obj.TXNDATE);
                objst.GATEWAYNAME = Convert.ToString(obj.GATEWAYNAME);
                objst.BANKNAME = Convert.ToString(obj.BANKNAME);
                objst.PAYMENTMODE = Convert.ToString(obj.PAYMENTMODE);
                objst.CHECKSUMHASH = Convert.ToString(obj.CHECKSUMHASH);
                if (!string.IsNullOrEmpty(objst.ORDERID))
                {
                    if (objst.ORDERID.Split('-').Length == 2)
                    {
                        objst.UserId = Convert.ToInt32(objst.ORDERID.Split('-')[0]);
                    }
                    string msg = objst._Insert("procPaymentStatus", objst);
                }
            }
            catch (Exception ex)
            {

            }
            return View(obj);

        }
        public ActionResult AddPayment()
        {
            return View();
        }
        public ActionResult CheckUser()
        {
            return Json("");
        }
        public ActionResult SavePayment(PaymentStatus obj)
        {
            obj.STATUS = "TXN_SUCCESS";
            return Json("");
        }
    }
}