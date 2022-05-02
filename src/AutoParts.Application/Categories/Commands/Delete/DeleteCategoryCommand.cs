using AutoMapper;
using AutoParts.Application.Interfaces;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Categories.Commands.Delete;

public class DeleteCategoryCommand : IRequest
{
    public DeleteCategoryCommand(int id) => Id = id;

    public int Id { get; }
}

public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Unit>
{
    private readonly IMapper mapper;
    private readonly ICategoryRepository categoryRepo;
    private readonly IImageService imageService;

    public DeleteCategoryCommandHandler(IMapper mapper, ICategoryRepository categoryRepo, IImageService imageService)
    {
        this.mapper = mapper;
        this.categoryRepo = categoryRepo;
        this.imageService = imageService;
    }

    public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        await categoryRepo.Delete(request.Id);

        return Unit.Value;
    }
}
