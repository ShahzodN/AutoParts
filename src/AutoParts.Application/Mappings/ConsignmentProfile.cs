using AutoMapper;
using AutoParts.Application.Consignments.Commands.Create;
using AutoParts.Application.Consignments.Commands.Update;
using AutoParts.Application.Consignments.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Mappings;

public class ConsignmentProfile : Profile
{
    public ConsignmentProfile()
    {
        CreateMap<CreateConsignmentCommand, Consignment>();
        CreateMap<UpdateConsignmentCommand, Consignment>();
        CreateMap<Consignment, ConsignmentDto>()
            .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.ConsignmentDetails));
        CreateMap<ConsignmentDetails, ConsignmentDetailsDto>()
            .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product!.Name))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));
    }
}