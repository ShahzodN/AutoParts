using AutoMapper;
using AutoParts.Application.Categories.Queries;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Categories.Commands.Create;

public class CreateCategoryCommand : IRequest<CategoryDto>
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Image { get; set; }
}

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    private readonly IMapper mapper;
    private readonly ICategoryRepository categoryRepo;

    public CreateCategoryCommandHandler(IMapper mapper, ICategoryRepository categoryRepo)
    {
        this.mapper = mapper;
        this.categoryRepo = categoryRepo;
    }

    public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        Category category = await categoryRepo.Create(mapper.Map<Category>(request));

        return mapper.Map<CategoryDto>(category);
    }
}
