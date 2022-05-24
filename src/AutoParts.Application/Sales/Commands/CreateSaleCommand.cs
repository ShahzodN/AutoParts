using AutoMapper;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Sales.Commands;

public class CreateSaleCommand : IRequest
{
    public ProductWithQuantity[] Products { get; set; } = null!;
}

public record ProductWithQuantity(int productId, int quantity);

public class CreateSaleCommandHandler : IRequestHandler<CreateSaleCommand, Unit>
{
    private readonly ISaleRepository saleRepo;
    private readonly IProductRepository productRepo;
    private readonly IMapper mapper;

    public CreateSaleCommandHandler(ISaleRepository saleRepo, IProductRepository productRepo, IMapper mapper)
    {
        this.saleRepo = saleRepo;
        this.productRepo = productRepo;
        this.mapper = mapper;
    }

    public async Task<Unit> Handle(CreateSaleCommand request, CancellationToken cancellationToken)
    {
        var ids = request.Products.Select(p => p.productId);
        var products = await productRepo.GetAll(s => ids.Contains(s.Id));

        if (request.Products.Length != products.Count)
            throw new Exception("Что пошло не так! Обратитесь в техническую поддержку.");

        products.ForEach(p => p.Count -= request.Products.First(rp => rp.productId == p.Id).quantity);

        Sale sale = new() { SaleTime = DateTime.Now };
        sale.SaleDetails = request.Products.Select(p => new SaleDetails()
        {
            ProductId = p.productId,
            Quantity = p.quantity,
            SaleId = sale.Id
        }).ToList();

        await saleRepo.Create(sale);
        productRepo.UpdateRange(products.ToArray());

        return Unit.Value;
    }
}