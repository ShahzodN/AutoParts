using System.Text.Json;
using System.Text.Json.Serialization;
using AutoParts.Domain.Enums;

namespace AutoParts.Application.Attributes;

public class BodyTypeConverter : JsonConverter<BodyType>
{
    public override BodyType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var enumAsString = reader.GetString();
        if (enumAsString != null)
        {
            BodyType bt = Enum.Parse<BodyType>(enumAsString);
            return bt;
        }
        throw new Exception("BodyType is not defined.");
    }

    public override void Write(Utf8JsonWriter writer, BodyType value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}