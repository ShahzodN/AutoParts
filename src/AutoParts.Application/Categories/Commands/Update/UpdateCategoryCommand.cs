using AutoMapper;
using AutoParts.Application.Categories.Queries;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Categories.Commands.Update;

public class UpdateCategoryCommand : IRequest<CategoryDto>
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Image { get; set; }
}

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, CategoryDto>
{
    private readonly IMapper mapper;
    private readonly ICategoryRepository categoryRepo;

    public UpdateCategoryCommandHandler(IMapper mapper, ICategoryRepository categoryRepo)
    {
        this.mapper = mapper;
        this.categoryRepo = categoryRepo;
    }

    public async Task<CategoryDto> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        Category? category = await categoryRepo.GetById(request.Id);

        if (category == null)
            throw new NotFoundException("Category with provided id was not found.");

        mapper.Map(request, category);
        await categoryRepo.Update(category);

        return mapper.Map<CategoryDto>(category);
    }
}
