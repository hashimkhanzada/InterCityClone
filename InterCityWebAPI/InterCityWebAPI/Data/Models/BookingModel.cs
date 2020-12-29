using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InterCityWebAPI.Data.Models
{
    public class BookingModel
    {
        [Key]
        public Guid ReferenceNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public int NoOfPassengers { get; set; }
        public string FareType { get; set; }
        public float TotalCost { get; set; }

        public int RouteId { get; set; }
        public RouteModel Route { get; set; }
    }
}
