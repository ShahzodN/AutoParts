using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities
{
    public class Car : IEntity
    {
        public string? Model { get; set; }
        public int YearOfIssue { get; set; }
        public Manufactor Manufactor { get; set; } = null!;
        public int ManufactorId { get; set; }
        public List<AutoProduct> Products { get; set; } = new();
        public Image? ManufactorLogo { get; set; }
    }
}