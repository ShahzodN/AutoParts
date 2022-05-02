using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Category : IEntity
{
    public string? Name { get; set; }
    public Category? Parent { get; set; }
    public int? ParentId { get; set; }
    public List<Category> SubCategories { get; set; } = new();
    public List<Product> Products { get; set; } = new();
    public Image Image { get; set; } = null!;
    public int ImageId { get; set; }
}