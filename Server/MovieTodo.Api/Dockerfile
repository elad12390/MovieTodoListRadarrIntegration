#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MovieTodo.Api/MovieTodo.Api.csproj", "MovieTodo.Api/"]
COPY ["MovieTodo.Repositories/MovieTodo.Repositories.csproj", "MovieTodo.Repositories/"]
COPY ["MovieTodo.Common/MovieTodo.Common.csproj", "MovieTodo.Common/"]
COPY ["MovieTodo.Entities/MovieTodo.Entities.csproj", "MovieTodo.Entities/"]
COPY ["MovieTodo.Services/MovieTodo.Services.csproj", "MovieTodo.Services/"]
COPY ["MovieTodo.Data/MovieTodo.Data.csproj", "MovieTodo.Data/"]
COPY ["MovieTodo.Models/MovieTodo.Models.csproj", "MovieTodo.Models/"]
RUN dotnet restore "MovieTodo.Api/MovieTodo.Api.csproj"
COPY . .
WORKDIR "/src/MovieTodo.Api"
RUN dotnet build "MovieTodo.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MovieTodo.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MovieTodo.Api.dll"]