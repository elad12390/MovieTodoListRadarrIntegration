namespace MovieTodo.Entities;

public class MovieTodo {
    public int Id { get; set; }
    public int RadarrId { get; set; }
    public string Title {get;set;}
    public string OverView {get;set;}
    public TimeSpan MovieSpan {get;set;}
    public bool IsWatched {get;set;}
    public string ImageSrc {get;set;}
    public MovieTodo()
    {
    }
};