using AutoParts.Domain.Enums;
using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities
{
    public class Model : IEntity
    {
        public string? ModelName { get; set; }
        public int YearOfIssue { get; set; }
        public BodyType BodyType { get; set; }
        public Manufactor Manufactor { get; set; } = null!;
        public int ManufactorId { get; set; }
        public List<AutoProduct> Products { get; set; } = new();
    }
}