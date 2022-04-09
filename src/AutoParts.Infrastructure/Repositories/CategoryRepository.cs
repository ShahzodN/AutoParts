using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories;

public class CategoryRepository : BaseRepository<Category, ApplicationDbContext>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context)
    {

    }

    public override Task<Category?> GetById(int id)
    {
        return Set.Include(s => s.Image).FirstOrDefaultAsync(s => s.Id == id);
    }
}