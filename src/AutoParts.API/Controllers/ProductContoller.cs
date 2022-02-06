using AutoParts.Application.Products.Queries;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Route("api/products")]
public class ProductController : BaseController
{
    #region GET
    public async Task<ProductForAutocompleteDto[]> GetAll()
    {
        return await Mediator.Send(new GetAllProductsQuery());
    }
    #endregion
}