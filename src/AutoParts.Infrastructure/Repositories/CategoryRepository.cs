using System.Linq.Expressions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories;

public class CategoryRepository : BaseRepository<Category, ApplicationDbContext>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context)
    {

    }

    public override async Task<List<Category>> GetAll(Expression<Func<Category, bool>> expression = null)
    {
        IQueryable<Category> query = Set;
        List<Category> categories = new();

        query = Set.Include(s => s.Image);

        if (expression != null)
            query = query.Where(expression);

        categories = await query.ToListAsync();

        return categories;
    }
    public override Task<Category?> GetById(int id)
    {
        return Set.Include(s => s.Image).FirstOrDefaultAsync(s => s.Id == id);
    }
}