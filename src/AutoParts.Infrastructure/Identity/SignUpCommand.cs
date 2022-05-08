namespace AutoParts.Infrastructure.Identity;

public class SignUpCommand
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}