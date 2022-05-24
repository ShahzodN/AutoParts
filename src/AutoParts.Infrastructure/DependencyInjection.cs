using System.Text;
using AutoParts.Application.Interfaces;
using AutoParts.Application.Repositories;
using AutoParts.Infrastructure.Repositories;
using AutoParts.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace AutoParts.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ApplicationDbContext>(opt =>
            {
                opt.UseNpgsql(config.GetConnectionString("psql"));
            });

            services.AddIdentity<IdentityUser<int>, IdentityRole<int>>(opt =>
            {
                opt.Password.RequireUppercase = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequiredLength = 8;
                opt.Password.RequireLowercase = false;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new()
                {
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidIssuer = config["JWT:ValidIssuer"],
                    ValidAudience = config["JWT:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(config["JWT:Secret"])),
                    ValidateLifetime = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddHttpContextAccessor();

            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IModelRepository, ModelRepository>();
            services.AddScoped<IConsignmentRepository, ConsignmentRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IManufactorRepository, ManufactorRepository>();
            services.AddScoped<ISaleRepository, SaleRepository>();
            services.AddScoped<TokenService>();

            services.AddScoped<IImageService, ImageService>();

            return services;
        }
    }
}