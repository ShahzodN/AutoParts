using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using AutoParts.Infrastructure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace AutoParts.Infrastructure.Repositories;

public class SaleRepository : BaseRepository<Sale, ApplicationDbContext>, ISaleRepository
{
    private readonly UserManager<IdentityUser<int>> userManager;
    private readonly IHttpContextAccessor httpAccessor;

    public SaleRepository(ApplicationDbContext context,
                        UserManager<IdentityUser<int>> userManager,
                        IHttpContextAccessor accessor) : base(context)
    {
        this.userManager = userManager;
        this.httpAccessor = accessor;
    }

    public override async Task<Sale> Create(Sale model)
    {
        model.Seller = httpAccessor.HttpContext?.User?.Identity?.Name!;

        if (model.Seller == null)
            throw new Exception("Couldn't define Seller");

        return await base.Create(model);
    }
}