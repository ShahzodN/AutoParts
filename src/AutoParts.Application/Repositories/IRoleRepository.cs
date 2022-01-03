using AutoParts.Application.Identity.Models;

namespace AutoParts.Application.Repositories
{
    public interface IRoleRepository : IRepository<Role>
    {
        Task<Role?> GetByName(string name);
    }
}