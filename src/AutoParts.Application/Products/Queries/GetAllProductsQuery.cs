using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Products.Queries;

public class GetAllProductsQuery : IRequest<ProductDto[]>
{
    public GetAllProductsQuery(int? page)
    {
        if (page != null)
            Page = (int)page;
    }

    public int Page { get; } = 1;
}

public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, ProductDto[]>
{
    private readonly IProductRepository productRepo;
    private readonly IMapper mapper;

    public GetAllProductsQueryHandler(IProductRepository productRepo, IMapper mapper)
    {
        this.productRepo = productRepo;
        this.mapper = mapper;
    }

    public async Task<ProductDto[]> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepo.GetPagedProducts((int)request.Page);

        return mapper.Map<ProductDto[]>(products);
    }
}