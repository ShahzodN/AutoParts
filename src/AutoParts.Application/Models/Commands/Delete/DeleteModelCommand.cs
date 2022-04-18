using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Models.Commands.Delete;

public class DeleteModelCommand : IRequest
{
    public DeleteModelCommand(int id) => Id = id;

    public int Id { get; private set; }
}

public class DeleteModelCommandHandler : IRequestHandler<DeleteModelCommand, Unit>
{
    private readonly IModelRepository carRepo;

    public DeleteModelCommandHandler(IModelRepository carRepo)
    {
        this.carRepo = carRepo;
    }

    public async Task<Unit> Handle(DeleteModelCommand request, CancellationToken cancellationToken)
    {
        await carRepo.Delete(request.Id);

        return Unit.Value;
    }
}