using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Reports.Queries;
public class GetBalanceReportQuery : IRequest<BalanceReportDto>
{
    public GetBalanceReportQuery(DateTime date) => Date = date;
    public DateTime Date { get; set; }
}

public class GetBalanceReportHandler : IRequestHandler<GetBalanceReportQuery, BalanceReportDto>
{
    private readonly IProductRepository productRepo;

    public GetBalanceReportHandler(IProductRepository productRepo)
    {
        this.productRepo = productRepo;
    }

    public async Task<BalanceReportDto> Handle(GetBalanceReportQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepo.GetAll();

        var productsDto = products.Select(x => new
        {
            Name = x.Name,
            Quantity = x.Quantity,
            LastDelivery = x.ConsignmentDetails.OrderByDescending(cd => cd.Consignment?.Date).First()?.Consignment?.Date.ToString("dd-MM-yyyy")
        }).ToList();

        return new BalanceReportDto() { Products = productsDto };
    }
}