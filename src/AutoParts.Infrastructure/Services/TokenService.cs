using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;

namespace AutoParts.Infrastructure.Services;
public class TokenService
{
    private readonly IConfiguration configuration;
    private readonly UserManager<IdentityUser<int>> userManager;

    public TokenService(IConfiguration configuration, UserManager<IdentityUser<int>> userManager)
    {
        this.configuration = configuration;
        this.userManager = userManager;
    }

    public async Task<string> GenerateToken(IdentityUser<int> user)
    {
        var roles = await userManager.GetRolesAsync(user);
        var claims = new List<Claim>();
        claims.Add(new Claim(JwtRegisteredClaimNames.Name, user.UserName));
        claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

        byte[] secretKey = Encoding.ASCII.GetBytes(configuration["JWT:Secret"]);
        var securityKey = new SymmetricSecurityKey(secretKey);

        JwtSecurityTokenHandler handler = new();

        var token = new JwtSecurityToken(
            issuer: configuration["JWT:ValidIssuer"],
            audience: configuration["JWT:ValidAudience"],
            claims: claims,
            signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
        );

        return handler.WriteToken(token);
    }
}