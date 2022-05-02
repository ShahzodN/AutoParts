using AutoParts.Application.Models.Queries;

namespace AutoParts.Application.Products.Queries;

public class ProductDetailsDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Price { get; set; }
    public bool IsEnabled { get; set; }
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public int? ManufactorId { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public bool ForAllManufactors { get; set; }
    public ModelWithYearsOfIssueDto[] Models { get; set; } = null!;
}