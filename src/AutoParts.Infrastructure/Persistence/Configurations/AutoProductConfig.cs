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

        builder.HasMany(s => s.Models)
            .WithMany(s => s.Products);

        builder.HasOne(s => s.Category)
            .WithMany(s => s.Products)
            .HasForeignKey(s => s.CategoryId)
            .IsRequired();
    }
}