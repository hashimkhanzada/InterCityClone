using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InterCityWebAPI.Data.Models
{
    public class RouteModel
    {
        [Key]
        public int RouteId { get; set; }

        public string FromCityName { get; set; }
        public string ToCityName { get; set; }

        public CityModel FromCity { get; set; }
        public CityModel ToCity { get; set; }

        public string DepartureDate { get; set; }
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }
        public float StandardPrice { get; set; }
        public float FlexiPrice { get; set; }

        public ICollection<BookingModel> Bookings { get; set; }
    }
}
