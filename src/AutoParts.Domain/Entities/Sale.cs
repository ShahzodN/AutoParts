using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Sale : IEntity
{
    public List<SaleDetails> SaleDetails { get; set; } = new();
    public Employee Seller { get; set; } = null!;
    public DateTime SaleTime { get; set; }
    public decimal Taken { get; set; }
    public decimal Change { get; set; }
    public decimal Sum { get; set; }
}