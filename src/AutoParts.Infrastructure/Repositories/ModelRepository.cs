using System.Linq.Expressions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories;

public class ModelRepository : BaseRepository<Model, ApplicationDbContext>, IModelRepository
{
    public ModelRepository(ApplicationDbContext context) : base(context)
    {

    }

    public async Task Delete(string? model)
    {
        var models = await GetAll(s => s.ModelName!.ToUpper() == model!.ToUpper());
        Set.RemoveRange(models);
        await context.SaveChangesAsync();
    }

    public override async Task<List<Model>> GetAll(Expression<Func<Model, bool>> expression = null!)
    {
        IQueryable<Model> query = Set;
        List<Model> models = new();

        query = Set.Include(s => s.Manufactor);

        if (expression != null)
            query = query.Where(expression);

        models = await query.ToListAsync();

        return models;
    }

    public async Task<object[]> GetByName(string? name)
    {
        if (name == null)
            throw new Exception("Bad request");

        var products = await Set.Where(x => x.ModelName!.ToUpper().StartsWith(name.ToUpper()))
                                .Include(x => x.Manufactor)
                                .Select(x => new { Name = x.ModelName, Manufactor = x.Manufactor.Name }).ToArrayAsync();

        var grouped = products.DistinctBy(x => x.Name).GroupBy(x => x.Manufactor).Select(g => new
        {
            Label = g.Key,
            Options = g.Select(o => new { Value = o.Name, Label = o.Name }).ToArray()
        }).ToArray();

        return grouped;
    }
}