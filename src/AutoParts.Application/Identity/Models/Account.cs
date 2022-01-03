using AutoParts.Domain.Interfaces;

namespace AutoParts.Application.Identity.Models
{
    public class Account : IEntity
    {
        private string? email = null;
        public string? Email 
        {
            get => email;
            set
            {
                email = value;
                NormalizedEmail = email!.ToUpper();
            }
        }
        public string? NormalizedEmail { get; private set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public List<Role> Roles { get; private set; } = new();
        public List<Claim> Claims { get; private set; } = new();
        public DateTime? CreatedDate { get; set; }
        public User? User { get; set; }
        public int? UserId { get; set; }
    }
}