using System.Text.Json.Serialization;
using AutoParts.Application.JsonConverters;
using AutoParts.Domain.Enums;

namespace AutoParts.Application.Employees.Queries
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [JsonConverter(typeof(EmployeePositionConverter))]
        public EmployeePosition Position { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public int Salary { get; set; }
        public string? Photo { get; set; }
        public bool HasAccount { get; set; }
    }
}