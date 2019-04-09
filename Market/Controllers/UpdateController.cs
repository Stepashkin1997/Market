using Market.Models;
using System;
using System.Data.Common;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Web.Mvc;

namespace Market.Controllers
{
    public class UpdateController : Controller
    {
        private Entities market = new Entities();
        public ActionResult Index()
        {
            ViewBag.Back = "/Home/Index";
            return View();
        }

        public ActionResult Update()
        {
            ViewBag.Back = "/Update/Index";
            return View();
        }

        [HttpPost]
        public void Select(string table)
        {
            Type type = Type.ReflectionOnlyGetType(table,true,false);
            var a = (market as IObjectContextAdapter).ObjectContext.CreateObjectSet<otdel>().EntitySet.Name;
            if (table == market.employees.GetType().ToString()) {
                int i = 1;
            }
            //return Json();
        }
    }
}