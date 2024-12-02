using Application.Contracts.Repositories;
using Infrastructure.Entities;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DependencyInjection
{
    public static class ServiceContainer
    {
        public static IServiceCollection InfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CcemQatContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("Default"),
              b => b.MigrationsAssembly(typeof(ServiceContainer).Assembly.FullName)),
              ServiceLifetime.Scoped);

          
            //var jwtSettings = configuration.GetSection("Jwt");
            //var key = jwtSettings["Key"];
            //var issuer = jwtSettings["Issuer"];
            //var audience = jwtSettings["Audience"];

            //if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
            //{
            //    throw new ArgumentNullException("JWT configuration is missing or incomplete.");
            //}

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(options =>
            //{
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuer = true,
            //        ValidateAudience = true,
            //        ValidateIssuerSigningKey = true,
            //        ValidateLifetime = true,
            //        ValidIssuer = configuration["Jwt:Issuer"],
            //        ValidAudience = configuration["Jwt:Audience"],
            //        IssuerSigningKey = new SymmetricSecurityKey
            //        (Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
            //    };
            //});

            services.AddHttpContextAccessor();
            services.AddScoped<IGroupRepository, GroupRepository>();
            //services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
            //services.AddScoped<IReportsRepository, ReportsRepository>();
            //services.AddScoped<IUserRepository, UserRepository>();
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddSingleton<UserClaimsGetter>();


            return services;

        }


    }
}
