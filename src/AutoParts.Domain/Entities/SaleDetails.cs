namespace AutoParts.Domain.Entities;

public class SaleDetails
{
    public int Id { get; set; }
    public Product Product { get; set; } = null!;
    public int ProductId { get; set; }
    public Sale Sale { get; set; } = null!;
    public int SaleId { get; set; }
    public int Quantity { get; set; }
}