using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Models.Commands.Update;

public class UpdateModelCommand : IRequest
{
    public int Id { get; set; }
    public string? Manufactor { get; set; }
    public string? Model { get; set; }
    public int YearOfIssue { get; set; }
}

public class UpdateModelCommandHandler : IRequestHandler<UpdateModelCommand, Unit>
{
    private readonly IModelRepository carRepo;
    private readonly IMapper mapper;

    public UpdateModelCommandHandler(IModelRepository carRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.mapper = mapper;
    }

    public async Task<Unit> Handle(UpdateModelCommand request, CancellationToken cancellationToken)
    {
        Model? model = await carRepo.GetById(request.Id);

        if (model == null)
            throw new NotFoundException("Car with the provided id was not found.");

        mapper.Map(request, model);
        await carRepo.Update(model);

        return Unit.Value;
    }
}