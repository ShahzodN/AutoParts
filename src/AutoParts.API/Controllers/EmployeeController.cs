using AutoParts.Application.Employees.Queries;
using Microsoft.AspNetCore.Mvc;
using AutoParts.Application.Employees.Commands.Update;
using AutoParts.Application.Employees.Commands.Delete;
using AutoParts.Application.Employees.Commands.Create;
using Microsoft.AspNetCore.Authorization;

namespace AutoParts.API.Controllers
{
    [Authorize(Roles = "Admin,Employee")]
    [Route("api/[controller]")]
    public class EmployeeController : BaseController
    {
        #region GET

        [HttpGet("all")]
        public async Task<ActionResult<List<EmployeeDto>>> GetEmployees()
        {
            return Ok(await Mediator.Send(new GetEmployeesQuery()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            return Ok(await Mediator.Send(new GetEmployeeQuery(id)));
        }
        #endregion

        #region POST

        [HttpPost]
        public async Task<ActionResult> CreateEmployee(CreateEmployeeCommand command)
        {
            EmployeeDto createdEmployee = await Mediator.Send(command);

            return Created($"/api/employee/{createdEmployee.Id}", createdEmployee);
        }

        #endregion

        #region PUT

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(UpdateEmployeeCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        #endregion

        #region DELETE

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await Mediator.Send(new DeleteEmployeeCommand(id));

            return NoContent();
        }

        #endregion
    }
}