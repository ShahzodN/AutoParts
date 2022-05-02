using AutoParts.Domain.Entities;
using AutoParts.Domain.Interfaces;

namespace AutoParts.Application.Interfaces
{
    public interface IImageService
    {
        Task<Image> SetImages(IEntity entity, string base64);
        Task<string> UpdateImage(string type, int id, string base64);
        void DeleteImage(string type, int id);
    }
}