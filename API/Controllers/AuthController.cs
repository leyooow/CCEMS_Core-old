using Microsoft.AspNetCore.Mvc;
using Application.Models.DTOs.Auth;
using System.Threading.Tasks;
using Application.Contracts.Services;
using static Application.Models.DTOs.Auth.AuthenticationDTO;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] AuthRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { Message = "Username or password cannot be blank." });
        }

        var authResponse = await _authService.AuthenticateAsync(request.Username, request.Password);

        if (!authResponse.Success)
        {
            return Unauthorized(new { authResponse.Message });
        }
        var response = new AuthResponse(true, "Login successful.", authResponse.Token);

        return Ok(response);
    }
}
