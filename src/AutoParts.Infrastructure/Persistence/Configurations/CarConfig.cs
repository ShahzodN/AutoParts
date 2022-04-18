using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace AutoParts.Infrastructure.Persistence.Configurations;

public class CarConfig : IEntityTypeConfiguration<Car>
{
    public void Configure(EntityTypeBuilder<Car> builder)
    {
        builder.ToTable("Cars");

        builder.HasKey(s => s.Id);

        builder.HasOne(s => s.Manufactor)
                .WithMany(s => s.Cars)
                .HasForeignKey(s => s.ManufactorId);
    }
}