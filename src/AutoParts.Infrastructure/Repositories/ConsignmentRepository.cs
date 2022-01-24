using System.Linq.Expressions;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories;

public class ConsignmentRepository : BaseRepository<Consignment, ApplicationDbContext>, IConsignmentRepository
{
    public ConsignmentRepository(ApplicationDbContext context) : base(context)
    {

    }

    public async override Task<Consignment?> GetById(int id)
    {
        return await Set.Include(s => s.ConsignmentDetails)
                        .ThenInclude(d => d.Product)
                        .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async override Task<List<Consignment>> GetAll(Expression<Func<Consignment, bool>> expression = null!)
    {
        IQueryable<Consignment> query = null!;
        List<Consignment> models = new();

        if (expression != null)
        {
            query = Set.Where(expression);
            models = await query.Include(s => s.ConsignmentDetails)
                                .ThenInclude(s => s.Product)
                                .ToListAsync();
        }
        else
        {
            models = await Set.Include(s => s.ConsignmentDetails)
                                .ThenInclude(s => s.Product)
                                .ToListAsync();
        }

        return models;
    }
}