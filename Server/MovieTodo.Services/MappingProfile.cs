using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MovieTodo.Entities.RadarrAPI;

namespace MovieTodo.Services;

public class MappingProfile : Profile
{
    public MappingProfile(ServiceProvider serviceProvider)
    {
        CreateMap<Movie, Entities.MovieTodo>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.MovieSpan, opt => opt.MapFrom(src => TimeSpan.FromMinutes(src.Runtime)))
            .ForMember(dest => dest.RadarrId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.ImageSrc, opt => opt.MapFrom(src => src.Images.FirstOrDefault() != null ? src.Images.FirstOrDefault()!.Url : ""));
    }
}