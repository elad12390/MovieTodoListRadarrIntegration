using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using MovieTodo.Api.Models.ErrorMapping;
using MovieTodo.Api.Models.ResponseModels;
using MovieTodo.Services;

namespace MovieTodo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MovieTodoController : ControllerBase
{
    private readonly MovieTodoService _movieTodoService;

    public MovieTodoController(
        ILogger<MovieTodoController> logger,
        IConfiguration configuration,
        ErrorMapping errorMapping,
        MovieTodoService movieTodoService
        ) : base(logger, configuration, errorMapping)
    {
        _movieTodoService = movieTodoService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IApiResponse<List<Entities.MovieTodo>>), 200)]
    public async Task<IActionResult> GetAllAsync() =>
        await Run(async () => await ApiResponseFactory.CreateResponse(async () => await _movieTodoService.GetAllAsync()));

    [HttpPost("{movieId:long}")]
    [ProducesResponseType(typeof(IApiResponse<Entities.MovieTodo>), 200)]
    public async Task<IActionResult> AddAsync(long movieId) =>
        await Run(async () => await ApiResponseFactory.CreateResponse(async () => await _movieTodoService.AddAsync(movieId)));

    [HttpPut("Watched/{todoId:int}")]
    [ProducesResponseType(typeof(IApiResponse<List<Entities.MovieTodo>>), 200)]
    public async Task<IActionResult> SetWatchedAsync(int todoId) =>
        await Run(async () => await ApiResponseFactory.CreateResponse(async () => await _movieTodoService.SetWatchedAsync(todoId, true)));

    [HttpPut("NotWatched/{todoId:int}")]
    [ProducesResponseType(typeof(IApiResponse<List<Entities.MovieTodo>>), 200)]
    public async Task<IActionResult> SetNotWatchedAsync(int todoId) =>
        await Run(async () => await ApiResponseFactory.CreateResponse(async () => await _movieTodoService.SetWatchedAsync(todoId, false)));

    [HttpDelete("{todoId:int}")]
    [ProducesResponseType(typeof(IApiResponse<bool>), 200)]
    public async Task<IActionResult> RemoveByIdAsync(int todoId) =>
        await Run(async () => await ApiResponseFactory.CreateResponse(async () => await _movieTodoService.RemoveByIdAsync(todoId)));
    
}