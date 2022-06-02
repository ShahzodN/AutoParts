using AutoMapper;
using AutoParts.Application.Exceptions;
using AutoParts.Application.Identity;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
        private readonly UserManager<Account> userManager;
        private readonly ISaleRepository saleRepo;

        public GetEmployeeQueryHandler(IEmployeeRepository employeeRepo, UserManager<Account> userManager,
                                        ISaleRepository saleRepo, IMapper mapper)
        {
            this.employeeRepo = employeeRepo;
            this.mapper = mapper;
            this.userManager = userManager;
            this.saleRepo = saleRepo;
        }

        public async Task<EmployeeDto> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
        {
            Employee? employee = await employeeRepo.GetById(request.Id);

            if (employee == null)
                throw new NotFoundException("Employee was not found");

            var employeeDto = mapper.Map<EmployeeDto>(employee);
            var sales = await saleRepo.GetAll(x => x.SellerId == employee.Id);
            var workedDays = sales.Select(x => x.SaleTime.ToString("dd-MM-yyyy"));
            employeeDto.WorkedDays = workedDays;

            var account = await userManager.Users.FirstOrDefaultAsync(x => x.EmployeeId == employee.Id);

            employeeDto.HasAccount = account != null;

            return employeeDto;
        }
    }
}