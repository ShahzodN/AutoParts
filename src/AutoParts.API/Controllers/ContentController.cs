using AutoParts.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[ApiController]
[Route("api/content")]
public class ContentController : Controller
{
    private readonly IImageService imageService;

    public ContentController(IImageService imageService)
    {
        this.imageService = imageService;
    }

    [HttpGet("category/{id}")]
    public async Task<IActionResult> GetCategoryImage(int id)
    {
        byte[] imageBytes = await imageService.GetCategoryImage(id);
        return File(imageBytes, "image/jpeg");
    }

    [HttpGet("employee/{id}")]
    public async Task<IActionResult> GetEmployeeImage(int id)
    {
        byte[] imageBytes = await imageService.GetEmployeeImage(id);
        return File(imageBytes, "image/jpeg");
    }
}