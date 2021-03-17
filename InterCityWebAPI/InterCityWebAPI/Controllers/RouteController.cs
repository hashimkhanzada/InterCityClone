using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InterCityWebAPI.Data.Models;

namespace InterCityWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        private readonly InterCityDbContext _context;

        public RouteController(InterCityDbContext context)
        {
            _context = context;
        }

        // GET: api/Route
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RouteModel>>> GetRoutes()
        {
            return await _context.Routes.ToListAsync();
        }

        // GET: api/Route/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RouteModel>> GetRouteModel(int id)
        {
            var routeModel = await _context.Routes.FindAsync(id);

            if (routeModel == null)
            {
                return NotFound();
            }

            return routeModel;
        }

        // GET: api/Route/getRouteByNameDate
        [HttpGet("getRouteByNameDate")]
        public async Task<ActionResult<IEnumerable<RouteModel>>> GetRouteByNameDate(string fromCity, string toCity, string date)
        {
            List<RouteModel> routes = await _context.Routes.Where(p => p.FromCityName.ToLower().Replace(" ", "") == fromCity.ToLower().Replace(" ", "") && p.ToCityName.ToLower().Replace(" ", "") == toCity.ToLower().Replace(" ", "") && p.DepartureDate.ToLower().Replace(" ", "") == date.ToLower().Replace(" ", "")).Include(s => s.FromCity).Include(s => s.ToCity).ToListAsync();

            return routes;
        }

        // POST: api/Route
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RouteModel>> PostRouteModel(RouteModel routeModel)
        {
            if (!RouteModelExistsOnDate(routeModel.DepartureDate))
            {
                //TODO - hacky code - alternative for seeding data in the database

                List<RouteModel> routes = new List<RouteModel>
                {
                    new RouteModel
                    {
                        FromCityName = routeModel.FromCityName,
                        ToCityName = routeModel.ToCityName,
                        DepartureDate = routeModel.DepartureDate,
                        StandardPrice = 30,
                        FlexiPrice = 40,
                        DepartureTime = DateTime.Now.AddHours(1).ToString("hh:mm tt"),
                        ArrivalTime = DateTime.Now.AddHours(2).ToString("hh:mm tt")
                    },

                    new RouteModel
                    {
                        FromCityName = routeModel.FromCityName,
                        ToCityName = routeModel.ToCityName,
                        DepartureDate = routeModel.DepartureDate,
                        StandardPrice = 30,
                        FlexiPrice = 40,
                        DepartureTime = DateTime.Now.AddHours(3).ToString("hh:mm tt"),
                        ArrivalTime = DateTime.Now.AddHours(4).ToString("hh:mm tt")
                    },

                    new RouteModel
                    {
                        FromCityName = routeModel.FromCityName,
                        ToCityName = routeModel.ToCityName,
                        DepartureDate = routeModel.DepartureDate,
                        StandardPrice = 30,
                        FlexiPrice = 40,
                        DepartureTime = DateTime.Now.AddHours(5).ToString("hh:mm tt"),
                        ArrivalTime = DateTime.Now.AddHours(6).ToString("hh:mm tt")
                    }
                };

                _context.Routes.AddRange(routes);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetRouteModel", new { id = routeModel.RouteId }, routeModel);
        }

        // DELETE: api/Route/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRouteModel(int id)
        {
            var routeModel = await _context.Routes.FindAsync(id);
            if (routeModel == null)
            {
                return NotFound();
            }

            _context.Routes.Remove(routeModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool RouteModelExistsOnDate(string departDate)
        {
            return _context.Routes.Any(e => e.DepartureDate == departDate);
        }
    }
}
