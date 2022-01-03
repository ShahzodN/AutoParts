namespace AutoParts.Application.Identity.Models
{
    public interface IAccountManager
    {
        Task<IdentityResult> CreateAsync(Account account, string password);
        Task<IdentityResult> DeleteAsync(Account account);
        Task<Account?> FindByEmail(string email);
        Task<IdentityResult> AddToRole(Account account, string role);
    }
}