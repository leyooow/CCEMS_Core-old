using Application.Contracts.Repositories;
using Application.Contracts.Services;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using static Application.Models.DTOs.Auth.AuthenticationDTO;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IJwtTokenGenerator _tokenGenerator;

        public AuthService(IAuthRepository authRepository, IJwtTokenGenerator tokenGenerator)
        {
            _authRepository = authRepository;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<AuthResponse> AuthenticateAsync(string loginName, string password)
        {
            var user = await _authRepository.GetUserByLoginNameAsync(loginName);

            if (user == null)
                return new AuthResponse(false, "Invalid username or password.");

            if (user.IsLocked)
                return new AuthResponse(false, "User is locked. Please contact the admin.");

            //if (user.Password != password) // Replace with password hash validation
            //{
            //    user.LogInCounter++;
            //    if (user.LogInCounter >= 3)
            //    {
            //        user.IsLocked = true;
            //        await _authRepository.UpdateUserAsync(user);
            //        return new AuthResponse(false, "User is locked due to multiple invalid login attempts.");
            //    }
            //    await _authRepository.UpdateUserAsync(user);
            //    return new AuthResponse(false, "Invalid username or password.");
            //}

            user.LogInCounter = 0;
            user.LastLogIn = DateTime.UtcNow;
            await _authRepository.UpdateUserAsync(user);

            var token = _tokenGenerator.GenerateToken(user);
            return new AuthResponse(true, "Login successful.", token);
        }

       
    }

}
