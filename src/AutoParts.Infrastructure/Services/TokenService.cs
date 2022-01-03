using System.IdentityModel.Tokens.Jwt;
using AutoParts.Application.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using AutoParts.Application.Identity.Models;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace AutoParts.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration configuration;

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GenerateToken(Account account)
        {
            var roles = account.Roles.Select(r => new System.Security.Claims.Claim("role", r.Name!));
            byte[] secretKey = Encoding.UTF32.GetBytes("qwertyuiop[]asdfghjkl;'zxcvbnm,.");

            JwtSecurityTokenHandler handler = new();
            SecurityTokenDescriptor descriptor = new()
            {
                Audience = "localhost",
                Subject = new ClaimsIdentity(roles),
                Issuer = "localhost",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature),
                Expires = DateTime.UtcNow.AddMinutes(1)
            };

            SecurityToken token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}