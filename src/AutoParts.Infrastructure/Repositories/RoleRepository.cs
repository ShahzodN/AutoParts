using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories
{
    public class RoleRepository : BaseRepository<Role, ApplicationDbContext>, IRoleRepository
    {
        public RoleRepository(ApplicationDbContext contex)
            : base(contex)
        {
            
        }

        public async Task<Role?> GetByName(string name)
        {
            return await Set.FirstOrDefaultAsync(s => s.NormalizedName == name.ToUpper().Trim());
        }
    }
}