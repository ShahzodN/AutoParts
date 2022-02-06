using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using AutoParts.Application.Products.Queries;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories;

public class ProductRepository : BaseRepository<AutoProduct, ApplicationDbContext>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context) : base(context)
    {

    }

    public async Task<ProductForAutocompleteDto[]> GetAllForAutocomplete()
    {
        return await Set.Select(s => new ProductForAutocompleteDto(s.Id, s.Name)).ToArrayAsync();
    }
}