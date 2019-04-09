using Market.Models;
using System.Linq;
using System.Web.Mvc;

namespace Market.Controllers
{
    public class IssueController : Controller
    {
        private Entities market = new Entities();
        public ActionResult Index()
        {
            ViewBag.Back = "/Home/Index";
            return View();
        }

        public ActionResult Otdels()
        {
            ViewBag.Back = "/Issue/Index";
            ViewBag.Otdels = market.otdels.ToList();
            return View();
        }

        public ActionResult Employee()
        {
            ViewBag.Back = "/Issue/Index";
            ViewBag.Employee = market.employees.ToList();
            return View();
        }

        public ActionResult Goods()
        {
            ViewBag.Back = "/Issue/Index";
            ViewBag.Goods = market.products.ToList();
            return View();
        }
        public ActionResult Purchases()
        {
            ViewBag.Back = "/Issue/Index";
            ViewBag.Purchases = market.purchases.ToList();
            ViewBag.Otdels = market.otdels.ToList();
            ViewBag.Goods = market.products.ToList();
            return View();
        }
    }
}