using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;
public class GetMarksPercentageQuery : IRequest<IEnumerable<MarksPercentageDto>>
{

}

public class GetMarksPercentageHandler : IRequestHandler<GetMarksPercentageQuery, IEnumerable<MarksPercentageDto>>
{
    private readonly IManufactorRepository manufactorRepo;

    public GetMarksPercentageHandler(IManufactorRepository manufactorRepo)
    {
        this.manufactorRepo = manufactorRepo;
    }

    public async Task<IEnumerable<MarksPercentageDto>> Handle(GetMarksPercentageQuery request, CancellationToken cancellationToken)
    {
        var manufactors = await manufactorRepo.GetAll();
        return manufactors.Select(x => new MarksPercentageDto() { Mark = x.Name, Quantity = x.Models.Sum(z => z.Products.Count) });
    }
}