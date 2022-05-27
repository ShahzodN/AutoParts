using AutoParts.Domain.Enums;
using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Employee : IEntity
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }
    public int Salary { get; set; }
    public Image Image { get; set; } = null!;
    public EmployeePosition Position { get; set; }
}