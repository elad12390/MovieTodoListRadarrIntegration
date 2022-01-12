using System.Net.Http.Headers;
using System.Web;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MovieTodo.Api.Configurations;
using MovieTodo.Api.Models.ErrorMapping;
using MovieTodo.Common.Extensions;
using MovieTodo.Entities;
using MovieTodo.Repositories;
using MovieTodo.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureAppConfiguration((hostingContext, config) =>
{
    config
        .AddJsonFile("appsettings.radarr.json", optional: false, reloadOnChange: true)
        .AddEnvironmentVariables()
        .Build();
});

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();



// Add services to the container.
builder.Services
    .AddDbContext<MovieTodoDbContext>(options =>
    {
        options.UseSqlite(configuration.GetConnectionString("DefaultConnection"),
            optionsBuilder => optionsBuilder.MigrationsAssembly("MovieTodo.Entities"));
    });

builder.Services.AddSingleton(new MapperConfiguration(mc => mc.AddProfile(new MappingProfile(provider))).CreateMapper());

// Singleton Services
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<ErrorMapping>();

// Scoped Services
builder.Services.AddScoped<MovieTodoService>();
builder.Services.AddScoped<RadarrService>();

// Repositories
builder.Services.AddScoped<MovieTodoRepository>();

// Add Automapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddCors(o => o.AddPolicy("AllowAllPolicy", builder =>
{
    builder.WithOrigins("*")
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));
// HttpClients
builder.Services.AddHttpClient("Radarr", client =>
{
    var radarrConfig = configuration.GetSection("Radarr").Get<RadarrConfiguration>();
    var uriBuilder = new UriBuilder
    {
        Port = radarrConfig.Port ?? 7878,
        Path = radarrConfig.ApiPath,
        Host = radarrConfig.Host
    };
    
    var query = HttpUtility.ParseQueryString(uriBuilder.Query);
    query["apiKey"] = radarrConfig.ApiKey;
    
    client.Timeout = TimeSpan.FromMinutes(10);
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    client.BaseAddress = uriBuilder.Uri;
});

builder.Services
    .AddControllers()
    .AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MovieTodoDbContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAllPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();