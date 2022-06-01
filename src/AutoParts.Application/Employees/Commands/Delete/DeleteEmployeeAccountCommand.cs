using AutoParts.Application.Exceptions;
using AutoParts.Application.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Application.Employees.Commands.Delete;
public class DeleteEmployeeAccountCommand : IRequest
{
    public DeleteEmployeeAccountCommand(int id) => EmployeeId = id;
    public int EmployeeId { get; }
}

public class DeleteEmployeeAccountHandler : IRequestHandler<DeleteEmployeeAccountCommand, Unit>
{
    private readonly UserManager<Account> userManager;

    public DeleteEmployeeAccountHandler(UserManager<Account> userManager)
    {
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(DeleteEmployeeAccountCommand request, CancellationToken cancellationToken)
    {
        var account = await userManager.Users.FirstOrDefaultAsync(x => x.EmployeeId == request.EmployeeId);

        if (account == null)
            throw new NotFoundException("Employee doesn't hava an account");

        await userManager.DeleteAsync(account);

        return Unit.Value;
    }
}