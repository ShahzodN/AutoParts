using AutoParts.Application.Models.Commands.Create;
using AutoParts.Application.Models.Commands.Delete;
using AutoParts.Application.Models.Commands.Update;
using AutoParts.Application.Models.Queries;
using AutoParts.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Route("api/[controller]")]
public class ModelsController : BaseController
{
    #region GET

    [HttpGet]
    public async Task<ActionResult<List<ModelDto>>> Get([FromQuery] string manufactor)
    {
        return await Mediator.Send(new GetModelsQuery(manufactor));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ModelDto>> GetById(int id)
    {
        return await Mediator.Send(new GetModelQuery(id));
    }

    [HttpGet("manufactors")]
    public async Task<ActionResult<List<ManufactorDto>>> GetManufactors()
    {
        return await Mediator.Send(new GetManufactorsQuery());
    }

    [HttpGet("bodyTypes")]
    public ActionResult<string[]> GetBodyTypes()
    {
        return Ok(Enum.GetNames<BodyType>());
    }

    [HttpGet("withYears/{id}")]
    public async Task<ActionResult<List<ModelWithYearsOfIssueDto>>> GetModelsWithYearsOfIssue(int id)
    {
        return Ok(await Mediator.Send(new GetModelsWithYearsOfIssueQuery(manufactorId: id)));
    }

    [HttpGet("names/{name}")]
    public async Task<ActionResult<List<ModelWithYearsOfIssueDto>>> GetModelsNames(string name)
    {
        return Ok(await Mediator.Send(new GetModelsNamesQuery(name)));
    }
    #endregion

    #region POST

    [HttpPost]
    public async Task<IActionResult> Create(CreateModelCommand command)
    {
        await Mediator.Send(command);
        return Ok();
    }

    [HttpPost("manufactor")]
    public async Task<IActionResult> CreateManufactor(CreateManufactorCommand command)
    {
        await Mediator.Send(command);
        return Ok();
    }

    #endregion

    #region PUT

    [HttpPut]
    public async Task<IActionResult> Update(UpdateModelCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }

    #endregion

    #region DELETE

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteModelCommand(id));
        return NoContent();
    }

    [HttpDelete("manufactor/{id}")]
    public async Task<IActionResult> DeleteManufactor(int id)
    {
        await Mediator.Send(new DeleteManufactorCommand(id));
        return NoContent();
    }

    [HttpDelete("all/{model}")]
    public async Task<IActionResult> DeleteAllModels(string model)
    {
        await Mediator.Send(new DeleteAllModelsCommand(model));
        return NoContent();
    }

    #endregion
}