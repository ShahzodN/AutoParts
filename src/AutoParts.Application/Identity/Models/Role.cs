using AutoParts.Domain.Interfaces;

namespace AutoParts.Application.Identity.Models
{
    public class Role : IEntity
    {
        private string? name = null;
        public string? Name
        {
            get => name;
            set
            {
                name = value;
                NormalizedName = name!.ToUpper();
            }
        }
        public string? NormalizedName { get; private set; }
        public List<Account> Account { get; private set; } = new();
    }
}