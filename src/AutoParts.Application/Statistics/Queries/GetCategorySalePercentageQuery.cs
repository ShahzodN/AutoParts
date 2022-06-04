using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;
public class GetCategorySalePercentageQuery : IRequest<IEnumerable<CategoryProductsQuantityDto>>
{

}

public class GetCategorySalePercentageHandler : IRequestHandler<GetCategorySalePercentageQuery, IEnumerable<CategoryProductsQuantityDto>>
{
    private readonly ICategoryRepository categoryRepo;

    public GetCategorySalePercentageHandler(ICategoryRepository categoryRepo)
    {
        this.categoryRepo = categoryRepo;
    }

    public async Task<IEnumerable<CategoryProductsQuantityDto>> Handle(GetCategorySalePercentageQuery request, CancellationToken cancellationToken)
    {
        var categories = await categoryRepo.GetAll();

        return categories.Select(x => new CategoryProductsQuantityDto()
        {
            Category = x.Name,
            Quantity = x.Products.Sum(z => z.SaleDetails.Count)
        });
    }
}