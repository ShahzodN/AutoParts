using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities
{
    public class Car : IEntity
    {
        public string? Manufactor { get; set; }
        public string? Model { get; set; }
        public int YearOfIssue { get; set; }
        public List<AutoProduct> Products { get; set; } = new();
    }
}