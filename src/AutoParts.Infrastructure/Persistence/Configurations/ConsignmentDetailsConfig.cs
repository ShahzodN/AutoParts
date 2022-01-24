using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AutoParts.Infrastructure.Persistence.Configurations;

public class ConsignmentDetailsConfig : IEntityTypeConfiguration<ConsignmentDetails>
{
    public void Configure(EntityTypeBuilder<ConsignmentDetails> builder)
    {
        builder.ToTable("ConsignmentDetails");

        builder.HasKey(s => s.Id);

        builder.HasOne(s => s.Consignment)
            .WithMany(s => s.ConsignmentDetails)
            .HasForeignKey(s => s.ConsignmentId);

        builder.HasOne(s => s.Product)
            .WithMany(s => s.ConsignmentDetails)
            .HasForeignKey(s => s.ProductId);
    }
}