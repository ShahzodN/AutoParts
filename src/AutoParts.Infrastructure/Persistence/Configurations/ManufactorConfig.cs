using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AutoParts.Infrastructure.Persistence.Configurations;

public class ManufactorConfig : IEntityTypeConfiguration<Manufactor>
{
    public void Configure(EntityTypeBuilder<Manufactor> builder)
    {
        builder.ToTable("Manufactors");

        builder.HasKey(s => s.Id);
    }
}