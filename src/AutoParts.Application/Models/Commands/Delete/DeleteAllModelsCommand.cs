using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Models.Commands.Delete;
public class DeleteAllModelsCommand : IRequest
{
    public DeleteAllModelsCommand(string model) => Model = model;

    public string Model { get; }
}

public class DeleteAllModelsCommandHandler : IRequestHandler<DeleteAllModelsCommand, Unit>
{
    private readonly ICarRepository carRepo;

    public DeleteAllModelsCommandHandler(ICarRepository carRepo)
    {
        this.carRepo = carRepo;
    }

    public async Task<Unit> Handle(DeleteAllModelsCommand request, CancellationToken cancellationToken)
    {
        await carRepo.Delete(request.Model);

        return Unit.Value;
    }
}