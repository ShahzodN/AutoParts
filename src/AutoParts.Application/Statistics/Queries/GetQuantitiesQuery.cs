using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;
public class GetQuantitiesQuery : IRequest<QuantitiesDto>
{

}

public class GetQuantitiesHandler : IRequestHandler<GetQuantitiesQuery, QuantitiesDto>
{

    public GetQuantitiesHandler(ICategoryRepository categoryRepo,
                                IProductRepository productRepo,
                                IManufactorRepository manufactorRepo)
    {
        this.categoryRepo = categoryRepo;
        this.productRepo = productRepo;
        this.manufactorRepo = manufactorRepo;
    }

    private readonly ICategoryRepository categoryRepo;
    private readonly IProductRepository productRepo;
    private readonly IManufactorRepository manufactorRepo;

    public async Task<QuantitiesDto> Handle(GetQuantitiesQuery request, CancellationToken cancellationToken)
    {
        int categories = (await categoryRepo.GetAll()).Count;
        int products = (await productRepo.GetAll()).Count;
        int marks = (await manufactorRepo.GetAll()).Count;
        int models = 0;
        (await manufactorRepo.GetAll()).ForEach(x => models += x.Models.Count);

        return new QuantitiesDto()
        {
            Categories = categories,
            Products = products,
            Marks = marks,
            Models = models
        };
    }
}