using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Sales.Commands;

public class CreateSaleCommand : IRequest
{
    public ProductWithQuantity[] Products { get; set; } = null!;
    public string Seller { get; set; } = null!;
}

public record ProductWithQuantity(int Id, int Quantity);

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
        var ids = request.Products.Select(p => p.Id).ToArray();
        var products = await productRepo.GetAll(s => ids.Contains(s.Id));

        if (request.Products.Length != products.Count)
            throw new BusinessLogicException("Что-то пошло не так! Обратитесь в техническую поддержку.");

        products.ForEach(p =>
        {
            if (p.Count - request.Products.First(rp => rp.Id == p.Id).Quantity < 0)
                throw new BusinessLogicException($"Некорректное количество у товара с артикулом {p.EAN}");

            p.Count -= request.Products.First(rp => rp.Id == p.Id).Quantity;
        });

        Sale sale = new() { Seller = request.Seller, SaleTime = DateTime.Now };
        sale.SaleDetails = request.Products.Select(p => new SaleDetails()
        {
            ProductId = p.Id,
            Quantity = p.Quantity,
            SaleId = sale.Id
        }).ToList();

        await saleRepo.Create(sale);
        productRepo.UpdateRange(products.ToArray());

        return Unit.Value;
    }
}