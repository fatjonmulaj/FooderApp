using FooderApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace FooderApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegistrationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("registration")]
        public string Register(Registration registration)
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("FooderAppCon")))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand(@"INSERT INTO Registration (UserName, Password, Email)
                                 VALUES (@UserName, @Password, @Email)", con);

                cmd.Parameters.AddWithValue("@UserName", registration.UserName);
                cmd.Parameters.AddWithValue("@Password", registration.Password);
                cmd.Parameters.AddWithValue("@Email", registration.Email);


                int rowsAffected = cmd.ExecuteNonQuery();
                con.Close(); // Close the connection here

                if (rowsAffected > 0)
                {
                    return "Data Inserted";
                }
                else
                {
                    return "Error";
                }
            }
        }

    }
}
