using AutoMapper;
using AutoParts.Application.Products.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Mappings;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<AutoProduct, ProductForAutocompleteDto>();
    }
}