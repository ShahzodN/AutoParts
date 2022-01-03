using AutoParts.Application.Identity.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(u => u.Id);

        builder.HasOne(u => u.Account)
            .WithOne(a=>a.User)
            .HasForeignKey<User>(u => u.AccountId);
    }
}