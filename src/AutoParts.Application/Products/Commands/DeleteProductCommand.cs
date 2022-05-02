using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Products.Commands;

public class DeleteProductCommand : IRequest
{
    public DeleteProductCommand(int id) => Id = id;

    public int Id { get; }
}

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Unit>
{
    private readonly IProductRepository productRepo;

    public DeleteProductCommandHandler(IProductRepository productRepo)
    {
        this.productRepo = productRepo;
    }

    public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        await productRepo.Delete(request.Id);

        return Unit.Value;
    }
}