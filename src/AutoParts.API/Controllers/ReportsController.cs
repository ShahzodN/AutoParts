using AutoParts.Application.Reports.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Authorize, Route("api/[controller]")]
public class ReportsController : BaseController
{
    [HttpGet("sales")]
    public async Task<ActionResult<SalesReportDto>> GetSalesReport([FromQuery] DateTime date)
    {
        return Ok(await Mediator.Send(new GetSalesReportQuery(date)));
    }

    [HttpGet("balance")]
    public async Task<ActionResult<SalesReportDto>> GetBalanceReport([FromQuery] DateTime date)
    {
        return Ok(await Mediator.Send(new GetBalanceReportQuery(date)));
    }
}