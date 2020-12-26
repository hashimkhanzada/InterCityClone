using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterCityWebAPI.Data.Models
{
    public class InterCityDbContext:DbContext
    {
        public InterCityDbContext(DbContextOptions<InterCityDbContext> options):base(options)
        {

        }

        public DbSet<CityModel> Cities { get; set; }
        public DbSet<RouteModel> Routes { get; set; }
        public DbSet<BookingModel> Bookings { get; set; }
    }
}
