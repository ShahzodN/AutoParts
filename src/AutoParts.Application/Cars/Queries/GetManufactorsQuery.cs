using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Cars.Queries;

public class GetManufactorsQuery : IRequest<List<ManufactorDto>>
{

}

public class GetManufactorsQueryHandler : IRequestHandler<GetManufactorsQuery, List<ManufactorDto>>
{
    private readonly IManufactorRepository manufactorRepo;
    private readonly IMapper mapper;

    public GetManufactorsQueryHandler(IManufactorRepository manufactorRepo, IMapper mapper)
    {
        this.manufactorRepo = manufactorRepo;
        this.mapper = mapper;
    }

    public async Task<List<ManufactorDto>> Handle(GetManufactorsQuery request, CancellationToken cancellationToken)
    {
        var manufactors = await manufactorRepo.GetAll();

        return mapper.Map<List<ManufactorDto>>(manufactors);
    }
}