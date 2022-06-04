namespace AutoParts.Application.Statistics.Queries;
public class LowBalanceProductDto
{
    public string? Name { get; set; }
    public string? EAN { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}