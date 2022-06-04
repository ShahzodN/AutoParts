using MediatR;

namespace AutoParts.Application.Statistics.Queries;
public class GetStatisticsQuery : IRequest<StatisticsDto>
{

}

public class GetStatisticsHandler : IRequestHandler<GetStatisticsQuery, StatisticsDto>
{
    private readonly IMediator mediator;

    public GetStatisticsHandler(IMediator mediator)
    {
        this.mediator = mediator;
    }

    public async Task<StatisticsDto> Handle(GetStatisticsQuery request, CancellationToken cancellationToken)
    {
        StatisticsDto dto = new();

        dto.Workers = await mediator.Send(new GetTodayWorkersQuery());
        dto.TodaySales = await mediator.Send(new GetTodaySalesQuantityQuery());
        dto.SaleAvarage = await mediator.Send(new GetSaleAvarageQuery());
        dto.Quantities = await mediator.Send(new GetQuantitiesQuery());
        dto.LowBalanceProducts = await mediator.Send(new GetLowBalanceProductsQuery());
        dto.PopularProducts = await mediator.Send(new GetPopularProductsQuery());
        dto.CategoriesPercentage = await mediator.Send(new GetCategoriesPercentageQuery());
        dto.CategoriesSalePercentage = await mediator.Send(new GetCategorySalePercentageQuery());
        dto.MarksPercentage = await mediator.Send(new GetMarksPercentageQuery());
        dto.MarksSalePercentage = await mediator.Send(new GetMarksSalePercentageQuery());

        return dto;
    }
}