using AutoParts.Application.Identity.Models;

namespace AutoParts.Application.Repositories
{
    public interface IAccountRepository : IRepository<Account>
    {
        Task<Account?> GetByEmail(string email);
        Task AddToRole(Account account, Role role);
    }
}