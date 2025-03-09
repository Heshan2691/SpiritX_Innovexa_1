using Microsoft.AspNetCore.Mvc;
using BEnd.Services;
using System;
using Microsoft.Extensions.Configuration;
using BCrypt.Net;
using BEnd.Models;
using System.Collections.Generic;

namespace AuthApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MongoService _mongoService;


        public AuthController(MongoService mongoService)
        {
            _mongoService = mongoService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            // Hash the password before saving
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Check if the user already exists
            if (_mongoService.GetUserByUsername(user.Username) != null)
            {
                return BadRequest("User already exists");
            }

            _mongoService.CreateUser(user);
            return Ok(new { Message = "User registered successfully!" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            var user = _mongoService.GetUserByUsername(loginUser.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password))
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(new { Message = "Login successful" });
        }

        // ✅ NEW: Get all users


        // ✅ NEW: Get user by username
        [HttpGet("user/{username}")]
        public ActionResult<User> GetUserByUsername(string username)
        {
            var user = _mongoService.GetUserByUsername(username);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }
    }
}