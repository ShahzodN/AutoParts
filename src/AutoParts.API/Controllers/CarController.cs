using AutoParts.Application.Cars.Commands.Create;
using AutoParts.Application.Cars.Commands.Delete;
using AutoParts.Application.Cars.Commands.Update;
using AutoParts.Application.Cars.Queries;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Route("api/car")]
public class CarController : BaseController
{
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

    [HttpPost]
    public async Task<ActionResult<CarDto>> Create(CreateCarCommand command)
    {
        var car = await Mediator.Send(command);
        return Created($"/api/car/{car.Id}", car);
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateCarCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteCarCommand(id));
        return NoContent();
    }
}