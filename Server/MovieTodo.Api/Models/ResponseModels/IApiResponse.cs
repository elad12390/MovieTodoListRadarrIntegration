
using Newtonsoft.Json;

namespace MovieTodo.Api.Models.ResponseModels
{
	public interface IApiResponse<T>
	{
		bool IsSuccessful { get; }

		bool HasValue { get; }

		int HttpCode { get; set; }

		int ErrorCode { get; set; }

		string ErrorMessage { get; set; }

		string DisplayMessage { get; set; }

		string ErrorDescription { get; set; }

		string Exception { get; set; }

		T Data { get; set; }

		////////////////////////////  Internal Use  ////////////////////////////
		
		[JsonIgnore]
		int EntityId { get; set; }
	}
}
