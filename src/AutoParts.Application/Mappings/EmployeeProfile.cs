using AutoMapper;
using AutoParts.Application.Employees.Commands.Create;
using AutoParts.Application.Employees.Commands.Update;
using AutoParts.Application.Employees.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Mappings;
public class EmployeeProfile : Profile
{
    public EmployeeProfile()
    {
        CreateMap<Employee, EmployeeDto>()
            .ForMember(d => d.Photo, opt => opt.MapFrom(src => src.Image.Name))
            .ForMember(d => d.WorkDays, opt => opt.MapFrom(src => src.Schedules.Select(x => x.DayOfWeek).ToArray()));

        CreateMap<EmployeeDto, Employee>();
        CreateMap<CreateEmployeeCommand, Employee>().ForMember(d => d.Image, opt => opt.Ignore());
        CreateMap<UpdateEmployeeCommand, Employee>();
    }
}