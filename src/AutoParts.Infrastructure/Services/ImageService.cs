using AutoParts.Application.Interfaces;
using AutoParts.Domain.Entities;
using AutoParts.Domain.Interfaces;
using Microsoft.AspNetCore.Hosting;

namespace AutoParts.Infrastructure.Services
{
    public class ImageService : IImageService
    {
        public ImageService(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        private readonly IWebHostEnvironment environment;
        public string ImagePath { get { return environment.WebRootPath; } }

        public async Task<Image> SetImages(IEntity entity, string base64)
        {
            string type = entity.GetType().Name;
            string fileExtension = ParseFileExtension(base64);
            string fileName = DateTimeOffset.Now.ToUnixTimeSeconds().ToString();
            Directory.CreateDirectory($"{ImagePath}/images/{type}/{entity.Id}");

            byte[] imageBytes = Convert.FromBase64String(base64.Substring(base64.IndexOf(',') + 1));

            using (FileStream stream = new FileStream($"{ImagePath}/images/{type}/{entity.Id}/{fileName}.{fileExtension}", FileMode.Create))
            {
                await stream.WriteAsync(imageBytes, 0, imageBytes.Count());
            }

            return new Image() { Name = $"{fileName}.{fileExtension}" };
        }

        public async Task<Image> UpdateImage(string type, int id, string base64)
        {
            var di = new DirectoryInfo($"{ImagePath}/images/{type}/{id}");
            if (di.Exists)
                di.GetFiles().FirstOrDefault()?.Delete();
            else
                di.Create();

            string fileExtension = ParseFileExtension(base64!);
            string fileName = DateTimeOffset.Now.ToUnixTimeSeconds().ToString();
            byte[] imageBytes = Convert.FromBase64String(base64!.Substring(base64.IndexOf(',') + 1));

            using (FileStream stream = new FileStream($"{ImagePath}/images/{type}/{id}/{fileName}.{fileExtension}", FileMode.Create))
            {
                await stream.WriteAsync(imageBytes, 0, imageBytes.Count());
            }

            return new Image() { Name = $"{fileName}.{fileExtension}" };
        }

        private string ParseFileExtension(string base64)
        {
            string head = base64.Split(';')[0];
            string extension = head.Substring(base64.IndexOf('/') + 1);

            return extension;
        }

        public void DeleteImage(string type, int id)
        {
            var di = new DirectoryInfo($"{ImagePath}/images/{type}/{id}");
            if (di.Exists)
                di.Delete(true);
        }
    }
}