using AutoParts.Domain.Entities;
using AutoParts.Domain.Interfaces;

namespace AutoParts.Application.Interfaces
{
    public interface IImageService
    {
        Task<Image> SetImages(IEntity entity, string base64);
        Task<byte[]> GetCategoryImage(int id);
        Task<byte[]> GetManufactorLogo(int id);
        Task<byte[]> GetEmployeeImage(int id);
        void DeleteImage(string? path);
    }
}