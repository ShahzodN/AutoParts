using AutoParts.Application.Identity.Models;

namespace AutoParts.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(Account account);
    }
}