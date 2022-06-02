using AutoParts.Application.Employees.Queries;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Employees.Commands.Create;

public class SetWorkScheduleCommand : IRequest
{
    public int EmployeeId { get; set; }
    public IEnumerable<int> WorkDays { get; set; } = null!;
}

public class SetWorkScheduleHandler : IRequestHandler<SetWorkScheduleCommand, Unit>
{
    private readonly IEmployeeRepository employeeRepo;

    public SetWorkScheduleHandler(IEmployeeRepository employeeRepo)
    {
        this.employeeRepo = employeeRepo;
    }

    public async Task<Unit> Handle(SetWorkScheduleCommand request, CancellationToken cancellationToken)
    {
        var employee = await employeeRepo.GetById(request.EmployeeId);

        if (employee == null)
            throw new NotFoundException("Employee with provided id was not found");

        employee.Schedules.Clear();

        var schedules = request.WorkDays.Select(x => new WorkSchedule() { EmployeeId = employee.Id, DayOfWeek = (DayOfWeek)x })
                                        .ToList();

        employee.Schedules = schedules;
        await employeeRepo.Update(employee);

        return Unit.Value;
    }
}