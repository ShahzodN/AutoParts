using AutoParts.API.Middleware;
using AutoParts.Application;
using AutoParts.Infrastructure;
using AutoParts.Infrastructure.Persistence;

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
app.UseCors("CashierApp");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => endpoints.MapControllers());

app.MapFallbackToFile("index.html");

app.Run();
