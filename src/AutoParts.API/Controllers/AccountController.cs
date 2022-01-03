using System.Threading.Tasks;
using AutoParts.Application.Identity.Models;
using AutoParts.Application.Identity.QueryModels;
using AutoParts.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly ITokenService tokenService;
        private readonly IAccountManager accountManager;

        public AccountController(ITokenService tokenService, IAccountManager accountManager)
        {
            this.tokenService = tokenService;
            this.accountManager = accountManager;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromForm] LoginQueryModel model)
        {
            var account = await accountManager.FindByEmail(model.Email!);
            if (account != null)
            {
                string token = tokenService.GenerateToken(account);
                HttpContext.Response.Cookies.Append("asp.net_auth", token);
                return Ok();
            }

            return NotFound();
        }

        [HttpGet("secret")]
        [Authorize(Roles = "Admin,Customer")]
        public IActionResult Secret()
        {
            var a = new { Name = "Hello" };
            return Json(a);
        }

        [HttpPost("signout")]
        public IActionResult _SignOut()
        {
            HttpContext.Response.Cookies.Delete("asp.net_auth");
            return Ok();
        }
    }
}