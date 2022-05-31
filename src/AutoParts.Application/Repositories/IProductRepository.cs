using AutoParts.Application.Products.Commands;
using AutoParts.Application.Products.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Repositories;

public interface IProductRepository : IRepository<Product>
{
    Task<ProductForAutocompleteDto[]> GetAllForAutocomplete(string productName = "");
    Task<Product> Create(CreateProductCommand command);
    Task<Product> Update(UpdateProductCommand command);
    Task<Product?> GetByEAN(string ean);
    void UpdateRange(params Product[] products);
    Task<Product[]> GetPagedProducts(int page = 1);
}