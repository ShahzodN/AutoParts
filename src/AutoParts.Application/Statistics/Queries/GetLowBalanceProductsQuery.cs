using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;

public class GetLowBalanceProductsQuery : IRequest<IEnumerable<LowBalanceProductDto>>
{

}

public class GetLowBalanceProductsHandler : IRequestHandler<GetLowBalanceProductsQuery, IEnumerable<LowBalanceProductDto>>
{
    private readonly IProductRepository productRepo;
    private readonly IMapper mapper;

    public GetLowBalanceProductsHandler(IProductRepository productRepo, IMapper mapper)
    {
        this.productRepo = productRepo;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<LowBalanceProductDto>> Handle(GetLowBalanceProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepo.GetAll(x => x.Quantity < 10);
        return mapper.Map<IEnumerable<LowBalanceProductDto>>(products);
    }
}