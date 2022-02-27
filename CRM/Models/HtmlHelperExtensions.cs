using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Models
{
    public static class HtmlHelperExtensions
    {
        public static IHtmlString _Textbox()
        {
            var outerDiv = new TagBuilder("div");
            outerDiv.AddCssClass("pull-left upload-img-wrapper");

            var html = "";
            return MvcHtmlString.Create(html);
        }
    }
}