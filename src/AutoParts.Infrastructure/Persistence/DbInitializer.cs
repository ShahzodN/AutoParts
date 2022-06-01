using AutoParts.Application.Identity;
using AutoParts.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace AutoParts.Infrastructure.Persistence;

public class DbInitializer
{
    public static void Init(IServiceProvider services)
    {
        var scope = services.CreateScope();
        var ctx = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<Account>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();

        if (!ctx.Database.EnsureCreated())
            return;

        IdentityResult result;

        if (roleManager.FindByNameAsync("Admin").GetAwaiter().GetResult() == null)
            result = roleManager.CreateAsync(new("Admin")).GetAwaiter().GetResult();

        if (roleManager.FindByNameAsync("Employee").GetAwaiter().GetResult() == null)
            result = roleManager.CreateAsync(new("Employee")).GetAwaiter().GetResult();

        if (userManager.FindByNameAsync("admin").GetAwaiter().GetResult() == null)
        {
            Employee employee = new() { Id = 1, FirstName = "Admin", LastName = "Admin" };
            Account user = new() { UserName = "admin", Employee = employee };
            userManager.CreateAsync(user, "12345678").GetAwaiter().GetResult();
            userManager.AddToRoleAsync(user, "Admin").GetAwaiter().GetResult();
        }
        if (userManager.FindByNameAsync("employee").GetAwaiter().GetResult() == null)
        {
            Employee employee = new() { Id = 2, FirstName = "Employee", LastName = "Employee" };
            Account user = new() { UserName = "employee", Employee = employee };

            userManager.CreateAsync(user, "12345678").GetAwaiter().GetResult();
            userManager.AddToRoleAsync(user, "Employee").GetAwaiter().GetResult();
        }


        Category cat = new()
        {
            Id = 1,
            Name = "Cat 1"
        };

        Manufactor manufactor = new()
        {
            Id = 1,
            Name = "Mercedes-Benz"
        };

        var models = new List<Model>();
        models.AddRange(new Model[] {
            new Model()
            {
                Id = 1,
                ModelName = "C class",
                YearOfIssue = 2022,
                Manufactor = manufactor,
                BodyType = Domain.Enums.BodyType.Седан
            }
        });

        Product product = new()
        {
            Id = 1,
            Category = cat,
            EAN = "2000001000014",
            Name = "Prod 1",
            Count = 10,
            Prices = new() { new Price() { Value = 1200, DateTime = DateTime.Now, ProductId = 1 } },
            Models = models
        };

        ctx.Add(cat);
        ctx.Add(manufactor);
        ctx.AddRange(models);
        ctx.Add(product);
        ctx.SaveChanges();
        scope.Dispose();
    }
}