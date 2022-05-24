using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Persistence.Configurations;

public class ConsignmentConfig : IEntityTypeConfiguration<Consignment>
{
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Consignment> builder)
    {
        builder.ToTable("Consignments");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.Date)
            .HasColumnType("timestamp with time zone");
    }
}
