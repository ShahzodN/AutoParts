using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AutoParts.Infrastructure.Persistence.Configuration;

public class AutoProductConfig : IEntityTypeConfiguration<AutoProduct>
{
    public void Configure(EntityTypeBuilder<AutoProduct> builder)
    {
        builder.ToTable("AutoProducts");

        builder.HasKey(s => s.Id);

        builder.HasOne(s => s.Car)
            .WithMany(s => s.Products)
            .HasForeignKey(s => s.CarId)
            .IsRequired(false);

        builder.HasOne(s => s.Category)
            .WithMany(s => s.Products)
            .HasForeignKey(s => s.CategoryId)
            .IsRequired();
    }
}