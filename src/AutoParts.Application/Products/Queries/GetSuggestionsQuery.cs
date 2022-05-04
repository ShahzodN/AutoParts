using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Products.Queries;

public class GetSuggestionsQuery : IRequest<ProductForAutocompleteDto[]>
{
    public GetSuggestionsQuery(string productName) => ProductName = productName;

    public string ProductName { get; }
}

public class GetSuggestionsQueryHandler : IRequestHandler<GetSuggestionsQuery, ProductForAutocompleteDto[]>
{
    private readonly IProductRepository productRepo;

    public GetSuggestionsQueryHandler(IProductRepository productRepo)
    {
        this.productRepo = productRepo;
    }

    public async Task<ProductForAutocompleteDto[]> Handle(GetSuggestionsQuery request, CancellationToken cancellationToken)
    {
        return await productRepo.GetAllForAutocomplete(request.ProductName);
    }
}