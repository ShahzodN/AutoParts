using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;

namespace AutoParts.Infrastructure.Persistence;

public class DbInitializer
{
    public static void Init(IServiceProvider services)
    {
        var scope = services.CreateScope();
        var ctx = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        if ((ctx.GetService<IDatabaseCreator>() as RelationalDatabaseCreator)!.Exists())
            return;

        ctx.Database.EnsureCreated();

        Category category = new()
        {
            Id = 1,
            Name = "Аккумуляторы"
        };

        AutoProduct pr1 = new()
        {
            CategoryId = category.Id,
            Name = "Зарядное устройство со встроенным микропроцессором и цифровым дисплеем, ZIPOWER",
            Price = 5400
        };

        AutoProduct pr2 = new()
        {
            CategoryId = category.Id,
            Name = "Аккумулятор 100 а/ч, европейская полярность BOSCH 600 402 083 S5 (013)",
            Price = 16000
        };

        ctx.Database.EnsureCreated();
        ctx.Add(category);
        ctx.AddRange(pr1, pr2);
        ctx.SaveChanges();

        scope.Dispose();
    }
}