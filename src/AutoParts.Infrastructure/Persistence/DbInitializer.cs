using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace AutoParts.Infrastructure.Persistence;

public class DbInitializer
{
    public static void Init(IServiceProvider services)
    {
        var scope = services.CreateScope();
        var ctx = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser<int>>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();

        // if ((ctx.GetService<IDatabaseCreator>() as RelationalDatabaseCreator)!.Exists())
        //     return;

        ctx.Database.EnsureCreated();
        IdentityResult result;
        if (roleManager.FindByNameAsync("Customer").GetAwaiter().GetResult() == null)
            result = roleManager.CreateAsync(new("Customer")).GetAwaiter().GetResult();

        if (roleManager.FindByNameAsync("Admin").GetAwaiter().GetResult() == null)
            result = roleManager.CreateAsync(new("Admin")).GetAwaiter().GetResult();

        if (roleManager.FindByNameAsync("Employee").GetAwaiter().GetResult() == null)
            result = roleManager.CreateAsync(new("Employee")).GetAwaiter().GetResult();

        if (userManager.FindByNameAsync("admin").GetAwaiter().GetResult() == null)
        {
            IdentityUser<int> user = new("admin");
            userManager.CreateAsync(user, "admin123").GetAwaiter().GetResult();
            userManager.AddToRoleAsync(user, "Admin").GetAwaiter().GetResult();
        }
        scope.Dispose();
    }
}