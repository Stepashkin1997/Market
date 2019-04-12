using Market.Models;
using System.Web.Mvc;
using System.Linq;

namespace Market.Controllers
{
    public class UpdateController : Controller
    {
        private Entities market = new Entities();
        int[,] a = new int[5,4];
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
        public JsonResult Select(string table)
        {
            IQueryable query =null;
            switch (table)
            {
                case "otdel":
                    query = market.otdels.Select(a => new { a.id,a.name,employee=a.employee.name});
                    break;
                case "product":
                    query = market.products.Select(a => new { a.id, a.name, otdel = a.otdel.name, a.coast, a.amount });
                    break;
                case "employee":
                    query = market.employees.Select(a => new { a.id,a.name,a.surname,a.date_start,otdel=a.otdel.name, position=a.position.name, specialization=a.specialization.name });
                    break;
                case "position":
                    query = market.positions.Select(a => new { a.id,a.name});
                    break;
                case "purchase":
                    query = market.purchases.Select(a => new { a.id,a.product.name, otdel=a.otdel.name,a.data_sale, employee=a.employee.name});
                    break;
                case "specialization":
                    query = market.specializations.Select(a => new { a.id,a.name });
                    break;
                default:
                    query = market.products.Select(a => new { a.id,a.name, otdel=a.otdel.name,a.coast,a.amount });
                    break;
            }
            return Json(query);
        }
    }
}