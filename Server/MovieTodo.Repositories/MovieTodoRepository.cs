using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MovieTodo.Common.Extensions;
using MovieTodo.Entities;

namespace MovieTodo.Repositories;

public class MovieTodoRepository
{
    private readonly MovieTodoDbContext _dbContext;
    private readonly IConfiguration _configuration;

    public MovieTodoRepository(MovieTodoDbContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    public async Task<List<Entities.MovieTodo>> GetAllAsync() =>
        await _dbContext.MovieTodos.AsNoTracking().ToListAsync();

    public async Task<Entities.MovieTodo?> GetByIdAsync(int id) =>
        await _dbContext.MovieTodos.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);

    public async Task<int> UpdateAsync(Entities.MovieTodo todo)
    {
        _dbContext.MovieTodos.Update(todo);
        var result = await _dbContext.SaveChangesAsync();
        
        todo.Detach(_dbContext);
        return result;
    }

    public async Task<int> Add(Entities.MovieTodo todo)
    {
        await _dbContext.MovieTodos.AddAsync(todo);
        var result = await _dbContext.SaveChangesAsync();
        
        todo.Detach(_dbContext);
        return result;
    }

    public async Task<int> RemoveByIdAsync(int id)
    {
        _dbContext.MovieTodos.Remove(new Entities.MovieTodo {Id=id});
        return await _dbContext.SaveChangesAsync();
    }
}