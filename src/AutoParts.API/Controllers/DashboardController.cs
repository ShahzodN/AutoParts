using AutoParts.Application.Statistics.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Authorize(Roles = "Admin")]
[Route("/api/[controller]")]
public class DashboardController : BaseController
{
    [HttpGet]
    public async Task<ActionResult<StatisticsDto>> GetStatistics()
    {
        return Ok(await Mediator.Send(new GetStatisticsQuery()));
    }
}