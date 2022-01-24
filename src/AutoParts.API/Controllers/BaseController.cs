using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers
{
    [ApiController]
    public class BaseController : Controller
    {
        private IMediator mediator = null!;

        protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();
    }
}