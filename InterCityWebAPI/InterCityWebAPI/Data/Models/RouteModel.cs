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
        public string FromCity { get; set; }
        public string ToCity { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public float StandardPrice { get; set; }
        public float FlexiPrice { get; set; }

        [NotMapped]
        public string TravelTime { get; set; }
    }
}
