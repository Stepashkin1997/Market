﻿using Market.Models;
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
            IQueryable query = null;
            switch (table)
            {
                case "otdel":
                    query = market.otdels.Select(a => new { a.id, a.name, employee = a.employee.name }).OrderBy(a => a.id);
                    break;
                case "product":
                    query = market.products.Select(a => new { a.id, a.name, otdel = a.otdel.name, a.coast, a.amount }).OrderBy(a => a.id);
                    break;
                case "employee":
                    query = market.employees.Select(a => new { a.id, a.name, a.surname, a.date_start, otdel = a.otdel.name, position = a.position.name, specialization = a.specialization.name }).OrderBy(a => a.id);
                    break;
                case "position":
                    query = market.positions.Select(a => new { a.id, a.name }).OrderBy(a => a.id);
                    break;
                case "purchase":
                    query = market.purchases.Select(a => new { a.id, a.product.name, otdel = a.otdel.name, a.data_sale, employee = a.employee.name }).OrderBy(a => a.id);
                    break;
                case "specialization":
                    query = market.specializations.Select(a => new { a.id, a.name }).OrderBy(a => a.id);
                    break;
            }
            return Json(query);
        }
    }
}