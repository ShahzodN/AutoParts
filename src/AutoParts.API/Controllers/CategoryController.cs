using AutoParts.Application.Categories.Commands.Create;
using AutoParts.Application.Categories.Commands.Delete;
using AutoParts.Application.Categories.Commands.Update;
using AutoParts.Application.Categories.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Authorize(Roles = "Admin, Employee")]
[Route("api/[controller]")]
public class CategoryController : BaseController
{
    #region GET
    [HttpGet]
    public async Task<List<CategoryDto>> GetAll()
    {
        return await Mediator.Send(new GetAllCategoriesQuery());
    }

    [HttpGet("{id}")]
    public async Task<CategoryDto> GetById(int id)
    {
        return await Mediator.Send(new GetCategoryByIdQuery(id));
    }
    #endregion

    #region POST
    [HttpPost]
    public async Task<ActionResult<CategoryDto>> Create(CreateCategoryCommand command)
    {
        return await Mediator.Send(command);
    }
    #endregion

    #region PUT
    [HttpPut]
    public async Task<ActionResult<CategoryDto>> Update(UpdateCategoryCommand command)
    {
        return await Mediator.Send(command);
    }
    #endregion

    #region DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteCategoryCommand(id));

        return NoContent();
    }
    #endregion
}