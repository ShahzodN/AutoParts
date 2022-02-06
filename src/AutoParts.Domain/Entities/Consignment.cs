using AutoParts.Domain.Interfaces;

namespace AutoParts.Domain.Entities;

public class Consignment : IEntity
{
    public DateTime Date { get; set; }
    public List<ConsignmentDetails> ConsignmentDetails { get; set; } = new();
}