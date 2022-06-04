using System.Linq.Expressions;
using AutoMapper;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Products.Queries;

public class GetFilteredProductsQuery : IRequest<ProductDto[]>
{
    public GetFilteredProductsQuery(int[]? categoriesId = null,
                                    int[]? manufactorsId = null,
                                    string[]? models = null,
                                    int? yearFrom = null,
                                    int? yearTo = null,
                                    int? priceFrom = null,
                                    int? priceTo = null)
    {
        CategoriesId = categoriesId;
        ManufactorsId = manufactorsId;
        Models = models;
        YearFrom = yearFrom;
        YearTo = yearTo;
        PriceFrom = priceFrom;
        PriceTo = priceTo;
    }

    public int[]? CategoriesId { get; }
    public int[]? ManufactorsId { get; }
    public string[]? Models { get; }
    public int? YearFrom { get; }
    public int? YearTo { get; }
    public int? PriceFrom { get; }
    public int? PriceTo { get; }
}

public class GetFilteredProductsHandler : IRequestHandler<GetFilteredProductsQuery, ProductDto[]>
{
    public GetFilteredProductsHandler(IProductRepository productRepo, IMapper mapper)
    {
        this.productRepo = productRepo;
        this.mapper = mapper;
    }

    private readonly IProductRepository productRepo;
    private readonly IMapper mapper;

    public async Task<ProductDto[]> Handle(GetFilteredProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepo.GetAll();

        if (request.CategoriesId != null && request.CategoriesId.Length != 0)
            products = products.Where(x => request.CategoriesId.Contains(x.CategoryId)).ToList();

        if (request.ManufactorsId != null && request.ManufactorsId.Length != 0)
            products = products.Where(x => x.Models.Any(m => request.ManufactorsId.Contains(m.ManufactorId))).ToList();

        if (request.Models != null && request.Models.Length != 0)
            products = products.Where(x => x.Models.Any(x => request.Models.Contains(x.ModelName))).ToList();

        if (request.YearFrom != null)
            products = products.Where(x => x.Models.Any(x => x.YearOfIssue >= request.YearFrom)).ToList();

        if (request.YearTo != null)
            products = products.Where(x => x.Models.Any(x => x.YearOfIssue <= request.YearTo)).ToList();

        if (request.PriceFrom != null)
            products = products.Where(x => x.LastPrice >= request.PriceFrom).ToList();

        if (request.PriceTo != null)
            products = products.Where(x => x.LastPrice <= request.PriceTo).ToList();

        return mapper.Map<ProductDto[]>(products);
    }
}