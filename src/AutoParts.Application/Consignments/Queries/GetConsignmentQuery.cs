using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Consignments.Queries
{
    public class GetConsignmentQuery : IRequest<ConsignmentDto>
    {
        public GetConsignmentQuery(int id) => Id = id;

        public int Id { get; private set; }
    }

    public class GetConsignmentQueryHandler : IRequestHandler<GetConsignmentQuery, ConsignmentDto>
    {
        private readonly IConsignmentRepository consignmentRepo;
        private readonly IMapper mapper;

        public GetConsignmentQueryHandler(IConsignmentRepository consignmentRepo, IMapper mapper)
        {
            this.consignmentRepo = consignmentRepo;
            this.mapper = mapper;
        }

        public async Task<ConsignmentDto> Handle(GetConsignmentQuery request, CancellationToken cancellationToken)
        {
            Consignment? consignment = await consignmentRepo.GetById(request.Id);

            if (consignment == null)
                throw new NotFoundException("Consignment with provided id was not found.");

            return mapper.Map<ConsignmentDto>(consignment);
        }
    }
}