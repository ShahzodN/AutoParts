using AutoParts.Domain.Entities;

namespace AutoParts.Application.Consignments.Queries;

public class ConsignmentDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public List<ConsignmentDetailsDto> Products { get; set; } = new();
}