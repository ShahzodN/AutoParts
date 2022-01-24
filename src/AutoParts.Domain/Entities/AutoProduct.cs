using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class AutoProduct : IEntity
{
    public string? Name { get; set; }
    public int Price { get; set; }
    public Car? Car { get; set; }
    public int? CarId { get; set; }
    public Category Category { get; set; } = null!;
    public int CategoryId { get; set; }
    public string? Description { get; set; }
    public List<ConsignmentDetails> ConsignmentDetails { get; set; } = new();
}