using System.Linq.Expressions;
using AutoParts.Domain.Interfaces;

namespace AutoParts.Application.Repositories
{
    public interface IRepository<T> where T : IEntity
    {
        Task<T?> GetById(int id);
        Task<List<T>> GetAll(Expression<Func<T, bool>> expression = null!);
        Task<T> Create(T model);
        Task<T?> Update(T model);
        Task Delete(int id);
    }
}