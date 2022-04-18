namespace AutoParts.Application.Models.Queries;

public class ModelDto
{
    public string? Manufactor { get; set; }
    public string? ModelName { get; set; }
    public List<SpecificModel> SpecificModels { get; set; } = new();
}

public class SpecificModel
{
    public int YearOfIssue { get; set; }
    public List<ModelWithBody> Bodies { get; set; } = new();
}

public record ModelWithBody(int Id, string Type);