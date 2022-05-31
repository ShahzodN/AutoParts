using AutoMapper;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Consignments.Commands.Create;

public class CreateConsignmentCommand : IRequest
{
    public DateTime Date { get; set; }
    public Dictionary<int, int> ProductsList { get; set; } = null!;
}

public class CreateConsignmentCommandHandler : IRequestHandler<CreateConsignmentCommand, Unit>
{
    private readonly IConsignmentRepository consignmentRepo;
    private readonly IProductRepository productRepo;
    private readonly IMapper mapper;

    public CreateConsignmentCommandHandler(IConsignmentRepository consignmentRepo, IProductRepository productRepo, IMapper mapper)
    {
        this.consignmentRepo = consignmentRepo;
        this.productRepo = productRepo;
        this.mapper = mapper;
    }

    public async Task<Unit> Handle(CreateConsignmentCommand request, CancellationToken cancellationToken)
    {
        Consignment consignment = new() { Date = request.Date.Date };
        var ids = request.ProductsList.Keys.ToList();
        var products = await productRepo.GetAll(x => ids.Contains(x.Id));

        foreach (var s in request.ProductsList)
        {
            products.First(p => p.Id == s.Key).Count += s.Value;
            consignment.ConsignmentDetails.Add(new()
            {
                Consignment = consignment,
                ConsignmentId = consignment.Id,
                ProductId = s.Key,
                Quantity = s.Value
            });
        }

        consignment = await consignmentRepo.Create(consignment);
        productRepo.UpdateRange(products.ToArray());

        return Unit.Value;
    }
}