using AutoMapper;
using AutoParts.Application.Interfaces;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Cars.Commands.Create;
public class CreateManufactorCommand : IRequest
{
    public string? Name { get; set; }
    public string Image { get; set; } = null!;
}

public class CreateManufactorCommandHandler : IRequestHandler<CreateManufactorCommand>
{
    private readonly IManufactorRepository manufactorRepo;
    private readonly IMapper mapper;
    private readonly IImageService imageService;

    public CreateManufactorCommandHandler(IManufactorRepository manufactorRepo, IMapper mapper, IImageService imageService)
    {
        this.manufactorRepo = manufactorRepo;
        this.mapper = mapper;
        this.imageService = imageService;
    }

    public async Task<Unit> Handle(CreateManufactorCommand request, CancellationToken cancellationToken)
    {
        Manufactor manufactor = await manufactorRepo.Create(mapper.Map<Manufactor>(request));

        Image image = await imageService.SetImages(manufactor, request.Image);
        manufactor.Image = image;

        await manufactorRepo.Update(manufactor);

        return Unit.Value;
    }
}