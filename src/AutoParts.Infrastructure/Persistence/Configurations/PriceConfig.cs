using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AutoParts.Infrastructure.Persistence.Configurations;

public class PriceConfig : IEntityTypeConfiguration<Price>
{
    public void Configure(EntityTypeBuilder<Price> builder)
    {
        builder.ToTable("Prices");

        builder.HasOne(x => x.Product)
                .WithMany(x => x.Prices)
                .HasForeignKey(x => x.ProductId);

        builder.Property(x => x.DateTime)
                .HasColumnType("timestamp");
    }
}