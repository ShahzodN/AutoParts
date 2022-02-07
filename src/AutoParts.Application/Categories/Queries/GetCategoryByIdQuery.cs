using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Categories.Queries;

public class GetCategoryByIdQuery : IRequest<CategoryDto>
{
    public GetCategoryByIdQuery(int id) => Id = id;

    public int Id { get; }
}

public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
{
    private readonly IMapper mapper;
    private readonly ICategoryRepository categoryRepo;

    public GetCategoryByIdQueryHandler(IMapper mapper, ICategoryRepository categoryRepo)
    {
        this.mapper = mapper;
        this.categoryRepo = categoryRepo;
    }

    public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        Category? category = await categoryRepo.GetById(request.Id);

        if (category == null)
            throw new NotFoundException("Category with provided id was not found");

        return mapper.Map<CategoryDto>(category);
    }
}