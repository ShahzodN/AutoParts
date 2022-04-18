using AutoParts.Domain.Entities;

namespace AutoParts.Application.Identity.Models
{
    public class Customer : User
    {
        public Model? Model { get; set; }
        public int CarId { get; set; }
    }
}