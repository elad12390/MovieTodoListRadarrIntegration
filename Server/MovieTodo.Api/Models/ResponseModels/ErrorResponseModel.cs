namespace MovieTodo.Api.Models.ResponseModels;

public class ErrorResponseModel
{
    public int HttpCode { get; set; }
    public int InnerCode { get; set; }
    public string Message { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Exception { get; set; } = string.Empty;
}