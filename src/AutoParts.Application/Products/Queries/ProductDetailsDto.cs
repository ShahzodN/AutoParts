using AutoParts.Application.Models.Queries;

namespace AutoParts.Application.Products.Queries;

public class ProductDetailsDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public string? EAN { get; set; }
    public bool IsEnabled { get; set; }
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public int? ManufactorId { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public bool ForAllManufactors { get; set; }
    public ModelWithYearsOfIssueDto[] Models { get; set; } = null!;
    public IEnumerable<ProductPriceDto> Prices { get; set; } = null!;
    public IEnumerable<ProductSaleHistory> SaleHistories { get; set; } = null!;
}

public class ProductPriceDto
{
    public string Date { get; set; } = null!;
    public decimal Value { get; set; }
}

public class ProductSaleHistory
{
    public string Month { get; set; } = null!;
    public int Quantity { get; set; }
}