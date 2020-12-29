using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InterCityWebAPI.Data.Models
{
    public class CityModel
    {
        [Key]
        public string CityName { get; set; }
        public string BusStop { get; set; }

        public ICollection<RouteModel> FromRoutes { get; set; }
        public ICollection<RouteModel> ToRoutes { get; set; }
    }
}
