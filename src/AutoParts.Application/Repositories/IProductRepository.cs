using AutoParts.Application.Products.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Repositories;

public interface IProductRepository : IRepository<AutoProduct>
{
    Task<ProductForAutocompleteDto[]> GetAllForAutocomplete();
}