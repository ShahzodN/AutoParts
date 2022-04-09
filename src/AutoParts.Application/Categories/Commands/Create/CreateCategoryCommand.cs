using AutoMapper;
using AutoParts.Application.Categories.Queries;
using AutoParts.Application.Interfaces;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Categories.Commands.Create;

public class CreateCategoryCommand : IRequest<CategoryDto>
{
    public string? Name { get; set; }
    public string? Image { get; set; }
}

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    private readonly IMapper mapper;
    private readonly ICategoryRepository categoryRepo;
    private readonly IImageService imageService;

    public CreateCategoryCommandHandler(IMapper mapper, ICategoryRepository categoryRepo, IImageService imageService)
    {
        this.mapper = mapper;
        this.categoryRepo = categoryRepo;
        this.imageService = imageService;
    }

    public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        Category category = await categoryRepo.Create(mapper.Map<Category>(request));

        Image image = await imageService.SetImages(category, request.Image!);
        category.Image = image;
        image.CategoryId = category.Id;

        await categoryRepo.Update(category);
        return mapper.Map<CategoryDto>(category);
    }
}
