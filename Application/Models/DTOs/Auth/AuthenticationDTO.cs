using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.DTOs.Auth
{
    public class AuthenticationDTO
    {
        public class AuthRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        //public class LoginResponse
        //{
        //    public string Token { get; set; }
        //    public DateTime Expiration { get; set; }
        //}

        public class AuthResponse
        {
            public bool IsAuthenticated { get; }
            public string Message { get; }
            public string Token { get; }

            public AuthResponse(bool isAuthenticated, string message, string token = null)
            {
                IsAuthenticated = isAuthenticated;
                Message = message;
                Token = token;
            }
        }
    }
}
