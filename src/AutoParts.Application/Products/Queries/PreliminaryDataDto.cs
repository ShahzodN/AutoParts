using AutoParts.Application.Categories.Queries;
using AutoParts.Application.Models.Queries;

namespace AutoParts.Application.Products.Queries;

public class PreliminaryDataDto
{
    public List<ManufactorDto> Manufactors { get; set; } = null!;
    public List<CategoryDto> Categories { get; set; } = new();
}