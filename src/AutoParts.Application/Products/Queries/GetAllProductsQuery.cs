using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Products.Queries;

public class GetAllProductsQuery : IRequest<ProductForAutocompleteDto[]>
{

}

public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, ProductForAutocompleteDto[]>
{
    private readonly IProductRepository repository;
    private readonly IMapper mapper;

    public GetAllProductsQueryHandler(IProductRepository repository, IMapper mapper)
    {
        this.repository = repository;
        this.mapper = mapper;
    }

    public async Task<ProductForAutocompleteDto[]> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        return await repository.GetAllForAutocomplete();
    }
}