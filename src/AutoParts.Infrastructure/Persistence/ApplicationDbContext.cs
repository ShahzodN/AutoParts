using System.Reflection;
using AutoParts.Application.Identity;
using AutoParts.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql;

public class ApplicationDbContext : IdentityDbContext<Account, IdentityRole<int>, int>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        // Database.EnsureCreated();
    }

    static ApplicationDbContext()
    {
        NpgsqlConnection.GlobalTypeMapper.MapEnum<EmployeePosition>();
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.HasPostgresEnum<EmployeePosition>();
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}