using System.Reflection;
using AutoParts.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Npgsql;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {

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