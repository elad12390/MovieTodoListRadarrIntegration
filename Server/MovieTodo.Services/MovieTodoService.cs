using AutoMapper;
using Microsoft.Extensions.Configuration;
using MovieTodo.Entities;
using MovieTodo.Repositories;

namespace MovieTodo.Services;

public class MovieTodoService
{
    private readonly MovieTodoRepository _movieTodoRepository;
    private readonly RadarrService _radarrService;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public MovieTodoService(MovieTodoRepository movieTodoRepository, RadarrService radarrService, IMapper mapper, IConfiguration configuration)
    {
        _movieTodoRepository = movieTodoRepository;
        _radarrService = radarrService;
        _mapper = mapper;
        _configuration = configuration;
    }
    
    public async Task<List<Entities.MovieTodo>> GetAllAsync()
    {
        var movies = await _movieTodoRepository.GetAllAsync();
        return movies
            .Select(movie =>
            {
                movie.ImageSrc = movie.ImageSrc != "" ? $"{_configuration["Radarr:Host"]}:{_configuration["Radarr:Port"]}{movie.ImageSrc}" : "";
                return movie;
            })
            .OrderBy(s => s.MovieSpan).ToList();
    }
    
    public async Task<Entities.MovieTodo?> AddAsync(long movieId)
    {
        var movie = await _radarrService.GetMovieById(movieId);
        var newMovie = _mapper.Map<Entities.MovieTodo>(movie);
        var isAdded = await _movieTodoRepository.Add(newMovie) == 1;
        if (isAdded)
            newMovie.ImageSrc = newMovie.ImageSrc != "" ? $"{_configuration["Radarr:Host"]}:{_configuration["Radarr:Port"]}{newMovie.ImageSrc}" : "";
        return isAdded ? newMovie : null;
    }
    
    public async Task<bool> SetWatchedAsync(int todoId, bool watched)
    {
        var todo = await _movieTodoRepository.GetByIdAsync(todoId);

        if (todo is { })
            todo.IsWatched = watched;
        var result = await _movieTodoRepository.UpdateAsync(todo) == 1;
        todo.ImageSrc = todo.ImageSrc != "" ? $"{_configuration["Radarr:Host"]}:{_configuration["Radarr:Port"]}{todo.ImageSrc}" : "";
        return result;
    }
    
    public async Task<bool> RemoveByIdAsync(int todoId)
    {

        var response = await _movieTodoRepository.RemoveByIdAsync(todoId) == 1;
        return response;
    }
}