using AutoMapper;
using AutoParts.Application.Models.Commands.Create;
using AutoParts.Application.Models.Commands.Update;
using AutoParts.Application.Models.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Mappings;

public class CarProfile : Profile
{
    public CarProfile()
    {
        CreateMap<CreateModelCommand, Car>()
            .ForMember(d => d.Manufactor, opt => opt.Ignore());
        CreateMap<Car, ModelDto>()
            .ForPath(d => d.Manufactor, opt => opt.MapFrom(src => src.Manufactor.Name));
        CreateMap<UpdateModelCommand, Car>();

        CreateMap<Manufactor, ManufactorDto>();
        CreateMap<CreateManufactorCommand, Manufactor>()
            .ForMember(d => d.Image, opt => opt.Ignore());
    }
}