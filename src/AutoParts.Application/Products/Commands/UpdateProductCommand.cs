using AutoParts.Application.Interfaces;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Products.Commands;

public class UpdateProductCommand : CreateProductCommand, IRequest
{
    public int Id { get; set; }
}

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Unit>
{
    public UpdateProductCommandHandler(IProductRepository productRepo, IImageService imageService)
    {
        this.productRepo = productRepo;
        this.imageService = imageService;
    }
    private readonly IProductRepository productRepo;
    private readonly IImageService imageService;

    public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        await productRepo.Update(request);

        return Unit.Value;
    }
}