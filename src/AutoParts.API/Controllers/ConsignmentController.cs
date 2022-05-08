using AutoParts.Application.Consignments.Commands.Create;
using AutoParts.Application.Consignments.Commands.Delete;
using AutoParts.Application.Consignments.Commands.Update;
using AutoParts.Application.Consignments.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/consignment")]
public class ConsignmentController : BaseController
{
    #region GET
    [HttpGet]
    public async Task<ActionResult<List<ConsignmentDto>>> Get()
    {
        return await Mediator.Send(new GetConsignmentsQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ConsignmentDto>> GetById(int id)
    {
        return await Mediator.Send(new GetConsignmentQuery(id));
    }
    #endregion

    #region POST
    [HttpPost]
    public async Task<IActionResult> Create(CreateConsignmentCommand command)
    {
        await Mediator.Send(command);
        return Ok();
    }

    #endregion

    #region PUT
    [HttpPut]
    public async Task<IActionResult> Update(UpdateConsignmentCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }
    #endregion

    #region DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteConsignmentCommand(id));
        return NoContent();
    }
    #endregion
}