using AutoParts.Application.Exceptions;
using AutoParts.Application.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace AutoParts.Application.Employees.Commands.Create;

public class CreateEmployeeAccountCommand : IRequest
{
    public int EmployeeId { get; set; }
    public string UserName { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string PasswordConfirmation { get; set; } = null!;
}

public class CreCreateEmployeeAccountHandler : IRequestHandler<CreateEmployeeAccountCommand, Unit>
{
    private readonly UserManager<Account> userManager;

    public CreCreateEmployeeAccountHandler(UserManager<Account> userManager)
    {
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(CreateEmployeeAccountCommand request, CancellationToken cancellationToken)
    {
        if (request.Password != request.PasswordConfirmation)
            throw new BusinessLogicException("Password doesn't match with Password Confirmation");

        Account account = new()
        {
            UserName = request.UserName,
            EmployeeId = request.EmployeeId
        };

        await userManager.CreateAsync(account, request.Password);
        await userManager.AddToRoleAsync(account, "Employee");

        return Unit.Value;
    }
}