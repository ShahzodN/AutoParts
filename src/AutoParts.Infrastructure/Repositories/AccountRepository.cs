using System.Threading.Tasks;
using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories
{
    public class AccountRepository : BaseRepository<Account, ApplicationDbContext>, IAccountRepository
    {
        public AccountRepository(ApplicationDbContext context)
            : base(context)
        {

        }

        public async Task AddToRole(Account account, Role role)
        {
            account.Roles.Add(role);
            await context.SaveChangesAsync();
        }

        public async Task<Account?> GetByEmail(string email)
        {
            var account = await Set.Include(s => s.Roles)
                        .FirstOrDefaultAsync(s => s.NormalizedEmail! == email.ToUpper().Trim());
            return account;
        }
    }
}