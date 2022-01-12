using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;

namespace AutoParts.Infrastructure.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee, ApplicationDbContext>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}