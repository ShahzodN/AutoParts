using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Cars.Queries;

public class GetCarQuery : IRequest<CarDto>
{
    public GetCarQuery(int id) => Id = id;

    public int Id { get; init; }
}

public class GetCarQueryHandler : IRequestHandler<GetCarQuery, CarDto>
{
    private readonly ICarRepository carRepo;
    private readonly IMapper mapper;

    public GetCarQueryHandler(ICarRepository carRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.mapper = mapper;
    }

    public async Task<CarDto> Handle(GetCarQuery request, CancellationToken cancellationToken)
    {
        Car? car = await carRepo.GetById(request.Id);

        return car is null ?
            throw new NotFoundException("Car with the provided id was not found.") :
            mapper.Map<CarDto>(car);
    }
}
