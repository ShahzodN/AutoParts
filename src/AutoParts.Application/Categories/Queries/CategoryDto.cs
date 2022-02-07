namespace AutoParts.Application.Categories.Queries;

public class CategoryDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public List<string> Images { get; set; } = new();
}