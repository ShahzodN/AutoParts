namespace AutoParts.Application.Reports.Queries;

public class SalesReportDto
{
    public IEnumerable<ProductInSaleReportDto>? Products { get; set; }
    public int QuantitySum { get; set; }
    public decimal RevenueSum { get; set; }
    public decimal IncomeSum { get; set; }
}