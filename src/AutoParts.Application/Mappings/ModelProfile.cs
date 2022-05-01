using AutoMapper;
using AutoParts.Application.Models.Commands.Create;
using AutoParts.Application.Models.Commands.Update;
using AutoParts.Application.Models.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Mappings;

public class ModelProfile : Profile
{
    public ModelProfile()
    {
        CreateMap<CreateModelCommand, Model>()
            .ForMember(d => d.Manufactor, opt => opt.Ignore())
            .ForPath(d => d.ModelName, opt => opt.MapFrom(src => src.Model));
        CreateMap<Model, ModelDto>()
            .ForPath(d => d.Manufactor, opt => opt.MapFrom(src => src.Manufactor.Name));
        CreateMap<UpdateModelCommand, Model>();

        CreateMap<Manufactor, ManufactorDto>();
        CreateMap<CreateManufactorCommand, Manufactor>()
            .ForMember(d => d.Image, opt => opt.Ignore());
    }
}