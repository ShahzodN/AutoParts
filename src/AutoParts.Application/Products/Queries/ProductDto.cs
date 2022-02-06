namespace AutoParts.Application.Products.Queries;

public class ProductForAutocompleteDto
{
    public ProductForAutocompleteDto(int id, string? name)
    {
        Id = id;
        Name = name;
    }

    public int Id { get; set; }
    public string? Name { get; set; }
}