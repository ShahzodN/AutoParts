namespace AutoParts.Application.Identity.Models
{
    public class Claim
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<Account> Accounts { get; private set; } = new();
    }
}