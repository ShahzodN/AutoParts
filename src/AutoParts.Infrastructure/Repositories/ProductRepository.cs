using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using AutoParts.Application.Products.Queries;
using Microsoft.EntityFrameworkCore;
using AutoParts.Application.Products.Commands;
using AutoParts.Application.Exceptions;
using AutoMapper;

namespace AutoParts.Infrastructure.Repositories;

public class ProductRepository : BaseRepository<Product, ApplicationDbContext>, IProductRepository
{
    private readonly IModelRepository modelRepo;
    private readonly IMapper mapper;

    public ProductRepository(ApplicationDbContext context,
                                IModelRepository modelRepo,
                                IMapper mapper) : base(context)
    {
        this.modelRepo = modelRepo;
        this.mapper = mapper;
    }

    public async Task<Product> Create(CreateProductCommand command)
    {
        var product = mapper.Map<Product>(command);

        if (command.ForAllManufactors)
        {
            await Set.AddAsync(product);
        }
        else if (command.ForAllModels)
        {
            var models = await modelRepo.GetAll(x => x.ManufactorId == command.ManufactorId);
            models.ForEach(m => m.Products.Add(product));
        }
        else
        {
            command.Models.ForEach(async m =>
            {
                var models = await modelRepo.GetAll(x => x.ModelName == m.Model && m.YearsOfIssue.Contains(x.YearOfIssue));

                product.Models.AddRange(models);
            });
            await Set.AddAsync(product);
        }

        await context.SaveChangesAsync();

        return product;
    }

    public async Task<Product[]> GetPagedProducts(int page = 1)
    {
        var products = await Set.Skip(20 * page - 20)
                                .Take(20)
                                .Include(x => x.Image)
                                .AsNoTracking()
                                .ToArrayAsync();

        return products;
    }

    public async Task<ProductForAutocompleteDto[]> GetAllForAutocomplete()
    {
        return await Set.Select(s => new ProductForAutocompleteDto(s.Id, s.Name)).ToArrayAsync();
    }

    public override async Task<Product?> GetById(int id)
    {
        return await Set.Include(x => x.Image)
                        .Include(x => x.Models)
                        .Include(x => x.Category)
                        .FirstOrDefaultAsync(x => x.Id == id);
    }
}