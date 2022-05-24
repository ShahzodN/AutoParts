using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AutoParts.Infrastructure.Persistence.Configurations;

public class SaleDetailsConfig : IEntityTypeConfiguration<SaleDetails>
{
    public void Configure(EntityTypeBuilder<SaleDetails> builder)
    {
        builder.ToTable("SaleDetails");

        builder.HasOne(s => s.Product)
                .WithMany(p => p.SaleDetails)
                .HasForeignKey(s => s.ProductId);

        builder.HasOne(s => s.Sale)
                .WithMany(s => s.SaleDetails)
                .HasForeignKey(x => x.SaleId);
    }
}