using Microsoft.EntityFrameworkCore;

namespace MovieTodo.Entities;

public class MovieTodoDbContext : DbContext
{
    public DbSet<MovieTodo> MovieTodos { get; set; }
    
    public MovieTodoDbContext(DbContextOptions<MovieTodoDbContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MovieTodo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd();
            entity.Property(e => e.Title).HasMaxLength(250);
            entity.Property(e => e.OverView);
            entity.Property(e => e.MovieSpan);
            entity.Property(e => e.IsWatched);
            entity.Property(e => e.ImageSrc).HasMaxLength(250);
        });
        
        base.OnModelCreating(modelBuilder);
    }
}