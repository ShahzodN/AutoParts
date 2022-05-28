using AutoParts.API.Middleware;
using AutoParts.Application;
using AutoParts.Infrastructure;
using AutoParts.Infrastructure.Persistence;
using Microsoft.AspNetCore.CookiePolicy;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddCors(builder =>
{
    builder.AddPolicy("CashierApp", opt =>
    {
        opt.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});

var app = builder.Build();

DbInitializer.Init(app.Services);
app.UseMiddleware<ExceptionHandler>();
app.UseStaticFiles();
app.UseCookiePolicy(new CookiePolicyOptions()
{
    HttpOnly = HttpOnlyPolicy.Always,
    MinimumSameSitePolicy = SameSiteMode.Unspecified
});

app.UseCors("CashierApp");
app.UseRouting();
app.UseMiddleware<TokenWriter>();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => endpoints.MapControllers());

app.MapFallbackToFile("index.html");

app.Run();
