using System.Web;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using MovieTodo.Common.Extensions;
using MovieTodo.Entities.RadarrAPI;
using MovieTodo.Repositories;

namespace MovieTodo.Services;

public class RadarrService
{
    private const string HttpClientName = "Radarr";
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _apiKey;
    private readonly IMemoryCache _memoryCache;
    private readonly MovieTodoRepository _movieTodoRepository;

    private readonly MemoryCacheEntryOptions _movieCacheOptions = new() { SlidingExpiration = TimeSpan.FromMinutes(10) };

    public RadarrService(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        IMemoryCache memoryCache,
        MovieTodoRepository movieTodoRepository)
    {
        _httpClientFactory = httpClientFactory;
        _apiKey = configuration["Radarr:ApiKey"];
        _memoryCache = memoryCache;
        _movieTodoRepository = movieTodoRepository;
    }

    public async Task<List<Movie>?> GetMovies(CancellationToken cancellationToken = default) => 
        await _memoryCache.UseCachedValue(
            "movie",
            async () => 
                (await GetAsync<List<Movie>>("movie", cancellationToken: cancellationToken))?
                .Where(a => a.HasFile)
                .ToList(),
            _movieCacheOptions
        );

    public async Task<List<Movie>?> GetAllMovies(CancellationToken cancellationToken = default)
    {
        return (await GetMovies(cancellationToken))?.DistinctBy(m => m.TmdbId).ToList();
    }

    public async Task<Movie?> GetMovieById(long id, CancellationToken cancellationToken = default) =>
        (await GetMovies(cancellationToken))?.FirstOrDefault(m => m.Id == id);

    private async Task<T?> GetAsync<T>(string url, Dictionary<string, string>? queryInput = null, CancellationToken cancellationToken = default) where T: class
    {
        queryInput ??= new Dictionary<string, string>();
        var httpClient = _httpClientFactory.CreateClient(HttpClientName);
        var uriBuilder = new UriBuilder
        {
            Path = url,
        };
        var query = HttpUtility.ParseQueryString(uriBuilder.Query);
        query["apiKey"] = _apiKey;
        
        // Copy all query inputs
        foreach (var (k, v) in queryInput)
            query[k] = v;
        
        uriBuilder.Query = query.ToString();
        url = uriBuilder.Uri.GetComponents(UriComponents.PathAndQuery, UriFormat.UriEscaped)[1..];
        return await httpClient.GetJsonAsync<T>(url, cancellationToken);
    } 
}