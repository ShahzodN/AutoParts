using AutoParts.Application.Exceptions;
using AutoParts.Application.Identity.Models;
using AutoParts.Application.Interfaces;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using AutoParts.Domain.Interfaces;

namespace AutoParts.Infrastructure.Services
{
    public class ImageService : IImageService
    {
        public ImageService(ICategoryRepository categoryRepo,
                            IEmployeeRepository employeeRepo,
                            ICarRepository carRepo,
                            IManufactorRepository manufactorRepo)
        {
            this.categoryRepo = categoryRepo;
            this.employeeRepo = employeeRepo;
            this.carRepo = carRepo;
            this.manufactorRepo = manufactorRepo;
        }

        private readonly string imagesPath = "/home/shakhzod/Pictures/proj_images";
        private readonly ICategoryRepository categoryRepo;
        private readonly IEmployeeRepository employeeRepo;
        private readonly ICarRepository carRepo;
        private readonly IManufactorRepository manufactorRepo;

        public async Task<byte[]> GetCategoryImage(int id)
        {
            Category? category = await categoryRepo.GetById(id);

            if (category == null)
                throw new NotFoundException("Category with provided id was not found.");

            try
            {
                return await File.ReadAllBytesAsync(category.Image.Path!);
            }
            catch (Exception)
            {
                throw new Exception("File not found.");
            }
        }

        public async Task<byte[]> GetManufactorLogo(int id)
        {
            Manufactor? manufactor = await manufactorRepo.GetById(id);

            if (manufactor == null)
                throw new NotFoundException("Manufactor with provided id was not found.");

            try
            {
                return await File.ReadAllBytesAsync(manufactor.Image?.Path!);
            }
            catch (Exception)
            {
                throw new Exception("File not found.");
            }
        }

        public async Task<byte[]> GetEmployeeImage(int id)
        {
            Employee? employee = await employeeRepo.GetById(id);

            if (employee == null)
                throw new NotFoundException("Category with provided id was not found.");

            try
            {
                return await File.ReadAllBytesAsync(employee.Image.Path!);
            }
            catch (Exception)
            {
                throw new Exception("File not found.");
            }
        }

        public async Task<Image> SetImages(IEntity entity, string base64)
        {
            string type = entity.GetType().Name.ToLower();
            string fileExtension = ParseFileExtension(base64);
            string fileName = DateTimeOffset.Now.ToUnixTimeSeconds().ToString();
            Directory.CreateDirectory($"{imagesPath}/{type}/{entity.Id}");

            byte[] imageBytes = Convert.FromBase64String(base64.Substring(base64.IndexOf(',') + 1));
            using (FileStream stream = new FileStream($"{imagesPath}/{type}/{entity.Id}/{fileName}.{fileExtension}", FileMode.Create))
            {
                await stream.WriteAsync(imageBytes, 0, imageBytes.Count());
            }

            return new Image()
            {
                Path = $"{imagesPath}/{type}/{entity.Id}/{fileName}.{fileExtension}"
            };
        }

        private string ParseFileExtension(string base64)
        {
            string head = base64.Split(';')[0];
            string extension = head.Substring(base64.IndexOf('/') + 1);

            return extension;
        }

        public void DeleteImage(string? path)
        {
            if (path != null)
            {
                try
                {
                    Directory.Delete(Path.GetDirectoryName(path)!, true);
                }
                catch { }
            }
        }
    }
}