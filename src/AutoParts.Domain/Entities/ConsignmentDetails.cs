namespace AutoParts.Domain.Entities;

public class ConsignmentDetails
{
    public int Id { get; set; }
    public Consignment? Consignment { get; set; }
    public int? ConsignmentId { get; set; }
    public Product? Product { get; set; }
    public int? ProductId { get; set; }
    public int Quantity { get; set; }
}