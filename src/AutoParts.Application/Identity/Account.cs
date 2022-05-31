using AutoParts.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace AutoParts.Application.Identity;
public class Account : IdentityUser<int>
{
    public Employee Employee { get; set; } = null!;
    public int EmployeeId { get; set; }
}