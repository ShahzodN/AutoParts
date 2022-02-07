using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;

namespace AutoParts.Infrastructure.Repositories;

public class CategoryRepository : BaseRepository<Category, ApplicationDbContext>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context)
    {

    }
}