using Application.Contracts.Services;
using Application.MappingProfile;
using Application.Services;
using Infrastructure.DependencyInjection;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swagger => {

    swagger.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "A SP.NET 8 Web API",
        Description = ""
    });
    swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header
    });
    swagger.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            }, Array.Empty<string>()
        }
    });
});

// Register DbContext with dependency injection
builder.Services.AddDbContext<CcemQatContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Add AutoMapper with mapping profiles.
builder.Services.AddAutoMapper(typeof(MappingProfile));

//// Register Authentication Services
//builder.Services.AddAuthentication("Bearer")
//    .AddJwtBearer(options =>
//    {
//        options.Authority = builder.Configuration["Authentication:Authority"];  // Set your authority (e.g., identity server)
//        options.Audience = builder.Configuration["Authentication:Audience"];  // Set your API audience (e.g., your API's name)
//        options.RequireHttpsMetadata = true;
//        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ClockSkew = TimeSpan.Zero // Optional: you can set a small skew if necessary
//        };
//    });

// Add your infrastructure services
builder.Services.InfrastructureServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy =>
    policy.WithOrigins("http://localhost:7192/")
          .AllowAnyMethod()
          .AllowAnyHeader());

// Add authentication middleware
app.UseAuthentication(); // Add this line

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
