using AutoParts.Domain.Entities;

namespace AutoParts.Application.Identity.Models
{
    public class Customer : User
    {
        public Car? Car { get; set; }
        public int CarId { get; set; }
    }
}