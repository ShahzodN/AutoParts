using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Interfaces;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Models.Commands.Delete;

public class DeleteManufactorCommand : IRequest
{
    public DeleteManufactorCommand(int id) => Id = id;

    public int Id { get; }
}

public class DeleteManufactorCommandHandler : IRequestHandler<DeleteManufactorCommand>
{
    private readonly IManufactorRepository manufactorRepo;
    private readonly IMapper mapper;
    private readonly IImageService imageService;

    public DeleteManufactorCommandHandler(IManufactorRepository manufactorRepo, IImageService imageService, IMapper mapper)
    {
        this.manufactorRepo = manufactorRepo;
        this.mapper = mapper;
        this.imageService = imageService;
    }

    public async Task<Unit> Handle(DeleteManufactorCommand request, CancellationToken cancellationToken)
    {
        var manufactor = await manufactorRepo.GetById(request.Id);

        if (manufactor == null)
            throw new NotFoundException("Manufactor with provided id was not found.");

        imageService.DeleteImage(manufactor.Image!.Name);

        await manufactorRepo.Delete(request.Id);

        return Unit.Value;
    }
}