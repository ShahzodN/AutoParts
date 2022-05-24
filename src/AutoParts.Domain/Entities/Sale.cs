using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Sale : IEntity
{
    public List<SaleDetails> SaleDetails { get; set; } = new();
    public string Seller { get; set; } = null!;
    public DateTime SaleTime { get; set; }
}