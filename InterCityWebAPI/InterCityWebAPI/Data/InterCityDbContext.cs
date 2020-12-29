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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RouteModel>()
                .HasOne(p => p.ToCity)
                .WithMany(t => t.ToRoutes)
                .HasForeignKey(m => m.ToCityName)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RouteModel>()
                .HasOne(p => p.FromCity)
                .WithMany(t => t.FromRoutes)
                .HasForeignKey(m => m.FromCityName)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
