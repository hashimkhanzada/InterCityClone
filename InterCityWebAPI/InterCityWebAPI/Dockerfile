FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["InterCityWebAPI/InterCityWebAPI.csproj", "InterCityWebAPI/"]
RUN dotnet restore "InterCityWebAPI/InterCityWebAPI.csproj"
COPY . .
WORKDIR "/src/InterCityWebAPI"
RUN dotnet build "InterCityWebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "InterCityWebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "InterCityWebAPI.dll"]