using AutoMapper;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Categories.Queries;

public class GetAllCategoriesQuery : IRequest<List<CategoryDto>>
{

}

public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, List<CategoryDto>>
{
    private readonly IMapper mapper;
    private readonly ICategoryRepository categoryRepo;

    public GetAllCategoriesQueryHandler(IMapper mapper, ICategoryRepository categoryRepo)
    {
        this.mapper = mapper;
        this.categoryRepo = categoryRepo;
    }

    public async Task<List<CategoryDto>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        List<Category> categories = await categoryRepo.GetAll();

        return mapper.Map<List<CategoryDto>>(categories);
    }
}