using System.Reflection;
using System.Runtime.ExceptionServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MovieTodo.Common.Enums;
using MovieTodo.Common.Extensions;
using MovieTodo.Api.Models.ErrorMapping;
using MovieTodo.Api.Models.ResponseModels;

namespace MovieTodo.Api.Controllers;

[EnableCors("AllowAllPolicy")]
[ApiController]
public class ControllerBase : Microsoft.AspNetCore.Mvc.ControllerBase
{
	//*********************  Data members/Constants  *********************//
	protected readonly ILogger<ControllerBase> _logger;
	protected readonly IConfiguration _configuration;
	protected readonly ErrorMapping _errorMapping;


	//*************************    Construction    *************************//
	//**********************************************************************//
	
	//public BaseController(ErrorMapper errorMapper, ILogger<BaseController> logger/*, IConfiguration configuration*/)
	//{
	//	_errorMapper = errorMapper;
	//	_logger = logger;
	//	//_configuration = configuration;
	//}

	protected ControllerBase(ILogger<ControllerBase> logger, IConfiguration configuration, ErrorMapping errorMapping)
	{
		_logger = logger;
		_configuration = configuration;
		_errorMapping = errorMapping;
	}

	//*************************    Properties    *************************//
	//********************************************************************//

	//*************************    Actions    *************************//
    //*****************************************************************//


	//*************************    Public Methods    *************************//
	//************************************************************************//
	protected IActionResult Run<T>(Func<ApiResponse<T>> action)
	{
		try
		{
			return CreateHttpResponse(action());
		}
		catch (Exception ex)
		{
			_logger.LogError("Failed - ex: {Ex}", ex);
			throw new Exception(ex.Message);
		}
	}
	protected async Task<IActionResult> Run<T>(Func<Task<ApiResponse<T>>> action)
	{
		try
		{
			return CreateHttpResponse(await action());
		}
		catch (Exception ex)
		{
			_logger.LogError("Failed - ex: {Ex}", ex);
			ExceptionDispatchInfo.Capture(ex).Throw();
			throw;
		}
	}

	////////////////////////////  Response  ////////////////////////////
	protected IActionResult CreateHttpResponse(InnerErrorCode errorCode)
	{
		return CreateHttpResponse((ApiResponse<object>)null, errorCode, "");
	}

	protected IActionResult CreateHttpResponse(InnerErrorCode errorCode, Exception ex)
	{
		return CreateHttpResponse((ApiResponse<object>)null, errorCode, ex);
	}

	protected IActionResult CreateHttpResponse<T>(IApiResponse<T> responseModel, InnerErrorCode errorCode, Exception ex)
	{
		responseModel ??= new ApiResponse<T>();

		responseModel.ErrorCode = (int)errorCode;
		responseModel.Exception = ex.ToString();

		return CreateHttpResponse(responseModel);
	}

	protected IActionResult CreateHttpResponse(InnerErrorCode errorCode, string description = "")
	{
		return CreateHttpResponse((ApiResponse<object>)null, errorCode, description);
	}

	protected IActionResult CreateHttpResponse<T>(IApiResponse<T> responseModel, InnerErrorCode errorCode, string description = null)
	{
		responseModel ??= new ApiResponse<T>();

		responseModel.ErrorCode = (int)errorCode;
		responseModel.ErrorMessage = errorCode.ToString();
		responseModel.ErrorDescription = description;

		return CreateHttpResponse(responseModel);
	}

	protected IActionResult CreateHttpResponse<T>(IApiResponse<T> responseModel)
	{
            responseModel ??= new ApiResponse<T>();

            if (responseModel.IsSuccessful)
                return Ok(responseModel);

            var errorModel = _errorMapping.GetErrorModel(responseModel.ErrorCode);
            if (errorModel == null)
            {
                responseModel.ErrorMessage = InnerErrorCode.MissingMapping.ToString();
            }
            else
            {
                responseModel.HttpCode = errorModel.HttpCode;
                responseModel.ErrorCode = errorModel.InnerCode;
                responseModel.ErrorMessage = errorModel.Message;
            }

            if (!responseModel.IsSuccessful && responseModel.DisplayMessage.HasNoValue())
            {
                var error = _errorMapping.GetErrorModel(responseModel.ErrorCode);
                if (error != null)
                {
                    var responseModelDisplayMessage = _errorMapping.GetErrorModel(responseModel.ErrorCode)?.Message;
                    if (responseModelDisplayMessage != null)
	                    responseModel.DisplayMessage = responseModelDisplayMessage;
                }
                else
                {
                    responseModel.DisplayMessage = "Unknown error";
                }
            }

            _logger.LogError(responseModel.Exception, responseModel.Exception);

            responseModel.Exception = responseModel.Exception?.ToString() ?? string.Empty;

            if (!string.IsNullOrEmpty(responseModel.ErrorDescription))
                _logger.LogError(responseModel.ErrorMessage, responseModel.ErrorDescription);

            return StatusCode(responseModel.HttpCode, responseModel);
	}

	//*************************    Private Methods    *************************//
	//*************************************************************************//

	//////////////////////////////////////////////////////////////////////
	//							Event Handlers							//
	//////////////////////////////////////////////////////////////////////




}