using AutoParts.Application.Sales.Commands;
using AutoParts.Application.Sales.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Authorize(Roles = "Admin,Employee")]
[Route("api/[controller]")]
public class SaleController : BaseController
{
    #region GET

    [HttpGet]
    public async Task<IActionResult> GetProduct([FromQuery] string ean)
    {
        return Ok(await Mediator.Send(new GetProductQuery(ean)));
    }

    #endregion

    #region POST

    [HttpPost]
    public async Task<IActionResult> Create(CreateSaleCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }

    #endregion
}