namespace AutoParts.Application.Models.Queries;

public class ModelWithYearsOfIssueDto
{
    public string? Model { get; set; }
    public List<int> YearsOfIssue { get; set; } = new();
}