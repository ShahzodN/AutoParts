using System.Text.Json.Serialization;
using AutoParts.Application.JsonConverters;

namespace AutoParts.Application.Consignments.Queries;

public class ConsignmentDto
{
    public int Id { get; set; }

    [JsonConverter(typeof(DateTimeConverter))]
    public DateTime Date { get; set; }
    public List<ConsignmentDetailsDto> Products { get; set; } = new();
}