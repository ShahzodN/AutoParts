using AutoMapper;
using AutoParts.Application.Cars.Queries;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Cars.Commands.Create;

public class CreateCarCommand : IRequest<CarDto>
{
    public string? Manufactor { get; set; }
    public string? Model { get; set; }
    public int YearOfIssue { get; set; }
}

public class CreateCarCommandHandler : IRequestHandler<CreateCarCommand, CarDto>
{
    private readonly ICarRepository carRepo;
    private readonly IMapper mapper;

    public CreateCarCommandHandler(ICarRepository carRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.mapper = mapper;
    }

    public async Task<CarDto> Handle(CreateCarCommand request, CancellationToken cancellationToken)
    {
        Car car = mapper.Map<Car>(request);
        car = await carRepo.Create(car);

        return mapper.Map<CarDto>(car);
    }
}
