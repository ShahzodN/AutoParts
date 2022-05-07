using AutoMapper;
using AutoParts.Application.Categories.Commands.Create;
using AutoParts.Application.Categories.Commands.Update;
using AutoParts.Application.Categories.Queries;
using AutoParts.Domain.Entities;

namespace AutoParts.Application.Mappings;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, CategoryDto>()
            .ForMember(d => d.Image, opt => opt.MapFrom(src => src.Image.Name))
            .ForMember(d => d.ProductsCount, opt => opt.MapFrom(src => src.Products.Count));

        CreateMap<Category, Category>().ForMember(d => d.Image, opt => opt.Ignore());

        CreateMap<CreateCategoryCommand, Category>().ForMember(dest => dest.Image, opt => opt.Ignore());

        CreateMap<UpdateCategoryCommand, Category>()
            .ForMember(d => d.Image, opt => opt.Ignore());
    }
}