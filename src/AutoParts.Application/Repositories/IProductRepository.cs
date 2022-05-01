using AutoParts.Application.Products.Commands;
using AutoParts.Application.Products.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Repositories;

public interface IProductRepository : IRepository<Product>
{
    Task<ProductForAutocompleteDto[]> GetAllForAutocomplete();
    Task<Product> Create(CreateProductCommand command);
    Task<Product[]> GetPagedProducts(int page = 1);
}