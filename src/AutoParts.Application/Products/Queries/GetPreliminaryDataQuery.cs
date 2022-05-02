using AutoMapper;
using AutoParts.Application.Categories.Queries;
using AutoParts.Application.Models.Queries;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Products.Queries;

public class GetPreliminaryDataQuery : IRequest<PreliminaryDataDto>
{

}

public class GetPreliminaryDataQueryHandler : IRequestHandler<GetPreliminaryDataQuery, PreliminaryDataDto>
{
    private readonly IManufactorRepository manufactorRepo;
    private readonly ICategoryRepository categoryRepo;
    private readonly IMapper mapper;

    public GetPreliminaryDataQueryHandler(IManufactorRepository manufactorRepo, ICategoryRepository categoryRepo, IMapper mapper)
    {
        this.manufactorRepo = manufactorRepo;
        this.categoryRepo = categoryRepo;
        this.mapper = mapper;
    }

    public async Task<PreliminaryDataDto> Handle(GetPreliminaryDataQuery request, CancellationToken cancellationToken)
    {
        PreliminaryDataDto data = new();

        data.Manufactors = mapper.Map<List<ManufactorDto>>(await manufactorRepo.GetAll());
        data.Categories = mapper.Map<List<CategoryDto>>(await categoryRepo.GetAll());

        return data;
    }
}