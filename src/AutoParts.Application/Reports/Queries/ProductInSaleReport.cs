namespace AutoParts.Application.Reports.Queries;

public class ProductInSaleReportDto
{
    public string? Name { get; set; }
    public int Quantity { get; set; }
    public decimal CostPrice { get; set; }
    public decimal CostPriceSum { get; set; }
    public decimal Price { get; set; }
    public decimal Revenue { get; set; }
    public decimal Income { get; set; }
}