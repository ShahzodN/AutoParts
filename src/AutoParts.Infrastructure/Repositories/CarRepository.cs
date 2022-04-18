using System.Linq.Expressions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories;

public class CarRepository : BaseRepository<Car, ApplicationDbContext>, ICarRepository
{
    public CarRepository(ApplicationDbContext context) : base(context)
    {

    }

    public async Task Delete(string? model)
    {
        var models = await GetAll(s => s.Model!.ToUpper() == model!.ToUpper());
        Set.RemoveRange(models);
        await context.SaveChangesAsync();
    }

    public override async Task<List<Car>> GetAll(Expression<Func<Car, bool>> expression = null!)
    {
        IQueryable<Car> query = Set;
        List<Car> models = new();

        query = Set.Include(s => s.Manufactor);

        if (expression != null)
            query = query.Where(expression);

        models = await query.ToListAsync();

        return models;
    }
}