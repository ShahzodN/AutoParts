using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Products.Queries;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Sales.Queries;

public class GetProductQuery : IRequest<ProductDto>
{
    public GetProductQuery(string ean) => EAN = ean;

    public string EAN { get; }
}

public class GetProductQueryHandler : IRequestHandler<GetProductQuery, ProductDto>
{
    private readonly IProductRepository productRepo;
    private readonly IMapper mapper;

    public GetProductQueryHandler(IProductRepository productRepo, IMapper mapper)
    {
        this.productRepo = productRepo;
        this.mapper = mapper;
    }

    public async Task<ProductDto> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        var product = await productRepo.GetByEAN(request.EAN);

        if (product == null)
            throw new NotFoundException("Product with provided EAN was not found");

        return mapper.Map<ProductDto>(product);
    }
}