using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Consignments.Commands.Update
{
    public class UpdateConsignmentCommand : IRequest
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Dictionary<int, int> ProductsList { get; set; } = null!;
    }

    public class UpdateConsignmentCommandHandler : IRequestHandler<UpdateConsignmentCommand, Unit>
    {
        private readonly IConsignmentRepository consignmentRepo;
        private readonly IMapper mapper;

        public UpdateConsignmentCommandHandler(IConsignmentRepository consignmentRepo, IMapper mapper)
        {
            this.consignmentRepo = consignmentRepo;
            this.mapper = mapper;
        }

        public async Task<Unit> Handle(UpdateConsignmentCommand request, CancellationToken cancellationToken)
        {
            Consignment? consignment = await consignmentRepo.GetById(request.Id);

            if (consignment == null)
                throw new NotFoundException("Consignment with the provided id was not found.");


            List<int> ids = request.ProductsList.Select(s => s.Key).ToList();

            var updatedConsignmentList = consignment.ConsignmentDetails.FindAll(s => ids.Contains(s.ProductId!.Value));
            consignment.ConsignmentDetails = updatedConsignmentList;

            var productsGonnaBeAdded = ids.Except(consignment.ConsignmentDetails.Select(e => e.ProductId!.Value));

            foreach (var id in productsGonnaBeAdded)
            {
                updatedConsignmentList.Add(new()
                {
                    Consignment = consignment,
                    ProductId = id,
                    Quantity = request.ProductsList[id]
                });
            }

            ConsignmentDetails? cd;
            foreach (var item in request.ProductsList)
            {
                cd = consignment.ConsignmentDetails.FirstOrDefault(s => s.ProductId == item.Key);
                if (cd != null && cd.Quantity != item.Value)
                    cd.Quantity = item.Value;
            }

            await consignmentRepo.Update(consignment);

            return Unit.Value;
        }
    }
}