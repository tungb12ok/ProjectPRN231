using _2Sport_BE.DataContent;
using _2Sport_BE.Extensions;
using _2Sport_BE.Helpers;
using _2Sport_BE.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MailKit;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;
using _2Sport_BE.Service.Services;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình MailSettings
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("AppSettings:MailSettings"));
builder.Services.AddTransient<ISendMailService, _2Sport_BE.Services.MailService>();
builder.Services.AddHttpClient();

// Đăng ký dịch vụ
builder.Services.Register();

// Cấu hình Controllers
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

// Cấu hình PayOS
builder.Services.Configure<PayOSSettings>(builder.Configuration.GetSection("PayOSSettings"));

// Cấu hình JWT
var appsettingSection = builder.Configuration.GetSection("ServiceConfiguration");
builder.Services.Configure<ServiceConfiguration>(appsettingSection);
var serviceConfiguration = appsettingSection.Get<ServiceConfiguration>();
var JwtSecretkey = Encoding.ASCII.GetBytes(serviceConfiguration.JwtSettings.Secret);
var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(JwtSecretkey),
    ValidateIssuer = false,
    ValidateAudience = false,
    RequireExpirationTime = false,
    ValidateLifetime = true
};

builder.Services.AddSingleton(tokenValidationParameters);
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = tokenValidationParameters;
    })
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
    {
        options.ClientId = builder.Configuration["Auth0:ClientId"];
        options.ClientSecret = builder.Configuration["Auth0:ClientSecret"];
        options.Scope.Add(builder.Configuration["Auth0:ProfileAccess"]);
        options.Scope.Add(builder.Configuration["Auth0:EmailAccess"]);
        options.Scope.Add(builder.Configuration["Auth0:BirthDayAccess"]);
        options.Scope.Add(builder.Configuration["Auth0:PhoneAccess"]);
    });
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Nhập 'Bearer' [space] và sau đó là token của bạn. \n\nVí dụ: \"Bearer abcdefgh12345\""
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Cấu hình CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Cấu hình AutoMapper
var mappingConfig = new MapperConfiguration(mc => { mc.AddProfile(new Mapping()); });
IMapper mapper = mappingConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddControllers();

var app = builder.Build();

// Cấu hình middleware
app.UseCors("CorsPolicy");
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

app.Run();
