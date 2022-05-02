using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Product : IEntity
{
    public string? Name { get; set; }
    public int Price { get; set; }
    public bool IsEnabled { get; set; }
    public List<Model> Models { get; set; } = new();
    public Category Category { get; set; } = null!;
    public int CategoryId { get; set; }
    public string? Description { get; set; }
    public List<ConsignmentDetails> ConsignmentDetails { get; set; } = new();
    public Image? Image { get; set; } = null!;
}