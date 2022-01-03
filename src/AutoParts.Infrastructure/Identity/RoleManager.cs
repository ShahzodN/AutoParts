using System.Threading.Tasks;
using AutoParts.Application.Identity;
using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;

namespace AutoParts.Infrastructure.Identity
{
    public class RoleManager : IRoleManager
    {
        private readonly IRoleRepository roleRepo;

        public RoleManager(IRoleRepository roleRepo)
        {
            this.roleRepo = roleRepo;
        }
        public async Task<IdentityResult> CreateAsync(Role role)
        {
            IdentityResult identityResult = new();
            bool isExists = (await FindByNameAsync(role.NormalizedName!)) != null;
            if (!isExists)
            {
                await roleRepo.Create(role);
                identityResult.Succeded = true;
            }
            else
            {
                identityResult.Errors.Add(
                    new Error($"Role \"{role.Name}\" already registered.")
                );
            }

            return identityResult;
        }

        public async Task<IdentityResult> DeleteAsync(Role role)
        {
            IdentityResult identityResult = new();
            var _role = await roleRepo.GetByName(role.NormalizedName!);

            if (_role != null)
            {
                await roleRepo.Delete(_role.Id);
                identityResult.Succeded = true;
            }
            else
            {
                identityResult.Errors.Add(
                    new Error($"Role \"{role.Name}\" already registered.")
                );
            }

            return identityResult;
        }

        public async Task<Role?> FindById(int id)
        {
            return await roleRepo.GetById(id);
        }

        public async Task<Role?> FindByNameAsync(string name)
        {
            return await roleRepo.GetByName(name);
        }
    }
}