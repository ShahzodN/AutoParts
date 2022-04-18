using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Manufactor : IEntity
{
    public string? Name { get; set; }
    public Image? Image { get; set; } = null!;
    public List<Car> Cars { get; set; } = new();
}