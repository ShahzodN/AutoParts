using AutoParts.Application.Repositories;
using AutoParts.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AutoParts.Infrastructure.Repositories
{
    public abstract class BaseRepository<T, TContext> : IRepository<T>
        where T : IEntity
        where TContext : DbContext
    {
        public BaseRepository(TContext _context)
        {
            context = _context;
            Set = context.Set<T>();
        }
        
        protected readonly TContext context;
        protected readonly DbSet<T> Set;
        
        public async Task<T> Create(T model)
        {
            await Set.AddAsync(model);
            await context.SaveChangesAsync();
            return model;
        }

        public async Task Delete(int id)
        {
            var entity = await GetById(id);
            Set.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task<T?> GetById(int id)
        {
            return await Set.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<T> Update(T model)
        {
            Set.Update(model);
            await context.SaveChangesAsync();
            return await GetById(model.Id);
        }
    }
}