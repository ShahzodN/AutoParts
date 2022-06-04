using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;
public class GetCategoriesPercentageQuery : IRequest<IEnumerable<CategoryProductsQuantityDto>>
{

}

public class GetCategoriesPercentageHandler : IRequestHandler<GetCategoriesPercentageQuery, IEnumerable<CategoryProductsQuantityDto>>
{
    private readonly ICategoryRepository categoryRepo;

    public GetCategoriesPercentageHandler(ICategoryRepository categoryRepo)
    {
        this.categoryRepo = categoryRepo;
    }

    public async Task<IEnumerable<CategoryProductsQuantityDto>> Handle(GetCategoriesPercentageQuery request, CancellationToken cancellationToken)
    {
        var categories = await categoryRepo.GetAll();
        return categories.Select(x => new CategoryProductsQuantityDto() { Category = x.Name, Quantity = x.Products.Count });
    }
}