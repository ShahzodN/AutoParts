using AutoParts.Application.Cars.Commands.Create;
using AutoParts.Application.Cars.Commands.Delete;
using AutoParts.Application.Cars.Commands.Update;
using AutoParts.Application.Cars.Queries;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Route("api/cars")]
public class CarController : BaseController
{
    #region GET

    [HttpGet]
    public async Task<ActionResult<List<CarDto>>> Get(GetCarsQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CarDto>> GetById(int id)
    {
        return await Mediator.Send(new GetCarQuery(id));
    }

    [HttpGet("manufactors")]
    public async Task<ActionResult<List<ManufactorDto>>> GetManufactors()
    {
        return await Mediator.Send(new GetManufactorsQuery());
    }
    #endregion

    #region POST

    [HttpPost]
    public async Task<ActionResult<CarDto>> Create(CreateCarCommand command)
    {
        var car = await Mediator.Send(command);
        return Created($"/api/car/{car.Id}", car);
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
    public async Task<IActionResult> Update(UpdateCarCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }

    #endregion

    #region DELETE

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteCarCommand(id));
        return NoContent();
    }

    [HttpDelete("manufactor/{id}")]
    public async Task<IActionResult> DeleteManufactor(int id)
    {
        await Mediator.Send(new DeleteManufactorCommand(id));
        return NoContent();
    }

    #endregion
}