using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Reports.Queries;
public class GetSalesReportQuery : IRequest<SalesReportDto>
{
    public GetSalesReportQuery(DateTime date) => Date = date;

    public DateTime Date { get; }
}

public class GetSalesReportHandler : IRequestHandler<GetSalesReportQuery, SalesReportDto>
{
    public GetSalesReportHandler(ISaleRepository saleRepo)
    {
        this.saleRepo = saleRepo;
    }

    private readonly ISaleRepository saleRepo;

    public async Task<SalesReportDto> Handle(GetSalesReportQuery request, CancellationToken cancellationToken)
    {
        var sales = await saleRepo.GetAll(x => x.SaleTime.Month == request.Date.Month);

        List<ProductInSaleReportDto> products = new();

        foreach (var s in sales)
        {
            s.SaleDetails.ForEach(x =>
            {
                if (!products.Any(d => d.Name == x.Product.Name))
                    products.Add(new()
                    {
                        Name = x.Product.Name,
                        Quantity = x.Quantity,
                        CostPrice = x.Product.CostPrice,
                        Price = x.Product.LastPrice,
                        Revenue = x.Quantity * x.Product.LastPrice,
                        CostPriceSum = x.Product.CostPrice * x.Quantity,
                        Income = (x.Quantity * x.Product.LastPrice) - (x.Product.CostPrice * x.Quantity)
                    });
                else
                {
                    var product = products.First(d => d.Name == x.Product.Name);
                    product.Quantity += x.Quantity;
                    product.Revenue = product.Quantity * product.Price;
                    product.CostPriceSum = product.CostPrice * product.Quantity;
                    product.Income = product.Revenue - product.CostPriceSum;
                }
            });
        }

        var dto = new SalesReportDto()
        {
            Products = products,
            IncomeSum = products.Sum(x => x.Income),
            QuantitySum = products.Sum(x => x.Quantity),
            RevenueSum = products.Sum(x => x.Revenue)
        };

        return dto;
    }
}