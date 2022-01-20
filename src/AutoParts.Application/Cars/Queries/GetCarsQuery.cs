using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Cars.Queries;

public class GetCarsQuery : IRequest<List<CarDto>>
{

}

public class GetCarsQueryHandler : IRequestHandler<GetCarsQuery, List<CarDto>>
{
    private readonly ICarRepository carRepo;
    private readonly IMapper mapper;

    public GetCarsQueryHandler(ICarRepository carRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.mapper = mapper;
    }

    public async Task<List<CarDto>> Handle(GetCarsQuery request, CancellationToken cancellationToken)
    {
        var cars = await carRepo.GetAll();
        return mapper.Map<List<CarDto>>(cars);
    }
}