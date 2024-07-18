FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT Development
ENV ASPNETCORE_URLS https://+:443;http://+:80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["2Sport_BE.csproj", "./"]
COPY ["../2Sport_BE.Core/2Sport_BE.Core.csproj", "../2Sport_BE.Core/"]
COPY ["../2Sport_BE.Infrastructure/2Sport_BE.Infrastructure.csproj", "../2Sport_BE.Infrastructure/"]
RUN dotnet restore "2Sport_BE.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "2Sport_BE.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "2Sport_BE.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "2Sport_BE.dll"]
