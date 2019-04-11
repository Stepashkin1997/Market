using Market.Models;
using System.Web.Mvc;
using System.Linq;

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
        public JsonResult Select(string table)
        {
            IQueryable query =null;
            switch (table)
            {
                case "otdel":
                    query = market.products.Select(a => a.name);
                    break;
                case "product":
                    query = market.products.Select(a => a.name);
                    break;
                case "employee":
                    query = market.products.Select(a => a.name);
                    break;
                case "position":
                    query = market.products.Select(a => a.name);
                    break;
                case "purchase":
                    query = market.products.Select(a => a.name);
                    break;
                case "specialization":
                    query = market.products.Select(a => a.name);
                    break;
                default:
                    query = market.products.Select(a => a.name);
                    break;
            }
            return Json(query);
        }
    }
}