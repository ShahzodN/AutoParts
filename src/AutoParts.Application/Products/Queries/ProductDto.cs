namespace AutoParts.Application.Products.Queries;

public class ProductDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Price { get; set; }
    public bool IsEnabled { get; set; }
    public int CategoryId { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
}