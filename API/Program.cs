using Application.Contracts.Services;
using Application.MappingProfile;
using Application.Services;
using Infrastructure.DependencyInjection;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register DbContext with dependency injection
builder.Services.AddDbContext<CcemQatContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Add AutoMapper with mapping profiles.
builder.Services.AddAutoMapper(typeof(MappingProfile));


builder.Services.InfrastructureServices(builder.Configuration);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var CORS_IP = builder.Configuration["CORS_IP"];

app.UseCors(policy =>
    policy.WithOrigins(CORS_IP)
          .AllowAnyMethod()
          .AllowAnyHeader());


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
