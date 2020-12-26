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

        // PUT: api/Route/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRouteModel(int id, RouteModel routeModel)
        {
            if (id != routeModel.RouteId)
            {
                return BadRequest();
            }

            _context.Entry(routeModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RouteModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Route
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RouteModel>> PostRouteModel(RouteModel routeModel)
        {
            _context.Routes.Add(routeModel);
            await _context.SaveChangesAsync();

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

        private bool RouteModelExists(int id)
        {
            return _context.Routes.Any(e => e.RouteId == id);
        }
    }
}
