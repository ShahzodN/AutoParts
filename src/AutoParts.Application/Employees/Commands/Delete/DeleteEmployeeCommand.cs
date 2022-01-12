using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;
using MediatR;

namespace AutoParts.Application.Employees.Commands.Delete
{
    public class DeleteEmployeeCommand : IRequest
    {
        public DeleteEmployeeCommand(int id) => Id = id;
        public int Id { get; set; }
    }

    public class DeleteEmployeeCommandHandler : IRequestHandler<DeleteEmployeeCommand>
    {
        private readonly IEmployeeRepository employeeRepo;

        public DeleteEmployeeCommandHandler(IEmployeeRepository employeeRepo)
        {
            this.employeeRepo = employeeRepo;
        }

        public async Task<Unit> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
        {
            await employeeRepo.Delete(request.Id);

            return Unit.Value;
        }
    }
}