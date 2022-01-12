namespace MovieTodo.Api.Configurations;

public record RadarrConfiguration(string? Host = null, int? Port = null, string? ApiPath = null, string? ApiKey = null)
{
    public RadarrConfiguration() : this(null, null)
    {}
};