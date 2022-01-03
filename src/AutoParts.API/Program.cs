using AutoParts.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseCookiePolicy(new CookiePolicyOptions()
{
    HttpOnly = HttpOnlyPolicy.Always,
    MinimumSameSitePolicy = SameSiteMode.Strict
});
app.UseRouting();
app.Use(async (context, next) =>
{
    string? token = context.Request.Cookies["asp.net_auth"];
    if (token != null)
        context.Request.Headers.Append("Authorization", "Bearer " + token);
    await next();
});

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.MapFallbackToFile("index.html");

app.Run();
