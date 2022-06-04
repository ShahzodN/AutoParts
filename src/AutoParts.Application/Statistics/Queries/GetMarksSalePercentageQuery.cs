using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;

public class GetMarksSalePercentageQuery : IRequest<IEnumerable<MarksPercentageDto>>
{

}

public class GetMarksSalePercentageHandler : IRequestHandler<GetMarksSalePercentageQuery, IEnumerable<MarksPercentageDto>>
{
    private readonly IManufactorRepository manufactorRepo;

    public GetMarksSalePercentageHandler(IManufactorRepository manufactorRepo)
    {
        this.manufactorRepo = manufactorRepo;
    }

    public async Task<IEnumerable<MarksPercentageDto>> Handle(GetMarksSalePercentageQuery request, CancellationToken cancellationToken)
    {
        var marks = await manufactorRepo.GetAll();
        List<MarksPercentageDto> dtos = new();

        foreach (var m in marks)
        {
            int sum = 0;
            m.Models.ForEach(md =>
            {
                sum += md.Products.Sum(x => x.SaleDetails.Count);
            });
            dtos.Add(new() { Mark = m.Name, Quantity = sum });
        }

        return dtos;
    }
}