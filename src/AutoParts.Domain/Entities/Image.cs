using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities
{
    public class Image : IEntity
    {
        public string? Path { get; set; }
        public Category? Category { get; set; }
        public int? CategoryId { get; set; }
        public int? EmployeeId { get; set; }
        public AutoProduct? Product { get; set; }
        public int? ProductId { get; set; }
        public Car? Car { get; set; }
        public int? CarId { get; set; }

    }
}