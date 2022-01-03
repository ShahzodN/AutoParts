using AutoParts.Application.Identity.Models;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Identity
{
    public interface IRoleManager
    {
        Task<IdentityResult> CreateAsync(Role role);
        Task<IdentityResult> DeleteAsync(Role role);
        Task<Role?> FindById(int id);
        Task<Role?> FindByNameAsync(string name);
    }
}