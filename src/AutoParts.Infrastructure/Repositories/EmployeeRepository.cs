using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee, ApplicationDbContext>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext context) : base(context)
        {

        }

        public override async Task<Employee?> GetById(int id)
        {
            return await Set.Include(s => s.Image)
                            .FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}