using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities
{
    public class Image : IEntity
    {
        public string? Name { get; set; }
        public Category? Category { get; set; }
        public int? CategoryId { get; set; }
        public int? EmployeeId { get; set; }
        public Product? Product { get; set; }
        public int? ProductId { get; set; }
    }
}