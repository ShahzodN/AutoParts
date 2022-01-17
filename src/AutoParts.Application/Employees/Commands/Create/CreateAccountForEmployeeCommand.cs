using AutoParts.Application.Exceptions;
using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Employees.Commands.Create;

public class CreateAccountForEmployeeCommand : IRequest
{
    public int EmployeeId { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? PasswordConfirm { get; set; }
}

public class CreateAccountForEmployeeCommandHandler : IRequestHandler<CreateAccountForEmployeeCommand, Unit>
{
    private readonly IEmployeeRepository employeeRepo;
    private readonly IAccountManager accountManager;

    public CreateAccountForEmployeeCommandHandler(IEmployeeRepository employeeRepo, IAccountManager accountManager)
    {
        this.employeeRepo = employeeRepo;
        this.accountManager = accountManager;
    }

    public async Task<Unit> Handle(CreateAccountForEmployeeCommand request, CancellationToken cancellationToken)
    {
        Employee? employee = await employeeRepo.GetById(request.EmployeeId);

        if (employee == null)
            throw new NotFoundException($"Employee with {request.EmployeeId} id was not found.");

        Account account = new()
        {
            Email = request.Email,
            Password = request.Password,
            CreatedDate = DateTime.UtcNow,
            User = employee,
            UserId = request.EmployeeId
        };

        IdentityResult result = await accountManager.CreateAsync(account, request.Password!);

        return result.Succeded ? Unit.Value : throw new Exception("Error");
    }
}