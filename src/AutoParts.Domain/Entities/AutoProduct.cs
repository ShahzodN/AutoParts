using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class AutoProduct : IEntity
{
    public string? Name { get; set; }
    public int Price { get; set; }
    public List<Model> Models { get; set; } = new();
    public int? CarId { get; set; }
    public Category Category { get; set; } = null!;
    public int CategoryId { get; set; }
    public string? Description { get; set; }
    public List<ConsignmentDetails> ConsignmentDetails { get; set; } = new();
    public List<Image> Images { get; set; } = null!;
}