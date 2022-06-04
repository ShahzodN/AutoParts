using System.Linq.Expressions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories
{
    public class ManufactorRepository : BaseRepository<Manufactor, ApplicationDbContext>, IManufactorRepository
    {
        public ManufactorRepository(ApplicationDbContext context)
            : base(context)
        {

        }

        public override async Task<List<Manufactor>> GetAll(Expression<Func<Manufactor, bool>> expression = null!)
        {
            IQueryable<Manufactor> query = Set.Include(s => s.Image)
                                                .Include(x => x.Models).ThenInclude(x => x.Products);
            List<Manufactor> models = new();

            if (expression != null)
                query = Set.Where(expression);

            models = await query.ToListAsync();

            return models;
        }

        public override async Task<Manufactor?> GetById(int id)
        {
            return await Set.Include(s => s.Image).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Manufactor?> GetByName(string? name)
        {
            return await Set.FirstOrDefaultAsync(s => s.Name == name);
        }
    }
}