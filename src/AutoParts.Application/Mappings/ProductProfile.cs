using AutoMapper;
using AutoParts.Application.Products.Commands;
using AutoParts.Application.Products.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Mappings;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductForAutocompleteDto>();
        CreateMap<CreateProductCommand, Product>()
            .ForMember(d => d.Image, opt => opt.Ignore())
            .ForMember(d => d.Models, opt => opt.Ignore());
        CreateMap<Product, ProductDto>()
            .ForMember(d => d.Image, opt => opt.MapFrom(src => src.Image!.Name));
    }
}