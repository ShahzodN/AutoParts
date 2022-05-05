using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using AutoParts.Application.Products.Queries;
using Microsoft.EntityFrameworkCore;
using AutoParts.Application.Products.Commands;
using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Interfaces;
using System.Text;

namespace AutoParts.Infrastructure.Repositories;

public class ProductRepository : BaseRepository<Product, ApplicationDbContext>, IProductRepository
{
    private readonly IModelRepository modelRepo;
    private readonly IMapper mapper;
    private readonly IImageService imageService;

    public ProductRepository(ApplicationDbContext context,
                            IModelRepository modelRepo,
                            IMapper mapper,
                            IImageService imageService) : base(context)
    {
        this.modelRepo = modelRepo;
        this.mapper = mapper;
        this.imageService = imageService;
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

    public async Task<Product> Update(UpdateProductCommand command)
    {
        var product = await GetById(command.Id);

        if (product == null)
            throw new NotFoundException("Product with provided id was not found.");

        product.Name = command.Name;
        product.Price = command.Price;
        product.IsEnabled = command.IsEnabled;
        product.CategoryId = command.CategoryId;
        product.Description = command.Description;
        if (!string.IsNullOrEmpty(command.Image))
        {
            string imageName = await imageService.UpdateImage(product.GetType().Name, product.Id, command.Image);

            if (product.Image == null)
                product.Image = new Image() { Name = imageName };
            else
                product.Image.Name = imageName;
        }
        product.Models.Clear();

        if (!command.ForAllManufactors && command.ForAllModels)
        {
            var models = await modelRepo.GetAll(x => x.ManufactorId == command.ManufactorId);
            product.Models.AddRange(models);
        }
        else
        {
            command.Models.ForEach(async m =>
            {
                var models = await modelRepo.GetAll(x => x.ModelName == m.Model && m.YearsOfIssue.Contains(x.YearOfIssue));

                product.Models.AddRange(models);
            });
        }

        return await Update(product);
    }

    public override async Task Delete(int id)
    {
        var entity = await GetById(id);

        if (entity != null)
        {
            imageService.DeleteImage(entity.GetType().Name, entity.Id);
            Set.Remove(entity);
        }
        else
            throw new NotFoundException("Entity with provided id was not found.");

        await context.SaveChangesAsync();
    }
    public async Task<Product[]> GetPagedProducts(int page = 1)
    {
        var products = await Set.OrderBy(x => x.Id)
                                .Skip(20 * page - 20)
                                .Take(20)
                                .Include(x => x.Image)
                                .AsNoTracking()
                                .ToArrayAsync();

        return products;
    }

    public async Task<ProductForAutocompleteDto[]> GetAllForAutocomplete(string productName = "")
    {
        var products = await Set.Include(x => x.Models)
                                .ThenInclude(x => x.Manufactor)
                                .Where(p => p.Name!.ToUpper().StartsWith(productName.ToUpper()))
                                .ToArrayAsync();

        var manufactors = await context.Set<Manufactor>().Include(x => x.Models).ToArrayAsync();

        var dtos = products.Select(p =>
        {
            int modelsCount = 0;
            if (p.Models.Count != 0)
            {
                modelsCount = manufactors.Where(x => x.Id == p.Models[0].ManufactorId)
                                        .Select(x => x.Models.Count)
                                        .FirstOrDefault();
            }

            string manufactor = p.Models.Count == 0 ? "Для всех марок" : p.Models[0].Manufactor?.Name!;

            StringBuilder models = new();

            if (p.Models.Count != 0)
            {
                bool forAllModels = p.Models.Count == modelsCount;
                if (forAllModels)
                    models.Append("Для всех моделей");
                else
                {
                    p.Models.ForEach(m =>
                    {
                        if (models.Length == 0)
                            models.Append(m.ModelName);
                        else
                            models.Append(", ").Append(m.ModelName);
                    });
                }
            }

            string name = $"{p.Name} /{manufactor}/{models.ToString()}";
            return new ProductForAutocompleteDto(p.Id, name);
        }).ToArray();

        return dtos;
    }

    public override async Task<Product?> GetById(int id)
    {
        return await Set.Include(x => x.Image)
                        .Include(x => x.Models)
                        .Include(x => x.Category)
                        .FirstOrDefaultAsync(x => x.Id == id);
    }
}