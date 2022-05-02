using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Models.Queries;

public class GetModelsWithYearsOfIssueQuery : IRequest<List<ModelWithYearsOfIssueDto>>
{
    public GetModelsWithYearsOfIssueQuery(int manufactorId) => ManufactorId = manufactorId;
    public int ManufactorId { get; }
}

public class GetModelsWithYearsOfIssueQueryHandler : IRequestHandler<GetModelsWithYearsOfIssueQuery, List<ModelWithYearsOfIssueDto>>
{
    private readonly IModelRepository modelRepo;
    private readonly IMapper mapper;

    public GetModelsWithYearsOfIssueQueryHandler(IModelRepository modelRepo, IMapper mapper)
    {
        this.modelRepo = modelRepo;
        this.mapper = mapper;
    }

    public async Task<List<ModelWithYearsOfIssueDto>> Handle(GetModelsWithYearsOfIssueQuery request, CancellationToken cancellationToken)
    {
        var models = await modelRepo.GetAll(s => s.ManufactorId == request.ManufactorId);

        var dtos = models.GroupBy(s => s.ModelName).Select(g =>
        {
            var dto = new ModelWithYearsOfIssueDto()
            {
                Model = g.Key
            };

            foreach (var model in g)
                dto.YearsOfIssue.Add(model.YearOfIssue);

            return dto;
        }).ToList();

        return dtos;
    }
}