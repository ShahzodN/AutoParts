using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Sales.Queries;

public class GetSaleDetailsQuery : IRequest<SaleDetailsDto>
{
    public GetSaleDetailsQuery(int id) => Id = id;

    public int Id { get; }
}

public class GetSaleDetailsQueryHandler : IRequestHandler<GetSaleDetailsQuery, SaleDetailsDto>
{
    private readonly ISaleRepository saleRepo;

    public GetSaleDetailsQueryHandler(ISaleRepository saleRepo)
    {
        this.saleRepo = saleRepo;
    }

    public async Task<SaleDetailsDto> Handle(GetSaleDetailsQuery request, CancellationToken cancellationToken)
    {
        var sale = await saleRepo.GetById(request.Id);

        if (sale == null)
            throw new NotFoundException("Sale with provided Id was not found");

        var saleDetailsDto = new SaleDetailsDto()
        {
            DateTime = sale.SaleTime.ToString("dd-MM-yyyy hh:mm"),
            Seller = sale.Seller.FullName,
            Products = sale.SaleDetails.Select(x => new ProductInСheck(x.Product.Name, x.Product.Price, x.Quantity, x.Product.EAN)).ToList(),
            Taken = sale.Taken,
            Change = sale.Change,
            Sum = sale.Sum
        };

        return saleDetailsDto;
    }
}