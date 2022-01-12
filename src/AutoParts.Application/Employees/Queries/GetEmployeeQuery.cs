using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Employees.Queries
{
    public record GetEmployeeQuery : IRequest<EmployeeDto>
    {
        public GetEmployeeQuery(int id) => Id = id;
        public int Id { get; set; }
    }

    public class GetEmployeeQueryHandler : IRequestHandler<GetEmployeeQuery, EmployeeDto>
    {
        private readonly IEmployeeRepository employeeRepo;
        private readonly IMapper mapper;

        public GetEmployeeQueryHandler(IEmployeeRepository employeeRepo, IMapper mapper)
        {
            this.employeeRepo = employeeRepo;
            this.mapper = mapper;
        }

        public async Task<EmployeeDto> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
        {
            Employee? employee = await employeeRepo.GetById(request.Id);

            return employee == null ? throw new NotFoundException("Employee was not found") : mapper.Map<EmployeeDto>(employee);
        }
    }
}