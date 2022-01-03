using AutoParts.Application.Identity.Models;
using AutoParts.Application.Identity.QueryModels;

namespace AutoParts.Application.Identity
{
    public interface ISignInManager
    {
        Task<IdentityResult> SignInAsync(LoginQueryModel model);
    }
}