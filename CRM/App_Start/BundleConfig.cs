using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CRM.App_Start
{

    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            StyleBundle theme_common = new StyleBundle("~/Theme/Styles/common");
            StyleBundle theme_bootstrap = new StyleBundle("~/Theme/Styles/bootstrap");
            StyleBundle theme_morris = new StyleBundle("~/Theme/Styles/morris");
            
            StyleBundle theme_dataTables = new StyleBundle("~/Theme/Styles/dataTables");
                       
            ScriptBundle themeJqueryDatatable_script = new ScriptBundle("~/Theme/Scripts/Jquerydatatable");


            /*STYLES*/
            theme_common.Include("~/Content/Theme/Admin/plugins/bootstrap/css/bootstrap.css",
                "~/Content/Theme/Admin/plugins/node-waves/waves.css",
                "~/Content/Theme/Admin/plugins/animate-css/animate.css",
                "~/Content/Theme/Admin/plugins/morrisjs/morris.css",
                "~/Content/Theme/Admin/css/style.css",
                "~/Content/Theme/Admin/css/themes/all-themes.css",
                "~/Content/Theme/Admin/plugins/waitme/waitMe.css",
                "~/Content/Theme/Admin/plugins/sweetalert/sweetalert.css"
                );
            theme_dataTables.Include("~/Content/Theme/Admin/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css");


            themeJqueryDatatable_script.Include("~/Content/Theme/Admin/plugins/jquery-datatable/jquery.dataTables.js",
                "~/Content/Theme/Admin/plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js",
                "~/Content/Theme/Admin/plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js",
                "~/Content/Theme/Admin/plugins/jquery-datatable/extensions/export/buttons.flash.min.js",
                "~/Content/Theme/Admin/plugins/jquery-datatable/extensions/export/jszip.min.js",
                "~/Content/Theme/Admin/plugins/jquery-datatable/extensions/export/pdfmake.min.js",
                "~/Content/Theme/Admin/plugins/jquery-datatable/extensions/export/vfs_fonts.js",
                "~/Content/Theme/Admin/plugins/jquery-datatable/extensions/export/buttons.html5.min.js",
                "~/Content/Theme/Admin/plugins/jquery-datatable/extensions/export/buttons.print.min.js",
                "~/Content/Theme/Admin/js/pages/tables/jquery-datatable.js"
                );



            
            BundleTable.EnableOptimizations = true;
        }
    }
}
