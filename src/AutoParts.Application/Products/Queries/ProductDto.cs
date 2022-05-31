namespace AutoParts.Application.Products.Queries;

public class ProductDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Price { get; set; }
    public string? EAN { get; set; }
    public string? Image { get; set; }
}