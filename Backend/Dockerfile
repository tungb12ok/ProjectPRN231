# Base image for the runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=https://+:443;http://+:80

# Sao chép chứng chỉ vào container từ đường dẫn chính xác
COPY ./2Sport_BE/localhost.pfx /app/localhost.pfx

# Build image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy and restore project files
COPY ["2Sport_BE/2Sport_BE.csproj", "2Sport_BE/"]
COPY ["2Sport_BE.Core/2Sport_BE.Core.csproj", "2Sport_BE.Core/"]
COPY ["2Sport_BE.Infrastructure/2Sport_BE.Infrastructure.csproj", "2Sport_BE.Infrastructure/"]
RUN dotnet restore "2Sport_BE/2Sport_BE.csproj"

# Copy the rest of the source code and build
COPY . .
WORKDIR "/src/2Sport_BE"
ARG BUILD_CONFIGURATION=Release
RUN dotnet build "2Sport_BE.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish the application
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "2Sport_BE.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final stage - runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "2Sport_BE.dll"]
