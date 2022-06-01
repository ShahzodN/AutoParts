using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Product : IEntity
{
    public string Name { get; set; } = null!;
    public List<Price> Prices { get; set; } = new();
    public decimal LastPrice => Prices.Count == 0 ? 0 : Prices.OrderByDescending(x => x.DateTime).First().Value;
    public bool IsEnabled { get; set; }
    public int Count { get; set; }
    public string EAN { get; set; } = null!;
    public string? Description { get; set; }
    public Image? Image { get; set; } = null!;
    public List<Model> Models { get; set; } = new();
    public List<ConsignmentDetails> ConsignmentDetails { get; set; } = new();
    public List<SaleDetails> SaleDetails { get; set; } = new();
    public Category Category { get; set; } = null!;
    public int CategoryId { get; set; }
}