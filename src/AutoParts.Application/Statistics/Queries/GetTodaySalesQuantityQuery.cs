using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;
public class GetTodaySalesQuantityQuery : IRequest<int>
{

}

public class GetTodaySalesQuantityHandler : IRequestHandler<GetTodaySalesQuantityQuery, int>
{
    private readonly ISaleRepository saleRepo;

    public GetTodaySalesQuantityHandler(ISaleRepository saleRepo)
    {
        this.saleRepo = saleRepo;
    }

    public async Task<int> Handle(GetTodaySalesQuantityQuery request, CancellationToken cancellationToken)
    {
        var sales = await saleRepo.GetAll(x => x.SaleTime.Date == DateTime.Today);
        return sales.Count;
    }
}