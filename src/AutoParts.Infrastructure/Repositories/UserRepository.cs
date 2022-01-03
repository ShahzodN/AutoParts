using AutoParts.Application.Identity.Models;
using AutoParts.Application.Repositories;

namespace AutoParts.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User, ApplicationDbContext>, IUserRepository
    {
        public UserRepository(ApplicationDbContext _context)
            : base(_context)
        {
            
        }
    }
}