namespace AutoParts.Application.Identity.Models
{
    public class Error
    {
        public Error(string description, int code = 0)
        {
            Description = description;
            Code = code;
        }
        public string? Description { get; }
        public int Code { get;}
    }
}