namespace AutoParts.Application.Sales.Queries;

public class SaleDetailsDto
{
    public string? Seller { get; set; }
    public string? DateTime { get; set; }
    public IEnumerable<ProductInСheck> Products { get; set; } = null!;
    public decimal Taken { get; set; }
    public decimal Change { get; set; }
    public decimal Sum { get; set; }
}

public record ProductInСheck(string Name,
                            decimal Price,
                            int Quantity,
                            string EAN);