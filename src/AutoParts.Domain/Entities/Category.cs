namespace AutoParts.Domain.Entities;

public class Category
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public Category? Parent { get; set; }
    public int ParentId { get; set; }
    public List<Category> SubCategories { get; set; } = new();
    public List<AutoProduct> Products { get; set; } = new();
}