using AutoParts.Domain.Entities;

namespace AutoParts.Application.Repositories;

public interface IModelRepository : IRepository<Model>
{
    Task Delete(string? modelName);
}