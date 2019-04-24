using Market.Models;
using System.Linq;
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

        [HttpPost]
        public void Change(string commands)
        {
            if (commands != null)
            {
                market.Database.ExecuteSqlCommand(@commands);
            }
        }

        [HttpPost]
        public JsonResult Select(string table)
        {
            switch (table)
            {
                case "otdel":

                    var otdel = market.otdels.ToList().Select(a => new { a.id, a.name, employee = a.employee.name }).OrderBy(a => a.id).ToList();
                    return Json(otdel);
                case "product":
                    var product = market.products.ToList().Select(a => new { a.id, a.name, otdel = a.otdel.name, a.coast, a.amount }).OrderBy(a => a.id);
                    return Json(product);
                case "employee":
                    var employee = market.employees.ToList().Select(a => new { a.id, a.name, a.surname, date_start = a.date_start.ToShortDateString(), otdel = a.otdel.name, position = a.position.name, specialization = a.specialization.name }).OrderBy(a => a.id);
                    return Json(employee);
                case "position":
                    var position = market.positions.ToList().Select(a => new { a.id, a.name }).OrderBy(a => a.id);
                    return Json(position);
                case "purchase":
                    var purchase = market.purchases.ToList().Select(a => new { a.id, a.product.name, otdel = a.otdel.name, data_sale = a.data_sale.ToShortDateString(), employee = a.employee.name }).OrderBy(a => a.id);
                    return Json(purchase);
                case "specialization":
                    var specialization = market.specializations.ToList().Select(a => new { a.id, a.name }).OrderBy(a => a.id);
                    return Json(specialization);
                default:
                    return Json("");
            }
        }
    }
}