using System.Text.Json.Serialization;
using AutoMapper;
using AutoParts.Application.Attributes;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using AutoParts.Domain.Enums;
using MediatR;

namespace AutoParts.Application.Models.Commands.Create;

public class CreateModelCommand : IRequest
{
    public string? Manufactor { get; set; }
    public string? Model { get; set; }
    public int YearOfIssue { get; set; }

    [JsonConverter(typeof(BodyTypeConverter))]
    public BodyType BodyType { get; set; }
}

public class CreateModelCommandHandler : IRequestHandler<CreateModelCommand>
{
    private readonly ICarRepository carRepo;
    private readonly IManufactorRepository manufactorRepo;
    private readonly IMapper mapper;

    public CreateModelCommandHandler(ICarRepository carRepo, IManufactorRepository manufactorRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.manufactorRepo = manufactorRepo;
        this.mapper = mapper;
    }

    public async Task<Unit> Handle(CreateModelCommand request, CancellationToken cancellationToken)
    {
        var manufactor = await manufactorRepo.GetByName(request.Manufactor!);
        if (manufactor == null)
            throw new NotFoundException("Manufactor with provided name was not found");

        Car car = mapper.Map<Car>(request);

        car.Manufactor = manufactor;
        await carRepo.Create(car);

        return Unit.Value;
    }
}
