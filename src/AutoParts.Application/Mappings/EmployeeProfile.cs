using AutoMapper;
using AutoParts.Application.Employees.Commands.Create;
using AutoParts.Application.Employees.Commands.Update;
using AutoParts.Application.Employees.Queries;
using AutoParts.Application.Identity.Models;

namespace AutoParts.Application.Mappings
{
    public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            CreateMap<Employee, EmployeeDto>();
            CreateMap<EmployeeDto, Employee>();
            CreateMap<CreateEmployeeCommand, Employee>();
            CreateMap<UpdateEmployeeCommand, Employee>();
        }
    }
}