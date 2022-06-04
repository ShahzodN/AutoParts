using AutoMapper;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Statistics.Queries;

public class GetTodayWorkersQuery : IRequest<IEnumerable<object>>
{

}

public class GetTodayWorkersHandler : IRequestHandler<GetTodayWorkersQuery, IEnumerable<object>>
{
    private readonly IEmployeeRepository employeeRepo;
    private readonly IMapper mapper;

    public GetTodayWorkersHandler(IEmployeeRepository employeeRepo, IMapper mapper)
    {
        this.employeeRepo = employeeRepo;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<object>> Handle(GetTodayWorkersQuery request, CancellationToken cancellationToken)
    {
        var workers = await employeeRepo.GetAll(x => x.Schedules.Any(x => x.DayOfWeek == DateTime.Today.DayOfWeek));

        var workerDtos = workers.Select(x => new
        {
            Id = x.Id,
            FullName = x.FirstName + " " + x.LastName,
            Image = x.Image?.Name,
            Position = x.Position.ToString()
        }).ToArray();

        return workerDtos;
    }
}