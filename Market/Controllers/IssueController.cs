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
        [HttpPost]
        public ActionResult Purchases(Search search)
        {
            var Purchases = market.purchases.Where(a => a.data_sale > search.start && a.data_sale < search.end);
            if (search.otdel!= "All")
                Purchases = market.purchases.Where(a => a.otdel.name.Contains(search.otdel));
            if (search.product != "All")
                Purchases = market.purchases.Where(a => a.product.name.Contains(search.product));
            if (search.employee != "All")
                Purchases = market.purchases.Where(a => (a.employee.name+" "+a.employee.surname).Contains(search.employee));
            ViewBag.Back = "/Issue/Index";
            ViewBag.Otdels = market.otdels.ToList();
            ViewBag.Goods = market.products.ToList();
            ViewBag.Employees = market.purchases.Select(a => a.employee.name + " " + a.employee.surname).Distinct().ToList();
            ViewBag.Purchases = Purchases.ToList();
            return View();
        }
        [HttpGet]
        public ActionResult Purchases()
        {
            ViewBag.Back = "/Issue/Index";
            ViewBag.Purchases = market.purchases.ToList();
            ViewBag.Otdels = market.otdels.ToList();
            ViewBag.Employees = market.purchases.Select(a => a.employee.name+" "+a.employee.surname).Distinct().ToList();
            ViewBag.Goods = market.products.ToList();
            return View();
        }
    }
}