using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Product : IEntity
{
    public string Name { get; set; } = null!;
    public decimal Price { get; set; }
    public bool IsEnabled { get; set; }
    public int Count { get; set; }
    public string EAN { get; set; } = null!;
    public string? Description { get; set; }
    public Image? Image { get; set; } = null!;
    public List<Model> Models { get; set; } = new();
    public List<ConsignmentDetails> ConsignmentDetails { get; set; } = new();
    public List<SaleDetails> SaleDetails { get; set; } = new();
    public Category Category { get; set; } = null!;
    public int CategoryId { get; set; }
}