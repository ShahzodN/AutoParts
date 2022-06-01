using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Price : IEntity
{
    public decimal Value { get; set; }
    public DateTime DateTime { get; set; }
    public Product Product { get; set; } = null!;
    public int ProductId { get; set; }
}