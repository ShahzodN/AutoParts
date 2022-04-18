using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Models.Queries;

public class GetModelQuery : IRequest<ModelDto>
{
    public GetModelQuery(int id) => Id = id;

    public int Id { get; init; }
}

public class GetModelQueryHandler : IRequestHandler<GetModelQuery, ModelDto>
{
    private readonly IModelRepository carRepo;
    private readonly IMapper mapper;

    public GetModelQueryHandler(IModelRepository carRepo, IMapper mapper)
    {
        this.carRepo = carRepo;
        this.mapper = mapper;
    }

    public async Task<ModelDto> Handle(GetModelQuery request, CancellationToken cancellationToken)
    {
        Model? car = await carRepo.GetById(request.Id);

        return car is null ?
            throw new NotFoundException("Car with the provided id was not found.") :
            mapper.Map<ModelDto>(car);
    }
}
