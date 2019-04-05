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
            return View();
        }

        public ActionResult Otdels()
        {
            ViewBag.Otdels = market.otdels.ToList();
            return View();
        }

        public ActionResult Employee()
        {
            ViewBag.Employee = market.employees.ToList();
            return View();
        }

        public ActionResult Goods()
        {
            ViewBag.Goods = market.products.ToList();
            return View();
        }
        public ActionResult Purchases()
        {
            ViewBag.Purchases = market.purchases.ToList();
            return View();
        }
    }
}