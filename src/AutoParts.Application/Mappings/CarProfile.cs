using AutoMapper;
using AutoParts.Application.Cars.Commands.Create;
using AutoParts.Application.Cars.Commands.Update;
using AutoParts.Application.Cars.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Mappings;

public class CarProfile : Profile
{
    public CarProfile()
    {
        CreateMap<CreateCarCommand, Car>();
        CreateMap<Car, CarDto>();
        CreateMap<UpdateCarCommand, Car>();

        CreateMap<Manufactor, ManufactorDto>();
        CreateMap<CreateManufactorCommand, Manufactor>()
            .ForMember(d => d.Image, opt => opt.Ignore());
    }
}