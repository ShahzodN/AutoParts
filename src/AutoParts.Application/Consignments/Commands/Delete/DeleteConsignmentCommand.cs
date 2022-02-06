using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Consignments.Commands.Delete
{
    public class DeleteConsignmentCommand : IRequest
    {
        public DeleteConsignmentCommand(int id) => Id = id;

        public int Id { get; private set; }
    }

    public class DeleteConsignmentCommandHandler : IRequestHandler<DeleteConsignmentCommand, Unit>
    {
        private readonly IConsignmentRepository consignmentRepo;
        private readonly IMapper mapper;

        public DeleteConsignmentCommandHandler(IConsignmentRepository consignmentRepo, IMapper mapper)
        {
            this.consignmentRepo = consignmentRepo;
            this.mapper = mapper;
        }

        public async Task<Unit> Handle(DeleteConsignmentCommand request, CancellationToken cancellationToken)
        {
            Consignment? consignment = await consignmentRepo.GetById(request.Id);

            if (consignment == null)
                throw new NotFoundException("Consignment with the provided id was not found.");

            await consignmentRepo.Delete(consignment.Id);

            return Unit.Value;
        }
    }
}