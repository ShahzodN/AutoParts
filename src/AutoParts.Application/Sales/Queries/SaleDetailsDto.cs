namespace AutoParts.Application.Sales.Queries;

public class SaleDetailsDto
{
    public string? Seller { get; set; }
    public string? DateTime { get; set; }
    public List<ProductInСheck> Products { get; set; } = new();
    public decimal Taken { get; set; }
    public decimal Change { get; set; }
    public decimal Sum { get; set; }
}

public record ProductInСheck(string Name,
                            decimal Price,
                            int Quantity,
                            string EAN);