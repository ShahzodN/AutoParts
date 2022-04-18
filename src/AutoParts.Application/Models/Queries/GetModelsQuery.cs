using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Enums;
using MediatR;

namespace AutoParts.Application.Models.Queries;

public class GetModelsQuery : IRequest<List<ModelDto>>
{
    public GetModelsQuery(string manufactor) => Manufactor = manufactor;
    public string? Manufactor { get; set; }
}

public class GetModelsQueryHandler : IRequestHandler<GetModelsQuery, List<ModelDto>>
{
    private readonly ICarRepository carRepo;
    private readonly IMapper mapper;

    public GetModelsQueryHandler(ICarRepository carRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.mapper = mapper;
    }

    public async Task<List<ModelDto>> Handle(GetModelsQuery request, CancellationToken cancellationToken)
    {
        var cars = await carRepo.GetAll(s => s.Manufactor.Name!.ToLower() == request.Manufactor!.ToLower());

        if (cars == null)
            throw new NotFoundException("Manufactor not found");

        var groupedByModel = cars.GroupBy(s => s.Model).Select(s => new
        {
            Model = s.Key,
            Manufactor = s.First().Manufactor.Name,
            Years = s.GroupBy(car => car.YearOfIssue)
                        .Select(g => new
                        {
                            Year = g.Key,
                            Models = g.Select(c => new { Id = c.Id, BodyType = Enum.GetName<BodyType>(c.BodyType)! })
                        })
        });

        var carDtos = new List<ModelDto>();

        foreach (var g in groupedByModel)
        {
            var carDto = new ModelDto();

            carDto.ModelName = g.Model;
            carDto.Manufactor = g.Manufactor;

            foreach (var y in g.Years)
            {
                var yearDto = new SpecificModel();
                yearDto.YearOfIssue = y.Year;

                foreach (var m in y.Models)
                    yearDto.Bodies.Add(new(m.Id, m.BodyType));

                carDto.SpecificModels.Add(yearDto);
            }

            carDtos.Add(carDto);
        }

        return carDtos;
    }
}