using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;

namespace AutoParts.Infrastructure.Repositories;

public class CarRepository : BaseRepository<Car, ApplicationDbContext>, ICarRepository
{
    public CarRepository(ApplicationDbContext context) : base(context)
    {

    }
}