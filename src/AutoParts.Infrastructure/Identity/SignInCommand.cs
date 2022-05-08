namespace AutoParts.Infrastructure.Identity;

public class SignInCommand
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}