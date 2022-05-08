using System.Text.Json.Serialization;
using AutoMapper;
using AutoParts.Application.Interfaces;
using AutoParts.Application.JsonConverters;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using AutoParts.Domain.Enums;
using MediatR;

namespace AutoParts.Application.Employees.Commands.Update
{
    public class UpdateEmployeeCommand : IRequest
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [JsonConverter(typeof(EmployeePositionConverter))]
        public EmployeePosition Position { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public int Salary { get; set; }
        public string Photo { get; set; } = null!;
    }

    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand>
    {
        private readonly IEmployeeRepository employeeRepo;
        private readonly IImageService imageService;
        private readonly IMapper mapper;

        public UpdateEmployeeCommandHandler(IEmployeeRepository employeeRepo, IImageService imageService, IMapper mapper)
        {
            this.employeeRepo = employeeRepo;
            this.imageService = imageService;
            this.mapper = mapper;
        }

        public async Task<Unit> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
        {
            Employee? employee = await employeeRepo.GetById(request.Id);

            if (employee != null)
            {
                mapper.Map(request, employee);
                employee.Image.Name = await imageService.UpdateImage(employee.GetType().Name, employee.Id, request.Photo);
                await employeeRepo.Update(employee);
            }

            return Unit.Value;
        }
    }
}