namespace AutoParts.Application.Sales.Queries;

public class SaleDto
{
    public int Id { get; set; }
    public string? DateTime { get; set; }
    public decimal Sum { get; set; }
    public string? Seller { get; set; }
}