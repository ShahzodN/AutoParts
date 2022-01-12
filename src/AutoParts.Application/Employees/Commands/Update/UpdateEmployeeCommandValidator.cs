using FluentValidation;

namespace AutoParts.Application.Employees.Commands.Update
{
    public class UpdateEmployeeCommandValidator : AbstractValidator<UpdateEmployeeCommand>
    {
        public UpdateEmployeeCommandValidator()
        {
            this.CascadeMode = CascadeMode.Stop;

            RuleFor(s => s.FirstName)
                .NotEmpty().WithMessage("Имя не должно быть пустым")
                .Must(s => s!.All(l => char.IsLetter(l))).WithMessage("Имя может содержать только буквы")
                .MaximumLength(30).WithMessage("Максимальная длина 30");

            RuleFor(s => s.LastName)
                .NotEmpty().WithMessage("Фамилия не должна быть пустым")
                .Must(s => s!.All(l => char.IsLetter(l))).WithMessage("Фамилия может содержать только буквы")
                .MaximumLength(30).WithMessage("Максимальная длина 30");

            RuleFor(s => s.Salary)
                .GreaterThanOrEqualTo(0).WithMessage("ЗП не может быть отрицательной");
        }
    }
}