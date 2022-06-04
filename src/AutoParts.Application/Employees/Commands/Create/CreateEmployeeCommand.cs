using System.Text.Json.Serialization;
using AutoMapper;
using AutoParts.Application.Employees.Queries;
using AutoParts.Application.Interfaces;
using AutoParts.Application.JsonConverters;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using AutoParts.Domain.Enums;
using MediatR;

namespace AutoParts.Application.Employees.Commands.Create
{
    public class CreateEmployeeCommand : IRequest<EmployeeDto>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [JsonConverter(typeof(EmployeePositionConverter))]
        public EmployeePosition Position { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string Photo { get; set; } = null!;
        public int Salary { get; set; }
    }

    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, EmployeeDto>
    {
        private readonly IEmployeeRepository employeeRepo;
        private readonly IMapper mapper;
        private readonly IImageService imageService;

        public CreateEmployeeCommandHandler(IEmployeeRepository employeeRepo, IMapper mapper, IImageService imageService)
        {
            this.employeeRepo = employeeRepo;
            this.mapper = mapper;
            this.imageService = imageService;
        }

        public async Task<EmployeeDto> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            Employee employee = mapper.Map<Employee>(request);

            employee = await employeeRepo.Create(employee);

            if (request.Photo.Length > 50)
            {
                Image image = await imageService.SetImages(employee, request.Photo);
                employee.Image = image;
                await employeeRepo.Update(employee);
            }

            return mapper.Map<EmployeeDto>(employee);
        }
    }
}