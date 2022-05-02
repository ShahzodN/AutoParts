using AutoMapper;
using AutoParts.Application.Interfaces;
using AutoParts.Application.Models.Queries;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Products.Commands;

public class CreateProductCommand : IRequest
{
    public string? Name { get; set; }
    public int Price { get; set; }
    public bool IsEnabled { get; set; }
    public bool ForAllManufactors { get; set; }
    public bool ForAllModels { get; set; }
    public int ManufactorId { get; set; }
    public int CategoryId { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public List<ModelWithYearsOfIssueDto> Models { get; set; } = null!;
}

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand>
{
    private readonly IProductRepository productRepo;
    private readonly IMapper mapper;
    private readonly IImageService imageService;

    public CreateProductCommandHandler(IProductRepository productRepo,
                                        IImageService imageService,
                                        IMapper mapper)
    {
        this.productRepo = productRepo;
        this.mapper = mapper;
        this.imageService = imageService;
    }

    public async Task<Unit> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepo.Create(request);

        if (request.Image != null)
            product.Image = await imageService.SetImages(product, request.Image);

        await productRepo.Update(product);

        return Unit.Value;
    }
}