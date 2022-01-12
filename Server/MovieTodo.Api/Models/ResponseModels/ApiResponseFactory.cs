
using System.Reflection;
using System.Runtime.ExceptionServices;

namespace MovieTodo.Api.Models.ResponseModels
{
    public static class ApiResponseFactory
    {
        public static async Task<ApiResponse<T>> CreateResponse<T>(Func<Task<T>> fn, Action<Exception>? onError = null)
        {
            var response = new ApiResponse<T>();

            try
            {
                response.Data = await fn.Invoke();
            }
            catch (Exception ex)
            {
                if (onError != null) onError.Invoke(ex);
                else
                {
                    ExceptionDispatchInfo.Capture(ex).Throw();
                    throw;
                }
            }

            return response;
        }
    }
}