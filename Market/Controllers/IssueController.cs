using Market.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Market.Controllers
{
    public class IssueController : Controller
    {
        Entities market = new Entities();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Otdels()
        {
            ViewBag.Otdels = market.otdels.ToList();
            return View();
        }
    }
}