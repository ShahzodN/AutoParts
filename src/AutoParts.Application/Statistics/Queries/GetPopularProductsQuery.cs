using AutoMapper;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;
public class GetPopularProductsQuery : IRequest<IEnumerable<LowBalanceProductDto>>
{

}

public class GetPopularProductsHandler : IRequestHandler<GetPopularProductsQuery, IEnumerable<LowBalanceProductDto>>
{
    public GetPopularProductsHandler(ISaleRepository saleRepo, IMapper mapper)
    {
        this.saleRepo = saleRepo;
        this.mapper = mapper;
    }

    private readonly IMapper mapper;
    private readonly ISaleRepository saleRepo;

    public async Task<IEnumerable<LowBalanceProductDto>> Handle(GetPopularProductsQuery request, CancellationToken cancellationToken)
    {
        var sales = await saleRepo.GetAll();
        var productsDict = new Dictionary<Product, int>();

        foreach (var sale in sales)
        {
            sale.SaleDetails.ForEach(sd =>
            {
                if (!productsDict.ContainsKey(sd.Product))
                    productsDict.Add(sd.Product, sd.Quantity);
                else
                    productsDict[sd.Product] += sd.Quantity;
            });
        }

        productsDict = productsDict.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, y => y.Value);
        var top_5 = productsDict.Take(5);

        var dtos = top_5.Select(x => new LowBalanceProductDto()
        {
            Name = x.Key.Name,
            Quantity = x.Value
        });

        return dtos;
    }
}