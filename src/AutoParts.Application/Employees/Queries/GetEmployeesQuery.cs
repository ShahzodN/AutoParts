using AutoMapper;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;

namespace AutoParts.Application.Employees.Queries
{
    public class GetEmployeesQuery : IRequest<List<EmployeeDto>>
    {

    }

    public class GetEmployeesQueryHandler : IRequestHandler<GetEmployeesQuery, List<EmployeeDto>>
    {
        private readonly IEmployeeRepository employeeRepo;
        private readonly IMapper mapper;

        public GetEmployeesQueryHandler(IEmployeeRepository employeeRepo, IMapper mapper)
        {
            this.employeeRepo = employeeRepo;
            this.mapper = mapper;
        }

        public async Task<List<EmployeeDto>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
        {
            List<Employee> employees = await employeeRepo.GetAll();

            return mapper.Map<List<EmployeeDto>>(employees);
        }
    }
}