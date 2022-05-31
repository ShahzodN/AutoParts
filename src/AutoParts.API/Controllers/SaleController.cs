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

    [HttpGet("product")]
    public async Task<IActionResult> GetProduct([FromQuery] string ean)
    {
        return Ok(await Mediator.Send(new GetProductQuery(ean)));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales([FromQuery] DateTime dateStart, DateTime dateEnd, string? seller)
    {
        return Ok(await Mediator.Send(new GetSalesQuery(dateStart, dateEnd, seller)));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SaleDetailsDto>> GetSaleDetails(int id)
    {
        return Ok(await Mediator.Send(new GetSaleDetailsQuery(id)));
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