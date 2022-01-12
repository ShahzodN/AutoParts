using AutoParts.Application.Employees.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using AutoParts.Application.Employees.Commands.Update;
using AutoParts.Application.Employees.Commands.Delete;
using AutoParts.Application.Employees.Commands.Create;

namespace AutoParts.API.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeController : Controller
    {
        private readonly IMediator mediator;

        public EmployeeController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        #region GET

        [HttpGet("all")]
        public async Task<List<EmployeeDto>> GetEmployees()
        {
            return await mediator.Send(new GetEmployeesQuery());
        }

        [HttpGet]
        public async Task<EmployeeDto> GetEmployee([FromQuery] int id)
        {
            return await mediator.Send(new GetEmployeeQuery(id));
        }
        #endregion

        #region POST

        [HttpPost]
        public async Task<int> CreateEmployee([FromForm] CreateEmployeeCommand command)
        {
            return await mediator.Send(command);
        }

        #endregion

        #region PUT

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee([FromForm] UpdateEmployeeCommand command)
        {
            await mediator.Send(command);

            return NoContent();
        }

        #endregion

        #region Delete

        [HttpDelete]
        public async Task<IActionResult> DeleteEmployee([FromQuery] int id)
        {
            await mediator.Send(new DeleteEmployeeCommand(id));

            return NoContent();
        }

        #endregion
    }
}