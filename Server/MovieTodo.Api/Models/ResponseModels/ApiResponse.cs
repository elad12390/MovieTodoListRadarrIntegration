using MovieTodo.Common.Enums;
using Newtonsoft.Json;

namespace MovieTodo.Api.Models.ResponseModels
{
	public class ApiResponse<T> : IApiResponse<T>
	{
		public ApiResponse()
		{
			HttpCode = 200;
			ErrorCode = (int)InnerErrorCode.Ok;
		}

		public ApiResponse(int code, string description, T data = default(T))
		{
			ErrorCode = code;
			ErrorDescription = description;
			Data = data;
		}

		public bool IsSuccessful => ((this.HttpCode >= 200 && this.HttpCode <= 299) && (this.ErrorCode == (int)InnerErrorCode.Ok));

		public bool HasValue
		{
			get
			{
				if (typeof(T).IsValueType)
				{
					return true;
				}

				// TODO: Handle empty lists that are not null.

				return (object)this.Data != default;
			} 
		}

		public int HttpCode { get; set; }

		public int ErrorCode { get; set; }

		public string ErrorMessage { get; set; }

		public string DisplayMessage { get; set; }

		public string ErrorDescription { get; set; }

		public string Exception { get; set; }

		public T Data { get; set; }

		public bool? HasMore { get; set; }


		////////////////////////////  Internal Use  ////////////////////////////
		
		[JsonIgnore]
		public int EntityId { get; set; }
	}
}
