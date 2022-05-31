using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AutoParts.Infrastructure.Persistence.Configurations;

public class ProductConfig : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(s => s.Id);

        builder.HasMany(s => s.Models)
            .WithMany(s => s.Products);

        builder.HasOne(s => s.Category)
            .WithMany(s => s.Products)
            .HasForeignKey(s => s.CategoryId)
            .IsRequired();
    }
}