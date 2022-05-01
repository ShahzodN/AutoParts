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
}