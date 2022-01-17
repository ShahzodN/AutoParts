using AutoParts.Application.Employees.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using AutoParts.Application.Employees.Commands.Update;
using AutoParts.Application.Employees.Commands.Delete;
using AutoParts.Application.Employees.Commands.Create;
using AutoParts.Application.Identity.Models;

namespace AutoParts.API.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeController : Controller
    {
        private readonly IMediator mediator;
        private readonly IAccountManager accountManager;

        public EmployeeController(IMediator mediator, IAccountManager accountManager)
        {
            this.mediator = mediator;
            this.accountManager = accountManager;
        }

        #region GET

        [HttpGet("all")]
        public async Task<ActionResult<List<EmployeeDto>>> GetEmployees()
        {
            return Ok(await mediator.Send(new GetEmployeesQuery()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            return Ok(await mediator.Send(new GetEmployeeQuery(id)));
        }
        #endregion

        #region POST

        [HttpPost]
        public async Task<ActionResult> CreateEmployee(CreateEmployeeCommand command)
        {
            EmployeeDto createdEmployee = await mediator.Send(command);

            return Created($"/api/employee/{createdEmployee.Id}", createdEmployee);
        }

        [HttpPost("create-account")]
        public async Task<IActionResult> CreateAccount(CreateAccountForEmployeeCommand command)
        {
            await mediator.Send(command);
            return NoContent();
        }

        #endregion

        #region PUT

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(UpdateEmployeeCommand command)
        {
            await mediator.Send(command);

            return NoContent();
        }

        #endregion

        #region DELETE

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await mediator.Send(new DeleteEmployeeCommand(id));

            return NoContent();
        }

        #endregion
    }
}