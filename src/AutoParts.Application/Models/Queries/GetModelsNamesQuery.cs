using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Models.Queries;

public class GetModelsNamesQuery : IRequest<object[]>
{
    public GetModelsNamesQuery(string name) => Name = name;

    public string Name { get; }
}

public class GetModelsNamesQueryHandler : IRequestHandler<GetModelsNamesQuery, object[]>
{
    private readonly IModelRepository modelRepo;

    public GetModelsNamesQueryHandler(IModelRepository modelRepo)
    {
        this.modelRepo = modelRepo;
    }

    public async Task<object[]> Handle(GetModelsNamesQuery request, CancellationToken cancellationToken)
    {
        var models = await modelRepo.GetByName(request.Name);

        return models;
    }
}