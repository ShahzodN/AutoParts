using AutoParts.API.Middleware;
using AutoParts.Application;
using AutoParts.Infrastructure;
using AutoParts.Infrastructure.Persistence;
using Microsoft.AspNetCore.CookiePolicy;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

DbInitializer.Init(app.Services);
if (!app.Environment.IsDevelopment())
    app.UseMiddleware<ExceptionHandler>();
app.UseStaticFiles();
app.UseCookiePolicy(new CookiePolicyOptions()
{
    HttpOnly = HttpOnlyPolicy.Always,
    MinimumSameSitePolicy = SameSiteMode.Strict
});

app.UseRouting();

app.UseMiddleware<TokenWriter>();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => endpoints.MapControllers());

app.MapFallbackToFile("index.html");

app.Run();
