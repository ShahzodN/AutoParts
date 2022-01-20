using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Cars.Commands.Delete;

public class DeleteCarCommand : IRequest
{
    public DeleteCarCommand(int id) => Id = id;

    public int Id { get; private set; }
}

public class DeleteCarCommandHandler : IRequestHandler<DeleteCarCommand, Unit>
{
    private readonly ICarRepository carRepo;
    private readonly IMapper mapper;

    public DeleteCarCommandHandler(ICarRepository carRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.mapper = mapper;
    }

    public async Task<Unit> Handle(DeleteCarCommand request, CancellationToken cancellationToken)
    {
        await carRepo.Delete(request.Id);

        return Unit.Value;
    }
}