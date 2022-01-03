using AutoParts.Domain.Interfaces;

namespace AutoParts.Application.Repositories
{
    public interface IRepository<T> where T : IEntity
    {
        Task<T?> GetById(int id);
        Task<T> Create(T model);
        Task<T?> Update(T model);
        Task Delete(int id);
    }
}