using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;
public class WorkSchedule : IEntity
{
    public Employee Employee { get; set; } = null!;
    public int EmployeeId { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
}