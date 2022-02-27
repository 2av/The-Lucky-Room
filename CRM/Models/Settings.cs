using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Models
{
    public class Settings
    {
        public static string marchantkey = "PbhPaIYD1Kk!V8#B";
        public static string marchantId = "NaawHv70349545310942";
        public static string CHANNEL_ID = "WEB";
        public static string WEBSITE = "WEBSTAGING";
        public static string INDUSTRY_TYPE_ID = "Retail";
    }
    public class PaytmRequest
    {
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Amount { get; set; }
    }
    public class PaytmResponse
    {
        public string MID { get; set; }
        public string ORDERID { get; set; }
        public string TXNAMOUNT { get; set; }
        public string CURRENCY { get; set; }
        public string TXNID { get; set; }
        public string BANKTXNID { get; set; }
        public string STATUS { get; set; }
        public string RESPCODE { get; set; }
        public string TXNDATE { get; set; }
        public string GATEWAYNAME { get; set; }
        public string BANKNAME { get; set; }
        public string PAYMENTMODE { get; set; }
        public string CHECKSUMHASH { get; set; }
    }

}