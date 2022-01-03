using System.Threading.Tasks;
using AutoParts.Application.Identity;
using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;

namespace AutoParts.Infrastructure.Identity
{
    public class AccountManager : IAccountManager
    {
        private readonly IAccountRepository accountRepo;
        private readonly IRoleManager roleManager;

        public AccountManager(IAccountRepository accountRepo, IRoleManager roleManager)
        {
            this.accountRepo = accountRepo;
            this.roleManager = roleManager;
        }

        public async Task<IdentityResult> CreateAsync(Account account, string password)
        {
            IdentityResult identityResult = new();
            bool isExists = (await FindByEmail(account.Email!)) != null;
            if (!isExists)
            {
                await accountRepo.Create(account);
                identityResult.Succeded = true;
            }
            else
            {
                identityResult.Errors.Add(
                    new Error("User with this email already registered", 300)
                );
            }
            return identityResult;
        }

        public async Task<IdentityResult> DeleteAsync(Account account)
        {
            IdentityResult identityResult = new();
            var _account = await FindByEmail(account.Email!);
            if (_account != null)
            {
                await accountRepo.Delete(_account.Id);
                identityResult.Succeded = true;
            }
            else
            {
                identityResult.Errors.Add(
                    new Error("Account was not found", 404)
                );
            }
            return identityResult;
        }

        public async Task<Account?> FindByEmail(string email)
        {
            var result = await accountRepo.GetByEmail(email);
            return result;
        }

        public async Task<IdentityResult> AddToRole(Account account, string role)
        {
            IdentityResult identityResult = new();

            var _role = await roleManager.FindByNameAsync(role);

            if (_role != null)
            {
                await accountRepo.AddToRole(account, _role);
                identityResult.Succeded = true;
            }
            else
                identityResult.Errors.Add(
                    new Error($"Role \"{role}\" was not found")
                );

            return identityResult;
        }
    }
}