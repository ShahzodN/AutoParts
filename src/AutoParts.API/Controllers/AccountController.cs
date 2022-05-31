using AutoParts.Application.Identity;
using AutoParts.Infrastructure.Identity;
using AutoParts.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AutoParts.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly TokenService tokenService;
        private readonly UserManager<Account> userManager;
        private readonly RoleManager<IdentityRole<int>> roleManager;

        public AccountController(TokenService tokenService, UserManager<Account> userManager,
                                RoleManager<IdentityRole<int>> roleManager)
        {
            this.tokenService = tokenService;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpPost("signin")]
        public async Task<ActionResult<object>> SignIn(SignInCommand command)
        {
            var user = await userManager.FindByNameAsync(command.Email);

            if (user != null && await userManager.CheckPasswordAsync(user, command.Password))
            {
                var token = await tokenService.GenerateToken(user);
                var userRoles = await userManager.GetRolesAsync(user);

                return Ok(new { AccessToken = token, User = user.UserName });
            }
            return Unauthorized(new { Error = "Неправильный логин или пароль" });
        }
    }
}