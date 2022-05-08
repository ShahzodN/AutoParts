using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers;

[Authorize(Roles = "Admin, Employee")]
[Route("/api/[controller]")]
public class DashboardController : BaseController
{
    [HttpGet]
    public string GetSecret()
    {
        return "123";
    }
}