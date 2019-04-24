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
                case "otdels":
                    var otdel = market.otdels.ToList().Select(a => new { a.id, a.name, a.id_name_glav }).OrderBy(a => a.id).ToList();
                    return Json(otdel);
                case "product":
                    var product = market.products.ToList().Select(a => new { a.id, a.name, otdel = a.id_otdel, a.coast, a.amount }).OrderBy(a => a.id);
                    return Json(product);
                case "employee":
                    var employee = market.employees.ToList().Select(a => new { a.id, a.name, a.surname, date_start = a.date_start.ToShortDateString(), a.id_otdel, a.id_position, a.id_specialization }).OrderBy(a => a.id);
                    return Json(employee);
                case "position":
                    var position = market.positions.ToList().Select(a => new { a.id, a.name }).OrderBy(a => a.id);
                    return Json(position);
                case "purchase":
                    var purchase = market.purchases.ToList().Select(a => new { a.id, a.id_product, a.id_otdel, data_sale = a.data_sale.ToShortDateString(), a.id_employee }).OrderBy(a => a.id);
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