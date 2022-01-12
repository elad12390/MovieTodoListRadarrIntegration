using MovieTodo.Api.Models.ResponseModels;

namespace MovieTodo.Api.Models.ErrorMapping;

public class ErrorMapping
{
    private readonly Dictionary<int, Tuple<int, string>> _errors = new() {
        { 0,     new Tuple <int, string>(200, "Success !!") },
        { 1001,  new Tuple <int, string>(401, "Invalid username or password.")},
        { 1002,  new Tuple <int, string>(400, "Invalid password format.") },
        { 1003,  new Tuple <int, string>(400, "Password has been used in the past.") },
        { 1004,  new Tuple <int, string>(401, "Token is wrong or expired.") },
        { 1101,  new Tuple <int, string>(400, "DB - duplicate key violation.") },
        { 9997,  new Tuple <int, string>(400, "The request payload is invalid.") },
        { 9998,  new Tuple <int, string>(400, "Missing mapping.")},
        { 9999,  new Tuple <int, string>(400, "Unknown error.") }
    };

    public ErrorMapping()
    {

    }

    public ErrorResponseModel? GetErrorModel(int innerCode)
    {
        var (code, message) = _errors[innerCode];
        if (_errors.ContainsKey(innerCode))
        {
            return new ErrorResponseModel
            {
                InnerCode = innerCode,
                HttpCode = code,       
                Message = message
            };
        }

        return null;
    }
}