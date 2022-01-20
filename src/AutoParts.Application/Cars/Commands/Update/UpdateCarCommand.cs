using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Cars.Commands.Update;

public class UpdateCarCommand : IRequest
{
    public int Id { get; set; }
    public string? Manufactor { get; set; }
    public string? Model { get; set; }
    public int YearOfIssue { get; set; }

}

public class UpdateCarCommandHandler : IRequestHandler<UpdateCarCommand, Unit>
{
    private readonly ICarRepository carRepo;
    private readonly IMapper mapper;

    public UpdateCarCommandHandler(ICarRepository carRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.mapper = mapper;
    }

    public async Task<Unit> Handle(UpdateCarCommand request, CancellationToken cancellationToken)
    {
        Car? car = await carRepo.GetById(request.Id);

        if (car == null)
            throw new NotFoundException("Car with the provided id was not found.");

        mapper.Map(request, car);
        await carRepo.Update(car);

        return Unit.Value;
    }
}