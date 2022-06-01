using System.Globalization;
using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Models.Queries;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Products.Queries;

public class GetProductQuery : IRequest<ProductDetailsDto>
{
    public GetProductQuery(int id) => Id = id;
    public int Id { get; }
}

public class GetProductQueryHandler : IRequestHandler<GetProductQuery, ProductDetailsDto>
{
    public GetProductQueryHandler(IProductRepository productRepo, IManufactorRepository manufactorRepo, IMapper mapper)
    {
        this.productRepo = productRepo;
        this.manufactorRepo = manufactorRepo;
        this.mapper = mapper;
    }

    private readonly IProductRepository productRepo;
    private readonly IManufactorRepository manufactorRepo;
    private readonly IMapper mapper;

    public async Task<ProductDetailsDto> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        var product = await productRepo.GetById(request.Id);

        if (product == null)
            throw new NotFoundException("Product with provided id was not found");

        var saleHistories = new List<ProductSaleHistory>();

        for (int i = 1; i <= 12; i++)
        {
            var salesQuantity = product.SaleDetails.Where(x => x.Sale.SaleTime.Month == i).Count();
            saleHistories.Add(new() { Quantity = salesQuantity, Month = new DateTime(1, i, 1).ToString("MMM", new CultureInfo("ru-RU")) });
        }

        var productDetails = new ProductDetailsDto()
        {
            CategoryId = product.CategoryId,
            CategoryName = product.Category.Name,
            Description = product.Description,
            Name = product.Name,
            ForAllManufactors = product.Models.Count == 0,
            ManufactorId = product.Models.Count == 0 ? null : product.Models[0].ManufactorId,
            Id = product.Id,
            Image = product.Image?.Name,
            IsEnabled = product.IsEnabled,
            Price = product.Prices.OrderByDescending(x => x.DateTime).First().Value,
            EAN = product.EAN,
            Prices = product.Prices.Select(x => new ProductPriceDto() { Date = x.DateTime.ToString("dd-MM-yyyy"), Value = x.Value }),
            SaleHistories = saleHistories
        };

        var dtos = product.Models.GroupBy(x => x.ModelName)
                                    .Select(g =>
                                    {
                                        var dto = new ModelWithYearsOfIssueDto();
                                        dto.Model = g.Key;

                                        foreach (var m in g)
                                            dto.YearsOfIssue.Add(m.YearOfIssue);

                                        return dto;
                                    }).ToArray();

        productDetails.Models = dtos;

        return productDetails;
    }
}