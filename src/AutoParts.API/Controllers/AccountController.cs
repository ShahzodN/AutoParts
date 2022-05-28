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
        private readonly UserManager<IdentityUser<int>> userManager;
        private readonly RoleManager<IdentityRole<int>> roleManager;

        public AccountController(TokenService tokenService, UserManager<IdentityUser<int>> userManager,
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

        [HttpPost("signup")]
        public async Task<ActionResult<object>> SignUp(SignUpCommand command)
        {
            if ((await userManager.FindByNameAsync(command.Email)) == null)
            {
                var user = new IdentityUser<int>(command.Email);
                var createResult = await userManager.CreateAsync(user, command.Password);

                if (!createResult.Succeeded)
                    throw new Exception("Что-то пошло не так. Повторите позже");

                if (!(await userManager.AddToRoleAsync(user, "Customer")).Succeeded)
                {
                    await userManager.DeleteAsync(user);
                    throw new Exception("Что-то пошло не так. Повторите позже");
                }

                return new
                {
                    Token = await tokenService.GenerateToken(user)
                };
            }

            throw new Exception("Пользователь таким email уже существует");
        }

        [HttpGet("signout")]
        public IActionResult Signout()
        {
            HttpContext.Response.Cookies.Delete("ASP.NET_CR");
            return Ok();
        }
    }
}