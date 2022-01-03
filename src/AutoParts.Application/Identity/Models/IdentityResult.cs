namespace AutoParts.Application.Identity.Models
{
    public class IdentityResult
    {
        public bool Succeded { get; set; } = false;
        public List<Error> Errors { get; private set; } = new();
    }
}