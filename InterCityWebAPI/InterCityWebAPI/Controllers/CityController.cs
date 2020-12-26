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
        public async Task<ActionResult<CityModel>> GetCityModel(int id)
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
        public async Task<IActionResult> PutCityModel(int id, CityModel cityModel)
        {
            if (id != cityModel.CityId)
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
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCityModel", new { id = cityModel.CityId }, cityModel);
        }

        // DELETE: api/City/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCityModel(int id)
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

        private bool CityModelExists(int id)
        {
            return _context.Cities.Any(e => e.CityId == id);
        }
    }
}
