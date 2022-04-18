using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace AutoParts.Infrastructure.Persistence.Configurations;

public class ModelConfig : IEntityTypeConfiguration<Model>
{
    public void Configure(EntityTypeBuilder<Model> builder)
    {
        builder.ToTable("Models");

        builder.HasKey(s => s.Id);

        builder.HasOne(s => s.Manufactor)
                .WithMany(s => s.Models)
                .HasForeignKey(s => s.ManufactorId);
    }
}