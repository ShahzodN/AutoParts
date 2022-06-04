using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;
public class GetSaleAvarageQuery : IRequest<decimal>
{

}

public class GetSaleAverageHandler : IRequestHandler<GetSaleAvarageQuery, decimal>
{
    private readonly ISaleRepository saleRepo;

    public GetSaleAverageHandler(ISaleRepository saleRepo)
    {
        this.saleRepo = saleRepo;
    }

    public async Task<decimal> Handle(GetSaleAvarageQuery request, CancellationToken cancellationToken)
    {
        var sales = await saleRepo.GetAll();
        return sales.Count == 0 ? 0 : sales.Average(x => x.Sum);
    }
}