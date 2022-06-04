using AutoParts.Application.Products.Queries;

namespace AutoParts.Application.Statistics.Queries;
public class StatisticsDto
{
    public IEnumerable<object>? Workers { get; set; }
    public int TodaySales { get; set; }
    public decimal SaleAvarage { get; set; }
    public QuantitiesDto? Quantities { get; set; }
    public IEnumerable<LowBalanceProductDto>? PopularProducts { get; set; }
    public IEnumerable<LowBalanceProductDto>? UnpopularProducts { get; set; }
    public IEnumerable<LowBalanceProductDto>? LowBalanceProducts { get; set; }
    public IEnumerable<CategoryProductsQuantityDto>? CategoriesPercentage { get; set; }
    public IEnumerable<CategoryProductsQuantityDto>? CategoriesSalePercentage { get; set; }
    public IEnumerable<MarksPercentageDto>? MarksPercentage { get; set; }
    public IEnumerable<MarksPercentageDto>? MarksSalePercentage { get; set; }
}