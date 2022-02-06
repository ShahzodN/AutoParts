using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Consignments.Queries;

public class GetConsignmentsQuery : IRequest<List<ConsignmentDto>> { }

public class GetConsignmentsQueryHandler : IRequestHandler<GetConsignmentsQuery, List<ConsignmentDto>>
{
    private readonly IConsignmentRepository consignmentRepo;
    private readonly IMapper mapper;

    public GetConsignmentsQueryHandler(IConsignmentRepository consignmentRepo, IMapper mapper)
    {
        this.consignmentRepo = consignmentRepo;
        this.mapper = mapper;
    }

    public async Task<List<ConsignmentDto>> Handle(GetConsignmentsQuery request, CancellationToken cancellationToken)
    {
        var consignments = await consignmentRepo.GetAll();

        return mapper.Map<List<ConsignmentDto>>(consignments);
    }
}