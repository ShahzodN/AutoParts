using AutoParts.Domain.Entities;

namespace AutoParts.Application.Repositories
{
    public interface IManufactorRepository : IRepository<Manufactor>
    {
        Task<Manufactor?> GetByName(string name);
    }
}