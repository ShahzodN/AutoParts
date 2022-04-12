using AutoParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AutoParts.Infrastructure.Persistence.Configurations
{
    public class ImageConfiguration : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.ToTable("Images");

            builder.HasKey(s => s.Id);

            builder.HasOne(s => s.Category)
                .WithOne(s => s.Image)
                .HasForeignKey<Image>(s => s.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(s => s.Product)
                .WithMany(s => s.Images)
                .HasForeignKey(s => s.ProductId);

            builder.HasOne(s => s.Car)
                .WithOne(s => s.ManufactorLogo)
                .HasForeignKey<Image>(s => s.CarId);
        }
    }
}