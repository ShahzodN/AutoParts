using AutoParts.Domain.Entities;
using AutoParts.Domain.Interfaces;

namespace AutoParts.Application.Identity.Models
{
    public class User : IEntity
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public Account Account { get; set; } = null!;
        public int AccountId { get; set; }
    }
}