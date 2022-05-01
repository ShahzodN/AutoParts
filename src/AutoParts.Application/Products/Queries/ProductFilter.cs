namespace AutoParts.Application.Products.Queries;

public class ProductFilter
{
    public int[]? Categories { get; set; }
    public int[]? Manufactors { get; set; }
    public int[]? Models { get; set; }
    public int Price { get; set; }
    public int YearOfIssueFrom { get; set; }
    public int YearOfIssueTo { get; set; }
}