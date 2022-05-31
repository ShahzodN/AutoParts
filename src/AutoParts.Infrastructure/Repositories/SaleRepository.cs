using System.Linq.Expressions;
using AutoParts.Application.Identity;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories;

public class SaleRepository : BaseRepository<Sale, ApplicationDbContext>, ISaleRepository
{
    private readonly UserManager<Account> userManager;
    private readonly IHttpContextAccessor httpAccessor;

    public SaleRepository(ApplicationDbContext context,
                        UserManager<Account> userManager,
                        IHttpContextAccessor accessor) : base(context)
    {
        this.userManager = userManager;
        this.httpAccessor = accessor;
    }

    public override async Task<Sale> Create(Sale model)
    {

        if (model.Seller == null)
            throw new Exception("Couldn't define Seller");

        return await base.Create(model);
    }

    public override async Task<Sale?> GetById(int id)
    {
        return await Set.Include(x => x.Seller).Include(x => x.SaleDetails)
                                                .ThenInclude(x => x.Product)
                                                .FirstOrDefaultAsync(x => x.Id == id);
    }

    public override async Task<List<Sale>> GetAll(Expression<Func<Sale, bool>> expression = null!)
    {
        IQueryable<Sale> query = Set.Include(x => x.Seller).Include(x => x.SaleDetails);
        List<Sale> models = new();

        if (expression != null)
        {
            query = query.Where(expression);
            models = await query.ToListAsync();
        }
        else
            models = await Set.ToListAsync();

        return models;
    }
}