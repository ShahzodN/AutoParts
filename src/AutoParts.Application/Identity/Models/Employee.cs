using AutoParts.Domain.Entities;
using AutoParts.Domain.Enums;

namespace AutoParts.Application.Identity.Models
{
    public class Employee : User
    {
        public string? Address { get; set; }
        public int Salary { get; set; }
        public Image Image { get; set; } = null!;
        public EmployeePosition Position { get; set; }
    }
}