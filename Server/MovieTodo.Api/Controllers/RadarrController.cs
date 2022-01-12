using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using MovieTodo.Api.Models.ErrorMapping;
using MovieTodo.Api.Models.ResponseModels;
using MovieTodo.Entities.RadarrAPI;
using MovieTodo.Services;

namespace MovieTodo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RadarrController : ControllerBase
{
    private readonly RadarrService _radarrService;

    public RadarrController(
        ILogger<RadarrController> logger,
        IConfiguration configuration,
        ErrorMapping errorMapping,
        RadarrService radarrService
        ) : base(logger, configuration, errorMapping)
    {
        _radarrService = radarrService;
    }

    [HttpGet("movie")]
    [ProducesResponseType(typeof(IApiResponse<List<Movie>>), 200)]
    public async Task<IActionResult> GetAllMovies(CancellationToken cancellation) =>
        await Run(async () =>
        {
            return await ApiResponseFactory.CreateResponse(async () => await _radarrService.GetAllMovies(cancellation));
        });
    
}