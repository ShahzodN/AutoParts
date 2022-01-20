namespace AutoParts.Domain.Entities;

public class AutoProduct
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Price { get; set; }
    public Car? Car { get; set; }
    public int CarId { get; set; }
    public Category Category { get; set; }
    public int CategoryId { get; set; }
}