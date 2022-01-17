using AutoParts.Domain.Enums;

namespace AutoParts.Application.Identity.Models
{
    public class Employee : User
    {
        public string? Address { get; set; }
        public int Salary { get; set; }
        public string? Photo { get; set; }
        public EmployeePosition Position { get; set; }
    }
}