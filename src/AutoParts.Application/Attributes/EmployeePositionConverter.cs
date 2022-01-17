using System.Text.Json;
using System.Text.Json.Serialization;
using AutoParts.Domain.Enums;

namespace AutoParts.Application.Attributes;

public class EmployeePositionConverter : JsonConverter<EmployeePosition>
{
    public override EmployeePosition Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {

        string? pos = reader.GetString();

        EmployeePosition position = pos switch
        {
            "Администратор" => EmployeePosition.Администратор,
            "Сотрудник" => EmployeePosition.Сотрудник,
            "Охрана" => EmployeePosition.Охрана,
            "Уборщица" => EmployeePosition.Уборщица,
            _ => default
        };

        return position;
    }

    public override void Write(Utf8JsonWriter writer, EmployeePosition value, JsonSerializerOptions options)
    {
        string? s = Enum.GetName<EmployeePosition>(value);
        writer.WriteStringValue(s);
    }
}