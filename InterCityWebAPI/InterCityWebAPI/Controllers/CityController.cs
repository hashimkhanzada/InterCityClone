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
    public class CityController : ControllerBase
    {
        private readonly InterCityDbContext _context;

        public CityController(InterCityDbContext context)
        {
            _context = context;
        }

        // GET: api/City
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CityModel>>> GetCities()
        {
            return await _context.Cities.ToListAsync();
        }

        // GET: api/City/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CityModel>> GetCityModel(string id)
        {
            var cityModel = await _context.Cities.FindAsync(id);

            if (cityModel == null)
            {
                return NotFound();
            }

            return cityModel;
        }

        // PUT: api/City/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCityModel(string id, CityModel cityModel)
        {
            if (id != cityModel.CityName)
            {
                return BadRequest();
            }

            _context.Entry(cityModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityModelExists(id))
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

        // POST: api/City
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CityModel>> PostCityModel(CityModel cityModel)
        {
            _context.Cities.Add(cityModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CityModelExists(cityModel.CityName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCityModel", new { id = cityModel.CityName }, cityModel);
        }

        // DELETE: api/City/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCityModel(string id)
        {
            var cityModel = await _context.Cities.FindAsync(id);
            if (cityModel == null)
            {
                return NotFound();
            }

            _context.Cities.Remove(cityModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CityModelExists(string id)
        {
            return _context.Cities.Any(e => e.CityName == id);
        }
    }
}
